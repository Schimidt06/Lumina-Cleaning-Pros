
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Phone, CheckCircle2, Star, ArrowRight, ShieldCheck, MapPin, 
  Sparkles, MessageCircle, Plus, Minus, Moon, Sun, Award, Sofa, 
  BedDouble, Bath, Layout, Navigation, Zap, Info, Loader2, Waves, TreePine, Ruler, MessageSquare, Quote
} from 'lucide-react';
import { SectionTitle } from './components/SectionTitle.tsx';
import { FloatingActions } from './components/FloatingActions.tsx';
import { InteractiveMap } from './components/InteractiveMap.tsx';
import { RealTimeDashboard } from './components/RealTimeDashboard.tsx';
import { RoomExplorer } from './components/RoomExplorer.tsx';
import { VibeParticles } from './components/VibeParticles.tsx';
import { NAV_LINKS, SERVICES, TRANSLATIONS, VIBES, TEAM, TESTIMONIALS } from './constants.tsx';
import { Language } from './types.ts';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(true);
  const [currentVibe, setCurrentVibe] = useState(VIBES[0]);
  
  const [formMessage, setFormMessage] = useState('');
  
  const contactRef = useRef<HTMLElement>(null);

  const [houseConfig, setHouseConfig] = useState({
    bedrooms: 2,
    suites: 0,
    livingRooms: 1,
    kitchens: 1,
    bathrooms: 1,
    hasPool: false,
    hasGarden: false,
    sqft: 1500,
    isDeepClean: false
  });

  const t = useMemo(() => TRANSLATIONS[lang] as any, [lang]);

  // Estimate Calculation Logic
  const estimate = useMemo(() => {
    let base = 80;
    base += (houseConfig.bedrooms - houseConfig.suites) * 15;
    base += houseConfig.suites * 35;
    base += houseConfig.livingRooms * 20;
    base += (houseConfig.bathrooms - houseConfig.suites) * 20;
    base += (houseConfig.sqft / 100) * 2;
    if (houseConfig.hasPool) base += 45;
    if (houseConfig.hasGarden) base += 40;
    if (houseConfig.isDeepClean) base *= 1.6;
    return Math.round(base);
  }, [houseConfig]);

  // SMART LOGIC: Increase Suites increases Bedrooms and Bathrooms automatically
  const updateSuites = (newSuites: number) => {
    setHouseConfig(prev => {
      const suiteDiff = newSuites - prev.suites;
      return {
        ...prev,
        suites: newSuites,
        bedrooms: Math.max(newSuites, prev.bedrooms + (suiteDiff > 0 ? suiteDiff : 0)),
        bathrooms: Math.max(newSuites, prev.bathrooms + (suiteDiff > 0 ? suiteDiff : 0))
      };
    });
  };

  // Pre-fill form from calculator with high detail
  const handleCalculatorBooking = () => {
    const detailMsg = lang === 'en' 
      ? `Estimated Service Price: $${estimate}. Config: ${houseConfig.bedrooms} Bedrooms (${houseConfig.suites} Suites), ${houseConfig.bathrooms} Bathrooms, ${houseConfig.sqft} sqft. Extras: Pool(${houseConfig.hasPool ? 'Yes' : 'No'}), Garden(${houseConfig.hasGarden ? 'Yes' : 'No'}). Preferred Scent: ${t[currentVibe.key]}.`
      : `Preço Estimado: $${estimate}. Config: ${houseConfig.bedrooms} Quartos (${houseConfig.suites} Suítes), ${houseConfig.bathrooms} Banheiros, ${houseConfig.sqft} sqft. Extras: Piscina(${houseConfig.hasPool ? 'Sim' : 'Não'}), Jardim(${houseConfig.hasGarden ? 'Sim' : 'Não'}). Essência Escolhida: ${t[currentVibe.key]}.`;
    
    setFormMessage(detailMsg);
    scrollToId('contact');
  };

  // Pre-fill form from specific service card
  const handleServiceSelect = (serviceId: string) => {
    const serviceTitle = t[`service_${serviceId}_title`];
    const detailMsg = lang === 'en'
      ? `I am interested in ${serviceTitle}. Please reach out with availability for a ${t[currentVibe.key]} session.`
      : `Estou interessado no serviço: ${serviceTitle}. Por favor, entre em contato para agendar uma sessão com aroma de ${t[currentVibe.key]}.`;
    
    setFormMessage(detailMsg);
    scrollToId('contact');
  };

  // Vibe Color Sync
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', currentVibe.color);
  }, [currentVibe]);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Counter = ({ label, value, onInc, onDec, icon: Icon, subLabel }: any) => (
    <div className={`p-5 rounded-[2rem] border transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl text-[var(--accent-color)] bg-[var(--accent-color)]/10"><Icon size={18} /></div>
        <div>
          <span className={`font-black text-[10px] uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-800'}`}>{label}</span>
          {subLabel && <p className="text-[9px] opacity-60 uppercase font-black">{subLabel}</p>}
        </div>
      </div>
      <div className={`flex items-center justify-between p-2 rounded-2xl ${darkMode ? 'bg-black/40' : 'bg-slate-200/50'}`}>
        <button onClick={onDec} className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700">-</button>
        <span className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</span>
        <button onClick={onInc} className="w-10 h-10 rounded-xl bg-[var(--accent-color)] text-white flex items-center justify-center hover:brightness-110 shadow-lg shadow-[var(--accent-color)]/20">+</button>
      </div>
    </div>
  );

  const heroParts = t.heroTitle ? t.heroTitle.split(',') : ['', ''];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'} transition-colors duration-500 overflow-x-hidden selection:bg-[var(--accent-color)] selection:text-white`}>
      <VibeParticles color={currentVibe.color} type={currentVibe.particles} />
      
      <style>{`
        :root { --accent-color: #3b82f6; }
        .text-accent { color: var(--accent-color); }
        .bg-accent { background-color: var(--accent-color); }
        .border-accent { border-color: var(--accent-color); }
        .desktop-container { max-width: 1400px; margin: 0 auto; }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/90 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="desktop-container px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToId('home')}>
            <div className="p-2 rounded-lg bg-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/30"><ShieldCheck className="text-white w-5 h-5" /></div>
            <span className="text-xl font-black tracking-tighter">LUMINA<span className="text-[var(--accent-color)]">CLEAN</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button key={link.href} onClick={() => scrollToId(link.href)} className="text-[10px] font-black uppercase tracking-widest hover:text-[var(--accent-color)] transition-colors">{t[link.key]}</button>
            ))}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <div className="flex bg-white/5 p-1 rounded-full border border-white/10 ml-4">
              <button onClick={() => setLang('en')} className={`px-4 py-1.5 rounded-full text-[9px] font-black transition-all ${lang === 'en' ? 'bg-[var(--accent-color)] text-white' : 'text-slate-400'}`}>EN</button>
              <button onClick={() => setLang('pt')} className={`px-4 py-1.5 rounded-full text-[9px] font-black transition-all ${lang === 'pt' ? 'bg-[var(--accent-color)] text-white' : 'text-slate-400'}`}>PT</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000" className="w-full h-full object-cover opacity-20" alt="bg"/>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950"></div>
        </div>
        
        <div className="desktop-container px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="inline-block px-5 py-2 bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 rounded-full text-[var(--accent-color)] text-[11px] font-black uppercase tracking-[0.3em] animate-fade-in">
              {t.heroBadge}
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] animate-fade-in">
              {heroParts[0]}<br/>
              <span className="text-[var(--accent-color)]">{heroParts[1]}</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg font-medium leading-relaxed opacity-80">{t.heroSub}</p>
            
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">{t.vibeTitle}</p>
              <div className="flex flex-wrap gap-4">
                {VIBES.map(v => (
                  <button 
                    key={v.id} 
                    onClick={() => setCurrentVibe(v)} 
                    className={`flex items-center gap-5 px-8 py-5 rounded-[2rem] border-2 transition-all transform hover:scale-105 active:scale-95 ${currentVibe.id === v.id ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 shadow-2xl shadow-[var(--accent-color)]/20' : 'border-white/5 bg-white/5'}`}
                  >
                    <span className="text-3xl">{v.icon}</span>
                    <span className={`text-xs font-black uppercase tracking-widest ${currentVibe.id === v.id ? 'text-[var(--accent-color)]' : 'text-slate-400'}`}>{t[v.key]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-md">
              <RealTimeDashboard lang={lang} darkMode={darkMode} />
            </div>
          </div>

          {/* Quote Estimator Card */}
          <div className={`p-12 md:p-16 rounded-[4.5rem] border transition-all duration-700 shadow-2xl relative group ${darkMode ? 'bg-slate-900/40 border-white/5 backdrop-blur-3xl' : 'bg-white border-slate-100'}`}>
            <div className="absolute -top-8 -right-8 p-8 bg-[var(--accent-color)] text-white rounded-[2.5rem] shadow-2xl rotate-12 flex flex-col items-center group-hover:rotate-0 transition-transform duration-500">
               <Zap size={28} fill="white" />
               <span className="text-[9px] font-black uppercase mt-1 tracking-widest">Premium</span>
            </div>
            
            <h3 className="text-4xl font-black mb-3">{t.estimatorTitle}</h3>
            <p className="text-slate-400 mb-12 text-base font-medium opacity-70">{t.estimatorSub}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Counter label={t.suites} value={houseConfig.suites} icon={Award} subLabel="+Bed & Bath" onInc={() => updateSuites(houseConfig.suites+1)} onDec={() => updateSuites(Math.max(0, houseConfig.suites-1))} />
              <Counter label={t.bedrooms} value={houseConfig.bedrooms} icon={BedDouble} onInc={() => setHouseConfig(p=>({...p, bedrooms:p.bedrooms+1}))} onDec={() => setHouseConfig(p=>({...p, bedrooms:Math.max(p.suites, p.bedrooms-1)}))} />
              <Counter label={t.bathrooms} value={houseConfig.bathrooms} icon={Bath} onInc={() => setHouseConfig(p=>({...p, bathrooms:p.bathrooms+1}))} onDec={() => setHouseConfig(p=>({...p, bathrooms:Math.max(p.suites, p.bathrooms-1)}))} />
              <Counter label={t.livingRooms} value={houseConfig.livingRooms} icon={Sofa} onInc={() => setHouseConfig(p=>({...p, livingRooms:p.livingRooms+1}))} onDec={() => setHouseConfig(p=>({...p, livingRooms:Math.max(0, p.livingRooms-1)}))} />
            </div>

            <div className="mt-10 space-y-8">
              <div className={`p-8 rounded-[2.5rem] border-2 transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                <div className="flex items-center justify-between mb-5">
                   <div className="flex items-center gap-3 text-slate-400">
                     <Ruler size={16} />
                     <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t.sqft}</span>
                   </div>
                   <span className="text-xl font-black text-[var(--accent-color)]">{houseConfig.sqft} sq ft</span>
                </div>
                <input 
                  type="range" min="400" max="8000" step="100" value={houseConfig.sqft} 
                  onChange={(e) => setHouseConfig(p=>({...p, sqft: parseInt(e.target.value)}))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button onClick={() => setHouseConfig(p=>({...p, hasPool: !p.hasPool}))} className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] ${houseConfig.hasPool ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 text-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/10' : 'border-white/5 bg-white/5 text-slate-500'}`}>
                  <Waves size={22} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{t.pool}</span>
                </button>
                <button onClick={() => setHouseConfig(p=>({...p, hasGarden: !p.hasGarden}))} className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] ${houseConfig.hasGarden ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 text-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/10' : 'border-white/5 bg-white/5 text-slate-500'}`}>
                  <TreePine size={22} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{t.garden}</span>
                </button>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 mt-12">
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-3">{t.estTotal}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-8xl md:text-9xl font-black tracking-tighter text-[var(--accent-color)]">${estimate}</span>
                <span className="text-lg font-bold text-slate-500 mb-6">/service</span>
              </div>
              <button onClick={handleCalculatorBooking} className="w-full bg-[var(--accent-color)] py-8 rounded-[2.5rem] font-black text-2xl mt-10 hover:brightness-110 transition-all shadow-2xl shadow-[var(--accent-color)]/30 flex items-center justify-center gap-5 text-white transform hover:-translate-y-2 active:translate-y-0">
                {t.bookNow} <ArrowRight size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-48">
        <div className="desktop-container px-6">
          <SectionTitle title={t.servicesTitle} subtitle={t.servicesSub} light={darkMode} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
            {SERVICES.map(s => (
              <button 
                key={s.id} 
                onClick={() => handleServiceSelect(s.id)}
                className="text-left p-14 rounded-[4rem] bg-white/5 border border-white/5 hover:border-[var(--accent-color)]/40 transition-all duration-500 group relative overflow-hidden flex flex-col items-start hover:-translate-y-2 shadow-2xl hover:shadow-[var(--accent-color)]/10"
              >
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-[var(--accent-color)]/5 rounded-full blur-3xl group-hover:bg-[var(--accent-color)]/10 transition-all"></div>
                <div className="w-20 h-20 rounded-[2rem] bg-[var(--accent-color)] flex items-center justify-center text-white mb-10 shadow-2xl shadow-[var(--accent-color)]/20 transform group-hover:rotate-12 transition-transform">
                  {s.icon}
                </div>
                <h4 className="text-3xl font-black mb-6 group-hover:text-[var(--accent-color)] transition-colors">{t[`service_${s.id}_title`]}</h4>
                <p className="text-xl text-slate-400 leading-relaxed font-medium mb-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  {t[`service_${s.id}_desc`]}
                </p>
                <span className="mt-auto inline-flex items-center gap-3 text-[var(--accent-color)] font-black text-sm uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                  {t.bookNow} <ArrowRight size={18} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Artisans */}
      <section id="about" className={`py-48 ${darkMode ? 'bg-slate-900/20' : 'bg-slate-50'}`}>
        <div className="desktop-container px-6">
          <SectionTitle title={t.meetTeam} subtitle={t.teamSub} light={darkMode} />
          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {TEAM.map((member) => (
              <div key={member.id} className="group relative overflow-hidden rounded-[4.5rem] aspect-[3/4.2] border border-white/5 bg-slate-900 shadow-2xl">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-14 translate-y-28 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="space-y-6">
                    <p className="text-[var(--accent-color)] text-[11px] font-black uppercase tracking-[0.5em]">{t[member.role]}</p>
                    <h4 className="text-5xl font-black text-white leading-none">{member.name}</h4>
                    <div className="pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                       <p className="text-white/60 text-lg italic mb-6 font-bold">"{t[member.specialty]}"</p>
                       <p className="text-white/80 text-lg leading-relaxed font-medium">{t[member.bio]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews with Company Response */}
      <section id="reviews" className="py-48">
        <div className="desktop-container px-6">
          <SectionTitle title={t.reviewsTitle} subtitle={t.reviewsSub} light={darkMode} />
          <div className="grid lg:grid-cols-3 gap-12 mt-20">
            {TESTIMONIALS.map((review) => (
              <div key={review.id} className="flex flex-col gap-8 group">
                <div className={`p-12 rounded-[4rem] relative transform group-hover:-rotate-1 transition-all duration-500 ${darkMode ? 'bg-white/5 border border-white/5' : 'bg-white border border-slate-100 shadow-xl'}`}>
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(review.stars)].map((_, i) => <Star key={i} size={20} fill="var(--accent-color)" className="text-[var(--accent-color)]" />)}
                  </div>
                  <Quote size={60} className="absolute top-12 right-12 opacity-5 text-[var(--accent-color)]" />
                  <p className="text-2xl font-black leading-snug mb-10 tracking-tight">"{review.text}"</p>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--accent-color)]/20 flex items-center justify-center font-black text-[var(--accent-color)] text-xl">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-lg">{review.name}</p>
                      <p className="text-[11px] uppercase font-black tracking-widest text-slate-500">{review.location}</p>
                    </div>
                  </div>
                </div>
                <div className={`ml-12 p-8 rounded-[2rem] border-l-4 border-[var(--accent-color)] flex gap-5 items-start animate-fade-in ${darkMode ? 'bg-[var(--accent-color)]/5' : 'bg-slate-50'}`}>
                  <MessageSquare size={20} className="text-[var(--accent-color)] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-color)] mb-2">{t.repliedBy}</p>
                    <p className="text-base font-medium italic opacity-80 leading-relaxed text-slate-400">"{review.reply}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Contact Form & Area Search */}
      <section id="contact" ref={contactRef} className="py-48">
        <div className="desktop-container px-6">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-24 text-center lg:text-left leading-[0.8]">
            {t.contactGlow}
          </h2>
          <div className="grid lg:grid-cols-12 gap-16 items-stretch">
            <div className="lg:col-span-8 flex">
              <InteractiveMap darkMode={darkMode} lang={lang} onBookNow={() => scrollToId('contact')} />
            </div>
            <div className={`lg:col-span-4 p-14 rounded-[4.5rem] border flex flex-col shadow-2xl relative ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className="text-4xl font-black mb-10">{t.contactTitle}</h3>
              <form className="space-y-8 flex-1" onSubmit={e=>e.preventDefault()}>
                <input type="text" placeholder={t.contactName} className={`w-full p-7 rounded-[1.5rem] outline-none transition-all border-2 text-lg font-medium ${darkMode ? 'bg-white/5 border-transparent focus:border-[var(--accent-color)] text-white' : 'bg-white border-slate-100 focus:border-[var(--accent-color)]'}`} />
                <input type="email" placeholder={t.contactEmail} className={`w-full p-7 rounded-[1.5rem] outline-none transition-all border-2 text-lg font-medium ${darkMode ? 'bg-white/5 border-transparent focus:border-[var(--accent-color)] text-white' : 'bg-white border-slate-100 focus:border-[var(--accent-color)]'}`} />
                <textarea 
                  rows={6} 
                  placeholder={t.contactMsg} 
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className={`w-full p-7 rounded-[1.5rem] outline-none transition-all border-2 resize-none text-lg font-medium ${darkMode ? 'bg-white/5 border-transparent focus:border-[var(--accent-color)] text-white' : 'bg-white border-slate-100 focus:border-[var(--accent-color)]'}`}
                ></textarea>
                <button className="w-full bg-[var(--accent-color)] py-8 rounded-[2rem] font-black text-xl uppercase tracking-[0.2em] mt-8 hover:brightness-110 transition-all shadow-2xl shadow-[var(--accent-color)]/30 text-white transform hover:-translate-y-1 active:translate-y-0">
                  {t.contactSubmit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Footer for PC */}
      <footer className="py-32 bg-slate-950 border-t border-white/5">
        <div className="desktop-container px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-[var(--accent-color)] shadow-2xl shadow-[var(--accent-color)]/20"><ShieldCheck className="text-white w-8 h-8" /></div>
              <span className="text-4xl font-black tracking-tighter text-white">LUMINA<span className="text-[var(--accent-color)]">CLEAN</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-12">
               {NAV_LINKS.map(l => (
                 <button key={l.href} onClick={() => scrollToId(l.href)} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">{t[l.key]}</button>
               ))}
            </div>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">© 2025 Lumina Cleaning Pros. {t.copyright}</p>
          </div>
        </div>
      </footer>
      
      <FloatingActions />
    </div>
  );
};

export default App;
