document.addEventListener('DOMContentLoaded', function() {
    // Counter for image numbering
    let imageCounter = 1;
    
    // Replace regular img elements
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        // Skip logo.png - keep the first logo on each page
        // Check if the image is inside the hero carousel OR .rodzaje-gallery
        if (
            (img.src.includes('logo.png') && imageCounter === 1) || 
            img.closest('.hero-carousel') ||
            img.closest('.rodzaje-gallery')
        ) {
            // If it's the first logo OR inside the hero carousel OR .rodzaje-gallery, skip it
            // Increment counter only for the logo if it's not part of other excluded sections, to maintain unique placeholder numbers for other images.
            if (img.src.includes('logo.png') && !img.closest('.hero-carousel') && !img.closest('.rodzaje-gallery')) {
                 imageCounter++; 
            }
            return; // Skip replacement for logo, carousel images, and .rodzaje-gallery images
        }
        
        // Get original dimensions BEFORE replacing
        const originalWidth = img.offsetWidth;
        const originalHeight = img.offsetHeight;

        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.textContent = imageCounter.toString();
        
        // Apply original dimensions if available
        if (originalWidth > 0 && originalHeight > 0) {
            placeholder.style.width = `${originalWidth}px`;
            placeholder.style.height = `${originalHeight}px`;
        } else {
            // Fallback if dimensions aren't available (e.g., image not loaded yet)
            placeholder.style.width = '100%'; 
            placeholder.style.minHeight = '150px'; 
        }

        const parent = img.parentNode;
        parent.replaceChild(placeholder, img);
        
        imageCounter++;
    });
    
    // Replace background-image elements
    const bgElements = document.querySelectorAll('[style*="background-image"]');
    bgElements.forEach(function(el) {
        // Add the bg-image-placeholder class
        el.classList.add('bg-image-placeholder');
        
        // Set data attribute to store the original background
        const originalBg = el.style.backgroundImage;
        el.setAttribute('data-original-bg', originalBg);
        
        // Clear the background image
        el.style.backgroundImage = 'none';
        
        // Add the number
        el.textContent = imageCounter.toString();
        
        imageCounter++;
    });
    
    // Set height for the main hero section if it exists
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.height = '400px';
    }
}); 