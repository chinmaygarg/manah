/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Blog Article Data
   Complete content for each blog post with SEO/AEO metadata
   ═══════════════════════════════════════════════════════════ */

// ─── Content Block Types ───

interface TextBlock {
  readonly type: "text";
  readonly content: string;
}

interface HeadingBlock {
  readonly type: "heading";
  readonly level: 2 | 3;
  readonly content: string;
}

interface ImageBlock {
  readonly type: "image";
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
}

interface QuoteBlock {
  readonly type: "quote";
  readonly content: string;
  readonly attribution?: string;
}

interface KeyTakeawaysBlock {
  readonly type: "keyTakeaways";
  readonly items: readonly string[];
}

interface ListBlock {
  readonly type: "list";
  readonly style: "bullet" | "numbered";
  readonly items: readonly string[];
}

export type ContentBlock =
  | TextBlock
  | HeadingBlock
  | ImageBlock
  | QuoteBlock
  | KeyTakeawaysBlock
  | ListBlock;

// ─── Author & Article Interfaces ───

export interface AuthorInfo {
  readonly name: string;
  readonly role: string;
}

export interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

export interface BlogArticle {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly isoDate: string;
  readonly readTime: string;
  readonly author: AuthorInfo;
  readonly excerpt: string;
  readonly image: string;
  readonly content: readonly ContentBlock[];
  readonly tags: readonly string[];
  readonly metaDescription: string;
  readonly metaKeywords: readonly string[];
  readonly faqItems?: readonly FAQItem[];
}

// ─── Article Data ───

const ARTICLES_LIST: readonly BlogArticle[] = [
  {
    id: 0,
    slug: "india-power-transmission-modernization",
    title: "India's Power Transmission Modernization: A $50 Billion Opportunity",
    category: "Industry Insights",
    date: "February 15, 2026",
    isoDate: "2026-02-15",
    readTime: "8 min read",
    author: { name: "Manah Research Team", role: "Strategic Research & Analysis" },
    excerpt:
      "India's power transmission network requires an estimated $50 billion in investment over the next decade to integrate 500 GW of renewable energy capacity. With ageing 220kV corridors struggling to handle bidirectional power flows, the shift to 765kV and HVDC super-highways is no longer optional — it is an engineering imperative that will redefine how the nation moves electrons from source to load.",
    image: "/images/news/power-transmission.jpg",
    metaDescription:
      "India needs $50 billion in power transmission upgrades to integrate 500 GW of renewables. Explore why 765kV and HVDC corridors are critical for the nation's energy future.",
    metaKeywords: [
      "India power transmission",
      "765kV transmission lines",
      "HVDC corridors India",
      "renewable energy integration",
      "power grid modernization",
      "EPC power sector",
    ],
    tags: ["Power Transmission", "Infrastructure", "Renewable Integration", "India"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "Why India's Grid Needs a $50 Billion Upgrade",
      },
      {
        type: "text",
        content:
          "India's power transmission infrastructure stands at a critical inflection point. The nation's ambitious target of 500 GW of non-fossil fuel capacity by 2030 demands a fundamental reimagining of how electricity travels from generation source to consumption centres. The existing network — built primarily around 220kV and 400kV corridors designed for unidirectional coal-to-city power flows — is structurally inadequate for the distributed, variable, and bidirectional nature of renewable energy.",
      },
      {
        type: "text",
        content:
          "The Central Electricity Authority (CEA) estimates that India requires approximately $50 billion in transmission investment between 2024 and 2032. This figure encompasses new 765kV extra-high-voltage lines, HVDC inter-regional corridors, advanced substations with reactive power compensation, and the digital infrastructure needed for real-time grid balancing across five regional grids.",
      },
      {
        type: "image",
        src: "/images/gallery/transmission_tower_construction.png",
        alt: "Transmission tower construction in progress showing a 765kV extra-high-voltage lattice tower being erected in rural India",
        caption:
          "765kV EHV transmission towers under construction — these corridors form the backbone of India's next-generation power grid.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Engineering Challenge: From 220kV to 765kV Super-Highways",
      },
      {
        type: "text",
        content:
          "Upgrading from 220kV to 765kV transmission is not simply a matter of scaling up conductor sizes. The engineering challenges span every phase of project delivery. Tower heights increase from 35 metres to over 55 metres, requiring deeper foundations and specialized soil investigations. Conductor bundles move from twin to quad configurations, demanding precision sag-tension calculations across spans that can exceed 400 metres in river crossings.",
      },
      {
        type: "text",
        content:
          "Right-of-way requirements expand dramatically — a 765kV double-circuit line needs approximately 67 metres of corridor width compared to 35 metres for a 220kV line. In a densely populated country like India, this creates significant land acquisition challenges that require early-stage engagement with state governments, revenue departments, and local communities.",
      },
      {
        type: "quote",
        content:
          "The transition from 220kV to 765kV transmission is the most significant infrastructure upgrade India's power sector has undertaken since the creation of the national grid. It will determine whether the country's renewable energy ambitions remain aspirational or become operational.",
        attribution: "Central Electricity Authority, Annual Transmission Plan 2025-26",
      },
      {
        type: "heading",
        level: 2,
        content: "HVDC: The Game-Changer for Inter-Regional Power Transfer",
      },
      {
        type: "text",
        content:
          "High Voltage Direct Current (HVDC) technology is emerging as the preferred solution for long-distance, high-capacity power transfer between India's renewable-rich western and southern states and demand centres in the north and east. Unlike AC transmission, HVDC eliminates reactive power losses over long distances and allows asynchronous interconnection between regional grids operating at slightly different frequencies.",
      },
      {
        type: "text",
        content:
          "India currently operates three major HVDC links, with five more in various stages of planning and execution. The proposed Leh-Kaithal 800kV HVDC link — designed to evacuate 10 GW of solar power from Ladakh — represents a landmark project that will traverse some of the most challenging terrain on earth, crossing the Himalayas at altitudes exceeding 4,000 metres.",
      },
      {
        type: "heading",
        level: 2,
        content: "Implications for the EPC Ecosystem",
      },
      {
        type: "text",
        content:
          "For EPC companies like Manah Group, this transmission buildout represents a generational opportunity. The demand for specialized capabilities — from high-altitude tower erection to GIS substation commissioning — will strain existing contractor capacity and create space for firms that can deliver complex, multi-state projects on schedule. Companies with proven track records in 400kV-and-above projects, combined with modern project management systems and strong safety cultures, are best positioned to capture this $50 billion pipeline.",
      },
      {
        type: "keyTakeaways",
        items: [
          "India needs $50 billion in transmission investment by 2032 to integrate 500 GW of renewable capacity",
          "The shift from 220kV to 765kV corridors demands fundamentally different engineering approaches, from foundation design to conductor stringing",
          "HVDC technology is critical for inter-regional power transfer, with five new links in planning",
          "The Leh-Kaithal 800kV HVDC corridor will be one of the most technically challenging transmission projects ever attempted",
          "EPC companies with 400kV+ experience and strong safety cultures are best positioned to capture this pipeline",
        ],
      },
    ],
    faqItems: [
      {
        question: "How much investment does India need in power transmission?",
        answer:
          "India requires approximately $50 billion in transmission infrastructure investment between 2024 and 2032, according to the Central Electricity Authority. This covers new 765kV lines, HVDC corridors, advanced substations, and digital grid infrastructure.",
      },
      {
        question: "What is the difference between 220kV and 765kV transmission lines?",
        answer:
          "765kV lines carry significantly more power over longer distances with lower losses. They require taller towers (55m vs 35m), wider right-of-way (67m vs 35m), and quad conductor bundles instead of twin configurations. The engineering complexity is substantially higher.",
      },
      {
        question: "Why is HVDC important for India's power grid?",
        answer:
          "HVDC (High Voltage Direct Current) eliminates reactive power losses over long distances and enables asynchronous interconnection between regional grids. It is essential for transferring renewable energy from western and southern generation hubs to northern and eastern demand centres.",
      },
    ],
  },
  {
    id: 1,
    slug: "green-hydrogen-india-net-zero",
    title: "Green Hydrogen: The Missing Piece in India's Net Zero Puzzle",
    category: "Sustainability",
    date: "January 28, 2026",
    isoDate: "2026-01-28",
    readTime: "6 min read",
    author: { name: "Manah Green Energy Division", role: "Green Energy & Sustainability" },
    excerpt:
      "As India targets 5 million tonnes of green hydrogen production annually by 2030, the EPC ecosystem must rapidly scale electrolyzer manufacturing, water treatment infrastructure, and dedicated renewable energy corridors to make the National Green Hydrogen Mission a reality.",
    image: "/images/news/green-hydrogen.jpg",
    metaDescription:
      "India targets 5 million tonnes of green hydrogen by 2030 under the National Green Hydrogen Mission. Learn about electrolyzer technology, infrastructure needs, and EPC opportunities.",
    metaKeywords: [
      "green hydrogen India",
      "National Green Hydrogen Mission",
      "electrolyzer manufacturing",
      "hydrogen EPC",
      "net zero India",
      "clean energy transition",
    ],
    tags: ["Green Hydrogen", "Sustainability", "Clean Energy", "Net Zero"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "India's Green Hydrogen Ambition: 5 Million Tonnes by 2030",
      },
      {
        type: "text",
        content:
          "Green hydrogen — produced by splitting water using renewable electricity — is rapidly emerging as the critical enabler for decarbonizing sectors that electricity alone cannot reach. Steel manufacturing, ammonia production, long-haul trucking, and maritime shipping collectively account for nearly 30% of India's industrial emissions, and green hydrogen offers the only viable pathway to decarbonize these hard-to-abate sectors at scale.",
      },
      {
        type: "text",
        content:
          "The National Green Hydrogen Mission, launched with an initial outlay of ₹19,744 crore ($2.4 billion), targets 5 million tonnes per annum (MTPA) of green hydrogen production by 2030. Achieving this target would require approximately 125 GW of dedicated renewable energy capacity, 60-80 GW of electrolyzer capacity, and a supporting ecosystem of water treatment plants, hydrogen storage facilities, and pipeline networks.",
      },
      {
        type: "image",
        src: "/images/gallery/hydrogen_electrolyzer_facility.png",
        alt: "Green hydrogen electrolyzer facility with PEM electrolysis stacks and renewable energy integration systems",
        caption:
          "A green hydrogen production facility — PEM electrolyzers split purified water into hydrogen and oxygen using renewable electricity.",
      },
      {
        type: "heading",
        level: 2,
        content: "Electrolyzer Technology: The Heart of Green Hydrogen",
      },
      {
        type: "text",
        content:
          "Two primary electrolyzer technologies dominate the current landscape: Alkaline Electrolysis (AEL) and Proton Exchange Membrane (PEM). Alkaline systems are mature and cost-effective at approximately $500-700 per kW, but their slower response times make them less suited for direct coupling with variable renewable sources. PEM electrolyzers, at $800-1,200 per kW, offer superior dynamic response and higher current densities, making them ideal for solar and wind integration.",
      },
      {
        type: "text",
        content:
          "India's electrolyzer manufacturing ecosystem is still nascent, with current domestic capacity below 1 GW. The Mission targets 15 GW of domestic manufacturing by 2030, requiring massive investments in membrane technology, electrode fabrication, and balance-of-plant systems. Companies like Reliance, Adani, and L&T have announced gigawatt-scale manufacturing plans, but the EPC capacity to install and commission these systems at scale remains a bottleneck.",
      },
      {
        type: "quote",
        content:
          "Green hydrogen is not just an energy commodity — it is an industrial platform. The country that masters hydrogen production and distribution at scale will lead the next industrial revolution.",
        attribution: "Ministry of New and Renewable Energy, NGHM Progress Report 2025",
      },
      {
        type: "heading",
        level: 2,
        content: "Infrastructure Requirements: Water, Power, and Pipelines",
      },
      {
        type: "text",
        content:
          "Producing 5 MTPA of green hydrogen requires approximately 45 billion litres of purified water annually — a significant consideration in water-stressed regions. Desalination and water recycling infrastructure must be co-developed with hydrogen plants, particularly in coastal industrial clusters in Gujarat, Tamil Nadu, and Andhra Pradesh where major green hydrogen hubs are being planned.",
      },
      {
        type: "text",
        content:
          "The dedicated renewable energy corridors needed to power these electrolyzers represent an EPC opportunity in themselves — 125 GW of solar and wind capacity, combined with the transmission infrastructure to deliver power reliably to electrolyzer sites, will require coordinated planning across generation, transmission, and hydrogen production value chains.",
      },
      {
        type: "keyTakeaways",
        items: [
          "India targets 5 MTPA green hydrogen by 2030 under the ₹19,744 crore National Green Hydrogen Mission",
          "PEM electrolyzers are preferred for renewable integration due to superior dynamic response, despite higher costs ($800-1,200/kW vs $500-700/kW for alkaline)",
          "Domestic electrolyzer manufacturing must scale from <1 GW to 15 GW by 2030",
          "Water infrastructure is a critical bottleneck — 45 billion litres of purified water needed annually",
          "125 GW of dedicated renewable capacity required to power green hydrogen production at target scale",
        ],
      },
    ],
    faqItems: [
      {
        question: "What is green hydrogen and how is it produced?",
        answer:
          "Green hydrogen is hydrogen produced by splitting water (H₂O) into hydrogen and oxygen using electricity generated from renewable sources like solar and wind. The process, called electrolysis, produces zero carbon emissions, unlike grey hydrogen made from natural gas.",
      },
      {
        question: "What is India's green hydrogen production target?",
        answer:
          "Under the National Green Hydrogen Mission, India targets 5 million tonnes per annum (MTPA) of green hydrogen production by 2030. This requires approximately 125 GW of dedicated renewable energy and 60-80 GW of electrolyzer capacity.",
      },
    ],
  },
  {
    id: 2,
    slug: "defence-electronics-make-in-india",
    title: "How Defence Electronics Manufacturing is Reshaping Make in India",
    category: "Technology",
    date: "January 15, 2026",
    isoDate: "2026-01-15",
    readTime: "7 min read",
    author: { name: "Manah Technology Division", role: "Electronics & Defence Manufacturing" },
    excerpt:
      "The defence electronics segment is witnessing unprecedented growth as India's offset policies drive local manufacturing of radar subsystems, electronic warfare suites, and avionics. Companies with SMT lines capable of military-grade soldering standards are positioned to capture a $12 billion addressable market.",
    image: "/images/sectors/defence_electronics.png",
    metaDescription:
      "India's defence electronics market reaches $12 billion as Make in India policies drive local manufacturing of radar, EW suites, and avionics. Explore the EPC and manufacturing opportunity.",
    metaKeywords: [
      "defence electronics India",
      "Make in India defence",
      "military electronics manufacturing",
      "SMT production lines",
      "radar subsystems",
      "electronic warfare",
    ],
    tags: ["Defence Electronics", "Manufacturing", "Make in India", "Technology"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "A $12 Billion Market Driven by Self-Reliance",
      },
      {
        type: "text",
        content:
          "India's defence electronics sector is undergoing a structural transformation driven by the government's Atmanirbhar Bharat (Self-Reliant India) initiative and increasingly stringent offset obligations on foreign defence procurement. With the Ministry of Defence mandating up to 60% indigenous content in new platform acquisitions, the demand for domestic electronics manufacturing capabilities — from printed circuit board assembly to full system integration — has never been higher.",
      },
      {
        type: "text",
        content:
          "The addressable market for defence electronics manufacturing in India is estimated at $12 billion through 2030, spanning radar subsystems, electronic warfare (EW) suites, communication systems, avionics, and electro-optical sensor packages. This figure does not include the growing dual-use segment where military-specification electronics serve both defence and civilian applications in sectors like space, telecommunications, and critical infrastructure.",
      },
      {
        type: "image",
        src: "/images/gallery/electronics_manufacturing_line.png",
        alt: "Advanced SMT production line manufacturing military-grade electronic assemblies with automated optical inspection",
        caption:
          "High-speed SMT lines capable of 0201 component placement at 80,000 CPH — essential for defence-grade PCB assembly.",
      },
      {
        type: "heading",
        level: 2,
        content: "Manufacturing Standards: From Commercial to Military Grade",
      },
      {
        type: "text",
        content:
          "The gap between commercial electronics manufacturing and military-grade production is substantial. Defence electronics must meet stringent standards including IPC-A-610 Class 3 for soldering quality, MIL-STD-810G for environmental testing, and DO-254 for airborne electronic hardware. These standards demand controlled manufacturing environments with temperature and humidity monitoring, automated optical inspection (AOI) at multiple stages, and rigorous traceability from component sourcing through final assembly.",
      },
      {
        type: "text",
        content:
          "Indian manufacturers that have invested in Class 3 capable SMT lines — with nitrogen reflow ovens, selective soldering systems, and 5DX X-ray inspection — are finding themselves in high demand from defence OEMs and system integrators. The conversion of existing commercial electronics manufacturing facilities to defence-capable production requires investment of $5-15 million per line, depending on the complexity and throughput requirements.",
      },
      {
        type: "quote",
        content:
          "The future of Indian defence capability rests not just on platform design, but on the manufacturing ecosystem that produces mission-critical electronic subsystems with zero-defect reliability.",
        attribution: "Defence Acquisition Council, 2025 Indigenous Content Report",
      },
      {
        type: "heading",
        level: 2,
        content: "Opportunity for EPC and Turnkey Solution Providers",
      },
      {
        type: "text",
        content:
          "The defence electronics boom creates significant downstream demand for EPC companies. New manufacturing facilities require cleanroom construction, specialised HVAC systems with HEPA filtration, ESD-protected flooring, backup power with zero-transfer-time UPS systems, and sophisticated fire suppression designed for electronics environments. Manah Technology Division's capabilities in facility construction, equipment installation, and production line commissioning position it uniquely at this intersection of construction and technology.",
      },
      {
        type: "keyTakeaways",
        items: [
          "India's defence electronics addressable market is $12 billion through 2030, driven by 60% indigenous content mandates",
          "Military-grade manufacturing requires IPC-A-610 Class 3 soldering, MIL-STD-810G environmental testing, and full component traceability",
          "Converting commercial SMT lines to defence capability requires $5-15 million investment per line",
          "EPC companies are essential for building the cleanroom facilities, power infrastructure, and controlled environments these manufacturing lines demand",
          "Dual-use electronics (defence + civilian) expand the addressable market significantly beyond pure defence procurement",
        ],
      },
    ],
    faqItems: [
      {
        question: "What is the size of India's defence electronics market?",
        answer:
          "India's defence electronics manufacturing market is estimated at $12 billion through 2030, covering radar subsystems, electronic warfare suites, communication systems, avionics, and electro-optical sensors. The Atmanirbhar Bharat initiative and 60% indigenous content mandates are the primary growth drivers.",
      },
      {
        question: "What standards are required for military-grade electronics manufacturing?",
        answer:
          "Military electronics must meet IPC-A-610 Class 3 for soldering quality, MIL-STD-810G for environmental testing (shock, vibration, temperature), and DO-254 for airborne hardware. Facilities need controlled environments, AOI inspection, and full component traceability.",
      },
    ],
  },
  {
    id: 3,
    slug: "765kv-transmission-engineering",
    title: "765kV Transmission Lines: Engineering Challenges and Solutions",
    category: "Industry Insights",
    date: "January 5, 2026",
    isoDate: "2026-01-05",
    readTime: "10 min read",
    author: { name: "Manah Dynamics Engineering Team", role: "Power Infrastructure Engineering" },
    excerpt:
      "Designing and constructing 765kV extra-high-voltage transmission lines presents unique engineering challenges — from tower foundation design in varying soil conditions to sag-tension calculations for long-span crossings. This deep-dive explores how modern simulation tools and field engineering practices are overcoming these hurdles.",
    image: "/images/sectors/power_transmission.png",
    metaDescription:
      "A deep-dive into the engineering challenges of 765kV EHV transmission lines: tower design, foundation engineering, sag-tension calculations, and modern simulation tools used by EPC firms.",
    metaKeywords: [
      "765kV transmission lines",
      "EHV transmission engineering",
      "tower foundation design",
      "sag-tension calculations",
      "power line construction",
      "transmission line EPC",
    ],
    tags: ["Power Transmission", "Engineering", "EHV", "Construction"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "The Structural Engineering of 765kV Towers",
      },
      {
        type: "text",
        content:
          "A 765kV transmission tower is one of the largest and most complex steel structures routinely constructed in the power sector. Standing 50 to 60 metres tall with a base width of 18 to 22 metres, these lattice structures must withstand extreme wind loads, differential ice loading on conductors, and the mechanical tension of quad-bundle ACSR conductors spanning 300 to 500 metres between towers.",
      },
      {
        type: "text",
        content:
          "Modern 765kV tower design uses finite element analysis (FEA) software to model every member, bolt, and connection under dozens of loading combinations specified by IS 802 and IEC 60826. The critical design loads include broken wire conditions — where one conductor in a multi-conductor bundle fails, creating asymmetric forces that can exceed 100 kN — and high-wind events where sustained winds of 150-180 km/h generate lateral forces that test the tower's structural limits.",
      },
      {
        type: "image",
        src: "/images/gallery/transmission_tower_construction.png",
        alt: "765kV extra-high-voltage transmission tower under construction with crane operations in a rural landscape",
        caption:
          "A 765kV lattice tower being assembled — each tower contains 15-25 tonnes of galvanized steel and requires precision erection sequences.",
      },
      {
        type: "heading",
        level: 2,
        content: "Foundation Design: Where Soil Meets Structure",
      },
      {
        type: "text",
        content:
          "Foundation engineering for 765kV towers is arguably the most site-specific and technically demanding phase of transmission line construction. Unlike building foundations that can be standardized, each tower foundation must be designed based on actual soil conditions encountered at that specific location. A single 200 km transmission line may traverse black cotton soil, laterite, sandy alluvium, and rocky terrain — each requiring fundamentally different foundation types.",
      },
      {
        type: "text",
        content:
          "Common foundation types include spread footings for competent soils, pile foundations for weak or waterlogged ground, and rock anchors for hard strata. For 765kV towers in poor soil conditions, pile foundations may extend 15 to 20 metres deep with pile caps connecting four to eight piles per leg. The uplift resistance requirement — often exceeding 80 tonnes per leg — drives foundation dimensions and reinforcement requirements.",
      },
      {
        type: "heading",
        level: 3,
        content: "Soil Investigation: The Foundation of Good Foundations",
      },
      {
        type: "text",
        content:
          "Comprehensive soil investigation at every tower location is non-negotiable. Standard practice includes bore holes to at least 1.5 times the expected foundation depth, standard penetration tests (SPT) at 1.5-metre intervals, and laboratory testing for soil classification, bearing capacity, and chemical composition (particularly sulphate and chloride content that can attack concrete). On a 200-tower transmission line, this translates to 200-400 boreholes — a significant mobilization and logistics effort.",
      },
      {
        type: "quote",
        content:
          "In transmission line engineering, every tower is a unique structure. The soil beneath Tower 47 may bear no resemblance to the soil beneath Tower 48 just 400 metres away. This variability is what makes transmission EPC fundamentally different from building construction.",
        attribution: "Manah Dynamics, Engineering Design Manual",
      },
      {
        type: "heading",
        level: 2,
        content: "Conductor Stringing and Sag-Tension Engineering",
      },
      {
        type: "text",
        content:
          "Stringing quad-bundle ACSR (Aluminium Conductor Steel Reinforced) conductors on a 765kV line requires specialized equipment and precise engineering calculations. Each phase consists of four sub-conductors maintained at 450mm spacing by spacer-dampers installed at 60-75 metre intervals. The total conductor weight per span can exceed 20 tonnes, creating enormous tension forces that must be carefully managed during stringing to avoid over-stressing towers or conductors.",
      },
      {
        type: "text",
        content:
          "Sag-tension calculations determine the exact conductor profile between towers under all operating conditions — from minimum temperature with maximum wind to maximum temperature with no wind. Getting these calculations wrong can result in inadequate ground clearance (a safety hazard), excessive tower loading (a structural risk), or premature conductor fatigue (a reliability issue). Modern practice uses PLS-CADD software for 3D modelling of the entire line, incorporating LiDAR survey data for terrain representation.",
      },
      {
        type: "keyTakeaways",
        items: [
          "765kV towers stand 50-60 metres tall and must withstand broken wire conditions exceeding 100 kN of asymmetric force",
          "Foundation design varies dramatically along a single line route — pile foundations for poor soils may extend 15-20 metres deep",
          "200-400 boreholes are needed for soil investigation on a typical 200-tower transmission line",
          "Quad-bundle ACSR conductors with 450mm spacing create per-span weights exceeding 20 tonnes",
          "PLS-CADD software with LiDAR data enables accurate 3D sag-tension modelling across complex terrain",
          "Modern FEA tools model dozens of IS 802 and IEC 60826 loading combinations for each tower type",
        ],
      },
    ],
    faqItems: [
      {
        question: "How tall are 765kV transmission towers?",
        answer:
          "765kV extra-high-voltage transmission towers typically stand 50 to 60 metres tall with a base width of 18 to 22 metres. Each tower contains 15-25 tonnes of galvanized steel and must withstand extreme wind loads and broken wire conditions.",
      },
      {
        question: "What software is used for transmission line design?",
        answer:
          "Modern transmission line design uses PLS-CADD for 3D line modelling with LiDAR terrain data, and finite element analysis (FEA) software for tower structural design under loading combinations specified by IS 802 and IEC 60826 standards.",
      },
    ],
  },
  {
    id: 4,
    slug: "manah-aerospace-easa-part-145",
    title: "Manah Aerospace Achieves EASA Part 145 Certification",
    category: "Company News",
    date: "December 20, 2025",
    isoDate: "2025-12-20",
    readTime: "4 min read",
    author: { name: "Manah Aerospace Division", role: "Aviation & MRO Services" },
    excerpt:
      "A landmark achievement for our aviation division — EASA Part 145 approval enables Manah Aerospace to service aircraft registered in European Union member states, significantly expanding our addressable MRO market beyond DGCA-registered fleets.",
    image: "/images/news/aerospace-mro.jpg",
    metaDescription:
      "Manah Aerospace achieves EASA Part 145 certification, enabling MRO services for EU-registered aircraft. Learn how this expands India's aviation maintenance capabilities.",
    metaKeywords: [
      "EASA Part 145",
      "MRO certification India",
      "aircraft maintenance",
      "Manah Aerospace",
      "aviation MRO",
      "EU aircraft servicing",
    ],
    tags: ["Aviation", "MRO", "Certification", "Company News"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "A New Chapter for Indian Aviation MRO",
      },
      {
        type: "text",
        content:
          "Manah Aerospace has secured European Union Aviation Safety Agency (EASA) Part 145 approval — one of the most rigorous maintenance organization certifications in global aviation. This certification authorizes our facilities to perform line and base maintenance on aircraft registered in all 27 EU member states, as well as countries that recognize EASA approvals through bilateral agreements.",
      },
      {
        type: "text",
        content:
          "The achievement is the culmination of an 18-month preparation and audit process involving comprehensive upgrades to our quality management systems, tooling calibration programs, technical library management, and human factors training. EASA auditors conducted multiple site visits, documentation reviews, and competency assessments before granting approval.",
      },
      {
        type: "image",
        src: "/images/gallery/aircraft_mro_hangar.png",
        alt: "Modern aircraft MRO hangar with wide-body aircraft undergoing maintenance checks and inspection",
        caption:
          "Manah Aerospace's EASA-certified maintenance hangar — equipped for line and base maintenance on narrow-body and wide-body aircraft.",
      },
      {
        type: "heading",
        level: 2,
        content: "Why EASA Part 145 Matters for Indian Aviation",
      },
      {
        type: "text",
        content:
          "India's commercial aviation fleet is projected to exceed 1,500 aircraft by 2030, yet over 85% of heavy maintenance is currently performed overseas — primarily in Singapore, Sri Lanka, and the Middle East. Each aircraft sent abroad for maintenance represents a $2-5 million revenue opportunity lost to foreign MRO providers, plus 15-30 days of aircraft downtime that directly impacts airline operational efficiency.",
      },
      {
        type: "text",
        content:
          "EASA Part 145 certification is a prerequisite for servicing aircraft operated by European carriers and leasing companies — which collectively manage a significant portion of the global narrow-body fleet. For Indian MRO providers, this certification opens doors to third-party maintenance contracts that were previously inaccessible, transforming India from a maintenance importer to a potential maintenance exporter.",
      },
      {
        type: "quote",
        content:
          "EASA Part 145 approval is not just a certificate on the wall. It represents a fundamental validation of our quality systems, our people's competencies, and our commitment to the highest safety standards in global aviation.",
        attribution: "Manah Aerospace, Division Head",
      },
      {
        type: "heading",
        level: 2,
        content: "What This Means for Our Clients",
      },
      {
        type: "text",
        content:
          "Airlines and leasing companies operating EU-registered aircraft in India and the broader South Asian region now have a DGCA and EASA dual-certified domestic MRO option. This reduces ferry flight costs, shortens turnaround times, and provides maintenance continuity without cross-border logistics complexity. Our initial EASA scope covers A320 family and ATR 72 aircraft types, with B737 MAX and A330 capabilities to follow within the next 12 months.",
      },
      {
        type: "keyTakeaways",
        items: [
          "Manah Aerospace now holds dual DGCA and EASA Part 145 certification — a rare distinction among Indian MRO providers",
          "Certification covers 27 EU member states plus countries with EASA bilateral agreements",
          "Over 85% of India's heavy aircraft maintenance is currently outsourced overseas — a $4 billion annual market",
          "Initial EASA scope covers A320 family and ATR 72, with B737 MAX and A330 planned within 12 months",
          "The 18-month certification journey required upgrades to quality systems, tooling, and human factors training",
        ],
      },
    ],
    faqItems: [
      {
        question: "What is EASA Part 145 certification?",
        answer:
          "EASA Part 145 is the European Union Aviation Safety Agency's approval for aircraft maintenance organizations. It certifies that a facility meets rigorous standards for quality management, tooling, training, and safety to perform maintenance on EU-registered aircraft.",
      },
      {
        question: "Why does India need EASA-certified MRO facilities?",
        answer:
          "Over 85% of India's heavy aircraft maintenance is currently outsourced to foreign facilities, representing a $4 billion annual market. EASA certification enables Indian MRO providers to service EU-registered aircraft domestically, reducing costs and turnaround times for airlines.",
      },
    ],
  },
  {
    id: 5,
    slug: "solar-epc-bifacial-tracker",
    title: "The Future of Solar EPC: Bifacial Modules and Tracker Innovation",
    category: "Sustainability",
    date: "December 8, 2025",
    isoDate: "2025-12-08",
    readTime: "6 min read",
    author: { name: "Manah Renewable Energy Team", role: "Green Energy & Solar EPC" },
    excerpt:
      "Bifacial solar modules paired with single-axis trackers are delivering 15-25% higher energy yields compared to fixed-tilt monofacial installations. For EPC contractors, this shift demands new design methodologies for ground clearance, albedo optimization, and tracker foundation engineering.",
    image: "/images/sectors/renewable_energy.png",
    metaDescription:
      "Bifacial solar modules with single-axis trackers deliver 15-25% higher energy yields. Learn about design changes, albedo optimization, and EPC challenges for next-gen solar plants.",
    metaKeywords: [
      "bifacial solar modules",
      "single-axis tracker",
      "solar EPC",
      "renewable energy India",
      "solar plant design",
      "albedo optimization",
    ],
    tags: ["Solar Energy", "Sustainability", "EPC", "Renewable"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "Bifacial + Trackers: The New Standard for Utility-Scale Solar",
      },
      {
        type: "text",
        content:
          "The solar EPC landscape is undergoing its most significant technology shift since the transition from polycrystalline to monocrystalline cells. Bifacial solar modules — which generate electricity from both front and rear surfaces — combined with single-axis tracking systems are rapidly becoming the default configuration for utility-scale solar plants worldwide. In India, this combination is particularly compelling given the country's high direct normal irradiance (DNI) and the albedo characteristics of the sandy and light-coloured soils common in Rajasthan, Gujarat, and Tamil Nadu.",
      },
      {
        type: "text",
        content:
          "Field data from operational bifacial-tracker installations in India consistently shows 15-25% higher annual energy yields compared to equivalent fixed-tilt monofacial plants. The bifacial gain — energy harvested from reflected and diffused light hitting the module's rear surface — typically contributes 8-15% additional generation, while single-axis tracking adds another 10-15% by continuously optimizing the module's orientation relative to the sun.",
      },
      {
        type: "image",
        src: "/images/gallery/solar_farm_aerial.png",
        alt: "Aerial view of a large-scale solar farm with single-axis tracker systems arranged in rows across semi-arid terrain",
        caption:
          "Utility-scale solar installation with single-axis trackers — each row independently tracks the sun from east to west throughout the day.",
      },
      {
        type: "heading",
        level: 2,
        content: "Design Changes for EPC Contractors",
      },
      {
        type: "text",
        content:
          "For EPC contractors, the shift to bifacial-tracker systems demands fundamental changes in plant design methodology. Ground clearance must increase from the typical 0.5 metres for fixed-tilt systems to 1.0-1.5 metres for bifacial modules, ensuring adequate space for light to reach the rear surface. This increased clearance affects foundation pile lengths, cable routing, and access for robotic cleaning systems.",
      },
      {
        type: "text",
        content:
          "Albedo management becomes a critical design parameter — the reflectivity of the ground surface directly impacts bifacial gain. White gravel, light-coloured sand, and even specialized reflective ground covers can increase rear-surface generation by 5-10% compared to dark or vegetated surfaces. EPC contractors must now include albedo assessment and ground preparation in their scope of work, a requirement that did not exist for monofacial installations.",
      },
      {
        type: "heading",
        level: 3,
        content: "Tracker Foundation Engineering",
      },
      {
        type: "text",
        content:
          "Single-axis tracker foundations present unique engineering challenges. Unlike fixed-tilt structures that distribute loads across multiple connection points, trackers concentrate both static and dynamic loads on single torque tubes supported by driven piles or ground screws. Wind-induced resonance and torsional flutter — phenomena largely irrelevant for fixed-tilt systems — become critical design considerations that require site-specific wind tunnel testing and dynamic structural analysis.",
      },
      {
        type: "quote",
        content:
          "The transition to bifacial-tracker systems is not just a module swap — it fundamentally changes how we design, build, and commission solar plants. Every aspect from civil works to electrical design must be rethought.",
        attribution: "Manah Renewable Energy Team, Solar EPC Practice Lead",
      },
      {
        type: "keyTakeaways",
        items: [
          "Bifacial modules with single-axis trackers deliver 15-25% higher energy yields than fixed-tilt monofacial systems",
          "Bifacial rear-surface gain contributes 8-15% additional energy, while tracking adds 10-15%",
          "Ground clearance must increase to 1.0-1.5 metres (from 0.5m) to optimize rear-surface irradiance",
          "Albedo management — using reflective ground surfaces — can boost bifacial gain by an additional 5-10%",
          "Tracker foundations require site-specific wind and torsional analysis not needed for fixed-tilt installations",
        ],
      },
    ],
    faqItems: [
      {
        question: "What is a bifacial solar module?",
        answer:
          "A bifacial solar module generates electricity from both its front and rear surfaces. The rear side captures reflected and diffused light from the ground, producing 8-15% additional energy compared to standard monofacial modules that only use the front surface.",
      },
      {
        question: "How much more energy do bifacial trackers produce?",
        answer:
          "Bifacial modules paired with single-axis trackers typically produce 15-25% more energy annually compared to fixed-tilt monofacial systems. The bifacial gain adds 8-15% and tracking adds another 10-15%.",
      },
    ],
  },
  {
    id: 6,
    slug: "smart-grid-power-distribution",
    title: "Smart Grid Technologies Transforming Power Distribution",
    category: "Technology",
    date: "November 25, 2025",
    isoDate: "2025-11-25",
    readTime: "8 min read",
    author: { name: "Manah Research Team", role: "Strategic Research & Analysis" },
    excerpt:
      "The convergence of IoT sensors, advanced metering infrastructure, and AI-driven load forecasting is transforming passive distribution networks into intelligent, self-healing grids. Utilities investing in these technologies are seeing 30% reductions in aggregate technical and commercial losses.",
    image: "/images/news/power-transmission.jpg",
    metaDescription:
      "Smart grid technologies — IoT sensors, AMI, and AI load forecasting — are cutting distribution losses by 30%. Explore the transformation of India's power distribution networks.",
    metaKeywords: [
      "smart grid India",
      "power distribution",
      "IoT sensors grid",
      "advanced metering infrastructure",
      "AI load forecasting",
      "distribution loss reduction",
    ],
    tags: ["Smart Grid", "IoT", "Power Distribution", "AI"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "From Passive Networks to Intelligent Grids",
      },
      {
        type: "text",
        content:
          "India's power distribution sector has long been the weakest link in the electricity value chain. While generation capacity has grown robustly and transmission networks have expanded to interconnect all five regional grids, distribution utilities (discoms) continue to grapple with aggregate technical and commercial (AT&C) losses averaging 17-20% nationally — and exceeding 30% in some states. These losses translate to approximately ₹90,000 crore ($11 billion) in annual revenue leakage.",
      },
      {
        type: "text",
        content:
          "Smart grid technologies offer a proven pathway to dramatically reduce these losses. The convergence of Internet of Things (IoT) sensors deployed across the distribution network, advanced metering infrastructure (AMI) at consumer endpoints, and artificial intelligence-driven analytics in control centres is creating distribution systems that can detect faults in milliseconds, isolate damaged sections automatically, and reroute power through healthy feeders — all without human intervention.",
      },
      {
        type: "image",
        src: "/images/blog/resilient_power_grids.png",
        alt: "Modern smart grid control centre with digital displays showing real-time power distribution network monitoring",
        caption:
          "A smart grid operations centre — real-time monitoring of distribution networks enables predictive maintenance and automated fault isolation.",
      },
      {
        type: "heading",
        level: 2,
        content: "Key Technology Components",
      },
      {
        type: "text",
        content:
          "Advanced Metering Infrastructure (AMI) forms the consumer-facing layer of the smart grid. Unlike conventional meters that record cumulative consumption, AMI smart meters provide 15-minute interval data on energy consumption, power quality parameters, and tamper events. India's Revamped Distribution Sector Scheme (RDSS) targets installation of 250 million smart meters by 2026 — an infrastructure deployment of staggering scale that creates massive EPC demand for meter installation, communication network rollout, and data centre construction.",
      },
      {
        type: "text",
        content:
          "Distribution automation through IoT sensors — including fault passage indicators, remote-controlled switches, and power quality monitors — enables self-healing network capabilities. When a fault occurs on a feeder, sensors detect the fault location within seconds, automated switches isolate the faulted section, and power is rerouted through alternate paths. This reduces average outage duration from hours to minutes, directly improving consumer experience and utility revenue.",
      },
      {
        type: "quote",
        content:
          "Smart meters are not just measuring devices — they are the sensory nervous system of the modern grid. Every 15-minute reading creates a data point that, when combined with millions of others, reveals patterns that human operators could never detect.",
        attribution: "RDSS Implementation Review, Ministry of Power 2025",
      },
      {
        type: "heading",
        level: 2,
        content: "AI and Machine Learning in Grid Operations",
      },
      {
        type: "text",
        content:
          "AI-driven load forecasting is perhaps the most transformative application of smart grid technology. Machine learning models trained on historical consumption data, weather patterns, industrial production schedules, and even social event calendars can predict feeder-level demand with 95-98% accuracy for day-ahead forecasting. This precision enables utilities to optimize transformer loading, reduce demand charges from bulk power purchases, and plan maintenance windows with minimal supply disruption.",
      },
      {
        type: "text",
        content:
          "Utilities that have implemented comprehensive smart grid solutions are reporting 25-30% reductions in AT&C losses within three to five years of deployment. In financial terms, this translates to improved revenue realization that often pays back the smart grid investment within four to six years — making it one of the most compelling returns on infrastructure investment in the power sector.",
      },
      {
        type: "keyTakeaways",
        items: [
          "India's distribution AT&C losses average 17-20%, costing approximately ₹90,000 crore ($11 billion) annually",
          "250 million smart meters targeted under RDSS by 2026 — a massive EPC deployment opportunity",
          "Self-healing grid capabilities reduce outage durations from hours to minutes using IoT sensors and automated switches",
          "AI load forecasting achieves 95-98% accuracy for day-ahead predictions at feeder level",
          "Smart grid implementations deliver 25-30% AT&C loss reductions with 4-6 year payback periods",
        ],
      },
    ],
    faqItems: [
      {
        question: "What are AT&C losses in power distribution?",
        answer:
          "Aggregate Technical and Commercial (AT&C) losses include both physical energy losses in distribution networks (technical) and revenue losses from theft, metering errors, and billing inefficiency (commercial). India's AT&C losses average 17-20%, costing approximately ₹90,000 crore ($11 billion) per year.",
      },
      {
        question: "How many smart meters is India deploying?",
        answer:
          "Under the Revamped Distribution Sector Scheme (RDSS), India targets installation of 250 million smart meters by 2026. These AMI meters provide 15-minute interval data on consumption, power quality, and tamper events, forming the consumer-facing layer of the smart grid.",
      },
    ],
  },
  {
    id: 7,
    slug: "aviation-mro-india-growth",
    title: "Aviation MRO in India: Growth Drivers and Market Outlook",
    category: "Aviation",
    date: "November 12, 2025",
    isoDate: "2025-11-12",
    readTime: "7 min read",
    author: { name: "Manah Aerospace Division", role: "Aviation & MRO Services" },
    excerpt:
      "India's commercial aviation fleet is projected to exceed 1,500 aircraft by 2030, creating a $4 billion annual MRO demand. With over 85% of heavy maintenance currently outsourced overseas, the opportunity for domestic MRO facilities with global certifications is immense and immediate.",
    image: "/images/hero/hero_aviation_mro.png",
    metaDescription:
      "India's aviation MRO market will reach $4 billion annually by 2030 with 1,500+ aircraft. Explore why 85% of maintenance is outsourced and the domestic MRO opportunity.",
    metaKeywords: [
      "aviation MRO India",
      "aircraft maintenance market",
      "India fleet growth",
      "MRO outsourcing",
      "domestic MRO facilities",
      "aviation industry India",
    ],
    tags: ["Aviation", "MRO", "Market Outlook", "India"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "India's Aviation Boom: 1,500 Aircraft by 2030",
      },
      {
        type: "text",
        content:
          "India is the world's fastest-growing major aviation market. Domestic passenger traffic has grown at a compound annual growth rate (CAGR) of 12-14% over the past decade, and the country's commercial fleet is projected to expand from approximately 700 aircraft today to over 1,500 by 2030. Airlines have placed orders for more than 1,500 new aircraft — IndiGo alone has ordered 500 Airbus A320neo family aircraft, making it one of the largest single-airline orders in aviation history.",
      },
      {
        type: "text",
        content:
          "This fleet expansion drives proportional growth in maintenance, repair, and overhaul (MRO) demand. Every commercial aircraft requires regular inspections and maintenance checks at defined intervals — from daily line checks to heavy C-checks every 18-24 months and D-checks every 6-10 years. The cumulative MRO demand from India's growing fleet is estimated at $4 billion annually by 2030, making it one of the most attractive MRO markets in the Asia-Pacific region.",
      },
      {
        type: "image",
        src: "/images/gallery/aircraft_mro_hangar.png",
        alt: "Wide-body aircraft inside a modern MRO hangar undergoing scheduled maintenance with specialized equipment and tooling",
        caption:
          "A wide-body aircraft undergoing C-check maintenance — each heavy check requires 30,000-50,000 man-hours of skilled labour.",
      },
      {
        type: "heading",
        level: 2,
        content: "The 85% Outsourcing Problem",
      },
      {
        type: "text",
        content:
          "Despite India's massive and growing fleet, over 85% of heavy maintenance work is performed at overseas MRO facilities — primarily in Singapore, Sri Lanka, Turkey, and the UAE. This outsourcing is driven by three factors: limited hangar capacity in India, historically high GST rates on MRO services (which have since been reduced to 5%), and a shortage of EASA/FAA-certified domestic facilities that can service the diverse aircraft types operated by Indian carriers.",
      },
      {
        type: "text",
        content:
          "The economic impact of this outsourcing is substantial. Each narrow-body aircraft sent overseas for a C-check costs $2-3 million including ferry flight fuel, foreign labour rates, and downtime. For wide-body aircraft, D-check costs can exceed $5-8 million. With Indian carriers performing hundreds of heavy checks annually, the foreign exchange outflow runs into billions of dollars — revenue that could support domestic jobs and develop indigenous capabilities.",
      },
      {
        type: "quote",
        content:
          "India cannot become a $5 trillion economy while outsourcing 85% of its aircraft maintenance to other countries. Domestic MRO capability is not just an aviation issue — it is an economic sovereignty imperative.",
        attribution: "Ministry of Civil Aviation, National MRO Policy 2025",
      },
      {
        type: "heading",
        level: 2,
        content: "Building Domestic MRO Capability",
      },
      {
        type: "text",
        content:
          "The Indian government has taken several steps to catalyze domestic MRO growth: reducing GST on MRO services from 18% to 5%, announcing MRO hubs at major airports, and incentivizing global MRO players to establish Indian operations. The challenge now shifts to execution — building the physical infrastructure (hangars, workshops, warehouses), developing the skilled workforce (AME-licensed engineers, NDT specialists, avionics technicians), and securing the global certifications (EASA, FAA) that airlines and lessors require.",
      },
      {
        type: "text",
        content:
          "For companies like Manah Aerospace with existing DGCA and newly acquired EASA Part 145 certification, the opportunity is to scale capacity rapidly while the market transitions from overseas to domestic maintenance. The first movers who can offer globally certified, competitively priced heavy maintenance for the A320neo family — which will dominate India's narrow-body fleet for the next two decades — will capture a disproportionate share of this $4 billion market.",
      },
      {
        type: "keyTakeaways",
        items: [
          "India's commercial fleet will grow from ~700 to 1,500+ aircraft by 2030, driving $4 billion annual MRO demand",
          "Over 85% of heavy maintenance is currently outsourced overseas, primarily to Singapore, Sri Lanka, and UAE",
          "Each overseas C-check costs $2-3 million per narrow-body aircraft including ferry flights and downtime",
          "GST on MRO reduced from 18% to 5%, improving domestic cost competitiveness",
          "A320neo family servicing capability is the critical first step — this type will dominate India's fleet for 20+ years",
          "EASA and FAA certifications are prerequisites for serving international carriers and leasing companies",
        ],
      },
    ],
    faqItems: [
      {
        question: "How big is India's aviation MRO market?",
        answer:
          "India's aviation MRO market is projected to reach $4 billion annually by 2030, driven by fleet expansion to 1,500+ commercial aircraft. Currently, over 85% of heavy maintenance is outsourced to overseas facilities.",
      },
      {
        question: "Why is most Indian aircraft maintenance done overseas?",
        answer:
          "Three primary factors: limited hangar capacity in India, historical GST disadvantages (since reduced from 18% to 5%), and a shortage of EASA/FAA-certified domestic facilities. This results in billions of dollars in foreign exchange outflow annually.",
      },
    ],
  },
  {
    id: 8,
    slug: "esg-reporting-infrastructure",
    title: "ESG Reporting: Why Infrastructure Companies Must Lead",
    category: "Sustainability",
    date: "October 30, 2025",
    isoDate: "2025-10-30",
    readTime: "5 min read",
    author: { name: "Manah Corporate Strategy", role: "Corporate Strategy & ESG" },
    excerpt:
      "With SEBI's BRSR framework mandating ESG disclosures for the top 1,000 listed companies, infrastructure and EPC firms face heightened scrutiny on carbon emissions, water usage, and supply chain ethics. Companies that embed ESG into project delivery — not just annual reports — will win more bids.",
    image: "/images/news/green-hydrogen.jpg",
    metaDescription:
      "SEBI's BRSR framework mandates ESG reporting for India's top 1,000 companies. Learn why infrastructure and EPC firms must embed sustainability into project delivery to win bids.",
    metaKeywords: [
      "ESG reporting India",
      "BRSR framework SEBI",
      "infrastructure ESG",
      "sustainability EPC",
      "carbon emissions construction",
      "supply chain ethics",
    ],
    tags: ["ESG", "Sustainability", "BRSR", "Infrastructure"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "SEBI's BRSR Framework: Mandatory ESG Disclosure",
      },
      {
        type: "text",
        content:
          "The Securities and Exchange Board of India (SEBI) has made Business Responsibility and Sustainability Reporting (BRSR) mandatory for the top 1,000 listed companies by market capitalization. Starting FY2023-24, the BRSR Core framework requires quantitative disclosures on greenhouse gas emissions (Scope 1 and 2), water consumption and recycling rates, waste management practices, and workforce diversity metrics — backed by reasonable assurance from independent auditors.",
      },
      {
        type: "text",
        content:
          "For infrastructure and EPC companies, these requirements create a unique challenge. Unlike software companies or financial services firms where ESG metrics are relatively contained, construction and engineering enterprises have complex, project-specific footprints. A single large EPC project can involve thousands of workers, hundreds of equipment pieces, millions of litres of water, and supply chains spanning multiple states — each generating ESG data that must be systematically captured, verified, and reported.",
      },
      {
        type: "image",
        src: "/images/blog/green_hydrogen_future.png",
        alt: "Sustainability reporting dashboard showing carbon emissions tracking, water usage metrics, and ESG compliance indicators",
        caption:
          "ESG dashboards are becoming essential infrastructure for EPC companies — real-time tracking enables project-level sustainability management.",
      },
      {
        type: "heading",
        level: 2,
        content: "Beyond Compliance: ESG as a Competitive Advantage",
      },
      {
        type: "text",
        content:
          "Forward-thinking EPC companies are discovering that ESG is not just a compliance burden — it is becoming a decisive factor in bid evaluations. Multilateral development banks (World Bank, ADB, AIIB) now include sustainability criteria worth 10-20% of total evaluation scores in infrastructure project tenders. Government agencies are following suit, with the National Highways Authority of India (NHAI) piloting green procurement standards that favour contractors with demonstrated ESG track records.",
      },
      {
        type: "text",
        content:
          "Private sector clients, particularly in the data centre, semiconductor, and renewable energy segments, are increasingly requiring their EPC contractors to demonstrate carbon accounting capabilities, sustainable material sourcing, and fair labour practices. Companies that can provide project-specific carbon footprint reports, water balance calculations, and social impact assessments alongside traditional engineering deliverables are winning bids at premium rates.",
      },
      {
        type: "quote",
        content:
          "The construction industry accounts for 38% of global carbon emissions. Infrastructure companies that fail to measure, report, and reduce their project-level emissions will find themselves excluded from the most valuable contracts of the next decade.",
        attribution: "World Green Building Council, Global Status Report 2025",
      },
      {
        type: "heading",
        level: 2,
        content: "Practical Steps for Infrastructure Companies",
      },
      {
        type: "list",
        style: "numbered",
        items: [
          "Implement project-level carbon tracking from day one — not as a year-end exercise. Use digital tools that integrate with equipment telematics and material procurement systems.",
          "Establish water stewardship programs at every project site, including rainwater harvesting, construction water recycling, and community water source protection measures.",
          "Map your supply chain beyond Tier 1 suppliers. BRSR Core requires disclosure of sustainability practices across the value chain — this requires active engagement with material suppliers, logistics providers, and subcontractors.",
          "Invest in workforce development: safety training hours, skill development programs, and diversity metrics are all reportable under BRSR and valued in bid evaluations.",
          "Consider voluntary certifications (ISO 14001, SA 8000, GRIHA) that demonstrate commitment beyond minimum regulatory requirements.",
        ],
      },
      {
        type: "keyTakeaways",
        items: [
          "SEBI's BRSR Core mandates ESG disclosure with independent assurance for India's top 1,000 listed companies",
          "Multilateral banks now allocate 10-20% of bid evaluation scores to sustainability criteria",
          "Construction accounts for 38% of global carbon emissions — making EPC ESG reporting critical",
          "Project-level carbon tracking and water stewardship are becoming competitive differentiators, not just compliance requirements",
          "Supply chain transparency beyond Tier 1 is now a regulatory requirement under BRSR Core",
        ],
      },
    ],
    faqItems: [
      {
        question: "What is the BRSR framework in India?",
        answer:
          "BRSR (Business Responsibility and Sustainability Reporting) is SEBI's mandatory ESG disclosure framework for India's top 1,000 listed companies. It requires quantitative reporting on GHG emissions, water usage, waste management, and workforce metrics with independent auditor assurance.",
      },
      {
        question: "How does ESG affect infrastructure bid evaluations?",
        answer:
          "Multilateral development banks (World Bank, ADB, AIIB) now assign 10-20% of infrastructure bid evaluation scores to sustainability criteria. Government agencies like NHAI are piloting similar green procurement standards. Companies with demonstrated ESG capabilities win more contracts at premium rates.",
      },
    ],
  },
  {
    id: 9,
    slug: "electronics-manufacturing-facility",
    title: "From Prototype to Production: Inside Our Electronics Manufacturing Facility",
    category: "Company News",
    date: "October 15, 2025",
    isoDate: "2025-10-15",
    readTime: "6 min read",
    author: { name: "Manah Technology Division", role: "Electronics & Defence Manufacturing" },
    excerpt:
      "A behind-the-scenes look at Manah's electronics manufacturing services facility — from eight SMT production lines running 0201 components at 80,000 placements per hour to automated optical inspection systems achieving 99.97% defect detection rates on complex PCB assemblies.",
    image: "/images/sectors/manufacturing.png",
    metaDescription:
      "Tour Manah's electronics manufacturing facility: 8 SMT lines, 80,000 CPH placement speed, 99.97% AOI detection, and capabilities spanning prototype to volume production.",
    metaKeywords: [
      "electronics manufacturing India",
      "SMT production line",
      "PCB assembly",
      "contract manufacturing",
      "automated optical inspection",
      "EMS facility",
    ],
    tags: ["Manufacturing", "Electronics", "Technology", "Company News"],
    content: [
      {
        type: "heading",
        level: 2,
        content: "World-Class Manufacturing Under One Roof",
      },
      {
        type: "text",
        content:
          "Manah Technology Division's electronics manufacturing services (EMS) facility represents one of India's most advanced contract manufacturing operations. Spanning 50,000 square feet of climate-controlled production space, the facility houses eight surface mount technology (SMT) production lines, three through-hole assembly stations, a conformal coating line, and dedicated areas for box build, system integration, and final testing.",
      },
      {
        type: "text",
        content:
          "The facility is designed to handle the full spectrum of electronics manufacturing — from rapid prototyping of 10-unit engineering samples to sustained volume production runs of 100,000+ units per month. This versatility is critical for serving defence customers who need small-batch, high-reliability assemblies alongside telecommunications clients requiring high-volume, cost-optimized production.",
      },
      {
        type: "image",
        src: "/images/gallery/data_center_corridor.png",
        alt: "Interior of an advanced electronics manufacturing facility showing SMT production lines with automated pick-and-place machines",
        caption:
          "Inside the EMS facility — automated pick-and-place machines handle components as small as 0201 (0.6mm × 0.3mm) at 80,000 placements per hour.",
      },
      {
        type: "heading",
        level: 2,
        content: "SMT Lines: Speed, Precision, and Flexibility",
      },
      {
        type: "text",
        content:
          "Each of our eight SMT lines is configured for maximum flexibility and throughput. The lines feature high-speed pick-and-place machines capable of handling components from 0201 (0.6mm × 0.3mm) to large QFP and BGA packages, with placement accuracy of ±25 microns at speeds of 80,000 components per hour (CPH). Solder paste printing uses enclosed-head printers with automatic stencil cleaning and 2D/3D paste inspection, ensuring consistent solder deposits across every board in the production run.",
      },
      {
        type: "text",
        content:
          "Reflow soldering is performed in nitrogen-atmosphere convection ovens with 12 independently controlled heating zones. The nitrogen environment (oxygen levels below 500 ppm) reduces solder oxidation, improves wetting, and is essential for the lead-free SAC305 solder alloys used across all our production lines. Each oven's thermal profile is validated using 20-point thermocouple measurements and stored digitally for complete production traceability.",
      },
      {
        type: "heading",
        level: 2,
        content: "Quality Assurance: 99.97% Defect Detection",
      },
      {
        type: "text",
        content:
          "Quality assurance begins with incoming component verification and continues through every production stage. Post-reflow, every board passes through automated optical inspection (AOI) systems that capture high-resolution images of every solder joint and component placement. Our AOI systems achieve a defect detection rate of 99.97%, identifying issues ranging from tombstoned components and solder bridges to missing or misaligned parts.",
      },
      {
        type: "text",
        content:
          "For high-reliability assemblies — particularly defence and aerospace applications — we employ 5DX automated X-ray inspection (AXI) to examine solder joints hidden beneath BGA packages, QFN components, and shield cans where optical inspection cannot reach. This combination of AOI and AXI provides comprehensive inspection coverage that meets IPC-A-610 Class 3 requirements for mission-critical electronics.",
      },
      {
        type: "quote",
        content:
          "In electronics manufacturing, quality is not inspected in — it is built in. Every parameter, from solder paste viscosity to reflow peak temperature, must be controlled within tight tolerances to achieve the defect rates our customers demand.",
        attribution: "Manah Technology Division, Quality Assurance Director",
      },
      {
        type: "heading",
        level: 2,
        content: "From Prototype to Production: The NPI Process",
      },
      {
        type: "text",
        content:
          "Our New Product Introduction (NPI) process is designed to compress the timeline from engineering prototype to production-ready product. The NPI team works directly with customer design engineers to review PCB layouts for manufacturability (DFM), optimize component placements for automated assembly, and identify potential reliability issues before the first board is built. This collaborative approach typically reduces time-to-production by 30-40% compared to a traditional sequential handoff from design to manufacturing.",
      },
      {
        type: "keyTakeaways",
        items: [
          "50,000 sq ft facility with 8 SMT lines, 3 through-hole stations, and dedicated testing areas",
          "Handles prototype runs (10 units) through volume production (100,000+ units/month)",
          "Pick-and-place accuracy of ±25 microns at 80,000 CPH for components down to 0201 size",
          "Nitrogen reflow with 12-zone convection ovens and digital thermal profile traceability",
          "99.97% AOI defect detection rate, supplemented by 5DX X-ray for BGA and hidden joint inspection",
          "NPI process reduces time-to-production by 30-40% through early DFM collaboration",
        ],
      },
    ],
    faqItems: [
      {
        question: "What manufacturing capabilities does Manah Technology offer?",
        answer:
          "Manah Technology Division operates a 50,000 sq ft EMS facility with 8 SMT lines handling components from 0201 to BGA packages at 80,000 CPH. Capabilities span rapid prototyping (10 units) to volume production (100,000+ units/month), with nitrogen reflow, AOI, X-ray inspection, and IPC Class 3 quality standards.",
      },
      {
        question: "What quality standards does the facility meet?",
        answer:
          "The facility meets IPC-A-610 Class 3 standards (highest reliability level) with 99.97% AOI defect detection, 5DX X-ray inspection for hidden joints, nitrogen reflow soldering, and complete production traceability. It serves defence, aerospace, and telecommunications customers.",
      },
    ],
  },
];

// ─── Exports ───

export const BLOG_ARTICLES: Record<string, BlogArticle> = Object.fromEntries(
  ARTICLES_LIST.map((article) => [article.slug, article])
);

export const ALL_BLOG_ARTICLES: readonly BlogArticle[] = ARTICLES_LIST;

export const FEATURED_BLOG_ARTICLE: BlogArticle = ARTICLES_LIST[0];
