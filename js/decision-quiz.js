function showDecisionResult() {
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

  let result = "";

  if (score >= 8) {
    result = "💡 Smart Decision Maker – You make financially healthy choices.";
  } else if (score >= 5) {
    result = "⚖️ Average Planner – You are improving but need consistency.";
  } else {
    result = "⚠️ Risky Decision Maker – You should rethink money decisions.";
  }

  document.getElementById("decisionResult").innerHTML = result;
}
