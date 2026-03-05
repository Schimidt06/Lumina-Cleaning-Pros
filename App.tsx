
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Phone, CheckCircle2, Star, ArrowRight, ShieldCheck, MapPin,
  Sparkles, MessageCircle, Plus, Minus, Moon, Sun, Award, Sofa,
  BedDouble, Bath, Layout, Navigation, Zap, Info, Loader2, Waves, TreePine, Ruler, MessageSquare, Quote,
  ClipboardList, Calculator, CalendarCheck, PartyPopper, ChevronDown, HelpCircle, Send, Check, X
} from 'lucide-react';
import { SectionTitle } from './components/SectionTitle.tsx';
import { FloatingActions } from './components/FloatingActions.tsx';
import { InteractiveMap } from './components/InteractiveMap.tsx';
import { RealTimeDashboard } from './components/RealTimeDashboard.tsx';
import { RoomExplorer } from './components/RoomExplorer.tsx';
import { VibeParticles } from './components/VibeParticles.tsx';
import { MiniCalendar } from './components/MiniCalendar.tsx';
import { NAV_LINKS, SERVICES, TRANSLATIONS, VIBES, TEAM, TESTIMONIALS, HOW_IT_WORKS_STEPS, FAQ_ITEMS, PARTNERS } from './constants.tsx';
import { Language } from './types.ts';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(true);
  const [currentVibe, setCurrentVibe] = useState(VIBES[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const [formMessage, setFormMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [displayEstimate, setDisplayEstimate] = useState(0);

  const contactRef = useRef<HTMLElement>(null);

  const [houseConfig, setHouseConfig] = useState<any>({
    bedrooms: 0,
    suites: 0,
    livingRooms: 0,
    kitchens: 0,
    bathrooms: 0,
    hasPool: false,
    hasGarden: false,
    sqft: 0,
    isDeepClean: false,
    extras: {}
  });

  const t = useMemo(() => TRANSLATIONS[lang] as any, [lang]);

  // Estimate Calculation Logic
  const estimate = useMemo(() => {
    const hasAnyRoom = houseConfig.bedrooms > 0 || houseConfig.suites > 0 || houseConfig.livingRooms > 0 || houseConfig.bathrooms > 0 || houseConfig.sqft > 0;
    if (!hasAnyRoom && !houseConfig.hasPool && !houseConfig.hasGarden) return 0;
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

  // Animated Price Counter
  useEffect(() => {
    const diff = estimate - displayEstimate;
    if (diff === 0) return;
    const step = diff > 0 ? Math.max(1, Math.ceil(diff / 15)) : Math.min(-1, Math.floor(diff / 15));
    const timer = setTimeout(() => setDisplayEstimate(prev => prev + step), 20);
    return () => clearTimeout(timer);
  }, [estimate, displayEstimate]);

  // Scroll Reveal Animation — supports all scroll-reveal variants
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // WhatsApp Pre-filled Message
  const whatsappMessage = useMemo(() => {
    const extrasStr = Object.entries(houseConfig.extras || {})
      .filter(([_, active]) => active)
      .map(([id]) => t[`extra_${id}`] || id)
      .join(', ');

    return lang === 'en'
      ? `Hello! I'd like to book a cleaning. 
My estimate: $${estimate}
Details:
- Bedrooms: ${houseConfig.bedrooms} (${houseConfig.suites} Suites)
- Bathrooms: ${houseConfig.bathrooms}
- Living Rooms: ${houseConfig.livingRooms}
- Square Feet: ${houseConfig.sqft}
- Features: ${houseConfig.hasPool ? 'Pool, ' : ''}${houseConfig.hasGarden ? 'Garden' : ''}
${extrasStr ? `- Extras: ${extrasStr}` : ''}`
      : `Olá! Gostaria de agendar uma limpeza.
Meu orçamento: $${estimate}
Detalhes:
- Quartos: ${houseConfig.bedrooms} (${houseConfig.suites} Suítes)
- Banheiros: ${houseConfig.bathrooms}
- Salas: ${houseConfig.livingRooms}
- Área: ${houseConfig.sqft} sqft
- Adicionais: ${houseConfig.hasPool ? 'Piscina, ' : ''}${houseConfig.hasGarden ? 'Jardim' : ''}
${extrasStr ? `- Extras: ${extrasStr}` : ''}`;
  }, [houseConfig, estimate, lang, t]);

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setFormMessage('');
    setSelectedDate(null);
    setTimeout(() => setShowToast(false), 4000);
  };

  const STEP_ICONS = [ClipboardList, Calculator, CalendarCheck, PartyPopper];

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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/90 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-4 sm:py-6'}`}>
        <div className="desktop-container px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToId('home')}>
            <div className="p-2 rounded-lg bg-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/30"><ShieldCheck className="text-white w-5 h-5" /></div>
            <span className="text-xl font-black tracking-tighter">LUMINA<span className="text-[var(--accent-color)]">CLEAN</span></span>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-1.5 p-2 z-[60]" aria-label="Menu">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          {/* Desktop nav */}
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
        {/* Mobile menu drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`px-6 pb-6 pt-4 flex flex-col gap-4 ${scrolled || menuOpen ? 'bg-slate-900/95 backdrop-blur-xl' : 'bg-slate-950/95 backdrop-blur-xl'}`}>
            {NAV_LINKS.map(link => (
              <button key={link.href} onClick={() => { scrollToId(link.href); setMenuOpen(false); }} className="text-sm font-black uppercase tracking-widest hover:text-[var(--accent-color)] transition-colors text-left py-2 border-b border-white/5">{t[link.key]}</button>
            ))}
            <div className="flex items-center justify-between pt-2">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
              <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                <button onClick={() => setLang('en')} className={`px-4 py-1.5 rounded-full text-[9px] font-black transition-all ${lang === 'en' ? 'bg-[var(--accent-color)] text-white' : 'text-slate-400'}`}>EN</button>
                <button onClick={() => setLang('pt')} className={`px-4 py-1.5 rounded-full text-[9px] font-black transition-all ${lang === 'pt' ? 'bg-[var(--accent-color)] text-white' : 'text-slate-400'}`}>PT</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000" className="w-full h-full object-cover opacity-20" alt="bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="desktop-container px-4 sm:px-6 grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          <div className="space-y-8 sm:space-y-12">
            <div className="inline-block px-4 sm:px-5 py-2 bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 rounded-full text-[var(--accent-color)] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] animate-fade-in-down stagger-1">
              {t.heroBadge}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] animate-fade-in-up stagger-2">
              {heroParts[0]}<br />
              <span className="text-[var(--accent-color)]">{heroParts[1]}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-lg font-medium leading-relaxed opacity-80 animate-fade-in-up stagger-3">{t.heroSub}</p>

            <div className="space-y-4 sm:space-y-6 animate-fade-in-up stagger-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-500">{t.vibeTitle}</p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4">
                {VIBES.map((v, vi) => (
                  <button
                    key={v.id}
                    onClick={() => setCurrentVibe(v)}
                    className={`flex items-center gap-2 sm:gap-5 px-3 sm:px-6 md:px-8 py-3 sm:py-5 rounded-xl sm:rounded-[2rem] border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 ${currentVibe.id === v.id ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 shadow-2xl shadow-[var(--accent-color)]/20' : 'border-white/5 bg-white/5'}`}
                    style={{ animationDelay: `${0.4 + vi * 0.08}s` }}
                  >
                    <span className="text-xl sm:text-3xl">{v.icon}</span>
                    <span className={`text-[9px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest ${currentVibe.id === v.id ? 'text-[var(--accent-color)]' : 'text-slate-400'}`}>{t[v.key]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-md animate-fade-in-up stagger-5">
              <RealTimeDashboard lang={lang} darkMode={darkMode} />
            </div>
          </div>

          {/* Quote Estimator Card */}
          <div className={`p-6 sm:p-8 md:p-12 lg:p-16 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4.5rem] border transition-all duration-700 shadow-2xl relative group animate-scale-in stagger-3 ${darkMode ? 'bg-slate-900/40 border-white/5 backdrop-blur-3xl' : 'bg-white border-slate-100'}`}>
            <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 p-4 sm:p-6 md:p-8 bg-[var(--accent-color)] text-white rounded-xl sm:rounded-[2rem] md:rounded-[2.5rem] shadow-2xl rotate-12 flex flex-col items-center group-hover:rotate-0 transition-transform duration-500 animate-float">
              <Zap size={20} className="sm:w-7 sm:h-7" fill="white" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase mt-1 tracking-widest">Premium</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3">{t.estimatorTitle}</h3>
            <p className="text-slate-400 mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base font-medium opacity-70">{t.estimatorSub}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <Counter label={t.suites} value={houseConfig.suites} icon={Award} subLabel="+Bed & Bath" onInc={() => updateSuites(houseConfig.suites + 1)} onDec={() => updateSuites(Math.max(0, houseConfig.suites - 1))} />
              <Counter label={t.bedrooms} value={houseConfig.bedrooms} icon={BedDouble} onInc={() => setHouseConfig(p => ({ ...p, bedrooms: p.bedrooms + 1 }))} onDec={() => setHouseConfig(p => ({ ...p, bedrooms: Math.max(p.suites, p.bedrooms - 1) }))} />
              <Counter label={t.bathrooms} value={houseConfig.bathrooms} icon={Bath} onInc={() => setHouseConfig(p => ({ ...p, bathrooms: p.bathrooms + 1 }))} onDec={() => setHouseConfig(p => ({ ...p, bathrooms: Math.max(p.suites, p.bathrooms - 1) }))} />
              <Counter label={t.livingRooms} value={houseConfig.livingRooms} icon={Sofa} onInc={() => setHouseConfig(p => ({ ...p, livingRooms: p.livingRooms + 1 }))} onDec={() => setHouseConfig(p => ({ ...p, livingRooms: Math.max(0, p.livingRooms - 1) }))} />
            </div>

            <div className="mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6 md:space-y-8">
              <div className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                <div className="flex items-center justify-between mb-3 sm:mb-5">
                  <div className="flex items-center gap-2 sm:gap-3 text-slate-400">
                    <Ruler size={16} />
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">{t.sqft}</span>
                  </div>
                  <span className="text-base sm:text-lg md:text-xl font-black text-[var(--accent-color)]">{houseConfig.sqft} sq ft</span>
                </div>
                <input
                  type="range" min="0" max="8000" step="100" value={houseConfig.sqft}
                  onChange={(e) => setHouseConfig(p => ({ ...p, sqft: parseInt(e.target.value) }))}
                  className="w-full h-2 sm:h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <button onClick={() => setHouseConfig(p => ({ ...p, hasPool: !p.hasPool }))} className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all hover:scale-[1.02] ${houseConfig.hasPool ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 text-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/10' : 'border-white/5 bg-white/5 text-slate-500'}`}>
                  <Waves size={18} className="sm:w-[22px] sm:h-[22px]" />
                  <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest">{t.pool}</span>
                </button>
                <button onClick={() => setHouseConfig(p => ({ ...p, hasGarden: !p.hasGarden }))} className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all hover:scale-[1.02] ${houseConfig.hasGarden ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 text-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/10' : 'border-white/5 bg-white/5 text-slate-500'}`}>
                  <TreePine size={18} className="sm:w-[22px] sm:h-[22px]" />
                  <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest">{t.garden}</span>
                </button>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 md:pt-12 border-t border-white/5 mt-6 sm:mt-8 md:mt-12">
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-500 mb-2 sm:mb-3">{t.estTotal}</p>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-[var(--accent-color)]">${displayEstimate}</span>
                <span className="text-sm sm:text-base md:text-lg font-bold text-slate-500">/service</span>
              </div>
              <button onClick={handleCalculatorBooking} className="w-full bg-[var(--accent-color)] py-4 sm:py-6 md:py-8 rounded-xl sm:rounded-[2rem] md:rounded-[2.5rem] font-black text-base sm:text-xl md:text-2xl mt-6 sm:mt-8 md:mt-10 hover:brightness-110 transition-all shadow-2xl shadow-[var(--accent-color)]/30 flex items-center justify-center gap-3 sm:gap-5 text-white transform hover:-translate-y-2 active:translate-y-0">
                {t.bookNow} <ArrowRight size={22} className="sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Partners / Certifications Bar */}
      <div className={`py-8 sm:py-12 border-y ${darkMode ? 'bg-slate-900/30 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
        <div className="desktop-container px-4 sm:px-6">
          <p className="animate-on-scroll text-center text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-slate-500 mb-4 sm:mb-6">{t.partnersTitle}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-16">
            {PARTNERS.map((p, i) => (
              <div key={i} className={`animate-on-scroll stagger-${i + 1} flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                <span className="text-lg sm:text-2xl">{p.icon}</span>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 md:py-32 lg:py-48">
        <div className="desktop-container px-4 sm:px-6">
          <SectionTitle title={t.servicesTitle} subtitle={t.servicesSub} light={darkMode} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-10 sm:mt-16 md:mt-20">
            {SERVICES.map((s, si) => (
              <button
                key={s.id}
                onClick={() => handleServiceSelect(s.id)}
                className={`animate-on-scroll stagger-${si + 1} text-left p-6 sm:p-8 md:p-10 lg:p-14 rounded-2xl sm:rounded-[3rem] lg:rounded-[4rem] bg-white/5 border border-white/5 hover:border-[var(--accent-color)]/40 transition-all duration-500 group relative overflow-hidden flex flex-col items-start hover:-translate-y-3 shadow-2xl hover:shadow-[var(--accent-color)]/10`}
              >
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-[var(--accent-color)]/5 rounded-full blur-3xl group-hover:bg-[var(--accent-color)]/20 transition-all duration-700"></div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] bg-[var(--accent-color)] flex items-center justify-center text-white mb-5 sm:mb-8 md:mb-10 shadow-2xl shadow-[var(--accent-color)]/20 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  {s.icon}
                </div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4 md:mb-6 group-hover:text-[var(--accent-color)] transition-colors">{t[`service_${s.id}_title`]}</h4>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed font-medium mb-5 sm:mb-8 md:mb-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  {t[`service_${s.id}_desc`]}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 sm:gap-3 text-[var(--accent-color)] font-black text-xs sm:text-sm uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                  {t.bookNow} <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section >

      {/* How It Works Section */}
      < section id="how" className={`py-16 sm:py-24 md:py-32 lg:py-48 ${darkMode ? 'bg-slate-900/20' : 'bg-slate-50'}`}>
        <div className="desktop-container px-4 sm:px-6">
          <div className="animate-on-scroll">
            <SectionTitle title={t.howTitle} subtitle={t.howSub} light={darkMode} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mt-10 sm:mt-16 md:mt-20">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const StepIcon = STEP_ICONS[idx];
              return (
                <div key={step.id} className="animate-on-scroll group relative">
                  {idx < 3 && <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[var(--accent-color)]/30 to-transparent z-0"></div>}
                  <div className={`relative z-10 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[3rem] border transition-all duration-500 hover:-translate-y-2 ${darkMode ? 'bg-slate-900/50 border-white/5 hover:border-[var(--accent-color)]/30' : 'bg-white border-slate-100 shadow-xl hover:shadow-2xl'}`}>
                    <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[var(--accent-color)] flex items-center justify-center text-white shadow-xl shadow-[var(--accent-color)]/20 group-hover:rotate-12 transition-transform">
                        <StepIcon size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                      </div>
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--accent-color)]/10 group-hover:text-[var(--accent-color)]/20 transition-colors">0{step.id}</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4 group-hover:text-[var(--accent-color)] transition-colors">{t[step.titleKey]}</h4>
                    <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed font-medium">{t[step.descKey]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section >

      {/* Meet the Artisans */}
      < section id="about" className={`py-16 sm:py-24 md:py-32 lg:py-48 ${darkMode ? 'bg-slate-900/20' : 'bg-slate-50'}`}>
        <div className="desktop-container px-4 sm:px-6">
          <SectionTitle title={t.meetTeam} subtitle={t.teamSub} light={darkMode} />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mt-10 sm:mt-16 md:mt-20">
            {TEAM.map((member, mi) => (
              <div key={member.id} className={`animate-on-scroll-scale stagger-${mi + 1} group relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] md:rounded-[4.5rem] aspect-[3/4.2] border border-white/5 bg-slate-900 shadow-2xl`}>
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-14 translate-y-16 sm:translate-y-20 md:translate-y-28 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <p className="text-[var(--accent-color)] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">{t[member.role]}</p>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-none">{member.name}</h4>
                    <div className="pt-4 sm:pt-6 md:pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <p className="text-white/60 text-sm sm:text-base md:text-lg italic mb-3 sm:mb-4 md:mb-6 font-bold">"{t[member.specialty]}"</p>
                      <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-medium">{t[member.bio]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div >
      </section >

      {/* Before/After Gallery Section */}
      < section className="py-16 sm:py-24 md:py-32 lg:py-48 overflow-hidden" >
        <div className="desktop-container px-4 sm:px-6">
          <div className="animate-on-scroll">
            <SectionTitle title={lang === 'en' ? "Visual Proof" : "Resultados Visíveis"} subtitle={lang === 'en' ? "Real transformations by our premium teams." : "Transformações reais de nossos times premium."} light={darkMode} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-10 sm:mt-16 md:mt-20">
            {[
              {
                beforeImg: '/images/kitchen_before.png',
                afterImg: '/images/kitchen_after.png',
                titleEn: 'Kitchen Revival',
                titlePt: 'Revitalização de Cozinha',
                descEn: 'Deep grease removal and metal polish.',
                descPt: 'Remoção de gordura e polimento de metais.'
              },
              {
                beforeImg: '/images/livingroom_before.png',
                afterImg: '/images/livingroom_after.png',
                titleEn: 'Living Room Detail',
                titlePt: 'Detalhamento de Sala',
                descEn: 'Meticulous dusting and upholstery care.',
                descPt: 'Aspiração meticulosa e cuidado com estofados.'
              }
            ].map((item, i) => (
              <div key={i} className="animate-on-scroll group relative rounded-[2rem] sm:rounded-[3rem] md:rounded-[4.5rem] overflow-hidden aspect-[16/10] shadow-2xl">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 relative">
                    <img src={item.beforeImg} className="w-full h-full object-cover grayscale brightness-75" alt="Before" />
                    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 px-3 py-1 sm:px-4 sm:py-2 bg-black/50 backdrop-blur-md rounded-lg text-[10px] font-black uppercase text-white tracking-widest">Before</div>
                  </div>
                  <div className="w-1/2 relative">
                    <img src={item.afterImg} className="w-full h-full object-cover" alt="After" />
                    <div className="absolute top-4 right-4 sm:top-8 sm:right-8 px-3 py-1 sm:px-4 sm:py-2 bg-[var(--accent-color)] rounded-lg text-[10px] font-black uppercase text-white tracking-widest shadow-lg shadow-[var(--accent-color)]/30">After</div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-14 bg-gradient-to-t from-slate-950/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-white text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3">
                    {lang === 'en' ? item.titleEn : item.titlePt}
                  </h4>
                  <p className="text-white/70 text-sm sm:text-base font-medium">
                    {lang === 'en' ? item.descEn : item.descPt}
                  </p>
                </div >
              </div >
            ))
            }
          </div >
        </div >
      </section >

      {/* Reviews with Company Response */}
      < section id="reviews" className="py-16 sm:py-24 md:py-32 lg:py-48" >
        <div className="desktop-container px-4 sm:px-6">
          <SectionTitle title={t.reviewsTitle} subtitle={t.reviewsSub} light={darkMode} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mt-10 sm:mt-16 md:mt-20">
            {TESTIMONIALS.map((review, ri) => (
              <div key={review.id} className={`animate-on-scroll stagger-${ri + 1} flex flex-col gap-4 sm:gap-6 md:gap-8 group`}>
                <div className={`p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[3rem] lg:rounded-[4rem] relative transform group-hover:-rotate-1 transition-all duration-500 ${darkMode ? 'bg-white/5 border border-white/5' : 'bg-white border border-slate-100 shadow-xl'}`}>
                  <div className="flex gap-1 sm:gap-1.5 mb-4 sm:mb-6 md:mb-8">
                    {[...Array(review.stars)].map((_, i) => <Star key={i} size={16} className="sm:w-5 sm:h-5 text-[var(--accent-color)]" fill="var(--accent-color)" />)}
                  </div>
                  <Quote size={40} className="sm:w-[60px] sm:h-[60px] absolute top-6 right-6 sm:top-12 sm:right-12 opacity-5 text-[var(--accent-color)]" />
                  <p className="text-lg sm:text-xl md:text-2xl font-black leading-snug mb-6 sm:mb-8 md:mb-10 tracking-tight">"{review.text}"</p>
                  <div className="flex items-center gap-3 sm:gap-5">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[var(--accent-color)]/20 flex items-center justify-center font-black text-[var(--accent-color)] text-base sm:text-xl">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-base sm:text-lg">{review.name}</p>
                      <p className="text-[10px] sm:text-[11px] uppercase font-black tracking-widest text-slate-500">{review.location}</p>
                    </div>
                  </div>
                </div>
                <div className={`ml-4 sm:ml-8 md:ml-12 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] border-l-4 border-[var(--accent-color)] flex gap-3 sm:gap-5 items-start ${darkMode ? 'bg-[var(--accent-color)]/5' : 'bg-slate-50'}`}>
                  <MessageSquare size={16} className="sm:w-5 sm:h-5 text-[var(--accent-color)] mt-1 sm:mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--accent-color)] mb-1 sm:mb-2">{t.repliedBy}</p>
                    <p className="text-sm sm:text-base font-medium italic opacity-80 leading-relaxed text-slate-400">"{review.reply}"</p>
                  </div>
                </div>
              </div>
            ))
            }
          </div >
        </div >
      </section >

      {/* FAQ Section */}
      < section className={`py-16 sm:py-24 md:py-32 lg:py-48 ${darkMode ? '' : 'bg-slate-50'}`}>
        <div className="desktop-container px-4 sm:px-6">
          <div className="animate-on-scroll">
            <SectionTitle title={t.faqTitle} subtitle={t.faqSub} light={darkMode} />
          </div>
          <div className="max-w-3xl mx-auto mt-10 sm:mt-16 md:mt-20 space-y-3 sm:space-y-4">
            {FAQ_ITEMS.map((faq) => (
              <div
                key={faq.id}
                className={`animate-on-scroll rounded-xl sm:rounded-2xl border overflow-hidden transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'} ${openFaq === faq.id ? 'ring-2 ring-[var(--accent-color)]/20' : ''}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 md:p-8 text-left"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <HelpCircle size={18} className={`sm:w-5 sm:h-5 flex-shrink-0 transition-colors ${openFaq === faq.id ? 'text-[var(--accent-color)]' : 'text-slate-500'}`} />
                    <span className="text-sm sm:text-base md:text-lg font-black">{t[faq.questionKey]}</span>
                  </div>
                  <ChevronDown size={18} className={`sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180 text-[var(--accent-color)]' : 'text-slate-500'}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 text-sm sm:text-base text-slate-400 leading-relaxed font-medium pl-12 sm:pl-14 md:pl-16">
                    {t[faq.answerKey]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Final Contact Form & Area Search */}
      < section id="contact" ref={contactRef} className="py-16 sm:py-24 md:py-32 lg:py-48" >
        <div className="desktop-container px-4 sm:px-6">
          <h2 className="animate-on-scroll text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-10 sm:mb-16 md:mb-24 text-center lg:text-left leading-[0.85]">
            {t.contactGlow}
          </h2>
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-stretch">
            <div className="lg:col-span-8 flex animate-on-scroll-left stagger-1">
              <InteractiveMap darkMode={darkMode} lang={lang} onBookNow={() => scrollToId('contact')} />
            </div>
            <div className={`lg:col-span-4 p-6 sm:p-8 md:p-10 lg:p-14 rounded-2xl sm:rounded-[3rem] lg:rounded-[4.5rem] border flex flex-col shadow-2xl relative animate-on-scroll-right stagger-2 ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 sm:mb-8 md:mb-10">{t.contactTitle}</h3>
              <form className="space-y-4 sm:space-y-6 md:space-y-8 flex-1" onSubmit={handleFormSubmit}>
                <input type="text" placeholder={t.contactName} className={`w-full p-4 sm:p-5 md:p-7 rounded-xl sm:rounded-[1.5rem] outline-none transition-all border-2 text-base sm:text-lg font-medium ${darkMode ? 'bg-white/5 border-transparent focus:border-[var(--accent-color)] text-white' : 'bg-white border-slate-100 focus:border-[var(--accent-color)]'}`} />
                <input type="email" placeholder={t.contactEmail} className={`w-full p-4 sm:p-5 md:p-7 rounded-xl sm:rounded-[1.5rem] outline-none transition-all border-2 text-base sm:text-lg font-medium ${darkMode ? 'bg-white/5 border-transparent focus:border-[var(--accent-color)] text-white' : 'bg-white border-slate-100 focus:border-[var(--accent-color)]'}`} />

                {/* Mini Calendar */}
                <div>
                  <p className={`text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.selectDate}</p>
                  <MiniCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} darkMode={darkMode} lang={lang} />
                </div>

                <textarea
                  rows={4}
                  placeholder={t.contactMsg}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className={`w-full p-4 sm:p-5 md:p-7 rounded-xl sm:rounded-[1.5rem] outline-none transition-all border-2 resize-none text-base sm:text-lg font-medium ${darkMode ? 'bg-white/5 border-transparent focus:border-[var(--accent-color)] text-white' : 'bg-white border-slate-100 focus:border-[var(--accent-color)]'}`}
                ></textarea>
                <button type="submit" className="w-full bg-[var(--accent-color)] py-4 sm:py-6 md:py-8 rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] font-black text-base sm:text-lg md:text-xl uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-4 sm:mt-6 md:mt-8 hover:brightness-110 transition-all shadow-2xl shadow-[var(--accent-color)]/30 text-white transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3">
                  <Send size={20} className="sm:w-6 sm:h-6" /> {t.contactSubmit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Footer for PC */}
      <footer className="py-12 sm:py-16 md:py-24 lg:py-32 bg-slate-950 border-t border-white/5">
        <div className="desktop-container px-4 sm:px-6">
          <div className="animate-on-scroll flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10 md:gap-16 text-center md:text-left">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[var(--accent-color)] shadow-2xl shadow-[var(--accent-color)]/20"><ShieldCheck className="text-white w-6 h-6 sm:w-8 sm:h-8" /></div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white">LUMINA<span className="text-[var(--accent-color)]">CLEAN</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {NAV_LINKS.map(l => (
                <button key={l.href} onClick={() => scrollToId(l.href)} className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 hover:text-white transition-colors duration-300 hover:-translate-y-0.5">{t[l.key]}</button>
              ))}
            </div>
            <p className="text-slate-600 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">© 2025 Lumina Cleaning Pros. {t.copyright}</p>
          </div>
        </div>
      </footer >

      <FloatingActions whatsappMessage={whatsappMessage} />

      {/* Toast Notification */}
      <div className={`fixed top-24 right-6 z-[9999] transition-all duration-500 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-green-500/30 flex items-center gap-3 font-bold text-sm max-w-sm">
          <Check size={20} className="flex-shrink-0" />
          {t.formToastSuccess}
          <button onClick={() => setShowToast(false)} className="ml-2 hover:opacity-70"><X size={16} /></button>
        </div>
      </div>
    </div >
  );
};

export default App;
