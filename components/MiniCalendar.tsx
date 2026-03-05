
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Language } from '../types';

interface MiniCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  darkMode?: boolean;
  lang: Language;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({ selectedDate, onDateSelect, darkMode, lang }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const locale = lang === 'pt' ? 'pt-BR' : 'en-US';

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthName = currentMonth.toLocaleString(locale, { month: 'long' });
  const year = currentMonth.getFullYear();

  const totalDays = daysInMonth(year, currentMonth.getMonth());
  const startDay = firstDayOfMonth(year, currentMonth.getMonth());

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, currentMonth.getMonth(), d);
    const isSelected = selectedDate?.toDateString() === date.toDateString();
    const isPast = date < today;
    const isToday = date.toDateString() === today.toDateString();

    days.push(
      <button
        key={d}
        disabled={isPast}
        type="button"
        onClick={() => onDateSelect(date)}
        className={`
          w-full aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all
          ${isPast ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110'}
          ${isSelected 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900' 
            : isToday 
              ? 'text-blue-500 border border-blue-500/30' 
              : darkMode ? 'text-slate-300 hover:bg-white/10' : 'text-slate-700 hover:bg-blue-50'
          }
        `}
      >
        {d}
      </button>
    );
  }

  // Generate localized week headers
  const weekDays = [];
  const baseDate = new Date(2021, 0, 3); // A Sunday
  for (let i = 0; i < 7; i++) {
    weekDays.push(new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000).toLocaleString(locale, { weekday: 'short' }));
  }

  return (
    <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
      <div className="flex items-center justify-between mb-4 px-2">
        <h6 className={`font-black uppercase tracking-widest text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {monthName} {year}
        </h6>
        <div className="flex gap-1">
          <button type="button" onClick={handlePrevMonth} className={`p-1.5 rounded-lg hover:bg-blue-600/10 transition-colors ${darkMode ? 'text-white' : 'text-slate-700'}`}>
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={handleNextMonth} className={`p-1.5 rounded-lg hover:bg-blue-600/10 transition-colors ${darkMode ? 'text-white' : 'text-slate-700'}`}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-[10px] font-black text-center uppercase tracking-tighter opacity-40">
            {day[0]}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};
