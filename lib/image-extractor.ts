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
        
        // Extract all pixel colors with higher quality sampling
        const pixels: string[] = [];
        
        // Sample every 3rd pixel for better coverage (higher quality)
        // This captures more subtle color variations and small regions
        for (let i = 0; i < data.length; i += 12) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Process visible pixels (alpha > 100 to catch subtle transparencies)
          if (a > 100 && r !== undefined && g !== undefined && b !== undefined) {
            try {
              // Simple RGB to HEX conversion
              const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
              const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
              
              // Include even subtle tones (near-white, near-black)
              // Only exclude extremely bright whites (#F8F8F8 and above) and pure blacks
              const isNearWhite = r > 248 && g > 248 && b > 248;
              const isPureBlack = r === 0 && g === 0 && b === 0;
              
              if (!isNearWhite && !isPureBlack) {
                pixels.push(hex);
              }
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
 * Uses better clustering for distinct color selection
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
  
  // Group colors by similarity using a better distance metric
  const colorGroups: { color: chroma.Color; pixels: chroma.Color[]; frequency: number }[] = [];
  
  sampledPixels.forEach((hex) => {
    try {
      const color = chroma(hex);
      
      // Calculate color properties
      const lab = color.lab();
      const hsl = color.hsl();
      
      // Find or create a group for this color
      let foundGroup = false;
      
      for (const group of colorGroups) {
        const groupLab = group.color.lab();
        const groupHsl = group.color.hsl();
        
        // Use multiple metrics for better matching
        const lightnessDiff = Math.abs(lab[0] - groupLab[0]);
        const hueDiff = Math.abs(hsl[0] - groupHsl[0]);
        const satDiff = Math.abs(hsl[1] - groupHsl[1]);
        
        // More lenient matching to preserve subtle color differences
        // Reduced threshold to allow more color groups
        if (lightnessDiff < 50 && Math.min(hueDiff, 360 - hueDiff) < 35 && satDiff < 0.3) {
          group.pixels.push(color);
          group.frequency++;
          foundGroup = true;
          break;
        }
      }
      
      if (!foundGroup) {
        colorGroups.push({ color, pixels: [color], frequency: 1 });
      }
    } catch (err) {
      console.warn('Skipping invalid hex:', hex);
    }
  });
  
  // Sort groups by frequency and diversity
  colorGroups.sort((a, b) => {
    if (Math.abs(a.frequency - b.frequency) > 5) {
      return b.frequency - a.frequency;
    }
    // Prefer colors with more saturation for diversity
    return b.color.get('hsl.s') - a.color.get('hsl.s');
  });
  
  // Select the most representative color from each group
  const selectedColors: string[] = [];
  const minDistance = 20; // Lower threshold to allow more colors
  
  for (const group of colorGroups) {
    if (selectedColors.length >= count) break;
    
    const currentColor = group.color;
    let isDistinct = true;
    
    // Check if this color is sufficiently different from already selected colors
    for (const existingHex of selectedColors) {
      try {
        const existingColor = chroma(existingHex);
        const currentLab = currentColor.lab();
        const existingLab = existingColor.lab();
        
        // Calculate L*a*b* distance
        const distance = Math.sqrt(
          Math.pow(currentLab[0] - existingLab[0], 2) +
          Math.pow(currentLab[1] - existingLab[1], 2) +
          Math.pow(currentLab[2] - existingLab[2], 2)
        );
        
        // Also check if they're similar in hue and lightness
        const hue1 = currentColor.hsl()[0];
        const hue2 = existingColor.hsl()[0];
        const lightness1 = currentLab[0];
        const lightness2 = existingLab[0];
        
        // More complex distinctness check
        if (distance < minDistance || 
            (Math.abs(lightness1 - lightness2) < 15 && Math.min(Math.abs(hue1 - hue2), 360 - Math.abs(hue1 - hue2)) < 20)) {
          isDistinct = false;
          break;
        }
      } catch (e) {
        // If comparison fails, consider it distinct
      }
    }
    
    if (isDistinct) {
      selectedColors.push(currentColor.hex());
    }
  }
  
  // Fill remaining slots if we don't have enough distinct colors
  if (selectedColors.length < count && colorGroups.length > selectedColors.length) {
    for (const group of colorGroups) {
      if (selectedColors.length >= count) break;
      
      const candidateColor = group.color.hex();
      if (!selectedColors.includes(candidateColor)) {
        selectedColors.push(candidateColor);
      }
    }
  }
  
  console.log(`Selected ${selectedColors.length} distinct colors from ${colorGroups.length} groups`);
  
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
