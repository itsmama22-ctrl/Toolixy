import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Palette, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="gradient-bg pt-20 pb-16">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            All-in-One Digital Toolkit
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Boost Your Productivity with{' '}
            <span className="text-gradient">Professional Tools</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Extract emails from websites and generate beautiful color palettes with our 
            powerful, easy-to-use tools. Perfect for marketers, designers, and entrepreneurs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/tools/email-extractor" className="btn-primary text-lg px-8 py-3">
              <Mail className="w-5 h-5 mr-2" />
              Extract Emails
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/tools/color-palette" className="btn-secondary text-lg px-8 py-3">
              <Palette className="w-5 h-5 mr-2" />
              Generate Palettes
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Emails Extracted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">5K+</div>
              <div className="text-gray-600">Color Palettes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">2K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
