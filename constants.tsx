
import React from 'react';
import { Home, Building2, Sparkles, MoveHorizontal, Grid, Hammer, CalendarCheck, CreditCard, Heart } from 'lucide-react';
import { ServiceCardProps, Testimonial, NavLink, ServiceArea, FAQItem } from './types';

export const TRANSLATIONS = {
  en: {
    topOffer: "Special: 20% OFF Your First Deep Cleaning! Use code: LUMINA20",
    heroBadge: "Brazilian Owned & Operated",
    heroTitle: "A Clean Home, Pure Peace of Mind.",
    heroSub: "Experience the legendary Brazilian dedication to cleanliness. Premium residential and commercial services for our community in the USA.",
    getQuote: "Get a Free Quote",
    callNow: "Call Now",
    faqTitle: "Frequently Asked Questions",
    faqSub: "Everything you need to know about our services.",
    calcTitle: "Quick Estimate",
    calcSub: "Estimate the starting cost for your space.",
    rooms: "Rooms",
    bathrooms: "Bathrooms",
    estTotal: "Estimated starting at",
    bookNow: "Book Now",
    howItWorks: "How It Works",
    howSub: "Getting your space cleaned is easier than ever.",
    aboutTitle: "The Brazilian Touch",
    aboutSub: "In Brazil, cleaning is more than a chore; it's a culture of hospitality and meticulous care. We bring that same passion to every American home we serve.",
    statsHappy: "Happy Clients",
    statsClean: "Houses Cleaned",
    statsRating: "Average Rating",
    process1Title: "Book Online",
    process1Desc: "Select your preferred date and service type in seconds.",
    process2Title: "We Clean",
    process2Desc: "Our vetted professionals arrive and work their magic.",
    process3Title: "You Relax",
    process3Desc: "Come home to a spotless, fresh-smelling environment.",
    servicesTitle: "Our Premium Services",
    servicesSub: "We offer a range of professional cleaning solutions tailored to your specific needs.",
    reviewsTitle: "Loved by Your Neighbors",
    reviewsSub: "Join hundreds of happy families and businesses who trust Lumina.",
    contactTitle: "Request a Free Estimate",
    contactName: "Your Name",
    contactEmail: "Email Address",
    contactPhone: "Phone Number",
    contactMsg: "How can we help you?",
    contactSubmit: "Get My Quote",
    footerDesc: "Premium professional cleaning services. Brazilian quality serving the American community.",
    footerServices: "Services",
    footerNav: "Navigation",
    footerLegal: "Legal",
    copyright: "All rights reserved.",
    madeWith: "Made with",
    forOurComm: "for our community.",
    mapTitle: "Service Areas",
    mapSub: "Check if we serve your location",
    mapSearchPlaceholder: "Search city, zip, or state (e.g. Miami, FL)...",
    mapResults: "Search Results",
    mapNoResults: "No direct matches",
    mapStateServiced: "We service",
    mapStateServicedMsg: "While this city isn't on our standard list yet, we do operate in your state. Contact us to confirm!",
    mapNotServed: "Not Served Yet",
    mapNotServedMsg: "We haven't reached this region quite yet, but we're expanding fast!",
    mapInquire: "Inquire Now",
    mapRequest: "Request Expansion",
    mapAvailableRegions: "Available Regions",
    mapPrimaryCities: "Primary Cities",
    mapSelectedLocation: "Selected Location",
    mapConfirmation1: "Same-day booking available",
    mapConfirmation2: "Teams vetted and insured",
    calendarSelect: "Select a date in 'How it Works' above",
    calendarServiceDate: "Service Date",
    contactGlow: "Let's Get Your Space Glowing",
    office: "Office",
    whatsApp: "WhatsApp",
    // Navigation
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "About",
    nav_how: "How It Works",
    nav_reviews: "Reviews",
    nav_contact: "Contact",
    // Services Detailed
    service_res_title: "Residential Cleaning",
    service_res_desc: "Keep your home spotless with our professional recurring or one-time cleaning service.",
    service_com_title: "Commercial Cleaning",
    service_com_desc: "A clean workplace is a productive one. We serve offices, clinics, and retail spaces.",
    service_deep_title: "Deep Cleaning",
    service_deep_desc: "A meticulous top-to-bottom clean for every corner of your property.",
    service_move_title: "Move In / Move Out",
    service_move_desc: "Make your transition stress-free with a professional deep clean before or after moving.",
    service_win_title: "Window Cleaning",
    service_win_desc: "Crystal clear views with our professional glass and window treatment services.",
    service_post_title: "Post-Construction",
    service_post_desc: "We remove debris, dust, and residues to make your newly renovated space livable.",
    // Checklist
    check_vetted: "Vetted Professionals",
    check_eco: "Eco-Friendly Options",
    check_custom: "Custom Checklists",
    check_sameday: "Same Day Service",
    // Badge
    satisfactionBadge: "Satisfaction Guarantee",
    aboutTeamBadge: "About Our Team",
    // State Descriptions
    desc_Florida: "Specializing in high-turnover vacation rental cleanings (Airbnb) and meticulous deep cleans for coastal properties.",
    desc_Massachusetts: "Focusing on the preservation of historic homes and high-demand move-in/out services for the local student community.",
    desc_New_Jersey: "Providing comprehensive office maintenance solutions and premium residential deep cleaning for suburban families.",
    // FAQ
    faqList: [
      {
        question: "Do I need to provide cleaning supplies?",
        answer: "No, we bring all professional-grade equipment and eco-friendly cleaning solutions. If you have specific products you'd like us to use, just let us know!"
      },
      {
        question: "Are you insured and bonded?",
        answer: "Yes, Lumina Cleaning is fully licensed, insured, and bonded for your total protection and peace of mind."
      },
      {
        question: "Do I need to be home during the cleaning?",
        answer: "Most of our clients provide a key or access code. We are highly vetted and trusted professionals. However, you are more than welcome to be home if you prefer."
      },
      {
        question: "What is your cancellation policy?",
        answer: "We understand plans change. We ask for a 24-hour notice for any cancellations or rescheduling to avoid a small fee."
      }
    ]
  },
  pt: {
    topOffer: "Especial: 20% OFF na sua primeira limpeza pesada! Use o código: LUMINA20",
    heroBadge: "Empresa de Brasileiros para o Mundo",
    heroTitle: "Casa Limpa, Mente em Paz.",
    heroSub: "Experimente a lendária dedicação brasileira à limpeza. Serviços premium residenciais e comerciais para nossa comunidade nos EUA.",
    getQuote: "Orçamento Grátis",
    callNow: "Ligar Agora",
    faqTitle: "Perguntas Frequentes",
    faqSub: "Tudo o que você precisa saber sobre nossos serviços.",
    calcTitle: "Estimativa Rápida",
    calcSub: "Calcule o valor inicial para o seu espaço.",
    rooms: "Quartos",
    bathrooms: "Banheiros",
    estTotal: "Estimativa a partir de",
    bookNow: "Agendar Agora",
    howItWorks: "Como Funciona",
    howSub: "Limpar seu espaço nunca foi tão fácil.",
    aboutTitle: "O Toque Brasileiro",
    aboutSub: "No Brasil, limpeza é mais do que uma tarefa; é uma cultura de hospitalidade e cuidado meticuloso. Trazemos essa mesma paixão para cada casa americana que atendemos.",
    statsHappy: "Clientes Felizes",
    statsClean: "Casas Limpas",
    statsRating: "Avaliação Média",
    process1Title: "Agende Online",
    process1Desc: "Escolha sua data e tipo de serviço em segundos.",
    process2Title: "Nós Limpamos",
    process2Desc: "Nossos profissionais verificados chegam e fazem a mágica.",
    process3Title: "Você Relaxa",
    process3Desc: "Chegue em casa e encontre um ambiente impecável e cheiroso.",
    servicesTitle: "Nossos Serviços Premium",
    servicesSub: "Oferecemos uma gama de soluções de limpeza profissional adaptadas às suas necessidades específicas.",
    reviewsTitle: "Amado pelos seus Vizinhos",
    reviewsSub: "Junte-se a centenas de famílias e empresas felizes que confiam na Lumina.",
    contactTitle: "Solicite um Orçamento Grátis",
    contactName: "Seu Nome",
    contactEmail: "Endereço de E-mail",
    contactPhone: "Número de Telefone",
    contactMsg: "Como podemos ajudar?",
    contactSubmit: "Obter meu Orçamento",
    footerDesc: "Serviços de limpeza profissional premium. Qualidade brasileira servindo a comunidade americana.",
    footerServices: "Serviços",
    footerNav: "Navegação",
    footerLegal: "Jurídico",
    copyright: "Todos os direitos reservados.",
    madeWith: "Feito com",
    forOurComm: "para nossa comunidade.",
    mapTitle: "Áreas de Atendimento",
    mapSub: "Verifique se atendemos sua localização",
    mapSearchPlaceholder: "Buscar cidade, CEP ou estado (ex: Miami, FL)...",
    mapResults: "Resultados da Busca",
    mapNoResults: "Sem correspondências diretas",
    mapStateServiced: "Atendemos o estado de",
    mapStateServicedMsg: "Embora esta cidade ainda não esteja na lista, operamos em seu estado. Contate-nos para confirmar!",
    mapNotServed: "Ainda não Atendido",
    mapNotServedMsg: "Ainda não chegamos nesta região, mas estamos expandindo rápido!",
    mapInquire: "Consultar Agora",
    mapRequest: "Solicitar Expansão",
    mapAvailableRegions: "Regiões Disponíveis",
    mapPrimaryCities: "Cidades Principais",
    mapSelectedLocation: "Localização Selecionada",
    mapConfirmation1: "Agendamento para o mesmo dia disponível",
    mapConfirmation2: "Equipes verificadas e seguradas",
    calendarSelect: "Selecione uma data em 'Como Funciona' acima",
    calendarServiceDate: "Data do Serviço",
    contactGlow: "Vamos Deixar seu Espaço Brilhando",
    office: "Escritório",
    whatsApp: "WhatsApp",
    // Navegação
    nav_home: "Início",
    nav_services: "Serviços",
    nav_about: "Sobre",
    nav_how: "Como Funciona",
    nav_reviews: "Avaliações",
    nav_contact: "Contato",
    // Serviços Detalhados
    service_res_title: "Limpeza Residencial",
    service_res_desc: "Mantenha sua casa impecável com nosso serviço profissional de limpeza recorrente ou pontual.",
    service_com_title: "Limpeza Comercial",
    service_com_desc: "Um local de trabalho limpo é produtivo. Atendemos escritórios, clínicas e espaços comerciais.",
    service_deep_title: "Limpeza Pesada (Deep)",
    service_deep_desc: "Uma limpeza meticulosa de cima a baixo para cada canto da sua propriedade.",
    service_move_title: "Mudanças (Move In/Out)",
    service_move_desc: "Torne sua transição livre de estresse com uma limpeza profunda antes ou depois de mudar.",
    service_win_title: "Limpeza de Janelas",
    service_win_desc: "Vistas cristalinas com nossos serviços profissionais de tratamento de vidros e janelas.",
    service_post_title: "Pós-Obra",
    service_post_desc: "Removemos detritos, poeira e resíduos para tornar seu espaço recém-renovado habitável.",
    // Checklist
    check_vetted: "Profissionais Verificados",
    check_eco: "Produtos Ecológicos",
    check_custom: "Checklists Personalizados",
    check_sameday: "Serviço no Mesmo Dia",
    // Badge
    satisfactionBadge: "Garantia de Satisfação",
    aboutTeamBadge: "Sobre Nossa Equipe",
    // State Descriptions
    desc_Florida: "Especializados em limpeza de aluguel de temporada (Airbnb) e limpezas profundas detalhadas para propriedades costeiras.",
    desc_Massachusetts: "Foco na preservação de casas históricas e serviços de mudança (move-in/out) para a comunidade estudantil local.",
    desc_New_Jersey: "Oferecendo soluções completas de manutenção de escritórios e limpeza residencial pesada premium para famílias suburbanas.",
    // FAQ
    faqList: [
      {
        question: "Preciso fornecer os produtos de limpeza?",
        answer: "Não, nós levamos todos os equipamentos de nível profissional e soluções de limpeza ecológicas. Se você tiver produtos específicos que gostaria que usássemos, basta nos avisar!"
      },
      {
        question: "Vocês possuem seguro?",
        answer: "Sim, a Lumina Cleaning é totalmente licenciada e segurada (insured and bonded) para sua total proteção e tranquilidade."
      },
      {
        question: "Preciso estar em casa durante a limpeza?",
        answer: "A maioria dos nossos clientes fornece uma chave ou código de acesso. Somos profissionais altamente verificados e confiáveis. No entanto, você é mais do que bem-vindo a estar em casa se preferir."
      },
      {
        question: "Qual é a política de cancelamento?",
        answer: "Entendemos que planos mudam. Pedimos um aviso de 24 horas para cancelamentos ou reagendamentos para evitar uma pequena taxa."
      }
    ]
  }
};

export const NAV_LINKS: (NavLink & { key: string })[] = [
  { label: 'Home', href: '#home', key: 'nav_home' },
  { label: 'Services', href: '#services', key: 'nav_services' },
  { label: 'About', href: '#about', key: 'nav_about' },
  { label: 'How It Works', href: '#how-it-works', key: 'nav_how' },
  { label: 'Reviews', href: '#reviews', key: 'nav_reviews' },
  { label: 'Contact', href: '#contact', key: 'nav_contact' },
];

export const SERVICES: ServiceCardProps[] = [
  {
    id: 'res',
    title: 'Residential Cleaning',
    description: 'Keep your home spotless with our professional recurring or one-time cleaning service.',
    icon: <Home className="w-8 h-8" />,
  },
  {
    id: 'com',
    title: 'Commercial Cleaning',
    description: 'A clean workplace is a productive one. We serve offices, clinics, and retail spaces.',
    icon: <Building2 className="w-8 h-8" />,
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    description: 'A meticulous top-to-bottom clean for every corner of your property.',
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    id: 'move',
    title: 'Move In / Move Out',
    description: 'Make your transition stress-free with a professional deep clean before or after moving.',
    icon: <MoveHorizontal className="w-8 h-8" />,
  },
  {
    id: 'win',
    title: 'Window Cleaning',
    description: 'Crystal clear views with our professional glass and window treatment services.',
    icon: <Grid className="w-8 h-8" />,
  },
  {
    id: 'post',
    title: 'Post-Construction',
    description: 'We remove debris, dust, and residues to make your newly renovated space livable.',
    icon: <Hammer className="w-8 h-8" />,
  },
];

export const PROCESS_STEPS = [
  { icon: <CalendarCheck className="w-10 h-10" />, key: 'process1' },
  { icon: <CreditCard className="w-10 h-10" />, key: 'process2' },
  { icon: <Heart className="w-10 h-10" />, key: 'process3' }
];

export const STATS = [
  { labelKey: 'statsHappy', value: '1,500+' },
  { labelKey: 'statsClean', value: '8,200+' },
  { labelKey: 'statsRating', value: '4.9/5' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Amanda R.',
    location: 'Orlando, FL',
    text: 'Excellent service! The team is incredibly professional and reliable. My house has never looked so good.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Roberto S.',
    location: 'Miami, FL',
    text: 'Being a Brazilian living abroad, it is hard to find trust. Lumina Cleaning is the real deal. Highly recommend!',
    stars: 5,
  },
  {
    id: 3,
    name: 'Sarah J.',
    location: 'Boston, MA',
    text: 'They did a move-out cleaning for my apartment and it was flawless. Got my full deposit back. Thank you!',
    stars: 5,
  },
  {
    id: 4,
    name: 'Carlos M.',
    location: 'Tampa, FL',
    text: 'Reliability is everything. These guys never miss a spot and always arrive on time. Best cleaning service in FL.',
    stars: 5,
  },
  {
    id: 5,
    name: 'Lucia P.',
    location: 'Newark, NJ',
    text: 'Professional, polite, and very detailed. They cleaned my office over the weekend and the results were stunning.',
    stars: 5,
  },
];

export const SERVICE_AREAS: ServiceArea[] = [
  { state: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Boca Raton'] },
  { state: 'Massachusetts', cities: ['Boston', 'Framingham', 'Worcester'] },
  { state: 'New Jersey', cities: ['Newark', 'Jersey City', 'Elizabeth'] },
];
