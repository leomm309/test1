'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const exchangePairs = [
  { from: 'PI', to: 'BTC', rate: 0.0006 },
  { from: 'PI', to: 'USDT', rate: 39.97 },

]

const coinImages = {
  BTC: '/coins/btc.png',
  ETH: '/coins/eth.jpg',
  USDT: '/coins/usdt.png',
  PI: '/coins/pi.png',
}

export default function LiveExchangeRates() {
  const [rates, setRates] = useState(exchangePairs)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate rate changes
      setRates(prevRates => 
        prevRates.map(pair => ({
          ...pair,
          rate: pair.rate * (1 + (Math.random() - 0.5) * 0.001)
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#45206C] mb-8 md:mb-12 text-center">Live Exchange Rates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {rates.map((pair, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Image src={coinImages[pair.from]} alt={pair.from} width={32} height={32} />
                  <span className="mx-2 text-2xl">/</span>
                  <Image src={coinImages[pair.to]} alt={pair.to} width={32} height={32} />
                </div>
                <div className="text-2xl font-bold text-[#45206C]">{pair.rate.toFixed(5)}</div>
                <div className="text-sm text-gray-600">{pair.from}/{pair.to}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}