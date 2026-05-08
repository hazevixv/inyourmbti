"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Sparkles, Info } from 'lucide-react';
import Link from 'next/link';
import { questions, getQuestion } from '@/lib/questions';
import { calculateMBTI } from '@/lib/mbti-calculator';

const ANSWER_OPTIONS = [
  { value: 1, label: 'Sangat Tidak', slug: 'sangat-tidak', bgIdle: '#FFF1F1', bgSelected: '#FFE4E4', border: '#FECACA', textSelected: '#9F1239' },
  { value: 2, label: 'Tidak',        slug: 'tidak',        bgIdle: '#FFF4EE', bgSelected: '#FFE8D6', border: '#FED7AA', textSelected: '#9A3412' },
  { value: 3, label: 'Netral',       slug: 'netral',       bgIdle: '#F0F9FF', bgSelected: '#E0F2FE', border: '#BAE6FD', textSelected: '#0369A1' },
  { value: 4, label: 'Setuju',       slug: 'setuju',       bgIdle: '#F0FDFB', bgSelected: '#CCFBF1', border: '#99F6E4', textSelected: '#0F766E' },
  { value: 5, label: 'Sangat Setuju',slug: 'sangat-setuju',bgIdle: '#F5F3FF', bgSelected: '#E0E7FF', border: '#C7D2FE', textSelected: '#4338CA' },
];

// ── Confetti pieces config ─────────────────────────────────────────────────
const CONFETTI = [
  { color: '#38BDF8', shape: 'rect',   x: 15, delay: 0,    dur: 0.9 },
  { color: '#F472B6', shape: 'circle', x: 25, delay: 0.1,  dur: 1.0 },
  { color: '#A78BFA', shape: 'rect',   x: 40, delay: 0.05, dur: 0.85 },
  { color: '#34D399', shape: 'circle', x: 55, delay: 0.15, dur: 1.1 },
  { color: '#FBBF24', shape: 'rect',   x: 65, delay: 0,    dur: 0.95 },
  { color: '#F87171', shape: 'circle', x: 75, delay: 0.2,  dur: 1.0 },
  { color: '#38BDF8', shape: 'rect',   x: 85, delay: 0.1,  dur: 0.9 },
  { color: '#A78BFA', shape: 'circle', x: 10, delay: 0.25, dur: 1.05 },
  { color: '#34D399', shape: 'rect',   x: 50, delay: 0.3,  dur: 0.8 },
  { color: '#FBBF24', shape: 'circle', x: 90, delay: 0.05, dur: 1.1 },
  { color: '#F472B6', shape: 'rect',   x: 30, delay: 0.2,  dur: 0.95 },
  { color: '#F87171', shape: 'rect',   x: 70, delay: 0.15, dur: 1.0 },
];

// Milestone messages — only at 25, 50, 75, 90
const MILESTONES: Record<number, { emoji: string; title: string; sub: string }> = {
  25: { emoji: '🌟', title: 'Seperempat Jalan!',  sub: '25 soal terjawab — kamu sudah mulai memahami dirimu!' },
  50: { emoji: '🎯', title: 'Setengah Jalan!',    sub: 'Tepat 50% — kamu luar biasa, terus semangat!' },
  75: { emoji: '🚀', title: 'Hampir Sampai!',     sub: '75 soal — tinggal sedikit lagi menuju hasil!' },
  90: { emoji: '🏆', title: 'Finishing Line!',    sub: 'Hanya 6 soal tersisa — kamu hampir di garis akhir!' },
};

// ── Celebration Splash Component ───────────────────────────────────────────
function CelebrationSplash({ count, total, onDone }: { count: number; total: number; onDone: () => void }) {
  const milestone = MILESTONES[count] || { emoji: '🎉', title: 'Hebat!', sub: `${count} soal terjawab!` };
  const pct = Math.round((count / total) * 100);

  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onDone}
    >
      {/* Confetti layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: `${c.x}%`,
              width: c.shape === 'rect' ? '8px' : '10px',
              height: c.shape === 'rect' ? '14px' : '10px',
              borderRadius: c.shape === 'circle' ? '50%' : '2px',
              backgroundColor: c.color,
              animation: `confettiFall ${c.dur}s ${c.delay}s ease-in forwards`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div
        className="relative bg-white rounded-3xl px-8 py-10 max-w-xs w-full text-center shadow-2xl"
        style={{ animation: 'splashIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Emoji big */}
        <div className="text-6xl mb-4 animate-bounce">{milestone.emoji}</div>

        {/* Title */}
        <h2 className="text-2xl font-black text-navy-900 mb-1">{milestone.title}</h2>
        <p className="text-sm text-navy-500 mb-5">{milestone.sub}</p>

        {/* Progress ring */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#E0F2FE" strokeWidth="6" />
              <circle cx="32" cy="32" r="26" fill="none"
                stroke="url(#prog)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
              <defs>
                <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#2DD4BF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-sky-600">{pct}%</span>
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl font-black text-navy-900">{count}<span className="text-sm font-normal text-navy-400">/{total}</span></div>
            <div className="text-xs text-navy-500">soal terjawab</div>
          </div>
        </div>

        {/* Tap to continue */}
        <p className="text-xs text-navy-400">Tap untuk lanjut</p>
      </div>
    </div>
  );
}

export default function QuestionPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = parseInt(params.questionId as string);
  
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [userGender, setUserGender] = useState<'male' | 'female'>('male');
  const [showCelebration, setShowCelebration] = useState(false);
  const celebratedRef = useRef<Set<number>>(new Set());

  // Load gender from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user-data');
      if (userData) {
        const parsed = JSON.parse(userData);
        setUserGender(parsed.gender === 'female' ? 'female' : 'male');
      }
    } catch {}
  }, []);

  const question = useMemo(() => getQuestion(questionId), [questionId]);
  const progress = useMemo(() => (questionId / questions.length) * 100, [questionId]);
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  // Load answers from localStorage - FIXED VERSION
  useEffect(() => {
    // Reset selected answer first
    setSelectedAnswer(null);
    
    const saved = localStorage.getItem('mbti-answers');
    
    if (!saved) {
      // No saved answers at all
      setAnswers({});
      return;
    }
    
    try {
      const parsed = JSON.parse(saved);
      
      // Validate that parsed is an object
      if (typeof parsed !== 'object' || parsed === null) {
        console.warn('Invalid saved answers format');
        setAnswers({});
        return;
      }
      
      setAnswers(parsed);
      
      // Check if this specific question has been answered
      const savedAnswer = parsed[questionId];
      
      // Only set selectedAnswer if it's a valid number between 1-5
      if (typeof savedAnswer === 'number' && savedAnswer >= 1 && savedAnswer <= 5) {
        setSelectedAnswer(savedAnswer);
      } else {
        setSelectedAnswer(null);
      }
    } catch (error) {
      console.error('Error parsing saved answers:', error);
      setAnswers({});
      setSelectedAnswer(null);
    }
  }, [questionId]);

  // Handle answer selection with useCallback
  const handleAnswer = useCallback(async (value: number) => {
    setSelectedAnswer(value);

    // Haptic feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    // Save answer
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    localStorage.setItem('mbti-answers', JSON.stringify(newAnswers));

    // Check milestone celebration (every 10, plus 48 for ~50%)
    const newCount = Object.keys(newAnswers).length;
    const milestoneKeys = Object.keys(MILESTONES).map(Number);
    if (milestoneKeys.includes(newCount) && !celebratedRef.current.has(newCount)) {
      celebratedRef.current.add(newCount);
      setShowCelebration(true);
      // Don't auto-navigate — wait for celebration to dismiss
      return;
    }

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 400));

    // Navigate to next question or results
    if (questionId < questions.length) {
      router.push(`/test/${questionId + 1}`);
    } else {
      // ── STEP 1: Calculate result immediately ──────────────────────────────
      setIsSubmitting(true);
      const result = calculateMBTI(newAnswers);

      // ── STEP 2: Save to localStorage FIRST (always succeeds) ─────────────
      localStorage.setItem('mbti-result', JSON.stringify(result));
      localStorage.setItem('mbti-test-date', new Date().toISOString());
      const resultId = crypto.randomUUID();
      localStorage.setItem('mbti-result-id', resultId);

      // ── STEP 3: Ensure userId exists ──────────────────────────────────────
      let userId = localStorage.getItem('user-id');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('user-id', userId);
      }

      // ── STEP 4: Save to DB in background (non-blocking) ───────────────────
      // Redirect to profile-complete first (collect extra data), then to results
      router.push('/profile-complete');

      // Save to DB after redirect (fire-and-forget with retry queue)
      saveToDatabase(userId, result, resultId).catch(() => {
        // Queue for retry on next page load
        const queue = JSON.parse(localStorage.getItem('db-save-queue') || '[]');
        queue.push({
          resultId,
          userId,
          result,
          testDate: new Date().toISOString(),
          queuedAt: new Date().toISOString()
        });
        localStorage.setItem('db-save-queue', JSON.stringify(queue));
      });
    }
  }, [answers, questionId, router]);

  // ── DB Save function with proper error handling ────────────────────────────
  async function saveToDatabase(userId: string, result: ReturnType<typeof calculateMBTI>, resultId: string) {
    // Load user data from localStorage for name/gender
    const userDataRaw = localStorage.getItem('user-data');
    const userData = userDataRaw ? JSON.parse(userDataRaw) : {};

    // Step A: Ensure user exists in DB (upsert)
    const userResponse = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        name: userData.name || null,
        gender: userData.gender || null,
        mbtiType: result.type
      })
    });

    if (!userResponse.ok) {
      const err = await userResponse.text();
      throw new Error(`User upsert failed: ${err}`);
    }
    const resultResponse = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: resultId,
        userId,
        mbtiType: result.type,
        variant: result.variant,
        percentages: result.percentages,
        dominantFunction: result.dominantFunction,
        auxiliaryFunction: result.auxiliaryFunction,
        tertiaryFunction: result.tertiaryFunction,
        inferiorFunction: result.inferiorFunction,
        testDate: new Date().toISOString()
      })
    });

    if (!resultResponse.ok) {
      const err = await resultResponse.text();
      throw new Error(`Result save failed: ${err}`);
    }
    // Mark as synced
    localStorage.setItem('db-synced', 'true');
    localStorage.setItem('db-synced-at', new Date().toISOString());
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy-600 mb-4">Pertanyaan tidak ditemukan</p>
          <Link href="/test" className="text-sky-500 hover:underline font-medium">
            Kembali ke awal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-teal-50 pt-[68px]">
      {/* Header */}
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4 gap-3">

          {/* ← Prev */}
          <Link 
            href={questionId > 1 ? `/test/${questionId - 1}` : '/test'}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 border border-navy-200/60 shadow-sm text-xs font-semibold text-navy-700 hover:bg-white hover:shadow-md hover:scale-105 transition-all flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </Link>

          {/* ☕ Istirahat Sejenak — center */}
          <Link
            href="/"
            className="flex flex-col items-center gap-0.5 px-5 py-2.5 rounded-2xl bg-white/90 border border-navy-200/60 shadow-sm hover:bg-white hover:shadow-md hover:scale-105 transition-all text-center group"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm">☕</span>
              <span className="text-xs font-bold text-navy-700 group-hover:text-sky-600 transition-colors">Istirahat Sejenak</span>
            </div>
            <span className="text-[10px] text-navy-400 leading-tight hidden sm:block">
              Progres tersimpan · lanjut kapan saja
            </span>
          </Link>

          {/* Next → — disabled jika soal ini belum dijawab */}
          {questionId < questions.length ? (
            answers[questionId] !== undefined ? (
              <Link
                href={`/test/${questionId + 1}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all flex-shrink-0"
              >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-navy-100/60 border border-navy-200/40 text-xs font-semibold text-navy-300 cursor-not-allowed flex-shrink-0"
                title="Jawab soal ini dulu untuk lanjut"
              >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )
          ) : (
            <div className="w-20 flex-shrink-0" />
          )}
        </div>

        {/* Progress Bar - Animated */}
        <div className="relative h-2 bg-navy-100 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 via-teal-400 to-teal-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>

        {/* Progress Stats */}
        <div className="flex justify-between items-center mt-2 text-xs text-navy-500">
          <span>{answeredCount} dijawab</span>
          <span>{questions.length - answeredCount} tersisa</span>
        </div>
      </header>

      {/* Question Content */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          
          {/* Question Number Badge - Floating */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass shadow-lg">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">{questionId}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 rounded-full animate-ping" />
              </div>
              <span className="text-sm font-semibold text-navy-700">of {questions.length}</span>
            </div>
          </div>

          {/* Mobile PWA toast — di bawah badge, di atas card pertanyaan */}
          {/* Removed — replaced by CelebrationSplash */}

          {/* Question Card - Modern & Clean */}
          <div className="glass rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-100 to-teal-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-100 to-sky-100 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-bold text-navy-800 leading-relaxed text-center mb-4">
                {question.text}
              </h1>
              
              <div className="flex items-center justify-center gap-2 text-sm text-navy-500">
                <Sparkles className="w-4 h-4" />
                <span>Pilih yang paling menggambarkan dirimu</span>
              </div>

              {/* Explain Button */}
              <button
                onClick={() => setShowExplain(!showExplain)}
                className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-xs font-medium text-navy-600 hover:scale-105 transition-transform"
              >
                <Info className="w-3.5 h-3.5" />
                {showExplain ? 'Sembunyikan' : 'Apa maksudnya?'}
              </button>

              {/* Explanation */}
              {showExplain && question.explanation && (
                <div className="mt-4 p-4 rounded-2xl bg-sky-50 border border-sky-100 animate-slide-in-up">
                  <p className="text-sm text-navy-700 leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {/* Scale Labels */}
            <div className="flex justify-between px-1 text-xs font-semibold text-navy-400">
              <span>Tidak Setuju</span>
              <span>Netral</span>
              <span>Setuju</span>
            </div>

            {/* Answer Buttons — 5 kolom, responsive */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-3">
              {ANSWER_OPTIONS.map((option) => {
                const isSelected = selectedAnswer !== null && selectedAnswer === option.value;
                const imgSrc = `/img/answer/${userGender}-answer-${option.value}-${option.slug}.avif`;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    disabled={isSubmitting}
                    className={`
                      relative group w-full
                      ${isSelected ? 'scale-105 z-10' : 'hover:scale-[1.03]'}
                      transition-all duration-300
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div
                      className="relative overflow-hidden rounded-xl sm:rounded-2xl py-2.5 px-1 sm:py-3 sm:px-2 md:py-5 md:px-3 transition-all duration-300 flex flex-col items-center gap-1.5 border-2 w-full"
                      style={{
                        backgroundColor: isSelected ? option.bgSelected : option.bgIdle,
                        borderColor: isSelected ? option.border : 'transparent',
                        boxShadow: isSelected
                          ? `0 6px 20px ${option.bgSelected}bb`
                          : '0 1px 4px rgba(0,0,0,0.06)',
                      }}
                    >
                      {/* Character image — responsive */}
                      <div className={`
                        relative w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 transition-transform duration-300
                        ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
                      `}>
                        <img
                          src={imgSrc}
                          alt={option.label}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Label — responsive text */}
                      <span
                        className="text-[9px] sm:text-[10px] md:text-xs font-semibold leading-tight text-center transition-colors duration-300 w-full"
                        style={{ color: isSelected ? option.textSelected : '#64748b' }}
                      >
                        {option.label}
                      </span>

                      {/* Selected checkmark */}
                      {isSelected && (
                        <div
                          className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in"
                          style={{ backgroundColor: option.border }}
                        >
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            style={{ color: option.textSelected }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Helper text removed — labels above are sufficient */}
          </div>

          {/* Navigation Dots - Progress Indicator */}
          <div className="flex justify-center gap-1.5">
            {[...Array(Math.min(10, questions.length))].map((_, i) => {
              const dotQuestion = Math.floor((questionId - 1) / 10) * 10 + i + 1;
              const isActive = dotQuestion === questionId;
              const isAnswered = answers[dotQuestion] !== undefined;
              
              return (
                <div
                  key={i}
                  className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${isActive
                      ? 'bg-gradient-to-r from-sky-400 to-teal-400 w-8 shadow-lg'
                      : isAnswered
                      ? 'bg-teal-300 w-1.5'
                      : 'bg-navy-200 w-1.5'
                    }
                  `}
                />
              );
            })}
          </div>

          {/* Motivational Message — replaced by CelebrationSplash */}
        </div>
      </div>

      {/* Celebration Splash */}
      {showCelebration && (
        <CelebrationSplash
          count={answeredCount}
          total={questions.length}
          onDone={() => {
            setShowCelebration(false);
            // Navigate after celebration dismissed
            if (questionId < questions.length) {
              router.push(`/test/${questionId + 1}`);
            } else {
              router.push('/profile-complete');
            }
          }}
        />
      )}

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-gradient-to-br from-sky-500/90 to-teal-500/90 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
          <div className="glass rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-white/30 rounded-full" />
              <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Menganalisis Kepribadianmu...</h3>
            <p className="text-sm text-white/80">Tunggu sebentar, kami sedang memproses jawabanmu</p>
          </div>
        </div>
      )}
    </main>
  );
}
