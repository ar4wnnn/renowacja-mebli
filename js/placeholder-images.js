document.addEventListener('DOMContentLoaded', function() {
    // Counter for image numbering
    let imageCounter = 1;
    
    // Replace regular img elements
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        // Skip logo.png - keep the first logo on each page
        if (img.src.includes('logo.png') && imageCounter === 1) {
            imageCounter++;
            return;
        }
        
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.textContent = imageCounter.toString();
        
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