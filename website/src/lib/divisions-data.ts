/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Division Detail Data
   Complete content for each business division page
   ═══════════════════════════════════════════════════════════ */

export interface DivisionDetail {
  id: string;
  name: string;
  tagline: string;
  heroDescription: string;
  color: string;
  gradient: string;
  overview: string[];
  keyStats: { value: string; label: string }[];
  services: { title: string; description: string }[];
  sectors: string[];
  certifications: string[];
  cta: { text: string; href: string };
}

export const DIVISION_DETAILS: Record<string, DivisionDetail> = {
  dynamics: {
    id: "dynamics",
    name: "Manah Dynamics",
    tagline: "Projects & Infrastructure",
    heroDescription:
      "Delivering large-scale EPC solutions across power transmission, renewable energy, and civil infrastructure — transforming physical infrastructure with engineering excellence.",
    color: "#1E3A5F",
    gradient: "from-[#1E3A5F] to-manah-navy",
    overview: [
      "Manah Dynamics is the flagship EPC division of Manah Group, specializing in turnkey project execution for power transmission, renewable energy infrastructure, and large-scale civil works. With a portfolio exceeding $300M in project value, we are trusted by utilities, government agencies, and private developers worldwide.",
      "Our integrated capabilities span design engineering, procurement, construction, and commissioning — enabling single-point accountability and faster project delivery. We operate across 15+ regions with a workforce trained in the latest safety and quality standards.",
    ],
    keyStats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "1,200+ MW", label: "Capacity Installed" },
      { value: "15+", label: "Regions Covered" },
      { value: "$300M+", label: "Portfolio Value" },
      { value: "3,000+ km", label: "Transmission Lines" },
      { value: "99.2%", label: "Safety Record" },
    ],
    services: [
      { title: "EHV/HV Transmission Lines", description: "Design, supply, and construction of 66kV to 765kV overhead transmission lines including tower fabrication and stringing." },
      { title: "Substation Construction", description: "Turnkey EPC for AIS and GIS substations up to 400kV including civil, electrical, and control & relay panel works." },
      { title: "Solar EPC", description: "Utility-scale and distributed solar power plants — from site assessment and design to construction and grid interconnection." },
      { title: "Wind Farm Development", description: "End-to-end wind energy project execution including micrositing, foundation, erection, and commissioning." },
      { title: "Civil Infrastructure", description: "Roads, bridges, industrial buildings, and urban infrastructure projects with focus on quality and timely delivery." },
      { title: "O&M Services", description: "Comprehensive operations and maintenance for power transmission and generation assets across all operating regions." },
    ],
    sectors: ["Power Transmission", "Renewable Energy", "Infrastructure", "Industrial"],
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "CEA Compliant"],
    cta: { text: "View Projects", href: "/projects?division=dynamics" },
  },

  aerospace: {
    id: "aerospace",
    name: "Manah Aerospace",
    tagline: "Aviation & MRO",
    heroDescription:
      "Comprehensive aviation solutions encompassing aircraft maintenance, repair, and overhaul services — ensuring safety, reliability, and airworthiness to global standards.",
    color: "#0D9488",
    gradient: "from-[#0D9488] to-manah-navy",
    overview: [
      "Manah Aerospace is the aviation arm of Manah Group, delivering full-spectrum MRO (Maintenance, Repair & Overhaul) services for commercial, defence, and general aviation aircraft. Our DGCA-approved facility features state-of-the-art hangars, component workshops, and NDT capabilities.",
      "We are committed to the highest standards of airworthiness and safety, operating under rigorous quality management systems aligned with DGCA CAR 145 and EASA Part 145 requirements. Our team of licensed AMEs and engineers brings decades of combined experience across multiple aircraft types.",
    ],
    keyStats: [
      { value: "200+", label: "Aircraft Serviced" },
      { value: "DGCA/EASA", label: "Certifications" },
      { value: "Full Spectrum", label: "MRO Capabilities" },
      { value: "50+", label: "Licensed Engineers" },
      { value: "24/7", label: "AOG Support" },
      { value: "15+", label: "Aircraft Types" },
    ],
    services: [
      { title: "Line Maintenance", description: "On-wing maintenance and troubleshooting at airports across our network — minimizing aircraft downtime and ensuring schedule integrity." },
      { title: "Base Maintenance", description: "Heavy checks (C & D checks), structural repairs, and major modifications at our hangars with full NDT capabilities." },
      { title: "Component MRO", description: "Repair and overhaul of avionics, hydraulics, pneumatics, and mechanical components with test bench validation." },
      { title: "Engine Services", description: "Engine boroscope inspections, quick engine change support, and engine preservation services." },
      { title: "Interiors & Modifications", description: "Cabin refurbishment, seat upholstery, IFE installations, and STC-based modifications." },
      { title: "AOG & Technical Support", description: "24/7 Aircraft-on-Ground support with mobile repair teams and global parts sourcing." },
    ],
    sectors: ["Commercial Aviation", "Defence Aviation", "General Aviation", "Helicopter MRO"],
    certifications: ["DGCA CAR 145", "EASA Part 145", "ISO 9001:2015", "AS9110 Rev C"],
    cta: { text: "Explore Capabilities", href: "/capabilities" },
  },

  "green-energy": {
    id: "green-energy",
    name: "Green Energy",
    tagline: "Hydrogen & Renewables",
    heroDescription:
      "Pioneering the green hydrogen revolution — from electrolyzer manufacturing to large-scale production facilities, powering global net-zero ambitions.",
    color: "#16A34A",
    gradient: "from-[#16A34A] to-manah-navy",
    overview: [
      "Manah Green Energy is at the forefront of the global clean energy transition, specializing in green hydrogen production, electrolyzer technology, and renewable energy infrastructure. We are building the critical infrastructure needed to decarbonize hard-to-abate sectors like steel, chemicals, and heavy transport.",
      "Our integrated approach covers the entire green hydrogen value chain — from electrolyzer manufacturing and renewable power generation to hydrogen compression, storage, and distribution. We partner with global technology leaders to bring proven solutions adapted for regional conditions.",
    ],
    keyStats: [
      { value: "500 TPD", label: "Green H₂ Capacity" },
      { value: "PEM/AEL", label: "Electrolyzer Tech" },
      { value: "100K+ Tons", label: "Carbon Offset" },
      { value: "200 MW", label: "Renewable Capacity" },
      { value: "$150M+", label: "Investment Pipeline" },
      { value: "3", label: "Production Facilities" },
    ],
    services: [
      { title: "Green Hydrogen Production", description: "Large-scale green hydrogen plants using renewable power — serving refineries, fertilizer plants, and industrial consumers." },
      { title: "Electrolyzer Manufacturing", description: "Assembly and integration of PEM and Alkaline electrolyzers with localized content meeting national and international regulatory standards." },
      { title: "Renewable Energy Parks", description: "Development of dedicated solar and wind parks for captive hydrogen production with grid optimization." },
      { title: "Hydrogen Storage & Transport", description: "Compressed and liquid hydrogen storage solutions, pipeline infrastructure, and tube trailer logistics." },
      { title: "Fuel Cell Solutions", description: "Hydrogen fuel cell systems for stationary power, material handling equipment, and commercial vehicle applications." },
      { title: "Carbon Advisory", description: "Carbon credit generation, ESG reporting support, and sustainability roadmap development for industrial clients." },
    ],
    sectors: ["Green Hydrogen", "Renewable Energy", "Industrial Decarbonization", "Clean Transport"],
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "BIS Standards", "MNRE Approved"],
    cta: { text: "Learn More", href: "/sustainability" },
  },

  technology: {
    id: "technology",
    name: "Tech & Manufacturing",
    tagline: "Electronics Manufacturing Services",
    heroDescription:
      "State-of-the-art electronics manufacturing with SMT lines, precision engineering, and defence-grade quality — powering strategic manufacturing across critical sectors.",
    color: "#7C3AED",
    gradient: "from-[#7C3AED] to-manah-navy",
    overview: [
      "Manah Technology & Manufacturing is our electronics manufacturing services (EMS) division, delivering high-reliability electronic assemblies for defence, aerospace, telecom, and industrial sectors. Our facility features advanced SMT lines, through-hole assembly, conformal coating, and comprehensive testing capabilities.",
      "As a strategic manufacturing leader, we support self-reliance goals by manufacturing mission-critical electronic systems domestically. Our quality management system meets the stringent requirements of defence procurement, including MIL-STD and JSS standards.",
    ],
    keyStats: [
      { value: "8+", label: "SMT Lines" },
      { value: "1M+", label: "Products/Year" },
      { value: "ISO 9001", label: "Quality Standard" },
      { value: "50,000 sq ft", label: "Factory Floor" },
      { value: "99.5%", label: "First Pass Yield" },
      { value: "100+", label: "Active SKUs" },
    ],
    services: [
      { title: "SMT Assembly", description: "High-speed surface mount technology with automatic optical inspection (AOI) and X-ray inspection for BGA/QFN packages." },
      { title: "Through-Hole Assembly", description: "Wave soldering and selective soldering for mixed-technology PCBAs with robust mechanical connections." },
      { title: "Box Build & System Integration", description: "Complete system assembly including wire harnessing, enclosure integration, firmware loading, and final testing." },
      { title: "Defence Electronics", description: "Mission-critical electronic assemblies meeting MIL-STD, JSS, and LCSO quality standards for defence programs worldwide." },
      { title: "Testing & Validation", description: "In-circuit testing (ICT), functional testing, burn-in, environmental stress screening, and EMI/EMC compliance testing." },
      { title: "Design Support", description: "DFM/DFA analysis, component engineering, prototype rapid-turn, and NPI (New Product Introduction) support." },
    ],
    sectors: ["Defence Electronics", "Aerospace Systems", "Telecom Equipment", "Industrial IoT"],
    certifications: ["ISO 9001:2015", "IPC-A-610 Class 3", "MIL-STD-883", "BIS License"],
    cta: { text: "Request Quote", href: "/contact" },
  },

  investments: {
    id: "investments",
    name: "Manah Investments",
    tagline: "Strategic Investments",
    heroDescription:
      "Deploying strategic capital across infrastructure, energy, and technology ventures — identifying high-impact opportunities aligned with global growth trajectories and strategic priorities.",
    color: "#D97706",
    gradient: "from-[#D97706] to-manah-navy",
    overview: [
      "Manah Investments is the strategic investment arm of Manah Group, focused on identifying, incubating, and scaling high-potential ventures across infrastructure, energy, and technology sectors. With a portfolio exceeding $500M, we partner with visionary entrepreneurs and institutions to build enterprises that deliver both financial returns and lasting impact.",
      "Our investment philosophy is rooted in domain expertise — leveraging Manah Group's deep operational knowledge across EPC, aviation, green energy, and manufacturing to evaluate opportunities with an operator's eye. We go beyond capital, providing portfolio companies with strategic guidance, industry networks, and execution support.",
    ],
    keyStats: [
      { value: "$500M+", label: "Portfolio Value" },
      { value: "15+", label: "Active Ventures" },
      { value: "6+", label: "Sectors Covered" },
      { value: "3x", label: "Avg. Return Multiple" },
      { value: "8+", label: "Strategic Partners" },
      { value: "$2B+", label: "Co-Investment Mobilized" },
    ],
    services: [
      { title: "Infrastructure Private Equity", description: "Direct equity investments in infrastructure projects including power, roads, logistics, and urban development across emerging and developed markets." },
      { title: "Energy Transition Fund", description: "Dedicated capital allocation for renewable energy, green hydrogen, battery storage, and clean mobility ventures." },
      { title: "Technology Ventures", description: "Early to growth-stage investments in deep tech, industrial IoT, defence technology, and advanced manufacturing startups." },
      { title: "Real Estate Development", description: "Strategic investments in commercial, industrial, and mixed-use real estate projects in high-growth corridors." },
      { title: "Joint Ventures & Partnerships", description: "Structured JVs with global technology partners and industry leaders for market entry and capability building." },
      { title: "Advisory & Asset Management", description: "Investment advisory services and fund management for institutional investors seeking exposure to global infrastructure growth." },
    ],
    sectors: ["Infrastructure", "Energy & Cleantech", "Technology & Defence", "Real Estate"],
    certifications: ["SEBI Registered", "DPIIT Recognized", "ISO 9001:2015", "ESG Compliant"],
    cta: { text: "Explore Opportunities", href: "/contact" },
  },
};
