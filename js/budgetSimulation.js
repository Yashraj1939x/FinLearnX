function planBudget() {
  const income = Number(document.getElementById("income").value);
  const savePercent = Number(document.getElementById("savingPercent").value);

  if (income <= 0 || savePercent <= 0 || savePercent >= 80) {
    alert("Please enter valid income and savings percentage");
    return;
  }

  const savings = income * (savePercent / 100);
  const remaining = income - savings;

  // Recommended allocation
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

  let status = "Excellent planning 👍";
  if (savePercent > 40) status = "Aggressive savings ⚠️";
  if (remaining < income * 0.4) status = "Tight budget ❌";

  document.getElementById("status").innerText = status;

  updateChart([rent, food, transport, personal, misc, savings]);
}
