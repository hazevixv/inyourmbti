// Admin data management utilities
// This manages all editable content in the website

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  features: {
    enableChat: boolean;
    enableSharing: boolean;
    enableAnalytics: boolean;
  };
}

export interface HomePageContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  stats: {
    tests: string;
    types: string;
    questions: string;
  };
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  whySection: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
}

export interface TestSettings {
  questionsPerPage: number;
  enableProgress: boolean;
  enableBackButton: boolean;
  autoSave: boolean;
  timeLimit?: number; // in minutes, undefined = no limit
}

export interface AISettings {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPromptTemplate: string;
  rateLimit: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
}

// Default settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Haze MBTI',
  siteDescription: 'Platform tes MBTI yang akurat dan modern dengan AI psychologist',
  siteUrl: 'http://localhost:2002',
  contactEmail: 'support@hazembti.com',
  socialLinks: {},
  analytics: {},
  seo: {
    metaTitle: 'Haze MBTI - Temukan Kepribadian Sejatimu',
    metaDescription: 'Platform tes MBTI yang akurat dan modern dengan AI psychologist. Temukan tipe kepribadianmu dan pahami dirimu lebih dalam.',
    metaKeywords: 'MBTI, tes kepribadian, personality test, cognitive functions, AI psychologist',
  },
  features: {
    enableChat: true,
    enableSharing: true,
    enableAnalytics: false,
  },
};

export const DEFAULT_HOME_CONTENT: HomePageContent = {
  hero: {
    title: 'Understand you better',
    subtitle: 'Temukan tipe kepribadian MBTI-mu dengan tes yang akurat dan modern. Didukung oleh AI psychologist untuk membantu kamu memahami dirimu lebih dalam.',
    ctaText: 'Get started!',
  },
  stats: {
    tests: '32.8k',
    types: '16',
    questions: '96',
  },
  features: [
    {
      id: 'test',
      title: 'Tes MBTI Akurat',
      description: '96 pertanyaan mendalam berdasarkan teori fungsi kognitif Grant/Brownsword',
      icon: 'Target',
    },
    {
      id: 'chat',
      title: 'AI Psychologist',
      description: 'Chat dengan AI yang memahami kepribadianmu dan siap memberikan insights',
      icon: 'MessageCircle',
    },
    {
      id: 'about',
      title: 'Pelajari MBTI',
      description: 'Pahami 16 tipe kepribadian dan 8 fungsi kognitif secara mendalam',
      icon: 'Brain',
    },
  ],
  whySection: {
    title: 'Kenapa Haze MBTI?',
    items: [
      {
        id: 'accuracy',
        title: 'Akurasi Tinggi',
        description: 'Menggunakan teori fungsi kognitif Grant/Brownsword yang lebih akurat dari tes MBTI standar',
      },
      {
        id: 'ai',
        title: 'AI-Powered',
        description: 'Didukung oleh Groq AI untuk memberikan insights personal yang mendalam dan akurat',
      },
      {
        id: 'free',
        title: '100% Gratis',
        description: 'Tidak ada paywall, tidak ada biaya tersembunyi. Semua fitur gratis untuk semua orang',
      },
      {
        id: 'modern',
        title: 'Modern & Mudah',
        description: 'UI/UX yang modern, menenangkan, dan mudah digunakan. Seperti app, bukan website',
      },
    ],
  },
};

export const DEFAULT_TEST_SETTINGS: TestSettings = {
  questionsPerPage: 1,
  enableProgress: true,
  enableBackButton: true,
  autoSave: true,
  timeLimit: undefined,
};

export const DEFAULT_AI_SETTINGS: AISettings = {
  model: 'openai/gpt-oss-20b',
  temperature: 0.7,
  maxTokens: 2048,
  systemPromptTemplate: `Kamu adalah psikolog MBTI profesional yang ahli dan empatik. User telah menyelesaikan tes MBTI dan tipe mereka adalah {{mbtiType}}.

Skor fungsi kognitif mereka:
{{functionScores}}

Berikan wawasan yang mendalam, empatik, dan akurat tentang kepribadian mereka, hubungan, karir, dan pertumbuhan pribadi. Gunakan bahasa Indonesia yang hangat dan mudah dipahami.`,
  rateLimit: {
    requestsPerMinute: 10,
    requestsPerHour: 100,
  },
};

// Storage keys
const STORAGE_KEYS = {
  SITE_SETTINGS: 'admin-site-settings',
  HOME_CONTENT: 'admin-home-content',
  TEST_SETTINGS: 'admin-test-settings',
  AI_SETTINGS: 'admin-ai-settings',
};

// Get/Set functions
export function getSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SITE_SETTINGS;
  const saved = localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS);
  return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS;
}

export function setSiteSettings(settings: SiteSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(settings));
}

export function getHomeContent(): HomePageContent {
  if (typeof window === 'undefined') return DEFAULT_HOME_CONTENT;
  const saved = localStorage.getItem(STORAGE_KEYS.HOME_CONTENT);
  return saved ? JSON.parse(saved) : DEFAULT_HOME_CONTENT;
}

export function setHomeContent(content: HomePageContent) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.HOME_CONTENT, JSON.stringify(content));
}

export function getTestSettings(): TestSettings {
  if (typeof window === 'undefined') return DEFAULT_TEST_SETTINGS;
  const saved = localStorage.getItem(STORAGE_KEYS.TEST_SETTINGS);
  return saved ? JSON.parse(saved) : DEFAULT_TEST_SETTINGS;
}

export function setTestSettings(settings: TestSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TEST_SETTINGS, JSON.stringify(settings));
}

export function getAISettings(): AISettings {
  if (typeof window === 'undefined') return DEFAULT_AI_SETTINGS;
  const saved = localStorage.getItem(STORAGE_KEYS.AI_SETTINGS);
  return saved ? JSON.parse(saved) : DEFAULT_AI_SETTINGS;
}

export function setAISettings(settings: AISettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.AI_SETTINGS, JSON.stringify(settings));
}

// Reset all to defaults
export function resetAllSettings() {
  if (typeof window === 'undefined') return;
  setSiteSettings(DEFAULT_SITE_SETTINGS);
  setHomeContent(DEFAULT_HOME_CONTENT);
  setTestSettings(DEFAULT_TEST_SETTINGS);
  setAISettings(DEFAULT_AI_SETTINGS);
}

// Export all data (for backup)
export function exportAllData() {
  return {
    siteSettings: getSiteSettings(),
    homeContent: getHomeContent(),
    testSettings: getTestSettings(),
    aiSettings: getAISettings(),
    exportDate: new Date().toISOString(),
  };
}

// Import all data (from backup)
export function importAllData(data: any) {
  if (data.siteSettings) setSiteSettings(data.siteSettings);
  if (data.homeContent) setHomeContent(data.homeContent);
  if (data.testSettings) setTestSettings(data.testSettings);
  if (data.aiSettings) setAISettings(data.aiSettings);
}
