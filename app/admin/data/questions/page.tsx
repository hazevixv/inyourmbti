"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, Download, Upload, Plus, Trash2, Edit2 } from 'lucide-react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { questions as defaultQuestions, type MBTIQuestion, type CognitiveFunction } from '@/lib/questions';

export default function AdminQuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<MBTIQuestion[]>(defaultQuestions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterFunction, setFilterFunction] = useState<CognitiveFunction | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin');
      return;
    }
    // Load custom questions from localStorage if exists
    const saved = localStorage.getItem('admin-custom-questions');
    if (saved) {
      setQuestions(JSON.parse(saved));
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('admin-custom-questions', JSON.stringify(questions));
    setSaveMessage('✓ Questions saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mbti-questions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported) && imported.length > 0) {
          setQuestions(imported);
          setSaveMessage('✓ Questions imported!');
          setTimeout(() => setSaveMessage(''), 2000);
        } else {
          alert('Invalid file format');
        }
      } catch (error) {
        alert('Error importing file');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Reset to default questions? This cannot be undone.')) {
      setQuestions(defaultQuestions);
      localStorage.removeItem('admin-custom-questions');
      setSaveMessage('✓ Reset to default!');
      setTimeout(() => setSaveMessage(''), 2000);
    }
  };

  const handleEdit = (id: number, field: keyof MBTIQuestion, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = Math.max(...questions.map(q => q.id)) + 1;
    const newQuestion: MBTIQuestion = {
      id: newId,
      text: 'New question text',
      function: 'Ne',
      reverse: false,
      explanation: 'Explanation for this question',
    };
    setQuestions([...questions, newQuestion]);
    setEditingId(newId);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesFunction = filterFunction === 'all' || q.function === filterFunction;
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFunction && matchesSearch;
  });

  const functionCounts = {
    Ne: questions.filter(q => q.function === 'Ne').length,
    Ni: questions.filter(q => q.function === 'Ni').length,
    Se: questions.filter(q => q.function === 'Se').length,
    Si: questions.filter(q => q.function === 'Si').length,
    Te: questions.filter(q => q.function === 'Te').length,
    Ti: questions.filter(q => q.function === 'Ti').length,
    Fe: questions.filter(q => q.function === 'Fe').length,
    Fi: questions.filter(q => q.function === 'Fi').length,
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="glass-dark border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/admin/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              {saveMessage && (
                <span className="text-sm text-green-600 font-medium">{saveMessage}</span>
              )}
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                id="import-file"
              />
              <label
                htmlFor="import-file"
                className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:scale-105 transition-transform text-sm cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Import
              </label>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:scale-105 transition-transform text-sm"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 rounded-full gradient-button text-white font-medium"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="glass rounded-3xl p-6">
            <h1 className="text-2xl font-black mb-2">Manage Questions</h1>
            <p className="text-gray-600">Edit, add, or remove MBTI test questions</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {Object.entries(functionCounts).map(([func, count]) => (
              <div key={func} className="glass rounded-xl p-3 text-center">
                <div className="text-xs text-gray-600 mb-1">{func}</div>
                <div className="text-xl font-bold text-primary-pink">{count}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="glass rounded-3xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>
              <select
                value={filterFunction}
                onChange={(e) => setFilterFunction(e.target.value as any)}
                className="px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
              >
                <option value="all">All Functions</option>
                <option value="Ne">Ne - Extraverted Intuition</option>
                <option value="Ni">Ni - Introverted Intuition</option>
                <option value="Se">Se - Extraverted Sensing</option>
                <option value="Si">Si - Introverted Sensing</option>
                <option value="Te">Te - Extraverted Thinking</option>
                <option value="Ti">Ti - Introverted Thinking</option>
                <option value="Fe">Fe - Extraverted Feeling</option>
                <option value="Fi">Fi - Introverted Feeling</option>
              </select>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-button text-white font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Question
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="glass rounded-2xl p-4">
                {editingId === question.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">#{question.id}</span>
                      <select
                        value={question.function}
                        onChange={(e) => handleEdit(question.id, 'function', e.target.value)}
                        className="px-3 py-1 rounded-lg glass text-sm"
                      >
                        <option value="Ne">Ne</option>
                        <option value="Ni">Ni</option>
                        <option value="Se">Se</option>
                        <option value="Si">Si</option>
                        <option value="Te">Te</option>
                        <option value="Ti">Ti</option>
                        <option value="Fe">Fe</option>
                        <option value="Fi">Fi</option>
                      </select>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={question.reverse}
                          onChange={(e) => handleEdit(question.id, 'reverse', e.target.checked)}
                          className="rounded accent-primary-pink"
                        />
                        Reverse
                      </label>
                    </div>
                    <textarea
                      value={question.text}
                      onChange={(e) => handleEdit(question.id, 'text', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-lg glass text-sm font-medium"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-sm font-medium text-gray-600">
                      #{question.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-primary-pink to-primary-purple text-white text-xs font-medium">
                          {question.function}
                        </span>
                        {question.reverse && (
                          <span className="px-2 py-1 rounded-lg bg-gray-200 text-gray-700 text-xs font-medium">
                            Reverse
                          </span>
                        )}
                      </div>
                      <p className="text-gray-800">{question.text}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(question.id)}
                        className="p-2 rounded-lg glass hover:scale-105 transition-transform"
                      >
                        <Edit2 className="w-4 h-4 text-primary-purple" />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-2 rounded-lg glass hover:scale-105 transition-transform"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-full glass hover:scale-105 transition-transform font-medium text-red-600"
            >
              Reset to Default (96 questions)
            </button>
            <div className="text-sm text-gray-600">
              Total: {questions.length} questions | Showing: {filteredQuestions.length}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
