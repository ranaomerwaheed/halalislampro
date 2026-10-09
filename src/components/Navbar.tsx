import React, { useState } from 'react';
import { 
  BookOpen, 
  Compass, 
  Clock, 
  Heart, 
  Search, 
  User, 
  Moon, 
  Sun, 
  Globe, 
  Menu, 
  X, 
  Bookmark, 
  Calendar as CalendarIcon,
  Calculator,
  Sparkles,
  Volume2
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/i18n';

interface NavbarProps {
  activeTab?: string;
  currentTab?: string;
  setActiveTab?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
  lang?: LanguageCode;
  currentLang?: LanguageCode;
  setLang?: (lang: LanguageCode) => void;
  onSelectLanguage?: (lang: LanguageCode) => void;
  theme?: 'light' | 'dark';
  isDarkMode?: boolean;
  setTheme?: (theme: 'light' | 'dark') => void;
  onToggleDarkMode?: () => void;
  onOpenSearch: () => void;
  onOpenAccount?: () => void;
  onOpenAuth?: () => void;
  onOpenSidebar?: () => void;
  nextPrayerName?: string;
  nextPrayerCountdown?: string;
  isPlayingAudio?: boolean;
  onToggleAudioBar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  currentTab,
  setActiveTab,
  onSelectTab,
  lang,
  currentLang,
  setLang,
  onSelectLanguage,
  theme,
  isDarkMode,
  setTheme,
  onToggleDarkMode,
  onOpenSearch,
  onOpenAccount,
  onOpenAuth,
  onOpenSidebar,
  nextPrayerName,
  nextPrayerCountdown,
  isPlayingAudio,
  onToggleAudioBar
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeTabId = activeTab || currentTab || 'home';
  const effectiveLang: LanguageCode = lang || currentLang || 'en';
  const t = TRANSLATIONS[effectiveLang] || TRANSLATIONS.en;

  const handleTabSelect = (tabId: string) => {
    if (onSelectTab) onSelectTab(tabId);
    if (setActiveTab) setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleLangChange = (newLang: LanguageCode) => {
    if (onSelectLanguage) onSelectLanguage(newLang);
    if (setLang) setLang(newLang);
  };

  const isDark = theme ? theme === 'dark' : Boolean(isDarkMode);
  const handleThemeChange = () => {
    if (onToggleDarkMode) {
      onToggleDarkMode();
    } else if (setTheme) {
      setTheme(isDark ? 'light' : 'dark');
    }
  };

  const handleAccountClick = () => {
    if (onOpenAccount) onOpenAccount();
    else if (onOpenAuth) onOpenAuth();
  };

  const navLinks = [
    { id: 'home', label: t.home, icon: Sparkles },
    { id: 'quran', label: t.quran, icon: BookOpen },
    { id: 'hadith', label: t.hadith, icon: BookOpen },
    { id: 'knowledge', label: effectiveLang === 'ur' ? 'نماز و جنازہ' : 'Namaz & Janaza', icon: BookOpen },
    { id: 'prayer', label: t.prayerTimes, icon: Clock },
    { id: 'duas', label: t.duas, icon: Heart },
    { id: 'qibla', label: t.qibla, icon: Compass },
    { id: 'azkar', label: t.azkar, icon: Sparkles },
    { id: 'tasbih', label: t.tasbih, icon: Heart },
    { id: 'calendar', label: t.calendar, icon: CalendarIcon },
    { id: 'ramadan', label: t.ramadan, icon: Moon },
    { id: 'zakat', label: t.zakat, icon: Calculator },
    { id: 'names', label: t.namesOfAllah, icon: Sparkles },
    { id: 'seerah', label: t.seerah, icon: BookOpen },
  ];

  return (
    <header className="sticky top-2 sm:top-3.5 z-40 max-w-7xl mx-auto px-2 sm:px-4 transition-all">
      <div className="ios-glass rounded-2xl sm:rounded-full px-3.5 sm:px-5 shadow-xl">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Logo only - Sleek, professional size */}
          <div 
            id="brand-logo-container"
            onClick={() => handleTabSelect('home')}
            className="flex items-center cursor-pointer select-none group shrink-0 py-1"
            title="Home"
          >
            <img 
              src="https://i.postimg.cc/k5Gz9zYv/hip.png" 
              alt="Logo" 
              className="h-7.5 sm:h-8.5 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links - iPhone iOS rounded pill style */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.slice(0, 7).map(item => {
              const Icon = item.icon;
              const isActive = activeTabId === item.id || (item.id === 'prayer' && activeTabId === 'prayer-times');
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabSelect(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20' 
                      : 'text-stone-700 dark:text-stone-300 hover:text-emerald-850 dark:hover:text-emerald-300 hover:bg-emerald-500/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More Menu Dropdown */}
            <div className="relative group">
              <button 
                id="nav-more-button"
                className="px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-emerald-850 dark:hover:text-emerald-300 hover:bg-emerald-500/10 flex items-center gap-1"
              >
                <span>More</span>
                <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 py-2 ios-glass rounded-2xl shadow-2xl border border-white/40 dark:border-white/10 hidden group-hover:block transition-all z-50">
                {navLinks.slice(7).map(item => {
                  const Icon = item.icon;
                  const isActive = activeTabId === item.id || (item.id === 'prayer' && activeTabId === 'prayer-times');
                  return (
                    <button
                      key={item.id}
                      id={`nav-sublink-${item.id}`}
                      onClick={() => handleTabSelect(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center gap-2 rounded-xl mx-1 max-w-[calc(100%-8px)] ${
                        isActive 
                          ? 'bg-emerald-800 text-white font-semibold' 
                          : 'text-stone-700 dark:text-stone-300 hover:bg-emerald-500/10'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Action Icons & Controls - iOS rounded buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Live Next Prayer Countdown Badge */}
            {nextPrayerName && nextPrayerCountdown && (
              <div 
                id="next-prayer-badge"
                onClick={() => handleTabSelect('prayer')}
                className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 dark:bg-emerald-950/60 border border-emerald-500/25 cursor-pointer hover:bg-emerald-500/25 transition-all text-xs text-emerald-950 dark:text-emerald-300 shadow-2xs"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="font-semibold">{nextPrayerName}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">{nextPrayerCountdown}</span>
              </div>
            )}

            {/* Audio Indicator if Recitation Playing */}
            {isPlayingAudio && onToggleAudioBar && (
              <button
                id="audio-indicator-btn"
                onClick={onToggleAudioBar}
                className="p-2 rounded-full text-emerald-700 dark:text-emerald-300 bg-emerald-500/20 animate-bounce shadow-xs"
                title="Now Playing Recitation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}

            {/* Global Search Button */}
            <button
              id="global-search-trigger"
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-emerald-500/15 transition-all shadow-2xs"
              title="Search (Cmd + K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="relative group">
              <button 
                id="language-switcher-btn"
                className="flex items-center gap-1 p-2 sm:p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-emerald-500/15 text-xs font-semibold uppercase shadow-2xs"
                title="Change Language"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">{effectiveLang}</span>
              </button>
              <div className="absolute right-0 mt-2 w-36 py-1.5 ios-glass rounded-2xl shadow-2xl border border-white/40 dark:border-white/10 hidden group-hover:block z-50">
                <button
                  id="lang-option-en"
                  onClick={() => handleLangChange('en')}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-xl ${effectiveLang === 'en' ? 'font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-500/15' : 'text-stone-700 dark:text-stone-300 hover:bg-stone-500/10'}`}
                >
                  English (LTR)
                </button>
                <button
                  id="lang-option-ur"
                  onClick={() => handleLangChange('ur')}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-xl ${effectiveLang === 'ur' ? 'font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-500/15' : 'text-stone-700 dark:text-stone-300 hover:bg-stone-500/10'}`}
                >
                  اردو (Urdu)
                </button>
                <button
                  id="lang-option-ar"
                  onClick={() => handleLangChange('ar')}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-xl ${effectiveLang === 'ar' ? 'font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-500/15' : 'text-stone-700 dark:text-stone-300 hover:bg-stone-500/10'}`}
                >
                  العربية (Arabic)
                </button>
              </div>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={handleThemeChange}
              className="p-2 sm:p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-emerald-500/15 transition-all shadow-2xs"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-900" />}
            </button>

            {/* User Account / Profile Button */}
            <button
              id="user-account-btn"
              onClick={handleAccountClick}
              className="p-2 sm:p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-emerald-500/15 transition-all shadow-2xs"
              title={t.account}
            >
              <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => {
                if (onOpenSidebar) {
                  onOpenSidebar();
                } else {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }
              }}
              className="lg:hidden p-2 rounded-full text-stone-700 dark:text-stone-200 hover:bg-emerald-500/15 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - iOS Glassify Pill Card */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden ios-glass rounded-3xl mt-2 p-4 shadow-2xl space-y-3">
          
          {/* Logo only - Clean unboxed */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-200/40 dark:border-stone-700/40">
            <img 
              src="https://i.postimg.cc/k5Gz9zYv/hip.png" 
              alt="Logo" 
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-500/10 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map(item => {
              const Icon = item.icon;
              const isActive = activeTabId === item.id || (item.id === 'prayer' && activeTabId === 'prayer-times');
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleTabSelect(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-md'
                      : 'bg-white/60 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 hover:bg-emerald-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
