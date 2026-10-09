import React, { useState } from 'react';
import { 
  Bookmark as BookmarkIcon, 
  FileText, 
  Flame, 
  Clock, 
  Trash2, 
  Download, 
  Share2, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { BookmarkItem, UserNote } from '../types';
import { LanguageCode } from '../utils/i18n';

interface UserDashboardSectionProps {
  lang: LanguageCode;
  onResumeQuran?: (surah: number, ayah: number) => void;
}

export const UserDashboardSection: React.FC<UserDashboardSectionProps> = ({
  lang,
  onResumeQuran
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(StorageService.getBookmarks());
  const [notes, setNotes] = useState<UserNote[]>(StorageService.getNotes());
  const lastRead = StorageService.getLastRead();
  const khatm = StorageService.getKhatmProgress();
  const tasbihStats = StorageService.getTasbihStats();

  const [filterType, setFilterType] = useState<'all' | 'ayah' | 'hadith' | 'dua'>('all');
  const [dailyDeeds, setDailyDeeds] = useState<{ id: string; title: string; done: boolean }[]>([
    { id: '1', title: 'Pray all 5 daily prayers on time', done: true },
    { id: '2', title: 'Recite Morning & Evening Azkar', done: true },
    { id: '3', title: 'Read at least 4 pages of the Holy Qur\'an', done: false },
    { id: '4', title: 'Give charity or help someone in need (Sadaqah)', done: false },
    { id: '5', title: 'Send 100 Salawat upon Prophet Muhammad ﷺ', done: true }
  ]);

  const handleDeleteBookmark = (id: string) => {
    StorageService.removeBookmark(id);
    setBookmarks(StorageService.getBookmarks());
  };

  const handleDeleteNote = (id: string) => {
    StorageService.deleteNote(id);
    setNotes(StorageService.getNotes());
  };

  const handleExportData = () => {
    const data = {
      bookmarks,
      notes,
      lastRead,
      khatm,
      tasbihTotal: tasbihStats.totalCount,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deen-personal-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleDeed = (id: string) => {
    setDailyDeeds(prev => prev.map(d => d.id === id ? { ...d, done: !d.done } : d));
  };

  const filteredBookmarks = filterType === 'all'
    ? bookmarks
    : bookmarks.filter(b => b.type === filterType);

  return (
    <section id="user-dashboard-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              Personal Islamic Center & Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Track your spiritual journey, reading milestones, personal reflections, and saved inspirations.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-4 py-2 rounded-full ios-glass hover:bg-white/40 text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Backup (JSON)</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        
        {/* Streak */}
        <div className="p-5 sm:p-6 rounded-3xl ios-glass-card shadow-lg">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Flame className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">Spiritual Streak</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 dark:text-stone-100 mt-1">
            5 Days
          </p>
          <p className="text-[11px] text-stone-400">Active Daily Practice</p>
        </div>

        {/* Last Read Quick Resume */}
        <div 
          onClick={() => onResumeQuran && onResumeQuran(lastRead.surahNumber, lastRead.ayahNumber)}
          className="p-5 sm:p-6 rounded-3xl ios-glass-card border border-emerald-300/40 shadow-lg cursor-pointer hover:border-emerald-500 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold">Last Read Qur'an</span>
          </div>
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1 truncate">
            Surah {lastRead.surahName}
          </p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            Ayah {lastRead.ayahNumber} • Tap to Resume →
          </p>
        </div>

        {/* Total Dhikr count */}
        <div className="p-5 sm:p-6 rounded-3xl ios-glass-card shadow-lg">
          <div className="flex items-center gap-2 text-stone-500 mb-1">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">Tasbih Count</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 dark:text-stone-100 mt-1">
            {(tasbihStats.totalCount || 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400">Recorded Praises</p>
        </div>

        {/* Khatm completion */}
        <div className="p-5 sm:p-6 rounded-3xl ios-glass-card shadow-lg">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">Khatm Progress</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 dark:text-stone-100 mt-1">
            {Math.round((khatm.completedPages / 604) * 100)}%
          </p>
          <p className="text-[11px] text-stone-400">{khatm.completedPages} of 604 Pages</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Bookmarks & Reflections */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Bookmarks Section */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <div className="flex items-center gap-2">
                <BookmarkIcon className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <h2 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  Saved Bookmarks ({bookmarks.length})
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 text-xs">
                {(['all', 'ayah', 'hadith', 'dua'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 rounded-full font-semibold capitalize transition-all ${
                      filterType === type
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'ios-glass text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {filteredBookmarks.length === 0 ? (
              <p className="text-xs text-stone-500 py-6 text-center">
                No saved bookmarks in this category yet. Tap the bookmark icon on any Verse, Hadith, or Dua to save it here.
              </p>
            ) : (
              <div className="space-y-3">
                {filteredBookmarks.map(bm => (
                  <div
                    key={bm.id}
                    className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl ios-glass flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full ios-glass text-emerald-800 dark:text-emerald-300">
                          {bm.type}
                        </span>
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          {bm.title}
                        </span>
                        <span className="text-[11px] text-stone-400">({bm.reference})</span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                        "{bm.snippet}"
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteBookmark(bm.id)}
                      className="p-2 rounded-full ios-glass text-stone-400 hover:text-rose-500 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Personal Notes & Reflections */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <FileText className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <h2 className="font-bold text-base text-stone-900 dark:text-stone-100">
                Personal Reflections & Notes ({notes.length})
              </h2>
            </div>

            {notes.length === 0 ? (
              <p className="text-xs text-stone-500 py-6 text-center">
                No personal reflections added yet. Tap the note icon next to any verse or hadith to write your personal study thoughts.
              </p>
            ) : (
              <div className="space-y-3">
                {notes.map(note => (
                  <div
                    key={note.id}
                    className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl ios-glass flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          {note.title}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400">
                          [{note.reference}]
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 dark:text-stone-300 whitespace-pre-line leading-relaxed">
                        {note.note}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-2 rounded-full ios-glass text-stone-400 hover:text-rose-500 transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Daily Deeds Checklist */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <span>Today's Good Deeds</span>
              </h3>
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full ios-glass text-emerald-800 dark:text-emerald-400">
                {dailyDeeds.filter(d => d.done).length} / {dailyDeeds.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {dailyDeeds.map(deed => (
                <div
                  key={deed.id}
                  onClick={() => toggleDeed(deed.id)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-center gap-3 text-xs ${
                    deed.done
                      ? 'ios-glass bg-emerald-500/15 border border-emerald-400/40 text-stone-800 dark:text-stone-100'
                      : 'ios-glass text-stone-600 dark:text-stone-400 hover:bg-white/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={deed.done}
                    readOnly
                    className="accent-emerald-800 rounded-sm"
                  />
                  <span className={deed.done ? 'line-through opacity-80 font-medium' : ''}>
                    {deed.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
