document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-carousel .carousel-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Time in ms for each slide

    if (slides.length > 0) {
        slides[currentSlide].classList.add('active');

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }
}); 