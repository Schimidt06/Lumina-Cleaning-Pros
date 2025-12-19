
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, Phone, CheckCircle2, Star, Calendar as CalendarIcon, MessageSquare, ArrowRight, ArrowLeft,
  ShieldCheck, Clock, Leaf, DollarSign, Search, Award, MapPin, Globe, Sparkles,
  MessageCircle, Plus, Minus, ChevronDown, Moon, Sun, Heart, Instagram, Facebook, Twitter, Wand2,
  Waves, TreePine, ChefHat, Sofa, BedDouble, Bath, Ruler, CheckSquare, Home as HomeIcon, Layout
} from 'lucide-react';
import { SectionTitle } from './components/SectionTitle';
import { FloatingActions } from './components/FloatingActions';
import { InteractiveMap } from './components/InteractiveMap';
import { RealTimeDashboard } from './components/RealTimeDashboard';
import { RoomExplorer } from './components/RoomExplorer';
import { VibeParticles } from './components/VibeParticles';
import { NAV_LINKS, SERVICES, TESTIMONIALS, TRANSLATIONS, PROCESS_STEPS, STATS, VIBES, TEAM } from './constants';
import { Language } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentVibe, setCurrentVibe] = useState(VIBES[0]);
  
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

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

  const estimate = useMemo(() => {
    let base = 80;
    base += (houseConfig.bedrooms - houseConfig.suites) * 15;
    base += houseConfig.suites * 35;
    base += houseConfig.livingRooms * 20;
    base += houseConfig.kitchens * 30;
    base += (houseConfig.bathrooms - houseConfig.suites) * 20;
    if (houseConfig.hasPool) base += 45;
    if (houseConfig.hasGarden) base += 40;
    base += (houseConfig.sqft / 100) * 1.5;
    if (houseConfig.isDeepClean) base *= 1.6;
    return Math.round(base);
  }, [houseConfig]);

  const updateSuites = (newSuites: number) => {
    setHouseConfig(prev => {
      const suiteDiff = newSuites - prev.suites;
      return {
        ...prev,
        suites: newSuites,
        bedrooms: Math.max(newSuites, prev.bedrooms + (suiteDiff > 0 ? suiteDiff : 0)),
        bathrooms: Math.max(newSuites, prev.bathrooms + suiteDiff)
      };
    });
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', currentVibe.color);
  }, [currentVibe]);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observe = (ref: React.RefObject<HTMLElement | null>, setVisible: (v: boolean) => void) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      }, observerOptions);
      if (ref.current) observer.observe(ref.current);
      return () => { if (ref.current) observer.unobserve(ref.current); };
    };
    observe(aboutRef, setIsAboutVisible);
    observe(servicesRef, setIsServicesVisible);
    observe(contactRef, setIsContactVisible);
  }, []);

  const Counter = ({ label, value, onInc, onDec, icon: Icon, subLabel }: any) => {
    return (
      <div className={`p-5 rounded-[2rem] border transition-all group hover:border-accent/40 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent/10 rounded-xl text-accent group-hover:scale-110 transition-transform">
              <Icon size={18} />
            </div>
            <div>
              <span className={`font-black text-sm uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-800'}`}>{label}</span>
              {subLabel && <p className="text-[10px] opacity-60 uppercase font-black text-slate-500">{subLabel}</p>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-slate-200/50 dark:bg-black/40 p-2 rounded-2xl border border-black/5 dark:border-white/5">
          <button onClick={onDec} className="w-10 h-10 rounded-xl bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center transition-all shadow-md active:scale-90"><Minus size={14} strokeWidth={3} /></button>
          <span className={`text-2xl font-black w-10 text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</span>
          <button onClick={onInc} className="w-10 h-10 rounded-xl bg-accent text-white hover:brightness-110 flex items-center justify-center transition-all shadow-lg shadow-accent/20 active:scale-90"><Plus size={14} strokeWidth={3} /></button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-slate-950' : 'bg-white'} selection:bg-[var(--accent-color)] selection:text-white overflow-x-hidden`}>
      <VibeParticles color={currentVibe.color} type={currentVibe.particles} />
      
      <style>{`
        :root { --accent-color: #3b82f6; }
        .text-accent { color: var(--accent-color); }
        .bg-accent { background-color: var(--accent-color); }
        .border-accent { border-color: var(--accent-color); }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? (darkMode ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-3 shadow-xl') : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToId('home')}>
            <div className="p-2.5 rounded-xl bg-accent shadow-lg shadow-accent/20 group-hover:rotate-12 transition-all"><ShieldCheck className="text-white w-6 h-6" /></div>
            <span className={`text-2xl font-black tracking-tighter ${scrolled ? (darkMode ? 'text-white' : 'text-slate-900') : 'text-white'}`}>LUMINA<span className="text-accent">CLEAN</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${scrolled ? (darkMode ? 'bg-white/5 text-yellow-400' : 'bg-slate-100 text-slate-600') : 'bg-white/10 text-white backdrop-blur-md border border-white/20'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className={`flex items-center p-1 rounded-full border transition-all ${scrolled ? (darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50') : 'border-white/20 bg-white/10'}`}>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${lang === 'en' ? 'bg-accent text-white shadow-md' : 'text-slate-400'}`}>EN</button>
              <button onClick={() => setLang('pt')} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${lang === 'pt' ? 'bg-accent text-white shadow-md' : 'text-slate-400'}`}>PT</button>
            </div>
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollToId(link.href)} className={`font-bold text-sm uppercase tracking-widest hover:text-accent transition-all ${scrolled ? (darkMode ? 'text-slate-200' : 'text-slate-700') : 'text-white'}`}>{t[link.key]}</button>
            ))}
            <button onClick={() => scrollToId('contact')} className="px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest bg-accent text-white shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95">{t.getQuote}</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" alt="Home" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40"></div>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-white pt-40 pb-20">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="animate-fade-in lg:sticky lg:top-40">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full text-accent font-bold mb-8">
                <span className="text-sm uppercase tracking-widest">{t.heroBadge}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black leading-tight mb-8 tracking-tighter">
                {t.heroTitle.split(',')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">{t.heroTitle.split(',')[1]}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-xl font-medium leading-relaxed">{t.heroSub}</p>
              <div className="flex flex-wrap gap-4">
                {VIBES.map((v) => (
                  <button key={v.id} onClick={() => setCurrentVibe(v)} className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all transform hover:scale-105 active:scale-95 ${currentVibe.id === v.id ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                    <span className="text-xl">{v.icon}</span>
                    <span className={`font-black text-sm uppercase tracking-widest ${currentVibe.id === v.id ? 'text-accent' : 'text-slate-300'}`}>{t[v.key]}</span>
                  </button>
                ))}
              </div>
              <div className="mt-12 max-w-sm hidden xl:block">
                <RealTimeDashboard lang={lang} darkMode={true} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-8 md:p-12 rounded-[4rem] shadow-2xl animate-fade-in [animation-delay:200ms] border-t-white/30 relative">
               <div className="absolute top-10 right-10 bg-accent/20 border border-accent/30 text-accent px-4 py-2 rounded-full flex items-center gap-2">
                 <Layout size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Premium Configurator</span>
               </div>
               <h3 className="text-3xl font-black mb-2">{t.estimatorTitle}</h3>
               <p className="text-slate-300 mb-10 text-sm font-medium">{t.estimatorSub}</p>
               
               <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Counter label={t.bedrooms} value={houseConfig.bedrooms} icon={BedDouble} 
                      onInc={() => setHouseConfig(p => ({...p, bedrooms: p.bedrooms+1}))}
                      onDec={() => setHouseConfig(p => ({...p, bedrooms: Math.max(p.suites, p.bedrooms-1)}))} 
                    />
                    <Counter label={t.suites} value={houseConfig.suites} icon={Award} subLabel="Includes Bath"
                      onInc={() => updateSuites(houseConfig.suites+1)}
                      onDec={() => updateSuites(Math.max(0, houseConfig.suites-1))} 
                    />
                    <Counter label={t.bathrooms} value={houseConfig.bathrooms} icon={Bath} 
                      onInc={() => setHouseConfig(p => ({...p, bathrooms: p.bathrooms+1}))}
                      onDec={() => setHouseConfig(p => ({...p, bathrooms: Math.max(p.suites, p.bathrooms-1)}))} 
                    />
                    <Counter label={t.livingRooms} value={houseConfig.livingRooms} icon={Sofa} 
                      onInc={() => setHouseConfig(p => ({...p, livingRooms: p.livingRooms+1}))}
                      onDec={() => setHouseConfig(p => ({...p, livingRooms: Math.max(0, p.livingRooms-1)}))} 
                    />
                  </div>
                  <div className="pt-10 mt-6 border-t border-white/10">
                     <div className="flex justify-between items-end mb-10">
                       <div>
                         <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-2">{t.estTotal}</p>
                         <p className="text-8xl font-black text-white tracking-tighter"><span className="text-4xl align-top mr-1 opacity-50">$</span>{estimate}</p>
                       </div>
                     </div>
                     <button onClick={() => scrollToId('contact')} className="w-full bg-accent hover:brightness-110 text-white py-8 rounded-[2.5rem] font-black text-center text-3xl transition-all shadow-accent/30 transform hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-4">{t.bookNow} <ArrowRight size={28} /></button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Room Explorer */}
      <section className={`py-40 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8">
           <SectionTitle title={t.checklistTitle} subtitle={t.checklistSub} light={darkMode} />
           <div className="mt-16">
              <RoomExplorer lang={lang} darkMode={darkMode} />
           </div>
        </div>
      </section>

      {/* Meet the Pros */}
      <section className={`py-40 ${darkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-20 items-end mb-20">
             <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-4 bg-accent/10 border border-accent/20 px-6 py-3 rounded-full text-accent font-black mb-8">
                  <Star size={18} fill="currentColor" />
                  <span className="text-[10px] uppercase tracking-[0.3em]">Our Finest</span>
                </div>
                <h2 className={`text-6xl md:text-8xl font-black tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.meetTeam}</h2>
             </div>
             <div className="lg:col-span-4">
                <p className={`text-xl font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.teamSub}</p>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div key={member.id} className="group relative overflow-hidden rounded-[3rem] aspect-[3/4]">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-10 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-4">
                    <p className="text-accent text-[10px] font-black uppercase tracking-widest">{t[member.role] || member.role}</p>
                    <h4 className="text-3xl font-black text-white">{member.name}</h4>
                    <div className="pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                       <p className="text-white/60 text-sm italic mb-2">"{t[member.specialty] || member.specialty}"</p>
                       <p className="text-white/80 text-sm leading-relaxed">{t[member.bio] || member.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" ref={servicesRef} className={`py-32 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle title={t.servicesTitle} subtitle={t.servicesSub} light={darkMode} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {SERVICES.map((service, idx) => (
              <div key={service.id} className={`p-10 rounded-[3rem] border transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2 ${darkMode ? 'bg-slate-900 border-white/5 hover:bg-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white'}`}>
                <div className="bg-accent w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-accent/20">{service.icon}</div>
                <h3 className={`text-2xl font-black mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t[`service_${service.id}_title`]}</h3>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t[`service_${service.id}_desc`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className={`py-40 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-20 text-center lg:text-left">
            <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {t.contactGlow}
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 xl:gap-16 items-stretch">
            {/* Map Column */}
            <div className="lg:col-span-7 xl:col-span-8 flex">
              <InteractiveMap darkMode={darkMode} lang={lang} onBookNow={() => scrollToId('contact')} />
            </div>

            {/* Form Column */}
            <div className={`lg:col-span-5 xl:col-span-4 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border flex flex-col ${
              darkMode ? 'bg-slate-900 border-white/5 shadow-2xl' : 'bg-slate-50 border-slate-100 shadow-xl shadow-slate-200/50'
            }`}>
              <div className="mb-10">
                <h3 className={`text-2xl md:text-3xl font-black mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.contactTitle}</h3>
                <div className="w-12 h-1.5 bg-accent rounded-full"></div>
              </div>
              
              <form className="space-y-6 flex-1" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <input type="text" placeholder={t.contactName} className={`w-full px-6 py-5 rounded-2xl outline-none transition-all border-2 ${darkMode ? 'bg-slate-800 border-white/5 text-white focus:border-accent/50' : 'bg-white border-slate-100 text-slate-900 focus:border-accent/50'}`} />
                  <input type="tel" placeholder={t.contactPhone} className={`w-full px-6 py-5 rounded-2xl outline-none transition-all border-2 ${darkMode ? 'bg-slate-800 border-white/5 text-white focus:border-accent/50' : 'bg-white border-slate-100 text-slate-900 focus:border-accent/50'}`} />
                  <input type="email" placeholder={t.contactEmail} className={`w-full px-6 py-5 rounded-2xl outline-none transition-all border-2 ${darkMode ? 'bg-slate-800 border-white/5 text-white focus:border-accent/50' : 'bg-white border-slate-100 text-slate-900 focus:border-accent/50'}`} />
                  <textarea rows={4} placeholder={t.contactMsg} className={`w-full px-6 py-5 rounded-2xl outline-none transition-all border-2 resize-none ${darkMode ? 'bg-slate-800 border-white/5 text-white focus:border-accent/50' : 'bg-white border-slate-100 text-slate-900 focus:border-accent/50'}`}></textarea>
                </div>
                <button type="submit" className="w-full bg-accent text-white py-6 rounded-3xl text-xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 mt-4">
                  {t.contactSubmit} <ArrowRight size={24} />
                </button>
              </form>

              <div className="mt-12 pt-10 border-t border-slate-500/10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><Phone size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.callNow}</p>
                    <p className={`font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>+1 (000) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><MessageCircle size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.whatsApp}</p>
                    <p className={`font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>+1 (000) 000-0000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center gap-3 justify-center mb-10"><ShieldCheck className="text-accent w-10 h-10" /><span className="text-3xl font-black tracking-tighter">LUMINA<span className="text-accent">CLEAN</span></span></div>
          <p className="text-slate-500 text-sm">© 2025 Lumina Cleaning Pros. {t.copyright}</p>
        </div>
      </footer>
      <FloatingActions />
    </div>
  );
};

export default App;
