"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import TopNav from '@/components/TopNav';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [rows, setRows] = useState<string[][]>([]);
  
  // Test state for dynamic CTA
  const [testState, setTestState] = useState<'new' | 'resume' | 'completed'>('new');
  const [resumeQuestion, setResumeQuestion] = useState(1);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Use ref to avoid re-renders on every keystroke
  const inputRef = useRef<HTMLInputElement>(null);

  // All 16 MBTI types
  const allTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  // Shuffle function for random order
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Calculate number of columns to fill screen width
  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      // Calculate card width based on breakpoint
      let cardWidth = 160; // Mobile base (w-40)
      let gap = 12; // gap-3
      
      if (width >= 1280) {
        cardWidth = 288; // xl:w-72
        gap = 24; // lg:gap-6
      } else if (width >= 1024) {
        cardWidth = 256; // lg:w-64
        gap = 24; // lg:gap-6
      } else if (width >= 768) {
        cardWidth = 208; // md:w-52
        gap = 16; // md:gap-4
      } else if (width >= 640) {
        cardWidth = 176; // sm:w-44
        gap = 12; // gap-3
      }
      
      // Calculate columns needed to fill + overflow
      const columns = Math.ceil((width + gap) / (cardWidth + gap)) + 2; // +2 for overflow
      
      // Generate columns with random shuffled order
      const generatedRows = Array.from({ length: columns }, () => {
        const shuffled = shuffleArray(allTypes);
        return [...shuffled, ...shuffled, ...shuffled]; // Triple for smooth infinite loop
      });
      
      setRows(generatedRows);
    };
    
    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Detect test state from localStorage
    const savedResult = localStorage.getItem('mbti-result');
    const savedAnswers = localStorage.getItem('mbti-answers');
    
    if (savedResult) {
      try {
        const r = JSON.parse(savedResult);
        if (r.type) { setTestState('completed'); }
      } catch {}
    } else if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        const ids = Object.keys(parsed).map(Number);
        if (ids.length > 0) {
          setAnsweredCount(ids.length);
          // Find first unanswered
          let nextQ = 1;
          for (let i = 1; i <= 96; i++) {
            if (!parsed[i]) { nextQ = i; break; }
          }
          setResumeQuestion(nextQ);
          setTestState('resume');
        }
      } catch {}
    }
    
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'id-ID'; // Indonesian language
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (inputRef.current) {
            inputRef.current.value = transcript;
          }
          setChatInput(transcript);
          setIsRecording(false);
        };
        
        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };
        
        recognitionInstance.onend = () => {
          setIsRecording(false);
        };
        
        setRecognition(recognitionInstance);
      }
    }
  }, []);

  const handleStartGame = () => {
    // All states → go to /test first
    // /test handles: new user form, resume card, completed card with results button
    router.push('/test');
  };

  // CTA button config based on state
  const ctaConfig = {
    new:       { icon: '▶', label: 'MULAI TEST MBTI' },
    resume:    { icon: '⚡', label: `LANJUT SOAL ${resumeQuestion} — ${answeredCount}/96 TERJAWAB` },
    completed: { icon: '📊', label: 'REVIEW HASIL TESTMU' },
  }[testState];

  const handleChatSubmit = () => {
    const value = inputRef.current?.value || chatInput;
    if (!value.trim()) return;
    
    // Save the message to localStorage to be picked up by chat page
    localStorage.setItem('homepage-chat-message', value.trim());
    
    // Redirect to chat page
    router.push('/chat');
  };

  const handleChatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setChatInput(prompt);
    localStorage.setItem('homepage-chat-message', prompt);
    router.push('/chat');
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Voice recognition tidak didukung di browser ini. Silakan gunakan Chrome atau Edge.');
      return;
    }
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-frosted-50 via-white to-frosted-100">
      
      {/* 🎨 ANIMATED BACKGROUND - Separated layer for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'layout style paint', isolation: 'isolate' }}>
        {/* Overlay gradient - Spotlight effect (100% top, 30% center, 100% bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-white z-10 pointer-events-none" />
        
        {/* Scrolling columns container - Fixed width columns */}
        {rows.length > 0 && (
          <div className="flex gap-3 md:gap-4 lg:gap-6 h-full">
            {rows.map((row, colIndex) => (
              <div
                key={colIndex}
                className="flex-shrink-0 flex flex-col gap-3 md:gap-4 lg:gap-6 will-change-transform"
                style={{
                  animation: `scroll-${colIndex % 2 === 0 ? 'up' : 'down'} ${25 + colIndex * 2}s linear infinite`,
                  transform: 'translateZ(0)',
                }}
              >
                {row.map((type, cardIndex) => {
                  const isFirstCard = colIndex === 0 && cardIndex === 0;
                  return (
                    <div
                      key={`${colIndex}-${cardIndex}`}
                      className="w-40 h-60 sm:w-44 sm:h-66 md:w-52 md:h-78 lg:w-64 lg:h-96 xl:w-72 xl:h-[27rem] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-white flex-shrink-0 opacity-50 hover:opacity-80 transition-opacity"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <Image
                        src={`/img/card-portrait/${type}-card-portrait.avif`}
                        alt={type}
                        width={288}
                        height={432}
                        className="w-full h-full object-cover"
                        {...(isFirstCard ? { priority: true } : { loading: 'lazy' as const })}
                        quality={50}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🎯 MAIN CONTENT - Game Menu Layout */}
      <div className="relative z-20 min-h-screen flex flex-col pt-20">
        
        {/* 🎮 GAME NAVIGATION BAR - Top */}
        <TopNav />

        {/* 🎯 HERO CONTENT - Game Menu Style */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* 🎮 MAIN HEADLINE - Smaller, balanced */}
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight tracking-tight max-w-4xl mx-auto">
              <span className="text-frosted-900">Kenali dirimu, </span>
              <span className="bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">lebih dalam.</span>
            </h1>

            {/* 📝 DESCRIPTION - 4 lines with chat info */}
            <p className="font-body text-base md:text-lg text-frosted-900 max-w-3xl mx-auto leading-relaxed mb-6 font-normal">
              Selami kedalaman kepribadianmu dengan tes MBTI berbasis sains. 
              Temukan pola kognitifmu, pahami kekuatanmu, dan buka potensi dirimu. 
              Selesaikan tes terlebih dahulu, lalu diskusikan hasilmu dengan asisten psikologi AI kami.
            </p>

            {/* 💬 CHAT BOX - Smaller, no gap */}
            <div className="max-w-3xl mx-auto mb-12">
              {/* Chat Container with Animated Border */}
              <div className="relative group">
                {/* Animated Gradient Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-sm transition-opacity animate-gradient-xy"></div>
                
                {/* Chat Box */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(41,53,60,0.08)] p-4 hover:shadow-[0_12px_48px_rgba(41,53,60,0.12)] transition-all">
                  {/* Chat Input */}
                  <div className="flex items-center gap-3">
                    {/* Input Field - Uncontrolled for better performance */}
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Tanya apa saja tentang kepribadian..."
                      defaultValue={chatInput}
                      onKeyDown={handleChatKeyDown}
                      className="flex-1 bg-transparent text-frosted-700 placeholder-frosted-400 font-body text-sm md:text-base outline-none border-none focus:outline-none focus:ring-0 px-2"
                    />

                    {/* Right Icons */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleVoiceInput}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          isRecording 
                            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                            : 'bg-frosted-100/80 hover:bg-frosted-200'
                        }`}
                      >
                        <svg className={`w-4 h-4 ${isRecording ? 'text-white' : 'text-frosted-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                      <button 
                        onClick={handleChatSubmit}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Suggested Prompts */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleSuggestedPrompt('Apa tipe kepribadianku?')}
                      className="px-3 py-1.5 rounded-lg bg-frosted-50/80 hover:bg-frosted-100 border border-frosted-200/50 text-frosted-600 text-xs font-body transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Apa tipe kepribadianku?
                    </button>
                    <button 
                      onClick={() => handleSuggestedPrompt('Apa itu test inyourmbti?')}
                      className="px-3 py-1.5 rounded-lg bg-frosted-50/80 hover:bg-frosted-100 border border-frosted-200/50 text-frosted-600 text-xs font-body transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Apa itu test inyourmbti?
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider with "atau" text */}
            <div className="flex items-center gap-4 max-w-3xl mx-auto mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-frosted-300 to-transparent"></div>
              <span className="text-sm text-frosted-500 font-body">ayo saatnya</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-frosted-300 to-transparent"></div>
            </div>

            {/* 🎮 PRIMARY CTA - Dynamic based on test state */}
            <div className="mb-10 max-w-3xl mx-auto">
              <button
                onClick={handleStartGame}
                className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-teal-500 to-sky-500 text-white font-display font-bold text-xl md:text-2xl shadow-[0_12px_40px_rgba(24,183,183,0.3)] hover:shadow-[0_16px_56px_rgba(24,183,183,0.4)] transition-all hover:scale-[1.02] hover:-translate-y-1"
              >
                <span className="text-2xl">{ctaConfig.icon}</span>
                <span>{ctaConfig.label}</span>
                {testState === 'resume' && (
                  <span className="ml-2 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide border border-white/30">
                    IN PROGRESS
                  </span>
                )}
              </button>
              {/* Sub-text for resume/completed */}
              {testState === 'resume' && (
                <p className="text-center text-sm text-frosted-500 mt-2">
                  Progres tersimpan · {Math.round((answeredCount / 96) * 100)}% selesai
                </p>
              )}
              {testState === 'completed' && (
                <p className="text-center text-sm text-frosted-500 mt-2">
                  Tes sudah selesai · klik untuk lihat hasil lengkap
                </p>
              )}
            </div>

          </div>
        </div>

      </div>

    </main>
  );
}
