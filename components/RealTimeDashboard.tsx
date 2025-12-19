
import React, { useState, useEffect, useMemo } from 'react';
import { Activity, Clock, CheckCircle, MapPin, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface RealTimeDashboardProps {
  lang: Language;
  darkMode: boolean;
}

const LOCATIONS = [
  'Miami, FL', 'Boston, MA', 'Newark, NJ', 'Orlando, FL', 
  'Tampa, FL', 'Cambridge, MA', 'Jersey City, NJ', 'Boca Raton, FL'
];

const TYPES = ['Residential', 'Move-out', 'Deep Clean', 'Airbnb', 'Office'];
const TEAMS = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'];
const STATUSES = ['Completed', 'In Progress', 'En Route'];

export const RealTimeDashboard: React.FC<RealTimeDashboardProps> = ({ lang, darkMode }) => {
  const t = TRANSLATIONS[lang] as any;
  
  // Random initialization on access
  const initialItems = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      team: TEAMS[i % TEAMS.length],
      loc: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      time: i === 0 ? 'Live' : `${Math.floor(Math.random() * 20) + 1}m ago`
    }));
  }, []);

  const [items, setItems] = useState(initialItems);

  // Dynamic shuffling to feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const copy = [...prev];
        const last = copy.pop()!;
        // Update the "time" of the one being rotated back in
        const updated = {
          ...last,
          status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
          time: 'Just now'
        };
        return [updated, ...copy];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-8 rounded-[3rem] border transition-all ${darkMode ? 'bg-slate-900 border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-xl'}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[var(--accent-color)]/10 rounded-xl text-[var(--accent-color)] animate-pulse">
            <Activity size={18} />
          </div>
          <div>
            <h5 className={`text-[11px] font-black uppercase tracking-[0.2em] ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.liveActivity}</h5>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t.liveMsg}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>
          Live
        </div>
      </div>

      <div className="space-y-4">
        {items.map((act, idx) => (
          <div 
            key={`${act.team}-${idx}`} 
            className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-700 transform ${idx === 0 ? 'scale-105 shadow-xl border-[var(--accent-color)]/20' : 'opacity-40 border-transparent'} ${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}
          >
            <div className="flex items-center gap-5">
              <div className={`p-2.5 rounded-xl ${act.status === 'Completed' ? 'bg-green-500/20 text-green-500' : act.status === 'In Progress' ? 'bg-[var(--accent-color)]/20 text-[var(--accent-color)]' : 'bg-amber-500/20 text-amber-500'}`}>
                {act.status === 'Completed' ? <CheckCircle size={16} /> : act.status === 'In Progress' ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
              </div>
              <div>
                <p className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-slate-900'}`}>{act.type}</p>
                <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold mt-1">
                  <MapPin size={10} className="text-[var(--accent-color)]" /> {act.loc}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-[9px] font-black uppercase tracking-widest ${idx === 0 ? 'text-[var(--accent-color)]' : 'text-slate-500'}`}>{act.time}</p>
              <p className="text-[8px] text-slate-500 font-black uppercase mt-1">Team {act.team}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
