const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Base URL of the website to scrape
const baseUrl = 'https://odnowafrontow.pl';

// List of missing images to try alternative URLs
const missingImages = {
  'img/renowacja-mebli-1.jpg': '/wp-content/uploads/2022/11/renowacja-mebli-1.jpg',
  'img/techniki-renowacji-1.jpg': '/wp-content/uploads/2022/11/techniki-renowacji.jpg',
  'img/renowacja-realizacja-3.jpg': '/wp-content/uploads/2022/11/renowacja-realizacja-3.jpg',
  'img/renowacja-realizacja-4.jpg': '/wp-content/uploads/2022/11/renowacja-realizacja-4.jpg'
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

// Function to manually fix any HTML files where SVG references remain
function updateHtmlFiles() {
  const htmlFiles = [
    'index.html',
    'odnowa-i-wymiana-frontow.html',
    'meble-na-wymiar.html',
    'renowacja-mebli.html',
    'rodzaje-frontow.html',
    'kontakt.html'
  ];
  
  htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;
    
    // Replace any remaining .svg references with .jpg
    const updatedContent = content.replace(/\.svg/g, '.jpg');
    
    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent, 'utf8');
      updated = true;
      console.log(`Updated remaining SVG references in ${file}`);
    }
    
    if (!updated) {
      console.log(`No updates needed for ${file}`);
    }
  });
}

// Function to manually fix CSS files where SVG references remain
function updateCssFiles() {
  const cssFiles = ['css/styles.css'];
  
  cssFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;
    
    // Replace any remaining .svg references with .jpg
    const updatedContent = content.replace(/\.svg/g, '.jpg');
    
    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent, 'utf8');
      updated = true;
      console.log(`Updated remaining SVG references in ${file}`);
    }
    
    if (!updated) {
      console.log(`No updates needed for ${file}`);
    }
  });
}

// Main function
async function main() {
  try {
    // Download any missing images
    const downloadPromises = [];
    
    for (const [localPath, remotePath] of Object.entries(missingImages)) {
      const url = new URL(remotePath, baseUrl).toString();
      downloadPromises.push(downloadImage(url, localPath));
    }
    
    try {
      await Promise.all(downloadPromises);
      console.log('All missing images downloaded successfully');
    } catch (error) {
      console.error('Error downloading images:', error.message);
    }
    
    // Fix any HTML/CSS files with remaining SVG references
    updateHtmlFiles();
    updateCssFiles();
    
    console.log('All image references have been updated to use JPG files.');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the main function
main(); 