// Stock Market Simulator
let portfolio = {
    cash: 10000,
    holdings: {},
    totalValue: 10000
};

// Stock prices with realistic values
let stockPrices = {
    AAPL: 150.25,
    GOOGL: 125.80,
    MSFT: 320.45,
    AMZN: 145.60,
    TSLA: 250.30,
    META: 310.90
};

let currentTradeType = 'buy';

// Initialize simulator
document.addEventListener('DOMContentLoaded', function() {
    updatePortfolioDisplay();
    updateStockPrice();
    
    // Event listeners
    document.getElementById('stock-select').addEventListener('change', updateStockPrice);
    document.getElementById('quantity').addEventListener('input', updateTotalCost);
    
    // Simulate price fluctuations
    setInterval(simulatePriceChange, 5000);
});

function setTradeType(type) {
    currentTradeType = type;
    
    // Update button states
    document.querySelectorAll('.trade-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (type === 'buy') {
        document.querySelector('.buy-btn').classList.add('active');
    } else {
        document.querySelector('.sell-btn').classList.add('active');
    }
    
    updateTotalCost();
}

function updateStockPrice() {
    const stockSelect = document.getElementById('stock-select');
    const selectedStock = stockSelect.value;
    const price = stockPrices[selectedStock];
    
    document.getElementById('stock-price').textContent = `$${price.toFixed(2)}`;
    updateTotalCost();
}

function updateTotalCost() {
    const stockSelect = document.getElementById('stock-select');
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const selectedStock = stockSelect.value;
    const price = stockPrices[selectedStock];
    const totalCost = price * quantity;
    
    const totalCostElement = document.getElementById('total-cost');
    if (currentTradeType === 'buy') {
        totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
        totalCostElement.style.color = '#fbbf24';
    } else {
        totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
        totalCostElement.style.color = '#60a5fa';
    }
}

function executeTrade() {
    const stockSelect = document.getElementById('stock-select');
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const selectedStock = stockSelect.value;
    const price = stockPrices[selectedStock];
    const totalCost = price * quantity;
    
    if (quantity <= 0) {
        showMessage('Please enter a valid quantity', 'error');
        return;
    }
    
    if (currentTradeType === 'buy') {
        if (totalCost > portfolio.cash) {
            showMessage('Insufficient funds!', 'error');
            return;
        }
        
        // Execute buy
        portfolio.cash -= totalCost;
        if (!portfolio.holdings[selectedStock]) {
            portfolio.holdings[selectedStock] = { quantity: 0, avgPrice: 0 };
        }
        
        const holding = portfolio.holdings[selectedStock];
        const totalQuantity = holding.quantity + quantity;
        const totalCostBasis = (holding.quantity * holding.avgPrice) + totalCost;
        holding.avgPrice = totalCostBasis / totalQuantity;
        holding.quantity = totalQuantity;
        
        showMessage(`Successfully bought ${quantity} shares of ${selectedStock}!`, 'success');
        
    } else {
        // Execute sell
        if (!portfolio.holdings[selectedStock] || portfolio.holdings[selectedStock].quantity < quantity) {
            showMessage('Insufficient shares to sell!', 'error');
            return;
        }
        
        portfolio.cash += totalCost;
        portfolio.holdings[selectedStock].quantity -= quantity;
        
        if (portfolio.holdings[selectedStock].quantity === 0) {
            delete portfolio.holdings[selectedStock];
        }
        
        showMessage(`Successfully sold ${quantity} shares of ${selectedStock}!`, 'success');
    }
    
    updatePortfolioDisplay();
    updateHoldingsList();
    
    // Reset quantity input
    document.getElementById('quantity').value = 10;
    updateTotalCost();
}

function updatePortfolioDisplay() {
    // Calculate total portfolio value
    let holdingsValue = 0;
    for (const stock in portfolio.holdings) {
        holdingsValue += portfolio.holdings[stock].quantity * stockPrices[stock];
    }
    
    portfolio.totalValue = portfolio.cash + holdingsValue;
    const totalPL = portfolio.totalValue - 10000; // Initial investment was 10000
    
    document.getElementById('available-cash').textContent = `$${portfolio.cash.toFixed(2)}`;
    document.getElementById('portfolio-value').textContent = `$${portfolio.totalValue.toFixed(2)}`;
    
    const plElement = document.getElementById('total-pl');
    plElement.textContent = `${totalPL >= 0 ? '+' : ''}$${totalPL.toFixed(2)}`;
    plElement.className = totalPL >= 0 ? 'stat-value profit' : 'stat-value loss';
}

function updateHoldingsList() {
    const holdingsList = document.getElementById('holdings-list');
    
    if (Object.keys(portfolio.holdings).length === 0) {
        holdingsList.innerHTML = '<div class="empty-holdings">No stocks purchased yet</div>';
        return;
    }
    
    let holdingsHTML = '';
    for (const stock in portfolio.holdings) {
        const holding = portfolio.holdings[stock];
        const currentPrice = stockPrices[stock];
        const totalValue = holding.quantity * currentPrice;
        const pl = (currentPrice - holding.avgPrice) * holding.quantity;
        const plPercent = ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
        
        holdingsHTML += `
            <div class="holding-item">
                <div class="holding-info">
                    <div class="holding-symbol">${stock}</div>
                    <div class="holding-quantity">${holding.quantity} shares @ $${holding.avgPrice.toFixed(2)}</div>
                </div>
                <div class="holding-value">
                    <div class="holding-current-price">$${currentPrice.toFixed(2)}</div>
                    <div class="holding-total-value ${pl >= 0 ? 'profit' : 'loss'}">
                        $${totalValue.toFixed(2)} (${pl >= 0 ? '+' : ''}${plPercent.toFixed(2)}%)
                    </div>
                </div>
            </div>
        `;
    }
    
    holdingsList.innerHTML = holdingsHTML;
}

function simulatePriceChange() {
    // Random price fluctuation between -2% and +2%
    for (const stock in stockPrices) {
        const change = (Math.random() - 0.5) * 0.04; // ±2%
        stockPrices[stock] *= (1 + change);
        stockPrices[stock] = Math.max(stockPrices[stock], 1); // Minimum price of $1
    }
    
    updateStockPrice();
    updatePortfolioDisplay();
    updateHoldingsList();
}

function showMessage(message, type) {
    // Create a temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
