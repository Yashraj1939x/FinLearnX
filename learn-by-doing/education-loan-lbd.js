/* ================= MAIN SCENARIO ================= */
function eduMain(option) {
  const feedback = document.getElementById("edu-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Loans without clarity often create long-term stress.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Understanding repayment makes education loans manageable.</span>";
  } 
  else {
    feedback.innerHTML =
      "❌ <span class='wrong'>Borrowing extra increases unnecessary debt.</span>";
  }
}

/* ================= HELPER ================= */
function showEduFeedback(btn, msg) {
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

function edu1(o, b) {
  showEduFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Borrowing only what you need reduces repayment burden.</span>"
      : "❌ <span class='wrong'>Excess borrowing increases interest without benefit.</span>"
  );
}

function edu2(o, b) {
  showEduFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Planning EMIs with future income avoids default.</span>"
      : "⚠️ <span class='warn'>Ignoring repayment creates panic later.</span>"
  );
}

function edu3(o, b) {
  showEduFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>ROI awareness prevents debt traps.</span>"
      : "❌ <span class='wrong'>Loans without income clarity are risky.</span>"
  );
}

function edu4(o, b) {
  showEduFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Understanding terms protects your future.</span>"
      : "❌ <span class='wrong'>Blind signing can cause serious financial issues.</span>"
  );
}
