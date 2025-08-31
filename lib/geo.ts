// Haversine distance in meters
export function distanceMeters(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371e3
  const φ1 = (a.lat * Math.PI) / 180
  const φ2 = (b.lat * Math.PI) / 180
  const dφ = ((b.lat - a.lat) * Math.PI) / 180
  const dλ = ((b.lon - a.lon) * Math.PI) / 180
  const s = Math.sin(dφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s))
  return R * c
}
