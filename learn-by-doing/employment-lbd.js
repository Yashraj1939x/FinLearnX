/* ================= MAIN SCENARIO ================= */
function empMain(option) {
  const feedback = document.getElementById("emp-feedback");

  if (option === "A") {
    feedback.innerHTML =
      "⚠️ <span class='warn'>Quick decisions may hide important details.</span>";
  } 
  else if (option === "B") {
    feedback.innerHTML =
      "✅ <span class='correct'>Understanding terms helps you avoid future regret.</span>";
  } 
  else {
    feedback.innerHTML =
      "❌ <span class='wrong'>Salary alone does not define job quality.</span>";
  }
}

/* ================= HELPER ================= */
function showEmpFeedback(btn, msg) {
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

function emp1(o, b) {
  showEmpFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Understanding deductions builds realistic expectations.</span>"
      : "⚠️ <span class='warn'>CTC confusion is common among first-time employees.</span>"
  );
}

function emp2(o, b) {
  showEmpFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Reading terms protects your career freedom.</span>"
      : "❌ <span class='wrong'>Ignoring bonds can cause legal and financial trouble.</span>"
  );
}

function emp3(o, b) {
  showEmpFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Early planning builds lifelong financial habits.</span>"
      : "❌ <span class='wrong'>Unplanned spending delays financial growth.</span>"
  );
}

function emp4(o, b) {
  showEmpFeedback(
    b,
    o === "B"
      ? "✅ <span class='correct'>Thoughtful decisions lead to better career outcomes.</span>"
      : "⚠️ <span class='warn'>Frequent switches without clarity hurt stability.</span>"
  );
}
