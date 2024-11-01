import { Clock, DollarSign, Shield, PhoneCall } from 'lucide-react'

const features = [
  { title: 'Fast Transactions', icon: Clock, description: 'Experience lightning-fast cryptocurrency exchanges.' },
  { title: 'Low Fees', icon: DollarSign, description: 'Enjoy competitive rates and minimal transaction fees.' },
  { title: 'Secure Exchange', icon: Shield, description: 'Your transactions are protected by state-of-the-art security.' },
  { title: '24/7 Support', icon: PhoneCall, description: 'Our support team is always ready to assist you.' },
]

export default function FeatureCards() {
  return (
    <section className="w-full py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#45206C] mb-8 md:mb-12 text-center">Why Choose CoinExchange?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#FCB54A] hover:shadow-xl transition-shadow">
              <feature.icon className="w-12 h-12 text-[#45206C] mb-4" />
              <h3 className="text-xl font-semibold text-[#45206C] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}