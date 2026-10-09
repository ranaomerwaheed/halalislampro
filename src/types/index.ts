export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  juzNumber: number;
  pageNumber: number;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  text: string;
  translationEn?: string;
  translationUr?: string;
  transliteration?: string;
  audioUrl?: string;
  tafsir?: string;
  words?: { arabic: string; transliteration: string; translation: string }[];
}

export interface Reciter {
  id: string;
  name: string;
  subfolder: string;
  bitrate: string;
}

export interface HadithCollection {
  id: string;
  name: string;
  arabicName: string;
  totalHadith: number;
  description: string;
}

export interface HadithItem {
  id: string;
  collectionId: string;
  collectionName: string;
  hadithNumber: number | string;
  bookName: string;
  chapterName: string;
  arabicText: string;
  englishText: string;
  urduText?: string;
  grading: 'Sahih' | 'Hasan' | 'Da\'if' | 'Muttafaq Alayh';
  narrator?: string;
  reference: string;
}

export interface DuaItem {
  id: string;
  titleEn: string;
  titleUr: string;
  category: string;
  arabicText: string;
  transliteration: string;
  translationEn: string;
  translationUr: string;
  reference: string;
  benefit?: string;
  audioUrl?: string;
  repetitions?: number;
  repeatCount?: number;
}

export type Dua = DuaItem;

export interface AzkarItem {
  id: string;
  category: 'morning' | 'evening' | 'after_salah' | 'sleep' | 'daily';
  titleEn: string;
  titleUr: string;
  arabicText: string;
  transliteration: string;
  translationEn: string;
  translationUr: string;
  repetitions: number;
  targetCount?: number;
  reference: string;
  benefit?: string;
}

export type Hadith = HadithItem;

export interface PrayerTimeItem {
  name: string;
  arabicName: string;
  time: string;
  isNext?: boolean;
  isCurrent?: boolean;
  passed?: boolean;
}

export interface NameOfAllah {
  number: number;
  arabic: string;
  transliteration: string;
  meaningEn: string;
  meaningUr: string;
  explanation: string;
  quranReference: string;
}

export interface SeerahChapter {
  id: string;
  period: 'pre-prophethood' | 'makkah' | 'madinah' | 'legacy';
  titleEn: string;
  titleUr: string;
  titleAr?: string;
  yearHijri?: string;
  gregorianYear?: string;
  summary: string;
  fullContent: string;
  keyLessons: string[];
  keyEvents?: string[];
  reference: string;
}

export interface IslamicArticle {
  id: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  category: string;
  readTime: string;
  readTimeMinutes?: number;
  summary: string;
  authorOrSource: string;
  content: string;
  references?: string[];
}

export type KnowledgeArticle = IslamicArticle;

export interface Bookmark {
  id: string;
  type: 'ayah' | 'hadith' | 'dua' | 'name' | 'article';
  title: string;
  reference: string;
  snippet: string;
  timestamp: number;
  folder?: string;
}

export type BookmarkItem = Bookmark;

export interface SurahDetail extends SurahMeta {
  ayahs: Ayah[];
}

export interface UserNote {
  id: string;
  itemType: 'ayah' | 'hadith' | 'dua';
  reference: string;
  title: string;
  note: string;
  updatedAt: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
  city: string;
  country: string;
  calculationMethod: string;
  madhab: 'shafii' | 'hanafi';
  theme: 'light' | 'dark' | 'sepia';
  language: 'en' | 'ur' | 'ar';
  quranFontSize: number;
}
