// Quiz System for FinLearnX
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizResults = {};

// Quiz Data
const quizzes = {
    moneyPersonality: {
        title: "Money Personality Quiz",
        questions: [
            {
                question: "When you receive unexpected money, what's your first thought?",
                options: [
                    "Let's celebrate and buy something nice!",
                    "I should save this for future needs",
                    "Let me think about the best use for this money",
                    "How can I invest this to make it grow?"
                ],
                scores: [1, 2, 3, 4] // Spender, Saver, Balancer, Investor
            },
            {
                question: "How do you approach budgeting?",
                options: [
                    "I don't really budget, I spend as needed",
                    "I track every expense carefully",
                    "I have a general idea of my spending",
                    "I budget to maximize investment opportunities"
                ],
                scores: [1, 2, 3, 4]
            },
            {
                question: "What's your attitude towards debt?",
                options: [
                    "Debt is a normal part of life",
                    "I avoid debt at all costs",
                    "I use debt strategically when necessary",
                    "I use good debt to build wealth"
                ],
                scores: [1, 2, 3, 4]
            },
            {
                question: "How do you make financial decisions?",
                options: [
                    "Based on emotions and immediate needs",
                    "Based on careful research and planning",
                    "Balanced approach with some research",
                    "Based on potential returns and growth"
                ],
                scores: [1, 2, 3, 4]
            },
            {
                question: "What's your financial goal priority?",
                options: [
                    "Enjoying life in the present",
                    "Building a secure emergency fund",
                    "Balancing present enjoyment with future security",
                    "Building long-term wealth and assets"
                ],
                scores: [1, 2, 3, 4]
            }
        ],
        results: {
            1: {
                title: "The Spender",
                description: "You enjoy living in the moment and value experiences over savings. Consider setting aside a small portion for future goals.",
                color: "#ef4444"
            },
            2: {
                title: "The Saver",
                description: "You're financially cautious and prioritize security. Consider exploring balanced investment options to grow your savings.",
                color: "#10b981"
            },
            3: {
                title: "The Balancer",
                description: "You strike a good balance between enjoying today and planning for tomorrow. Keep up the balanced approach!",
                color: "#3b82f6"
            },
            4: {
                title: "The Investor",
                description: "You're focused on long-term wealth building. Remember to maintain some liquidity for short-term needs.",
                color: "#8b5cf6"
            }
        }
    },
    financialDecision: {
        title: "Financial Decision-Making Quiz",
        questions: [
            {
                question: "You get a job offer with 20% higher salary but requires 2-hour daily commute. What do you do?",
                options: [
                    "Accept immediately - more money is always better",
                    "Decline - time is more valuable than money",
                    "Calculate the real cost including commute and time",
                    "Negotiate for remote work or better compensation"
                ],
                correct: 2,
                feedback: {
                    0: "Impulsive decision! Money isn't everything - consider hidden costs like time, fuel, and stress.",
                    1: "You value time, which is good! But don't dismiss opportunities without analysis.",
                    2: "Excellent analytical approach! Considering total compensation shows financial wisdom.",
                    3: "Great negotiation skills! Always try to improve terms before accepting or declining."
                }
            },
            {
                question: "Your friend wants to borrow $500 for a business idea. What's your approach?",
                options: [
                    "Give the money - friends help friends",
                    "Refuse - never mix money and friendship",
                    "Ask for a detailed business plan first",
                    "Offer to be a mentor instead of lender"
                ],
                correct: 2,
                feedback: {
                    0: "Kind heart, but risky! Business failures can ruin both money and friendship.",
                    1: "Cautious approach! Protecting relationships is smart, but there are middle grounds.",
                    2: "Perfect balance! Due diligence shows you're both supportive and financially responsible.",
                    3: "Wise alternative! Helping without financial risk protects both friendship and finances."
                }
            },
            {
                question: "You have $1000 bonus. What's the smartest move?",
                options: [
                    "Buy something you've wanted for a while",
                    "Put it all in savings",
                    "Pay off high-interest debt first",
                    "Invest in a diversified portfolio"
                ],
                correct: 2,
                feedback: {
                    0: "Lifestyle inflation! Enjoying money is fine, but consider opportunity cost.",
                    1: "Safe choice! Savings are important, but high-interest debt costs more.",
                    2: "Brilliant priority! Paying 18% debt is like earning 18% guaranteed returns.",
                    3: "Growth mindset! Investing is great, but clear high-interest debt first."
                }
            },
            {
                question: "Should you buy a house or rent?",
                options: [
                    "Always buy - rent is throwing money away",
                    "Always rent - buying is too risky",
                    "Depends on your location, income, and plans",
                    "Buy only if you can afford 20% down payment"
                ],
                correct: 2,
                feedback: {
                    0: "Common myth! Renting isn't wasting money - consider flexibility and total costs.",
                    1: "Risk-averse! Renting provides flexibility, but you might miss equity building.",
                    2: "Perfectly nuanced! The best choice depends on your personal situation.",
                    3: "Conservative rule! 20% down is wise, but not the only factor to consider."
                }
            },
            {
                question: "Your credit card has 18% interest. How should you use it?",
                options: [
                    "Use it for all purchases for rewards",
                    "Never use it - credit cards are dangerous",
                    "Use for emergencies and pay in full monthly",
                    "Use for small purchases and pay minimum"
                ],
                correct: 2,
                feedback: {
                    0: "Rewards trap! High interest outweighs most rewards unless you pay in full.",
                    1: "Too cautious! Credit cards build credit history when used responsibly.",
                    2: "Ideal strategy! Emergency use with full payment maximizes benefits, minimizes costs.",
                    3: "Dangerous habit! Minimum payments lead to debt spirals and credit damage."
                }
            }
        ]
    },
    investmentBasics: {
        title: "Investment Basics Quiz",
        questions: [
            {
                question: "What does SIP stand for?",
                options: [
                    "Systematic Investment Plan",
                    "Smart Investment Program",
                    "Secure Interest Payment",
                    "Stock Investment Portfolio"
                ],
                correct: 0
            },
            {
                question: "What is diversification in investing?",
                options: [
                    "Putting all money in one stock",
                    "Spreading investments across different assets",
                    "Changing investments frequently",
                    "Investing only in safe options"
                ],
                correct: 1
            },
            {
                question: "What is compound interest?",
                options: [
                    "Interest calculated only on principal",
                    "Interest on interest over time",
                    "Fixed interest rate",
                    "Variable interest rate"
                ],
                correct: 1
            },
            {
                question: "What's the primary benefit of mutual funds?",
                options: [
                    "Guaranteed high returns",
                    "Professional management and diversification",
                    "No risk involved",
                    "Instant wealth creation"
                ],
                correct: 1
            },
            {
                question: "What does risk tolerance mean?",
                options: [
                    "How much risk you can afford to lose",
                    "Your emotional capacity to handle market fluctuations",
                    "The amount of risk in any investment",
                    "Government risk assessment"
                ],
                correct: 1
            }
        ]
    },
    financialBasics: {
        title: "Financial Literacy Basics Quiz",
        questions: [
            {
                question: "What's the difference between needs and wants?",
                options: [
                    "No difference - they're the same",
                    "Needs are essential for survival, wants are desires",
                    "Needs are expensive, wants are cheap",
                    "Needs are for adults, wants are for kids"
                ],
                correct: 1
            },
            {
                question: "What is an emergency fund?",
                options: [
                    "Money for vacation expenses",
                    "Savings for unexpected expenses or job loss",
                    "Fund for buying luxury items",
                    "Investment in emergency situations"
                ],
                correct: 1
            },
            {
                question: "What's inflation?",
                options: [
                    "Increase in stock prices",
                    "Decrease in currency value",
                    "General increase in prices and decrease in purchasing power",
                    "Economic growth indicator"
                ],
                correct: 2
            },
            {
                question: "What is a credit score?",
                options: [
                    "Your bank account balance",
                    "A number representing your creditworthiness",
                    "Your monthly income",
                    "Your investment portfolio value"
                ],
                correct: 1
            },
            {
                question: "What's the 50/30/20 rule?",
                options: [
                    "50% needs, 30% wants, 20% savings",
                    "50% savings, 30% needs, 20% wants",
                    "50% wants, 30% savings, 20% needs",
                    "50% bills, 30% entertainment, 20% shopping"
                ],
                correct: 0
            }
        ]
    },
    budgeting: {
        title: "Budgeting Basics Quiz",
        questions: [
            {
                question: "What's the 50/30/20 rule in budgeting?",
                options: [
                    "50% needs, 30% wants, 20% savings",
                    "50% savings, 30% needs, 20% wants", 
                    "50% wants, 30% savings, 20% needs",
                    "50% bills, 30% food, 20% entertainment"
                ],
                correct: 0,
                explanation: "The 50/30/20 rule allocates 50% to needs, 30% to wants, and 20% to savings and debt repayment."
            },
            {
                question: "What's considered a 'need' in budgeting?",
                options: [
                    "Netflix subscription",
                    "Restaurant dining",
                    "Housing/rent",
                    "Gym membership"
                ],
                correct: 2,
                explanation: "Needs are essential expenses like housing, utilities, food, and transportation required for survival."
            },
            {
                question: "How much should you save monthly?",
                options: [
                    "Whatever is left over",
                    "At least 10-20% of income",
                    "Only when you get bonuses",
                    "Save after all spending"
                ],
                correct: 1,
                explanation: "Financial experts recommend saving at least 10-20% of your monthly income before spending on wants."
            },
            {
                question: "What's an emergency fund?",
                options: [
                    "Money for vacation",
                    "3-6 months of living expenses",
                    "Investment money",
                    "Shopping fund"
                ],
                correct: 1,
                explanation: "An emergency fund should cover 3-6 months of essential living expenses for unexpected situations."
            },
            {
                question: "What's discretionary spending?",
                options: [
                    "Rent and utilities",
                    "Groceries and transportation",
                    "Entertainment and hobbies",
                    "Insurance payments"
                ],
                correct: 2,
                explanation: "Discretionary spending is non-essential spending on entertainment, hobbies, dining out, and other wants."
            }
        ]
    },
    credit: {
        title: "Credit Score Quiz",
        questions: [
            {
                question: "What's a good credit score range?",
                options: [
                    "300-579",
                    "580-669", 
                    "670-739",
                    "740+"
                ],
                correct: 2,
                explanation: "A credit score of 670-739 is considered good, while 740+ is excellent."
            },
            {
                question: "What most affects your credit score?",
                options: [
                    "Payment history",
                    "Income level",
                    "Age",
                    "Education"
                ],
                correct: 0,
                explanation: "Payment history (35%) is the biggest factor affecting your credit score."
            },
            {
                question: "How often should you check your credit?",
                options: [
                    "Never",
                    "Once a year",
                    "Monthly",
                    "Weekly"
                ],
                correct: 1,
                explanation: "You should check your credit report at least once a year for errors and fraud."
            },
            {
                question: "What's a credit utilization ratio?",
                options: [
                    "Total credit available",
                    "Credit used vs credit available",
                    "Number of credit cards",
                    "Credit age"
                ],
                correct: 1,
                explanation: "Credit utilization is the percentage of available credit you're using. Keep it below 30%."
            },
            {
                question: "How long do negative items stay?",
                options: [
                    "2 years",
                    "7 years",
                    "10 years",
                    "Forever"
                ],
                correct: 1,
                explanation: "Most negative items like late payments stay on your credit report for 7 years."
            }
        ]
    },
    investment: {
        title: "Investment Basics Quiz", 
        questions: [
            {
                question: "What's compound interest?",
                options: [
                    "Interest on principal only",
                    "Interest on principal + accumulated interest",
                    "Fixed interest rate",
                    "Bank fee"
                ],
                correct: 1,
                explanation: "Compound interest is interest calculated on both the principal and accumulated interest from previous periods."
            },
            {
                question: "What's diversification?",
                options: [
                    "Putting all money in one stock",
                    "Spreading investments across different assets",
                    "Only investing in bonds",
                    "Timing the market"
                ],
                correct: 1,
                explanation: "Diversification means spreading investments across different assets to reduce risk."
            },
            {
                question: "What's a mutual fund?",
                options: [
                    "Single company stock",
                    "Pool of money from many investors",
                    "Government bond",
                    "Bank account"
                ],
                correct: 1,
                explanation: "A mutual fund pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities."
            },
            {
                question: "What's risk tolerance?",
                options: [
                    "How much money you have",
                    "Your ability to handle investment losses",
                    "Your age",
                    "Your income"
                ],
                correct: 1,
                explanation: "Risk tolerance is your ability and willingness to handle investment losses and market fluctuations."
            },
            {
                question: "When should you start investing?",
                options: [
                    "When you're rich",
                    "After 40 years old",
                    "As soon as possible",
                    "Only when market is good"
                ],
                correct: 2,
                explanation: "Start investing as early as possible to benefit from compound interest and long-term growth."
            }
        ]
    },
    taxes: {
        title: "Tax Basics Quiz",
        questions: [
            {
                question: "What's a tax deduction?",
                options: [
                    "Money you get back",
                    "Expense that reduces taxable income",
                    "Free money from government",
                    "Tax penalty"
                ],
                correct: 1,
                explanation: "A tax deduction reduces your taxable income, potentially lowering your tax bill."
            },
            {
                question: "What's a tax credit?",
                options: [
                    "Reduces tax bill directly",
                    "Increases taxable income",
                    "Tax penalty",
                    "Bank fee"
                ],
                correct: 0,
                explanation: "A tax credit directly reduces your tax bill dollar-for-dollar, making it more valuable than a deduction."
            },
            {
                question: "What's the standard deduction?",
                options: [
                    "Fixed amount everyone can deduct",
                    "Only for rich people",
                    "Business expense",
                    "State tax"
                ],
                correct: 0,
                explanation: "The standard deduction is a fixed amount all taxpayers can deduct without itemizing expenses."
            },
            {
                question: "When are taxes due?",
                options: [
                    "January 1st",
                    "April 15th",
                    "July 4th", 
                    "December 31st"
                ],
                correct: 1,
                explanation: "Federal income taxes are typically due on April 15th each year."
            },
            {
                question: "What's taxable income?",
                options: [
                    "All money you earn",
                    "Income after deductions and exemptions",
                    "Only salary",
                    "Only investment income"
                ],
                correct: 1,
                explanation: "Taxable income is your total income minus deductions and exemptions."
            }
        ]
    }
};

// Initialize Quiz Modal
function createQuizModal() {
    const modalHTML = `
        <div id="quiz-modal" class="quiz-modal">
            <div class="quiz-modal-content">
                <div class="quiz-header">
                    <h2 id="quiz-title">Quiz Title</h2>
                    <button class="close-quiz" onclick="closeQuiz()">×</button>
                </div>
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                    <span id="question-counter">Question 1 of 5</span>
                </div>
                <div class="quiz-body">
                    <div class="question-container" id="question-container">
                        <h3 id="question-text">Question will appear here</h3>
                        <div class="options-container" id="options-container">
                            <!-- Options will be dynamically added -->
                        </div>
                    </div>
                    <div class="quiz-controls">
                        <button class="quiz-btn prev-btn" onclick="previousQuestion()" disabled>Previous</button>
                        <button class="quiz-btn next-btn" onclick="nextQuestion()">Next</button>
                        <button class="quiz-btn submit-btn" onclick="submitQuiz()" style="display: none;">Submit</button>
                    </div>
                </div>
                <div class="quiz-results" id="quiz-results" style="display: none;">
                    <div class="result-content">
                        <h3 id="result-title">Your Result</h3>
                        <p id="result-description">Result description</p>
                        <div class="result-score" id="result-score">Score: 0/5</div>
                        <button class="quiz-btn restart-btn" onclick="restartQuiz()">Try Again</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Start Quiz
function startQuiz(quizType) {
    currentQuiz = quizzes[quizType];
    currentQuestionIndex = 0;
    userAnswers = [];
    
    if (!document.getElementById('quiz-modal')) {
        createQuizModal();
    }
    
    document.getElementById('quiz-modal').style.display = 'flex';
    document.getElementById('quiz-title').textContent = currentQuiz.title;
    
    displayQuestion();
    updateProgress();
}

// Display Current Question
function displayQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.innerHTML = `
            <input type="radio" name="quiz-answer" id="option-${index}" value="${index}">
            <label for="option-${index}">${option}</label>
        `;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Restore previous answer if exists
    if (userAnswers[currentQuestionIndex] !== undefined) {
        document.getElementById(`option-${userAnswers[currentQuestionIndex]}`).checked = true;
    }
    
    updateButtons();
}

// Select Option
function selectOption(index) {
    // Clear all previous selections for this question
    const allRadios = document.querySelectorAll(`input[name="quiz-answer"]`);
    allRadios.forEach(radio => radio.checked = false);
    
    // Set the selected option
    const selectedRadio = document.getElementById(`option-${index}`);
    if (selectedRadio) {
        selectedRadio.checked = true;
        userAnswers[currentQuestionIndex] = index;
        updateButtons();
    }
}

// Navigation Functions
function nextQuestion() {
    // Check if current question has an answer selected
    const currentAnswer = document.querySelector('input[name="quiz-answer"]:checked');
    const hasStoredAnswer = userAnswers[currentQuestionIndex] !== undefined;
    
    console.log('Next Question Check:', {
        currentAnswer: currentAnswer ? currentAnswer.value : 'none',
        hasStoredAnswer: hasStoredAnswer,
        currentQuestionIndex: currentQuestionIndex
    });
    
    if (!currentAnswer && !hasStoredAnswer) {
        showMessage('Please select an answer', 'error');
        return;
    }
    
    // Store the answer if not already stored
    if (currentAnswer && !hasStoredAnswer) {
        userAnswers[currentQuestionIndex] = parseInt(currentAnswer.value);
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= currentQuiz.questions.length) {
        showSubmitButton();
    } else {
        displayQuestion();
        updateProgress();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateProgress();
    }
}

// Update Progress
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('question-counter').textContent = 
        `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
}

// Update Buttons
function updateButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Check if current question has an answer selected
    const currentAnswer = document.querySelector('input[name="quiz-answer"]:checked');
    const hasAnswer = currentAnswer !== null || userAnswers[currentQuestionIndex] !== undefined;
    
    nextBtn.disabled = !hasAnswer;
    
    // Show submit button if all questions are answered
    const allAnswered = userAnswers.every((answer, index) => 
        answer !== undefined || (index === currentQuestionIndex && hasAnswer)
    );
    
    if (allAnswered && currentQuestionIndex === currentQuiz.questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// Show Submit Button
function showSubmitButton() {
    document.querySelector('.next-btn').style.display = 'none';
    document.querySelector('.submit-btn').style.display = 'block';
}

// Submit Quiz
function submitQuiz() {
    // Check if current question has an answer selected
    const currentAnswer = document.querySelector('input[name="quiz-answer"]:checked');
    const hasStoredAnswer = userAnswers[currentQuestionIndex] !== undefined;
    
    // Store the answer if not already stored
    if (currentAnswer && !hasStoredAnswer) {
        userAnswers[currentQuestionIndex] = parseInt(currentAnswer.value);
    }
    
    // Check if all questions are answered
    const allAnswered = userAnswers.every(answer => answer !== undefined);
    
    if (!allAnswered) {
        showMessage('Please answer all questions before submitting', 'error');
        return;
    }
    
    calculateResults();
    displayResults();
}

// Calculate Results
function calculateResults() {
    if (currentQuiz === quizzes.moneyPersonality) {
        // Calculate personality type
        const scores = [0, 0, 0, 0]; // Spender, Saver, Balancer, Investor
        userAnswers.forEach((answer, index) => {
            const questionScores = currentQuiz.questions[index].scores;
            scores[questionScores[answer] - 1]++;
        });
        
        const maxScore = Math.max(...scores);
        const personalityType = scores.indexOf(maxScore) + 1;
        quizResults = currentQuiz.results[personalityType];
    } else if (currentQuiz === quizzes.financialDecision) {
        // Calculate score and provide personalized feedback
        let correct = 0;
        let feedbackMessages = [];
        
        userAnswers.forEach((answer, index) => {
            const question = currentQuiz.questions[index];
            if (answer === question.correct) {
                correct++;
            }
            // Add personalized feedback for each answer
            feedbackMessages.push(question.feedback[answer]);
        });
        
        const percentage = (correct / currentQuiz.questions.length) * 100;
        let level = 'Beginner';
        let color = '#ef4444';
        let title = '';
        let description = '';
        
        if (percentage >= 80) {
            level = 'Expert';
            color = '#10b981';
            title = '🎯 Financial Expert';
            description = `Excellent decision-making! You scored ${correct}/${currentQuiz.questions.length}. Your financial choices show wisdom and careful consideration.`;
        } else if (percentage >= 60) {
            level = 'Intermediate';
            color = '#3b82f6';
            title = '📈 Financial Learner';
            description = `Good financial instincts! You scored ${correct}/${currentQuiz.questions.length}. With some refinement, you'll make excellent decisions.`;
        } else if (percentage >= 40) {
            level = 'Basic';
            color = '#f59e0b';
            title = '🌱 Financial Novice';
            description = `You're learning! You scored ${correct}/${currentQuiz.questions.length}. Focus on analyzing total costs and long-term impact.`;
        } else {
            level = 'Needs Improvement';
            color = '#ef4444';
            title = '⚠️ Financial Caution Needed';
            description = `Room for growth! You scored ${correct}/${currentQuiz.questions.length}. Consider seeking financial education before major decisions.`;
        }
        
        // Add personalized feedback summary
        description += '\n\n💡 Your Decision Patterns:\n' + feedbackMessages.slice(0, 3).join('\n');
        
        quizResults = {
            title: title,
            description: description,
            color: color,
            score: `${correct}/${currentQuiz.questions.length}`
        };
    } else {
        // Calculate score for other quizzes
        let correct = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === currentQuiz.questions[index].correct) {
                correct++;
            }
        });
        
        const percentage = (correct / currentQuiz.questions.length) * 100;
        let level = 'Beginner';
        let color = '#ef4444';
        
        if (percentage >= 80) {
            level = 'Expert';
            color = '#10b981';
        } else if (percentage >= 60) {
            level = 'Intermediate';
            color = '#3b82f6';
        } else if (percentage >= 40) {
            level = 'Basic';
            color = '#f59e0b';
        }
        
        quizResults = {
            title: `${level} Level`,
            description: `You scored ${correct} out of ${currentQuiz.questions.length} questions correctly. Keep learning to improve your financial knowledge!`,
            color: color,
            score: `${correct}/${currentQuiz.questions.length}`
        };
    }
}

// Display Results
function displayResults() {
    const quizContent = document.querySelector('.quiz-content');
    
    let html = `
        <div class="quiz-result">
            <div class="result-header" style="background: ${quizResults.color}">
                <h2>${quizResults.title}</h2>
                <div class="result-score">${quizResults.score}</div>
            </div>
            <div class="result-description">
                <p>${quizResults.description}</p>
            </div>
    `;
    
    // Add detailed answer analysis for all quizzes
    html += `
        <div class="answer-analysis">
            <h3>📋 Your Answer Analysis</h3>
            <div class="answers-breakdown">
    `;
    
    userAnswers.forEach((answer, index) => {
        const question = currentQuiz.questions[index];
        const isCorrect = answer === question.correct;
        const userAnswerText = question.options[answer];
        const correctAnswerText = question.options[question.correct];
        
        html += `
            <div class="answer-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="answer-question">
                    <strong>Q${index + 1}:</strong> ${question.question}
                </div>
                <div class="answer-details">
                    <div class="user-answer">
                        <span class="answer-label">Your Answer:</span>
                        <span class="answer-text ${isCorrect ? 'correct-text' : 'incorrect-text'}">
                            ${userAnswerText}
                        </span>
                        ${isCorrect ? '✅' : '❌'}
                    </div>
                    ${!isCorrect ? `
                        <div class="correct-answer">
                            <span class="answer-label">Correct Answer:</span>
                            <span class="answer-text correct-text">${correctAnswerText}</span>
                        </div>
                    ` : ''}
                    ${question.feedback ? `
                        <div class="answer-feedback">
                            <span class="feedback-label">💡 Insight:</span>
                            <span class="feedback-text">${question.feedback[answer]}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    // Add recommendations based on performance
    const correctCount = userAnswers.filter((answer, index) => 
        answer === currentQuiz.questions[index].correct
    ).length;
    const percentage = (correctCount / currentQuiz.questions.length) * 100;
    
    html += `
        <div class="recommendations">
            <h3>🎯 Personalized Recommendations</h3>
            <div class="recommendation-list">
    `;
    
    if (percentage >= 80) {
        html += `
            <div class="recommendation-item excellent">
                <div class="rec-icon">🌟</div>
                <div class="rec-text">
                    <strong>Excellent Performance!</strong> You have a strong understanding of this topic. Consider exploring advanced financial concepts or taking on more complex challenges.
                </div>
            </div>
        `;
    } else if (percentage >= 60) {
        html += `
            <div class="recommendation-item good">
                <div class="rec-icon">📈</div>
                <div class="rec-text">
                    <strong>Good Foundation!</strong> You have solid knowledge but there's room for improvement. Review the questions you missed and focus on understanding the underlying concepts.
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="recommendation-item needs-work">
                <div class="rec-icon">📚</div>
                <div class="rec-text">
                    <strong>Keep Learning!</strong> Financial literacy is a journey. Focus on the basics and consider reading beginner-friendly financial resources. Practice makes perfect!
                </div>
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
        
        <div class="quiz-actions">
            <button class="quiz-btn restart-btn" onclick="restartQuiz()">
                🔄 Retake Quiz
            </button>
            <button class="quiz-btn close-btn" onclick="closeQuiz()">
                ✖️ Close
            </button>
        </div>
    </div>
    `;
    
    quizContent.innerHTML = html;
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    
    document.querySelector('.quiz-body').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    document.querySelector('.next-btn').style.display = 'block';
    document.querySelector('.submit-btn').style.display = 'none';
    
    displayQuestion();
    updateProgress();
}

// Close Quiz
function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
}

// Show Message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'quiz-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        background: ${type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #10b981, #059669)'};
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Add CSS for quiz modal
const quizStyles = `
    .quiz-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .quiz-modal-content {
        background: white;
        border-radius: 20px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    }
    
    .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 30px;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .quiz-header h2 {
        margin: 0;
        color: #1f2937;
        font-size: 1.5rem;
    }
    
    .close-quiz {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .close-quiz:hover {
        background: #f3f4f6;
        color: #1f2937;
    }
    
    .quiz-progress {
        padding: 20px 30px;
        background: #f9fafb;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border-radius: 10px;
        transition: width 0.3s ease;
        width: 0%;
    }
    
    #question-counter {
        color: #6b7280;
        font-size: 0.9rem;
    }
    
    .quiz-body {
        padding: 30px;
    }
    
    #question-text {
        margin-bottom: 25px;
        color: #1f2937;
        font-size: 1.2rem;
        line-height: 1.6;
    }
    
    .quiz-option {
        margin-bottom: 15px;
        padding: 15px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .quiz-option:hover {
        border-color: #3b82f6;
        background: #f0f9ff;
    }
    
    .quiz-option input[type="radio"] {
        margin-right: 12px;
        transform: scale(1.2);
    }
    
    .quiz-option label {
        cursor: pointer;
        color: #374151;
        font-size: 1rem;
    }
    
    .quiz-controls {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        gap: 15px;
    }
    
    .quiz-btn {
        padding: 12px 24px;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
    }
    
    .prev-btn {
        background: #f3f4f6;
        color: #6b7280;
    }
    
    .prev-btn:hover:not(:disabled) {
        background: #e5e7eb;
    }
    
    .prev-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .next-btn, .submit-btn, .restart-btn {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
    }
    
    .next-btn:hover:not(:disabled), .submit-btn:hover, .restart-btn:hover {
        background: linear-gradient(135deg, #1d4ed8, #1e40af);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }
    
    .next-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .quiz-results {
        padding: 40px 30px;
        text-align: center;
    }
    
    .result-content h3 {
        font-size: 2rem;
        margin-bottom: 15px;
    }
    
    .result-content p {
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 20px;
        font-size: 1.1rem;
    }
    
    .result-score {
        font-size: 1.5rem;
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 25px;
        display: none;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @media (max-width: 640px) {
        .quiz-modal-content {
            width: 95%;
            margin: 10px;
        }
        
        .quiz-header, .quiz-progress, .quiz-body, .quiz-results {
            padding: 20px;
        }
        
        .quiz-controls {
            flex-direction: column;
        }
        
        .quiz-btn {
            width: 100%;
        }
    }
    
    /* Enhanced Results Styles */
    .answer-analysis {
        margin: 20px 0;
        background: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
    }
    
    .answer-item {
        background: white;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
        border-left: 4px solid #ddd;
    }
    
    .answer-item.correct {
        border-left-color: #10b981;
        background: #f0fdf4;
    }
    
    .answer-item.incorrect {
        border-left-color: #ef4444;
        background: #fef2f2;
    }
    
    .answer-question {
        font-weight: 600;
        margin-bottom: 10px;
        color: #374151;
    }
    
    .answer-details {
        margin-left: 10px;
    }
    
    .user-answer, .correct-answer {
        margin-bottom: 8px;
        padding: 8px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.7);
    }
    
    .answer-label {
        font-weight: 600;
        color: #6b7280;
        margin-right: 8px;
    }
    
    .answer-text.correct-text {
        color: #10b981;
        font-weight: 500;
    }
    
    .answer-text.incorrect-text {
        color: #ef4444;
        font-weight: 500;
    }
    
    .answer-feedback {
        margin-top: 10px;
        padding: 10px;
        background: #eff6ff;
        border-radius: 5px;
        border-left: 3px solid #3b82f6;
    }
    
    .feedback-label {
        font-weight: 600;
        color: #3b82f6;
    }
    
    .feedback-text {
        color: #1e40af;
        font-style: italic;
    }
    
    .recommendations {
        margin: 20px 0;
        background: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
    }
    
    .recommendation-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 15px;
        padding: 15px;
        border-radius: 8px;
        background: white;
    }
    
    .recommendation-item.excellent {
        border-left: 4px solid #10b981;
        background: #f0fdf4;
    }
    
    .recommendation-item.good {
        border-left: 4px solid #3b82f6;
        background: #eff6ff;
    }
    
    .recommendation-item.needs-work {
        border-left: 4px solid #f59e0b;
        background: #fffbeb;
    }
    
    .rec-icon {
        font-size: 24px;
        margin-right: 15px;
        flex-shrink: 0;
    }
    
    .rec-text {
        flex: 1;
        line-height: 1.5;
    }
    
    .rec-text strong {
        color: #1f2937;
        display: block;
        margin-bottom: 5px;
    }
`;

if (!document.querySelector('#quiz-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'quiz-styles';
    styleSheet.textContent = quizStyles;
    document.head.appendChild(styleSheet);
}

// Make quiz functions globally available
window.startQuiz = startQuiz;
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.submitQuiz = submitQuiz;
window.closeQuiz = closeQuiz;
window.restartQuiz = restartQuiz;

// Update quiz button handlers
document.addEventListener('DOMContentLoaded', function() {
    // Update existing quiz buttons to use the new system
    const quizButtons = document.querySelectorAll('.quiz-card button');
    quizButtons.forEach((button, index) => {
        const quizTypes = ['moneyPersonality', 'financialDecision', 'investmentBasics', 'financialBasics', 'budgeting', 'credit', 'investment', 'taxes'];
        if (quizTypes[index]) {
            button.setAttribute('onclick', `startQuiz('${quizTypes[index]}')`);
        }
    });
});
