import { generateRobotsTxt } from '@/lib/mbti-types/seo/sitemap-generator';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:2002';
  const txt = generateRobotsTxt(baseUrl);
  
  return new Response(txt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
