
import React from 'react';
import { Home, Building2, Sparkles, MoveHorizontal, Grid, Hammer, ShieldCheck, Star } from 'lucide-react';
import { Testimonial, ServiceArea, TeamMember, ChecklistRoom } from './types';

export const VIBES = [
  { id: 'fresh', color: '#3b82f6', icon: '❄️', key: 'vibe_fresh', particles: 'sparkle' },
  { id: 'citrus', color: '#facc15', icon: '🍋', key: 'vibe_citrus', particles: 'glow' },
  { id: 'lavender', color: '#a855f7', icon: '🌿', key: 'vibe_lavender', particles: 'leaf' },
  { id: 'eucalyptus', color: '#10b981', icon: '🍃', key: 'vibe_eucalyptus', particles: 'leaf' },
];

export const NAV_LINKS = [
  { href: '#home', key: 'nav_home' },
  { href: '#services', key: 'nav_services' },
  { href: '#about', key: 'nav_about' },
  { href: '#how', key: 'nav_how' },
  { href: '#reviews', key: 'nav_reviews' },
  { href: '#contact', key: 'nav_contact' },
];

export const SERVICES = [
  { id: 'res', icon: <Home className="w-8 h-8" /> },
  { id: 'com', icon: <Building2 className="w-8 h-8" /> },
  { id: 'deep', icon: <Sparkles className="w-8 h-8" /> },
  { id: 'move', icon: <MoveHorizontal className="w-8 h-8" /> },
  { id: 'win', icon: <Grid className="w-8 h-8" /> },
  { id: 'post', icon: <Hammer className="w-8 h-8" /> },
];

export const TESTIMONIALS = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    location: 'Miami, FL', 
    text: 'Best cleaning service I have ever used. Meticulous!', 
    stars: 5,
    reply: "Thank you Sarah! We love taking care of your beautiful home."
  },
  { 
    id: 2, 
    name: 'Ricardo Silva', 
    location: 'Boston, MA', 
    text: 'The Brazilian touch is real. My house smells amazing.', 
    stars: 5,
    reply: "Ficamos felizes em trazer esse carinho brasileiro para sua casa, Ricardo!"
  },
  { 
    id: 3, 
    name: 'Emily Davis', 
    location: 'Jersey City, NJ', 
    text: 'Reliable and professional. Highly recommended!', 
    stars: 5,
    reply: "We appreciate your trust, Emily! See you next time."
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  { state: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Fort Lauderdale', 'Boca Raton'] },
  { state: 'Massachusetts', cities: ['Boston', 'Cambridge', 'Worcester', 'Quincy', 'Newton'] },
  { state: 'New Jersey', cities: ['Newark', 'Jersey City', 'Princeton', 'Hoboken', 'Trenton'] }
];

export const TEAM: TeamMember[] = [
  { id: 1, name: 'Helena Silva', role: 'team_1_role', specialty: 'team_1_specialty', bio: 'team_1_bio', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Ana Costa', role: 'team_2_role', specialty: 'team_2_specialty', bio: 'team_2_bio', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Beatriz Lima', role: 'team_3_role', specialty: 'team_3_specialty', bio: 'team_3_bio', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800' }
];

export const CHECKLIST_ROOMS: ChecklistRoom[] = [
  { id: 'kitchen', nameKey: 'kitchens', items: ['k_1', 'k_2', 'k_3', 'k_4', 'k_5'] },
  { id: 'bathroom', nameKey: 'bathrooms', items: ['b_1', 'b_2', 'b_3', 'b_4', 'b_5'] },
  { id: 'bedroom', nameKey: 'bedrooms', items: ['be_1', 'be_2', 'be_3', 'be_4', 'be_5'] }
];

export const TRANSLATIONS = {
  en: {
    liveActivity: "Live Operations",
    liveMsg: "Teams active in your area",
    repliedBy: "Replied by Lumina",
    meetTeam: "Meet the Artisans",
    teamSub: "Dedicated professionals trained in the 'White-Glove' Brazilian standard.",
    estimatorTitle: "Premium Service Engine",
    estimatorSub: "Smart selector: Suites automatically adjust rooms and baths.",
    bedrooms: "Bedrooms",
    suites: "Suites",
    livingRooms: "Living Rooms",
    kitchens: "Kitchens",
    bathrooms: "Bathrooms",
    pool: "Pool Maintenance",
    garden: "Garden/Yard Service",
    sqft: "Total Area",
    estTotal: "Estimated starting at",
    bookNow: "Request Service",
    heroBadge: "Brazilian Owned & Operated",
    heroTitle: "A Clean Home, Pure Peace of Mind.",
    heroSub: "Experience the legendary Brazilian dedication to cleanliness. Premium services for our community in the USA.",
    servicesTitle: "Our Premium Services",
    servicesSub: "Professional cleaning solutions tailored to your specific needs.",
    reviewsTitle: "Loved by Your Neighbors",
    reviewsSub: "Join hundreds of happy families and businesses who trust Lumina.",
    contactTitle: "Finalize Request",
    contactName: "Your Name",
    contactEmail: "Email",
    contactPhone: "Phone",
    contactMsg: "Service Details & Notes",
    contactSubmit: "Book Service Now",
    copyright: "All rights reserved.",
    mapTitle: "Service Areas",
    mapSub: "Check if we serve your location",
    mapSearchPlaceholder: "Search city, zip, or state...",
    mapAvailableRegions: "Available Regions",
    mapPrimaryCities: "Primary Cities",
    mapSelectedLocation: "Selected Location",
    contactGlow: "Ready to Sparkle",
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "Team",
    nav_how: "How It Works",
    nav_reviews: "Reviews",
    nav_contact: "Contact",
    vibeTitle: "Select Your Home Scent Vibe",
    service_res_title: "Residential Cleaning", service_res_desc: "Professional recurring or one-time cleaning for your cozy home. We treat your house like our own.",
    service_com_title: "Commercial Cleaning", service_com_desc: "Keep your business pristine. Productive workplaces start here. Tailored for offices and retail.",
    service_deep_title: "Deep Cleaning", service_deep_desc: "A meticulous top-to-bottom clean. We find dirt in corners others don't even know exist.",
    service_move_title: "Move-In / Move-Out", service_move_desc: "Seamless transition cleaning. Leave your old place sparkling or enter your new home with total hygiene.",
    service_win_title: "Window Cleaning", service_win_desc: "Crystal clear views with our streak-free professional window protocol. Maximize your natural light.",
    service_post_title: "Post-Construction", service_post_desc: "Eliminating fine dust and debris after your renovation or build. Ready for immediate move-in.",
    vibe_fresh: "Fresh Linen", vibe_citrus: "Energizing Citrus", vibe_lavender: "Relaxing Lavender", vibe_eucalyptus: "Pure Eucalyptus",
    checklistTitle: "Our Precision Checklist", checklistSub: "50-point premium protocol applied to every corner.",
    roomProtocol: "Room Protocol", scrutinizedMsg: "Scrutinized by lead supervisors.",
    k_1: "Degrease hood and stovetop", k_2: "Polish stainless steel", k_3: "Inside microwave deep clean", k_4: "Cabinet exterior detail", k_5: "Tile grout scrub",
    b_1: "Mineral deposit removal", b_2: "Mirror streak-free polish", b_3: "Sanitize all high-touch points", b_4: "Floor hand-scrubbing", b_5: "Glass shower door scaling",
    be_1: "Premium bed making", be_2: "Dusting baseboards", be_3: "Ventilation grills", be_4: "Under-bed vacuuming", be_5: "Upholstery fluffing",
    team_1_role: "Senior Lead Pro", team_1_specialty: "Hospitality Specialist", team_1_bio: "15 years of experience bringing high-end standards.",
    team_2_role: "Sanitization Expert", team_2_specialty: "Clinical Cleaning", team_2_bio: "Obsessive about molecular purity.",
    team_3_role: "Organization Artist", team_3_specialty: "Closet & Space Layout", team_3_bio: "Beatriz transforms spaces into havens of order.",
  },
  pt: {
    liveActivity: "Operações ao Vivo",
    liveMsg: "Equipes ativas na sua área",
    repliedBy: "Resposta da Lumina",
    meetTeam: "Conheça os Especialistas",
    teamSub: "Profissionais dedicados, treinados no padrão 'White-Glove' brasileiro.",
    estimatorTitle: "Configurador de Serviço",
    estimatorSub: "Seletor inteligente: Suítes ajustam quartos e banheiros automaticamente.",
    bedrooms: "Quartos",
    suites: "Suítes",
    livingRooms: "Salas",
    kitchens: "Cozinhas",
    bathrooms: "Banheiros",
    pool: "Limpeza de Piscina",
    garden: "Jardinagem/Pátio",
    sqft: "Área Total",
    estTotal: "Estimativa a partir de",
    bookNow: "Solicitar Serviço",
    heroBadge: "Propriedade Brasileira nos EUA",
    heroTitle: "Casa Limpa, Mente em Paz.",
    heroSub: "Experimente a lendária dedicação brasileira à limpeza. Serviços premium para nossa comunidade nos EUA.",
    servicesTitle: "Serviços Premium",
    servicesSub: "Soluções profissionais adaptadas às suas necessidades específicas.",
    reviewsTitle: "Amado pelos Vizinhos",
    reviewsSub: "Junte-se a centenas de famílias felizes que confiam na Lumina.",
    contactTitle: "Finalizar Solicitação",
    contactName: "Nome",
    contactEmail: "E-mail",
    contactPhone: "Telefone",
    contactMsg: "Detalhes e Notas do Serviço",
    contactSubmit: "Solicitar Agora",
    copyright: "Todos os direitos reservados.",
    mapTitle: "Áreas atendidas",
    mapSub: "Verifique sua localização",
    mapSearchPlaceholder: "Buscar cidade, CEP...",
    mapAvailableRegions: "Regiões Disponíveis",
    mapPrimaryCities: "Cidades Principais",
    mapSelectedLocation: "Localização Selecionada",
    contactGlow: "Pronto para Brilhar",
    nav_home: "Início",
    nav_services: "Serviços",
    nav_about: "Equipe",
    nav_how: "Como Funciona",
    nav_reviews: "Avaliações",
    nav_contact: "Contato",
    vibeTitle: "Escolha o Aroma da sua Casa",
    service_res_title: "Limpeza Residencial", service_res_desc: "Limpeza recorrente ou única para deixar seu lar aconchegante. Cuidamos da sua casa como se fosse nossa.",
    service_com_title: "Limpeza Comercial", service_com_desc: "Escritórios produtivos começam aqui. Manutenção profissional para empresas e lojas.",
    service_deep_title: "Limpeza Pesada", service_deep_desc: "Meticulosa de cima a baixo. Encontramos sujeira em cantos que outros nem imaginam que existem.",
    service_move_title: "Move-In / Move-Out", service_move_desc: "Limpeza de transição perfeita. Saia do seu antigo imóvel com brilho ou entre no novo com higiene total.",
    service_win_title: "Limpeza de Janelas", service_win_desc: "Visão cristalina com nosso protocolo profissional sem manchas. Maximize a luz natural do seu espaço.",
    service_post_title: "Pós-Obra", service_post_desc: "Eliminando poeira fina e detritos após sua reforma ou construção. Pronto para morar imediatamente.",
    vibe_fresh: "Algodão Fresco", vibe_citrus: "Cítrico Energizante", vibe_lavender: "Lavanda Relaxante", vibe_eucalyptus: "Eucalipto Puro",
    checklistTitle: "Checklist de Precisão", checklistSub: "Protocolo premium de 50 pontos em cada canto.",
    roomProtocol: "Protocolo de Cômodo", scrutinizedMsg: "Inspecionado por supervisores.",
    k_1: "Desengordurar coifa e fogão", k_2: "Polimento de inox", k_3: "Limpeza de micro-ondas", k_4: "Detalhamento de armários", k_5: "Esfregação de rejuntes",
    b_1: "Remoção de depósitos minerais", b_2: "Polimento de espelhos", b_3: "Sanitização de alto toque", b_4: "Lavagem manual de piso", b_5: "Descalcificação de box",
    be_1: "Arrumação de cama premium", be_2: "Limpeza de rodapés", be_3: "Grades de ventilação", be_4: "Aspiração sob a cama", be_5: "Revitalização de estofados",
    team_1_role: "Líder Sênior Pro", team_1_specialty: "Especialista em Hospitalidade", team_1_bio: "15 anos de experiência no alto padrão.",
    team_2_role: "Expert em Sanitização", team_2_specialty: "Limpeza Clínica", team_2_bio: "Obsessiva com pureza molecular.",
    team_3_role: "Artista da Organização", team_3_specialty: "Closet e Espaços", team_3_bio: "Beatriz transforma espaços em refúgios de ordem.",
  }
};
