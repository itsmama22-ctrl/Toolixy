const sharp = require('sharp');

/**
 * Netlify Function to extract colors from uploaded images
 * Uses Sharp for image processing and color extraction
 */
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed',
      }),
    };
  }

  try {
    // Parse the multipart form data
    const boundary = event.headers['content-type']?.split('boundary=')[1];
    if (!boundary) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid content type',
        }),
      };
    }

    // Simple multipart parser (in production, use a proper library like busboy)
    const body = Buffer.from(event.body, 'base64');
    const parts = body.toString('binary').split(`--${boundary}`);
    
    let imageBuffer = null;
    let colorCount = 5;

    for (const part of parts) {
      if (part.includes('name="image"')) {
        // Extract image data
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd !== -1) {
          const imageData = part.substring(headerEnd + 4, part.lastIndexOf('\r\n'));
          imageBuffer = Buffer.from(imageData, 'binary');
        }
      } else if (part.includes('name="colorCount"')) {
        // Extract color count
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd !== -1) {
          const countData = part.substring(headerEnd + 4, part.lastIndexOf('\r\n'));
          colorCount = parseInt(countData) || 5;
        }
      }
    }

    if (!imageBuffer || imageBuffer.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'No image provided',
        }),
      };
    }

    // Validate image size (max 10MB)
    if (imageBuffer.length > 10 * 1024 * 1024) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Image too large. Maximum size is 10MB.',
        }),
      };
    }

    // Process image with Sharp
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    // Resize image for faster processing (max 500px width/height)
    const resizedImage = await image
      .resize(500, 500, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .raw()
      .toBuffer();

    // Get the resized dimensions
    const { width, height } = await sharp(resizedImage).metadata();

    // Extract dominant colors using a simple clustering algorithm
    const colors = await extractDominantColors(resizedImage, width, height, colorCount);

    // Generate color variations (complementary, triadic, etc.)
    const variations = generateColorVariations(colors);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          originalImage: {
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,
            size: imageBuffer.length,
          },
          extractedColors: colors,
          variations,
          extractedAt: new Date().toISOString(),
        },
      }),
    };

  } catch (error) {
    console.error('Color extraction error:', error);

    let errorMessage = 'Failed to extract colors from image';
    
    if (error.message.includes('Input file is missing')) {
      errorMessage = 'Invalid image file';
    } else if (error.message.includes('unsupported image format')) {
      errorMessage = 'Unsupported image format. Please use JPG, PNG, or WebP.';
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      }),
    };
  }
};

/**
 * Extract dominant colors from image using k-means clustering
 */
async function extractDominantColors(imageBuffer, width, height, colorCount) {
  const pixels = new Uint8Array(imageBuffer);
  const step = Math.max(1, Math.floor((width * height) / 1000)); // Sample every nth pixel
  
  const colorSamples = [];
  
  // Sample pixels
  for (let i = 0; i < pixels.length; i += step * 3) {
    if (i + 2 < pixels.length) {
      colorSamples.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
    }
  }

  // Simple k-means clustering
  const clusters = kMeansClustering(colorSamples, Math.min(colorCount, colorSamples.length));
  
  // Convert clusters to hex colors
  return clusters.map(cluster => {
    const r = Math.round(cluster[0]);
    const g = Math.round(cluster[1]);
    const b = Math.round(cluster[2]);
    
    return {
      hex: rgbToHex(r, g, b),
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b),
      percentage: Math.round((cluster.samples / colorSamples.length) * 100),
    };
  }).sort((a, b) => b.percentage - a.percentage);
}

/**
 * Simple k-means clustering implementation
 */
function kMeansClustering(data, k) {
  if (data.length === 0) return [];
  
  // Initialize centroids randomly
  let centroids = [];
  for (let i = 0; i < k; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    centroids.push([...data[randomIndex]]);
  }

  let iterations = 0;
  const maxIterations = 10;
  let changed = true;

  while (changed && iterations < maxIterations) {
    changed = false;
    const clusters = centroids.map(() => ({ sum: [0, 0, 0], count: 0, samples: 0 }));

    // Assign each point to the nearest centroid
    for (const point of data) {
      let minDistance = Infinity;
      let closestCentroid = 0;

      for (let i = 0; i < centroids.length; i++) {
        const distance = euclideanDistance(point, centroids[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroid = i;
        }
      }

      clusters[closestCentroid].sum[0] += point[0];
      clusters[closestCentroid].sum[1] += point[1];
      clusters[closestCentroid].sum[2] += point[2];
      clusters[closestCentroid].count++;
      clusters[closestCentroid].samples++;
    }

    // Update centroids
    for (let i = 0; i < centroids.length; i++) {
      if (clusters[i].count > 0) {
        const newCentroid = [
          clusters[i].sum[0] / clusters[i].count,
          clusters[i].sum[1] / clusters[i].count,
          clusters[i].sum[2] / clusters[i].count,
        ];

        if (euclideanDistance(centroids[i], newCentroid) > 1) {
          changed = true;
        }

        centroids[i] = newCentroid;
      }
    }

    iterations++;
  }

  return centroids.map((centroid, index) => ({
    ...centroid,
    samples: clusters[index].samples,
  }));
}

/**
 * Calculate Euclidean distance between two RGB points
 */
function euclideanDistance(a, b) {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
    Math.pow(a[1] - b[1], 2) +
    Math.pow(a[2] - b[2], 2)
  );
}

/**
 * Convert RGB to HEX
 */
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Generate color variations (complementary, triadic, etc.)
 */
function generateColorVariations(colors) {
  if (colors.length === 0) return {};

  const primaryColor = colors[0];
  const { h, s, l } = primaryColor.hsl;

  return {
    complementary: [
      primaryColor,
      {
        hex: hslToHex((h + 180) % 360, s, l),
        rgb: hslToRgb((h + 180) % 360, s, l),
        hsl: { h: (h + 180) % 360, s, l }
      }
    ],
    triadic: [
      primaryColor,
      {
        hex: hslToHex((h + 120) % 360, s, l),
        rgb: hslToRgb((h + 120) % 360, s, l),
        hsl: { h: (h + 120) % 360, s, l }
      },
      {
        hex: hslToHex((h + 240) % 360, s, l),
        rgb: hslToRgb((h + 240) % 360, s, l),
        hsl: { h: (h + 240) % 360, s, l }
      }
    ],
    analogous: [
      {
        hex: hslToHex((h + 30) % 360, s, l),
        rgb: hslToRgb((h + 30) % 360, s, l),
        hsl: { h: (h + 30) % 360, s, l }
      },
      primaryColor,
      {
        hex: hslToHex((h - 30 + 360) % 360, s, l),
        rgb: hslToRgb((h - 30 + 360) % 360, s, l),
        hsl: { h: (h - 30 + 360) % 360, s, l }
      }
    ],
    monochromatic: [
      {
        hex: hslToHex(h, s, Math.max(0, l - 20)),
        rgb: hslToRgb(h, s, Math.max(0, l - 20)),
        hsl: { h, s, l: Math.max(0, l - 20) }
      },
      primaryColor,
      {
        hex: hslToHex(h, s, Math.min(100, l + 20)),
        rgb: hslToRgb(h, s, Math.min(100, l + 20)),
        hsl: { h, s, l: Math.min(100, l + 20) }
      }
    ]
  };
}

/**
 * Convert HSL to HEX
 */
function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
