"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  isAdminAuthenticated, 
  setAdminAuthenticated 
} from '@/lib/admin-auth';
import {
  LayoutDashboard,
  Settings,
  FileText,
  MessageSquare,
  Users,
  BarChart3,
  Database,
  LogOut,
  Home,
  TestTube,
  Palette,
  Brain,
  Download,
  Upload,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTests: 0,
    totalUsers: 0,
    chatMessages: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    // Check authentication
    if (!isAdminAuthenticated()) {
      router.push('/admin');
      return;
    }

    // Load stats from localStorage
    loadStats();
  }, [router]);

  const loadStats = () => {
    // Get stats from localStorage
    const answers = localStorage.getItem('mbti-answers');
    const result = localStorage.getItem('mbti-result');
    
    setStats({
      totalTests: result ? 1 : 0,
      totalUsers: result ? 1 : 0,
      chatMessages: 0,
      activeUsers: result ? 1 : 0,
    });
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
      setAdminAuthenticated(false);
      router.push('/admin');
    }
  };

  const menuItems = [
    {
      title: 'Content Management',
      items: [
        { icon: Home, label: 'Home Page', href: '/admin/content/home', color: 'from-sky-400 to-teal-400' },
        { icon: TestTube, label: 'Test Settings', href: '/admin/content/test', color: 'from-teal-400 to-navy-500' },
        { icon: FileText, label: 'About Page', href: '/admin/content/about', color: 'from-navy-500 to-beige-400' },
      ],
    },
    {
      title: 'Configuration',
      items: [
        { icon: Settings, label: 'Site Settings', href: '/admin/settings/site', color: 'from-beige-400 to-sky-400' },
        { icon: Brain, label: 'AI Settings', href: '/admin/settings/ai', color: 'from-sky-400 to-teal-400' },
        { icon: Palette, label: 'Theme & Design', href: '/admin/settings/theme', color: 'from-teal-400 to-navy-500' },
      ],
    },
    {
      title: 'Data Management',
      items: [
        { icon: Database, label: 'Questions', href: '/admin/data/questions', color: 'from-navy-500 to-beige-400' },
        { icon: Users, label: 'User Data', href: '/admin/data/users', color: 'from-beige-400 to-sky-400' },
        { icon: MessageSquare, label: 'Chat Logs', href: '/admin/data/chats', color: 'from-sky-400 to-teal-400' },
      ],
    },
    {
      title: 'Analytics & Tools',
      items: [
        { icon: BarChart3, label: 'Analytics', href: '/admin/analytics', color: 'from-teal-400 to-navy-500' },
        { icon: Download, label: 'Export Data', href: '/admin/tools/export', color: 'from-navy-500 to-beige-400' },
        { icon: Upload, label: 'Import Data', href: '/admin/tools/import', color: 'from-beige-400 to-sky-400' },
      ],
    },
  ];

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="glass-dark border-b border-navy-200/20 sticky top-0 z-10 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-sky-500" />
              <div>
                <h1 className="font-bold text-lg text-navy-800">Admin Dashboard</h1>
                <p className="text-xs text-navy-600">Haze MBTI Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:scale-105 transition-transform text-sm font-medium text-navy-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-2xl p-4">
              <div className="text-sm text-navy-600 mb-1">Total Tests</div>
              <div className="text-3xl font-black text-sky-500">{stats.totalTests}</div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="text-sm text-navy-600 mb-1">Total Users</div>
              <div className="text-3xl font-black text-teal-500">{stats.totalUsers}</div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="text-sm text-navy-600 mb-1">Chat Messages</div>
              <div className="text-3xl font-black text-navy-600">{stats.chatMessages}</div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="text-sm text-navy-600 mb-1">Active Users</div>
              <div className="text-3xl font-black text-beige-500">{stats.activeUsers}</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4 text-navy-800">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link
                href="/admin/content/home"
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-dark card-hover"
              >
                <Home className="w-6 h-6 text-sky-500" />
                <span className="text-sm font-medium text-navy-700">Edit Home</span>
              </Link>
              <Link
                href="/admin/settings/ai"
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-dark card-hover"
              >
                <Brain className="w-6 h-6 text-teal-500" />
                <span className="text-sm font-medium text-navy-700">AI Config</span>
              </Link>
              <Link
                href="/admin/data/questions"
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-dark card-hover"
              >
                <Database className="w-6 h-6 text-navy-600" />
                <span className="text-sm font-medium text-navy-700">Questions</span>
              </Link>
              <Link
                href="/admin/analytics"
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-dark card-hover"
              >
                <BarChart3 className="w-6 h-6 text-beige-500" />
                <span className="text-sm font-medium text-navy-700">Analytics</span>
              </Link>
            </div>
          </div>

          {/* Menu Sections */}
          {menuItems.map((section, idx) => (
            <div key={idx} className="glass rounded-3xl p-6">
              <h2 className="font-bold text-lg mb-4 text-navy-800">{section.title}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {section.items.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-2xl glass-dark card-hover"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-navy-800">{item.label}</div>
                      <div className="text-xs text-navy-600">Manage {item.label.toLowerCase()}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* System Info */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4 text-navy-800">System Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/50">
                <div className="text-sm text-navy-600 mb-1">Version</div>
                <div className="font-bold text-navy-800">2.0.0</div>
              </div>
              <div className="p-4 rounded-xl bg-white/50">
                <div className="text-sm text-navy-600 mb-1">Environment</div>
                <div className="font-bold text-navy-800">Development</div>
              </div>
              <div className="p-4 rounded-xl bg-white/50">
                <div className="text-sm text-navy-600 mb-1">Database</div>
                <div className="font-bold text-navy-800">LocalStorage</div>
              </div>
              <div className="p-4 rounded-xl bg-white/50">
                <div className="text-sm text-navy-600 mb-1">AI Model</div>
                <div className="font-bold text-navy-800">openai/gpt-oss-20b</div>
              </div>
            </div>
          </div>

          {/* Website Link */}
          <div className="text-center">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass card-hover font-medium text-navy-700"
            >
              <Home className="w-5 h-5" />
              View Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
