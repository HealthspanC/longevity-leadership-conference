export const SITE = {
  name: "Longevity Leadership Conference",
  tagline: "A Premium Executive Forum for the Longevity Industry",
  description:
    "An exclusive gathering designed for investors, medical professionals, and trailblazers redefining the future of human longevity and healthspan.",
  date: "April 30, 2026",
  time: "10:00 AM – 5:00 PM",
  venue: "Verizon Innovation Lab, Playa Vista",
  location: "Playa Vista, CA",
  year: "2026",
  edition: "3rd Annual",
  targetDate: "2026-04-30T10:00:00-07:00",
  host: "Healthspan Collective",
} as const;

export const LINKS = {
  tickets: "https://luma.com/LLC26",
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
    image: "/hosts/elias.jpg",
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
  { label: "About", href: "#about" },
  { label: "Hosts", href: "#hosts" },
  { label: "Speakers", href: "#speakers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Subscribe", href: "#subscribe" },
] as const;

export const STATS = [
  { value: 3, label: "Years Running", suffix: "" },
  { value: 500, label: "Expected Attendees", suffix: "+" },
  { value: 30, label: "Expert Speakers", suffix: "+" },
  { value: 1, label: "Exclusive Day", suffix: "" },
] as const;

export const VISION_FEATURES = [
  {
    icon: "Trophy",
    title: "Premium Executive Forum",
    description:
      "An intimate setting for high-level dialogue among the most influential minds shaping the longevity industry.",
  },
  {
    icon: "Activity",
    title: "Clinical Breakthroughs",
    description:
      "Presentations from doctors, researchers, and clinicians at the forefront of healthspan science and regenerative medicine.",
  },
  {
    icon: "TrendingUp",
    title: "Investment & Innovation",
    description:
      "Connect with investors and entrepreneurs driving the next wave of longevity innovation and biotech breakthroughs.",
  },
  {
    icon: "Users",
    title: "Unparalleled Networking",
    description:
      "Forge meaningful connections with fellow leaders committed to extending human healthspan and vitality.",
  },
] as const;

export const SPEAKERS = [
  {
    name: "Speaker Announcement",
    role: "Keynote",
    bio: "Our 2026 keynote lineup is being finalized. Follow us for speaker announcements.",
    quote: "The future of longevity starts with the conversations we have today.",
  },
  {
    name: "Speaker Announcement",
    role: "Clinical Research",
    bio: "Top clinicians and researchers in longevity medicine will be featured.",
    quote: "Evidence-based breakthroughs are redefining what it means to age well.",
  },
  {
    name: "Speaker Announcement",
    role: "Investment",
    bio: "Industry investors and business leaders driving healthspan innovation.",
    quote: "The longevity economy is the most consequential market of our generation.",
  },
  {
    name: "Speaker Announcement",
    role: "Longevity Science",
    bio: "Visionaries pioneering the future of the longevity ecosystem.",
    quote: "We are at the inflection point between aging as inevitable and aging as treatable.",
  },
  {
    name: "Speaker Announcement",
    role: "Biotech",
    bio: "Leading biotech innovators pushing the boundaries of healthspan technology.",
    quote: "Every breakthrough in biotech brings us closer to a longer, healthier life.",
  },
  {
    name: "Speaker Announcement",
    role: "Wellness",
    bio: "Experts in preventive medicine and evidence-based wellness protocols.",
    quote: "Prevention is the most powerful form of medicine we have.",
  },
] as const;

export const INVOLVE_CARDS = [
  {
    icon: "Mic",
    title: "Become a Speaker",
    description:
      "Share your expertise and research with an elite audience of longevity professionals and investors.",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfvrT-tIPExLp6EOz1bOII3gdJh-PcdocBuqToxdRBKXH9glQ/viewform",
    color: "purple" as const,
  },
  {
    icon: "FileText",
    title: "Summit Partner",
    description:
      "Align your brand with the premier longevity event and gain visibility among top decision-makers.",
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
