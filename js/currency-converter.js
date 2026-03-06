// Exchange rates (relative to USD)
// In a real application, these would be fetched from an API
const exchangeRates = {
    USD: 1.00,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    INR: 82.50,
    AUD: 1.53
};

// Currency symbols
const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    AUD: 'A$'
};

// Format number with commas
function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}

// Convert currency function
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (isNaN(amount) || amount <= 0) {
        showResult('error', 'Please enter a valid amount');
        return;
    }
    
    // Convert from source currency to USD, then to target currency
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];
    
    // Calculate exchange rate
    const exchangeRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    
    // Display results
    displayResult(amount, fromCurrency, convertedAmount, toCurrency, exchangeRate);
}

// Display conversion result
function displayResult(originalAmount, fromCurrency, convertedAmount, toCurrency, exchangeRate) {
    const fromSymbol = currencySymbols[fromCurrency];
    const toSymbol = currencySymbols[toCurrency];
    
    const formattedOriginal = formatNumber(originalAmount);
    const formattedConverted = formatNumber(convertedAmount);
    const formattedExchangeRate = formatNumber(exchangeRate);
    
    document.getElementById('result-amount').textContent = `${toSymbol}${formattedConverted}`;
    document.getElementById('result-info').textContent = `${fromSymbol}${formattedOriginal} ${fromCurrency} = ${toSymbol}${formattedConverted} ${toCurrency}`;
    document.getElementById('exchange-rate').textContent = `Exchange Rate: 1 ${fromCurrency} = ${formattedExchangeRate} ${toCurrency}`;
    
    // Add animation effect
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resultContainer.style.transform = 'scale(1)';
    }, 100);
}

// Swap currencies function
function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    
    // Swap values
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    // Auto-convert after swap
    convertCurrency();
    
    // Add rotation animation to swap button
    const swapButton = document.querySelector('.swap-button');
    swapButton.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        swapButton.style.transform = 'rotate(0deg)';
    }, 300);
}

// Initialize converter on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('amount').addEventListener('input', convertCurrency);
    document.getElementById('from-currency').addEventListener('change', convertCurrency);
    document.getElementById('to-currency').addEventListener('change', convertCurrency);
    
    // Initial conversion
    convertCurrency();
});

// Add keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        convertCurrency();
    }
});
