import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Heart, 
  Sparkles, 
  BookMarked, 
  Compass, 
  Clock, 
  ChevronRight,
  History
} from 'lucide-react';
import { SURAH_LIST } from '../data/surahs';
import { AUTHENTIC_HADITHS } from '../data/hadiths';
import { AUTHENTIC_DUAS } from '../data/duas';
import { NAMES_OF_ALLAH } from '../data/namesOfAllah';
import { SEERAH_CHAPTERS } from '../data/seerah';
import { KNOWLEDGE_ARTICLES } from '../data/knowledge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string, metadata?: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'quran' | 'hadith' | 'dua' | 'names' | 'seerah'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const s = localStorage.getItem('deen_recent_searches_v1');
      return s ? JSON.parse(s) : ['Ayat al-Kursi', 'Patience in Hadith', 'Fasting Niyyah', 'Ar-Rahman'];
    } catch {
      return ['Ayat al-Kursi', 'Patience in Hadith', 'Fasting Niyyah', 'Ar-Rahman'];
    }
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase())].slice(0, 8);
    setRecentSearches(updated);
    localStorage.setItem('deen_recent_searches_v1', JSON.stringify(updated));
  };

  const q = query.trim().toLowerCase();

  // Search Results
  const results: { type: string; title: string; subtitle: string; snippet?: string; target: string; meta?: any }[] = [];

  if (q.length > 1) {
    // 1. Quran Surahs
    if (activeTab === 'all' || activeTab === 'quran') {
      SURAH_LIST.forEach(s => {
        if (
          s.englishName.toLowerCase().includes(q) ||
          s.name.includes(query) ||
          s.englishNameTranslation.toLowerCase().includes(q) ||
          s.number.toString() === q
        ) {
          results.push({
            type: 'Qur\'an',
            title: `Surah ${s.englishName} (${s.name})`,
            subtitle: `${s.englishNameTranslation} • ${s.numberOfAyahs} Ayahs`,
            target: 'quran',
            meta: { surahNumber: s.number }
          });
        }
      });
    }

    // 2. Hadith
    if (activeTab === 'all' || activeTab === 'hadith') {
      AUTHENTIC_HADITHS.forEach(h => {
        if (
          h.englishText.toLowerCase().includes(q) ||
          h.arabicText.includes(query) ||
          h.reference.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'Hadith',
            title: `${h.bookName} #${h.hadithNumber}`,
            subtitle: `Source: ${h.reference} [${h.grading}]`,
            snippet: h.englishText,
            target: 'hadith'
          });
        }
      });
    }

    // 3. Duas
    if (activeTab === 'all' || activeTab === 'dua') {
      AUTHENTIC_DUAS.forEach(d => {
        if (
          d.titleEn.toLowerCase().includes(q) ||
          d.translationEn.toLowerCase().includes(q) ||
          d.arabicText.includes(query) ||
          d.category.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'Dua',
            title: d.titleEn,
            subtitle: `${d.category} • Ref: ${d.reference}`,
            snippet: d.translationEn,
            target: 'duas'
          });
        }
      });
    }

    // 4. Names of Allah
    if (activeTab === 'all' || activeTab === 'names') {
      NAMES_OF_ALLAH.forEach(n => {
        if (
          n.transliteration.toLowerCase().includes(q) ||
          n.meaningEn.toLowerCase().includes(q) ||
          n.arabic.includes(query) ||
          n.number.toString() === q
        ) {
          results.push({
            type: '99 Names',
            title: `#${n.number}: ${n.arabic} — ${n.transliteration}`,
            subtitle: n.meaningEn,
            snippet: n.explanation,
            target: 'names'
          });
        }
      });
    }

    // 5. Seerah
    if (activeTab === 'all' || activeTab === 'seerah') {
      SEERAH_CHAPTERS.forEach(sc => {
        if (
          sc.titleEn.toLowerCase().includes(q) ||
          sc.summary.toLowerCase().includes(q) ||
          sc.period.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'Seerah',
            title: sc.titleEn,
            subtitle: sc.period,
            snippet: sc.summary,
            target: 'seerah'
          });
        }
      });
    }

    // 6. Knowledge
    if (activeTab === 'all') {
      KNOWLEDGE_ARTICLES.forEach(ka => {
        if (
          ka.titleEn.toLowerCase().includes(q) ||
          ka.content.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'Knowledge',
            title: ka.titleEn,
            subtitle: `${ka.category} • ${ka.readTimeMinutes} min read`,
            snippet: ka.content.slice(0, 150) + '...',
            target: 'knowledge'
          });
        }
      });
    }
  }

  const handleSelectResult = (r: typeof results[0]) => {
    saveSearch(query);
    onNavigate(r.target, r.meta);
    onClose();
  };

  return (
    <div 
      id="global-islamic-search-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24"
    >
      <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-800 dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Qur'an, Hadith, Duas, 99 Names, Seerah..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-hidden text-stone-900 dark:text-stone-100 placeholder-stone-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-stone-400 hover:text-stone-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose} 
            className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
          >
            ESC
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-stone-50 dark:bg-stone-850 border-b border-stone-200 dark:border-stone-800 overflow-x-auto no-scrollbar">
          {(['all', 'quran', 'hadith', 'dua', 'names', 'seerah'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {tab === 'all' ? 'All Content' : tab}
            </button>
          ))}
        </div>

        {/* Search Content Body */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {query.length <= 1 ? (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" /> Recent & Suggested Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(term);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              No verified records matched "{query}". Try searching in English or Arabic keywords.
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-stone-400 mb-2">Found {results.length} authentic records:</p>
              {results.map((r, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectResult(r)}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-850 hover:bg-emerald-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-all cursor-pointer flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {r.type}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {r.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {r.subtitle}
                    </p>
                    {r.snippet && (
                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 pt-1">
                        "{r.snippet}"
                      </p>
                    )}
                  </div>

                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-800 shrink-0 self-center" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
