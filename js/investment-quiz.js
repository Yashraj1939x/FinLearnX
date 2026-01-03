function calculateResult() {
  const questions = ["q1","q2","q3","q4","q5","q6"];
  let score = 0;

  for (let q of questions) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (!selected) {
      alert("Please answer all questions");
      return;
    }
    score += parseInt(selected.value);
  }

  let message = "";

  if (score >= 15) {
    message = "🟢 Excellent! You understand investment basics well.";
  } else if (score >= 10) {
    message = "🟡 Good! You have basic understanding, keep learning.";
  } else {
    message = "🔴 Beginner level. Explore concepts before investing.";
  }

  document.getElementById("result").innerHTML = `
    <h2>Your Result</h2>
    <p>${message}</p>
    <button onclick="showAnswers()">View Answers</button>
  `;
}

function showAnswers() {
  document.getElementById("answers").classList.remove("hidden");
}
