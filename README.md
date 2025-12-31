# FlowPulse - Options Flow Intelligence

![FlowPulse Banner](https://img.shields.io/badge/FlowPulse-Options%20Flow%20Analysis-00ff88?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?style=flat-square&logo=github)

> Real-time options flow analysis and stock market insights to identify high-probability trading opportunities.

## 🚀 Live Demo

**[View Live Site →](https://yourusername.github.io/flowpulse)**

## 📊 Features

- **Live Dashboard** - Real-time options flow visualization
- **Bullish/Bearish Signals** - Automated sentiment analysis based on premium flow
- **Risk/Reward Analysis** - Identify best opportunities with low IV and high conviction
- **Interactive Charts** - Premium distribution and market sentiment breakdown
- **Detailed Flow Table** - Filterable view of all options activity
- **Top Picks** - Curated list of stocks with strongest fundamentals

## 📈 Data Insights

The platform analyzes:
- **Call/Put Premium** - Total dollar flow into calls vs puts
- **Sentiment Score** - Bullish/bearish bias based on flow direction
- **Implied Volatility** - Risk/reward assessment
- **Volume & Open Interest** - Institutional activity signals
- **Delta Analysis** - Probability-weighted positioning

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js
- **Fonts**: Space Grotesk, JetBrains Mono
- **Hosting**: GitHub Pages

## 📁 Project Structure

```
flowpulse/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── data.js         # Options flow data
│   └── app.js          # Application logic
├── data/
│   ├── README.md       # Excel upload instructions
│   ├── excel_to_data.py # Excel to JS converter
│   └── requirements.txt # Python dependencies
├── .github/
│   └── workflows/
│       └── deploy.yml  # Auto-deployment workflow
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork this repository**
   
2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Click Save

3. **Access your site**
   - Your site will be live at `https://yourusername.github.io/flowpulse`

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/flowpulse.git

# Navigate to directory
cd flowpulse

# Open in browser (or use a local server)
open index.html

# Or use Python's built-in server
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📊 Updating Data

### Option 1: Upload Excel File (Recommended) 📁

The easiest way to update your flow data is via Excel:

1. **Place your Excel file** in the `data/` folder:
   ```bash
   cp ~/Downloads/flow_data.xlsx data/flow_data.xlsx
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r data/requirements.txt
   ```

3. **Convert Excel to JavaScript**:
   ```bash
   python data/excel_to_data.py data/flow_data.xlsx
   ```

4. **Commit and push**:
   ```bash
   git add js/data.js
   git commit -m "Update flow data"
   git push origin main
   ```

5. **Auto-deploy**: GitHub Actions will automatically update your live site! ✨

📋 **See [data/README.md](data/README.md) for Excel file format and complete instructions.**

### Option 2: Edit JavaScript Directly

For manual updates, edit `js/data.js`:

```javascript
// Example: Update bullish stocks
const flowData = {
    bullishStocks: [
        { symbol: 'TSLA', price: 455.15, callPremium: 4097200, ... },
        // Add more stocks
    ],
    // ...
};
```

## 🎨 Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --accent-green: #00ff88;
    --accent-red: #ff4757;
    --accent-blue: #3b82f6;
    /* ... */
}
```

### Adding New Sections

1. Add HTML section in `index.html`
2. Add corresponding styles in `css/style.css`
3. Add any JavaScript logic in `js/app.js`

## 📱 Responsive Design

The site is fully responsive and works on:
- Desktop (1400px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## ⚠️ Disclaimer

This project is for **informational and educational purposes only**. 

- Not financial advice
- Options trading involves significant risk of loss
- Past performance does not guarantee future results
- Always do your own research before trading

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Created by Marcus Aurelius - Feel free to reach out!

---

**⭐ Star this repo if you find it useful!**
