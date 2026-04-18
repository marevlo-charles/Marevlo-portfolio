import { FactCard } from '@/components/site/fact-card'
import { siteContent } from '@/content/site-content'

export function MetricsSection() {
  return (
    <div id="facts" className="facts">
      {siteContent.facts.map((fact, index) => (
        <FactCard
          key={fact.label}
          fact={fact}
          index={index}
        />
      ))}
    </div>
  )
}
