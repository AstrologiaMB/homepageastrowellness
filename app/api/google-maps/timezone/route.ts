import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const timestamp = searchParams.get("timestamp") || Math.floor(Date.now() / 1000).toString()

    if (!lat || !lng) {
      return NextResponse.json({ error: "Missing lat or lng parameter" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not configured")
      return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 })
    }

    // Call Google Time Zone API
    const url = new URL("https://maps.googleapis.com/maps/api/timezone/json")
    url.searchParams.set("location", `${lat},${lng}`)
    url.searchParams.set("timestamp", timestamp)
    url.searchParams.set("key", apiKey)

    const response = await fetch(url.toString())

    if (!response.ok) {
      console.error("Google Time Zone API error:", response.status, response.statusText)
      return NextResponse.json({ error: "Failed to fetch timezone" }, { status: response.status })
    }

    const data = await response.json()

    if (data.status !== "OK") {
      console.error("Google Time Zone API returned error:", data.status, data.error_message)
      return NextResponse.json({ error: data.error_message || "Failed to fetch timezone" }, { status: 400 })
    }

    return NextResponse.json({
      timeZoneId: data.timeZoneId,
      timeZoneName: data.timeZoneName,
    })
  } catch (error) {
    console.error("Error in timezone API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
