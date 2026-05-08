"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Sparkles, ArrowRight, Heart } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.gender) {
      alert('Mohon isi nama dan gender');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate or get user ID
      let userId = localStorage.getItem('user-id');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('user-id', userId);
      }

      // Save basic user data to localStorage
      localStorage.setItem('user-data', JSON.stringify({
        name: formData.name,
        gender: formData.gender,
        onboardingComplete: true,
        createdAt: new Date().toISOString()
      }));

      console.log('✅ Basic user data saved');

      // Redirect to test
      router.push('/test');
    } catch (error) {
      console.error('Error saving user data:', error);
      // Continue anyway
      router.push('/test');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-teal-50 p-4 md:pb-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Floating Character Icons - Game Style */}
        <div className="flex justify-center gap-4 mb-8 animate-float">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center shadow-lg">
            <span className="text-3xl">🧠</span>
          </div>
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center shadow-lg" style={{ animationDelay: '0.2s' }}>
            <span className="text-3xl">✨</span>
          </div>
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center shadow-lg" style={{ animationDelay: '0.4s' }}>
            <span className="text-3xl">💫</span>
          </div>
        </div>

        {/* Card - Game Start Screen Style */}
        <div className="glass rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-100 to-teal-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-100 to-sky-100 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center mb-6 shadow-2xl animate-scale-in">
              <Heart className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-center text-navy-900 mb-3 font-primary">
              Welcome! 👋
            </h1>
            <p className="text-center text-navy-600 mb-8 leading-relaxed">
              Mari kenalan dulu sebelum memulai perjalanan menemukan kepribadianmu
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-navy-800 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-500" />
                  Nama Kamu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama kamu"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-navy-200 focus:border-sky-400 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md font-secondary"
                  required
                />
              </div>

              {/* Gender - Game Style Selection */}
              <div>
                <label className="block text-sm font-bold text-navy-800 mb-3">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'male', label: 'Pria', emoji: '👨', color: 'from-blue-400 to-blue-500' },
                    { value: 'female', label: 'Wanita', emoji: '👩', color: 'from-pink-400 to-pink-500' },
                    { value: 'other', label: 'Lainnya', emoji: '🌈', color: 'from-purple-400 to-purple-500' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: option.value })}
                      className={`group relative py-4 px-3 rounded-2xl font-semibold transition-all ${
                        formData.gender === option.value
                          ? `bg-gradient-to-br ${option.color} text-white shadow-xl scale-105`
                          : 'glass-dark text-navy-700 hover:scale-105 hover:shadow-lg'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <div className="text-xs">{option.label}</div>
                      
                      {/* Selected Indicator */}
                      {formData.gender === option.value && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg animate-scale-in">
                          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Why Box - Soft Info Card */}
              <div className="glass-card-sm p-5 bg-gradient-to-br from-sky-50 to-teal-50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-navy-700 leading-relaxed">
                    <strong className="text-navy-800 block mb-2">Kenapa perlu data ini?</strong>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-sky-500 mt-0.5">•</span>
                        <span>AI akan memanggil nama kamu (lebih personal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-500 mt-0.5">•</span>
                        <span>Analisis yang lebih spesifik untuk gender kamu</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button - Game Style CTA */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.gender}
                className="btn btn-primary w-full py-5 text-lg shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-2xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </div>
                ) : (
                  <>
                    Mulai Petualangan
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Privacy Note - Soft & Calm */}
        <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-xs text-navy-600">
            <span>🔒</span>
            <span>Data kamu aman dan tidak akan dibagikan ke pihak ketiga</span>
          </div>
        </div>
      </div>
    </main>
  );
}
