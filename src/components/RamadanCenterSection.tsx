import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Check, 
  Clock, 
  Copy, 
  Calendar,
  Heart,
  RotateCcw
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { LanguageCode } from '../utils/i18n';

interface RamadanCenterSectionProps {
  lang: LanguageCode;
}

export const RamadanCenterSection: React.FC<RamadanCenterSectionProps> = ({ lang }) => {
  const [fastingDaysCompleted, setFastingDaysCompleted] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('deen_fasting_days_v1');
      return stored ? JSON.parse(stored) : [1, 2, 3, 4, 5];
    } catch {
      return [1, 2, 3, 4, 5];
    }
  });

  const [khatmProgress, setKhatmProgress] = useState(StorageService.getKhatmProgress());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const ramadanDuas = [
    {
      id: 'suhoor-niyyah',
      title: 'Intention for Fasting (Niyyah)',
      arabic: 'وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ',
      transliteration: 'Wa bi-sawmi ghadin nawaytu min shahri ramadan.',
      english: 'I intend to keep the fast for tomorrow in the month of Ramadan.',
      urdu: 'اور میں نے ماہِ رمضان کے کل کے روزے کی نیت کی۔',
      reference: 'Sunnah & Classical Fiqh Consensus'
    },
    {
      id: 'iftar-dua',
      title: 'Dua at the Time of Breaking Fast (Iftar)',
      arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
      transliteration: 'Dhahaba adh-dhama\'u wabtallati-l-\'urooq wa thabata-l-ajru in sha Allah.',
      english: 'The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.',
      urdu: 'پیاس بجھ گئی، رگیں تر ہو گئیں اور اجر پکا ہو گیا، اگر اللہ نے چاہا۔',
      reference: 'Sunan Abu Dawud 2357 (Hasan)'
    },
    {
      id: 'laylat-al-qadr',
      title: 'Supplication for Laylat al-Qadr (Night of Power)',
      arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
      transliteration: 'Allahumma innaka \'Afuwwun tuhibbul-\'afwa fa\'fu \'anni.',
      english: 'O Allah, You are Most Forgiving, and You love forgiveness; so pardon me.',
      urdu: 'اے اللہ! تو بہت معاف کرنے والا ہے اور معافی کو پسند فرماتا ہے، پس مجھے معاف فرما دے۔',
      reference: 'Jami\' at-Tirmidhi 3513 (Sahih)'
    }
  ];

  const toggleFastDay = (day: number) => {
    let updated: number[];
    if (fastingDaysCompleted.includes(day)) {
      updated = fastingDaysCompleted.filter(d => d !== day);
    } else {
      updated = [...fastingDaysCompleted, day];
    }
    setFastingDaysCompleted(updated);
    try {
      localStorage.setItem('deen_fasting_days_v1', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateKhatmPages = (pages: number) => {
    const updated = StorageService.saveKhatmProgress({
      targetDays: khatmProgress.targetDays,
      completedPages: Math.min(604, Math.max(0, pages))
    });
    setKhatmProgress(updated);
  };

  const handleCopy = (dua: any) => {
    navigator.clipboard.writeText(`${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.english}"\n— ${dua.reference}`);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const khatmPercent = Math.round((khatmProgress.completedPages / 604) * 100);

  return (
    <section id="ramadan-center-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] ios-glass-card shadow-lg mb-8">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
                Blessed Holy Month
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-stone-900 dark:text-stone-100">
              Ramadan Kareem Center (رمضان كريم)
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl">
              "The month of Ramadan in which was revealed the Qur'an, a guidance for the people and clear proofs of guidance and criterion." (2:185)
            </p>
          </div>

          {/* Quick Suhoor / Iftar Times Demo */}
          <div className="flex items-center gap-4 ios-glass p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-stone-200/60 dark:border-stone-800/60 shadow-md">
            <div className="text-center">
              <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" /> Suhoor Ends
              </p>
              <p className="text-lg font-extrabold font-mono text-stone-900 dark:text-stone-100 mt-0.5">04:42 AM</p>
              <p className="text-[10px] text-stone-500">Fajr Entry</p>
            </div>
            <div className="h-8 w-px bg-stone-200 dark:bg-stone-700" />
            <div className="text-center">
              <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center justify-center gap-1">
                <Moon className="w-3.5 h-3.5 text-amber-500" /> Iftar Time
              </p>
              <p className="text-lg font-extrabold font-mono text-amber-700 dark:text-amber-400 mt-0.5">06:28 PM</p>
              <p className="text-[10px] text-stone-500">Maghrib Entry</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Ramadan Duas & Fasting Tracker */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Ramadan Essential Duas */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="font-bold text-base text-stone-900 dark:text-stone-100">
                Essential Ramadan Supplications (أدعية رمضان)
              </h2>
            </div>

            {ramadanDuas.map(dua => (
              <div key={dua.id} className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl ios-glass space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100">{dua.title}</h3>
                  <button
                    onClick={() => handleCopy(dua)}
                    className="p-1.5 rounded-full ios-glass text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors"
                    title="Copy Dua"
                  >
                    {copiedId === dua.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <p className="font-arabic text-xl text-right text-stone-900 dark:text-stone-50 leading-loose dir-rtl">
                  {dua.arabic}
                </p>

                <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                  {dua.transliteration}
                </p>

                <p className="text-xs text-stone-700 dark:text-stone-300">
                  "{dua.english}"
                </p>

                <p className="font-urdu text-xs text-stone-600 dark:text-stone-400 text-right dir-rtl">
                  {dua.urdu}
                </p>

                <p className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 pt-1">
                  Source: {dua.reference}
                </p>
              </div>
            ))}
          </div>

          {/* Fasting Days Tracker (30 Days Matrix) */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <div>
                <h2 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  30-Day Ramadan Fasting Tracker
                </h2>
                <p className="text-xs text-stone-500">
                  Tap each day when completed to record your fasting streak
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full ios-glass text-emerald-800 dark:text-emerald-300">
                {fastingDaysCompleted.length} / 30 Fasts
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
              {Array.from({ length: 30 }).map((_, idx) => {
                const day = idx + 1;
                const isCompleted = fastingDaysCompleted.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleFastDay(day)}
                    className={`h-11 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center select-none ${
                      isCompleted
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'ios-glass text-stone-700 dark:text-stone-300 hover:bg-white/40'
                    }`}
                  >
                    <span>Day {day}</span>
                    {isCompleted ? <Check className="w-3 h-3 text-emerald-300" /> : <span className="text-[9px] text-stone-400">○</span>}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Khatm al-Quran Planner & Zakat al-Fitr */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 30-Day Qur'an Khatm Planner */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <BookOpen className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <h2 className="font-bold text-base text-stone-900 dark:text-stone-100">
                Qur'an Khatm Planner (ختم القرآن)
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Pages Completed:</span>
                <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">
                  {khatmProgress.completedPages} / 604 pages ({khatmPercent}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-stone-200/50 dark:bg-stone-800/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-800 transition-all duration-300 rounded-full"
                  style={{ width: `${khatmPercent}%` }}
                />
              </div>

              <div className="p-3.5 rounded-2xl ios-glass border border-emerald-300/40 text-emerald-900 dark:text-emerald-300">
                <strong>Standard Daily Target:</strong> Read <strong>20 pages per day</strong> (approx. 4 pages after each of the 5 daily prayers) to complete the entire Qur'an in 30 days.
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handleUpdateKhatmPages(khatmProgress.completedPages + 4)}
                  className="flex-1 py-2.5 text-xs font-semibold rounded-full ios-glass hover:bg-white/40 text-stone-800 dark:text-stone-200"
                >
                  +4 Pages (1 Prayer)
                </button>
                <button
                  onClick={() => handleUpdateKhatmPages(khatmProgress.completedPages + 20)}
                  className="flex-1 py-2.5 text-xs font-semibold rounded-full bg-emerald-800 text-white hover:bg-emerald-700 shadow-sm"
                >
                  +20 Pages (1 Juz)
                </button>
              </div>
            </div>
          </div>

          {/* Zakat al-Fitr Guide Card */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card border border-amber-300/40 text-xs text-stone-700 dark:text-stone-300 space-y-3 shadow-lg">
            <h3 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Zakat al-Fitr (زكاة الفطر) Guidelines</span>
            </h3>

            <p className="leading-relaxed text-stone-600 dark:text-stone-400">
              Obligatory on every Muslim who possesses food in excess of their needs for one day and night, given before the Eid al-Fitr prayer.
            </p>

            <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-400">
              <li><strong>Measure:</strong> One Sa' (approximately 2.5kg to 3kg of staple grains, rice, wheat, or dates).</li>
              <li><strong>Cash Equivalent:</strong> Many scholars permit paying the cash equivalent (approx. $10 - $15 USD / £5 - £10 GBP per head).</li>
              <li><strong>Due Time:</strong> Before attending the Eid al-Fitr prayer (paying 1-2 days early is permissible).</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
