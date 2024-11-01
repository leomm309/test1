'use client'

import { useState } from 'react';

interface Props {
  onExchange: (data: { amount: string; fromCoin: string; toCoin: string; rate: number; fee: number }) => void; // Adjust parameters as needed
}

const YourComponent: React.FC<Props> = ({ onExchange }) => {
  const [fromCoin, setFromCoin] = useState('BTC');
  const [toCoin, setToCoin] = useState('ETH');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // Explicitly typing the event
    e.preventDefault();
    onExchange({
      fromCoin,
      toCoin,
      amount,
      rate: 45, // This would be fetched from an API in a real application
      fee: 0.1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex mb-4">
        <select
          value={fromCoin}
          onChange={(e) => setFromCoin(e.target.value)}
          className="flex-1 p-2 text-[#45206C] rounded-l-md border-r border-gray-300"
        >
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
        </select>
        <select
          value={toCoin}
          onChange={(e) => setToCoin(e.target.value)}
          className="flex-1 p-2 text-[#45206C] rounded-r-md"
        >
          <option value="ETH">ETH</option>
          <option value="BTC">BTC</option>
          <option value="USDT">USDT</option>
        </select>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to exchange"
        className="w-full p-2 mb-4 text-[#45206C] rounded-md border border-gray-300"
      />
      <p className="text-sm text-gray-600 mb-4">1 {fromCoin} = 45 {toCoin}</p>
      <button type="submit" className="w-full bg-[#FCB54A] text-[#45206C] p-2 rounded-md font-semibold">
        Exchange Now
      </button>
      <p className="text-xs text-gray-500 mt-2">Transaction Fees: 0.1%</p>
    </form>
  );
};

export default YourComponent;
