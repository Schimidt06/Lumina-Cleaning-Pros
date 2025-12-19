
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, Phone, CheckCircle2, Star, Calendar as CalendarIcon, MessageSquare, ArrowRight, ArrowLeft,
  ShieldCheck, Clock, Leaf, DollarSign, Search, Award, MapPin, Globe, Sparkles,
  MessageCircle, Plus, Minus, ChevronDown, Moon, Sun, Heart, Instagram, Facebook, Twitter
} from 'lucide-react';
import { SectionTitle } from './components/SectionTitle';
import { FloatingActions } from './components/FloatingActions';
import { InteractiveMap } from './components/InteractiveMap';
import { MiniCalendar } from './components/MiniCalendar';
import { NAV_LINKS, SERVICES, TESTIMONIALS, TRANSLATIONS, PROCESS_STEPS, STATS } from './constants';
import { Language } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const howRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isHowVisible, setIsHowVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  
  const [rooms, setRooms] = useState(2);
  const [baths, setBaths] = useState(1);
  const estimate = 80 + (rooms * 25) + (baths * 20);

  const t = useMemo(() => TRANSLATIONS[lang] as any, [lang]);

  // Unified scroll function to handle section navigation
  const scrollToId = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80; // Offset for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    
    const observe = (ref: React.RefObject<HTMLElement | null>, setVisible: (v: boolean) => void) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      }, observerOptions);
      if (ref.current) observer.observe(ref.current);
      return () => { if (ref.current) observer.unobserve(ref.current); };
    };

    const cleanup1 = observe(servicesRef, setIsServicesVisible);
    const cleanup2 = observe(aboutRef, setIsAboutVisible);
    const cleanup3 = observe(howRef, setIsHowVisible);
    const cleanup4 = observe(reviewsRef, setIsReviewsVisible);
    const cleanup5 = observe(contactRef, setIsContactVisible);

    return () => { cleanup1(); cleanup2(); cleanup3(); cleanup4(); cleanup5(); };
  }, []);

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setTimeout(() => {
      scrollToId('contact');
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-slate-950' : 'bg-white'} selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden`}>
      {/* Top Offer Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-xs font-black uppercase tracking-[0.2em] relative z-[60]">
        {t.topOffer}
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled 
          ? (darkMode 
              ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
              : 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]') 
          : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToId('home')}>
            <div className={`p-2.5 rounded-xl transition-all duration-500 ${scrolled ? 'bg-blue-600 shadow-md' : 'bg-white/10 backdrop-blur-md'}`}>
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${scrolled ? (darkMode ? 'text-white' : 'text-slate-900') : 'text-white'}`}>
              LUMINA<span className="text-blue-500">CLEAN</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${scrolled ? (darkMode ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200') : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className={`flex items-center p-1 rounded-full border transition-all ${scrolled ? (darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50') : 'border-white/20 bg-white/10'}`}>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${lang === 'en' ? 'bg-blue-600 text-white shadow-md' : (darkMode ? 'text-slate-400' : 'text-slate-400')}`}>EN</button>
              <button onClick={() => setLang('pt')} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${lang === 'pt' ? 'bg-blue-600 text-white shadow-md' : (darkMode ? 'text-slate-400' : 'text-slate-400')}`}>PT</button>
            </div>
            {NAV_LINKS.map((link) => (
              <button 
                key={link.href} 
                onClick={() => scrollToId(link.href)} 
                className={`font-bold text-sm uppercase tracking-widest hover:text-blue-500 transition-all duration-500 ${scrolled ? (darkMode ? 'text-slate-200' : 'text-slate-700') : 'text-white'}`}
              >
                {t[link.key]}
              </button>
            ))}
            <button 
              onClick={() => scrollToId('contact')} 
              className={`px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest shadow-lg transition-all transform hover:scale-105 active:scale-95 ${scrolled ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
              {t.getQuote}
            </button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl ${scrolled ? (darkMode ? 'text-yellow-400' : 'text-slate-600') : 'text-white'}`}>{darkMode ? <Sun size={24} /> : <Moon size={24} />}</button>
            <button className={`p-2 rounded-xl ${scrolled ? (darkMode ? 'text-white' : 'text-slate-900') : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] border-t border-slate-100 dark:border-white/5' : 'max-h-0'}`}>
          <div className={`p-6 flex flex-col gap-6 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
             {NAV_LINKS.map((link) => (
              <button 
                key={link.href} 
                onClick={() => scrollToId(link.href)} 
                className={`text-left font-bold text-lg uppercase tracking-widest ${darkMode ? 'text-white' : 'text-slate-900'}`}
              >
                {t[link.key]}
              </button>
            ))}
            <button 
              onClick={() => scrollToId('contact')} 
              className="bg-blue-600 text-white py-4 rounded-2xl text-center font-black uppercase tracking-widest"
            >
              {t.getQuote}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000" alt="Home" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/40"></div>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-white pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full text-blue-300 font-bold mb-8">
                <span className="text-sm uppercase tracking-widest">{t.heroBadge}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black leading-tight mb-8 tracking-tighter">
                {t.heroTitle.split(',')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">{t.heroTitle.split(',')[1]}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-xl font-medium leading-relaxed">{t.heroSub}</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => scrollToId('contact')} className="group bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl text-xl font-black transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
                  {t.getQuote} <ArrowRight />
                </button>
                <a href="tel:+10000000000" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/30 px-12 py-6 rounded-2xl text-xl font-black transition-all flex items-center justify-center gap-3">
                  <Phone className="w-6 h-6" /> {t.callNow}
                </a>
              </div>
            </div>

            {/* Quick Estimator Card */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[3rem] shadow-2xl animate-fade-in [animation-delay:200ms]">
               <h3 className="text-3xl font-black mb-2">{t.calcTitle}</h3>
               <p className="text-slate-300 mb-8">{t.calcSub}</p>
               <div className="space-y-8">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                     <span className="font-bold text-lg">{t.rooms}</span>
                     <div className="flex items-center gap-6">
                        <button onClick={() => setRooms(Math.max(1, rooms-1))} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><Minus size={18} /></button>
                        <span className="text-2xl font-black w-6 text-center">{rooms}</span>
                        <button onClick={() => setRooms(rooms+1)} className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all"><Plus size={18} /></button>
                     </div>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                     <span className="font-bold text-lg">{t.bathrooms}</span>
                     <div className="flex items-center gap-6">
                        <button onClick={() => setBaths(Math.max(1, baths-1))} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><Minus size={18} /></button>
                        <span className="text-2xl font-black w-6 text-center">{baths}</span>
                        <button onClick={() => setBaths(baths+1)} className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all"><Plus size={18} /></button>
                     </div>
                  </div>
                  <div className="pt-8 border-t border-white/10">
                     <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{t.estTotal}</p>
                     <p className="text-6xl font-black text-white mb-8">${estimate}<span className="text-xl text-slate-400 ml-2">/visit</span></p>
                     <button onClick={() => scrollToId('contact')} className="block w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-black text-center text-xl transition-all shadow-xl shadow-green-500/20">
                        {t.bookNow}
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust & Stats Bar */}
      <section className={`py-12 transition-colors duration-500 ${darkMode ? 'bg-slate-900 border-y border-white/5' : 'bg-slate-50 border-y border-slate-100'}`}>
        <div className="container mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                   <p className="text-4xl md:text-5xl font-black text-blue-600">{stat.value}</p>
                   <p className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t[stat.labelKey]}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className={`py-32 transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className={`reveal ${isServicesVisible ? 'active' : ''}`}>
            <SectionTitle title={t.servicesTitle} subtitle={t.servicesSub} light={darkMode} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {SERVICES.map((service, idx) => (
              <div 
                key={service.id} 
                className={`reveal ${isServicesVisible ? 'active' : ''} p-10 rounded-[2.5rem] border transition-all duration-500 group hover:shadow-2xl hover:-translate-y-2 ${darkMode ? 'bg-slate-900 border-white/5 hover:bg-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-black mb-4 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {t[`service_${service.id}_title`]}
                </h3>
                <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {t[`service_${service.id}_desc`]}
                </p>
                <button 
                  onClick={() => scrollToId('contact')} 
                  className="mt-8 flex items-center gap-2 text-blue-500 font-bold group-hover:gap-4 transition-all"
                >
                   {t.bookNow} <ArrowRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className={`py-32 transition-colors duration-500 overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
         <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className={`relative reveal ${isAboutVisible ? 'active' : ''}`}>
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
                  <img src="https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=1000" className="rounded-[3rem] shadow-2xl relative z-10" alt="Professional Cleaner" />
                  <button 
                    onClick={() => scrollToId('contact')} 
                    className="absolute bottom-10 right-10 bg-blue-600 text-white p-8 rounded-[2rem] shadow-2xl z-20 hidden md:flex flex-col items-center justify-center min-w-[200px] hover:scale-105 transition-transform"
                  >
                     <p className="text-4xl font-black mb-2">100%</p>
                     <p className="text-xs font-black uppercase tracking-widest opacity-80 text-center">{t.satisfactionBadge}</p>
                  </button>
               </div>
               <div className={`reveal delay-200 ${isAboutVisible ? 'active' : ''}`}>
                  <div className="inline-flex items-center gap-3 bg-blue-600/10 border border-blue-600/20 px-5 py-2.5 rounded-full text-blue-600 font-black mb-8">
                    <span className="text-xs uppercase tracking-widest">{t.aboutTeamBadge}</span>
                  </div>
                  <h2 className={`text-4xl md:text-6xl font-black mb-8 tracking-tighter transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.aboutTitle}</h2>
                  <p className={`text-xl leading-relaxed mb-10 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t.aboutSub}</p>
                  <div className="grid sm:grid-cols-2 gap-6">
                     {['check_vetted', 'check_eco', 'check_custom', 'check_sameday'].map((key, i) => (
                       <div key={i} className="flex items-center gap-4">
                          <div className="bg-green-500 rounded-full p-1"><CheckCircle2 className="text-white w-4 h-4" /></div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{t[key]}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" ref={howRef} className={`py-32 transition-colors duration-500 relative overflow-hidden ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="container mx-auto px-4 md:px-8">
            <div className={`reveal ${isHowVisible ? 'active' : ''}`}>
               <SectionTitle title={t.howItWorks} subtitle={t.howSub} light={darkMode} />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-20 relative">
               <div className="absolute top-24 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent hidden lg:block -z-0"></div>
               
               {PROCESS_STEPS.map((step, i) => (
                 <div key={i} className={`relative z-10 group reveal ${isHowVisible ? 'active' : ''}`} style={{ transitionDelay: `${i * 200}ms` }}>
                    <div className="absolute top-4 right-8 text-7xl font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none select-none">
                      0{i + 1}
                    </div>

                    <div className={`h-full flex flex-col p-10 lg:p-12 rounded-[3.5rem] border transition-all duration-700 backdrop-blur-xl hover:-translate-y-4 ${
                      darkMode 
                      ? 'bg-slate-900/40 border-white/5 hover:border-blue-500/30 hover:bg-slate-900/60 shadow-2xl shadow-black/40' 
                      : 'bg-white/80 border-slate-100 hover:border-blue-200 hover:bg-white shadow-xl shadow-slate-200/50'
                    }`}>
                       <div className="relative mb-12">
                          <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                          <div className="w-24 h-24 rounded-3xl bg-blue-600 text-white flex items-center justify-center relative z-10 shadow-2xl shadow-blue-600/40 transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-700">
                             {step.icon}
                          </div>
                       </div>

                       <div className="flex-1">
                          <h4 className={`text-3xl font-black mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {t[`${step.key}Title`]}
                          </h4>
                          <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {t[`${step.key}Desc`]}
                          </p>
                          
                          {i === 0 && (
                            <div className="mt-4 transform group-hover:scale-[1.02] transition-transform duration-700">
                               <MiniCalendar 
                                 selectedDate={selectedDate} 
                                 onDateSelect={handleDateSelect} 
                                 darkMode={darkMode}
                                 lang={lang}
                               />
                               {selectedDate && (
                                 <div className="mt-6 flex items-center gap-3 text-blue-500 font-black text-sm uppercase tracking-widest bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                                   <CalendarIcon size={18} />
                                   <span>{selectedDate.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')}</span>
                                 </div>
                               )}
                            </div>
                          )}

                          {i > 0 && (
                            <div className={`mt-auto pt-8 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                              <button 
                                onClick={() => scrollToId('contact')} 
                                className="flex items-center gap-3 text-green-500 font-bold hover:gap-5 transition-all"
                              >
                                <CheckCircle2 size={20} />
                                <span className="text-sm uppercase tracking-widest">{t.bookNow}</span>
                              </button>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" ref={reviewsRef} className={`py-32 transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8 overflow-hidden">
          <div className={`reveal ${isReviewsVisible ? 'active' : ''}`}>
            <SectionTitle title={t.reviewsTitle} subtitle={t.reviewsSub} light={darkMode} />
          </div>
          <div className={`relative px-4 sm:px-12 reveal delay-200 ${isReviewsVisible ? 'active' : ''}`}>
            <button onClick={prevTestimonial} className={`absolute left-0 top-1/2 -translate-y-12 z-20 border p-4 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all hidden sm:flex ${darkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-white border-slate-100 text-slate-900'}`}><ArrowLeft size={24} /></button>
            <button onClick={nextTestimonial} className={`absolute right-0 top-1/2 -translate-y-12 z-20 border p-4 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all hidden sm:flex ${darkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-white border-slate-100 text-slate-900'}`}><ArrowRight size={24} /></button>
            <div className="relative h-[450px] sm:h-[400px]">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={testimonial.id} className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${idx === activeTestimonial ? 'opacity-100 translate-x-0 scale-100 z-10' : idx < activeTestimonial ? 'opacity-0 -translate-x-full scale-95 z-0' : 'opacity-0 translate-x-full scale-95 z-0'}`}>
                  <div className={`p-10 md:p-16 rounded-[3rem] border h-full flex flex-col justify-center relative group hover:shadow-2xl transition-all duration-500 max-w-5xl mx-auto ${darkMode ? 'bg-slate-900 border-white/5 hover:bg-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white'}`}>
                    <p className={`italic text-2xl md:text-3xl leading-relaxed mb-12 font-medium transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>"{testimonial.text}"</p>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-xl shadow-lg">{testimonial.name[0]}</div>
                      <div>
                        <h4 className={`text-xl font-black transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>{testimonial.name}</h4>
                        <p className="text-blue-600 font-black tracking-widest text-sm uppercase">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-32 transition-colors duration-500 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4 md:px-8">
           <SectionTitle title={t.faqTitle} subtitle={t.faqSub} light={darkMode} />
           <div className="max-w-3xl mx-auto space-y-4">
              {t.faqList.map((faq: any, i: number) => (
                <div key={i} className={`rounded-3xl border overflow-hidden shadow-sm transition-all hover:shadow-md ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-slate-100'}`}>
                   <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex justify-between items-center text-left">
                      <span className={`text-xl font-bold transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>{faq.question}</span>
                      <ChevronDown className={`text-blue-600 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                   </button>
                   <div className={`transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <p className={`px-8 pb-8 text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{faq.answer}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className={`py-32 transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className={`grid lg:grid-cols-2 gap-24 reveal ${isContactVisible ? 'active' : ''}`}>
            <div className="space-y-12">
              <div>
                <h2 className={`text-4xl md:text-6xl font-black mb-8 tracking-tighter transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                   {t.contactGlow.split('Space')[0]} <br /><span className="text-blue-600">Space {t.contactGlow.split('Space')[1]}</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-8 mt-12 mb-16">
                  <div className="flex gap-4 items-center">
                    <div className={`${darkMode ? 'bg-blue-900/50' : 'bg-blue-50'} p-4 rounded-2xl text-blue-600`}><Phone size={24} /></div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.office}</p>
                      <p className={`text-xl font-black transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>+1 (000) 000-0000</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className={`${darkMode ? 'bg-green-900/50' : 'bg-green-50'} p-4 rounded-2xl text-green-600`}><MessageCircle size={24} /></div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.whatsApp}</p>
                      <p className={`text-xl font-black transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>+1 (000) 000-0000</p>
                    </div>
                  </div>
                </div>
              </div>
              <InteractiveMap darkMode={darkMode} lang={lang} onBookNow={() => scrollToId('contact')} />
            </div>
            <div ref={formRef} className={`p-10 md:p-16 rounded-[3rem] shadow-sm border relative h-fit reveal delay-200 transition-colors ${darkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className={`text-2xl font-black mb-10 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.contactTitle}</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder={t.contactName} className={`w-full px-8 py-5 rounded-2xl border-none ring-1 transition-all focus:ring-4 focus:ring-blue-600/20 outline-none text-lg ${darkMode ? 'bg-slate-800 ring-white/10 text-white' : 'bg-white ring-slate-200 text-slate-900'}`} />
                  <input type="tel" placeholder={t.contactPhone} className={`w-full px-8 py-5 rounded-2xl border-none ring-1 transition-all focus:ring-4 focus:ring-blue-600/20 outline-none text-lg ${darkMode ? 'bg-slate-800 ring-white/10 text-white' : 'bg-white ring-slate-200 text-slate-900'}`} />
                </div>
                <div className="relative">
                  <CalendarIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none" />
                  <input 
                    type="text" 
                    readOnly
                    value={selectedDate ? `${t.calendarServiceDate}: ${selectedDate.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')}` : t.calendarSelect}
                    className={`w-full pl-16 pr-8 py-5 rounded-2xl border-none ring-1 transition-all focus:ring-4 focus:ring-blue-600/20 outline-none text-lg ${darkMode ? 'bg-slate-800 ring-white/10 text-white cursor-default' : 'bg-white ring-slate-200 text-slate-900 cursor-default'} ${!selectedDate && 'opacity-50 italic'}`}
                  />
                </div>
                <input type="email" placeholder={t.contactEmail} className={`w-full px-8 py-5 rounded-2xl border-none ring-1 transition-all focus:ring-4 focus:ring-blue-600/20 outline-none text-lg ${darkMode ? 'bg-slate-800 ring-white/10 text-white' : 'bg-white ring-slate-200 text-slate-900'}`} />
                <textarea rows={4} placeholder={t.contactMsg} className={`w-full px-8 py-5 rounded-2xl border-none ring-1 transition-all focus:ring-4 focus:ring-blue-600/20 outline-none text-lg ${darkMode ? 'bg-slate-800 ring-white/10 text-white' : 'bg-white ring-slate-200 text-slate-900'}`}></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl text-xl font-black transition-all transform hover:scale-[1.02] shadow-2xl flex items-center justify-center gap-3">
                  {t.contactSubmit} <Sparkles className="text-blue-400" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className={`py-32 border-t transition-colors duration-500 ${darkMode ? 'bg-slate-950 border-white/5' : 'bg-slate-950 border-slate-900'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24 text-center md:text-left">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
                <ShieldCheck className="text-blue-500 w-10 h-10" />
                <span className="text-3xl font-black tracking-tighter text-white">LUMINA<span className="text-blue-500">CLEAN</span></span>
              </div>
              <p className="leading-relaxed text-lg mb-10 text-slate-500">{t.footerDesc}</p>
              <div className="flex gap-6 justify-center md:justify-start">
                 <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><Instagram size={24} /></a>
                 <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><Facebook size={24} /></a>
                 <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><Twitter size={24} /></a>
              </div>
            </div>
            <div><h5 className="text-white font-black uppercase tracking-widest mb-10 text-sm">{t.footerServices}</h5><ul className="space-y-5 text-lg text-slate-500">{SERVICES.slice(0, 4).map(s => <li key={s.id}><button onClick={() => scrollToId('services')} className="hover:text-blue-400 transition-colors text-left">{t[`service_${s.id}_title`]}</button></li>)}</ul></div>
            <div><h5 className="text-white font-black uppercase tracking-widest mb-10 text-sm">{t.footerNav}</h5><ul className="space-y-5 text-lg text-slate-500">{NAV_LINKS.map(l => <li key={l.href}><button onClick={() => scrollToId(l.href)} className="hover:text-blue-400 transition-colors text-left">{t[l.key]}</button></li>)}</ul></div>
            <div><h5 className="text-white font-black uppercase tracking-widest mb-10 text-sm">{t.footerLegal}</h5><ul className="space-y-5 text-lg text-slate-500"><li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li><li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li><li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li></ul></div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-600">
            <div className="text-sm"><p>© 2025 Lumina Cleaning Pros. {t.copyright}</p></div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">{t.madeWith} <Heart size={14} className="text-red-500" /> {t.forOurComm}</div>
          </div>
        </div>
      </footer>

      <FloatingActions />
    </div>
  );
};

export default App;
