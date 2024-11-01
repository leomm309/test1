'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import Header from '@/components/Header'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' })
    alert('Thank you for your message. We will get back to you soon!')
  }

  return (
    <>
    <Header/>
    
    <div className="min-h-screen bg-gradient-to-b from-[#45206C] to-[#6B3A9E] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="max-w-2xl mx-auto bg-white/10 p-8 rounded-lg backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FCB54A]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FCB54A]"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FCB54A]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-white/5 border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FCB54A]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#45206C] bg-[#FCB54A] hover:bg-[#fca82a] transition-colors"
            >
              Send Message
              <Send className="ml-2 -mr-1 w-5 h-5" />
            </button>
          </form>
        </div>

      
      </div>
    </div>
    </>
  )
}