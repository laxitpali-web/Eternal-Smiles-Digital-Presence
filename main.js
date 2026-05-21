// Main JS Utilities for Eternal Smiles Dental Clinic

document.addEventListener("DOMContentLoaded", function () {
    // 1. Set Active Link in Navigation Bar
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav div.hidden a");
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.className = "text-label-md font-label-md text-secondary border-b-2 border-secondary font-bold transition-all duration-300";
        } else {
            link.className = "text-label-md font-label-md text-primary hover:text-secondary hover:-translate-y-0.5 transition-all duration-300";
        }
    });

    // 2. Mobile Menu Toggle
    const openMenuBtn = document.querySelector("button[aria-label='Open Menu']");
    if (openMenuBtn) {
        // Create Mobile Menu overlay dynamically to ensure it is shared across all pages
        const mobileMenuOverlay = document.createElement("div");
        mobileMenuOverlay.className = "fixed inset-0 bg-surface-navy/50 z-50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300";
        mobileMenuOverlay.innerHTML = `
            <div class="fixed top-0 right-0 h-full w-[280px] bg-background p-6 shadow-2xl flex flex-col gap-8 transition-transform duration-300 translate-x-full">
                <div class="flex justify-between items-center border-b pb-4">
                    <span class="text-headline-sm font-headline-sm font-bold text-primary">Menu</span>
                    <button aria-label="Close Menu" class="text-primary hover:text-secondary transition-colors">
                        <span class="material-symbols-outlined text-[28px]">close</span>
                    </button>
                </div>
                <div class="flex flex-col gap-6">
                    <a class="text-body-lg font-bold text-primary hover:text-secondary transition-colors" href="index.html">Home</a>
                    <a class="text-body-lg font-bold text-primary hover:text-secondary transition-colors" href="about.html">About</a>
                    <a class="text-body-lg font-bold text-primary hover:text-secondary transition-colors" href="services.html">Services</a>
                    <a class="text-body-lg font-bold text-primary hover:text-secondary transition-colors" href="gallery.html">Gallery</a>
                    <a class="text-body-lg font-bold text-primary hover:text-secondary transition-colors" href="reviews.html">Reviews</a>
                </div>
                <a href="book.html" class="mt-auto bg-surface-navy text-tertiary-fixed text-center py-4 rounded-full text-label-md font-bold hover:scale-105 transition-transform duration-300">
                    Book Appointment
                </a>
            </div>
        `;
        document.body.appendChild(mobileMenuOverlay);

        const drawer = mobileMenuOverlay.querySelector("div");
        const closeMenuBtn = mobileMenuOverlay.querySelector("button[aria-label='Close Menu']");

        // Highlight active link in mobile drawer
        const drawerLinks = mobileMenuOverlay.querySelectorAll("div.flex-col a");
        drawerLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === currentPath) {
                link.className = "text-body-lg font-bold text-secondary transition-colors";
            }
        });

        const openMobileMenu = () => {
            mobileMenuOverlay.classList.remove("pointer-events-none", "opacity-0");
            mobileMenuOverlay.classList.add("opacity-100");
            drawer.classList.remove("translate-x-full");
            drawer.classList.add("translate-x-0");
        };

        const closeMobileMenu = () => {
            mobileMenuOverlay.classList.add("pointer-events-none", "opacity-0");
            mobileMenuOverlay.classList.remove("opacity-100");
            drawer.classList.add("translate-x-full");
            drawer.classList.remove("translate-x-0");
        };

        openMenuBtn.addEventListener("click", openMobileMenu);
        closeMenuBtn.addEventListener("click", closeMobileMenu);
        mobileMenuOverlay.addEventListener("click", (e) => {
            if (e.target === mobileMenuOverlay) closeMobileMenu();
        });
    }

    // 3. Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((elem) => {
        observer.observe(elem);
    });

    // 4. Animate Numeric Counters
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute("data-target"), 10);
                let count = 0;
                const speed = 2000 / countTo; // 2 seconds duration
                const updateCount = () => {
                    const increment = Math.ceil(countTo / 100);
                    if (count < countTo) {
                        count += increment;
                        if (count > countTo) count = countTo;
                        target.innerText = count;
                        setTimeout(updateCount, speed);
                    } else {
                        target.innerText = countTo;
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".counter").forEach((counter) => {
        counterObserver.observe(counter);
    });

    // 5. Global Lightbox Modal Functions
    window.openLightbox = function (imageSrc) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightbox && lightboxImg) {
            lightboxImg.src = imageSrc;
            lightbox.style.display = 'flex';
            // Trigger animation frame for transition
            requestAnimationFrame(() => {
                lightbox.classList.add('show');
            });
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    };

    window.closeLightbox = function (event) {
        // If event is not provided or it's a click on the backdrop or close button
        if (!event || event.target.id === 'lightbox' || event.target.id === 'lightbox-close') {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            if (lightbox) {
                lightbox.classList.remove('show');
                // Wait for transition before hiding and clearing src
                setTimeout(() => {
                    lightbox.style.display = 'none';
                    if (lightboxImg) lightboxImg.src = '';
                }, 300);
                document.body.style.overflow = 'auto';
            }
        }
    };
});
