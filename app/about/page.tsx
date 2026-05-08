"use client";

import Link from 'next/link';
import { Brain, Sparkles, Target, Shield, Zap, Heart, Users, TrendingUp, Award, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';
import TopNav from '@/components/TopNav';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 md:pb-8 pt-20">
      <TopNav />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center mb-6 shadow-2xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-navy-900 mb-4">
            Tentang <span className="bg-gradient-to-r from-teal-500 to-sky-500 bg-clip-text text-transparent">inyourmbti</span>
          </h1>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto leading-relaxed">
            Platform tes kepribadian MBTI paling akurat di Indonesia dengan pendekatan sains kognitif dan AI
          </p>
        </div>

        {/* What is inyourmbti */}
        <section className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-navy-900 mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-teal-500" />
              Apa itu inyourmbti?
            </h2>
            <div className="space-y-4 text-navy-700 leading-relaxed">
              <p className="text-lg">
                <strong className="text-navy-900">inyourmbti</strong> adalah platform tes kepribadian MBTI (Myers-Briggs Type Indicator) berbasis web yang menggunakan pendekatan ilmiah melalui <strong>teori fungsi kognitif Grant/Brownsword</strong>. Kami tidak hanya memberikan hasil tipe kepribadian 4 huruf (seperti INTJ, ENFP, dll), tetapi juga analisis mendalam tentang bagaimana kamu memproses informasi, membuat keputusan, dan berinteraksi dengan dunia.
              </p>
              <p>
                Berbeda dengan tes MBTI konvensional yang hanya mengukur preferensi E/I, S/N, T/F, J/P secara terpisah, inyourmbti menggunakan <strong>96 pertanyaan yang dirancang khusus</strong> untuk mengukur kekuatan 8 fungsi kognitif (Ni, Ne, Si, Se, Ti, Te, Fi, Fe) yang membentuk kepribadianmu. Pendekatan ini memberikan hasil yang jauh lebih akurat dan personal.
              </p>
            </div>
          </div>
        </section>

        {/* Why inyourmbti is Different */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
            Kenapa inyourmbti Berbeda?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Akurasi Tinggi</h3>
              <p className="text-navy-700 leading-relaxed">
                Menggunakan teori fungsi kognitif Grant/Brownsword yang lebih akurat daripada metode dikotomi tradisional. Setiap pertanyaan dirancang untuk mengukur fungsi kognitif spesifik dengan presisi tinggi.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">AI-Powered Analysis</h3>
              <p className="text-navy-700 leading-relaxed">
                Setelah tes, kamu bisa chat dengan AI Psychologist kami (powered by Groq AI) untuk mendapatkan insights personal, tips pengembangan diri, dan menjawab pertanyaan spesifik tentang tipe kepribadianmu.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Konten Edukatif Lengkap</h3>
              <p className="text-navy-700 leading-relaxed">
                Lebih dari 88,000+ kata konten edukatif tentang 16 tipe kepribadian, 8 fungsi kognitif, compatibility analysis, career paths, dan relationship insights. Setiap tipe memiliki panduan 5,500+ kata.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Privacy First</h3>
              <p className="text-navy-700 leading-relaxed">
                Data tesmu tersimpan lokal di perangkatmu dan di database kami yang aman. Tidak ada tracking pihak ketiga, tidak ada iklan, dan tidak ada penjualan data. Privasi dan keamanan datamu adalah prioritas utama.
              </p>
            </div>

          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-sky-500" />
              Bagaimana inyourmbti Bekerja?
            </h2>
            <div className="space-y-6">
              
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white text-xl font-black flex items-center justify-center flex-shrink-0 shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Tes Kepribadian (96 Pertanyaan)</h3>
                  <p className="text-navy-700 leading-relaxed">
                    Kamu akan menjawab 96 pertanyaan yang dirancang untuk mengukur kekuatan 8 fungsi kognitif: <strong>Ni, Ne, Si, Se, Ti, Te, Fi, Fe</strong>. Setiap pertanyaan memiliki skala 1-5 (Sangat Tidak Setuju hingga Sangat Setuju). Waktu pengerjaan rata-rata 15 menit.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white text-xl font-black flex items-center justify-center flex-shrink-0 shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Kalkulasi Function Stack</h3>
                  <p className="text-navy-700 leading-relaxed">
                    Sistem kami menghitung skor setiap fungsi kognitif dan menentukan <strong>function stack</strong> kamu (Dominant, Auxiliary, Tertiary, Inferior). Ini adalah urutan fungsi yang paling kamu gunakan dalam kehidupan sehari-hari.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white text-xl font-black flex items-center justify-center flex-shrink-0 shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Hasil Tipe MBTI + Variant</h3>
                  <p className="text-navy-700 leading-relaxed">
                    Kamu mendapatkan tipe MBTI 4 huruf (contoh: INTJ) plus variant A (Assertive) atau T (Turbulent) yang menunjukkan tingkat confidence dan stress management kamu. Contoh: <strong>INTJ-A</strong> atau <strong>ENFP-T</strong>.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white text-xl font-black flex items-center justify-center flex-shrink-0 shadow-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Analisis Komprehensif</h3>
                  <p className="text-navy-700 leading-relaxed">
                    Halaman hasil menampilkan: personality dimensions, cognitive function stack, strengths & weaknesses, career paths, relationship insights, communication style, growth areas, dan integrasi dengan Enneagram & Love Languages.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white text-xl font-black flex items-center justify-center flex-shrink-0 shadow-lg">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Chat dengan AI Psychologist</h3>
                  <p className="text-navy-700 leading-relaxed">
                    Setelah tes, kamu bisa chat dengan AI untuk bertanya apapun tentang tipe kepribadianmu, mendapatkan tips personal growth, career advice, relationship guidance, dan memahami cognitive functions lebih dalam.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
            Apa yang Kamu Dapatkan?
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Tipe MBTI + Variant</strong>
                  <p className="text-navy-700 text-sm">Contoh: INTJ-A, ENFP-T</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Function Stack Analysis</strong>
                  <p className="text-navy-700 text-sm">Dominant, Auxiliary, Tertiary, Inferior</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Personality Dimensions</strong>
                  <p className="text-navy-700 text-sm">E/I, N/S, T/F, J/P percentages</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Strengths & Weaknesses</strong>
                  <p className="text-navy-700 text-sm">Kekuatan dan area pengembangan</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Career Recommendations</strong>
                  <p className="text-navy-700 text-sm">Jalur karir yang cocok</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Relationship Insights</strong>
                  <p className="text-navy-700 text-sm">Compatibility dengan tipe lain</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Communication Style</strong>
                  <p className="text-navy-700 text-sm">Cara berkomunikasi efektif</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Growth Strategies</strong>
                  <p className="text-navy-700 text-sm">Tips pengembangan diri</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Enneagram Integration</strong>
                  <p className="text-navy-700 text-sm">Likely Enneagram types</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Love Language</strong>
                  <p className="text-navy-700 text-sm">Primary & secondary love language</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">AI Chat Support</strong>
                  <p className="text-navy-700 text-sm">Unlimited chat dengan AI Psychologist</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-navy-900">Educational Content</strong>
                  <p className="text-navy-700 text-sm">88,000+ kata konten edukatif</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* The Science Behind */}
        <section className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-navy-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              Sains di Balik inyourmbti
            </h2>
            <div className="space-y-4 text-navy-700 leading-relaxed">
              <p>
                <strong className="text-navy-900">Teori Fungsi Kognitif Grant/Brownsword</strong> adalah pendekatan yang lebih akurat dalam memahami MBTI. Berbeda dengan metode dikotomi tradisional yang hanya mengukur preferensi E/I, S/N, T/F, J/P secara terpisah, teori ini fokus pada <strong>8 fungsi kognitif</strong> yang bekerja dalam urutan hierarkis (function stack).
              </p>
              <p>
                Setiap tipe MBTI memiliki 4 fungsi utama dalam urutan: <strong>Dominant → Auxiliary → Tertiary → Inferior</strong>. Contoh untuk INTJ:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Dominant: Ni (Introverted Intuition)</strong> - Melihat pola dan kemungkinan masa depan</li>
                <li><strong>Auxiliary: Te (Extraverted Thinking)</strong> - Mengorganisir dan mengeksekusi rencana</li>
                <li><strong>Tertiary: Fi (Introverted Feeling)</strong> - Nilai personal dan autentisitas</li>
                <li><strong>Inferior: Se (Extraverted Sensing)</strong> - Kesadaran terhadap lingkungan fisik</li>
              </ul>
              <p>
                Dengan memahami function stack, kamu tidak hanya tahu "tipe" kamu, tetapi juga <strong>bagaimana kamu berpikir, membuat keputusan, dan berinteraksi dengan dunia</strong>. Ini memberikan insights yang jauh lebih dalam untuk personal growth, career development, dan relationship building.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-6 text-center flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              Misi Kami
            </h2>
            <p className="text-lg text-navy-700 leading-relaxed text-center max-w-3xl mx-auto">
              Misi kami adalah <strong>membantu setiap orang memahami diri mereka lebih dalam</strong> melalui sains kepribadian yang akurat dan accessible. Kami percaya bahwa dengan memahami cognitive functions dan personality type, seseorang bisa:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">Berkembang Lebih Baik</h3>
                <p className="text-sm text-navy-600">Memahami strengths dan growth areas untuk pengembangan diri optimal</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">Hubungan Lebih Harmonis</h3>
                <p className="text-sm text-navy-600">Memahami perbedaan personality untuk komunikasi dan relationship yang lebih baik</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">Karir Lebih Sukses</h3>
                <p className="text-sm text-navy-600">Menemukan jalur karir yang align dengan natural strengths dan preferences</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/test"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Brain className="w-6 h-6" />
            Mulai Tes Sekarang
          </Link>
          <p className="text-sm text-navy-600 mt-4">
            Gratis • 15 menit • Hasil langsung
          </p>
        </div>

      </div>
    </main>
  );
}
