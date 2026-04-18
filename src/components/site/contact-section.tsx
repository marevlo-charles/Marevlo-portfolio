import { NewsletterForm } from '@/components/site/newsletter-form'
import { siteContent } from '@/content/site-content'

export function ContactSection() {
  const { contact } = siteContent

  return (
    <section id="contact" className="contact">
      <p className="section-label">{contact.sectionLabel}</p>
      <p className="blurb">{contact.blurb}</p>
      <NewsletterForm />
      <div className="links">
        {contact.links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
