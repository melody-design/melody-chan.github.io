// Page fade transitions and main functionality
document.addEventListener("DOMContentLoaded", function() {
    // Initialize page fade-in
    document.body.classList.add("fade-in");

    // Initialize page transitions
    initPageTransitions();

    // Initialize back to top button
    initBackToTop();

    // Initialize contact form
    initContactForm();

    // Initialize lazy loading
    initLazyLoading();
});

// Page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        // Only handle internal links
        if (link.hostname === window.location.hostname && !link.hasAttribute('data-lightbox')) {
            link.addEventListener("click", function(e) {
                const href = this.getAttribute('href');

                // Skip if it's an anchor link, mailto, tel, or external
                if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || 
                    href.startsWith('http') || this.hasAttribute('target')) {
                    return;
                }

                e.preventDefault();

                // Add leaving class
                document.body.classList.add("is-leaving");

                // Navigate after transition
                setTimeout(() => {
                    window.location = href;
                }, 300);
            });
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById("backToTop");

    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 400) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById("contactForm");
    const toast = document.getElementById("toast");

    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm(form)) {
            return;
        }

        // Show success toast
        if (toast) {
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
                // Trigger mailto after toast
                form.submit();
            }, 1500);
        } else {
            // Fallback if no toast
            form.submit();
        }
    });
}

// Form validation
function validateForm(form) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    let isValid = true;

    // Reset previous error states
    [name, email, message].forEach(field => {
        field.style.borderColor = '';
    });

    // Validate name
    if (!name.value.trim()) {
        name.style.borderColor = '#e74c3c';
        name.focus();
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
        email.style.borderColor = '#e74c3c';
        if (isValid) email.focus();
        isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
        message.style.borderColor = '#e74c3c';
        if (isValid) message.focus();
        isValid = false;
    }

    return isValid;
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Add any resize handling here
}, 250));