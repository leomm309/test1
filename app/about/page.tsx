import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'
import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-[#45206C] to-[#6B3A9E] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">About PiExchangeCoin</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg mb-6">
            PiExchangeCoin is a leading cryptocurrency exchange platform, dedicated to providing a secure, efficient, and user-friendly environment for digital asset trading. Founded in 2023, we've quickly become a trusted name in the crypto space, serving users from over 100 countries worldwide.
          </p>
          <p className="text-lg mb-6">
            Our mission is to accelerate the world's transition to cryptocurrency by making digital asset exchange accessible to everyone. We believe in the potential of blockchain technology to revolutionize finance and empower individuals globally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <Shield className="w-12 h-12 text-[#FCB54A] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Security First</h3>
            <p className="text-gray-300">
              We employ state-of-the-art security measures to ensure your assets are protected at all times.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <Zap className="w-12 h-12 text-[#FCB54A] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-300">
              Experience rapid transactions with our cutting-edge exchange technology.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <Globe className="w-12 h-12 text-[#FCB54A] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-gray-300">
              Trade from anywhere in the world with our globally accessible platform.
            </p>
          </div>
        </div>

      

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start trading?</h2>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#45206C] bg-[#FCB54A] hover:bg-[#fca82a] transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}