import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  Check, 
  Copy,
  Volume2
} from 'lucide-react';
import { AUTHENTIC_AZKAR } from '../data/azkar';
import { StorageService } from '../services/storageService';
import { AzkarItem } from '../types';
import { LanguageCode } from '../utils/i18n';

interface AzkarSectionProps {
  lang: LanguageCode;
}

export const AzkarSection: React.FC<AzkarSectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<'morning' | 'evening' | 'after-salah' | 'sleep'>('morning');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'morning', label: 'Morning Azkar (أذكار الصباح)', icon: Sun },
    { id: 'evening', label: 'Evening Azkar (أذكار المساء)', icon: Moon },
    { id: 'after-salah', label: 'After Salah (أذكار بعد الصلاة)', icon: Clock },
    { id: 'sleep', label: 'Before Sleep (أذكار النوم)', icon: Moon }
  ];

  const currentList = AUTHENTIC_AZKAR.filter(a => a.category === activeCategory);

  const handleIncrement = (item: AzkarItem) => {
    const current = counts[item.id] || 0;
    if (current < item.targetCount) {
      const next = current + 1;
      setCounts(prev => ({ ...prev, [item.id]: next }));
      StorageService.incrementTasbih(1);

      // Light haptic vibration if supported
      if ('vibrate' in navigator) {
        navigator.vibrate(next === item.targetCount ? [50, 50, 50] : 30);
      }
    }
  };

  const handleResetItem = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts(prev => ({ ...prev, [itemId]: 0 }));
  };

  const handleResetCategory = () => {
    const newCounts = { ...counts };
    currentList.forEach(item => {
      newCounts[item.id] = 0;
    });
    setCounts(newCounts);
  };

  const handleCopy = (item: AzkarItem) => {
    const text = `${item.arabicText}\n\nTransliteration: ${item.transliteration}\n\nTranslation: "${item.translationEn}"\n\nVirtue: ${item.benefit || ''}\nReference: ${item.reference} [Recite ${item.targetCount}x] — Deen App`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Calculate progress
  const completedCount = currentList.filter(item => (counts[item.id] || 0) >= item.targetCount).length;
  const progressPercent = currentList.length > 0 ? Math.round((completedCount / currentList.length) * 100) : 0;

  return (
    <section id="azkar-dhikr-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              Daily Azkar & Remembrance (الأذكار اليومية)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Fortify your heart with authentic Morning, Evening, and Daily Dhikr prescribed in the Sunnah.
          </p>
        </div>

        <button
          onClick={handleResetCategory}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-semibold text-stone-600 dark:text-stone-300 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset {categories.find(c => c.id === activeCategory)?.label.split(' ')[0]}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`azkar-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`p-3.5 rounded-2xl text-left transition-all flex items-center gap-3 ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-md scale-[1.02]'
                  : 'ios-glass text-stone-700 dark:text-stone-300 hover:bg-white/40'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold font-sans line-clamp-1">{cat.label.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Category Completion Progress Bar */}
      <div className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-md mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                Session Progress: {completedCount} of {currentList.length} Completed
              </span>
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-stone-200/50 dark:bg-stone-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-800 dark:bg-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Azkar Items List */}
      <div className="space-y-5">
        {currentList.map(item => {
          const currentCount = counts[item.id] || 0;
          const isDone = currentCount >= item.targetCount;

          return (
            <div
              key={item.id}
              id={`azkar-card-${item.id}`}
              className={`p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg hover:shadow-xl transition-all ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                    {item.titleEn}
                  </h3>
                  {isDone && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-2 rounded-full ios-glass text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors"
                    title="Copy Dhikr"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => handleResetItem(item.id, e)}
                    className="p-2 rounded-full ios-glass text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors"
                    title="Reset Counter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Arabic Dhikr */}
              <p className="font-arabic text-xl sm:text-2xl text-right leading-loose text-stone-900 dark:text-stone-50 my-4 dir-rtl">
                {item.arabicText}
              </p>

              {/* Transliteration */}
              <p className="text-xs text-stone-500 dark:text-stone-400 italic mb-2">
                {item.transliteration}
              </p>

              {/* English translation */}
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                "{item.translationEn}"
              </p>

              {/* Urdu translation */}
              {item.translationUr && (
                <p className="font-urdu text-sm text-stone-600 dark:text-stone-400 text-right leading-relaxed mb-3 dir-rtl">
                  {item.translationUr}
                </p>
              )}

              {/* Benefit */}
              {item.benefit && (
                <p className="text-xs text-amber-900 dark:text-amber-300 mb-4 ios-glass p-3 rounded-2xl border border-amber-300/40">
                  <strong>Virtue:</strong> {item.benefit}
                </p>
              )}

              {/* Counter Row */}
              <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                  Source: {item.reference}
                </span>

                {/* Tactile Counter Button */}
                <button
                  id={`azkar-counter-btn-${item.id}`}
                  onClick={() => handleIncrement(item)}
                  className={`px-6 py-3 rounded-full font-mono font-bold text-sm transition-all flex items-center justify-center gap-3 active:scale-95 select-none ${
                    isDone
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-400/40'
                      : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  <span className="text-xs uppercase font-sans font-semibold">
                    {isDone ? 'Completed' : 'Tap to Count'}
                  </span>
                  <span className="text-base font-extrabold">
                    {currentCount} / {item.targetCount}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
