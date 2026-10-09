import { DuaItem } from '../types';

export const DUA_CATEGORIES = [
  'All',
  'Daily & Routine',
  'Morning & Evening',
  'Sleep & Waking',
  'Protection & Evil Eye',
  'Anxiety & Distress',
  'Forgiveness & Repentance',
  'Parents & Family',
  'Quranic Duas (Rabbana)',
  'Travel & Journey',
  'Food & Eating',
  'Mosque & Salah',
  'Ramadan & Fasting'
];

export const AUTHENTIC_DUAS: DuaItem[] = [
  {
    id: 'dua-waking',
    titleEn: 'Upon Waking Up',
    titleUr: 'بیدار ہونے کے بعد کی دعا',
    category: 'Sleep & Waking',
    arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillaahil-lazee ahyaanaa ba\'da maa amaatanaa wa ilayhin-nushoor',
    translationEn: 'All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection.',
    translationUr: 'سب تعریف اللہ کے لیے ہے جس نے ہمیں مارنے کے بعد زندہ کیا اور اسی کی طرف اٹھنا ہے۔',
    reference: 'Sahih al-Bukhari 6312, Sahih Muslim 2711',
    benefit: 'Revives immediate gratitude to Allah upon starting a new day of life and consciousness.'
  },
  {
    id: 'dua-sleep',
    titleEn: 'Before Sleeping',
    titleUr: 'سونے سے پہلے کی دعا',
    category: 'Sleep & Waking',
    arabicText: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allaahumma amootu wa ahyaa',
    translationEn: 'In Your name, O Allah, I die and I live.',
    translationUr: 'اے اللہ! میں تیرے نام کے ساتھ ہی مرتا ہوں اور جیتا ہوں۔',
    reference: 'Sahih al-Bukhari 6324',
    benefit: 'Places one\'s soul into divine sanctuary during sleep, which is the minor death.'
  },
  {
    id: 'dua-anxiety',
    titleEn: 'For Anxiety, Grief & Distress',
    titleUr: 'غم، پریشانی اور بے چینی سے پناہ کی دعا',
    category: 'Anxiety & Distress',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allaahumma innee a\'oodhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala\'id-dayni wa ghalabatir-rijaal',
    translationEn: 'O Allah, I seek refuge in You from anxiety and grief, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.',
    translationUr: 'اے اللہ! میں غم و اندوہ سے، عاجزی و سستی سے، بخل و بزدلی سے، قرض کے بوجھ اور لوگوں کے دباؤ سے تیری پناہ مانگتا ہوں۔',
    reference: 'Sahih al-Bukhari 2893',
    benefit: 'The Prophet (ﷺ) frequently supplicated with this comprehensive protection from mental and emotional anguish.'
  },
  {
    id: 'dua-rabbana-dunya',
    titleEn: 'For Goodness in This World & the Hereafter',
    titleUr: 'دنیا اور آخرت کی بھلائی کی جامع دعا',
    category: 'Quranic Duas (Rabbana)',
    arabicText: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbanaa aatinaa fid-dunyaa hasanatanw wa fil-aakhirati hasanatanw wa qinaa \'adhaaban-naar',
    translationEn: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
    translationUr: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔',
    reference: 'Surah Al-Baqarah 2:201',
    benefit: 'The most frequent Dua recited by the Prophet Muhammad (ﷺ), combining all temporal and eternal felicity.'
  },
  {
    id: 'dua-parents',
    titleEn: 'For Mercy upon Parents',
    titleUr: 'والدین کے لیے رحمت و بخشش کی دعا',
    category: 'Parents & Family',
    arabicText: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhumaa kamaa rabbayaanee sagheeraa',
    translationEn: 'My Lord, have mercy upon them both as they brought me up when I was small.',
    translationUr: 'اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں مجھے پالا پرورش کیا۔',
    reference: 'Surah Al-Isra 17:24',
    benefit: 'Fulfills filial duty and continuous charity (Sadaqah Jariyah) for loving parents.'
  },
  {
    id: 'dua-forgiveness-sayyid',
    titleEn: 'Sayyidul Istighfar (The Master Supplication for Forgiveness)',
    titleUr: 'سید الاستغفار (بخشش کی عظیم ترین دعا)',
    category: 'Forgiveness & Repentance',
    arabicText: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allaahumma Anta Rabbee laa ilaaha illaa Anta, khalaqtanee wa ana \'abduka, wa ana \'alaa \'ahdika wa wa\'dika mastata\'tu, a\'oodhu bika min sharri maa sana\'tu, aboo\'u laka bini\'matika \'alayya, wa aboo\'u laka bidhanbee faghfir lee fa-innahoo laa yaghfirudh-dhunooba illaa Anta',
    translationEn: 'O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I confess my sins to You, so forgive me, for none forgives sins except You.',
    translationUr: 'اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے اعمال کے شر سے تیری پناہ مانگتا ہوں۔ میں اپنے اوپر تیری نعمتوں کا اعتراف کرتا ہوں اور اپنے گناہوں کا اقرار کرتا ہوں، پس مجھے بخش دے، کیونکہ تیرے سوا کوئی گناہوں کو نہیں بخش سکتا۔',
    reference: 'Sahih al-Bukhari 6306',
    benefit: 'Whoever recites it with conviction during the morning or evening and dies that day/night will be among the people of Paradise (Bukhari).'
  },
  {
    id: 'dua-protection-evil',
    titleEn: 'Complete Protection Against Harm & Calamity',
    titleUr: 'ہر قسم کے شر اور ناگہانی آفت سے بچاؤ کی دعا',
    category: 'Protection & Evil Eye',
    arabicText: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillaahil-lazee laa yadurru ma\'as-mihee shay\'un fil-ardi wa laa fis-samaaa\'i wa Huwas-Samee\'ul-\'Aleem',
    translationEn: 'In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    translationUr: 'اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی اور وہ خوب سننے والا، سب جاننے والا ہے۔',
    reference: 'Sunan Abu Dawud 5088, Jami` at-Tirmidhi 3388 (Sahih)',
    benefit: 'Recited 3 times in morning and 3 times in evening: nothing will cause harm on that day/night.'
  },
  {
    id: 'dua-travel',
    titleEn: 'Supplication for Travel & Journey',
    titleUr: 'سفر کی مسنون دعا',
    category: 'Travel & Journey',
    arabicText: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    transliteration: 'Subhaanal-lazee sakh-khara lanaa haadhaa wa maa kunnaa lahoo muqrineen, wa innaaa ilaa Rabbinaa lamunqaliboon',
    translationEn: 'Exalted is He who has subjected this to us, and we could not have [otherwise] subdued it. And indeed, to our Lord we will return.',
    translationUr: 'پاک ہے وہ ذات جس نے اس (سواری) کو ہمارے قابو میں کر دیا حالانکہ ہم اسے قابو میں لانے والے نہ تھے، اور یقیناً ہم اپنے رب کی طرف لوٹ کر جانے والے ہیں۔',
    reference: 'Surah Az-Zukhruf 43:13-14, Sahih Muslim 1342',
    benefit: 'Safeguards travelers and reminds the believer of the ultimate journey back to Allah.'
  },
  {
    id: 'dua-iftar',
    titleEn: 'At the Time of Breaking the Fast (Iftar)',
    titleUr: 'افطار کے وقت کی دعا',
    category: 'Ramadan & Fasting',
    arabicText: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahabadh-dhama\'u wabtallatil-\'urooqu wa thabatal-ajru in shaaa\'Allaah',
    translationEn: 'The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.',
    translationUr: 'پیاس چلی گئی، رگیں تر ہو گئیں اور اجر و ثواب اللہ نے چاہا تو ثابت ہو گیا۔',
    reference: 'Sunan Abu Dawud 2357 (Hasan)',
    benefit: 'A moment where supplications are accepted by Allah as the fasting servant breaks their fast.'
  },
  {
    id: 'dua-mosque-entry',
    titleEn: 'Entering the Mosque (Masjid)',
    titleUr: 'مسجد میں داخل ہونے کی دعا',
    category: 'Mosque & Salah',
    arabicText: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allaahum-maftah lee abwaaba rahmatik',
    translationEn: 'O Allah, open for me the doors of Your mercy.',
    translationUr: 'اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔',
    reference: 'Sahih Muslim 713',
    benefit: 'Invokes Allah\'s mercy upon stepping right foot first into the sanctuary of prayer.'
  }
];
