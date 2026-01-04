/* ================= MAIN SCENARIO ================= */
function rvbMain(option) {
  const feedback = document.getElementById("rvb-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Buying too early can strain finances.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Renting offers flexibility in early career stages.</span>";
  } 
  else {
    feedback.innerHTML =
      "❌ <span class='wrong'>Emotional decisions often cause regret.</span>";
  }
}

/* ================= HELPER ================= */
function showRvbFeedback(btn, msg) {
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

function rvb1(o, b) {
  showRvbFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Lower rent helps you save and invest.</span>"
      : "❌ <span class='wrong'>High EMI reduces financial breathing space.</span>"
  );
}

function rvb2(o, b) {
  showRvbFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Renting supports job mobility.</span>"
      : "⚠️ <span class='warn'>Buying limits relocation flexibility.</span>"
  );
}

function rvb3(o, b) {
  showRvbFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Strong down payment reduces loan burden.</span>"
      : "❌ <span class='wrong'>Zero down payment increases risk.</span>"
  );
}

function rvb4(o, b) {
  showRvbFeedback(
    b,
    o === "A"
      ? "✅ <span class='correct'>Long-term stability makes buying sensible.</span>"
      : "⚠️ <span class='warn'>Random decisions can be costly.</span>"
  );
}
