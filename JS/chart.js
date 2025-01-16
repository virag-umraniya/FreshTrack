document.addEventListener("DOMContentLoaded", () => {
    // Waste Reduction Chart
    const wasteCtx = document.getElementById('wasteCanvas').getContext('2d');
    new Chart(wasteCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Waste Reduction (kg)',
                data: [10, 20, 15, 30],
                backgroundColor: 'rgba(76, 175, 80, 0.6)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Sales Insights Chart
    const salesCtx = document.getElementById('salesCanvas').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Sales Insights ($)',
                data: [500, 700, 600, 800],
                borderColor: 'rgba(56, 142, 60, 1)',
                backgroundColor: 'rgba(129, 199, 132, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
