const GOOGLE_API_KEY = 'GOOGLE_API_KEY'

export function getMapPreview (lat: number, lng: number): string {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat}, ${lng}&zoom=14&size=400x200&maptype=roadmap&markers=red:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return imagePreviewUrl
}

export async function getAddress (lat: number, lng: number): Promise<string> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch address!')
  }
  const data = await response.json()
  const address = data.results[0].formatted_address
  return address
}
