import React from 'react';
import Link from 'next/link';
import { Mail, Palette, ArrowRight, CheckCircle } from 'lucide-react';

const tools = [
  {
    icon: Mail,
    title: 'Email Extractor',
    description: 'Extract email addresses from any website quickly and accurately. Perfect for lead generation and market research.',
    features: [
      'Extract emails from any website',
      'Export to CSV, TXT formats',
      'Remove duplicates automatically',
      'Respect robots.txt and terms of service',
      'Process multiple URLs at once',
      'Real-time extraction results'
    ],
    href: '/tools/email-extractor',
    color: 'primary',
    stats: {
      label: 'Emails extracted today',
      value: '2,847'
    }
  },
  {
    icon: Palette,
    title: 'Color Palette Generator',
    description: 'Create beautiful color palettes from images, generate random combinations, or start with a base color.',
    features: [
      'Extract colors from images',
      'Generate harmonious palettes',
      'Export to CSS, SCSS, JSON',
      'Color theory-based generation',
      'Preview on sample UIs',
      'Copy colors in multiple formats'
    ],
    href: '/tools/color-palette',
    color: 'secondary',
    stats: {
      label: 'Palettes generated today',
      value: '1,234'
    }
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case 'primary':
      return {
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        icon: 'text-primary-600',
        button: 'btn-primary',
        accent: 'text-primary-600'
      };
    case 'secondary':
      return {
        bg: 'bg-secondary-50',
        border: 'border-secondary-200',
        icon: 'text-secondary-600',
        button: 'btn-secondary',
        accent: 'text-secondary-600'
      };
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        icon: 'text-gray-600',
        button: 'btn-primary',
        accent: 'text-gray-600'
      };
  }
};

export default function Tools() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tl from-accent-200/30 to-primary-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-sm font-semibold mb-6">
            ✨ Professional Tools
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Powerful Tools</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to streamline your workflow and boost productivity. 
            Professional-grade tools designed for modern businesses.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {tools.map((tool, index) => {
            const colors = getColorClasses(tool.color);
            
            return (
              <div key={index} className="group relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${tool.color}-500 to-${tool.color}-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          <tool.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 mb-3">
                          {tool.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">{tool.stats.label}</span>
                      <span className={`text-3xl font-black bg-gradient-to-r from-${tool.color}-600 to-${tool.color}-800 bg-clip-text text-transparent`}>
                        {tool.stats.value}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-10">
                    {tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-4 group/feature">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium group-hover/feature:text-gray-900 transition-colors duration-200">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={tool.href}
                    className={`group/btn relative inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-${tool.color}-500 to-${tool.color}-600 text-white font-bold text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-${tool.color}-600 to-${tool.color}-700 rounded-2xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 mr-3">Try {tool.title}</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
