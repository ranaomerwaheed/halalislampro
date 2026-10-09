import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  lang?: LanguageCode;
  hijriFormatted?: string;
  gregorianFormatted?: string;
  nextPrayerName?: string;
  nextPrayerTime?: string;
  nextPrayerCountdown?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  lang,
  hijriFormatted = '1448 AH',
  gregorianFormatted = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  nextPrayerName = 'Dhuhr',
  nextPrayerTime = '12:30 PM',
  nextPrayerCountdown = 'In 2 hrs'
}) => {
  const effectiveLang = lang || 'en';
  const t = TRANSLATIONS[effectiveLang] || TRANSLATIONS.en;

  // Video ID from user: https://youtu.be/Vv3VtbWpE5Y
  const youtubeVideoId = 'Vv3VtbWpE5Y';
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  return (
    <section 
      id="homepage-hero-section" 
      className="relative overflow-hidden w-full min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] flex items-center justify-center text-white"
    >
      {/* Background Video Layer - Full Hero Section Coverage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-stone-950">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340%] h-[340%] sm:w-[170%] sm:h-[170%] lg:w-[130%] lg:h-[130%] min-w-full min-h-full object-cover pointer-events-none opacity-85"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          title="Islamic Atmosphere Background Video"
          tabIndex={-1}
        />

        {/* Ambient Overlays ensuring high contrast and pristine readability */}
        <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-transparent to-stone-950" />
        <div className="absolute inset-0 bg-emerald-950/30 mix-blend-multiply" />
      </div>

      {/* Top and Bottom Decorative Glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-1" />

      {/* Foreground Interactive Content & Buttons Sitting Above the Video */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-12 sm:py-16 lg:py-20 flex flex-col items-center">
        
        {/* Top Badges Bar: Date & Hijri + Video Atmosphere Attribution */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass text-xs text-white shadow-lg border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">{hijriFormatted}</span>
            <span className="text-emerald-400">•</span>
            <span className="text-stone-200">{gregorianFormatted}</span>
          </div>

          <a
            href={`https://youtu.be/${youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ios-glass text-[11px] text-stone-200 hover:text-white hover:bg-white/20 transition-all border border-white/15 shadow-sm"
            title="Watch full background video on YouTube"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Atmosphere: Live Islamic Visual</span>
            <ExternalLink className="w-3 h-3 text-stone-300" />
          </a>
        </div>

        {/* Bismillah iOS Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full ios-glass border border-amber-400/30 text-amber-300 text-xs font-bold mb-5 shadow-lg backdrop-blur-md">
          <span className="font-arabic text-base sm:text-lg">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        </div>

        {/* Main Arabic Title Calligraphy */}
        <h1 className="font-arabic text-2xl sm:text-4xl lg:text-5xl text-amber-200 mb-3 dir-rtl font-bold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          القرآن الكريم، الأحاديث النبوية، وسائر الصلوات وصلاة الجنازة
        </h1>

        {/* Subtitle in English */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-200 mb-3 font-sans leading-relaxed drop-shadow-md">
          Complete Holy Qur'an with audio recitations, authenticated Hadith collections, step-by-step Namaz & Namaz-e-Janaza with Arabic, Urdu, and English.
        </p>

        {/* Subtitle in Urdu with Jameel Noori Nastaleeq */}
        <p className="font-urdu text-base sm:text-lg text-emerald-200 mb-8 dir-rtl max-w-2xl drop-shadow-md leading-loose">
          جامع اسلامی پورٹل • قرآن مجید، احادیثِ مبارکہ، نماز و نمازِ جنازہ کا مکمل طریقہ، اور مسنون دعائیں
        </p>

        {/* Hero Section Action Buttons Directly Over the Video */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 w-full max-w-3xl">
          <button
            id="hero-btn-quran"
            onClick={() => onNavigate('quran')}
            className="px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm shadow-xl hover:shadow-2xl shadow-emerald-950/50 transition-all flex items-center gap-2 hover:scale-[1.03] active:scale-95 border border-emerald-500/40"
          >
            <BookOpen className="w-4 h-4 text-emerald-200" />
            <span className="font-urdu text-sm">مکمل قرآن مجید (Read Quran)</span>
          </button>

          <button
            id="hero-btn-hadith"
            onClick={() => onNavigate('hadith')}
            className="px-6 py-3.5 rounded-full ios-glass hover:bg-white/25 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 hover:scale-[1.03] active:scale-95 border border-white/30"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span className="font-urdu text-sm">احادیثِ نبوی ﷺ (Hadith)</span>
          </button>

          <button
            id="hero-btn-janaza"
            onClick={() => onNavigate('knowledge')}
            className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-xl hover:shadow-2xl shadow-amber-950/40 transition-all flex items-center gap-2 hover:scale-[1.03] active:scale-95 border border-amber-300"
          >
            <Heart className="w-4 h-4 text-emerald-950 fill-current" />
            <span className="font-urdu text-sm">نمازِ جنازہ و ساری نمازیں (Janaza & Prayers)</span>
          </button>

          <button
            id="hero-btn-duas"
            onClick={() => onNavigate('duas')}
            className="px-6 py-3.5 rounded-full ios-glass hover:bg-white/25 text-emerald-200 hover:text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 hover:scale-[1.03] active:scale-95 border border-emerald-400/30"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span className="font-urdu text-sm">مسنون دعائیں (Duas)</span>
          </button>
        </div>

        {/* Live Prayer Countdown Floating iOS Glass Card Over Video */}
        <div 
          id="hero-prayer-card"
          onClick={() => onNavigate('prayer')}
          className="w-full max-w-md p-4 rounded-3xl ios-glass shadow-2xl hover:shadow-emerald-900/30 transition-all cursor-pointer flex items-center justify-between text-left hover:scale-[1.02] border border-white/30 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/25 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-300 font-medium">
                Next Prayer: <span className="font-bold text-white">{nextPrayerName}</span> at {nextPrayerTime}
              </p>
              <p className="text-sm font-bold text-amber-300 font-mono">
                {nextPrayerCountdown} remaining
              </p>
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold text-emerald-300 gap-1 pr-2">
            <span>View Times</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </section>
  );
};
