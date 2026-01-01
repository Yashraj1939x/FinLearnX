/* ================= MAIN SCENARIO ================= */
function bankMain(option) {
  const feedback = document.getElementById("bank-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Opening accounts blindly may lead to unnecessary charges.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Understanding account features helps you choose wisely.</span>";
  } 
  else {
    feedback.innerHTML =
      "❌ <span class='wrong'>Using someone else’s account is unsafe and risky.</span>";
  }
}

/* ================= HELPER ================= */
function showBankFeedback(btn, msg) {
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

function bank1(o, b) {
  showBankFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Keeping your PIN private protects your money.</span>"
      : "❌ <span class='wrong'>Sharing or writing PIN makes your account vulnerable.</span>"
  );
}

function bank2(o, b) {
  showBankFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Maintaining balance avoids penalties.</span>"
      : "⚠️ <span class='warn'>Ignoring balance rules leads to hidden charges.</span>"
  );
}

function bank3(o, b) {
  showBankFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Secure devices keep online banking safe.</span>"
      : "❌ <span class='wrong'>Public networks and OTP sharing invite fraud.</span>"
  );
}

function bank4(o, b) {
  showBankFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Quick reporting helps recover money.</span>"
      : "❌ <span class='wrong'>Delay reduces chances of resolution.</span>"
  );
}
