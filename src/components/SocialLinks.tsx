import React from 'react';
import { Youtube, Facebook, Instagram, Video, ExternalLink, Sparkles } from 'lucide-react';

export interface SocialChannel {
  name: string;
  handle: string;
  url: string;
  icon: React.ElementType;
  colorClass: string;
  bgLightClass: string;
  hoverClass: string;
  badge?: string;
  description: string;
}

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    name: 'YouTube',
    handle: '@halalislampro',
    url: 'https://www.youtube.com/@halalislampro',
    icon: Youtube,
    colorClass: 'text-red-600 dark:text-red-400',
    bgLightClass: 'bg-red-50 dark:bg-red-950/30 border-red-200/70 dark:border-red-900/50',
    hoverClass: 'hover:bg-red-600 hover:text-white dark:hover:bg-red-600',
    badge: 'Quran Recitations & Lectures',
    description: 'Islamic lectures, Surah recitations & Quranic reminders'
  },
  {
    name: 'Facebook',
    handle: '@halalislampro',
    url: 'https://www.facebook.com/halalislampro',
    icon: Facebook,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgLightClass: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200/70 dark:border-blue-900/50',
    hoverClass: 'hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600',
    badge: 'Daily Hadith & Community',
    description: 'Daily authentic Hadiths, Islamic rulings & announcements'
  },
  {
    name: 'Instagram',
    handle: '@halalislampro',
    url: 'https://www.instagram.com/halalislampro',
    icon: Instagram,
    colorClass: 'text-pink-600 dark:text-pink-400',
    bgLightClass: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200/70 dark:border-pink-900/50',
    hoverClass: 'hover:bg-gradient-to-tr hover:from-amber-600 hover:via-pink-600 hover:to-purple-600 hover:text-white',
    badge: 'Daily Duas & Reels',
    description: 'Beautiful Islamic quotes, Masnoon Duas & aesthetic reminders'
  },
  {
    name: 'TikTok',
    handle: '@halalislampro',
    url: 'https://www.tiktok.com/@halalislampro',
    icon: Video,
    colorClass: 'text-emerald-700 dark:text-emerald-300',
    bgLightClass: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/70 dark:border-emerald-900/50',
    hoverClass: 'hover:bg-stone-900 hover:text-white dark:hover:bg-stone-700',
    badge: 'Short Islamic Reminders',
    description: 'Quick Islamic facts, Tajweed tips & Namaz guides'
  }
];

interface SocialLinksProps {
  variant?: 'topbar' | 'hero' | 'footer' | 'sidebar' | 'pill';
  showHandle?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  variant = 'hero', 
  showHandle = true 
}) => {
  if (variant === 'topbar') {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-amber-300 hidden sm:inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Follow @halalislampro:</span>
        </span>
        <div className="flex items-center gap-1.5">
          {SOCIAL_CHANNELS.map(ch => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.name}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${ch.name}: ${ch.handle}`}
                className="p-1 rounded-md text-emerald-100 hover:text-amber-300 hover:bg-emerald-800/60 transition-colors"
                aria-label={`${ch.name} ${ch.handle}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-900/10 via-amber-500/10 to-emerald-900/5 dark:from-emerald-950/40 dark:to-stone-900 border border-emerald-800/20 dark:border-emerald-700/30 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Official Social Channels</span>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            @halalislampro
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SOCIAL_CHANNELS.map(ch => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.name}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${ch.bgLightClass} hover:shadow-xs group`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${ch.colorClass}`} />
                <span className="truncate text-stone-800 dark:text-stone-200 text-[11px] group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  {ch.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex items-center gap-3">
        {SOCIAL_CHANNELS.map(ch => {
          const Icon = ch.icon;
          return (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${ch.name}: ${ch.handle}`}
              aria-label={ch.name}
              className={`p-3 rounded-2xl ios-glass border flex items-center justify-center transition-all hover:scale-115 hover:shadow-lg ${ch.bgLightClass} group`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${ch.colorClass}`} />
            </a>
          );
        })}
      </div>
    );
  }

  // Default: hero variant (Rich interactive showcase cards)
  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-900/10 via-amber-500/5 to-emerald-950/10 dark:from-emerald-950/40 dark:via-stone-900 dark:to-emerald-950/60 border border-emerald-800/20 dark:border-emerald-700/30 shadow-sm backdrop-blur-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-left">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-[11px] font-bold tracking-wide">
              OFFICIAL CHANNELS
            </span>
            <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
              @halalislampro
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
            Follow our verified Islamic social channels across all major platforms:
          </p>
        </div>
        <div className="font-arabic text-sm text-emerald-850 dark:text-emerald-400 font-semibold dir-rtl">
          تابعونا على منصات التواصل
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {SOCIAL_CHANNELS.map(ch => {
          const Icon = ch.icon;
          return (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center text-center gap-1.5 ${ch.bgLightClass} hover:-translate-y-0.5 hover:shadow-md group`}
            >
              <div className="p-2 rounded-xl bg-white dark:bg-stone-800 shadow-2xs group-hover:scale-110 transition-transform">
                <Icon className={`w-5 h-5 ${ch.colorClass}`} />
              </div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                {ch.name}
              </span>
              <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-400">
                {ch.handle}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
