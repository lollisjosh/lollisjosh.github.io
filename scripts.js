// Load the header
document.addEventListener("DOMContentLoaded", function () {
    // Fetch the header and insert it into the placeholder
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            // Attach the hamburger menu toggle functionality after header is loaded
            document.getElementById("mobile-menu").addEventListener("click", function () {
                const navbar = document.getElementById("navbar").querySelector("ul");
                navbar.classList.toggle("active");
            });
        });

    // Load the footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });

    fetch("pfp.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("pfp-placeholder").innerHTML = data;
        });

    const menuToggle = document.getElementById("mobile-menu");
    const navbar = document.getElementById("navbar").querySelector("ul");

    // Ensure the event listener is attached to the menu toggle
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active"); // This adds or removes the 'active' class
    });


    // Load the barchart
    fetch("barchart.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("barchart-placeholder").innerHTML = data;
            renderBarChart(); // Call the function to render the chart
        });

    // Function to render the bar chart
    function renderBarChart() {
        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Top Oil Reserves"
            },
            data: [
                {
                    type: "column", // Change to "bar" for a horizontal bar chart
                    dataPoints: [
                        { x: 1, y: 297571, label: "Venezuela" },
                        { x: 2, y: 267017, label: "Saudi" },
                        { x: 3, y: 175200, label: "Canada" },
                        { x: 4, y: 154580, label: "Iran" },
                        { x: 5, y: 116000, label: "Russia" },
                        { x: 6, y: 97800, label: "UAE" },
                        { x: 7, y: 20682, label: "US" },
                        { x: 8, y: 20350, label: "China" }
                    ]
                }
            ]
        });

        chart.render(); // Render the chart
    }
});