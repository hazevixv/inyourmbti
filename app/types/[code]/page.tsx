import { getPersonalityType, PersonalityCode, getAllTypeCodes } from '@/lib/mbti-types';
import { generateCompleteMetaTags, generateStructuredData, generateBreadcrumbData, generateFAQData } from '@/lib/mbti-types/seo/meta-data';
import { getCompatibleTypes } from '@/lib/mbti-types';
import Link from 'next/link';
import { Brain, Heart, Briefcase, Users, TrendingUp, AlertCircle, CheckCircle, Sparkles, ArrowRight, Home, Layers } from 'lucide-react';
import { notFound } from 'next/navigation';
import TopNav from '@/components/TopNav';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const type = getPersonalityType(code.toUpperCase() as PersonalityCode);
  if (!type) {
    return {
      title: 'Type Not Found | Haze MBTI',
      description: 'The personality type you are looking for does not exist.',
    };
  }
  
  const metaTags = generateCompleteMetaTags(type.code) as Record<string, string>;
  return {
    title: metaTags['title'],
    description: metaTags['description'],
    keywords: metaTags['keywords']?.split(', '),
    openGraph: {
      title: metaTags['og:title'],
      description: metaTags['og:description'],
      url: metaTags['og:url'],
      images: [{ url: metaTags['og:image'] }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags['twitter:title'],
      description: metaTags['twitter:description'],
      images: [metaTags['twitter:image']],
    },
  };
}

// Generate static params for all 16 types
export function generateStaticParams() {
  const codes = getAllTypeCodes();
  return codes.map(code => ({
    code: code.toLowerCase(),
  }));
}

export default async function TypeDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const type = getPersonalityType(code.toUpperCase() as PersonalityCode);
  
  if (!type) {
    notFound();
  }
  
  const structuredData = generateStructuredData(type.code);
  const breadcrumbData = generateBreadcrumbData(type.code);
  const faqData = generateFAQData(type.code);
  const compatibleTypes = getCompatibleTypes(type.code);
  
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      
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
            <Link href="/types" className="hover:text-sky-500 flex items-center gap-1">
              <Layers className="w-4 h-4" />
              Types
            </Link>
            <span>/</span>
            <Link href={`/categories/${type.category.toLowerCase()}`} className="hover:text-sky-500">
              {type.category}
            </Link>
            <span>/</span>
            <span className="font-bold text-navy-800">{type.code}</span>
          </nav>
          
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl mb-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-2xl flex-shrink-0">
                <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-3">
                  {type.category}
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-3 text-navy-900">
                  {type.code} - {type.nickname}
                </h1>
                <p className="text-lg md:text-xl text-navy-600 mb-4">{type.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {[type.functionStack.dominant, type.functionStack.auxiliary, type.functionStack.tertiary, type.functionStack.inferior].map((func, i) => (
                    <Link
                      key={i}
                      href={`/functions/${func.toLowerCase()}`}
                      className="px-3 py-1 rounded-lg bg-gradient-to-r from-sky-100 to-teal-100 text-navy-700 text-sm font-semibold hover:shadow-md transition"
                    >
                      {func}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>
          
          {/* Overview */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-sky-500" />
              Overview
            </h2>
            <p className="text-lg leading-relaxed text-navy-700">{type.overview}</p>
          </section>
          
          {/* Deep Dive */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800">Deep Dive</h2>
            <div 
              className="prose prose-lg max-w-none text-navy-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: type.deepDive.replace(/\n/g, '<br/>') }} 
            />
          </section>
          
          {/* Function Stack Analysis */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <Brain className="w-6 h-6 text-teal-500" />
              Function Stack Analysis
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-teal-50 border-l-4 border-sky-500">
                <h3 className="font-bold text-lg text-sky-700 mb-2">
                  Dominant: {type.functionStack.dominant}
                </h3>
                <p className="text-navy-700">{type.functionStackAnalysis.dominant}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-sky-50 border-l-4 border-teal-500">
                <h3 className="font-bold text-lg text-teal-700 mb-2">
                  Auxiliary: {type.functionStack.auxiliary}
                </h3>
                <p className="text-navy-700">{type.functionStackAnalysis.auxiliary}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-navy-50 to-sky-50 border-l-4 border-navy-500">
                <h3 className="font-bold text-lg text-navy-700 mb-2">
                  Tertiary: {type.functionStack.tertiary}
                </h3>
                <p className="text-navy-700">{type.functionStackAnalysis.tertiary}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-beige-50 to-navy-50 border-l-4 border-beige-500">
                <h3 className="font-bold text-lg text-beige-700 mb-2">
                  Inferior: {type.functionStack.inferior}
                </h3>
                <p className="text-navy-700">{type.functionStackAnalysis.inferior}</p>
              </div>
            </div>
          </section>
          
          {/* Strengths */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Strengths
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {type.strengths.map((strength, i) => (
                <div key={i} className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="font-bold text-green-800 mb-2">{strength.title}</h3>
                  <p className="text-green-700 text-sm">{strength.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Weaknesses */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              Weaknesses & Growth Areas
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {type.weaknesses.map((weakness, i) => (
                <div key={i} className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <h3 className="font-bold text-red-800 mb-2">{weakness.title}</h3>
                  <p className="text-red-700 text-sm">{weakness.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Career Paths */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-500" />
              Career Paths
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {type.careerPaths.map((career, i) => (
                <div key={i} className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">{career.career}</h3>
                  <p className="text-blue-700 text-sm">{career.why}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Relationships */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              In Relationships
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-navy-800 mb-3">As a Friend</h3>
                <ul className="space-y-2">
                  {type.asFriend.map((trait, i) => (
                    <li key={i} className="flex items-start gap-2 text-navy-700">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-navy-800 mb-3">As a Partner</h3>
                <ul className="space-y-2">
                  {type.asPartner.map((trait, i) => (
                    <li key={i} className="flex items-start gap-2 text-navy-700">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-navy-800 mb-3">As a Parent</h3>
                <ul className="space-y-2">
                  {type.asParent.map((trait, i) => (
                    <li key={i} className="flex items-start gap-2 text-navy-700">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          {/* Compatibility */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-500" />
              Compatibility
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-green-700 mb-3">Best Matches</h3>
                <div className="flex flex-wrap gap-2">
                  {compatibleTypes.best.map((compatType) => (
                    <Link
                      key={compatType.code}
                      href={`/types/${compatType.code.toLowerCase()}`}
                      className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold hover:bg-green-200 transition"
                    >
                      {compatType.code}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-blue-700 mb-3">Good Matches</h3>
                <div className="flex flex-wrap gap-2">
                  {compatibleTypes.good.map((compatType) => (
                    <Link
                      key={compatType.code}
                      href={`/types/${compatType.code.toLowerCase()}`}
                      className="px-4 py-2 rounded-lg bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition"
                    >
                      {compatType.code}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-orange-700 mb-3">Challenging Matches</h3>
                <div className="flex flex-wrap gap-2">
                  {compatibleTypes.challenging.map((compatType) => (
                    <Link
                      key={compatType.code}
                      href={`/types/${compatType.code.toLowerCase()}`}
                      className="px-4 py-2 rounded-lg bg-orange-100 text-orange-800 font-semibold hover:bg-orange-200 transition"
                    >
                      {compatType.code}
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-navy-700 mt-4">{type.compatibility.explanation}</p>
            </div>
          </section>
          
          {/* Growth Path */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-teal-500" />
              Growth Path
            </h2>
            <div className="space-y-3">
              {type.growthPath.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-teal-50">
                  <span className="font-bold text-teal-600 flex-shrink-0">{i + 1}.</span>
                  <p className="text-navy-700">{tip}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Famous Examples */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800">Famous {type.code}s</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {type.famousExamples.map((person, i) => (
                <div key={i} className="p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl">
                  <h3 className="font-bold text-navy-800 mb-2">{person.name}</h3>
                  <p className="text-navy-700 text-sm">{person.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Common Misunderstandings */}
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800">Common Misunderstandings</h2>
            <div className="space-y-4">
              {type.commonMisunderstandings.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                  <div className="font-bold text-red-700 mb-2">❌ Myth: {item.myth}</div>
                  <div className="text-green-700">✅ Truth: {item.truth}</div>
                </div>
              ))}
            </div>
          </section>
          
          {/* CTA */}
          <section className="bg-gradient-to-r from-sky-400 to-teal-400 rounded-3xl p-8 shadow-xl text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Discover Your Type</h2>
            <p className="mb-6 text-sky-50">Take our comprehensive MBTI test to find your personality type</p>
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
    </>
  );
}
