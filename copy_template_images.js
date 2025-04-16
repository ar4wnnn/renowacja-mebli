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

// Image mapping - map template filenames to our required filenames
const imageMapping = {
  // Front types
  'mdf1.jpg': 'front-gladkie-lakierowane.jpg',
  'fronty-foliowane.jpeg': 'front-gladkie-oklejone.jpg',
  '306-370-c-aranzacja-kuchni-z-granatowymi-frontami.png': 'front-gladkie-pochwyt.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.35.48-1024x766.png': 'front-frezowane-lakierowane.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.31.31-1-1024x765.png': 'front-frezowane-oklejone.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.36.44-945x1024.png': 'front-drewniane.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.35.03-1-1024x763.png': 'front-fornirowane.jpg',
  
  // Examples
  'WhatsApp-Image-2024-11-18-at-19.59.07-768x1024.jpeg': 'example-1.jpg',
  'WhatsApp-Image-2024-11-18-at-19.59.07-1-1024x768.jpeg': 'example-2.jpg',
  'WhatsApp-Image-2024-11-18-at-19.59.07-3-768x1024.jpeg': 'example-3.jpg',
  'WhatsApp-Image-2024-11-18-at-20.00.53-1024x768.jpeg': 'example-4.jpg',
  
  // Realizations
  'c6c6fc414b679d63cb2fadc1d278.jpeg': 'realizacja-1.jpg',
  'unnamed.jpg': 'realizacja-2.jpg',
  'unnamed-1.jpg': 'realizacja-3.jpg',
  'blog2-1024x684.jpg': 'realizacja-4.jpg',
  
  // Furniture realizations
  'IMG_5806aaa.jpg': 'realizacja-meble-1.jpg',
  'image000000-768x1024.jpg': 'realizacja-meble-2.jpg',
  '20190531_093819-e1570354552972-498x1024.jpg': 'realizacja-meble-3.jpg',
  'Zrzut-ekranu-2024-11-20-o-10.41.35-768x1024.png': 'realizacja-meble-4.jpg',
  'Zrzut-ekranu-2024-11-20-o-10.42.56-1024x749.png': 'realizacja-meble-5.jpg',
  'Zrzut-ekranu-2024-11-20-o-15.37.07.png': 'realizacja-meble-6.jpg',
  
  // Hero and others
  'Zrzut-ekranu-2024-11-18-o-16.20.36.png': 'hero-bg.jpg',
  'dzialalnosc-black-star-studio-warszawa-img-1-kopia.png': 'odnowa-frontow-1.jpg',
  'Zrzut-ekranu-2024-10-27-o-08.18.31.png': 'meble-na-wymiar-1.jpg',
  'Zrzut-ekranu-2024-10-23-o-14.54.12-55-55.png': 'materialy-meble-1.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.47.24-983x1024.png': 'renowacja-mebli-1.jpg',
  
  // Renovation realizations
  'WhatsApp-Image-2024-12-02-at-13.07.40-768x1024.jpeg': 'renowacja-realizacja-1.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.35.03-1-1024x763.png': 'renowacja-realizacja-2.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.36.44-945x1024.png': 'renowacja-realizacja-3.jpg',
  'Zrzut-ekranu-2024-11-18-o-19.31.31-1-1024x765.png': 'renowacja-realizacja-4.jpg'
};

// Function to find and copy images
function copyImages() {
  console.log('Starting image copying process...');
  
  // Create img directory if it doesn't exist
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
    console.log(`Created directory: ${imgDir}`);
  }
  
  // Track found images
  const foundImages = new Set();
  
  // Search for images in template directories
  templateFiles.forEach(templateDir => {
    if (!fs.existsSync(templateDir)) {
      console.log(`Template directory not found: ${templateDir}`);
      return;
    }
    
    const files = fs.readdirSync(templateDir);
    
    files.forEach(fileName => {
      // Check if this file is in our mapping
      Object.keys(imageMapping).forEach(sourceFileName => {
        if (fileName.includes(sourceFileName)) {
          const sourcePath = path.join(templateDir, fileName);
          const destPath = path.join(imgDir, imageMapping[sourceFileName]);
          
          try {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied: ${sourcePath} -> ${destPath}`);
            foundImages.add(sourceFileName);
          } catch (err) {
            console.error(`Error copying ${sourcePath}: ${err.message}`);
          }
        }
      });
    });
  });
  
  // Check for missing images
  const missingImages = Object.keys(imageMapping).filter(img => !foundImages.has(img));
  if (missingImages.length > 0) {
    console.log('\nWarning: The following images were not found:');
    missingImages.forEach(img => {
      console.log(`- ${img} (needed for ${imageMapping[img]})`);
    });
  }
  
  console.log('\nImage copying completed!');
}

// Execute the main function
copyImages(); 