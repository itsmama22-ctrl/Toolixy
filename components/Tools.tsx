import React from 'react';
import Link from 'next/link';
import { Mail, Palette, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

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
    gradient: 'from-primary-500 to-primary-600',
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
    gradient: 'from-secondary-500 to-secondary-600',
    stats: {
      label: 'Palettes generated today',
      value: '1,234'
    }
  }
];

export default function Tools() {
  return (
    <section className="relative section-padding bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tl from-accent-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Modern Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-primary-200/50 text-primary-700 text-sm font-semibold mb-8 animate-fade-in-down">
            <TrendingUp className="w-4 h-4 mr-2 text-primary-500" />
            Professional Tools
          </div>
          <h2 className="heading-2 mb-6 animate-fade-in-up">
            Our <span className="text-gradient">Powerful Tools</span>
          </h2>
          <p className="body-large max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Everything you need to streamline your workflow and boost productivity. 
            Professional-grade tools designed for modern businesses.
          </p>
        </div>

        {/* Modern Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="group animate-fade-in-up" 
              style={{ animationDelay: `${0.3 + 0.2 * index}s` }}
            >
              <div className="card-elevated h-full group-hover:shadow-colored transition-all duration-300">
                {/* Modern Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-3 mb-3">
                      {tool.title}
                    </h3>
                    <p className="body-regular">
                      {tool.description}
                    </p>
                  </div>
                </div>

                {/* Modern Stats */}
                <div className="glass rounded-2xl p-6 mb-8 border border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <span className="body-small font-medium text-gray-600">{tool.stats.label}</span>
                    <span className={`text-3xl font-bold text-gradient-${tool.color} mb-0`}>
                      {tool.stats.value}
                    </span>
                  </div>
                </div>

                {/* Modern Features */}
                <div className="space-y-4 mb-10">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-4 group/feature">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="body-regular group-hover/feature:text-gray-900 transition-colors duration-200">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Modern CTA */}
                <Link
                  href={tool.href}
                  className={`group/btn relative inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r ${tool.gradient} text-white font-semibold text-base rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                >
                  <span className="mr-3">Try {tool.title}</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
