import type { SiteContent } from '@/types/site'

export const siteContent: SiteContent = {
  company: {
    shortName: 'MAREVLO RESEARCH',
    entity: 'Private Limited',
    location: 'Bengaluru, India',
    status: 'Under Construction',
    email: 'contact@marevloresearch.com',
    cin: 'U62099KA2026PTC219231',
  },
  hero: {
    tag: 'Education · Finance · AI Consulting · Research',
    titleLead: 'Building the',
    titleAccent: 'Infrastructure',
    titleTrail: "for a Universal AI Future",
    description:
      "Marevlo Research Pvt Ltd is a deep-tech company building products across AI education, personal finance, and applied AI while consulting the world's leading firms on what comes next.",
  },
  ventures: [
    {
      icon: '\u{1F4D0}',
      title: 'Marevlo Education',
      brand: 'Marevlo Research Pvt Ltd · In Development',
      description:
        "India's premium learning platform for AI, Machine Learning & Data Science production-grade courses, an adaptive AI tutor (MIRA), 481 curated DSA challenges, and interactive visual learning modules.",
      status: 'In Development',
    },
    {
      icon: '\u25C8',
      title: 'Artha',
      brand: 'Goal-First Financial Companion · Idea Phase',
      description:
        "India's first goal-driven personal finance app zero bank login, on-device SMS parsing, dream-based savings roadmaps, behavioral nudges, a splurge fund, and a future-self simulator that turns saving into living.",
      status: 'Future Project',
    },
    {
      icon: '\u2B21',
      title: 'AI Consulting',
      brand: 'Enterprise & Strategy Firms · Active',
      description:
        'Deep AI consulting for global enterprises and strategy firms, specializing in Reinforcement Learning, Generative AI, Agentic AI architectures, predictive analytics, and ML pipeline engineering across energy, mining, telecom, manufacturing, retail, banking, and e-commerce.',
      status: 'Active',
    },
    {
      icon: '\u{1F52C}',
      title: 'Marevlo Research',
      brand: 'Advanced Programme · In Development',
      description:
        'A research-grade education programme advanced courses on PINNs, Reinforcement Learning, diffusion models, causal inference, and animated paper breakdowns published bi-weekly for practitioners pushing the frontier.',
      status: 'In Development',
    },
  ],
  facts: [
    { value: '4', label: 'Verticals', countTo: 4, countFrom: 0 },
    { value: '2026', label: 'Founded', countTo: 2026, countFrom: 2020 },
    { value: 'India', label: 'Headquartered' },
    { value: 'Deep Tech', label: 'Category' },
  ],
  contact: {
    sectionLabel: 'Stay Informed',
    blurb:
      'Our ventures are launching soon. Get updates on products, open positions, and partnership opportunities.',
    emailPlaceholder: 'your@email.com',
    successMessage: "Subscribed — we'll be in touch",
    links: [
      { label: 'Email', href: 'mailto:contact@marevloresearch.com' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
  footer: {
    copy: '© 2026 Marevlo Research Pvt Ltd. All rights reserved.',
    legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
}
