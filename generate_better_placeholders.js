const fs = require('fs');
const path = require('path');

// Function to create a better placeholder image with categories and colors
function createBetterPlaceholder(filepath, width, height, color, label) {
  const folderPath = path.dirname(filepath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

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

  // Save as SVG file
  fs.writeFileSync(`${filepath}`, svgContent);
  console.log(`Created better placeholder: ${filepath}`);
}

// Define image categories and their properties
const imageCategories = [
  {
    pattern: 'hero-bg',
    width: 1920,
    height: 600,
    color: '#3a6b35',
    label: 'Hero Background'
  },
  {
    pattern: 'front-',
    width: 300,
    height: 300,
    color: '#1e3f20',
    label: 'Cabinet Front'
  },
  {
    pattern: 'realizacja-',
    width: 400,
    height: 300,
    color: '#4a7c3f',
    label: 'Project Example'
  },
  {
    pattern: 'example-',
    width: 400,
    height: 300,
    color: '#5a8c4f',
    label: 'Example'
  },
  {
    pattern: 'meble-',
    width: 400,
    height: 300,
    color: '#2a5a25',
    label: 'Furniture'
  },
  {
    pattern: 'inspiracja-',
    width: 400,
    height: 300,
    color: '#6a9c5f',
    label: 'Inspiration'
  },
  {
    pattern: 'renowacja-',
    width: 400,
    height: 300,
    color: '#3a6b35',
    label: 'Renovation'
  },
  {
    pattern: 'techniki-',
    width: 400,
    height: 300,
    color: '#4a7c3f',
    label: 'Techniques'
  },
  {
    pattern: 'materialy-',
    width: 400,
    height: 300,
    color: '#5a8c4f',
    label: 'Materials'
  }
];

// Main function
function main() {
  // Get all image files in the img directory
  const imgDir = 'img';
  const files = fs.readdirSync(imgDir);
  
  // Filter SVG files
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  // Process SVG files
  for (const file of svgFiles) {
    const fullPath = path.join(imgDir, file);
    
    // Find the matching category
    let category = null;
    for (const cat of imageCategories) {
      if (file.includes(cat.pattern)) {
        category = cat;
        break;
      }
    }
    
    // If we found a category, create a better placeholder
    if (category) {
      createBetterPlaceholder(
        fullPath,
        category.width,
        category.height,
        category.color,
        category.label
      );
    } else {
      // Default category for unknown patterns
      createBetterPlaceholder(
        fullPath,
        400,
        300,
        '#7a7a7a',
        'Image Placeholder'
      );
    }
  }
  
  // Filter JPG files
  const jpgFiles = files.filter(file => 
    file.endsWith('.jpg') || 
    file.endsWith('.jpeg') || 
    file.endsWith('.png')
  );
  
  // Process JPG files to create SVG versions
  for (const file of jpgFiles) {
    const jpgPath = path.join(imgDir, file);
    const svgPath = path.join(imgDir, file.replace(/\.\w+$/, '.svg'));
    
    // Only create SVG if it doesn't exist yet
    if (!fs.existsSync(svgPath)) {
      // Find the matching category
      let category = null;
      for (const cat of imageCategories) {
        if (file.includes(cat.pattern)) {
          category = cat;
          break;
        }
      }
      
      // If we found a category, create a better placeholder
      if (category) {
        createBetterPlaceholder(
          svgPath,
          category.width,
          category.height,
          category.color,
          category.label
        );
      } else {
        // Default category for unknown patterns
        createBetterPlaceholder(
          svgPath,
          400,
          300,
          '#7a7a7a',
          'Image Placeholder'
        );
      }
    }
  }
  
  console.log('All placeholders improved.');
}

main(); 