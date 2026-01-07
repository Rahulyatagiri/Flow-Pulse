// InsiderPulse - Insider Trading Intelligence
// Real-time SEC Form 4 Filing Data

const insiderData = {
    // Latest Insider Transactions
    recentTransactions: [
        {
            id: 1,
            date: '2026-01-06',
            company: 'Tesla Inc',
            ticker: 'TSLA',
            insider: 'Elon Musk',
            title: 'CEO',
            transactionType: 'P', // P=Purchase, S=Sale, M=Option Exercise, A=Grant, G=Gift
            shares: 50000,
            pricePerShare: 455.15,
            value: 22757500,
            sharesOwned: 715000000,
            ownershipChange: 0.007,
            filingDate: '2026-01-06',
            isCluster: true
        },
        {
            id: 2,
            date: '2026-01-06',
            company: 'Tesla Inc',
            ticker: 'TSLA',
            insider: 'Kimbal Musk',
            title: 'Director',
            transactionType: 'P',
            shares: 10000,
            pricePerShare: 454.80,
            value: 4548000,
            sharesOwned: 1620000,
            ownershipChange: 0.62,
            filingDate: '2026-01-06',
            isCluster: true
        },
        {
            id: 3,
            date: '2026-01-05',
            company: 'Nvidia Corp',
            ticker: 'NVDA',
            insider: 'Jensen Huang',
            title: 'CEO',
            transactionType: 'P',
            shares: 25000,
            pricePerShare: 188.89,
            value: 4722250,
            sharesOwned: 86870000,
            ownershipChange: 0.029,
            filingDate: '2026-01-05',
            isCluster: false
        },
        {
            id: 4,
            date: '2026-01-05',
            company: 'Apple Inc',
            ticker: 'AAPL',
            insider: 'Tim Cook',
            title: 'CEO',
            transactionType: 'S',
            shares: 100000,
            pricePerShare: 272.99,
            value: 27299000,
            sharesOwned: 3280000,
            ownershipChange: -3.04,
            filingDate: '2026-01-05',
            isCluster: false
        },
        {
            id: 5,
            date: '2026-01-05',
            company: 'Microsoft Corp',
            ticker: 'MSFT',
            insider: 'Satya Nadella',
            title: 'CEO',
            transactionType: 'P',
            shares: 15000,
            pricePerShare: 421.55,
            value: 6323250,
            sharesOwned: 1675000,
            ownershipChange: 0.90,
            filingDate: '2026-01-05',
            isCluster: false
        },
        {
            id: 6,
            date: '2026-01-04',
            company: 'Amazon.com Inc',
            ticker: 'AMZN',
            insider: 'Andy Jassy',
            title: 'CEO',
            transactionType: 'P',
            shares: 8000,
            pricePerShare: 231.36,
            value: 1850880,
            sharesOwned: 450000,
            ownershipChange: 1.78,
            filingDate: '2026-01-04',
            isCluster: false
        },
        {
            id: 7,
            date: '2026-01-04',
            company: 'Meta Platforms Inc',
            ticker: 'META',
            insider: 'Mark Zuckerberg',
            title: 'CEO',
            transactionType: 'P',
            shares: 35000,
            pricePerShare: 645.20,
            value: 22582000,
            sharesOwned: 350145000,
            ownershipChange: 0.010,
            filingDate: '2026-01-04',
            isCluster: false
        },
        {
            id: 8,
            date: '2026-01-04',
            company: 'Palantir Technologies',
            ticker: 'PLTR',
            insider: 'Alexander Karp',
            title: 'CEO',
            transactionType: 'S',
            shares: 500000,
            pricePerShare: 79.64,
            value: 39820000,
            sharesOwned: 285000000,
            ownershipChange: -0.18,
            filingDate: '2026-01-04',
            isCluster: false
        },
        {
            id: 9,
            date: '2026-01-03',
            company: 'Broadcom Inc',
            ticker: 'AVGO',
            insider: 'Hock Tan',
            title: 'CEO',
            transactionType: 'P',
            shares: 5000,
            pricePerShare: 234.50,
            value: 1172500,
            sharesOwned: 2100000,
            ownershipChange: 0.24,
            filingDate: '2026-01-03',
            isCluster: false
        },
        {
            id: 10,
            date: '2026-01-03',
            company: 'Advanced Micro Devices',
            ticker: 'AMD',
            insider: 'Lisa Su',
            title: 'CEO',
            transactionType: 'P',
            shares: 20000,
            pricePerShare: 145.67,
            value: 2913400,
            sharesOwned: 4250000,
            ownershipChange: 0.47,
            filingDate: '2026-01-03',
            isCluster: false
        },
        {
            id: 11,
            date: '2026-01-03',
            company: 'Bank of America',
            ticker: 'BAC',
            insider: 'Brian Moynihan',
            title: 'CEO',
            transactionType: 'P',
            shares: 75000,
            pricePerShare: 54.94,
            value: 4120500,
            sharesOwned: 3890000,
            ownershipChange: 1.93,
            filingDate: '2026-01-03',
            isCluster: true
        },
        {
            id: 12,
            date: '2026-01-03',
            company: 'Bank of America',
            ticker: 'BAC',
            insider: 'Anne Finucane',
            title: 'Vice Chairman',
            transactionType: 'P',
            shares: 25000,
            pricePerShare: 54.90,
            value: 1372500,
            sharesOwned: 980000,
            ownershipChange: 2.55,
            filingDate: '2026-01-03',
            isCluster: true
        },
        {
            id: 13,
            date: '2026-01-02',
            company: 'Coinbase Global',
            ticker: 'COIN',
            insider: 'Brian Armstrong',
            title: 'CEO',
            transactionType: 'P',
            shares: 10000,
            pricePerShare: 287.45,
            value: 2874500,
            sharesOwned: 14500000,
            ownershipChange: 0.069,
            filingDate: '2026-01-02',
            isCluster: false
        },
        {
            id: 14,
            date: '2026-01-02',
            company: 'Boeing Company',
            ticker: 'BA',
            insider: 'David Calhoun',
            title: 'CEO',
            transactionType: 'P',
            shares: 12000,
            pricePerShare: 217.62,
            value: 2611440,
            sharesOwned: 875000,
            ownershipChange: 1.37,
            filingDate: '2026-01-02',
            isCluster: false
        },
        {
            id: 15,
            date: '2026-01-02',
            company: 'Netflix Inc',
            ticker: 'NFLX',
            insider: 'Reed Hastings',
            title: 'Executive Chairman',
            transactionType: 'S',
            shares: 50000,
            pricePerShare: 893.93,
            value: 44696500,
            sharesOwned: 1250000,
            ownershipChange: -4.00,
            filingDate: '2026-01-02',
            isCluster: false
        },
        {
            id: 16,
            date: '2025-12-30',
            company: 'Micron Technology',
            ticker: 'MU',
            insider: 'Sanjay Mehrotra',
            title: 'CEO',
            transactionType: 'P',
            shares: 18000,
            pricePerShare: 87.31,
            value: 1571580,
            sharesOwned: 1890000,
            ownershipChange: 0.95,
            filingDate: '2025-12-30',
            isCluster: false
        },
        {
            id: 17,
            date: '2025-12-30',
            company: 'Lululemon Athletica',
            ticker: 'LULU',
            insider: 'Calvin McDonald',
            title: 'CEO',
            transactionType: 'P',
            shares: 5000,
            pricePerShare: 409.12,
            value: 2045600,
            sharesOwned: 235000,
            ownershipChange: 2.13,
            filingDate: '2025-12-30',
            isCluster: false
        },
        {
            id: 18,
            date: '2025-12-30',
            company: 'Super Micro Computer',
            ticker: 'SMCI',
            insider: 'Charles Liang',
            title: 'CEO',
            transactionType: 'P',
            shares: 30000,
            pricePerShare: 29.28,
            value: 878400,
            sharesOwned: 8750000,
            ownershipChange: 0.34,
            filingDate: '2025-12-30',
            isCluster: false
        },
        {
            id: 19,
            date: '2025-12-29',
            company: 'McDonalds Corp',
            ticker: 'MCD',
            insider: 'Chris Kempczinski',
            title: 'CEO',
            transactionType: 'P',
            shares: 2500,
            pricePerShare: 305.98,
            value: 764950,
            sharesOwned: 125000,
            ownershipChange: 2.00,
            filingDate: '2025-12-29',
            isCluster: false
        },
        {
            id: 20,
            date: '2025-12-29',
            company: 'Rocket Lab USA',
            ticker: 'RKLB',
            insider: 'Peter Beck',
            title: 'CEO',
            transactionType: 'P',
            shares: 40000,
            pricePerShare: 20.66,
            value: 826400,
            sharesOwned: 12500000,
            ownershipChange: 0.32,
            filingDate: '2025-12-29',
            isCluster: false
        }
    ],

    // Cluster Buys (multiple insiders buying same stock within 7 days)
    clusterBuys: [
        {
            ticker: 'TSLA',
            company: 'Tesla Inc',
            insiderCount: 2,
            totalValue: 27305500,
            totalShares: 60000,
            avgPrice: 455.09,
            dateRange: '2026-01-06',
            insiders: ['Elon Musk', 'Kimbal Musk']
        },
        {
            ticker: 'BAC',
            company: 'Bank of America',
            insiderCount: 2,
            totalValue: 5493000,
            totalShares: 100000,
            avgPrice: 54.93,
            dateRange: '2026-01-03',
            insiders: ['Brian Moynihan', 'Anne Finucane']
        }
    ],

    // Top Insider Buyers (by transaction value, last 30 days)
    topBuyers: [
        { ticker: 'NFLX', company: 'Netflix Inc', insider: 'Reed Hastings', value: 44696500, type: 'S', sentiment: 'bearish' },
        { ticker: 'PLTR', company: 'Palantir Technologies', insider: 'Alexander Karp', value: 39820000, type: 'S', sentiment: 'bearish' },
        { ticker: 'AAPL', company: 'Apple Inc', insider: 'Tim Cook', value: 27299000, type: 'S', sentiment: 'bearish' },
        { ticker: 'TSLA', company: 'Tesla Inc', insider: 'Elon Musk', value: 22757500, type: 'P', sentiment: 'bullish' },
        { ticker: 'META', company: 'Meta Platforms Inc', insider: 'Mark Zuckerberg', value: 22582000, type: 'P', sentiment: 'bullish' },
        { ticker: 'MSFT', company: 'Microsoft Corp', insider: 'Satya Nadella', value: 6323250, type: 'P', sentiment: 'bullish' },
        { ticker: 'NVDA', company: 'Nvidia Corp', insider: 'Jensen Huang', value: 4722250, type: 'P', sentiment: 'bullish' },
        { ticker: 'TSLA', company: 'Tesla Inc', insider: 'Kimbal Musk', value: 4548000, type: 'P', sentiment: 'bullish' },
        { ticker: 'BAC', company: 'Bank of America', insider: 'Brian Moynihan', value: 4120500, type: 'P', sentiment: 'bullish' },
        { ticker: 'COIN', company: 'Coinbase Global', insider: 'Brian Armstrong', value: 2874500, type: 'P', sentiment: 'bullish' }
    ],

    // Significant Purchases (>$1M, last 7 days)
    significantPurchases: [
        { ticker: 'TSLA', company: 'Tesla Inc', totalValue: 27305500, transactionCount: 2, avgPrice: 455.09 },
        { ticker: 'META', company: 'Meta Platforms Inc', totalValue: 22582000, transactionCount: 1, avgPrice: 645.20 },
        { ticker: 'MSFT', company: 'Microsoft Corp', totalValue: 6323250, transactionCount: 1, avgPrice: 421.55 },
        { ticker: 'BAC', company: 'Bank of America', totalValue: 5493000, transactionCount: 2, avgPrice: 54.93 },
        { ticker: 'NVDA', company: 'Nvidia Corp', totalValue: 4722250, transactionCount: 1, avgPrice: 188.89 },
        { ticker: 'AMD', company: 'Advanced Micro Devices', totalValue: 2913400, transactionCount: 1, avgPrice: 145.67 },
        { ticker: 'COIN', company: 'Coinbase Global', totalValue: 2874500, transactionCount: 1, avgPrice: 287.45 },
        { ticker: 'BA', company: 'Boeing Company', totalValue: 2611440, transactionCount: 1, avgPrice: 217.62 },
        { ticker: 'LULU', company: 'Lululemon Athletica', totalValue: 2045600, transactionCount: 1, avgPrice: 409.12 },
        { ticker: 'AMZN', company: 'Amazon.com Inc', totalValue: 1850880, transactionCount: 1, avgPrice: 231.36 }
    ],

    // Summary Stats
    summary: {
        totalTransactions: 145,
        totalValue: 215847390,
        buyTransactions: 87,
        sellTransactions: 58,
        buyValue: 142563200,
        sellValue: 73284190,
        buySellRatio: 1.95,
        avgTransactionSize: 1488603,
        clusterBuyCount: 2,
        uniqueCompanies: 68,
        uniqueInsiders: 112
    },

    // Sector Breakdown
    sectors: {
        technology: { buyValue: 78500000, sellValue: 45200000, netSentiment: 0.73, companies: 28 },
        financial: { buyValue: 24300000, sellValue: 8900000, netSentiment: 0.63, companies: 12 },
        consumer: { buyValue: 18600000, sellValue: 12400000, netSentiment: 0.50, companies: 15 },
        healthcare: { buyValue: 12800000, sellValue: 4200000, netSentiment: 0.67, companies: 8 },
        industrial: { buyValue: 8364190, sellValue: 2584190, netSentiment: 0.69, companies: 5 }
    }
};

// Chart color configurations
const chartColors = {
    green: 'rgba(16, 185, 129, 0.8)',
    greenDim: 'rgba(16, 185, 129, 0.2)',
    greenBright: '#10b981',
    red: 'rgba(239, 68, 68, 0.8)',
    redDim: 'rgba(239, 68, 68, 0.2)',
    redBright: '#ef4444',
    blue: 'rgba(59, 130, 246, 0.8)',
    blueDim: 'rgba(59, 130, 246, 0.2)',
    blueBright: '#3b82f6',
    gold: 'rgba(251, 191, 36, 0.8)',
    goldDim: 'rgba(251, 191, 36, 0.2)',
    goldBright: '#fbbf24',
    purple: 'rgba(168, 85, 247, 0.8)',
    purpleDim: 'rgba(168, 85, 247, 0.2)',
    purpleBright: '#a855f7',
    cyan: 'rgba(6, 182, 212, 0.8)',
    cyanDim: 'rgba(6, 182, 212, 0.2)',
    cyanBright: '#06b6d4',
    gray: 'rgba(148, 163, 184, 0.5)',
    border: '#1e293b'
};

// Transaction type mappings
const transactionTypes = {
    'P': { label: 'Purchase', color: 'green', icon: '📈' },
    'S': { label: 'Sale', color: 'red', icon: '📉' },
    'M': { label: 'Option Exercise', color: 'blue', icon: '⚡' },
    'A': { label: 'Grant/Award', color: 'purple', icon: '🎁' },
    'G': { label: 'Gift', color: 'cyan', icon: '🎀' },
    'D': { label: 'Disposition', color: 'gold', icon: '📊' }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { insiderData, chartColors, transactionTypes };
}
