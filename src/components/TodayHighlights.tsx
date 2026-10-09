import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark as BookmarkIcon, 
  Volume2, 
  ArrowRight,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { AUTHENTIC_HADITHS } from '../data/hadiths';
import { AUTHENTIC_DUAS } from '../data/duas';
import { NAMES_OF_ALLAH } from '../data/namesOfAllah';
import { DAILY_AYAHS, DailyAyahItem } from '../data/dailyAyahs';
import { StorageService } from '../services/storageService';
import { LanguageCode } from '../utils/i18n';

interface TodayHighlightsProps {
  onNavigate: (tab: string, extra?: any) => void;
  lang: LanguageCode;
  onPlayAyahAudio?: (surah: number, ayah: number) => void;
  isPlayingAudio?: boolean;
}

export const TodayHighlights: React.FC<TodayHighlightsProps> = ({
  onNavigate,
  lang,
  onPlayAyahAudio,
  isPlayingAudio
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedItems, setBookmarkedItems] = useState<Record<string, boolean>>({});
  const [dayOffset, setDayOffset] = useState<number>(0);

  // Compute current day of year for deterministic daily rotation
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const baseDayOfYear = Math.floor(diff / oneDay);
  const currentDayIndex = Math.max(0, baseDayOfYear + dayOffset);

  // 1. Ayah of the Day - Rotates daily
  const todayAyah: DailyAyahItem = useMemo(() => {
    const idx = currentDayIndex % DAILY_AYAHS.length;
    return DAILY_AYAHS[idx];
  }, [currentDayIndex]);

  // 2. Hadith of the Day - Rotates daily
  const dailyHadith = useMemo(() => {
    const idx = (currentDayIndex * 2) % AUTHENTIC_HADITHS.length;
    return AUTHENTIC_HADITHS[idx];
  }, [currentDayIndex]);

  // 3. Daily Supplication (Dua) - Rotates daily, ensuring "For Goodness in This World & the Hereafter" is featured
  const dailyDua = useMemo(() => {
    // When offset is 0, give priority to Rabbana Atina fid-dunya or rotate across AUTHENTIC_DUAS
    const rabbanaDua = AUTHENTIC_DUAS.find(d => d.id === 'dua-rabbana-dunya') || AUTHENTIC_DUAS[0];
    if (dayOffset === 0) {
      // Default to "For Goodness in This World & the Hereafter" or cycle
      const cycleIndex = currentDayIndex % 7;
      if (cycleIndex === 0) return rabbanaDua;
    }
    const idx = (currentDayIndex * 3) % AUTHENTIC_DUAS.length;
    return AUTHENTIC_DUAS[idx];
  }, [currentDayIndex, dayOffset]);

  // 4. Asma ul Husna Spotlight - Rotates daily through all 99 names
  const dailyName = useMemo(() => {
    const idx = (currentDayIndex * 5) % NAMES_OF_ALLAH.length;
    return NAMES_OF_ALLAH[idx];
  }, [currentDayIndex]);

  const lastRead = StorageService.getLastRead();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleBookmark = (type: 'ayah' | 'hadith' | 'dua', ref: string, title: string, snippet: string) => {
    if (StorageService.isBookmarked(ref)) {
      const bms = StorageService.getBookmarks();
      const match = bms.find(b => b.reference === ref);
      if (match) StorageService.removeBookmark(match.id);
      setBookmarkedItems(prev => ({ ...prev, [ref]: false }));
    } else {
      StorageService.addBookmark({ type, reference: ref, title, snippet });
      setBookmarkedItems(prev => ({ ...prev, [ref]: true }));
    }
  };

  return (
    <section id="today-highlights-section" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Continue Reading Card if user has history - iOS Glassified */}
      <div 
        id="continue-reading-banner"
        onClick={() => onNavigate('quran', { surah: lastRead.surahNumber, ayah: lastRead.ayahNumber })}
        className="mb-8 p-5 sm:p-6 rounded-3xl ios-glass-card text-stone-900 dark:text-stone-100 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:shadow-2xl transition-all group hover:scale-[1.01] border border-emerald-800/20"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shadow-sm border border-emerald-400/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
              Continue Your Qur'an Journey
            </span>
            <h3 className="text-base sm:text-lg font-bold">
              Surah {lastRead.surahName} — Ayah {lastRead.ayahNumber}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Resume your reading position and track your spiritual progress
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto px-4 py-2 rounded-full bg-emerald-800 text-white text-xs font-semibold group-hover:bg-emerald-700 transition-colors shadow-sm">
          <span>Resume Reading</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Header with Daily Rotation Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-sans">
            Daily Spiritual Reflections (روزانہ کا اسلامی انتخاب)
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ios-glass text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-700/50 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>Rotates Every 24h • Day {baseDayOfYear + dayOffset}</span>
          </div>

          <button
            onClick={() => setDayOffset(prev => prev + 1)}
            className="px-3 py-1.5 rounded-full ios-glass hover:bg-emerald-500/15 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            title="Cycle next daily reflection"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
            <span>Next Day</span>
          </button>
        </div>
      </div>

      {/* 4 Glassified Highlight Cards: Top Row (Ayah & Hadith) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Today's Ayah Card - iOS Glassified */}
        <div 
          id="card-todays-ayah" 
          className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all border border-emerald-800/20"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-400/30">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
                    Ayah of the Day
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    {todayAyah.theme}
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full ios-glass text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-700/50">
                {todayAyah.reference}
              </span>
            </div>

            {/* Arabic Quranic text */}
            <p className="font-arabic text-xl sm:text-2xl text-right leading-loose text-stone-900 dark:text-stone-50 mb-5 dir-rtl">
              {todayAyah.arabic}
            </p>

            {/* English translation */}
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
              "{todayAyah.translationEn}"
            </p>

            {/* Urdu translation in Jameel Noori Nastaleeq */}
            <p className="font-urdu text-sm sm:text-base text-stone-700 dark:text-stone-300 text-right leading-loose mb-4 dir-rtl">
              {todayAyah.translationUr}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between">
            <button
              id="play-todays-ayah-btn"
              onClick={() => onPlayAyahAudio?.(todayAyah.surahNumber, todayAyah.ayahNumber)}
              className="px-3.5 py-1.5 rounded-full ios-glass text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-500/15 transition-colors flex items-center gap-1.5 border border-emerald-400/20"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen Recitation</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                id="copy-todays-ayah-btn"
                onClick={() => handleCopy(`${todayAyah.arabic}\n\n"${todayAyah.translationEn}"\n\n${todayAyah.translationUr}\n\n— ${todayAyah.reference}`, 'ayah-day')}
                className="p-2 rounded-full ios-glass text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                title="Copy Ayah with Urdu & English"
              >
                {copiedId === 'ayah-day' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                id="bookmark-todays-ayah-btn"
                onClick={() => toggleBookmark('ayah', todayAyah.reference, `${todayAyah.surahName} ${todayAyah.ayahNumber}`, todayAyah.translationEn)}
                className={`p-2 rounded-full ios-glass transition-colors ${StorageService.isBookmarked(todayAyah.reference) ? 'text-amber-500 bg-amber-500/20' : 'text-stone-500 hover:text-stone-800'}`}
                title="Bookmark Ayah"
              >
                <BookmarkIcon className="w-4 h-4" />
              </button>

              <button
                id="view-full-surah-btn"
                onClick={() => onNavigate('quran', { surah: todayAyah.surahNumber })}
                className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline ml-2"
              >
                Read Full Surah →
              </button>
            </div>
          </div>
        </div>

        {/* 2. Daily Hadith Card - iOS Glassified */}
        <div 
          id="card-daily-hadith" 
          className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all border border-emerald-800/20"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-400/30">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Hadith of the Day
                </span>
              </div>
              <span className="text-[11px] font-semibold px-3 py-0.5 rounded-full ios-glass text-emerald-800 dark:text-emerald-300 border border-emerald-400/30">
                {dailyHadith.grading}
              </span>
            </div>

            {/* Hadith Arabic */}
            <p className="font-arabic text-lg sm:text-xl text-right leading-loose text-stone-900 dark:text-stone-50 mb-4 dir-rtl">
              {dailyHadith.arabicText}
            </p>

            {/* Hadith English */}
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
              "{dailyHadith.englishText}"
            </p>

            {/* Urdu text in Jameel Noori Nastaleeq */}
            {dailyHadith.urduText && (
              <p className="font-urdu text-sm sm:text-base text-stone-700 dark:text-stone-300 text-right leading-loose mb-3 dir-rtl">
                {dailyHadith.urduText}
              </p>
            )}

            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              Source: {dailyHadith.reference}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              Narrated by {dailyHadith.narrator || 'Sahabi (RA)'}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                id="copy-daily-hadith-btn"
                onClick={() => handleCopy(`${dailyHadith.arabicText}\n\n"${dailyHadith.englishText}"\n\n${dailyHadith.urduText || ''}\n\n— ${dailyHadith.reference}`, 'hadith-day')}
                className="p-2 rounded-full ios-glass text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                title="Copy Hadith"
              >
                {copiedId === 'hadith-day' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                id="bookmark-daily-hadith-btn"
                onClick={() => toggleBookmark('hadith', dailyHadith.reference, dailyHadith.bookName, dailyHadith.englishText)}
                className={`p-2 rounded-full ios-glass transition-colors ${StorageService.isBookmarked(dailyHadith.reference) ? 'text-amber-500 bg-amber-500/20' : 'text-stone-500 hover:text-stone-800'}`}
                title="Bookmark Hadith"
              >
                <BookmarkIcon className="w-4 h-4" />
              </button>

              <button
                id="explore-hadith-library-btn"
                onClick={() => onNavigate('hadith')}
                className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline ml-2"
              >
                Hadith Library →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4 Glassified Highlight Cards: Bottom Row (Daily Supplication & 99 Names Spotlight) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* 3. Daily Supplication (Dua): For Goodness in This World & the Hereafter - iOS Glassified */}
        <div 
          id="card-daily-dua" 
          className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all border border-emerald-800/20"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-rose-500/15 text-rose-500 border border-rose-400/30">
                  <Heart className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 block">
                    Daily Supplication
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    {dailyDua.titleEn}
                  </span>
                </div>
              </div>
              <span className="text-[11px] px-3 py-0.5 rounded-full ios-glass text-stone-600 dark:text-stone-400 border border-stone-200/50">
                {dailyDua.category}
              </span>
            </div>

            {/* Arabic Text */}
            <p className="font-arabic text-xl text-right leading-loose text-stone-900 dark:text-stone-100 mb-2 dir-rtl">
              {dailyDua.arabicText}
            </p>

            {/* Transliteration */}
            <p className="text-xs text-stone-500 dark:text-stone-400 italic mb-2">
              {dailyDua.transliteration}
            </p>

            {/* English translation */}
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mb-2 leading-relaxed">
              "{dailyDua.translationEn}"
            </p>

            {/* Urdu translation in Jameel Noori Nastaleeq */}
            {dailyDua.translationUr && (
              <p className="font-urdu text-sm sm:text-base text-stone-700 dark:text-stone-300 text-right leading-loose mb-3 dir-rtl">
                {dailyDua.translationUr}
              </p>
            )}

            <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
              Reference: {dailyDua.reference}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between">
            <button
              onClick={() => onNavigate('duas')}
              className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
            >
              Browse Masnoon Duas →
            </button>
            <button
              onClick={() => handleCopy(`${dailyDua.arabicText}\n\n${dailyDua.translationEn}\n\n${dailyDua.translationUr || ''}\n— Ref: ${dailyDua.reference}`, 'dua-day')}
              className="p-2 rounded-full ios-glass text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              title="Copy Supplication"
            >
              {copiedId === 'dua-day' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 4. Asma ul Husna Spotlight - iOS Glassified */}
        <div 
          id="card-name-spotlight" 
          className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all border border-emerald-800/20"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-amber-500/15 text-amber-500 border border-amber-400/30">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Asma ul Husna Spotlight
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full ios-glass text-amber-800 dark:text-amber-300 border border-amber-400/30">
                #{dailyName.number} of 99
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-3">
              <span className="font-arabic text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-300">
                {dailyName.arabic}
              </span>
              <div className="text-right">
                <p className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">{dailyName.transliteration}</p>
                <p className="text-xs text-stone-600 dark:text-stone-400">{dailyName.meaningEn}</p>
                {dailyName.meaningUr && (
                  <p className="font-urdu text-xs sm:text-sm text-stone-600 dark:text-stone-400 dir-rtl mt-0.5">
                    {dailyName.meaningUr}
                  </p>
                )}
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
              {dailyName.explanation}
            </p>

            <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold">
              Quranic Citation: {dailyName.quranReference}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between">
            <button
              onClick={() => onNavigate('names')}
              className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
            >
              Explore 99 Names of Allah →
            </button>
            <button
              onClick={() => handleCopy(`${dailyName.arabic} — ${dailyName.transliteration}\nMeaning: ${dailyName.meaningEn} (${dailyName.meaningUr || ''})\nCitation: ${dailyName.quranReference}`, 'name-spotlight')}
              className="p-2 rounded-full ios-glass text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              title="Copy Name of Allah"
            >
              {copiedId === 'name-spotlight' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
