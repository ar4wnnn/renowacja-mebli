const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`File already exists: ${filepath}`);
      return resolve();
    }

    // Download file
    const file = fs.createWriteStream(filepath);
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
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

// Function to extract image URLs from HTML files
function extractImageUrlsFromHtml(htmlContent) {
  const imgRegex = /<img.*?src=["'](.*?)["'].*?>/g;
  const backgroundImgRegex = /background-image:\s*url\(['"]?(.*?)['"]?\)/g;
  const urls = new Set();

  let match;
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    if (!match[1].startsWith('http')) {
      urls.add(match[1]);
    }
  }

  while ((match = backgroundImgRegex.exec(htmlContent)) !== null) {
    if (!match[1].startsWith('http')) {
      urls.add(match[1]);
    }
  }

  return [...urls];
}

// Function to extract image URLs from CSS files
function extractImageUrlsFromCss(cssContent) {
  const backgroundImgRegex = /url\(['"]?(.*?)['"]?\)/g;
  const urls = new Set();

  let match;
  while ((match = backgroundImgRegex.exec(cssContent)) !== null) {
    if (!match[1].startsWith('http') && !match[1].startsWith('data:')) {
      urls.add(match[1]);
    }
  }

  return [...urls];
}

// Function to read HTML files
function readHtmlFiles() {
  const htmlFiles = [
    'index.html',
    'odnowa-i-wymiana-frontow.html',
    'meble-na-wymiar.html',
    'renowacja-mebli.html',
    'rodzaje-frontow.html',
    'kontakt.html'
  ];

  const allImageUrls = new Set();

  htmlFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const imageUrls = extractImageUrlsFromHtml(content);
      imageUrls.forEach(url => allImageUrls.add(url));
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message);
    }
  });

  return [...allImageUrls];
}

// Function to read CSS files
function readCssFiles() {
  const cssFiles = ['css/styles.css'];
  const allImageUrls = new Set();

  cssFiles.forEach(file => {
    try {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const imageUrls = extractImageUrlsFromCss(content);
        imageUrls.forEach(url => allImageUrls.add(url));
      }
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message);
    }
  });

  return [...allImageUrls];
}

// Create a more complete placeholder image
function createPlaceholderImage(filepath, width, height) {
  const folderPath = path.dirname(filepath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Basic SVG placeholder with the filename
  const filename = path.basename(filepath);
  const svgContent = `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f0f0f0"/>
    <text x="50%" y="50%" font-family="Arial" font-size="20" text-anchor="middle" fill="#999">
      ${filename}
    </text>
  </svg>`;

  // Save as actual SVG file
  fs.writeFileSync(`${filepath.replace(/\.\w+$/, '')}.svg`, svgContent);
  console.log(`Created placeholder SVG: ${filepath.replace(/\.\w+$/, '')}.svg`);
  
  // Also save a placeholder image file with the original extension
  fs.writeFileSync(filepath, svgContent);
}

// Main function
async function main() {
  try {
    // Get all image URLs from HTML and CSS
    const htmlImageUrls = readHtmlFiles();
    const cssImageUrls = readCssFiles();
    
    // Combine unique URLs
    const allUrls = new Set([...htmlImageUrls, ...cssImageUrls]);
    const imageUrls = [...allUrls];
    
    console.log(`Found ${imageUrls.length} image URLs`);

    // Process special image requirements based on the README.md
    const specialImages = [
      { path: 'img/hero-bg.jpg', width: 1920, height: 600 },
      { path: 'img/front-gladkie-lakierowane.jpg', width: 300, height: 300 },
      { path: 'img/front-gladkie-oklejone.jpg', width: 300, height: 300 },
      { path: 'img/front-gladkie-pochwyt.jpg', width: 300, height: 300 },
      { path: 'img/front-frezowane-lakierowane.jpg', width: 300, height: 300 },
      { path: 'img/front-frezowane-oklejone.jpg', width: 300, height: 300 },
      { path: 'img/front-drewniane.jpg', width: 300, height: 300 },
      { path: 'img/front-fornirowane.jpg', width: 300, height: 300 },
    ];

    // Create special SVG placeholders
    specialImages.forEach(img => {
      if (!fs.existsSync(img.path)) {
        createPlaceholderImage(img.path, img.width, img.height);
      }
    });

    // Create placeholder images for all detected images
    for (const relativeUrl of imageUrls) {
      const filepath = path.join(__dirname, relativeUrl);
      
      // Create a simple placeholder image
      const dir = path.dirname(filepath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Check if it's a placeholder or if we need to download
      if (!fs.existsSync(filepath) && !fs.existsSync(filepath.replace(/\.\w+$/, '.svg'))) {
        createPlaceholderImage(filepath, 400, 300);
      }
    }

    console.log('All images processed');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 