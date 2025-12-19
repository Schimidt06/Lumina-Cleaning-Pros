
import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Sparkles, Search, X, Info, ArrowRight, Loader2, ShieldCheck, CheckCircle2, Navigation, Zap } from 'lucide-react';
import { SERVICE_AREAS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface InteractiveMapProps {
  darkMode?: boolean;
  lang: Language;
  onBookNow?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ darkMode, lang, onBookNow }) => {
  const t = TRANSLATIONS[lang] as any;
  const [activeArea, setActiveArea] = useState<string>(SERVICE_AREAS[0].state);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsDebouncing(true);
      const timer = setTimeout(() => setIsDebouncing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const allCities = useMemo(() => {
    return SERVICE_AREAS.flatMap(area => 
      area.cities.map(city => ({ city, state: area.state }))
    );
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allCities.filter(item => 
      item.city.toLowerCase().includes(query) || 
      item.state.toLowerCase().includes(query)
    );
  }, [searchQuery, allCities]);

  const hasInput = searchQuery.trim().length > 0;
  const hasResults = filteredResults.length > 0;

  const currentAreaObj = useMemo(() => {
    if (hasResults) return SERVICE_AREAS.find(a => a.state === filteredResults[0].state);
    return SERVICE_AREAS.find(a => a.state === activeArea);
  }, [activeArea, filteredResults, hasResults]);

  const selectionKey = `desc_${currentAreaObj?.state.replace(/\s+/g, '_')}`;

  return (
    <div className={`relative w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border transition-all duration-500 flex flex-col ${
      darkMode ? 'bg-[#080c17] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'
    }`}>
      {/* HUD background grid effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: `radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)`, backgroundSize: '30px 30px' }}></div>

      {/* Control Header */}
      <div className={`relative z-10 p-6 md:p-10 border-b flex flex-col md:flex-row md:items-center justify-between gap-6 ${
        darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50/50 border-slate-100'
      }`}>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
             <div className="p-1.5 bg-blue-600 rounded-lg text-white">
               <Navigation size={12} strokeWidth={3} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">{t.mapTitle}</span>
          </div>
          <h4 className={`text-2xl md:text-3xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {t.mapSub}
          </h4>
        </div>

        <div className="relative w-full md:w-72">
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDebouncing ? 'text-blue-500' : 'text-slate-500'}`}>
            {isDebouncing ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          </div>
          <input 
            type="text" 
            placeholder={t.mapSearchPlaceholder} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-14 rounded-xl pl-12 pr-10 outline-none border-2 transition-all text-sm font-bold ${
              darkMode 
                ? 'bg-slate-900 border-white/5 text-white focus:border-blue-500/50' 
                : 'bg-white border-slate-100 text-slate-900 focus:border-blue-300'
            }`}
          />
          {hasInput && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X size={16} /></button>}
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 flex-1">
        {/* State Navigator Sidebar */}
        <div className={`lg:col-span-4 p-6 md:p-8 flex flex-col border-b lg:border-b-0 lg:border-r ${
          darkMode ? 'bg-black/10 border-white/5' : 'bg-slate-50/30 border-slate-100'
        }`}>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
            <Zap size={12} className="text-blue-500" /> {hasInput ? t.mapResults : t.mapAvailableRegions}
          </p>

          <div className="space-y-3 overflow-y-auto max-h-[350px] lg:max-h-none pr-1 custom-scrollbar">
            {hasInput && !isDebouncing ? (
              hasResults ? (
                filteredResults.map((result, i) => (
                  <button
                    key={`${result.city}-${i}`}
                    onClick={() => { setActiveArea(result.state); setSearchQuery(''); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between text-left group ${
                      darkMode ? 'bg-white/5 border-transparent hover:border-blue-500/30' : 'bg-white border-slate-50 hover:border-blue-100'
                    }`}
                  >
                    <div>
                      <p className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{result.city}</p>
                      <p className="text-[9px] text-blue-500 uppercase font-black tracking-widest">{result.state}</p>
                    </div>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))
              ) : (
                <div className="py-8 text-center opacity-40 text-xs font-bold">{t.mapNoResults}</div>
              )
            ) : (
              SERVICE_AREAS.map((area) => (
                <button
                  key={area.state}
                  onClick={() => setActiveArea(area.state)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${
                    activeArea === area.state && !hasInput
                    ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-600/30'
                    : darkMode ? 'bg-white/5 border-transparent hover:bg-white/10' : 'bg-white border-transparent hover:border-blue-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full transition-all ${activeArea === area.state ? 'bg-white shadow-[0_0_8px_white]' : 'bg-slate-700'}`}></div>
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${activeArea === area.state ? 'text-blue-100' : 'text-slate-500'}`}>{area.state}</p>
                      <p className={`text-lg font-black tracking-tight ${activeArea === area.state ? 'text-white' : darkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                        {area.cities.length} {t.mapPrimaryCities}
                      </p>
                    </div>
                  </div>
                  <Sparkles size={16} className={`transition-all ${activeArea === area.state ? 'opacity-100 scale-110' : 'opacity-0'}`} />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Detail Panel */}
        <div className={`lg:col-span-8 p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden ${
          darkMode ? 'bg-slate-900/50' : 'bg-slate-50/20'
        }`}>
          {/* Animated Background Focal Point */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
             <div className="w-[120%] aspect-square rounded-full border border-blue-500 animate-pulse"></div>
          </div>

          <div className="relative z-10 w-full max-w-xl space-y-10">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <MapPin size={32} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em] mb-2">{t.mapSelectedLocation}</p>
                <h5 className={`text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentAreaObj?.state}
                </h5>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {currentAreaObj?.cities.map((city) => (
                <span key={city} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                  hasInput && city.toLowerCase().includes(searchQuery.toLowerCase())
                  ? 'bg-blue-600 text-white border-blue-400 scale-105 shadow-lg'
                  : darkMode ? 'bg-white/5 border-white/5 text-blue-300/60' : 'bg-white border-slate-100 text-slate-500'
                }`}>
                  {city}
                </span>
              ))}
            </div>

            <div className={`p-6 rounded-[2rem] border-2 text-left flex gap-5 items-start ${
              darkMode ? 'bg-white/[0.03] border-white/5' : 'bg-white border-slate-100 shadow-md'
            }`}>
              <div className="p-2.5 bg-blue-600 text-white rounded-xl"><Info size={18} /></div>
              <p className={`text-sm md:text-base font-bold leading-relaxed italic ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                "{t[selectionKey] || t.mapStateServicedMsg}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <button onClick={onBookNow} className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                {t.bookNow} <ArrowRight size={18} />
              </button>
              
              <div className="flex items-center gap-4 px-5 py-3 rounded-2xl border-2 border-slate-500/10 dark:bg-white/5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-green-500" />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Vetted</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-blue-500" />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
