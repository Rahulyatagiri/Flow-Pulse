#!/usr/bin/env python3
"""
FlowPulse Excel to JavaScript Data Converter
Converts options flow data from Excel to js/data.js format
"""

import pandas as pd
import json
from datetime import datetime
import sys
import os

def load_excel_data(excel_file):
    """Load data from Excel file with multiple sheets"""
    try:
        # Read all sheets
        xls = pd.ExcelFile(excel_file)
        data = {}

        # Expected sheet names
        expected_sheets = ['BullishStocks', 'RiskReward', 'PremiumStocks', 'DetailedFlow', 'Summary', 'Sectors']

        for sheet in xls.sheet_names:
            data[sheet] = pd.read_excel(excel_file, sheet_name=sheet)
            print(f"✓ Loaded sheet: {sheet} ({len(data[sheet])} rows)")

        return data
    except Exception as e:
        print(f"Error loading Excel file: {e}")
        sys.exit(1)

def format_bullish_stocks(df):
    """Format bullish stocks data"""
    stocks = []
    for _, row in df.iterrows():
        stocks.append({
            'symbol': str(row['symbol']),
            'price': float(row['price']),
            'callPremium': int(row['callPremium']),
            'putPremium': int(row['putPremium']),
            'sentiment': round(float(row['sentiment']), 2),
            'iv': round(float(row['iv']), 3),
            'trades': int(row['trades'])
        })
    return stocks

def format_risk_reward(df):
    """Format risk/reward stocks data"""
    stocks = []
    for _, row in df.iterrows():
        stocks.append({
            'symbol': str(row['symbol']),
            'price': float(row['price']),
            'totalPremium': int(row['totalPremium']),
            'sentiment': round(float(row['sentiment']), 2),
            'iv': round(float(row['iv']), 3),
            'score': round(float(row['score']), 3)
        })
    return stocks

def format_premium_stocks(df):
    """Format premium stocks data"""
    stocks = []
    for _, row in df.iterrows():
        stocks.append({
            'symbol': str(row['symbol']),
            'price': float(row['price']),
            'totalPremium': int(row['totalPremium']),
            'sentiment': round(float(row['sentiment']), 2),
            'iv': round(float(row['iv']), 3),
            'trades': int(row['trades'])
        })
    return stocks

def format_detailed_flow(df):
    """Format detailed flow data"""
    flows = []
    for _, row in df.iterrows():
        flows.append({
            'symbol': str(row['symbol']),
            'type': str(row['type']),
            'strike': float(row['strike']),
            'exp': str(row['exp']),
            'premium': int(row['premium']),
            'volume': int(row['volume']),
            'iv': round(float(row['iv']), 3),
            'delta': round(float(row['delta']), 2)
        })
    return flows

def format_summary(df):
    """Format summary data"""
    row = df.iloc[0]
    return {
        'totalPremium': int(row['totalPremium']),
        'bullishSignals': int(row['bullishSignals']),
        'bearishSignals': int(row['bearishSignals']),
        'neutralSignals': int(row['neutralSignals']),
        'callPutRatio': round(float(row['callPutRatio']), 2),
        'uniqueTickers': int(row['uniqueTickers']),
        'avgIV': round(float(row['avgIV']), 2)
    }

def format_sectors(df):
    """Format sector data"""
    sectors = {}
    for _, row in df.iterrows():
        sectors[row['sector']] = {
            'premium': int(row['premium']),
            'sentiment': round(float(row['sentiment']), 2)
        }
    return sectors

def generate_js_file(data, output_file):
    """Generate JavaScript data file"""

    # Process each data section
    bullish = format_bullish_stocks(data['BullishStocks']) if 'BullishStocks' in data else []
    risk_reward = format_risk_reward(data['RiskReward']) if 'RiskReward' in data else []
    premium = format_premium_stocks(data['PremiumStocks']) if 'PremiumStocks' in data else []
    detailed = format_detailed_flow(data['DetailedFlow']) if 'DetailedFlow' in data else []
    summary = format_summary(data['Summary']) if 'Summary' in data else {}
    sectors = format_sectors(data['Sectors']) if 'Sectors' in data else {}

    # Generate JavaScript content
    today = datetime.now().strftime("%B %d, %Y")

    js_content = f"""// FlowPulse - Options Flow Data
// Data as of {today}

const flowData = {{
    // Top Bullish Stocks (Call Heavy)
    bullishStocks: {json.dumps(bullish, indent=8)[0:1]}
{json.dumps(bullish, indent=8)[1:]},

    // Best Risk/Reward (Bullish + Low IV)
    riskRewardStocks: {json.dumps(risk_reward, indent=8)[0:1]}
{json.dumps(risk_reward, indent=8)[1:]},

    // Highest Premium Interest
    premiumStocks: {json.dumps(premium, indent=8)[0:1]}
{json.dumps(premium, indent=8)[1:]},

    // Detailed Flow Data
    detailedFlow: {json.dumps(detailed, indent=8)[0:1]}
{json.dumps(detailed, indent=8)[1:]},

    // Summary Stats
    summary: {json.dumps(summary, indent=8)},

    // Sector Breakdown
    sectors: {json.dumps(sectors, indent=8)}
}};

// Chart color configurations
const chartColors = {{
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
}};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{ flowData, chartColors }};
}}
"""

    # Write to file
    with open(output_file, 'w') as f:
        f.write(js_content)

    print(f"\n✓ Generated {output_file}")
    print(f"  - {len(bullish)} bullish stocks")
    print(f"  - {len(risk_reward)} risk/reward stocks")
    print(f"  - {len(premium)} premium stocks")
    print(f"  - {len(detailed)} detailed flow entries")

def main():
    if len(sys.argv) < 2:
        print("Usage: python excel_to_data.py <excel_file>")
        print("\nExample: python excel_to_data.py data/flow_data.xlsx")
        sys.exit(1)

    excel_file = sys.argv[1]

    if not os.path.exists(excel_file):
        print(f"Error: File '{excel_file}' not found")
        sys.exit(1)

    print(f"Converting {excel_file} to JavaScript data...\n")

    # Load Excel data
    data = load_excel_data(excel_file)

    # Generate JS file
    output_file = os.path.join(os.path.dirname(__file__), '../js/data.js')
    generate_js_file(data, output_file)

    print(f"\n✓ Conversion complete!")
    print(f"\nNext steps:")
    print(f"  1. Review the updated js/data.js file")
    print(f"  2. Commit: git add js/data.js")
    print(f"  3. Commit: git commit -m 'Update flow data from Excel'")
    print(f"  4. Push: git push origin main")
    print(f"  5. Site will auto-deploy via GitHub Actions")

if __name__ == '__main__':
    main()
