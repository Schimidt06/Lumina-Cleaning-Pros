
import React, { useState, useEffect } from 'react';
import { Activity, Clock, CheckCircle, MapPin, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface RealTimeDashboardProps {
  lang: Language;
  darkMode: boolean;
}

const ACTIVITIES = [
  { team: 'Alpha', loc: 'Miami, FL', type: 'Residential', status: 'Completed', time: '2m ago' },
  { team: 'Bravo', loc: 'Boston, MA', type: 'Move-out', status: 'In Progress', time: 'Live' },
  { team: 'Charlie', loc: 'Newark, NJ', type: 'Deep Clean', status: 'En Route', time: 'Just now' },
  { team: 'Delta', loc: 'Orlando, FL', type: 'Airbnb', status: 'Completed', time: '15m ago' },
];

export const RealTimeDashboard: React.FC<RealTimeDashboardProps> = ({ lang, darkMode }) => {
  const t = TRANSLATIONS[lang] as any;
  const [items, setItems] = useState(ACTIVITIES);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const copy = [...prev];
        const last = copy.pop()!;
        return [last, ...copy];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-8 rounded-[3rem] border transition-all ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100 shadow-xl'}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500 animate-pulse">
            <Activity size={20} />
          </div>
          <div>
            <h5 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.liveActivity}</h5>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{t.liveMsg}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>
          Live
        </div>
      </div>

      <div className="space-y-4">
        {items.map((act, idx) => (
          <div 
            key={`${act.team}-${idx}`} 
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-700 transform ${idx === 0 ? 'scale-105 shadow-lg border-blue-500/30' : 'opacity-60 border-transparent'} ${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${act.status === 'Completed' ? 'bg-green-500/20 text-green-500' : act.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' : 'bg-slate-500/20 text-slate-500'}`}>
                {act.status === 'Completed' ? <CheckCircle size={14} /> : act.status === 'In Progress' ? <Loader2 size={14} className="animate-spin" /> : <Clock size={14} />}
              </div>
              <div>
                <p className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>{act.type}</p>
                <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold">
                  <MapPin size={10} /> {act.loc}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-[9px] font-black uppercase tracking-widest ${idx === 0 ? 'text-blue-500' : 'text-slate-400'}`}>{act.time}</p>
              <p className="text-[8px] text-slate-500 font-bold">Team {act.team}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
