import React from 'react';
import { 
  X, 
  Home, 
  BookOpen, 
  BookMarked, 
  Heart, 
  Sparkles, 
  Clock, 
  Compass, 
  Calendar, 
  Moon, 
  Calculator, 
  HelpCircle, 
  User, 
  ChevronRight,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';
import { SocialLinks } from './SocialLinks';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: () => void;
  currentLang: LanguageCode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  onOpenAuth,
  currentLang
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية', icon: Home },
    { id: 'quran', labelEn: 'Complete Holy Qur\'an', labelAr: 'القرآن الكريم كاملاً', icon: BookOpen },
    { id: 'hadith', labelEn: 'Authentic Hadith Collections', labelAr: 'الأحاديث النبوية الصحيحة', icon: BookMarked },
    { id: 'knowledge', labelEn: 'Namaz & Janaza Guides', labelAr: 'ساری نمازیں اور نمازِ جنازہ', icon: HelpCircle },
    { id: 'duas', labelEn: 'Islamic Duas', labelAr: 'الأدعية المأثورة', icon: Heart },
    { id: 'azkar', labelEn: 'Daily Azkar', labelAr: 'الأذكار اليومية', icon: Sparkles },
    { id: 'prayer-times', labelEn: 'Prayer Times', labelAr: 'مواقيت الصلاة', icon: Clock },
    { id: 'qibla', labelEn: 'Qibla Finder', labelAr: 'اتجاه القبلة', icon: Compass },
    { id: 'calendar', labelEn: 'Hijri Calendar', labelAr: 'التقويم الهجري', icon: Calendar },
    { id: 'ramadan', labelEn: 'Ramadan Center', labelAr: 'رمضان كريم', icon: Moon },
    { id: 'zakat', labelEn: 'Zakat Calculator', labelAr: 'حاسبة الزكاة', icon: Calculator },
    { id: 'tasbih', labelEn: 'Digital Tasbih', labelAr: 'المسبحة الإلكترونية', icon: Sparkles },
    { id: 'names', labelEn: '99 Names of Allah', labelAr: 'أسماء الله الحسنى', icon: Sparkles },
    { id: 'seerah', labelEn: 'Prophetic Seerah', labelAr: 'السيرة النبوية', icon: BookOpen },
    { id: 'dashboard', labelEn: 'My Bookmarks & Notes', labelAr: 'حسابي ومفضلتي', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dimmed backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div 
        id="mobile-sidebar-drawer"
        className="relative my-auto ml-auto sm:mr-auto sm:ml-4 w-[90vw] max-w-xs ios-glass-card h-[95vh] rounded-3xl shadow-2xl flex flex-col justify-between z-10 border border-white/30 dark:border-white/10 overflow-hidden"
      >
        {/* Header with pure logo only */}
        <div className="p-4 sm:p-5 border-b border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://i.postimg.cc/k5Gz9zYv/hip.png" 
              alt="Logo" 
              className="h-7.5 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full ios-glass text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="overflow-y-auto p-3 space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between text-xs font-semibold ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'}`} />
                  <span className="truncate">{item.labelEn}</span>
                </div>
                <span className={`font-arabic text-[11px] shrink-0 ${isActive ? 'text-emerald-200' : 'text-stone-400'}`}>
                  {item.labelAr}
                </span>
              </button>
            );
          })}
        </div>

        {/* Social Channels & Footer info */}
        <div className="p-4 border-t border-stone-200/50 dark:border-stone-800/50 space-y-3 ios-glass">
          <SocialLinks variant="sidebar" />

          <button
            onClick={() => {
              onOpenAuth();
              onClose();
            }}
            className="w-full py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>Sign In / Sync Account</span>
          </button>

          <p className="text-[10px] text-center text-stone-500">
            Authentic sources • 100% Ad-Free
          </p>
        </div>

      </div>
    </div>
  );
};
