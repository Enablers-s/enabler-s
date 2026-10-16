// The eight Enabler-S service pillars, from the company profile.
// `short` is the label under each circular tab and `about` the few words beneath it; `icon` picks a glyph from ICONS in main.js,
// or `logo` shows a brand mark image in the disc instead. `site` makes clicking the disc open that brand's website;
// `logoSize` (% of the disc) enlarges a logo and `logoNudge` (% of the disc) moves it down, clear of the disc number; `logoBg: 'dark'` (slate) or 'black' (warm black)
// puts a light logo on a dark disc.

// Each brand is its own website (its own repo and Vercel project). On the live site the discs link to
// the deployed brand sites; opened from disk or localhost they link to the side-by-side local folders.
// To move a brand to its own domain, change its line in BRAND_SITES_LIVE.
const BRAND_SITES_LIVE = {
  bizablers: 'https://bizablers.vercel.app/',
  finablers: 'https://finablers.vercel.app/',
  trustablers: 'https://trustablers.vercel.app/',
  brandora: 'https://brandora-s.vercel.app/',
  movera: 'https://moveraglobal.com/',
};
const BRAND_SITES_LOCAL = {
  bizablers: '../bizablers/index.html',
  finablers: '../finablers/index.html',
  trustablers: '../trustablers/index.html',
  brandora: '../brandora/index.html',
  movera: 'https://moveraglobal.com/',
};
const BRAND_SITES = (location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(location.hostname))
  ? BRAND_SITES_LOCAL : BRAND_SITES_LIVE;

const PILLARS = [
  {
    id: 'licensing', icon: 'licensing', logo: 'assets/bizablers-mark.png', logoSize: 68, logoNudge: 14, site: BRAND_SITES.bizablers, short: 'Bizablers', about: 'Licensing & strategic advisory',
    title: 'Global Licensing & Strategic Advisory', brand: 'Bizablers',
    line: 'Set up, structure and scale in any market.',
    highlights: ['Company formation & licensing', 'Mainland, free zone & international structuring', 'Business plans, feasibility studies & pitch decks', 'Joint ventures, M&A and multi-country expansion'],
    services: ['Company Formation & Licensing', 'Mainland, Free Zone & International Structuring', 'Municipality & Government Approvals', 'Business Plans & Feasibility Studies', 'Company Profiles & Corporate Presentations', 'Pitch Deck & Investor Documentation Preparation', 'Operational, Sales & Business Model Structuring', 'Partnership & B2B Growth Strategy', 'Joint Venture Structuring', 'Multi-Country Expansion & Branch Setup Support', 'Mergers & Acquisitions Advisory (M&A)', 'Franchise Model Development & Documentation', 'Business Insurance Solutions'],
  },
  {
    id: 'finance', icon: 'finance', logo: 'assets/finabler-mark.png', site: BRAND_SITES.finablers, short: 'Finablers', about: 'Finance, capital & compliance',
    title: 'Corporate Finance, Capital & Compliance Advisory', brand: 'Finablers',
    line: 'Capital, banking and compliance in one desk.',
    highlights: ['Capital raising: VC, PE, angel and IPO readiness', 'Trade finance: LCs, SBLCs, guarantees', 'CFO services and financial controls', 'VAT, corporate tax and AML compliance'],
    services: ['Business Valuation, Financial Modelling & Valuation Advisory', 'Corporate Bank Account Opening & Banking Assistance', 'POS Terminals, Payment Gateways & Fintech Solutions', 'Trade Credit Insurance & Buyer Credit Limit Solutions', 'Listed Company Financing & Corporate Funding Solutions', 'Trade & Corporate Finance: Receivables/Invoice Financing, Import/Export Finance, Letters of Credit (LC/DLC), SBLCs, Bank Guarantees & Manager’s Cheques', 'CFO Services, Financial Management & Strategic Advisory', 'Audit Preparation, Financial Reporting & Financial Controls Support', 'Debt Restructuring, Business Turnaround & Exit Advisory', 'Venture Capital (VC), Private Equity (PE), Angel Investment & Capital Raising Support', 'Capital Markets Advisory, Public Offering & IPO Readiness Support', 'VAT, Corporate Tax, AML Registration, Compliance & Filing Support'],
  },
  {
    id: 'technology', icon: 'technology', logo: 'assets/ugx-mark.png', logoSize: 50, logoShadow: 'strong', short: 'Ugx', about: 'Technology, AI & digital',
    title: 'Technology, AI & Digital Advisory', brand: 'Ugx',
    line: 'Software, AI agents and digital transformation.',
    highlights: ['AI agents, machine learning and automation', 'Web, mobile apps and custom software', 'Cloud, DevOps and cybersecurity', 'ERP/CRM implementation and integration'],
    services: ['IT Consultancy', 'Website & Mobile App Development, Custom Software, Web Applications, E-Commerce & UI/UX Design', 'AI Development, AI Agents, Machine Learning, Intelligent Automation & Business AI Solutions', 'Blockchain Development, Web3 Applications, Data Engineering & Emerging Technologies', 'Cloud Computing, SaaS Platforms, Cloud Infrastructure, DevOps, Cybersecurity & IT Support', 'ERP/CRM Implementation, Systems Integration, Business Process Automation & Digital Transformation', 'Digital Marketing, SEO, Social Media Management, Branding, Quality Assurance, Software Testing, Maintenance & Technical Support'],
  },
  {
    id: 'legal', icon: 'legal', logo: 'assets/trustablers-mark.png', site: BRAND_SITES.trustablers, short: 'Trustablers', about: 'Corporate legal support',
    title: 'Corporate Legal Support', brand: 'Trustablers',
    line: 'Contracts, governance and cross-border structuring.',
    highlights: ['AI-powered multilingual contract drafting', 'Governance, company secretarial and UBO reporting', 'Due diligence and risk assessment', 'IP, trademarks and data protection'],
    services: ['AI-Powered Legal Multilingual Contract Drafting', 'Commercial Contracts & Management, Negotiation Support, Regulatory Compliance & Beneficial Ownership Reporting, Corporate Governance, Company Secretarial Documentation & Shareholder Matters', 'Legal Research, Due Diligence, Risk Assessment & Cross-Border Corporate Structuring', 'Legal Notices, Dispute Documentation, Settlement Support & Legal Escalation', 'Data Protection, Privacy Compliance, Internal Policies & Employment Documentation', 'Intellectual Property Documentation, Trademark, Copyright, Licensing & IP Agreements'],
  },
  {
    id: 'realestate', icon: 'realestate', logo: 'assets/spaceablers-mark.png', logoSize: 80, logoShadow: true, short: 'Spaceablers', about: 'Smart commercial real estate',
    title: 'Smart Commercial Real Estate', brand: 'Spaceablers',
    line: 'Offices, warehouses and workspaces, matched by AI.',
    highlights: ['Offices, retail, warehouses and data centres', 'AI property matching and valuation', 'Ejari and lease documentation', 'Fit-out and smart office automation'],
    services: ['Commercial Property Sales, Leasing & Rentals: Offices, Retail Shops, Warehouses, Industrial Properties, Commercial Land, Data Centres, Coworking, Flexi-Desks, Virtual Office & Business Workspace', 'Property Search, Verification, AI Property Matching, Valuation & Market Insights', 'Ejari Registration, Lease Documentation & Commercial Property Transaction Support', 'Workspace Planning, Interior Design, Fit-Out, Office Handover & Smart Office Automation Solutions', 'End-to-End Support, including Listings, Deal Management, Negotiation & Closing'],
  },
  {
    id: 'hr', icon: 'hr', logo: 'assets/movera-mark.png', logoSize: 70, site: BRAND_SITES.movera, short: 'Movera', about: 'HR & immigration',
    title: 'Global HR & Immigration Solutions', brand: 'Movera',
    line: 'People, visas and residency across borders.',
    highlights: ['Recruitment and global staffing', 'Payroll, HR policy and workforce planning', 'Work permits, family and student visas', 'Golden Visa, residency and citizenship'],
    services: ['HR Policy Development & Advisory Services', 'Payroll Management, Employee Handbook & HR Documentation', 'Recruitment, Talent Acquisition & Global Staffing', 'Workforce Planning & Organizational Structure', 'Employee Training, Performance Management & Exit Interviews', 'Study Abroad & Student Visa Assistance', 'Work Permits, Employment Visas & Overseas Employment', 'Permanent Residency (PR) Solutions', 'Family, Spouse, Dependent, Tourist & Visitor Visa Services', 'Business & Investor Immigration, Golden Visa, Citizenship & Second Passport Solutions'],
  },
  {
    id: 'branding', icon: 'branding', logo: 'assets/brandora-mark.png', site: BRAND_SITES.brandora, short: 'Brandora', about: 'Branding, PR & events',
    title: 'Branding, PR & Event Support', brand: 'Brandora',
    line: 'Brands, campaigns and events that open doors.',
    highlights: ['Brand strategy and visual identity', 'PR, media relations and reputation', 'Content, social media and campaigns', 'Conferences, exhibitions and launches'],
    services: ['Brand Strategy, Positioning, Identity & Brand Guidelines', 'Corporate Branding, Logo Design, Rebranding & Visual Identity', 'Marketing Strategy, Campaign Planning, Digital Branding & Social Media', 'Public Relations (PR), Media Relations, Press Releases & Reputation Management', 'Corporate Communications, Content Creation, Creative Design & Marketing Collateral', 'Corporate Events, Conferences, Exhibitions, Product Launches, Sponsorships & Networking Events', 'Printing, Promotional Materials, Corporate Merchandise, Brand Partnerships & Influencer Relations'],
  },
  {
    id: 'trade', icon: 'trade', logo: 'assets/valora-mark.png', logoSize: 56, short: 'Valora', about: 'Trade & supply',
    title: 'Trade & Supply Advisory', brand: 'Valora',
    line: 'Sourcing, logistics and an AI-powered B2B marketplace.',
    highlights: ['AI-powered agentic marketplace', 'Supplier sourcing and buyer matching', 'Procurement, tendering and cost optimisation', 'Logistics, import/export and market access'],
    services: ['AI-Powered Agentic Marketplace for Product & Service Promotion', 'Supplier Sourcing, Vendor Identification & Onboarding', 'Procurement, Tendering & Contract Management Support', 'Cost Optimization & Strategic Procurement Advisory', 'Logistics Coordination, Import/Export & Trade Support', 'B2B Sales Advisory & Lead Generation', 'Digital Product Visibility, Business Promotion & Customer Acquisition', 'AI-Driven Supplier Discovery, Buyer Matching & Business Networking', 'Market Access, Trade Partnerships & Business Development', 'Supply Chain Optimization & Vendor Relationship Management'],
  },
];

const CONTACT = {
  email: 'Hello@enabler-s.com',
  phone: '+971 54 558 6455',
  address: 'Office No. 6, Street 61A, ARD Almaemuruh Center, Al Kazim Building, Al Garhoud, Dubai, UAE',
};
