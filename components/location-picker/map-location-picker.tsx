"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { useToast } from "@/hooks/use-toast"
import { useJsApiLoader } from "@react-google-maps/api"
import { AdvancedMarker, APIProvider, Map, Pin, type MapEvent } from "@vis.gl/react-google-maps"
import { Check, Loader2, MapPin, Search, X } from "lucide-react"
import { useCallback, useRef, useState } from "react"

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

export function MapLocationPicker({
  apiKey,
  initialQuery = "",
  locationType,
  onLocationSelect,
  onCancel,
  isOpen,
}: MapLocationPickerProps) {
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [timezone, setTimezone] = useState<string | null>(null)
  const [isFetchingTimezone, setIsFetchingTimezone] = useState(false)
  const [isLoadingPlace, setIsLoadingPlace] = useState(false)
  const mapRef = useRef<google.maps.Map | null>(null)

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

  // Handle map ready - capture map instance when map is idle
  const handleMapIdle = useCallback((event: MapEvent) => {
    const map = event.map as google.maps.Map
    mapRef.current = map

    // Attach native click listener only once
    if (!map) return

    // Remove any existing listener to avoid duplicates
    if ((map as any)._clickListener) {
      google.maps.event.removeListener((map as any)._clickListener)
    }

    const clickListener = map.addListener(
      "click",
      (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return

        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        setSelectedLocation({ lat, lng })
        // Use map instance methods instead of React state to avoid drag conflicts
        map.setCenter({ lat, lng })
        map.setZoom(12)

        // Reverse geocode to get address
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode(
          { location: { lat, lng } },
          (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
            if (status === "OK" && results?.[0]) {
              const address = results[0].formatted_address
              setSelectedAddress(address)
              setSearchQuery(address)

              // Fetch timezone
              fetchTimezone(lat, lng).then((tz) => {
                setTimezone(tz)
              })
            }
          }
        )
      }
    )

    // Store listener reference for cleanup
    ;(map as any)._clickListener = clickListener
  }, [fetchTimezone])

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

              // Use map instance methods instead of React state to avoid drag conflicts
              const map = mapRef.current
              if (map) {
                map.setCenter({ lat, lng })
                map.setZoom(12)
              }

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
      const locationLabel =
        locationType === "birth" ? "ubicación de nacimiento" : "ubicación de residencia"

      toast({
        title: "Ubicación no seleccionada",
        description: `Por favor, haz clic en "Seleccionar en mapa" para elegir tu ${locationLabel}, o busca una ciudad en el buscador.`,
        variant: "destructive",
      })
      return
    }

    onLocationSelect({
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      address: selectedAddress,
      timezone: timezone || "UTC",
    })
  }, [selectedLocation, selectedAddress, timezone, onLocationSelect, locationType, toast])

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
    const content = (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Cargando mapa...</p>
      </div>
    )

    return (
      <APIProvider apiKey={apiKey}>
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent side="bottom" className="max-w-3xl">
              {content}
            </SheetContent>
          </Sheet>
        ) : (
          <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-3xl">{content}</DialogContent>
          </Dialog>
        )}
      </APIProvider>
    )
  }

  // Show error if maps failed to load
  if (loadError) {
    const errorContent = (
      <>
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
      </>
    )

    return (
      <APIProvider apiKey={apiKey}>
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent side="bottom" className="max-w-3xl">
              {errorContent}
            </SheetContent>
          </Sheet>
        ) : (
          <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-3xl">{errorContent}</DialogContent>
          </Dialog>
        )}
      </APIProvider>
    )
  }

  // Shared content component for both Dialog and Sheet
  const mapPickerContent = (
    <>
      {isMobile ? (
        <SheetHeader>
          <SheetTitle>{getDialogTitle()}</SheetTitle>
        </SheetHeader>
      ) : (
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
      )}

      <div className="space-y-4 mt-4">
        {/* Search input with autocomplete */}
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

        {/* Map - responsive height for mobile */}
        <div className="relative w-full h-[300px] md:h-[400px] bg-muted rounded-lg overflow-hidden">
          <Map
            defaultZoom={DEFAULT_ZOOM}
            defaultCenter={DEFAULT_CENTER}
            zoomControl
            mapId="astro-location-picker-v2"
            gestureHandling="greedy"
            disableDefaultUI={false}
            onIdle={handleMapIdle}
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

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={isFetchingTimezone}>
            {isFetchingTimezone ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Detectando zona horaria...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Confirmar ubicación
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <APIProvider apiKey={apiKey}>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          <SheetContent
            side="bottom"
            className="max-h-[90vh] overflow-y-auto"
          >
            {mapPickerContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {mapPickerContent}
          </DialogContent>
        </Dialog>
      )}
    </APIProvider>
  )
}
