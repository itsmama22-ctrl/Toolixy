/**
 * Image color extraction utility
 * Extracts dominant colors from images using Canvas API
 */

import chroma from 'chroma-js';

/**
 * Extract dominant colors from an image using HTML5 Canvas
 * Returns array of HEX color values
 */
export async function extractColorsFromImage(
  imageUrl: string,
  colorCount: number = 5
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Only set crossOrigin for external URLs (not data URLs)
    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    
    img.onload = () => {
      try {
        console.log(`Image loaded: ${img.width}x${img.height}`);
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Calculate canvas dimensions (max 800px width for performance)
        const maxWidth = 800;
        let width = img.width;
        let height = img.height;
        
        // Scale down if necessary
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }
        
        // Ensure dimensions are valid
        width = Math.floor(Math.max(width, 1));
        height = Math.floor(Math.max(height, 1));
        
        canvas.width = width;
        canvas.height = height;
        
        console.log(`Canvas dimensions: ${width}x${height}`);
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        console.log(`Processing ${data.length / 4} pixels`);
        
        // Extract all pixel colors
        const pixels: string[] = [];
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Only process visible pixels (alpha > 128)
          if (a > 128) {
            try {
              const hex = chroma.rgb(r, g, b).hex();
              pixels.push(hex);
            } catch (err) {
              // Skip invalid colors
              console.warn('Skipping invalid color:', r, g, b);
            }
          }
        }
        
        if (pixels.length === 0) {
          reject(new Error('No valid colors found in image'));
          return;
        }
        
        console.log(`Extracted ${pixels.length} pixel colors`);
        
        // Get distinct colors using improved algorithm
        const distinctColors = getOptimalDistinctColors(pixels, colorCount);
        
        if (distinctColors.length === 0) {
          reject(new Error('Could not extract distinct colors'));
          return;
        }
        
        console.log(`Returning ${distinctColors.length} distinct colors`);
        resolve(distinctColors);
      } catch (error) {
        console.error('Error in image processing:', error);
        reject(error);
      }
    };
    
    img.onerror = () => {
      console.error('Failed to load image');
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageUrl;
  });
}

/**
 * Extract optimal distinct colors from pixel array
 * Uses k-means-like clustering for better color selection
 */
function getOptimalDistinctColors(pixels: string[], count: number): string[] {
  if (pixels.length === 0) return [];
  
  // Sample pixels if there are too many (for performance)
  const maxPixels = 10000;
  let sampledPixels = pixels;
  
  if (pixels.length > maxPixels) {
    const step = Math.floor(pixels.length / maxPixels);
    sampledPixels = [];
    for (let i = 0; i < pixels.length; i += step) {
      sampledPixels.push(pixels[i]);
    }
  }
  
  console.log(`Clustering ${sampledPixels.length} pixels for ${count} colors`);
  
  // Group colors by similarity
  const colorGroups: { color: chroma.Color; pixels: chroma.Color[] }[] = [];
  
  sampledPixels.forEach((hex) => {
    try {
      const color = chroma(hex);
      
      // Find or create a group for this color
      let foundGroup = false;
      
      for (const group of colorGroups) {
        if (group.pixels.length < 100 && (color as any).deltaE(group.color) < 30) {
          group.pixels.push(color);
          foundGroup = true;
          break;
        }
      }
      
      if (!foundGroup) {
        colorGroups.push({ color, pixels: [color] });
      }
    } catch (err) {
      console.warn('Skipping invalid hex:', hex);
    }
  });
  
  // Sort groups by size (frequency)
  colorGroups.sort((a, b) => b.pixels.length - a.pixels.length);
  
  // Select the most representative color from each group
  const selectedColors: string[] = [];
  
  // Take colors from different parts of the brightness spectrum
  for (let i = 0; i < Math.min(count, colorGroups.length); i++) {
    selectedColors.push(colorGroups[i].color.hex());
  }
  
  // If we don't have enough distinct colors, generate variations
  while (selectedColors.length < count && colorGroups.length > 0) {
    // Create variations of the most common colors
    const baseColor = chroma(colorGroups[0].color.hex());
    const variation = baseColor.set('hsl.l', baseColor.get('hsl.l') + (selectedColors.length % 2 === 0 ? 0.2 : -0.2));
    selectedColors.push(variation.hex());
  }
  
  return selectedColors.slice(0, count);
}

/**
 * Generate theme-based colors using AI-like logic
 * Simulates AI color generation based on keywords
 */
export function generateThemeColors(theme: string, colorCount: number = 5): string[] {
  const lowerTheme = theme.toLowerCase();
  
  // Define color schemes for common themes
  const themeSchemes: Record<string, string[]> = {
    // Nature themes
    'sunset': ['#FF6B6B', '#FF8E53', '#FFC46B', '#FFE66D', '#C7F5D9'],
    'beach': ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FF6B6B'],
    'ocean': ['#255C99', '#5E9FE1', '#4ECDC4', '#7DB9B6', '#A8D5D0'],
    'forest': ['#2D5016', '#4A7C22', '#6A9B37', '#8CB04F', '#B5D597'],
    
    // Urban themes
    'cyberpunk': ['#00F5FF', '#FF00FF', '#FF007F', '#8000FF', '#7B2CBF'],
    'neon': ['#FF0080', '#00FF80', '#0080FF', '#FF8000', '#8000FF'],
    'urban': ['#34495E', '#7F8C8D', '#BDC3C7', '#ECF0F1', '#3498DB'],
    
    // Warm themes
    'warm': ['#FF6B6B', '#FFA07A', '#FFD93D', '#FFE66D', '#FFC46B'],
    'coffee': ['#8B4513', '#A0522D', '#CD853F', '#D2B48C', '#F4A460'],
    'autumn': ['#FF6B6B', '#FFA500', '#FFD700', '#FF8C00', '#B8860B'],
    
    // Cool themes
    'cool': ['#4ECDC4', '#45B7D1', '#5E9FE1', '#9B59B6', '#8E44AD'],
    'winter': ['#E8F4F8', '#C5E1F5', '#A3CEE8', '#82B5DB', '#6CA5CC'],
    'mint': ['#B2F5EA', '#81E6D9', '#4FD1C7', '#38B2AC', '#319795'],
    
    // Minimal themes
    'minimal': ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#9E9E9E', '#424242'],
    'nature': ['#556B2F', '#90EE90', '#9ACD32', '#32CD32', '#228B22'],
    'sunny': ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#FF1493'],
  };
  
  // Match theme to predefined scheme
  for (const [key, colors] of Object.entries(themeSchemes)) {
    if (lowerTheme.includes(key)) {
      return colors.slice(0, colorCount);
    }
  }
  
  // Default to complementary palette if no match
  const baseColor = '#3B82F6';
  const colors: string[] = [baseColor];
  
  for (let i = 1; i < colorCount; i++) {
    const hue = (chroma(baseColor).get('hsl.h') + (i * 30)) % 360;
    const sat = 0.5 + Math.random() * 0.3;
    const light = 0.4 + Math.random() * 0.3;
    colors.push(chroma.hsl(hue, sat, light).hex());
  }
  
  return colors;
}
