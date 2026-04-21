export const SITE = {
  name: "Longevity Leadership Conference",
  tagline: "A Premium Executive Forum for the Longevity Industry",
  description:
    "An exclusive gathering designed for investors, medical professionals, and trailblazers redefining the future of human longevity and healthspan.",
  date: "April 30, 2026",
  time: "9:00 AM – 4:30 PM",
  venue: "Verizon Innovation Lab, Playa Vista",
  location: "Playa Vista, CA",
  year: "2026",
  edition: "3rd Annual",
  targetDate: "2026-04-30T09:00:00-07:00",
  host: "Healthspan Collective",
} as const;

export const LINKS = {
  tickets: "/tickets",
  applyFuture: "https://forms.gle/jFobRPFBdt8GXtCV8",
  applySpeaker:
    "https://docs.google.com/forms/d/e/1FAIpQLSfvrT-tIPExLp6EOz1bOII3gdJh-PcdocBuqToxdRBKXH9glQ/viewform",
  applyPartner:
    "https://docs.google.com/forms/d/e/1FAIpQLSfbo7rlnAaR3ya-rT_zPTwsxmOANRoLuqs9iUpd3gaUN7ShcQ/viewform",
  instagram: "https://www.instagram.com/healthspan_collective/",
  linkedin: "https://www.linkedin.com/company/healthspanpro/",
} as const;

export const HOSTS = [
  {
    name: "Adam Torres",
    title: "Co-Founder Mission Matters",
    image: "/hosts/adam.jpg",
    bio: "Adam is the host of the Mission Matters podcast, ranked in the top 2.5% out of 2,617,524 podcasts globally. Adam's advice has been featured in major publications such as Forbes, Fox Business, Investor's Business Daily, and The Street to name a few.",
    social: {
      linkedin: "https://www.linkedin.com/in/adamtorres8/",
      instagram: "https://www.instagram.com/askadamtorres",
      youtube: "https://www.youtube.com/@MissionMattersBusiness",
    },
  },
  {
    name: "Chirag Sagar",
    title: "Co-Founder Mission Matters",
    image: "/hosts/chirag.jpg",
    bio: "Chirag oversees the PR, branding, and events (IRL) efforts of Mission Matters along with community affairs and partnerships. Chirag co-founded 3 other ventures with one successful exit. He was also the inaugural Managing Director for a White-House recognized Non-profit teaching financial education to students in need.",
    social: {
      linkedin: "https://www.linkedin.com/in/chiragsagar/",
      instagram: "https://www.instagram.com/chiragdsagar",
      youtube: "https://www.youtube.com/@MissionMattersBusiness",
    },
  },
  {
    name: "Elias Arjan",
    title: "Founder/CEO - Healthspan Collective",
    image: "/hosts/elias-1.png",
    imagePosition: "center 20%",
    bio: "Elias Arjan is the host and visionary behind the Healthspan Productions, and a leading healthspan advocate, educator, and speaker. As a co-founder of PRUVN Research, Elias is known for his relentless commitment to evidence-based wellness and cutting-edge longevity science.",
    social: {
      linkedin: "https://www.linkedin.com/in/eliasarjan/",
      instagram: "https://www.instagram.com/eliasarjan",
      youtube: "https://www.youtube.com/@healthspan_collective",
    },
  },
] as const;

export const NAV_ITEMS = [
  { label: "Sponsors", href: "#sponsors" },
  { label: "Speakers", href: "#speakers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Venue", href: "#venue" },
  { label: "Subscribe", href: "#subscribe" },
  { label: "About", href: "/about" },
] as const;

export const STATS = [
  { value: 3, label: "Years Running", suffix: "" },
  { value: 300, label: "Expected Attendees", suffix: "+" },
  { value: 20, label: "Expert Speakers", suffix: "+" },
  { value: 1, label: "Exclusive Day", suffix: "" },
] as const;

export const SPEAKERS = [
  {
    name: "Sanjiv Lal",
    role: "Co-Founder at Regen Therapy",
    tag: "Keynote" as const,
    image: "/speakers/sanjiv-lal.jpg",
    imagePosition: "center 10%",
    bio: "Sanjiv Lal is a healthcare entrepreneur and strategic leader who has founded and scaled multiple laboratories, held leadership roles at major biotech firms. Sanjiv is a recognized voice in advancing regenerative medicine and a founder/partner at Motivant, a business-building family office.",
  },
  {
    name: "Paola Tefler",
    role: "Founder/CEO of SENS.AI",
    tag: "Keynote" as const,
    image: "/speakers/paola-telfer.png",
    imagePosition: "center 15%",
    bio: "Paola is a tech entrepreneur with a passion to develop technology that improves lives! Electrical Engineer, MBA in the Management of Technology and Singularity University Alumni. Life-long explorer of human consciousness development and member of the Space-Aging Research Institute (SARI) XPRIZE team.",
  },
  {
    name: "Ashley Hines",
    role: "Health, Beauty & Technology Advocate",
    tag: "Panelist" as const,
    image: "/speakers/ashley-hines.jpg",
    imagePosition: "center 30%",
    bio: "Ashley Hines is a clinical skincare educator with a background in the beauty industry who now focuses on advancing evidence-based approaches to skin health. Her work centers on translating the science of skin aging, barrier repair, and peptide signaling into practical education for clinicians, estheticians, and skin professionals.",
  },
  {
    name: "Gayland Hethcoat",
    role: "Counsel at ArentFox Schiff",
    tag: "Panelist" as const,
    image: "/speakers/gayland-hethcoat.png",
    bio: "Gayland Hethcoat is an attorney specializing in privacy, compliance, and transactional matters for health care providers and longevity companies. He is Counsel at ArentFox Schiff, where he co-leads the firm's Longevity & Healthspan Industry Group – a cross-sector initiative supporting the longevity ecosystem and the first of its kind among Am Law 100 law firms.\n\nGayland's clients include longevity medical clinics, biomarker testing companies, digital health platforms, and other businesses operating at the frontier of healthspan, preventive care, and technological innovation. He is frequently sought to advise on complex and cutting-edge legal and regulatory issues and is also a key member of deal teams for mergers, acquisitions, and other strategic transactions involving health care and health technology businesses.",
  },
  {
    name: "Dr. Resham Uttamchandani, MD",
    role: "ConciergeMD",
    tag: "Panelist" as const,
    image: "/speakers/resham-uttamchandani.jpg",
    bio: "Double board-certified physician in Family and Obesity Medicine with specialized training in metabolic health, functional medicine, and longevity. She earned her medical degree from the American University of the Caribbean and completed her Family Medicine residency at Eisenhower Medical Center.",
  },
  {
    name: "Josephine Musco",
    role: "Biotech & Wellness Innovation",
    tag: "Panelist" as const,
    image: "/speakers/josephine-musco.png",
    bio: "Josephine Musco is an inventor, CEO, and patent holder operating at the forefront of biotechnology, wellness innovation, and brand architecture. She is the founder of Olyxir, as well as House of Malakai and Château Bellevue, where she has transformed proprietary intellectual property into high growth, globally positioned companies.\n\nHer work focuses on translating advanced science, formulation, and systems thinking into scalable consumer and performance driven solutions. As an internationally sought after speaker, Musco presents on longevity, innovation, and the future of human optimization at conferences around the world. She is recognized for bridging scientific rigor with visionary leadership to build enduring, category defining enterprises.",
  },
  {
    name: "Jeremy Hoffmann",
    role: "Founder & CEO, Quantum Wellness Spa",
    tag: "Panelist" as const,
    image: "/speakers/jeremy-hoffmann.jpg",
    bio: "Jeremy Hoffmann is an entrepreneur and investor passionate about building businesses and communities that expand human aliveness.\n\nAs founder & CEO of Quantum Wellness Spa, Adapt or Die Cafe, and Not Coffee he pioneers intentional wellness experiences that reset the nervous system and foster connection to self and others.",
  },
  {
    name: "Nick Capozzi",
    role: "Revenue & Sales Leader in Longevity",
    tag: "Panelist" as const,
    image: "/speakers/nick-capozzi.jpg",
    bio: "Nick Capozzi is a revenue and sales leader with 25+ years of experience across multiple industries, with the last several years focused exclusively on longevity, healthspan, and wellness. He has held fractional CRO roles with some of the most innovative companies in the space and now works directly with clinics and practitioners to help them build the revenue systems their clinical expertise deserves.\n\nNick understands the science well enough to sell it, and the business well enough to build around it.",
  },
  {
    name: "Reshma Patel, PA-C",
    role: "Founder, Ananda Integrative Medicine",
    tag: "Panelist" as const,
    image: "/speakers/reshma-patel.png",
    bio: "Reshma Patel, PA-C, combines conventional western medicine with an integrative, functional and holistic approach to wellness at Ananda Integrative Medicine, in Los Angeles.\n\nBoard Certified by NCCPA · Certified by Women's Hormone Network · Certified Genomics Provider by Fagron Genomic US · Certified Genomics Provider by Nutrition Genome · Certified Functional Nutrition by MindBodyGreen · Member of The Menopause Society · Member of A4M (American Academy of Anti Aging Medicine)",
  },
  {
    name: "Dr. Kayte Susse",
    role: "Clinical Educator & Strategic Advisor",
    tag: "Panelist" as const,
    image: "/speakers/dr-kayte-susse.jpg",
    bio: "Dr. Kayte Susse is a Clinical Educator and Strategic Advisor for Regen Therapy, Generation Labs, and a portfolio of health and biotech ventures at the forefront of longevity and regenerative medicine. She translates advanced diagnostics and therapeutics into real-world applications across clinical, commercial, and educational settings.\n\nA recognized advocate for women's health and biotech safety — shaped in part by her own recovery from breast implant illness. She is the creator of Biohack Your Beauty, an educational platform exploring aesthetics, biotechnology, and human optimization.",
  },
  {
    name: "Arvind Chakravarthy, MD, MBA",
    role: "Founder of RegenTherapy™ and Co-Chair of RegenVentures",
    tag: "Panelist" as const,
    image: "/speakers/arvind-chakravarthy.jpeg",
    imagePosition: "center 20%",
    bio: "Arvind Chakravarthy, MD, MBA is a physician-entrepreneur focused on redefining the future of healthcare through Medicine 4.0—a proactive, data-driven model that shifts medicine from disease management to cellular optimization, longevity, and performance.",
  },
] as const;

export const SPONSORS = [
  {
    name: "Regen Therapy",
    tagline: "Regenerative Medicine & Wellness",
    logo: "/sponsors/regen-therapy.png",
    description:
      "Regen Therapy is at the forefront of regenerative medicine, offering advanced therapeutic solutions designed to restore, rejuvenate, and optimize human health and performance.",
    website: "https://regentherapy.com",
  },
  {
    name: "Routine",
    tagline: "Peptide Skincare Science",
    logo: "/sponsors/routine.png",
    description:
      "Routine is a peptide-powered skincare brand rooted in clinical science, delivering targeted formulations that support skin health, barrier repair, and longevity from the outside in.",
    website: "https://www.routineskin.com/healthspancollective",
  },
  {
    name: "SENS.AI",
    tagline: "Neurotechnology for Peak Performance",
    logo: "/sponsors/sensai.png",
    description:
      "SENS.AI develops cutting-edge neurotechnology that empowers individuals to optimize brain health, cognitive performance, and overall well-being through personalized neurofeedback solutions.",
    website: "https://sens.ai",
  },
  {
    name: "ConciergeMD",
    tagline: "Concierge Medicine & Longevity Care",
    logo: "/sponsors/concierge-md.png",
    description:
      "ConciergeMD is a concierge medical practice delivering personalized in-home care, telemedicine, and shipped-to-you treatments across Los Angeles, New York, and 25+ cities nationwide. With a focus on longevity and root-cause medicine, their board-certified physicians offer hormone therapies, peptide injections, NAD+ treatments, IV infusions, and functional care—all tailored to individual health goals.",
    website: "https://conciergemdla.com",
  },
  {
    name: "ArentFox Schiff",
    tagline: "Legal Counsel for Longevity & Healthspan",
    logo: "/sponsors/afs-logo.png",
    description:
      "ArentFox Schiff is a nationally recognized law firm providing strategic legal counsel to companies and innovators across the longevity and healthspan ecosystem.",
    website: "https://arentfox.com",
  },
  {
    name: "Pulse PEMF",
    tagline: "Pulsed Electromagnetic Field Therapy",
    logo: "/sponsors/pulse-pemf.png",
    description:
      "Pulse PEMF delivers advanced pulsed electromagnetic field technology designed to support cellular recovery, reduce inflammation, and enhance overall wellness and performance.",
    website: "https://pulsepemf.com/patrick-keenan/",
  },
  {
    name: "Sensate",
    tagline: "Vagus Nerve Stimulation Technology",
    logo: "/sponsors/sensate.png",
    description:
      "Sensate is a wearable device that uses patented infrasonic resonance technology to tone the vagus nerve, helping users manage stress, improve sleep, and enhance relaxation in just 10 minutes a day.",
    website: "https://us.getsensate.com",
  },
] as const;

export const EXPERIENCES = [
  {
    id: "peptide-shot-bar",
    name: "The Peptide Shot Bar",
    tagline: "Physician-Led Peptide Therapy",
    sponsor: "ConciergeMD",
    sponsorLogo: "/sponsors/concierge-md.png",
    icon: "Beaker" as const,
    accentColor: "#a87ce0",
    description:
      "ConciergeMD is bringing their Peptide Shot Bar, a physician-led activation where board-certified providers guide each guest through a brief consultation and administer a subcutaneous peptide injection tailored to their goals.",
    cta: "Available to all attendees",
    website: "https://conciergemdla.com",
    logoScale: 2.8,
  },
  {
    id: "iv-lounge",
    name: "IV Lounge",
    tagline: "Regenerative IV Therapy",
    sponsor: "Regen Therapy",
    sponsorLogo: "/sponsors/regen-therapy.png",
    icon: "Droplets" as const,
    accentColor: "#2a7a6e",
    description:
      "Regen Therapy will run an IV lounge administering its Regen Quantum Cell Factor. It is an advanced cell signaling technology designed to optimize cellular communication and mitochondrial efficiency, delivered intravenously for fast, systemic effect.",
    cta: "Available to all attendees",
    website: "https://regentherapy.com",
  },
  {
    id: "pemf-lounge",
    name: "PEMF Lounge",
    tagline: "Pulsed Electromagnetic Field Therapy",
    sponsor: "Pulse PEMF",
    sponsorLogo: "/sponsors/pulse-pemf.png",
    icon: "Zap" as const,
    accentColor: "#c06080",
    description:
      "Pulse PEMF is setting up a recovery lounge at the Longevity Leadership Conference. Trusted by health professionals and athletes worldwide, Pulse PEMF is one of the most clinically validated non-invasive recovery tools available.",
    cta: "Available to all attendees",
    website: "https://pulsepemf.com/patrick-keenan/",
    logoScale: 0.85,
  },
] as const;

export interface AgendaSession {
  id: string;
  time: string;
  phase: "morning" | "midday" | "afternoon" | "finale";
  format: "welcome" | "keynote" | "panel" | "networking" | "closing";
  formatLabel: string;
  title: string;
  speakers?: ReadonlyArray<{ name: string; role?: string }>;
  moderator?: { name: string; role?: string };
  panelists?: ReadonlyArray<{ name: string; role?: string }>;
  formatDetails?: ReadonlyArray<string>;
}

export const AGENDA: readonly AgendaSession[] = [
  {
    id: "opening",
    time: "10:00 – 10:15 AM",
    phase: "morning",
    format: "welcome",
    formatLabel: "Opening Welcome",
    title: "The State of Longevity Leadership",
    speakers: [
      { name: "Adam Torres", role: "Mission Matters" },
      { name: "Chirag Sagar", role: "Mission Matters" },
      { name: "Elias Arjan", role: "Healthspan Collective" },
    ],
  },
  {
    id: "keynote-inflection",
    time: "10:15 – 10:30 AM",
    phase: "morning",
    format: "keynote",
    formatLabel: "Keynote",
    title: "The Longevity Inflection Point",
    speakers: [{ name: "Elias Arjan", role: "Healthspan Collective" }],
  },
  {
    id: "keynote-cell-signaling",
    time: "10:30 – 10:50 AM",
    phase: "morning",
    format: "keynote",
    formatLabel: "Keynote",
    title: "Cell Signaling: The Future of Regenerative Medicine",
    speakers: [{ name: "Sanjiv Lal", role: "Co-Founder, Regen Therapy" }],
  },
  {
    id: "panel-peptides",
    time: "10:50 – 11:30 AM",
    phase: "morning",
    format: "panel",
    formatLabel: "Panel",
    title: "Peptides, Cell Factors & Hormonal Optimization",
    moderator: { name: "Elias Arjan", role: "Healthspan Collective" },
    panelists: [
      { name: "Dr. Resham Uttamchandani", role: "ConciergeMD" },
      { name: "Reshma Patel", role: "Ananda Integrative Medicine" },
      { name: "Dr. Arvind Chakravarthy", role: "Regen Therapy" },
    ],
  },
  {
    id: "keynote-brain-clock",
    time: "11:30 – 11:50 AM",
    phase: "morning",
    format: "keynote",
    formatLabel: "Keynote",
    title: "The World's First Brain Aging Clock",
    speakers: [{ name: "Paola Telfer", role: "SENS.AI" }],
  },
  {
    id: "lunch",
    time: "11:50 AM – 1:00 PM",
    phase: "midday",
    format: "networking",
    formatLabel: "Break",
    title: "Networking Lunch + Activations",
  },
  {
    id: "panel-aesthetics",
    time: "1:00 – 1:40 PM",
    phase: "afternoon",
    format: "panel",
    formatLabel: "Panel",
    title: "Regenerative Aesthetics & Longevity Medicine",
    moderator: { name: "Dr. Kayte Susse" },
    panelists: [
      { name: "Ashley Hines" },
      { name: "Josephine Musco" },
    ],
  },
  {
    id: "panel-clinics",
    time: "1:40 – 2:20 PM",
    phase: "afternoon",
    format: "panel",
    formatLabel: "Panel",
    title: "The Growth of Longevity & Wellness Clinics",
    moderator: { name: "Adam Torres", role: "Mission Matters" },
    panelists: [
      { name: "Nick Capozzi", role: "Longevity Clinic" },
      { name: "Jeremy Hoffmann", role: "Quantum Wellness Spa" },
    ],
  },
  {
    id: "panel-capital",
    time: "2:20 – 3:00 PM",
    phase: "afternoon",
    format: "panel",
    formatLabel: "Panel",
    title: "Capital, Risk & Governance in Longevity",
    moderator: { name: "Adam Torres", role: "Mission Matters" },
    panelists: [
      { name: "Gayland Hethcoat" },
      { name: "Investor", role: "TBD" },
      { name: "Operator / Founder", role: "TBD" },
    ],
  },
  {
    id: "closing",
    time: "3:00 – 3:30 PM",
    phase: "finale",
    format: "closing",
    formatLabel: "Closing + Q&A",
    title: "The Future of Longevity Leadership",
    speakers: [
      { name: "Elias Arjan", role: "Healthspan Collective" },
      { name: "Adam Torres", role: "Mission Matters" },
      { name: "Chirag Sagar", role: "Mission Matters" },
    ],
    formatDetails: [
      "Closing insights on where the longevity industry is heading",
      "Key takeaways from the day",
      "Open Q&A with audience",
      "Final call to action: partnerships, investment, and continued involvement",
    ],
  },
  {
    id: "networking",
    time: "3:30 – 4:30 PM",
    phase: "finale",
    format: "networking",
    formatLabel: "Open Networking",
    title: "Investor & Partner Conversations",
  },
];

export const INVOLVE_CARDS = [
  {
    icon: "Mic",
    title: "Become a Speaker",
    description:
      "Share your expertise with longevity leaders.",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfvrT-tIPExLp6EOz1bOII3gdJh-PcdocBuqToxdRBKXH9glQ/viewform",
    color: "purple" as const,
  },
  {
    icon: "FileText",
    title: "Summit Partner",
    description:
      "Gain visibility among top decision-makers.",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfbo7rlnAaR3ya-rT_zPTwsxmOANRoLuqs9iUpd3gaUN7ShcQ/viewform",
    color: "rose" as const,
  },
] as const;

export const GALLERY_ITEMS = [
  {
    tag: "Main Stage",
    title: "Keynote Presentations",
    description:
      "World-renowned speakers share groundbreaking research on extending the human healthspan.",
    watermarkIcon: "Monitor",
    gradient: "from-[#2d1b4e] via-[#5b3a8c] to-[#7b52b5]",
    span: "large",
  },
  {
    tag: "Community",
    title: "Executive Networking",
    watermarkIcon: "Users",
    gradient: "from-[#3c2066] to-[#6b4090]",
    span: "normal",
  },
  {
    tag: "Dialogue",
    title: "Expert Panels",
    watermarkIcon: "MessageSquare",
    gradient: "from-[#1e3a4c] via-[#2a6058] to-[#2a7a6e]",
    span: "normal",
  },
  {
    tag: "Innovation",
    title: "Biotech Showcase",
    watermarkIcon: "Activity",
    gradient: "from-[#2d1b4e] via-[#4a2d6e] to-[#6b4090]",
    span: "normal",
  },
  {
    tag: "Wellness",
    title: "Healthspan in Action",
    watermarkIcon: "Heart",
    gradient: "from-[#4a2040] via-[#7a3060] to-[#c06080]",
    span: "normal",
  },
  {
    tag: "Recognition",
    title: "Awards Ceremony",
    watermarkIcon: "Trophy",
    gradient: "from-[#1a1a2e] via-[#2d1b4e] to-[#3c2066]",
    span: "normal",
  },
  {
    tag: "Venue",
    title: "Verizon Innovation Lab",
    description: "Our home in the heart of Silicon Beach, Playa Vista.",
    watermarkIcon: "MapPin",
    gradient: "from-[#1a2e2a] via-[#2a5a4e] to-[#3a8a7a]",
    span: "wide",
  },
  {
    tag: "Investment",
    title: "Investor Roundtables",
    description:
      "Connecting capital with the next generation of longevity ventures.",
    watermarkIcon: "TrendingUp",
    gradient: "from-[#2d1b4e] to-[#5b3a8c]",
    span: "wide",
  },
] as const;
