import React from 'react';
import { 
  BookOpen, 
  Heart, 
  Clock, 
  Compass, 
  Calendar as CalendarIcon, 
  Calculator, 
  Sparkles, 
  Moon, 
  BookMarked, 
  GraduationCap,
  Sun,
  Layers,
  Award
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

interface QuickToolsGridProps {
  onSelectTool: (toolId: string) => void;
  lang?: LanguageCode;
}

export const QuickToolsGrid: React.FC<QuickToolsGridProps> = ({ onSelectTool, lang }) => {
  const effectiveLang = lang || 'en';
  const t = TRANSLATIONS[effectiveLang] || TRANSLATIONS.en;

  const tools = [
    {
      id: 'knowledge',
      title: 'All Prayers & Janaza Guide',
      titleUr: 'ساری نمازیں اور نمازِ جنازہ',
      arabic: 'صلاة الجنازة والصلوات',
      desc: 'Complete 4 Takbeers Funeral Prayer (Janaza) with authentic duas, plus 5 daily prayers, Witr, Eid & Tahajjud.',
      icon: Heart,
      badge: 'نمازِ جنازہ و احکام',
      accent: 'amber'
    },
    {
      id: 'quran',
      title: 'Holy Qur\'an Reader',
      titleUr: 'مکمل قرآن مجید',
      arabic: 'القرآن الكريم',
      desc: 'All 114 Surahs, Urdu/English translations, word-by-word, audio recitations by world-renowned Qaris.',
      icon: BookOpen,
      badge: 'Complete Quran',
      accent: 'emerald'
    },
    {
      id: 'hadith',
      title: 'Prophetic Hadith Library',
      titleUr: 'احادیثِ نبوی ﷺ',
      arabic: 'الحديث النبوي',
      desc: 'Kutub al-Sittah & 40 Hadith Nawawi with authentic grading, narrators, Arabic, Urdu and English.',
      icon: BookMarked,
      badge: 'Verified Sunnah',
      accent: 'emerald'
    },
    {
      id: 'duas',
      title: 'Masnoon Supplications (Duas)',
      titleUr: 'مسنون دعائیں',
      arabic: 'الأدعية المأثورة',
      desc: 'Categorized Quranic & Prophetic supplications with Arabic, transliteration, Urdu & English.',
      icon: Heart,
      badge: 'Essential Duas',
      accent: 'rose'
    },
    {
      id: 'azkar',
      title: 'Morning & Evening Azkar',
      titleUr: 'صبح و شام کے اذکار',
      arabic: 'أذكار الصباح والمساء',
      desc: 'Authentic fortress of the believer with interactive counters, Arabic, Urdu meanings, and virtues.',
      icon: Sun,
      badge: 'Daily Dhikr',
      accent: 'amber'
    },
    {
      id: 'prayer',
      title: 'Prayer Times & Adhan',
      titleUr: 'اوقاتِ نماز و اذان',
      arabic: 'مواقيت الصلاة',
      desc: 'Precise prayer calculation methods, GPS detection, countdowns, and sound notifications.',
      icon: Clock,
      badge: 'Live Timings',
      accent: 'emerald'
    },
    {
      id: 'qibla',
      title: 'Qibla Finder & Compass',
      titleUr: 'قبلہ رخ و کمپاس',
      arabic: 'اتجاه القبلة',
      desc: 'Interactive 360° visual compass pointing directly to the Kaaba in Makkah with exact distance in km.',
      icon: Compass,
      badge: 'Kaaba Direction',
      accent: 'emerald'
    },
    {
      id: 'calendar',
      title: 'Hijri Islamic Calendar',
      titleUr: 'ہجری اسلامی کیلنڈر',
      arabic: 'التقويم الهجري',
      desc: 'Synchronized Hijri & Gregorian calendar, Islamic holidays, Ashura, Laylatul Qadr, and Eid dates.',
      icon: CalendarIcon,
      badge: 'Umm al-Qura',
      accent: 'emerald'
    },
    {
      id: 'tasbih',
      title: 'Digital Tasbih Counter',
      titleUr: 'ڈیجیٹل تسبیح کاؤنٹر',
      arabic: 'المسبحة الإلكترونية',
      desc: 'Digital bead counter with tactile haptics, sound effects, custom targets, and dhikr history.',
      icon: Sparkles,
      badge: 'Tactile Haptic',
      accent: 'amber'
    },
    {
      id: 'zakat',
      title: 'Zakat & Nisab Calculator',
      titleUr: 'حاسبہ زکوٰۃ و نصاب',
      arabic: 'حاسبة الزكاة',
      desc: 'Accurate 2.5% calculation on cash, gold, silver, business merchandise, and deductibles.',
      icon: Calculator,
      badge: 'Shariah Compliant',
      accent: 'amber'
    },
    {
      id: 'names',
      title: '99 Names of Allah',
      titleUr: 'اسمائے حسنیٰ (۹۹ نام)',
      arabic: 'أسماء الله الحسنى',
      desc: 'All 99 Divine Names with Arabic calligraphy, comprehensive Urdu & English meanings, and Quranic citations.',
      icon: Sparkles,
      badge: 'Asma ul Husna',
      accent: 'emerald'
    },
    {
      id: 'ramadan',
      title: 'Ramadan & Fasting Hub',
      titleUr: 'رمضان المبارک سنٹر',
      arabic: 'مركز رمضان',
      desc: 'Suhoor & Iftar countdowns, daily fasting timetable, Ramadan Duas, and Khatm al-Quran planner.',
      icon: Moon,
      badge: 'Special Hub',
      accent: 'emerald'
    },
    {
      id: 'seerah',
      title: 'Seerah & Prophets\' Stories',
      titleUr: 'سیرت النبی ﷺ و قصص الانبیاء',
      arabic: 'السيرة النبوية',
      desc: 'Chronological life of Prophet Muhammad ﷺ and historical stories of the Quranic Prophets.',
      icon: BookOpen,
      badge: 'Prophetic Life',
      accent: 'emerald'
    },
    {
      id: 'dashboard',
      title: 'My Islamic Dashboard',
      titleUr: 'میرا ذاتی ڈیش بورڈ',
      arabic: 'لوحة التحكم الإسلامية',
      desc: 'Personal Quran reading progress, saved bookmarks, daily prayer log, and fasting tracker.',
      icon: Layers,
      badge: 'Personal Tracker',
      accent: 'emerald'
    }
  ];

  return (
    <section id="quick-tools-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-3 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>تمام اسلامی سہولیات و ٹولز (All Islamic Tools)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
          Islamic Essentials & Comprehensive Tools
        </h2>
        <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
          Explore the complete suite of authentic Islamic utilities, worship aids, and educational resources.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              id={`tool-card-${tool.id}`}
              onClick={() => onSelectTool(tool.id)}
              className="group p-5 sm:p-6 rounded-3xl ios-glass-card shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden hover:scale-[1.02] border border-emerald-800/20"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border border-emerald-400/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full ios-glass text-stone-700 dark:text-stone-300 shadow-sm border border-stone-200/40">
                    {tool.badge}
                  </span>
                </div>

                <div className="mb-2">
                  <div className="flex items-baseline justify-between gap-1 mb-0.5">
                    <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                      {tool.title}
                    </h3>
                    <span className="text-xs font-arabic text-emerald-800/90 dark:text-emerald-400/90 font-bold shrink-0">
                      {tool.arabic}
                    </span>
                  </div>
                  
                  {/* Urdu Title in Jameel Noori Nastaleeq */}
                  <p className="font-urdu text-sm text-emerald-700 dark:text-emerald-300 font-semibold dir-rtl text-right">
                    {tool.titleUr}
                  </p>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-2">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                <span>کھولیں (Open Tool)</span>
                <span className="group-hover:translate-x-1 transition-transform text-sm">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
