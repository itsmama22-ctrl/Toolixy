import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Palette, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600/90 to-secondary-600/90"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center text-white">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-10 shadow-2xl border border-white/20">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Ready to <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">Boost Your Productivity?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Join thousands of professionals who use our tools to streamline their workflow 
            and achieve better results. Start free today!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/tools/email-extractor"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold bg-white text-primary-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-white/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Mail className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Try Email Extractor</span>
              <ArrowRight className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/tools/color-palette"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Palette className="w-6 h-6 mr-3" />
              <span>Try Color Generator</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-lg">No credit card required</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-lg">Free forever plan available</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-lg">Setup in under 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
