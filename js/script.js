// Main JavaScript file for Renowacja Mebli Kuchennych

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const setupMobileMenu = () => {
        // Add mobile menu functionality if needed in the future
    };

    // File upload handling
    const setupFileUpload = () => {
        const fileInput = document.querySelector('.file-upload input[type="file"]');
        const fileLabel = document.querySelector('.file-upload label');
        const fileHint = document.querySelector('.file-hint');

        if (fileInput && fileLabel && fileHint) {
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                    fileHint.textContent = `Wybrane pliki: ${fileNames}`;
                    fileLabel.style.color = 'var(--accent-color)';
                } else {
                    fileHint.textContent = 'Upload a file or drag and drop. jpg, jpeg, jpe, png, gif up to 10MB';
                    fileLabel.style.color = 'var(--primary-color)';
                }
            });
        }
    };

    // Form validation
    const setupFormValidation = () => {
        const contactForm = document.querySelector('.contact-form form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const requiredFields = contactForm.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                // Email validation
                const emailField = contactForm.querySelector('input[type="email"]');
                if (emailField && emailField.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(emailField.value.trim())) {
                        isValid = false;
                        emailField.classList.add('error');
                    }
                }
                
                if (isValid) {
                    // In a real implementation, you would submit the form data here
                    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                    contactForm.reset();
                } else {
                    alert('Proszę wypełnić wszystkie wymagane pola poprawnie.');
                }
            });
        }
    };

    // Smooth scroll for navigation links
    const setupSmoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };

    // Initialize image gallery for examples section
    const setupGallery = () => {
        // This would be implemented if we had actual gallery images
        // For now, just a placeholder for future implementation
    };

    // Run all setup functions
    setupMobileMenu();
    setupFileUpload();
    setupFormValidation();
    setupSmoothScroll();
    setupGallery();
});

// Add some simple animations on scroll
window.addEventListener('scroll', function() {
    const animateElements = document.querySelectorAll('.step-box, .front-type, .contact-block');
    
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}); 