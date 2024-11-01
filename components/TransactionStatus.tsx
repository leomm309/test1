'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function TransactionStatus({ details }) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : 0)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-[#45206C] mb-4">Transaction in Progress</h2>
      <Loader2 className="animate-spin text-[#FCB54A] w-16 h-16 mx-auto mb-4" />
      <p className="text-lg mb-2">Estimated Time Left: {minutes}:{seconds.toString().padStart(2, '0')}</p>
      <p className="text-sm text-gray-600 mb-4">Waiting for network confirmation...</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div  className="bg-[#FCB54A] h-2.5 rounded-full" style={{ width: `${(300 - timeLeft) / 3}%` }}></div>
      </div>
      <p className="text-sm text-gray-600">
        You'll receive a notification when the transaction completes.
      </p>
    </div>
  )
}