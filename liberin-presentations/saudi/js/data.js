/* ═══════════════════════════════════════════════════════════
   LIBERIN — Saudi Arabia Investor Deck — Content Model
   Single source of truth. Immutable object (never mutate).
   Figures sourced from public 2025–2026 market research +
   liberin.ai product data. See slide speaker notes for citations.
   ═══════════════════════════════════════════════════════════ */

const LIBERIN_DATA = {
  company: {
    name: 'Liberin',
    legal: 'Liberin Technologies Pvt Ltd',
    tagline: 'Production-Grade AI for Enterprises That Ship',
    ksaLine: 'Agentic AI for the Kingdom’s Next Decade',
    hqIndia: 'Noida, India',
    email: 'contact@liberin.ai',
    phone: '+91 120 4532913',
    web: 'liberin.ai'
  },

  // KPI count-ups (opportunity framing)
  stats: [
    { value: 16.9, prefix: '$', suffix: 'B', label: 'KSA AI market by 2032', decimals: 1 },
    { value: 34.3, suffix: '%', label: 'AI market CAGR 2025–32', decimals: 1 },
    { value: 20, prefix: '$', suffix: 'B', label: 'National AI investment target' },
    { value: 300, suffix: '+', label: 'AI startups targeted by 2030' }
  ],

  // KSA AI market size — $B (MarketsandMarkets 2025)
  marketGrowth: {
    years: ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032'],
    values: [2.14, 2.87, 3.86, 5.18, 6.96, 9.35, 12.57, 16.90],
    cagr: '34.3%'
  },

  // National commitment figures
  investment: [
    { label: 'HUMAIN (PIF national AI champion)', value: 100, unit: '$B' },
    { label: 'Project Transcendence', value: 100, unit: '$B' },
    { label: 'PIF AI-venture allocation', value: 40, unit: '$B' },
    { label: 'AI funding raised in 2024', value: 9.1, unit: '$B' }
  ],

  // Liberin AI products (from liberin.ai)
  products: [
    { name: 'Boliye', kind: 'Voice & Chat AI', metric: '60+ languages · 50K+ daily calls',
      desc: 'Multilingual voice and chat agents across WhatsApp, web and voice — Arabic-native for Kingdom citizen and customer service.' },
    { name: 'Septa', kind: 'GenAI Analytics', metric: '92% query accuracy · 40% faster',
      desc: 'Natural-language analytics over enterprise data — decisions in plain Arabic or English, no dashboards required.' },
    { name: 'PiiVacy', kind: 'Privacy Governance', metric: '8 weeks to compliance · 90% less effort',
      desc: 'Automated privacy governance — re-tuned for Saudi PDPL and in-Kingdom data-residency obligations.' },
    { name: 'TESS', kind: 'Agentic Automation', metric: 'Autonomous task execution',
      desc: 'Agentic workflow automation that perceives, reasons and acts across enterprise systems end to end.' }
  ],

  services: ['Agentic AI', 'Enterprise RAG', 'SLM Training'],

  certs: ['ISO 27001', 'ISO 42001', 'SOC 2 Type II', 'MeitY Empanelled', 'STQC Certified', 'CERT-In Compliant'],

  deployments: ['On-Premise', 'Air-Gapped', 'Sovereign Cloud'],

  // SDAIA's 6 agentic capabilities
  agenticCaps: [
    { name: 'Perception', desc: 'Sense structured and unstructured signals across systems.' },
    { name: 'Reasoning', desc: 'Plan multi-step actions toward a goal.' },
    { name: 'Learning', desc: 'Improve from outcomes and feedback.' },
    { name: 'Action', desc: 'Execute autonomously across enterprise tools.' },
    { name: 'Collaboration', desc: 'Coordinate with humans and other agents.' },
    { name: 'Memory', desc: 'Retain context across tasks and time.' }
  ],

  // Sector opportunity (KSA) — maps Liberin capability to demand
  sectors: [
    { name: 'Government', stat: '4,600+ e-services, 97% digitised', desc: 'Arabic citizen-service agents, document intelligence, automated case handling.' },
    { name: 'Banking & Finance', stat: 'SAMA-regulated, GenAI CX', desc: 'Fraud detection, compliant conversational banking, agentic operations.' },
    { name: 'Healthcare', stat: 'Radiology +25% accuracy, −50% time', desc: 'Triage agents, clinical document intelligence, patient engagement.' },
    { name: 'Energy', stat: 'Aramco predictive maintenance', desc: 'Predictive-maintenance and operations agents on sovereign infra.' },
    { name: 'Manufacturing', stat: '99.4% defect detection', desc: 'Vision-based quality inspection and autonomous line monitoring.' },
    { name: 'Telecom', stat: '50K+ calls, +35% resolution', desc: 'Multilingual support agents at national scale.' }
  ],

  // Market-entry facts
  entry: [
    { k: '100%', v: 'Foreign ownership under MISA tech licence' },
    { k: 'RHQ', v: 'Regional HQ programme — government-procurement advantage' },
    { k: 'PDPL', v: 'In-Kingdom data residency — handled by design' },
    { k: '$41.9B', v: 'India–KSA bilateral trade, FY24–25' }
  ],

  // Go-to-market
  gtm: {
    events: ['LEAP + DeepFest — Riyadh, 31 Aug–3 Sep 2026', 'Black Hat MEA', 'Seamless Saudi Arabia', 'SDAIA / HUMAIN forums'],
    motions: ['Investor-network warm intros', 'Sector reference wins', 'System-integrator alliances', 'Direct enterprise & government BD']
  },

  // Phased operating model
  roadmap: [
    { phase: 'Phase 1', window: 'Months 0–6', title: 'Land',
      points: ['Riyadh office + MISA licence', 'BD, sales & marketing team', 'Delivery from India engineering hub', 'LEAP/DeepFest presence'] },
    { phase: 'Phase 2', window: 'Months 6–18', title: 'Prove',
      points: ['First sector reference wins', 'Local solution & pre-sales engineers', 'PDPL-compliant sovereign deployments', 'Investor-network pipeline'] },
    { phase: 'Phase 3', window: 'Months 18–36', title: 'Scale',
      points: ['In-Kingdom engineering team', 'Arabic model & IP localisation', 'RHQ upgrade + Saudization', 'Regional (GCC) expansion'] }
  ],

  // Revenue projection — USD millions
  revenue: {
    years: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    values: [2, 12, 50, 120, 260]
  },

  // KSA map city nodes (percent coords over the inline SVG map viewBox)
  cities: [
    { name: 'Riyadh', x: 55, y: 52, primary: true },
    { name: 'Jeddah', x: 28, y: 58 },
    { name: 'Dammam', x: 70, y: 44 },
    { name: 'NEOM', x: 20, y: 30 }
  ],

  // Localization / Vision 2030 alignment
  vision: [
    { k: 'Thriving Economy', v: 'AI as a non-oil growth engine' },
    { k: '20,000', v: 'AI specialists Vision 2030 aims to train' },
    { k: '~$19.7B', v: 'Targeted AI contribution to GDP by 2030' },
    { k: 'Top 15', v: 'Global AI-nation ambition by 2030' }
  ]
};

window.LIBERIN_DATA = LIBERIN_DATA;
