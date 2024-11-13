document.addEventListener("DOMContentLoaded", function () {
    // Load the header and insert it into the placeholder
    fetch("/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            // Attach the hamburger menu toggle functionality after header is loaded
            const menuButton = document.getElementById("mobile-menu");
            const navbarMenu = document.querySelector(".header-list"); // Adjust to .header-list

            if (menuButton && navbarMenu) {
                menuButton.addEventListener("click", function () {
                    navbarMenu.classList.toggle("active"); // Toggles the 'active' class
                });
            } else {
                console.error('Menu button or header list not found. Check IDs and classes.');
            }
        });

    // Load the footer
    fetch("/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });

    // Load the profile picture section
    fetch("pfp.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("pfp-placeholder").innerHTML = data;
        });
});
