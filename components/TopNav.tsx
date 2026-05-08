"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Sparkles, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const menuItems = [
    { label: 'Test',          path: '/test' },
    { label: 'Types',         path: '/types' },
    { label: 'Functions',     path: '/functions' },
    { label: 'Compatibility', path: '/compatibility' },
    { label: 'Chat',          path: '/chat' },
    { label: 'About',         path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-frosted-900 tracking-tight">
              inyourmbti
            </span>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`px-4 py-2 rounded-lg font-body font-medium transition-all text-sm ${
                  isActive(item.path)
                    ? 'bg-white/80 text-frosted-900 shadow-sm'
                    : 'text-frosted-700 hover:bg-white/80 hover:text-frosted-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/80 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen
              ? <X className="w-6 h-6 text-frosted-900" />
              : <Menu className="w-6 h-6 text-frosted-900" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[68px] left-0 right-0 z-40 lg:hidden bg-white/97 backdrop-blur-xl shadow-xl border-t border-frosted-200 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full text-left px-4 py-3 rounded-xl font-body font-medium transition-all text-sm ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-sky-50 to-teal-50 text-frosted-900 font-semibold'
                    : 'text-frosted-700 hover:bg-gradient-to-r hover:from-sky-50 hover:to-teal-50 hover:text-frosted-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
