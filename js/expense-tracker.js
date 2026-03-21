// Expense Tracker
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let currentFilter = 'all';

// Category icons and colors
const categoryInfo = {
    food: { icon: '🍔', color: '#ef4444' },
    transport: { icon: '🚗', color: '#3b82f6' },
    shopping: { icon: '🛍️', color: '#8b5cf6' },
    entertainment: { icon: '🎬', color: '#ec4899' },
    bills: { icon: '📄', color: '#f59e0b' },
    healthcare: { icon: '🏥', color: '#10b981' },
    education: { icon: '📚', color: '#06b6d4' },
    other: { icon: '📦', color: '#6b7280' }
};

// Initialize expense tracker
function initializeExpenseTracker() {
    console.log('Initializing expense tracker...');
    
    // Set today's date as default
    const dateInput = document.getElementById('expense-date');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }
    
    // Load existing expenses
    updateExpenseList();
    updateSummary();
    updateCategoryChart();
    
    // Add enter key support for amount field
    const amountInput = document.getElementById('expense-amount');
    if (amountInput) {
        amountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addExpense();
            }
        });
    }
}

// Try to initialize on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExpenseTracker);
} else {
    // DOM already loaded, initialize immediately
    initializeExpenseTracker();
}

function addExpense() {
    console.log('addExpense function called'); // Debug log
    
    const description = document.getElementById('expense-description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;
    
    console.log('Form values:', { description, amount, category, date }); // Debug log
    
    // Validation
    if (!description) {
        showMessage('Please enter a description', 'error');
        return;
    }
    
    if (!amount || amount <= 0) {
        showMessage('Please enter a valid amount', 'error');
        return;
    }
    
    if (!date) {
        showMessage('Please select a date', 'error');
        return;
    }
    
    // Create expense object
    const expense = {
        id: Date.now(),
        description,
        amount,
        category,
        date,
        timestamp: new Date().toISOString()
    };
    
    console.log('Created expense:', expense); // Debug log
    
    // Add to expenses array
    expenses.unshift(expense);
    
    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Clear form
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').valueAsDate = new Date();
    
    // Update displays
    updateExpenseList();
    updateSummary();
    updateCategoryChart();
    
    showMessage('Expense added successfully!', 'success');
    console.log('Expense added successfully'); // Debug log
}

function updateExpenseList() {
    const expenseList = document.getElementById('expense-list');
    const filteredExpenses = getFilteredExpenses();
    
    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = '<div class="no-expenses">No expenses recorded yet</div>';
        return;
    }
    
    let html = '';
    filteredExpenses.forEach(expense => {
        const category = categoryInfo[expense.category];
        const formattedDate = new Date(expense.date).toLocaleDateString();
        
        html += `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-description">${category.icon} ${expense.description}</div>
                    <div class="expense-meta">${formattedDate} • ${expense.category}</div>
                </div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            </div>
        `;
    });
    
    expenseList.innerHTML = html;
}

function getFilteredExpenses() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch(currentFilter) {
        case 'today':
            return expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= today;
            });
        case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= weekAgo;
            });
        case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= monthAgo;
            });
        default:
            return expenses;
    }
}

function updateSummary() {
    const filteredExpenses = getFilteredExpenses();
    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate daily average
    let dailyAverage = 0;
    if (filteredExpenses.length > 0) {
        const dates = [...new Set(filteredExpenses.map(e => e.date))];
        dailyAverage = totalExpenses / dates.length;
    }
    
    // Find highest category
    const categoryTotals = {};
    filteredExpenses.forEach(expense => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    
    const highestCategory = Object.keys(categoryTotals).reduce((a, b) => 
        categoryTotals[a] > categoryTotals[b] ? a : b, '');
    
    // Update display
    document.getElementById('total-expenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('daily-average').textContent = `$${dailyAverage.toFixed(2)}`;
    document.getElementById('highest-category').textContent = highestCategory ? 
        `${categoryInfo[highestCategory].icon} ${highestCategory}` : '-';
}

function updateCategoryChart() {
    const filteredExpenses = getFilteredExpenses();
    const categoryTotals = {};
    
    filteredExpenses.forEach(expense => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    
    const chartContainer = document.getElementById('category-chart');
    
    if (Object.keys(categoryTotals).length === 0) {
        chartContainer.innerHTML = '<div class="chart-placeholder">Add expenses to see breakdown</div>';
        return;
    }
    
    const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
    
    let html = '';
    Object.entries(categoryTotals).forEach(([category, amount]) => {
        const percentage = (amount / total) * 100;
        const category = categoryInfo[category];
        
        html += `
            <div class="category-bar">
                <div class="category-label">${category.icon} ${category}</div>
                <div class="category-progress">
                    <div class="category-fill" style="width: ${percentage}%; background: ${category.color}"></div>
                </div>
                <div class="category-amount">$${amount.toFixed(2)}</div>
            </div>
        `;
    });
    
    chartContainer.innerHTML = html;
}

function filterExpenses(filter) {
    currentFilter = filter;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update displays
    updateExpenseList();
    updateSummary();
    updateCategoryChart();
}

function clearAllExpenses() {
    if (confirm('Are you sure you want to clear all expenses? This action cannot be undone.')) {
        expenses = [];
        localStorage.removeItem('expenses');
        updateExpenseList();
        updateSummary();
        updateCategoryChart();
        showMessage('All expenses cleared', 'success');
    }
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

// Add CSS animations if not already present
if (!document.querySelector('style[data-expense-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-expense-animations', 'true');
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
}

// Make functions globally available after they are defined
window.addExpense = addExpense;
window.filterExpenses = filterExpenses;
window.clearAllExpenses = clearAllExpenses;
