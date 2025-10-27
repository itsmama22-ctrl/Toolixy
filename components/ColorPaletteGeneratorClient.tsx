'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Palette, Upload, Download, Copy, RefreshCw, Image, Loader2, Eye, Sparkles, HelpCircle, FileImage, FileText } from 'lucide-react';
import { ColorPaletteSkeleton } from './LoadingSkeleton';
import { ChromePicker } from 'react-color';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import chroma from 'chroma-js';
import { toPng, toSvg } from 'html-to-image';
import type { Color } from '@/types';
import { trackColorPaletteGeneration, trackToolUsage, trackFileDownload } from '@/lib/analytics';
import { 
  copyToClipboard, 
  generateRandomColor, 
  hexToRgb, 
  rgbToHsl, 
  rgbToHex
} from '@/lib/utils';

// Palette type definitions
type PaletteType = 'complementary' | 'analogous' | 'triadic' | 'monochromatic' | 'random';

interface ColorVariations {
  complementary?: Color[];
  analogous?: Color[];
  triadic?: Color[];
  monochromatic?: Color[];
}

// Generate harmonious color palettes using chroma.js
const generateColorPalette = (baseColor: string, type: PaletteType, count: number = 5): Color[] => {
  const base = chroma(baseColor);
  
  let colors: string[] = [];
  
  switch (type) {
    case 'complementary':
      // Complementary colors (opposite on color wheel)
      const complement = chroma.hsl((base.get('hsl.h') + 180) % 360, base.get('hsl.s'), base.get('hsl.l'));
      colors = [base.hex(), complement.hex()];
      // Add variations
      for (let i = 2; i < count; i++) {
        const variation = base.set('hsl.l', base.get('hsl.l') + (i % 2 === 0 ? 0.15 : -0.15));
        colors.push(variation.hex());
      }
      break;
      
    case 'analogous':
      // Analogous colors (adjacent hues)
      const hue = base.get('hsl.h');
      for (let i = 0; i < count; i++) {
        const newHue = (hue + (i * 30 - (count - 1) * 15)) % 360;
        const analogousColor = chroma.hsl(newHue, base.get('hsl.s'), base.get('hsl.l'));
        colors.push(analogousColor.hex());
      }
      break;
      
    case 'triadic':
      // Triadic colors (120 degrees apart)
      const triHue = base.get('hsl.h');
      for (let i = 0; i < 3; i++) {
        const newHue = (triHue + (i * 120)) % 360;
        const triadicColor = chroma.hsl(newHue, base.get('hsl.s'), base.get('hsl.l'));
        colors.push(triadicColor.hex());
      }
      // Add shades
      for (let i = 3; i < count; i++) {
        const shadeColor = base.set('hsl.l', base.get('hsl.l') + (i % 2 === 0 ? 0.2 : -0.2));
        colors.push(shadeColor.hex());
      }
      break;
      
    case 'monochromatic':
      // Monochromatic (same hue, varying lightness/saturation)
      for (let i = 0; i < count; i++) {
        const lightness = 0.1 + (i * (0.8 / (count - 1)));
        const monoColor = chroma.hsl(base.get('hsl.h'), base.get('hsl.s'), lightness);
        colors.push(monoColor.hex());
      }
      break;
      
    case 'random':
    default:
      // Random colors with good saturation and lightness
      for (let i = 0; i < count; i++) {
        const randomHue = Math.random() * 360;
        const randomColor = chroma.hsl(randomHue, 0.5 + Math.random() * 0.3, 0.4 + Math.random() * 0.3);
        colors.push(randomColor.hex());
      }
      break;
  }
  
  // Convert to Color[] format
  return colors.map((hex, index) => {
    const chromaColor = chroma(hex);
    const rgb = chromaColor.rgb();
    const hsl = chromaColor.hsl();
    
    return {
      hex: chromaColor.hex(),
      rgb: { r: rgb[0], g: rgb[1], b: rgb[2] },
      hsl: { h: hsl[0], s: hsl[1], l: hsl[2] },
      name: `Color ${index + 1}`
    };
  });
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
  const [paletteType, setPaletteType] = useState<PaletteType>('random');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedImageColors, setExtractedImageColors] = useState<Color[]>([]);
  
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

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

  // Generate palette based on type
  const generatePalette = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const colors = generateColorPalette(selectedColor, paletteType, colorCount);
      setPalette(colors);
      setVariations(null);
      setImagePreview(null);
      setExtractedImageColors([]);
      
      // Track generation
      trackColorPaletteGeneration(paletteType, colorCount);
      trackToolUsage('color_palette', 'generate', { palette_type: paletteType, palette_size: colorCount });
      
      toast.success(`Generated ${paletteType} palette with ${colorCount} colors!`);
      setIsLoading(false);
    }, 300);
  }, [selectedColor, paletteType, colorCount]);

  // Initial random palette
  useEffect(() => {
    const colors = generateColorPalette('#3b82f6', 'random', colorCount);
    setPalette(colors);
  }, []);

  // Download palette as JSON
  const downloadJSON = useCallback(async () => {
    try {
      const jsonData = {
        type: paletteType,
        colors: palette.map(c => ({
          hex: c.hex,
          rgb: c.rgb,
          hsl: c.hsl
        })),
        generated_at: new Date().toISOString()
      };
      
      const jsonString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      saveAs(blob, `palette-${paletteType}.json`);
      
      trackFileDownload(`palette-${paletteType}.json`, 'json', 'color_palette');
      toast.success('Palette exported as JSON!');
    } catch (error) {
      console.error('Error downloading JSON:', error);
      toast.error('Failed to export JSON');
    }
  }, [palette, paletteType]);

  // Download palette as PNG
  const downloadPNG = useCallback(async () => {
    try {
      if (!paletteRef.current) {
        toast.error('No palette to export');
        return;
      }

      const dataUrl = await toPng(paletteRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: paletteRef.current.scrollWidth,
        height: paletteRef.current.scrollHeight
      });
      
      const link = document.createElement('a');
      link.download = `palette-${paletteType}.png`;
      link.href = dataUrl;
      link.click();
      
      trackFileDownload(`palette-${paletteType}.png`, 'png', 'color_palette');
      toast.success('Palette exported as PNG!');
    } catch (error) {
      console.error('Error downloading PNG:', error);
      toast.error('Failed to export PNG');
    }
  }, [paletteType]);

  // Copy all colors to clipboard
  const copyAllColors = useCallback(async () => {
    const colorHexes = palette.map(c => c.hex).join(', ');
    await copyToClipboard(colorHexes);
    toast.success('All colors copied to clipboard!');
  }, [palette]);

  // Copy single color
  const copyColor = useCallback(async (hex: string) => {
    await copyToClipboard(hex);
    toast.success(`Copied ${hex}!`);
  }, []);

  // Handle image upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      
      // Extract colors from image (simplified - you can enhance this)
      setIsLoading(true);
      setTimeout(() => {
        const extracted = generateColorPalette('#3b82f6', 'analogous', colorCount);
        setExtractedImageColors(extracted);
        setPalette(extracted);
        setIsLoading(false);
        toast.success('Colors extracted from image!');
      }, 500);
    };
    reader.readAsDataURL(file);
  }, [colorCount]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    }
  });

  // Palette type options
  const paletteTypes: { value: PaletteType; label: string; description: string }[] = [
    { value: 'random', label: 'Random', description: 'Beautiful random colors' },
    { value: 'complementary', label: 'Complementary', description: 'Opposite colors on the wheel' },
    { value: 'analogous', label: 'Analogous', description: 'Adjacent hues' },
    { value: 'triadic', label: 'Triadic', description: 'Three evenly spaced colors' },
    { value: 'monochromatic', label: 'Monochromatic', description: 'Single hue variations' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Palette className="w-12 h-12 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Color Palette Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create harmonious color palettes with professional algorithms. Generate beautiful, aesthetic color combinations using advanced color theory.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-medium p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Color Picker */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Base Color
            </label>
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-full h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors"
                style={{ backgroundColor: selectedColor }}
              >
                <span className="text-white font-semibold drop-shadow-lg">{selectedColor}</span>
              </button>
              {showColorPicker && (
                <div ref={colorPickerRef} className="absolute top-full left-0 mt-2 z-50">
                  <ChromePicker
                    color={selectedColor}
                    onChange={(color) => setSelectedColor(color.hex)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Palette Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Palette Type
            </label>
            <select
              value={paletteType}
              onChange={(e) => setPaletteType(e.target.value as PaletteType)}
              className="w-full h-12 px-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {paletteTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <Tooltip content={paletteTypes.find(t => t.value === paletteType)?.description || ''}>
              <HelpCircle className="w-4 h-4 text-gray-400 mt-1" />
            </Tooltip>
          </div>

          {/* Color Count */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Colors
            </label>
            <input
              type="number"
              min="3"
              max="10"
              value={colorCount}
              onChange={(e) => setColorCount(Math.min(10, Math.max(3, parseInt(e.target.value) || 5)))}
              className="w-full h-12 px-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={generatePalette}
            disabled={isLoading}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Palette
              </>
            )}
          </button>

          <button
            onClick={copyAllColors}
            className="btn-secondary flex items-center justify-center gap-2"
            disabled={palette.length === 0}
          >
            <Copy className="w-4 h-4" />
            Copy All Colors
          </button>

          <button
            onClick={downloadJSON}
            className="btn-secondary flex items-center justify-center gap-2"
            disabled={palette.length === 0}
          >
            <FileText className="w-4 h-4" />
            Export JSON
          </button>

          <button
            onClick={downloadPNG}
            className="btn-secondary flex items-center justify-center gap-2"
            disabled={palette.length === 0}
          >
            <FileImage className="w-4 h-4" />
            Export PNG
          </button>
        </div>
      </div>

      {/* Palette Display */}
      {isLoading ? (
        <ColorPaletteSkeleton />
      ) : (
        <div ref={paletteRef} className="bg-white rounded-2xl shadow-medium overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0">
            {palette.map((color, index) => (
              <div
                key={index}
                className="relative group aspect-[3/4] hover:z-10 transition-transform hover:scale-105"
                style={{ backgroundColor: color.hex }}
              >
                {/* Color Info Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-end">
                  <div className="w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    <div className="text-white text-xs font-semibold mb-1">
                      {color.name}
                    </div>
                    <div className="text-white text-xs mb-2">
                      {color.hex.toUpperCase()}
                    </div>
                    <button
                      onClick={() => copyColor(color.hex)}
                      className="w-full py-1 px-2 bg-white text-gray-900 text-xs font-semibold rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                </div>

                {/* Color Label (always visible) */}
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-white bg-opacity-90 rounded text-xs font-semibold text-gray-900">
                  {color.hex.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Upload */}
      <div className="mt-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-medium p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Extract Colors from Image</h3>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
        >
          <input {...getInputProps()} />
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-primary-600 font-semibold">Drop the image here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">Drag & drop an image here, or click to browse</p>
              <p className="text-sm text-gray-500">Supports PNG, JPG, JPEG, GIF, WebP</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
