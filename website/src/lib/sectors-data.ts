/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Sector Detail Data
   End-market (customer industry) content — one page per sector.
   Capabilities and products (BESS, EMS, Nuclear, AI, H₂) live on
   division pages, linked from relatedDivisions below.
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
    title: "Power T&D",
    tagline: "Grid Infrastructure",
    heroDescription:
      "End-to-end EPC solutions for high-voltage power transmission and distribution — 66kV distribution networks through 765kV EHV transmission corridors powering national grids.",
    color: "#1E3A5F",
    image: "/images/sectors/power_transmission.webp",
    overview: [
      "Manah Group delivers comprehensive power transmission and distribution solutions spanning the full voltage spectrum — from 66kV distribution networks to ultra-high-voltage 765kV transmission corridors. Our integrated EPC approach covers route surveying, tower design and fabrication, foundation engineering, stringing, and commissioning.",
      "With over 3,000 km of transmission lines constructed and multiple substation projects delivered, we are a trusted partner for national utilities, state distribution companies, and independent power producers.",
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
      { title: "Grid Modernization & SCADA", description: "Smart grid upgrades including FACTS devices, reactive power compensation, AMI, BESS integration, and SCADA automation." },
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
    title: "Renewables",
    tagline: "Clean Power",
    heroDescription:
      "Utility-scale solar, wind, and hybrid renewable energy EPC — from feasibility studies through construction to long-term operations and maintenance.",
    color: "#F59E0B",
    image: "/images/sectors/renewable_energy.webp",
    overview: [
      "Manah Group accelerates India's energy transition through large-scale renewable project development and EPC execution. Our portfolio spans utility-scale solar parks, onshore wind farms, hybrid plants, and energy storage — delivering clean energy that meets ambitious carbon reduction targets.",
      "We operate across the full project lifecycle: resource assessment through engineering, procurement, construction, and long-term O&M. Green hydrogen, electrolyzers, and nuclear baseload are delivered by sibling divisions — see Manah Green Energy and Manah Atomic.",
    ],
    keyStats: [
      { value: "1,200+ MW", label: "Capacity Installed" },
      { value: "15+", label: "Solar Parks" },
      { value: "500+ MW", label: "Wind Capacity" },
      { value: "100K+ tons", label: "CO₂ Avoided / Year" },
      { value: "25+ years", label: "Asset Life" },
      { value: "99.5%", label: "Plant Availability" },
    ],
    services: [
      { title: "Solar EPC (Utility Scale)", description: "Complete EPC for ground-mounted solar parks from 10 MW to 500 MW+ including single-axis trackers, inverter stations, and pooling substations." },
      { title: "Wind Farm Development", description: "Turnkey onshore wind projects including micrositing, foundation design, turbine erection, and electrical balance of plant." },
      { title: "Hybrid Power Plants", description: "Co-located solar-wind-storage hybrids optimizing land use, grid connectivity, and capacity utilization factors." },
      { title: "BESS Integration", description: "Battery energy storage solutions for renewable firming, peak shaving, and grid ancillary services." },
      { title: "Rooftop & C&I Solar", description: "Commercial and industrial rooftop solar with net metering, wheeling arrangements, and PPA structures." },
      { title: "O&M Services", description: "Plant operations, predictive maintenance, performance monitoring, and vegetation management for renewable assets." },
    ],
    projects: [
      { title: "300 MW Solar Park", location: "Rajasthan, India", value: "$120M", description: "Utility-scale solar park with single-axis trackers and 132kV pooling substation, powering 150,000 homes annually." },
      { title: "150 MW Wind Farm", location: "Tamil Nadu, India", value: "$85M", description: "Onshore wind farm with latest-generation turbines achieving 35% capacity utilization factor." },
      { title: "50 MW Hybrid Plant", location: "Karnataka, India", value: "$40M", description: "Co-located solar-wind hybrid with 20 MWh battery storage for round-the-clock renewable power." },
    ],
    process: [
      { step: "01", title: "Resource Assessment", description: "Solar irradiance measurement, wind data analysis, land survey, and grid connectivity study with bankability reports." },
      { step: "02", title: "Engineering & Permitting", description: "Detailed engineering design, environmental clearances, grid connectivity approvals, and land acquisition support." },
      { step: "03", title: "EPC Execution", description: "Civil works, module/turbine installation, electrical BOS, substation construction, and grid synchronization." },
      { step: "04", title: "O&M & Monitoring", description: "24/7 remote monitoring, preventive maintenance, performance analytics, and warranty management." },
    ],
    relatedDivisions: ["Manah Dynamics", "Manah Green Energy", "Manah Atomic"],
  },

  "building-roads": {
    id: "building-roads",
    title: "Building & Roads",
    tagline: "Civil Infrastructure",
    heroDescription:
      "Roads, bridges, industrial and residential buildings, and urban infrastructure — built to international standards of safety, quality, and longevity.",
    color: "#6B7280",
    image: "/images/sectors/infrastructure.webp",
    overview: [
      "Manah Group executes large-scale civil infrastructure projects that form the foundation of modern economies. From national highways and urban road networks to industrial parks and residential complexes, our construction capabilities deliver projects of national significance on time and within budget.",
      "We combine advanced engineering, modern equipment fleets, digital project management, and stringent safety protocols to deliver infrastructure that serves communities for decades. Active mandates include 4× G+4 residential buildings for MES at Narangi Military Station (₹53 Cr).",
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
      { title: "Residential & Military Buildings", description: "Multi-storey residential complexes, barracks, and military station infrastructure delivered to MES specifications." },
      { title: "Industrial & Commercial Construction", description: "Pre-engineered buildings, warehouses, data-center shells, manufacturing facilities, and commercial complexes." },
      { title: "Urban Development", description: "Smart-city infrastructure including underground utilities, stormwater drainage, streetscaping, and public-space development." },
      { title: "Railway & Metro Infrastructure", description: "Station buildings, viaducts, depot construction, and allied infrastructure for metro rail and railway projects." },
    ],
    projects: [
      { title: "4× G+4 Residential Buildings", location: "Narangi Military Station, Guwahati", value: "₹53 Cr", description: "Residential barrack complex for Military Engineer Services (MES) on an active military station." },
      { title: "4-Lane National Highway", location: "Telangana, India", value: "$65M", description: "120 km four-lane divided highway with 8 bridges, 3 interchanges, and full intelligent transportation system." },
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
    title: "Defence",
    tagline: "Strategic & Mission-Critical",
    heroDescription:
      "Defence systems and networks, tactical communication, electronic warfare, surveillance, and mission-critical electronics for India's armed forces.",
    color: "#059669",
    image: "/images/sectors/defence_electronics.webp",
    overview: [
      "Manah Group supports India's defence modernization through mission-critical systems integration, defence electronics manufacturing, and secure communication infrastructure. Our defence work spans tactical communications, radar sub-assemblies, electronic warfare, surveillance, and weapon electronics — all manufactured to MIL-STD and JSS quality.",
      "As a licensed defence manufacturer, we contribute to national self-reliance objectives by indigenizing critical electronic sub-systems. Our Cherlapally facility features classified work areas, MIL-STD testing, and secure data handling for the most sensitive defence programs. Sovereign AI compute for defence applications is delivered by Manah AI.",
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
      { title: "Weapon Electronics", description: "Fuze electronics, guidance-system components, fire-control computers, and weapon interface units meeting MIL-STD-1316 standards." },
      { title: "System Integration & Testing", description: "Rack-level integration, environmental qualification (MIL-STD-810), EMI/EMC (MIL-STD-461), and acceptance test procedures." },
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
    relatedDivisions: ["Manah Dynamics", "Manah AI"],
  },

  telecom: {
    id: "telecom",
    title: "Telecom",
    tagline: "Connectivity Infrastructure",
    heroDescription:
      "Telecom tower rollout, BharatNet fiber execution, and network infrastructure — enabling the connectivity backbone for a digital India.",
    color: "#0EA5E9",
    image: "/images/sectors/telecom_equipment.webp",
    overview: [
      "Manah Group delivers end-to-end telecom infrastructure for public and private operators, anchored by large-scale rollouts under BharatNet, BSNL, and private tower programs. Our telecom capability spans tower erection, optical fiber cable (OFC) laying, passive and active network integration, and base-station electronics.",
      "From rural connectivity programs to urban 5G densification, we combine civil construction, RF engineering, and electronics manufacturing under one roof — enabling accelerated, cost-competitive rollouts backed by EMS-grade supply reliability from our Cherlapally facility.",
    ],
    keyStats: [
      { value: "5,000+", label: "Tower Sites" },
      { value: "10,000+ km", label: "OFC Laid" },
      { value: "BharatNet", label: "Empanelled" },
      { value: "20+", label: "Telecom Programs" },
      { value: "99.5%", label: "Site Uptime" },
      { value: "24/7", label: "NOC Support" },
    ],
    services: [
      { title: "Telecom Towers (GBT & RTT)", description: "Ground-based and rooftop tower design, fabrication, erection, and commissioning for macro and small-cell deployments." },
      { title: "Optical Fiber Cabling (OFC)", description: "Underground and aerial OFC execution, splicing, OTDR testing, and last-mile connectivity for BharatNet and private fiber." },
      { title: "Active Network Integration", description: "BTS/BBU/RRU installation, microwave link commissioning, antenna alignment, and RAN integration." },
      { title: "Power & Battery Backup", description: "SMPS systems, VRLA/Li-ion battery banks, DG integration, and hybrid solar-diesel solutions for remote sites." },
      { title: "Base Station Electronics (EMS)", description: "In-house manufacturing of antenna controllers, network management units, and telecom sub-assemblies at our Cherlapally facility." },
      { title: "Site O&M & NOC", description: "Preventive and corrective site maintenance, 24/7 network operations center support, and SLA-backed response." },
    ],
    projects: [
      { title: "BharatNet Phase III", location: "Multi-State", value: "$12M", description: "OFC laying and last-mile connectivity across 1,500+ gram panchayats under BharatNet Phase III." },
      { title: "Tower Rollout Program", location: "Pan-India", value: "$18M", description: "Turnkey erection and commissioning of 800 GBT/RTT sites for a Tier-1 telecom operator." },
      { title: "Network Densification", location: "Tier-2 Cities, India", value: "$8M", description: "5G densification with small cells, fronthaul OFC, and active RAN integration." },
    ],
    process: [
      { step: "01", title: "Site Survey & Design", description: "RF and civil site surveys, tower selection, foundation design, and power sizing." },
      { step: "02", title: "Procurement & Fabrication", description: "Tower and hardware sourcing, OFC procurement, and in-house electronics manufacturing where applicable." },
      { step: "03", title: "Installation & Commissioning", description: "Tower erection, OFC laying and splicing, active equipment installation, and link commissioning." },
      { step: "04", title: "Handover & O&M", description: "Acceptance testing, SLA-backed O&M, and NOC-based remote monitoring." },
    ],
    relatedDivisions: ["Manah Dynamics"],
  },

  "oil-gas": {
    id: "oil-gas",
    title: "Oil & Gas",
    tagline: "Hydrocarbon Infrastructure",
    heroDescription:
      "Downstream processing, refinery allied works, pipeline construction, and LNG terminal support — serving India's oil and gas majors with turnkey EPC delivery.",
    color: "#A16207",
    image: "/images/sectors/manufacturing.webp",
    overview: [
      "Manah Group delivers EPC for downstream oil and gas infrastructure — refinery allied works, process package construction, cross-country pipelines, LNG terminal support, and storage facilities. Our scope spans civil, mechanical, piping, electrical, and instrumentation disciplines under tight safety and quality envelopes.",
      "We work with national oil companies, private refiners, and EPC majors on allied packages that complement primary process units. The Bina hydrogen production facility sits adjacent to BPCL Bina Refinery; refinery decarbonization through clean hydrogen and potential SMR heat is delivered by Manah Green Energy and Manah Atomic.",
    ],
    keyStats: [
      { value: "15+", label: "O&G Projects" },
      { value: "500+ km", label: "Pipelines Executed" },
      { value: "ISO 9001", label: "Quality Standard" },
      { value: "Zero", label: "Major Safety Incidents" },
      { value: "ASME", label: "Code Compliance" },
      { value: "24/7", label: "Construction Mode" },
    ],
    services: [
      { title: "Refinery Allied Works", description: "Civil, structural, piping, and tankage works supporting refinery turnarounds, expansions, and brownfield upgrades." },
      { title: "Cross-Country Pipelines", description: "Oil, gas, and product pipeline construction including trenching, welding, coating, hydro-testing, and commissioning." },
      { title: "Storage Terminals", description: "Above-ground storage tanks (AST), cryogenic storage, bunds, fire-protection systems, and terminal automation." },
      { title: "LNG Terminal Support", description: "Civil and balance-of-plant works for LNG receiving terminals, regasification units, and send-out systems." },
      { title: "Process Packages", description: "Modular process package construction, skid integration, and mechanical completion for downstream operators." },
      { title: "Instrumentation & Automation", description: "SCADA, DCS, leak-detection, pipeline integrity monitoring, and asset-management systems." },
    ],
    projects: [
      { title: "Refinery Piping Package", location: "Western India", value: "$22M", description: "Piping and structural works for a brownfield refinery upgrade including 400+ tonnes of fabrication." },
      { title: "Cross-Country Pipeline", location: "Central India", value: "$35M", description: "180 km natural gas pipeline with HDD crossings, cathodic protection, and SCADA integration." },
      { title: "LNG Terminal BoP", location: "Coastal India", value: "$15M", description: "Balance-of-plant works for an LNG receiving terminal including utilities and firefighting systems." },
    ],
    process: [
      { step: "01", title: "FEED Review & Planning", description: "Front-end engineering design review, constructability analysis, and HSE planning." },
      { step: "02", title: "Procurement & Fabrication", description: "Long-lead equipment tracking, shop fabrication of piping and structural, third-party inspection." },
      { step: "03", title: "Site Execution", description: "Civil works, erection, welding (SMAW/GTAW), NDT, hydro-testing, and mechanical completion." },
      { step: "04", title: "Commissioning & Handover", description: "Loop checks, pre-commissioning, start-up support, and performance guarantee testing." },
    ],
    relatedDivisions: ["Manah Dynamics", "Manah Green Energy", "Manah Atomic"],
  },

  mining: {
    id: "mining",
    title: "Mining",
    tagline: "Resource Extraction",
    heroDescription:
      "Mining operations, balance-of-plant engineering, and infrastructure construction for India's coal, mineral, and metal mining sector.",
    color: "#92400E",
    image: "/images/sectors/manufacturing.webp",
    overview: [
      "Manah Group supports India's mining industry with construction of mine infrastructure, mineral processing plants, overburden removal, and allied civil works. We serve coal, iron-ore, limestone, and non-ferrous metal operators with EPC scope covering civil foundations, crushing and screening plants, conveying systems, and mine support structures.",
      "Our integrated approach combines heavy civil construction with electrical and automation capabilities — enabling single-source delivery for greenfield mines, capacity expansions, and mine closure programs.",
    ],
    keyStats: [
      { value: "10+", label: "Mining Projects" },
      { value: "50+ km", label: "Conveyor Systems" },
      { value: "ISO 45001", label: "HSE Certified" },
      { value: "99%", label: "Dispatch Availability" },
      { value: "Zero", label: "LTI Target" },
      { value: "Full EPC", label: "Scope" },
    ],
    services: [
      { title: "Mine Infrastructure", description: "Haul roads, workshops, administrative buildings, labor colonies, and weighbridges for greenfield and brownfield mines." },
      { title: "Mineral Processing Plants", description: "Crushing, screening, beneficiation, and washery plant construction with EPC-scope civil, mechanical, and electrical." },
      { title: "Overburden & Conveyors", description: "Overburden removal works, in-pit crushing-and-conveying systems, overland belt conveyors, and stacker-reclaimers." },
      { title: "Tailings & Water Management", description: "Tailings storage facilities, water treatment, mine dewatering, and discharge management infrastructure." },
      { title: "Mine Electricals & Automation", description: "Substation construction, MV/LV distribution, SCADA for production tracking, and mine-wide IIoT instrumentation." },
      { title: "Mine Closure & Reclamation", description: "Slope stabilization, revegetation, water-body restoration, and long-term reclamation plans." },
    ],
    projects: [
      { title: "Coal Washery Expansion", location: "Eastern India", value: "$18M", description: "Brownfield expansion of a 3 MTPA coal washery including civil, mechanical, and conveyor works." },
      { title: "Iron Ore Crushing Plant", location: "Central India", value: "$12M", description: "Greenfield primary and secondary crushing plant with 5 km overland belt conveyor." },
      { title: "Mine Infrastructure Package", location: "Western India", value: "$8M", description: "Haul roads, workshops, administrative complex, and water treatment for a new coal mine." },
    ],
    process: [
      { step: "01", title: "Geotech & Feasibility", description: "Geotechnical investigation, traffic-and-haulage study, and process plant capacity planning." },
      { step: "02", title: "Engineering & Procurement", description: "Civil-structural design, mechanical sizing, equipment selection, and long-lead-item tracking." },
      { step: "03", title: "Site Execution", description: "Earthwork, foundations, structural erection, conveyor installation, and E&I works." },
      { step: "04", title: "Commissioning & O&M", description: "No-load and load trials, performance guarantee tests, and post-commissioning support." },
    ],
    relatedDivisions: ["Manah Dynamics"],
  },

  "irrigation-water": {
    id: "irrigation-water",
    title: "Irrigation & Water",
    tagline: "Water Infrastructure",
    heroDescription:
      "Water treatment, irrigation systems, and urban water infrastructure — ensuring clean water supply and efficient water management for agriculture and communities.",
    color: "#0891B2",
    image: "/images/sectors/infrastructure.webp",
    overview: [
      "Manah Group delivers water and irrigation infrastructure for state governments, municipal bodies, and industrial clients. Scope spans drinking water supply schemes, lift-irrigation systems, canal networks, water-treatment plants, and sewage-treatment plants — supporting India's Jal Jeevan Mission and urban water security goals.",
      "We combine heavy civil construction, mechanical-hydraulic engineering, and electrical-automation to deliver end-to-end water infrastructure with operator training, O&M, and long-term performance guarantees.",
    ],
    keyStats: [
      { value: "100+ MLD", label: "Treatment Capacity" },
      { value: "500K+", label: "Lives Served" },
      { value: "10+", label: "Schemes Delivered" },
      { value: "Jal Jeevan", label: "Mission Aligned" },
      { value: "ISO 9001", label: "Quality Certified" },
      { value: "Full EPC", label: "Scope" },
    ],
    services: [
      { title: "Drinking Water Supply", description: "Bulk water supply schemes, intake structures, treatment plants, and distribution networks for urban and rural coverage." },
      { title: "Water Treatment Plants (WTP)", description: "Conventional and advanced WTPs including coagulation, filtration, disinfection, membrane processes, and sludge management." },
      { title: "Sewage Treatment (STP)", description: "STP design and construction using SBR, MBBR, and MBR technologies with treated water reuse for irrigation and industry." },
      { title: "Lift Irrigation Systems", description: "Pump stations, rising mains, delivery networks, and field-level distribution for agricultural water supply." },
      { title: "Canal & Distributary Networks", description: "Main canal, distributary, and minor canal construction including lining, cross-regulators, and automation." },
      { title: "SCADA & Water Automation", description: "Flow monitoring, leak detection, pressure management, and SCADA-based water-distribution control for NRW reduction." },
    ],
    projects: [
      { title: "100 MLD Water Treatment Plant", location: "Hyderabad, India", value: "$30M", description: "Advanced water treatment facility with multi-stage filtration serving 500,000 urban residents." },
      { title: "Lift Irrigation Scheme", location: "Andhra Pradesh, India", value: "$20M", description: "Lift irrigation scheme with pump stations and 45 km rising main covering 20,000 hectares." },
      { title: "25 MLD Sewage Treatment", location: "Central India", value: "$12M", description: "SBR-technology STP with treated-water reuse for industrial and irrigation applications." },
    ],
    process: [
      { step: "01", title: "Hydrological Study", description: "Source identification, water-quality analysis, demand assessment, and hydrological modeling." },
      { step: "02", title: "Detailed Engineering", description: "Process design, pump sizing, pipeline routing, and civil-structural engineering with environmental compliance." },
      { step: "03", title: "Construction", description: "Civil works, equipment installation, pipe-laying, electrical and automation integration." },
      { step: "04", title: "Commissioning & O&M", description: "Plant startup, operator training, performance guarantee testing, and long-term O&M support." },
    ],
    relatedDivisions: ["Manah Dynamics"],
  },

  "bess-scada": {
    id: "bess-scada",
    title: "BESS / SCADA",
    tagline: "Storage & Grid Automation",
    heroDescription:
      "Grid-scale battery energy storage and SCADA automation — stabilising renewable-heavy grids with real-time monitoring, control, and dispatch.",
    color: "#0D9488",
    image: "/images/sectors/bess_scada.webp",
    overview: [
      "As renewable generation scales across India's grid, Manah Group delivers the storage and control layer that keeps it stable — utility-scale Battery Energy Storage Systems (BESS) and SCADA automation engineered for round-the-clock reliability. Our scope covers battery container integration, power conversion systems, grid interconnection, and the control software that dispatches stored energy on demand.",
      "From renewable firming and peak shaving to frequency regulation and black-start support, our BESS deployments are paired with SCADA and energy-management systems that give operators real-time visibility and automated control across substations, storage assets, and distributed resources.",
    ],
    keyStats: [
      { value: "Grid-Scale", label: "BESS Capability" },
      { value: "Real-Time", label: "SCADA Control" },
      { value: "Li-ion", label: "Battery Technology" },
      { value: "24/7", label: "Dispatch & Monitoring" },
      { value: "Full EPC", label: "Scope" },
      { value: "Renewable", label: "Firming & Peak Shaving" },
    ],
    services: [
      { title: "Battery Energy Storage Systems", description: "Turnkey utility-scale BESS — battery container integration, thermal management, and safety systems for renewable firming and grid support." },
      { title: "Power Conversion & Interconnection", description: "Bidirectional inverters, transformers, and switchgear for grid-tied storage, with protection coordination and interconnection compliance." },
      { title: "SCADA & Automation", description: "Substation and plant SCADA, RTUs, and communication networks for real-time supervision, control, and data acquisition." },
      { title: "Energy Management Systems", description: "EMS software for dispatch optimisation, state-of-charge management, and automated participation in ancillary-service markets." },
      { title: "Grid Stabilisation Services", description: "Frequency regulation, peak shaving, load shifting, and black-start support to stabilise renewable-heavy networks." },
      { title: "O&M & Performance Monitoring", description: "Predictive maintenance, battery-health analytics, and SLA-backed monitoring across the asset lifecycle." },
    ],
    projects: [
      { title: "Renewable Firming BESS", location: "India", value: "Grid-Scale", description: "Battery storage co-located with a renewable park for round-the-clock dispatch and grid firming." },
      { title: "Substation SCADA Modernisation", location: "India", value: "Turnkey EPC", description: "SCADA and automation upgrade across transmission substations for real-time monitoring and control." },
      { title: "Peak-Shaving Storage System", location: "India", value: "Multi-Site", description: "Distributed BESS deployment for industrial peak shaving and demand-charge reduction." },
    ],
    process: [
      { step: "01", title: "Grid & Load Study", description: "Grid-impact analysis, storage sizing, use-case modelling, and interconnection feasibility." },
      { step: "02", title: "Engineering & Design", description: "BESS layout, power-conversion design, protection coordination, and SCADA/EMS architecture." },
      { step: "03", title: "Integration & Commissioning", description: "Battery container installation, electrical integration, SCADA configuration, and grid synchronisation." },
      { step: "04", title: "Operations & Optimisation", description: "Dispatch tuning, battery-health monitoring, and SLA-backed O&M with performance analytics." },
    ],
    relatedDivisions: ["Manah Dynamics", "Manah Green Energy"],
  },

  "disaster-management": {
    id: "disaster-management",
    title: "Disaster Management",
    tagline: "Resilience & Emergency Response",
    heroDescription:
      "Emergency response infrastructure, resilience planning, and disaster-preparedness training — the systems and skills that protect communities and critical assets.",
    color: "#DC2626",
    image: "/images/sectors/disaster_management.webp",
    overview: [
      "Manah Group brings engineering discipline to disaster resilience — building the infrastructure, command systems, and trained capability that communities and institutions rely on when crisis strikes. Our scope spans emergency operations centres, early-warning and communication networks, and resilient infrastructure designed to withstand and recover from natural and man-made hazards.",
      "Beyond infrastructure, we deliver preparedness training and response capability — equipping teams with the drills, coordination protocols, and command-and-control tools needed for rapid, organised action. The approach reflects the Group's Mindful Enterprising philosophy of building with awareness of long-term impact on people and communities.",
    ],
    keyStats: [
      { value: "End-to-End", label: "Response Capability" },
      { value: "24/7", label: "Command & Control" },
      { value: "Resilient", label: "Infrastructure Design" },
      { value: "Multi-Hazard", label: "Coverage" },
      { value: "Training", label: "Preparedness Programs" },
      { value: "Community", label: "Focused" },
    ],
    services: [
      { title: "Emergency Operations Centres", description: "Design and construction of command-and-control centres with communication, monitoring, and coordination infrastructure." },
      { title: "Early-Warning & Communication Networks", description: "Sensor networks, alert systems, and resilient communication links for timely hazard detection and public warning." },
      { title: "Resilient Infrastructure", description: "Hazard-resistant civil infrastructure engineered to withstand seismic, flood, and extreme-weather events." },
      { title: "Preparedness Training", description: "Drills, simulation exercises, and capability-building programs for response teams and institutions." },
      { title: "Crisis Coordination Systems", description: "Incident-management platforms, mobile command units, and inter-agency coordination tools for organised response." },
      { title: "Recovery & Reconstruction", description: "Post-disaster damage assessment, rehabilitation, and reconstruction of critical infrastructure and services." },
    ],
    projects: [
      { title: "Emergency Operations Centre", location: "India", value: "Turnkey EPC", description: "Command-and-control facility with integrated communication, monitoring, and coordination systems." },
      { title: "Resilient Infrastructure Program", location: "India", value: "Multi-Site", description: "Hazard-resistant upgrades to critical public infrastructure across vulnerable regions." },
      { title: "Response Training Initiative", location: "India", value: "Capability Building", description: "Preparedness and drill programs equipping response teams with coordinated crisis-response capability." },
    ],
    process: [
      { step: "01", title: "Risk & Hazard Assessment", description: "Multi-hazard risk mapping, vulnerability analysis, and resilience-gap identification." },
      { step: "02", title: "Planning & Design", description: "Response-system design, infrastructure engineering, and preparedness-program development." },
      { step: "03", title: "Implementation", description: "Construction of resilient infrastructure, deployment of command systems, and rollout of training." },
      { step: "04", title: "Drills & Readiness", description: "Simulation exercises, readiness audits, and continuous improvement of response capability." },
    ],
    relatedDivisions: ["Manah Dynamics"],
  },
};
