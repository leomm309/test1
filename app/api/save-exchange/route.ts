import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Simple in-memory store for rate limiting
const WINDOW_SIZE_IN_SECONDS = 60
const MAX_REQUESTS_PER_WINDOW = 5
const ipRequestCounts: { [key: string]: { count: number; timestamp: number } } = {}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - WINDOW_SIZE_IN_SECONDS * 1000

  if (!ipRequestCounts[ip]) {
    ipRequestCounts[ip] = { count: 1, timestamp: now }
    return false
  }

  if (ipRequestCounts[ip].timestamp < windowStart) {
    ipRequestCounts[ip] = { count: 1, timestamp: now }
    return false
  }

  ipRequestCounts[ip].count++
  return ipRequestCounts[ip].count > MAX_REQUESTS_PER_WINDOW
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    const exchangeData = await request.json()

    // Validate the exchangeData
    if (!exchangeData || typeof exchangeData !== 'object') {
      return NextResponse.json({ error: 'Invalid exchange data' }, { status: 400 })
    }

    const requiredFields = ['time', 'date', 'amount', 'fromCoin', 'toCoin', 'diWalletAddress', 'toAddress']
    for (const field of requiredFields) {
      if (!(field in exchangeData)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Define the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'fm1.json')

    // Read existing data
    let exchanges = []
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      exchanges = JSON.parse(fileContent)
    } catch (error) {
      // If file doesn't exist or is empty, start with an empty array
      console.log('No existing file found, starting with empty array')
    }

    // Add new exchange data at the beginning of the array
    exchanges.unshift(exchangeData)

    // Write updated data back to file
    await fs.writeFile(filePath, JSON.stringify(exchanges, null, 2))

    return NextResponse.json({ message: 'Exchange data saved successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error saving exchange data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}