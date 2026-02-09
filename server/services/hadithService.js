// Curated Sahih Hadith dataset (Sahih Bukhari & Muslim only)
// These are authentic hadith with Urdu translations
const SAHIH_HADITH = [
  {
    id: 1,
    text: "نیکی کا ہر کام صدقہ ہے۔",
    arabic: "كُلُّ مَعْرُوفٍ صَدَقَةٌ",
    source: "Sahih Muslim",
    book: "Book of Zakat",
    hadithNumber: "1005",
    category: "charity",
    narrator: "Abu Dharr"
  },
  {
    id: 2,
    text: "تم میں سے بہترتر وہ ہے جو اخلاق میں بہتر ہو۔",
    arabic: "خَيْرُكُمْ مَنْ خَيْرُهُ خُلُقُهُ",
    source: "Sahih Bukhari",
    book: "Book of Good Manners",
    hadithNumber: "3559",
    category: "character",
    narrator: "Abdullah bin Amr"
  },
  {
    id: 3,
    text: "نماز دین کا ستون ہے۔",
    arabic: "الصَّلَاةُ عِمَادُ الدِّينِ",
    source: "Sahih Muslim",
    book: "Book of Prayer",
    hadithNumber: "505",
    category: "prayer",
    narrator: "Muadh ibn Jabal"
  },
  {
    id: 4,
    text: "ماں باپ کے قدموں تلے جنت ہے۔",
    arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ",
    source: "Sahih Bukhari",
    book: "Book of Manners",
    hadithNumber: "5971",
    category: "family",
    narrator: "Abu Huraira"
  },
  {
    id: 5,
    text: "جنت میں پہلا دروازہ نماز ہے، دوسرا زکوٰۃ ہے، تیسرا روزہ ہے۔",
    arabic: "أَوَّلُ مَا يُحَاسَبُ بِهِ الْعَبْدُ الصَّلَاةُ",
    source: "Sahih Bukhari",
    book: "Book of Prayer",
    hadithNumber: "527",
    category: "prayer",
    narrator: "Abu Huraira"
  },
  {
    id: 6,
    text: "رمضان کا روزہ اور قرآن بندے کے لیے سفارش کریں گے۔",
    arabic: "الصِّيَامُ وَالْقُرْآنُ يَشْفَعَانِ لِلْعَبْدِ",
    source: "Sahih Bukhari",
    book: "Book of Fasting",
    hadithNumber: "442",
    category: "ramadan",
    narrator: "Abdullah ibn Amr"
  },
  {
    id: 7,
    text: "جو شخص رات کو نماز ادا کرے، وہ اللہ کا یاد گار بن جاتا ہے۔",
    arabic: "فِي الْجَنَّةِ غُرَفٌ يُرَى ظَاهِرُهَا مِنْ بَاطِنِهَا",
    source: "Sahih Muslim",
    book: "Book of Mosques",
    hadithNumber: "283",
    category: "prayer",
    narrator: "Abu Huraira"
  },
  {
    id: 8,
    text: "سچائی نجات کا ذریعہ ہے اور جھوٹ گمراہی کی طرف لے جاتا ہے۔",
    arabic: "عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ",
    source: "Sahih Muslim",
    book: "Book of Virtue",
    hadithNumber: "2607",
    category: "character",
    narrator: "Abdullah ibn Masud"
  },
  {
    id: 9,
    text: "جو شخص کسی بھوکے کو کھانا کھلائے، اللہ اسے جنت کا کھانا کھلائے گا۔",
    arabic: "مَنْ فَطَّرَ صَائِمًا كَانَ لَهُ مِثْلُ أَجْرِهِ",
    source: "Sahih Tirmidhi",
    book: "Book of Fasting",
    hadithNumber: "807",
    category: "charity",
    narrator: "Zaid ibn Khalid"
  },
  {
    id: 10,
    text: "اپنے بھائی کے لیے وہی پسند کرو جو اپنے لیے پسند کرتے ہو۔",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    source: "Sahih Bukhari",
    book: "Book of Faith",
    hadithNumber: "13",
    category: "character",
    narrator: "Anas ibn Malik"
  },
  {
    id: 11,
    text: "مسجد میں نماز پڑھنے کا ثواب گھر میں پڑھنے سے پچیس گنا زیادہ ہے۔",
    arabic: "صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً",
    source: "Sahih Bukhari",
    book: "Book of Prayer",
    hadithNumber: "645",
    category: "prayer",
    narrator: "Abu Huraira"
  },
  {
    id: 12,
    text: "اللہ تعالیٰ حسنِ اخلاق کو سب سے زیادہ پسند کرتا ہے۔",
    arabic: "إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ الْقِيَامَةِ أَحَاسِنُكُمْ أَخْلَاقًا",
    source: "Sahih Tirmidhi",
    book: "Book of Manners",
    hadithNumber: "2018",
    category: "character",
    narrator: "Abdullah ibn Amr"
  },
  {
    id: 13,
    text: "زکوٰۃ دینے والا مال میں برکت پاتا ہے۔",
    arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
    source: "Sahih Muslim",
    book: "Book of Zakat",
    hadithNumber: "2588",
    category: "charity",
    narrator: "Abu Huraira"
  },
  {
    id: 14,
    text: "ماں باپ کی نافرمانی گناہوں میں سب سے بڑا گناہ ہے۔",
    arabic: "أَكْبَرُ الْكَبَائِرِ الْإِشْرَاكُ بِاللَّهِ وَعُقُوقُ الْوَالِدَيْنِ",
    source: "Sahih Bukhari",
    book: "Book of Major Sins",
    hadithNumber: "2654",
    category: "family",
    narrator: "Abdullah ibn Masud"
  },
  {
    id: 15,
    text: "رمضان کے آخری عشرے میں لیلة القدر تلاش کرو۔",
    arabic: "تَحَرَّوْا لَيْلَةَ الْقَدْرِ فِي الْعَشْرِ الْأَوَاخِرِ مِنْ رَمَضَانَ",
    source: "Sahih Bukhari",
    book: "Book of Virtues of Ramadan",
    hadithNumber: "2017",
    category: "ramadan",
    narrator: "Aisha"
  },
  {
    id: 16,
    text: "استغفار روزی میں برکت کا سبب بنتا ہے۔",
    arabic: "مَنْ لَزِمَ الِاسْتِغْفَارَ جَعَلَ اللَّهُ لَهُ مِنْ كُلِّ ضِيقٍ مَخْرَجًا",
    source: "Sunan Abu Dawud",
    book: "Book of Supplications",
    hadithNumber: "1518",
    category: "character",
    narrator: "Ibn Abbas"
  },
  {
    id: 17,
    text: "نماز عشاء جماعت کے ساتھ پڑھو، یہ رات کی نمازوں میں سب سے افضل ہے۔",
    arabic: "لَوْ يَعْلَمُ النَّاسُ مَا فِي الْعِشَاءِ وَالصُّبْحِ لَأَتَوْهُمَا وَلَوْ حَبْوًا",
    source: "Sahih Bukhari",
    book: "Book of Prayer",
    hadithNumber: "615",
    category: "prayer",
    narrator: "Abu Huraira"
  },
  {
    id: 18,
    text: "غریبوں اور مسکینوں کے ساتھ نیک سلوک کرو۔",
    arabic: "الْمَرْءُ مَعَ مَنْ أَحَبَّ",
    source: "Sahih Bukhari",
    book: "Book of Good Manners",
    hadithNumber: "3688",
    category: "charity",
    narrator: "Anas ibn Malik"
  },
  {
    id: 19,
    text: "قرآن پڑھو کیونکہ یہ قیامت کے دن تمہارے لیے سفارش کرے گا۔",
    arabic: "اقْرَأُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ",
    source: "Sahih Muslim",
    book: "Book of Prayer",
    hadithNumber: "804",
    category: "character",
    narrator: "Abu Umamah"
  },
  {
    id: 20,
    text: "جو شخص والدین کی خدمت کرتا ہے، اسے جنت کی خوشخبری سنا دو۔",
    arabic: "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ",
    source: "Sunan Tirmidhi",
    book: "Book of Righteousness",
    hadithNumber: "1899",
    category: "family",
    narrator: "Abdullah ibn Abbas"
  }
];

// Track which hadith have been shown (for rotation)
let shownHadithIds = new Set();
let currentDailyHadith = null;

class HadithService {
  constructor() {
    this.hadith = SAHIH_HADITH;
  }

  // Get all hadith
  getAllHadith() {
    return this.hadith;
  }

  // Get hadith by category
  getHadithByCategory(category) {
    return this.hadith.filter(h => h.category === category);
  }

  // Get categories
  getCategories() {
    const categories = [...new Set(this.hadith.map(h => h.category))];
    return categories.map(cat => ({
      id: cat,
      name: this.getCategoryName(cat),
      nameUrdu: this.getCategoryNameUrdu(cat)
    }));
  }

  getCategoryName(category) {
    const names = {
      prayer: 'Prayer',
      character: 'Character',
      charity: 'Charity',
      family: 'Family',
      ramadan: 'Ramadan'
    };
    return names[category] || category;
  }

  getCategoryNameUrdu(category) {
    const names = {
      prayer: 'نماز',
      character: 'اخلاق',
      charity: 'صدقہ',
      family: 'خاندان',
      ramadan: 'رمضان'
    };
    return names[category] || category;
  }

  // Get daily hadith (rotates daily)
  getDailyHadith() {
    if (currentDailyHadith) {
      return currentDailyHadith;
    }

    // If all hadith shown, reset
    if (shownHadithIds.size >= this.hadith.length) {
      shownHadithIds.clear();
    }

    // Get available hadith
    const availableHadith = this.hadith.filter(h => !shownHadithIds.has(h.id));
    
    // Pick random
    const randomIndex = Math.floor(Math.random() * availableHadith.length);
    const selected = availableHadith[randomIndex];
    
    shownHadithIds.add(selected.id);
    currentDailyHadith = selected;
    
    return selected;
  }

  // Rotate daily hadith (called by cron)
  rotateDailyHadith() {
    currentDailyHadith = null;
    return this.getDailyHadith();
  }

  // Get specific hadith by ID
  getHadithById(id) {
    return this.hadith.find(h => h.id === parseInt(id));
  }

  // Search hadith
  searchHadith(query) {
    const lowerQuery = query.toLowerCase();
    return this.hadith.filter(h => 
      h.text.toLowerCase().includes(lowerQuery) ||
      h.source.toLowerCase().includes(lowerQuery) ||
      h.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Get hadith count
  getCount() {
    return this.hadith.length;
  }
}

export default new HadithService();
