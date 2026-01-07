// FlowPulse - Unusual Options Activity Tracker
// Renders flow feed, clusters, insights, and handles filtering

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Global state
let currentFlowData = [...flowData.unusualTrades];

function initApp() {
    updateHeroStats();
    renderFlowFeed(currentFlowData);
    renderClusters();
    renderTopTickers();
    initFilters();
    initExport();
}

// ============================================
// Hero Stats
// ============================================

function updateHeroStats() {
    const { summary } = flowData;

    document.getElementById('statTrades').textContent = summary.totalTrades;
    document.getElementById('statPremium').textContent = formatCurrency(summary.totalPremium);
    document.getElementById('statBullish').textContent = summary.bullishTrades;
    document.getElementById('statBearish').textContent = summary.bearishTrades;
    document.getElementById('statClusters').textContent = summary.clusterCount;
}

// ============================================
// Flow Feed Rendering
// ============================================

function renderFlowFeed(data) {
    const container = document.getElementById('flowFeed');
    const countElement = document.getElementById('flowCount');

    if (!container) return;

    countElement.textContent = data.length;

    if (data.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">No unusual trades found</div>
                <div style="font-size: 14px;">Try adjusting your filters</div>
            </div>
        `;
        return;
    }

    container.innerHTML = data.map(trade => {
        const alertInfo = alertLevels[trade.alertLevel];
        const typeClass = trade.type.toLowerCase();

        return `
            <div class="flow-card">
                <div class="flow-card-left">
                    <div class="flow-symbol">${trade.symbol}</div>
                    <div class="flow-type ${typeClass}">${trade.type}</div>
                    ${trade.cluster ? `<div class="cluster-tag">🎯 CLUSTER (${trade.clusterCount})</div>` : ''}
                </div>

                <div class="flow-card-center">
                    <div class="flow-metric">
                        <div class="metric-label">Strike / Expiry</div>
                        <div class="metric-value">$${trade.strike} · ${formatExpiry(trade.expiry)}</div>
                    </div>
                    <div class="flow-metric">
                        <div class="metric-label">Premium</div>
                        <div class="metric-value large">${formatCurrency(trade.premium)}</div>
                    </div>
                    <div class="flow-metric">
                        <div class="metric-label">Volume / OI</div>
                        <div class="metric-value">${trade.volume.toLocaleString()} / ${trade.openInterest.toLocaleString()}</div>
                    </div>
                    <div class="flow-metric">
                        <div class="metric-label">Vol/OI Ratio</div>
                        <div class="metric-value">${trade.volumeOI.toFixed(2)}</div>
                    </div>
                    <div class="flow-metric">
                        <div class="metric-label">IV · Delta</div>
                        <div class="metric-value">${(trade.iv * 100).toFixed(1)}% · ${trade.delta.toFixed(2)}</div>
                    </div>
                </div>

                <div class="flow-card-right">
                    <div class="alert-badge ${trade.alertLevel}">${alertInfo.icon} ${alertInfo.label}</div>
                    <div class="flow-reason">${trade.reason}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Cluster Cards Rendering
// ============================================

function renderClusters() {
    const container = document.getElementById('clustersGrid');
    if (!container) return;

    const { clusters } = flowData;

    container.innerHTML = clusters.map(cluster => {
        const typeClass = cluster.type.toLowerCase();

        return `
            <div class="cluster-card">
                <div class="cluster-header">
                    <div class="cluster-symbol-group">
                        <div class="cluster-symbol">${cluster.symbol}</div>
                        <div class="flow-type ${typeClass}">${cluster.type}</div>
                    </div>
                    <div class="cluster-count-badge">
                        🎯 ${cluster.tradeCount} Buyers
                    </div>
                </div>

                <div class="cluster-details">
                    <div class="cluster-detail">
                        <div class="cluster-detail-label">Strike / Expiry</div>
                        <div class="cluster-detail-value">$${cluster.strike} · ${formatExpiry(cluster.expiry)}</div>
                    </div>
                    <div class="cluster-detail">
                        <div class="cluster-detail-label">Total Premium</div>
                        <div class="cluster-detail-value">${formatCurrency(cluster.totalPremium)}</div>
                    </div>
                    <div class="cluster-detail">
                        <div class="cluster-detail-label">Total Volume</div>
                        <div class="cluster-detail-value">${cluster.totalVolume.toLocaleString()}</div>
                    </div>
                    <div class="cluster-detail">
                        <div class="cluster-detail-label">IV</div>
                        <div class="cluster-detail-value">${(cluster.iv * 100).toFixed(1)}%</div>
                    </div>
                </div>

                <div class="cluster-reason">${cluster.reason}</div>
            </div>
        `;
    }).join('');
}

// ============================================
// Top Tickers Rendering
// ============================================

function renderTopTickers() {
    const container = document.getElementById('tickersGrid');
    if (!container) return;

    const { topTickers } = flowData;

    container.innerHTML = topTickers.map(ticker => {
        const sentimentClass = ticker.sentiment.toLowerCase();

        return `
            <div class="ticker-card">
                <div class="ticker-symbol">${ticker.symbol}</div>
                <div class="ticker-stats">
                    <div class="ticker-stat">
                        <span class="ticker-stat-label">Trades</span>
                        <span class="ticker-stat-value">${ticker.trades}</span>
                    </div>
                    <div class="ticker-stat">
                        <span class="ticker-stat-label">Premium</span>
                        <span class="ticker-stat-value">${formatCurrency(ticker.premium)}</span>
                    </div>
                    <div class="ticker-stat">
                        <span class="ticker-stat-label">Avg Vol/OI</span>
                        <span class="ticker-stat-value">${ticker.avgVolumeOI.toFixed(2)}</span>
                    </div>
                </div>
                <div class="ticker-sentiment ${sentimentClass}">${ticker.sentiment}</div>
            </div>
        `;
    }).join('');
}

// ============================================
// Filtering
// ============================================

function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const alertFilter = document.getElementById('alertFilter');
    const typeFilter = document.getElementById('typeFilter');
    const premiumFilter = document.getElementById('premiumFilter');

    [searchInput, alertFilter, typeFilter, premiumFilter].forEach(el => {
        if (el) {
            el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', applyFilters);
        }
    });
}

function applyFilters() {
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    const alertLevel = document.getElementById('alertFilter')?.value || 'all';
    const type = document.getElementById('typeFilter')?.value || 'all';
    const minPremium = parseInt(document.getElementById('premiumFilter')?.value) || 0;

    let filtered = [...flowData.unusualTrades];

    // Search filter
    if (searchQuery) {
        filtered = filtered.filter(trade =>
            trade.symbol.toLowerCase().includes(searchQuery)
        );
    }

    // Alert level filter
    if (alertLevel !== 'all') {
        filtered = filtered.filter(trade => trade.alertLevel === alertLevel);
    }

    // Type filter (Call/Put)
    if (type !== 'all') {
        filtered = filtered.filter(trade => trade.type === type);
    }

    // Minimum premium filter
    if (minPremium > 0) {
        filtered = filtered.filter(trade => trade.premium >= minPremium);
    }

    currentFlowData = filtered;
    renderFlowFeed(currentFlowData);
}

// ============================================
// Export
// ============================================

function initExport() {
    const exportBtn = document.getElementById('exportBtn');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', () => {
        const headers = [
            'Symbol',
            'Type',
            'Strike',
            'Expiry',
            'Premium',
            'Volume',
            'Open Interest',
            'Vol/OI Ratio',
            'Price',
            'IV',
            'Delta',
            'Side',
            'Sentiment',
            'Alert Level',
            'Reason'
        ];

        const rows = currentFlowData.map(trade => [
            trade.symbol,
            trade.type,
            trade.strike,
            trade.expiry,
            trade.premium,
            trade.volume,
            trade.openInterest,
            trade.volumeOI.toFixed(2),
            trade.price.toFixed(2),
            (trade.iv * 100).toFixed(1) + '%',
            trade.delta.toFixed(2),
            trade.side,
            trade.sentiment,
            trade.alertLevel,
            trade.reason
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `flowpulse-unusual-activity-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    });
}

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

function formatExpiry(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
}
