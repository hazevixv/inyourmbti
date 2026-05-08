import { NextRequest, NextResponse } from 'next/server';
import { trackEvent, getAnalytics, getStatistics } from '@/lib/database';
import { isRateLimited, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    if (isRateLimited(clientId, 30, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { id, eventType, eventData, userId } = body;

    if (!id || !eventType || !eventData) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    // Track event
    const event = await trackEvent({
      id,
      event_type: eventType,
      event_data: eventData,
      user_id: userId
    });

    return NextResponse.json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Gagal melacak event' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get('eventType') || undefined;
    const stats = searchParams.get('stats') === 'true';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Get statistics
    if (stats) {
      const statistics = await getStatistics();
      return NextResponse.json({
        success: true,
        statistics
      });
    }

    // Get analytics
    const analytics = await getAnalytics(
      eventType,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );

    return NextResponse.json({
      success: true,
      analytics
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil analytics' },
      { status: 500 }
    );
  }
}
