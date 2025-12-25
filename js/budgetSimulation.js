let chart;
window.calculateBudget = function () {
  const income = Number(document.getElementById("income").value);

  const rent = Number(document.getElementById("rent").value);
  const food = Number(document.getElementById("food").value);
  const transport = Number(document.getElementById("transport").value);
  const others = Number(document.getElementById("others").value);

  const totalExpenses = rent + food + transport + others;
  const savings = income - totalExpenses;

  document.getElementById("expenses").innerText = totalExpenses;
  document.getElementById("savings").innerText = savings;

  let statusText = "";
  if (savings > 0) {
    statusText = "Good 👍 You are saving money";
  } else if (savings === 0) {
    statusText = "Break-even ⚠️ No savings";
  } else {
    statusText = "Overspending ❌ Reduce expenses";
  }

  document.getElementById("status").innerText = statusText;

  drawChart(rent, food, transport, others);
}

function drawChart(rent, food, transport, others) {
  const ctx = document.getElementById("budgetChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Rent", "Food", "Transport", "Others"],
      datasets: [{
        data: [rent, food, transport, others],
        backgroundColor: ["#22c55e", "#4ade80", "#86efac", "#bbf7d0"]
      }]
    },
    options: { responsive: true }
  });
}
