const fs = require('fs');
const path = require('path');

// Function to update image references in HTML files
function updateHtmlImageReferences(filePath) {
  try {
    // Read the HTML file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace img src references
    let updatedContent = content.replace(
      /<img.*?src=["'](img\/.*?)\.svg["'].*?>/g,
      (match, imgPath) => {
        // Check if real image exists with common extensions
        const extensions = ['.jpg', '.jpeg', '.png', '.gif'];
        for (const ext of extensions) {
          if (fs.existsSync(`${imgPath}${ext}`)) {
            return match.replace(`${imgPath}.svg`, `${imgPath}${ext}`);
          }
        }
        return match; // Keep SVG if no real image is found
      }
    );
    
    // Replace background-image url references
    updatedContent = updatedContent.replace(
      /background-image:\s*url\(['"]?(img\/.*?)\.svg['"]?\)/g,
      (match, imgPath) => {
        // Check if real image exists with common extensions
        const extensions = ['.jpg', '.jpeg', '.png', '.gif'];
        for (const ext of extensions) {
          if (fs.existsSync(`${imgPath}${ext}`)) {
            return match.replace(`${imgPath}.svg`, `${imgPath}${ext}`);
          }
        }
        return match; // Keep SVG if no real image is found
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
      /url\(['"]?(\.\.\/img\/.*?)\.svg['"]?\)/g,
      (match, imgPath) => {
        // Convert path to match the file system (remove ../)
        const localImgPath = imgPath.replace('../', '');
        
        // Check if real image exists with common extensions
        const extensions = ['.jpg', '.jpeg', '.png', '.gif'];
        for (const ext of extensions) {
          if (fs.existsSync(`${localImgPath}${ext}`)) {
            return match.replace(`${imgPath}.svg`, `${imgPath}${ext}`);
          }
        }
        return match; // Keep SVG if no real image is found
      }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated image references in ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Function to update all HTML files
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

// Function to update all CSS files
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

// Scan the img directory to identify which placeholders have real images
function scanForRealImages() {
  const imgDir = 'img';
  if (!fs.existsSync(imgDir)) {
    console.log(`Directory ${imgDir} does not exist.`);
    return;
  }
  
  const files = fs.readdirSync(imgDir);
  
  // Get all SVG placeholders
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  console.log(`Found ${svgFiles.length} SVG placeholders.`);
  
  // Check which SVG placeholders have corresponding real images
  let realImagesFound = 0;
  for (const svgFile of svgFiles) {
    const baseName = svgFile.replace('.svg', '');
    const realImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
    for (const ext of realImageExtensions) {
      if (files.includes(`${baseName}${ext}`)) {
        realImagesFound++;
        console.log(`Found real image for ${svgFile}: ${baseName}${ext}`);
        break;
      }
    }
  }
  
  console.log(`Found ${realImagesFound} real images to replace placeholders.`);
}

// Main function
function main() {
  console.log('Scanning for real images...');
  scanForRealImages();
  
  console.log('Updating HTML files...');
  updateAllHtmlFiles();
  
  console.log('Updating CSS files...');
  updateAllCssFiles();
  
  console.log('All files updated to use real images where available.');
}

// Run the main function
main(); 