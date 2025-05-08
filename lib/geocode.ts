// lib/geocode.ts

export async function geocode(city: string, country: string) {
  const apiKey = process.env.OPENCAGE_API_KEY
  if (!apiKey) {
    console.error("OpenCage API key not found in environment variables.")
    return null
  }

  const query = `${city}, ${country}`
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&limit=1`

  const res = await fetch(url)
  if (!res.ok) {
    console.error("Error from geocoding API:", res.statusText)
    return null
  }

  const data = await res.json()

  if (!data.results || data.results.length === 0) {
    console.warn("No geocoding results for:", query)
    return null
  }

  const { lat, lng } = data.results[0].geometry
  return { lat, lon: lng }
}
