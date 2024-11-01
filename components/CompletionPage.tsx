import Link from 'next/link'
import { AppProps } from 'next/app';
import { NextPage } from 'next';

interface Details {
  amount: string; 
  fromCoin: string; 
  rate: string; 
  toCoin: string; 
  fee: string; 
}

interface CompletionPageProps {
  details: Details; 
}

const CompletionPage: NextPage<CompletionPageProps> = ({ details }) => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold text-[#FCB54A] mb-6">Exchange Complete!</h2>
      <div className="mb-6">
        <p className="text-lg mb-2">
        <span className="font-semibold">Amount Exchanged:</span> {details.amount} {details.fromCoin} → {parseFloat(details.amount) * parseFloat(details.rate)} {details.toCoin}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Fees:</span> {details.fee}%
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Time Taken:</span> 5 minutes
        </p>
      </div>
      <div className="space-y-4">
        <Link href="/history" className="block w-full bg-[#45206C] text-white p-2 rounded-md font-semibold">
          View Transaction History
        </Link>
        <Link href="/exchange" className="block w-full bg-[#FCB54A] text-[#45206C] p-2 rounded-md font-semibold">
          Make Another Exchange
        </Link>
      </div>
    </div>
  )
}