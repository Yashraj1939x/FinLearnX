function selectChoice(option) {
  const feedback = document.getElementById("feedback");

  if (option === "A") {
    feedback.innerHTML = "❌ <span class='wrong'>This is a common mistake. Saving rarely happens when you spend first.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML = "✅ <span class='correct'>Correct! Paying yourself first builds strong financial discipline.</span>";
  } 
  else if (option === "C") {
    feedback.innerHTML = "⚠️ <span class='warn'>This may work short-term, but usually leads to overspending.</span>";
  }
}
