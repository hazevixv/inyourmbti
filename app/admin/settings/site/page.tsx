"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, RotateCcw } from 'lucide-react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { 
  getSiteSettings, 
  setSiteSettings, 
  DEFAULT_SITE_SETTINGS,
  type SiteSettings 
} from '@/lib/admin-data';

export default function AdminSiteSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin');
      return;
    }
    setSettings(getSiteSettings());
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);
    setSiteSettings(settings);
    setSaveMessage('✓ Saved successfully!');
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('');
    }, 2000);
  };

  const handleReset = () => {
    if (confirm('Reset to default settings? This cannot be undone.')) {
      setSettings(DEFAULT_SITE_SETTINGS);
      setSiteSettings(DEFAULT_SITE_SETTINGS);
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
            <h1 className="text-2xl font-black mb-2">Site Settings</h1>
            <p className="text-gray-600">Configure general website settings</p>
          </div>

          {/* Basic Info */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site URL
                </label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={settings.seo.metaTitle}
                  onChange={(e) => setSettings({
                    ...settings,
                    seo: { ...settings.seo, metaTitle: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={settings.seo.metaDescription}
                  onChange={(e) => setSettings({
                    ...settings,
                    seo: { ...settings.seo, metaDescription: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={settings.seo.metaKeywords}
                  onChange={(e) => setSettings({
                    ...settings,
                    seo: { ...settings.seo, metaKeywords: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">Social Media Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.twitter || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                  })}
                  placeholder="https://twitter.com/hazembti"
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.instagram || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                  })}
                  placeholder="https://instagram.com/hazembti"
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.facebook || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                  })}
                  placeholder="https://facebook.com/hazembti"
                  className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-primary-pink"
                />
              </div>
            </div>
          </div>

          {/* Features Toggle */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-bold text-lg mb-4">Features</h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-xl bg-white/50 cursor-pointer">
                <span className="font-medium">Enable AI Chat</span>
                <input
                  type="checkbox"
                  checked={settings.features.enableChat}
                  onChange={(e) => setSettings({
                    ...settings,
                    features: { ...settings.features, enableChat: e.target.checked }
                  })}
                  className="w-5 h-5 rounded accent-primary-pink"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl bg-white/50 cursor-pointer">
                <span className="font-medium">Enable Sharing</span>
                <input
                  type="checkbox"
                  checked={settings.features.enableSharing}
                  onChange={(e) => setSettings({
                    ...settings,
                    features: { ...settings.features, enableSharing: e.target.checked }
                  })}
                  className="w-5 h-5 rounded accent-primary-pink"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl bg-white/50 cursor-pointer">
                <span className="font-medium">Enable Analytics</span>
                <input
                  type="checkbox"
                  checked={settings.features.enableAnalytics}
                  onChange={(e) => setSettings({
                    ...settings,
                    features: { ...settings.features, enableAnalytics: e.target.checked }
                  })}
                  className="w-5 h-5 rounded accent-primary-pink"
                />
              </label>
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
