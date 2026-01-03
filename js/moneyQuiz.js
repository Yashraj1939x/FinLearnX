window.calculateScore = function () {
  const resultDiv = document.getElementById("result");

  const questions = ["q1", "q2", "q3", "q4", "q5"];
  let totalScore = 0;

  for (let q of questions) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (!selected) {
      alert("Please answer all questions");
      return;
    }
    totalScore += parseInt(selected.value);
  }

  let personality = "";
  let colorClass = "";
  let traits = "";

  if (totalScore <= 9) {
    personality = "Spender";
    colorClass = "spender";
    traits = `
      <h4>Traits Of Spender</h4>
      <ul>
        <li>Enjoys spending money</li>
        <li>Lives in the moment</li>
        <li>Trouble saving and planning</li>
        <li>Might struggle with debt</li>
      </ul>
    `;
  } else if (totalScore <= 14) {
    personality = "Balancer";
    colorClass = "balancer";
    traits = `
      <h4>Traits Of Balancer</h4>
      <ul>
        <li>Good at managing money</li>
        <li>Prone to indecision</li>
        <li>May miss out on good opportunities</li>
      </ul>
    `;
  } else if (totalScore <= 19) {
    personality = "Saver";
    colorClass = "saver";
    traits = `
      <h4>Traits Of Saver</h4>
      <ul>
        <li>Excellent at saving money</li>
        <li>May be frugal or rigid</li>
        <li>May neglect personal needs or wants</li>
        <li>Trouble sharing money with others</li>
      </ul>
    `;
  } else {
    personality = "Investor";
    colorClass = "investor";
    traits = `
      <h4>Traits Of Investor</h4>
      <ul>
        <li>Savvy and strategic</li>
        <li>Seeks to grow wealth and positive impact</li>
        <li>Adventurous and willing to take risks</li>
        <li>Sometimes optimistic or ignorant of risks</li>
      </ul>
    `;
  }

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h3 class="${colorClass}">You are a ${personality}</h3>
    <p class="score">Your Score: ${totalScore}</p>
    ${traits}
  `;

  resultDiv.scrollIntoView({ behavior: "smooth" });
};
