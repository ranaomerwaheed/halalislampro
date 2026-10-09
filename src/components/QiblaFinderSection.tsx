import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Info, 
  RotateCcw, 
  Navigation, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  calculateQiblaBearing, 
  calculateDistanceToKaaba, 
  KAABA_COORDINATES 
} from '../utils/qiblaCalculations';
import { POPULAR_CITIES, CityLocation } from '../utils/prayerCalculations';
import { LanguageCode } from '../utils/i18n';

interface QiblaFinderSectionProps {
  lang: LanguageCode;
}

export const QiblaFinderSection: React.FC<QiblaFinderSectionProps> = ({ lang }) => {
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[3]); // London as default demo
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [hasOrientationSensor, setHasOrientationSensor] = useState<boolean>(false);
  const [manualOffset, setManualOffset] = useState<number>(0);

  const qiblaAngle = calculateQiblaBearing(selectedCity.latitude, selectedCity.longitude);
  const distance = calculateDistanceToKaaba(selectedCity.latitude, selectedCity.longitude);

  // Device orientation event for mobile phone compass
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setHasOrientationSensor(true);
        // For iOS webkitCompassHeading is available and points to true north
        const heading = (e as any).webkitCompassHeading !== undefined 
          ? (e as any).webkitCompassHeading 
          : 360 - e.alpha;
        setDeviceHeading(Math.round(heading));
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setSelectedCity({
          city: 'Your GPS Location',
          country: 'Current Coordinates',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      () => {
        setIsLocating(false);
        alert('Could not obtain GPS location. Please select a city manually.');
      }
    );
  };

  // Compass needle rotation: If device sensor is active, rotate relative to phone heading; else point to Qibla angle + manual offset
  const compassRotation = deviceHeading !== null 
    ? (qiblaAngle - deviceHeading + 360) % 360 
    : (qiblaAngle + manualOffset) % 360;

  return (
    <section id="qibla-finder-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <Compass className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              Qibla Direction Finder (اتجاه القبلة)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Find the exact bearing and distance to the Holy Kaaba in Makkah al-Mukarramah from anywhere in the world.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="qibla-gps-detect-btn"
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="px-4 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            <span>{isLocating ? 'Detecting...' : 'Use My GPS Location'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Visual Compass Dial */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl sm:rounded-[2.5rem] ios-glass-card shadow-lg relative">
          
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4">
            
            {/* Outer Compass Housing Ring */}
            <div className="absolute inset-0 rounded-full border border-stone-300/40 dark:border-stone-700/40 ios-glass shadow-inner flex items-center justify-center backdrop-blur-md">
              
              {/* Cardinal Points */}
              <span className="absolute top-2.5 font-bold text-xs text-rose-500">N (0°)</span>
              <span className="absolute bottom-2.5 font-bold text-xs text-stone-400">S (180°)</span>
              <span className="absolute right-2.5 font-bold text-xs text-stone-400">E (90°)</span>
              <span className="absolute left-2.5 font-bold text-xs text-stone-400">W (270°)</span>

              {/* Tick Marks */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                <div 
                  key={deg} 
                  className="absolute w-full h-full flex justify-center pointer-events-none"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <div className="w-0.5 h-2 bg-stone-300 dark:bg-stone-700 mt-1" />
                </div>
              ))}
            </div>

            {/* Inner Rotating Qibla Needle */}
            <div 
              id="qibla-compass-needle"
              className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full flex items-center justify-center transition-transform duration-500 ease-out"
              style={{ transform: `rotate(${compassRotation}deg)` }}
            >
              {/* Golden Kaaba Pointer Head */}
              <div className="absolute top-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-900 flex items-center justify-center font-bold shadow-lg ring-2 ring-amber-300">
                  🕋
                </div>
                <div className="w-1 h-12 bg-amber-500 shadow-sm" />
              </div>

              {/* Center Pivot */}
              <div className="w-5 h-5 rounded-full bg-emerald-800 dark:bg-emerald-600 border-2 border-white shadow-md z-10" />

              {/* Opposite needle */}
              <div className="absolute bottom-0 w-1 h-12 bg-stone-300 dark:bg-stone-700" />
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              {hasOrientationSensor ? 'Live Mobile Compass Sensor Active' : 'Calibrated Qibla Bearing'}
            </p>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-mono mt-0.5">
              {qiblaAngle}° from North
            </p>
          </div>
        </div>

        {/* Right Column: Location details, Distance, and Instructions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* City Selection Card */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              Select City or Region
            </h3>

            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Choose Location:</label>
              <select
                id="qibla-city-select"
                value={selectedCity.city}
                onChange={(e) => {
                  const city = POPULAR_CITIES.find(c => c.city === e.target.value);
                  if (city) setSelectedCity(city);
                }}
                className="w-full p-3 rounded-2xl ios-glass text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                {POPULAR_CITIES.map(c => (
                  <option key={c.city} value={c.city} className="bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                    {c.city}, {c.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl ios-glass">
                <p className="text-[11px] text-stone-500">Distance to Kaaba</p>
                <p className="text-base font-extrabold text-stone-900 dark:text-stone-100 font-mono mt-0.5">
                  {distance.km.toLocaleString()} km
                </p>
                <p className="text-[10px] text-stone-400">({distance.miles.toLocaleString()} miles)</p>
              </div>

              <div className="p-4 rounded-2xl ios-glass">
                <p className="text-[11px] text-stone-500">Kaaba Coordinates</p>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-mono mt-1">
                  21.42° N
                </p>
                <p className="text-[10px] text-stone-400 font-mono">39.83° E (Makkah)</p>
              </div>
            </div>
          </div>

          {/* Compass Accuracy & Calibration Guide */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card border border-amber-300/40 text-xs text-stone-700 dark:text-stone-300 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
              <Info className="w-4 h-4" />
              <span>How to Calibrate Your Compass:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-400">
              <li>Keep your mobile phone flat on the palm of your hand or floor.</li>
              <li>Move your phone in a figure-eight (∞) pattern 2 to 3 times.</li>
              <li>Stay away from large metallic objects or magnetic phone cases.</li>
              <li>Face in the direction where the golden Kaaba icon 🕋 points straight forward.</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
