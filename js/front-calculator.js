document.addEventListener('DOMContentLoaded', function() {
    // Get all front-type elements and contact form elements
    const frontTypes = document.querySelectorAll('.front-type');
    const contactForm = document.querySelector('.contact-form form');
    const textarea = contactForm ? contactForm.querySelector('textarea') : null;
    
    // Function to calculate price
    function calculatePrice(area, pricePerUnit) {
        return (area * pricePerUnit).toFixed(2);
    }
    
    // Initialize front type tiles
    frontTypes.forEach(function(frontType) {
        const calculator = frontType.querySelector('.front-calculator');
        const input = frontType.querySelector('input.calc-input');
        const resultSpan = frontType.querySelector('.calculator-result span');
        const orderBtn = frontType.querySelector('.order-btn');
        const pricePerUnit = parseInt(frontType.getAttribute('data-price') || 400);
        
        // Toggle calculator when clicking on front-type
        frontType.addEventListener('click', function(e) {
            // Don't toggle if clicking inside calculator
            if (e.target.closest('.front-calculator') && !e.target.closest('.order-btn')) return;
            
            // Toggle active state
            frontTypes.forEach(item => {
                if (item !== frontType) {
                    item.classList.remove('active');
                }
            });
            
            frontType.classList.toggle('active');
        });
        
        // Calculate price on input change
        if (input) {
            input.addEventListener('input', function() {
                const area = parseFloat(this.value) || 0;
                const price = calculatePrice(area, pricePerUnit);
                resultSpan.textContent = price;
            });
        }
        
        // Handle order button click
        if (orderBtn && textarea) {
            orderBtn.addEventListener('click', function() {
                const area = parseFloat(input.value) || 0;
                if (area <= 0) {
                    alert('Proszę wprowadzić poprawną wartość m2!');
                    return;
                }
                
                // Scroll to contact form
                const contactSection = document.querySelector('.contact');
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Add text to the message area
                const frontTypeTitle = frontType.querySelector('h4').textContent;
                const frontTypeSubtitle = frontType.querySelector('p') ? frontType.querySelector('p').textContent : '';
                const price = calculatePrice(area, pricePerUnit);
                
                const message = `Zamówienie: ${frontTypeTitle} ${frontTypeSubtitle}\nIlość m2: ${area}\nSzacowany koszt: ${price} zł`;
                
                textarea.value = message;
                
                // Highlight textarea briefly
                textarea.classList.add('highlight');
                setTimeout(() => {
                    textarea.classList.remove('highlight');
                }, 2000);
            });
        }
    });
}); 