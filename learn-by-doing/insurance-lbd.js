/* ================= MAIN SCENARIO ================= */
function insuranceMain(option) {
  const feedback = document.getElementById("insurance-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Ignoring insurance exposes you to major financial shocks.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Understanding insurance helps you choose proper protection.</span>";
  } 
  else {
    feedback.innerHTML =
      "❌ <span class='wrong'>Insurance cannot be bought after risk occurs.</span>";
  }
}

/* ================= HELPER ================= */
function showInsuranceFeedback(btn, msg) {
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

function insurance1(o, b) {
  showInsuranceFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Insurance prevents savings from being wiped out.</span>"
      : "❌ <span class='wrong'>Paying or borrowing increases financial stress.</span>"
  );
}

function insurance2(o, b) {
  showInsuranceFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Policy terms determine claim approval.</span>"
      : "⚠️ <span class='warn'>Lack of understanding may cause claim issues.</span>"
  );
}

function insurance3(o, b) {
  showInsuranceFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Balanced coverage ensures real protection.</span>"
      : "❌ <span class='wrong'>Cheap plans may fail when needed most.</span>"
  );
}

function insurance4(o, b) {
  showInsuranceFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Timely renewal keeps protection active.</span>"
      : "❌ <span class='wrong'>Expired insurance leaves you unprotected.</span>"
  );
}
