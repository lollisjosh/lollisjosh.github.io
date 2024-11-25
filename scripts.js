

document.addEventListener("DOMContentLoaded", function () {

    //  // Dynamically load the locally hosted Accessibility Toolbar script
    //  const toolbarScript = document.createElement('script');
    //  toolbarScript.src = "/acctoolbar.min.js"; // Update the path to where you stored the script
    //  toolbarScript.onload = function () {
    //      // Initialize the Accessibility Toolbar once the script has loaded
    //      window.micAccessTool = new MicAccessTool({
    //          link: 'http://your-awesome-website.com/your-accessibility-declaration.pdf', // Update with your link
    //          contact: 'lollisjosh@csu.fullerton.edu', // Update with your contact email
    //          buttonPosition: 'right', // Change to 'left' if preferred
    //          forceLang: 'en' // Options: 'en', 'he-IL', 'ru-RU', 'fr_FR'
    //      });
    //  };
    //  toolbarScript.onerror = function () {
    //      console.error("Failed to load the Accessibility Toolbar script.");
    //  };

    
    // Load bio section
    fetch("/bio.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#bio-placeholder").innerHTML = data;
        })
        .catch(err => console.error("Error loading bio section:", err));



    document.querySelectorAll('.carousel-images img').forEach(img => {
        img.addEventListener('click', () => {
            window.open(img.getAttribute('data-full-res'), '_blank');
        });
    });

    // Carousel functionality
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;

    // Function to show the previous image
    function prevImage() {
        currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
        updateCarousel();
    }

    // Function to show the next image
    function nextImage() {
        currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }

    // Function to update the carousel display
    function updateCarousel() {
        const carouselImages = document.querySelector('.carousel-images');
        const imageWidth = carouselImages.querySelector('img').offsetWidth; // Get the width of one image
        carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`; // Use pixel values
    }

    // Attach event listeners to buttons after DOM content is loaded
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevImage);
        nextButton.addEventListener('click', nextImage);
    } else {
        console.error('Carousel buttons not found.');
    }

    // Optional: Automatically cycle through images every 10 seconds
    setInterval(nextImage, 10000); // Adjust the interval as needed

    // document.head.appendChild(toolbarScript);
    // Load the header and insert it into the placeholder
    // In scripts.js, modify your header fetch section:
fetch("/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;

        // Calculate header height AFTER header is loaded
        const navbar = document.getElementById('navbar');
        const headerHeight = navbar.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        
        // Update on window resize
        window.addEventListener('resize', () => {
            const headerHeight = navbar.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        });

        // Attach the hamburger menu toggle functionality 
        const menuButton = document.getElementById("mobile-menu");
        const navbarMenu = document.querySelector(".header-list");

        if (menuButton && navbarMenu) {
            menuButton.addEventListener("click", function () {
                navbarMenu.classList.toggle("active");
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



    // // Load the footer
    // fetch("footer.html")
    //     .then(response => response.text())
    //     .then(data => {
    //         document.getElementById("footer-placeholder").innerHTML = data;
    //     });

    // Load WakaTime data for "Past 30 Days"
    fetch('https://wakatime.com/share/@telloviz/e49e51a9-de2a-4db3-aa66-877d02a49ec1.json')
        .then(response => response.json())
        .then(data => {
            const labels = data.data.map(lang => lang.name);
            const dataValues = data.data.map(lang => lang.percent);
            const backgroundColors = data.data.map(lang => lang.color);
            const timeSpent = data.data.map(lang => lang.text); // Time spent on each language

            // Initialize the "Past 30 Days" chart
            const ctx30Days = document.getElementById('desktop-wakatime30DayLangChart').getContext('2d');
            new Chart(ctx30Days, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataValues,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    let index = context.dataIndex; // Get the index of the current segment
                                    let time = timeSpent[index];  // Get the time spent on that language
                                    if (label) {
                                        label += ': ';
                                    }
                                    // Display both percentage and time
                                    label += context.raw.toFixed(2) + '%'; // Show percentage
                                    label += ' (' + time + ')'; // Append time spent
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching WakaTime data for 30 Days:', error));

        fetch('https://wakatime.com/share/@telloviz/e49e51a9-de2a-4db3-aa66-877d02a49ec1.json')
        .then(response => response.json())
        .then(data => {
            const labels = data.data.map(lang => lang.name);
            const dataValues = data.data.map(lang => lang.percent);
            const backgroundColors = data.data.map(lang => lang.color);
            const timeSpent = data.data.map(lang => lang.text); // Time spent on each language

            // Initialize the "Past 30 Days" chart
            const ctx30Days = document.getElementById('mobile-wakatime30DayLangChart').getContext('2d');
            new Chart(ctx30Days, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataValues,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    let index = context.dataIndex; // Get the index of the current segment
                                    let time = timeSpent[index];  // Get the time spent on that language
                                    if (label) {
                                        label += ': ';
                                    }
                                    // Display both percentage and time
                                    label += context.raw.toFixed(2) + '%'; // Show percentage
                                    label += ' (' + time + ')'; // Append time spent
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching WakaTime data for 30 Days:', error));

    // Load WakaTime data for "All Time"
    fetch('https://wakatime.com/share/@telloviz/735e4f4d-0406-457a-a0e3-b376bf66fbb8.json')
        .then(response => response.json())
        .then(data => {
            const labels = data.data.map(lang => lang.name);
            const dataValues = data.data.map(lang => lang.percent);
            const backgroundColors = data.data.map(lang => lang.color);
            const timeSpent = data.data.map(lang => lang.text); // Time spent on each language

            // Initialize the "All Time" chart
            const ctxAllTime = document.getElementById('desktop-wakatimeAllTimeLangChart').getContext('2d');
            new Chart(ctxAllTime, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataValues,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    let index = context.dataIndex; // Get the index of the current segment
                                    let time = timeSpent[index];  // Get the time spent on that language
                                    if (label) {
                                        label += ': ';
                                    }
                                    // Display both percentage and time
                                    label += context.raw.toFixed(2) + '%'; // Show percentage
                                    label += ' (' + time + ')'; // Append time spent
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching WakaTime data for All Time:', error));

        // Load WakaTime data for "All Time"
    fetch('https://wakatime.com/share/@telloviz/735e4f4d-0406-457a-a0e3-b376bf66fbb8.json')
    .then(response => response.json())
    .then(data => {
        const labels = data.data.map(lang => lang.name);
        const dataValues = data.data.map(lang => lang.percent);
        const backgroundColors = data.data.map(lang => lang.color);
        const timeSpent = data.data.map(lang => lang.text); // Time spent on each language

        // Initialize the "All Time" chart
        const ctxAllTime = document.getElementById('mobile-wakatimeAllTimeLangChart').getContext('2d');
        new Chart(ctxAllTime, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: dataValues,
                    backgroundColor: backgroundColors,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                let index = context.dataIndex; // Get the index of the current segment
                                let time = timeSpent[index];  // Get the time spent on that language
                                if (label) {
                                    label += ': ';
                                }
                                // Display both percentage and time
                                label += context.raw.toFixed(2) + '%'; // Show percentage
                                label += ' (' + time + ')'; // Append time spent
                                return label;
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching WakaTime data for All Time:', error));

    // AJAX request to get Wakatime share data for Editors Used chart
    fetch('https://wakatime.com/share/@telloviz/e53a65a6-ccff-473b-8d17-cd1f8d291632.json')
        .then(response => response.json())
        .then(data => {
            const labels = data.data.map(item => item.name); // Get editor names
            const dataValues = data.data.map(item => item.percent); // Get percentage data
            const backgroundColors = data.data.map(item => item.color); // Get colors for each segment
            const timeSpent = data.data.map(item => item.text); // Get time spent for each editor

            // Initialize the "Editors Used" chart
            const ctx = document.getElementById('desktop-editorsUsedChart').getContext('2d'); // Assuming 'editorsUsedChart' is the ID of your canvas
            new Chart(ctx, {
                type: 'pie', // Pie chart type
                data: {
                    labels: labels, // Editor names as labels
                    datasets: [{
                        data: dataValues, // Percentage data
                        backgroundColor: backgroundColors, // Segment colors
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: false, // Optional: Set to 'true' to show the legend
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    let index = context.dataIndex; // Get the index of the current segment
                                    let time = timeSpent[index];  // Get the time spent on that editor
                                    if (label) {
                                        label += ': ';
                                    }
                                    // Display both percentage and time
                                    label += context.raw.toFixed(2) + '%'; // Show percentage
                                    label += ' (' + time + ')'; // Append time spent
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching editors used data:', error));

        // AJAX request to get Wakatime share data for Editors Used chart
    fetch('https://wakatime.com/share/@telloviz/e53a65a6-ccff-473b-8d17-cd1f8d291632.json')
    .then(response => response.json())
    .then(data => {
        const labels = data.data.map(item => item.name); // Get editor names
        const dataValues = data.data.map(item => item.percent); // Get percentage data
        const backgroundColors = data.data.map(item => item.color); // Get colors for each segment
        const timeSpent = data.data.map(item => item.text); // Get time spent for each editor

        // Initialize the "Editors Used" chart
        const ctx = document.getElementById('mobile-editorsUsedChart').getContext('2d'); // Assuming 'editorsUsedChart' is the ID of your canvas
        new Chart(ctx, {
            type: 'pie', // Pie chart type
            data: {
                labels: labels, // Editor names as labels
                datasets: [{
                    data: dataValues, // Percentage data
                    backgroundColor: backgroundColors, // Segment colors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        display: false, // Optional: Set to 'true' to show the legend
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                let index = context.dataIndex; // Get the index of the current segment
                                let time = timeSpent[index];  // Get the time spent on that editor
                                if (label) {
                                    label += ': ';
                                }
                                // Display both percentage and time
                                label += context.raw.toFixed(2) + '%'; // Show percentage
                                label += ' (' + time + ')'; // Append time spent
                                return label;
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching editors used data:', error));


    // AJAX request to get Wakatime share data for Editors Used chart
    fetch('https://wakatime.com/share/@telloviz/138147c5-aee1-43aa-82ac-934427b92c04.json')
        .then(response => response.json())
        .then(data => {
            const labels = data.data.map(item => item.name);
            const dataValues = data.data.map(item => item.percent);
            const backgroundColors = data.data.map(item => item.color);
            const timeSpent = data.data.map(item => item.text);

            const ctx = document.getElementById('desktop-editorChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataValues,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    let index = context.dataIndex;
                                    let time = timeSpent[index];
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += context.raw.toFixed(2) + '%';
                                    label += ' (' + time + ')';
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching editor data:', error));

        // AJAX request to get Wakatime share data for Editors Used chart
    fetch('https://wakatime.com/share/@telloviz/138147c5-aee1-43aa-82ac-934427b92c04.json')
    .then(response => response.json())
    .then(data => {
        const labels = data.data.map(item => item.name);
        const dataValues = data.data.map(item => item.percent);
        const backgroundColors = data.data.map(item => item.color);
        const timeSpent = data.data.map(item => item.text);

        const ctx = document.getElementById('mobile-editorChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: dataValues,
                    backgroundColor: backgroundColors,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                let index = context.dataIndex;
                                let time = timeSpent[index];
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw.toFixed(2) + '%';
                                label += ' (' + time + ')';
                                return label;
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching editor data:', error));




});
