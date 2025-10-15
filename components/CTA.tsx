import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Palette, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="container-custom">
        <div className="text-center text-white">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-8">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Boost Your Productivity?
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who use our tools to streamline their workflow 
            and achieve better results. Start free today!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/tools/email-extractor"
              className="inline-flex items-center justify-center bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <Mail className="w-5 h-5 mr-2" />
              Try Email Extractor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/tools/color-palette"
              className="inline-flex items-center justify-center bg-white/20 text-white hover:bg-white/30 font-medium py-3 px-8 rounded-lg transition-colors duration-200 border border-white/30"
            >
              <Palette className="w-5 h-5 mr-2" />
              Try Color Generator
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Free forever plan available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Setup in under 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
