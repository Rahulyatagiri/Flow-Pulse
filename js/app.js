// FlowPulse - Main Application JavaScript
// Handles UI rendering, charts, and interactivity

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderStockLists();
    renderFlowTable();
    initCharts();
    initFilters();
    initSmoothScroll();
    animateOnScroll();
}

// ============================================
// Stock List Rendering
// ============================================

function renderStockLists() {
    renderBullishList();
    renderRiskRewardList();
    renderPremiumList();
}

function renderBullishList() {
    const container = document.getElementById('bullishList');
    if (!container) return;

    const stocks = flowData.bullishStocks.slice(0, 5);
    container.innerHTML = stocks.map((stock, index) => createStockItem(stock, index, 'bullish')).join('');
}

function renderRiskRewardList() {
    const container = document.getElementById('riskRewardList');
    if (!container) return;

    const stocks = flowData.riskRewardStocks.slice(0, 5);
    container.innerHTML = stocks.map((stock, index) => createStockItem(stock, index, 'riskReward')).join('');
}

function renderPremiumList() {
    const container = document.getElementById('premiumList');
    if (!container) return;

    const stocks = flowData.premiumStocks.slice(0, 5);
    container.innerHTML = stocks.map((stock, index) => createStockItem(stock, index, 'premium')).join('');
}

function createStockItem(stock, index, type) {
    const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-default';
    
    let metricHtml = '';
    let sentimentHtml = '';
    
    if (type === 'bullish') {
        metricHtml = `<div class="stock-premium">${formatCurrency(stock.callPremium)} calls</div>`;
        const sentimentPercent = Math.round(stock.sentiment * 100);
        sentimentHtml = `
            <div class="stock-sentiment">
                ${sentimentPercent}% bullish
                <div class="sentiment-bar">
                    <div class="sentiment-fill sentiment-bullish" style="width: ${sentimentPercent}%"></div>
                </div>
            </div>
        `;
    } else if (type === 'riskReward') {
        metricHtml = `<div class="stock-premium">${formatCurrency(stock.totalPremium)}</div>`;
        sentimentHtml = `<div class="stock-sentiment">IV: ${(stock.iv * 100).toFixed(1)}%</div>`;
    } else if (type === 'premium') {
        metricHtml = `<div class="stock-premium">${formatCurrency(stock.totalPremium)} total</div>`;
        const sentimentPercent = Math.abs(Math.round(stock.sentiment * 100));
        const isBullish = stock.sentiment > 0;
        sentimentHtml = `
            <div class="stock-sentiment">
                ${isBullish ? '' : '-'}${sentimentPercent}% ${isBullish ? 'bullish' : '(puts)'}
                <div class="sentiment-bar">
                    <div class="sentiment-fill ${isBullish ? 'sentiment-bullish' : 'sentiment-bearish'}" style="width: ${sentimentPercent}%"></div>
                </div>
            </div>
        `;
    }

    return `
        <div class="stock-item" onclick="showStockDetails('${stock.symbol}')">
            <div class="stock-rank ${rankClass}">${index + 1}</div>
            <div class="stock-info">
                <div class="stock-symbol">${stock.symbol}</div>
                <div class="stock-price">$${stock.price.toFixed(2)}</div>
            </div>
            <div class="stock-metrics">
                ${metricHtml}
                ${sentimentHtml}
            </div>
        </div>
    `;
}

// ============================================
// Flow Table Rendering
// ============================================

function renderFlowTable(filter = 'all') {
    const tbody = document.getElementById('flowTableBody');
    if (!tbody) return;

    let data = flowData.detailedFlow;
    
    if (filter === 'calls') {
        data = data.filter(item => item.type === 'Call');
    } else if (filter === 'puts') {
        data = data.filter(item => item.type === 'Put');
    } else if (filter === 'unusual') {
        data = data.filter(item => item.premium > 500000);
    }

    tbody.innerHTML = data.map(item => `
        <tr>
            <td><span class="mono">${item.symbol}</span></td>
            <td><span class="${item.type === 'Call' ? 'type-call' : 'type-put'}">${item.type}</span></td>
            <td class="mono">$${item.strike}</td>
            <td>${item.exp}</td>
            <td class="mono gold">${formatCurrency(item.premium)}</td>
            <td class="mono">${item.volume.toLocaleString()}</td>
            <td class="mono">${(item.iv * 100).toFixed(1)}%</td>
            <td>
                <div class="sentiment-bar" style="width: 60px;">
                    <div class="sentiment-fill ${item.delta > 0 ? 'sentiment-bullish' : 'sentiment-bearish'}" 
                         style="width: ${Math.abs(item.delta) * 100}%"></div>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================
// Charts
// ============================================

function initCharts() {
    initPremiumChart();
    initSentimentChart();
}

function initPremiumChart() {
    const ctx = document.getElementById('premiumChart');
    if (!ctx) return;

    const stocks = flowData.bullishStocks.slice(0, 10);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stocks.map(s => s.symbol),
            datasets: [{
                label: 'Call Premium ($K)',
                data: stocks.map(s => Math.round(s.callPremium / 1000)),
                backgroundColor: chartColors.green,
                borderColor: chartColors.green,
                borderWidth: 0,
                borderRadius: 6
            }, {
                label: 'Put Premium ($K)',
                data: stocks.map(s => Math.round(s.putPremium / 1000)),
                backgroundColor: chartColors.red,
                borderColor: chartColors.red,
                borderWidth: 0,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#94a3b8',
                        font: { family: 'Space Grotesk', size: 12 },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#1a1d28',
                    titleColor: '#f1f5f9',
                    bodyColor: '#94a3b8',
                    borderColor: '#1e293b',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}K`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'JetBrains Mono', size: 11 }
                    },
                    grid: {
                        color: 'rgba(30, 41, 59, 0.5)',
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'JetBrains Mono', size: 11 },
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(30, 41, 59, 0.5)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function initSentimentChart() {
    const ctx = document.getElementById('sentimentChart');
    if (!ctx) return;

    const { bullishSignals, bearishSignals, neutralSignals } = flowData.summary;
    const total = bullishSignals + bearishSignals + neutralSignals;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Bullish', 'Neutral', 'Bearish'],
            datasets: [{
                data: [
                    Math.round(bullishSignals / total * 100),
                    Math.round(neutralSignals / total * 100),
                    Math.round(bearishSignals / total * 100)
                ],
                backgroundColor: [
                    chartColors.green,
                    chartColors.blue,
                    chartColors.red
                ],
                borderColor: '#12141c',
                borderWidth: 4,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8',
                        font: { family: 'Space Grotesk', size: 12 },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1a1d28',
                    titleColor: '#f1f5f9',
                    bodyColor: '#94a3b8',
                    borderColor: '#1e293b',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// ============================================
// Filters
// ============================================

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply filter
            const filter = btn.dataset.filter;
            renderFlowTable(filter);
        });
    });
}

// ============================================
// Smooth Scroll
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .chart-card, .insight-card, .pick-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Utility Functions
// ============================================

function formatCurrency(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(0) + 'K';
    }
    return '$' + value.toLocaleString();
}

function formatPercent(value) {
    return (value * 100).toFixed(1) + '%';
}

function showStockDetails(symbol) {
    // Could open a modal or navigate to detail page
    console.log('Show details for:', symbol);
    // For now, just highlight the selected stock
    alert(`${symbol} - Click to view detailed options chain and analysis`);
}

// ============================================
// Navigation Active State on Scroll
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Live Data Simulation (Optional)
// ============================================

function simulateLiveUpdates() {
    setInterval(() => {
        // Simulate small price changes
        flowData.bullishStocks.forEach(stock => {
            const change = (Math.random() - 0.5) * 0.5;
            stock.price = Math.max(0, stock.price + change);
        });
        
        // Re-render lists
        renderStockLists();
    }, 30000); // Update every 30 seconds
}

// Uncomment to enable live simulation
// simulateLiveUpdates();
