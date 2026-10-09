export interface IslamicEvent {
  title: string;
  arabicTitle: string;
  hijriDay: number;
  hijriMonth: number;
  description: string;
  significance: string;
}

export const HIJRI_MONTHS = [
  { number: 1, en: 'Muharram', ar: 'مُحَرَّم' },
  { number: 2, en: 'Safar', ar: 'صَفَر' },
  { number: 3, en: 'Rabi\' al-Awwal', ar: 'رَبِيع الأَوَّل' },
  { number: 4, en: 'Rabi\' al-Thani', ar: 'رَبِيع الآخِر' },
  { number: 5, en: 'Jumada al-Ula', ar: 'جُمَادَى الأُولَى' },
  { number: 6, en: 'Jumada al-Akhirah', ar: 'جُمَادَى الآخِرَة' },
  { number: 7, en: 'Rajab', ar: 'رَجَب' },
  { number: 8, en: 'Sha\'ban', ar: 'شَعْبَان' },
  { number: 9, en: 'Ramadan', ar: 'رَمَضَان' },
  { number: 10, en: 'Shawwal', ar: 'شَوَّال' },
  { number: 11, en: 'Dhul-Qi\'dah', ar: 'ذُو القَعْدَة' },
  { number: 12, en: 'Dhul-Hijjah', ar: 'ذُو الحِجَّة' }
];

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    title: 'Islamic New Year',
    arabicTitle: 'رأس السنة الهجرية',
    hijriDay: 1,
    hijriMonth: 1,
    description: 'First day of Muharram, commemorating the start of the Islamic lunar calendar.',
    significance: 'Reflection on the Prophet\'s ﷺ historic Hijrah and renewal of spiritual resolve.'
  },
  {
    title: 'Day of Ashura',
    arabicTitle: 'يوم عاشوراء',
    hijriDay: 10,
    hijriMonth: 1,
    description: '10th of Muharram. A blessed day of voluntary fasting.',
    significance: 'The day Allah delivered Prophet Musa (AS) and Bani Isra\'il from Pharaoh.'
  },
  {
    title: 'Mawlid an-Nabi',
    arabicTitle: 'المولد النبوي الشريف',
    hijriDay: 12,
    hijriMonth: 3,
    description: '12th of Rabi\' al-Awwal. The birth of the Final Messenger Muhammad ﷺ.',
    significance: 'Studying the blessed Seerah and sending abundant salawat upon the Prophet ﷺ.'
  },
  {
    title: 'Al-Isra\' wal-Mi\'raj',
    arabicTitle: 'الإسراء والمعراج',
    hijriDay: 27,
    hijriMonth: 7,
    description: '27th of Rajab. The miraculous nocturnal journey to Jerusalem and ascension to the heavens.',
    significance: 'Direct gift of the five daily obligatory prayers (Salah).'
  },
  {
    title: 'Nisfu Sha\'ban (Night of Forgiveness)',
    arabicTitle: 'ليلة النصف من شعبان',
    hijriDay: 15,
    hijriMonth: 8,
    description: '15th night of Sha\'ban. A night of intense prayer and seeking forgiveness.',
    significance: 'Preparation for the arrival of the blessed month of Ramadan.'
  },
  {
    title: 'First Day of Ramadan',
    arabicTitle: 'أول أيام شهر رمضان',
    hijriDay: 1,
    hijriMonth: 9,
    description: 'Commencement of the holy month of fasting, Qur\'an recitation, and Taraweeh.',
    significance: 'Month in which the Qur\'an was revealed and gates of mercy are swung wide open.'
  },
  {
    title: 'Laylat al-Qadr (Night of Power)',
    arabicTitle: 'ليلة القدر',
    hijriDay: 27,
    hijriMonth: 9,
    description: 'Sought in the odd nights of the last ten days of Ramadan (especially 27th night).',
    significance: 'Better than a thousand months of worship (Surah Al-Qadr 97:3).'
  },
  {
    title: 'Eid al-Fitr',
    arabicTitle: 'عيد الفطر المبارك',
    hijriDay: 1,
    hijriMonth: 10,
    description: '1st of Shawwal. Celebration marking the joyous completion of the fast of Ramadan.',
    significance: 'Day of communal prayer, gratitude, and distribution of Zakat al-Fitr.'
  },
  {
    title: 'Day of Arafah',
    arabicTitle: 'يوم عرفة',
    hijriDay: 9,
    hijriMonth: 12,
    description: '9th of Dhul-Hijjah. The supreme culmination of Hajj on the plain of Arafat.',
    significance: 'Fasting for non-pilgrims expiates the sins of the preceding and coming year.'
  },
  {
    title: 'Eid al-Adha',
    arabicTitle: 'عيد الأضحى المبارك',
    hijriDay: 10,
    hijriMonth: 12,
    description: '10th of Dhul-Hijjah. Feast of Sacrifice commemorating Prophet Ibrahim\'s devotion.',
    significance: 'Communal Eid prayer, Takbeerat, and sacrifice of livestock (Qurbani/Udhiyah).'
  }
];

export interface HijriDateInfo {
  day: number;
  month: number;
  monthNameEn: string;
  monthNameAr: string;
  year: number;
  formattedEn: string;
  formattedAr: string;
}

/**
 * Approximate conversion from Gregorian date to Hijri date
 * Adjusted for standard Umm al-Qura calculation reference
 */
export function getHijriDate(gregorianDate: Date, dayAdjustment = 0): HijriDateInfo {
  const adjusted = new Date(gregorianDate);
  adjusted.setDate(adjusted.getDate() + dayAdjustment);

  // Modern browser Intl format provides accurate localized Hijri calendars
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(adjusted);
    let day = 1;
    let month = 1;
    let year = 1448;

    for (const p of parts) {
      if (p.type === 'day') day = parseInt(p.value, 10);
      if (p.type === 'month') month = parseInt(p.value, 10);
      if (p.type === 'year') year = parseInt(p.value, 10);
    }

    const monthObj = HIJRI_MONTHS.find(m => m.number === month) || HIJRI_MONTHS[0];

    return {
      day,
      month,
      monthNameEn: monthObj.en,
      monthNameAr: monthObj.ar,
      year,
      formattedEn: `${day} ${monthObj.en} ${year} AH`,
      formattedAr: `${day} ${monthObj.ar} ${year} هـ`
    };
  } catch (e) {
    // Mathematical algorithmic fallback
    const julianDay = Math.floor(adjusted.getTime() / 86400000) + 2440587.5;
    const l = Math.floor(julianDay - 1948440 + 10632);
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
    const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    const month = Math.floor((24 * l3) / 709);
    const day = l3 - Math.floor((709 * month) / 24);
    const year = 30 * n + j - 30;

    const monthObj = HIJRI_MONTHS[(month - 1 + 12) % 12];
    return {
      day: Math.max(1, day),
      month: monthObj.number,
      monthNameEn: monthObj.en,
      monthNameAr: monthObj.ar,
      year,
      formattedEn: `${day} ${monthObj.en} ${year} AH`,
      formattedAr: `${day} ${monthObj.ar} ${year} هـ`
    };
  }
}
