document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const galleryItems = document.querySelectorAll('.rodzaje-item');
    const lightbox = document.querySelector('.rodzaje-lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const totalImages = galleryItems.length;
    
    // Function to open lightbox
    function openLightbox(index) {
        currentIndex = index;
        const imgSrc = galleryItems[index].querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    }
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
    }
    
    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
    }
    
    // Add click event to gallery items
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            openLightbox(index);
        });
    });
    
    // Close lightbox when clicking close button
    closeBtn.addEventListener('click', closeLightbox);
    
    // Navigate through images with prev/next buttons
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}); 