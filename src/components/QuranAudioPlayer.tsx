import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Clock, 
  X, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { QURAN_RECITERS, SURAH_LIST } from '../data/surahs';
import { QuranService } from '../services/quranService';

interface QuranAudioPlayerProps {
  surahNumber: number;
  ayahNumber: number;
  reciterId?: string;
  onAyahChange: (surah: number, ayah: number) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const QuranAudioPlayer: React.FC<QuranAudioPlayerProps> = ({
  surahNumber,
  ayahNumber,
  reciterId = 'ar.alafasy',
  onAyahChange,
  onClose,
  isOpen
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [repeatMode, setRepeatMode] = useState<'off' | 'once' | 'infinite'>('off');
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSurah = SURAH_LIST.find(s => s.number === surahNumber) || SURAH_LIST[0];
  const currentReciter = QURAN_RECITERS.find(r => r.id === reciterId) || QURAN_RECITERS[0];
  const audioUrl = QuranService.getAyahAudioUrl(surahNumber, ayahNumber, reciterId);

  // Setup audio stream on url change
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.src = audioUrl;
    audio.playbackRate = playbackRate;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (repeatMode === 'once' || repeatMode === 'infinite') {
        audio.currentTime = 0;
        audio.play();
      } else {
        // Auto advance to next Ayah if available
        if (ayahNumber < currentSurah.numberOfAyahs) {
          onAyahChange(surahNumber, ayahNumber + 1);
        } else if (surahNumber < 114) {
          onAyahChange(surahNumber + 1, 1);
        } else {
          setIsPlaying(false);
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl, repeatMode]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Speed change
  const cyclePlaybackRate = () => {
    const rates = [1.0, 1.25, 1.5, 0.75];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // Sleep Timer
  const setSleepTimer = (minutes: number | null) => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    setSleepTimerMinutes(minutes);
    if (minutes) {
      sleepTimerRef.current = setTimeout(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
        setSleepTimerMinutes(null);
      }, minutes * 60 * 1000);
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      id="persistent-quran-audio-player"
      className="fixed bottom-3 sm:bottom-4 inset-x-2 sm:inset-x-6 max-w-5xl mx-auto z-50 ios-glass text-stone-900 dark:text-stone-100 rounded-3xl sm:rounded-full px-3 sm:px-5 py-2.5 sm:py-3 shadow-2xl transition-all border border-white/50 dark:border-white/10"
    >
      <div className="w-full">
        
        {/* Progress Bar */}
        <div className="relative w-full flex items-center gap-2 mb-1.5 sm:mb-2">
          <span className="text-[10px] font-mono text-stone-600 dark:text-stone-400 w-8 text-right">
            {formatSeconds(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 accent-emerald-600 bg-stone-300 dark:bg-stone-700/60 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] font-mono text-stone-600 dark:text-stone-400 w-8">
            {formatSeconds(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Reciter & Current Verse Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-600/15 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/30 shrink-0 shadow-xs">
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold truncate text-stone-900 dark:text-stone-100">
                Surah {currentSurah.englishName} — Ayah {ayahNumber}
              </p>
              <p className="text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate">
                {currentReciter.name}
              </p>
            </div>
          </div>

          {/* Main Controls: Previous, Play/Pause, Next */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => {
                if (ayahNumber > 1) {
                  onAyahChange(surahNumber, ayahNumber - 1);
                } else if (surahNumber > 1) {
                  const prevSurah = SURAH_LIST.find(s => s.number === surahNumber - 1);
                  onAyahChange(surahNumber - 1, prevSurah?.numberOfAyahs || 1);
                }
              }}
              className="p-1.5 sm:p-2 rounded-full ios-glass text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="Previous Ayah"
            >
              <SkipBack className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <button
              id="audio-player-toggle-btn"
              onClick={togglePlay}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
              title={isPlaying ? 'Pause Recitation' : 'Play Recitation'}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                if (ayahNumber < currentSurah.numberOfAyahs) {
                  onAyahChange(surahNumber, ayahNumber + 1);
                } else if (surahNumber < 114) {
                  onAyahChange(surahNumber + 1, 1);
                }
              }}
              className="p-1.5 sm:p-2 rounded-full ios-glass text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="Next Ayah"
            >
              <SkipForward className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>

          {/* Right Tools: Speed, Repeat, Sleep Timer, Close */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Playback speed */}
            <button
              onClick={cyclePlaybackRate}
              className="px-2 py-1 rounded-full ios-glass text-[10px] sm:text-xs font-mono font-bold text-stone-800 dark:text-stone-200"
              title="Change Speed"
            >
              {playbackRate}x
            </button>

            {/* Repeat button */}
            <button
              onClick={() => setRepeatMode(repeatMode === 'off' ? 'infinite' : 'off')}
              className={`p-1.5 sm:p-2 rounded-full transition-colors hidden sm:block ${
                repeatMode !== 'off' ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/20' : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white'
              }`}
              title={`Repeat: ${repeatMode}`}
            >
              <Repeat className="w-4 h-4" />
            </button>

            {/* Sleep timer */}
            <div className="relative group hidden sm:block">
              <button
                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                  sleepTimerMinutes ? 'text-amber-600 dark:text-amber-400 bg-amber-500/20' : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white'
                }`}
                title="Sleep Timer"
              >
                <Clock className="w-4 h-4" />
              </button>
              <div className="absolute right-0 bottom-full mb-2 w-32 p-1.5 ios-glass-card rounded-2xl shadow-xl border border-white/40 dark:border-white/10 hidden group-hover:block z-50">
                <button onClick={() => setSleepTimer(null)} className="w-full text-left px-2.5 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10 rounded-xl">Off</button>
                <button onClick={() => setSleepTimer(15)} className="w-full text-left px-2.5 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10 rounded-xl">15 min</button>
                <button onClick={() => setSleepTimer(30)} className="w-full text-left px-2.5 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10 rounded-xl">30 min</button>
                <button onClick={() => setSleepTimer(60)} className="w-full text-left px-2.5 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10 rounded-xl">60 min</button>
              </div>
            </div>

            {/* Close audio player */}
            <button
              onClick={() => {
                audioRef.current?.pause();
                setIsPlaying(false);
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-full ios-glass text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="Close Player"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
