const fs = require('fs');
const path = require('path');

// Define source and destination paths
const templateDir = path.join(__dirname, 'Template');
const templateFiles = [
  path.join(templateDir, 'Odnowa Frontów Meblowych Warszawa_files'),
  path.join(templateDir, 'Rodzaje frontów – Odnowa Frontów Meblowych Warszawa_files'),
  path.join(templateDir, 'Kontakt – Odnowa Frontów Meblowych Warszawa_files')
];
const imgDir = path.join(__dirname, 'img');

// Define missing images 
const missingImages = [
  'front-drewniane.jpg',
  'front-fornirowane.jpg',
  'front-frezowane-oklejone.jpg',
  'inspiracja-front-1.jpg',
  'inspiracja-front-2.jpg',
  'inspiracja-front-3.jpg',
  'inspiracja-front-4.jpg',
  'techniki-renowacji-1.jpg',
  'wymiana-frontow-1.jpg'
];

// Manual image mapping for tricky filenames
const manualMapping = {
  'Zrzut-ekranu-2024-11-18-o-19.36.44': 'front-drewniane.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.35.03': 'front-fornirowane.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.31.31': 'front-frezowane-oklejone.jpg',
  'Zrzut-ekranu-2024-10-27': 'inspiracja-front-1.jpg',
  'WhatsApp-Image-2024-11-18-at-19.59.07': 'inspiracja-front-2.jpg',
  'WhatsApp-Image-2024-11-18-at-20.00.53': 'inspiracja-front-3.jpg',
  'WhatsApp-Image-2024-12-02': 'inspiracja-front-4.jpg',
  'Zrzut-ekranu-2024-11-20-o-15.37.07': 'techniki-renowacji-1.jpg',
  'Zrzut-ekranu-2024-11-20-o-10.41.35': 'wymiana-frontow-1.jpg'
};

// Function to find and copy missing images
function fixMissingImages() {
  console.log('Starting to fix missing images...');
  
  // Find all image files in template directories
  let allTemplateImages = [];
  
  // Gather all image files from template directories
  templateFiles.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          allTemplateImages.push({
            path: path.join(dir, file),
            name: file
          });
        }
      });
    }
  });
  
  console.log(`Found ${allTemplateImages.length} images in template directories`);
  
  // Process missing images
  let fixedCount = 0;
  
  missingImages.forEach(missingImg => {
    // Check if file is under 1KB (placeholder SVG)
    const imgPath = path.join(imgDir, missingImg);
    if (!fs.existsSync(imgPath) || fs.statSync(imgPath).size < 1024) {
      console.log(`Need to fix: ${missingImg}`);
      
      // Find a suitable replacement
      let foundReplacement = false;
      
      // Try the manual mapping first
      for (const [partialName, targetName] of Object.entries(manualMapping)) {
        if (targetName === missingImg) {
          // Look for an image containing this partial name
          const matches = allTemplateImages.filter(img => 
            img.name.includes(partialName)
          );
          
          if (matches.length > 0) {
            // Use the first match (largest file typically)
            const largestMatch = matches.sort((a, b) => 
              fs.statSync(b.path).size - fs.statSync(a.path).size
            )[0];
            
            try {
              fs.copyFileSync(largestMatch.path, imgPath);
              console.log(`Fixed: ${missingImg} using ${largestMatch.name}`);
              fixedCount++;
              foundReplacement = true;
              break;
            } catch (err) {
              console.error(`Error copying file: ${err.message}`);
            }
          }
        }
      }
      
      if (!foundReplacement) {
        console.log(`Could not find a replacement for ${missingImg}`);
      }
    }
  });
  
  console.log(`\nFixed ${fixedCount} missing images.`);
  console.log('Image fixing completed!');
}

// Execute the function
fixMissingImages(); 