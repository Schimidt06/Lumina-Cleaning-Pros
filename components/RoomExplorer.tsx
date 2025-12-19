
import React, { useState } from 'react';
import { ChefHat, Bath, BedDouble, CheckCircle2, ChevronRight, Info, Sparkles } from 'lucide-react';
import { CHECKLIST_ROOMS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface RoomExplorerProps {
  lang: Language;
  darkMode: boolean;
}

const ICONS = {
  kitchen: ChefHat,
  bathroom: Bath,
  bedroom: BedDouble
};

export const RoomExplorer: React.FC<RoomExplorerProps> = ({ lang, darkMode }) => {
  const t = TRANSLATIONS[lang] as any;
  const [activeRoom, setActiveRoom] = useState(CHECKLIST_ROOMS[0].id);

  const room = CHECKLIST_ROOMS.find(r => r.id === activeRoom)!;
  const Icon = ICONS[room.id as keyof typeof ICONS];

  return (
    <div className={`rounded-[3.5rem] p-6 md:p-10 border transition-all ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">{t.exploreChecklist}</p>
          {CHECKLIST_ROOMS.map(r => {
            const RIcon = ICONS[r.id as keyof typeof ICONS];
            return (
              <button
                key={r.id}
                onClick={() => setActiveRoom(r.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all group ${
                  activeRoom === r.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                  : `hover:bg-blue-600/10 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`
                }`}
              >
                <div className="flex items-center gap-4">
                  <RIcon size={20} className={activeRoom === r.id ? 'text-white' : 'text-blue-500'} />
                  <span className="text-sm font-black uppercase tracking-widest">{t[r.nameKey]}</span>
                </div>
                <ChevronRight size={16} className={`transition-transform ${activeRoom === r.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-8">
          <div className={`h-full rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between ${darkMode ? 'bg-black/20' : 'bg-white shadow-inner border border-slate-100'}`}>
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <Icon size={120} />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-blue-500">
                <Info size={16} />
                <p className="text-[10px] font-black uppercase tracking-widest">{t.roomProtocol}</p>
              </div>
              
              <div className="grid md:grid-cols-1 gap-4">
                {room.items.map((itemKey, i) => (
                  <div key={i} className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="p-1.5 bg-green-500/20 rounded-full text-green-500">
                      <CheckCircle2 size={12} strokeWidth={3} />
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t[itemKey] || itemKey}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                <Sparkles size={18} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 max-w-[200px]">
                {t.scrutinizedMsg}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
