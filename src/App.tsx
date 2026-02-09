import { useEffect, useState, useRef } from 'react';
import { 
  BookOpen, Clock, MapPin, Calendar, Moon, Sun, 
  ChevronRight, Play, Pause, Copy, Share2, Search,
  Menu, X, Heart, Users, MessageCircle,
  Facebook, Twitter, Instagram, Youtube,
  Volume2, Bookmark, ArrowRight, Star, CheckCircle2,
  Loader2
} from 'lucide-react';
import './App.css';

// API Base URL
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types
interface DailyAyah {
  arabic: {
    text: string;
    surah: {
      englishName: string;
      name: string;
    };
    numberInSurah: number;
  };
  urdu: {
    text: string;
  };
  reference: string;
}

interface DailyHadith {
  id: number;
  text: string;
  arabic: string;
  source: string;
  book: string;
  hadithNumber: string;
  category: string;
}

interface PrayerTime {
  name: string;
  nameUrdu: string;
  time: string;
  isNext?: boolean;
}

interface PrayerData {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  currentPrayer?: { name: string; nameUrdu: string };
  nextPrayer?: { name: string; nameUrdu: string; time: string };
  timeUntilNext?: { hours: number; minutes: number };
}

interface HijriDate {
  day: string;
  month: { en: string; ar: string };
  year: string;
  date: string;
}

interface Surah {
  number: number;
  englishName: string;
  name: string;
  numberOfAyahs: number;
}

interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// API Functions
const fetchDailyContent = async (lat?: number, lng?: number) => {
  const url = lat && lng 
    ? `${API_BASE}/daily-content?lat=${lat}&lng=${lng}`
    : `${API_BASE}/daily-content`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch daily content');
  return response.json();
};

const fetchPrayerTimes = async (lat?: number, lng?: number) => {
  const url = lat && lng 
    ? `${API_BASE}/prayer/coords?lat=${lat}&lng=${lng}`
    : `${API_BASE}/prayer`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch prayer times');
  return response.json();
};

const fetchLocation = async () => {
  const response = await fetch(`${API_BASE}/location`);
  if (!response.ok) throw new Error('Failed to fetch location');
  return response.json();
};

const fetchSurahs = async () => {
  const response = await fetch(`${API_BASE}/quran/surahs`);
  if (!response.ok) throw new Error('Failed to fetch surahs');
  return response.json();
};

const fetchHadithCategories = async () => {
  const response = await fetch(`${API_BASE}/hadith/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

const fetchHadithByCategory = async (category: string) => {
  const response = await fetch(`${API_BASE}/hadith?category=${category}`);
  if (!response.ok) throw new Error('Failed to fetch hadith');
  return response.json();
};

function App() {
  // State
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<LocationData | null>(null);
  const [dailyAyah, setDailyAyah] = useState<DailyAyah | null>(null);
  const [dailyHadith, setDailyHadith] = useState<DailyHadith | null>(null);
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [hadithCategories, setHadithCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categoryHadith, setCategoryHadith] = useState<any[]>([]);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('morning');
  
  // Loading states
  const [loading, setLoading] = useState({
    dailyContent: true,
    prayerTimes: true,
    location: true,
    surahs: true,
    categories: true
  });

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch daily content
  useEffect(() => {
    const loadDailyContent = async () => {
      try {
        const data = await fetchDailyContent();
        setDailyAyah(data.dailyAyah);
        setDailyHadith(data.dailyHadith);
        setHijriDate(data.hijriDate);
        setLoading(prev => ({ ...prev, dailyContent: false }));
      } catch (error) {
        console.error('Error loading daily content:', error);
        setLoading(prev => ({ ...prev, dailyContent: false }));
      }
    };
    loadDailyContent();
  }, []);

  // Fetch location and prayer times
  useEffect(() => {
    const loadLocationAndPrayer = async () => {
      try {
        const locData = await fetchLocation();
        setLocation(locData);
        setLoading(prev => ({ ...prev, location: false }));
        
        // Fetch prayer times with location
        const prayerData = await fetchPrayerTimes(locData.latitude, locData.longitude);
        setPrayerData(prayerData);
        setLoading(prev => ({ ...prev, prayerTimes: false }));
      } catch (error) {
        console.error('Error loading location/prayer:', error);
        setLoading(prev => ({ ...prev, location: false, prayerTimes: false }));
      }
    };
    loadLocationAndPrayer();
  }, []);

  // Fetch surahs
  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await fetchSurahs();
        setSurahs(data.slice(0, 15)); // Show first 15 surahs
        setLoading(prev => ({ ...prev, surahs: false }));
      } catch (error) {
        console.error('Error loading surahs:', error);
        setLoading(prev => ({ ...prev, surahs: false }));
      }
    };
    loadSurahs();
  }, []);

  // Fetch hadith categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchHadithCategories();
        setHadithCategories(data);
        setLoading(prev => ({ ...prev, categories: false }));
      } catch (error) {
        console.error('Error loading categories:', error);
        setLoading(prev => ({ ...prev, categories: false }));
      }
    };
    loadCategories();
  }, []);

  // Fetch hadith by category
  useEffect(() => {
    const loadHadith = async () => {
      try {
        const data = await fetchHadithByCategory(activeCategory);
        setCategoryHadith(data.hadith || []);
      } catch (error) {
        console.error('Error loading hadith:', error);
      }
    };
    loadHadith();
  }, [activeCategory]);

  // Format Hijri date
  const formatHijriDate = () => {
    if (!hijriDate) return 'Loading...';
    return `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH`;
  };

  // Get prayer times array
  const getPrayerTimesArray = (): PrayerTime[] => {
    if (!prayerData?.timings) return [];
    const { timings } = prayerData;
    const prayers = [
      { name: 'Fajr', nameUrdu: 'فجر', time: timings.Fajr },
      { name: 'Dhuhr', nameUrdu: 'ظہر', time: timings.Dhuhr },
      { name: 'Asr', nameUrdu: 'عصر', time: timings.Asr },
      { name: 'Maghrib', nameUrdu: 'مغرب', time: timings.Maghrib },
      { name: 'Isha', nameUrdu: 'عشاء', time: timings.Isha }
    ];
    
    return prayers.map(p => ({
      ...p,
      isNext: prayerData.nextPrayer?.name === p.name
    }));
  };

  // Get Islamic month info
  const getIslamicMonth = () => {
    const monthNames: Record<string, { name: string; nameUrdu: string; fazilat: string; amaal: string[] }> = {
      'Muharram': {
        name: 'Muharram',
        nameUrdu: 'محرم',
        fazilat: 'محرم اللہ کے مہینوں میں سب سے افضل ہے۔ اس میں روزے رکھنے کا بڑا ثواب ہے۔',
        amaal: ['روزے رکھنا', 'صدقہ دینا', 'نفل نمازیں', 'قرآن کی تلاوت']
      },
      'Safar': {
        name: 'Safar',
        nameUrdu: 'صفر',
        fazilat: 'صفر میں استغفار اور توبہ کا خصوصی اہتمام کریں۔',
        amaal: ['استغفار', 'توبہ', 'صدقہ', 'نمازیں']
      },
      "Rabi' al-awwal": {
        name: "Rabi' al-awwal",
        nameUrdu: 'ربیع الاول',
        fazilat: 'ربیع الاول میں نبی کریم ﷺ کی ولادت کا مہینہ ہے۔ درود شریف پڑھیں۔',
        amaal: ['درود شریف', 'نفل نمازیں', 'صدقہ', 'محفل میلاد']
      },
      "Rabi' al-thani": {
        name: "Rabi' al-thani",
        nameUrdu: 'ربیع الثانی',
        fazilat: 'ربیع الثانی میں نیک اعمال کا اہتمام کریں۔',
        amaal: ['نفل نمازیں', 'صدقہ', 'قرآن کی تلاوت']
      },
      "Jumada al-awwal": {
        name: "Jumada al-awwal",
        nameUrdu: 'جمادی الاول',
        fazilat: 'جمادی الاول میں اللہ کی یاد کو زیادہ کریں۔',
        amaal: ['ذکر اذکار', 'نفل نمازیں', 'صدقہ']
      },
      "Jumada al-thani": {
        name: "Jumada al-thani",
        nameUrdu: 'جمادی الثانی',
        fazilat: 'جمادی الثانی میں نیکیوں کی فضیلت ہے۔',
        amaal: ['روزے', 'نفل نمازیں', 'صدقہ']
      },
      'Rajab': {
        name: 'Rajab',
        nameUrdu: 'رجب',
        fazilat: 'رجب اللہ کے مہینوں میں سے ایک ہے۔ اس میں عمرہ کرنے کا بڑا ثواب ہے۔',
        amaal: ['عمرہ', 'روزے', 'نفل نمازیں', 'صدقہ']
      },
      "Sha'ban": {
        name: "Sha'ban",
        nameUrdu: 'شعبان',
        fazilat: 'شعبان رمضان سے پہلے تیاری کا مہینہ ہے۔ نیکیوں کی فضیلت ہے۔',
        amaal: ['روزے رکھنا', 'استغفار', 'نفل نمازیں', 'قرآن کی تلاوت']
      },
      'Ramadan': {
        name: 'Ramadan',
        nameUrdu: 'رمضان',
        fazilat: 'رمضان اللہ کے مہینوں میں سب سے افضل ہے۔ روزے اور قرآن کی فضیلت ہے۔',
        amaal: ['روزے', 'تراویح', 'قرآن کی تلاوت', 'اعتکاف', 'صدقہ']
      },
      'Shawwal': {
        name: 'Shawwal',
        nameUrdu: 'شوال',
        fazilat: 'شوال میں چھ روزے رکھنے کا بڑا ثواب ہے۔',
        amaal: ['چھ شوال کے روزے', 'صدقہ', 'نفل نمازیں']
      },
      "Dhu al-Qi'dah": {
        name: "Dhu al-Qi'dah",
        nameUrdu: 'ذو القعدہ',
        fazilat: 'ذو القعدہ حرم کا مہینہ ہے۔ اس میں عمرہ کرنے کا بڑا ثواب ہے۔',
        amaal: ['عمرہ', 'نفل نمازیں', 'صدقہ']
      },
      "Dhu al-Hijjah": {
        name: "Dhu al-Hijjah",
        nameUrdu: 'ذو الحجہ',
        fazilat: 'ذو الحجہ میں حج اور قربانی کا ثواب ہے۔ پہلے دس دنوں کی فضیلت ہے۔',
        amaal: ['حج', 'قربانی', 'روزے', 'تکبیرات', 'صدقہ']
      }
    };
    
    return monthNames[hijriDate?.month?.en || "Sha'ban"];
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const islamicMonth = getIslamicMonth();
  const prayerTimes = getPrayerTimesArray();

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-8 h-8 text-islamic-gold animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-islamic-white geometric-pattern">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl islamic-gradient flex items-center justify-center">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-islamic-green">HalalIslampro</h1>
                <p className="text-[10px] text-islamic-gold -mt-1">The Path of Pure Islam</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
              <button onClick={() => scrollToSection('quran')} className="nav-link">Quran</button>
              <button onClick={() => scrollToSection('hadith')} className="nav-link">Hadith</button>
              <button onClick={() => scrollToSection('prayer')} className="nav-link">Namaz</button>
              <button onClick={() => scrollToSection('articles')} className="nav-link">Articles</button>
              <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-islamic-green/10 rounded-xl transition-colors">
                <Search className="w-5 h-5 text-islamic-green" />
              </button>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 border-2 border-islamic-gold text-islamic-gold rounded-xl font-medium hover:bg-islamic-gold hover:text-white transition-all">
                <Bookmark className="w-4 h-4" />
                <span className="text-sm">My Library</span>
              </button>
              <button 
                className="lg:hidden p-2 hover:bg-islamic-green/10 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6 text-islamic-green" /> : <Menu className="w-6 h-6 text-islamic-green" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-2">
              {['Home', 'Quran', 'Hadith', 'Namaz', 'Articles', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-islamic-cream hover:text-islamic-green rounded-xl transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Top Info Bar */}
      <div className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-islamic-green/95 backdrop-blur-sm text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-islamic-gold" />
              <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-islamic-gold" />
              <span>{loading.location ? 'Detecting...' : `${location?.city}, ${location?.country}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-islamic-gold" />
              <span>{formatHijriDate()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Daily Ayah */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542319465-7a87c5f8537c?w=1920&q=80" 
            alt="Masjid" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="islamic-card-lg p-6 sm:p-10 lg:p-12 text-center animate-fade-in">
            {loading.dailyContent ? (
              <LoadingSpinner />
            ) : dailyAyah ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <BookOpen className="w-6 h-6 text-islamic-gold" />
                  <span className="section-label">Daily Ayah</span>
                  <span className="px-3 py-1 bg-islamic-cream rounded-full text-xs text-islamic-green font-medium">
                    {formatHijriDate()}
                  </span>
                </div>

                {/* Arabic */}
                <div className="mb-6">
                  <p className="arabic-text text-3xl sm:text-4xl lg:text-5xl text-islamic-green mb-4" dir="rtl">
                    {dailyAyah.arabic.text}
                  </p>
                  <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
                </div>

                {/* Urdu Translation */}
                <p className="urdu-text text-xl sm:text-2xl text-gray-700 mb-6" dir="rtl">
                  {dailyAyah.urdu.text}
                </p>

                {/* Reference */}
                <p className="text-sm text-gray-500 mb-8">
                  {dailyAyah.reference}
                </p>

                {/* Tagline */}
                <p className="text-islamic-gold font-medium mb-8 text-lg">
                  اللہ کا کلام — ہر دل کے لیے رہنمائی
                </p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="islamic-btn flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span>Listen</span>
                  </button>
                  <button className="islamic-btn-outline flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Failed to load daily ayah</p>
            )}
          </div>
        </div>
      </section>

      {/* Daily Hadith Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 islamic-pattern-overlay">
        <div className="max-w-4xl mx-auto">
          <div className="islamic-card-lg p-8 sm:p-12 text-center">
            {loading.dailyContent ? (
              <LoadingSpinner />
            ) : dailyHadith ? (
              <>
                {/* Badge */}
                <span className="inline-block px-4 py-1.5 bg-islamic-gold/10 text-islamic-gold rounded-full text-sm font-medium mb-6">
                  Hadith of the Day
                </span>

                {/* Hadith Text */}
                <p className="urdu-text text-2xl sm:text-3xl text-gray-800 mb-6 leading-relaxed" dir="rtl">
                  {dailyHadith.text}
                </p>

                {/* Arabic */}
                <p className="arabic-text text-xl text-islamic-green mb-4" dir="rtl">
                  {dailyHadith.arabic}
                </p>

                {/* Reference */}
                <p className="text-sm text-gray-500 mb-2">
                  {dailyHadith.source} · {dailyHadith.hadithNumber}
                </p>
                <p className="text-xs text-islamic-gold mb-8">
                  Authentic source · Verified
                </p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3">
                  <button className="p-3 hover:bg-islamic-cream rounded-xl transition-colors" title="Share">
                    <Share2 className="w-5 h-5 text-islamic-green" />
                  </button>
                  <button className="p-3 hover:bg-islamic-cream rounded-xl transition-colors" title="Copy">
                    <Copy className="w-5 h-5 text-islamic-green" />
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Failed to load daily hadith</p>
            )}
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <section id="prayer" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="section-label mb-4 block">Prayer Times</span>
              <h2 className="font-bold text-3xl sm:text-4xl text-islamic-green mb-6">
                Today's Salah Schedule
              </h2>
              
              {/* Location Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-islamic-cream rounded-full mb-6">
                <MapPin className="w-4 h-4 text-islamic-gold" />
                <span className="text-sm text-islamic-green">
                  {loading.location ? 'Detecting...' : `${location?.city}, ${location?.country}`}
                </span>
              </div>

              {/* Next Prayer */}
              {prayerData?.nextPrayer && (
                <div className="p-6 bg-islamic-green rounded-2xl text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Next Prayer</p>
                      <p className="font-bold text-2xl">
                        {prayerData.nextPrayer.name} in {prayerData.timeUntilNext?.hours}h {prayerData.timeUntilNext?.minutes}m
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                      <Clock className="w-7 h-7 text-islamic-gold" />
                    </div>
                  </div>
                </div>
              )}

              <button className="text-islamic-gold font-medium hover:underline flex items-center gap-2">
                Change Location
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Prayer List */}
            <div className="space-y-3">
              {loading.prayerTimes ? (
                <LoadingSpinner />
              ) : (
                prayerTimes.map((prayer) => (
                  <div key={prayer.name} className={`prayer-row ${prayer.isNext ? 'active' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        prayer.isNext ? 'gold-gradient' : 'bg-islamic-cream'
                      }`}>
                        <Sun className={`w-5 h-5 ${prayer.isNext ? 'text-white' : 'text-islamic-green'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-islamic-green">{prayer.name}</p>
                        <p className="text-sm text-gray-500 urdu-text">{prayer.nameUrdu}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-islamic-green">{prayer.time}</p>
                      {prayer.isNext && (
                        <span className="text-xs text-islamic-gold font-medium">Next</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Month Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-cream/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-4 block">Islamic Month</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-islamic-green">
              Current Month: {islamicMonth?.name}
            </h2>
            <p className="urdu-text text-2xl text-islamic-gold mt-2">{islamicMonth?.nameUrdu}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Fazilat */}
            <div className="islamic-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-islamic-green">Fazilat (فضیلت)</h3>
              </div>
              <p className="urdu-text text-lg text-gray-700 leading-relaxed" dir="rtl">
                {islamicMonth?.fazilat}
              </p>
            </div>

            {/* A'maal */}
            <div className="islamic-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl islamic-gradient flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-islamic-green">Recommended A'maal (اعمال)</h3>
              </div>
              <ul className="space-y-3">
                {islamicMonth?.amaal.map((amal, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-islamic-gold/20 flex items-center justify-center">
                      <span className="text-xs text-islamic-gold font-medium">{index + 1}</span>
                    </div>
                    <span className="urdu-text text-gray-700">{amal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quran Section */}
      <section id="quran" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-4 block">Qur'an</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-islamic-green mb-4">
              Read or Listen
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access the complete Quran with Arabic text, Urdu translation, and audio recitation.
            </p>
          </div>

          {/* Search & Last Read */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Surah..."
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-islamic-gold focus:ring-2 focus:ring-islamic-gold/20 outline-none transition-all"
              />
            </div>

            {/* Last Read Banner */}
            <div className="p-6 bg-islamic-green/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl islamic-gradient flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last read</p>
                  <p className="font-medium text-islamic-green">Surah Al-Kahf · Ayah 45</p>
                </div>
              </div>
              <button className="islamic-btn text-sm">Resume</button>
            </div>
          </div>

          {/* Surah Grid */}
          {loading.surahs ? (
            <LoadingSpinner />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {surahs.map((surah) => (
                <div key={surah.number} className="islamic-card p-5 hover:shadow-islamic-lg transition-all cursor-pointer hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{surah.number}</span>
                      </div>
                      <div>
                        <p className="font-medium text-islamic-green">{surah.englishName}</p>
                        <p className="text-xs text-gray-500">{surah.numberOfAyahs} verses</p>
                      </div>
                    </div>
                    <p className="arabic-text text-lg text-islamic-gold">{surah.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <button className="islamic-btn-outline inline-flex items-center gap-2">
              View All Surahs
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Hadith Section */}
      <section id="hadith" className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-cream/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-4 block">Hadith</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-islamic-green mb-4">
              Authentic Sayings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse by topic—prayer, character, daily life. All Hadith are from verified Sahih sources.
            </p>
          </div>

          {/* Categories */}
          {loading.categories ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'gold-gradient text-white'
                    : 'bg-white text-islamic-green hover:bg-islamic-cream border border-gray-200'
                }`}
              >
                <span className="urdu-text mr-2">تمام</span>
                <span>All</span>
              </button>
              {hadithCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'gold-gradient text-white'
                      : 'bg-white text-islamic-green hover:bg-islamic-cream border border-gray-200'
                  }`}
                >
                  <span className="urdu-text mr-2">{cat.nameUrdu}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Hadith Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {categoryHadith.slice(0, 6).map((hadith, index) => (
              <div key={index} className="islamic-card p-6 hover:shadow-islamic-lg transition-all">
                <span className="inline-block px-3 py-1 bg-islamic-gold/10 text-islamic-gold rounded-full text-xs font-medium mb-4">
                  {hadithCategories.find(c => c.id === hadith.category)?.name || hadith.category}
                </span>
                <p className="urdu-text text-xl text-gray-800 mb-4" dir="rtl">{hadith.text}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{hadith.source}</p>
                  <button className="text-islamic-gold text-sm font-medium hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Placeholder - Homepage Side Block */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">AdSense Ad Space - 728x90</p>
            <p className="text-gray-300 text-xs mt-1">Google AdSense Ready</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=1920&q=80" 
            alt="Community" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 dark-overlay" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">
            Join the Community
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Get weekly reflections, printables, and early access to new features. Be part of our growing Ummah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="islamic-btn w-full sm:w-auto">Join Free</button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-islamic-navy transition-all w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Dua & Dhikr Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-4 block">Supplications</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-islamic-green mb-4">
              Dua & Dhikr
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Essential supplications for every occasion. Read, listen, and memorize.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'morning', name: 'Morning', nameUrdu: 'صبح' },
              { id: 'evening', name: 'Evening', nameUrdu: 'شام' },
              { id: 'prayer', name: 'After Prayer', nameUrdu: 'نماز کے بعد' },
              { id: 'ramadan', name: 'Ramadan', nameUrdu: 'رمضان' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'gold-gradient text-white'
                    : 'bg-white text-islamic-green hover:bg-islamic-cream border border-gray-200'
                }`}
              >
                <span className="urdu-text mr-2">{tab.nameUrdu}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Dua List */}
          <div className="space-y-4">
            {[
              { arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا", urdu: "اے اللہ! تیری ہی مدد سے ہم نے صبح کی۔", transliteration: "Allahumma bika asbahna" },
              { arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا", urdu: "اے اللہ! تیری ہی مدد سے ہم نے شام کی۔", transliteration: "Allahumma bika amsayna" },
              { arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", urdu: "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں۔", transliteration: "A'udhu billahi minash shaytanir rajeem" },
              { arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", urdu: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔", transliteration: "Bismillahir Rahmanir Raheem" },
            ].map((dua, index) => (
              <div key={index} className="islamic-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="arabic-text text-xl text-islamic-green mb-2" dir="rtl">{dua.arabic}</p>
                    <p className="urdu-text text-gray-700" dir="rtl">{dua.urdu}</p>
                    <p className="text-sm text-gray-400 mt-2 italic">{dua.transliteration}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-islamic-cream rounded-lg transition-colors" title="Listen">
                      <Volume2 className="w-5 h-5 text-islamic-green" />
                    </button>
                    <button className="p-2 hover:bg-islamic-cream rounded-lg transition-colors" title="Copy">
                      <Copy className="w-5 h-5 text-islamic-green" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="islamic-card-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1590073242678-cfea5334e249?w=800&q=80" 
                  alt="About" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="section-label mb-4 block">About</span>
                <h2 className="font-bold text-2xl lg:text-3xl text-islamic-green mb-4">
                  Why HalalIslampro Exists
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We built this space to make the Qur'an and Sunnah part of daily life—without clutter, noise, or distraction. Clean design. Authentic sources. Respectful tone.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our mission is to provide Muslims worldwide with easy access to authentic Islamic knowledge, prayer times, and daily inspiration. Every feature is designed with your spiritual growth in mind.
                </p>
                <p className="text-islamic-gold font-medium text-sm">
                  Made for the Ummah · Updated daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Placeholder - Footer */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-islamic-cream/50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">AdSense Ad Space - 728x90</p>
            <p className="text-gray-300 text-xs mt-1">Google AdSense Ready</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="geometric-pattern w-full h-full" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">
            Start your day with one ayah.
          </h2>
          <p className="text-white/70 text-lg mb-8">
            No noise. No ads. Just authentic guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="islamic-btn w-full sm:w-auto">Get Started</button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-islamic-navy transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-islamic-navy border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">HalalIslampro</h3>
                  <p className="text-[10px] text-islamic-gold -mt-1">The Path of Pure Islam</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Your daily companion for Qur'an, Hadith, and Islamic guidance.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-medium text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Quran', 'Hadith', 'Prayer Times', 'Articles'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase().replace(' ', '-'))}
                      className="text-white/60 hover:text-islamic-gold text-sm transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-medium text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {['Community', 'Help Center', 'Privacy Policy', 'Terms of Service'].map((link) => (
                  <li key={link}>
                    <button className="text-white/60 hover:text-islamic-gold text-sm transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-medium text-white mb-4">Connect</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Youtube, label: 'YouTube' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-islamic-gold transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-4">@halalislampro</p>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} HalalIslampro. All rights reserved.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-2">
              Built with <Heart className="w-4 h-4 text-islamic-gold fill-islamic-gold" /> for the Ummah
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
