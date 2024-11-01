import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'last-transaction.json')
const lastUpdateFilePath = path.join(process.cwd(), 'data', 'last-update-time.txt')

const coins = ['PI', 'BTC', 'USDT']

function generateRandomTransaction() {
  const fromCoin = 'PI'
  let toCoin
  do {
    toCoin = coins[Math.floor(Math.random() * coins.length)]
  } while (toCoin === fromCoin)

  const amount = (Math.random() * (2000 - 500) + 500).toFixed(2)
  const address = `${fromCoin.toLowerCase()}${Math.random().toString(36).substr(2, 8)}...${Math.random().toString(36).substr(2, 4)}`

  return {
    time: new Date().toISOString(),
    fromCoin,
    toCoin,
    amount,
    address,
  }
}

async function readLastTransaction() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading last transaction data:', error)
    return null
  }
}

async function writeLastTransaction(transaction) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(transaction, null, 2))
  } catch (error) {
    console.error('Error writing last transaction data:', error)
  }
}

async function getLastUpdateTime() {
  try {
    const time = await fs.readFile(lastUpdateFilePath, 'utf8')
    return parseInt(time, 10)
  } catch (error) {
    return 0
  }
}

async function setLastUpdateTime(time) {
  try {
    await fs.writeFile(lastUpdateFilePath, time.toString())
  } catch (error) {
    console.error('Error writing last update time:', error)
  }
}

export async function GET() {
  try {
    const currentTime = Date.now()
    const lastUpdateTime = await getLastUpdateTime()

    if (currentTime - lastUpdateTime > 0.1 * 60 * 1000) { // 5 minutes
      const newTransaction = generateRandomTransaction()
      await writeLastTransaction(newTransaction)
      await setLastUpdateTime(currentTime)
    }

    const lastTransaction = await readLastTransaction()
    if (lastTransaction) {
      return NextResponse.json(lastTransaction)
    } else {
      throw new Error('Failed to fetch last transaction')
    }
  } catch (error) {
    console.error('Error in GET request:', error)
    return NextResponse.json({ error: 'Failed to fetch last transaction' }, { status: 500 })
  }
}