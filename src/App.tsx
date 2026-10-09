import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { TodayHighlights } from './components/TodayHighlights';
import { QuickToolsGrid } from './components/QuickToolsGrid';
import { QuranSection } from './components/QuranSection';
import { HadithSection } from './components/HadithSection';
import { DuasSection } from './components/DuasSection';
import { AzkarSection } from './components/AzkarSection';
import { PrayerTimesSection } from './components/PrayerTimesSection';
import { QiblaFinderSection } from './components/QiblaFinderSection';
import { IslamicCalendarSection } from './components/IslamicCalendarSection';
import { RamadanCenterSection } from './components/RamadanCenterSection';
import { ZakatCalculatorSection } from './components/ZakatCalculatorSection';
import { DigitalTasbihSection } from './components/DigitalTasbihSection';
import { NamesOfAllahSection } from './components/NamesOfAllahSection';
import { SeerahSection } from './components/SeerahSection';
import { KnowledgeSection } from './components/KnowledgeSection';
import { UserDashboardSection } from './components/UserDashboardSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { QuranAudioPlayer } from './components/QuranAudioPlayer';
import { LanguageCode } from './utils/i18n';
import { calculatePrayerTimes } from './utils/prayerCalculations';
import { getHijriDate } from './utils/hijriCalendar';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('deen_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [lang, setLang] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('deen_lang');
      return (saved as LanguageCode) || 'en';
    } catch {
      return 'en';
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Audio Player persistent state
  const [audioState, setAudioState] = useState<{
    isOpen: boolean;
    surahNumber: number;
    ayahNumber: number;
    reciterId: string;
  }>({
    isOpen: false,
    surahNumber: 1,
    ayahNumber: 1,
    reciterId: 'ar.alafasy'
  });

  // Selected Quran reader position state (allows deep linking from search or dashboard)
  const [quranTarget, setQuranTarget] = useState<{ surah: number; ayah?: number }>({
    surah: 1,
    ayah: 1
  });

  // Dark mode class toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('deen_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Language preference
  const handleLanguageChange = (newLang: LanguageCode) => {
    setLang(newLang);
    localStorage.setItem('deen_lang', newLang);
    if (newLang === 'ar' || newLang === 'ur') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Tab navigation with smooth scroll to top
  const handleTabChange = (tab: string, meta?: any) => {
    const targetTab = tab === 'prayer-times' ? 'prayer' : tab;
    setCurrentTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (meta?.surahNumber) {
      setQuranTarget({ surah: meta.surahNumber, ayah: meta.ayahNumber || 1 });
    }
  };

  // Live prayer times and Hijri date computation
  const prayerData = useMemo(() => {
    try {
      const times = calculatePrayerTimes(new Date(), 21.4225, 39.8262);
      const hijri = getHijriDate(new Date());
      const gregorianStr = new Date().toLocaleDateString(
        lang === 'ar' ? 'ar-SA' : (lang === 'ur' ? 'ur-PK' : 'en-US'),
        { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }
      );
      return {
        nextPrayerName: times.nextPrayer,
        nextPrayerTime: (times as any)[times.nextPrayer.toLowerCase()] || times.dhuhr,
        nextPrayerCountdown: `${Math.floor(times.countdownSeconds / 3600)}h ${Math.floor((times.countdownSeconds % 3600) / 60)}m`,
        hijriFormatted: lang === 'ar' ? hijri.formattedAr : hijri.formattedEn,
        gregorianFormatted: gregorianStr
      };
    } catch {
      return {
        nextPrayerName: 'Dhuhr',
        nextPrayerTime: '12:30 PM',
        nextPrayerCountdown: '2h 15m',
        hijriFormatted: '1448 AH',
        gregorianFormatted: new Date().toLocaleDateString()
      };
    }
  }, [lang]);

  // Trigger audio playback from anywhere
  const handlePlayRecitation = (surah: number, ayah: number, reciterId?: string) => {
    setAudioState({
      isOpen: true,
      surahNumber: surah,
      ayahNumber: ayah,
      reciterId: reciterId || 'ar.alafasy'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 dark:bg-[#061712] dark:text-stone-100 transition-colors duration-200 selection:bg-emerald-800 selection:text-amber-200">
      
      {/* Navigation Bar with exact logo, search trigger, theme toggle, and menu */}
      <Navbar
        currentTab={currentTab}
        activeTab={currentTab}
        onSelectTab={handleTabChange}
        setActiveTab={handleTabChange}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAccount={() => setIsAuthOpen(true)}
        isDarkMode={isDarkMode}
        theme={isDarkMode ? 'dark' : 'light'}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        setTheme={(t) => setIsDarkMode(t === 'dark')}
        currentLang={lang}
        lang={lang}
        onSelectLanguage={handleLanguageChange}
        setLang={handleLanguageChange}
        nextPrayerName={prayerData.nextPrayerName}
        nextPrayerCountdown={prayerData.nextPrayerCountdown}
        isPlayingAudio={audioState.isOpen}
        onToggleAudioBar={() => setAudioState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
      />

      {/* Slide-over Mobile & Desktop Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentLang={lang}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 pb-24">
        {currentTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <HeroSection
              lang={lang}
              onNavigate={handleTabChange}
              hijriFormatted={prayerData.hijriFormatted}
              gregorianFormatted={prayerData.gregorianFormatted}
              nextPrayerName={prayerData.nextPrayerName}
              nextPrayerTime={prayerData.nextPrayerTime}
              nextPrayerCountdown={prayerData.nextPrayerCountdown}
            />
            <TodayHighlights
              lang={lang}
              onNavigate={handleTabChange}
            />
            <QuickToolsGrid
              lang={lang}
              onSelectTool={handleTabChange}
            />
          </div>
        )}

        {currentTab === 'quran' && (
          <div className="animate-in fade-in duration-200">
            <QuranSection
              lang={lang}
              initialSurah={quranTarget.surah}
              initialAyah={quranTarget.ayah}
              onPlayAyahAudio={handlePlayRecitation}
            />
          </div>
        )}

        {currentTab === 'hadith' && (
          <div className="animate-in fade-in duration-200">
            <HadithSection lang={lang} />
          </div>
        )}

        {currentTab === 'duas' && (
          <div className="animate-in fade-in duration-200">
            <DuasSection lang={lang} />
          </div>
        )}

        {currentTab === 'azkar' && (
          <div className="animate-in fade-in duration-200">
            <AzkarSection lang={lang} />
          </div>
        )}

        {(currentTab === 'prayer' || currentTab === 'prayer-times') && (
          <div className="animate-in fade-in duration-200">
            <PrayerTimesSection
              lang={lang}
              onNavigateToQibla={() => handleTabChange('qibla')}
            />
          </div>
        )}

        {currentTab === 'qibla' && (
          <div className="animate-in fade-in duration-200">
            <QiblaFinderSection lang={lang} />
          </div>
        )}

        {currentTab === 'calendar' && (
          <div className="animate-in fade-in duration-200">
            <IslamicCalendarSection lang={lang} />
          </div>
        )}

        {currentTab === 'ramadan' && (
          <div className="animate-in fade-in duration-200">
            <RamadanCenterSection lang={lang} />
          </div>
        )}

        {currentTab === 'zakat' && (
          <div className="animate-in fade-in duration-200">
            <ZakatCalculatorSection lang={lang} />
          </div>
        )}

        {currentTab === 'tasbih' && (
          <div className="animate-in fade-in duration-200">
            <DigitalTasbihSection lang={lang} />
          </div>
        )}

        {currentTab === 'names' && (
          <div className="animate-in fade-in duration-200">
            <NamesOfAllahSection lang={lang} />
          </div>
        )}

        {currentTab === 'seerah' && (
          <div className="animate-in fade-in duration-200">
            <SeerahSection lang={lang} />
          </div>
        )}

        {currentTab === 'knowledge' && (
          <div className="animate-in fade-in duration-200">
            <KnowledgeSection lang={lang} />
          </div>
        )}

        {currentTab === 'dashboard' && (
          <div className="animate-in fade-in duration-200">
            <UserDashboardSection
              lang={lang}
              onResumeQuran={(surah, ayah) => {
                setQuranTarget({ surah, ayah });
                setCurrentTab('quran');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* Persistent Bottom Audio Player Bar */}
      <QuranAudioPlayer
        isOpen={audioState.isOpen}
        surahNumber={audioState.surahNumber}
        ayahNumber={audioState.ayahNumber}
        reciterId={audioState.reciterId}
        onAyahChange={(s, a) => setAudioState(prev => ({ ...prev, surahNumber: s, ayahNumber: a }))}
        onClose={() => setAudioState(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Global Islamic Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleTabChange}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Footer */}
      <Footer
        onSelectTab={handleTabChange}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

    </div>
  );
}
