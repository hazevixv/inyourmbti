"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, MessageCircle, User, BookOpen } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', icon: Home, label: 'Home', color: 'from-sky-400 to-sky-500' },
    { href: '/test', icon: Target, label: 'Test', color: 'from-teal-400 to-teal-500' },
    { href: '/types', icon: BookOpen, label: 'Types', color: 'from-purple-400 to-purple-500' },
    { href: '/chat', icon: MessageCircle, label: 'Chat', color: 'from-pink-400 to-pink-500' },
    { href: '/test', icon: User, label: 'Profile', color: 'from-navy-400 to-navy-500', key: 'profile' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-navy-200/20 backdrop-blur-xl z-50 safe-area-bottom shadow-2xl">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const itemKey = item.key || item.href;
          const active = isActive(item.href);
          
          return (
            <Link
              key={itemKey}
              href={item.href}
              className="relative flex flex-col items-center gap-1.5 py-2 px-1 rounded-2xl transition-all active:scale-95"
            >
              {/* Active Background */}
              {active && (
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 rounded-2xl animate-scale-in`} />
              )}
              
              {/* Icon Container */}
              <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                active 
                  ? `bg-gradient-to-br ${item.color} shadow-lg scale-110` 
                  : 'bg-navy-50 hover:bg-navy-100'
              }`}>
                <Icon className={`w-5 h-5 transition-colors ${
                  active ? 'text-white' : 'text-navy-600'
                }`} />
                
                {/* Active Indicator Dot */}
                {active && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg animate-scale-in">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} animate-pulse`} />
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-[10px] font-semibold transition-colors ${
                active ? 'text-navy-800' : 'text-navy-500'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
