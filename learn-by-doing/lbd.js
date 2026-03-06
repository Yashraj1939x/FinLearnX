/* =========================
   MAIN SCENARIO
========================= */
function selectChoice(option) {
  const feedback = document.getElementById("feedback");

  if (option === "A") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Saving after spending rarely works because money gets exhausted first.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Saving first builds discipline and ensures your goals are met.</span>";
  } 
  else if (option === "C") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Managing money without a plan often leads to overspending.</span>";
  }
}


/* =========================
   PRACTICE SCENARIOS
========================= */

function showFeedback(button, message) {
  const card = button.closest(".scenario-card");

  let feedback = card.querySelector(".feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "feedback";
    card.appendChild(feedback);
  }

  feedback.innerHTML = message;
}

/* -------- Scenario 1 -------- */
function scenario1(option, btn) {
  if (option === "A") {
    showFeedback(btn,
      "⚠️ <span class='warn'>Reducing savings may help now, but it weakens long-term discipline.</span>");
  } 
  else if (option === "B") {
    showFeedback(btn,
      "✅ <span class='correct'>Cutting non-essential spending is the most effective solution.</span>");
  } 
  else {
    showFeedback(btn,
      "❌ <span class='wrong'>Ignoring savings repeatedly leads to financial stress.</span>");
  }
}

/* -------- Scenario 2 -------- */
function scenario2(option, btn) {
  if (option === "A") {
    showFeedback(btn,
      "❌ <span class='wrong'>Treating wants as needs hides unnecessary spending.</span>");
  } 
  else if (option === "B") {
    showFeedback(btn,
      "✅ <span class='correct'>Reclassifying wants improves budgeting clarity.</span>");
  } 
  else {
    showFeedback(btn,
      "⚠️ <span class='warn'>Stopping tracking removes awareness of spending.</span>");
  }
}

/* -------- Scenario 3 -------- */
function scenario3(option, btn) {
  if (option === "A") {
    showFeedback(btn,
      "❌ <span class='wrong'>Spending early income risks missing fixed payments.</span>");
  } 
  else if (option === "B") {
    showFeedback(btn,
      "✅ <span class='correct'>Handling fixed expenses first keeps finances stable.</span>");
  } 
  else {
    showFeedback(btn,
      "⚠️ <span class='warn'>Avoiding spending completely is unrealistic.</span>");
  }
}

/* -------- Scenario 4 -------- */
function scenario4(option, btn) {
  if (option === "A") {
    showFeedback(btn,
      "✅ <span class='correct'>Savings exist to protect you during emergencies.</span>");
  } 
  else if (option === "B") {
    showFeedback(btn,
      "⚠️ <span class='warn'>Borrowing helps temporarily but creates dependency.</span>");
  } 
  else {
    showFeedback(btn,
      "❌ <span class='wrong'>Using credit can trap you in long-term debt.</span>");
  }
}

/* -------- Scenario 5 -------- */
function scenario5(option, btn) {
  if (option === "A") {
    showFeedback(btn,
      "❌ <span class='wrong'>Unplanned discounts still damage your budget.</span>");
  } 
  else if (option === "B") {
    showFeedback(btn,
      "✅ <span class='correct'>Checking budget prevents impulse purchases.</span>");
  } 
  else {
    showFeedback(btn,
      "⚠️ <span class='warn'>Ignoring all sales may skip planned needs.</span>");
  }
}

/* -------- Scenario 6 -------- */
function scenario6(option, btn) {
  if (option === "A") {
    showFeedback(btn,
      "❌ <span class='wrong'>Matching others’ lifestyle creates financial pressure.</span>");
  } 
  else if (option === "B") {
    showFeedback(btn,
      "✅ <span class='correct'>Balancing fun and budget builds confidence.</span>");
  } 
  else {
    showFeedback(btn,
      "⚠️ <span class='warn'>Avoiding social life is not a healthy solution.</span>");
  }
}
