import { VentureCard } from '@/components/site/venture-card'
import { siteContent } from '@/content/site-content'

export function VenturesSection() {
  return (
    <section id="ventures">
      <div className="rule" />
      <p className="section-label">Our Ventures</p>
      <div className="ventures">
        {siteContent.ventures.map((venture, index) => (
          <VentureCard
            key={venture.title}
            venture={venture}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
