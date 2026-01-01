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
   PRACTICE SCENARIO FEEDBACK
========================= */

function scenario1(option, btn) {
  const feedback = createFeedback(btn);

  if (option === "A") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Reducing savings may give relief now, but weakens long-term habits.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Cutting non-essential spending is the smartest way to save.</span>";
  } 
  else if (option === "C") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Skipping savings repeatedly creates financial stress later.</span>";
  }
}

function scenario2(option, btn) {
  const feedback = createFeedback(btn);

  if (option === "A") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Treating wants as needs hides unnecessary spending.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Recognizing convenience as a want improves budgeting clarity.</span>";
  } 
  else if (option === "C") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Stopping tracking removes awareness of where money goes.</span>";
  }
}

function scenario3(option, btn) {
  const feedback = createFeedback(btn);

  if (option === "A") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Spending early income risks missing fixed payments.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Securing fixed expenses first keeps finances stable.</span>";
  } 
  else if (option === "C") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Avoiding spending completely is unrealistic and stressful.</span>";
  }
}

function scenario4(option, btn) {
  const feedback = createFeedback(btn);

  if (option === "A") {
    feedback.innerHTML =
      "✅ <span class='correct'>Savings exist to protect you during emergencies.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Borrowing helps temporarily but creates dependency.</span>";
  } 
  else if (option === "C") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Using credit for emergencies can trap you in debt.</span>";
  }
}

function scenario5(option, btn) {
  const feedback = createFeedback(btn);

  if (option === "A") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Discounts still cost money if they were not planned.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Checking budget before buying prevents impulse purchases.</span>";
  } 
  else if (option === "C") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Ignoring everything may cause missed planned needs.</span>";
  }
}

function scenario6(option, btn) {
  const feedback = createFeedback(btn);

  if (option === "A") {
    feedback.innerHTML =
      "❌ <span class='wrong'>Matching lifestyles beyond income leads to financial pressure.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Balancing enjoyment and budget builds confidence.</span>";
  } 
  else if (option === "C") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Avoiding social life is not a healthy financial solution.</span>";
  }
}


/* =========================
   HELPER FUNCTION
========================= */
function createFeedback(button) {
  const card = button.closest(".scenario-card");
  let feedback = card.querySelector(".feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "feedback";
    card.appendChild(feedback);
  }

  return feedback;
}
