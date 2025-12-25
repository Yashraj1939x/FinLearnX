window.calculateScore = function () {
  const form = document.getElementById("quizForm");
  const resultDiv = document.getElementById("result");

  let totalScore = 0;
  let questions = ["q1", "q2", "q3", "q4", "q5"];

  for (let q of questions) {
    if (!form[q].value) {
      alert("Please answer all questions");
      return;
    }
    totalScore += parseInt(form[q].value);
  }

  let resultHTML = "";

  if (totalScore <= 9) {
    resultHTML = `<h3 class="spender">Spender</h3>`;
  } else if (totalScore <= 14) {
    resultHTML = `<h3 class="balancer">Balancer</h3>`;
  } else if (totalScore <= 19) {
    resultHTML = `<h3 class="saver">Saver</h3>`;
  } else {
    resultHTML = `<h3 class="investor">Investor</h3>`;
  }

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <p class="score">Your Score: ${totalScore}</p>
    ${resultHTML}
  `;
};
