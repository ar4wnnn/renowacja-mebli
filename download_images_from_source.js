const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Base URL of the website to scrape
const baseUrl = 'https://odnowafrontow.pl';

// Define the image mappings - placeholders to source URLs
const imageMap = {
  // Hero image
  'img/hero-bg.jpg': '/wp-content/uploads/2022/11/hero-kuchnia.jpg',
  
  // Cabinet front images
  'img/front-gladkie-lakierowane.jpg': '/wp-content/uploads/2022/11/gladkie-lakierowane.jpg',
  'img/front-gladkie-oklejone.jpg': '/wp-content/uploads/2022/11/gladkie-oklejone.jpg',
  'img/front-gladkie-pochwyt.jpg': '/wp-content/uploads/2022/11/gladkie-pochwyt.jpg',
  'img/front-frezowane-lakierowane.jpg': '/wp-content/uploads/2022/11/frezowane-lakierowane.jpg',
  'img/front-frezowane-oklejone.jpg': '/wp-content/uploads/2022/11/frezowane-oklejone.jpg',
  'img/front-drewniane.jpg': '/wp-content/uploads/2022/11/fronty-drewniane.jpg',
  'img/front-fornirowane.jpg': '/wp-content/uploads/2022/11/fronty-fornirowane.jpg',
  
  // Example images
  'img/example-1.jpg': '/wp-content/uploads/2022/11/realizacja-1.jpg',
  'img/example-2.jpg': '/wp-content/uploads/2022/11/realizacja-2.jpg',
  'img/example-3.jpg': '/wp-content/uploads/2022/11/realizacja-3.jpg',
  'img/example-4.jpg': '/wp-content/uploads/2022/11/realizacja-4.jpg',
  
  // Renovation example images
  'img/renowacja-realizacja-1.jpg': '/wp-content/uploads/2022/11/renowacja-mebli-1.jpg',
  'img/renowacja-realizacja-2.jpg': '/wp-content/uploads/2022/11/renowacja-mebli-2.jpg',
  'img/renowacja-realizacja-3.jpg': '/wp-content/uploads/2022/11/renowacja-mebli-3.jpg',
  'img/renowacja-realizacja-4.jpg': '/wp-content/uploads/2022/11/renowacja-mebli-4.jpg',
  
  // Additional images
  'img/odnowa-frontow-1.jpg': '/wp-content/uploads/2022/11/odnowa-frontow-1.jpg',
  'img/wymiana-frontow-1.jpg': '/wp-content/uploads/2022/11/wymiana-frontow-1.jpg',
  'img/meble-na-wymiar-1.jpg': '/wp-content/uploads/2022/11/meble-na-wymiar-1.jpg',
  'img/renowacja-mebli-1.jpg': '/wp-content/uploads/2022/11/renowacja-mebli-main.jpg',
  'img/materialy-meble-1.jpg': '/wp-content/uploads/2022/11/materialy-meble-1.jpg',
  'img/techniki-renowacji-1.jpg': '/wp-content/uploads/2022/11/techniki-renowacji-1.jpg'
};

// Function to download an image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Download file
    const file = fs.createWriteStream(filepath);
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        file.close();
        fs.unlink(filepath, () => {}); // Delete the file placeholder on error
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Function to download all images
async function downloadAllImages() {
  const tasks = [];
  
  // Process each image mapping
  for (const [localPath, remotePath] of Object.entries(imageMap)) {
    const url = new URL(remotePath, baseUrl).toString();
    tasks.push(downloadImage(url, localPath));
  }
  
  // Wait for all downloads to complete
  try {
    await Promise.all(tasks);
    console.log('All images downloaded successfully');
  } catch (error) {
    console.error('Error downloading images:', error.message);
  }
}

// Create additional image mapping for realizacja-meble and inspiracja-front
function createAdditionalImageMapping() {
  // Add realizacja-meble images (custom mapping)
  for (let i = 1; i <= 6; i++) {
    imageMap[`img/realizacja-meble-${i}.jpg`] = `/wp-content/uploads/2022/11/realizacja-meble-${i}.jpg`;
  }
  
  // Add inspiracja-front images
  for (let i = 1; i <= 4; i++) {
    imageMap[`img/inspiracja-front-${i}.jpg`] = `/wp-content/uploads/2022/11/inspiracja-front-${i}.jpg`;
  }
  
  // Add realizacja images (if different from example)
  for (let i = 1; i <= 4; i++) {
    imageMap[`img/realizacja-${i}.jpg`] = `/wp-content/uploads/2022/11/realizacja-${i}.jpg`;
  }
}

// Main function
async function main() {
  try {
    // Add more image mappings
    createAdditionalImageMapping();
    
    console.log(`Starting to download ${Object.keys(imageMap).length} images...`);
    await downloadAllImages();
    
    console.log('Now running update_real_images.js to update references...');
    
    // After downloading, run the script to update references
    require('./update_real_images.js');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the main function
main(); 