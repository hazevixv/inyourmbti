"use client";

import { Brain, Clock, Target, CheckCircle, Sparkles, Zap, User, Heart, RefreshCw, BarChart2, Activity } from 'lucide-react';
import { memo, useDeferredValue, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { questions } from '@/lib/questions';
import { useRouter } from 'next/navigation';
import TopNav from '@/components/TopNav';
import type { MBTIResult } from '@/lib/mbti-calculator';

// 3 user states
type UserState = 'new' | 'resume' | 'completed';
type UserFormData = { name: string; gender: string };

const ALL_TYPES = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP',
                   'ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];

const WelcomeCharacterPanel = memo(function WelcomeCharacterPanel({
  randomType,
  charSrc,
  genderLabel,
  mobile = false,
}: {
  randomType: string;
  charSrc: string;
  genderLabel: string;
  mobile?: boolean;
}) {
  if (mobile) {
    return (
      <div className="relative h-56 bg-gradient-to-b from-sky-200 via-sky-100 to-white overflow-hidden">
        <div className="absolute inset-0 -top-6">
          <Image src={charSrc} alt={`${randomType} ${genderLabel}`} fill
            className="object-cover object-top transition-opacity duration-500" quality={75} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 to-transparent" />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-black shadow-lg">
            <Brain className="w-3 h-3" />{randomType}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-shrink-0 w-72 bg-gradient-to-b from-sky-200 via-sky-100 to-white overflow-hidden">
      <div className="absolute inset-0 -top-8">
        <Image src={charSrc} alt={`${randomType} ${genderLabel}`} fill
          className="object-cover object-top transition-opacity duration-500" quality={75} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
      <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-black shadow-lg">
          <Brain className="w-3 h-3" />{randomType}
        </div>
        <p className="text-xs text-navy-500 font-medium">{genderLabel}</p>
      </div>
    </div>
  );
});

// ─── FORM MODAL — defined OUTSIDE component to prevent re-mount ───────────
function WelcomeFormModal({
  initialFormData,
  onDraftChange,
  onSubmit,
  onClose,
  isLoading,
  canClose,
}: {
  initialFormData: UserFormData;
  onDraftChange: (d: UserFormData) => void;
  onSubmit: (data: UserFormData) => void;
  onClose: () => void;
  isLoading: boolean;
  canClose: boolean;
}) {
  const [randomType, setRandomType] = useState(() =>
    ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)]
  );
  const [draftFormData, setDraftFormData] = useState<UserFormData>(initialFormData);
  const deferredName = useDeferredValue(draftFormData.name);
  const isNameInputFocusedRef = useRef(false);
  const isTypingRef = useRef(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rotate character every 3s
  useEffect(() => {
    const id = setInterval(() => {
      if (isNameInputFocusedRef.current || isTypingRef.current) return;
      setRandomType(ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setDraftFormData(initialFormData);
  }, [initialFormData]);

  const updateDraftFormData = (next: UserFormData) => {
    setDraftFormData(next);
    onDraftChange(next);
  };

  const pauseCharacterRotation = () => {
    isTypingRef.current = true;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
      typingTimeoutRef.current = null;
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftFormData.name || !draftFormData.gender) return;
    onSubmit(draftFormData);
  };

  const genderSuffix = draftFormData.gender === 'female' ? 'Female' : 'Male';
  const charSrc = `/img/png-character/${randomType}-${genderSuffix}.avif`;

  const genderOptions = [
    { value: 'male',   label: 'Pria',   emoji: '👨', gradient: 'from-blue-400 to-indigo-500', ring: 'ring-blue-400' },
    { value: 'female', label: 'Wanita', emoji: '👩', gradient: 'from-pink-400 to-rose-500',   ring: 'ring-pink-400' },
  ];

  const FormContent = () => (
    <form onSubmit={handleFormSubmit} className="space-y-5 flex-1 flex flex-col justify-center">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-navy-900 mb-1">
          {deferredName ? `Halo, ${deferredName}! 👋` : 'Welcome! 👋'}
        </h2>
        <p className="text-sm text-navy-500">
          Mari kenalan dulu sebelum memulai perjalananmu
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-navy-400 uppercase tracking-wider mb-2">
          <User className="w-3 h-3" /> Nama Kamu
          <span className="text-red-400 normal-case tracking-normal font-normal ml-1">wajib</span>
        </label>
        <input
          type="text"
          value={draftFormData.name}
          onChange={(e) => {
            pauseCharacterRotation();
            updateDraftFormData({ ...draftFormData, name: e.target.value });
          }}
          onFocus={() => {
            isNameInputFocusedRef.current = true;
          }}
          onBlur={() => {
            isNameInputFocusedRef.current = false;
          }}
          placeholder="Masukkan nama kamu..."
          className="w-full px-4 py-3.5 rounded-xl border-2 border-navy-100 focus:border-sky-400 focus:outline-none transition-all bg-navy-50/50 text-navy-900 font-semibold placeholder:font-normal placeholder:text-navy-400 text-sm"
          autoFocus
          required
        />
      </div>

      {/* Gender */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">
          Gender
          <span className="text-red-400 normal-case tracking-normal font-normal ml-1">wajib</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {genderOptions.map((opt) => {
            const selected = draftFormData.gender === opt.value;
            return (
              <button key={opt.value} type="button"
                onClick={() => updateDraftFormData({ ...draftFormData, gender: opt.value })}
                className={`relative flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  selected
                    ? `bg-gradient-to-br ${opt.gradient} text-white shadow-xl scale-[1.03] ring-2 ring-offset-2 ${opt.ring}`
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100 hover:scale-[1.02] border-2 border-transparent'
                }`}
              >
                <span className={`text-2xl transition-transform ${selected ? 'scale-110' : ''}`}>{opt.emoji}</span>
                <span>{opt.label}</span>
                {selected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 bg-gradient-to-r from-sky-50 to-teal-50 rounded-xl p-3.5 border border-sky-100">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <p className="text-xs text-navy-500 leading-relaxed">
          <span className="font-bold text-navy-800 block mb-0.5">Kenapa perlu data ini?</span>
          AI akan memanggil namamu & memberikan analisis yang lebih spesifik sesuai gendermu
        </p>
      </div>

      {/* CTA */}
      <button type="submit"
        disabled={!draftFormData.name || !draftFormData.gender || isLoading}
        className="w-full py-4 rounded-2xl font-black text-base text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500 flex items-center justify-center gap-2"
      >
        {isLoading
          ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
          : <><Sparkles className="w-4 h-4" /> Mulai Petualangan</>
        }
      </button>

      {canClose && (
        <button type="button" onClick={onClose}
          className="w-full text-center text-xs text-navy-400 hover:text-navy-600 transition-colors py-1">
          Lewati untuk sekarang
        </button>
      )}

      <p className="flex items-center justify-center gap-1.5 text-xs text-navy-400 pt-1">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Data tersimpan aman & tidak dibagikan ke pihak ketiga
      </p>
    </form>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-md" />

      {/* ── DESKTOP: 2-column ── */}
      <div className="relative hidden md:flex w-full max-w-3xl animate-scale-in rounded-[2rem] overflow-hidden shadow-2xl" style={{ minHeight: '540px' }}>
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 rounded-[2rem] opacity-50 blur-xl pointer-events-none" />

        {/* Left — Character panel */}
        <WelcomeCharacterPanel
          randomType={randomType}
          charSrc={charSrc}
          genderLabel={draftFormData.gender === 'female' ? '👩 Female' : '👨 Male'}
        />
        {false && (<div className="relative flex-shrink-0 w-72 bg-gradient-to-b from-sky-200 via-sky-100 to-white overflow-hidden">
          <div className="absolute inset-0 -top-8">
            <Image src={charSrc} alt={`${randomType} ${genderSuffix}`} fill
              className="object-cover object-top transition-opacity duration-500" quality={75} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-black shadow-lg">
              <Brain className="w-3 h-3" />{randomType}
            </div>
            <p className="text-xs text-navy-500 font-medium">
              {draftFormData.gender === 'female' ? '👩 Female' : '👨 Male'}
            </p>
          </div>
        </div>)}

        {/* Right — Form */}
        <div className="relative flex-1 bg-white/95 backdrop-blur-xl flex flex-col">
          <div className="h-1.5 bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400" />
          <div className="flex-1 px-8 py-8 flex flex-col">
            <FormContent />
          </div>
        </div>
      </div>

      {/* ── MOBILE: Character top + form bottom ── */}
      <div className="relative md:hidden w-full max-w-sm animate-scale-in rounded-[1.75rem] overflow-hidden shadow-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 rounded-[2rem] opacity-40 blur-lg pointer-events-none" />
        <div className="relative bg-white/95 backdrop-blur-xl">
          {/* Character banner */}
          <WelcomeCharacterPanel
            randomType={randomType}
            charSrc={charSrc}
            genderLabel={draftFormData.gender === 'female' ? '👩 Female' : '👨 Male'}
            mobile
          />
          {false && (<div className="relative h-56 bg-gradient-to-b from-sky-200 via-sky-100 to-white overflow-hidden">
            <div className="absolute inset-0 -top-6">
              <Image src={charSrc} alt={`${randomType} ${genderSuffix}`} fill
                className="object-cover object-top transition-opacity duration-500" quality={75} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 to-transparent" />
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-black shadow-lg">
                <Brain className="w-3 h-3" />{randomType}
              </div>
            </div>
          </div>)}
          {/* Form */}
          <div className="px-6 pt-4 pb-6 flex flex-col">
            <FormContent />
          </div>
        </div>
      </div>
    </div>
  );
}


export default function TestStartPage() {
  const router = useRouter();
  const [userState, setUserState] = useState<UserState>('new');
  const [lastQuestionId, setLastQuestionId] = useState(1);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({ name: '', gender: '' });
  const formDraftRef = useRef<UserFormData>({ name: '', gender: '' });
  const [completedResult, setCompletedResult] = useState<MBTIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load user data
    const saved = localStorage.getItem('user-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserData(parsed);
        formDraftRef.current = { name: parsed.name || '', gender: parsed.gender || '' };
      } catch {}
    }

    const savedResult = localStorage.getItem('mbti-result');
    const savedAnswers = localStorage.getItem('mbti-answers');

    // STATE 3: Completed
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult);
        if (result.type) {
          setCompletedResult(result);
          setUserState('completed');
          return;
        }
      } catch {}
    }

    // STATE 2: Resume
    if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        const answeredIds = Object.keys(parsed).map(Number).sort((a, b) => a - b);
        if (answeredIds.length > 0) {
          setAnsweredCount(answeredIds.length);
          // Find first unanswered
          let nextQ = 1;
          for (let i = 1; i <= questions.length; i++) {
            if (!parsed[i]) { nextQ = i; break; }
          }
          setLastQuestionId(nextQ);
          setUserState('resume');
          return;
        }
      } catch {}
    }

    // STATE 1: New user
    setUserState('new');
    // Auto-show form if no user data yet
    const savedUserData = localStorage.getItem('user-data');
    if (!savedUserData) {
      setShowForm(true);
    }
  }, []);

  const handleStartTest = () => {
    // User baru: belum ada nama/gender → tampilkan form dulu
    if (!userData.name || !userData.gender) {
      setShowForm(true);
      return;
    }
    // User resume: sudah ada data, lanjutkan test
    if (userState === 'resume') {
      router.push(`/test/${lastQuestionId}`);
      return;
    }
    // User baru tapi sudah isi form: mulai dari soal 1
    router.push('/test/1');
  };

  const handleSaveUserData = async (formData: UserFormData) => {
    if (!formData.name || !formData.gender) return;
    setIsLoading(true);

    try {
      let userId = localStorage.getItem('user-id');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('user-id', userId);
      }

      // Save to DB (non-blocking — don't wait for it)
      fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name: formData.name, gender: formData.gender })
      }).catch(err => console.warn('DB save failed:', err));

      // Always save to localStorage first
      const newUserData = {
        name: formData.name,
        gender: formData.gender,
        onboardingComplete: true,
        createdAt: new Date().toISOString()
      };
      formDraftRef.current = { name: formData.name, gender: formData.gender };
      localStorage.setItem('user-data', JSON.stringify(newUserData));
      setUserData(newUserData);  // ← update state immediately so card shows name/gender
      setShowForm(false);

      // Resume users should continue the test; brand-new welcome submissions stay on the test start screen.
      const destination = userState === 'resume' ? `/test/${lastQuestionId}` : '/test';
      router.push(destination);
    } catch {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetakeTest = () => {
    if (!confirm('Mulai tes baru? Hasil lama akan tetap tersimpan untuk perbandingan.')) return;
    // Keep old result as history, clear current
    const oldResult = localStorage.getItem('mbti-result');
    if (oldResult) {
      const history = JSON.parse(localStorage.getItem('mbti-history') || '[]');
      history.push({ ...JSON.parse(oldResult), savedAt: new Date().toISOString() });
      localStorage.setItem('mbti-history', JSON.stringify(history));
    }
    localStorage.removeItem('mbti-answers');
    localStorage.removeItem('mbti-result');
    localStorage.removeItem('mbti-test-date');
    setCompletedResult(null);
    setUserState('new');
    router.push('/test/1');
  };

  const handleClearProgress = () => {
    if (!confirm('Hapus progres dan mulai dari awal?')) return;
    localStorage.removeItem('mbti-answers');
    setAnsweredCount(0);
    setLastQuestionId(1);
    setUserState('new');
  };

  // ─── COMPLETED STATE CARD ─────────────────────────────────────────────────
  const CompletedCard = () => {
    // Use the user's actual MBTI type — no random rotation
    const mbtiType = completedResult?.type || 'INTJ';
    const genderSuffix = userData.gender === 'female' ? 'Female' : 'Male';
    const charSrc = `/img/png-character/${mbtiType}-${genderSuffix}.avif`;

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
        {/* Character area — flex-1 */}
        <div className="relative overflow-hidden flex-1" style={{ minHeight: '280px' }}>
          <Image src={charSrc} alt={mbtiType} fill
            className="object-cover object-top transition-opacity duration-700" quality={75} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-white/95" />
          <div className="absolute top-4 right-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-black shadow-lg backdrop-blur-sm">
              <Brain className="w-3 h-3" />{completedResult?.variant || mbtiType}
            </div>
          </div>
          {userData.gender && (
            <div className="absolute top-4 left-4">
              <div className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-semibold text-navy-700 shadow">
                {userData.gender === 'male' ? '👨 Pria' : '👩 Wanita'}
              </div>
            </div>
          )}
        </div>

        {/* Content — fixed at bottom */}
        <div className="px-7 pb-7 pt-4 flex flex-col gap-4 flex-shrink-0">
          {/* User greeting */}
          {userData.name && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-black">{userData.name[0].toUpperCase()}</span>
              </div>
              <div>
                <div className="font-bold text-navy-900">Halo, {userData.name}! 👋</div>
                <div className="text-xs text-navy-500">
                  {userData.gender === 'male' ? '👨 Pria' : '👩 Wanita'}
                </div>
              </div>
            </div>
          )}

          {completedResult && (
            <>
              {/* Type badge */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white shadow-lg mb-2">
                  <Brain className="w-4 h-4" />
                  <span className="text-xl font-black">{completedResult.variant}</span>
                </div>
                {typeof completedResult.confidence === 'number' && (
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold">
                      <Activity className="w-3.5 h-3.5" />
                      Confidence {completedResult.confidence}%
                    </span>
                  </div>
                )}
                <p className="text-xs text-navy-500 leading-relaxed">
                  {completedResult.description?.split(' - ')[1]?.split('.')[0] || 'Tipe kepribadianmu yang unik'}
                </p>
              </div>

              {/* Function scores */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Dominant', fn: completedResult.dominantFunction },
                  { label: 'Auxiliary', fn: completedResult.auxiliaryFunction },
                  { label: 'Tertiary', fn: completedResult.tertiaryFunction },
                  { label: 'Inferior', fn: completedResult.inferiorFunction },
                ].map((item) => {
                  const pct = completedResult.percentages?.[item.fn as keyof typeof completedResult.percentages];
                  return (
                    <div key={item.fn} className="bg-sky-50 rounded-xl p-2.5 text-center">
                      <div className="text-base font-black text-sky-600">{pct ?? '--'}%</div>
                      <div className="text-xs font-bold text-navy-800">{item.fn}</div>
                      <div className="text-[9px] text-navy-500">{item.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Your Strengths */}
              {completedResult.strengths && completedResult.strengths.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                    Your Strengths
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {completedResult.strengths.slice(0, 4).map((s, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-50 text-xs text-navy-700">
                        <div className="w-4 h-4 rounded-md bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Careers */}
              {completedResult.careers && completedResult.careers.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-2">
                    Recommended Careers
                  </h3>
                  <div className="grid grid-cols-3 gap-1.5">
                    {completedResult.careers.slice(0, 6).map((c, i) => (
                      <div key={i} className="px-2 py-2 rounded-xl bg-teal-50 text-center text-xs font-medium text-navy-700">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <button onClick={() => router.push(`/results/${completedResult.type}`)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
                <BarChart2 className="w-5 h-5" />
                Lihat Hasil Lengkap
              </button>

              {/* Share + Update row */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={async () => {
                    const shareData = {
                      title: `Saya ${completedResult.variant}!`,
                      text: `Hasil tes MBTI saya adalah ${completedResult.variant}!`,
                      url: `${window.location.origin}/results/${completedResult.type}`,
                    };
                    try {
                      if (navigator.share) {
                        await navigator.share(shareData);
                      } else {
                        await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
                        alert('Link berhasil disalin!');
                      }
                    } catch {}
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 border-navy-200 text-navy-700 font-bold hover:bg-gray-50 transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <button onClick={handleRetakeTest}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-navy-200 text-navy-700 font-bold hover:bg-gray-50 transition-all text-sm">
                  <RefreshCw className="w-4 h-4" />
                  Update Tes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // ─── RESUME STATE CARD ────────────────────────────────────────────────────
  const ResumeCard = () => {
    const [cardType, setCardType] = useState(() => ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)]);

    // Rotate landscape card every 3s
    useEffect(() => {
      const id = setInterval(() => {
        setCardType(ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)]);
      }, 3000);
      return () => clearInterval(id);
    }, []);

    const charSrc = userData.gender === 'female'
      ? `/img/png-character/${cardType}-Female.avif`
      : `/img/png-character/${cardType}-Male.avif`;

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
        {/* Character area — flex-1 fills remaining space */}
        <div className="relative overflow-hidden flex-1" style={{ minHeight: '320px' }}>
          <Image src={charSrc} alt={cardType} fill
            className="object-cover object-top transition-opacity duration-700" quality={75} />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-white/95" />
          {/* Type badge top-right */}
          <div className="absolute top-4 right-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-black shadow-lg backdrop-blur-sm">
              <Brain className="w-3 h-3" />{cardType}
            </div>
          </div>
          {/* Gender badge top-left */}
          <div className="absolute top-4 left-4">
            <div className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-semibold text-navy-700 shadow">
              {userData.gender === 'male' ? '👨 Pria' : '👩 Wanita'}
            </div>
          </div>
        </div>

        {/* Content below character — fixed height */}
        <div className="px-7 pb-7 pt-3 flex flex-col gap-4 flex-shrink-0">
          {/* User greeting */}
          {userData.name && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-black">{userData.name[0].toUpperCase()}</span>
              </div>
              <div>
                <div className="font-bold text-navy-900">Halo, {userData.name}! 👋</div>
                <div className="text-xs text-navy-500">Lanjutkan perjalananmu</div>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-black text-navy-900 mb-1">Lanjutkan Tesmu</h2>
            <p className="text-navy-500 text-sm">
              <span className="font-bold text-sky-500">{answeredCount}</span> dari <span className="font-bold">{questions.length}</span> soal terjawab
            </p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="relative h-2.5 bg-navy-100 rounded-full overflow-hidden mb-1">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full transition-all"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
            </div>
            <p className="text-xs text-navy-400">
              {Math.round((answeredCount / questions.length) * 100)}% selesai — tinggal {questions.length - answeredCount} soal lagi!
            </p>
          </div>

          <button onClick={handleStartTest}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
            <Sparkles className="w-5 h-5" />
            Lanjutkan dari Soal {lastQuestionId}
          </button>
          <button onClick={handleClearProgress}
            className="w-full text-center text-xs text-red-400 hover:text-red-600 py-1 transition-colors">
            Mulai dari awal
          </button>
        </div>
      </div>
    );
  };

  // ─── NEW USER CARD ────────────────────────────────────────────────────────
  const NewUserCard = () => {
    const [cardType, setCardType] = useState(() => ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)]);
    const hasUserData = !!(userData.name && userData.gender);

    // Rotate landscape card every 3s
    useEffect(() => {
      const id = setInterval(() => {
        setCardType(ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)]);
      }, 3000);
      return () => clearInterval(id);
    }, []);

    const charSrc = userData.gender === 'female'
      ? `/img/png-character/${cardType}-Female.avif`
      : `/img/png-character/${cardType}-Male.avif`;

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
        {/* Character area */}
        {hasUserData ? (
          <div className="relative overflow-hidden flex-1" style={{ minHeight: '320px' }}>
            <Image src={charSrc} alt={cardType} fill
              className="object-cover object-top transition-opacity duration-700" quality={75} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-white/95" />
            <div className="absolute top-4 right-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-black shadow-lg backdrop-blur-sm">
                <Brain className="w-3 h-3" />{cardType}
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <div className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-semibold text-navy-700 shadow">
                {userData.gender === 'male' ? '👨 Pria' : '👩 Wanita'}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden flex items-center justify-center flex-1" style={{ minHeight: '200px' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-teal-400 to-indigo-500" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
        )}

        {/* Content — fixed height at bottom */}
        <div className="px-7 pb-7 pt-4 flex flex-col gap-4 flex-shrink-0">
          {hasUserData && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-black">{userData.name[0].toUpperCase()}</span>
              </div>
              <div>
                <div className="font-bold text-navy-900">Halo, {userData.name}! 👋</div>
                <div className="text-xs text-navy-500">
                  {userData.gender === 'male' ? '👨 Pria' : '👩 Wanita'}
                </div>
              </div>
            </div>
          )}

          <div>
            <h1 className={`font-black text-navy-900 mb-1 ${hasUserData ? 'text-2xl' : 'text-3xl text-center'}`}>
              {hasUserData ? 'Siap Memulai?' : (
                <>Discover <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">Your Type</span></>
              )}
            </h1>
            <p className={`text-navy-500 text-sm leading-relaxed ${!hasUserData && 'text-center'}`}>
              {hasUserData
                ? 'Tes MBTI 96 soal berdasarkan teori fungsi kognitif Grant/Brownsword. Jawab dengan jujur!'
                : 'Tes kepribadian MBTI yang akurat berdasarkan teori fungsi kognitif Grant/Brownsword.'
              }
            </p>
          </div>

          <button onClick={handleStartTest}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
            <Sparkles className="w-5 h-5" />
            {hasUserData ? `Mulai Tes, ${userData.name}!` : 'Mulai Tes Sekarang'}
          </button>
          <p className="text-center text-xs text-navy-400">Progres tersimpan otomatis di perangkatmu</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <TopNav />
      
      {/* Welcome Form Modal — shown for new users automatically */}
      {showForm && (
        <WelcomeFormModal
          initialFormData={formDraftRef.current}
          onDraftChange={(next) => {
            formDraftRef.current = next;
          }}
          onSubmit={handleSaveUserData}
          onClose={() => setShowForm(false)}
          isLoading={isLoading}
          canClose={userState !== 'new' || !!userData.name}
        />
      )}

      {/* Mobile */}
      <main className="md:hidden min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-teal-50 pt-20 px-4 pb-6">
        {userState === 'completed' ? <CompletedCard /> :
         userState === 'resume' ? <ResumeCard /> :
         <NewUserCard />}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { icon: Target, value: '96', label: 'Questions', color: 'text-sky-500' },
            { icon: Clock, value: '~15', label: 'Minutes', color: 'text-teal-500' },
            { icon: CheckCircle, value: '100%', label: 'Accurate', color: 'text-navy-600' },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center shadow-sm">
              <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
              <div className="text-lg font-black text-navy-900">{value}</div>
              <div className="text-xs text-navy-600">{label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Desktop */}
      <main className="hidden md:block min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 p-8 pt-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 items-stretch">

            {/* Left - Dynamic state card — stretches to match right column */}
            <div className="col-span-5 flex flex-col self-stretch">
              <div className="flex-1 flex flex-col">
                {userState === 'completed' ? <CompletedCard /> :
                 userState === 'resume' ? <ResumeCard /> :
                 <NewUserCard />}
              </div>
            </div>

            {/* Right - Info & Stats */}
            <div className="col-span-7 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Target, value: '96', label: 'Questions', sub: 'Comprehensive test', color: 'from-sky-400 to-teal-400' },
                  { icon: Clock, value: '~15', label: 'Minutes', sub: 'Average time', color: 'from-teal-400 to-navy-500' },
                  { icon: CheckCircle, value: '100%', label: 'Accurate', sub: 'Cognitive functions', color: 'from-navy-500 to-beige-400' },
                ].map(({ icon: Icon, value, label, sub, color }) => (
                  <div key={label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
                    <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-black text-navy-900 mb-1">{value}</div>
                    <div className="text-sm text-navy-600">{label}</div>
                    <div className="text-xs text-navy-500 mt-1">{sub}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-navy-800 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-sky-500" />
                  Instruksi Tes
                </h2>
                <div className="space-y-4">
                  {[
                    { n: 1, title: 'Jawab dengan Jujur', desc: 'Jawab sesuai dirimu yang sebenarnya, bukan yang kamu inginkan' },
                    { n: 2, title: 'Tidak Ada Jawaban Salah', desc: 'Setiap jawaban valid. Pilih yang paling menggambarkan preferensimu' },
                    { n: 3, title: 'Lingkungan Tenang', desc: 'Kerjakan di tempat yang nyaman agar kamu bisa fokus dan reflektif' },
                    { n: 4, title: 'Auto-Save', desc: 'Progres otomatis tersimpan. Kamu bisa melanjutkan kapan saja' },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white text-lg flex items-center justify-center font-bold shadow-lg flex-shrink-0">{n}</div>
                      <div>
                        <div className="font-bold text-navy-800 mb-1">{title}</div>
                        <div className="text-sm text-navy-600">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-bold text-navy-800">Grant/Brownsword</div>
                  </div>
                  <p className="text-sm text-navy-600">Teori fungsi kognitif yang lebih akurat</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-navy-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-bold text-navy-800">AI Analysis</div>
                  </div>
                  <p className="text-sm text-navy-600">Analisis mendalam dengan Groq AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
