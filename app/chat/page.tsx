"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, Send, Sparkles, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { MBTIResult } from '@/lib/mbti-calculator';
import TopNav from '@/components/TopNav';
import { 
  loadMemory, 
  saveMemory, 
  initializeMemory, 
  updateMemory, 
  generateMemoryContext,
  summarizeHistory,
  type UserMemory 
} from '@/lib/chat-memory';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [userMemory, setUserMemory] = useState<UserMemory | null>(null);
  const [randomType, setRandomType] = useState('INTJ');
  const [userGender, setUserGender] = useState<string>('male'); // Default male
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // All 16 MBTI types for random rotation
  const allTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
  
  // Get gender suffix for character image
  const getGenderSuffix = () => {
    if (userGender === 'female') return 'Female';
    if (userGender === 'male') return 'Male';
    // Random for 'other' or undefined
    return Math.random() > 0.5 ? 'Male' : 'Female';
  };

  // Random character rotation effect (change every 3 seconds)
  useEffect(() => {
    if (!result) {
      const interval = setInterval(() => {
        setRandomType(allTypes[Math.floor(Math.random() * allTypes.length)]);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [result, allTypes]);

  useEffect(() => {
    setMounted(true);
    
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
          setInput(transcript);
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
    
    // Load result from localStorage
    const saved = localStorage.getItem('mbti-result');
    const homepageMessage = localStorage.getItem('homepage-chat-message');
    const savedChatHistory = localStorage.getItem('chat-history');
    
    // Load user data to get gender
    const userData = localStorage.getItem('user-data');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed.gender) {
          setUserGender(parsed.gender);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
    
    // Load or initialize memory
    let memory = loadMemory();
    
    if (saved) {
      const parsed: MBTIResult = JSON.parse(saved);
      setResult(parsed);
      
      // Initialize memory if not exists
      if (!memory) {
        memory = initializeMemory(parsed.variant, parsed.percentages as unknown as Record<string, number>);
        saveMemory(memory);
      } else {
        // Update memory with latest MBTI data
        memory.mbtiType = parsed.variant;
        memory.functionScores = parsed.percentages as unknown as Record<string, number>;
        memory.dominantFunction = Object.entries(parsed.percentages)
          .sort((a, b) => b[1] - a[1])[0]?.[0];
        saveMemory(memory);
      }
      setUserMemory(memory);
      
      // Check if there's saved chat history
      if (savedChatHistory) {
        try {
          const parsedHistory: Message[] = JSON.parse(savedChatHistory);
          setMessages(parsedHistory);
          
          // If there's a new message from homepage, add it
          if (homepageMessage) {
            localStorage.removeItem('homepage-chat-message');
            const newMessages: Message[] = [...parsedHistory, { role: 'user', content: homepageMessage }];
            setMessages(newMessages);
            handleMessageFromHomepage(homepageMessage, parsed, newMessages, memory);
          }
        } catch (error) {
          console.error('Error parsing chat history:', error);
          // If error, start fresh with welcome message
          const welcomeMsg = [{
            role: 'assistant' as const,
            content: `Halo! Saya AI psychologist yang siap membantu kamu memahami kepribadian ${parsed.variant} mu lebih dalam. Apa yang ingin kamu tanyakan tentang kepribadianmu?`,
          }];
          setMessages(welcomeMsg);
          
          if (homepageMessage) {
            localStorage.removeItem('homepage-chat-message');
            const newMessages: Message[] = [...welcomeMsg, { role: 'user', content: homepageMessage }];
            setMessages(newMessages);
            handleMessageFromHomepage(homepageMessage, parsed, newMessages, memory);
          }
        }
      } else {
        // No saved history, check if there's a message from homepage
        if (homepageMessage) {
          const welcomeMsg = [{
            role: 'assistant' as const,
            content: `Halo! Saya AI psychologist yang siap membantu kamu memahami kepribadian ${parsed.variant} mu lebih dalam. Apa yang ingin kamu tanyakan tentang kepribadianmu?`,
          }];
          setMessages(welcomeMsg);
          
          localStorage.removeItem('homepage-chat-message');
          const newMessages: Message[] = [...welcomeMsg, { role: 'user', content: homepageMessage }];
          setMessages(newMessages);
          handleMessageFromHomepage(homepageMessage, parsed, newMessages, memory);
        } else {
          // Add welcome message only
          setMessages([{
            role: 'assistant',
            content: `Halo! Saya AI psychologist yang siap membantu kamu memahami kepribadian ${parsed.variant} mu lebih dalam. Apa yang ingin kamu tanyakan tentang kepribadianmu?`,
          }]);
        }
      }
    } else {
      // No test result yet - initialize memory for pre-test
      if (!memory) {
        memory = initializeMemory();
        saveMemory(memory);
      }
      setUserMemory(memory);
      
      // Check saved chat history for pre-test
      if (savedChatHistory) {
        try {
          const parsedHistory: Message[] = JSON.parse(savedChatHistory);
          setMessages(parsedHistory);
          
          // If there's a new message from homepage, add it
          if (homepageMessage) {
            localStorage.removeItem('homepage-chat-message');
            const newMessages: Message[] = [...parsedHistory, { role: 'user', content: homepageMessage }];
            setMessages(newMessages);
            handlePreTestMessage(homepageMessage, newMessages, memory);
          }
        } catch (error) {
          console.error('Error parsing chat history:', error);
          // Start fresh
          const welcomeMsg = [{
            role: 'assistant' as const,
            content: `Halo! Saya AI psychologist. Saya siap menjawab pertanyaanmu tentang kepribadian dan MBTI. Apa yang ingin kamu tanyakan?`,
          }];
          setMessages(welcomeMsg);
          
          if (homepageMessage) {
            localStorage.removeItem('homepage-chat-message');
            const newMessages: Message[] = [...welcomeMsg, { role: 'user', content: homepageMessage }];
            setMessages(newMessages);
            handlePreTestMessage(homepageMessage, newMessages, memory);
          }
        }
      } else {
        // No saved history, check if there's a message from homepage
        if (homepageMessage) {
          const welcomeMsg = [{
            role: 'assistant' as const,
            content: `Halo! Saya AI psychologist. Saya siap menjawab pertanyaanmu tentang kepribadian dan MBTI. Apa yang ingin kamu tanyakan?`,
          }];
          setMessages(welcomeMsg);
          
          localStorage.removeItem('homepage-chat-message');
          const newMessages: Message[] = [...welcomeMsg, { role: 'user', content: homepageMessage }];
          setMessages(newMessages);
          handlePreTestMessage(homepageMessage, newMessages, memory);
        } else {
          // No message from homepage, show welcome for pre-test
          setMessages([{
            role: 'assistant',
            content: `Halo! Saya AI psychologist. Saya siap menjawab pertanyaanmu tentang kepribadian dan MBTI. Untuk diskusi yang lebih mendalam dan personal, saya sarankan kamu menyelesaikan tes MBTI terlebih dahulu. Apa yang ingin kamu tanyakan?`,
          }]);
        }
      }
    }
  }, [router]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Save chat history to localStorage (only if there are messages)
    if (messages.length > 0) {
      try {
        localStorage.setItem('chat-history', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    }
  }, [messages]);

  const handleMessageFromHomepage = async (userMessage: string, mbtiResult: MBTIResult, currentMessages: Message[], memory: UserMemory) => {
    setIsLoading(true);
    
    try {
      // Generate memory context
      const memoryContext = generateMemoryContext(memory);
      
      // Summarize history for token efficiency
      const summarizedHistory = summarizeHistory(currentMessages.slice(0, -1), 6);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          mbtiType: mbtiResult.variant,
          functionScores: mbtiResult.percentages,
          conversationHistory: summarizedHistory,
          memoryContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan respons');
      }

      const data = await response.json();
      const newMessages = [...currentMessages, { role: 'assistant' as const, content: data.reply }];
      setMessages(newMessages);
      
      // Update memory with conversation
      const updatedMemory = updateMemory(memory, userMessage, data.reply);
      setUserMemory(updatedMemory);
      saveMemory(updatedMemory);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...currentMessages, { 
        role: 'assistant', 
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreTestMessage = async (userMessage: string, currentMessages: Message[], memory: UserMemory) => {
    setIsLoading(true);
    
    try {
      // Generate memory context (even for pre-test)
      const memoryContext = generateMemoryContext(memory);
      
      // Summarize history for token efficiency
      const summarizedHistory = summarizeHistory(currentMessages.slice(0, -1), 6);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage + '\n\n[SYSTEM: User belum melakukan tes MBTI. Jawab pertanyaan dengan informatif dan di akhir selalu arahkan user untuk melakukan tes MBTI agar bisa berdiskusi lebih mendalam tentang kepribadian mereka secara personal.]',
          mbtiType: 'GENERAL',
          functionScores: {},
          conversationHistory: summarizedHistory,
          memoryContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan respons');
      }

      const data = await response.json();
      
      // Add encouragement to take the test
      const replyWithEncouragement = data.reply + '\n\n💡 **Ingin tahu lebih dalam tentang kepribadianmu?** Yuk mulai tes MBTI sekarang! Setelah tes, kita bisa diskusi lebih personal tentang kekuatan, kelemahan, karir yang cocok, dan cara mengembangkan dirimu. 🚀';
      
      const newMessages = [...currentMessages, { role: 'assistant' as const, content: replyWithEncouragement }];
      setMessages(newMessages);
      
      // Update memory with conversation
      const updatedMemory = updateMemory(memory, userMessage, data.reply);
      setUserMemory(updatedMemory);
      saveMemory(updatedMemory);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...currentMessages, { 
        role: 'assistant', 
        content: 'Maaf, terjadi kesalahan. Untuk pengalaman terbaik, saya sarankan kamu menyelesaikan tes MBTI terlebih dahulu agar kita bisa berdiskusi lebih mendalam tentang kepribadianmu. Silakan coba lagi atau mulai tes sekarang!' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    // Check if user has completed test
    if (!result) {
      // Pre-test chat
      if (userMemory) {
        handlePreTestMessage(userMessage, newMessages, userMemory);
      }
      return;
    }

    try {
      // Generate memory context
      const memoryContext = userMemory ? generateMemoryContext(userMemory) : undefined;
      
      // Summarize history for token efficiency (keep last 6 messages)
      const summarizedHistory = summarizeHistory(messages, 6);
      
      // Call API with test results and memory
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          mbtiType: result.variant,
          functionScores: result.percentages,
          conversationHistory: summarizedHistory,
          memoryContext,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Gagal mendapatkan respons');
      }

      const data = await response.json();
      
      // Add assistant message
      const finalMessages = [...newMessages, { role: 'assistant' as const, content: data.reply }];
      setMessages(finalMessages);
      
      // Update memory with conversation
      if (userMemory) {
        const updatedMemory = updateMemory(userMemory, userMessage, data.reply);
        setUserMemory(updatedMemory);
        saveMemory(updatedMemory);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Handle suggested topic click
  const handleTopicClick = (topic: string) => {
    let question = '';
    const typeStr = result?.variant || 'kepribadian saya';
    
    switch(topic) {
      case 'strength':
        question = `Apa kekuatan saya sebagai ${typeStr}?`;
        break;
      case 'development':
        question = `Apa area pengembangan saya sebagai ${typeStr}?`;
        break;
      case 'career':
        question = `Karir apa yang cocok untuk ${typeStr} seperti saya?`;
        break;
      case 'relationship':
        question = `Bagaimana cara ${typeStr} berkomunikasi dalam hubungan?`;
        break;
    }
    
    setInput(question);
    inputRef.current?.focus();
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
    <>
      {/* Navigation */}
      <TopNav />

      {/* Mobile View - PWA App Style */}
      <main className="md:hidden min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-teal-50 pt-[68px]">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-navy-200/20 sticky top-0 z-10 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-navy-800 text-sm">AI Psychologist</div>
                <div className="text-xs text-navy-600">Analisis Mendalam & Personal</div>
              </div>
            </div>
            {result ? (
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white text-xs font-bold shadow-lg">
                {result.variant}
              </div>
            ) : (
              <button
                onClick={() => router.push('/test')}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Mulai Tes
              </button>
            )}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in-up`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-sky-400 to-teal-400 text-white shadow-lg'
                    : 'glass text-navy-800'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    <span className="text-xs font-medium text-navy-600">AI Psychologist</span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1">
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          
            {isLoading && (
              <div className="flex justify-start animate-slide-in-up">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-navy-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white/80 backdrop-blur-xl border-t border-navy-200/20 sticky bottom-20 px-4 py-4">
          <div className="flex gap-2">
            <button
              onClick={handleVoiceInput}
              disabled={isLoading}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-navy-100 hover:bg-navy-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-navy-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanyakan tentang kepribadianmu..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-full bg-white border border-navy-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-navy-800 placeholder-navy-400 shadow-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95 transition-transform"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Desktop View - Dashboard Style */}
      <main className="hidden md:block bg-gradient-to-br from-sky-50 via-white to-teal-50 p-8 pt-28" style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto" style={{ height: 'calc(100vh - 8rem)' }}>
          <div className="grid grid-cols-12 gap-6 h-full">
            
            {/* Left - Character Card + Suggested Topics */}
            <div className="col-span-3 flex flex-col gap-4 h-full">

              {/* Main Card — full height flex, sejajar dengan chatbox */}
              <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg flex flex-col overflow-hidden" style={{ minHeight: 0 }}>

                {/* TOP: AI Info — always visible, never covered */}
                <div className="px-5 pt-5 pb-3 flex-shrink-0 z-10 relative bg-white/80">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    <span className="font-bold text-navy-800 text-sm">AI Psychologist</span>
                  </div>
                  <p className="text-xs text-navy-500">Analisis Mendalam & Personal</p>
                </div>

                {/* MIDDLE: Character — flex-1, fills remaining space */}
                <div className="flex-1 relative overflow-hidden mx-3">
                  {/* Colored background for character area */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50" />
                  
                  {/* Character image — positioned to overflow TOP of this container */}
                  <div className="absolute inset-0 -top-6">
                    {result ? (
                      <Image
                        src={`/img/png-character/${result.type}-${getGenderSuffix()}.avif`}
                        alt={`${result.variant} ${getGenderSuffix()}`}
                        fill
                        className="object-cover object-top"
                        quality={75}
                      />
                    ) : (
                      <Image
                        src={`/img/png-character/${randomType}-${getGenderSuffix()}.avif`}
                        alt={`${randomType} ${getGenderSuffix()}`}
                        fill
                        className="object-cover object-top transition-opacity duration-500"
                        quality={75}
                      />
                    )}
                  </div>

                  {/* Bottom fade into white */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-10" />
                </div>

                {/* BOTTOM: Badge info */}
                <div className="px-5 pb-5 pt-3 text-center flex-shrink-0">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white shadow-md mb-1.5">
                    <Brain className="w-3.5 h-3.5" />
                    <span className="text-base font-black">{result?.variant || randomType}</span>
                  </div>
                  <div className="text-sm text-navy-600 font-semibold">
                    {result ? 'Your Personality' : 'Discover Your Type'}
                  </div>
                  <div className="text-xs text-navy-400 mt-0.5">
                    {userGender === 'male' ? '👨 Male' :
                     userGender === 'female' ? '👩 Female' :
                     '🌈 Character'}
                  </div>
                  {!result && (
                    <button
                      onClick={() => router.push('/test')}
                      className="mt-3 w-full px-4 py-2.5 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      🎯 Mulai Tes Sekarang
                    </button>
                  )}
                </div>
              </div>

              {/* Suggested Topics */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex-shrink-0">
                <h3 className="font-bold text-navy-800 mb-3 text-sm">Suggested Topics</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleTopicClick('strength')}
                    className="w-full text-left px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-xs text-navy-700 transition-colors"
                  >
                    💪 Kekuatan saya
                  </button>
                  <button
                    onClick={() => handleTopicClick('development')}
                    className="w-full text-left px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-xs text-navy-700 transition-colors"
                  >
                    🎯 Area pengembangan
                  </button>
                  <button
                    onClick={() => handleTopicClick('career')}
                    className="w-full text-left px-3 py-2 rounded-lg bg-navy-50 hover:bg-navy-100 text-xs text-navy-700 transition-colors"
                  >
                    💼 Karir yang cocok
                  </button>
                  <button
                    onClick={() => handleTopicClick('relationship')}
                    className="w-full text-left px-3 py-2 rounded-lg bg-beige-50 hover:bg-beige-100 text-xs text-navy-700 transition-colors"
                  >
                    ❤️ Hubungan & komunikasi
                  </button>
                </div>
              </div>
            </div>

            {/* Center - Chat Messages — scroll ONLY inside messages div */}
            <div className="col-span-9 flex flex-col bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl" style={{ minHeight: 0, overflow: 'hidden' }}>
              {/* Header */}
              <div className="border-b border-navy-200/20 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-sky-500" />
                    <span className="font-bold text-navy-800">Chat Session</span>
                  </div>
                  {result ? (
                    <div className="text-sm text-navy-600">
                      Type: <span className="font-bold text-sky-500">{result.variant}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => router.push('/test')}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      Mulai Tes MBTI
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in-up`}
                    >
                      <div
                        className={`max-w-[75%] p-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-sky-400 to-teal-400 text-white shadow-lg'
                            : 'bg-navy-50 text-navy-800'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-sky-500" />
                            <span className="text-xs font-medium text-navy-600">AI Psychologist</span>
                          </div>
                        )}
                        <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1">
                          <ReactMarkdown>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start animate-slide-in-up">
                      <div className="bg-navy-50 p-4 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-navy-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-navy-200/20 px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={handleVoiceInput}
                    disabled={isLoading}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-navy-100 hover:bg-navy-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <svg className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-navy-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tanyakan tentang kepribadianmu..."
                    disabled={isLoading}
                    className="flex-1 px-5 py-3 rounded-full bg-navy-50 border border-navy-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-navy-800 placeholder-navy-400"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-navy-500 text-center mt-3">
                  Tips: Tanyakan tentang kekuatan, kelemahan, karir, atau hubunganmu
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
