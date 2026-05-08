// SITEMAP GENERATOR
// Automatically generate XML sitemap untuk all MBTI content pages
// Optimized untuk Google Search Console

import { PersonalityCode } from '../types';
import { ALL_PERSONALITY_TYPES, getAllTypeCodes } from '../index';

export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

/**
 * Generate sitemap for all personality type pages
 */
export function generateTypesSitemap(baseUrl: string = 'https://yourdomain.com'): SitemapURL[] {
  const typeCodes = getAllTypeCodes();
  const today = new Date().toISOString().split('T')[0];
  
  return typeCodes.map(code => {
    const type = ALL_PERSONALITY_TYPES[code];
    return {
      loc: `${baseUrl}/types/${code.toLowerCase()}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.9,
      images: [
        {
          loc: `${baseUrl}/images/types/${code.toLowerCase()}.jpg`,
          title: `${type.code} - ${type.nickname}`,
          caption: type.tagline,
        },
      ],
    };
  });
}

/**
 * Generate sitemap for category pages
 */
export function generateCategorySitemap(baseUrl: string = 'https://yourdomain.com'): SitemapURL[] {
  const today = new Date().toISOString().split('T')[0];
  const categories = ['analyst', 'diplomat', 'sentinel', 'explorer'];
  
  return categories.map(category => ({
    loc: `${baseUrl}/categories/${category}`,
    lastmod: today,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));
}

/**
 * Generate sitemap for cognitive function pages
 */
export function generateFunctionsSitemap(baseUrl: string = 'https://yourdomain.com'): SitemapURL[] {
  const today = new Date().toISOString().split('T')[0];
  const functions = ['ni', 'ne', 'si', 'se', 'ti', 'te', 'fi', 'fe'];
  
  return functions.map(func => ({
    loc: `${baseUrl}/functions/${func}`,
    lastmod: today,
    changefreq: 'weekly' as const,
    priority: 0.85,
    images: [
      {
        loc: `${baseUrl}/images/functions/${func}.jpg`,
        title: `${func.toUpperCase()} - Cognitive Function`,
      },
    ],
  }));
}

/**
 * Generate sitemap for main pages
 */
export function generateMainPagesSitemap(baseUrl: string = 'https://yourdomain.com'): SitemapURL[] {
  const today = new Date().toISOString().split('T')[0];
  
  return [
    {
      loc: baseUrl,
      lastmod: today,
      changefreq: 'daily' as const,
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/test`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.95,
    },
    {
      loc: `${baseUrl}/types`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/functions`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.85,
    },
    {
      loc: `${baseUrl}/compatibility`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/careers`,
      lastmod: today,
      changefreq: 'monthly' as const,
      priority: 0.75,
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: today,
      changefreq: 'monthly' as const,
      priority: 0.5,
    },
  ];
}

/**
 * Generate complete sitemap
 */
export function generateCompleteSitemap(baseUrl: string = 'https://yourdomain.com'): SitemapURL[] {
  return [
    ...generateMainPagesSitemap(baseUrl),
    ...generateTypesSitemap(baseUrl),
    ...generateCategorySitemap(baseUrl),
    ...generateFunctionsSitemap(baseUrl),
  ];
}

/**
 * Convert sitemap data to XML format
 */
export function generateSitemapXML(urls: SitemapURL[]): string {
  const urlEntries = urls.map(url => {
    const images = url.images
      ? url.images.map(img => `
      <image:image>
        <image:loc>${escapeXML(img.loc)}</image:loc>
        ${img.title ? `<image:title>${escapeXML(img.title)}</image:title>` : ''}
        ${img.caption ? `<image:caption>${escapeXML(img.caption)}</image:caption>` : ''}
      </image:image>`).join('')
      : '';
    
    return `  <url>
    <loc>${escapeXML(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${images}
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate sitemap index (for large sites)
 */
export function generateSitemapIndex(baseUrl: string = 'https://yourdomain.com'): string {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemaps = [
    { loc: `${baseUrl}/sitemap-main.xml`, lastmod: today },
    { loc: `${baseUrl}/sitemap-types.xml`, lastmod: today },
    { loc: `${baseUrl}/sitemap-functions.xml`, lastmod: today },
    { loc: `${baseUrl}/sitemap-categories.xml`, lastmod: today },
  ];
  
  const sitemapEntries = sitemaps.map(sitemap => `  <sitemap>
    <loc>${escapeXML(sitemap.loc)}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(baseUrl: string = 'https://yourdomain.com'): string {
  return `# Robots.txt for MBTI Education Platform

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-types.xml
Sitemap: ${baseUrl}/sitemap-functions.xml

# Crawl-delay for specific bots
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /
`;
}

/**
 * Sitemap statistics
 */
export interface SitemapStats {
  totalURLs: number;
  byPriority: Record<string, number>;
  byChangeFreq: Record<string, number>;
  totalImages: number;
  estimatedSize: string;
}

/**
 * Calculate sitemap statistics
 */
export function calculateSitemapStats(urls: SitemapURL[]): SitemapStats {
  const byPriority: Record<string, number> = {};
  const byChangeFreq: Record<string, number> = {};
  let totalImages = 0;
  
  urls.forEach(url => {
    // Count by priority
    const priorityKey = url.priority.toString();
    byPriority[priorityKey] = (byPriority[priorityKey] || 0) + 1;
    
    // Count by change frequency
    byChangeFreq[url.changefreq] = (byChangeFreq[url.changefreq] || 0) + 1;
    
    // Count images
    if (url.images) {
      totalImages += url.images.length;
    }
  });
  
  const xml = generateSitemapXML(urls);
  const sizeInBytes = new Blob([xml]).size;
  const sizeInKB = (sizeInBytes / 1024).toFixed(2);
  
  return {
    totalURLs: urls.length,
    byPriority,
    byChangeFreq,
    totalImages,
    estimatedSize: `${sizeInKB} KB`,
  };
}

/**
 * Validate sitemap (check for common issues)
 */
export interface SitemapValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate sitemap data
 */
export function validateSitemap(urls: SitemapURL[]): SitemapValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check URL count (Google limit: 50,000 URLs per sitemap)
  if (urls.length > 50000) {
    errors.push(`Too many URLs: ${urls.length} (max: 50,000). Consider using sitemap index.`);
  }
  
  // Check for duplicate URLs
  const urlSet = new Set<string>();
  urls.forEach(url => {
    if (urlSet.has(url.loc)) {
      errors.push(`Duplicate URL found: ${url.loc}`);
    }
    urlSet.add(url.loc);
  });
  
  // Check priority values
  urls.forEach(url => {
    if (url.priority < 0 || url.priority > 1) {
      errors.push(`Invalid priority for ${url.loc}: ${url.priority} (must be 0-1)`);
    }
  });
  
  // Check lastmod format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  urls.forEach(url => {
    if (!dateRegex.test(url.lastmod)) {
      warnings.push(`Invalid date format for ${url.loc}: ${url.lastmod} (should be YYYY-MM-DD)`);
    }
  });
  
  // Check XML size (Google limit: 50MB uncompressed)
  const xml = generateSitemapXML(urls);
  const sizeInMB = new Blob([xml]).size / (1024 * 1024);
  if (sizeInMB > 50) {
    errors.push(`Sitemap too large: ${sizeInMB.toFixed(2)} MB (max: 50 MB)`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Generate sitemap for Next.js app
 */
export async function generateNextJSSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const urls = generateCompleteSitemap(baseUrl);
  
  return {
    xml: generateSitemapXML(urls),
    stats: calculateSitemapStats(urls),
    validation: validateSitemap(urls),
  };
}
