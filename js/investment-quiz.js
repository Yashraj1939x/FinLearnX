function calculateResult() {
  const questions = ["q1", "q2", "q3"];
  let score = 0;

  for (let q of questions) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (!selected) {
      alert("Please answer all questions");
      return;
    }
    score += parseInt(selected.value);
  }

  let resultText = "";

  if (score <= 4) {
    resultText = "🟢 Conservative Investor – You prefer safety and low risk.";
  } else if (score <= 6) {
    resultText = "🔵 Balanced Investor – You balance risk and returns wisely.";
  } else {
    resultText = "🔴 Aggressive Investor – You aim for high growth and accept risk.";
  }

  document.getElementById("result").innerHTML = resultText;
}
