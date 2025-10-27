/**
 * Image color extraction utility
 * Extracts dominant colors from images
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
    
    // Only set crossOrigin for external URLs
    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    
    img.onload = () => {
      try {
        // Create a small canvas for faster processing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Resize image to speed up processing
        const maxDimension = 200;
        const width = img.width > img.height 
          ? maxDimension 
          : (img.width / img.height) * maxDimension;
        const height = img.height > img.width 
          ? maxDimension 
          : (img.height / img.width) * maxDimension;
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // Extract pixels and create color clusters
        const pixels: string[] = [];
        
        // Sample every 10th pixel for performance
        for (let i = 0; i < data.length; i += 40) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Skip transparent or nearly transparent pixels
          if (a > 128) {
            const hex = chroma(rgb(r, g, b)).hex();
            pixels.push(hex);
          }
        }
        
        // Use chroma to get the most distinct colors
        const distinctColors = getDistinctColors(pixels, colorCount);
        resolve(distinctColors);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageUrl;
  });
}

/**
 * Helper function to convert RGB to chroma
 */
function rgb(r: number, g: number, b: number): chroma.Color {
  return chroma.rgb(r, g, b);
}

/**
 * Get distinct colors using clustering and brightness filtering
 */
function getDistinctColors(colorArray: string[], count: number): string[] {
  // Group similar colors together
  const clusters: { color: chroma.Color; count: number }[] = [];
  
  colorArray.forEach((hex) => {
    const color = chroma(hex);
    let foundCluster = false;
    
    for (const cluster of clusters) {
      // Check if color is similar to cluster (within 40 units in L*a*b* space)
      if ((color as any).deltaE(cluster.color) < 40) {
        cluster.count++;
        foundCluster = true;
        break;
      }
    }
    
    if (!foundCluster && clusters.length < count * 2) {
      clusters.push({ color, count: 1 });
    }
  });
  
  // Sort by count and brightness
  clusters.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count; // Sort by frequency
    }
    return b.color.get('hsl.l') - a.color.get('hsl.l'); // Then by brightness
  });
  
  // Return top N colors, ensuring good separation
  const selected: string[] = [];
  const minDeltaE = 20; // Minimum color difference
  
  for (const cluster of clusters) {
    if (selected.length >= count) break;
    
    const clusterHex = cluster.color.hex();
    
    if (selected.length === 0) {
      selected.push(clusterHex);
      continue;
    }
    
    // Check if this color is sufficiently different from already selected colors
    const isDistinct = selected.every(hex => {
      return (chroma(clusterHex) as any).deltaE(chroma(hex)) > minDeltaE;
    });
    
    if (isDistinct) {
      selected.push(clusterHex);
    }
  }
  
  // Fill remaining slots with random variations if needed
  while (selected.length < count && clusters.length > 0) {
    const randomCluster = clusters[Math.floor(Math.random() * clusters.length)];
    selected.push(randomCluster.color.hex());
  }
  
  return selected;
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

