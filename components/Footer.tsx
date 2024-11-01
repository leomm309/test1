import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#45206C] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PiExchangeCoin</h3>
            <p className="text-sm">Your trusted partner for coin exchanges</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#FCB54A] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#FCB54A] transition-colors">About Us</Link></li>
              <li><Link href="/exchange" className="hover:text-[#FCB54A] transition-colors">Exchange</Link></li>
              <li><Link href="/contact" className="hover:text-[#FCB54A] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-[#FCB54A] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#FCB54A] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-[#FCB54A] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#FCB54A] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#FCB54A] transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; 2024 PiExchangeCoin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}