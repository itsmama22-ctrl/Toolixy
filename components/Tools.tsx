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
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Powerful Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to streamline your workflow and boost productivity. 
            Try our tools for free or upgrade for unlimited access.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {tools.map((tool, index) => {
            const colors = getColorClasses(tool.color);
            
            return (
              <div key={index} className={`card-hover ${colors.bg} ${colors.border}`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.bg} rounded-xl border ${colors.border}`}>
                      <tool.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className={`${colors.bg} rounded-lg p-4 mb-6 border ${colors.border}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{tool.stats.label}</span>
                    <span className={`text-2xl font-bold ${colors.accent}`}>
                      {tool.stats.value}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={tool.href}
                  className={`${colors.button} w-full flex items-center justify-center space-x-2`}
                >
                  <span>Try {tool.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Need both tools? Get unlimited access with our Pro plan.
          </p>
          <Link
            href="/pricing"
            className="btn-primary text-lg px-8 py-3"
          >
            View Pricing Plans
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
