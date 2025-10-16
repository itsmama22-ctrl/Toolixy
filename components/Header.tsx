'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
      { name: 'Email Extractor', href: '/tools/email-extractor', icon: Mail },
      { name: 'Color Palette', href: '/tools/color-palette', icon: Palette },
      { name: 'Blog', href: '/blog' },
    ];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-black text-xl">T</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Toolisy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href.startsWith('/tools') && pathname.startsWith('/tools'));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center space-x-2 px-6 py-3 text-sm font-bold rounded-2xl transition-all duration-300 transform hover:scale-105',
                    isActive 
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                  )}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-3 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-2xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200/50 rounded-b-3xl shadow-xl">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href.startsWith('/tools') && pathname.startsWith('/tools'));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center space-x-3 px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105',
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-6 h-6" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
