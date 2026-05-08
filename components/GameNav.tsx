"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Brain, MessageCircle, User, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function GameNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/types', icon: Brain, label: 'Types' },
    { href: '/functions', icon: Sparkles, label: 'Functions' },
    { href: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Desktop Navigation - Floating Top */}
      <nav 
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <div 
            className={`glass-card flex items-center justify-between px-8 py-4 transition-all duration-300 ${
              scrolled ? 'shadow-xl' : 'shadow-lg'
            }`}
            style={{
              background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.72)',
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-primary font-bold text-xl text-navy-900">Haze MBTI</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-sage-400 to-sage-500 text-white shadow-md'
                        : 'text-navy-600 hover:bg-white/60 hover:text-sage-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              href="/test"
              className="btn btn-primary text-sm px-6 py-2.5"
            >
              <Sparkles className="w-4 h-4" />
              Take Test
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="hidden md:block h-24"></div>
    </>
  );
}
