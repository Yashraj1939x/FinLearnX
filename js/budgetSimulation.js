let chart;

function planBudget() {
  const income = Number(document.getElementById("income").value);
  const savePercent = Number(document.getElementById("savingPercent").value);
  if (!income || !savePercent || savePercent >= 80) {
    alert("Enter valid income and savings percentage (below 80%)");
    return;
  }

  const savings = income * (savePercent / 100);
  const remaining = income - savings;

  const rent = remaining * 0.35;
  const food = remaining * 0.25;
  const transport = remaining * 0.15;
  const personal = remaining * 0.15;
  const misc = remaining * 0.10;

  document.getElementById("saveAmount").innerText = savings.toFixed(0);
  document.getElementById("rentAmt").innerText = rent.toFixed(0);
  document.getElementById("foodAmt").innerText = food.toFixed(0);
  document.getElementById("transportAmt").innerText = transport.toFixed(0);
  document.getElementById("personalAmt").innerText = personal.toFixed(0);
  document.getElementById("miscAmt").innerText = misc.toFixed(0);

  document.getElementById("status").innerText =
    savePercent > 40 ? "Aggressive Savings ⚠️" : "Balanced Budget 👍";

  drawChart([rent, food, transport, personal, misc, savings]);
}

function drawChart(data) {
  const ctx = document.getElementById("budgetChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Rent", "Food", "Transport", "Personal", "Misc", "Savings"],
      datasets: [{
        data: data
      }]
    }
  });
}
