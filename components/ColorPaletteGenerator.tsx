'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Palette, Upload, Download, Copy, RefreshCw, Image, Loader2, Eye } from 'lucide-react';
import { ChromePicker } from 'react-color';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import type { Color, ColorPalette, PaletteGenerationRequest } from '@/types';
import { 
  copyToClipboard, 
  generateRandomColor, 
  hexToRgb, 
  rgbToHsl, 
  rgbToHex,
  hasReachedLimit 
} from '@/lib/utils';

interface ColorPaletteGeneratorProps {
  userPlan?: 'free' | 'pro';
  userUsage?: {
    paletteGenerations: number;
  };
}

interface ColorVariations {
  complementary: Color[];
  triadic: Color[];
  analogous: Color[];
  monochromatic: Color[];
}

export default function ColorPaletteGenerator({ 
  userPlan = 'free', 
  userUsage = { paletteGenerations: 0 } 
}: ColorPaletteGeneratorProps) {
  const [palette, setPalette] = useState<Color[]>([]);
  const [variations, setVariations] = useState<ColorVariations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [paletteName, setPaletteName] = useState('');
  const [colorCount, setColorCount] = useState(5);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedImageColors, setExtractedImageColors] = useState<Color[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Usage limits
  const FREE_LIMIT = 3;
  const hasReachedUsageLimit = hasReachedLimit(userUsage.paletteGenerations, FREE_LIMIT, userPlan);

  // Generate random palette
  const generateRandomPalette = useCallback(() => {
    if (hasReachedUsageLimit) {
      toast.error('You have reached your daily limit. Upgrade to Pro for unlimited generations.');
      return;
    }

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
    toast.success(`Generated ${colorCount} random colors!`);
  }, [colorCount, hasReachedUsageLimit]);

  // Generate palette from base color
  const generateFromBaseColor = useCallback((baseColor: string) => {
    if (hasReachedUsageLimit) {
      toast.error('You have reached your daily limit. Upgrade to Pro for unlimited generations.');
      return;
    }

    const baseRgb = hexToRgb(baseColor);
    if (!baseRgb) return;

    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
    const colors: Color[] = [];

    // Generate variations based on the base color
    const variations = [0, 30, 60, 120, 180, 240, 300]; // Different hue shifts
    
    for (let i = 0; i < colorCount; i++) {
      const hueShift = variations[i % variations.length];
      const newH = (baseHsl.h + hueShift) % 360;
      const newS = Math.max(20, Math.min(100, baseHsl.s + (Math.random() - 0.5) * 40));
      const newL = Math.max(20, Math.min(80, baseHsl.l + (Math.random() - 0.5) * 40));
      
      const newRgb = hslToRgb(newH, newS, newL);
      const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      
      colors.push({
        hex,
        rgb: newRgb,
        hsl: { h: newH, s: newS, l: newL },
        name: `Color ${i + 1}`
      });
    }

    setPalette(colors);
    setVariations(null);
    toast.success(`Generated palette from ${baseColor}!`);
  }, [colorCount, hasReachedUsageLimit]);

  // Handle image upload and color extraction
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (hasReachedUsageLimit) {
      toast.error('You have reached your daily limit. Upgrade to Pro for unlimited generations.');
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setIsLoading(true);

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Prepare form data
      const formData = new FormData();
      formData.append('image', file);
      formData.append('colorCount', colorCount.toString());

      // Extract colors from image
      const response = await fetch('/.netlify/functions/color-extractor', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract colors from image');
      }

      if (data.success) {
        const extractedColors = data.data.extractedColors.map((color: any) => ({
          hex: color.hex,
          rgb: color.rgb,
          hsl: color.hsl,
          name: `Extracted ${Math.round(color.percentage)}%`
        }));

        setExtractedImageColors(extractedColors);
        setPalette(extractedColors);
        setVariations(data.data.variations);
        toast.success(`Extracted ${extractedColors.length} colors from image!`);
      } else {
        throw new Error(data.error || 'Failed to extract colors');
      }
    } catch (error) {
      console.error('Color extraction error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to extract colors');
    } finally {
      setIsLoading(false);
    }
  }, [colorCount, hasReachedUsageLimit]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: isLoading || hasReachedUsageLimit
  });

  // Copy color to clipboard
  const copyColor = async (color: string, format: 'hex' | 'rgb' | 'hsl') => {
    let textToCopy = color;
    
    if (format === 'rgb') {
      const rgb = hexToRgb(color);
      if (rgb) textToCopy = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (format === 'hsl') {
      const rgb = hexToRgb(color);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        textToCopy = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      }
    }

    const success = await copyToClipboard(textToCopy);
    if (success) {
      toast.success(`Copied ${format.toUpperCase()} to clipboard!`);
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  // Download palette
  const downloadPalette = (format: 'json' | 'css' | 'scss' | 'txt') => {
    if (palette.length === 0) {
      toast.error('No palette to download');
      return;
    }

    const name = paletteName || `palette-${new Date().toISOString().split('T')[0]}`;
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'json':
        content = JSON.stringify(palette, null, 2);
        filename = `${name}.json`;
        mimeType = 'application/json';
        break;
      case 'css':
        content = palette.map((color, index) => 
          `  --color-${index + 1}: ${color.hex};`
        ).join('\n');
        content = `:root {\n${content}\n}`;
        filename = `${name}.css`;
        mimeType = 'text/css';
        break;
      case 'scss':
        content = palette.map((color, index) => 
          `$color-${index + 1}: ${color.hex};`
        ).join('\n');
        filename = `${name}.scss`;
        mimeType = 'text/scss';
        break;
      case 'txt':
        content = palette.map((color, index) => 
          `Color ${index + 1}: ${color.hex} (RGB: ${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
        ).join('\n');
        filename = `${name}.txt`;
        mimeType = 'text/plain';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    saveAs(blob, filename);
    toast.success(`Downloaded ${format.toUpperCase()} file!`);
  };

  const remainingUsage = userPlan === 'pro' ? 'Unlimited' : FREE_LIMIT - userUsage.paletteGenerations;

  // HSL to RGB conversion
  function hslToRgb(h: number, s: number, l: number) {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full">
          <Palette className="w-8 h-8 text-secondary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Color Palette Generator</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create beautiful color palettes from images, generate random combinations, 
          or start with a base color. Perfect for designers and developers.
        </p>
      </div>

      {/* Usage Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-purple-600" />
            <span className="text-purple-800 font-medium">Daily Usage</span>
          </div>
          <span className="text-purple-700">
            {userPlan === 'pro' ? 'Unlimited' : `${remainingUsage} generations remaining`}
          </span>
        </div>
        {userPlan === 'free' && typeof remainingUsage === 'number' && remainingUsage <= 1 && (
          <p className="text-purple-600 text-sm mt-2">
            <a href="/pricing" className="underline hover:text-purple-700">
              Upgrade to Pro for unlimited generations
            </a>
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="card space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Color Count */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of Colors
            </label>
            <select
              value={colorCount}
              onChange={(e) => setColorCount(parseInt(e.target.value))}
              className="input-field"
              disabled={isLoading || hasReachedUsageLimit}
            >
              <option value={3}>3 Colors</option>
              <option value={4}>4 Colors</option>
              <option value={5}>5 Colors</option>
              <option value={6}>6 Colors</option>
              <option value={8}>8 Colors</option>
            </select>
          </div>

          {/* Palette Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Palette Name (optional)
            </label>
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="My Awesome Palette"
              className="input-field"
            />
          </div>

          {/* Base Color Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Base Color
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-full h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center space-x-2"
                style={{ backgroundColor: selectedColor }}
                disabled={isLoading || hasReachedUsageLimit}
              >
                <span className="text-white font-medium text-sm">
                  {selectedColor}
                </span>
              </button>
              <button
                onClick={() => generateFromBaseColor(selectedColor)}
                disabled={isLoading || hasReachedUsageLimit}
                className="btn-primary px-4"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Color Picker */}
        {showColorPicker && (
          <div className="flex justify-center">
            <ChromePicker
              color={selectedColor}
              onChange={(color) => setSelectedColor(color.hex)}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={generateRandomPalette}
            disabled={isLoading || hasReachedUsageLimit}
            className="btn-primary flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Random Palette</span>
          </button>

          <div {...getRootProps()} className="flex-1">
            <input {...getInputProps()} />
            <button
              type="button"
              disabled={isLoading || hasReachedUsageLimit}
              className={`w-full btn-secondary flex items-center justify-center space-x-2 ${
                isDragActive ? 'bg-gray-200' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>{isDragActive ? 'Drop image here' : 'Upload Image'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Image Preview</h3>
            <div className="flex items-center space-x-4">
              <img
                src={imagePreview}
                alt="Uploaded image"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex-1">
                <p className="text-gray-600">
                  Colors extracted from this image are displayed below.
                </p>
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setExtractedImageColors([]);
                  }}
                  className="text-red-600 hover:text-red-700 text-sm mt-2"
                >
                  Remove image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generated Palette */}
      {palette.length > 0 && (
        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Generated Palette</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => downloadPalette('css')}
                className="btn-outline text-sm"
              >
                <Download className="w-4 h-4 mr-1" />
                CSS
              </button>
              <button
                onClick={() => downloadPalette('scss')}
                className="btn-outline text-sm"
              >
                <Download className="w-4 h-4 mr-1" />
                SCSS
              </button>
              <button
                onClick={() => downloadPalette('json')}
                className="btn-outline text-sm"
              >
                <Download className="w-4 h-4 mr-1" />
                JSON
              </button>
              <button
                onClick={() => downloadPalette('txt')}
                className="btn-outline text-sm"
              >
                <Download className="w-4 h-4 mr-1" />
                TXT
              </button>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="color-preview w-full h-24 rounded-lg border border-gray-200 cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyColor(color.hex, 'hex')}
                  title="Click to copy HEX"
                />
                <div className="space-y-1">
                  <p className="font-mono text-sm text-gray-700">{color.hex}</p>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => copyColor(color.hex, 'hex')}
                      className="text-xs text-gray-500 hover:text-gray-700"
                      title="Copy HEX"
                    >
                      HEX
                    </button>
                    <button
                      onClick={() => copyColor(color.hex, 'rgb')}
                      className="text-xs text-gray-500 hover:text-gray-700"
                      title="Copy RGB"
                    >
                      RGB
                    </button>
                    <button
                      onClick={() => copyColor(color.hex, 'hsl')}
                      className="text-xs text-gray-500 hover:text-gray-700"
                      title="Copy HSL"
                    >
                      HSL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Color Variations */}
          {variations && (
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-900">Color Variations</h4>
              <div className="grid md:grid-cols-2 gap-4">
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
                          title={`${color.hex} - Click to copy`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Use Our Color Palette Generator?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Eye className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Image Analysis</h4>
              <p className="text-gray-600 text-sm">Extract colors directly from your images</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Download className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Multiple Formats</h4>
              <p className="text-gray-600 text-sm">Export as CSS, SCSS, JSON, or plain text</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <RefreshCw className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Smart Generation</h4>
              <p className="text-gray-600 text-sm">AI-powered color harmony and variations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Copy className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Easy Copy</h4>
              <p className="text-gray-600 text-sm">Copy colors in HEX, RGB, or HSL format</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
