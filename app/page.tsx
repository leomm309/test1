import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeatureCards from '@/components/FeatureCards'
import LiveExchangeRates from '@/components/LiveExchangeRates'
import Footer from '@/components/Footer'
import Reviews from '@/components/Reviews'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Hero />
      <Reviews/>
      <FeatureCards />
      <LiveExchangeRates />
      <Footer />
    </main>
  )
}