/* ================= MAIN SCENARIO ================= */
function salaryMain(option) {
  const feedback = document.getElementById("salary-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Overspending early can create regret later.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Balanced planning builds confidence and control.</span>";
  } 
  else {
    feedback.innerHTML =
      "❌ <span class='wrong'>Ignoring planning delays financial maturity.</span>";
  }
}

/* ================= HELPER ================= */
function showSalaryFeedback(btn, msg) {
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

function salary1(o, b) {
  showSalaryFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Celebrating within limits keeps finances healthy.</span>"
      : "❌ <span class='wrong'>Uncontrolled celebration leads to money stress.</span>"
  );
}

function salary2(o, b) {
  showSalaryFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Saving from first salary builds lifelong habit.</span>"
      : "⚠️ <span class='warn'>Delaying savings makes it harder later.</span>"
  );
}

function salary3(o, b) {
  showSalaryFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Voluntary contribution shows responsibility.</span>"
      : "⚠️ <span class='warn'>Ignoring responsibility affects relationships.</span>"
  );
}

function salary4(o, b) {
  showSalaryFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Planned upgrades avoid debt traps.</span>"
      : "❌ <span class='wrong'>Instant upgrades create lifestyle inflation.</span>"
  );
}
