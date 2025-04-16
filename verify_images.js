const fs = require('fs');
const path = require('path');

// Function to extract image references from HTML files
function extractHtmlImageReferences(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const references = new Set();
  
  // Match img src attributes
  const imgRegex = /<img.*?src=["'](img\/[^"']+)["']/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    references.add(match[1]);
  }
  
  // Match background-image URLs
  const bgRegex = /background-image:\s*url\(['"]?(img\/[^)"']+)['"]?\)/g;
  while ((match = bgRegex.exec(content)) !== null) {
    references.add(match[1]);
  }
  
  return [...references];
}

// Function to extract image references from CSS files
function extractCssImageReferences(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const references = new Set();
  
  // Match URL references
  const urlRegex = /url\(['"]?(\.\.\/img\/[^)"']+)['"]?\)/g;
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    // Convert from ../img/file.jpg to img/file.jpg for consistency
    references.add(match[1].replace('../', ''));
  }
  
  return [...references];
}

// Function to check all references
function checkAllReferences() {
  const htmlFiles = [
    'index.html',
    'odnowa-i-wymiana-frontow.html',
    'meble-na-wymiar.html',
    'renowacja-mebli.html',
    'rodzaje-frontow.html',
    'kontakt.html'
  ];
  
  const cssFiles = ['css/styles.css'];
  
  // Collect all references
  const allReferences = new Set();
  
  console.log('Checking HTML files for image references:');
  htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.log(`  ${file} - MISSING`);
      return;
    }
    
    const refs = extractHtmlImageReferences(file);
    console.log(`  ${file} - ${refs.length} references`);
    refs.forEach(ref => allReferences.add(ref));
  });
  
  console.log('Checking CSS files for image references:');
  cssFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.log(`  ${file} - MISSING`);
      return;
    }
    
    const refs = extractCssImageReferences(file);
    console.log(`  ${file} - ${refs.length} references`);
    refs.forEach(ref => allReferences.add(ref));
  });
  
  // Check if all referenced images exist
  console.log('\nVerifying that all referenced images exist:');
  const missingImages = [];
  
  [...allReferences].forEach(ref => {
    if (!fs.existsSync(ref)) {
      missingImages.push(ref);
      console.log(`  ${ref} - MISSING`);
    }
  });
  
  if (missingImages.length === 0) {
    console.log('  All referenced images exist!');
  } else {
    console.log(`  ${missingImages.length} referenced images are missing.`);
  }
  
  // Check for SVG references that should be JPG
  const svgReferences = [...allReferences].filter(ref => ref.endsWith('.svg'));
  if (svgReferences.length > 0) {
    console.log('\nWARNING: Found references to SVG files that should be JPG:');
    svgReferences.forEach(ref => {
      console.log(`  ${ref}`);
    });
  } else {
    console.log('\nNo SVG references found - all image references are using JPG format.');
  }
  
  return { missingImages, svgReferences };
}

// Main function
function main() {
  console.log('Image Reference Verification Report\n');
  
  const { missingImages, svgReferences } = checkAllReferences();
  
  if (missingImages.length === 0 && svgReferences.length === 0) {
    console.log('\nSUCCESS: All image references are valid and point to existing JPG files!');
  } else {
    console.log('\nIssues found with image references. Please fix them.');
  }
}

// Run the main function
main(); 