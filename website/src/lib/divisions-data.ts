/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Division Detail Data
   Complete content for each business division page
   ═══════════════════════════════════════════════════════════ */

import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BatteryCharging,
  BrainCircuit,
  Briefcase,
  Building,
  Building2,
  CircuitBoard,
  ClipboardCheck,
  Cloud,
  Cog,
  Container,
  Droplets,
  Factory,
  Gauge,
  GraduationCap,
  Handshake,
  Languages,
  Leaf,
  Lightbulb,
  MessagesSquare,
  Network,
  Orbit,
  Radio,
  RadioTower,
  Rocket,
  Server,
  ServerCog,
  Shield,
  ShieldCheck,
  Sun,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

export interface DivisionService {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Marks a capability that is planned but not yet operational. */
  inPipeline?: boolean;
}

/** A named capability area within a division — each renders as its own section. */
export interface DivisionPillar {
  name: string;
  tagline: string;
  image: string;
  services: DivisionService[];
}

export interface DivisionDetail {
  id: string;
  name: string;
  tagline: string;
  heroDescription: string;
  color: string;
  gradient: string;
  overview: string[];
  keyStats: { value: string; label: string }[];
  /** Flat service list — used by divisions without grouped pillars. */
  services?: DivisionService[];
  /** Grouped capability areas — when present, rendered instead of `services`. */
  pillars?: DivisionPillar[];
  sectors: { name: string; image: string; description: string }[];
  certifications: string[];
  cta: { text: string; href: string };
  ems?: {
    heading: string;
    intro: string;
    phases: { title: string; description: string }[];
  };
  faqItems?: { question: string; answer: string }[];
}

export const DIVISION_DETAILS: Record<string, DivisionDetail> = {
  dynamics: {
    id: "dynamics",
    name: "Manah Dynamics",
    tagline: "Projects, Infrastructure & Electronics Manufacturing",
    heroDescription:
      "Delivering large-scale EPC solutions across power transmission, renewables, telecom, civil infrastructure, and electronics manufacturing — transforming India's physical and industrial base with engineering excellence.",
    color: "#1E3A5F",
    gradient: "from-[#1E3A5F] to-manah-navy",
    overview: [
      "Manah Dynamics is the flagship EPC and manufacturing division of Manah Group, delivering turnkey project execution across power transmission, renewables, telecom, civil infrastructure, BESS/SCADA, oil & gas, irrigation and defence — trusted by utilities, government agencies, and private developers across India.",
      "Our integrated capabilities span design engineering, procurement, construction, and commissioning — enabling single-point accountability through DBFOOT, DBOOT, BOO, BOOT, and Investment project delivery models. Active mandates include four G+4 residential buildings under a multi-block housing development (₹53 Cr) and the deployment of 48,893 DTC smart meters across six districts with five-year maintenance (₹171 Cr).",
      "Manah Dynamics is also home to the Group's Electronics Manufacturing Services (EMS) business, operating from a 30,000 sq ft facility at Cherlapally, Hyderabad. With 8+ SMT lines and 1M+ products per year, we manufacture Smart Energy Meters, Smart Water Meters, EV Chargers, Room Chargers, and Defence RF Systems to MIL-STD, JSS, and IPC-A-610 Class 3 standards.",
    ],
    keyStats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "1,200+ MW", label: "Capacity Installed" },
      { value: "15+", label: "States Active" },
      { value: "8+", label: "SMT Lines" },
      { value: "30,000 sq ft", label: "EMS Facility" },
      { value: "1M+", label: "Products / Year" },
    ],
    services: [
      { icon: Zap, title: "Power Transmission & Distribution", description: "Design, supply, and construction of 66kV to 765kV overhead transmission lines, AIS/GIS substations, and smart grid infrastructure including BESS and SCADA systems." },
      { icon: Building2, title: "Building, Roads & Civil Infrastructure", description: "Roads, bridges, industrial buildings, residential complexes, and urban infrastructure executed to international safety and quality standards." },
      { icon: RadioTower, title: "Telecom Infrastructure", description: "Telecom tower rollout, BharatNet fiber execution, optical fiber cabling, and passive/active network infrastructure for state and central programs." },
      { icon: Sun, title: "Renewable Energy & Mining", description: "Utility-scale solar, wind, and hybrid power plant EPC, plus mining infrastructure and balance-of-plant execution." },
      { icon: Droplets, title: "Oil & Gas, Irrigation & Water", description: "Downstream oil & gas processing works, refinery allied construction, pipeline execution, and water treatment, irrigation, and disaster management infrastructure." },
      { icon: Shield, title: "Defence & BESS/SCADA", description: "Defence systems and networks, battery energy storage system (BESS) integration, and SCADA automation for utility and industrial applications." },
      { icon: Gauge, title: "Smart Metering & M&A", description: "DTC smart meter deployment, AMI infrastructure, O&M services for power and generation assets, and strategic mergers & acquisitions advisory." },
      { icon: CircuitBoard, title: "Electronics Manufacturing Services (EMS)", description: "30,000 sq ft Cherlapally facility delivering PCB assembly, SMT box build, and system integration for Smart Meters, EV Chargers, and Defence RF Systems — MIL-STD and JSS compliant." },
    ],
    sectors: [
      { name: "Power T&D", image: "/images/sectors/power_transmission.webp", description: "EHV/HV transmission lines up to 765 kV and substation infrastructure across 15+ states." },
      { name: "Renewables", image: "/images/sectors/renewable_energy.webp", description: "Solar, wind, and hydel EPC at utility scale." },
      { name: "Building & Roads", image: "/images/sectors/infrastructure.webp", description: "Civil infrastructure — roads, bridges, residential and industrial buildings." },
      { name: "Defence", image: "/images/sectors/defence_electronics.webp", description: "Defence systems, tactical communication networks, and MIL-STD electronics." },
      { name: "Telecom", image: "/images/sectors/telecom_equipment.webp", description: "Towers, BharatNet rollout, optical fiber cabling, and telecom network infrastructure." },
      { name: "Oil & Gas", image: "/images/sectors/manufacturing.webp", description: "Downstream oil & gas processing, refinery allied works, and pipeline construction." },
      { name: "Mining", image: "/images/sectors/mining.webp", description: "Mining operations and balance-of-plant engineering and construction." },
      { name: "Irrigation & Water", image: "/images/sectors/irrigation_water.webp", description: "Water treatment, irrigation systems, and urban water infrastructure." },
    ],
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "IPC-A-610 Class 3", "MIL-STD / JSS", "CEA Compliant"],
    cta: { text: "View Projects", href: "/projects?division=dynamics" },
    ems: {
      heading: "Electronics Manufacturing Services",
      intro:
        "A 30,000 sq ft facility in Cherlapally, Hyderabad delivering end-to-end electronics manufacturing — from prototyping to final integration across 8+ SMT lines and 1M+ products per year.",
      phases: [
        { title: "Design & Engineering", description: "Product development and prototyping." },
        { title: "Manufacturing", description: "PCB assembly, box build, and system integration." },
        { title: "Testing & QA", description: "Compliance testing and reliability validation." },
        { title: "Supply Chain", description: "Strategic sourcing and logistics optimization." },
        { title: "After-Sales", description: "Repair, maintenance, and warranty management." },
      ],
    },
    faqItems: [
      {
        question: "What does Manah Dynamics do?",
        answer: "Manah Dynamics is the flagship EPC and manufacturing division of Manah Group, delivering turnkey project execution across power transmission, renewables, telecom, civil infrastructure, BESS/SCADA, oil & gas, irrigation and defence. It serves utilities, government agencies, and private developers across India with integrated design engineering, procurement, construction, and commissioning capabilities.",
      },
      {
        question: "What services does Manah Dynamics provide?",
        answer: "Manah Dynamics provides power transmission and distribution (66kV to 765kV lines and AIS/GIS substations), building, roads and civil infrastructure, telecom infrastructure including BharatNet fiber, renewable energy and mining EPC, oil & gas, irrigation and water works, defence and BESS/SCADA systems, smart metering and M&A advisory, and Electronics Manufacturing Services.",
      },
      {
        question: "Where is Manah Group's electronics manufacturing facility located?",
        answer: "Manah Group's Electronics Manufacturing Services business operates from a 30,000 sq ft facility at Cherlapally, Hyderabad. The facility runs 8+ SMT lines and produces over 1 million products per year, including Smart Energy Meters, Smart Water Meters, EV Chargers, Room Chargers, and Defence RF Systems.",
      },
      {
        question: "What certifications and standards does Manah Dynamics hold?",
        answer: "Manah Dynamics is certified to ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018, and is CEA compliant. Its electronics manufacturing meets IPC-A-610 Class 3 and MIL-STD / JSS standards for defence and high-reliability products.",
      },
    ],
  },

  aerospace: {
    id: "aerospace",
    name: "Manah Aerospace",
    tagline: "Aviation MRO, Training & Consultancy",
    heroDescription:
      "DGCA-certified business jet MRO, CAR 147 training, and aviation consultancy — ensuring safety, reliability, and airworthiness to global standards.",
    color: "#0D9488",
    gradient: "from-[#0D9488] to-manah-navy",
    overview: [
      "Manah Aerospace is the aviation arm of Manah Group, delivering DGCA-certified business jet maintenance services specializing in light and midsize jets. Operating from our facility at Begumpet Airport, Hyderabad in partnership with AAI, and with an international partnership with Jet Aviation Dubai, we provide MRO services to 18+ aircraft across 6 locations — Hyderabad, Koppal, Ahmedabad, Bhubaneshwar, Chennai, and Bangalore.",
      "Our vision extends to expanding into Boeing and Airbus narrow-body and wide-body servicing. We hold DGCA CAR 145 and San Marino CAR 145 certifications, alongside CAR 147 approved training programs for aviation professionals. Our next-phase expansion targets Pune and Kolkata.",
    ],
    keyStats: [
      { value: "18+", label: "MRO Services" },
      { value: "6", label: "MRO Locations" },
      { value: "2", label: "Expansion Cities" },
      { value: "DGCA/San Marino", label: "Certifications" },
      { value: "CAR 147", label: "Training Approved" },
      { value: "Full Spectrum", label: "MRO Capabilities" },
    ],
    services: [
      { icon: Wrench, title: "Aircraft Maintenance (MRO)", description: "DGCA-certified business jet maintenance for light and midsize jets — customized maintenance programs, parts procurement, quality control, and airworthiness management." },
      { icon: GraduationCap, title: "Aviation Training (CAR 147)", description: "DGCA-approved Level III training for Embraer and ATR aircraft types, plus Level I & II foundational training and regulatory courses for aviation professionals." },
      { icon: ClipboardCheck, title: "Aviation Consultancy", description: "Aircraft acquisition advisory, fleet analysis and research, regulatory compliance guidance, and operational efficiency advisory for operators and investors." },
    ],
    sectors: [],
    certifications: ["DGCA CAR 145", "San Marino CAR 145", "CAR 147", "ISO 9001:2015"],
    cta: { text: "Explore Capabilities", href: "/capabilities" },
    faqItems: [
      {
        question: "What does Manah Aerospace do?",
        answer: "Manah Aerospace is the aviation arm of Manah Group, delivering DGCA-certified business jet maintenance, repair and overhaul (MRO) services specializing in light and midsize jets, alongside CAR 147 aviation training and aviation consultancy. It currently provides MRO services to 18+ aircraft across 6 locations in India.",
      },
      {
        question: "What services does Manah Aerospace provide?",
        answer: "Manah Aerospace provides aircraft maintenance (MRO) with customized maintenance programs, parts procurement, quality control and airworthiness management; CAR 147 aviation training including DGCA-approved Level III training for Embraer and ATR aircraft; and aviation consultancy covering aircraft acquisition advisory, fleet analysis, regulatory compliance, and operational efficiency.",
      },
      {
        question: "Where is Manah Aerospace's MRO facility located?",
        answer: "Manah Aerospace operates from a facility at Begumpet Airport, Hyderabad in partnership with AAI, and has an international partnership with Jet Aviation Dubai. Its MRO services span 6 locations — Hyderabad, Koppal, Ahmedabad, Bhubaneshwar, Chennai, and Bangalore — with planned expansion to Pune and Kolkata.",
      },
      {
        question: "What certifications does Manah Aerospace hold?",
        answer: "Manah Aerospace holds DGCA CAR 145 and San Marino CAR 145 certifications for aircraft maintenance, CAR 147 approval for aviation training, and ISO 9001:2015 certification.",
      },
    ],
  },

  "green-energy": {
    id: "green-energy",
    name: "Manah Green Energy",
    tagline: "Green Hydrogen & Renewables",
    heroDescription:
      "Pioneering the green hydrogen revolution — from electrolyzer manufacturing to large-scale production facilities, powering global net-zero ambitions.",
    color: "#16A34A",
    gradient: "from-[#16A34A] to-manah-navy",
    overview: [
      "Manah Green Energy is a wholly owned subsidiary of Manah Dynamics, pioneering green hydrogen production in India. With an MoU with the Government of Madhya Pradesh, we are establishing a hydrogen production plant at Bina on 350 acres near the BPCL Bina Refinery, targeting 18,000 MTPA of green hydrogen across 4 production phases.",
      "Leveraging ARB and electrolysis-type hydrogen production — backed by strategic partnerships with multiple global technology partners for water-splitting and electrolysis — we represent the next generation of clean hydrogen production. Our ₹5,000 Cr investment programme supports India's National Green Hydrogen Mission and Net Zero 2070 vision.",
    ],
    keyStats: [
      { value: "18,000 MTPA", label: "Green H₂ Target" },
      { value: "ARB & Electrolysis", label: "Technology" },
      { value: "350", label: "Acres Near BPCL Bina" },
      { value: "4", label: "Production Phases" },
      { value: "₹5,000 Cr", label: "Investment Programme" },
      { value: "1", label: "Production Site" },
    ],
    services: [
      { icon: Factory, title: "Green Hydrogen Production", description: "Large-scale green hydrogen plants using renewable power — serving refineries, fertilizer plants, and industrial consumers." },
      { icon: Cog, title: "Electrolyzer Manufacturing", description: "Assembly and integration of PEM and Alkaline electrolyzers with localized content meeting national and international regulatory standards." },
      { icon: Sun, title: "Renewable Energy Parks", description: "Development of dedicated solar and wind parks for captive hydrogen production with grid optimization." },
      { icon: Container, title: "Hydrogen Storage & Transport", description: "Compressed and liquid hydrogen storage solutions, pipeline infrastructure, and tube trailer logistics." },
      { icon: BatteryCharging, title: "Fuel Cell Solutions", description: "Hydrogen fuel cell systems for stationary power, material handling equipment, and commercial vehicle applications." },
      { icon: Leaf, title: "Carbon Advisory", description: "Carbon credit generation, ESG reporting support, and sustainability roadmap development for industrial clients." },
    ],
    sectors: [
      { name: "Green Hydrogen", image: "/images/sectors/green_hydrogen.webp", description: "Large-scale green hydrogen production powering net-zero ambitions." },
      { name: "Renewable Energy", image: "/images/sectors/renewable_energy.webp", description: "Dedicated solar and wind parks for captive hydrogen generation." },
      { name: "Industrial Decarbonization", image: "/images/sectors/manufacturing.webp", description: "Decarbonizing steel, chemicals, and heavy industry with clean energy." },
      { name: "Clean Transport", image: "/images/sectors/transportation.webp", description: "Hydrogen fuel cell solutions for commercial vehicles and logistics." },
    ],
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "BIS Standards", "MNRE Approved"],
    cta: { text: "Learn More", href: "/sustainability" },
    faqItems: [
      {
        question: "What does Manah Green Energy do?",
        answer: "Manah Green Energy is a wholly owned subsidiary of Manah Dynamics, pioneering green hydrogen production in India. Backed by an MoU with the Government of Madhya Pradesh, it is establishing a hydrogen production plant at Bina on 350 acres near the BPCL Bina Refinery, targeting 18,000 MTPA of green hydrogen across 4 production phases.",
      },
      {
        question: "What services does Manah Green Energy provide?",
        answer: "Manah Green Energy provides green hydrogen production, electrolyzer manufacturing of PEM and Alkaline electrolyzers, development of dedicated renewable energy parks, hydrogen storage and transport solutions, hydrogen fuel cell systems, and carbon advisory services including carbon credit generation and ESG reporting support.",
      },
      {
        question: "Where is Manah Green Energy's hydrogen plant located?",
        answer: "Manah Green Energy is building its green hydrogen production plant at Bina, Madhya Pradesh, on a 350-acre site near the BPCL Bina Refinery. The facility targets 18,000 MTPA of green hydrogen developed across four production phases.",
      },
      {
        question: "What technology does Manah Green Energy use for hydrogen production?",
        answer: "Manah Green Energy uses ARB and electrolysis-type hydrogen production, backed by strategic partnerships with multiple global technology partners for water-splitting and electrolysis. Its ₹5,000 Cr investment programme supports India's National Green Hydrogen Mission and Net Zero 2070 vision.",
      },
    ],
  },

  atomic: {
    id: "atomic",
    name: "Manah Atomic",
    tagline: "Nuclear Energy Solutions",
    heroDescription:
      "Powering India's clean energy transition through Small Modular Reactors (SMRs), advanced nuclear fuel cycle engineering, and rigorous reactor safety and compliance.",
    color: "#7C3AED",
    gradient: "from-[#7C3AED] to-manah-navy",
    overview: [
      "Manah Atomic is the nuclear energy division of Manah Group, focused on Small Modular Reactors (SMRs), advanced nuclear fuel cycle capability, reactor safety systems, and regulatory compliance — positioning Manah at the forefront of India's low-carbon, high-density baseload energy transition.",
      "We pursue strategic collaborations with global SMR technology providers and domestic nuclear programs to deliver safe, scalable, and economically viable nuclear solutions aligned with India's long-term nuclear roadmap and clean energy commitments.",
    ],
    keyStats: [
      { value: "SMR", label: "Technology Focus" },
      { value: "100 GW", label: "Targeted by 2047" },
      { value: "100+ MW", label: "Per Reactor Unit" },
      { value: "₹10,000 Cr", label: "Investment Plan" },
      { value: "50–300 MW", label: "SMR Unit Range" },
      { value: "IAEA & AERB", label: "Safety Standards" },
    ],
    services: [
      { icon: Atom, title: "Small Modular Reactors (SMR)", description: "Deployment and integration of next-generation small modular reactor technology, offering scalable, factory-built nuclear capacity for industrial and grid-scale applications." },
      { icon: Orbit, title: "Advanced Nuclear Fuel Cycle", description: "End-to-end fuel cycle engineering — from fuel design and fabrication support through spent-fuel management aligned with national and international safeguards." },
      { icon: ShieldCheck, title: "Reactor Safety & Compliance", description: "Safety case development, probabilistic safety assessment, regulatory liaison, and compliance with AERB, IAEA, and international reactor safety standards." },
      { icon: Lightbulb, title: "Clean Energy Transition Advisory", description: "Strategic advisory for industrial decarbonization pathways integrating nuclear baseload with renewables, hydrogen, and grid storage." },
    ],
    sectors: [],
    certifications: ["AERB Compliance (in progress)", "IAEA Safeguards Aligned", "ISO 9001:2015"],
    cta: { text: "Learn More", href: "/contact" },
    faqItems: [
      {
        question: "What does Manah Atomic do?",
        answer: "Manah Atomic is the nuclear energy division of Manah Group, focused on Small Modular Reactors (SMRs), advanced nuclear fuel cycle capability, reactor safety systems, and regulatory compliance. It positions Manah at the forefront of India's low-carbon, high-density baseload energy transition.",
      },
      {
        question: "What services does Manah Atomic provide?",
        answer: "Manah Atomic provides deployment and integration of Small Modular Reactors (SMRs), advanced nuclear fuel cycle engineering from fuel design through spent-fuel management, reactor safety and compliance services including probabilistic safety assessment and regulatory liaison, and clean energy transition advisory for industrial decarbonization.",
      },
      {
        question: "What is the focus and scale of Manah Atomic's reactor technology?",
        answer: "Manah Atomic focuses on Small Modular Reactors with unit capacity in the 50–300 MW range, offering scalable, factory-built nuclear capacity for industrial and grid-scale applications. The division supports India's target of 100 GW of nuclear capacity by 2047, backed by a ₹10,000 Cr investment plan.",
      },
      {
        question: "What safety standards does Manah Atomic follow?",
        answer: "Manah Atomic aligns its work with AERB, IAEA, and international reactor safety standards, with AERB compliance in progress and IAEA safeguards alignment in place. The division is also ISO 9001:2015 certified and pursues collaborations with global SMR technology providers and domestic nuclear programs.",
      },
    ],
  },

  ai: {
    id: "ai",
    name: "Manah AI",
    tagline: "Generative AI & Data Centers",
    heroDescription:
      "Building sovereign AI capability from foundational research to production — agentic systems, LLM and SLM training, generative AI applications, and the data center infrastructure that powers them.",
    color: "#5B8CC5",
    gradient: "from-[#5B8CC5] to-manah-navy",
    overview: [
      "Manah AI is the artificial intelligence and compute infrastructure division of Manah Group, built on two pillars — Generative AI & LLM, and Data Centers — that together deliver sovereign AI capability from foundational research through production deployment.",
      "Our mission is to build India-native AI capability for enterprise, government, and defence — domain-trained language models, agentic automation, and conversational intelligence — backed by purpose-built data center infrastructure for high-performance, secure, and energy-efficient compute.",
    ],
    keyStats: [
      { value: "Agentic AI", label: "Core Platform" },
      { value: "LLM & SLM", label: "Training & Fine-Tuning" },
      { value: "Generative AI", label: "Applications" },
      { value: "Data Centers", label: "Infrastructure" },
      { value: "Sovereign", label: "Compute" },
      { value: "India-Native", label: "AI Capability" },
    ],
    pillars: [
      {
        name: "Generative AI & LLM",
        tagline: "Sovereign generative-AI capability for enterprise and government — from conversational intelligence to India-hosted, domain-trained language models.",
        image: "/images/divisions/manah_ai_generative.webp",
        services: [
          { icon: MessagesSquare, title: "Conversational Analytics", description: "Natural-language interfaces that turn enterprise data into decisions — ask a question and get a sourced answer, summary, or report." },
          { icon: BrainCircuit, title: "Sovereign LLM & SLM Training", description: "India-hosted large and small language models, trained and fine-tuned on domain data for defence, BFSI, and government workloads." },
          { icon: Workflow, title: "Enterprise AI Automation", description: "Agentic workflow automation, document intelligence, and decision support that compress manual back-office processes." },
          { icon: Languages, title: "NLP Solutions", description: "Multilingual processing across Indian languages — sentiment, entity, and knowledge extraction at scale." },
          { icon: ServerCog, title: "AI-as-a-Service", description: "Managed, compliant AI infrastructure for regulated industries — defence, banking, healthcare, and government." },
        ],
      },
      {
        name: "Data Centers",
        tagline: "Scalable, secure, sovereign data-center infrastructure to power India's digital economy — from enterprise colocation to hyperscaler-grade facilities.",
        image: "/images/divisions/manah_ai_datacenter.webp",
        services: [
          { icon: Server, title: "Colocation Services", description: "Tier-grade rack space with redundant power and precision cooling for enterprise IT and AI workloads." },
          { icon: Cloud, title: "Cloud Infrastructure", description: "Private and hybrid cloud hosting with high availability and India data residency." },
          { icon: Network, title: "Hyperscaler Partnerships", description: "Strategic alliances for large-scale compute capacity to serve hyperscale AI demand.", inPipeline: true },
          { icon: Radio, title: "Edge Computing", description: "Low-latency micro-facilities at the network edge for real-time inference and distributed workloads." },
          { icon: Leaf, title: "Green Data Centers", description: "Renewable-powered, PUE-optimized facilities aligned with Net-Zero and ESG commitments." },
        ],
      },
    ],
    sectors: [
      { name: "Enterprise & Industry", image: "/images/sectors/industrial_iot.webp", description: "Agentic systems and generative AI embedded across business operations and decision workflows." },
      { name: "Government & Defence", image: "/images/sectors/defence_electronics.webp", description: "Sovereign AI compute and secure language models for public-sector and defence programmes." },
      { name: "Banking & Financial Services", image: "/images/divisions/manah_ai_detail.webp", description: "Document intelligence, conversational analytics, and compliant AI for BFSI workloads." },
      { name: "Healthcare & Research", image: "/images/divisions/manah_ai_hero.webp", description: "Applied AI, NLP, and high-performance compute for healthcare and deep-tech research." },
    ],
    certifications: ["ISO 9001:2015", "ISO 27001 (in progress)", "DPDP Act Aligned"],
    cta: { text: "Request Demo", href: "/contact" },
    faqItems: [
      {
        question: "What does Manah AI do?",
        answer: "Manah AI is the artificial intelligence and compute infrastructure division of Manah Group, focused on agentic AI systems, LLM and SLM training pipelines, generative AI applications, and sovereign data center infrastructure. Its mission is to build India-native AI capability from research through deployment for enterprise, government, and defence use cases.",
      },
      {
        question: "What services does Manah AI provide?",
        answer: "Manah AI is organized into two pillars. Generative AI & LLM covers conversational analytics, sovereign LLM and SLM training, enterprise AI automation, NLP solutions, and AI-as-a-Service. Data Centers covers colocation services, cloud infrastructure, edge computing, green data centers, and hyperscaler partnerships.",
      },
      {
        question: "What is sovereign AI compute at Manah AI?",
        answer: "Sovereign AI compute is Manah AI's dedicated compute capacity for government, defence, and regulated industries, delivered with full data residency, auditability, and security controls. It is backed by purpose-built data centers engineered for high-density GPU compute, liquid cooling, and power-efficient operation.",
      },
      {
        question: "What standards and certifications does Manah AI follow?",
        answer: "Manah AI is ISO 9001:2015 certified, with ISO 27001 certification in progress, and its systems are aligned with India's DPDP Act for data protection and privacy compliance.",
      },
    ],
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
      { value: "4", label: "Focus Verticals" },
      { value: "3x", label: "Avg. Return Multiple" },
      { value: "8+", label: "Strategic Partners" },
      { value: "$2B+", label: "Co-Investment Mobilized" },
    ],
    services: [
      { icon: Building2, title: "Infrastructure Private Equity", description: "Direct equity investments in infrastructure projects including power, roads, logistics, and urban development across emerging and developed markets." },
      { icon: Leaf, title: "Energy Transition Fund", description: "Dedicated capital allocation for renewable energy, green hydrogen, battery storage, and clean mobility ventures." },
      { icon: Rocket, title: "Technology Ventures", description: "Early to growth-stage investments in deep tech, industrial IoT, defence technology, and advanced manufacturing startups." },
      { icon: Building, title: "Real Estate Development", description: "Strategic investments in commercial, industrial, and mixed-use real estate projects in high-growth corridors." },
      { icon: Handshake, title: "Joint Ventures & Partnerships", description: "Structured JVs with global technology partners and industry leaders for market entry and capability building." },
      { icon: Briefcase, title: "Advisory & Asset Management", description: "Investment advisory services and fund management for institutional investors seeking exposure to global infrastructure growth." },
    ],
    sectors: [
      { name: "Infrastructure", image: "/images/sectors/infrastructure.webp", description: "Direct equity in power, roads, logistics, and urban development." },
      { name: "Energy & Cleantech", image: "/images/sectors/renewable_energy.webp", description: "Capital allocation for renewables, hydrogen, and battery storage." },
      { name: "Technology & Defence", image: "/images/sectors/defence_electronics.webp", description: "Growth-stage investments in deep tech and defence technology." },
      { name: "Real Estate", image: "/images/sectors/real_estate.webp", description: "Strategic positions in commercial and mixed-use developments." },
    ],
    certifications: ["SEBI Registered", "DPIIT Recognized", "ISO 9001:2015", "ESG Compliant"],
    cta: { text: "Explore Opportunities", href: "/contact" },
    faqItems: [
      {
        question: "What does Manah Investments do?",
        answer: "Manah Investments is the strategic investment arm of Manah Group, focused on identifying, incubating, and scaling high-potential ventures across infrastructure, energy, and technology sectors. It manages a portfolio exceeding $500M and partners with entrepreneurs and institutions to build enterprises delivering both financial returns and lasting impact.",
      },
      {
        question: "What services does Manah Investments provide?",
        answer: "Manah Investments provides infrastructure private equity, an energy transition fund for renewables, green hydrogen and battery storage, technology venture investments in deep tech and defence technology, real estate development, structured joint ventures and partnerships, and advisory and asset management services for institutional investors.",
      },
      {
        question: "How large is Manah Investments' portfolio?",
        answer: "Manah Investments manages a portfolio valued at over $500M across 15+ active ventures spanning 4 focus verticals, with an average return multiple of 3x. The division works with 8+ strategic partners and has mobilized over $2B in co-investment.",
      },
      {
        question: "What is Manah Investments' investment approach?",
        answer: "Manah Investments follows an investment philosophy rooted in domain expertise, leveraging Manah Group's operational knowledge across EPC, aviation, green energy, and manufacturing to evaluate opportunities with an operator's eye. Beyond capital, it provides portfolio companies with strategic guidance, industry networks, and execution support. The division is SEBI registered, DPIIT recognized, ISO 9001:2015 certified, and ESG compliant.",
      },
    ],
  },
};
