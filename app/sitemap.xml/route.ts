import { generateNextJSSitemap } from '@/lib/mbti-types/seo/sitemap-generator';

export async function GET() {
  try {
    const { xml } = await generateNextJSSitemap();
    
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
