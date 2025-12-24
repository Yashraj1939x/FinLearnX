let chart;

function calculateEMI() {

    let principal = Number(document.getElementById("amount").value);
    let annualRate = Number(document.getElementById("rate").value);
    let years = Number(document.getElementById("years").value);

    let monthlyRate = annualRate / 12 / 100;
    let months = years * 12;

    // EMI Formula
    let emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    let totalPayment = emi * months;
    let interest = totalPayment - principal;

    document.getElementById("emi").innerText = emi.toFixed(0);
    document.getElementById("interest").innerText = interest.toFixed(0);
    document.getElementById("total").innerText = totalPayment.toFixed(0);

    drawChart(principal, interest);
}

function drawChart(principal, interest) {

    let ctx = document.getElementById("emiChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Principal Amount", "Total Interest"],
            datasets: [{
                data: [principal, interest]
            }]
        },
        options: {
            responsive: true
        }
    });
}
