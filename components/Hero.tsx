import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Palette, Zap, Shield, Clock, Star, Users, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 section-padding">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-secondary-500/5 to-accent-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Modern Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-primary-200/50 text-primary-700 text-sm font-semibold mb-8 animate-fade-in-down">
            <Star className="w-4 h-4 mr-2 text-primary-500" />
            Professional Web Tools Platform
            <Star className="w-4 h-4 ml-2 text-primary-500" />
          </div>

          {/* Modern Headline */}
          <h1 className="heading-1 mb-6 animate-fade-in-up">
            Boost Your Productivity with{' '}
            <span className="text-gradient-primary">
              Professional Tools
            </span>
          </h1>

          {/* Modern Subtitle */}
          <p className="body-large mb-12 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Extract emails from websites and generate beautiful color palettes with our 
            powerful, easy-to-use tools. Perfect for marketers, designers, and entrepreneurs.
          </p>

          {/* Modern CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/tools/email-extractor" className="btn-primary text-base px-8 py-4 group">
              <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              Extract Emails
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link href="/tools/color-palette" className="btn-secondary text-base px-8 py-4 group">
              <Palette className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              Generate Palettes
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Modern Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="card text-center group hover:shadow-colored">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="heading-4 mb-2">Lightning Fast</h3>
              <p className="body-small">Instant results</p>
            </div>
            <div className="card text-center group hover:shadow-colored">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="heading-4 mb-2">100% Secure</h3>
              <p className="body-small">Privacy protected</p>
            </div>
            <div className="card text-center group hover:shadow-colored">
              <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="heading-4 mb-2">Always Available</h3>
              <p className="body-small">24/7 access</p>
            </div>
          </div>

          {/* Modern Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="card text-center group hover:shadow-medium">
              <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">10K+</div>
              <div className="body-small font-medium">Emails Extracted</div>
            </div>
            <div className="card text-center group hover:shadow-medium">
              <div className="text-3xl md:text-4xl font-bold text-gradient-secondary mb-2">5K+</div>
              <div className="body-small font-medium">Color Palettes</div>
            </div>
            <div className="card text-center group hover:shadow-medium">
              <div className="text-3xl md:text-4xl font-bold text-gradient-accent mb-2">2K+</div>
              <div className="body-small font-medium">Happy Users</div>
            </div>
            <div className="card text-center group hover:shadow-medium">
              <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">99.9%</div>
              <div className="body-small font-medium">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
