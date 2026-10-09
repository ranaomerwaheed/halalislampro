import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  Copy, 
  Check, 
  Bookmark as BookmarkIcon, 
  Share2, 
  FileText, 
  ShieldCheck, 
  Filter,
  ArrowRight
} from 'lucide-react';
import { AUTHENTIC_HADITHS } from '../data/hadiths';
import { StorageService } from '../services/storageService';
import { Hadith } from '../types';
import { LanguageCode } from '../utils/i18n';

interface HadithSectionProps {
  lang: LanguageCode;
}

const COLLECTIONS = [
  { id: 'all', name: 'All Collections', count: 12 },
  { id: 'bukhari', name: 'Sahih al-Bukhari', count: 4 },
  { id: 'muslim', name: 'Sahih Muslim', count: 3 },
  { id: 'tirmidhi', name: 'Jami\' at-Tirmidhi', count: 2 },
  { id: 'abudawud', name: 'Sunan Abi Dawud', count: 2 },
  { id: 'nawawi', name: '40 Hadith Nawawi', count: 2 },
];

export const HadithSection: React.FC<HadithSectionProps> = ({ lang }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGrading, setSelectedGrading] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeNoteHadith, setActiveNoteHadith] = useState<Hadith | null>(null);
  const [noteContent, setNoteContent] = useState<string>('');
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    AUTHENTIC_HADITHS.forEach(h => {
      map[h.reference] = StorageService.isBookmarked(h.reference);
    });
    return map;
  });

  const handleCopy = (hadith: Hadith) => {
    const text = `${hadith.arabicText}\n\n"${hadith.englishText}"\n\nNarrated by: ${hadith.narrator || 'Sahabi (RA)'}\nSource: ${hadith.reference} [Grading: ${hadith.grading}] — Deen App`;
    navigator.clipboard.writeText(text);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleBookmark = (hadith: Hadith) => {
    const ref = hadith.reference;
    if (bookmarkedMap[ref]) {
      const bms = StorageService.getBookmarks();
      const match = bms.find(b => b.reference === ref);
      if (match) StorageService.removeBookmark(match.id);
      setBookmarkedMap(prev => ({ ...prev, [ref]: false }));
    } else {
      StorageService.addBookmark({
        type: 'hadith',
        reference: ref,
        title: `${hadith.bookName} (${hadith.hadithNumber})`,
        snippet: hadith.englishText
      });
      setBookmarkedMap(prev => ({ ...prev, [ref]: true }));
    }
  };

  const handleSaveNote = () => {
    if (!activeNoteHadith) return;
    StorageService.saveNote(
      'hadith',
      activeNoteHadith.reference,
      `Reflection on Hadith ${activeNoteHadith.hadithNumber}`,
      noteContent
    );
    setActiveNoteHadith(null);
    setNoteContent('');
  };

  const filteredHadiths = AUTHENTIC_HADITHS.filter(h => {
    const matchesCollection = 
      selectedCollection === 'all' || 
      h.collectionId.toLowerCase() === selectedCollection.toLowerCase();

    const matchesGrading = 
      selectedGrading === 'all' || 
      h.grading.toLowerCase().includes(selectedGrading.toLowerCase());

    const matchesSearch = 
      h.englishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.urduText && h.urduText.includes(searchQuery)) ||
      h.arabicText.includes(searchQuery) ||
      h.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.chapterName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCollection && matchesGrading && matchesSearch;
  });

  return (
    <section id="hadith-library-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            <BookMarked className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
            Authentic Hadith Library (الحديث الشريف)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Kutub al-Sittah and foundational works with authentic Sanad (chains of narration), reliable Arabic text, English, and Urdu translations.
        </p>
      </div>

      {/* Collection Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {COLLECTIONS.map(col => (
          <button
            key={col.id}
            id={`collection-pill-${col.id}`}
            onClick={() => setSelectedCollection(col.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCollection === col.id
                ? 'bg-emerald-800 text-white shadow-md'
                : 'ios-glass text-stone-700 dark:text-stone-300 hover:bg-white/40'
            }`}
          >
            <span>{col.name}</span>
          </button>
        ))}
      </div>

      {/* Search & Grading Filters Bar - iOS Glassified */}
      <div className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            id="hadith-search-input"
            type="text"
            placeholder="Search keywords, narrator, or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl ios-glass border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Grading:</span>
          </div>
          <select
            value={selectedGrading}
            onChange={(e) => setSelectedGrading(e.target.value)}
            className="px-3 py-1.5 rounded-xl ios-glass border border-stone-200 dark:border-stone-700 text-xs font-semibold"
          >
            <option value="all">All Gradings</option>
            <option value="sahih">Sahih (صحيح)</option>
            <option value="hasan">Hasan (حسن)</option>
          </select>
        </div>
      </div>

      {/* Hadith List */}
      <div className="space-y-6">
        {filteredHadiths.map(hadith => {
          const isBm = bookmarkedMap[hadith.reference];
          return (
            <div
              key={hadith.id}
              id={`hadith-card-${hadith.id}`}
              className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg hover:shadow-xl transition-all space-y-4"
            >
              {/* Header: Book, Chapter, Hadith #, and Grading Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {hadith.bookName}
                  </span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                    {hadith.chapterName}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
                    #{hadith.hadithNumber}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{hadith.grading}</span>
                  </span>
                </div>
              </div>

              {/* Arabic Hadith Text */}
              <p className="font-arabic text-xl sm:text-2xl text-right leading-loose text-stone-900 dark:text-stone-50 dir-rtl">
                {hadith.arabicText}
              </p>

              {/* English Translation */}
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                "{hadith.englishText}"
              </p>

              {/* Urdu Translation */}
              {hadith.urduText && (
                <p className="font-urdu text-sm sm:text-base text-stone-600 dark:text-stone-400 text-right leading-relaxed dir-rtl">
                  {hadith.urduText}
                </p>
              )}

              {/* Footer: Narrator, Source Reference, and Action Buttons */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-stone-500 space-x-2">
                  <span>Narrated by: <strong className="text-stone-700 dark:text-stone-300">{hadith.narrator || 'Sahabi (RA)'}</strong></span>
                  <span>•</span>
                  <span>Source: <strong className="text-emerald-800 dark:text-emerald-400">{hadith.reference}</strong></span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(hadith)}
                    className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    title="Copy Hadith"
                  >
                    {copiedId === hadith.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => toggleBookmark(hadith)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBm ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                    title="Bookmark Hadith"
                  >
                    <BookmarkIcon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveNoteHadith(hadith);
                      const existingNote = StorageService.getNotes().find(n => n.reference === hadith.reference);
                      setNoteContent(existingNote ? existingNote.note : '');
                    }}
                    className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    title="Add Reflection Note"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note Modal */}
      {activeNoteHadith && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                Personal Note — {activeNoteHadith.bookName} #{activeNoteHadith.hadithNumber}
              </h3>
              <button onClick={() => setActiveNoteHadith(null)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <p className="text-xs text-stone-500 italic line-clamp-2">
              "{activeNoteHadith.englishText}"
            </p>

            <textarea
              rows={4}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Record your reflections on this Hadith and actions to implement..."
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveNoteHadith(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
