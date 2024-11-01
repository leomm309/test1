const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(process.cwd(), 'data', 'last-transaction.json');

const coins = ['BTC', 'USDT']; // Only include toCoin options

function generateRandomTransaction() {
  const fromCoin = 'PI'; // Always set fromCoin to DI
  const toCoin = coins[Math.floor(Math.random() * coins.length)]; // Randomly select toCoin

  // Generate a random amount between 500 and 1000
  const amount = (Math.random() * (1000 - 500) + 500).toFixed(2);
  const address = `${fromCoin.toLowerCase()}${Math.random().toString(36).substr(2, 8)}...${Math.random().toString(36).substr(2, 4)}`;

  return {
    time: new Date().toISOString(),
    fromCoin,
    toCoin,
    amount,
    address,
  };
}

function updateLastTransaction() {
  const transaction = generateRandomTransaction();
  fs.writeFileSync(dataFilePath, JSON.stringify(transaction, null, 2));
  console.log('Last transaction updated:', transaction);
}

// Update immediately on script start
updateLastTransaction();

// Then update every 5 minutes
setInterval(updateLastTransaction, 1 * 60 * 1000);

console.log('Update script is running. Press Ctrl+C to stop.');
