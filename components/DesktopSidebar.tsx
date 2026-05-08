"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Brain, Target, MessageCircle, Heart, BookOpen, 
  Settings, LayoutDashboard, LogOut 
} from 'lucide-react';

export default function DesktopSidebar() {
  const pathname = usePathname();
  
  const mainNav = [
    { href: '/', icon: Brain, label: 'Home' },
    { href: '/test', icon: Target, label: 'Test MBTI' },
    { href: '/types', icon: BookOpen, label: '16 Types' },
    { href: '/functions', icon: Brain, label: 'Functions' },
    { href: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { href: '/profile', icon: Heart, label: 'Profile' },
  ];

  const utilityNav = [
    { href: '/admin', icon: LayoutDashboard, label: 'Admin' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 glass-dark border-r border-navy-200/20 backdrop-blur-xl flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-navy-200/20">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-black text-lg text-navy-800">Haze MBTI</div>
            <div className="text-xs text-navy-600">AI-Powered</div>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-bold text-navy-500 px-3 py-2">MAIN MENU</div>
        {mainNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                active
                  ? 'bg-gradient-to-br from-sky-400 to-teal-400 text-white shadow-lg'
                  : 'text-navy-700 hover:bg-navy-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Utility Navigation */}
      <div className="p-4 border-t border-navy-200/20 space-y-1">
        <div className="text-xs font-bold text-navy-500 px-3 py-2">UTILITY</div>
        {utilityNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                active
                  ? 'bg-gradient-to-br from-sky-400 to-teal-400 text-white shadow-lg'
                  : 'text-navy-700 hover:bg-navy-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
