import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Compass, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Sliders, 
  Check, 
  ChevronRight, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  calculatePrayerTimes, 
  POPULAR_CITIES, 
  CALCULATION_METHODS, 
  CityLocation, 
  CalculatedPrayerTimes 
} from '../utils/prayerCalculations';
import { LanguageCode } from '../utils/i18n';

interface PrayerTimesSectionProps {
  lang: LanguageCode;
  onNavigateToQibla?: () => void;
}

export const PrayerTimesSection: React.FC<PrayerTimesSectionProps> = ({
  lang,
  onNavigateToQibla
}) => {
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[0]);
  const [calculationMethod, setCalculationMethod] = useState<string>('MWL');
  const [madhab, setMadhab] = useState<'shafii' | 'hanafi'>('shafii');
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showMonthlyModal, setShowMonthlyModal] = useState<boolean>(false);
  const [isPlayingAdhan, setIsPlayingAdhan] = useState<boolean>(false);
  const [customCityName, setCustomCityName] = useState<string>('');

  const [prayerData, setPrayerData] = useState<CalculatedPrayerTimes>(() => 
    calculatePrayerTimes(new Date(), selectedCity.latitude, selectedCity.longitude, calculationMethod, madhab, is24Hour)
  );

  // Update timer every second
  useEffect(() => {
    const updateTimes = () => {
      setPrayerData(
        calculatePrayerTimes(new Date(), selectedCity.latitude, selectedCity.longitude, calculationMethod, madhab, is24Hour)
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [selectedCity, calculationMethod, madhab, is24Hour]);

  // Handle browser geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const userLoc: CityLocation = {
          city: 'Your Current Location',
          country: 'GPS Detected',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setSelectedCity(userLoc);
      },
      (error) => {
        setIsLocating(false);
        alert('Could not detect location. Defaulting to Makkah.');
      },
      { timeout: 10000 }
    );
  };

  // Format countdown string: hh:mm:ss
  const formatCountdown = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Play / Stop Adhan Audio Preview
  const toggleAdhanAudio = () => {
    const audioEl = document.getElementById('adhan-audio-preview') as HTMLAudioElement;
    if (!audioEl) return;
    if (isPlayingAdhan) {
      audioEl.pause();
      audioEl.currentTime = 0;
      setIsPlayingAdhan(false);
    } else {
      audioEl.play().then(() => setIsPlayingAdhan(true)).catch(() => setIsPlayingAdhan(false));
    }
  };

  const prayers = [
    { id: 'Fajr', name: 'Fajr', arabic: 'الفجر', time: prayerData.fajr, desc: 'Dawn Prayer (Pre-sunrise)' },
    { id: 'Sunrise', name: 'Sunrise', arabic: 'الشروق', time: prayerData.sunrise, desc: 'Sun rises; Salah prohibited' },
    { id: 'Dhuhr', name: 'Dhuhr', arabic: 'الظهر', time: prayerData.dhuhr, desc: 'Noon Prayer (Post-meridian)' },
    { id: 'Asr', name: 'Asr', arabic: 'العصر', time: prayerData.asr, desc: 'Late Afternoon Prayer' },
    { id: 'Maghrib', name: 'Maghrib', arabic: 'المغرب', time: prayerData.maghrib, desc: 'Sunset Prayer / Iftar' },
    { id: 'Isha', name: 'Isha', arabic: 'العشاء', time: prayerData.isha, desc: 'Night Prayer' },
    { id: 'Midnight', name: 'Qiyam / Midnight', arabic: 'قيام الليل', time: prayerData.midnight, desc: 'Islamic midnight (halfway to Fajr)' }
  ];

  return (
    <section id="prayer-times-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hidden Adhan audio stream */}
      <audio 
        id="adhan-audio-preview" 
        src="https://media.sd.ma/assabile/adhan_3742847/f7c10b7ee04c.mp3" 
        preload="none"
        onEnded={() => setIsPlayingAdhan(false)}
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <Clock className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              Daily Prayer Times (مواقيت الصلاة)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Precision calculations for {selectedCity.city}, {selectedCity.country} according to {CALCULATION_METHODS[calculationMethod]?.name || 'MWL'}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Geolocation Button */}
          <button
            id="detect-gps-location-btn"
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
          </button>

          {/* Adhan Audio Preview Button */}
          <button
            id="adhan-audio-trigger"
            onClick={toggleAdhanAudio}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPlayingAdhan 
                ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' 
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300'
            }`}
          >
            {isPlayingAdhan ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAdhan ? 'Stop Adhan' : 'Adhan Audio'}</span>
          </button>

          {/* Settings Drawer Button */}
          <button
            id="toggle-prayer-settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300 transition-colors"
            title="Configure Calculation Methods & Madhab"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Panel if toggled */}
      {showSettings && (
        <div className="mb-8 p-6 rounded-3xl ios-glass-card shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Prayer Calculation Settings & Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* City Selector */}
            <div>
              <label className="block font-semibold mb-1 text-stone-600 dark:text-stone-400">Select City:</label>
              <select
                value={selectedCity.city}
                onChange={(e) => {
                  const city = POPULAR_CITIES.find(c => c.city === e.target.value);
                  if (city) setSelectedCity(city);
                }}
                className="w-full p-2 rounded-xl ios-glass border border-stone-300 dark:border-stone-700 font-medium"
              >
                {POPULAR_CITIES.map(c => (
                  <option key={c.city} value={c.city}>
                    {c.city}, {c.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculation Method */}
            <div>
              <label className="block font-semibold mb-1 text-stone-600 dark:text-stone-400">Calculation Method:</label>
              <select
                value={calculationMethod}
                onChange={(e) => setCalculationMethod(e.target.value)}
                className="w-full p-2 rounded-xl ios-glass border border-stone-300 dark:border-stone-700 font-medium"
              >
                {Object.entries(CALCULATION_METHODS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Madhab for Asr */}
            <div>
              <label className="block font-semibold mb-1 text-stone-600 dark:text-stone-400">Asr Juristic Method (Madhab):</label>
              <select
                value={madhab}
                onChange={(e) => setMadhab(e.target.value as any)}
                className="w-full p-2 rounded-xl ios-glass border border-stone-300 dark:border-stone-700 font-medium"
              >
                <option value="shafii">Standard (Shafi'i, Maliki, Hanbali — 1x Shadow)</option>
                <option value="hanafi">Hanafi (2x Shadow)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-700">
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={is24Hour}
                onChange={(e) => setIs24Hour(e.target.checked)}
                className="accent-emerald-800 rounded-sm"
              />
              <span>Use 24-Hour Time Format</span>
            </label>

            <button
              onClick={() => setShowSettings(false)}
              className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-emerald-800 text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Main Countdown & Hero Time Banner - iOS Glassified */}
      <div id="next-prayer-hero-banner" className="relative overflow-hidden p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] ios-glass-card bg-gradient-to-br from-emerald-900/90 via-emerald-950/90 to-stone-900/90 text-white shadow-xl mb-8 border border-white/20 dark:border-white/10">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                Next Obligatory Prayer
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1">
              {prayerData.nextPrayer}
            </h2>
            <p className="text-xs text-stone-300">
              City: {selectedCity.city}, {selectedCity.country}
            </p>
          </div>

          {/* Real-time Countdown Counter */}
          <div className="flex items-center gap-4 self-start md:self-center">
            <div className="text-left md:text-right">
              <p className="text-xs text-stone-400 font-medium">Time Remaining:</p>
              <p className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-wider">
                {formatCountdown(prayerData.countdownSeconds)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Prayer Cards Grid - iOS Glassified */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {prayers.map((prayer) => {
          const isCurrent = prayerData.currentPrayer.toLowerCase().includes(prayer.name.toLowerCase());
          const isNext = prayerData.nextPrayer.toLowerCase() === prayer.name.toLowerCase();

          return (
            <div
              key={prayer.id}
              id={`prayer-card-${prayer.id}`}
              className={`p-5 sm:p-6 rounded-3xl transition-all relative overflow-hidden ios-glass-card ${
                isNext
                  ? 'ring-2 ring-emerald-500 shadow-xl scale-[1.01]'
                  : isCurrent
                  ? 'ring-2 ring-amber-400 shadow-lg'
                  : 'shadow-md hover:shadow-xl hover:scale-[1.01]'
              }`}
            >
              {isNext && (
                <div className="absolute top-0 right-0 px-3.5 py-1 rounded-bl-2xl bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Next
                </div>
              )}

              {isCurrent && !isNext && (
                <div className="absolute top-0 right-0 px-3.5 py-1 rounded-bl-2xl bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Current
                </div>
              )}

              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  {prayer.name}
                </span>
                <span className="font-arabic text-xl font-bold text-emerald-800 dark:text-emerald-300">
                  {prayer.arabic}
                </span>
              </div>

              <p className="font-mono text-2xl font-extrabold text-stone-900 dark:text-stone-100 mb-2">
                {prayer.time}
              </p>

              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {prayer.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick links to Qibla and Monthly Timetable - iOS Glassified */}
      <div className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900 dark:text-stone-100">Looking for Qibla Direction?</p>
            <p className="text-xs text-stone-500">Calculate exact bearing to the Kaaba with our digital compass</p>
          </div>
        </div>

        <button
          id="qibla-finder-cta-btn"
          onClick={onNavigateToQibla}
          className="px-5 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 hover:scale-[1.02]"
        >
          <span>Open Qibla Compass</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
