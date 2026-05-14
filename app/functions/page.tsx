import { ALL_COMPLETE_FUNCTIONS } from '@/lib/mbti-functions-loader';
import Link from 'next/link';
import { Brain, Zap, Eye, Database, Target, Heart, Users, Sparkles, ArrowRight, Home } from 'lucide-react';
import TopNav from '@/components/TopNav';

export const metadata = {
  title: 'Cognitive Functions - Complete Guide | Haze MBTI',
  description: 'Explore all 8 cognitive functions in depth: Ne, Ni, Se, Si, Te, Ti, Fe, Fi. Understand how your mind works.',
  keywords: ['cognitive functions', 'MBTI functions', 'Ne', 'Ni', 'Se', 'Si', 'Te', 'Ti', 'Fe', 'Fi', 'personality psychology'],
};

export default function FunctionsPage() {
  // Group functions by type
  const intuitionFunctions = ['Ne', 'Ni'].map(code => ALL_COMPLETE_FUNCTIONS[code]);
  const sensingFunctions = ['Se', 'Si'].map(code => ALL_COMPLETE_FUNCTIONS[code]);
  const thinkingFunctions = ['Te', 'Ti'].map(code => ALL_COMPLETE_FUNCTIONS[code]);
  const feelingFunctions = ['Fe', 'Fi'].map(code => ALL_COMPLETE_FUNCTIONS[code]);
  
  const FunctionCard = ({ func, color }: { func: any, color: string }) => {
    const colorSchemes: Record<string, any> = {
      purple: { from: 'from-purple-400', to: 'to-pink-400', bg: 'bg-purple-50', text: 'text-purple-700', hover: 'hover:shadow-purple-200' },
      green: { from: 'from-green-400', to: 'to-teal-400', bg: 'bg-green-50', text: 'text-green-700', hover: 'hover:shadow-green-200' },
      blue: { from: 'from-blue-400', to: 'to-cyan-400', bg: 'bg-blue-50', text: 'text-blue-700', hover: 'hover:shadow-blue-200' },
      pink: { from: 'from-pink-400', to: 'to-rose-400', bg: 'bg-pink-50', text: 'text-pink-700', hover: 'hover:shadow-pink-200' },
    };
    
    const scheme = colorSchemes[color];
    
    return (
      <Link
        href={`/functions/${func.code.toLowerCase()}`}
        className={`block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl ${scheme.hover} transition-all hover:scale-105`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${scheme.from} ${scheme.to} flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className={`inline-block px-2 py-1 rounded-full ${scheme.bg} ${scheme.text} text-xs font-bold mb-2`}>
              {func.code}
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-1">{func.name}</h3>
          </div>
        </div>
        <p className="text-navy-700 text-sm mb-4">{func.shortDesc}</p>
        <div className="flex items-center gap-2 text-sky-600 font-semibold text-sm">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    );
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 md:pb-8 pt-20">
      <TopNav />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-navy-600 mb-6">
          <Link href="/" className="hover:text-sky-500 flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <span className="font-bold text-navy-800">Functions</span>
        </nav>
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-2xl mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-navy-900">
            Cognitive Functions
          </h1>
           <p className="text-base md:text-lg text-navy-600 max-w-3xl mx-auto">
            Understand the 8 cognitive functions that shape how you perceive and interact with the world. 
            Each personality type uses these functions in a unique order.
          </p>
        </header>
        
        {/* What Are Cognitive Functions */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-sky-500" />
            What Are Cognitive Functions?
          </h2>
           <div className="prose prose-base md:prose-lg max-w-none text-navy-700">
            <p className="mb-4">
              Cognitive functions are the mental processes that determine how you take in information and make decisions. 
              Think of them as the "operating system" of your personality. Each of the 16 MBTI types uses all 8 functions, 
              but in a different order of preference.
            </p>
            <p className="mb-4">
              There are two types of functions:
            </p>
            <ul className="space-y-2 mb-4">
              <li><strong>Perceiving Functions</strong> - How you gather information (Intuition & Sensing)</li>
              <li><strong>Judging Functions</strong> - How you make decisions (Thinking & Feeling)</li>
            </ul>
            <p>
              Each function can be either <strong>Extraverted</strong> (focused on the external world) or 
              <strong> Introverted</strong> (focused on the internal world), giving us 8 total functions.
            </p>
          </div>
        </section>
        
        {/* Intuition Functions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy-900">Intuition Functions</h2>
               <p className="text-sm md:text-base text-navy-600">Perceiving patterns, possibilities, and meanings</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {intuitionFunctions.map(func => (
              <FunctionCard key={func.code} func={func} color="purple" />
            ))}
          </div>
        </section>
        
        {/* Sensing Functions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center shadow-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy-900">Sensing Functions</h2>
               <p className="text-sm md:text-base text-navy-600">Perceiving concrete details and sensory information</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {sensingFunctions.map(func => (
              <FunctionCard key={func.code} func={func} color="green" />
            ))}
          </div>
        </section>
        
        {/* Thinking Functions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy-900">Thinking Functions</h2>
               <p className="text-sm md:text-base text-navy-600">Making logical, objective decisions</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {thinkingFunctions.map(func => (
              <FunctionCard key={func.code} func={func} color="blue" />
            ))}
          </div>
        </section>
        
        {/* Feeling Functions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy-900">Feeling Functions</h2>
               <p className="text-sm md:text-base text-navy-600">Making value-based, people-centered decisions</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {feelingFunctions.map(func => (
              <FunctionCard key={func.code} func={func} color="pink" />
            ))}
          </div>
        </section>
        
        {/* Function Stack Explanation */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-6 text-navy-800 flex items-center gap-2">
            <Database className="w-7 h-7 text-teal-500" />
            Your Function Stack
          </h2>
           <div className="prose prose-base md:prose-lg max-w-none text-navy-700">
            <p className="mb-4">
              Every personality type has a "function stack" - the order in which they prefer to use these 8 functions:
            </p>
            <ol className="space-y-3 mb-4">
              <li><strong>Dominant Function</strong> - Your primary way of operating, most natural and developed</li>
              <li><strong>Auxiliary Function</strong> - Your supporting function, balances your dominant</li>
              <li><strong>Tertiary Function</strong> - Less developed, emerges in adulthood</li>
              <li><strong>Inferior Function</strong> - Your weakest function, source of stress but also growth</li>
            </ol>
            <p>
              For example, an <strong>INTJ</strong> has the stack: <strong>Ni-Te-Fi-Se</strong>. 
              This means they lead with Introverted Intuition, supported by Extraverted Thinking, 
              with Introverted Feeling as tertiary and Extraverted Sensing as inferior.
            </p>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-gradient-to-r from-sky-400 to-teal-400 rounded-3xl p-8 shadow-xl text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Discover Your Function Stack</h2>
          <p className="mb-6 text-sky-50">Take our comprehensive MBTI test to understand your cognitive functions</p>
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
