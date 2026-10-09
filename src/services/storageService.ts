import { Bookmark, UserNote, UserProfile } from '../types';

const STORAGE_KEYS = {
  BOOKMARKS: 'deen_bookmarks_v1',
  NOTES: 'deen_notes_v1',
  LAST_READ: 'deen_last_read_v1',
  PROFILE: 'deen_user_profile_v1',
  TASBIH: 'deen_tasbih_stats_v1',
  KHATM: 'deen_khatm_progress_v1',
  FAVORITES: 'deen_favorites_v1'
};

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Abdullah',
  email: 'abdullah@deen.app',
  joinedDate: 'Shawwal 1447 AH',
  city: 'Makkah',
  country: 'Saudi Arabia',
  calculationMethod: 'MWL',
  madhab: 'shafii',
  theme: 'light',
  language: 'en',
  quranFontSize: 28,
};

export const StorageService = {
  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addBookmark(item: Omit<Bookmark, 'id' | 'timestamp'>): Bookmark {
    const bookmarks = this.getBookmarks();
    const newBookmark: Bookmark = {
      ...item,
      id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now()
    };
    bookmarks.unshift(newBookmark);
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
    return newBookmark;
  },

  removeBookmark(id: string) {
    const bookmarks = this.getBookmarks().filter(b => b.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  },

  isBookmarked(reference: string): boolean {
    return this.getBookmarks().some(b => b.reference === reference);
  },

  getNotes(): UserNote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveNote(itemType: 'ayah' | 'hadith' | 'dua', reference: string, title: string, noteText: string): UserNote {
    const notes = this.getNotes();
    const existingIndex = notes.findIndex(n => n.reference === reference);
    let noteObj: UserNote;

    if (existingIndex >= 0) {
      noteObj = {
        ...notes[existingIndex],
        note: noteText,
        title,
        updatedAt: Date.now()
      };
      notes[existingIndex] = noteObj;
    } else {
      noteObj = {
        id: `note_${Date.now()}`,
        itemType,
        reference,
        title,
        note: noteText,
        updatedAt: Date.now()
      };
      notes.unshift(noteObj);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
    return noteObj;
  },

  deleteNote(id: string) {
    const notes = this.getNotes().filter(n => n.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  },

  getLastRead(): { surahNumber: number; ayahNumber: number; surahName: string; timestamp: number } {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_READ);
      return data ? JSON.parse(data) : { surahNumber: 1, ayahNumber: 1, surahName: 'Al-Fatihah', timestamp: Date.now() };
    } catch {
      return { surahNumber: 1, ayahNumber: 1, surahName: 'Al-Fatihah', timestamp: Date.now() };
    }
  },

  setLastRead(surahNumber: number, ayahNumber: number, surahName: string) {
    const item = { surahNumber, ayahNumber, surahName, timestamp: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_READ, JSON.stringify(item));
    } catch (e) {
      console.error(e);
    }
  },

  getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated = { ...current, ...profile };
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  },

  getTasbihStats(): { totalCount: number; dailyCounts: Record<string, number> } {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASBIH);
      return data ? JSON.parse(data) : { totalCount: 0, dailyCounts: {} };
    } catch {
      return { totalCount: 0, dailyCounts: {} };
    }
  },

  incrementTasbih(count = 1) {
    const stats = this.getTasbihStats();
    const today = new Date().toISOString().split('T')[0];
    stats.totalCount = (stats.totalCount || 0) + count;
    stats.dailyCounts[today] = (stats.dailyCounts[today] || 0) + count;
    try {
      localStorage.setItem(STORAGE_KEYS.TASBIH, JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
    return stats;
  },

  getKhatmProgress(): { targetDays: number; completedPages: number; startDate: string } {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.KHATM);
      return data ? JSON.parse(data) : { targetDays: 30, completedPages: 42, startDate: new Date().toISOString() };
    } catch {
      return { targetDays: 30, completedPages: 42, startDate: new Date().toISOString() };
    }
  },

  saveKhatmProgress(progress: { targetDays: number; completedPages: number }) {
    const current = this.getKhatmProgress();
    const updated = { ...current, ...progress };
    try {
      localStorage.setItem(STORAGE_KEYS.KHATM, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  }
};
