// FlowPulse - Options Flow Data
// Data as of December 31, 2025

const flowData = {
    // Top Bullish Stocks (Call Heavy)
    bullishStocks: [
        { symbol: 'TSLA', price: 455.15, callPremium: 4097200, putPremium: 600200, sentiment: 0.74, iv: 0.485, trades: 23 },
        { symbol: 'NVDA', price: 188.89, callPremium: 1393200, putPremium: 244700, sentiment: 0.70, iv: 0.334, trades: 9 },
        { symbol: 'MSTR', price: 153.39, callPremium: 2940400, putPremium: 1196000, sentiment: 0.42, iv: 0.639, trades: 17 },
        { symbol: 'LULU', price: 209.12, callPremium: 1060000, putPremium: 0, sentiment: 1.00, iv: 0.444, trades: 1 },
        { symbol: 'MU', price: 287.31, callPremium: 1054700, putPremium: 0, sentiment: 1.00, iv: 0.586, trades: 4 },
        { symbol: 'BAC', price: 54.94, callPremium: 818100, putPremium: 0, sentiment: 1.00, iv: 0.223, trades: 5 },
        { symbol: 'SMCI', price: 29.28, callPremium: 717300, putPremium: 0, sentiment: 1.00, iv: 0.627, trades: 7 },
        { symbol: 'MCD', price: 305.98, callPremium: 640500, putPremium: 0, sentiment: 1.00, iv: 0.155, trades: 4 },
        { symbol: 'RKLB', price: 70.66, callPremium: 638200, putPremium: 0, sentiment: 1.00, iv: 0.839, trades: 4 },
        { symbol: 'BA', price: 217.62, callPremium: 627400, putPremium: 0, sentiment: 1.00, iv: 0.299, trades: 5 }
    ],

    // Best Risk/Reward (Bullish + Low IV)
    riskRewardStocks: [
        { symbol: 'MCD', price: 305.98, totalPremium: 640500, sentiment: 1.00, iv: 0.155, score: 0.591 },
        { symbol: 'BAC', price: 54.94, totalPremium: 818100, sentiment: 1.00, iv: 0.223, score: 0.584 },
        { symbol: 'AMZN', price: 231.36, totalPremium: 573800, sentiment: 1.00, iv: 0.288, score: 0.562 },
        { symbol: 'BA', price: 217.62, totalPremium: 627400, sentiment: 1.00, iv: 0.299, score: 0.562 },
        { symbol: 'NFLX', price: 93.93, totalPremium: 503200, sentiment: 1.00, iv: 0.284, score: 0.561 },
        { symbol: 'XOM', price: 120.03, totalPremium: 75100, sentiment: 1.00, iv: 0.206, score: 0.561 },
        { symbol: 'CVX', price: 152.10, totalPremium: 60500, sentiment: 1.00, iv: 0.203, score: 0.561 },
        { symbol: 'TSLA', price: 455.15, totalPremium: 4697400, sentiment: 0.74, iv: 0.485, score: 0.564 }
    ],

    // Highest Premium Interest
    premiumStocks: [
        { symbol: 'PLTR', price: 179.64, totalPremium: 11536800, sentiment: -0.95, iv: 0.412, trades: 18 },
        { symbol: 'TSLA', price: 455.15, totalPremium: 4697400, sentiment: 0.74, iv: 0.485, trades: 23 },
        { symbol: 'MSTR', price: 153.39, totalPremium: 4136400, sentiment: 0.42, iv: 0.639, trades: 17 },
        { symbol: 'HUT', price: 46.51, totalPremium: 3242600, sentiment: -0.93, iv: 0.610, trades: 4 },
        { symbol: 'IREN', price: 38.08, totalPremium: 3234900, sentiment: -0.77, iv: 0.678, trades: 8 },
        { symbol: 'AAPL', price: 272.99, totalPremium: 2389200, sentiment: 0.24, iv: 0.171, trades: 17 },
        { symbol: 'NVDA', price: 188.89, totalPremium: 1637900, sentiment: 0.70, iv: 0.334, trades: 9 }
    ],

    // Detailed Flow Data
    detailedFlow: [
        { symbol: 'TSLA', type: 'Call', strike: 440, exp: 'Jan 2', premium: 773700, volume: 486, iv: 0.457, delta: 0.85 },
        { symbol: 'TSLA', type: 'Call', strike: 445, exp: 'Jan 2', premium: 558700, volume: 480, iv: 0.441, delta: 0.76 },
        { symbol: 'TSLA', type: 'Call', strike: 455, exp: 'Jan 2', premium: 159900, volume: 299, iv: 0.427, delta: 0.49 },
        { symbol: 'PLTR', type: 'Put', strike: 330, exp: 'Nov 26', premium: 5471700, volume: 356, iv: 0.569, delta: -0.85 },
        { symbol: 'IREN', type: 'Put', strike: 42.5, exp: 'Jan 2', premium: 1259400, volume: 2869, iv: 0.000, delta: 0 },
        { symbol: 'IREN', type: 'Put', strike: 39, exp: 'Jan 9', premium: 700000, volume: 2869, iv: 0.816, delta: -0.55 },
        { symbol: 'HUT', type: 'Put', strike: 53, exp: 'Jan 2', premium: 2210700, volume: 3476, iv: 0.000, delta: 0 },
        { symbol: 'HUT', type: 'Put', strike: 49, exp: 'Jan 2', premium: 914100, volume: 3476, iv: 0.711, delta: -0.82 },
        { symbol: 'AAPL', type: 'Call', strike: 275, exp: 'Feb 20', premium: 1021700, volume: 1195, iv: 0.219, delta: 0.50 },
        { symbol: 'LULU', type: 'Call', strike: 270, exp: 'Jan 27', premium: 1060000, volume: 500, iv: 0.444, delta: 0.40 },
        { symbol: 'NVDA', type: 'Call', strike: 195, exp: 'Mar 20', premium: 709500, volume: 550, iv: 0.428, delta: 0.49 },
        { symbol: 'NVDA', type: 'Call', strike: 197.5, exp: 'Jan 16', premium: 120800, volume: 562, iv: 0.327, delta: 0.28 },
        { symbol: 'MSTR', type: 'Put', strike: 155, exp: 'Feb 20', premium: 536200, volume: 325, iv: 0.696, delta: -0.46 },
        { symbol: 'MSTR', type: 'Call', strike: 175, exp: 'Jan 16', premium: 101200, volume: 450, iv: 0.682, delta: 0.20 },
        { symbol: 'BAC', type: 'Call', strike: 50, exp: 'Jun 26', premium: 740000, volume: 1000, iv: 0.295, delta: 0.72 },
        { symbol: 'MU', type: 'Call', strike: 370, exp: 'Sep 26', premium: 423100, volume: 110, iv: 0.644, delta: 0.44 },
        { symbol: 'MU', type: 'Call', strike: 350, exp: 'Sep 26', premium: 478900, volume: 110, iv: 0.644, delta: 0.48 },
        { symbol: 'MCD', type: 'Call', strike: 310, exp: 'Jan 16', premium: 320000, volume: 200, iv: 0.155, delta: 0.45 },
        { symbol: 'AMZN', type: 'Call', strike: 250, exp: 'Jan 27', premium: 557000, volume: 200, iv: 0.339, delta: 0.52 },
        { symbol: 'BA', type: 'Call', strike: 320, exp: 'Jan 27', premium: 283700, volume: 454, iv: 0.348, delta: 0.17 }
    ],

    // Summary Stats
    summary: {
        totalPremium: 32400000,
        bullishSignals: 15,
        bearishSignals: 8,
        neutralSignals: 12,
        callPutRatio: 1.42,
        uniqueTickers: 127,
        avgIV: 0.52
    },

    // Sector Breakdown
    sectors: {
        tech: { premium: 12500000, sentiment: 0.65 },
        crypto: { premium: 8200000, sentiment: -0.72 },
        finance: { premium: 2100000, sentiment: 0.85 },
        consumer: { premium: 1800000, sentiment: 0.78 },
        energy: { premium: 1200000, sentiment: 0.45 }
    }
};

// Chart color configurations
const chartColors = {
    green: 'rgba(0, 255, 136, 0.8)',
    greenDim: 'rgba(0, 255, 136, 0.2)',
    red: 'rgba(255, 71, 87, 0.8)',
    redDim: 'rgba(255, 71, 87, 0.2)',
    blue: 'rgba(59, 130, 246, 0.8)',
    blueDim: 'rgba(59, 130, 246, 0.2)',
    gold: 'rgba(251, 191, 36, 0.8)',
    goldDim: 'rgba(251, 191, 36, 0.2)',
    purple: 'rgba(168, 85, 247, 0.8)',
    purpleDim: 'rgba(168, 85, 247, 0.2)',
    gray: 'rgba(148, 163, 184, 0.5)',
    border: '#1e293b'
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { flowData, chartColors };
}
