import { BackgroundFx } from '@/components/site/background-fx'
import { ContactSection } from '@/components/site/contact-section'
import { Cursor } from '@/components/site/cursor'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { HeroSection } from '@/components/site/hero-section'
import { MetricsSection } from '@/components/site/metrics-section'
import { VenturesSection } from '@/components/site/ventures-section'
import { ScrollProgress } from '@/components/site/scroll-progress'

function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <BackgroundFx />
      <div className="grain" aria-hidden="true" />
      <div className="page">
        <Header />
        <HeroSection />
        <VenturesSection />
        <MetricsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  )
}

export default App
