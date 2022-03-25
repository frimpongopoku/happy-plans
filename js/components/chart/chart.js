const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        }, ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

const canvas = document.getElementById("doughnut");
var data = {
    labels: ["She returns it ", "She keeps it"],
    datasets: [{
        fill: true,
        backgroundColor: ["rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        data: [5, 95],
        // Notice the borderColor
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: [2, 2],
    }, ],
};

var options = {
    title: {
        display: true,
        text: "What happens when you lend your favorite t-shirt to a girl ?",
        position: "top",
    },
    rotation: -0.7 * Math.PI,
};

// Chart declaration:
var doughnut = new Chart(canvas, {
    type: "pie",
    data: data,
    options: options,
});

// Fun Fact: I've lost exactly 3 of my favorite T-shirts and 2 hoodies this way :|