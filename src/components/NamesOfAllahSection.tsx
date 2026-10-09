import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Volume2, 
  Copy, 
  Check, 
  BookOpen, 
  Info,
  Heart
} from 'lucide-react';
import { NAMES_OF_ALLAH, NameOfAllah } from '../data/namesOfAllah';
import { LanguageCode } from '../utils/i18n';

interface NamesOfAllahSectionProps {
  lang: LanguageCode;
}

export const NamesOfAllahSection: React.FC<NamesOfAllahSectionProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedName, setSelectedName] = useState<NameOfAllah | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const handleCopy = (item: NameOfAllah) => {
    const text = `#${item.number}: ${item.arabic} (${item.transliteration})\nMeaning: ${item.meaningEn}\nExplanation: ${item.explanation}\nQuranic Occurrence: ${item.quranReference} — Deen App`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.number);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSpeak = (item: NameOfAllah) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (speakingId === item.number) {
        setSpeakingId(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(item.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(item.number);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredNames = NAMES_OF_ALLAH.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.transliteration.toLowerCase().includes(q) ||
      item.meaningEn.toLowerCase().includes(q) ||
      item.arabic.includes(searchQuery) ||
      (item.meaningUr && item.meaningUr.includes(searchQuery)) ||
      item.number.toString().includes(q)
    );
  });

  return (
    <section id="names-of-allah-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              99 Names of Allah (أسماء الله الحسنى)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            "And to Allah belong the best names, so invoke Him by them." (Surah Al-A'raf 7:180)
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            id="names-of-allah-search"
            type="text"
            placeholder="Search Name or meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl ios-glass text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Grid of 99 Names */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredNames.map(item => (
          <div
            key={item.number}
            id={`allah-name-card-${item.number}`}
            onClick={() => setSelectedName(item)}
            className="p-5 rounded-3xl ios-glass-card shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group hover:scale-[1.02]"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <span className="font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-full ios-glass text-stone-700 dark:text-stone-300">
                  #{item.number}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(item);
                  }}
                  className={`p-1.5 rounded-full ios-glass transition-colors ${
                    speakingId === item.number ? 'text-emerald-800 dark:text-emerald-400 bg-emerald-500/20' : 'text-stone-400 hover:text-stone-800 dark:hover:text-stone-100'
                  }`}
                  title="Pronounce"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Arabic Name */}
              <p className="font-arabic text-2xl text-center text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors py-2 dir-rtl">
                {item.arabic}
              </p>

              {/* Transliteration */}
              <p className="text-center font-bold text-xs text-stone-800 dark:text-stone-200">
                {item.transliteration}
              </p>
            </div>

            {/* Meaning in English & Urdu */}
            <div className="pt-2.5 mt-2.5 border-t border-stone-200/50 dark:border-stone-800/50 text-center">
              <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                {item.meaningEn}
              </p>
              {item.meaningUr && (
                <p className="font-urdu text-[11px] text-stone-400 dir-rtl truncate mt-0.5">
                  {item.meaningUr}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Name Details Modal */}
      {selectedName && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 sm:p-7 rounded-3xl ios-glass-card shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-800 dark:text-amber-300 font-bold font-mono text-sm">
                  #{selectedName.number}
                </span>
                <div>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">{selectedName.transliteration}</h3>
                  <p className="text-xs text-stone-500">{selectedName.meaningEn}</p>
                </div>
              </div>
              <button onClick={() => setSelectedName(null)} className="p-2 rounded-full ios-glass text-stone-400 hover:text-stone-700">✕</button>
            </div>

            {/* Big Arabic Display */}
            <div className="py-5 text-center ios-glass rounded-2xl">
              <p className="font-arabic text-4xl text-stone-900 dark:text-stone-100 dir-rtl">
                {selectedName.arabic}
              </p>
              {selectedName.meaningUr && (
                <p className="font-urdu text-sm text-stone-500 mt-1 dir-rtl">
                  {selectedName.meaningUr}
                </p>
              )}
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
              <p><strong>Reflection & Explanation:</strong> {selectedName.explanation}</p>
              <p className="text-emerald-800 dark:text-emerald-400 font-semibold pt-1">
                Quranic Occurrence: {selectedName.quranReference}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200/50 dark:border-stone-800/50">
              <button
                onClick={() => handleCopy(selectedName)}
                className="px-4 py-2 rounded-full ios-glass text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5"
              >
                {copiedId === selectedName.number ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>

              <button
                onClick={() => handleSpeak(selectedName)}
                className="px-4 py-2 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
