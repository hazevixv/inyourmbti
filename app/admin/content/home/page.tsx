"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, RotateCcw } from 'lucide-react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { 
  getHomeContent, 
  setHomeContent, 
  DEFAULT_HOME_CONTENT,
  type HomePageContent 
} from '@/lib/admin-data';

export default function AdminHomeContentPage() {
  const router = useRouter();
  const [content, setContent] = useState<HomePageContent>(DEFAULT_HOME_CONTENT);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin');
      return;
    }
    setContent(getHomeContent());
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);
    setHomeContent(content);
    setSaveMessage('✓ Saved successfully!');
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('');
    }, 2000);
  };

  const handleReset = () => {
    if (confirm('Reset to default content? This cannot be undone.')) {
      setContent(DEFAULT_HOME_CONTENT);
      setHomeContent(DEFAULT_HOME_CONTENT);
      setSaveMessage('✓ Reset to default!');
      setTimeout(() => setSaveMessage(''), 2000);
    }
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
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:scale-105 transition-transform text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 rounded-full gradient-button text-white font-medium disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="glass rounded-3xl p-6">
            <h1 className="text-2xl font-black mb-2">Edit Home Page Content</h1>
            <p className="text-gray-600">Customize the content displayed on the homepage</p>
          </div>

          {/* Hero Section */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <textarea
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={content.hero.ctaText}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, ctaText: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">Stats Section</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tests Count
                </label>
                <input
                  type="text"
                  value={content.stats.tests}
                  onChange={(e) => setContent({
                    ...content,
                    stats: { ...content.stats, tests: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Types Count
                </label>
                <input
                  type="text"
                  value={content.stats.types}
                  onChange={(e) => setContent({
                    ...content,
                    stats: { ...content.stats, types: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Questions Count
                </label>
                <input
                  type="text"
                  value={content.stats.questions}
                  onChange={(e) => setContent({
                    ...content,
                    stats: { ...content.stats, questions: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">Features Section</h2>
            <div className="space-y-4">
              {content.features.map((feature, index) => (
                <div key={feature.id} className="p-4 rounded-xl bg-white/50">
                  <div className="font-medium text-sm text-gray-600 mb-3">Feature {index + 1}</div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...content.features];
                        newFeatures[index].title = e.target.value;
                        setContent({ ...content, features: newFeatures });
                      }}
                      placeholder="Title"
                      className="w-full px-4 py-2 rounded-lg glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink text-sm"
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...content.features];
                        newFeatures[index].description = e.target.value;
                        setContent({ ...content, features: newFeatures });
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Section */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">Why Haze MBTI Section</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={content.whySection.title}
                onChange={(e) => setContent({
                  ...content,
                  whySection: { ...content.whySection, title: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
              />
            </div>

            <div className="space-y-4">
              {content.whySection.items.map((item, index) => (
                <div key={item.id} className="p-4 rounded-xl bg-white/50">
                  <div className="font-medium text-sm text-gray-600 mb-3">Item {index + 1}</div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...content.whySection.items];
                        newItems[index].title = e.target.value;
                        setContent({
                          ...content,
                          whySection: { ...content.whySection, items: newItems }
                        });
                      }}
                      placeholder="Title"
                      className="w-full px-4 py-2 rounded-lg glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink text-sm"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...content.whySection.items];
                        newItems[index].description = e.target.value;
                        setContent({
                          ...content,
                          whySection: { ...content.whySection, items: newItems }
                        });
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button (Bottom) */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-full glass hover:scale-105 transition-transform font-medium"
            >
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 rounded-full gradient-button text-white font-bold disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
