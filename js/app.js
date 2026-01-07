// InsiderPulse - Main Application JavaScript
// Handles UI rendering, filtering, sorting, search, and interactivity

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Global state
let currentTransactions = [...insiderData.recentTransactions];
let sortColumn = 'date';
let sortDirection = 'desc';

function initApp() {
    updateHeroStats();
    renderDashboardCards();
    renderTransactionsTable();
    renderClusterSection();
    initCharts();
    initSearch();
    initFilters();
    initSorting();
    initExport();
    initSmoothScroll();
    animateOnScroll();
}

// ============================================
// Hero Stats Update
// ============================================

function updateHeroStats() {
    const { summary } = insiderData;

    document.getElementById('totalValue').textContent = formatCurrency(summary.totalValue);
    document.getElementById('buyTransactions').textContent = summary.buyTransactions;
    document.getElementById('buySellRatio').textContent = summary.buySellRatio.toFixed(2);
    document.getElementById('clusterBuys').textContent = summary.clusterBuyCount;
}

// ============================================
// Dashboard Cards Rendering
// ============================================

function renderDashboardCards() {
    renderClusterList();
    renderPurchasesList();
    renderActivityList();
}

function renderClusterList() {
    const container = document.getElementById('clusterList');
    if (!container) return;

    const clusters = insiderData.clusterBuys;

    if (clusters.length === 0) {
        container.innerHTML = '<div class="empty-state">No cluster buys detected</div>';
        return;
    }

    container.innerHTML = clusters.map(cluster => `
        <div class="cluster-item">
            <div class="stock-info">
                <div class="stock-symbol">${cluster.ticker}</div>
                <div class="stock-company">${cluster.insiderCount} insiders</div>
            </div>
            <div class="stock-metrics">
                <div class="stock-value">${formatCurrency(cluster.totalValue)}</div>
                <div class="stock-count">${cluster.totalShares.toLocaleString()} shares</div>
            </div>
        </div>
    `).join('');
}

function renderPurchasesList() {
    const container = document.getElementById('purchasesList');
    if (!container) return;

    const purchases = insiderData.significantPurchases.slice(0, 5);

    container.innerHTML = purchases.map((item, index) => {
        const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-default';
        return `
            <div class="stock-item">
                <div class="stock-rank ${rankClass}">${index + 1}</div>
                <div class="stock-info">
                    <div class="stock-symbol">${item.ticker}</div>
                    <div class="stock-company">${item.company}</div>
                </div>
                <div class="stock-metrics">
                    <div class="stock-value">${formatCurrency(item.totalValue)}</div>
                    <div class="stock-count">${item.transactionCount} transaction${item.transactionCount > 1 ? 's' : ''}</div>
                </div>
            </div>
        `;
    }).join('');
}

function renderActivityList() {
    const container = document.getElementById('activityList');
    if (!container) return;

    const activity = insiderData.topBuyers.slice(0, 5);

    container.innerHTML = activity.map((item, index) => {
        const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-default';
        const typeColor = item.type === 'P' ? 'green' : 'red';
        return `
            <div class="stock-item">
                <div class="stock-rank ${rankClass}">${index + 1}</div>
                <div class="stock-info">
                    <div class="stock-symbol">${item.ticker}</div>
                    <div class="stock-company">${item.insider}</div>
                </div>
                <div class="stock-metrics">
                    <div class="stock-value ${typeColor}">${formatCurrency(item.value)}</div>
                    <div class="stock-count">${item.type === 'P' ? 'Purchase' : 'Sale'}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Transactions Table
// ============================================

function renderTransactionsTable(transactions = currentTransactions) {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;

    if (transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 40px; color: var(--text-muted);">No transactions found</td></tr>';
        document.getElementById('transactionCount').textContent = '0 transactions';
        return;
    }

    tbody.innerHTML = transactions.map(tx => {
        const typeInfo = transactionTypes[tx.transactionType] || { label: 'Unknown', color: 'gray', icon: '📊' };
        const typeClass = tx.transactionType === 'P' ? 'type-purchase' : tx.transactionType === 'S' ? 'type-sale' : 'type-option';
        const ownershipClass = tx.ownershipChange >= 0 ? 'ownership-positive' : 'ownership-negative';
        const clusterClass = tx.isCluster ? 'cluster-row' : '';

        return `
            <tr class="${clusterClass}">
                <td class="mono">${formatDate(tx.date)}</td>
                <td class="mono">${tx.ticker}</td>
                <td>${tx.company}</td>
                <td>${tx.insider}</td>
                <td style="font-size: 0.8rem; color: var(--text-muted);">${tx.title}</td>
                <td>
                    <span class="transaction-type ${typeClass}">
                        ${typeInfo.icon} ${typeInfo.label}
                    </span>
                </td>
                <td class="mono">${tx.shares.toLocaleString()}</td>
                <td class="mono">$${tx.pricePerShare.toFixed(2)}</td>
                <td class="mono gold">${formatCurrency(tx.value)}</td>
                <td class="ownership-change ${ownershipClass}">
                    ${tx.ownershipChange >= 0 ? '+' : ''}${tx.ownershipChange.toFixed(2)}%
                </td>
            </tr>
        `;
    }).join('');

    document.getElementById('transactionCount').textContent = `${transactions.length} transaction${transactions.length !== 1 ? 's' : ''}`;
}

// ============================================
// Cluster Section
// ============================================

function renderClusterSection() {
    const container = document.getElementById('clusterGrid');
    if (!container) return;

    const clusters = insiderData.clusterBuys;

    if (clusters.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 16px;">🎯</div>
                <h3>No Cluster Buys Detected</h3>
                <p>When multiple insiders buy the same stock within 7 days, they'll appear here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = clusters.map(cluster => `
        <div class="cluster-card">
            <div class="cluster-header">
                <div class="cluster-ticker">${cluster.ticker}</div>
                <div class="cluster-badge">${cluster.insiderCount} Insiders</div>
            </div>
            <div class="cluster-company">${cluster.company}</div>
            <div class="cluster-stats">
                <div class="cluster-stat">
                    <div class="cluster-stat-label">Total Value</div>
                    <div class="cluster-stat-value">${formatCurrency(cluster.totalValue)}</div>
                </div>
                <div class="cluster-stat">
                    <div class="cluster-stat-label">Total Shares</div>
                    <div class="cluster-stat-value">${cluster.totalShares.toLocaleString()}</div>
                </div>
                <div class="cluster-stat">
                    <div class="cluster-stat-label">Avg Price</div>
                    <div class="cluster-stat-value">$${cluster.avgPrice.toFixed(2)}</div>
                </div>
                <div class="cluster-stat">
                    <div class="cluster-stat-label">Date</div>
                    <div class="cluster-stat-value" style="font-size: 0.9rem;">${formatDate(cluster.dateRange)}</div>
                </div>
            </div>
            <div class="cluster-insiders">
                <div class="cluster-insiders-label">INSIDERS</div>
                <div class="cluster-insiders-list">${cluster.insiders.join(', ')}</div>
            </div>
        </div>
    `).join('');
}

// ============================================
// Charts
// ============================================

function initCharts() {
    initBuySellChart();
    initSectorChart();
}

function initBuySellChart() {
    const ctx = document.getElementById('buySellChart');
    if (!ctx) return;

    const { summary } = insiderData;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Buys', 'Sells'],
            datasets: [{
                label: 'Transaction Value ($M)',
                data: [
                    (summary.buyValue / 1000000).toFixed(1),
                    (summary.sellValue / 1000000).toFixed(1)
                ],
                backgroundColor: [chartColors.green, chartColors.red],
                borderRadius: 8
            }, {
                label: 'Transaction Count',
                data: [summary.buyTransactions, summary.sellTransactions],
                backgroundColor: [chartColors.greenDim, chartColors.redDim],
                borderRadius: 8
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
                    padding: 12
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Space Grotesk', size: 12 }
                    },
                    grid: {
                        color: 'rgba(30, 41, 59, 0.5)',
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'JetBrains Mono', size: 11 }
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

function initSectorChart() {
    const ctx = document.getElementById('sectorChart');
    if (!ctx) return;

    const { sectors } = insiderData;
    const sectorNames = Object.keys(sectors);
    const sentiments = sectorNames.map(name => Math.round(sectors[name].netSentiment * 100));

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sectorNames.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
            datasets: [{
                data: sentiments,
                backgroundColor: [
                    chartColors.green,
                    chartColors.blue,
                    chartColors.gold,
                    chartColors.purple,
                    chartColors.cyan
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
                        font: { family: 'Space Grotesk', size: 11 },
                        padding: 12,
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
                            return `${context.label}: ${context.raw}% Bullish`;
                        }
                    }
                }
            }
        }
    });
}

// ============================================
// Search Functionality
// ============================================

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length > 0) {
            clearBtn.style.display = 'flex';
            filterTransactions();
        } else {
            clearBtn.style.display = 'none';
            filterTransactions();
        }
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        filterTransactions();
    });
}

// ============================================
// Filters
// ============================================

function initFilters() {
    const typeFilter = document.getElementById('transactionTypeFilter');
    const valueFilter = document.getElementById('valueFilter');
    const dateFilter = document.getElementById('dateFilter');

    [typeFilter, valueFilter, dateFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => filterTransactions());
        }
    });
}

function filterTransactions() {
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('transactionTypeFilter')?.value || 'all';
    const valueFilter = parseInt(document.getElementById('valueFilter')?.value) || 0;
    const dateFilter = parseInt(document.getElementById('dateFilter')?.value) || 7;

    let filtered = [...insiderData.recentTransactions];

    // Search filter
    if (searchQuery) {
        filtered = filtered.filter(tx =>
            tx.company.toLowerCase().includes(searchQuery) ||
            tx.ticker.toLowerCase().includes(searchQuery) ||
            tx.insider.toLowerCase().includes(searchQuery)
        );
    }

    // Transaction type filter
    if (typeFilter !== 'all') {
        filtered = filtered.filter(tx => tx.transactionType === typeFilter);
    }

    // Value filter
    if (valueFilter > 0) {
        filtered = filtered.filter(tx => tx.value >= valueFilter);
    }

    // Date filter (simplified - in real app would use actual date comparison)
    // For demo, we're just limiting the number of results
    const today = new Date();
    filtered = filtered.filter(tx => {
        const txDate = new Date(tx.date);
        const diffDays = Math.floor((today - txDate) / (1000 * 60 * 60 * 24));
        return diffDays <= dateFilter;
    });

    currentTransactions = filtered;
    sortTransactions();
}

// ============================================
// Sorting
// ============================================

function initSorting() {
    const headers = document.querySelectorAll('.insider-table th.sortable');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.sort;

            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'desc';
            }

            // Update header indicators
            headers.forEach(h => {
                h.textContent = h.textContent.replace(' ↑', '').replace(' ↓', '');
            });
            header.textContent += sortDirection === 'asc' ? ' ↑' : ' ↓';

            sortTransactions();
        });
    });
}

function sortTransactions() {
    currentTransactions.sort((a, b) => {
        let aVal, bVal;

        switch (sortColumn) {
            case 'date':
                aVal = new Date(a.date);
                bVal = new Date(b.date);
                break;
            case 'ticker':
            case 'company':
            case 'insider':
                aVal = a[sortColumn].toLowerCase();
                bVal = b[sortColumn].toLowerCase();
                break;
            case 'type':
                aVal = a.transactionType;
                bVal = b.transactionType;
                break;
            case 'shares':
            case 'price':
            case 'value':
            case 'ownership':
                const field = sortColumn === 'price' ? 'pricePerShare' :
                             sortColumn === 'ownership' ? 'ownershipChange' : sortColumn;
                aVal = a[field];
                bVal = b[field];
                break;
            default:
                return 0;
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    renderTransactionsTable(currentTransactions);
}

// ============================================
// Export Functionality
// ============================================

function initExport() {
    const exportBtn = document.getElementById('exportBtn');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', () => {
        exportToCSV(currentTransactions);
    });
}

function exportToCSV(transactions) {
    const headers = ['Date', 'Ticker', 'Company', 'Insider', 'Title', 'Type', 'Shares', 'Price', 'Value', 'Ownership Change'];

    const rows = transactions.map(tx => [
        tx.date,
        tx.ticker,
        tx.company,
        tx.insider,
        tx.title,
        transactionTypes[tx.transactionType]?.label || tx.transactionType,
        tx.shares,
        tx.pricePerShare.toFixed(2),
        tx.value,
        tx.ownershipChange.toFixed(2) + '%'
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `insider-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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

    document.querySelectorAll('.card, .chart-card, .insight-card, .cluster-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
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
// Utility Functions
// ============================================

function formatCurrency(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(0) + 'K';
    }
    return '$' + value.toLocaleString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
}

function formatPercent(value) {
    return (value * 100).toFixed(1) + '%';
}
