import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  Compass, 
  Clock, 
  Search,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenSearch }) => {
  return (
    <footer id="main-deen-footer" className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pt-12 pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column with pure logo only */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img 
                src="https://i.postimg.cc/k5Gz9zYv/hip.png" 
                alt="Logo" 
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              Your comprehensive Islamic platform featuring complete Holy Qur'an with audio recitations, authentic Hadith collections, step-by-step Namaz-e-Janaza, 5 daily prayers, and Islamic knowledge.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Free • Ad-Free Forever • Authentic Sources</span>
            </div>
          </div>

          {/* Quick Links: Holy Quran */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Holy Qur'an
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button onClick={() => onSelectTab('quran')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Read Surahs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('quran')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Word-by-Word Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('quran')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Audio Recitations
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('quran')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Tafsir & Translations
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Daily Practice */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Daily Practice
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button onClick={() => onSelectTab('prayer-times')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Prayer Times & Adhan
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('qibla')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Qibla Direction
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('azkar')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Morning & Evening Azkar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('tasbih')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Digital Tasbih Counter
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('duas')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Duas for Daily Occasions
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Islamic Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Knowledge & Tools
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button onClick={() => onSelectTab('knowledge')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-semibold text-emerald-800 dark:text-emerald-300">
                  نمازِ جنازہ (Namaz-e-Janaza Guide)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('knowledge')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  ساری نمازیں (All Prayers Guide)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('hadith')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Authentic Hadith Collections
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ramadan')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Ramadan & Fasting Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('zakat')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Zakat Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('calendar')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Islamic Hijri Calendar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('names')} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  99 Names of Allah (Asmaul Husna)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Official Social Media Community Card (@halalislampro) - iOS Glassified Logo Showcase */}
        <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-xl relative overflow-hidden border border-emerald-800/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-500/40 text-amber-900 dark:text-amber-300 text-xs font-bold font-mono">
              @halalislampro
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
              Official Media Channels
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md">
              Follow our official Islamic channels for daily Qur'an recitations, authenticated Hadith, and prayer guides.
            </p>
          </div>
          <div className="shrink-0">
            <SocialLinks variant="footer" />
          </div>
        </div>

        {/* Source Authenticity Statement - iOS Glass Pill */}
        <div className="p-4 sm:p-5 rounded-3xl ios-glass text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-0.5">
            <p className="font-bold text-stone-800 dark:text-stone-200">
              Islamic Content Authenticity & Scholarly Verification
            </p>
            <p>
              Qur'anic text follows verified Uthmani script (Tanzil / AlQuran Cloud). Hadiths reference Sahih al-Bukhari, Sahih Muslim, Sunan an-Nasa'i, Jami` at-Tirmidhi, Sunan Abi Dawud, and Sunan Ibn Majah. Funeral (Janaza) and Salah procedures conform to the authentic Sunnah of the Prophet Muhammad ﷺ.
            </p>
          </div>
          <button 
            onClick={onOpenSearch} 
            className="shrink-0 px-4 py-2 rounded-full ios-glass hover:bg-emerald-500/15 text-stone-700 dark:text-stone-200 font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <Search className="w-3.5 h-3.5 text-emerald-700" />
            <span>Search Library (Ctrl+K)</span>
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 border-t border-stone-200/60 dark:border-stone-800/60 pt-6">
          <p>© {new Date().getFullYear()} • Dedicated to the Ummah.</p>
          <p className="font-arabic text-xs text-stone-400">
            رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
          </p>
        </div>

      </div>
    </footer>
  );
};
