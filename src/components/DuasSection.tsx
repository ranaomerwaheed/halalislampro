import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  Copy, 
  Check, 
  Bookmark as BookmarkIcon, 
  Volume2, 
  Sparkles, 
  BookOpen,
  Share2
} from 'lucide-react';
import { AUTHENTIC_DUAS } from '../data/duas';
import { StorageService } from '../services/storageService';
import { Dua } from '../types';
import { LanguageCode } from '../utils/i18n';

interface DuasSectionProps {
  lang: LanguageCode;
}

const DUA_CATEGORIES = [
  'All',
  'Daily Life',
  'Morning & Evening',
  'Protection & Evil Eye',
  'Anxiety & Distress',
  'Forgiveness & Repentance',
  'Quranic Duas',
  'Family & Parents',
  'Health & Healing',
  'Sleep & Waking'
];

export const DuasSection: React.FC<DuasSectionProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    AUTHENTIC_DUAS.forEach(d => {
      map[d.reference] = StorageService.isBookmarked(d.reference);
    });
    return map;
  });

  const handleCopy = (dua: Dua) => {
    const text = `${dua.arabicText}\n\nTransliteration: ${dua.transliteration}\n\nTranslation: "${dua.translationEn}"\n\nBenefit: ${dua.benefit || 'Prophetic Supplication'}\nReference: ${dua.reference} — Deen App`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleBookmark = (dua: Dua) => {
    const ref = dua.reference;
    if (bookmarkedMap[ref]) {
      const bms = StorageService.getBookmarks();
      const match = bms.find(b => b.reference === ref);
      if (match) StorageService.removeBookmark(match.id);
      setBookmarkedMap(prev => ({ ...prev, [ref]: false }));
    } else {
      StorageService.addBookmark({
        type: 'dua',
        reference: ref,
        title: dua.titleEn,
        snippet: dua.translationEn
      });
      setBookmarkedMap(prev => ({ ...prev, [ref]: true }));
    }
  };

  // Simple Arabic speech synthesis fallback for pronunciation
  const handleSpeak = (dua: Dua) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeakingId === dua.id) {
        setIsSpeakingId(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(dua.arabicText);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setIsSpeakingId(null);
      utterance.onerror = () => setIsSpeakingId(null);
      setIsSpeakingId(dua.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredDuas = AUTHENTIC_DUAS.filter(d => {
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesSearch = 
      d.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.translationEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.arabicText.includes(searchQuery) ||
      (d.translationUr && d.translationUr.includes(searchQuery)) ||
      d.reference.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="duas-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
            <Heart className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
            Islamic Duas & Supplications (الأدعية المأثورة)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Essential Quranic and Prophetic supplications with Arabic, transliteration, English & Urdu translations, and verified references.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {DUA_CATEGORIES.map(cat => (
          <button
            key={cat}
            id={`dua-category-${cat}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-md'
                : 'ios-glass text-stone-700 dark:text-stone-300 hover:bg-white/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
        <input
          id="duas-search-input"
          type="text"
          placeholder="Search Duas by occasion, English, or Arabic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl ios-glass border border-stone-200/60 dark:border-stone-800/60 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden text-stone-900 dark:text-stone-100"
        />
      </div>

      {/* Duas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDuas.map(dua => {
          const isBm = bookmarkedMap[dua.reference];
          const isSpeaking = isSpeakingId === dua.id;

          return (
            <div
              key={dua.id}
              id={`dua-card-${dua.id}`}
              className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-4 hover:scale-[1.01]"
            >
              <div>
                {/* Card Header: Category & Title */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                      {dua.category}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mt-1">
                      {dua.titleEn}
                    </h3>
                  </div>

                  {dua.repeatCount && (
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ios-glass text-stone-600 dark:text-stone-300">
                      Recite {dua.repeatCount}x
                    </span>
                  )}
                </div>

                {/* Arabic Text */}
                <p className="font-arabic text-xl sm:text-2xl text-right leading-loose text-stone-900 dark:text-stone-50 my-3 dir-rtl">
                  {dua.arabicText}
                </p>

                {/* Transliteration */}
                <p className="text-xs text-stone-500 dark:text-stone-400 italic mb-2">
                  {dua.transliteration}
                </p>

                {/* English Translation */}
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  "{dua.translationEn}"
                </p>

                {/* Urdu Translation */}
                {dua.translationUr && (
                  <p className="font-urdu text-sm text-stone-600 dark:text-stone-400 text-right leading-relaxed mb-3 dir-rtl">
                    {dua.translationUr}
                  </p>
                )}

                {/* Benefit/Virtue Note */}
                {dua.benefit && (
                  <div className="p-3.5 rounded-2xl ios-glass border border-amber-300/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 mt-0.5 text-amber-600 shrink-0" />
                    <span><strong>Virtue:</strong> {dua.benefit}</span>
                  </div>
                )}
              </div>

              {/* Card Footer: Source & Actions */}
              <div className="pt-3 border-t border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                  Ref: {dua.reference}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSpeak(dua)}
                    className={`p-2 rounded-full transition-colors ${
                      isSpeaking 
                        ? 'bg-emerald-800 text-white' 
                        : 'ios-glass text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                    title="Pronounce Dua"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopy(dua)}
                    className="p-2 rounded-full ios-glass text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    title="Copy Dua with Reference"
                  >
                    {copiedId === dua.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => toggleBookmark(dua)}
                    className={`p-2 rounded-full transition-colors ${
                      isBm ? 'text-amber-500 bg-amber-500/20' : 'ios-glass text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                    title="Bookmark Dua"
                  >
                    <BookmarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
