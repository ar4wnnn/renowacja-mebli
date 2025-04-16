const fs = require('fs');
const path = require('path');

// Function to update image references in HTML files
function updateHtmlImageReferences(filePath) {
  try {
    // Read the HTML file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace img src references
    let updatedContent = content.replace(
      /<img.*?src=["'](img\/.*?\.\w+)["'].*?>/g,
      (match, imgPath) => {
        const svgPath = imgPath.replace(/\.\w+$/, '.svg');
        return match.replace(imgPath, svgPath);
      }
    );
    
    // Replace background-image url references
    updatedContent = updatedContent.replace(
      /background-image:\s*url\(['"]?(img\/.*?\.\w+)['"]?\)/g,
      (match, imgPath) => {
        const svgPath = imgPath.replace(/\.\w+$/, '.svg');
        return match.replace(imgPath, svgPath);
      }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated image references in ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Function to update CSS files
function updateCssImageReferences(filePath) {
  try {
    // Read the CSS file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace background-image url references
    const updatedContent = content.replace(
      /url\(['"]?(\.\.\/img\/.*?\.\w+)['"]?\)/g,
      (match, imgPath) => {
        const svgPath = imgPath.replace(/\.\w+$/, '.svg');
        return match.replace(imgPath, svgPath);
      }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated image references in ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Function to update the HTML files
function updateAllHtmlFiles() {
  const htmlFiles = [
    'index.html',
    'odnowa-i-wymiana-frontow.html',
    'meble-na-wymiar.html',
    'renowacja-mebli.html',
    'rodzaje-frontow.html',
    'kontakt.html'
  ];
  
  htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
      updateHtmlImageReferences(file);
    } else {
      console.log(`File ${file} does not exist, skipping.`);
    }
  });
}

// Function to update CSS files
function updateAllCssFiles() {
  const cssFiles = ['css/styles.css'];
  
  cssFiles.forEach(file => {
    if (fs.existsSync(file)) {
      updateCssImageReferences(file);
    } else {
      console.log(`File ${file} does not exist, skipping.`);
    }
  });
}

// Main function
function main() {
  updateAllHtmlFiles();
  updateAllCssFiles();
  console.log('All HTML and CSS files updated.');
}

main(); 