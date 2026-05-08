import { getTypesByCategory, PersonalityCategory } from '@/lib/mbti-types';
import Link from 'next/link';
import { Brain, Home, Layers, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  const descriptions = {
    analyst: 'Explore Analyst personality types (INTJ, INTP, ENTJ, ENTP) - strategic thinkers who are rational and innovative.',
    diplomat: 'Explore Diplomat personality types (INFJ, INFP, ENFJ, ENFP) - idealists who are empathetic and diplomatic.',
    sentinel: 'Explore Sentinel personality types (ISTJ, ISFJ, ESTJ, ESFJ) - practical, organized, and dependable.',
    explorer: 'Explore Explorer personality types (ISTP, ISFP, ESTP, ESFP) - spontaneous, energetic, and adaptive.',
  };
  
  return {
    title: `${categoryName} Personality Types | Haze MBTI`,
    description: descriptions[category as keyof typeof descriptions] || 'Explore MBTI personality types',
    openGraph: {
      title: `${categoryName} Personality Types`,
      description: descriptions[category as keyof typeof descriptions],
      type: 'website',
    },
  };
}

// Generate static params
export function generateStaticParams() {
  return [
    { category: 'analyst' },
    { category: 'diplomat' },
    { category: 'sentinel' },
    { category: 'explorer' },
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1) as PersonalityCategory;
  
  // Validate category
  if (!['Analyst', 'Diplomat', 'Sentinel', 'Explorer'].includes(categoryName)) {
    notFound();
  }
  
  const types = getTypesByCategory(categoryName);
  
  const categoryInfo = {
    Analyst: {
      icon: '🧠',
      color: 'from-purple-400 to-blue-500',
      description: 'Strategic thinkers yang rasional dan inovatif. Analysts adalah problem solvers yang natural, selalu mencari cara untuk meningkatkan sistem dan proses. Mereka menghargai logika, kompetensi, dan efisiensi.',
      traits: [
        'Berpikir strategis dan visioner',
        'Menghargai logika dan kompetensi',
        'Independent dan self-sufficient',
        'Inovatif dan forward-thinking',
      ],
      strengths: [
        'Analytical thinking yang kuat',
        'Strategic planning abilities',
        'Innovation dan creativity',
        'Problem-solving skills',
      ],
      challenges: [
        'Bisa terlalu kritis terhadap diri sendiri dan orang lain',
        'Struggle dengan emotional expression',
        'Kadang terlalu fokus pada teori vs praktik',
        'Bisa terlihat arrogant atau dismissive',
      ],
    },
    Diplomat: {
      icon: '💚',
      color: 'from-green-400 to-teal-500',
      description: 'Idealis yang empatik dan diplomatik. Diplomats adalah people-oriented, selalu mencari cara untuk membantu dan menginspirasi orang lain. Mereka menghargai authenticity, harmony, dan personal growth.',
      traits: [
        'Empathetic dan caring',
        'Idealistic dan value-driven',
        'Creative dan imaginative',
        'Passionate tentang causes mereka',
      ],
      strengths: [
        'Emotional intelligence yang tinggi',
        'Strong communication skills',
        'Ability to inspire dan motivate',
        'Deep understanding of people',
      ],
      challenges: [
        'Bisa terlalu idealistic',
        'Struggle dengan criticism',
        'Kadang overthink dan overanalyze',
        'Bisa burn out dari helping others',
      ],
    },
    Sentinel: {
      icon: '🛡️',
      color: 'from-blue-400 to-cyan-500',
      description: 'Praktis, terorganisir, dan dapat diandalkan. Sentinels adalah pillars of society, selalu bisa diandalkan untuk get things done. Mereka menghargai tradition, stability, dan responsibility.',
      traits: [
        'Reliable dan dependable',
        'Organized dan methodical',
        'Practical dan realistic',
        'Strong sense of duty',
      ],
      strengths: [
        'Excellent organizational skills',
        'Strong work ethic',
        'Attention to detail',
        'Loyalty dan commitment',
      ],
      challenges: [
        'Bisa terlalu rigid atau inflexible',
        'Struggle dengan change',
        'Kadang terlalu focused on rules',
        'Bisa overwork themselves',
      ],
    },
    Explorer: {
      icon: '🌟',
      color: 'from-yellow-400 to-orange-500',
      description: 'Spontan, energik, dan adaptif. Explorers adalah action-oriented, selalu siap untuk adventure baru. Mereka menghargai freedom, flexibility, dan hands-on experience.',
      traits: [
        'Spontaneous dan flexible',
        'Action-oriented dan practical',
        'Adaptable dan resourceful',
        'Live in the moment',
      ],
      strengths: [
        'Quick thinking dan adaptability',
        'Hands-on problem solving',
        'High energy dan enthusiasm',
        'Ability to stay calm in crisis',
      ],
      challenges: [
        'Bisa impulsive',
        'Struggle dengan long-term planning',
        'Kadang avoid commitment',
        'Bisa bored easily',
      ],
    },
  };
  
  const info = categoryInfo[categoryName];
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-navy-600 mb-6">
          <Link href="/" className="hover:text-sky-500 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <Link href="/types" className="hover:text-sky-500 flex items-center gap-1">
            <Layers className="w-4 h-4" />
            Types
          </Link>
          <span>/</span>
          <span className="font-bold text-navy-800">{categoryName}s</span>
        </nav>
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl mb-8">
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-2xl flex-shrink-0 text-4xl md:text-5xl`}>
              {info.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-black mb-4 text-navy-900">
                {categoryName}s
              </h1>
              <p className="text-lg md:text-xl text-navy-700 leading-relaxed">
                {info.description}
              </p>
            </div>
          </div>
        </header>
        
        {/* Key Traits */}
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-navy-800">Key Traits</h2>
            <ul className="space-y-3">
              {info.traits.map((trait, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-sky-500 text-xl mt-0.5">✓</span>
                  <span className="text-navy-700">{trait}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-navy-800">Strengths</h2>
            <ul className="space-y-3">
              {info.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-0.5">★</span>
                  <span className="text-navy-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        {/* Challenges */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-navy-800">Common Challenges</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {info.challenges.map((challenge, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-orange-50">
                <span className="text-orange-500 text-xl mt-0.5">⚠</span>
                <span className="text-navy-700">{challenge}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Types in Category */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800">
            {categoryName} Types
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.values(types).map(type => (
              <Link 
                key={type.code}
                href={`/types/${type.code.toLowerCase()}`}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-navy-900 mb-1">{type.code}</h3>
                    <p className="text-lg font-bold text-navy-700">{type.nickname}</p>
                  </div>
                </div>
                <p className="text-navy-600 mb-4 line-clamp-2">{type.tagline}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[type.functionStack.dominant, type.functionStack.auxiliary].map((func, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-gradient-to-r from-sky-100 to-teal-100 text-navy-700 text-sm font-semibold"
                    >
                      {func}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sky-600 font-semibold">
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-gradient-to-r from-sky-400 to-teal-400 rounded-3xl p-8 shadow-xl text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Are You an {categoryName}?</h2>
          <p className="mb-6 text-sky-50">Take our comprehensive MBTI test to discover your personality type</p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-sky-600 font-bold hover:shadow-2xl hover:scale-105 transition"
          >
            Take the Test
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </main>
  );
}
