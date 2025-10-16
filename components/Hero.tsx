import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Palette, Sparkles, Zap, Shield, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-400/20 to-primary-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Website Category Badge */}
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white text-lg font-bold mb-10 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-bounce-gentle">
            <Sparkles className="w-6 h-6 mr-3 animate-pulse" />
            Professional Web Tools Platform
            <Sparkles className="w-6 h-6 ml-3 animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Boost Your Productivity with{' '}
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent animate-pulse">
              Professional Tools
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
            Extract emails from websites and generate beautiful color palettes with our 
            powerful, easy-to-use tools. Perfect for marketers, designers, and entrepreneurs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/tools/email-extractor" className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-primary-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Mail className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Extract Emails</span>
              <ArrowRight className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="/tools/color-palette" className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white bg-gradient-to-r from-secondary-500 to-secondary-700 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-secondary-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-800 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Palette className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Generate Palettes</span>
              <ArrowRight className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <Zap className="w-8 h-8 text-primary-500 mr-4" />
              <div>
                <div className="font-bold text-gray-900">Lightning Fast</div>
                <div className="text-gray-600 text-sm">Instant results</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <Shield className="w-8 h-8 text-secondary-500 mr-4" />
              <div>
                <div className="font-bold text-gray-900">100% Secure</div>
                <div className="text-gray-600 text-sm">Privacy protected</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <Clock className="w-8 h-8 text-accent-500 mr-4" />
              <div>
                <div className="font-bold text-gray-900">Always Available</div>
                <div className="text-gray-600 text-sm">24/7 access</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-700 font-medium">Emails Extracted</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-secondary-600 to-secondary-800 bg-clip-text text-transparent mb-2">5K+</div>
              <div className="text-gray-700 font-medium">Color Palettes</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-accent-600 to-accent-800 bg-clip-text text-transparent mb-2">2K+</div>
              <div className="text-gray-700 font-medium">Happy Users</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2">99.9%</div>
              <div className="text-gray-700 font-medium">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
