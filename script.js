document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. MOBILE MENU TOGGLE & OUTSIDE CLICK
    ========================================= */
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {
        // Toggle mobile menu
        menuBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            navMenu.classList.toggle("active");
        });

        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll("a");
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
            });
        });

        // Close menu when clicking anywhere outside
        document.addEventListener("click", function (e) {
            if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                navMenu.classList.remove("active");
            }
        });
    }

    /* =========================================
       2. WHATSAPP BOOKING FORM
    ========================================= */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Twin Sparrow Events WhatsApp Number
            const whatsappNumber = "918072119975";

            // Form values with fallbacks
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const eventType = document.getElementById("event").value.trim() || "Not specified";
            const date = document.getElementById("date").value || "Not specified";
            const selectedPackage = document.getElementById("package").value || "Not selected";
            const message = document.getElementById("message").value.trim() || "None";

            const whatsappMessage = 
`Hello Twin Sparrow Events! 👋

I would like to enquire about your DJ & Event services.

*Client Details:*
• Name: ${name}
• Phone: ${phone}

*Event Details:*
• Event Type: ${eventType}
• Event Date: ${date}
• Package: ${selectedPackage}

*Message:*
${message}

Thank you!`;

            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            // Open WhatsApp chat in new tab
            window.open(url, "_blank");
        });
    }
});
// Hero Carousel - Auto Image Slider
const slides = document.querySelectorAll('.hero-slider .slide');

if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 3000; // 3 வினாடிகளுக்கு ஒரு முறை மாறும்

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, slideInterval);
}


/* =========================================
   STATS NUMBER COUNT-UP ANIMATION
========================================= */
const statsSection = document.getElementById("stats");
const counters = document.querySelectorAll(".counter");
let animated = false;

if (statsSection && counters.length > 0) {
    const startCountAnimation = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const suffix = counter.getAttribute("data-suffix") || "";
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                // Ease-out curve for smooth finish
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeProgress * target);

                counter.innerText = currentVal + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + suffix;
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    // Trigger only when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                startCountAnimation();
                animated = true;
            }
        });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
}

/* =========================================
   GALLERY TAB SWITCHING & LIGHTBOX MODAL
========================================= */
// 1. Tab Switching Logic
const tabButtons = document.querySelectorAll(".gallery-tabs .tab-btn");
const tabContents = document.querySelectorAll(".gallery-tab-content");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        const selectedTab = btn.getAttribute("data-tab");
        const targetContent = document.getElementById(`${selectedTab}-content`);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    });
});

// 2. Lightbox Fullscreen Functions
window.openLightbox = function (imgSrc) {
    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("lightboxImg");
    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // background scroll lock
    }
};

window.closeLightbox = function (event) {
    // modal அல்லது close பட்டனை கிளிக் செய்தால் மட்டுமே மூடும்
    if (event.target.id === "lightboxModal" || event.target.classList.contains("lightbox-close")) {
        const modal = document.getElementById("lightboxModal");
        if (modal) {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }
    }
};