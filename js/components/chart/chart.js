export const generateBarGraphData = (graphData) => {
    const { cases, tests, deaths, country, population } = graphData || {};
    return {
        type: "bar",
        data: {
            labels: ["Deaths", "Cases", "Recoveries", "Critical", "Active", "Tested"],
            datasets: [{
                label: "Number of people",
                data: [
                    Number(deaths.total),
                    Number(cases.total),
                    Number(cases.recovered),
                    Number(cases.critical),
                    Number(cases.active),
                    Number(tests.total),
                ],
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
                    title: {
                        text: "Total Population of " + country || "...",
                        display: true,
                    },
                    max: Number(population),
                },
            },
        },
    };
};

export const generatePieChartData = (graphData) => {
    const { cases } = graphData || {};

    return {
        type: "pie",
        data: {
            labels: ["Active Cases", "Critical Cases", "Recovered"],
            datasets: [{
                fill: true,
                backgroundColor: [
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                data: [Number(cases.active), Number(cases.critical), Number(cases.recovered)],

                borderColor: [
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
                hoverOffset: 4,
            }, ],
        },
        options: {
            title: {
                display: true,
                text: "Summary of COVID-19 Cases",
                position: "top",
            },
            rotation: -0.7 * Math.PI,
        },
    };
};