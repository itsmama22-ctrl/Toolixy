import React from 'react';
import Link from 'next/link';
import { Mail, Palette, Github, Twitter, Linkedin, ArrowRight, Heart } from 'lucide-react';

const navigation = {
  tools: [
    { name: 'Email Extractor', href: '/tools/email-extractor' },
    { name: 'Color Palette Generator', href: '/tools/color-palette' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API', href: '/api' },
    { name: 'Help Center', href: '/help' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/toolixy',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/toolixy',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/toolixy',
    icon: Github,
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Modern Brand Section */}
          <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">t</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-md"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    toolixy
                  </span>
                  <span className="text-sm text-gray-400 font-medium -mt-1">Professional Tools</span>
                </div>
              </div>
            <p className="body-regular text-gray-400 mb-6 max-w-md">
              Professional tools for marketers, designers, and entrepreneurs. 
              Extract emails and generate color palettes with ease.
            </p>
            
            {/* Contact Email */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:contact.toolixy@gmail.com"
                  className="body-regular text-gray-300 hover:text-white transition-colors duration-200"
                >
                  contact.toolixy@gmail.com
                </a>
              </div>
            </div>
            
            {/* Modern Newsletter */}
            <div className="mb-8">
              <h3 className="heading-4 text-white mb-4">Stay Updated</h3>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 input-field bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500"
                />
                <button className="btn-primary px-6 py-3 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Modern Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-200 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Modern Navigation Links */}
          <div>
            <h3 className="heading-4 text-white mb-6">Tools</h3>
            <ul className="space-y-4">
              {navigation.tools.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="body-regular text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="heading-4 text-white mb-6">Company</h3>
            <ul className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="body-regular text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="heading-4 text-white mb-6">Resources</h3>
            <ul className="space-y-4">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="body-regular text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modern Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              <p className="body-small text-gray-400">
                &copy; {new Date().getFullYear()} toolixy. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6">
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="body-small text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="body-small">Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="body-small">by the toolixy team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
