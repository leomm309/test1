"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-[#45206C] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="CoinExchange Logo" width={40} height={40} />
          <span className="text-xl md:text-2xl font-bold">PiExchangeCoin</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-[#FCB54A] transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#FCB54A] transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#FCB54A] transition-colors">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-[#FCB54A] transition-colors">FAQ</Link></li>
          </ul>
        </nav>
       
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <nav>
            <ul className="flex flex-col space-y-2">
              <li><Link href="/" className="block py-2 hover:text-[#FCB54A] transition-colors">Home</Link></li>
              <li><Link href="/about" className="block py-2 hover:text-[#FCB54A] transition-colors">About Us</Link></li>
              <li><Link href="/exchange" className="block py-2 hover:text-[#FCB54A] transition-colors">Exchange</Link></li>
              <li><Link href="/contact" className="block py-2 hover:text-[#FCB54A] transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="block py-2 hover:text-[#FCB54A] transition-colors">FAQ</Link></li>
            </ul>
          </nav>
        
        </div>
      )}
    </header>
  )
}