"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Heart, Phone, Mail, Briefcase, Star, Calendar, Brain, HelpCircle, X } from 'lucide-react';
import TopNav from '@/components/TopNav';

// ── Tooltip/Modal component ────────────────────────────────────────────────
function InfoModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-navy-900 text-lg">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center hover:bg-navy-200 transition-colors">
            <X className="w-4 h-4 text-navy-600" />
          </button>
        </div>
        <div className="text-sm text-navy-700 leading-relaxed space-y-3">{children}</div>
      </div>
    </div>
  );
}

const MBTI_TYPES = ['unsure','INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
const ENNEAGRAM_TYPES = ['unsure','1w9','1w2','2w1','2w3','3w2','3w4','4w3','4w5','5w4','5w6','6w5','6w7','7w6','7w8','8w7','8w9','9w8','9w1'];
const CF_FAMILIARITY = [
  { value: 'none', label: 'Tidak tahu sama sekali' },
  { value: 'some', label: 'Tahu sedikit' },
  { value: 'lot', label: 'Cukup paham' },
  { value: 'expert', label: 'Sangat paham / Expert' },
];

export default function ProfileCompletePage() {
  const router = useRouter();
  const [mbtiResult, setMbtiResult] = useState<any>(null);
  const [basicData, setBasicData] = useState({ name: '', gender: '' });
  const [formData, setFormData] = useState({
    age: '',
    phone: '',
    email: '',
    occupation: '',
    interests: '',
    selfMbtiType: '',
    enneagramType: '',
    cognitiveFunctionsFamiliarity: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeModal, setActiveModal] = useState<'mbti' | 'enneagram' | 'cf' | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mbti-result');
    if (!saved) { router.push('/test'); return; }
    setMbtiResult(JSON.parse(saved));

    const userData = localStorage.getItem('user-data');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setBasicData({ name: parsed.name || '', gender: parsed.gender || '' });
        setFormData(prev => ({
          ...prev,
          age: parsed.age ? String(parsed.age) : '',
          phone: parsed.phone || '',
          email: parsed.email || '',
          occupation: parsed.occupation || '',
          interests: parsed.interests || '',
          selfMbtiType: parsed.selfMbtiType || '',
          enneagramType: parsed.enneagramType || '',
          cognitiveFunctionsFamiliarity: parsed.cognitiveFunctionsFamiliarity || '',
        }));
      } catch {}
    }
  }, [router]);

  const saveAll = async (data: typeof formData, skip = false) => {
    const userId = localStorage.getItem('user-id');
    const userData = localStorage.getItem('user-data');
    let parsed: any = {};
    try { parsed = JSON.parse(userData || '{}'); } catch {}

    // 1. Save to localStorage first (always succeeds)
    const updatedUserData = {
      ...parsed,
      age: data.age ? parseInt(data.age) : null,
      phone: data.phone || null,
      email: data.email || null,
      occupation: data.occupation || null,
      interests: data.interests || null,
      selfMbtiType: data.selfMbtiType || null,
      enneagramType: data.enneagramType || null,
      cognitiveFunctionsFamiliarity: data.cognitiveFunctionsFamiliarity || null,
      profileComplete: !skip,
      profileSkipped: skip,
      profileUpdatedAt: new Date().toISOString(),
    };
    localStorage.setItem('user-data', JSON.stringify(updatedUserData));

    if (!userId) return;

    // 2. Upsert user to DB with all fields
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          name: parsed.name || null,
          gender: parsed.gender || null,
          age: data.age ? parseInt(data.age) : null,
          phone: data.phone || null,
          email: data.email || null,
          occupation: data.occupation || null,
          interests: data.interests || null,
          selfMbtiType: data.selfMbtiType || null,
          enneagramType: data.enneagramType || null,
          cognitiveFunctionsFamiliarity: data.cognitiveFunctionsFamiliarity || null,
          mbtiType: mbtiResult?.type || null,
        })
      });
    } catch (err) {
      console.warn('Profile DB save failed:', err);
    }

    // 3. Save test result to DB
    if (mbtiResult) {
      try {
        const resultId = localStorage.getItem('mbti-result-id') || crypto.randomUUID();
        localStorage.setItem('mbti-result-id', resultId);
        const rRes = await fetch('/api/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: resultId,
            userId,
            mbtiType: mbtiResult.type,
            variant: mbtiResult.variant,
            percentages: mbtiResult.percentages,
            dominantFunction: mbtiResult.dominantFunction,
            auxiliaryFunction: mbtiResult.auxiliaryFunction,
            tertiaryFunction: mbtiResult.tertiaryFunction,
            inferiorFunction: mbtiResult.inferiorFunction,
            testDate: localStorage.getItem('mbti-test-date') || new Date().toISOString(),
          })
        });
        if (rRes.ok) {
          localStorage.setItem('db-synced', 'true');
          localStorage.removeItem('db-save-queue');
        } else {
          throw new Error('result save failed');
        }
      } catch {
        const queue = JSON.parse(localStorage.getItem('db-save-queue') || '[]');
        queue.push({
          resultId: localStorage.getItem('mbti-result-id'),
          userId,
          result: mbtiResult,
          testDate: new Date().toISOString(),
          queuedAt: new Date().toISOString()
        });
        localStorage.setItem('db-save-queue', JSON.stringify(queue));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || !formData.phone) {
      alert('Mohon isi Usia dan Nomor HP terlebih dahulu');
      return;
    }
    setIsSubmitting(true);
    await saveAll(formData, false);
    router.push(`/results/${mbtiResult?.type}`);
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    await saveAll(formData, true);
    router.push(`/results/${mbtiResult?.type}`);
  };

  if (!mbtiResult) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 py-8 px-4 pt-24">
      <TopNav />
      {/* Info Modals */}
      {activeModal === 'mbti' && (
        <InfoModal title="Tipe MBTI yang Kamu Kenal" onClose={() => setActiveModal(null)}>
          <p>Sebelum mengikuti tes ini, tipe MBTI apa yang paling kamu identifikasi dengan dirimu?</p>
          <p>Ini bukan tentang hasil tes sekarang — tapi tentang apa yang sudah kamu ketahui atau percaya sebelumnya.</p>
          <p className="text-navy-500 text-xs">Contoh: Jika kamu sudah pernah tes sebelumnya dan hasilnya INFJ, pilih INFJ. Jika belum pernah atau tidak yakin, pilih "unsure".</p>
          <div className="bg-sky-50 rounded-xl p-3 text-xs">
            💡 Data ini membantu kami memahami seberapa akurat tes ini dibandingkan persepsi diri sendiri.
          </div>
        </InfoModal>
      )}
      {activeModal === 'enneagram' && (
        <InfoModal title="Tipe Enneagram" onClose={() => setActiveModal(null)}>
          <p><strong>Enneagram</strong> adalah sistem kepribadian yang menggambarkan 9 tipe dasar manusia berdasarkan motivasi inti dan ketakutan terdalam.</p>
          <p>Berbeda dengan MBTI yang fokus pada cara berpikir, Enneagram fokus pada <strong>mengapa</strong> kamu berperilaku seperti itu.</p>
          <div className="space-y-1 text-xs">
            <p>• <strong>1w9/1w2</strong> = Tipe 1 (Reformer) dengan wing 9 atau 2</p>
            <p>• <strong>4w3/4w5</strong> = Tipe 4 (Individualist) dengan wing 3 atau 5</p>
            <p>• <strong>Wing</strong> = tipe sekunder yang mempengaruhi kepribadianmu</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-xs">
            💡 Jika belum familiar dengan Enneagram, pilih "unsure". Kamu bisa pelajari lebih lanjut di halaman Types.
          </div>
        </InfoModal>
      )}
      {activeModal === 'cf' && (
        <InfoModal title="Familiar dengan Fungsi Kognitif?" onClose={() => setActiveModal(null)}>
          <p><strong>Fungsi Kognitif</strong> adalah cara otak memproses informasi — ada 8 fungsi: Ne, Ni, Se, Si, Te, Ti, Fe, Fi.</p>
          <p>Setiap tipe MBTI memiliki urutan fungsi yang unik (function stack) yang menentukan cara berpikir dan berperilaku.</p>
          <div className="space-y-1 text-xs">
            <p>• <strong>Tidak tahu</strong> = Baru pertama kali dengar</p>
            <p>• <strong>Tahu sedikit</strong> = Pernah baca tapi belum paham dalam</p>
            <p>• <strong>Cukup paham</strong> = Mengerti konsep dasar fungsi kognitif</p>
            <p>• <strong>Expert</strong> = Sangat familiar, bisa menjelaskan ke orang lain</p>
          </div>
          <div className="bg-teal-50 rounded-xl p-3 text-xs">
            💡 Jawaban ini membantu AI menyesuaikan level penjelasan yang diberikan untukmu.
          </div>
        </InfoModal>
      )}

      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          {/* Header */}
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center mb-5 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-black text-center text-navy-900 mb-2">Satu Langkah Lagi! 🎯</h1>
          <p className="text-center text-navy-600 mb-3 text-sm">Data ini membantu AI memberikan analisis yang lebih personal dan akurat</p>
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold text-sm shadow-lg">
              <Sparkles className="w-4 h-4" />
              Hasil tesmu: {mbtiResult?.variant}
            </span>
          </div>

          {/* User summary */}
          {basicData.name && (
            <div className="flex items-center gap-3 mb-6 p-4 bg-sky-50 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-black">{basicData.name[0].toUpperCase()}</span>
              </div>
              <div>
                <div className="font-bold text-navy-900 text-sm">{basicData.name}</div>
                <div className="text-xs text-navy-500">
                  {basicData.gender === 'male' ? '👨 Pria' : basicData.gender === 'female' ? '👩 Wanita' : '🌈 Lainnya'}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ── SECTION 1: Required ─────────────────────────────────── */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <h3 className="text-sm font-bold text-navy-800">Data Wajib</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-navy-800 mb-2">
                  <Calendar className="w-4 h-4 text-sky-500" />
                  Usia <span className="text-red-500">*</span>
                </label>
                <input type="number" value={formData.age}
                  onChange={e => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Contoh: 22" min="13" max="100" required
                  className="w-full px-4 py-3 rounded-xl border-2 border-navy-200 focus:border-sky-400 focus:outline-none transition-colors bg-white"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-navy-800 mb-2">
                  <Phone className="w-4 h-4 text-sky-500" />
                  Nomor HP <span className="text-red-500">*</span>
                </label>
                <input type="tel" value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="08123456789" required
                  className="w-full px-4 py-3 rounded-xl border-2 border-navy-200 focus:border-sky-400 focus:outline-none transition-colors bg-white"
                />
              </div>
            </div>

            {/* ── SECTION 2: Optional ─────────────────────────────────── */}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <h3 className="text-sm font-bold text-navy-800">Data Opsional — Untuk Analisis Lebih Akurat</h3>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-navy-800 mb-2">
                <Mail className="w-4 h-4 text-sky-500" />
                Email
              </label>
              <input type="email" value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-navy-200 focus:border-sky-400 focus:outline-none transition-colors bg-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-navy-800 mb-2">
                <Briefcase className="w-4 h-4 text-sky-500" />
                Pekerjaan / Status
              </label>
              <input type="text" value={formData.occupation}
                onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                placeholder="Mahasiswa, Software Engineer, Desainer..."
                className="w-full px-4 py-3 rounded-xl border-2 border-navy-200 focus:border-sky-400 focus:outline-none transition-colors bg-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-navy-800 mb-2">
                <Star className="w-4 h-4 text-sky-500" />
                Minat / Hobi
              </label>
              <textarea value={formData.interests}
                onChange={e => setFormData({ ...formData, interests: e.target.value })}
                placeholder="Coding, membaca, traveling, musik, gaming..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border-2 border-navy-200 focus:border-sky-400 focus:outline-none transition-colors bg-white resize-none"
              />
            </div>

            {/* ── SECTION 3: Sakkinorva Questions ─────────────────────── */}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <h3 className="text-sm font-bold text-navy-800">Pertanyaan Tambahan</h3>
            </div>

            {/* Self MBTI */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-bold text-navy-800">
                  Tipe MBTI yang paling kamu identifikasi?
                </label>
                <button type="button" onClick={() => setActiveModal('mbti')}
                  className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center hover:bg-sky-200 transition-colors flex-shrink-0">
                  <HelpCircle className="w-3 h-3 text-sky-600" />
                </button>
              </div>
              <p className="text-xs text-navy-500 mb-2">Tipe yang kamu kenal sebelum tes ini (bukan hasil tes sekarang)</p>
              <select value={formData.selfMbtiType}
                onChange={e => setFormData({ ...formData, selfMbtiType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-navy-200 focus:border-sky-400 focus:outline-none transition-colors bg-white text-navy-800"
              >
                <option value="">— Pilih tipe —</option>
                {MBTI_TYPES.map(t => (
                  <option key={t} value={t}>{t === 'unsure' ? 'Tidak yakin / Belum pernah tes' : t}</option>
                ))}
              </select>
            </div>

            {/* Enneagram */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-bold text-navy-800">
                  Tipe Enneagram yang paling kamu identifikasi?
                </label>
                <button type="button" onClick={() => setActiveModal('enneagram')}
                  className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors flex-shrink-0">
                  <HelpCircle className="w-3 h-3 text-purple-600" />
                </button>
              </div>
              <p className="text-xs text-navy-500 mb-2">Sistem kepribadian berdasarkan motivasi inti (1-9 dengan wing)</p>
              <select value={formData.enneagramType}
                onChange={e => setFormData({ ...formData, enneagramType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-navy-200 focus:border-purple-400 focus:outline-none transition-colors bg-white text-navy-800"
              >
                <option value="">— Pilih tipe —</option>
                {ENNEAGRAM_TYPES.map(t => (
                  <option key={t} value={t}>{t === 'unsure' ? 'Tidak yakin / Belum familiar' : t}</option>
                ))}
              </select>
            </div>

            {/* Cognitive Functions Familiarity */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-bold text-navy-800">
                  Seberapa familiar kamu dengan fungsi kognitif?
                </label>
                <button type="button" onClick={() => setActiveModal('cf')}
                  className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center hover:bg-teal-200 transition-colors flex-shrink-0">
                  <HelpCircle className="w-3 h-3 text-teal-600" />
                </button>
              </div>
              <p className="text-xs text-navy-500 mb-3">Ne, Ni, Se, Si, Te, Ti, Fe, Fi — seberapa paham kamu?</p>
              <div className="grid grid-cols-2 gap-2">
                {CF_FAMILIARITY.map(opt => (
                  <button key={opt.value} type="button"
                    onClick={() => setFormData({ ...formData, cognitiveFunctionsFamiliarity: opt.value })}
                    className={`px-3 py-3 rounded-xl text-xs font-semibold text-left transition-all border-2 ${
                      formData.cognitiveFunctionsFamiliarity === opt.value
                        ? 'bg-gradient-to-r from-teal-400 to-sky-400 text-white border-transparent shadow-lg scale-105'
                        : 'bg-white text-navy-700 border-navy-200 hover:border-sky-300 hover:scale-105'
                    }`}
                  >
                    {formData.cognitiveFunctionsFamiliarity === opt.value && <span className="mr-1">✓</span>}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits info */}
            <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-navy-700 leading-relaxed">
                  <strong className="text-navy-800">Kenapa perlu data ini?</strong>
                  <ul className="mt-2 space-y-1">
                    <li>• <strong>Usia + HP:</strong> Analisis sesuai tahap kehidupan & kontak personal</li>
                    <li>• <strong>Pekerjaan + Hobi:</strong> Rekomendasi yang relevan dengan hidupmu</li>
                    <li>• <strong>Tipe MBTI sebelumnya:</strong> Validasi akurasi tes vs persepsi diri</li>
                    <li>• <strong>Enneagram:</strong> Memperkaya profil kepribadian untuk AI</li>
                    <li>• <strong>Fungsi kognitif:</strong> AI menyesuaikan level penjelasan untukmu</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-navy-50 rounded-xl p-3 text-xs text-navy-600">
              🔒 <strong>Privasi Terjamin:</strong> Data tersimpan aman dan hanya untuk analisis personal. Tidak dibagikan ke pihak ketiga.
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={handleSkip} disabled={isSubmitting}
                className="flex-1 py-4 rounded-full border-2 border-navy-200 text-navy-700 font-bold hover:bg-navy-50 transition-colors disabled:opacity-50">
                Lewati
              </button>
              <button type="submit" disabled={isSubmitting}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">
                {isSubmitting
                  ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                  : <>Lihat Hasil Lengkap <ArrowRight className="w-5 h-5" /></>
                }
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-navy-500">Kamu bisa edit data ini kapan saja dari halaman Profile</p>
        </div>
      </div>
    </main>
  );
}
