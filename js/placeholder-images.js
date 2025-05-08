document.addEventListener('DOMContentLoaded', function() {
    // Counter for image numbering
    let imageCounter = 1;
    
    // Replace regular img elements
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        // Skip logo.png - keep the first logo on each page
        // Check if the image is inside the hero carousel
        if ((img.src.includes('logo.png') && imageCounter === 1) || img.closest('.hero-carousel')) {
            // If it's the first logo OR inside the hero carousel, skip it
            // We might still increment the counter for the logo if needed elsewhere, but not for carousel
            if (img.src.includes('logo.png')) {
                 imageCounter++; // Increment only for the logo if necessary
            }
            return; // Skip replacement for logo and carousel images
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
            // You might still need some default CSS size in this case
            placeholder.style.width = '100%'; // Or a default width
            placeholder.style.minHeight = '150px'; // Smaller default min-height
        }

        // Get parent and replace the image with placeholder
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