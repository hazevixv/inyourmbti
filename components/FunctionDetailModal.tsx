"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { ALL_COMPLETE_FUNCTIONS } from '@/lib/mbti-functions-loader';
import { getVariantDetail } from '@/lib/mbti-education';

// Helper to normalize code
function normalizeCode(code: string): string {
  const upper = code.toUpperCase();
  return upper.charAt(0) + upper.charAt(1).toLowerCase();
}

interface FunctionDetailModalProps {
  functionCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FunctionDetailModal({ functionCode, isOpen, onClose }: FunctionDetailModalProps) {
  const [activeSection, setActiveSection] = useState<string>('summary');
  const normalizedCode = normalizeCode(functionCode);
  const functionDetail = ALL_COMPLETE_FUNCTIONS[normalizedCode];

  if (!isOpen || !functionDetail) return null;

  const sections = [
    { id: 'summary', label: 'Ringkasan', icon: '📝' },
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'deepDive', label: 'Deep Dive', icon: '🔬' },
    { id: 'howItWorks', label: 'Cara Kerja', icon: '⚙️' },
    { id: 'strengths', label: 'Kekuatan', icon: '💪' },
    { id: 'weaknesses', label: 'Kelemahan', icon: '⚠️' },
    { id: 'daily', label: 'Kehidupan', icon: '🌟' },
    { id: 'work', label: 'Pekerjaan', icon: '💼' },
    { id: 'relationships', label: 'Hubungan', icon: '❤️' },
    { id: 'stress', label: 'Saat Stress', icon: '😰' },
    { id: 'healthy', label: 'Saat Sehat', icon: '✨' },
    { id: 'myths', label: 'Mitos', icon: '🎭' },
    { id: 'tips', label: 'Tips', icon: '🎯' },
    { id: 'exercises', label: 'Latihan', icon: '🏋️' },
    { id: 'famous', label: 'Tokoh', icon: '⭐' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-sky-400 to-teal-400 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="text-white">
            <div className="text-sm font-medium opacity-90">{functionDetail.name}</div>
            <h2 className="text-3xl font-black mt-1">{functionDetail.code}</h2>
            <p className="text-sm mt-2 opacity-90">{functionDetail.shortDesc}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="sticky top-[120px] z-10 bg-white border-b border-navy-200 overflow-x-auto">
          <div className="flex gap-2 p-4 min-w-max">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-sky-400 to-teal-400 text-white shadow-lg'
                    : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeSection === 'summary' && functionDetail.summary && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Ringkasan Singkat</h3>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50 border-2 border-sky-200">
                 <p className="text-base md:text-lg text-navy-700 leading-relaxed font-medium">
                  {functionDetail.summary}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-yellow-50 border-l-4 border-yellow-400">
                <p className="text-sm text-navy-600">
                  💡 <strong>Tip:</strong> Ini adalah ringkasan super simple. Klik tab lain untuk penjelasan yang lebih detail!
                </p>
              </div>
            </div>
          )}

          {activeSection === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Apa itu {functionDetail.code}?</h3>
              {functionDetail.fullDescription.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-navy-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {activeSection === 'deepDive' && functionDetail.deepDive && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Penjelasan Mendalam tentang {functionDetail.code}</h3>
              <div className="prose prose-navy max-w-none">
                {functionDetail.deepDive.split('\n\n').map((paragraph, i) => {
                  // Check if it's a heading (starts with **)
                  if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                    const heading = paragraph.replace(/\*\*/g, '').trim();
                    return (
                      <h4 key={i} className="text-lg font-bold text-navy-800 mt-6 mb-3">
                        {heading}
                      </h4>
                    );
                  }
                  return (
                    <p key={i} className="text-navy-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
              {functionDetail.psychologicalBasis && (
                <div className="mt-6 p-5 rounded-xl bg-purple-50 border-l-4 border-purple-400">
                  <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                    <span>🧠</span> Dasar Psikologis
                  </h4>
                  <p className="text-sm text-navy-700 leading-relaxed">
                    {functionDetail.psychologicalBasis}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeSection === 'howItWorks' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Bagaimana {functionDetail.code} Bekerja?</h3>
              <p className="text-navy-700 leading-relaxed">
                {functionDetail.howItWorks}
              </p>
            </div>
          )}

          {activeSection === 'strengths' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Kekuatan {functionDetail.code}</h3>
              <div className="grid gap-3">
                {functionDetail.strengths.map((strength, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-green-50">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-navy-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'weaknesses' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Kelemahan {functionDetail.code}</h3>
              <div className="grid gap-3">
                {functionDetail.weaknesses.map((weakness, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-orange-50">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">!</span>
                    </div>
                    <span className="text-navy-700">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'daily' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">{functionDetail.code} Dalam Kehidupan Sehari-hari</h3>
              <div className="grid gap-3">
                {functionDetail.inDailyLife.map((example, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-sky-50">
                    <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-navy-700">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'work' && functionDetail.atWork && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">{functionDetail.code} Di Tempat Kerja</h3>
              <div className="grid gap-3">
                {functionDetail.atWork.map((example, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-indigo-50">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">💼</span>
                    </div>
                    <span className="text-navy-700">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'relationships' && functionDetail.inRelationships && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">{functionDetail.code} Dalam Hubungan</h3>
              <div className="grid gap-3">
                {functionDetail.inRelationships.map((example, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-pink-50">
                    <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">❤️</span>
                    </div>
                    <span className="text-navy-700">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'stress' && functionDetail.whenStressed && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">{functionDetail.code} Saat Stress</h3>
              <div className="grid gap-3">
                {functionDetail.whenStressed.map((sign, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-50">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">⚠️</span>
                    </div>
                    <span className="text-navy-700">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'healthy' && functionDetail.whenHealthy && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">{functionDetail.code} Saat Sehat & Berkembang</h3>
              <div className="grid gap-3">
                {functionDetail.whenHealthy.map((sign, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✨</span>
                    </div>
                    <span className="text-navy-700">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'myths' && functionDetail.commonMisunderstandings && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Mitos & Kesalahpahaman tentang {functionDetail.code}</h3>
              <div className="grid gap-3">
                {functionDetail.commonMisunderstandings.map((myth, i) => (
                  <div key={i} className="p-4 rounded-xl bg-purple-50 border-l-4 border-purple-400">
                    <span className="text-navy-700">{myth}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'tips' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Tips Mengembangkan {functionDetail.code}</h3>
              <div className="grid gap-3">
                {functionDetail.developmentTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-teal-50">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">💡</span>
                    </div>
                    <span className="text-navy-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'exercises' && functionDetail.exercises && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Latihan Praktis untuk {functionDetail.code}</h3>
              <div className="grid gap-3">
                {functionDetail.exercises.map((exercise, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-amber-50">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-navy-700">{exercise}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'famous' && functionDetail.famousExamples && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-navy-800">Tokoh Terkenal dengan {functionDetail.code} Kuat</h3>
              <div className="grid gap-3">
                {functionDetail.famousExamples.map((person, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-yellow-50">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">⭐</span>
                    </div>
                    <span className="text-navy-700">{person}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border-l-4 border-blue-400">
                <p className="text-sm text-navy-600">
                  💡 <strong>Note:</strong> Typing tokoh terkenal adalah spekulasi based on behavior dan karya mereka. Tidak ada yang bisa 100% certain tanpa test langsung!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface VariantDetailModalProps {
  variantCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VariantDetailModal({ variantCode, isOpen, onClose }: VariantDetailModalProps) {
  const variantDetail = getVariantDetail(variantCode);

  if (!isOpen || !variantDetail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-400 to-pink-400 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="text-white">
            <div className="text-sm font-medium opacity-90">Variant</div>
            <h2 className="text-3xl font-black mt-1">{variantDetail.name} (-{variantDetail.code})</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-navy-800 mb-3">Apa itu {variantDetail.name}?</h3>
            <p className="text-navy-700 leading-relaxed">
              {variantDetail.description}
            </p>
          </div>

          {/* Characteristics */}
          <div>
            <h3 className="text-xl font-bold text-navy-800 mb-3">Karakteristik</h3>
            <div className="grid gap-2">
              {variantDetail.characteristics.map((char, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-navy-50">
                  <span className="text-purple-500">•</span>
                  <span className="text-navy-700 text-sm">{char}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-xl font-bold text-navy-800 mb-3">Kekuatan</h3>
            <div className="grid gap-2">
              {variantDetail.strengths.map((strength, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-green-50">
                  <span className="text-green-500">✓</span>
                  <span className="text-navy-700 text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <h3 className="text-xl font-bold text-navy-800 mb-3">Tantangan</h3>
            <div className="grid gap-2">
              {variantDetail.challenges.map((challenge, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-orange-50">
                  <span className="text-orange-500">!</span>
                  <span className="text-navy-700 text-sm">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
