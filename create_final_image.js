const fs = require('fs');
const path = require('path');

// Function to create a placeholder SVG image
function createSvgPlaceholder(filePath, width, height, color, label) {
  console.log(`Creating placeholder image: ${filePath}`);
  
  // Create directory if it doesn't exist
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create an SVG placeholder
  const filename = path.basename(filePath);
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
  
  // Save the SVG content directly to the JPG file path
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created placeholder image: ${filePath}`);
}

// Main function
function main() {
  console.log('Creating final missing image...');
  
  // Create the subpage-hero-bg.jpg image
  createSvgPlaceholder(
    'img/subpage-hero-bg.jpg',
    1920,
    300,
    '#3a6b35',
    'Subpage Hero Background'
  );
  
  console.log('All images created successfully!');
}

// Run the main function
main(); 