/* ================= MAIN SCENARIO ================= */
function debtMain(option) {
  const feedback = document.getElementById("debt-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Urgency-based borrowing often leads to regret later.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Evaluating repayment ability keeps debt under control.</span>";
  } 
  else {
    feedback.innerHTML =
      "❌ <span class='wrong'>Multiple small loans can quickly spiral into big debt.</span>";
  }
}

/* ================= HELPER ================= */
function showDebtFeedback(btn, msg) {
  const card = btn.closest(".scenario-card");
  let feedback = card.querySelector(".feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "feedback";
    card.appendChild(feedback);
  }

  feedback.innerHTML = msg;
}

/* ================= PRACTICE SCENARIOS ================= */

function debt1(o, b) {
  showDebtFeedback(
    b,
    o === "A"
      ? "✅ <span class='correct'>Education loans can improve future earning capacity.</span>"
      : "❌ <span class='wrong'>Lifestyle loans create debt without long-term value.</span>"
  );
}

function debt2(o, b) {
  showDebtFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Reducing debt load improves financial stability.</span>"
      : "❌ <span class='wrong'>Ignoring rising debt increases risk of default.</span>"
  );
}

function debt3(o, b) {
  showDebtFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Immediate action reduces penalties and credit damage.</span>"
      : "❌ <span class='wrong'>Delays and new loans worsen the situation.</span>"
  );
}

function debt4(o, b) {
  showDebtFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Minimum dues keep debt alive for years.</span>"
      : "⚠️ <span class='warn'>Misunderstanding minimum due leads to interest traps.</span>"
  );
}
