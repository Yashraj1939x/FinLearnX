/* ================= MAIN SCENARIO ================= */
function creditMain(option) {
  const feedback = document.getElementById("credit-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Using full credit limit frequently lowers your credit score.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Low usage and timely payments build a strong credit profile.</span>";
  } 
  else {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Lack of tracking often leads to missed payments.</span>";
  }
}

/* ================= HELPER ================= */
function showCreditFeedback(btn, msg) {
  const card = btn.closest(".scenario-card");
  let feedback = card.querySelector(".feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "feedback";
    card.appendChild(feedback);
  }

  feedback.innerHTML = msg;
}

/* ================= SCENARIOS ================= */

function credit1(o, b) {
  showCreditFeedback(b,
    o === "B"
    ? "✅ <span class='correct'>Keeping utilization below 30% improves credit score.</span>"
    : "❌ <span class='wrong'>High utilization signals financial stress to lenders.</span>"
  );
}

function credit2(o, b) {
  showCreditFeedback(b,
    o === "B"
    ? "✅ <span class='correct'>Immediate payment reduces long-term damage.</span>"
    : "❌ <span class='wrong'>Missed payments severely impact credit score.</span>"
  );
}

function credit3(o, b) {
  showCreditFeedback(b,
    o === "B"
    ? "✅ <span class='correct'>Older accounts improve credit history length.</span>"
    : "⚠️ <span class='warn'>Closing old accounts can reduce credit score.</span>"
  );
}

function credit4(o, b) {
  showCreditFeedback(b,
    o === "B"
    ? "✅ <span class='correct'>Fewer applications mean fewer credit inquiries.</span>"
    : "❌ <span class='wrong'>Multiple inquiries reduce credit score temporarily.</span>"
  );
}

function credit5(o, b) {
  showCreditFeedback(b,
    o === "C"
    ? "✅ <span class='correct'>Paying full amount avoids interest and builds score.</span>"
    : "⚠️ <span class='warn'>Minimum payments increase interest burden.</span>"
  );
}
