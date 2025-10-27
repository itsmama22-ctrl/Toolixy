'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Palette, Upload, Download, Copy, RefreshCw, Image, Loader2, Eye, Sparkles, HelpCircle } from 'lucide-react';
import { ColorPaletteSkeleton } from './LoadingSkeleton';
import { ChromePicker } from 'react-color';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import type { Color } from '@/types';
import { trackColorPaletteGeneration, trackToolUsage, trackFileDownload, trackError } from '@/lib/analytics';
import { 
  copyToClipboard, 
  generateRandomColor, 
  hexToRgb, 
  rgbToHsl, 
  rgbToHex
} from '@/lib/utils';

// Define ColorVariations type locally
interface ColorVariations {
  complementary?: Color[];
  analogous?: Color[];
  triadic?: Color[];
  monochromatic?: Color[];
}

// Generate color variations
const generateColorVariations = (colors: Color[]): ColorVariations => {
  if (colors.length === 0) return {};
  
  const baseColor = colors[0];
  const hsl = baseColor.hsl;
  
  const variations: ColorVariations = {};
  
  // Complementary (opposite on color wheel)
  const complementaryHsl = { h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l };
  variations.complementary = [{
    hex: hslToHex(complementaryHsl.h, complementaryHsl.s, complementaryHsl.l),
    rgb: hslToRgb(complementaryHsl.h, complementaryHsl.s, complementaryHsl.l),
    hsl: complementaryHsl,
    name: 'Complementary'
  }];
  
  // Analogous (adjacent colors)
  const analogous1 = { h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l };
  const analogous2 = { h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l };
  variations.analogous = [
    {
      hex: hslToHex(analogous1.h, analogous1.s, analogous1.l),
      rgb: hslToRgb(analogous1.h, analogous1.s, analogous1.l),
      hsl: analogous1,
      name: 'Analogous 1'
    },
    {
      hex: hslToHex(analogous2.h, analogous2.s, analogous2.l),
      rgb: hslToRgb(analogous2.h, analogous2.s, analogous2.l),
      hsl: analogous2,
      name: 'Analogous 2'
    }
  ];
  
  // Triadic (120 degrees apart)
  const triadic1 = { h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l };
  const triadic2 = { h: (hsl.h + 240) % 360, s: hsl.s, l: hsl.l };
  variations.triadic = [
    {
      hex: hslToHex(triadic1.h, triadic1.s, triadic1.l),
      rgb: hslToRgb(triadic1.h, triadic1.s, triadic1.l),
      hsl: triadic1,
      name: 'Triadic 1'
    },
    {
      hex: hslToHex(triadic2.h, triadic2.s, triadic2.l),
      rgb: hslToRgb(triadic2.h, triadic2.s, triadic2.l),
      hsl: triadic2,
      name: 'Triadic 2'
    }
  ];
  
  // Monochromatic (same hue, different saturation/lightness)
  variations.monochromatic = [
    { ...baseColor, name: 'Original' },
    {
      hex: hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
      rgb: hslToRgb(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
      hsl: { h: hsl.h, s: hsl.s, l: Math.max(0, hsl.l - 20) },
      name: 'Darker'
    },
    {
      hex: hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20)),
      rgb: hslToRgb(hsl.h, hsl.s, Math.min(100, hsl.l + 20)),
      hsl: { h: hsl.h, s: hsl.s, l: Math.min(100, hsl.l + 20) },
      name: 'Lighter'
    }
  ];
  
  return variations;
};

// Helper functions for HSL conversion
const hslToHex = (h: number, s: number, l: number): string => {
  const rgb = hslToRgb(h, s, l);
  return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 1/6) {
    r = c; g = x; b = 0;
  } else if (1/6 <= h && h < 2/6) {
    r = x; g = c; b = 0;
  } else if (2/6 <= h && h < 3/6) {
    r = 0; g = c; b = x;
  } else if (3/6 <= h && h < 4/6) {
    r = 0; g = x; b = c;
  } else if (4/6 <= h && h < 5/6) {
    r = x; g = 0; b = c;
  } else if (5/6 <= h && h < 1) {
    r = c; g = 0; b = x;
  }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
};

// Simple Tooltip Component
const Tooltip = ({ children, content, position = 'top' }: { children: React.ReactNode; content: string; position?: 'top' | 'bottom' | 'left' | 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap ${
          position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-1' :
          position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-1' :
          position === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-1' :
          'left-full top-1/2 -translate-y-1/2 ml-1'
        }`}>
          {content}
          <div className={`absolute w-0 h-0 border-4 border-transparent ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-gray-900' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-gray-900' :
            'right-full top-1/2 -translate-y-1/2 border-r-gray-900'
          }`}></div>
        </div>
      )}
    </div>
  );
};

interface ColorPaletteGeneratorClientProps {}

export default function ColorPaletteGeneratorClient({}: ColorPaletteGeneratorClientProps) {
  const [palette, setPalette] = useState<Color[]>([]);
  const [variations, setVariations] = useState<ColorVariations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [paletteName, setPaletteName] = useState('');
  const [colorCount, setColorCount] = useState(5);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedImageColors, setExtractedImageColors] = useState<Color[]>([]);
  
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+R or Cmd+R for random palette
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        if (!isLoading) {
          // Call the function directly to avoid dependency issues
          setIsLoading(true);
          setTimeout(() => {
            const colors: Color[] = [];
            for (let i = 0; i < colorCount; i++) {
              const hex = generateRandomColor();
              const rgb = hexToRgb(hex);
              
              if (rgb) {
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                
                colors.push({
                  hex,
                  rgb,
                  hsl,
                  name: `Color ${i + 1}`
                });
              }
            }
            
            setPalette(colors);
            setVariations(null);
            setImagePreview(null);
            setExtractedImageColors([]);
            
            // Track palette generation
            trackColorPaletteGeneration('random', colorCount);
            trackToolUsage('color_palette', 'generate_random', { palette_size: colorCount });
            
            toast.success(`Generated ${colorCount} random colors!`);
            setIsLoading(false);
          }, 500);
        }
      }
      // Escape to close color picker
      if (event.key === 'Escape') {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [colorCount, isLoading]);


  // Generate random palette
  const generateRandomPalette = useCallback(() => {
    setIsLoading(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const colors: Color[] = [];
      for (let i = 0; i < colorCount; i++) {
        const hex = generateRandomColor();
        const rgb = hexToRgb(hex);
        
        if (rgb) {
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
          
          colors.push({
            hex,
            rgb,
            hsl,
            name: `Color ${i + 1}`
          });
        }
      }
      
      setPalette(colors);
      setVariations(null); // Clear variations for random palette
      setImagePreview(null); // Clear image preview
      setExtractedImageColors([]); // Clear extracted colors
      toast.success(`Generated ${colorCount} random colors!`);
      setIsLoading(false);
    }, 500);
  }, [colorCount]);

  // Generate palette from base color
  const generateFromBaseColor = useCallback((baseColor: string) => {
    setIsLoading(true);
    
    const baseRgb = hexToRgb(baseColor);
    if (!baseRgb) {
      toast.error('Invalid base color');
      setIsLoading(false);
      return;
    }

    // Simulate a small delay for better UX
    setTimeout(() => {
      const generatedVariations = generateColorVariations([{ hex: baseColor, rgb: baseRgb, hsl: rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b), name: 'Base Color' }]);
      
      const colors: Color[] = [];
      colors.push({ hex: baseColor, rgb: baseRgb, hsl: rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b), name: 'Base Color' });
      
      // Add some variations to the main palette for display
      if (generatedVariations.analogous && generatedVariations.analogous.length > 0) {
        colors.push(generatedVariations.analogous[0]);
      }
      if (generatedVariations.complementary && generatedVariations.complementary.length > 0) {
        colors.push(generatedVariations.complementary[0]);
      }
      if (generatedVariations.triadic && generatedVariations.triadic.length > 0) {
        colors.push(generatedVariations.triadic[0]);
      }
      
      setPalette(colors.slice(0, colorCount)); // Limit to colorCount
      setVariations(generatedVariations);
      setImagePreview(null); // Clear image preview
      setExtractedImageColors([]); // Clear extracted colors
      
      // Track palette generation
      trackColorPaletteGeneration('base_color', colorCount);
      trackToolUsage('color_palette', 'generate_from_base', { 
        palette_size: colorCount,
        base_color: baseColor 
      });
      
      toast.success(`Generated palette from ${baseColor}!`);
      setIsLoading(false);
    }, 500);
  }, [colorCount]);

  // Handle image upload and color extraction (client-side)
  const onDrop = useCallback(async (acceptedFiles: File[]) => {

    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size exceeds 5MB limit.');
      return;
    }

    setIsLoading(true);
    setExtractedImageColors([]);
    setPalette([]);
    setVariations(null);

    try {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Create canvas to extract colors
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData) return;
        
        // Improved color extraction - get dominant colors
        const colors: { [key: string]: number } = {};
        const data = imageData.data;
        
        // Sample every 5th pixel for better accuracy
        for (let i = 0; i < data.length; i += 20) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          if (a > 128) { // Skip transparent pixels
            // Quantize colors to reduce noise
            const quantizedR = Math.round(r / 16) * 16;
            const quantizedG = Math.round(g / 16) * 16;
            const quantizedB = Math.round(b / 16) * 16;
            
            const hex = `#${quantizedR.toString(16).padStart(2, '0')}${quantizedG.toString(16).padStart(2, '0')}${quantizedB.toString(16).padStart(2, '0')}`;
            colors[hex] = (colors[hex] || 0) + 1;
          }
        }
        
        // Get most common colors and filter out very similar colors
        const sortedColors = Object.entries(colors)
          .sort(([,a], [,b]) => b - a)
          .slice(0, colorCount * 2) // Get more colors initially
          .map(([hex, count]) => {
            const rgb = hexToRgb(hex);
            return {
              hex,
              rgb: rgb || { r: 0, g: 0, b: 0 },
              hsl: rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 },
              name: 'Extracted Color',
              count
            };
          })
          .filter((color, index, arr) => {
            // Filter out colors that are too similar to already selected colors
            return !arr.slice(0, index).some(existingColor => {
              const distance = Math.sqrt(
                Math.pow(color.rgb.r - existingColor.rgb.r, 2) +
                Math.pow(color.rgb.g - existingColor.rgb.g, 2) +
                Math.pow(color.rgb.b - existingColor.rgb.b, 2)
              );
              return distance < 50; // Threshold for color similarity
            });
          })
          .slice(0, colorCount); // Take only the requested number
        
        setExtractedImageColors(sortedColors);
        setPalette(sortedColors);
        
        // Track image color extraction
        trackColorPaletteGeneration('image', sortedColors.length);
        trackToolUsage('color_palette', 'extract_from_image', { 
          palette_size: sortedColors.length,
          image_size: `${img.width}x${img.height}`
        });
        
        toast.success(`Extracted ${sortedColors.length} colors from image!`);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        toast.error('Failed to load image');
        setIsLoading(false);
      };
      
      img.src = previewUrl;
      
    } catch (error) {
      console.error('Color extraction error:', error);
      toast.error('Failed to extract colors from image');
      setIsLoading(false);
    }
  }, [colorCount]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: isLoading
  });

  // Copy color to clipboard
  const copyColor = async (color: string, format: 'hex' | 'rgb' | 'hsl') => {
    let textToCopy = color;
    if (format === 'rgb') {
      const rgb = hexToRgb(color);
      textToCopy = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color;
    } else if (format === 'hsl') {
      const rgb = hexToRgb(color);
      const hsl = rgb && rgbToHsl(rgb.r, rgb.g, rgb.b);
      textToCopy = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : color;
    }
    
    const success = await copyToClipboard(textToCopy);
    if (success) {
      toast.success(`${format.toUpperCase()} copied!`);
    } else {
      toast.error('Failed to copy color');
    }
  };

  // Copy all colors to clipboard
  const copyAllColors = async (format: 'hex' | 'rgb' | 'hsl') => {
    if (palette.length === 0) {
      toast.error('No colors to copy!');
      return;
    }

    let textToCopy = '';
    palette.forEach((color, index) => {
      let colorText = color.hex;
      if (format === 'rgb') {
        colorText = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
      } else if (format === 'hsl') {
        colorText = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
      }
      textToCopy += colorText + (index < palette.length - 1 ? '\n' : '');
    });
    
    const success = await copyToClipboard(textToCopy);
    if (success) {
      toast.success(`All ${palette.length} colors copied as ${format.toUpperCase()}!`);
    } else {
      toast.error('Failed to copy colors');
    }
  };

  // Download palette
  const downloadPalette = (format: 'json' | 'css' | 'scss' | 'txt') => {
    if (palette.length === 0) {
      toast.error('No palette to download!');
      return;
    }

    let content = '';
    let filename = `${paletteName || 'color-palette'}.${format}`;

    switch (format) {
      case 'json':
        content = JSON.stringify({ name: paletteName, colors: palette }, null, 2);
        break;
      case 'css':
        content = `:root {\n${palette.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}\n\n`;
        content += palette.map((c, i) => `.color-${i + 1} { color: ${c.hex}; background-color: ${c.hex}; }`).join('\n');
        break;
      case 'scss':
        content = palette.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n');
        break;
      case 'txt':
        content = palette.map(c => c.hex).join('\n');
        break;
    }

    const blob = new Blob([content], { type: `text/${format};charset=utf-8;` });
    saveAs(blob, filename);
    
    // Track download
    trackFileDownload(filename, format, 'color_palette');
    trackToolUsage('color_palette', `download_${format}`, { palette_size: palette.length });
    
    toast.success(`${format.toUpperCase()} palette downloaded!`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <Palette className="w-16 h-16 text-secondary-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Color Palette Generator</h1>
        <p className="text-lg text-gray-600">
          Create beautiful color palettes from images, generate random combinations, or start with a base color. Perfect for designers and developers.
        </p>
      </div>


      {/* Controls */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generate Your Palette</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Number of Colors */}
          <div>
            <label htmlFor="colorCount" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Colors
            </label>
            <select
              id="colorCount"
              value={colorCount}
              onChange={(e) => setColorCount(Number(e.target.value))}
              className="input-field"
              disabled={isLoading}
            >
              {[3, 4, 5, 6, 8, 10].map((num) => (
                <option key={num} value={num}>{num} Colors</option>
              ))}
            </select>
          </div>

          {/* Palette Name */}
          <div>
            <label htmlFor="paletteName" className="block text-sm font-medium text-gray-700 mb-2">
              Palette Name (optional)
            </label>
            <input
              type="text"
              id="paletteName"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="My Awesome Palette"
              className="input-field"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Random Palette */}
          <Tooltip content="Generate a random color palette (Ctrl+R)">
            <button
              onClick={generateRandomPalette}
              disabled={isLoading}
              className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span>Random Palette</span>
            </button>
          </Tooltip>

          {/* Base Color Picker */}
          <div className="relative">
            <Tooltip content="Choose a base color to generate harmonious variations">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="btn-secondary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: selectedColor }}></div>
                <span>Base Color: {selectedColor}</span>
              </button>
            </Tooltip>
            {showColorPicker && (
              <div ref={colorPickerRef} className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 max-w-full">
                <div className="w-full max-w-xs mx-auto">
                  <ChromePicker
                    color={selectedColor}
                    onChange={(color) => setSelectedColor(color.hex)}
                    disableAlpha={true}
                  />
                </div>
                <button
                  onClick={() => {
                    generateFromBaseColor(selectedColor);
                    setShowColorPicker(false);
                  }}
                  className="btn-primary w-full mt-2"
                  disabled={isLoading}
                >
                  Generate from Base
                </button>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <Tooltip content="Upload an image to extract dominant colors automatically">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <input {...getInputProps()} disabled={isLoading} />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              {isDragActive ? (
                <p className="text-primary-700">Drop the image here ...</p>
              ) : (
                <p className="text-gray-600">Drag 'n' drop an image here, or click to select file</p>
              )}
              <p className="text-xs text-gray-500 mt-1">(Max 5MB, JPG, PNG, GIF, WEBP)</p>
              {isLoading && (
                <div className="flex items-center justify-center mt-2 text-primary-600">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Extracting colors...</span>
                </div>
              )}
            </div>
          </Tooltip>
        </div>

        {imagePreview && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Image Preview</h3>
            <img src={imagePreview} alt="Uploaded preview" className="max-w-full h-auto rounded-lg shadow-medium mx-auto" />
            {extractedImageColors.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {extractedImageColors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                    onClick={() => copyColor(color.hex, 'hex')}
                  ></div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Generated Palette */}
      {isLoading && palette.length === 0 ? (
        <ColorPaletteSkeleton />
      ) : palette.length > 0 && (
        <div className="card animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generated Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div key={index} className="color-preview group relative rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="h-24" style={{ backgroundColor: color.hex }}></div>
                <div className="p-3 text-center">
                  <p className="font-mono text-sm text-gray-800 group-hover:text-primary-600 transition-colors">
                    {color.hex}
                  </p>
                  <div className="flex justify-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button onClick={() => copyColor(color.hex, 'hex')} className="text-gray-500 hover:text-primary-600" title="Copy HEX">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button onClick={() => copyColor(color.hex, 'rgb')} className="text-gray-500 hover:text-primary-600" title="Copy RGB">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Copy All Options */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Copy All Colors</h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => copyAllColors('hex')} className="btn-ghost flex items-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Copy HEX</span>
              </button>
              <button onClick={() => copyAllColors('rgb')} className="btn-ghost flex items-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Copy RGB</span>
              </button>
              <button onClick={() => copyAllColors('hsl')} className="btn-ghost flex items-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Copy HSL</span>
              </button>
            </div>
          </div>

          {/* Export Options */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Export Palette</h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => downloadPalette('json')} className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>JSON</span>
              </button>
              <button onClick={() => downloadPalette('css')} className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>CSS</span>
              </button>
              <button onClick={() => downloadPalette('scss')} className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>SCSS</span>
              </button>
              <button onClick={() => downloadPalette('txt')} className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>TXT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Color Variations */}
      {variations && (
        <div className="card animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Color Variations</h2>
          <div className="space-y-6">
            {Object.entries(variations).map(([type, colors]) => (
              <div key={type} className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700 capitalize">
                  {type.replace(/([A-Z])/g, ' $1').trim()}
                </h5>
                <div className="flex space-x-2">
                  {colors.map((color: Color, index: number) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyColor(color.hex, 'hex')}
                      title={color.hex}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Use Our Color Palette Generator?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3 card">
            <Image className="w-6 h-6 text-secondary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Image Analysis</h3>
              <p className="text-sm text-gray-600">Extract colors directly from your images to create stunning palettes.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 card">
            <Download className="w-6 h-6 text-secondary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Multiple Formats</h3>
              <p className="text-sm text-gray-600">Export your palettes as CSS, SCSS, JSON, or plain text for any project.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 card">
            <Sparkles className="w-6 h-6 text-secondary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Smart Generation</h3>
              <p className="text-sm text-gray-600">AI-powered color harmony and variations to inspire your designs.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 card">
            <Copy className="w-6 h-6 text-secondary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Easy Copy</h3>
              <p className="text-sm text-gray-600">Copy colors in HEX, RGB, or HSL format with a single click.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
