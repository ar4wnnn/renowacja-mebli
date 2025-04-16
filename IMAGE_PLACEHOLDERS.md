# Image Placeholders for Renowacja Mebli Kuchennych Website

This document explains how image placeholders have been set up for the website.

## Overview

All images needed for the website have been generated as SVG placeholders. These placeholders serve as temporary visual elements until the actual images are provided.

## Placeholder Structure

The placeholders are located in the `img/` directory and have the following naming conventions:

- Front images: `front-*.svg`
- Example images: `example-*.svg`
- Realization images: `realizacja-*.svg`
- Renovation images: `renowacja-*.svg`
- Hero background: `hero-bg.svg`
- And other related images

## How to Replace Placeholders with Real Images

To replace the placeholders with real images:

1. Obtain the actual images for the website
2. Ensure they have the same filename as the placeholders but with the appropriate extension (jpg, png, etc.)
3. Place them in the `img/` directory
4. Run the following script to update the references in the HTML and CSS files:

```javascript
node update_real_images.js
```

The script `update_real_images.js` should be created to:
- Scan for SVG placeholders and their corresponding real images
- Update all references in HTML and CSS to use the real images instead of SVG placeholders

## Scripts Used for Managing Images

The following scripts were used to generate and manage the placeholders:

- `download_images.js` - Scanned HTML and CSS files to identify required images
- `generate_better_placeholders.js` - Created visually appealing SVG placeholders
- `update_image_references.js` - Updated all references to use SVG placeholders

## Image Categories and Sizes

Images have been categorized and sized as follows:

- Hero Background: 1920x600px
- Cabinet Fronts: 300x300px
- Examples and Realizations: 400x300px
- Furniture Images: 400x300px
- Others: 400x300px standard size

## Notes

- SVG format was chosen for placeholders because it's lightweight and scales well
- Each SVG is labeled with its filename and category for easy identification
- Different colors are used for different image categories 