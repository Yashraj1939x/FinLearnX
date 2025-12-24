let chart;

function calculateBudget() {

    let income = Number(document.getElementById("income").value);

    let rent = Number(document.getElementById("rent").value);
    let food = Number(document.getElementById("food").value);
    let transport = Number(document.getElementById("transport").value);
    let others = Number(document.getElementById("others").value);

    let totalExpenses = rent + food + transport + others;
    let savings = income - totalExpenses;

    document.getElementById("expenses").innerText = totalExpenses;
    document.getElementById("savings").innerText = savings;

    let statusText = "";
    if (savings > 0) {
        statusText = "Good 👍 You are saving money";
    } else if (savings === 0) {
        statusText = "Break-even ⚠️ No savings";
    } else {
        statusText = "Overspending ❌ Reduce expenses";
    }

    document.getElementById("status").innerText = statusText;

    drawChart(rent, food, transport, others);
}

function drawChart(rent, food, transport, others) {

    let ctx = document.getElementById("budgetChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Rent", "Food", "Transport", "Others"],
            datasets: [{
                data: [rent, food, transport, others]
            }]
        },
        options: {
            responsive: true
        }
    });
}
