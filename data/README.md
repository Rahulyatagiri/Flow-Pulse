# 📊 FlowPulse Data Upload Guide

Upload your options flow data via Excel files and automatically update your site!

## 📁 Upload Location

**Place your Excel files here:** `/data/`

Example: `/data/flow_data.xlsx`

---

## 📋 Excel File Format

Your Excel file must contain **6 sheets** with the following structure:

### 1️⃣ Sheet: `BullishStocks`
Stocks with heavy call premium

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| symbol | Text | Stock ticker | TSLA |
| price | Number | Current price | 455.15 |
| callPremium | Number | Total call premium ($) | 4097200 |
| putPremium | Number | Total put premium ($) | 600200 |
| sentiment | Number | -1 to 1 (bearish to bullish) | 0.74 |
| iv | Number | Implied volatility (0-1) | 0.485 |
| trades | Number | Number of trades | 23 |

### 2️⃣ Sheet: `RiskReward`
Best risk/reward opportunities (bullish + low IV)

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| symbol | Text | Stock ticker | MCD |
| price | Number | Current price | 305.98 |
| totalPremium | Number | Total premium ($) | 640500 |
| sentiment | Number | -1 to 1 | 1.00 |
| iv | Number | Implied volatility | 0.155 |
| score | Number | Risk/reward score | 0.591 |

### 3️⃣ Sheet: `PremiumStocks`
Stocks with highest total premium

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| symbol | Text | Stock ticker | PLTR |
| price | Number | Current price | 179.64 |
| totalPremium | Number | Total premium ($) | 11536800 |
| sentiment | Number | -1 to 1 | -0.95 |
| iv | Number | Implied volatility | 0.412 |
| trades | Number | Number of trades | 18 |

### 4️⃣ Sheet: `DetailedFlow`
Individual options trades

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| symbol | Text | Stock ticker | TSLA |
| type | Text | Call or Put | Call |
| strike | Number | Strike price | 440 |
| exp | Text | Expiration date | Jan 2 |
| premium | Number | Premium ($) | 773700 |
| volume | Number | Contract volume | 486 |
| iv | Number | Implied volatility | 0.457 |
| delta | Number | Option delta | 0.85 |

### 5️⃣ Sheet: `Summary`
Overall market statistics (single row)

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| totalPremium | Number | Total market premium | 32400000 |
| bullishSignals | Number | Count of bullish signals | 15 |
| bearishSignals | Number | Count of bearish signals | 8 |
| neutralSignals | Number | Count of neutral signals | 12 |
| callPutRatio | Number | Call/Put ratio | 1.42 |
| uniqueTickers | Number | Number of unique tickers | 127 |
| avgIV | Number | Average IV | 0.52 |

### 6️⃣ Sheet: `Sectors`
Sector breakdown

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| sector | Text | Sector name | tech |
| premium | Number | Sector premium ($) | 12500000 |
| sentiment | Number | -1 to 1 | 0.65 |

---

## 🚀 How to Update Data

### **Method 1: Manual Conversion** (Recommended)

1. **Upload your Excel file** to `/data/` folder:
   ```bash
   # Example: data/flow_data.xlsx
   ```

2. **Run the conversion script**:
   ```bash
   python data/excel_to_data.py data/flow_data.xlsx
   ```

3. **Review the updated data**:
   ```bash
   cat js/data.js
   ```

4. **Commit and push**:
   ```bash
   git add js/data.js
   git commit -m "Update flow data from Excel"
   git push origin main
   ```

5. **Auto-deploy**: GitHub Actions will automatically deploy your updated site! ✨

### **Method 2: Quick Upload** (Coming Soon)
GitHub Action to automatically process Excel files when uploaded.

---

## 📝 Example Workflow

```bash
# 1. Place your Excel file
cp ~/Downloads/my_flow_data.xlsx data/flow_data.xlsx

# 2. Convert to JavaScript
python data/excel_to_data.py data/flow_data.xlsx

# 3. Commit changes
git add js/data.js data/flow_data.xlsx
git commit -m "Update flow data - $(date +%Y-%m-%d)"

# 4. Push to trigger deployment
git push origin main
```

---

## 📦 Requirements

Install required Python packages:

```bash
pip install pandas openpyxl
```

---

## ❓ Troubleshooting

### Error: "Sheet not found"
- Ensure your Excel file has all 6 required sheets with exact names (case-sensitive)

### Error: "Column not found"
- Check that column names match exactly (case-sensitive)
- Verify no extra spaces in column headers

### Data looks incorrect
- Verify data types (numbers vs text)
- Check for empty rows in Excel
- Ensure sentiment values are between -1 and 1
- Ensure IV values are decimals (e.g., 0.485, not 48.5%)

---

## 💡 Tips

- **Keep backups**: Save your Excel files in `/data/` for version history
- **Date your files**: Use naming like `flow_data_2025-01-15.xlsx`
- **Test locally**: Open `index.html` in browser before pushing
- **Validate data**: Check ranges (sentiment: -1 to 1, IV: 0 to 1)

---

## 📧 Need Help?

Create an issue on GitHub if you encounter problems!
