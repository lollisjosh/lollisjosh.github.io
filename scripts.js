// Load the header
document.addEventListener("DOMContentLoaded", function() {
    // Fetch the header and insert it into the placeholder
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            
            // Attach the hamburger menu toggle functionality after header is loaded
            document.getElementById("mobile-menu").addEventListener("click", function() {
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
});