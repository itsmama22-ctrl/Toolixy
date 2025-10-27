'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, Palette, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Email Extractor', href: '/tools/email-extractor', icon: Mail },
  { name: 'Color Palette', href: '/tools/color-palette', icon: Palette },
  { name: 'Blog', href: '/blog', icon: BookOpen },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled 
        ? 'glass shadow-lg border-b border-gray-200/50' 
        : 'bg-white/95 backdrop-blur-md border-b border-gray-200/30'
    )}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Modern Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg md:text-xl">t</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-md"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
                toolixy
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1 hidden md:block">Professional Tools</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href.startsWith('/tools') && pathname.startsWith('/tools'));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105',
                    isActive 
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-xl transition-all duration-200 focus-ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Modern Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-fade-in-down">
            <div className="px-4 pt-4 pb-6 space-y-2 glass border-t border-gray-200/50 rounded-b-2xl shadow-xl">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href.startsWith('/tools') && pathname.startsWith('/tools'));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:scale-105',
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
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
