import { ALL_PERSONALITY_TYPES, TYPES_BY_CATEGORY, getTypeStatistics } from '@/lib/mbti-types';
import Link from 'next/link';
import { Brain, Users, Target, Zap, Home, Layers } from 'lucide-react';
import type { Metadata } from 'next';
import TopNav from '@/components/TopNav';

export const metadata: Metadata = {
  title: '16 Personality Types - Complete MBTI Guide | Haze MBTI',
  description: 'Explore all 16 MBTI personality types in depth. Comprehensive guides for Analysts, Diplomats, Sentinels, and Explorers with 5,500+ words each.',
  keywords: ['MBTI types', '16 personalities', 'personality types', 'INTJ', 'INFJ', 'ENFP', 'ISTP', 'cognitive functions'],
  openGraph: {
    title: '16 Personality Types - Complete MBTI Guide',
    description: 'Explore all 16 MBTI personality types in depth',
    type: 'website',
  },
};

export default function TypesListPage() {
  const stats = getTypeStatistics();
  
  const categoryColors = {
    Analyst: 'from-purple-400 to-blue-500',
    Diplomat: 'from-green-400 to-teal-500',
    Sentinel: 'from-blue-400 to-cyan-500',
    Explorer: 'from-yellow-400 to-orange-500',
  };
  
  const categoryIcons = {
    Analyst: '🧠',
    Diplomat: '💚',
    Sentinel: '🛡️',
    Explorer: '🌟',
  };
  
  const categoryDescriptions = {
    Analyst: 'Strategic thinkers yang rasional dan inovatif',
    Diplomat: 'Idealis yang empatik dan diplomatik',
    Sentinel: 'Praktis, terorganisir, dan dapat diandalkan',
    Explorer: 'Spontan, energik, dan adaptif',
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 md:pb-8 pt-20">
      <TopNav />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-navy-600 mb-6">
          <Link href="/" className="hover:text-sky-500 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-navy-800 flex items-center gap-1">
            <Layers className="w-4 h-4" />
            All Types
          </span>
        </nav>
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl mb-8 text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-2xl mx-auto mb-6">
            <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-navy-900">
            16 Personality Types
          </h1>
          <p className="text-lg md:text-xl text-navy-600 max-w-3xl mx-auto mb-6">
            Explore all MBTI personality types in depth. Each type includes comprehensive analysis, 
            strengths, weaknesses, career paths, and relationship insights.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-black text-sky-600">{stats.total}</div>
              <div className="text-sm text-navy-600">Types</div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-black text-teal-600">88k+</div>
              <div className="text-sm text-navy-600">Words</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-black text-purple-600">5.5k+</div>
              <div className="text-sm text-navy-600">Per Type</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-black text-blue-600">4</div>
              <div className="text-sm text-navy-600">Categories</div>
            </div>
          </div>
        </header>
        
        {/* Categories */}
        {Object.entries(TYPES_BY_CATEGORY).map(([category, types]) => (
          <section key={category} className="mb-12">
            {/* Category Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} flex items-center justify-center text-3xl shadow-lg`}>
                  {categoryIcons[category as keyof typeof categoryIcons]}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-1">
                    {category}s
                  </h2>
                  <p className="text-navy-600">
                    {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                  </p>
                </div>
                <Link
                  href={`/categories/${category.toLowerCase()}`}
                  className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold hover:shadow-xl transition"
                >
                  View All
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Type Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {Object.values(types).map(type => (
                <Link 
                  key={type.code}
                  href={`/types/${type.code.toLowerCase()}`}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition`}>
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-navy-900 mb-2">{type.code}</h3>
                  <p className="text-lg font-bold text-navy-700 mb-2">{type.nickname}</p>
                  <p className="text-sm text-navy-600 mb-4 line-clamp-2">{type.tagline}</p>
                  <div className="flex items-center gap-2 text-sky-600 font-semibold text-sm">
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
        
        {/* Quick Links */}
        <section className="grid md:grid-cols-3 gap-6 mt-12">
          <Link
            href="/test"
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-2">Take the Test</h3>
            <p className="text-sm text-navy-600">Discover your personality type</p>
          </Link>
          
          <Link
            href="/compatibility"
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-navy-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-2">Compatibility</h3>
            <p className="text-sm text-navy-600">Check type compatibility</p>
          </Link>
          
          <Link
            href="/functions"
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-500 to-beige-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-2">Functions</h3>
            <p className="text-sm text-navy-600">Learn cognitive functions</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
