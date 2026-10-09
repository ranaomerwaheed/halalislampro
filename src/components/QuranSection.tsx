import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Play, 
  Pause, 
  Bookmark as BookmarkIcon, 
  Copy, 
  Check, 
  Share2, 
  FileText, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  Type, 
  Sparkles, 
  Info,
  Maximize2,
  Minimize2,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { SURAH_LIST, QURAN_RECITERS } from '../data/surahs';
import { QuranService } from '../services/quranService';
import { StorageService } from '../services/storageService';
import { Ayah, SurahDetail } from '../types';
import { LanguageCode } from '../utils/i18n';

interface QuranSectionProps {
  initialSurah?: number;
  initialAyah?: number;
  lang: LanguageCode;
  onPlayAyahAudio: (surahNumber: number, ayahNumber: number, reciterId?: string) => void;
  currentlyPlaying?: { surah: number; ayah: number } | null;
}

export const QuranSection: React.FC<QuranSectionProps> = ({
  initialSurah = 1,
  initialAyah,
  lang,
  onPlayAyahAudio,
  currentlyPlaying
}) => {
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(initialSurah);
  const [surahData, setSurahData] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [activeTab, setActiveTab] = useState<'surahs' | 'juz'>('surahs');
  
  // Reader display controls
  const [fontSize, setFontSize] = useState<number>(28);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [showUrdu, setShowUrdu] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(false);
  const [isWordByWord, setIsWordByWord] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'list' | 'mushaf'>('list');
  const [selectedReciter, setSelectedReciter] = useState<string>('ar.alafasy');
  const [jumpAyahInput, setJumpAyahInput] = useState<string>('');
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [showSurahInfo, setShowSurahInfo] = useState<boolean>(false);
  const [activeNoteAyah, setActiveNoteAyah] = useState<Ayah | null>(null);
  const [noteContent, setNoteContent] = useState<string>('');
  const [activeTafsirAyah, setActiveTafsirAyah] = useState<Ayah | null>(null);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<Record<number, boolean>>({});

  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Fetch Surah data whenever selectedSurahNumber changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    QuranService.getSurah(selectedSurahNumber).then(data => {
      if (isMounted) {
        setSurahData(data);
        setLoading(false);
        // Track last read
        StorageService.setLastRead(data.number, 1, data.englishName);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedSurahNumber]);

  // Jump to specific Ayah if provided
  useEffect(() => {
    if (initialAyah && surahData && ayahRefs.current[initialAyah]) {
      ayahRefs.current[initialAyah]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [initialAyah, surahData]);

  // Check initial bookmarks for current surah
  useEffect(() => {
    if (surahData) {
      const bmMap: Record<number, boolean> = {};
      surahData.ayahs.forEach(ayah => {
        const ref = `Surah ${surahData.englishName} — ${surahData.number}:${ayah.numberInSurah}`;
        bmMap[ayah.numberInSurah] = StorageService.isBookmarked(ref);
      });
      setBookmarkedAyahs(bmMap);
    }
  }, [surahData]);

  const handleJumpToAyah = (e: React.FormEvent) => {
    e.preventDefault();
    const ayahNum = parseInt(jumpAyahInput, 10);
    if (!isNaN(ayahNum) && surahData && ayahNum >= 1 && ayahNum <= surahData.numberOfAyahs) {
      ayahRefs.current[ayahNum]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setJumpAyahInput('');
    }
  };

  const handleCopyAyah = (ayah: Ayah) => {
    if (!surahData) return;
    const ref = `Surah ${surahData.englishName} (${surahData.name}) — ${surahData.number}:${ayah.numberInSurah}`;
    const textToCopy = `${ayah.text}\n\n"${ayah.translationEn}"\n\n— ${ref} [Deen App]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2500);
  };

  const handleToggleBookmark = (ayah: Ayah) => {
    if (!surahData) return;
    const ref = `Surah ${surahData.englishName} — ${surahData.number}:${ayah.numberInSurah}`;
    const isBm = bookmarkedAyahs[ayah.numberInSurah];

    if (isBm) {
      const allBms = StorageService.getBookmarks();
      const target = allBms.find(b => b.reference === ref);
      if (target) StorageService.removeBookmark(target.id);
      setBookmarkedAyahs(prev => ({ ...prev, [ayah.numberInSurah]: false }));
    } else {
      StorageService.addBookmark({
        type: 'ayah',
        reference: ref,
        title: `${surahData.englishName} : Ayah ${ayah.numberInSurah}`,
        snippet: ayah.translationEn
      });
      setBookmarkedAyahs(prev => ({ ...prev, [ayah.numberInSurah]: true }));
    }
  };

  const handleSaveNote = () => {
    if (!surahData || !activeNoteAyah) return;
    const ref = `Surah ${surahData.englishName} — ${surahData.number}:${activeNoteAyah.numberInSurah}`;
    StorageService.saveNote(
      'ayah',
      ref,
      `Reflection on ${surahData.englishName} ${activeNoteAyah.numberInSurah}`,
      noteContent
    );
    setActiveNoteAyah(null);
    setNoteContent('');
  };

  // Filter Surahs
  const filteredSurahs = SURAH_LIST.filter(s => {
    const matchesSearch = 
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      s.number.toString() === searchQuery.trim();

    const matchesType = filterType === 'all' || s.revelationType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <section id="quran-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              The Noble Qur'an (القرآن الكريم)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            114 Surahs with authentic Arabic Uthmani text, verified English & Urdu translations, audio recitation, and word-by-word.
          </p>
        </div>

        {/* Global Surah Selector & Quick Jump */}
        <div className="flex items-center gap-2">
          <select
            id="surah-quick-select"
            value={selectedSurahNumber}
            onChange={(e) => setSelectedSurahNumber(parseInt(e.target.value, 10))}
            className="px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 shadow-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          >
            {SURAH_LIST.map(s => (
              <option key={s.number} value={s.number}>
                {s.number}. {s.englishName} ({s.name})
              </option>
            ))}
          </select>

          <button
            id="surah-info-modal-trigger"
            onClick={() => setShowSurahInfo(!showSurahInfo)}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
            title="Surah Information"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Surahs List & 30 Juz Navigation */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-lg">
            
            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                id="search-surahs-input"
                type="text"
                placeholder="Search Surah name or #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl ios-glass border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-stone-900 dark:text-stone-100"
              />
            </div>

            {/* Filter Pills: All, Meccan, Medinan */}
            <div className="flex items-center gap-1.5 mb-4">
              {(['all', 'Meccan', 'Medinan'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded-lg capitalize transition-all ${
                    filterType === type
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Surah List Scroll Container */}
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredSurahs.map(surah => {
                const isSelected = selectedSurahNumber === surah.number;
                return (
                  <button
                    key={surah.number}
                    id={`surah-item-${surah.number}`}
                    onClick={() => {
                      setSelectedSurahNumber(surah.number);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'hover:bg-emerald-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                      }`}>
                        {surah.number}
                      </span>
                      <div>
                        <p className="text-xs font-bold font-sans line-clamp-1">{surah.englishName}</p>
                        <p className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-stone-500 dark:text-stone-400'}`}>
                          {surah.englishNameTranslation} • {surah.numberOfAyahs}v
                        </p>
                      </div>
                    </div>
                    <span className={`font-arabic text-base ${isSelected ? 'text-white' : 'text-stone-700 dark:text-stone-300'}`}>
                      {surah.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Main Column: Surah Reader */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          
          {/* Reader Controls Toolbar - iOS Glassified */}
          <div className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-lg flex flex-wrap items-center justify-between gap-4">
            
            {/* Display Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="toggle-english-btn"
                onClick={() => setShowEnglish(!showEnglish)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  showEnglish ? 'bg-emerald-800 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                English
              </button>

              <button
                id="toggle-urdu-btn"
                onClick={() => setShowUrdu(!showUrdu)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  showUrdu ? 'bg-emerald-800 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                اردو
              </button>

              <button
                id="toggle-transliteration-btn"
                onClick={() => setShowTransliteration(!showTransliteration)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  showTransliteration ? 'bg-emerald-800 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                Transliteration
              </button>

              <button
                id="toggle-word-by-word-btn"
                onClick={() => setIsWordByWord(!isWordByWord)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isWordByWord ? 'bg-emerald-800 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                Word-by-Word
              </button>

              <button
                id="toggle-view-mode-btn"
                onClick={() => setViewMode(viewMode === 'list' ? 'mushaf' : 'list')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition-all flex items-center gap-1.5"
              >
                <span>{viewMode === 'list' ? 'Mushaf View' : 'Verse by Verse'}</span>
              </button>
            </div>

            {/* Font Size & Reciter Controls */}
            <div className="flex items-center gap-3">
              
              {/* Reciter Selector */}
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <select
                  id="reciter-selector-dropdown"
                  value={selectedReciter}
                  onChange={(e) => setSelectedReciter(e.target.value)}
                  className="px-2 py-1 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200"
                >
                  {QURAN_RECITERS.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size Slider */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Type className="w-3.5 h-3.5" />
                <input
                  type="range"
                  min="22"
                  max="44"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                  className="w-16 accent-emerald-800"
                  title={`Arabic Font Size: ${fontSize}px`}
                />
                <span className="font-mono text-[10px] w-6">{fontSize}px</span>
              </div>

              {/* Jump to Ayah Form */}
              <form onSubmit={handleJumpToAyah} className="flex items-center gap-1">
                <input
                  type="number"
                  placeholder="Ayah #"
                  min="1"
                  max={surahData?.numberOfAyahs || 286}
                  value={jumpAyahInput}
                  onChange={(e) => setJumpAyahInput(e.target.value)}
                  className="w-16 px-2 py-1 text-xs rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center"
                />
                <button
                  type="submit"
                  className="px-2 py-1 text-xs font-semibold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900"
                >
                  Go
                </button>
              </form>
            </div>
          </div>

          {/* Surah Detail Header Card - iOS Glassified */}
          {surahData && (
            <div id="surah-header-banner" className="relative overflow-hidden p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] ios-glass-card bg-gradient-to-br from-emerald-900/90 via-emerald-950/90 to-stone-900/90 text-white shadow-xl border border-white/20 dark:border-white/10">
              <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />
              
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                      {surahData.revelationType} • Revelation #{surahData.revelationOrder || 1}
                    </span>
                    <span className="text-xs text-stone-300">
                      {surahData.numberOfAyahs} Verses
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                    Surah {surahData.englishName} ({surahData.englishNameTranslation})
                  </h2>
                  <p className="text-xs text-emerald-200/80 max-w-xl">
                    {surahData.mainThemes || 'Divine guidance, contemplation, and moral righteousness.'}
                  </p>
                </div>

                <div className="text-right self-end sm:self-center">
                  <p className="font-arabic text-4xl sm:text-5xl font-bold text-amber-200 drop-shadow-xs">
                    {surahData.name}
                  </p>
                  <p className="text-xs text-stone-300 mt-1 font-mono">
                    Surah #{surahData.number}
                  </p>
                </div>
              </div>

              {/* Prev / Next Surah Quick Navigation */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-200">
                <button
                  disabled={selectedSurahNumber <= 1}
                  onClick={() => setSelectedSurahNumber(selectedSurahNumber - 1)}
                  className="flex items-center gap-1 hover:text-white disabled:opacity-40 disabled:hover:text-emerald-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Surah</span>
                </button>

                <button
                  onClick={() => onPlayAyahAudio(selectedSurahNumber, 1, selectedReciter)}
                  className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Full Surah Recitation</span>
                </button>

                <button
                  disabled={selectedSurahNumber >= 114}
                  onClick={() => setSelectedSurahNumber(selectedSurahNumber + 1)}
                  className="flex items-center gap-1 hover:text-white disabled:opacity-40 disabled:hover:text-emerald-200 transition-colors"
                >
                  <span>Next Surah</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Bismillah Card (Except Surah At-Tawbah #9) */}
          {selectedSurahNumber !== 9 && (
            <div id="bismillah-banner" className="py-6 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <p className="font-arabic text-2xl sm:text-3xl font-bold text-stone-800 dark:text-stone-100">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 italic">
                In the name of Allah, the Entirely Merciful, the Especially Merciful.
              </p>
            </div>
          )}

          {/* Verses Container */}
          {loading ? (
            <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
              <div className="w-8 h-8 border-3 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                Loading Surah verses with authentic translations...
              </p>
            </div>
          ) : viewMode === 'mushaf' ? (
            /* Traditional Continuous Mushaf Reading View */
            <div id="mushaf-reading-view" className="p-8 rounded-3xl bg-amber-50/40 dark:bg-stone-900/60 border border-amber-900/10 dark:border-stone-800 leading-loose text-justify dir-rtl">
              <p className="font-arabic text-stone-900 dark:text-stone-100" style={{ fontSize: `${fontSize}px`, lineHeight: 2.2 }}>
                {surahData?.ayahs.map(ayah => (
                  <span 
                    key={ayah.numberInSurah}
                    ref={el => (ayahRefs.current[ayah.numberInSurah] = el)}
                    className="inline hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                    onClick={() => onPlayAyahAudio(selectedSurahNumber, ayah.numberInSurah, selectedReciter)}
                    title={`Ayah ${ayah.numberInSurah} — Click to listen`}
                  >
                    {ayah.text}{' '}
                    <span className="inline-flex items-center justify-center w-7 h-7 mx-1 text-xs font-mono font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950 rounded-full border border-emerald-300 dark:border-emerald-700">
                      {ayah.numberInSurah}
                    </span>{' '}
                  </span>
                ))}
              </p>
            </div>
          ) : (
            /* Verse by Verse Detailed List View */
            <div className="space-y-4">
              {surahData?.ayahs.map((ayah) => {
                const isPlayingThisAyah = currentlyPlaying?.surah === selectedSurahNumber && currentlyPlaying?.ayah === ayah.numberInSurah;
                const isBookmarked = bookmarkedAyahs[ayah.numberInSurah];

                return (
                  <div
                    key={ayah.numberInSurah}
                    id={`ayah-row-${ayah.numberInSurah}`}
                    ref={el => (ayahRefs.current[ayah.numberInSurah] = el)}
                    className={`p-5 sm:p-6 rounded-3xl transition-all ios-glass-card ${
                      isPlayingThisAyah
                        ? 'ring-2 ring-emerald-500 shadow-xl scale-[1.005]'
                        : 'shadow-md hover:shadow-lg hover:scale-[1.005]'
                    }`}
                  >
                    {/* Top Row: Ayah Number Badge and Action Buttons */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100 dark:border-stone-800/60">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                          {ayah.numberInSurah}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                          {surahData.number}:{ayah.numberInSurah}
                        </span>
                      </div>

                      {/* Ayah Action Icons */}
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        
                        {/* Play Ayah Audio */}
                        <button
                          id={`play-ayah-${ayah.numberInSurah}`}
                          onClick={() => onPlayAyahAudio(selectedSurahNumber, ayah.numberInSurah, selectedReciter)}
                          className={`p-2 rounded-lg transition-colors ${
                            isPlayingThisAyah
                              ? 'bg-emerald-800 text-white'
                              : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-emerald-800 dark:hover:text-emerald-300'
                          }`}
                          title="Play Recitation"
                        >
                          {isPlayingThisAyah ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4" />}
                        </button>

                        {/* Copy Ayah with Verified Reference */}
                        <button
                          id={`copy-ayah-${ayah.numberInSurah}`}
                          onClick={() => handleCopyAyah(ayah)}
                          className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                          title="Copy Ayah with Reference"
                        >
                          {copiedAyah === ayah.numberInSurah ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        {/* Bookmark Ayah */}
                        <button
                          id={`bookmark-ayah-${ayah.numberInSurah}`}
                          onClick={() => handleToggleBookmark(ayah)}
                          className={`p-2 rounded-lg transition-colors ${
                            isBookmarked
                              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                              : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                          }`}
                          title="Bookmark Ayah"
                        >
                          <BookmarkIcon className="w-4 h-4" />
                        </button>

                        {/* Personal Note */}
                        <button
                          id={`note-ayah-${ayah.numberInSurah}`}
                          onClick={() => {
                            setActiveNoteAyah(ayah);
                            const existingNote = StorageService.getNotes().find(
                              n => n.reference === `Surah ${surahData.englishName} — ${surahData.number}:${ayah.numberInSurah}`
                            );
                            setNoteContent(existingNote ? existingNote.note : '');
                          }}
                          className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-emerald-800 transition-colors"
                          title="Add Personal Reflection / Note"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Word-by-Word View */}
                    {isWordByWord && ayah.words && (
                      <div className="flex flex-wrap flex-row-reverse gap-3 my-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                        {ayah.words.map((w, idx) => (
                          <div key={idx} className="text-center p-2 rounded-lg bg-white dark:bg-stone-900 shadow-2xs">
                            <p className="font-arabic text-lg text-stone-900 dark:text-stone-100">{w.arabic}</p>
                            <p className="text-[10px] text-stone-500 italic">{w.transliteration}</p>
                            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mt-0.5">{w.meaning}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Arabic Verse Text */}
                    <p 
                      className="font-arabic text-right leading-loose text-stone-900 dark:text-stone-50 mb-4 dir-rtl"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {ayah.text}
                    </p>

                    {/* Transliteration */}
                    {showTransliteration && ayah.transliteration && (
                      <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 italic mb-3">
                        {ayah.transliteration}
                      </p>
                    )}

                    {/* English Translation */}
                    {showEnglish && (
                      <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                        {ayah.translationEn}
                      </p>
                    )}

                    {/* Urdu Translation */}
                    {showUrdu && ayah.translationUr && (
                      <p className="font-urdu text-sm sm:text-base text-stone-600 dark:text-stone-400 text-right leading-relaxed mb-3 dir-rtl">
                        {ayah.translationUr}
                      </p>
                    )}

                    {/* Tafsir snippet if requested */}
                    {activeTafsirAyah?.numberInSurah === ayah.numberInSurah && (
                      <div className="mt-3 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-700 dark:text-stone-300 space-y-2">
                        <p className="font-bold text-emerald-900 dark:text-emerald-300">
                          Tafsir Ibn Kathir (Abridged):
                        </p>
                        <p className="leading-relaxed">
                          {ayah.tafsirSnippet || 'This verse emphasizes the absolute Oneness of Allah, His unmatched mercy, and the vital obligation of righteous deeds and steadfast prayer.'}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-end mt-2">
                      <button
                        onClick={() => setActiveTafsirAyah(activeTafsirAyah?.numberInSurah === ayah.numberInSurah ? null : ayah)}
                        className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
                      >
                        {activeTafsirAyah?.numberInSurah === ayah.numberInSurah ? 'Hide Tafsir' : 'View Tafsir (ابن كثير)'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Surah Navigation Buttons */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <button
              disabled={selectedSurahNumber <= 1}
              onClick={() => {
                setSelectedSurahNumber(selectedSurahNumber - 1);
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Surah</span>
            </button>

            <span className="text-xs font-semibold text-stone-500">
              Surah {selectedSurahNumber} of 114
            </span>

            <button
              disabled={selectedSurahNumber >= 114}
              onClick={() => {
                setSelectedSurahNumber(selectedSurahNumber + 1);
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <span>Next Surah</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Note Editor Modal */}
      {activeNoteAyah && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                Personal Note — Ayah {surahData?.englishName} {activeNoteAyah.numberInSurah}
              </h3>
              <button onClick={() => setActiveNoteAyah(null)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <p className="text-xs text-stone-500 italic">
              "{activeNoteAyah.translationEn}"
            </p>

            <textarea
              rows={4}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write your reflections, insights, or memorization notes here..."
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveNoteAyah(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
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
