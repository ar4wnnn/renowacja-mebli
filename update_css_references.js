const fs = require('fs');
const path = require('path');

// Function to update image references in CSS files
function updateCssImageReferences(filePath) {
  try {
    // Read the CSS file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace background-image url references
    const updatedContent = content.replace(
      /url\(['"]?(\.\.\/img\/.*?\.\w+)['"]?\)/g,
      (match, imgPath) => {
        const relativePath = imgPath.replace('../', '');
        const svgPath = relativePath.replace(/\.\w+$/, '.svg');
        // Check if SVG exists
        if (fs.existsSync(svgPath)) {
          return match.replace(imgPath, `../${svgPath}`);
        }
        return match;
      }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated image references in ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Main function
function main() {
  const cssFiles = ['css/styles.css'];
  
  cssFiles.forEach(file => {
    if (fs.existsSync(file)) {
      updateCssImageReferences(file);
    } else {
      console.log(`File ${file} does not exist, skipping.`);
    }
  });
  
  console.log('All CSS files updated.');
}

main(); 