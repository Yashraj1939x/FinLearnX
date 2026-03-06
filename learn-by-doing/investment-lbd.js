/* ================= MAIN SCENARIO ================= */
function investMain(option) {
  const feedback = document.getElementById("invest-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Investing without research often leads to losses.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Understanding options reduces risk and improves decisions.</span>";
  } 
  else {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Avoiding investing completely can limit wealth growth.</span>";
  }
}

/* ================= HELPER ================= */
function showInvestFeedback(btn, msg) {
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

function invest1(o, b) {
  showInvestFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>High returns always come with high risk. Verification is essential.</span>"
      : "❌ <span class='wrong'>Blind investments are common causes of financial loss.</span>"
  );
}

function invest2(o, b) {
  showInvestFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Markets fluctuate, long-term patience rewards investors.</span>"
      : "❌ <span class='wrong'>Emotional selling often locks in losses.</span>"
  );
}

function invest3(o, b) {
  showInvestFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Short-term goals require safer investments.</span>"
      : "⚠️ <span class='warn'>High risk is unsuitable for short timelines.</span>"
  );
}

function invest4(o, b) {
  showInvestFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Consistency is the biggest advantage of SIP investing.</span>"
      : "⚠️ <span class='warn'>Stopping SIP breaks long-term compounding.</span>"
  );
}
