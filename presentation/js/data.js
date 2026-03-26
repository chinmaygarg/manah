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
    { value: 5, suffix: '', label: 'Divisions', icon: '🏢' },
    { value: 1000, suffix: '+', label: 'Team Members', icon: '👥' },
    { value: 15, suffix: '+', label: 'States Active', icon: '📍' },
  ],

  // ─── Subsidiaries ───
  subsidiaries: [
    {
      name: 'Manah Dynamics',
      focus: 'Projects & Infrastructure, Technology & Manufacturing',
      color: '#1E3A5F',
      icon: '⚡',
    },
    {
      name: 'Manah Aerospace',
      focus: 'Aviation MRO, Training, Consultancy',
      color: '#0D9488',
      icon: '✈️',
    },
    {
      name: 'Manah Green Energy',
      focus: 'Green Hydrogen Production',
      color: '#16A34A',
      icon: '🌱',
    },
    {
      name: 'Manah Investments',
      focus: 'Strategic Capital Deployment',
      color: '#D97706',
      icon: '📊',
    },
    {
      name: 'Manah Steel & Engineering',
      focus: 'Steel & Engineering Services',
      color: '#78716C',
      icon: '🔧',
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

  // ─── Pipeline Breakdown ───
  pipeline: [
    { label: 'EPC Bids', value: 10500, color: '#C8A96E' },
    { label: 'Investments', value: 8500, color: '#5B8CC5' },
    { label: 'HAM Projects', value: 11500, color: '#0D9488' },
    { label: 'Under Execution', value: 2240, color: '#D97706' },
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

  // ─── MRO Locations ───
  mroLocations: {
    current: [
      { name: 'Hyderabad', lat: 17.385, lng: 78.4867 },
      { name: 'Koppal', lat: 15.3468, lng: 76.1549 },
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
      { name: 'Bhubaneshwar', lat: 20.2961, lng: 85.8245 },
    ],
    expansion: [
      { name: 'Pune', lat: 18.5204, lng: 73.8567 },
      { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
      { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    ],
  },

  // ─── Green Hydrogen Milestones ───
  greenHydrogen: [
    { milestone: 'MoU & Agreement', detail: 'Signed with Government of Madhya Pradesh for Hydrogen Production Plant at Bina' },
    { milestone: 'Technology Partnership', detail: 'Strategic partnership with SoHHytec SA, Switzerland for ARB technology' },
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

  // ─── Partners ───
  partners: [
    'KELTRON', 'C-DAC', 'BSNL', 'SoHHytec', 'PowerGrid',
    'NPCIL', 'PFC', 'REC', 'EIL', 'SECI',
    'AP Transco', 'MES', 'TCIL', 'APSFL', 'NBCC',
    'PVR', 'Generic', 'Vere Max', 'Cypress', 'GRIL',
  ],

  partnerLogos: {
    'KELTRON': 'keltron.png',
    'C-DAC': 'cdac.png',
    'BSNL': 'bsnl.png',
    'SoHHytec': 'sohhytec.png',
    'PowerGrid': 'powergrid.png',
    'SECI': 'seci.png',
    'AP Transco': 'ap-transco.png',
    'MES': 'mes.png',
    'TCIL': 'tcil.png',
    'APSFL': 'apsfl.png',
    'TG Transco': 'tgtransco.png',
  },

  // ─── Leaders ───
  leaders: [
    {
      name: 'Mr. Prem Kumar Pandey',
      title: 'Managing Director',
      org: 'Manah Holdings Pvt Ltd',
      photo: 'prem_kumar.jpg',
      bio: 'IT graduate with extensive global experience. Led major power transmission initiatives and built Electric Buses SBU to profitability.',
    },
    {
      name: 'Cdr. Pravin S. Dixit (Retd.)',
      title: 'Director',
      org: 'Manah Dynamics Pvt Ltd',
      photo: 'pravin_dixit.jpg',
      bio: 'Retired Navy Commander, IIT Kanpur alumnus. 41+ years of leadership. Certified Independent Director & ESG Expert.',
    },
    {
      name: 'Col. L S N Murty (Retd.)',
      title: 'CEO',
      org: 'Manah Aerospace & Engineering',
      photo: 'lsn_murty.jpg',
      bio: '39+ years military and civil aviation experience. Drives safe, efficient, and sustainable aerospace operations.',
    },
    {
      name: 'Mr. Mohendra Kumar Pati',
      title: 'Director, Tech & Manufacturing',
      org: 'Manah Dynamics Pvt Ltd',
      photo: 'mohendra_pati.jpg',
      bio: '15+ years defence electronics experience. Expertise in R&D, tactical communication, and Electronic Warfare systems.',
    },
  ],

  // ─── Future Expansions ───
  expansions: [
    { title: 'Telecom Sector', desc: 'Towers, BharatNet, Fiber Network', icon: '📡' },
    { title: 'Green Hydrogen (GH₂)', desc: 'Production & distribution', icon: '🌿' },
    { title: 'Mergers & Acquisitions', desc: 'Strategic growth via M&A', icon: '🤝' },
    { title: 'EHV Infrastructure', desc: 'Lines, substations, cables', icon: '⚡' },
    { title: 'Global Oil & Gas', desc: 'International EPC expansion', icon: '🌍' },
    { title: 'Smart Metering', desc: 'Energy & water meters', icon: '📊' },
    { title: 'Civil Infrastructure', desc: 'Roads, buildings, tunnels', icon: '🏗️' },
    { title: 'OEM Collaborations', desc: 'Advanced tech integration', icon: '🔬' },
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
    { city: 'Hyderabad', type: 'Corporate HQ', address: '5th Floor, Trendz Platina, Madhapur' },
    { city: 'Jaipur', type: 'Regional Office', address: 'Rajasthan Operations' },
    { city: 'New Delhi (Gurugram)', type: 'Regional Office', address: 'NCR Operations' },
    { city: 'Bangalore', type: 'Regional Office', address: 'South India Operations' },
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
