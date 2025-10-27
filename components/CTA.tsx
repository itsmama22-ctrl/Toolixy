import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Palette, Sparkles, CheckCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600/95 to-secondary-600/95"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center text-white max-w-6xl mx-auto">
          {/* Modern Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 glass-dark rounded-3xl mb-10 shadow-2xl animate-fade-in-down">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>

          {/* Modern Headline */}
          <h2 className="heading-1 mb-8 text-white animate-fade-in-up">
            Ready to <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">Boost Your Productivity?</span>
          </h2>

          {/* Modern Subtitle */}
          <p className="body-large text-white/90 mb-12 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join thousands of professionals who use our tools to streamline their workflow 
            and achieve better results. Start free today!
          </p>

          {/* Modern CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/tools/email-extractor"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-white text-primary-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-white/25"
            >
              <Mail className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span>Try Email Extractor</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/tools/color-palette"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold glass-dark text-white border-2 border-white/30 hover:bg-white/30 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Palette className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span>Try Color Generator</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Modern Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-center gap-3 glass-dark rounded-2xl p-6 border border-white/20 group hover:bg-white/20 transition-all duration-300">
              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-medium text-lg">No credit card required</span>
            </div>
            <div className="flex items-center justify-center gap-3 glass-dark rounded-2xl p-6 border border-white/20 group hover:bg-white/20 transition-all duration-300">
              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-medium text-lg">Free forever plan available</span>
            </div>
            <div className="flex items-center justify-center gap-3 glass-dark rounded-2xl p-6 border border-white/20 group hover:bg-white/20 transition-all duration-300">
              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-medium text-lg">Setup in under 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
