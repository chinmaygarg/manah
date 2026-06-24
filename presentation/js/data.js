/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Presentation Data
   All financial, statistical, and content data objects
   ═══════════════════════════════════════════════════════════ */

const MANAH_DATA = {
  // ─── Company Overview ───
  company: {
    name: 'Manah Holdings Pvt Ltd',
    tagline: 'Diversified Enterprise Group',
    philosophy: 'Mindful Enterprising',
    founded: 2018,
    website: 'www.manah.com',
    linkedin: '@manahgroup',
    hq: '5th Floor, Trendz Platina, Madhapur, Hyderabad, Telangana 500081',
  },

  // ─── At-a-Glance Stats ───
  stats: [
    { value: 500, suffix: '%', label: 'YoY Revenue Growth', icon: '📈' },
    { value: 3.6, suffix: 'B+', prefix: '₹', label: 'Project Pipeline', icon: '🏗️' },
    { value: 20, suffix: '+', label: 'Strategic Partners', icon: '🤝' },
    { value: 6, suffix: '', label: 'Divisions', icon: '🏢' },
    { value: 1000, suffix: '+', label: 'Team Members', icon: '👥' },
    { value: 15, suffix: '+', label: 'States Active', icon: '📍' },
  ],

  // ─── Subsidiaries (6 divisions, new sequence) ───
  subsidiaries: [
    {
      name: 'Manah Dynamics',
      focus: 'Projects, Infrastructure & Electronics Manufacturing',
      color: '#1E3A5F',
      icon: '⚡',
    },
    {
      name: 'Manah Green Energy',
      focus: 'Green Hydrogen & Renewables',
      color: '#16A34A',
      icon: '🌱',
    },
    {
      name: 'Manah Atomic',
      focus: 'Nuclear Energy Solutions — SMRs & Advanced Reactors',
      color: '#7C3AED',
    },
    {
      name: 'Manah Aerospace',
      focus: 'Aviation MRO, Training, Consultancy',
      color: '#0D9488',
      icon: '✈️',
    },
    {
      name: 'Manah AI',
      focus: 'Generative AI & Data Centers',
      color: '#5B8CC5',
    },
    {
      name: 'Manah Investments',
      focus: 'Strategic Capital Deployment',
      color: '#D97706',
      icon: '📊',
    },
  ],

  // ─── Revenue Forecast ───
  revenue: {
    labels: ['FY 24-25', 'FY 25-26', 'FY 26-27', 'FY 27-28'],
    values: [33, 150, 1580, 4500],
    unit: 'Cr',
  },

  // ─── Order Bookings by Sector ───
  orderBookings: {
    years: ['FY 25-26', 'FY 26-27', 'FY 27-28'],
    sectors: [
      { name: 'Telecom', values: [800, 1200, 2000], color: '#C8A96E' },
      { name: 'Building & Roads', values: [300, 1200, 1500], color: '#5B8CC5' },
      { name: 'Oil & Gas', values: [150, 900, 1000], color: '#0D9488' },
      { name: 'Power T&D', values: [250, 1500, 1500], color: '#7C3AED' },
      { name: 'Renewables', values: [0, 1500, 3500], color: '#16A34A' },
    ],
    totals: [1500, 6300, 9500],
  },

  // ─── Pipeline Breakdown (client mockup — ₹20,000+ Cr combined) ───
  pipeline: [
    { label: 'EPC Bids', value: 5500, color: '#5B8CC5' },
    { label: 'Investments', value: 8000, color: '#F4F6FA' },
    { label: 'HAM Projects', value: 6500, color: '#16A34A' },
    { label: 'M&A Targets', value: 3, color: '#D97706', unit: 'deals' },
  ],

  // ─── Dynamics Sectors ───
  dynamicsSectors: [
    { name: 'Power T&D', desc: 'EHV lines up to 765 kV', icon: '⚡' },
    { name: 'Building & Roads', desc: 'Civil infrastructure', icon: '🏗️' },
    { name: 'Telecom', desc: 'Towers, BharatNet, fiber', icon: '📡' },
    { name: 'BESS/SCADA', desc: 'Energy storage & automation', icon: '🔋' },
    { name: 'Defence', desc: 'Systems & networks', icon: '🛡️' },
    { name: 'Irrigation & Water', desc: 'Water treatment & irrigation', icon: '💧' },
    { name: 'Mining', desc: 'Mining operations', icon: '⛏️' },
    { name: 'Oil & Gas', desc: 'Downstream processing', icon: '🛢️' },
    { name: 'Renewables', desc: 'Solar, Wind, Hydel', icon: '☀️' },
    { name: 'M&A', desc: 'Strategic growth', icon: '📊' },
    { name: 'Disaster Management', desc: 'Training & response', icon: '🚨' },
  ],

  // ─── MRO Locations (6 current + 2 planned) ───
  mroLocations: {
    current: [
      { name: 'Hyderabad', lat: 17.385, lng: 78.4867 },
      { name: 'Koppal', lat: 15.3468, lng: 76.1549 },
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
      { name: 'Bhubaneshwar', lat: 20.2961, lng: 85.8245 },
      { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
      { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    ],
    expansion: [
      { name: 'Pune', lat: 18.5204, lng: 73.8567 },
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    ],
  },

  // ─── Green Hydrogen Milestones ───
  greenHydrogen: [
    { milestone: 'MoU & Agreement', detail: 'Signed with Government of Madhya Pradesh for Hydrogen Production Plant at Bina, based on ARB and Electrolysis technologies' },
    { milestone: 'Technology Partnerships', detail: 'Strategic partnerships with multiple global technology partners for water-splitting and electrolysis hydrogen production' },
    { milestone: 'Investment & Scale', detail: '₹5,000 Cr investment for 18,000 MTPA green hydrogen in 4 phases over 350 acres' },
    { milestone: 'Project Progress', detail: 'Offtake agreements and land allotment activities currently in progress' },
  ],

  // ─── Investment Focus Areas ───
  investmentFocus: [
    { name: 'Infrastructure PE', desc: 'Direct equity in power, roads, logistics & urban development', icon: '🏗️' },
    { name: 'Energy Transition', desc: 'Renewables, green hydrogen, battery storage & clean mobility', icon: '⚡' },
    { name: 'Tech Ventures', desc: 'Deep tech, industrial IoT, defence tech & advanced manufacturing', icon: '🔬' },
    { name: 'Real Estate', desc: 'Commercial, industrial & mixed-use in high-growth corridors', icon: '🏢' },
  ],

  // ─── Partners (logos sourced from client pptx — 23 partners) ───
  partners: [
    'KELTRON', 'C-DAC', 'BSNL', 'PowerGrid', 'NPCIL',
    'Engineers India Limited', 'PFC Consulting Ltd',
    'REC Power Development', 'SECI', 'MES', 'TCIL',
    'APSFL', 'AP Transco', 'TGTRANSCO', 'NBCC (India) Limited',
    'GRIL', 'PVR Constructions', 'PVR Projects Ltd',
    'MAIWIR Group', 'Roorkee Projects', 'GENERIC',
    'Vere Max', 'Cypress Solutions',
  ],

  partnerLogos: {
    'KELTRON': 'images/partners/keltron.png',
    'C-DAC': 'images/partners/cdac.png',
    'BSNL': 'images/partners/bsnl.png',
    'PowerGrid': 'images/partners/powergrid.png',
    'NPCIL': 'images/partners/npcil.gif',
    'Engineers India Limited': 'images/partners/eil.png',
    'PFC Consulting Ltd': 'images/partners/pfc-consulting.jpeg',
    'REC Power Development': 'images/partners/rec-power-development.png',
    'SECI': 'images/partners/seci.png',
    'MES': 'images/partners/mes.jpeg',
    'TCIL': 'images/partners/tcil.png',
    'APSFL': 'images/partners/apsfl.png',
    'AP Transco': 'images/partners/ap-transco.jpeg',
    'TGTRANSCO': 'images/partners/tgtransco.jpeg',
    'NBCC (India) Limited': 'images/partners/nbcc.png',
    'GRIL': 'images/partners/gril.png',
    'PVR Constructions': 'images/partners/pvr-constructions.png',
    'PVR Projects Ltd': 'images/partners/pvr-projects.png',
    'MAIWIR Group': 'images/partners/maiwir-group.png',
    'Roorkee Projects': 'images/partners/roorkee.png',
    'GENERIC': 'images/partners/generic.png',
    'Vere Max': 'images/partners/vere-max.png',
    'Cypress Solutions': 'images/partners/cypress-solutions.png',
  },

  // ─── Leaders ───
  leaders: [
    {
      name: 'Mr. Prem Kumar Pandey',
      title: 'Managing Director',
      org: 'Manah Holdings Pvt Ltd',
      photo: 'prem_kumar.webp',
      bio: 'IT graduate with extensive global experience. Led major power transmission initiatives and built Electric Buses SBU to profitability.',
    },
    {
      name: 'Cdr. Pravin S. Dixit (Retd.)',
      title: 'Director',
      org: 'Manah Dynamics Pvt Ltd',
      photo: 'pravin_dixit.webp',
      bio: 'Retired Navy Commander, IIT Kanpur alumnus. 41+ years of leadership. Certified Independent Director & ESG Expert.',
    },
    {
      name: 'Col. L S N Murty (Retd.)',
      title: 'CEO',
      org: 'Manah Aerospace & Engineering',
      photo: 'lsn_murty.webp',
      bio: '39+ years military and civil aviation experience. Drives safe, efficient, and sustainable aerospace operations.',
    },
    {
      name: 'Mr. Mohendra Kumar Pati',
      title: 'Director, Tech & Manufacturing',
      org: 'Manah Dynamics Pvt Ltd',
      photo: 'mohendra_pati.webp',
      bio: '15+ years defence electronics experience. Expertise in R&D, tactical communication, and Electronic Warfare systems.',
    },
  ],

  // ─── ESG Data ───
  esg: {
    environmental: {
      title: 'Environmental',
      icon: '🌍',
      stats: ['100K+ tons CO₂ offset target', 'Green hydrogen production', 'Renewable energy portfolio'],
    },
    social: {
      title: 'Social',
      icon: '👥',
      stats: ['1,000+ jobs created', 'Skill development programs', 'Community upliftment'],
    },
    governance: {
      title: 'Governance',
      icon: '🏛️',
      stats: ['ISO 9001:2015 certified', 'DGCA CAR 145 approved', 'ESG & BRSR compliant'],
    },
  },

  // ─── Office Locations ───
  offices: [
    { city: 'Hyderabad', type: 'Corporate HQ', address: 'Trendz Platina, Madhapur' },
    { city: 'New Delhi (Gurugram)', type: 'Regional Office', address: 'NCR Operations' },
    { city: 'Dubai', type: 'International Business', address: 'Global Operations' },
    { city: 'Vishakhapatnam', type: 'Regional Office', address: 'Andhra Pradesh' },
    { city: 'Bhopal', type: 'Regional Office', address: 'Madhya Pradesh' },
    { city: 'Bangalore', type: 'Regional Office', address: 'Karnataka' },
  ],

  // ─── Aerospace Services ───
  aerospaceServices: [
    {
      title: 'Aircraft Maintenance (MRO)',
      desc: 'DGCA certified business jet maintenance covering light and midsize jets to advanced aircraft.',
      capabilities: ['Customized maintenance', 'Parts procurement', 'Regulatory compliance', 'Dedicated engineering team'],
    },
    {
      title: 'Aviation Training (CAR 147)',
      desc: 'Empowering the next generation of aviation professionals with state-of-the-art programs.',
      capabilities: ['Level III for Embraer & ATR', 'Level I & II allied training', 'Regulatory courses', 'Industry-current curriculum'],
    },
    {
      title: 'Aviation Consultancy',
      desc: 'Strategic guidance for aircraft acquisition, operations, and compliance.',
      capabilities: ['Acquisition & asset mgmt', 'Fleet analysis & research', 'Regulatory compliance', 'Operational efficiency advisory'],
    },
  ],

  // ─── EMS Capabilities ───
  emsCapabilities: [
    { name: 'Design & Engineering', desc: 'End-to-end product development' },
    { name: 'Manufacturing', desc: 'PCB assembly, box build, system integration' },
    { name: 'Testing & QA', desc: 'Compliance testing & reliability validation' },
    { name: 'Supply Chain', desc: 'Strategic sourcing & logistics' },
    { name: 'After-Sales', desc: 'Repair, maintenance & warranty' },
  ],

  // ─── Products ───
  products: [
    'Smart Energy Meters',
    'Smart Water Meters',
    'EV Chargers',
    'Room Chargers',
    'Defence RF Systems',
  ],

  // ─── Ongoing Projects ───
  ongoingProjects: [
    { name: '4× G+4 Residential Buildings', client: 'MES (Narangi Military Station)', value: '₹53 Cr' },
    { name: '48,893 DTC Meters — 6 Districts', client: 'HESCOM', value: '₹171 Cr' },
  ],

  // ─── Certifications ───
  certifications: [
    { name: 'DGCA CAR 145', desc: 'Indian Aviation Maintenance Approval' },
    { name: 'San Marino CAR 145', desc: 'International Maintenance Approval' },
    { name: 'ISO 9001:2015', desc: 'Quality Management System' },
    { name: 'CAR 147', desc: 'Aviation Maintenance Training Organization' },
  ],
};
