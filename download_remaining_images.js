const fs = require('fs');
const path = require('path');

// Function to create a better placeholder image
function createPlaceholderImage(filepath, width, height, color, label) {
  console.log(`Creating placeholder image for: ${filepath}`);
  
  // Create directory if it doesn't exist
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create an SVG placeholder that looks like an image
  const filename = path.basename(filepath);
  const svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <rect width="100%" height="100%" fill="#000000" opacity="0.1"/>
    <text x="50%" y="40%" font-family="Arial" font-size="24" text-anchor="middle" fill="#ffffff" font-weight="bold">
      ${label}
    </text>
    <text x="50%" y="60%" font-family="Arial" font-size="16" text-anchor="middle" fill="#ffffff">
      ${filename}
    </text>
  </svg>`;
  
  // Save as SVG file with JPG extension (it will display in browsers)
  fs.writeFileSync(filepath, svgContent);
  console.log(`Created placeholder image: ${filepath}`);
}

// List of remaining missing images
const missingImages = [
  {
    path: 'img/renowacja-realizacja-3.jpg',
    width: 400, 
    height: 300, 
    color: '#3a6b35',
    label: 'Renovation Example 3'
  },
  {
    path: 'img/renowacja-realizacja-4.jpg',
    width: 400, 
    height: 300, 
    color: '#3a6b35',
    label: 'Renovation Example 4'
  },
  {
    path: 'img/techniki-renowacji-1.jpg',
    width: 400, 
    height: 300, 
    color: '#4a7c3f',
    label: 'Renovation Techniques'
  },
  {
    path: 'img/renowacja-mebli-1.jpg',
    width: 400, 
    height: 300, 
    color: '#3a6b35',
    label: 'Furniture Renovation'
  }
];

// Function to update HTML files - strictly check image references
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
  });
}

// Function to update CSS files
function updateCssFiles() {
  const cssFiles = ['css/styles.css'];
  
  cssFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace any remaining .svg references with .jpg
    const updatedContent = content.replace(/\.svg/g, '.jpg');
    
    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent, 'utf8');
      console.log(`Updated remaining SVG references in ${file}`);
    }
  });
}

// Main function
async function main() {
  try {
    // Create placeholders for missing images
    console.log('Creating placeholders for missing images...');
    missingImages.forEach(img => {
      createPlaceholderImage(img.path, img.width, img.height, img.color, img.label);
    });
    
    // Update HTML and CSS file references
    console.log('Updating HTML files...');
    updateHtmlFiles();
    
    console.log('Updating CSS files...');
    updateCssFiles();
    
    console.log('All image references have been updated to use JPG files.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the main function
main(); 