function calculateSIP() {

    // Get input values
    let monthlyInvestment = Number(document.getElementById("sip").value);
    let annualRate = Number(document.getElementById("rate").value);
    let years = Number(document.getElementById("years").value);

    // Convert annual rate to monthly
    let monthlyRate = annualRate / 12 / 100;
    let months = years * 12;

    // SIP Formula
    let finalValue =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

    let invested = monthlyInvestment * months;
    let gain = finalValue - invested;

    // Display results
    document.getElementById("invested").innerText = invested.toFixed(0);
    document.getElementById("final").innerText = finalValue.toFixed(0);
    document.getElementById("gain").innerText = gain.toFixed(0);
}
