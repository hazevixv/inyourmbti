// MBTI TYPES - SEO METADATA
// Comprehensive SEO metadata untuk all personality type pages
// Optimized untuk Google search rankings

import { PersonalityCode, SEOMetadata } from '../types';
import { ALL_PERSONALITY_TYPES } from '../index';

/**
 * Get SEO metadata for a specific type
 */
export function getTypeSEO(code: PersonalityCode): SEOMetadata | undefined {
  return ALL_PERSONALITY_TYPES[code]?.seo;
}

/**
 * Get all SEO metadata
 */
export function getAllTypeSEO(): Record<PersonalityCode, SEOMetadata> {
  const result = {} as Record<PersonalityCode, SEOMetadata>;
  
  Object.entries(ALL_PERSONALITY_TYPES).forEach(([code, type]) => {
    result[code as PersonalityCode] = type.seo;
  });
  
  return result;
}

/**
 * Generate structured data (Schema.org) for a type page
 */
export function generateStructuredData(code: PersonalityCode) {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${type.code} - ${type.nickname} Personality Type`,
    description: type.seo.description,
    author: {
      '@type': 'Organization',
      name: 'MBTI Education Platform',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MBTI Education Platform',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    articleSection: 'Personality Types',
    keywords: type.seo.keywords.join(', '),
    wordCount: 5500,
    inLanguage: 'id-ID',
    about: {
      '@type': 'Thing',
      name: `${type.code} Personality Type`,
      description: type.tagline,
    },
    mainEntity: {
      '@type': 'Thing',
      name: type.nickname,
      description: type.overview,
    },
  };
}

/**
 * Generate Open Graph metadata for social sharing
 */
export function generateOpenGraphMeta(code: PersonalityCode) {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return {};
  
  return {
    'og:type': 'article',
    'og:title': type.seo.title,
    'og:description': type.seo.description,
    'og:url': `https://yourdomain.com${type.seo.canonical}`,
    'og:image': type.seo.ogImage || `/images/types/${code.toLowerCase()}.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:site_name': 'MBTI Education Platform',
    'og:locale': 'id_ID',
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCardMeta(code: PersonalityCode) {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return {};
  
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': type.seo.title,
    'twitter:description': type.seo.description,
    'twitter:image': type.seo.ogImage || `/images/types/${code.toLowerCase()}.jpg`,
  };
}

/**
 * Generate complete meta tags for a type page
 */
export function generateCompleteMetaTags(code: PersonalityCode) {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return {};
  
  return {
    // Basic meta tags
    title: type.seo.title,
    description: type.seo.description,
    keywords: type.seo.keywords.join(', '),
    canonical: type.seo.canonical,
    
    // Open Graph
    ...generateOpenGraphMeta(code),
    
    // Twitter Card
    ...generateTwitterCardMeta(code),
    
    // Additional SEO
    'robots': 'index, follow',
    'author': 'MBTI Education Platform',
    'language': 'Indonesian',
    'revisit-after': '7 days',
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbData(code: PersonalityCode) {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://yourdomain.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Personality Types',
        item: 'https://yourdomain.com/types',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: type.category,
        item: `https://yourdomain.com/categories/${type.category.toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${type.code} - ${type.nickname}`,
        item: `https://yourdomain.com${type.seo.canonical}`,
      },
    ],
  };
}

/**
 * Generate FAQ structured data from common misunderstandings
 */
export function generateFAQData(code: PersonalityCode) {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: type.commonMisunderstandings.map(item => ({
      '@type': 'Question',
      name: item.myth,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.truth,
      },
    })),
  };
}

/**
 * Get all keywords across all types (for keyword research)
 */
export function getAllKeywords(): string[] {
  const keywords = new Set<string>();
  
  Object.values(ALL_PERSONALITY_TYPES).forEach(type => {
    type.seo.keywords.forEach(keyword => keywords.add(keyword));
  });
  
  return Array.from(keywords).sort();
}

/**
 * Get keyword density for a type
 */
export function getKeywordDensity(code: PersonalityCode): Record<string, number> {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return {};
  
  const content = [
    type.overview,
    type.deepDive,
    type.functionStackAnalysis.dominant,
    type.functionStackAnalysis.auxiliary,
    type.functionStackAnalysis.tertiary,
    type.functionStackAnalysis.inferior,
    type.psychologicalBasis,
  ].join(' ').toLowerCase();
  
  const density: Record<string, number> = {};
  
  type.seo.keywords.forEach(keyword => {
    const regex = new RegExp(keyword.toLowerCase(), 'g');
    const matches = content.match(regex);
    density[keyword] = matches ? matches.length : 0;
  });
  
  return density;
}

/**
 * Generate internal linking suggestions
 */
export function getInternalLinkSuggestions(code: PersonalityCode): {
  relatedTypes: PersonalityCode[];
  relatedFunctions: string[];
  relatedTopics: string[];
} {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return { relatedTypes: [], relatedFunctions: [], relatedTopics: [] };
  
  return {
    relatedTypes: [
      ...type.compatibility.best,
      ...type.compatibility.good.slice(0, 2),
    ] as PersonalityCode[],
    relatedFunctions: [
      type.functionStack.dominant,
      type.functionStack.auxiliary,
      type.functionStack.tertiary,
      type.functionStack.inferior,
    ],
    relatedTopics: [
      `/categories/${type.category.toLowerCase()}`,
      '/cognitive-functions',
      '/compatibility',
      '/careers',
      '/relationships',
    ],
  };
}

/**
 * Generate sitemap entry for a type
 */
export function generateSitemapEntry(code: PersonalityCode) {
  const type = ALL_PERSONALITY_TYPES[code];
  if (!type) return null;
  
  return {
    url: `https://yourdomain.com${type.seo.canonical}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9, // High priority for type pages
    images: [
      {
        url: type.seo.ogImage || `/images/types/${code.toLowerCase()}.jpg`,
        title: `${type.code} - ${type.nickname}`,
        caption: type.tagline,
      },
    ],
  };
}

/**
 * Generate robots.txt rules
 */
export function generateRobotsTxt(): string {
  return `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://yourdomain.com/sitemap.xml
`.trim();
}

/**
 * SEO Performance Metrics
 */
export interface SEOMetrics {
  totalPages: number;
  totalKeywords: number;
  averageKeywordDensity: number;
  pagesWithImages: number;
  pagesWithStructuredData: number;
  internalLinksPerPage: number;
}

/**
 * Calculate SEO metrics across all types
 */
export function calculateSEOMetrics(): SEOMetrics {
  const types = Object.values(ALL_PERSONALITY_TYPES);
  
  return {
    totalPages: types.length,
    totalKeywords: getAllKeywords().length,
    averageKeywordDensity: types.reduce((sum, type) => {
      const density = Object.values(getKeywordDensity(type.code));
      const avg = density.reduce((a, b) => a + b, 0) / density.length;
      return sum + avg;
    }, 0) / types.length,
    pagesWithImages: types.filter(t => t.seo.ogImage).length,
    pagesWithStructuredData: types.length, // All have structured data
    internalLinksPerPage: 8, // Average: 4 functions + 4 related types
  };
}
