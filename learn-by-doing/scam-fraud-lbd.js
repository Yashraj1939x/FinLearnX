/* ================= MAIN SCENARIO ================= */
function scamMain(option) {
  const feedback = document.getElementById("scam-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Sharing OTP gives scammers direct access to your account.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Banks never ask for OTP. Verifying independently is the safest action.</span>";
  } 
  else {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Ignoring without reporting allows scammers to target others.</span>";
  }
}

/* ================= HELPER ================= */
function showScamFeedback(btn, msg) {
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

function scam1(o, b) {
  showScamFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Always verify messages using official apps or websites.</span>"
      : "❌ <span class='wrong'>Fear-based messages are a common scam tactic.</span>"
  );
}

function scam2(o, b) {
  showScamFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Legitimate jobs never ask for money.</span>"
      : "❌ <span class='wrong'>Paying fees upfront is a major red flag.</span>"
  );
}

function scam3(o, b) {
  showScamFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Guaranteed returns do not exist in real investing.</span>"
      : "❌ <span class='wrong'>Promises of quick money are common scams.</span>"
  );
}

function scam4(o, b) {
  showScamFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>You cannot win a prize you never entered.</span>"
      : "❌ <span class='wrong'>Scammers use excitement to extract money.</span>"
  );
}
