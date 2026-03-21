// Financial Health Assessment
let currentQuestion = 1;
const totalQuestions = 5;

function nextQuestion() {
    // Check if current question is answered
    const currentQuestionElement = document.querySelector(`.question[data-question="${currentQuestion}"]`);
    const selectedOption = currentQuestionElement.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        showMessage('Please select an answer before proceeding', 'error');
        return;
    }
    
    // Hide current question
    currentQuestionElement.classList.remove('active');
    
    // Move to next question
    currentQuestion++;
    
    if (currentQuestion > totalQuestions) {
        // Show submit button
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'block';
    } else {
        // Show next question
        document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active');
    }
    
    // Update progress dots
    updateProgressDots();
    updateNavigationButtons();
}

function previousQuestion() {
    if (currentQuestion <= 1) return;
    
    // Hide current question
    document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.remove('active');
    
    // Move to previous question
    currentQuestion--;
    
    // Show previous question
    document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active');
    
    // Show next button, hide submit button
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('submit-btn').style.display = 'none';
    
    // Update progress dots
    updateProgressDots();
    updateNavigationButtons();
}

function updateProgressDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index < currentQuestion) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    prevBtn.disabled = currentQuestion === 1;
}

function calculateHealthScore() {
    // Collect all answers
    const answers = [];
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption) {
            answers.push(parseInt(selectedOption.value));
        }
    }
    
    // Calculate total score (max 15)
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    const percentageScore = (totalScore / (totalQuestions * 3)) * 100;
    
    // Calculate category scores
    const categoryScores = {
        emergency: answers[0], // Question 1
        saving: answers[1],     // Question 2
        expense: answers[2],    // Question 3
        debt: answers[3],       // Question 4
        investment: answers[4]   // Question 5
    };
    
    // Update display
    updateScoreDisplay(percentageScore, totalScore);
    updateBreakdown(categoryScores);
    generateRecommendations(categoryScores, totalScore);
    
    // Show results
    document.getElementById('health-breakdown').style.display = 'block';
    document.getElementById('recommendations').style.display = 'block';
    
    // Scroll to results
    document.querySelector('.results-card').scrollIntoView({ behavior: 'smooth' });
}

function updateScoreDisplay(percentageScore, totalScore) {
    const scoreValue = document.getElementById('score-value');
    const healthStatus = document.getElementById('health-status');
    
    // Animate score
    animateValue(scoreValue, 0, Math.round(percentageScore), 1000);
    
    // Update status based on score
    let status = '';
    let statusColor = '';
    
    if (percentageScore >= 80) {
        status = 'Excellent Financial Health! 🌟';
        statusColor = '#10b981';
    } else if (percentageScore >= 60) {
        status = 'Good Financial Health! 👍';
        statusColor = '#059669';
    } else if (percentageScore >= 40) {
        status = 'Fair Financial Health 📊';
        statusColor = '#f59e0b';
    } else if (percentageScore >= 20) {
        status = 'Needs Improvement 📈';
        statusColor = '#f97316';
    } else {
        status = 'Critical Attention Required ⚠️';
        statusColor = '#dc2626';
    }
    
    healthStatus.textContent = status;
    healthStatus.style.color = statusColor;
    
    // Update score circle color
    const scoreCircle = document.querySelector('.score-circle');
    scoreCircle.style.background = `linear-gradient(135deg, ${statusColor}, ${statusColor}dd)`;
}

function updateBreakdown(categoryScores) {
    // Update each category bar
    updateCategoryBar('emergency-fill', categoryScores.emergency);
    updateCategoryBar('saving-fill', categoryScores.saving);
    updateCategoryBar('expense-fill', categoryScores.expense);
    updateCategoryBar('debt-fill', categoryScores.debt);
    updateCategoryBar('investment-fill', categoryScores.investment);
}

function updateCategoryBar(elementId, score) {
    const element = document.getElementById(elementId);
    const percentage = (score / 3) * 100;
    
    setTimeout(() => {
        element.style.width = percentage + '%';
    }, 100);
}

function generateRecommendations(categoryScores, totalScore) {
    const recommendations = [];
    
    // Emergency fund recommendations
    if (categoryScores.emergency <= 1) {
        recommendations.push({
            title: 'Build Emergency Fund',
            description: 'Start by saving $1000 immediately, then work towards 3-6 months of expenses.'
        });
    } else if (categoryScores.emergency === 2) {
        recommendations.push({
            title: 'Strengthen Emergency Fund',
            description: 'Continue building your emergency fund to reach 6 months of expenses.'
        });
    }
    
    // Saving recommendations
    if (categoryScores.saving <= 1) {
        recommendations.push({
            title: 'Increase Savings Rate',
            description: 'Try to save at least 10% of your income. Start small and gradually increase.'
        });
    } else if (categoryScores.saving === 2) {
        recommendations.push({
            title: 'Optimize Savings',
            description: 'Consider increasing your savings rate to 20% for faster wealth building.'
        });
    }
    
    // Expense tracking recommendations
    if (categoryScores.expense <= 1) {
        recommendations.push({
            title: 'Start Expense Tracking',
            description: 'Use the expense tracker above to monitor where your money goes.'
        });
    } else if (categoryScores.expense === 2) {
        recommendations.push({
            title: 'Enhance Expense Management',
            description: 'Consider creating a detailed budget and reviewing it weekly.'
        });
    }
    
    // Debt management recommendations
    if (categoryScores.debt <= 1) {
        recommendations.push({
            title: 'Tackle High-Interest Debt',
            description: 'Focus on paying off high-interest debt first. Consider debt consolidation.'
        });
    } else if (categoryScores.debt === 2) {
        recommendations.push({
            title: 'Optimize Debt Strategy',
            description: 'Continue making extra payments to reduce debt faster.'
        });
    }
    
    // Investment recommendations
    if (categoryScores.investment <= 1) {
        recommendations.push({
            title: 'Start Investing Today',
            description: 'Begin with low-cost index funds or retirement accounts. Time is your biggest asset.'
        });
    } else if (categoryScores.investment === 2) {
        recommendations.push({
            title: 'Diversify Investments',
            description: 'Consider expanding your portfolio with different asset classes.'
        });
    }
    
    // General recommendations
    if (totalScore >= 12) {
        recommendations.push({
            title: 'Maintain Excellence',
            description: 'You\'re doing great! Focus on tax optimization and advanced investment strategies.'
        });
    }
    
    // Display recommendations
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <strong>${rec.title}</strong>
            <p>${rec.description}</p>
        </div>
    `).join('');
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
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
if (!document.querySelector('style[data-health-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-health-animations', 'true');
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

// Initialize financial health assessment
function initializeFinancialHealth() {
    console.log('Initializing financial health assessment...');
    
    // Show first question
    const firstQuestion = document.querySelector('.question[data-question="1"]');
    if (firstQuestion) {
        firstQuestion.classList.add('active');
    }
    
    // Update progress dots
    updateProgressDots();
    updateNavigationButtons();
}

// Try to initialize on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFinancialHealth);
} else {
    // DOM already loaded, initialize immediately
    initializeFinancialHealth();
}

// Make functions globally available after they are defined
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.calculateHealthScore = calculateHealthScore;
