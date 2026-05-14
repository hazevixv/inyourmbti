'use client';

import { useState } from 'react';
import { getCompatibility } from '@/lib/mbti-types/compatibility/compatibility-matrix';
import { getAllTypeCodes, PersonalityCode, getPersonalityType } from '@/lib/mbti-types';
import Link from 'next/link';
import { Heart, Users, TrendingUp, AlertTriangle, Lightbulb, Home, ArrowRight } from 'lucide-react';
import TopNav from '@/components/TopNav';

export default function CompatibilityPage() {
  const [type1, setType1] = useState<PersonalityCode>('INTJ');
  const [type2, setType2] = useState<PersonalityCode>('INFJ');
  
  const compatibility = getCompatibility(type1, type2);
  const types = getAllTypeCodes();
  
  const type1Data = getPersonalityType(type1);
  const type2Data = getPersonalityType(type2);
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'from-green-400 to-emerald-500';
      case 'good': return 'from-blue-400 to-cyan-500';
      case 'moderate': return 'from-yellow-400 to-orange-400';
      case 'challenging': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };
  
  const getLevelEmoji = (level: string) => {
    switch (level) {
      case 'excellent': return '💚';
      case 'good': return '💙';
      case 'moderate': return '💛';
      case 'challenging': return '🧡';
      default: return '🤍';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 md:pb-8 pt-20">
      <TopNav />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-navy-600 mb-6">
          <Link href="/" className="hover:text-sky-500 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-navy-800 flex items-center gap-1">
            <Heart className="w-4 h-4" />
            Compatibility
          </span>
        </nav>
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl mb-8 text-center">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-2xl mx-auto mb-4 md:mb-6">
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="text-2xl md:text-5xl font-black mb-3 md:mb-4 text-navy-900">
            Compatibility Checker
          </h1>
          <p className="text-sm md:text-xl text-navy-600 max-w-2xl mx-auto">
            Discover how two personality types interact in relationships, friendships, and work environments
          </p>
        </header>
        
        {/* Type Selector */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 md:p-8 shadow-lg mb-8">
          <h2 className="text-lg md:text-xl font-bold mb-5 text-navy-800 text-center">Select Two Types to Compare</h2>
          
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-4 items-center">
            {/* Type 1 */}
            <div>
              <label className="block text-xs md:text-sm font-semibold text-navy-700 mb-2">First Type</label>
              <select 
                value={type1} 
                onChange={(e) => setType1(e.target.value as PersonalityCode)}
                className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-sky-200 rounded-xl bg-white text-navy-800 font-bold text-sm md:text-lg focus:border-sky-400 focus:outline-none transition"
              >
                {types.map(code => (
                  <option key={code} value={code}>
                    {code} - {getPersonalityType(code)?.nickname}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Heart Icon */}
            <div className="flex justify-center mt-5">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
            
            {/* Type 2 */}
            <div>
              <label className="block text-xs md:text-sm font-semibold text-navy-700 mb-2">Second Type</label>
              <select 
                value={type2} 
                onChange={(e) => setType2(e.target.value as PersonalityCode)}
                className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-teal-200 rounded-xl bg-white text-navy-800 font-bold text-sm md:text-lg focus:border-teal-400 focus:outline-none transition"
              >
                {types.map(code => (
                  <option key={code} value={code}>
                    {code} - {getPersonalityType(code)?.nickname}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
        
        {compatibility && (
          <>
            {/* Score Card */}
            <section className={`bg-gradient-to-br ${getLevelColor(compatibility.level)} rounded-3xl p-6 md:p-10 shadow-2xl mb-8 text-white text-center`}>
              <div className="text-4xl md:text-6xl mb-3">{getLevelEmoji(compatibility.level)}</div>
              <div className="text-6xl md:text-8xl font-black mb-1">{compatibility.score}</div>
              <div className="text-xl md:text-3xl font-bold mb-3 uppercase tracking-wide">
                {compatibility.level}
              </div>
              <p className="text-base md:text-2xl text-white/90 max-w-2xl mx-auto">
                {compatibility.summary}
              </p>
            </section>
            
            {/* Type Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
              <Link
                href={`/types/${type1.toLowerCase()}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:scale-105 transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm">
                    {type1}
                  </div>
                  <div>
                    <div className="font-bold text-navy-800 text-sm md:text-base">{type1Data?.nickname}</div>
                    <div className="text-xs md:text-sm text-navy-600">{type1Data?.category}</div>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-navy-600 line-clamp-2">{type1Data?.tagline}</p>
              </Link>
              
              <Link
                href={`/types/${type2.toLowerCase()}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl hover:scale-105 transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-navy-500 flex items-center justify-center text-white font-bold text-sm">
                    {type2}
                  </div>
                  <div>
                    <div className="font-bold text-navy-800 text-sm md:text-base">{type2Data?.nickname}</div>
                    <div className="text-xs md:text-sm text-navy-600">{type2Data?.category}</div>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-navy-600 line-clamp-2">{type2Data?.tagline}</p>
              </Link>
            </div>
            
            {/* Strengths */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 md:p-8 shadow-lg mb-6">
              <h2 className="text-lg md:text-2xl font-bold mb-5 text-navy-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                Relationship Strengths
              </h2>
              <div className="space-y-3">
                {compatibility.strengths.map((strength, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-green-50 border border-green-200 text-sm md:text-base">
                    <span className="text-green-600 text-xl mt-0.5">✓</span>
                    <span className="text-navy-700 flex-1">{strength}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Challenges */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 md:p-8 shadow-lg mb-6">
              <h2 className="text-lg md:text-2xl font-bold mb-5 text-navy-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                Potential Challenges
              </h2>
              <div className="space-y-3">
                {compatibility.challenges.map((challenge, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-orange-50 border border-orange-200 text-sm md:text-base">
                    <span className="text-orange-600 text-xl mt-0.5">⚠</span>
                    <span className="text-navy-700 flex-1">{challenge}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Advice */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 md:p-8 shadow-lg mb-8">
              <h2 className="text-lg md:text-2xl font-bold mb-5 text-navy-800 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                Relationship Advice
              </h2>
              <div className="p-4 md:p-6 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500">
                 <p className="text-sm md:text-lg text-navy-700 leading-relaxed">{compatibility.advice}</p>
              </div>
            </section>
          </>
        )}
        
        {/* Quick Tips */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 md:p-8 shadow-lg mb-8">
          <h2 className="text-lg md:text-2xl font-bold mb-5 text-navy-800 flex items-center gap-2">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
            Understanding Compatibility
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-8 md:h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">85+</span>
              </div>
              <div>
                <div className="font-bold text-navy-800 text-sm md:text-base">Excellent (85-100)</div>
                <div className="text-xs md:text-sm text-navy-600">Natural harmony, complementary strengths, minimal friction</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-8 md:h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">70+</span>
              </div>
              <div>
                <div className="font-bold text-navy-800 text-sm md:text-base">Good (70-84)</div>
                <div className="text-sm text-navy-600">Strong potential, some differences to navigate</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-8 md:h-8 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-bold text-sm">55+</span>
              </div>
              <div>
                <div className="font-bold text-navy-800 text-sm md:text-base">Moderate (55-69)</div>
                <div className="text-sm text-navy-600">Workable with effort, significant differences</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-8 md:h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold text-sm">&lt;55</span>
              </div>
              <div>
                <div className="font-bold text-navy-800 text-sm md:text-base">Challenging (&lt;55)</div>
                <div className="text-sm text-navy-600">Requires substantial effort and understanding</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-gradient-to-r from-sky-400 to-teal-400 rounded-3xl p-6 md:p-8 shadow-xl text-center text-white">
          <h2 className="text-xl md:text-3xl font-bold mb-3">Discover Your Type</h2>
          <p className="mb-5 text-sky-50 text-sm md:text-base">Take our comprehensive MBTI test to find your personality type</p>
           <Link
            href="/test"
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-sky-600 font-bold hover:shadow-2xl hover:scale-105 transition text-sm md:text-base"
          >
            Take the Test
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </section>
      </div>
    </main>
  );
}
