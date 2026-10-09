import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  Heart,
  Droplets,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  Layers,
  Compass,
  FileText
} from 'lucide-react';
import { KNOWLEDGE_ARTICLES, KnowledgeArticle } from '../data/knowledge';
import { ALL_PRAYERS_GUIDE, PrayerGuideItem } from '../data/prayersKnowledge';
import { LanguageCode } from '../utils/i18n';

interface KnowledgeSectionProps {
  lang: LanguageCode;
}

const UNIVERSAL_SALAH_STEPS = [
  { step: 1, name: 'Takbirat al-Ihram (تَكْبِيرَةُ الإِحْرَام)', arabic: 'اللَّهُ أَكْبَرُ', urdu: 'نیت اور تکبیرِ تحریمہ: قبلہ رخ کھڑے ہو کر کانوں تک ہاتھ اٹھائیں اور "اللہ اکبر" کہتے ہوئے ناف کے نیچے باندھ لیں۔', text: 'Stand facing Qibla with pure intention (Niyyah). Raise hands to earlobes saying "Allahu Akbar" and fold right hand over left.' },
  { step: 2, name: 'Thana (سَنَاء)', arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ', urdu: 'ثناء: اے اللہ! تو پاک ہے اپنی تعریفوں کے ساتھ، تیرا نام بابرکت ہے، تیری شان بلند ہے اور تیرے سوا کوئی معبود نہیں۔', text: 'Recite the opening supplication (Thana/Du\'a al-Istiftah).' },
  { step: 3, name: 'Ta\'awwudh & Surah Al-Fatiha', arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ • بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...', urdu: 'تعوذ، تسمیہ اور سورۂ فاتحہ، جس کے بعد قرآن مجید کی کوئی سورت ملائیں۔', text: 'Recite Ta\'awwudh, Bismillah, Surah Al-Fatiha, and an additional Surah or passages from the Holy Qur\'an.' },
  { step: 4, name: 'Ruku (الرُّكُوع - Bowing)', arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ (۳ بار)', urdu: 'رکوع: "اللہ اکبر" کہتے ہوئے جھکیں اور تین بار پڑھیں: "پاک ہے میرا پروردگار عظمت والا"۔', text: 'Say "Allahu Akbar" and bow with back straight and hands on knees. Say "Subhana Rabbiyal \'Azeem" 3 times.' },
  { step: 5, name: 'Qawmah (القَوْمَة - Standing from Ruku)', arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا وَلَكَ الْحَمْدُ', urdu: 'قومہ: رکوع سے سیدھے کھڑے ہوں اور پڑھیں: "اللہ نے اس کی سن لی جس نے اس کی تعریف کی، اے ہمارے رب تیرے ہی لیے تمام تعریفیں ہیں"۔', text: 'Rise upright saying "Sami\'Allahu liman hamidah", then say "Rabbana wa lakal hamd".' },
  { step: 6, name: 'Sujud (السُّجُود - Prostration)', arabic: 'سُبْحَانَ رَبِّيَ الأَعْلَى (۳ بار)', urdu: 'سجدہ: "اللہ اکبر" کہتے ہوئے پیشانی، ناک، دونوں ہتھیلیاں، دونوں گھٹنے اور پاؤں کی انگلیاں زمین پر رکھ کر تین بار کہیں: "پاک ہے میرا پروردگار سب سے بلند تر"۔', text: 'Prostrate on seven bodily parts. Say "Subhana Rabbiyal A\'la" 3 times.' },
  { step: 7, name: 'Jalsah (الجَلْسَة - Sitting between Sujud)', arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي', urdu: 'جلسہ: دونوں سجدوں کے درمیان سیدھے بیٹھ کر مغفرت کی دعا کریں۔', text: 'Sit upright calmly between the two prostrations and supplicate: "Rabbighfir li, Rabbighfir li".' },
  { step: 8, name: 'Tashahhud (التَّشَهُّد - Attahiyyat)', arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ', urdu: 'التحیات: تمام قولی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ آپ پر سلام ہو اے نبیؐ اور اللہ کی رحمت اور اس کی برکتیں...', text: 'Sit in the final sitting and recite At-Tahiyyat, raising index finger at the testimony of Tawhid.' },
  { step: 9, name: 'Durood-e-Ibrahim & Dua Masoora', arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ... • رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ', urdu: 'درودِ ابراہیمی اور مسنون دعا (دعائے ماثورہ) پڑھیں۔', text: 'Send peace and blessings upon Prophet Muhammad ﷺ and recite supplication from Quran/Sunnah.' },
  { step: 10, name: 'Tasleem (التَّسْلِيم - Salam)', arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', urdu: 'سلام: پہلے دائیں طرف چہرہ پھیر کر سلام کہیں، پھر بائیں طرف چہرہ پھیر کر سلام کہیں۔', text: 'Turn head right saying "As-salamu \'alaykum wa rahmatullah", then left saying the same.' }
];

const WUDU_STEPS = [
  { step: 1, name: 'Niyyah & Bismillah', urdu: 'نیت اور بسم اللہ', text: 'Make intention in heart for ritual purification and say "Bismillah" (In the Name of Allah).' },
  { step: 2, name: 'Wash Hands 3x', urdu: 'دونوں ہاتھ گٹوں تک دھونا', text: 'Wash both hands up to wrists thoroughly three times, making sure to rub between fingers.' },
  { step: 3, name: 'Rinse Mouth (Madmadah) 3x', urdu: 'کلی کرنا (۳ بار)', text: 'Take water with right hand into mouth and swirl it thoroughly, using Miswak if available.' },
  { step: 4, name: 'Sniff Water into Nose 3x', urdu: 'ناک میں پانی چڑھانا (۳ بار)', text: 'Sniff water into nostrils with right hand and blow it out using left hand.' },
  { step: 5, name: 'Wash Face 3x', urdu: 'پورا چہرہ دھونا (۳ بار)', text: 'Wash entire face from forehead hairline down to chin, and from ear to ear.' },
  { step: 6, name: 'Wash Forearms 3x', urdu: 'کہنیوں سمیت دونوں بازو دھونا', text: 'Wash right forearm from fingertips to above elbow 3 times, then repeat for left arm.' },
  { step: 7, name: 'Wipe Head & Ears (Masah)', urdu: 'سر اور کانوں کا مسح کرنا', text: 'Wipe wet hands over entire head from front to back, and use fingers to clean ears.' },
  { step: 8, name: 'Wash Feet 3x', urdu: 'ٹخنوں سمیت دونوں پاؤں دھونا', text: 'Wash right foot up to and including ankles 3 times, rubbing between toes, then left foot.' }
];

const GHUSL_STEPS = [
  { step: 1, name: 'Niyyah & Wash Hands', urdu: 'نیت اور ہاتھوں کا دھونا', text: 'Form intention in heart to remove major ritual impurity (Janabah) and wash both hands 3 times.' },
  { step: 2, name: 'Wash Private Parts', urdu: 'استنجاء اور نجاست کو دھونا', text: 'Wash private parts and wash away any physical filth or impurities with the left hand.' },
  { step: 3, name: 'Perform Full Wudu', urdu: 'نماز جیسا مکمل وضو کرنا', text: 'Perform a complete ablution like that for prayer (gargling and sniffing water deeply).' },
  { step: 4, name: 'Pour Water over Head 3x', urdu: 'سر پر تین بار پانی ڈالنا', text: 'Pour water over head 3 times, massaging thoroughly to ensure water reaches roots of all hair.' },
  { step: 5, name: 'Wash Entire Body', urdu: 'تمام بدن پر پانی بہانا', text: 'Wash right side of body, then left side. Ensure not a single spot (navel, ears, underarms) is left dry.' }
];

export const KnowledgeSection: React.FC<KnowledgeSectionProps> = ({ lang }) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'janaza' | 'all-prayers' | 'salah-steps' | 'wudu-ghusl' | 'articles'>('janaza');
  const [selectedPrayerId, setSelectedPrayerId] = useState<string>('namaz-e-janaza');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [copiedDuaIndex, setCopiedDuaIndex] = useState<string | null>(null);

  const categories = ['all', 'Aqeedah', 'Fiqh', 'Ethics'];

  const filteredArticles = selectedCategory === 'all'
    ? KNOWLEDGE_ARTICLES
    : KNOWLEDGE_ARTICLES.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const selectedPrayer = ALL_PRAYERS_GUIDE.find(p => p.id === selectedPrayerId) || ALL_PRAYERS_GUIDE[0];
  const janazaGuide = ALL_PRAYERS_GUIDE.find(p => p.id === 'namaz-e-janaza') || ALL_PRAYERS_GUIDE[0];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDuaIndex(id);
    setTimeout(() => setCopiedDuaIndex(null), 2000);
  };

  return (
    <section id="islamic-knowledge-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Islamic Banner & Header - iOS Glassified */}
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] ios-glass-card bg-gradient-to-br from-emerald-900/90 via-emerald-950/90 to-stone-900/90 text-white p-6 sm:p-10 border border-white/20 dark:border-white/10 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-amber-400/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full ios-glass border border-white/20 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Islamic Knowledge Center (العلم الشرعي)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              ساری نمازیں، نمازِ جنازہ اور اسلامی احکام
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
              Complete authentic guides for Namaz-e-Janaza (4 Takbeers & Duas for adults/children), all five daily prayers, Witr & Du'a al-Qunoot, Eid prayers, Tahajjud, Istikhara, Salat al-Tasbih, and step-by-step Wudu & Ghusl.
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="font-arabic text-2xl sm:text-3xl text-amber-300 drop-shadow-xs dir-rtl">
              وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ
            </p>
            <p className="text-[11px] text-emerald-200/70 mt-1">
              "And establish prayer and give Zakat" (Al-Baqarah 2:43)
            </p>
          </div>
        </div>

        {/* Top Navigation Switcher Bar - iOS Glassified */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveGuideTab('janaza')}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeGuideTab === 'janaza'
                ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.02]'
                : 'ios-glass text-emerald-100 hover:bg-white/20'
            }`}
          >
            <Heart className="w-4 h-4 text-emerald-950 dark:text-emerald-950" />
            <span>نمازِ جنازہ (Funeral Prayer)</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('all-prayers')}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeGuideTab === 'all-prayers'
                ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.02]'
                : 'ios-glass text-emerald-100 hover:bg-white/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>ساری نمازیں (All Prayers Guide)</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('salah-steps')}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeGuideTab === 'salah-steps'
                ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.02]'
                : 'ios-glass text-emerald-100 hover:bg-white/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>نماز کا طریقہ (Step-by-Step Salah)</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('wudu-ghusl')}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeGuideTab === 'wudu-ghusl'
                ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.02]'
                : 'ios-glass text-emerald-100 hover:bg-white/20'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>وضو اور غسل (Purification)</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('articles')}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeGuideTab === 'articles'
                ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.02]'
                : 'ios-glass text-emerald-100 hover:bg-white/20'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>اسلامی مضامین (Islamic Articles)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: NAMAZ-E-JANAZA (FUNERAL PRAYER FULL GUIDE) */}
      {activeGuideTab === 'janaza' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Top Quick Overview Box - iOS Glassified */}
          <div className="p-6 sm:p-8 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/60 dark:border-stone-800/60">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    فرضِ کفایہ (Fard Kifayah)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    چار تکبیرات (No Ruku, No Sujud)
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-sans">
                  {janazaGuide.nameUr}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5">
                  {janazaGuide.summaryUr}
                </p>
              </div>

              <div className="p-4 rounded-2xl ios-glass border border-amber-300/40 text-xs text-amber-950 dark:text-amber-300 max-w-sm">
                <strong className="block font-bold mb-1">حدیثِ نبوی ﷺ (فضلِ جنازہ):</strong>
                "جو شخص نمازِ جنازہ ادا ہونے تک ساتھ رہے اسے ایک قیراط ثواب ملے گا اور جو تدفین تک ساتھ رہے اسے دو عظیم پہاڑوں (احد پہاڑ) جتنا ثواب ملے گا۔" (صحیح بخاری ۱۳۲۵)
              </div>
            </div>

            {/* 4 Takbeers Step-by-Step Cards */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>نمازِ جنازہ کی چار تکبیروں کا مکمل طریقہ (Step-by-Step 4 Takbeers)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {janazaGuide.steps.map(step => (
                  <div 
                    key={step.stepNumber}
                    className="p-5 rounded-2xl ios-glass space-y-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{step.titleUr}</h4>
                        <p className="text-[11px] text-stone-500">{step.titleEn}</p>
                      </div>
                    </div>

                    {step.arabic && (
                      <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-right dir-rtl">
                        <p className="font-arabic text-base sm:text-lg text-emerald-950 dark:text-emerald-200 leading-loose">
                          {step.arabic}
                        </p>
                        {step.urduTranslation && (
                          <p className="font-urdu text-xs text-stone-700 dark:text-stone-300 mt-2 pt-2 border-t border-emerald-200/40 dark:border-emerald-800/30 text-right">
                            <strong>ترجمہ:</strong> {step.urduTranslation}
                          </p>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {step.instructionsUr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ALL 3 JANAZA DUAS (Adults, Boy Child, Girl Child) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600" />
                  <span>نمازِ جنازہ کی مسنون دعائیں (Janaza Supplications)</span>
                </h3>
                <p className="text-xs text-stone-500">
                  تیسری تکبیر کے بعد پڑھی جانے والی مستند دعائیں مع اردو ترجمہ اور انگریزی
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {janazaGuide.specialDuas?.map((dua, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-3xl ios-glass-card shadow-lg hover:shadow-xl flex flex-col justify-between space-y-4 relative group transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {dua.titleUr}
                      </span>
                      <button
                        onClick={() => handleCopyText(`${dua.arabic}\n\n${dua.urduTranslation}`, `dua-${index}`)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Copy Dua"
                      >
                        {copiedDuaIndex === `dua-${index}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <h4 className="font-semibold text-xs text-stone-500">{dua.titleEn}</h4>

                    {/* Arabic Text */}
                    <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-right dir-rtl">
                      <p className="font-arabic text-base sm:text-lg text-emerald-950 dark:text-emerald-200 leading-loose">
                        {dua.arabic}
                      </p>
                    </div>

                    {/* Transliteration */}
                    <div className="text-[11px] text-stone-500 italic">
                      {dua.transliteration}
                    </div>

                    {/* Urdu Translation */}
                    <div className="text-right dir-rtl pt-2 border-t border-stone-100 dark:border-stone-800">
                      <p className="font-urdu text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                        <strong className="text-emerald-800 dark:text-emerald-400">اردو ترجمہ:</strong> {dua.urduTranslation}
                      </p>
                    </div>

                    {/* English Translation */}
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                      <p className="text-xs text-stone-600 dark:text-stone-400">
                        <strong>English:</strong> {dua.englishTranslation}
                      </p>
                    </div>
                  </div>

                  {dua.note && (
                    <div className="text-[10px] text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                      {dua.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Janaza Rulings & Etiquettes */}
          <div className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>جنازے کے اہم شرعی مسائل اور آداب (Important Rules & Etiquettes)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700 dark:text-stone-300">
              <div className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-md">
                <strong className="block font-bold text-emerald-800 dark:text-emerald-400 mb-1">طاق صفیں بنانا:</strong>
                جنازے کی نماز میں طاق صفیں (۳، ۵، یا ۷ صفیں) بنانا مستحب ہے۔ حتیٰ کہ اگر کل ۷ افراد ہوں تو امام کے پیچھے پہلی صف میں ۳، دوسری میں ۲ اور تیسری میں ۱ نمازی کھڑا ہو۔
              </div>
              <div className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-md">
                <strong className="block font-bold text-emerald-800 dark:text-emerald-400 mb-1">مرحوم کا سامنا:</strong>
                میت کو قبلہ رخ رکھا جائے، میت کا سر شمال کی طرف اور چہرہ قبلہ کی طرف ہو، اور امام میت کے سینے کے سامنے کھڑا ہو۔
              </div>
              <div className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-md">
                <strong className="block font-bold text-emerald-800 dark:text-emerald-400 mb-1">تعزیت کے آداب:</strong>
                سوگواران سے تعزیت کے مسنون کلمات: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، أَعْظَمَ اللَّهُ أَجْرَكَ وَأَحْسَنَ عَزَاءَكَ وَغَفَرَ لِمَيِّتِكَ" (اللہ تمہارا اجر عظیم فرمائے اور صبر جمیل دے)۔
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SARI NAMAZEIN (ALL PRAYERS COMPREHENSIVE GUIDE) */}
      {activeGuideTab === 'all-prayers' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Prayers Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ALL_PRAYERS_GUIDE.map(prayer => (
              <button
                key={prayer.id}
                onClick={() => setSelectedPrayerId(prayer.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  selectedPrayerId === prayer.id
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'ios-glass text-stone-700 dark:text-stone-300 hover:bg-white/40'
                }`}
              >
                <span>{prayer.nameUr.split(' ')[0]} {prayer.nameUr.split(' ')[1]}</span>
                {prayer.category === 'fard' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                {prayer.category === 'wajib' && <span className="w-2 h-2 rounded-full bg-amber-400" />}
              </button>
            ))}
          </div>

          {/* Selected Prayer Detail Card */}
          <div className="p-6 sm:p-8 rounded-3xl ios-glass-card shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/60 dark:border-stone-800/60">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {selectedPrayer.category}
                  </span>
                  {selectedPrayer.totalRakat && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {selectedPrayer.totalRakat}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {selectedPrayer.nameUr}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  {selectedPrayer.nameEn} • {selectedPrayer.nameAr}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl ios-glass border border-emerald-500/30 text-xs text-emerald-900 dark:text-emerald-300">
                <span className="font-bold block">وقت (Prescribed Timing):</span>
                {selectedPrayer.timingUr}
              </div>
            </div>

            {/* Virtues list */}
            {selectedPrayer.virtues.length > 0 && (
              <div className="p-4 rounded-2xl ios-glass border border-amber-300/40 space-y-2">
                <h4 className="font-bold text-xs text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>فضیلت و برکات (Virtues & Rewards):</span>
                </h4>
                <ul className="list-disc list-inside text-xs text-stone-700 dark:text-stone-300 space-y-1">
                  {selectedPrayer.virtues.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="space-y-4">
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                طریقہ کار اور تفصیلات (How to Pray):
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {selectedPrayer.steps.map(step => (
                  <div 
                    key={step.stepNumber}
                    className="p-5 rounded-2xl ios-glass space-y-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{step.titleUr}</h4>
                        <p className="text-[11px] text-stone-500">{step.titleEn}</p>
                      </div>
                    </div>

                    {step.arabic && (
                      <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 text-right dir-rtl">
                        <p className="font-arabic text-base sm:text-lg text-emerald-950 dark:text-emerald-200 leading-loose">
                          {step.arabic}
                        </p>
                        {step.urduTranslation && (
                          <p className="font-urdu text-xs text-stone-700 dark:text-stone-300 mt-2 pt-2 border-t border-emerald-200/40 text-right">
                            {step.urduTranslation}
                          </p>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {step.instructionsUr}
                    </p>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {step.instructionsEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Duas if present (e.g. Du'a al-Qunoot, Istikhara Dua, Tasbih) */}
            {selectedPrayer.specialDuas && selectedPrayer.specialDuas.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>خاص مسنون دعائیں (Special Prescribed Supplications):</span>
                </h3>

                <div className="space-y-4">
                  {selectedPrayer.specialDuas.map((dua, i) => (
                    <div 
                      key={i}
                      className="p-6 rounded-3xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{dua.titleUr}</h4>
                          <p className="text-xs text-stone-500">{dua.titleEn}</p>
                        </div>
                        <button
                          onClick={() => handleCopyText(`${dua.arabic}\n\n${dua.urduTranslation}`, `prayer-dua-${i}`)}
                          className="p-2 rounded-xl text-stone-500 hover:text-emerald-700 hover:bg-white dark:hover:bg-stone-800 transition-colors"
                        >
                          {copiedDuaIndex === `prayer-dua-${i}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-900/40 text-right dir-rtl">
                        <p className="font-arabic text-base sm:text-xl text-emerald-950 dark:text-emerald-200 leading-loose">
                          {dua.arabic}
                        </p>
                      </div>

                      <div className="text-right dir-rtl">
                        <p className="font-urdu text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                          <strong>اردو ترجمہ:</strong> {dua.urduTranslation}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                          <strong>English:</strong> {dua.englishTranslation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rulings */}
            {selectedPrayer.rulings.length > 0 && (
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/50 space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                <span className="font-bold text-stone-900 dark:text-stone-100">ضروری مسائل:</span>
                {selectedPrayer.rulings.map((r, i) => (
                  <p key={i}>• {r.ur} ({r.en})</p>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: STEP-BY-STEP UNIVERSAL SALAH GUIDE */}
      {activeGuideTab === 'salah-steps' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl ios-glass-card shadow-md text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
            <strong className="text-sm block">نماز کا مکمل مسنون طریقہ (Universal Salah Guide):</strong>
            <p>تکبیرِ تحریمہ، ثناء، قیام، رکوع، قومہ، سجدہ، جلسہ، التحیات، درودِ ابراہیمی اور سلام کا مکمل مسنون طریقہ مع عربی کلمات اور اردو ترجمہ۔</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UNIVERSAL_SALAH_STEPS.map(item => (
              <div key={item.step} className="p-5 sm:p-6 rounded-3xl ios-glass-card shadow-md flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-bold font-mono text-xs flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">{item.name}</h3>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-right dir-rtl">
                    <p className="font-arabic text-base text-emerald-950 dark:text-emerald-300 leading-loose">
                      {item.arabic}
                    </p>
                  </div>

                  <p className="font-urdu text-xs text-stone-800 dark:text-stone-200 text-right dir-rtl leading-relaxed">
                    {item.urdu}
                  </p>
                </div>

                <p className="text-xs text-stone-500 pt-2 border-t border-stone-100/60 dark:border-stone-800/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WUDU & GHUSL (PURIFICATION) */}
      {activeGuideTab === 'wudu-ghusl' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Wudu Guide */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-sky-600" />
                  <span>وضو کا مکمل مسنون طریقہ (Ablution / Wudu)</span>
                </h3>
                <p className="text-xs text-stone-500">
                  "اے ایمان والو! جب تم نماز کے لیے اٹھو تو اپنے چہرے اور اپنے ہاتھ کہنیوں تک دھو لو..." (المائدہ ۶)
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                ۴ فرائض اور مسنون اعمال
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {WUDU_STEPS.map(item => (
                <div key={item.step} className="p-5 sm:p-6 rounded-3xl ios-glass-card shadow-md space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">{item.urdu}</h4>
                  </div>
                  <p className="text-[11px] font-semibold text-stone-500">{item.name}</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ghusl Guide */}
          <div className="space-y-4 pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>غسل کا مسنون طریقہ اور فرائض (Full Ritual Bath / Ghusl)</span>
                </h3>
                <p className="text-xs text-stone-500">
                  جنابت، حیض و نفاس سے پاکی اور جمعہ کے دن کا مسنون غسل
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                ۳ فرائض (کلی، ناک میں پانی، پورا بدن)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {GHUSL_STEPS.map(item => (
                <div key={item.step} className="p-5 sm:p-6 rounded-3xl ios-glass-card shadow-md space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">{item.urdu}</h4>
                  </div>
                  <p className="text-[11px] font-semibold text-stone-500">{item.name}</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: ISLAMIC ARTICLES & FIQH */}
      {activeGuideTab === 'articles' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Category filter pills */}
          <div className="flex items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'ios-glass text-stone-600 dark:text-stone-400 hover:bg-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(art => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {art.category}
                    </span>
                    <span className="text-xs text-stone-400">
                      {art.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors mb-1">
                    {art.titleEn}
                  </h3>

                  <p className="font-arabic text-xs text-emerald-800 dark:text-emerald-400 mb-2 dir-rtl">
                    {art.titleAr}
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3">
                    {art.content}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100/60 dark:border-stone-800/60 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
                  <span>مکمل مضمون پڑھیں (Read Full)</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Modal - iOS Glassified */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] ios-glass-card shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-white/30 dark:border-white/10">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200/60 dark:border-stone-800/60">
              <div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {selectedArticle.category}
                </span>
                <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100 mt-1">{selectedArticle.titleEn}</h3>
                <p className="font-arabic text-sm text-stone-500 dir-rtl">{selectedArticle.titleAr}</p>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="p-2 rounded-full ios-glass text-stone-400 hover:text-stone-700 dark:hover:text-white">✕</button>
            </div>

            <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
              {selectedArticle.content}
            </div>

            <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs text-stone-500">
              <span>حوالہ جات: {selectedArticle.references.join(', ')}</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white shadow-md transition-all"
              >
                بند کریں (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
