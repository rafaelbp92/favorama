const GOOGLE_API_KEY = "YOUR_API_KEY";

export function getMapPreview(lat: number, lng: number) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat}, ${lng}&zoom=14&size=400x200&maptype=roadmap&markers=red:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}
