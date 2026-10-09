export interface CityLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezoneOffset?: number;
}

export const POPULAR_CITIES: CityLocation[] = [
  { city: 'Makkah', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262 },
  { city: 'Madinah', country: 'Saudi Arabia', latitude: 24.4672, longitude: 39.6111 },
  { city: 'Jerusalem', country: 'Palestine', latitude: 31.7767, longitude: 35.2345 },
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060 },
  { city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784 },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357 },
  { city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708 },
  { city: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011 },
  { city: 'Lahore', country: 'Pakistan', latitude: 31.5204, longitude: 74.3587 },
  { city: 'Dhaka', country: 'Bangladesh', latitude: 23.8103, longitude: 90.4125 },
  { city: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456 },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869 },
  { city: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832 },
  { city: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
  { city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093 }
];

export interface CalculationMethodParams {
  name: string;
  fajrAngle: number;
  ishaAngle: number;
  ishaMinutesAfterMaghrib?: number;
}

export const CALCULATION_METHODS: Record<string, CalculationMethodParams> = {
  MWL: { name: 'Muslim World League', fajrAngle: 18, ishaAngle: 17 },
  ISNA: { name: 'Islamic Society of North America (ISNA)', fajrAngle: 15, ishaAngle: 15 },
  Egypt: { name: 'Egyptian General Authority', fajrAngle: 19.5, ishaAngle: 17.5 },
  Makkah: { name: 'Umm Al-Qura University, Makkah', fajrAngle: 18.5, ishaAngle: 0, ishaMinutesAfterMaghrib: 90 },
  Karachi: { name: 'University of Islamic Sciences, Karachi', fajrAngle: 18, ishaAngle: 18 },
  Dubai: { name: 'Gulf Region / Dubai', fajrAngle: 19.5, ishaAngle: 0, ishaMinutesAfterMaghrib: 90 }
};

export interface CalculatedPrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  midnight: string;
  fajrDate: Date;
  sunriseDate: Date;
  dhuhrDate: Date;
  asrDate: Date;
  maghribDate: Date;
  ishaDate: Date;
  currentPrayer: string;
  nextPrayer: string;
  countdownSeconds: number;
}

// Convert degrees to radians and back
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

function formatHHMM(date: Date, is24Hour = false): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

  if (is24Hour) {
    const hStr = hours < 10 ? `0${hours}` : `${hours}`;
    return `${hStr}:${mStr}`;
  }

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  const hStr = hours < 10 ? `0${hours}` : `${hours}`;
  return `${hStr}:${mStr} ${ampm}`;
}

export function calculatePrayerTimes(
  date: Date,
  latitude: number,
  longitude: number,
  methodKey = 'MWL',
  madhab: 'shafii' | 'hanafi' = 'shafii',
  is24Hour = false
): CalculatedPrayerTimes {
  const method = CALCULATION_METHODS[methodKey] || CALCULATION_METHODS.MWL;

  // Day of year and solar calculation approximations
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Solar declination (approximate in radians)
  const declination = rad(23.45 * Math.sin(rad((360 / 365) * (dayOfYear - 81))));

  // Equation of time in minutes
  const B = rad((360 / 365) * (dayOfYear - 81));
  const eqtime = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

  // Solar noon (Dhuhr) in local time hours
  const timezoneOffsetHours = -date.getTimezoneOffset() / 60;
  const noonHours = 12 + timezoneOffsetHours - longitude / 15 - eqtime / 60;

  // Helper function to calculate hour angle for a given sun altitude angle
  function hourAngle(altitudeAngle: number): number {
    const phi = rad(latitude);
    const alpha = rad(altitudeAngle);
    const cosHA = (Math.sin(alpha) - Math.sin(phi) * Math.sin(declination)) / (Math.cos(phi) * Math.cos(declination));
    if (cosHA > 1) return 0;
    if (cosHA < -1) return Math.PI;
    return Math.acos(cosHA);
  }

  // Sunrise and Sunset: sun center is -0.833°
  const sunRadiusAngle = -0.833;
  const haSunrise = deg(hourAngle(sunRadiusAngle)) / 15;

  // Fajr: sun is at -fajrAngle
  const haFajr = deg(hourAngle(-method.fajrAngle)) / 15;

  // Isha: sun is at -ishaAngle or minutes after maghrib
  let haIsha = deg(hourAngle(-method.ishaAngle)) / 15;

  // Asr: shadow factor (1 for Shafi'i/Maliki/Hanbali, 2 for Hanafi)
  const shadowFactor = madhab === 'hanafi' ? 2 : 1;
  const phi = rad(latitude);
  const noonZenith = Math.abs(phi - declination);
  const asrAltitude = deg(Math.atan(1 / (shadowFactor + Math.tan(noonZenith))));
  const haAsr = deg(hourAngle(asrAltitude)) / 15;

  const baseDate = new Date(date);
  baseDate.setSeconds(0);
  baseDate.setMilliseconds(0);

  function makeDate(hoursDecimal: number): Date {
    const d = new Date(baseDate);
    const h = Math.floor(hoursDecimal);
    const m = Math.floor((hoursDecimal - h) * 60);
    d.setHours(h, m, 0, 0);
    return d;
  }

  const dhuhrDate = makeDate(noonHours);
  const sunriseDate = makeDate(noonHours - haSunrise);
  const maghribDate = makeDate(noonHours + haSunrise);
  const fajrDate = makeDate(noonHours - haFajr);
  const asrDate = makeDate(noonHours + haAsr);

  let ishaDate: Date;
  if (method.ishaMinutesAfterMaghrib && method.ishaMinutesAfterMaghrib > 0) {
    ishaDate = new Date(maghribDate.getTime() + method.ishaMinutesAfterMaghrib * 60 * 1000);
  } else {
    ishaDate = makeDate(noonHours + haIsha);
  }

  // Midnight / Islamic Qiyam time (halfway between Maghrib and Fajr next morning)
  const nextFajrTime = fajrDate.getTime() + 24 * 60 * 60 * 1000;
  const midnightDate = new Date(maghribDate.getTime() + (nextFajrTime - maghribDate.getTime()) / 2);

  // Determine current and next prayer
  const now = new Date();
  const schedule = [
    { name: 'Fajr', date: fajrDate },
    { name: 'Sunrise', date: sunriseDate },
    { name: 'Dhuhr', date: dhuhrDate },
    { name: 'Asr', date: asrDate },
    { name: 'Maghrib', date: maghribDate },
    { name: 'Isha', date: ishaDate },
  ];

  let currentPrayer = 'Isha';
  let nextPrayer = 'Fajr';
  let nextPrayerDate = new Date(fajrDate.getTime() + 24 * 60 * 60 * 1000);

  for (let i = 0; i < schedule.length; i++) {
    if (now.getTime() >= schedule[i].date.getTime()) {
      currentPrayer = schedule[i].name;
      if (i < schedule.length - 1) {
        nextPrayer = schedule[i + 1].name;
        nextPrayerDate = schedule[i + 1].date;
      } else {
        nextPrayer = 'Fajr';
        nextPrayerDate = new Date(fajrDate.getTime() + 24 * 60 * 60 * 1000);
      }
    } else {
      // First one in the day that is in the future
      if (i === 0) {
        currentPrayer = 'Isha (Previous Night)';
        nextPrayer = 'Fajr';
        nextPrayerDate = fajrDate;
      }
      break;
    }
  }

  const countdownSeconds = Math.max(0, Math.floor((nextPrayerDate.getTime() - now.getTime()) / 1000));

  return {
    fajr: formatHHMM(fajrDate, is24Hour),
    sunrise: formatHHMM(sunriseDate, is24Hour),
    dhuhr: formatHHMM(dhuhrDate, is24Hour),
    asr: formatHHMM(asrDate, is24Hour),
    maghrib: formatHHMM(maghribDate, is24Hour),
    isha: formatHHMM(ishaDate, is24Hour),
    midnight: formatHHMM(midnightDate, is24Hour),
    fajrDate,
    sunriseDate,
    dhuhrDate,
    asrDate,
    maghribDate,
    ishaDate,
    currentPrayer,
    nextPrayer,
    countdownSeconds,
  };
}
