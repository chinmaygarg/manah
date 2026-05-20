/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Site Constants & Navigation Data
   ═══════════════════════════════════════════════════════════ */

export const SITE_CONFIG = {
  name: "Manah Group of Companies",
  shortName: "Manah Group",
  tagline: "Mindful Enterprising",
  description:
    "Manah Group is a diversified enterprise group delivering excellence across six divisions — Manah Dynamics, Manah Green Energy, Manah Atomic, Manah Aerospace, Manah AI, and Manah Investments.",
  url: "https://www.manah.com",
  locale: "en_IN",
  socials: {
    linkedin: "https://www.linkedin.com/company/manah-group",
    twitter: "https://twitter.com/manahgroup",
    youtube: "https://www.youtube.com/@manahgroup",
    instagram: "https://www.instagram.com/manahgroup",
  },
} as const;

export const STATS = [
  { value: 500, suffix: "%+", label: "YoY Growth" },
  { value: 3.6, prefix: "$", suffix: "B+", label: "Project Pipeline" },
  { value: 20, suffix: "+", label: "Strategic Partners" },
  { value: 1000, suffix: "+", label: "Team Members" },
  { value: 15, suffix: "+", label: "States Active" },
] as const;

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  image?: string;
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
  megaMenu?: {
    heading: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
}

export const TOP_BAR_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Landmark Projects", href: "/projects#featured" },
  { label: "Partner With Us", href: "/partner" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const NAVIGATION: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    megaMenu: {
      heading: "Building the Future Since 2018",
      description: "Discover who we are and what drives us.",
      ctaText: "Learn More",
      ctaHref: "/about",
    },
    children: [
      { label: "Who We Are", href: "/about", description: "Our story, vision, and philosophy", image: "/images/about/team_collaboration.png", featured: true },
      { label: "Board of Directors", href: "/about#leadership", description: "Meet our executive team", image: "/images/leaders/prem_kumar.jpg", featured: true },
      { label: "Mission, Vision & Values", href: "/about#mission", description: "Purpose-driven excellence", image: "/images/about/values_mindful.png", featured: true },
      { label: "Investor Relations", href: "/about#investors", description: "Financial performance and reports" },
      { label: "Policies & Charters", href: "/about#policies", description: "Governance framework" },
      { label: "History & Awards", href: "/about#history", description: "Milestones and certifications" },
    ],
  },
  {
    label: "Divisions",
    href: "/divisions",
    megaMenu: {
      heading: "Six Divisions, One Vision",
      description: "Integrated capabilities across infrastructure, energy, nuclear, aerospace, AI & investments.",
      ctaText: "Explore All",
      ctaHref: "/divisions",
    },
    children: [
      { label: "Manah Dynamics", href: "/divisions/dynamics", description: "Projects, Infrastructure & Electronics Manufacturing", image: "/images/divisions/manah_dynamics_hero.png", featured: true },
      { label: "Manah Green Energy", href: "/divisions/green-energy", description: "Green Hydrogen & Renewables", image: "/images/divisions/green_energy_hero.png", featured: true },
      { label: "Manah Atomic", href: "/divisions/atomic", description: "Nuclear Energy Solutions — SMRs & Advanced Reactors", image: "/images/divisions/manah_atomic_hero.png", featured: true },
      { label: "Manah Aerospace", href: "/divisions/aerospace", description: "Aviation MRO, Training & Consultancy", image: "/images/divisions/manah_aerospace_hero.png", featured: true },
      { label: "Manah AI", href: "/divisions/ai", description: "Generative AI & Data Centers", image: "/images/divisions/manah_ai_hero.png", featured: true },
      { label: "Manah Investments", href: "/divisions/investments", description: "Strategic Capital Deployment", image: "/images/divisions/manah_investments_hero.png", featured: true },
    ],
  },
  {
    label: "Sectors",
    href: "/sectors",
    megaMenu: {
      heading: "Comprehensive Solutions Across Industries",
      description: "Ready-to-deploy solutions for critical infrastructure, energy, transportation, and advanced technology.",
      ctaText: "View All Sectors",
      ctaHref: "/sectors",
    },
    children: [
      { label: "Power T&D", href: "/sectors/power-transmission", description: "66kV to 765kV transmission and substation infrastructure", image: "/images/sectors/power_transmission.png", featured: true },
      { label: "Renewables", href: "/sectors/renewable-energy", description: "Utility-scale solar, wind, and hybrid plants", image: "/images/sectors/renewable_energy.png", featured: true },
      { label: "Building & Roads", href: "/sectors/building-roads", description: "Highways, bridges, residential and industrial buildings", image: "/images/sectors/infrastructure.png", featured: true },
      { label: "Defence", href: "/sectors/defence", description: "Tactical comms, radar, EW, and weapon electronics", image: "/images/sectors/defence_electronics.png", featured: true },
      { label: "Aviation & MRO", href: "/sectors/aviation", description: "DGCA-certified MRO, CAR 147 training, consultancy", image: "/images/sectors/aviation.png", featured: true },
      { label: "Telecom", href: "/sectors/telecom", description: "Towers, BharatNet fiber, and active network rollout", image: "/images/sectors/telecom_equipment.png" },
      { label: "Oil & Gas", href: "/sectors/oil-gas", description: "Refinery allied, pipelines, LNG terminal BoP", image: "/images/sectors/manufacturing.png" },
      { label: "Mining", href: "/sectors/mining", description: "Mine infrastructure, processing plants, conveyors", image: "/images/sectors/manufacturing.png" },
      { label: "Irrigation & Water", href: "/sectors/irrigation-water", description: "WTP, STP, lift irrigation, and canal networks", image: "/images/sectors/infrastructure.png" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Sustainability",
    href: "/sustainability",
    megaMenu: {
      heading: "Committed to a Sustainable Future",
      description: "Building responsibly for generations to come.",
      ctaText: "Explore ESG",
      ctaHref: "/sustainability",
    },
    children: [
      { label: "Environment", href: "/sustainability#environment", description: "Climate action & carbon reduction", image: "/images/sustainability/environment.png", featured: true },
      { label: "Social Responsibility", href: "/sustainability#social", description: "Community impact & inclusion", image: "/images/sustainability/community_impact.png", featured: true },
      { label: "Governance", href: "/sustainability#governance", description: "Ethics, compliance & transparency", image: "/images/sustainability/sustainability_hero.png", featured: true },
      { label: "ESG Reports", href: "/sustainability#reports", description: "Annual sustainability disclosures" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    megaMenu: {
      heading: "Latest News & Updates",
      description: "Stay informed about our projects, partnerships, and achievements.",
      ctaText: "View All Media",
      ctaHref: "/media",
    },
    children: [
      { label: "Press Releases", href: "/media#press", description: "Official announcements", image: "/images/news/power-transmission.jpg", featured: true },
      { label: "In The News", href: "/media#news", description: "Media coverage & features", image: "/images/news/aerospace-mro.jpg", featured: true },
      { label: "Awards & Recognition", href: "/media#awards", description: "Industry accolades", image: "/images/news/green-hydrogen.jpg", featured: true },
      { label: "Videos", href: "/media#videos", description: "Project films & corporate stories" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    megaMenu: {
      heading: "Build Your Career With Us",
      description: "Join a team that builds the future.",
      ctaText: "View All Positions",
      ctaHref: "/careers",
    },
    children: [
      { label: "Life at Manah Group", href: "/careers#life", description: "Culture, values & growth", image: "/images/careers/engineering_team.png", featured: true },
      { label: "Job Search", href: "/careers#jobs", description: "Current openings", image: "/images/careers/professional_growth.png", featured: true },
    ],
  },
];

export const DIVISIONS = [
  {
    id: "dynamics",
    name: "Manah Dynamics",
    tagline: "Projects, Infrastructure & Electronics Manufacturing",
    description: "Delivering large-scale EPC solutions across power transmission, renewables, telecom, civil infrastructure, and electronics manufacturing — the flagship engineering and manufacturing division of Manah Group.",
    href: "/divisions/dynamics",
    color: "#1E3A5F",
    image: "/images/divisions/manah_dynamics_hero.png",
    stats: [
      { label: "Projects Delivered", value: "50+" },
      { label: "MW Capacity", value: "1,200+" },
      { label: "Regions Covered", value: "15+" },
    ],
  },
  {
    id: "green-energy",
    name: "Manah Green Energy",
    tagline: "Green Hydrogen & Renewables",
    description: "Pioneering green hydrogen production and renewable energy infrastructure for India's net-zero ambition.",
    href: "/divisions/green-energy",
    color: "#16A34A",
    image: "/images/divisions/green_energy_hero.png",
    stats: [
      { label: "Green H₂ Target", value: "18,000 MTPA" },
      { label: "Technology", value: "ARB & Electrolysis" },
      { label: "Investment", value: "₹5,000 Cr" },
    ],
  },
  {
    id: "atomic",
    name: "Manah Atomic",
    tagline: "Nuclear Energy Solutions",
    description: "Advancing India's nuclear future through Small Modular Reactors (SMRs), advanced nuclear fuel cycle, reactor safety and compliance — powering a clean energy transition.",
    href: "/divisions/atomic",
    color: "#7C3AED",
    image: "/images/divisions/manah_atomic_hero.png",
    stats: [
      { label: "Reactor Focus", value: "SMR" },
      { label: "Fuel Cycle", value: "Advanced" },
      { label: "Priority", value: "Safety & Compliance" },
    ],
  },
  {
    id: "aerospace",
    name: "Manah Aerospace",
    tagline: "Aviation MRO, Training & Consultancy",
    description: "DGCA-certified business jet MRO, CAR 147 training, and aviation consultancy — delivering safety, reliability, and airworthiness to global standards.",
    href: "/divisions/aerospace",
    color: "#0D9488",
    image: "/images/divisions/manah_aerospace_hero.png",
    stats: [
      { label: "MRO Services", value: "18+" },
      { label: "MRO Locations", value: "6" },
      { label: "Certifications", value: "DGCA/San Marino" },
    ],
  },
  {
    id: "ai",
    name: "Manah AI",
    tagline: "Generative AI & Data Centers",
    description: "Building Manah's AI capability from foundational research to production — agentic AI systems, LLM and SLM training pipelines, and generative AI applications, backed by purpose-built data center infrastructure for sovereign, high-performance compute.",
    href: "/divisions/ai",
    color: "#5B8CC5",
    image: "/images/divisions/manah_ai_hero.png",
    stats: [
      { label: "Core Focus", value: "Agentic AI" },
      { label: "Training", value: "LLM & SLM" },
      { label: "Infrastructure", value: "Data Centers" },
    ],
  },
  {
    id: "investments",
    name: "Manah Investments",
    tagline: "Strategic Capital Deployment",
    description: "Deploying strategic capital across infrastructure, energy transition, deep tech, and real estate — identifying high-impact opportunities aligned with India's growth trajectory.",
    href: "/divisions/investments",
    color: "#D97706",
    image: "/images/divisions/manah_investments_hero.png",
    stats: [
      { label: "Portfolio Value", value: "$500M+" },
      { label: "Active Ventures", value: "15+" },
      { label: "Sectors Covered", value: "6+" },
    ],
  },
] as const;

export const LEADERS = [
  {
    name: "Mr. Prem Kumar Pandey",
    title: "Managing Director, Manah Holdings Pvt Ltd",
    bio: "An Information Technology graduate with extensive global experience, providing strategic leadership for Manah Holdings. Led large-scale power transmission projects, built the Electric Buses SBU to profitability, and mentors business directors across divisions.",
    image: "/images/leaders/prem_kumar.jpg",
  },
  {
    name: "Cdr. Pravin Sharad Dixit (Retd.)",
    title: "Director, Manah Dynamics Pvt Ltd",
    bio: "A retired Navy Commander and IIT Kanpur alumnus with over 41 years of leadership across military and corporate sectors. A Certified Independent Director, ESG & BRSR Expert dedicated to delivering future-ready solutions.",
    image: "/images/leaders/pravin_dixit.jpg",
  },
  {
    name: "Col. L S N Murty (Retd.)",
    title: "CEO, Manah Aerospace & Engineering Pvt Ltd",
    bio: "With over 39 years of combined military and civil aviation experience, Col. Murty brings disciplined leadership, deep technical expertise, and strategic insight to drive growth. Ensures safe, efficient, and sustainable operations while aligning teams for consistent results.",
    image: "/images/leaders/lsn_murty.jpg",
  },
  {
    name: "Mr. Mohendra Kumar Pati",
    title: "Director, Manah AI",
    bio: "With over 15 years in defence electronics, Mr. Pati leads R&D and system integration across tactical communication systems and advanced Electronic Warfare technologies — steering Manah AI's mission-critical capability and strategic manufacturing base.",
    image: "/images/leaders/mohendra_pati.jpg",
  },
  {
    name: "Mr. Vinay Chadha",
    title: "Director, Energy",
    bio: "A Mechanical Engineering graduate with three decades of global leadership spanning the Middle East, Africa, and Europe. Brings deep, multi-jurisdictional expertise across Oil & Gas, Energy, Petrochemicals, Power, and allied Infrastructure — driving large-scale project delivery and strategic growth across Manah's energy portfolio.",
    image: "/images/leaders/vinay.png",
  },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  sectors: [
    { label: "Power T&D", href: "/sectors/power-transmission" },
    { label: "Renewables", href: "/sectors/renewable-energy" },
    { label: "Building & Roads", href: "/sectors/building-roads" },
    { label: "Defence", href: "/sectors/defence" },
    { label: "Aviation & MRO", href: "/sectors/aviation" },
    { label: "Telecom", href: "/sectors/telecom" },
    { label: "Oil & Gas", href: "/sectors/oil-gas" },
    { label: "Mining", href: "/sectors/mining" },
    { label: "Irrigation & Water", href: "/sectors/irrigation-water" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
} as const;
