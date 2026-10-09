// Kaaba exact geographical coordinates
export const KAABA_COORDINATES = {
  latitude: 21.422487,
  longitude: 39.826206
};

// Convert degrees to radians
const toRad = (deg: number) => (deg * Math.PI) / 180;
// Convert radians to degrees
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Calculates the forward azimuth / bearing in degrees (0-360) from user coordinates to the Kaaba
 */
export function calculateQiblaBearing(userLat: number, userLng: number): number {
  const phi1 = toRad(userLat);
  const phi2 = toRad(KAABA_COORDINATES.latitude);
  const deltaLambda = toRad(KAABA_COORDINATES.longitude - userLng);

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  let qiblaBearing = toDeg(Math.atan2(y, x));
  // Normalize to 0 - 360
  qiblaBearing = (qiblaBearing + 360) % 360;

  return Math.round(qiblaBearing * 10) / 10;
}

/**
 * Calculates the Haversine great-circle distance to Kaaba in kilometers and miles
 */
export function calculateDistanceToKaaba(userLat: number, userLng: number): { km: number; miles: number } {
  const R = 6371; // Earth's mean radius in km
  const dLat = toRad(KAABA_COORDINATES.latitude - userLat);
  const dLng = toRad(KAABA_COORDINATES.longitude - userLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(userLat)) * Math.cos(toRad(KAABA_COORDINATES.latitude)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = Math.round(R * c);
  const miles = Math.round(km * 0.621371);

  return { km, miles };
}
