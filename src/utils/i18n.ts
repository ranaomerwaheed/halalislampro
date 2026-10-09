export type LanguageCode = 'en' | 'ur' | 'ar';

export interface Translations {
  appName: string;
  tagline: string;
  home: string;
  quran: string;
  hadith: string;
  duas: string;
  azkar: string;
  prayerTimes: string;
  qibla: string;
  calendar: string;
  namesOfAllah: string;
  ramadan: string;
  zakat: string;
  tasbih: string;
  seerah: string;
  knowledge: string;
  search: string;
  bookmarks: string;
  notes: string;
  account: string;
  readQuran: string;
  exploreHadith: string;
  todaysDuas: string;
  nextPrayer: string;
  currentPrayer: string;
  dailyVerse: string;
  dailyHadith: string;
  morningAzkar: string;
  eveningAzkar: string;
  reciters: string;
  searchPlaceholder: string;
  bookmarkSaved: string;
  shareCard: string;
  copied: string;
  khatmTracker: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: 'Deen',
    tagline: 'Your Complete Islamic Companion',
    home: 'Home',
    quran: 'Holy Qur\'an',
    hadith: 'Hadith Library',
    duas: 'Islamic Duas',
    azkar: 'Azkar & Dhikr',
    prayerTimes: 'Prayer Times',
    qibla: 'Qibla Finder',
    calendar: 'Hijri Calendar',
    namesOfAllah: '99 Names of Allah',
    ramadan: 'Ramadan Center',
    zakat: 'Zakat Calculator',
    tasbih: 'Digital Tasbih',
    seerah: 'Prophetic Seerah',
    knowledge: 'Islamic Knowledge',
    search: 'Global Search',
    bookmarks: 'Bookmarks',
    notes: 'Personal Notes',
    account: 'My Account',
    readQuran: 'Read Qur\'an',
    exploreHadith: 'Explore Hadith',
    todaysDuas: 'Today\'s Duas',
    nextPrayer: 'Next Prayer',
    currentPrayer: 'Current Prayer',
    dailyVerse: 'Ayah of the Day',
    dailyHadith: 'Hadith of the Day',
    morningAzkar: 'Morning Azkar',
    eveningAzkar: 'Evening Azkar',
    reciters: 'Reciter',
    searchPlaceholder: 'Search across Qur\'an, Hadith, Duas, Names of Allah...',
    bookmarkSaved: 'Saved to Bookmarks',
    shareCard: 'Share',
    copied: 'Copied to clipboard!',
    khatmTracker: 'Qur\'an Khatm Tracker'
  },
  ur: {
    appName: 'دین',
    tagline: 'آپ کا مکمل اسلامی ساتھی',
    home: 'مرکزی صفحہ',
    quran: 'قرآن مجید',
    hadith: 'کتبِ احادیث',
    duas: 'مسنون دعائیں',
    azkar: 'اذکار و تسبیحات',
    prayerTimes: 'اوقاتِ نماز',
    qibla: 'قبلہ رخ',
    calendar: 'ہجری کیلنڈر',
    namesOfAllah: 'اسمائے حسنیٰ',
    ramadan: 'رمضان سینٹر',
    zakat: 'زکوٰۃ کیلکولیٹر',
    tasbih: 'ڈیجیٹل تسبیح',
    seerah: 'سیرت النبی ﷺ',
    knowledge: 'اسلامی تعلیمات',
    search: 'تلاش کریں',
    bookmarks: 'محفوظ شدہ',
    notes: 'ذاتی نوٹس',
    account: 'میرا اکاؤنٹ',
    readQuran: 'قرآن پڑھیں',
    exploreHadith: 'احادیث دیکھیں',
    todaysDuas: 'آج کی مسنون دعا',
    nextPrayer: 'اگلی نماز',
    currentPrayer: 'موجودہ نماز',
    dailyVerse: 'آج کی آیت',
    dailyHadith: 'آج کی حدیث مبارکہ',
    morningAzkar: 'صبح کے اذکار',
    eveningAzkar: 'شام کے اذکار',
    reciters: 'قاری',
    searchPlaceholder: 'قرآن، احادیث، دعائیں اور اسمائے حسنیٰ تلاش کریں...',
    bookmarkSaved: 'محفوظ کر لیا گیا',
    shareCard: 'شیئر کریں',
    copied: 'کاپی ہو گیا!',
    khatmTracker: 'قرآن ختم ٹریکر'
  },
  ar: {
    appName: 'دين',
    tagline: 'رفيقك الإسلامي الشامل',
    home: 'الرئيسية',
    quran: 'القرآن الكريم',
    hadith: 'مكتبة الحديث',
    duas: 'الأدعية المأثورة',
    azkar: 'أذكار المسلم',
    prayerTimes: 'مواقيت الصلاة',
    qibla: 'اتجاه القبلة',
    calendar: 'التقويم الهجري',
    namesOfAllah: 'أسماء الله الحسنى',
    ramadan: 'مركز رمضان',
    zakat: 'حاسبة الزكاة',
    tasbih: 'المسبحة الإلكترونية',
    seerah: 'السيرة النبوية',
    knowledge: 'المعرفة الإسلامية',
    search: 'بحث شامل',
    bookmarks: 'المحفوظات',
    notes: 'ملاحظاتي',
    account: 'حسابي',
    readQuran: 'اقرأ القرآن',
    exploreHadith: 'تصفح الأحاديث',
    todaysDuas: 'أدعية اليوم',
    nextPrayer: 'الصلاة القادمة',
    currentPrayer: 'الصلاة الحالية',
    dailyVerse: 'آية اليوم',
    dailyHadith: 'حديث اليوم',
    morningAzkar: 'أذكار الصباح',
    eveningAzkar: 'أذكار المساء',
    reciters: 'القارئ',
    searchPlaceholder: 'ابحث في القرآن، الحديث، الأدعية، وأسماء الله الحسنى...',
    bookmarkSaved: 'تم الحفظ في المفضلة',
    shareCard: 'مشاركة',
    copied: 'تم النسخ!',
    khatmTracker: 'مخطط ختم القرآن'
  }
};
