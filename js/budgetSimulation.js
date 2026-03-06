let chart;

function planBudget() {
  const income = Number(document.getElementById("income").value);
  const savingsP = Number(document.getElementById("savingPercent").value);
  const needsP = Number(document.getElementById("needsPercent").value);
  const wantsP = Number(document.getElementById("wantsPercent").value);

  if (!income || savingsP <= 0 || needsP <= 0 || wantsP <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  if (savingsP + needsP + wantsP !== 100) {
    alert("Savings + Needs + Wants must equal 100%");
    return;
  }

  const savings = income * (savingsP / 100);
  const needsAmount = income * (needsP / 100);
  const wantsAmount = income * (wantsP / 100);

  // Needs breakdown (expert ratios)
  const rent = needsAmount * 0.5;
  const food = needsAmount * 0.3;
  const transport = needsAmount * 0.2;

  // Wants breakdown
  const personal = wantsAmount * 0.6;
  const misc = wantsAmount * 0.4;

  document.getElementById("saveAmount").innerText = savings.toFixed(0);
  document.getElementById("rentAmt").innerText = rent.toFixed(0);
  document.getElementById("foodAmt").innerText = food.toFixed(0);
  document.getElementById("transportAmt").innerText = transport.toFixed(0);
  document.getElementById("personalAmt").innerText = personal.toFixed(0);
  document.getElementById("miscAmt").innerText = misc.toFixed(0);

  // Smart feedback
  let status = "Balanced budget 👍";

  if (wantsP > needsP) {
    status = "⚠️ Wants spending is higher than needs. Try to rebalance.";
  } else if (needsP >= wantsP) {
    status = "✅ Good job! Needs are prioritized.";
  }

  if (wantsP > 40) {
    status = "❌ Too much spending on wants can affect savings.";
  }

  if (savingsP >= 20) {
    status += " ⭐ Strong savings habit!";
  }

  document.getElementById("status").innerText = status;

  drawChart([rent, food, transport, personal, misc, savings]);
}
