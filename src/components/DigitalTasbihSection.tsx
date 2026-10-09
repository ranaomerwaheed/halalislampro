import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Check, 
  Plus, 
  History, 
  Target,
  Smartphone
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { LanguageCode } from '../utils/i18n';

interface DigitalTasbihSectionProps {
  lang: LanguageCode;
}

const PRESETS = [
  { id: 'subhanallah', textAr: 'سُبْحَانَ اللَّهِ', textEn: 'SubhanAllah', meaning: 'Glory be to Allah', target: 33 },
  { id: 'alhamdulillah', textAr: 'الْحَمْدُ لِلَّهِ', textEn: 'Alhamdulillah', meaning: 'All praise is due to Allah', target: 33 },
  { id: 'allahuakbar', textAr: 'اللَّهُ أَكْبَرُ', textEn: 'Allahu Akbar', meaning: 'Allah is the Greatest', target: 34 },
  { id: 'astaghfirullah', textAr: 'أَسْتَغْفِرُ اللَّهَ', textEn: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah', target: 100 },
  { id: 'lailahaillallah', textAr: 'لَا إِلَٰهَ إِلَّا اللَّهُ', textEn: 'La ilaha illallah', meaning: 'There is no god but Allah', target: 100 },
  { id: 'salawat', textAr: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', textEn: 'Salawat on Prophet ﷺ', meaning: 'Blessings upon Muhammad ﷺ', target: 100 }
];

export const DigitalTasbihSection: React.FC<DigitalTasbihSectionProps> = ({ lang }) => {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [count, setCount] = useState<number>(0);
  const [laps, setLaps] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
  const [customZikr, setCustomZikr] = useState<string>('');
  const [customTarget, setCustomTarget] = useState<number>(33);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [tasbihStats, setTasbihStats] = useState(StorageService.getTasbihStats());

  // Web Audio click generator
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const handleIncrement = () => {
    const target = isCustom ? customTarget : selectedPreset.target;
    const nextCount = count + 1;
    playClickSound();

    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(nextCount % target === 0 ? [80, 50, 80] : 30);
    }

    if (nextCount >= target) {
      setCount(0);
      setLaps(l => l + 1);
    } else {
      setCount(nextCount);
    }

    // Persist count
    const stats = StorageService.incrementTasbih(1);
    setTasbihStats(stats);
  };

  const handleReset = () => {
    if (window.confirm('Reset current counter and laps back to zero?')) {
      setCount(0);
      setLaps(0);
    }
  };

  const currentTarget = isCustom ? customTarget : selectedPreset.target;
  const progressPercent = Math.round((count / currentTarget) * 100);
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = tasbihStats.dailyCounts[todayStr] || 0;

  return (
    <section id="digital-tasbih-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              Digital Tasbih & Dhikr Counter (المسبحة الإلكترونية)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            A peaceful, tactile digital prayer bead with haptic feedback, customizable targets, and daily remembrance tracking.
          </p>
        </div>

        {/* Controls: Sound & Vibration Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500'
            }`}
            title="Audio Click Feedback"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">Audio</span>
          </button>

          <button
            onClick={() => setVibrationEnabled(!vibrationEnabled)}
            className={`p-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              vibrationEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500'
            }`}
            title="Haptic Vibration Feedback"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Haptic</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-300 transition-colors"
            title="Reset Counter"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Preset Dhikr Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
            Select Dhikr Preset
          </h3>

          {PRESETS.map((preset) => {
            const isSelected = !isCustom && selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset);
                  setIsCustom(false);
                  setCount(0);
                  setLaps(0);
                }}
                className={`w-full p-4 rounded-3xl text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-md scale-[1.02]'
                    : 'ios-glass-card hover:bg-white/40 text-stone-800 dark:text-stone-200'
                }`}
              >
                <div>
                  <p className="font-bold text-xs">{preset.textEn}</p>
                  <p className={`text-[11px] ${isSelected ? 'text-emerald-200' : 'text-stone-500 dark:text-stone-400'}`}>
                    Target: {preset.target}x
                  </p>
                </div>
                <span className={`font-arabic text-base font-bold ${isSelected ? 'text-white' : 'text-emerald-800 dark:text-emerald-400'}`}>
                  {preset.textAr}
                </span>
              </button>
            );
          })}

          {/* Custom Dhikr Button */}
          <div className="p-4 rounded-3xl ios-glass-card text-xs space-y-2.5 shadow-md">
            <p className="font-semibold text-stone-800 dark:text-stone-200">Custom Target / Dhikr:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Dhikr name..."
                value={customZikr}
                onChange={(e) => setCustomZikr(e.target.value)}
                className="flex-1 p-2 rounded-2xl ios-glass text-stone-900 dark:text-stone-100"
              />
              <input
                type="number"
                min="1"
                max="1000"
                value={customTarget}
                onChange={(e) => setCustomTarget(parseInt(e.target.value, 10) || 33)}
                className="w-16 p-2 rounded-2xl ios-glass text-center font-mono text-stone-900 dark:text-stone-100"
              />
              <button
                onClick={() => {
                  setIsCustom(true);
                  setCount(0);
                  setLaps(0);
                }}
                className="px-4 py-2 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold shadow-sm"
              >
                Set
              </button>
            </div>
          </div>
        </div>

        {/* Center / Main Column: Giant Tactile Click Counter */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl sm:rounded-[2.5rem] ios-glass-card shadow-xl relative">
          
          {/* Current Dhikr Arabic Banner */}
          <div className="text-center mb-6">
            <p className="font-arabic text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              {isCustom ? customZikr || 'ذِكْرُ اللَّهِ' : selectedPreset.textAr}
            </p>
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-400">
              {isCustom ? customZikr : selectedPreset.textEn}
            </p>
            <p className="text-xs text-stone-400">
              {isCustom ? 'Custom Remembrance' : selectedPreset.meaning}
            </p>
          </div>

          {/* Giant Click Counter Button */}
          <button
            id="tasbih-main-tap-button"
            onClick={handleIncrement}
            className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-950 text-white shadow-2xl hover:shadow-emerald-900/30 transition-all duration-100 active:scale-95 flex flex-col items-center justify-center select-none ring-8 ring-emerald-500/20 group cursor-pointer border border-white/20"
          >
            {/* Inner Ring with Progress */}
            <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold mb-1">
              Tap Anywhere
            </span>
            <span className="font-mono text-6xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
              {count}
            </span>
            <span className="text-xs font-mono text-emerald-200/80 mt-1">
              Target: {currentTarget} • Lap: #{laps + 1}
            </span>
          </button>

          {/* Progress bar towards target */}
          <div className="w-64 sm:w-80 mt-6">
            <div className="flex justify-between text-xs font-semibold text-stone-500 mb-1">
              <span>Current Round</span>
              <span className="font-mono">{count} / {currentTarget} ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-stone-200/50 dark:bg-stone-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-800 transition-all duration-200 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Today's Stats & Total Counts */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-8 pt-6 border-t border-stone-200/50 dark:border-stone-800/50 text-center">
            <div className="p-3.5 rounded-2xl ios-glass">
              <p className="text-[11px] text-stone-500">Today's Total Dhikr</p>
              <p className="text-lg font-bold font-mono text-emerald-800 dark:text-emerald-400 mt-0.5">
                {todayCount.toLocaleString()}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl ios-glass">
              <p className="text-[11px] text-stone-500">All-Time Remembrance</p>
              <p className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
                {(tasbihStats.totalCount || 0).toLocaleString()}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
