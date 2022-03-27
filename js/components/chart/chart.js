// const ctx = document.getElementById("bar-chart");
// const myChart = new Chart(ctx, {
//     type: "bar",
//     data: {
//         labels: ["Deaths", "Cases", "Recoveries", "Critical"],
//         datasets: [{
//             label: "Number of people",
//             data: [12, 19, 3, 5],
//             backgroundColor: [
//                 "rgba(255, 99, 132, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(255, 206, 86, 0.2)",
//                 "rgba(75, 192, 192, 0.2)",
//                 // "rgba(153, 102, 255, 0.2)",
//                 // "rgba(255, 159, 64, 0.2)",
//             ],
//             borderColor: [
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(54, 162, 235, 1)",
//                 "rgba(255, 206, 86, 1)",
//                 "rgba(75, 192, 192, 1)",
//                 // "rgba(153, 102, 255, 1)",
//                 // "rgba(255, 159, 64, 1)",
//             ],
//             borderWidth: 1,
//         }, ],
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 title: {
//                     text: "Total Population",
//                     display: true,
//                 },
//             },
//         },
//     },
// });

// const canvas = document.getElementById("pie-chart");
// var data = {
//     labels: ["Active Cases", "Critical Cases", "Recovered"],
//     datasets: [{
//         fill: true,
//         backgroundColor: [
//             "rgba(255, 159, 64, 0.2)",
//             "rgba(255, 99, 132, 0.2)",
//             "rgba(75, 192, 192, 0.2)",
//         ],
//         data: [65, 10, 25],
//         // Notice the borderColor
//         borderColor: [
//             "rgba(255, 159, 64, 1)",
//             "rgba(255, 99, 132, 1)",
//             "rgba(75, 192, 192, 1)",
//         ],
//         borderWidth: 1,
//         hoverOffset: 6,
//     }, ],
// };

// var options = {
//     title: {
//         display: true,
//         text: "Total number of cases for COVID-19",
//         position: "top",
//     },
//     rotation: -0.7 * Math.PI,
// };

// var doughnut = new Chart(canvas, {
//     type: "pie",
//     data: data,
//     options: options,
// });

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