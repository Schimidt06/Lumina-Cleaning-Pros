
import React, { useState, useMemo } from 'react';
import { MapPin, Sparkles, Search, MessageCircle, AlertCircle, X, Info, ArrowRight } from 'lucide-react';
import { SERVICE_AREAS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface InteractiveMapProps {
  darkMode?: boolean;
  lang: Language;
  onBookNow?: () => void;
}

const STATE_ABBR: Record<string, string> = {
  'Florida': 'FL',
  'Massachusetts': 'MA',
  'New Jersey': 'NJ'
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ darkMode, lang, onBookNow }) => {
  const t = TRANSLATIONS[lang] as any;
  const [activeArea, setActiveArea] = useState<string>(SERVICE_AREAS[0].state);
  const [searchQuery, setSearchQuery] = useState('');

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

  const isSearching = searchQuery.trim().length > 0;
  const hasResults = filteredResults.length > 0;

  const matchedServicedState = useMemo(() => {
    if (hasResults || !isSearching) return null;
    const query = searchQuery.toUpperCase();
    
    return SERVICE_AREAS.find(area => {
      const stateName = area.state.toUpperCase();
      const abbr = STATE_ABBR[area.state]?.toUpperCase();
      return query.includes(stateName) || (abbr && query.includes(abbr)) || (abbr && query === abbr);
    });
  }, [searchQuery, hasResults, isSearching]);

  const currentSelectionName = useMemo(() => {
    if (matchedServicedState) return matchedServicedState.state;
    return activeArea;
  }, [matchedServicedState, activeArea]);

  // Sanitize name for key lookup (replace spaces with underscores)
  const selectionKey = `desc_${currentSelectionName.replace(/\s+/g, '_')}`;

  return (
    <div className={`rounded-[2.5rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl border transition-all duration-500 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-900 border-white/5'}`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10 -mr-32 -mt-32 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <MapPin className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-black tracking-tight">{t.mapTitle}</h4>
              <p className="text-slate-400 text-sm font-medium">{t.mapSub}</p>
            </div>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder={t.mapSearchPlaceholder} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 focus:ring-4 focus:ring-blue-600/20 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-500"
            />
            {isSearching && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 relative z-10">
        <div className="w-full md:w-1/2">
          {isSearching ? (
            <div className="space-y-4">
              <h5 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-6">
                {hasResults ? t.mapResults : t.mapNoResults}
              </h5>
              
              {hasResults ? (
                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredResults.map((result, i) => (
                    <button
                      key={`${result.city}-${i}`}
                      onClick={() => {
                        setActiveArea(result.state);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all group"
                    >
                      <div>
                        <p className="font-black text-white">{result.city}</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">{result.state}</p>
                      </div>
                      <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              ) : matchedServicedState ? (
                <div className="bg-blue-600/10 border border-blue-600/20 p-8 rounded-[2rem] text-center animate-fade-in">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Info className="text-blue-400 w-8 h-8" />
                  </div>
                  <h6 className="text-xl font-black text-white mb-2">{t.mapStateServiced} {matchedServicedState.state}!</h6>
                  <p className="text-slate-400 text-sm mb-6">{t.mapStateServicedMsg}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={onBookNow} 
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all"
                    >
                      {t.mapInquire} <MessageCircle size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-500/10 border border-orange-500/20 p-8 rounded-[2rem] text-center animate-fade-in">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="text-orange-400 w-8 h-8" />
                  </div>
                  <h6 className="text-xl font-black text-white mb-2">{t.mapNotServed}</h6>
                  <p className="text-slate-400 text-sm mb-6">{t.mapNotServedMsg}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={onBookNow} 
                      className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all"
                    >
                      {t.mapRequest} <MapPin size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6">{t.mapAvailableRegions}</h5>
              {SERVICE_AREAS.map((area) => (
                <button
                  key={area.state}
                  onClick={() => setActiveArea(area.state)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group flex justify-between items-center ${
                    activeArea === area.state
                      ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/5'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>
                    <p className={`font-black text-sm uppercase tracking-widest mb-1 ${
                      activeArea === area.state ? 'text-blue-400' : 'text-slate-400'
                    }`}>
                      {area.state}
                    </p>
                    <p className="text-slate-200 text-lg font-bold">
                      {area.cities.length} {t.mapPrimaryCities}
                    </p>
                  </div>
                  <div className={`transition-transform duration-300 ${activeArea === area.state ? 'rotate-90 text-blue-400' : 'text-slate-600'}`}>
                    <Sparkles size={20} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden flex-1 flex flex-col items-center justify-center min-h-[450px]">
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border border-blue-500/10 rounded-full animate-map-pulse"></div>
                <div className="w-48 h-48 border border-blue-500/20 rounded-full animate-map-pulse [animation-delay:500ms]"></div>
             </div>

             <div className="text-center relative z-10 w-full">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/40 transform hover:scale-110 transition-transform">
                  <MapPin className="text-white w-10 h-10" />
                </div>
                <p className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-2">{t.mapSelectedLocation}</p>
                <h5 className="text-4xl font-black mb-6 tracking-tighter">
                  {currentSelectionName}
                </h5>

                <div className="flex flex-wrap justify-center gap-3 max-w-sm mx-auto mb-8">
                   {(matchedServicedState || SERVICE_AREAS.find(a => a.state === activeArea))?.cities.map(city => (
                     <span 
                      key={city} 
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all duration-500 ${
                        isSearching && city.toLowerCase().includes(searchQuery.toLowerCase())
                        ? 'bg-blue-600 text-white border-blue-500 scale-110 shadow-lg shadow-blue-600/30'
                        : 'bg-white/10 text-blue-300 border-white/5'
                      }`}
                     >
                        {city}
                     </span>
                   ))}
                </div>

                {/* State specific description - BELOW CITIES */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 max-w-md mx-auto animate-fade-in">
                  <p className="text-slate-300 text-sm leading-relaxed italic opacity-90">
                    {t[selectionKey]}
                  </p>
                </div>

                <button 
                  onClick={onBookNow} 
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 transform hover:-translate-y-1"
                >
                  {t.bookNow} <ArrowRight size={18} />
                </button>

                <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span>{t.mapConfirmation1}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span>{t.mapConfirmation2}</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
