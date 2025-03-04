// Countdown Timer
const targetDate = new Date("Jan 10, 2025 00:00:00").getTime();

const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeLeft < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);

// Hamburger Menu Toggle (Mobile)
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.navbar-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Toggle navigation visibility on hamburger click
    menuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active'); // Optional: Toggle button active state for styling
    });
});

// Function to handle active link highlighting
function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-right .nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if section is in view
        if (window.scrollY >= sectionTop - sectionHeight / 3 && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Remove active class from all links and add to the one corresponding to the current section
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active link highlighting
window.addEventListener('scroll', setActiveLink);
setActiveLink();  // Call on page load to highlight the correct link initially

// Intersection Observer for fade-in effect on sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.navbar-right .nav-links a[href="#${id}"]`);

        if (entry.isIntersecting) {
            // Add hover-active when section is in view
            navLink.classList.add('hover-active');
        } else {
            // Remove hover-active when section is not in view
            navLink.classList.remove('hover-active');
        }
    });
}, { threshold: 0.5 }); // Section needs to be 50% visible

// Observe each section
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section); // Observe all sections
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,  // Offset for fixed navbar (adjust as necessary)
                behavior: 'smooth'
            });
        }
    });
});
