"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps"
import { useJsApiLoader } from "@react-google-maps/api"
import { Loader2, MapPin, Search, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Position for default map view (centered on South America)
const DEFAULT_CENTER = { lat: -15, lng: -60 }
const DEFAULT_ZOOM = 3

export interface LocationData {
  lat: number
  lng: number
  address: string
  timezone: string
}

export interface MapLocationPickerProps {
  apiKey: string
  initialQuery?: string
  locationType: "birth" | "residence"
  onLocationSelect: (location: LocationData) => void
  onCancel: () => void
  isOpen: boolean
}

const libraries: ("places" | "geometry")[] = ["places"]

// Inner component with map click handling
function MapContent({
  center,
  zoom,
  onMapClick,
  selectedLocation,
}: {
  center: { lat: number; lng: number }
  zoom: number
  onMapClick: (lat: number, lng: number) => void
  selectedLocation: { lat: number; lng: number } | null
}) {
  const map = useMap()
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastClickLatRef = useRef<number | null>(null)
  const lastClickLngRef = useRef<number | null>(null)

  useEffect(() => {
    if (!map) return

    // Store click position when a click happens
    const clickListener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        lastClickLatRef.current = e.latLng.lat()
        lastClickLngRef.current = e.latLng.lng()

        // Use a timeout to check if this was a real click (not followed by drag)
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current)
        }

        clickTimeoutRef.current = setTimeout(() => {
          if (lastClickLatRef.current !== null && lastClickLngRef.current !== null) {
            onMapClick(lastClickLatRef.current, lastClickLngRef.current)
            lastClickLatRef.current = null
            lastClickLngRef.current = null
          }
        }, 150)
      }
    })

    // Cancel the click timeout if dragging starts
    const dragStartListener = map.addListener("dragstart", () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
        clickTimeoutRef.current = null
      }
      lastClickLatRef.current = null
      lastClickLngRef.current = null
    })

    return () => {
      clickListener.remove()
      dragStartListener.remove()
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [map, onMapClick])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-muted rounded-lg overflow-hidden">
      <Map
        defaultZoom={zoom}
        defaultCenter={center}
        center={center}
        zoomControl
        mapId="astro-location-picker"
        gestureHandling="greedy"
        disableDefaultUI={false}
        className="w-full h-full"
      >
        {selectedLocation && (
          <AdvancedMarker position={selectedLocation}>
            <Pin
              background="#f59e0b"
              borderColor="#b45309"
              glyphColor="#ffffff"
              scale={1.5}
            />
          </AdvancedMarker>
        )}
      </Map>
    </div>
  )
}

export function MapLocationPicker({
  apiKey,
  initialQuery = "",
  locationType,
  onLocationSelect,
  onCancel,
  isOpen,
}: MapLocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [center, setCenter] = useState(DEFAULT_CENTER)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [timezone, setTimezone] = useState<string | null>(null)
  const [isFetchingTimezone, setIsFetchingTimezone] = useState(false)
  const [isLoadingPlace, setIsLoadingPlace] = useState(false)

  const { isLoaded: isMapsLoaded, loadError } = useJsApiLoader({
    id: "google-maps-location-picker",
    googleMapsApiKey: apiKey,
    libraries,
  })

  // Fetch timezone for a location
  const fetchTimezone = useCallback(
    async (lat: number, lng: number): Promise<string | null> => {
      setIsFetchingTimezone(true)
      try {
        const timestamp = Math.floor(Date.now() / 1000)
        const response = await fetch(
          `/api/google-maps/timezone?lat=${lat}&lng=${lng}&timestamp=${timestamp}`
        )

        if (!response.ok) {
          console.warn("Failed to fetch timezone, using default")
          return null
        }

        const data = await response.json()
        return data.timeZoneId || null
      } catch (error) {
        console.error("Error fetching timezone:", error)
        return null
      } finally {
        setIsFetchingTimezone(false)
      }
    },
    []
  )

  // Handle map click
  const handleMapClick = useCallback(
    async (lat: number, lng: number) => {
      setSelectedLocation({ lat, lng })
      setCenter({ lat, lng })
      setZoom(12)

      // Reverse geocode to get address
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const address = results[0].formatted_address
          setSelectedAddress(address)
          setSearchQuery(address)

          // Fetch timezone
          fetchTimezone(lat, lng).then((tz) => {
            setTimezone(tz)
          })
        }
      })
    },
    [fetchTimezone]
  )

  // Handle place prediction
  const handleSearchChange = useCallback(
    async (query: string) => {
      setSearchQuery(query)

      if (!query.trim() || !isMapsLoaded) {
        setPredictions([])
        return
      }

      try {
        const service = new google.maps.places.AutocompleteService()
        service.getPlacePredictions(
          {
            input: query,
            types: ["(cities)"],
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              setPredictions(predictions)
            } else {
              setPredictions([])
            }
          }
        )
      } catch (error) {
        console.error("Error getting predictions:", error)
        setPredictions([])
      }
    },
    [isMapsLoaded]
  )

  // Handle place selection from predictions
  const handlePlaceSelect = useCallback(
    async (placeId: string, description: string) => {
      setIsLoadingPlace(true)
      setPredictions([])
      setSearchQuery(description)

      try {
        const service = new google.maps.places.PlacesService(document.createElement("div"))
        service.getDetails(
          {
            placeId,
            fields: ["geometry", "formatted_address"],
          },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
              const lat = place.geometry.location.lat()
              const lng = place.geometry.location.lng()
              const address = place.formatted_address || description

              setSelectedLocation({ lat, lng })
              setSelectedAddress(address)
              setCenter({ lat, lng })
              setZoom(12)

              // Fetch timezone
              fetchTimezone(lat, lng).then((tz) => {
                setTimezone(tz)
              })
            }
            setIsLoadingPlace(false)
          }
        )
      } catch (error) {
        console.error("Error getting place details:", error)
        setIsLoadingPlace(false)
      }
    },
    [fetchTimezone]
  )

  // Handle confirm
  const handleConfirm = useCallback(() => {
    if (!selectedLocation || !selectedAddress) {
      return
    }

    onLocationSelect({
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      address: selectedAddress,
      timezone: timezone || "UTC", // Fallback to UTC if timezone fetch fails
    })
  }, [selectedLocation, selectedAddress, timezone, onLocationSelect])

  // Get dialog title based on location type
  const getDialogTitle = () => {
    return locationType === "birth"
      ? "Selecciona tu ubicación de nacimiento"
      : "Selecciona tu ubicación de residencia"
  }

  // Reset state when dialog opens
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onCancel()
      }
    },
    [onCancel]
  )

  // Show loading state if maps is loading
  if (!isMapsLoaded) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando mapa...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Show error if maps failed to load
  if (loadError) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center">
            <p className="text-destructive mb-4">No se pudo cargar el mapa</p>
            <p className="text-sm text-muted-foreground">
              Verifica tu conexión a internet o intenta más tarde.
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={onCancel}>
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Search input with autocomplete - moved to top */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Busca una ciudad..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                  autoComplete="off"
                />
                {isLoadingPlace && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>

              {/* Predictions dropdown */}
              {predictions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {predictions.map((prediction) => (
                    <button
                      key={prediction.place_id}
                      type="button"
                      onClick={() => handlePlaceSelect(prediction.place_id, prediction.description)}
                      className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-start gap-3"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{prediction.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected location info */}
            {selectedAddress && (
              <div className="bg-muted/50 border border-border rounded-lg p-3">
                <p className="text-sm">
                  <strong className="text-foreground">Ubicación seleccionada:</strong>{" "}
                  {selectedAddress}
                </p>
                <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                  {selectedLocation && (
                    <span>Coordenadas: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</span>
                  )}
                  {timezone && (
                    <span>Zona horaria: {timezone}</span>
                  )}
                </div>
              </div>
            )}

            {/* Map */}
            <MapContent
              center={center}
              zoom={zoom}
              onMapClick={handleMapClick}
              selectedLocation={selectedLocation}
            />

            {/* Instructions */}
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Instrucciones:</strong> Busca una ciudad en el
                buscador o haz clic en cualquier lugar del mapa para seleccionar tu ubicación exacta.
                La zona horaria se detectará automáticamente.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                disabled={!selectedLocation || !selectedAddress || isFetchingTimezone}
              >
                <Check className="h-4 w-4 mr-2" />
                Confirmar ubicación
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </APIProvider>
  )
}
