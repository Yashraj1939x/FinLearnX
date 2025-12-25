window.calculateScore = function () {
  const resultDiv = document.getElementById("result");

  const questions = ["q1", "q2", "q3", "q4", "q5"];
  let totalScore = 0;

  for (let q of questions) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (!selected) {
      alert("Please answer all questions");
      return;
    }
    totalScore += parseInt(selected.value);
  }

  let personality = "";
  let colorClass = "";

  if (totalScore <= 9) {
    personality = "Spender";
    colorClass = "spender";
  } else if (totalScore <= 14) {
    personality = "Balancer";
    colorClass = "balancer";
  } else if (totalScore <= 19) {
    personality = "Saver";
    colorClass = "saver";
  } else {
    personality = "Investor";
    colorClass = "investor";
  }

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h3 class="${colorClass}">You are a ${personality}</h3>
    <p class="score">Your Score: ${totalScore}</p>
  `;

  resultDiv.scrollIntoView({ behavior: "smooth" });
};
