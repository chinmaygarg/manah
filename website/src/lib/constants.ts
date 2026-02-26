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

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export const NAVIGATION: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Company Overview", href: "/about", description: "Our story, vision, and philosophy" },
      { label: "Leadership", href: "/about#leadership", description: "Meet our executive team" },
      { label: "Sustainability", href: "/sustainability", description: "ESG commitment and green initiatives" },
      { label: "Careers", href: "/careers", description: "Join our growing team" },
      { label: "History & Awards", href: "/about#history", description: "Milestones and certifications" },
    ],
  },
  {
    label: "Divisions",
    href: "/divisions",
    children: [
      { label: "Manah Dynamics", href: "/divisions/dynamics", description: "Projects & Infrastructure" },
      { label: "Manah Aerospace", href: "/divisions/aerospace", description: "Aviation & MRO Services" },
      { label: "Green Energy", href: "/divisions/green-energy", description: "Green Hydrogen & Renewables" },
      { label: "Tech & Manufacturing", href: "/divisions/technology", description: "Electronics Manufacturing" },
      { label: "Manah Investments", href: "/divisions/investments", description: "Strategic Investments" },
    ],
  },
  {
    label: "Sectors",
    href: "/sectors",
    children: [
      { label: "Power Transmission", href: "/sectors/power-transmission", description: "HV/EHV transmission infrastructure" },
      { label: "Renewable Energy", href: "/sectors/renewable-energy", description: "Solar, wind, and hybrid solutions" },
      { label: "Infrastructure", href: "/sectors/infrastructure", description: "Roads, bridges, and urban projects" },
      { label: "Defence Electronics", href: "/sectors/defence", description: "Strategic electronics systems" },
      { label: "Aviation", href: "/sectors/aviation", description: "Airport and MRO facilities" },
      { label: "Green Hydrogen", href: "/sectors/green-hydrogen", description: "Electrolyzer and hydrogen infrastructure" },
      { label: "Manufacturing", href: "/sectors/manufacturing", description: "EMS and precision manufacturing" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "All Projects", href: "/projects", description: "Browse our complete portfolio" },
      { label: "Featured Projects", href: "/projects#featured", description: "Landmark achievements" },
      { label: "Capabilities", href: "/capabilities", description: "Full-spectrum EPC services" },
      { label: "Case Studies", href: "/projects#case-studies", description: "In-depth project analyses" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Press Releases", href: "/media#press", description: "Latest announcements" },
      { label: "News & Blog", href: "/media#news", description: "Company news and insights" },
      { label: "Gallery", href: "/media#gallery", description: "Photo and video gallery" },
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
    image: "/images/divisions/manah_dynamics_projects.png",
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
