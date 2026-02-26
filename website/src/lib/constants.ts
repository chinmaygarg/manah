/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Site Constants & Navigation Data
   ═══════════════════════════════════════════════════════════ */

export const SITE_CONFIG = {
  name: "Manah Group of Companies",
  shortName: "Manah Group",
  tagline: "Mindful Enterprising",
  description:
    "Manah Group is a diversified EPC enterprise delivering excellence across Projects & Infrastructure, Aviation & MRO, Green Energy, Technology & Manufacturing, and Strategic Investments.",
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
  { value: 300, prefix: "$", suffix: "M+", label: "Project Value" },
  { value: 12, suffix: "+", label: "Strategic Partners" },
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
  { label: "Landmark Projects", href: "/projects#landmark" },
  { label: "Partner With Us", href: "/partner" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const NAVIGATION: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    megaMenu: {
      heading: "Building the Future Since 1998",
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
      heading: "Five Divisions, One Vision",
      description: "Integrated capabilities across infrastructure, energy & technology.",
      ctaText: "Explore All",
      ctaHref: "/divisions",
    },
    children: [
      { label: "Manah Dynamics", href: "/divisions/dynamics", description: "Projects & Infrastructure", image: "/images/divisions/manah_dynamics_hero.png", featured: true },
      { label: "Manah Aerospace", href: "/divisions/aerospace", description: "Aviation & MRO Services", image: "/images/divisions/manah_aerospace_hero.png", featured: true },
      { label: "Green Energy", href: "/divisions/green-energy", description: "Green Hydrogen & Renewables", image: "/images/divisions/green_energy_hero.png", featured: true },
      { label: "Tech & Manufacturing", href: "/divisions/technology", description: "Electronics Manufacturing", image: "/images/divisions/tech_manufacturing_hero.png", featured: true },
      { label: "Manah Investments", href: "/divisions/investments", description: "Strategic Investments", image: "/images/divisions/manah_investments_hero.png", featured: true },
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
      { label: "Urban Infrastructure", href: "/sectors/infrastructure", description: "Smart cities & urban development", image: "/images/sectors/infrastructure.png", featured: true },
      { label: "Advanced Technology", href: "/sectors/defence", description: "Data centers & semiconductor fabs", image: "/images/sectors/defence_electronics.png", featured: true },
      { label: "Transportation", href: "/sectors/aviation", description: "Metro, airports & highways", image: "/images/sectors/transportation.png", featured: true },
      { label: "Oil, Gas & Energy", href: "/sectors/power-transmission", description: "Refinery & petrochemical", image: "/images/sectors/power_transmission.png", featured: true },
      { label: "Power & Renewables", href: "/sectors/renewable-energy", description: "Solar, wind & thermal power", image: "/images/sectors/renewable_energy.png", featured: true },
      { label: "Water & Environment", href: "/sectors/green-hydrogen", description: "Treatment, desalination & rejuvenation", image: "/images/sectors/green_hydrogen.png", featured: true },
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
    tagline: "Projects & Infrastructure",
    description: "Delivering large-scale EPC solutions across power transmission, renewable energy, and infrastructure sectors with engineering excellence.",
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
    id: "aerospace",
    name: "Manah Aerospace",
    tagline: "Aviation & MRO",
    description: "Comprehensive aviation solutions including aircraft maintenance, repair, overhaul, and aerospace engineering services.",
    href: "/divisions/aerospace",
    color: "#0D9488",
    image: "/images/divisions/manah_aerospace_hero.png",
    stats: [
      { label: "Aircraft Serviced", value: "200+" },
      { label: "MRO Capabilities", value: "Full Spectrum" },
      { label: "Certifications", value: "DGCA/EASA" },
    ],
  },
  {
    id: "green-energy",
    name: "Green Energy",
    tagline: "Hydrogen & Renewables",
    description: "Pioneering green hydrogen production and renewable energy infrastructure for a net-zero future.",
    href: "/divisions/green-energy",
    color: "#16A34A",
    image: "/images/divisions/green_energy_hero.png",
    stats: [
      { label: "Green H₂ Capacity", value: "500 TPD" },
      { label: "Electrolyzer Tech", value: "PEM/AEL" },
      { label: "Carbon Offset", value: "100K+ Tons" },
    ],
  },
  {
    id: "technology",
    name: "Tech & Manufacturing",
    tagline: "Electronics Manufacturing Services",
    description: "State-of-the-art electronics manufacturing with SMT lines, precision engineering, and defence-grade quality systems.",
    href: "/divisions/technology",
    color: "#7C3AED",
    image: "/images/divisions/tech_manufacturing_hero.png",
    stats: [
      { label: "SMT Lines", value: "8+" },
      { label: "Products/Year", value: "1M+" },
      { label: "Quality Standard", value: "ISO 9001" },
    ],
  },
  {
    id: "investments",
    name: "Manah Investments",
    tagline: "Strategic Investments",
    description: "Deploying strategic capital across infrastructure, energy, and technology ventures — identifying high-impact opportunities aligned with global growth trajectories.",
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
    name: "Mr. Prem Kumar",
    title: "MD, Manah Holding Pvt Ltd",
    bio: "An Information Technology graduate with extensive global experience, providing strategic leadership for Manah Holdings and representing the group across international networks and forums.",
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
    title: "Director, Manah Aerospace & Engineering Pvt Ltd",
    bio: "With over 39 years of combined military and civil aviation experience, Col. Murty brings disciplined leadership, deep technical expertise, and strategic insight to drive growth.",
    image: "/images/leaders/lsn_murty.jpg",
  },
  {
    name: "Mr. Mohendra Kumar Pati",
    title: "Director, Manah Dynamics Pvt Ltd",
    bio: "With over 15 years in defence electronics, Mr. Pati has led key R&D and system integration projects including tactical communication systems and advanced Electronic Warfare technologies.",
    image: "/images/leaders/mohendra_pati.jpg",
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
    { label: "Power Transmission", href: "/sectors/power-transmission" },
    { label: "Renewable Energy", href: "/sectors/renewable-energy" },
    { label: "Infrastructure", href: "/sectors/infrastructure" },
    { label: "Defence Electronics", href: "/sectors/defence" },
    { label: "Aviation", href: "/sectors/aviation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
} as const;
