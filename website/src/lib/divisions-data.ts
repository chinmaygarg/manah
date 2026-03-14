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
  sectors: { name: string; image: string; description: string }[];
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
      "Manah Dynamics is the flagship EPC division of Manah Group, specializing in turnkey project execution for power transmission, renewable energy infrastructure, and large-scale civil works. With $27M in projects under execution and a growing pipeline, we are trusted by utilities, government agencies, and private developers across India.",
      "Our integrated capabilities span design engineering, procurement, construction, and commissioning — enabling single-point accountability and faster project delivery through DBFOOT, DBOOT, BOO, BOOT, and Investment project delivery models. Our expertise extends across Telecom, BESS/SCADA, Mining, Oil & Gas, Irrigation & Water, and Disaster Management sectors.",
    ],
    keyStats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "1,200+ MW", label: "Capacity Installed" },
      { value: "15+", label: "Regions Covered" },
      { value: "$27M", label: "Under Execution" },
      { value: "3,000+ km", label: "Transmission Lines" },
      { value: "99.2%", label: "Safety Record" },
    ],
    services: [
      { title: "Power Transmission & Distribution", description: "Design, supply, and construction of 66kV to 765kV overhead transmission lines, AIS/GIS substations, and smart grid infrastructure including BESS and SCADA systems." },
      { title: "Renewable Energy & Mining", description: "Utility-scale solar and wind farm EPC, hybrid power plants, and mining infrastructure with end-to-end project execution." },
      { title: "Telecom & Oil & Gas Infrastructure", description: "Telecom tower and network infrastructure, oil & gas pipeline construction, refinery allied works, and LNG terminal support." },
      { title: "Civil & Urban Infrastructure", description: "Roads, bridges, industrial buildings, irrigation & water management systems, and disaster management infrastructure projects." },
      { title: "Smart Metering & Technology", description: "DTC smart meter deployment, AMI infrastructure, and SCADA-based monitoring systems for utility modernization programs." },
      { title: "O&M Services & M&A", description: "Comprehensive operations and maintenance for power and generation assets, plus strategic mergers & acquisitions advisory." },
    ],
    sectors: [
      { name: "Power Transmission", image: "/images/sectors/power_transmission.png", description: "EHV/HV transmission lines and substation infrastructure across 15+ regions." },
      { name: "Renewable Energy", image: "/images/sectors/renewable_energy.png", description: "Utility-scale solar and wind farm EPC from design to grid interconnection." },
      { name: "Infrastructure", image: "/images/sectors/infrastructure.png", description: "Roads, bridges, and urban infrastructure built to international standards." },
      { name: "Industrial", image: "/images/sectors/manufacturing.png", description: "Industrial facilities and process plants with turnkey project delivery." },
    ],
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
      "Manah Aerospace is the aviation arm of Manah Group, delivering DGCA-certified business jet maintenance services specializing in light and midsize jets. Operating from our facility at Begumpet Airport, Hyderabad in partnership with AAI, and with an international partnership with Jet Aviation Dubai, we provide comprehensive MRO solutions across 4 locations.",
      "Our vision extends to expanding into Boeing and Airbus narrow-body and wide-body servicing. We hold DGCA CAR 145 and San Marino CAR 145 certifications, with CAR 147 approved training programs for aviation professionals. Our expansion roadmap targets Pune, Bangalore, Chennai, and Kolkata.",
    ],
    keyStats: [
      { value: "10", label: "Aircraft Serviced" },
      { value: "DGCA/San Marino", label: "Certifications" },
      { value: "Full Spectrum", label: "MRO Capabilities" },
      { value: "4", label: "MRO Locations" },
      { value: "CAR 147", label: "Training Approved" },
      { value: "4", label: "Expansion Cities" },
    ],
    services: [
      { title: "Aircraft Maintenance", description: "Customized business jet maintenance programs for light and midsize jets, including parts procurement, quality control, and airworthiness management." },
      { title: "Aviation Training (CAR 147)", description: "DGCA-approved Level III training for Embraer and ATR aircraft types, plus Level I & II foundational training programs for aviation professionals." },
      { title: "Aviation Consultancy", description: "Aircraft acquisition advisory, fleet analysis, regulatory compliance guidance, and strategic aviation planning for operators and investors." },
    ],
    sectors: [],
    certifications: ["DGCA CAR 145", "San Marino CAR 145", "ISO 9001:2015"],
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
      "Manah Green Energy is a wholly owned subsidiary of Manah Dynamics, pioneering green hydrogen production in India. With an MoU with the Government of Madhya Pradesh, we are establishing a hydrogen production plant at Bina on 350 acres near the BPCL Bina Refinery, targeting 18,000 MTPA of green hydrogen across 4 production phases.",
      "Leveraging ARB (Artificial Photosynthesis) technology in partnership with SoHHytec SA Switzerland, we represent the next generation of clean hydrogen production. Our $600M+ investment pipeline supports India's National Green Hydrogen Mission and Net Zero 2070 vision.",
    ],
    keyStats: [
      { value: "18,000 MTPA", label: "Green H₂ Target" },
      { value: "ARB", label: "Technology" },
      { value: "350", label: "Acres Near BPCL Bina" },
      { value: "4", label: "Production Phases" },
      { value: "$600M+", label: "Investment Pipeline" },
      { value: "1", label: "Production Site" },
    ],
    services: [
      { title: "Green Hydrogen Production", description: "Large-scale green hydrogen plants using renewable power — serving refineries, fertilizer plants, and industrial consumers." },
      { title: "Electrolyzer Manufacturing", description: "Assembly and integration of PEM and Alkaline electrolyzers with localized content meeting national and international regulatory standards." },
      { title: "Renewable Energy Parks", description: "Development of dedicated solar and wind parks for captive hydrogen production with grid optimization." },
      { title: "Hydrogen Storage & Transport", description: "Compressed and liquid hydrogen storage solutions, pipeline infrastructure, and tube trailer logistics." },
      { title: "Fuel Cell Solutions", description: "Hydrogen fuel cell systems for stationary power, material handling equipment, and commercial vehicle applications." },
      { title: "Carbon Advisory", description: "Carbon credit generation, ESG reporting support, and sustainability roadmap development for industrial clients." },
    ],
    sectors: [
      { name: "Green Hydrogen", image: "/images/sectors/green_hydrogen.png", description: "Large-scale green hydrogen production powering net-zero ambitions." },
      { name: "Renewable Energy", image: "/images/sectors/renewable_energy.png", description: "Dedicated solar and wind parks for captive hydrogen generation." },
      { name: "Industrial Decarbonization", image: "/images/sectors/manufacturing.png", description: "Decarbonizing steel, chemicals, and heavy industry with clean energy." },
      { name: "Clean Transport", image: "/images/sectors/transportation.png", description: "Hydrogen fuel cell solutions for commercial vehicles and logistics." },
    ],
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
      "Manah Technology & Manufacturing is our electronics manufacturing services (EMS) division, operating from a 30,000 sq ft facility in Cherlapally, Hyderabad. We deliver high-reliability electronic assemblies for defence, aerospace, telecom, and industrial sectors, specializing in Smart Energy Meters, Smart Water Meters, EV Chargers, Room Chargers, and Defense RF Systems.",
      "As a strategic manufacturing leader, we support self-reliance goals by manufacturing mission-critical electronic systems domestically. Our quality management system meets the stringent requirements of defence procurement, including MIL-STD and JSS standards.",
    ],
    keyStats: [
      { value: "8+", label: "SMT Lines" },
      { value: "1M+", label: "Products/Year" },
      { value: "ISO 9001", label: "Quality Standard" },
      { value: "30,000 sq ft", label: "Factory Floor" },
      { value: "99.5%", label: "First Pass Yield" },
      { value: "100+", label: "Active SKUs" },
    ],
    services: [
      { title: "Design & Engineering", description: "Product design, DFM/DFA analysis, schematic design, PCB layout, firmware development, and prototype rapid-turn for new product introduction." },
      { title: "Manufacturing (PCB & Box Build)", description: "High-speed SMT assembly, through-hole soldering, complete box build and system integration with wire harnessing and enclosure assembly." },
      { title: "Testing & Quality Assurance", description: "In-circuit testing (ICT), functional testing, burn-in, environmental stress screening, and EMI/EMC compliance testing." },
      { title: "Defence Electronics", description: "Mission-critical electronic assemblies meeting MIL-STD, JSS, and LCSO quality standards for Defence RF Systems and tactical communication." },
      { title: "Supply Chain Management", description: "End-to-end component sourcing, incoming inspection, moisture sensitivity management, and vendor lifecycle management." },
      { title: "After-Sales Services", description: "Warranty management, repair and refurbishment, spare parts provisioning, and field support for deployed systems." },
    ],
    sectors: [
      { name: "Defence Electronics", image: "/images/sectors/defence_electronics.png", description: "Mission-critical assemblies meeting MIL-STD and JSS quality standards." },
      { name: "Aerospace Systems", image: "/images/sectors/aviation.png", description: "High-reliability avionics and flight system electronics manufacturing." },
      { name: "Telecom Equipment", image: "/images/sectors/telecom_equipment.png", description: "PCB assemblies and system integration for telecom infrastructure." },
      { name: "Industrial IoT", image: "/images/sectors/industrial_iot.png", description: "Smart sensors, edge devices, and industrial automation electronics." },
    ],
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
    sectors: [
      { name: "Infrastructure", image: "/images/sectors/infrastructure.png", description: "Direct equity in power, roads, logistics, and urban development." },
      { name: "Energy & Cleantech", image: "/images/sectors/renewable_energy.png", description: "Capital allocation for renewables, hydrogen, and battery storage." },
      { name: "Technology & Defence", image: "/images/sectors/defence_electronics.png", description: "Growth-stage investments in deep tech and defence technology." },
      { name: "Real Estate", image: "/images/sectors/real_estate.png", description: "Strategic positions in commercial and mixed-use developments." },
    ],
    certifications: ["SEBI Registered", "DPIIT Recognized", "ISO 9001:2015", "ESG Compliant"],
    cta: { text: "Explore Opportunities", href: "/contact" },
  },
};
