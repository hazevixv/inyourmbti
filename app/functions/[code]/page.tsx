import { ALL_COMPLETE_FUNCTIONS } from '@/lib/mbti-functions-loader';
import Link from 'next/link';
import { Brain, Zap, TrendingUp, AlertCircle, CheckCircle, Sparkles, ArrowRight, Home, Layers, BookOpen, Target, Users, Lightbulb } from 'lucide-react';
import { notFound } from 'next/navigation';
import TopNav from '@/components/TopNav';

// All 8 cognitive functions
const ALL_FUNCTIONS = ['Ne', 'Ni', 'Se', 'Si', 'Te', 'Ti', 'Fe', 'Fi'];

// Helper to normalize code: 'fe' or 'FE' or 'Fe' → 'Fe'
function normalizeCode(code: string): string {
  const upper = code.toUpperCase();
  return upper.charAt(0) + upper.charAt(1).toLowerCase();
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const normalizedCode = normalizeCode(code);
  const func = ALL_COMPLETE_FUNCTIONS[normalizedCode];
  
  if (!func) {
    return {
      title: 'Function Not Found | Haze MBTI',
      description: 'The cognitive function you are looking for does not exist.',
    };
  }
  
  return {
    title: `${func.name} (${func.code}) - Cognitive Function | Haze MBTI`,
    description: func.shortDesc,
    keywords: [func.name, func.code, 'cognitive function', 'MBTI', 'personality', 'psychology'],
    openGraph: {
      title: `${func.name} (${func.code}) - Cognitive Function`,
      description: func.shortDesc,
      type: 'article',
    },
  };
}

// Generate static params for all 8 functions
export function generateStaticParams() {
  return ALL_FUNCTIONS.map(code => ({
    code: code.toLowerCase(),
  }));
}

export default async function FunctionDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const normalizedCode = normalizeCode(code);
  const func = ALL_COMPLETE_FUNCTIONS[normalizedCode];
  
  if (!func) {
    notFound();
  }
  
  // Determine function type for styling
  const functionType = func.code.includes('N') ? 'intuition' : 
                       func.code.includes('S') ? 'sensing' :
                       func.code.includes('T') ? 'thinking' : 'feeling';
  
  const colorScheme = {
    intuition: { from: 'from-purple-400', to: 'to-pink-400', bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700' },
    sensing: { from: 'from-green-400', to: 'to-teal-400', bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700' },
    thinking: { from: 'from-blue-400', to: 'to-cyan-400', bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700' },
    feeling: { from: 'from-pink-400', to: 'to-rose-400', bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-700' },
  }[functionType];
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 md:pb-8">
      <TopNav />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-navy-600 mb-6">
          <Link href="/" className="hover:text-sky-500 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <Link href="/functions" className="hover:text-sky-500 flex items-center gap-1">
            <Brain className="w-4 h-4" />
            Functions
          </Link>
          <span>/</span>
          <span className="font-bold text-navy-800">{func.code}</span>
        </nav>
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl mb-8">
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${colorScheme.from} ${colorScheme.to} flex items-center justify-center shadow-2xl flex-shrink-0`}>
              <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <div className="flex-1">
              <div className={`inline-block px-3 py-1 rounded-full ${colorScheme.bg} ${colorScheme.text} text-xs font-bold mb-3`}>
                {functionType.charAt(0).toUpperCase() + functionType.slice(1)}
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-3 text-navy-900">
                {func.code} - {func.name}
              </h1>
              <p className="text-lg md:text-xl text-navy-600">{func.shortDesc}</p>
            </div>
          </div>
        </header>
        
        {/* Summary */}
        {func.summary && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-sky-500" />
              Quick Summary
            </h2>
             <p className="text-base md:text-lg leading-relaxed text-navy-700">{func.summary}</p>
          </section>
        )}
        
        {/* Full Description */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-teal-500" />
            What is {func.code}?
          </h2>
          <div 
            className="prose prose-lg max-w-none text-navy-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: func.fullDescription.replace(/\n\n/g, '</p><p class="mt-4">').replace(/^/, '<p>').replace(/$/, '</p>') }} 
          />
        </section>
        
        {/* Deep Dive */}
        {func.deepDive && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Deep Dive
            </h2>
            <div 
              className="prose prose-lg max-w-none text-navy-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: func.deepDive.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '</p><p class="mt-4">').replace(/^/, '<p>').replace(/$/, '</p>') }} 
            />
          </section>
        )}
        
        {/* How It Works */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-orange-500" />
            How It Works
          </h2>
          <div 
            className="prose prose-lg max-w-none text-navy-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: func.howItWorks.replace(/\n\n/g, '</p><p class="mt-4">').replace(/^/, '<p>').replace(/$/, '</p>') }} 
          />
        </section>
        
        {/* Psychological Basis */}
        {func.psychologicalBasis && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy-800 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-500" />
              Psychological Basis
            </h2>
            <div 
              className="prose prose-lg max-w-none text-navy-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: func.psychologicalBasis.replace(/\n\n/g, '</p><p class="mt-4">').replace(/^/, '<p>').replace(/$/, '</p>') }} 
            />
          </section>
        )}
        
        {/* Strengths */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Strengths
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {func.strengths.map((strength, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                <span className="text-green-800">{strength}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Weaknesses */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            Weaknesses & Challenges
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {func.weaknesses.map((weakness, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                <span className="text-red-500 mt-1 flex-shrink-0">!</span>
                <span className="text-red-800">{weakness}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* In Daily Life */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            In Daily Life
          </h2>
          <div className="space-y-2">
            {func.inDailyLife.map((example, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                <span className="text-blue-800">{example}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* At Work */}
        {func.atWork && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              At Work
            </h2>
            <div className="space-y-2">
              {func.atWork.map((example, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-600 mt-1 flex-shrink-0">→</span>
                  <span className="text-yellow-900">{example}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* In Relationships */}
        {func.inRelationships && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-pink-500" />
              In Relationships
            </h2>
            <div className="space-y-2">
              {func.inRelationships.map((example, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-pink-50 rounded-lg">
                  <span className="text-pink-500 mt-1 flex-shrink-0">♥</span>
                  <span className="text-pink-800">{example}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* When Stressed & Healthy */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {func.whenStressed && (
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-navy-800">When Stressed</h2>
              <div className="space-y-2">
                {func.whenStressed.map((item, i) => (
                  <div key={i} className="text-sm text-red-700 bg-red-50 p-2 rounded">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {func.whenHealthy && (
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-navy-800">When Healthy</h2>
              <div className="space-y-2">
                {func.whenHealthy.map((item, i) => (
                  <div key={i} className="text-sm text-green-700 bg-green-50 p-2 rounded">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Common Misunderstandings */}
        {func.commonMisunderstandings && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800">Common Misunderstandings</h2>
            <div className="space-y-3">
              {func.commonMisunderstandings.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                  <div className="text-navy-700">{item}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Development Tips */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-teal-500" />
            Development Tips
          </h2>
          <div className="space-y-3">
            {func.developmentTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-teal-50">
                <span className="font-bold text-teal-600 flex-shrink-0">{i + 1}.</span>
                <p className="text-navy-700">{tip}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Exercises */}
        {func.exercises && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800">Practical Exercises</h2>
            <div className="space-y-3">
              {func.exercises.map((exercise, i) => (
                <div key={i} className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <p className="text-purple-900">{exercise}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Famous Examples */}
        {func.famousExamples && (
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-navy-800">Famous Examples</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {func.famousExamples.map((person, i) => (
                <div key={i} className="p-4 bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl">
                  <p className="text-navy-800">{person}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* CTA */}
        <section className="bg-gradient-to-r from-sky-400 to-teal-400 rounded-3xl p-8 shadow-xl text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Discover Your Cognitive Functions</h2>
          <p className="mb-6 text-sky-50">Take our MBTI test to understand your function stack</p>
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
