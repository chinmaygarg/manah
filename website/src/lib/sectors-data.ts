/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Sector Detail Data
   Complete content for each industry sector page
   ═══════════════════════════════════════════════════════════ */

export interface SectorProject {
  title: string;
  location: string;
  value: string;
  description: string;
}

export interface SectorDetail {
  id: string;
  title: string;
  tagline: string;
  heroDescription: string;
  color: string;
  image: string;
  overview: string[];
  keyStats: { value: string; label: string }[];
  services: { title: string; description: string }[];
  projects: SectorProject[];
  process: { step: string; title: string; description: string }[];
  relatedDivisions: string[];
}

export const SECTOR_DETAILS: Record<string, SectorDetail> = {
  "power-transmission": {
    id: "power-transmission",
    title: "Power Transmission",
    tagline: "Oil, Gas & Energy",
    heroDescription:
      "End-to-end EPC solutions for high-voltage power transmission infrastructure — from 66kV distribution networks to 765kV EHV transmission corridors powering national grids worldwide.",
    color: "#1E3A5F",
    image: "/images/sectors/power_transmission.png",
    overview: [
      "Manah Group delivers comprehensive power transmission solutions spanning the full spectrum of voltage levels — from 66kV distribution networks to ultra-high-voltage 765kV transmission corridors. Our integrated EPC approach covers route surveying, tower design and fabrication, foundation engineering, stringing, and commissioning.",
      "With over 3,000 km of transmission lines constructed and multiple substation projects delivered, we are a trusted partner for national utilities, state distribution companies, and independent power producers. Our projects form the backbone of electricity supply to millions of homes and businesses.",
    ],
    keyStats: [
      { value: "3,000+ km", label: "Lines Constructed" },
      { value: "765 kV", label: "Maximum Voltage" },
      { value: "50+", label: "Substations Built" },
      { value: "15+", label: "States Covered" },
      { value: "99.8%", label: "Grid Availability" },
      { value: "5,000+", label: "Towers Erected" },
    ],
    services: [
      { title: "EHV Transmission Lines", description: "Design, supply, and construction of 220kV to 765kV extra-high-voltage transmission lines including lattice tower fabrication, foundation works, and conductor stringing." },
      { title: "HV Distribution Lines", description: "66kV to 132kV high-voltage distribution infrastructure for urban and rural electrification programs with minimal right-of-way impact." },
      { title: "AIS Substations", description: "Turnkey air-insulated switchgear substations up to 400kV with complete civil, electrical, protection, and SCADA systems." },
      { title: "GIS Substations", description: "Compact gas-insulated switchgear substations for space-constrained urban and industrial environments with superior reliability." },
      { title: "Underground Cable Systems", description: "XLPE and fluid-filled underground cable systems for critical urban corridors where overhead lines are not feasible." },
      { title: "Grid Modernization", description: "Smart grid upgrades including FACTS devices, reactive power compensation, advanced metering infrastructure, and grid automation." },
    ],
    projects: [
      { title: "765kV Transmission Corridor", location: "Andhra Pradesh, India", value: "$45M", description: "Double-circuit 765kV transmission line spanning 180 km connecting major generation hubs to load centers." },
      { title: "400kV GIS Substation", location: "Telangana, India", value: "$28M", description: "State-of-the-art gas-insulated substation serving as a critical grid interconnection point for renewable energy integration." },
      { title: "220kV Underground Cable", location: "Hyderabad, India", value: "$15M", description: "12 km XLPE underground cable system for high-density urban area power supply enhancement." },
    ],
    process: [
      { step: "01", title: "Route Survey & Planning", description: "Topographical survey, environmental assessment, right-of-way acquisition, and detailed route optimization using GIS mapping." },
      { step: "02", title: "Engineering & Design", description: "Tower design, foundation engineering, conductor selection, and protection system design with advanced simulation tools." },
      { step: "03", title: "Procurement & Fabrication", description: "Global sourcing of conductors, insulators, and hardware with in-house tower fabrication and galvanizing facilities." },
      { step: "04", title: "Construction & Commissioning", description: "Foundation casting, tower erection, stringing, testing, and energization with real-time progress monitoring." },
    ],
    relatedDivisions: ["Manah Dynamics"],
  },

  "renewable-energy": {
    id: "renewable-energy",
    title: "Renewable Energy",
    tagline: "Power & Renewables",
    heroDescription:
      "Utility-scale solar parks, wind farms, and hybrid renewable energy solutions — from feasibility studies through construction to long-term operations and maintenance.",
    color: "#F59E0B",
    image: "/images/sectors/renewable_energy.png",
    overview: [
      "Manah Group is accelerating the global energy transition through large-scale renewable energy project development and EPC execution. Our portfolio spans utility-scale solar parks, onshore wind farms, hybrid power plants, and energy storage systems — delivering clean energy solutions that meet ambitious carbon reduction targets.",
      "We operate across the full project lifecycle: from resource assessment and land acquisition through engineering, procurement, and construction to long-term O&M. Our deep understanding of grid integration challenges ensures that every megawatt we install delivers reliable, bankable power.",
    ],
    keyStats: [
      { value: "1,200+ MW", label: "Capacity Installed" },
      { value: "15+", label: "Solar Parks" },
      { value: "500+ MW", label: "Wind Capacity" },
      { value: "100K+ Tons", label: "CO₂ Avoided/Year" },
      { value: "25+ Years", label: "Asset Life" },
      { value: "99.5%", label: "Plant Availability" },
    ],
    services: [
      { title: "Solar EPC (Utility Scale)", description: "Complete EPC for ground-mounted solar parks from 10 MW to 500 MW+ including single-axis trackers, inverter stations, and pooling substations." },
      { title: "Wind Farm Development", description: "Turnkey onshore wind projects including micrositing, foundation design, turbine erection, and electrical balance of plant." },
      { title: "Hybrid Power Plants", description: "Co-located solar-wind-storage hybrid plants optimizing land use, grid connectivity, and capacity utilization factors." },
      { title: "Energy Storage Systems", description: "Battery energy storage (BESS) solutions for renewable firming, peak shaving, and grid ancillary services." },
      { title: "Rooftop & C&I Solar", description: "Commercial and industrial rooftop solar installations with net metering, wheeling arrangements, and PPA structures." },
      { title: "O&M Services", description: "Comprehensive plant operations, predictive maintenance, performance monitoring, and vegetation management for renewable assets." },
    ],
    projects: [
      { title: "300 MW Solar Park", location: "Rajasthan, India", value: "$120M", description: "Utility-scale solar park with single-axis trackers and 132kV pooling substation, powering 150,000 homes annually." },
      { title: "150 MW Wind Farm", location: "Tamil Nadu, India", value: "$85M", description: "Onshore wind farm with latest-generation turbines achieving 35% capacity utilization factor." },
      { title: "50 MW Hybrid Plant", location: "Karnataka, India", value: "$40M", description: "Co-located solar-wind hybrid with 20 MWh battery storage for round-the-clock renewable power supply." },
    ],
    process: [
      { step: "01", title: "Resource Assessment", description: "Solar irradiance measurement, wind data analysis, land survey, and grid connectivity study with bankability reports." },
      { step: "02", title: "Engineering & Permitting", description: "Detailed engineering design, environmental clearances, grid connectivity approvals, and land acquisition support." },
      { step: "03", title: "EPC Execution", description: "Civil works, module/turbine installation, electrical BOS, substation construction, and grid synchronization." },
      { step: "04", title: "O&M & Monitoring", description: "24/7 remote monitoring, preventive maintenance, performance analytics, and warranty management." },
    ],
    relatedDivisions: ["Manah Dynamics", "Green Energy"],
  },

  infrastructure: {
    id: "infrastructure",
    title: "Infrastructure",
    tagline: "Urban Infrastructure",
    heroDescription:
      "Building smart cities with modern utilities, drainage systems, and sustainable urban environments — connecting communities through world-class transportation and civic infrastructure.",
    color: "#6B7280",
    image: "/images/sectors/infrastructure.png",
    overview: [
      "Manah Group executes large-scale civil infrastructure projects that form the foundation of modern economies. From national highways and urban road networks to industrial parks and commercial complexes, our construction capabilities deliver projects of national significance on time and within budget.",
      "Our infrastructure division combines advanced engineering with proven construction methodologies. We deploy modern equipment fleets, digital project management tools, and stringent safety protocols to deliver quality infrastructure that serves communities for decades. Every project we undertake is designed to withstand the test of time.",
    ],
    keyStats: [
      { value: "500+ km", label: "Roads Constructed" },
      { value: "25+", label: "Bridges Built" },
      { value: "2M+ sq ft", label: "Buildings Delivered" },
      { value: "10+", label: "Smart City Projects" },
      { value: "15,000+", label: "Workers Deployed" },
      { value: "Zero", label: "Major Safety Incidents" },
    ],
    services: [
      { title: "Highway & Expressway Construction", description: "Multi-lane highway construction with bituminous and concrete pavements, toll plazas, service roads, and intelligent transportation systems." },
      { title: "Bridge & Flyover Engineering", description: "Reinforced concrete and steel bridges, elevated corridors, grade separators, and pedestrian overpasses with seismic-resilient design." },
      { title: "Urban Development", description: "Smart city infrastructure including underground utilities, stormwater drainage, streetscaping, and public space development." },
      { title: "Industrial & Commercial Construction", description: "Pre-engineered buildings, warehouses, data center shells, manufacturing facilities, and commercial complexes." },
      { title: "Water & Sewerage Infrastructure", description: "Water treatment plants, sewage treatment facilities, pipeline networks, and pumping stations for municipal utilities." },
      { title: "Railway & Metro Infrastructure", description: "Station buildings, viaducts, depot construction, and allied infrastructure for metro rail and railway projects." },
    ],
    projects: [
      { title: "4-Lane National Highway", location: "Telangana, India", value: "$65M", description: "120 km four-lane divided highway with 8 bridges, 3 interchanges, and full intelligent transportation system." },
      { title: "Smart City Infrastructure", location: "Visakhapatnam, India", value: "$35M", description: "Comprehensive urban infrastructure upgrade including underground utilities, LED lighting, and smart parking." },
      { title: "Industrial Park Development", location: "Andhra Pradesh, India", value: "$22M", description: "500-acre industrial park with internal roads, water treatment, power distribution, and common effluent treatment." },
    ],
    process: [
      { step: "01", title: "Survey & Investigation", description: "Geotechnical investigation, topographical survey, traffic study, and environmental impact assessment." },
      { step: "02", title: "Design & Engineering", description: "Structural design, pavement engineering, hydraulic analysis, and utility coordination with BIM modeling." },
      { step: "03", title: "Construction Execution", description: "Earthwork, foundation, superstructure, finishing, and quality control with real-time progress dashboards." },
      { step: "04", title: "Handover & Maintenance", description: "Completion testing, snag rectification, documentation, and defect liability period maintenance." },
    ],
    relatedDivisions: ["Manah Dynamics"],
  },

  defence: {
    id: "defence",
    title: "Defence Electronics",
    tagline: "Advanced Technology",
    heroDescription:
      "Mission-critical electronic systems for modern defence forces — from tactical communication equipment and radar sub-systems to advanced electronic warfare solutions meeting global military standards.",
    color: "#059669",
    image: "/images/sectors/defence_electronics.png",
    overview: [
      "Manah Group manufactures and integrates mission-critical electronic systems for armed forces worldwide. Our defence electronics portfolio spans tactical communication systems, radar sub-assemblies, electronic warfare equipment, surveillance systems, and weapon electronics — all manufactured to the most stringent military quality standards.",
      "As a licensed defence manufacturer, we contribute to national self-reliance objectives by indigenizing critical electronic sub-systems. Our facility is equipped with classified work areas, MIL-STD testing capabilities, and secure data handling infrastructure to support defence programs of the highest sensitivity.",
    ],
    keyStats: [
      { value: "200+", label: "Systems Delivered" },
      { value: "MIL-STD", label: "Quality Standards" },
      { value: "15+", label: "Defence Programs" },
      { value: "50+", label: "Defence Engineers" },
      { value: "DGQA", label: "Approved Vendor" },
      { value: "100%", label: "Indigenous Content" },
    ],
    services: [
      { title: "Tactical Communication Systems", description: "Software-defined radios, tactical switches, HF/VHF/UHF transceivers, and encrypted communication equipment for land, air, and naval forces." },
      { title: "Radar Sub-Systems", description: "Radar receiver modules, signal processing units, antenna control systems, and radar data processing for surveillance and tracking radar programs." },
      { title: "Electronic Warfare", description: "ECM/ECCM systems, signal intelligence receivers, direction finding equipment, and RF jamming systems for multi-domain warfare." },
      { title: "Surveillance & Reconnaissance", description: "Electro-optical systems, thermal imaging assemblies, border surveillance electronics, and unmanned system payloads." },
      { title: "Weapon Electronics", description: "Fuze electronics, guidance system components, fire control computers, and weapon interface units meeting MIL-STD-1316 standards." },
      { title: "System Integration & Testing", description: "Rack-level system integration, environmental qualification testing (MIL-STD-810), EMI/EMC testing, and acceptance test procedures." },
    ],
    projects: [
      { title: "Tactical Radio Program", location: "Indian Armed Forces", value: "Classified", description: "Indigenous software-defined radio platform for tri-service tactical communication modernization program." },
      { title: "Naval Radar Sub-System", location: "Indian Navy", value: "$12M", description: "Receiver and signal processing modules for next-generation naval surveillance radar deployed on frontline warships." },
      { title: "Border Surveillance System", location: "BSF, India", value: "$8M", description: "Integrated surveillance electronics including thermal cameras, radar feeds, and command & control displays." },
    ],
    process: [
      { step: "01", title: "Requirements Analysis", description: "QR/GSQR analysis, compliance matrix preparation, and technical proposal development meeting defence procurement standards." },
      { step: "02", title: "Design & Prototyping", description: "Schematic design, PCB layout, firmware development, and prototype fabrication with DPR/DPT submissions." },
      { step: "03", title: "Qualification Testing", description: "Environmental testing per MIL-STD-810, EMI/EMC per MIL-STD-461, and reliability testing per MIL-HDBK-217." },
      { step: "04", title: "Production & Delivery", description: "Series production with in-process inspection, final acceptance testing, DGQA clearance, and depot-level support documentation." },
    ],
    relatedDivisions: ["Tech & Manufacturing"],
  },

  aviation: {
    id: "aviation",
    title: "Aviation",
    tagline: "Transportation",
    heroDescription:
      "Comprehensive aircraft MRO services, airport infrastructure development, and aviation support systems — ensuring airworthiness, safety, and operational excellence across civil and defence aviation.",
    color: "#0D9488",
    image: "/images/sectors/aviation.png",
    overview: [
      "Manah Group operates a DGCA-approved MRO facility providing comprehensive maintenance, repair, and overhaul services for commercial, defence, and general aviation aircraft. Our capabilities span line maintenance, base maintenance, component overhaul, and specialized modifications — supporting fleet operators in maximizing aircraft availability.",
      "Beyond MRO, our aviation sector expertise extends to airport infrastructure development, ground support equipment supply, and aviation training solutions. We partner with OEMs, airlines, and military operators to deliver lifecycle support that keeps fleets flying safely and efficiently.",
    ],
    keyStats: [
      { value: "200+", label: "Aircraft Serviced" },
      { value: "DGCA/EASA", label: "Certifications" },
      { value: "15+", label: "Aircraft Types" },
      { value: "24/7", label: "AOG Response" },
      { value: "50+", label: "Licensed AMEs" },
      { value: "99.7%", label: "Dispatch Reliability" },
    ],
    services: [
      { title: "Line Maintenance", description: "Daily and transit checks, pre-flight inspections, troubleshooting, and defect rectification at airports across our network." },
      { title: "Base Maintenance", description: "C-checks, D-checks, structural inspections, corrosion treatment, and major modifications in our hangar facility." },
      { title: "Component MRO", description: "Repair and overhaul of avionics, hydraulic actuators, landing gear components, pneumatic valves, and flight control surfaces." },
      { title: "Airport Infrastructure", description: "Terminal buildings, runway construction, taxiway development, ATC towers, and airport ground lighting systems." },
      { title: "Ground Support Equipment", description: "Supply and maintenance of ground handling equipment including tow tractors, GPU, ACU, and cargo loaders." },
      { title: "Aviation Training", description: "Type-rated training for AMEs, bridge courses, DGCA examination preparation, and OJT programs for aerospace technicians." },
    ],
    projects: [
      { title: "Fleet MRO Program", location: "Pan-India Operations", value: "$18M", description: "Multi-year line and base maintenance contract covering 45 aircraft across 12 stations." },
      { title: "Hangar Complex Development", location: "Begumpet, Hyderabad", value: "$15M", description: "State-of-the-art MRO hangar with twin-bay capacity, component shops, and NDT laboratory." },
      { title: "Regional Airport Infrastructure", location: "Tier-2 Cities, India", value: "$25M", description: "Runway extension, terminal expansion, and ground lighting upgrade for three regional airports." },
    ],
    process: [
      { step: "01", title: "Assessment & Planning", description: "Aircraft inspection, maintenance planning, parts provisioning, and TAT estimation with customer coordination." },
      { step: "02", title: "Execution & Quality Control", description: "Maintenance task execution by licensed engineers with concurrent quality inspections and documentation." },
      { step: "03", title: "Testing & Certification", description: "Functional checks, ground runs, test flights (if required), and release to service with all regulatory documentation." },
      { step: "04", title: "Delivery & Support", description: "Aircraft delivery, post-maintenance support, warranty tracking, and fleet health monitoring services." },
    ],
    relatedDivisions: ["Manah Aerospace"],
  },

  "green-hydrogen": {
    id: "green-hydrogen",
    title: "Green Hydrogen",
    tagline: "Water & Environment",
    heroDescription:
      "Pioneering the hydrogen economy — from electrolyzer manufacturing and green hydrogen production to end-to-end water treatment, desalination, and river rejuvenation solutions for a sustainable future.",
    color: "#16A34A",
    image: "/images/sectors/green_hydrogen.png",
    overview: [
      "Manah Group is building the critical infrastructure for the global hydrogen economy. Our green hydrogen capabilities span the entire value chain — from electrolyzer manufacturing and renewable energy integration to hydrogen compression, storage, distribution, and end-use applications. We are committed to making green hydrogen cost-competitive with fossil alternatives.",
      "Complementing our hydrogen expertise, we deliver comprehensive water and environment solutions including water treatment plants, desalination facilities, sewage treatment systems, and river rejuvenation projects. Our environmental engineering capabilities address the growing global demand for clean water and sustainable water management.",
    ],
    keyStats: [
      { value: "500 TPD", label: "H₂ Production Capacity" },
      { value: "PEM/AEL", label: "Electrolyzer Technology" },
      { value: "200+ MLD", label: "Water Treatment Capacity" },
      { value: "100K+ Tons", label: "Annual CO₂ Reduction" },
      { value: "10+", label: "Treatment Plants" },
      { value: "3", label: "Desalination Facilities" },
    ],
    services: [
      { title: "Green Hydrogen Production", description: "Large-scale green hydrogen plants powered by dedicated renewable energy, serving refineries, fertilizer plants, and steel manufacturers." },
      { title: "Electrolyzer Systems", description: "PEM and alkaline electrolyzer stack assembly, balance of plant integration, and containerized hydrogen generation units." },
      { title: "Water Treatment Plants", description: "Conventional and advanced water treatment facilities including filtration, disinfection, membrane processes, and sludge management." },
      { title: "Desalination", description: "Reverse osmosis and thermal desalination plants for coastal industrial zones and municipal water supply augmentation." },
      { title: "Sewage Treatment", description: "STP design and construction using SBR, MBBR, and MBR technologies with treated water reuse for industrial and irrigation purposes." },
      { title: "River Rejuvenation", description: "Integrated river cleaning programs including sewage interception, treatment, riverfront development, and ecological restoration." },
    ],
    projects: [
      { title: "Green Hydrogen Facility", location: "Gujarat, India", value: "$75M", description: "50 TPD green hydrogen production facility with dedicated 200 MW solar park and on-site compression." },
      { title: "100 MLD Water Treatment Plant", location: "Hyderabad, India", value: "$30M", description: "Advanced water treatment facility with multi-stage filtration serving 500,000 urban residents." },
      { title: "River Rejuvenation Program", location: "Andhra Pradesh, India", value: "$20M", description: "Integrated sewage interception, 25 MLD STP construction, and 15 km riverfront ecological restoration." },
    ],
    process: [
      { step: "01", title: "Feasibility & Assessment", description: "Water quality analysis, hydrogen demand assessment, renewable resource evaluation, and techno-economic feasibility study." },
      { step: "02", title: "Detailed Engineering", description: "Process design, equipment sizing, P&ID development, civil and structural engineering, and environmental compliance." },
      { step: "03", title: "Construction & Installation", description: "Civil works, equipment installation, piping, electrical, instrumentation, and process commissioning." },
      { step: "04", title: "Operations & Optimization", description: "Plant startup, operator training, performance guarantee testing, and ongoing process optimization." },
    ],
    relatedDivisions: ["Green Energy", "Manah Dynamics"],
  },

  manufacturing: {
    id: "manufacturing",
    title: "Manufacturing",
    tagline: "Electronics Manufacturing Services",
    heroDescription:
      "State-of-the-art electronics manufacturing with advanced SMT lines, precision assembly, and defence-grade quality systems — supporting strategic and commercial manufacturing across critical sectors.",
    color: "#7C3AED",
    image: "/images/sectors/defence_electronics.png",
    overview: [
      "Manah Group's manufacturing capabilities deliver high-reliability electronic assemblies for defence, aerospace, telecom, and industrial applications. Our 50,000 sq ft facility houses advanced SMT production lines, through-hole assembly stations, conformal coating systems, and comprehensive test infrastructure — all operating under defence-grade quality management.",
      "We specialize in low-to-medium volume, high-mix production runs that demand exceptional quality and traceability. From bare board loading to fully tested box-build systems, our manufacturing process is designed for zero-defect production with complete material traceability and industry-leading first-pass yield rates.",
    ],
    keyStats: [
      { value: "8+", label: "SMT Lines" },
      { value: "1M+", label: "Assemblies/Year" },
      { value: "99.5%", label: "First Pass Yield" },
      { value: "50,000 sq ft", label: "Factory Floor" },
      { value: "IPC Class 3", label: "Assembly Standard" },
      { value: "100+", label: "Active SKUs" },
    ],
    services: [
      { title: "SMT Assembly", description: "High-speed pick-and-place with solder paste inspection, reflow profiling, automatic optical inspection, and X-ray for BGA verification." },
      { title: "Through-Hole & Mixed Technology", description: "Wave soldering and selective soldering for mixed-technology PCBAs with hand soldering for fine-pitch and odd-form components." },
      { title: "Box Build & Integration", description: "Complete system assembly including wire harnessing, cable routing, enclosure integration, firmware loading, and system-level testing." },
      { title: "Conformal Coating", description: "Selective and spray conformal coating using acrylic, silicone, and polyurethane materials for harsh environment protection." },
      { title: "Testing & Quality", description: "In-circuit testing, functional testing, boundary scan, environmental stress screening, burn-in, and reliability testing." },
      { title: "NPI & Prototyping", description: "Rapid prototype assembly, DFM/DFA review, component engineering, and seamless transition from prototype to production." },
    ],
    projects: [
      { title: "Defence Communication Systems", location: "Indian Armed Forces", value: "$15M", description: "Series production of tactical communication equipment including SDR platforms and encrypted terminals." },
      { title: "Telecom Infrastructure Equipment", location: "Pan-India Deployment", value: "$10M", description: "High-volume production of base station electronics, antenna controllers, and network management units." },
      { title: "Industrial IoT Platform", location: "Manufacturing Sector", value: "$5M", description: "Edge computing modules, sensor interface boards, and gateway controllers for smart factory deployments." },
    ],
    process: [
      { step: "01", title: "NPI & DFM Review", description: "Design for manufacturability analysis, BOM optimization, component alternates identification, and test strategy development." },
      { step: "02", title: "Procurement & Kitting", description: "Component sourcing, incoming inspection, moisture sensitivity management, and line-side kitting for production." },
      { step: "03", title: "Production & Inspection", description: "SMT/THT assembly, solder paste/AOI/X-ray inspection, conformal coating, and box build with in-process quality gates." },
      { step: "04", title: "Test & Ship", description: "ICT, functional testing, final quality audit, ESD-safe packaging, and logistics coordination with full traceability." },
    ],
    relatedDivisions: ["Tech & Manufacturing"],
  },
};
