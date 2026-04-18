export interface VentureItem {
  icon: string
  title: string
  brand: string
  description: string
  status: string
}

export interface FactItem {
  value: string
  label: string
  countTo?: number
  countFrom?: number
}

export interface LinkItem {
  label: string
  href: string
}

export interface SiteContent {
  company: {
    shortName: string
    entity: string
    location: string
    status: string
    email: string
    cin: string
  }
  hero: {
    tag: string
    titleLead: string
    titleAccent: string
    titleTrail: string
    description: string
  }
  ventures: VentureItem[]
  facts: FactItem[]
  contact: {
    sectionLabel: string
    blurb: string
    emailPlaceholder: string
    successMessage: string
    links: LinkItem[]
  }
  footer: {
    copy: string
    legal: LinkItem[]
  }
}
