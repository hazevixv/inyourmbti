"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, Share2, RotateCcw, MessageCircle, TrendingUp, Target,
  Brain, Heart, Briefcase, Users, Zap, Shield, AlertCircle, Star,
  BarChart3, PieChart, Activity, Award, BookOpen, Lightbulb, Sparkles,
  ArrowRight, CheckCircle, XCircle, TrendingDown, UserPlus, Smile, Frown
} from 'lucide-react';
import type { MBTIResult } from '@/lib/mbti-calculator';
import { getMBTITypeData, getCompatibleTypes } from '@/lib/mbti-data';
import { getEnneagramForMBTI } from '@/lib/enneagram-data';
import { getLoveLanguageForMBTI } from '@/lib/love-languages';
import { getTopCompatibleTypes } from '@/lib/compatibility';
import { FunctionDetailModal, VariantDetailModal } from '@/components/FunctionDetailModal';
import TopNav from '@/components/TopNav';

export default function ComprehensiveResultsPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;
  
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [typeData, setTypeData] = useState<ReturnType<typeof getMBTITypeData>>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'functions' | 'strengths' | 'growth' | 'career' | 'relationships' | 'communication'>('overview');
  const [enneagramTypes, setEnneagramTypes] = useState<ReturnType<typeof getEnneagramForMBTI>>([]);
  const [loveLanguage, setLoveLanguage] = useState<ReturnType<typeof getLoveLanguageForMBTI>>(null);
  const [compatibleTypes, setCompatibleTypes] = useState<ReturnType<typeof getTopCompatibleTypes>>([]);
  
  // Education modals state
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [showVariantModal, setShowVariantModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mbti-result');
    if (saved) {
      const parsed: MBTIResult = JSON.parse(saved);
      // Normalize type - remove variant suffix if present (e.g., "INTJ-A" -> "INTJ")
      const normalizedType = parsed.type.split('-')[0].toUpperCase();
      const urlType = type.split('-')[0].toUpperCase();
      
      console.log('🔍 Debug - parsed.type:', parsed.type);
      console.log('🔍 Debug - normalized:', normalizedType);
      console.log('🔍 Debug - URL type:', urlType);
      
      // CRITICAL: Check if type is invalid (XXXX or not a valid MBTI type)
      const validTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                          'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
      
      if (!validTypes.includes(normalizedType) || normalizedType === 'XXXX') {
        console.error('❌ CRITICAL: Invalid MBTI type detected:', normalizedType);
        console.log('🔧 Attempting to recalculate from answers...');
        
        // Try to recalculate from saved answers
        const savedAnswers = localStorage.getItem('mbti-answers');
        if (savedAnswers) {
          try {
            const answers = JSON.parse(savedAnswers);
            const { calculateMBTI } = require('@/lib/mbti-calculator');
            const recalculated = calculateMBTI(answers);
            
            console.log('✅ Recalculated type:', recalculated.type);
            
            // Save recalculated result
            localStorage.setItem('mbti-result', JSON.stringify(recalculated));
            
            // Redirect to correct results page
            router.push(`/results/${recalculated.type}`);
            return;
          } catch (error) {
            console.error('❌ Failed to recalculate:', error);
            alert('Terjadi kesalahan dalam menghitung tipe MBTI. Silakan ulangi tes.');
            router.push('/test');
            return;
          }
        } else {
          console.error('❌ No saved answers found');
          alert('Data tes tidak ditemukan. Silakan ulangi tes.');
          router.push('/test');
          return;
        }
      }
      
      if (normalizedType === urlType) {
        setResult(parsed);
        // Load comprehensive data from database
        const data = getMBTITypeData(normalizedType);
        setTypeData(data);
        
        // Load advanced integrations with normalized type
        const enneagram = getEnneagramForMBTI(normalizedType);
        console.log('✅ Enneagram loaded:', enneagram.length, 'types', enneagram);
        setEnneagramTypes(enneagram);
        
        const loveLang = getLoveLanguageForMBTI(normalizedType);
        console.log('✅ Love Language loaded:', loveLang?.primary, loveLang);
        setLoveLanguage(loveLang);
        
        const compatible = getTopCompatibleTypes(normalizedType, 5);
        console.log('✅ Compatible Types loaded:', compatible.length, 'types', compatible);
        setCompatibleTypes(compatible);
        
        console.log('🎉 All advanced features loaded successfully!');
      } else {
        router.push('/test');
      }
    } else {
      router.push('/test');
    }
  }, [type, router]);

  // ── Retry queue: process any failed DB saves from previous sessions ────────
  useEffect(() => {
    const processRetryQueue = async () => {
      const queueRaw = localStorage.getItem('db-save-queue');
      if (!queueRaw) return;

      let queue: Array<{ userId: string; result: MBTIResult; testDate: string; queuedAt: string }>;
      try {
        queue = JSON.parse(queueRaw);
      } catch {
        localStorage.removeItem('db-save-queue');
        return;
      }

      if (queue.length === 0) return;
      console.log(`🔄 Retrying ${queue.length} queued DB saves...`);

      const remaining = [];
      for (const item of queue) {
        try {
          const userDataRaw = localStorage.getItem('user-data');
          const userData = userDataRaw ? JSON.parse(userDataRaw) : {};

          // Upsert user
          const uRes = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: item.userId,
              name: userData.name || null,
              gender: userData.gender || null,
              mbtiType: item.result.type
            })
          });
          if (!uRes.ok) throw new Error('user upsert failed');

          // Save result
          const rRes = await fetch('/api/results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: crypto.randomUUID(),
              userId: item.userId,
              mbtiType: item.result.type,
              variant: item.result.variant,
              percentages: item.result.percentages,
              dominantFunction: item.result.dominantFunction,
              auxiliaryFunction: item.result.auxiliaryFunction,
              tertiaryFunction: item.result.tertiaryFunction,
              inferiorFunction: item.result.inferiorFunction,
              testDate: item.testDate
            })
          });
          if (!rRes.ok) throw new Error('result save failed');

          console.log('✅ Retry succeeded for queued item');
        } catch (err) {
          console.warn('⚠️ Retry still failed, keeping in queue:', err);
          remaining.push(item);
        }
      }

      if (remaining.length === 0) {
        localStorage.removeItem('db-save-queue');
        localStorage.setItem('db-synced', 'true');
        console.log('✅ All queued saves processed successfully');
      } else {
        localStorage.setItem('db-save-queue', JSON.stringify(remaining));
      }
    };

    // Run retry after a short delay to not block page render
    const timer = setTimeout(processRetryQueue, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    if (!result) return;
    const shareData = {
      title: `Saya ${result.variant}!`,
      text: `Saya baru saja menyelesaikan tes MBTI di Haze MBTI dan hasilnya ${result.variant}!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
        alert('Link berhasil disalin!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRetake = () => {
    if (confirm('Apakah kamu yakin ingin mengulang tes?')) {
      localStorage.removeItem('mbti-answers');
      localStorage.removeItem('mbti-result');
      localStorage.removeItem('mbti-test-date');
      router.push('/test/1');
    }
  };

  const handleChatWithContext = (context: string) => {
    // Save context for AI chat
    localStorage.setItem('chat-context', JSON.stringify({
      type: result?.type,
      variant: result?.variant,
      context: context,
      timestamp: new Date().toISOString()
    }));
    router.push('/chat');
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  // If no data found in database, use result data as fallback
  const displayData = typeData || {
    overview: result.description,
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    careers: result.careers
  };

  // Calculate percentages for visualization
  const functionPairs = {
    'E/I': {
      E: result.percentages.Ne + result.percentages.Se + result.percentages.Te + result.percentages.Fe,
      I: result.percentages.Ni + result.percentages.Si + result.percentages.Ti + result.percentages.Fi,
    },
    'N/S': {
      N: result.percentages.Ne + result.percentages.Ni,
      S: result.percentages.Se + result.percentages.Si,
    },
    'T/F': {
      T: result.percentages.Te + result.percentages.Ti,
      F: result.percentages.Fe + result.percentages.Fi,
    },
    'J/P': {
      J: result.type[3] === 'J' ? 65 : 35,
      P: result.type[3] === 'P' ? 65 : 35,
    },
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'functions', label: 'Functions', icon: Activity },
    { id: 'strengths', label: 'Strengths', icon: Star },
    { id: 'growth', label: 'Growth', icon: TrendingUp },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'communication', label: 'Communication', icon: MessageCircle },
    { id: 'relationships', label: 'Relationships', icon: Heart },
  ];

  return (
    <main className="min-h-screen pt-20">
      {/* Navigation */}
      <TopNav />

      {/* Header */}
      <header className="glass-dark border-b border-navy-200/20 sticky top-0 z-10 backdrop-blur-xl md:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-navy-600 hover:text-navy-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl glass hover:scale-105 transition-transform"
              >
                <Share2 className="w-5 h-5 text-navy-600" />
              </button>
              <button
                onClick={handleRetake}
                className="p-2 rounded-xl glass hover:scale-105 transition-transform"
              >
                <RotateCcw className="w-5 h-5 text-navy-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Hero Card - Type Badge */}
          <div className="glass rounded-3xl p-8 text-center animate-scale-in relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, #0EA5E9 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative z-10">
              <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 text-white font-black text-4xl md:text-5xl mb-4 shadow-xl">
                {result.variant}
              </div>
              
              {typeData && (
                <div className="inline-block px-4 py-2 rounded-full bg-navy-100 text-navy-700 font-bold text-sm mb-4">
                  {typeData.nickname}
                </div>
              )}
              
              <h1 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3">
                {typeData?.description || result.description.split(' - ')[1]?.split('.')[0] || result.type}
              </h1>
              
              <p className="text-navy-600 max-w-2xl mx-auto leading-relaxed mb-6">
                {typeData?.overview || result.description}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-black text-sky-500">{result.percentages[result.dominantFunction as keyof typeof result.percentages]}%</div>
                  <div className="text-xs text-navy-600 mt-1">Dominant</div>
                  <div className="text-sm font-bold text-navy-700">{result.dominantFunction}</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-black text-teal-500">{result.percentages[result.auxiliaryFunction as keyof typeof result.percentages]}%</div>
                  <div className="text-xs text-navy-600 mt-1">Auxiliary</div>
                  <div className="text-sm font-bold text-navy-700">{result.auxiliaryFunction}</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-black text-navy-400">{result.percentages[result.tertiaryFunction as keyof typeof result.percentages]}%</div>
                  <div className="text-xs text-navy-600 mt-1">Tertiary</div>
                  <div className="text-sm font-bold text-navy-700">{result.tertiaryFunction}</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-black text-beige-400">{result.percentages[result.inferiorFunction as keyof typeof result.percentages]}%</div>
                  <div className="text-xs text-navy-600 mt-1">Inferior</div>
                  <div className="text-sm font-bold text-navy-700">{result.inferiorFunction}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="glass rounded-2xl p-2 overflow-x-auto">
            <div className="flex md:grid md:grid-cols-7 gap-2 min-w-max md:min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-br from-sky-400 to-teal-400 text-white shadow-lg'
                      : 'text-navy-600 hover:bg-navy-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Personality Dimensions */}
              <div className="glass rounded-3xl p-6">
                <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-sky-500" />
                  Personality Dimensions
                </h2>
                <div className="space-y-6">
                  {Object.entries(functionPairs).map(([pair, values]) => {
                    const [left, right] = pair.split('/');
                    const leftValue = values[left as keyof typeof values];
                    const rightValue = values[right as keyof typeof values];
                    const total = leftValue + rightValue;
                    const leftPercent = (leftValue / total) * 100;
                    const rightPercent = (rightValue / total) * 100;
                    
                    return (
                      <div key={pair} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium text-navy-700">
                          <span>{left === 'E' ? 'Extraversion' : left === 'N' ? 'Intuition' : left === 'T' ? 'Thinking' : 'Judging'}</span>
                          <span>{right === 'I' ? 'Introversion' : right === 'S' ? 'Sensing' : right === 'F' ? 'Feeling' : 'Perceiving'}</span>
                        </div>
                        <div className="relative h-8 bg-navy-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 h-full bg-gradient-to-r from-sky-400 to-sky-500 transition-all duration-1000"
                            style={{ width: `${leftPercent}%` }}
                          />
                          <div 
                            className="absolute right-0 h-full bg-gradient-to-l from-teal-400 to-teal-500 transition-all duration-1000"
                            style={{ width: `${rightPercent}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-bold text-white">
                            <span>{Math.round(leftPercent)}%</span>
                            <span>{Math.round(rightPercent)}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Function Stack Visualization */}
              <div className="glass rounded-3xl p-6">
                <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-teal-500" />
                  Cognitive Function Stack
                </h2>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { func: result.dominantFunction, role: 'Dominant', color: 'from-sky-400 to-sky-500', desc: typeData?.cognitiveProfile?.dominant?.description || 'Your primary way of processing' },
                    { func: result.auxiliaryFunction, role: 'Auxiliary', color: 'from-teal-400 to-teal-500', desc: typeData?.cognitiveProfile?.auxiliary?.description || 'Your supporting function' },
                    { func: result.tertiaryFunction, role: 'Tertiary', color: 'from-navy-300 to-navy-400', desc: typeData?.cognitiveProfile?.tertiary?.description || 'Developing function' },
                    { func: result.inferiorFunction, role: 'Inferior', color: 'from-beige-300 to-beige-400', desc: typeData?.cognitiveProfile?.inferior?.description || 'Your blind spot' },
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <div className={`glass rounded-2xl p-6 text-center card-hover`}>
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-lg`}>
                          <span className="text-2xl font-black text-white">{item.func}</span>
                        </div>
                        <div className="text-xs font-bold text-navy-500 mb-1">{item.role}</div>
                        <div className="text-2xl font-black text-navy-800 mb-2">
                          {result.percentages[item.func as keyof typeof result.percentages]}%
                        </div>
                        <div className="text-xs text-navy-600 leading-relaxed">{item.desc}</div>
                      </div>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-4 h-4 text-sky-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Detailed Function Explanations */}
                {typeData?.cognitiveProfile && (
                  <div className="mt-6 space-y-4">
                    <h3 className="font-bold text-navy-800 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-sky-500" />
                      How Your Functions Work
                    </h3>
                    {[
                      { key: 'dominant', func: result.dominantFunction, role: 'Dominant' },
                      { key: 'auxiliary', func: result.auxiliaryFunction, role: 'Auxiliary' },
                      { key: 'tertiary', func: result.tertiaryFunction, role: 'Tertiary' },
                      { key: 'inferior', func: result.inferiorFunction, role: 'Inferior' }
                    ].map((item) => {
                      const funcData = typeData.cognitiveProfile[item.key as keyof typeof typeData.cognitiveProfile];
                      return funcData && (
                        <div key={item.key} className="p-4 rounded-xl bg-navy-50">
                          <div className="font-bold text-navy-800 mb-2">
                            {item.role}: {funcData.function}
                          </div>
                          <p className="text-sm text-navy-700 leading-relaxed">
                            {funcData.manifestation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Advanced Integrations */}
              {(enneagramTypes.length > 0 || loveLanguage || compatibleTypes.length > 0) && (
                <div className="glass rounded-3xl p-6">
                  <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    Advanced Personality Insights
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Enneagram Integration */}
                    {enneagramTypes.length > 0 && (
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
                        <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                          <Star className="w-5 h-5" />
                          Likely Enneagram Types
                        </h3>
                        <div className="space-y-3">
                          {enneagramTypes.map((ennea, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white shadow-sm">
                              <div className="font-bold text-purple-700 mb-1">
                                Type {ennea.type}: {ennea.name}
                              </div>
                              <div className="text-xs text-navy-600 mb-2">{ennea.description}</div>
                              <div className="text-xs text-navy-500">
                                <strong>Core Motivation:</strong> {ennea.coreMotivation}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-navy-600 mt-3">
                          💡 Enneagram menjelaskan motivasi core kamu, sementara MBTI menjelaskan bagaimana kamu process information.
                        </p>
                      </div>
                    )}

                    {/* Love Language */}
                    {loveLanguage && (
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100">
                        <h3 className="font-bold text-pink-700 mb-3 flex items-center gap-2">
                          <Heart className="w-5 h-5" />
                          Your Love Language
                        </h3>
                        <div className="space-y-3">
                          <div className="p-3 rounded-xl bg-white shadow-sm">
                            <div className="font-bold text-pink-700 mb-1">
                              Primary: {loveLanguage.primary}
                            </div>
                            <div className="text-xs text-navy-600 mb-2">
                              Secondary: {loveLanguage.secondary}
                            </div>
                            <p className="text-xs text-navy-700 leading-relaxed">
                              {loveLanguage.description}
                            </p>
                          </div>
                          <div className="text-xs text-navy-600">
                            <strong>How to Express:</strong>
                            <ul className="mt-1 space-y-1">
                              {loveLanguage.howToExpress.slice(0, 2).map((tip, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-pink-500">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <p className="text-xs text-navy-600 mt-3">
                          💝 Love languages membantu kamu understand bagaimana give dan receive love.
                        </p>
                      </div>
                    )}

                    {/* Top Compatible Types */}
                    {compatibleTypes.length > 0 && (
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100">
                        <h3 className="font-bold text-teal-700 mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Most Compatible Types
                        </h3>
                        <div className="space-y-2">
                          {compatibleTypes.map((comp, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white shadow-sm">
                              <span className="font-bold text-teal-700">{comp.type}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-navy-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500"
                                    style={{ width: `${comp.score}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-teal-600">{comp.score}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-navy-600 mt-3">
                          🤝 Compatibility tinggi = easier understanding, tapi semua relationships bisa work dengan effort!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pelajari Lebih Dalam - Education Section */}
              <div className="glass rounded-3xl p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
                <h2 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-indigo-500" />
                  Pelajari Lebih Dalam
                </h2>
                <p className="text-navy-600 mb-6 text-sm">
                  Klik untuk memahami secara detail tentang tipe kepribadian dan cognitive functions yang kamu miliki.
                </p>

                {/* Variant Explanation */}
                <div className="mb-6">
                  <h3 className="font-bold text-navy-700 mb-3 text-sm">Apa itu {result.variant.split('-')[1]}?</h3>
                  <button
                    onClick={() => setShowVariantModal(true)}
                    className="w-full p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all border-2 border-purple-200 hover:border-purple-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                          <span className="text-white font-black text-sm">-{result.variant.split('-')[1]}</span>
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-navy-800">
                            {result.variant.split('-')[1] === 'A' ? 'Assertive' : 'Turbulent'}
                          </div>
                          <div className="text-xs text-navy-600">
                            Pelajari karakteristik variant kamu
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>

                {/* Cognitive Functions Explanation */}
                <div>
                  <h3 className="font-bold text-navy-700 mb-3 text-sm">Cognitive Functions Kamu</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { func: result.dominantFunction, role: 'Dominant', color: 'from-sky-400 to-sky-500', bgColor: 'from-sky-50 to-sky-100', borderColor: 'border-sky-200 hover:border-sky-300' },
                      { func: result.auxiliaryFunction, role: 'Auxiliary', color: 'from-teal-400 to-teal-500', bgColor: 'from-teal-50 to-teal-100', borderColor: 'border-teal-200 hover:border-teal-300' },
                      { func: result.tertiaryFunction, role: 'Tertiary', color: 'from-navy-400 to-navy-500', bgColor: 'from-navy-50 to-navy-100', borderColor: 'border-navy-200 hover:border-navy-300' },
                      { func: result.inferiorFunction, role: 'Inferior', color: 'from-beige-400 to-beige-500', bgColor: 'from-beige-50 to-beige-100', borderColor: 'border-beige-200 hover:border-beige-300' },
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedFunction(item.func)}
                        className={`p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:${item.bgColor} transition-all border-2 ${item.borderColor} group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                              <span className="text-white font-black text-sm">{item.func}</span>
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-navy-800 text-sm">{item.func}</div>
                              <div className="text-xs text-navy-600">{item.role} Function</div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-navy-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white border-2 border-indigo-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-navy-600 leading-relaxed">
                      <strong className="text-navy-800">Pro Tip:</strong> Memahami cognitive functions kamu akan membantu kamu mengerti kenapa kamu berpikir dan bertindak dengan cara tertentu. Ini adalah kunci untuk personal growth!
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA to AI Psychologist */}
              <div className="glass rounded-2xl p-6 bg-gradient-to-br from-sky-50 to-teal-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 mb-2">Ingin Memahami Lebih Dalam?</h3>
                    <p className="text-sm text-navy-600 mb-4">
                      Chat dengan AI Psychologist untuk mendapatkan insights personal tentang cognitive functions kamu dan bagaimana mengoptimalkannya.
                    </p>
                    <button
                      onClick={() => handleChatWithContext('Saya ingin memahami lebih dalam tentang cognitive functions saya sebagai ' + result.type)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'functions' && (
            <div className="glass rounded-3xl p-6">
              <h2 className="text-xl font-bold text-navy-800 mb-6">All Cognitive Functions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(result.percentages).map(([func, score]) => (
                  <div key={func} className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-navy-800">{func}</div>
                        <div className="text-xs text-navy-600">
                          {func === 'Ne' ? 'Extraverted Intuition' :
                           func === 'Ni' ? 'Introverted Intuition' :
                           func === 'Se' ? 'Extraverted Sensing' :
                           func === 'Si' ? 'Introverted Sensing' :
                           func === 'Te' ? 'Extraverted Thinking' :
                           func === 'Ti' ? 'Introverted Thinking' :
                           func === 'Fe' ? 'Extraverted Feeling' : 'Introverted Feeling'}
                        </div>
                      </div>
                      <div className="text-2xl font-black text-sky-500">{score}%</div>
                    </div>
                    <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-sky-400 to-teal-400 transition-all duration-1000"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'strengths' && (
            <div className="space-y-6">
              <div className="glass rounded-3xl p-6">
                <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-sky-500" />
                  Your Strengths
                </h2>
                <p className="text-navy-600 mb-6 leading-relaxed">
                  Sebagai {result.type}, kamu memiliki kekuatan unik yang membedakan kamu dari tipe lain. Leverage strengths ini untuk mencapai potensi maksimalmu.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {(typeData?.strengths || result.strengths).map((strength, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl glass card-hover">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-navy-800 mb-1">{strength}</div>
                        <div className="text-sm text-navy-600">Gunakan ini sebagai keunggulan kompetitifmu</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to Leverage Strengths */}
              <div className="glass rounded-3xl p-6">
                <h3 className="font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-teal-500" />
                  Cara Memaksimalkan Kekuatanmu
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-sky-50">
                    <div className="font-bold text-sky-700 mb-2">💼 Di Tempat Kerja</div>
                    <p className="text-sm text-navy-700">
                      Cari peran yang memungkinkan kamu menggunakan {result.dominantFunction} secara maksimal. 
                      Volunteer untuk projects yang align dengan strengths naturalmu.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-teal-50">
                    <div className="font-bold text-teal-700 mb-2">❤️ Dalam Relationships</div>
                    <p className="text-sm text-navy-700">
                      Komunikasikan strengths-mu kepada partner dan teman. Biarkan mereka tahu bagaimana kamu bisa contribute secara unik.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-navy-50">
                    <div className="font-bold text-navy-700 mb-2">🎯 Personal Development</div>
                    <p className="text-sm text-navy-700">
                      Invest waktu untuk develop strengths-mu lebih lanjut. Baca buku, ambil courses, atau find mentor yang excel di area yang sama.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="glass rounded-2xl p-6 bg-gradient-to-br from-sky-50 to-teal-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 mb-2">Butuh Strategi Personal?</h3>
                    <p className="text-sm text-navy-600 mb-4">
                      Diskusikan dengan AI Psychologist tentang cara spesifik untuk leverage strengths-mu dalam situasi yang kamu hadapi.
                    </p>
                    <button
                      onClick={() => handleChatWithContext('Bagaimana cara saya memaksimalkan kekuatan saya sebagai ' + result.type + '?')}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Diskusi Strategi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'growth' && (
            <div className="space-y-6">
              {/* Weaknesses/Growth Areas */}
              <div className="glass rounded-3xl p-6">
                <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-teal-500" />
                  Areas for Growth
                </h2>
                <p className="text-navy-600 mb-6 leading-relaxed">
                  Setiap tipe memiliki blind spots dan areas untuk development. Awareness adalah langkah pertama menuju growth.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {(typeData?.weaknesses || result.weaknesses).map((weakness, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl glass card-hover">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-navy-400 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-navy-800 mb-1">{weakness}</div>
                        <div className="text-sm text-navy-600">Opportunity untuk personal development</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Strategies */}
              {typeData?.growth && (
                <div className="glass rounded-3xl p-6">
                  <h3 className="font-bold text-navy-800 mb-6 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-sky-500" />
                    Strategi Pengembangan Diri
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Develop Dominant */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{result.dominantFunction}</span>
                        </div>
                        <h4 className="font-bold text-sky-700">Develop Dominant Function</h4>
                      </div>
                      <ul className="space-y-2">
                        {typeData.growth.developDominant.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                            <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Strengthen Auxiliary */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{result.auxiliaryFunction}</span>
                        </div>
                        <h4 className="font-bold text-teal-700">Strengthen Auxiliary Function</h4>
                      </div>
                      <ul className="space-y-2">
                        {typeData.growth.strengthenAuxiliary.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                            <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Balance Tertiary */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-400 to-navy-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{result.tertiaryFunction}</span>
                        </div>
                        <h4 className="font-bold text-navy-700">Balance Tertiary Function</h4>
                      </div>
                      <ul className="space-y-2">
                        {typeData.growth.balanceTertiary.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                            <CheckCircle className="w-4 h-4 text-navy-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Integrate Inferior */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-beige-50 to-beige-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-beige-400 to-beige-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{result.inferiorFunction}</span>
                        </div>
                        <h4 className="font-bold text-beige-700">Integrate Inferior Function</h4>
                      </div>
                      <ul className="space-y-2">
                        {typeData.growth.integrateInferior.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                            <CheckCircle className="w-4 h-4 text-beige-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Stress Management */}
              {typeData?.stressResponse && (
                <div className="glass rounded-3xl p-6">
                  <h3 className="font-bold text-navy-800 mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-500" />
                    Stress Management
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Triggers */}
                    <div className="p-4 rounded-xl bg-red-50">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <h4 className="font-bold text-red-700">Triggers</h4>
                      </div>
                      <ul className="space-y-2">
                        {typeData.stressResponse.triggers.map((trigger, i) => (
                          <li key={i} className="text-xs text-navy-700 flex items-start gap-1">
                            <span className="text-red-500">•</span>
                            <span>{trigger}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Symptoms */}
                    <div className="p-4 rounded-xl bg-orange-50">
                      <div className="flex items-center gap-2 mb-3">
                        <Frown className="w-5 h-5 text-orange-500" />
                        <h4 className="font-bold text-orange-700">Symptoms</h4>
                      </div>
                      <ul className="space-y-2">
                        {typeData.stressResponse.symptoms.map((symptom, i) => (
                          <li key={i} className="text-xs text-navy-700 flex items-start gap-1">
                            <span className="text-orange-500">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Coping Strategies */}
                    <div className="p-4 rounded-xl bg-green-50">
                      <div className="flex items-center gap-2 mb-3">
                        <Smile className="w-5 h-5 text-green-500" />
                        <h4 className="font-bold text-green-700">Coping</h4>
                      </div>
                      <ul className="space-y-2">
                        {typeData.stressResponse.copingStrategies.map((strategy, i) => (
                          <li key={i} className="text-xs text-navy-700 flex items-start gap-1">
                            <span className="text-green-500">•</span>
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="glass rounded-2xl p-6 bg-gradient-to-br from-sky-50 to-teal-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 mb-2">Butuh Personal Growth Plan?</h3>
                    <p className="text-sm text-navy-600 mb-4">
                      Chat dengan AI Psychologist untuk membuat action plan yang spesifik untuk development journey-mu.
                    </p>
                    <button
                      onClick={() => handleChatWithContext('Saya ingin membuat personal growth plan sebagai ' + result.type)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Buat Growth Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'career' && (
            <div className="space-y-6">
              <div className="glass rounded-3xl p-6">
                <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-sky-500" />
                  Career Recommendations
                </h2>
                <p className="text-navy-600 mb-6 leading-relaxed">
                  Berdasarkan cognitive functions dan preferences-mu, berikut adalah career paths yang cocok untuk {result.type}.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {(typeData?.careers || result.careers).map((career, index) => (
                    <div key={index} className="p-4 rounded-xl glass text-center card-hover">
                      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center mb-3">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="font-bold text-navy-800 text-sm">{career}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Style */}
              {typeData?.relationships?.workplace && (
                <div className="glass rounded-3xl p-6">
                  <h3 className="font-bold text-navy-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-500" />
                    Your Work Style
                  </h3>
                  <p className="text-navy-700 mb-6 leading-relaxed">
                    {typeData.relationships.workplace.style}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-sky-50">
                      <h4 className="font-bold text-sky-700 mb-3">💪 Workplace Strengths</h4>
                      <ul className="space-y-2">
                        {typeData.relationships.workplace.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                            <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-teal-50">
                      <h4 className="font-bold text-teal-700 mb-3">💡 Tips for Success</h4>
                      <ul className="space-y-2">
                        {typeData.relationships.workplace.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                            <Lightbulb className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Learning Style */}
              {typeData?.learningStyle && (
                <div className="glass rounded-3xl p-6">
                  <h3 className="font-bold text-navy-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-sky-500" />
                    Your Learning Style
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-navy-50">
                      <h4 className="font-bold text-navy-700 mb-2">📚 Learning Preferences</h4>
                      <ul className="space-y-1">
                        {typeData.learningStyle.preferences.map((pref, i) => (
                          <li key={i} className="text-sm text-navy-700 flex items-start gap-2">
                            <span className="text-sky-500">•</span>
                            <span>{pref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-sky-50">
                      <h4 className="font-bold text-sky-700 mb-2">⭐ Learning Strengths</h4>
                      <ul className="space-y-1">
                        {typeData.learningStyle.strengths.map((strength, i) => (
                          <li key={i} className="text-sm text-navy-700 flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="glass rounded-2xl p-6 bg-gradient-to-br from-sky-50 to-teal-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 mb-2">Butuh Career Guidance?</h3>
                    <p className="text-sm text-navy-600 mb-4">
                      Diskusikan career path, job search strategies, atau workplace challenges dengan AI Psychologist.
                    </p>
                    <button
                      onClick={() => handleChatWithContext('Saya ingin diskusi tentang career path yang cocok untuk ' + result.type)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Career Counseling
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              {typeData?.communication ? (
                <>
                  {/* Communication Style Overview */}
                  <div className="glass rounded-3xl p-6">
                    <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 text-sky-500" />
                      Your Communication Style
                    </h2>
                    <p className="text-navy-700 leading-relaxed mb-6">
                      {typeData.communication.style}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Preferences */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100">
                        <h3 className="font-bold text-sky-700 mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5" />
                          Communication Preferences
                        </h3>
                        <ul className="space-y-3">
                          {typeData.communication.preferences.map((pref, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                              <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                              <span>{pref}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Strengths */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100">
                        <h3 className="font-bold text-teal-700 mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          Communication Strengths
                        </h3>
                        <ul className="space-y-3">
                          {typeData.communication.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                              <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Communication Challenges */}
                  <div className="glass rounded-3xl p-6">
                    <h3 className="font-bold text-navy-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      Communication Challenges & How to Overcome
                    </h3>
                    <div className="space-y-3">
                      {typeData.communication.challenges.map((challenge, i) => (
                        <div key={i} className="p-4 rounded-xl bg-orange-50">
                          <div className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="font-bold text-orange-700 mb-1">{challenge}</div>
                              <div className="text-sm text-navy-600">
                                Tip: Practice awareness dan minta feedback dari orang terdekat untuk improve di area ini.
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Communication Tips by Context */}
                  <div className="glass rounded-3xl p-6">
                    <h3 className="font-bold text-navy-800 mb-6 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-sky-500" />
                      Communication Tips by Context
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-sky-50">
                        <div className="font-bold text-sky-700 mb-3">💼 At Work</div>
                        <ul className="space-y-2 text-xs text-navy-700">
                          <li>• Be clear and direct in emails</li>
                          <li>• Prepare talking points for meetings</li>
                          <li>• Follow up verbal discussions in writing</li>
                          <li>• Respect different communication styles</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-teal-50">
                        <div className="font-bold text-teal-700 mb-3">❤️ In Relationships</div>
                        <ul className="space-y-2 text-xs text-navy-700">
                          <li>• Express feelings regularly</li>
                          <li>• Listen actively without problem-solving</li>
                          <li>• Ask clarifying questions</li>
                          <li>• Be patient with emotional processing</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-navy-50">
                        <div className="font-bold text-navy-700 mb-3">👥 With Friends</div>
                        <ul className="space-y-2 text-xs text-navy-700">
                          <li>• Balance deep talks with light conversation</li>
                          <li>• Be present and engaged</li>
                          <li>• Share your thoughts openly</li>
                          <li>• Respect boundaries and preferences</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="glass rounded-3xl p-6">
                  <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-sky-500" />
                    Communication Style
                  </h2>
                  <p className="text-navy-700 leading-relaxed">
                    As an {result.type}, you communicate best through {result.type[0] === 'E' ? 'verbal expression and group discussions' : 'one-on-one conversations and written communication'}.
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="glass rounded-2xl p-6 bg-gradient-to-br from-sky-50 to-teal-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 mb-2">Improve Your Communication?</h3>
                    <p className="text-sm text-navy-600 mb-4">
                      Chat dengan AI Psychologist untuk mendapatkan tips komunikasi yang spesifik untuk situasi yang kamu hadapi.
                    </p>
                    <button
                      onClick={() => handleChatWithContext('Bagaimana cara saya berkomunikasi lebih efektif sebagai ' + result.type + '?')}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Get Communication Tips
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'relationships' && (
            <div className="space-y-6">
              {typeData?.relationships ? (
                <>
                  {/* Romantic Relationships */}
                  <div className="glass rounded-3xl p-6">
                    <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-pink-500" />
                      Romantic Relationships
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Strengths */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100">
                        <h3 className="font-bold text-pink-700 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Your Strengths in Love
                        </h3>
                        <ul className="space-y-3">
                          {typeData.relationships.romantic.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                              <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Challenges */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
                        <h3 className="font-bold text-orange-700 mb-4 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Relationship Challenges
                        </h3>
                        <ul className="space-y-3">
                          {typeData.relationships.romantic.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                              <XCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tips for Success */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50">
                      <h3 className="font-bold text-navy-800 mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-sky-500" />
                        Tips for Healthy Relationships
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {typeData.relationships.romantic.tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-navy-700">
                            <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ideal Partners */}
                    <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
                      <h3 className="font-bold text-purple-700 mb-4 flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Most Compatible Types
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {typeData.relationships.romantic.idealPartners.map((partner, i) => (
                          <div key={i} className="px-4 py-2 rounded-full bg-white shadow-sm">
                            <span className="font-bold text-purple-700">{partner}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-navy-600 mt-3">
                        Note: Compatibility bukan segalanya! Setiap relationship bisa berhasil dengan komunikasi dan effort yang tepat.
                      </p>
                    </div>
                  </div>

                  {/* Friendship */}
                  <div className="glass rounded-3xl p-6">
                    <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                      <Users className="w-6 h-6 text-sky-500" />
                      Friendship Style
                    </h2>
                    
                    <p className="text-navy-700 leading-relaxed mb-6">
                      {typeData.relationships.friendship.approach}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* What You Value */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100">
                        <h3 className="font-bold text-sky-700 mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5" />
                          What You Value in Friends
                        </h3>
                        <ul className="space-y-3">
                          {typeData.relationships.friendship.values.map((value, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                              <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                              <span>{value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Friendship Tips */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100">
                        <h3 className="font-bold text-teal-700 mb-4 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" />
                          Tips for Better Friendships
                        </h3>
                        <ul className="space-y-3">
                          {typeData.relationships.friendship.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                              <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Workplace Relationships */}
                  <div className="glass rounded-3xl p-6">
                    <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-teal-500" />
                      Workplace Relationships
                    </h2>
                    
                    <p className="text-navy-700 leading-relaxed mb-6">
                      {typeData.relationships.workplace.style}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Strengths */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100">
                        <h3 className="font-bold text-navy-700 mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          Professional Strengths
                        </h3>
                        <ul className="space-y-3">
                          {typeData.relationships.workplace.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                              <CheckCircle className="w-4 h-4 text-navy-500 mt-0.5 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-beige-50 to-beige-100">
                        <h3 className="font-bold text-beige-700 mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Professional Tips
                        </h3>
                        <ul className="space-y-3">
                          {typeData.relationships.workplace.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                              <CheckCircle className="w-4 h-4 text-beige-500 mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="glass rounded-3xl p-6">
                  <h2 className="text-xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-teal-500" />
                    Relationships
                  </h2>
                  <p className="text-navy-700 leading-relaxed">
                    As an {result.type}, you value deep, meaningful connections and authentic relationships.
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="glass rounded-2xl p-6 bg-gradient-to-br from-sky-50 to-teal-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 mb-2">Need Relationship Advice?</h3>
                    <p className="text-sm text-navy-600 mb-4">
                      Chat dengan AI Psychologist untuk mendapatkan insights tentang relationships, compatibility, dan cara membangun koneksi yang lebih baik.
                    </p>
                    <button
                      onClick={() => handleChatWithContext('Saya ingin memahami lebih dalam tentang relationship dynamics sebagai ' + result.type)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Relationship Counseling
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/chat"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              Chat dengan AI Psychologist
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass font-bold text-lg hover:scale-105 transition-all text-navy-700"
            >
              <Share2 className="w-6 h-6" />
              Share Results
            </button>
          </div>
        </div>
      </div>

      {/* Education Modals */}
      {selectedFunction && (
        <FunctionDetailModal
          functionCode={selectedFunction}
          isOpen={!!selectedFunction}
          onClose={() => setSelectedFunction(null)}
        />
      )}
      
      {showVariantModal && result && (
        <VariantDetailModal
          variantCode={result.variant.split('-')[1]}
          isOpen={showVariantModal}
          onClose={() => setShowVariantModal(false)}
        />
      )}
    </main>
  );
}
