export interface PrayerGuideItem {
  id: string;
  nameEn: string;
  nameUr: string;
  nameAr: string;
  category: 'fard' | 'sunnah' | 'wajib' | 'nafl' | 'special' | 'funeral';
  totalRakat?: string;
  timing: string;
  timingUr: string;
  summaryEn: string;
  summaryUr: string;
  virtues: string[];
  steps: {
    stepNumber: number;
    titleEn: string;
    titleUr: string;
    arabic?: string;
    transliteration?: string;
    urduTranslation?: string;
    englishTranslation?: string;
    instructionsEn: string;
    instructionsUr: string;
  }[];
  specialDuas?: {
    titleEn: string;
    titleUr: string;
    arabic: string;
    transliteration: string;
    urduTranslation: string;
    englishTranslation: string;
    note?: string;
  }[];
  rulings: {
    en: string;
    ur: string;
  }[];
}

export const ALL_PRAYERS_GUIDE: PrayerGuideItem[] = [
  {
    id: 'namaz-e-janaza',
    nameEn: 'Namaz-e-Janaza (Funeral Prayer)',
    nameUr: 'نمازِ جنازہ کا مکمل طریقہ و دعائیں',
    nameAr: 'صَلَاةُ الجِنَازَة',
    category: 'funeral',
    totalRakat: '4 Takbeers (No Ruku, No Sujud)',
    timing: 'Performed standing upon the death of a Muslim before burial',
    timingUr: 'مسلمان میت کے انتقال پر تدفین سے قبل کھڑے ہو کر',
    summaryEn: 'A communal obligation (Fard Kifayah) consisting of 4 Takbeers, Sana, Durood-e-Ibrahim, and supplications for the deceased.',
    summaryUr: 'نمازِ جنازہ فرضِ کفایہ ہے جس میں نہ رکوع ہوتا ہے اور نہ سجدہ۔ یہ چار تکبیروں، ثناء، درودِ ابراہیمی اور مغفرت کی دعاؤں پر مشتمل ہے۔',
    virtues: [
      'The Prophet ﷺ said: "Whoever attends the funeral until the prayer is offered will have a Qirat of reward (equal to Mount Uhud)" (Sahih al-Bukhari 1325).',
      'If 40 or 100 upright Muslims pray for the deceased, their intercession is accepted by Allah (Sahih Muslim 947).',
      'It is a solemn reminder of the Akhirah and the reality of meeting Allah.'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: '1st Takbeer: Niyyah & Thana with "Wa Jalla Thana\'uk"',
        titleUr: 'پہلی تکبیر: نیت اور ثناء (وَجَلَّ ثَنَاؤُكَ کے ساتھ)',
        arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَجَلَّ ثَنَاؤُكَ، وَلَا إِلَٰهَ غَيْرُكَ',
        transliteration: 'Subhanak-Allahumma wa bihamdika, wa tabarakas-muka, wa ta\'ala jadduka, wa jalla thana\'uka, wa la ilaha ghayruk.',
        urduTranslation: 'پاک ہے تو اے اللہ اپنی تعریفوں کے ساتھ، اور تیرا نام برکت والا ہے، اور تیری شان بلند ہے، اور تیری تعریف بزرگ و برتر ہے، اور تیرے سوا کوئی معبود نہیں۔',
        englishTranslation: 'Glory be to You, O Allah, and praise be to You. Blessed is Your Name, exalted is Your Majesty, magnificent is Your Praise, and there is no deity worthy of worship besides You.',
        instructionsEn: 'Face the Qibla behind the Imam with the body before you. Make the intention: "I intend to pray the funeral prayer for this deceased, with 4 Takbeers, praise for Allah, blessings on the Prophet ﷺ, and dua for the deceased, behind this Imam." Raise hands to the earlobes saying "Allahu Akbar" and fold them right over left below the navel/upon chest. Recite the Thana (above) and Surah Al-Fatihah.',
        instructionsUr: 'قبلہ رخ ہو کر کھڑے ہوں۔ نیت کریں: "نیت کی میں نے نمازِ جنازہ کی، چار تکبیروں کے ساتھ، ثناء اللہ تعالیٰ کے لیے، درود رسول اللہ ﷺ کے لیے، دعا اس میت کے لیے، پیچھے اس امام کے، منہ میرا قبلہ شریف کی طرف۔" اللہ اکبر کہہ کر ہاتھ کانوں تک اٹھائیں اور ناف کے نیچے باندھ لیں، پھر ثناء پڑھیں۔'
      },
      {
        stepNumber: 2,
        titleEn: '2nd Takbeer: Durood-e-Ibrahim',
        titleUr: 'دوسری تکبیر: درودِ ابراہیمی',
        arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
        transliteration: 'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammad, kama sallayta \'ala Ibrahima wa \'ala ali Ibrahima innaka Hamidum-Majid. Allahumma barik \'ala Muhammadin wa \'ala ali Muhammad, kama barakta \'ala Ibrahima wa \'ala ali Ibrahima innaka Hamidum-Majid.',
        urduTranslation: 'اے اللہ! رحمت نازل فرما حضرت محمد ﷺ پر اور ان کی آل پر، جیسا کہ تو نے رحمت نازل فرمائی حضرت ابراہیم علیہ السلام پر اور ان کی آل پر، بیشک تو تعریف کے لائق اور بزرگی والا ہے۔ اے اللہ! برکت نازل فرما حضرت محمد ﷺ پر اور ان کی آل پر، جیسا کہ تو نے برکت نازل فرمائی حضرت ابراہیم علیہ السلام پر اور ان کی آل پر، بیشک تو تعریف کے لائق اور بزرگی والا ہے۔',
        englishTranslation: 'O Allah, bestow Your peace upon Muhammad and upon the family of Muhammad, as You bestowed peace upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, bestow Your blessings upon Muhammad and upon the family of Muhammad, as You bestowed blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.',
        instructionsEn: 'The Imam says the 2nd Takbeer ("Allahu Akbar"). Do NOT raise your hands. Keep hands folded and recite the full Durood-e-Ibrahim.',
        instructionsUr: 'امام دوسری تکبیر (اللہ اکبر) کہے گا۔ ہاتھ اٹھائے بغیر بندھے ہوئے ہاتھوں کے ساتھ مکمل درودِ ابراہیمی پڑھیں۔'
      },
      {
        stepNumber: 3,
        titleEn: '3rd Takbeer: Supplication (Dua) for the Deceased',
        titleUr: 'تیسری تکبیر: میت کی مغفرت کی مسنون دعا',
        instructionsEn: 'The Imam says the 3rd Takbeer ("Allahu Akbar") without raising hands. Recite the authenticated Dua according to who the deceased is (Adult male/female, young boy, or young girl). See the special duas below.',
        instructionsUr: 'امام تیسری تکبیر (اللہ اکبر) کہے گا۔ ہاتھ نہ اٹھائیں۔ اگر میت بالغ مرد یا عورت ہو تو بالغوں والی دعا پڑھیں، اور اگر نابالغ بچہ یا بچی ہو تو متعلقہ دعا پڑھیں (نیچے دی گئی ہیں)۔'
      },
      {
        stepNumber: 4,
        titleEn: '4th Takbeer: Tasleem (Salam Concluding the Prayer)',
        titleUr: 'چوتھی تکبیر اور سلام',
        arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ',
        transliteration: 'As-salamu \'alaykum wa rahmatullah',
        urduTranslation: 'تم پر سلامتی اور اللہ کی رحمت ہو۔',
        englishTranslation: 'May peace and mercy of Allah be upon you.',
        instructionsEn: 'The Imam says the 4th Takbeer ("Allahu Akbar") without raising hands. After a brief pause, the Imam and congregation turn head to the right saying "As-salamu \'alaykum wa rahmatullah", drop the right hand, then turn head to the left saying "As-salamu \'alaykum wa rahmatullah", and drop the left hand.',
        instructionsUr: 'امام چوتھی تکبیر کہے گا۔ اس کے بعد امام دائیں طرف منہ پھیر کر سلام کہے گا، اس پر دایاں ہاتھ کھول دیں، پھر بائیں طرف منہ پھیر کر سلام کہے گا اور بایاں ہاتھ کھول دیں، اور دعا مانگیں۔'
      }
    ],
    specialDuas: [
      {
        titleEn: 'Dua for Adult Deceased (Male or Female)',
        titleUr: 'بالغ میت (مرد و عورت) کے لیے جامع دعا',
        arabic: 'اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا، اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ',
        transliteration: 'Allahummagh-fir lihayyina wa mayyitina, wa shahidina wa gha\'ibina, wa saghirina wa kabirina, wa dhakarina wa unthana. Allahumma man ahyaytahu minna fa-ahyihi \'alal-Islam, wa man tawaffaytahu minna fatawaffahu \'alal-Iman.',
        urduTranslation: 'اے اللہ! بخش دے ہمارے زندوں کو اور ہمارے مُردوں کو، اور ہمارے حاضرین کو اور ہمارے غائبین کو، اور ہمارے چھوٹوں کو اور ہمارے بڑوں کو، اور ہمارے مردوں کو اور ہماری عورتوں کو۔ اے اللہ! ہم میں سے جسے تو زندہ رکھے اُسے اسلام پر زندہ رکھ، اور جسے ہم میں سے موت دے اُسے ایمان پر موت دے۔',
        englishTranslation: 'O Allah, forgive our living and our dead, those present and those absent, our young and our old, our males and our females. O Allah, whomever You keep alive among us, let him live upon Islam; and whomever You cause to die among us, let him die upon Faith.',
        note: 'Narrated in Sunan Abi Dawud (3201) and Jami` at-Tirmidhi (1024) - Sahih.'
      },
      {
        titleEn: 'Dua for a Minor Boy Child (Na-Baligh Larke ki Dua)',
        titleUr: 'نابالغ لڑکے کے لیے مسنون دعا',
        arabic: 'اللَّهُمَّ اجْعَلْهُ لَنَا فَرَطاً، وَاجْعَلْهُ لَنَا أَجْراً وَذُخْراً، وَاجْعَلْهُ لَنَا شَافِعاً وَمُشَفَّعاً',
        transliteration: 'Allahummaj-\'alhu lana farataw, waj-\'alhu lana ajraw-wa dhukhra, waj-\'alhu lana shafi\'aw-wa mushaffa\'a.',
        urduTranslation: 'اے اللہ! اس بچے کو ہمارے لیے پیش رو (آگے پہنچ کر سامان کرنے والا) بنا، اور اس کو ہمارے لیے اجر اور ذخیرہ بنا، اور اس کو ہمارے حق میں سفارش کرنے والا اور مقبول شفاعت بنا۔',
        englishTranslation: 'O Allah, make him for us a forerunner, and make him for us a reward and a treasure, and make him an intercessor whose intercession is accepted.',
        note: 'Reported by Al-Hasan Al-Basri and recorded in Sahih al-Bukhari ta\'liqan.'
      },
      {
        titleEn: 'Dua for a Minor Girl Child (Na-Baligh Larki ki Dua)',
        titleUr: 'نابالغ لڑکی کے لیے مسنون دعا',
        arabic: 'اللَّهُمَّ اجْعَلْهَا لَنَا فَرَطاً، وَاجْعَلْهَا لَنَا أَجْراً وَذُخْراً، وَاجْعَلْهَا لَنَا شَافِعَةً وَمُشَفَّعَةً',
        transliteration: 'Allahummaj-\'alha lana farataw, waj-\'alha lana ajraw-wa dhukhra, waj-\'alha lana shafi\'ataw-wa mushaffa\'ah.',
        urduTranslation: 'اے اللہ! اس بچی کو ہمارے لیے پیش رو بنا، اور اس کو ہمارے لیے اجر اور ذخیرہ بنا، اور اس کو ہمارے حق میں سفارش کرنے والی اور مقبول شفاعت بنا۔',
        englishTranslation: 'O Allah, make her for us a forerunner, and make her for us a reward and a treasure, and make her an intercessor whose intercession is accepted.',
        note: 'Feminine conjugation for female children.'
      }
    ],
    rulings: [
      {
        en: 'Standing in odd number of rows (3, 5, or 7 rows) behind the Imam is recommended (Sunnah Mustahabbah).',
        ur: 'نمازِ جنازہ میں صفیں طاق (۳، ۵، یا ۷) بنانا مستحب ہے۔'
      },
      {
        en: 'The prayer is performed entirely while standing. There is neither Adhan, Iqamah, Ruku, nor Sujud.',
        ur: 'نمازِ جنازہ میں نہ اذان ہے نہ اقامت، نہ رکوع ہے اور نہ سجدہ، یہ مکمل کھڑے ہو کر پڑھی جاتی ہے۔'
      },
      {
        en: 'If latecomer misses a Takbeer, join with the Imam, and when Imam makes Salam, complete missed Takbeers before moving the body.',
        ur: 'اگر کوئی شخص کسی تکبیر کے بعد شامل ہو تو امام کے ساتھ مل جائے، امام کے سلام کے بعد اپنی چھوٹی ہوئی تکبیریں کہہ لے۔'
      }
    ]
  },
  {
    id: 'five-daily-prayers',
    nameEn: 'The 5 Daily Obligatory Prayers (Fard Salah)',
    nameUr: 'پانچوں فرض نمازوں کی مکمل رکعتیں اور تفصیل',
    nameAr: 'الصَّلَوَاتُ الخَمْسُ المَفْرُوضَة',
    category: 'fard',
    totalRakat: '17 Fard Rakat Daily (Total with Sunnah/Witr: 48)',
    timing: 'Five prescribed times from dawn until night',
    timingUr: 'صبح صادق سے لے کر رات تک پانچ مقررہ اوقات',
    summaryEn: 'The second pillar of Islam: Fajr (2 Fard), Dhuhr (4 Fard), Asr (4 Fard), Maghrib (3 Fard), and Isha (4 Fard + 3 Witr).',
    summaryUr: 'اسلام کا دوسرا اہم ستون: فجر، ظہر، عصر، مغرب اور عشاء کی نمازیں۔ ان کی فرض، سنت مؤکدہ، اور نفل رکعتوں کی مکمل جدول۔',
    virtues: [
      'The Prophet ﷺ said: "The first thing for which a person will be brought to account on the Day of Resurrection is Salah" (Sunan Abi Dawud).',
      'Like a flowing river in front of one\'s house washing sins 5 times a day (Sahih al-Bukhari).',
      'Protects from immorality, evil deeds, and negligence (Surah Al-Ankabut 29:45).'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Fajr Prayer (صبح کی نماز)',
        titleUr: 'فجر کی نماز: کل ۴ رکعتیں',
        instructionsEn: '2 Sunnah Mu\'akkadah (strongly emphasized Sunnah prayed first), followed by 2 Fard (obligatory, recited aloud in congregation).',
        instructionsUr: 'پہلے ۲ رکعت سنت مؤکدہ (جس کی بہت فضیلت ہے)، اس کے بعد ۲ رکعت فرض۔'
      },
      {
        stepNumber: 2,
        titleEn: 'Dhuhr Prayer (ظہر کی نماز)',
        titleUr: 'ظہر کی نماز: کل ۱۲ رکعتیں',
        instructionsEn: '4 Sunnah Mu\'akkadah before Fard, 4 Fard (silent recitation), 2 Sunnah Mu\'akkadah after Fard, and 2 optional Nafl.',
        instructionsUr: '۴ رکعت سنت مؤکدہ، پھر ۴ رکعت فرض، پھر ۲ رکعت سنت مؤکدہ، اور ۲ رکعت نفل۔'
      },
      {
        stepNumber: 3,
        titleEn: 'Asr Prayer (عصر کی نماز)',
        titleUr: 'عصر کی نماز: کل ۸ رکعتیں',
        instructionsEn: '4 Sunnah Ghair Mu\'akkadah (optional recommended), followed by 4 Fard (silent recitation).',
        instructionsUr: '۴ رکعت سنت غیر مؤکدہ (مستحب)، اس کے بعد ۴ رکعت فرض۔'
      },
      {
        stepNumber: 4,
        titleEn: 'Maghrib Prayer (مغرب کی نماز)',
        titleUr: 'مغرب کی نماز: کل ۷ رکعتیں',
        instructionsEn: '3 Fard (recited aloud in first two rak\'ahs), followed by 2 Sunnah Mu\'akkadah, and 2 optional Nafl.',
        instructionsUr: '۳ رکعت فرض، پھر ۲ رکعت سنت مؤکدہ، اور ۲ رکعت نفل۔'
      },
      {
        stepNumber: 5,
        titleEn: 'Isha Prayer (عشاء کی نماز)',
        titleUr: 'عشاء کی نماز: کل ۱۷ رکعتیں',
        instructionsEn: '4 Sunnah Ghair Mu\'akkadah, 4 Fard (recited aloud in first two rak\'ahs), 2 Sunnah Mu\'akkadah, 2 Nafl, 3 Witr Wajib, and 2 Nafl.',
        instructionsUr: '۴ سنت غیر مؤکدہ، ۴ فرض، ۲ سنت مؤکدہ، ۲ نفل، ۳ وتر واجب، اور ۲ نفل۔'
      }
    ],
    rulings: [
      {
        en: 'Sunnah Mu\'akkadah (e.g. 2 of Fajr, 4 before Dhuhr) should never be abandoned without a valid excuse.',
        ur: 'سنتِ مؤکدہ کو بلا عذر چھوڑنے کی عادت بنانا گناہ ہے۔'
      },
      {
        en: 'Missing Fard prayers deliberately is among the most severe sins in Islam.',
        ur: 'جان بوجھ کر نماز قضاء کرنا سخت ترین گناہ ہے۔'
      }
    ]
  },
  {
    id: 'namaz-e-witr-qunoot',
    nameEn: 'Namaz-e-Witr & Du\'a al-Qunoot',
    nameUr: 'نمازِ وتر اور دعائے قنوت کا طریقہ',
    nameAr: 'صَلَاةُ الوِتْرِ وَدُعَاءُ القُنُوت',
    category: 'wajib',
    totalRakat: '3 Rakat Wajib',
    timing: 'After Isha prayer until the break of Dawn (Fajr)',
    timingUr: 'عشاء کے بعد سے صبح صادق طلوع ہونے تک',
    summaryEn: 'Witr is an emphasized odd-numbered prayer prayed after Isha. In the 3rd rak\'ah, after Surah recitation, Takbeer is made and Du\'a al-Qunoot is recited.',
    summaryUr: 'وتر واجب نماز ہے جو عشاء کے بعد پڑھی جاتی ہے۔ تیسری رکعت میں سورت ملانے کے بعد کانوں تک ہاتھ اٹھا کر تکبیر کہہ کر دعائے قنوت پڑھی جاتی ہے۔',
    virtues: [
      'The Prophet ﷺ said: "Allah is One and loves what is odd (Witr), so observe the Witr, O people of the Qur\'an" (Sunan Abi Dawud 1416).',
      'The Prophet ﷺ never left Witr prayer even during travel (Muttafaq Alayh).'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'First 2 Rakat',
        titleUr: 'پہلی دو رکعتیں',
        instructionsEn: 'Pray 2 rak\'ats like normal Salah with Surah Al-Fatiha and a Surah. In Qa\'dah, recite only Tashahhud (Attahiyyat) and stand up without Salam.',
        instructionsUr: 'عام نماز کی طرح ۲ رکعتیں پڑھیں، قعدہ اولیٰ میں التحیات پڑھ کر بغیر سلام پھیرے تیسری رکعت کے لیے کھڑے ہو جائیں۔'
      },
      {
        stepNumber: 2,
        titleEn: '3rd Rakat Recitation & Takbeer',
        titleUr: 'تیسری رکعت کی قراءت اور زائد تکبیر',
        instructionsEn: 'Recite Bismillah, Surah Al-Fatiha, and another Surah (e.g. Surah Al-Ikhlas). Before going into Ruku, raise both hands to the earlobes saying "Allahu Akbar", fold hands again, and recite Du\'a al-Qunoot silently.',
        instructionsUr: 'تیسری رکعت میں سورۂ فاتحہ اور کوئی سورت (جیسے سورۂ اخلاص) پڑھیں۔ رکوع میں جانے سے پہلے ہاتھ کانوں تک اٹھا کر "اللہ اکبر" کہیں، ہاتھ دوبارہ ناف کے نیچے باندھ لیں اور دعائے قنوت پڑھیں۔'
      },
      {
        stepNumber: 3,
        titleEn: 'Ruku & Completion',
        titleUr: 'رکوع اور نماز کی تکمیل',
        instructionsEn: 'After finishing Du\'a al-Qunoot, say "Allahu Akbar" and go into Ruku, then Sujud, and complete the prayer with Tashahhud, Durood-e-Ibrahim, Dua Masoora, and Salam.',
        instructionsUr: 'دعائے قنوت مکمل کرنے کے بعد "اللہ اکبر" کہتے ہوئے رکوع میں جائیں، پھر سجدے اور آخری قعدہ مکمل کر کے سلام پھیر دیں۔'
      }
    ],
    specialDuas: [
      {
        titleEn: 'Du\'a al-Qunoot (Hanafi / Mashhoor)',
        titleUr: 'دعائے قنوت (مشہور حنفی)',
        arabic: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ، وَنَشْكُرُكَ وَلَا نَكْفُرُكَ، وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ. اللَّهُمَّ إِيَّاكَ نَعْبُدُ، وَلَكَ نُصَلِّي وَنَسْجُدُ، وَإِلَيْكَ نَسْعَىٰ وَنَحْفِدُ، وَنَرْجُو رَحْمَتَكَ وَنَخْشَىٰ عَذَابَكَ، إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحَقٌ',
        transliteration: 'Allahumma inna nasta\'inuka wa nastaghfiruka wa nu\'minu bika wa natawakkalu \'alayka wa nuthni \'alaykal-khayr, wa nashkuruka wa la nakfuruka, wa nakhla\'u wa natruku may-yafjuruk. Allahumma iyyaka na\'budu, wa laka nusalli wa nasjud, wa ilayka nas\'a wa nahfid, wa narju rahmataka wa nakhsha \'adhabaka, inna \'adhabaka bil-kuffari mulhaq.',
        urduTranslation: 'اے اللہ! ہم تجھ ہی سے مدد چاہتے ہیں اور تجھ ہی سے بخشش مانگتے ہیں، اور تجھ پر ایمان لاتے ہیں اور تجھ پر بھروسہ کرتے ہیں، اور تیری بہترین تعریف کرتے ہیں، اور تیرا شکر ادا کرتے ہیں اور تیری ناشکری نہیں کرتے، اور ہم الگ کرتے ہیں اور چھوڑتے ہیں ہر اس شخص کو جو تیری نافرمانی کرے۔ اے اللہ! ہم تیری ہی عبادت کرتے ہیں، اور تیرے ہی لیے نماز پڑھتے ہیں اور سجدہ کرتے ہیں، اور تیری ہی طرف دوڑتے ہیں اور حاضر ہوتے ہیں، اور ہم تیری رحمت کے امیدوار ہیں اور تیرے عذاب سے ڈرتے ہیں، بیشک تیرا عذاب کافروں کو پہنچنے والا ہے۔',
        englishTranslation: 'O Allah, we seek Your help and Your forgiveness, we believe in You and rely upon You, and we praise You in the best manner. We thank You and are not ungrateful to You, and we forsake and turn away from whoever disobeys You. O Allah, You alone do we worship, and to You we pray and prostrate, and toward You we strive and hasten. We hope for Your mercy and fear Your punishment; indeed, Your punishment will overtake the disbelievers.'
      },
      {
        titleEn: 'Du\'a al-Qunoot (Hadith of Hasan ibn Ali)',
        titleUr: 'دعائے قنوت (حدیثِ حسن بن علیؓ)',
        arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَىٰ عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
        transliteration: 'Allahummahdini fiman hadayt, wa \'afini fiman \'afayt, wa tawallani fiman tawallayt, wa barik li fima a\'tayt, wa qini sharra ma qadayt, fa-innaka taqdi wa la yuqda \'alayk, wa innahu la yadhillu man walayt, wa la ya\'izzu man \'adayt, tabarakta Rabbana wa ta\'alayt.',
        urduTranslation: 'اے اللہ! مجھے ہدایت دے ان لوگوں کے ساتھ جنہیں تو نے ہدایت دی، اور مجھے عافیت دے ان لوگوں کے ساتھ جنہیں تو نے عافیت دی، اور میرا کارساز بن ان لوگوں کے ساتھ جن کا تو کارساز بنا، اور مجھے برکت دے اس میں جو تو نے عطا فرمایا، اور مجھے بچا اس شر سے جو تو نے مقدر فرمایا، کیونکہ تو ہی فیصلہ فرماتا ہے اور تیرے خلاف فیصلہ نہیں کیا جا سکتا، اور بیشک ذلیل نہیں ہوتا وہ جس کا تو دوست بنے، اور عزت نہیں پا سکتا وہ جس سے تو دشمنی رکھے، اے ہمارے پروردگار! تو بابرکت اور بہت بلند و بالا ہے۔',
        englishTranslation: 'O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being, take me into Your care among those You have taken into care, bless me in what You have bestowed, and protect me from the evil You have decreed. For indeed You decree and none can decree against You. Never is he humiliated whom You befriend, nor is he exalted whom You oppose. Blessed are You, our Lord, and Exalted.',
        note: 'Narrated in Sunan Abi Dawud (1425) and Jami` at-Tirmidhi (464) - Sahih.'
      }
    ],
    rulings: [
      {
        en: 'If someone forgets to recite Du\'a al-Qunoot and goes into Ruku, they should perform Sajdah Sahw at the end.',
        ur: 'اگر کوئی دعائے قنوت پڑھنا بھول جائے اور رکوع میں چلا جائے تو سجدۂ سہو کرنا واجب ہے۔'
      }
    ]
  },
  {
    id: 'namaz-e-jummah',
    nameEn: 'Namaz-e-Jummah (Friday Prayer)',
    nameUr: 'نمازِ جمعہ کی فضیلت اور طریقہ',
    nameAr: 'صَلَاةُ الجُمُعَة',
    category: 'fard',
    totalRakat: '2 Fard with Imam (Total: 14 Rakat)',
    timing: 'At Dhuhr time on Friday with congregational Khutbah',
    timingUr: 'جمعۃ المبارک کے دن ظہر کے وقت خطبے کے ساتھ',
    summaryEn: 'The weekly master of all days: listening silently to the two Khutbahs is obligatory, followed by 2 Fard Rak\'ats in congregation.',
    summaryUr: 'ہفتے کا سب سے افضل دن: خطبہ سننا واجب ہے، جس کے بعد ۲ رکعت فرض باجماعت ادا کی جاتی ہے۔',
    virtues: [
      'The best day on which the sun has risen is Friday (Sahih Muslim 854).',
      'Whoever performs Ghusl, uses fragrance, and goes early to Friday prayer has sins forgiven from that Friday to the next (Sahih al-Bukhari 883).',
      'Surah Al-Kahf recitation on Friday illuminates the believer with divine light between the two Fridays.'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: '4 Sunnah before Khutbah',
        titleUr: 'خطبے سے پہلے ۴ سنتیں',
        instructionsEn: 'Upon reaching the Masjid, pray 4 Sunnah Mu\'akkadah before the Imam ascends the Minbar for the Khutbah.',
        instructionsUr: 'مسجد پہنچ کر خطبے سے پہلے ۴ رکعت سنت مؤکدہ ادا کریں۔'
      },
      {
        stepNumber: 2,
        titleEn: 'Listening to the Khutbah',
        titleUr: 'خطبہ توجہ اور خاموشی سے سننا',
        instructionsEn: 'Complete silence is mandatory during both sermons. Talking, texting, or greeting others is strictly prohibited while the Imam delivers the Khutbah.',
        instructionsUr: 'خطبے کے دوران مکمل خاموشی واجب ہے۔ بات کرنا، موبائل چلانا یا تسبیح پڑھنا منع ہے۔'
      },
      {
        stepNumber: 3,
        titleEn: '2 Fard behind the Imam',
        titleUr: 'امام کے پیچھے ۲ رکعت فرض',
        instructionsEn: 'Pray 2 Fard rak\'ats behind the Imam with vocal recitation of Surah Al-Fatiha and Quranic passage in both rak\'ats.',
        instructionsUr: 'امام کے پیچھے ۲ رکعت فرض باجماعت ادا کریں جس میں امام جہری قراءت فرمائے گا۔'
      },
      {
        stepNumber: 4,
        titleEn: 'Sunnahs after Fard',
        titleUr: 'فرض کے بعد کی سنتیں',
        instructionsEn: 'Pray 4 Sunnah Mu\'akkadah, then 2 Sunnah, and 2 Nafl after the 2 Fard.',
        instructionsUr: 'فرض کے بعد ۴ رکعت سنت، پھر ۲ رکعت سنت اور ۲ رکعت نفل ادا کریں۔'
      }
    ],
    rulings: [
      {
        en: 'Missing three Friday prayers out of negligence causes a seal to be placed over the heart (Sunan Abi Dawud).',
        ur: 'سستی کی وجہ سے لگاتار تین جمعے چھوڑنے والے کے دل پر مہر لگا دی جاتی ہے۔'
      }
    ]
  },
  {
    id: 'namaz-e-eid',
    nameEn: 'Namaz-e-Eid (Eid-ul-Fitr & Eid-ul-Adha)',
    nameUr: 'نمازِ عیدین کا مکمل طریقہ (۶ زائد تکبیرات)',
    nameAr: 'صَلَاةُ العِيدَيْن',
    category: 'wajib',
    totalRakat: '2 Rakat with Extra Takbeers',
    timing: 'Between Sunrise (after Ishraq) and Solar Noon (Zawal)',
    timingUr: 'سورج نیزہ بھر بلند ہونے سے زوال کے وقت تک',
    summaryEn: 'Celebratory congregational prayer for Eid-ul-Fitr and Eid-ul-Adha with extra Takbeers, followed by the Eid Khutbah.',
    summaryUr: 'عید الفطر اور عید الاضحیٰ کی ۲ رکعت واجب نماز جس میں ۶ زائد تکبیریں کہی جاتی ہیں اور بعد میں خطبہ ہوتا ہے۔',
    virtues: [
      'A sign of communal unity, gratitude, and joy for Muslims worldwide.',
      'Sunnah to take a different route on the way back from Eid prayer.'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: '1st Rakat: 3 Extra Takbeers',
        titleUr: 'پہلی رکعت: ۳ زائد تکبیریں',
        instructionsEn: 'Make the intention: "I intend to pray 2 rak\'ats of Eid-ul-Fitr/Adha with 6 extra Takbeers behind this Imam." After opening Takbeer, recite Thana. The Imam will then say 3 extra Takbeers: On the 1st and 2nd, raise hands to ears and drop to sides. On the 3rd, raise hands to ears and fold hands below the navel. Then the Imam recites Surah Al-Fatiha and a Surah, followed by normal Ruku and Sujud.',
        instructionsUr: 'نیت کریں: "نیت کی میں نے ۲ رکعت نمازِ عید واجب مع ۶ زائد تکبیروں کے پیچھے اس امام کے۔" تکبیرِ تحریمہ کے بعد ثناء پڑھیں۔ پھر امام ۳ زائد تکبیریں کہے گا: پہلی اور دوسری تکبیر پر ہاتھ کانوں تک اٹھا کر چھوڑ دیں، تیسری تکبیر پر ہاتھ اٹھا کر ناف کے نیچے باندھ لیں۔ پھر امام قراءت کر کے رکوع و سجود کرے گا۔'
      },
      {
        stepNumber: 2,
        titleEn: '2nd Rakat: 3 Extra Takbeers before Ruku',
        titleUr: 'دوسری رکعت: رکوع سے پہلے ۳ زائد تکبیریں',
        instructionsEn: 'Stand up for the 2nd rak\'ah. The Imam recites Surah Al-Fatiha and a Surah. Before going into Ruku, the Imam says 3 extra Takbeers: On all 3, raise hands to ears and drop them to your sides. On the 4th Takbeer, go straight into Ruku without raising hands. Complete the prayer with Sujud, Tashahhud, Durood, and Salam, then listen to the Khutbah.',
        instructionsUr: 'دوسری رکعت میں پہلے امام سورۂ فاتحہ اور سورت پڑھے گا۔ رکوع سے پہلے امام ۳ زائد تکبیریں کہے گا جن پر ہاتھ اٹھا کر چھوڑ دینے ہیں۔ چوتھی تکبیر پر بغیر ہاتھ اٹھائے رکوع میں چلے جائیں، نماز مکمل کریں اور پھر خطبہ سنیں۔'
      }
    ],
    rulings: [
      {
        en: 'The Eid Khutbah is delivered AFTER the prayer, unlike Friday prayer.',
        ur: 'نمازِ عید کا خطبہ نماز کے بعد ہوتا ہے اور اسے سننا سنت ہے۔'
      }
    ]
  },
  {
    id: 'namaz-e-tahajjud',
    nameEn: 'Namaz-e-Tahajjud (Qiyam al-Layl)',
    nameUr: 'نمازِ تہجد (قیام اللیل) کا طریقہ و فضیلت',
    nameAr: 'صَلَاةُ التَّهَجُّد',
    category: 'nafl',
    totalRakat: '2 to 8 Rakat (prayed in pairs of 2)',
    timing: 'Last third of the night before Fajr dawn',
    timingUr: 'رات کے آخری تہائی حصے میں فجر سے پہلے',
    summaryEn: 'The most virtuous voluntary prayer performed after waking from sleep during the last third of the night when Allah descends to the lowest heaven.',
    summaryUr: 'نوافل میں سب سے افضل نماز جو رات کو سو کر اٹھنے کے بعد فجر سے پہلے ادا کی جاتی ہے۔ اللہ تعالیٰ آسمانِ دنیا پر نزول فرما کر پکارتا ہے کہ کوئی مانگنے والا ہے؟',
    virtues: [
      'The Prophet ﷺ said: "The best prayer after the obligatory prayers is the night prayer (Tahajjud)" (Sahih Muslim 1163).',
      'Duas made during Tahajjud are like arrows that never miss their target (Imam Ash-Shafi\'i).',
      'Brings light to the face, peace to the heart, and forgiveness for sins.'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Waking up & Wudu',
        titleUr: 'بیداری، مسواک اور وضو',
        instructionsEn: 'Wake up in the last third of the night, use the Miswak, perform a fresh Wudu, and make the intention for Tahajjud prayer for the sake of Allah.',
        instructionsUr: 'رات کے آخری حصے میں اٹھیں، مسواک کریں، وضو بنائیں اور اللہ کی رضا کے لیے نمازِ تہجد کی نیت کریں۔'
      },
      {
        stepNumber: 2,
        titleEn: 'Praying in Pairs (2 by 2)',
        titleUr: 'دو دو رکعت کر کے نفل پڑھنا',
        instructionsEn: 'Perform 2, 4, 6, or 8 rak\'ats in units of 2. Prolong the Qiyam (reciting beautiful Quranic surahs), Ruku, and Sujud with heartfelt Duas.',
        instructionsUr: 'کم از کم ۲ اور زیادہ سے زیادہ ۸ یا ۱۲ رکعتیں دو دو رکعت کر کے پڑھیں، رکوع اور سجدوں میں خشوع اور لمبی دعائیں کریں۔'
      }
    ],
    specialDuas: [
      {
        titleEn: 'Tahajjud Supplication of the Prophet ﷺ',
        titleUr: 'نبی کریم ﷺ کی تہجد کے وقت کی دعا',
        arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالأَرْضِ وَمَنْ فِيهِنَّ، أَنْتَ الْحَقُّ وَوَعْدُكَ الْحَقُّ وَلِقَاؤُكَ حَقٌّ وَالْجَنَّةُ حَقٌّ وَالنَّارُ حَقٌّ',
        transliteration: 'Allahumma lakal-hamdu Anta nurus-samawati wal-ardi wa man fihinna, wa lakal-hamdu Anta qayyimus-samawati wal-ardi wa man fihinna, Antal-Haqqu wa wa\'dukal-haqqu wa liqa\'uka haqqun wal-jannatu haqqun wan-naru haqq.',
        urduTranslation: 'اے اللہ! تیرے ہی لیے تمام تعریفیں ہیں، تو آسمانوں اور زمین اور جو کچھ ان میں ہے ان سب کا نور ہے، اور تیرے ہی لیے تمام تعریفیں ہیں، تو آسمانوں اور زمین اور جو کچھ ان میں ہے ان کا سنبھالنے والا ہے، تو ہی برحق ہے، تیرا وعدہ سچا ہے، تیری ملاقات برحق ہے، جنت برحق ہے اور جہنم برحق ہے۔',
        englishTranslation: 'O Allah, to You belongs all praise; You are the Light of the heavens and the earth and all that is in them. To You belongs all praise; You are the Sustainer of the heavens and the earth and all that is in them. You are the Truth, Your promise is true, Your meeting is true, Paradise is true, and Hellfire is true.',
        note: 'Sahih al-Bukhari 1120'
      }
    ],
    rulings: [
      {
        en: 'If you have not prayed Witr, conclude your Tahajjud by praying Witr at the end.',
        ur: 'اگر عشاء کے ساتھ وتر نہ پڑھے ہوں تو تہجد کے بعد آخر میں وتر ادا کریں۔'
      }
    ]
  },
  {
    id: 'namaz-e-istikhara',
    nameEn: 'Namaz-e-Istikhara (Divine Guidance Prayer)',
    nameUr: 'نمازِ استخارہ اور دعا کا مکمل طریقہ',
    nameAr: 'صَلَاةُ الاسْتِخَارَة',
    category: 'nafl',
    totalRakat: '2 Rakat Nafl',
    timing: 'Any non-prohibited time before making an important decision',
    timingUr: 'کسی بھی اہم فیصلے سے پہلے مکروہ اوقات کے علاوہ',
    summaryEn: 'A 2-rak\'ah prayer seeking Allah\'s divine guidance and blessing when deciding between permissible matters (marriage, career, travel, purchases).',
    summaryUr: 'کسی جائز معاملے (شادی، کاروبار، سفر، نوکری وغیرہ) میں خیر اور بھلائی کا فیصلہ اللہ کے سپرد کرنے کے لیے ۲ رکعت نفل اور مسنون دعا۔',
    virtues: [
      'Jabir ibn Abdullah (RA) said: "The Messenger of Allah ﷺ used to teach us Istikhara in all matters just as he taught us a Surah from the Qur\'an" (Sahih al-Bukhari 1162).',
      'The one who seeks guidance from the All-Wise Creator will never regret their path.'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: '2 Rakat Nafl',
        titleUr: 'دو رکعت نفل نماز',
        instructionsEn: 'Pray 2 rak\'ats of voluntary prayer with sincerity. In the 1st rak\'ah recite Surah Al-Kafirun, and in the 2nd recite Surah Al-Ikhlas after Surah Al-Fatiha.',
        instructionsUr: 'دو رکعت نفل پڑھیں، پہلی رکعت میں سورۂ فاتحہ کے بعد سورۂ کافرون اور دوسری میں سورۂ اخلاص پڑھنا افضل ہے۔'
      },
      {
        stepNumber: 2,
        titleEn: 'Reciting the Istikhara Dua',
        titleUr: 'سلام کے بعد دعائے استخارہ',
        instructionsEn: 'After the Salam, raise hands, praise Allah, send blessings upon the Prophet ﷺ, and recite the authentic Istikhara Dua, mentioning your specific matter at the highlighted part.',
        instructionsUr: 'سلام پھیرنے کے بعد اللہ کی حمد و ثناء اور درود شریف پڑھیں، پھر دعائے استخارہ مانگیں اور دعا کے درمیان اپنی ضرورت کا تذکرہ کریں۔'
      }
    ],
    specialDuas: [
      {
        titleEn: 'The Complete Istikhara Supplication',
        titleUr: 'مکمل دعائے استخارہ',
        arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ. اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ [تسمي حاجتك] خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ',
        transliteration: 'Allahumma inni astakhiruka bi-\'ilmika, wa astaqdiruka bi-qudratika, wa as\'aluka min fadlikal-\'azim, fa-innaka taqdiru wa la aqdir, wa ta\'lamu wa la a\'lam, wa Anta \'Allamul-ghuyub. Allahumma in kunta ta\'lamu anna hadhal-amra [name matter] khayrul-li fi dini wa ma\'ashi wa \'aqibati amri, faqdurhu li wa yassirhu li thumma barik li fih. Wa in kunta ta\'lamu anna hadhal-amra sharrul-li fi dini wa ma\'ashi wa \'aqibati amri, fasrifhu \'anni wasrifni \'anhu, waqdur liyal-khayra haythu kana thumma ardini bih.',
        urduTranslation: 'اے اللہ! میں تیرے علم کی برکت سے تجھ سے خیر مانگتا ہوں اور تیری قدرت کے ذریعے تجھ سے طاقت مانگتا ہوں، اور تیرے فضلِ عظیم کا سوال کرتا ہوں، کیونکہ تو قادر ہے اور میں بے بس ہوں، تو جانتا ہے اور میں نہیں جانتا، اور تو ہی تمام پوشیدہ باتوں کا جاننے والا ہے۔ اے اللہ! اگر تو جانتا ہے کہ یہ کام [اپنا کام ذہن میں لائیں] میرے دین، میری دنیا، اور میرے انجامِ کار کے حق میں بہتر ہے، تو اسے میرے مقدر میں کر دے اور میرے لیے آسان فرما دے، پھر اس میں میرے لیے برکت ڈال دے۔ اور اگر تو جانتا ہے کہ یہ کام میرے دین، میری دنیا، اور میرے انجام کے لحاظ سے برا ہے، تو اسے مجھ سے پھیر دے اور مجھے اس سے پھیر دے، اور جہاں بھی بھلائی ہو وہ میرے مقدر میں فرما دے، پھر مجھے اس پر راضی کر دے۔',
        englishTranslation: 'O Allah, I seek Your counsel through Your knowledge, and I seek ability through Your power, and I ask You from Your great favor. For You are capable and I am not, You know and I do not know, and You are the Knower of the unseen. O Allah, if You know that this matter is good for me in my religion, my livelihood, and the outcome of my affairs, then decree it for me, facilitate it for me, and then bless me in it. And if You know that this matter is evil for me in my religion, my livelihood, and the outcome of my affairs, then turn it away from me and turn me away from it, and decree for me good wherever it may be, and then make me pleased with it.'
      }
    ],
    rulings: [
      {
        en: 'Dream is NOT a condition for Istikhara. Rather, observe which path becomes easier and where your heart finds tranquility.',
        ur: 'استخارہ میں خواب آنا ضروری نہیں، بلکہ جس طرف دل کا میلان ہو اور اللہ تعالیٰ آسانی پیدا فرما دے وہی بہتر راستہ ہے۔'
      }
    ]
  },
  {
    id: 'namaz-e-tasbih',
    nameEn: 'Namaz-e-Tasbih (Prayer of Glorification)',
    nameUr: 'صلوٰۃ التسبیح کا طریقہ اور فضیلت',
    nameAr: 'صَلَاةُ التَّسْبِيح',
    category: 'nafl',
    totalRakat: '4 Rakat Nafl (300 Tasbihat)',
    timing: 'Any non-makrooh time (daily, weekly, monthly, or once in a lifetime)',
    timingUr: 'مکروہ اوقات کے علاوہ (روزانہ، جمعہ کے دن، مہینے میں یا زندگی میں ایک بار)',
    summaryEn: 'A blessed 4-rak\'ah prayer wherein the Tasbih "Subhanallahi wal-hamdulillahi wa la ilaha illallahu wallahu akbar" is repeated 75 times in each rak\'ah, totaling 300 times, forgiving all sins.',
    summaryUr: 'چار رکعت نفل جس میں تیسرا کلمہ (سبحان الله والحمد لله ولا إله إلا الله والله أكبر) ہر رکعت میں ۷۵ بار، کل ۳۰۰ بار پڑھا جاتا ہے۔ اس سے اگلے پچھلے تمام گناہ معاف ہو جاتے ہیں۔',
    virtues: [
      'The Prophet ﷺ taught this prayer to his uncle Abbas (RA) saying: "If you pray it, Allah will forgive all your sins: the first and last of them, old and new, unintentional and intentional, small and great" (Sunan Abi Dawud 1297).'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Where the 75 Tasbihs are recited in each Rakat',
        titleUr: 'ہر رکعت میں ۷۵ بار تسبیح کا حساب',
        instructionsEn: '1. After Thana, recite 15 times.\n2. After Surah Al-Fatiha and Surah, recite 10 times.\n3. In Ruku (after Subhana Rabbiyal \'Azeem), recite 10 times.\n4. In Qawmah (standing after Ruku), recite 10 times.\n5. In 1st Sujud (after Subhana Rabbiyal A\'la), recite 10 times.\n6. In Jalsah (sitting between Sujud), recite 10 times.\n7. In 2nd Sujud (after Subhana Rabbiyal A\'la), recite 10 times.\nTotal: 75 times per rak\'ah × 4 rak\'ahs = 300 times.',
        instructionsUr: '۱۔ ثناء کے بعد: ۱۵ بار\n۲۔ سورۂ فاتحہ اور سورت کے بعد: ۱۰ بار\n۳۔ رکوع میں سبحان ربی العظیم کے بعد: ۱۰ بار\n۴۔ رکوع سے کھڑے ہو کر (قومہ میں): ۱۰ بار\n۵۔ پہلے سجدے میں: ۱۰ بار\n۶۔ دونوں سجدوں کے درمیان بیٹھ کر (جلسہ میں): ۱۰ بار\n۷۔ دوسرے سجدے میں: ۱۰ بار\nکل ملا کر ہر رکعت میں ۷۵ بار × ۴ رکعتیں = ۳۰۰ بار۔'
      }
    ],
    specialDuas: [
      {
        titleEn: 'The Tasbih Formula',
        titleUr: 'صلوٰۃ التسبیح کا کلمہ',
        arabic: 'سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَٰهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ',
        transliteration: 'Subhanallahi, wal-hamdulillahi, wa la ilaha illallahu, wallahu akbar.',
        urduTranslation: 'اللہ پاک ہے، اور تمام تعریفیں اللہ ہی کے لیے ہیں، اور اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے۔',
        englishTranslation: 'Glory be to Allah, all praise is for Allah, there is no god but Allah, and Allah is the Greatest.'
      }
    ],
    rulings: [
      {
        en: 'Do not count on fingers using motions that disrupt concentration; rather press lightly with fingertips.',
        ur: 'انگلیوں پر تسبیح گنتے وقت انگلیاں ہلانے سے بچیں تاکہ نماز کی ہیئت متاثر نہ ہو۔'
      }
    ]
  },
  {
    id: 'namaz-e-musafir',
    nameEn: 'Musafir ki Namaz (Traveler\'s Prayer - Qasr & Jam\')',
    nameUr: 'مسافر کی نماز (قصر اور جمع کرنے کے مسائل)',
    nameAr: 'صَلَاةُ المُسَافِرِ وَالقَصْر',
    category: 'special',
    totalRakat: 'Shortening 4 Fard to 2 Rakat',
    timing: 'When traveling approximately 48 miles / 77+ km away from home',
    timingUr: 'اپنے شہر سے تقریباً ۴۸ میل (۷۷ کلومیٹر) یا اس سے زیادہ کے سفر پر',
    summaryEn: 'A divine ease (Rukhsah) granted by Allah allowing a traveler to shorten 4-rak\'ah Fard prayers (Dhuhr, Asr, Isha) into 2 rak\'ats.',
    summaryUr: 'اللہ تعالیٰ کی طرف سے دی گئی رخصت اور تحفہ کہ مسافر ظہر، عصر اور عشاء کی ۴ رکعت فرضوں کی جگہ صرف ۲ رکعت قصر پڑھے۔',
    virtues: [
      'The Prophet ﷺ said: "It is a charity that Allah has bestowed upon you, so accept His charity" (Sahih Muslim 686).'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Distance & Duration Rules',
        titleUr: 'مسافت اور قیام کی مدت',
        instructionsEn: 'A person becomes a Musafir upon leaving their home city with the intention to travel at least 48 miles (~77 km). If intending to stay at the destination for less than 15 days, they remain a Musafir and must pray Qasr.',
        instructionsUr: 'اپنے شہر کی حدود سے باہر نکلنے پر اگر ارادہ ۷۷ کلومیٹر یا زیادہ سفر کا ہو اور جائے قیام پر ۱۵ دن سے کم ٹھہرنے کی نیت ہو تو وہ شخص شرعاً مسافر ہے اور قصر کرے گا۔'
      },
      {
        stepNumber: 2,
        titleEn: 'Which Prayers are Shortened',
        titleUr: 'کون سی نمازیں قصر کی جائیں گی؟',
        instructionsEn: 'Dhuhr (4 Fard -> 2), Asr (4 Fard -> 2), Isha (4 Fard -> 2). Fajr (2 Fard) and Maghrib (3 Fard) remain unchanged. Witr remains 3 rak\'ats.',
        instructionsUr: 'ظہر کے ۴ فرض کی جگہ ۲، عصر کے ۴ کی جگہ ۲، اور عشاء کے ۴ کی جگہ ۲ فرض پڑھے جائیں گے۔ فجر کے ۲، مغرب کے ۳ اور وتر کے ۳ فرض ویسے ہی رہیں گے۔'
      }
    ],
    rulings: [
      {
        en: 'If a traveler prays behind a resident (Muqeem) Imam, the traveler must follow the Imam and complete the full 4 rak\'ats.',
        ur: 'اگر مسافر کسی مقیم امام کے پیچھے نماز پڑھے تو وہ امام کے ساتھ پوری ۴ رکعت پڑھے گا۔'
      }
    ]
  },
  {
    id: 'sajdah-sahw-tilawat',
    nameEn: 'Sajdah Sahw & Sajdah Tilawat (Mistake & Recitation Prostrations)',
    nameUr: 'سجدۂ سہو اور سجدۂ تلاوت کا شرعی طریقہ',
    nameAr: 'سُجُودُ السَّهْوِ وَسُجُودُ التِّلَاوَة',
    category: 'special',
    totalRakat: 'Compensatory Prostrations',
    timing: 'When a wajib is omitted by mistake, or when a sajdah ayah is recited',
    timingUr: 'نماز میں بھول چوک پر یا قرآن کی آیتِ سجدہ تلاوت کرنے پر',
    summaryEn: 'Sajdah Sahw repairs deficiencies in prayer caused by forgetfulness. Sajdah Tilawat is prostrating upon reciting or hearing any of the 14/15 Quranic Sajdah verses.',
    summaryUr: 'سجدۂ سہو نماز میں کسی واجب کے بھولے سے چھوٹ جانے یا تاخیر پر کیا جاتا ہے، جبکہ سجدۂ تلاوت قرآن مجید کی چودہ آیاتِ سجدہ پر واجب ہوتا ہے۔',
    virtues: [
      'The Prophet ﷺ said: "When the son of Adam recites an ayah of Sajdah and prostrates, Satan withdraws weeping, saying: \'Woe to me! The son of Adam was commanded to prostrate and he did, so for him is Paradise...\'" (Sahih Muslim 81).'
    ],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Method of Sajdah Sahw (سجدۂ سہو کا طریقہ)',
        titleUr: 'سجدۂ سہو کا طریقہ',
        instructionsEn: 'In the final sitting (Qa\'dah Akhirah), recite Attahiyyat completely. Turn head to the right saying "As-salamu \'alaykum wa rahmatullah" (one Salam). Then say "Allahu Akbar" and perform 2 full prostrations with "Subhana Rabbiyal A\'la" (3x) in each. Rise back into sitting position, recite Attahiyyat, Durood-e-Ibrahim, Dua Masoora, and conclude the prayer with both Salams.',
        instructionsUr: 'آخری قعدہ میں التحیات مکمل پڑھیں۔ صرف دائیں طرف ایک سلام پھیریں۔ پھر "اللہ اکبر" کہتے ہوئے دو سجدے کریں اور تسبیح پڑھیں۔ سجدوں کے بعد دوبارہ بیٹھ کر التحیات، درود شریف اور دعا پڑھ کر دونوں طرف سلام پھیر دیں۔'
      },
      {
        stepNumber: 2,
        titleEn: 'Method of Sajdah Tilawat (سجدۂ تلاوت کا طریقہ)',
        titleUr: 'سجدۂ تلاوت کا طریقہ',
        instructionsEn: 'Stand facing the Qibla with Wudu. Without raising hands, say "Allahu Akbar" and go straight into Sujud. Say "Subhana Rabbiyal A\'la" 3 times (or the special dua), then say "Allahu Akbar" and stand back upright. There is no Tashahhud and no Salam.',
        instructionsUr: 'باوضو قبلہ رخ کھڑے ہوں۔ ہاتھ اٹھائے بغیر "اللہ اکبر" کہتے ہوئے سیدھے سجدے میں جائیں۔ تین بار سجدے کی تسبیح پڑھیں، پھر "اللہ اکبر" کہتے ہوئے کھڑے ہو جائیں۔ اس میں نہ تشہد ہے نہ سلام۔'
      }
    ],
    specialDuas: [
      {
        titleEn: 'Dua of Sajdah Tilawat',
        titleUr: 'سجدۂ تلاوت کی مسنون دعا',
        arabic: 'سَجَدَ وَجْهِي لِلَّذِي خَلَقَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ، بِحَوْلِهِ وَقُوَّتِهِ، فَتَبَارَكَ اللهُ أَحْسَنُ الْخَالِقِينَ',
        transliteration: 'Sajada wajhiya lilladhi khalaqahu, wa shaqqa sam\'ahu wa basarahu, bi-hawlihi wa quwwatih, fatabarakallahu ahsanul-khaliqin.',
        urduTranslation: 'میرے چہرے نے اس ذات کو سجدہ کیا جس نے اسے پیدا فرمایا، اور اپنی قدرت و طاقت سے اس کے کان اور آنکھیں بنائیں، پس بڑی برکت والا ہے اللہ جو سب سے بہترین پیدا کرنے والا ہے۔',
        englishTranslation: 'My face has prostrated to the One Who created it and brought forth its hearing and sight by His might and His power. Blessed is Allah, the Best of creators.',
        note: 'Jami` at-Tirmidhi 3425 - Sahih.'
      }
    ],
    rulings: [
      {
        en: 'Sajdah Sahw is required only for forgetting a Wajib (e.g. Surah Fatihah, first sitting, Qunoot) or delaying a Fard rukn. It is NOT required for omitting a Sunnah or Nafl.',
        ur: 'سجدۂ سہو صرف واجب کے چھوٹنے یا فرض میں تاخیر پر واجب ہوتا ہے، سنت چھوٹنے پر سجدۂ سہو نہیں ہوتا۔'
      }
    ]
  }
];
