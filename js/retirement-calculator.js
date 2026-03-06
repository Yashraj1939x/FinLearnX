// Retirement Planning Calculator
function calculateRetirement() {
    // Get input values
    const currentAge = parseInt(document.getElementById('current-age').value);
    const retirementAge = parseInt(document.getElementById('retirement-age').value);
    const monthlyIncome = parseFloat(document.getElementById('monthly-income').value);
    const desiredMonthlyIncome = parseFloat(document.getElementById('desired-monthly').value);
    const currentSavings = parseFloat(document.getElementById('current-savings').value);
    const expectedReturn = parseFloat(document.getElementById('expected-return').value) / 100;
    
    // Validate inputs
    if (currentAge >= retirementAge) {
        showMessage('Retirement age must be greater than current age', 'error');
        return;
    }
    
    // Calculate years until retirement
    const yearsUntilRetirement = retirementAge - currentAge;
    
    // Calculate total retirement fund needed (assuming 4% withdrawal rule)
    const totalFundNeeded = (desiredMonthlyIncome * 12) / 0.04;
    
    // Calculate future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + expectedReturn, yearsUntilRetirement);
    
    // Calculate additional amount needed
    const additionalAmountNeeded = Math.max(0, totalFundNeeded - futureValueOfCurrentSavings);
    
    // Calculate monthly savings required (future value of annuity formula)
    let monthlySavingsRequired = 0;
    if (additionalAmountNeeded > 0) {
        const monthlyReturn = expectedReturn / 12;
        const months = yearsUntilRetirement * 12;
        monthlySavingsRequired = additionalAmountNeeded * monthlyReturn / (Math.pow(1 + monthlyReturn, months) - 1);
    }
    
    // Calculate projected fund at retirement
    const futureValueOfMonthlySavings = monthlySavingsRequired * ((Math.pow(1 + expectedReturn/12, yearsUntilRetirement * 12) - 1) / (expectedReturn/12));
    const projectedFund = futureValueOfCurrentSavings + futureValueOfMonthlySavings;
    
    // Calculate annual retirement income from projected fund
    const annualRetirementIncome = projectedFund * 0.04;
    
    // Update display
    updateRetirementResults(
        yearsUntilRetirement,
        totalFundNeeded,
        monthlySavingsRequired,
        projectedFund,
        annualRetirementIncome
    );
    
    // Add animation to results
    animateResults();
}

function updateRetirementResults(years, totalNeeded, monthlySavings, projectedFund, annualIncome) {
    document.getElementById('years-until').textContent = `${years} years`;
    document.getElementById('total-needed').textContent = formatCurrency(totalNeeded);
    document.getElementById('monthly-savings').textContent = formatCurrency(monthlySavings);
    document.getElementById('projected-fund').textContent = formatCurrency(projectedFund);
    document.getElementById('annual-income').textContent = formatCurrency(annualIncome);
    
    // Add color coding based on results
    const monthlySavingsElement = document.getElementById('monthly-savings');
    const projectedElement = document.getElementById('projected-fund');
    
    // Reset classes
    monthlySavingsElement.className = 'result-value';
    projectedElement.className = 'result-value';
    
    // Color code monthly savings
    if (monthlySavings > 1000) {
        monthlySavingsElement.className = 'result-value highlight';
    } else if (monthlySavings > 0) {
        monthlySavingsElement.className = 'result-value important';
    }
    
    // Color code projected fund
    if (projectedFund > 1000000) {
        projectedElement.className = 'result-value highlight';
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function animateResults() {
    const resultsCard = document.querySelector('.results-card');
    resultsCard.style.transform = 'scale(0.95)';
    resultsCard.style.opacity = '0.7';
    
    setTimeout(() => {
        resultsCard.style.transform = 'scale(1)';
        resultsCard.style.opacity = '1';
    }, 200);
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

// Auto-calculate on input change
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all inputs
    const inputs = ['current-age', 'retirement-age', 'monthly-income', 'desired-monthly', 'current-savings', 'expected-return'];
    
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', calculateRetirement);
            element.addEventListener('change', calculateRetirement);
        }
    });
    
    // Initial calculation
    calculateRetirement();
});

// Add CSS animations if not already present
if (!document.querySelector('style[data-retirement-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-retirement-animations', 'true');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .results-card {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}
