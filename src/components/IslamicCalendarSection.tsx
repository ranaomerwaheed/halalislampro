import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Moon, 
  Info,
  Clock
} from 'lucide-react';
import { 
  HIJRI_MONTHS, 
  ISLAMIC_EVENTS, 
  getHijriDate, 
  IslamicEvent 
} from '../utils/hijriCalendar';
import { LanguageCode } from '../utils/i18n';

interface IslamicCalendarSectionProps {
  lang: LanguageCode;
}

export const IslamicCalendarSection: React.FC<IslamicCalendarSectionProps> = ({ lang }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<IslamicEvent | null>(null);

  const hijri = getHijriDate(currentDate);

  // Month navigation
  const prevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const nextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  const resetToday = () => {
    setCurrentDate(new Date());
  };

  // Generate days in Gregorian month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Approximate moon phase calculation
  const getMoonPhase = (date: Date) => {
    const d = getHijriDate(date).day;
    if (d === 1) return { name: 'New Moon (Hilal)', icon: '🌑' };
    if (d < 7) return { name: 'Waxing Crescent', icon: '🌒' };
    if (d === 7 || d === 8) return { name: 'First Quarter', icon: '🌓' };
    if (d < 14) return { name: 'Waxing Gibbous', icon: '🌔' };
    if (d === 14 || d === 15) return { name: 'Full Moon (Badr)', icon: '🌕' };
    if (d < 22) return { name: 'Waning Gibbous', icon: '🌖' };
    if (d === 22 || d === 23) return { name: 'Last Quarter', icon: '🌗' };
    return { name: 'Waning Crescent', icon: '🌘' };
  };

  const currentMoon = getMoonPhase(currentDate);

  return (
    <section id="islamic-calendar-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <CalendarIcon className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              Islamic / Hijri Calendar (التقويم الهجري)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Dual Gregorian and Umm al-Qura Hijri calendar with sacred events, voluntary fasting days (Ayyam al-Beed), and moon phase tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToday}
            className="px-4 py-2 rounded-full ios-glass hover:bg-white/40 text-emerald-800 dark:text-emerald-400 text-xs font-semibold shadow-xs"
          >
            Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Calendar Grid & Moon Phase */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Calendar Header Card */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {hijri.monthNameEn} {hijri.year} AH
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • {hijri.monthNameAr}
                </p>
              </div>

              {/* Month Switchers */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevMonth}
                  className="p-2.5 rounded-full ios-glass text-stone-700 dark:text-stone-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2.5 rounded-full ios-glass text-stone-700 dark:text-stone-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day Names Row */}
            <div className="grid grid-cols-7 text-center font-semibold text-xs text-stone-500 mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span className="text-emerald-800 dark:text-emerald-400 font-bold">Fri (Jumu'ah)</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5">
              {/* Empty placeholder cells before 1st of month */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-2xl bg-stone-200/20 dark:bg-stone-800/20" />
              ))}

              {/* Days in Month */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const d = new Date(year, month, dayNum);
                const dayHijri = getHijriDate(d);
                const isToday = 
                  dayNum === new Date().getDate() && 
                  month === new Date().getMonth() && 
                  year === new Date().getFullYear();
                
                const isFriday = d.getDay() === 5;
                const isAyyamBeed = dayHijri.day >= 13 && dayHijri.day <= 15;

                return (
                  <div
                    key={`day-${dayNum}`}
                    className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-2xl border flex flex-col justify-between transition-all select-none ${
                      isToday
                        ? 'bg-emerald-800 text-white border-emerald-700 shadow-md scale-105 z-10'
                        : isFriday
                        ? 'ios-glass bg-emerald-500/10 border-emerald-300/40 dark:border-emerald-700/40'
                        : isAyyamBeed
                        ? 'ios-glass bg-amber-500/10 border-amber-300/40 dark:border-amber-700/40'
                        : 'ios-glass border-stone-200/50 dark:border-stone-800/50 hover:bg-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-white' : 'text-stone-900 dark:text-stone-100'}`}>
                        {dayNum}
                      </span>
                      <span className={`text-[10px] font-mono ${isToday ? 'text-emerald-200' : 'text-stone-400'}`}>
                        {dayHijri.day}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9px]">
                      {isAyyamBeed && (
                        <span className={`px-1.5 py-0.5 rounded-full font-semibold ${isToday ? 'bg-white/20 text-white' : 'ios-glass text-amber-700 dark:text-amber-300'}`}>
                          Beed
                        </span>
                      )}
                      {isFriday && !isToday && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold ml-auto">
                          Jumu'ah
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Moon Phase Widget */}
          <div className="p-5 sm:p-6 rounded-3xl ios-glass-card shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentMoon.icon}</span>
              <div>
                <p className="text-xs text-stone-500 font-medium">Approximate Lunar Phase</p>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{currentMoon.name}</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full ios-glass text-emerald-800 dark:text-emerald-400">
              Hijri Day {hijri.day} of {hijri.monthNameEn}
            </span>
          </div>

        </div>

        {/* Right Column: Major Islamic Events List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Major Islamic Occasions
              </h3>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {ISLAMIC_EVENTS.map((event, idx) => {
                const monthObj = HIJRI_MONTHS.find(m => m.number === event.hijriMonth);
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedEvent(event)}
                    className="p-4 rounded-2xl ios-glass hover:bg-white/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400">
                        {event.title}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full ios-glass text-stone-600 dark:text-stone-300">
                        {event.hijriDay} {monthObj?.en}
                      </span>
                    </div>
                    <p className="font-arabic text-xs text-right text-emerald-800 dark:text-emerald-400 mb-1 dir-rtl">
                      {event.arabicTitle}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 sm:p-7 rounded-3xl ios-glass-card shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">{selectedEvent.title}</h3>
                <p className="font-arabic text-sm text-emerald-800 dark:text-emerald-400">{selectedEvent.arabicTitle}</p>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-2 rounded-full ios-glass text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {selectedEvent.description}
            </p>

            <div className="p-4 rounded-2xl ios-glass border border-emerald-300/40 text-xs text-emerald-950 dark:text-emerald-300">
              <strong>Religious Significance:</strong> {selectedEvent.significance}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedEvent(null)}
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
