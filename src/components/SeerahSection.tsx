import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  MapPin, 
  CheckCircle2, 
  Search,
  Compass,
  Heart
} from 'lucide-react';
import { SEERAH_CHAPTERS, SeerahChapter } from '../data/seerah';
import { LanguageCode } from '../utils/i18n';

interface SeerahSectionProps {
  lang: LanguageCode;
}

const PROPHET_STORIES = [
  {
    name: 'Prophet Adam (عَلَيْهِ ٱلسَّلَامُ)',
    title: 'The Father of Humanity & The First Prophet',
    period: 'Beginning of Creation',
    lessons: 'The consequence of repentance (Tawbah), humility, and vigilance against Iblis (Satan).',
    quranRef: 'Surah Al-Baqarah 2:30-39, Surah Al-A\'raf 7:11-25'
  },
  {
    name: 'Prophet Nuh (عَلَيْهِ ٱلسَّلَامُ)',
    title: 'The Ark and 950 Years of Patient Preaching',
    period: 'Ancient Mesopotamia',
    lessons: 'Unwavering perseverance in calling to Allah regardless of societal rejection.',
    quranRef: 'Surah Nuh 71:1-28, Surah Hud 11:25-49'
  },
  {
    name: 'Prophet Ibrahim (عَلَيْهِ ٱلسَّلَامُ)',
    title: 'Khalilullah (Friend of Allah) & Patriarch of Monotheism',
    period: 'Ur & Canaan & Makkah',
    lessons: 'Pure Tawheed, ultimate sacrifice, and building the sacred Kaaba with Ismail.',
    quranRef: 'Surah Al-Baqarah 2:124-129, Surah Ibrahim 14:35-41'
  },
  {
    name: 'Prophet Yusuf (عَلَيْهِ ٱلسَّلَامُ)',
    title: 'The Best of Stories (Ahsan al-Qasas)',
    period: 'Ancient Egypt',
    lessons: 'Chastity in temptation, patience in prison, and magnanimity in forgiveness.',
    quranRef: 'Surah Yusuf 12:1-111'
  },
  {
    name: 'Prophet Musa (عَلَيْهِ ٱلسَّلَامُ)',
    title: 'Kalimullah (He to Whom Allah Spoke) & Confrontation with Pharaoh',
    period: 'Exodus & Sinai',
    lessons: 'Courage before tyranny, trust in Allah parting the Red Sea, and steadfast leadership.',
    quranRef: 'Surah Al-Qasas 28:3-44, Surah Ta-Ha 20:9-98'
  },
  {
    name: 'Prophet Isa (عَلَيْهِ ٱلسَّلَامُ)',
    title: 'Messiah & Servant of Allah, Born of the Virgin Maryam',
    period: '1st Century Jerusalem',
    lessons: 'Spirituality, humility, devotion to Allah alone without association, and anticipation of the final Prophet.',
    quranRef: 'Surah Maryam 19:16-36, Surah Ali \'Imran 3:45-59'
  }
];

export const SeerahSection: React.FC<SeerahSectionProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'seerah' | 'prophets'>('seerah');
  const [selectedChapter, setSelectedChapter] = useState<SeerahChapter | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChapters = SEERAH_CHAPTERS.filter(c => 
    c.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.titleAr.includes(searchQuery) ||
    c.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="seerah-and-prophets-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              Prophetic Seerah & Stories of the Prophets (السيرة النبوية)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Chronological milestones of the life of the Final Messenger Muhammad ﷺ and the righteous prophets of Islam.
          </p>
        </div>

        {/* Tab Toggle: Seerah vs Prophets */}
        <div className="flex items-center gap-1 p-1 rounded-full ios-glass">
          <button
            onClick={() => setActiveTab('seerah')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'seerah'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Seerah of Muhammad ﷺ
          </button>
          <button
            onClick={() => setActiveTab('prophets')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'prophets'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Stories of the Prophets (عليهم السلام)
          </button>
        </div>
      </div>

      {activeTab === 'seerah' ? (
        <div className="space-y-6">
          {/* Seerah Search */}
          <div className="relative max-w-md mb-6">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search Seerah milestones (e.g., Badr, Hijrah, Revelation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl ios-glass text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
          </div>

          {/* Timeline of Seerah */}
          <div className="relative border-l-2 border-emerald-800/30 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {filteredChapters.map((ch, idx) => (
              <div 
                key={ch.id}
                id={`seerah-node-${ch.id}`}
                className="relative group cursor-pointer"
                onClick={() => setSelectedChapter(ch)}
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-6 h-6 rounded-full bg-emerald-800 border-4 border-white dark:border-stone-950 flex items-center justify-center text-[10px] text-white font-mono font-bold shadow-sm">
                  {idx + 1}
                </div>

                <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg hover:shadow-xl hover:border-emerald-600/60 transition-all space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full ios-glass text-emerald-800 dark:text-emerald-300">
                        {ch.period}
                      </span>
                      <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                        {ch.titleEn}
                      </h3>
                    </div>
                    <span className="font-arabic text-lg text-emerald-800 dark:text-emerald-300 dir-rtl">
                      {ch.titleAr}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {ch.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-200/50 dark:border-stone-800/50 text-xs">
                    <div className="space-y-1">
                      <p className="font-semibold text-stone-700 dark:text-stone-300">Key Events & Highlights:</p>
                      <ul className="list-disc list-inside text-stone-500 space-y-0.5">
                        {ch.keyEvents.map((ev, i) => (
                          <li key={i}>{ev}</li>
                        ))}
                      </ul>
                    </div>
                    <span className="text-emerald-800 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <span>Read Reflections</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Stories of the Prophets Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPHET_STORIES.map((story, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full ios-glass text-stone-600 dark:text-stone-300">
                  {story.period}
                </span>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mt-2.5">
                  {story.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-2">
                  {story.title}
                </p>

                <div className="p-3.5 rounded-2xl ios-glass text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  <strong>Core Moral & Lessons:</strong> {story.lessons}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200/50 dark:border-stone-800/50 text-[11px] text-stone-500">
                <strong>Quranic Reference:</strong> {story.quranRef}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chapter Details Modal */}
      {selectedChapter && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl ios-glass-card shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <div>
                <span className="text-xs font-mono text-emerald-800 dark:text-emerald-400 font-bold">{selectedChapter.period}</span>
                <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{selectedChapter.titleEn}</h3>
                <p className="font-arabic text-base text-stone-600 dark:text-stone-400">{selectedChapter.titleAr}</p>
              </div>
              <button onClick={() => setSelectedChapter(null)} className="p-2 rounded-full ios-glass text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-3">
              <p>{selectedChapter.summary}</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl ios-glass border border-emerald-300/40 text-xs text-emerald-950 dark:text-emerald-200 space-y-2">
              <h4 className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Lessons for Modern Believers:</span>
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedChapter.lessons.map((lesson, i) => (
                  <li key={i}>{lesson}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedChapter(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-700 shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
