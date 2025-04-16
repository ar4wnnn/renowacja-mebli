const fs = require('fs');
const path = require('path');

// Function to copy SVG content to JPG filename
function copySvgToJpg(svgPath, jpgPath) {
  try {
    if (fs.existsSync(svgPath) && !fs.existsSync(jpgPath)) {
      const content = fs.readFileSync(svgPath, 'utf8');
      fs.writeFileSync(jpgPath, content);
      console.log(`Copied ${svgPath} to ${jpgPath}`);
    }
  } catch (error) {
    console.error(`Error copying ${svgPath} to ${jpgPath}:`, error.message);
  }
}

// Function to find all SVG files and create JPG versions
function createJpgVersions() {
  const imgDir = 'img';
  if (!fs.existsSync(imgDir)) {
    console.error(`Directory ${imgDir} does not exist.`);
    return;
  }
  
  const files = fs.readdirSync(imgDir);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  console.log(`Found ${svgFiles.length} SVG files to process.`);
  
  svgFiles.forEach(svgFile => {
    const baseName = svgFile.replace('.svg', '');
    const jpgPath = path.join(imgDir, `${baseName}.jpg`);
    const svgPath = path.join(imgDir, svgFile);
    
    copySvgToJpg(svgPath, jpgPath);
  });
}

// Main function
function main() {
  console.log('Creating JPG versions of all SVG files...');
  createJpgVersions();
  console.log('Done processing images.');
}

// Run the main function
main(); 