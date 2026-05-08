import { NextRequest, NextResponse } from 'next/server';
import { saveTestResult, getTestResults, getLatestTestResult } from '@/lib/database';
import { isRateLimited, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    if (isRateLimited(clientId, 10, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      id,
      userId,
      mbtiType,
      variant,
      percentages,
      dominantFunction,
      auxiliaryFunction,
      tertiaryFunction,
      inferiorFunction,
      testDate
    } = body;

    // Validation
    if (!id || !userId || !mbtiType || !variant || !percentages) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    // Save test result
    const result = await saveTestResult({
      id,
      user_id: userId,
      mbti_type: mbtiType,
      variant,
      percentages,
      dominant_function: dominantFunction,
      auxiliary_function: auxiliaryFunction,
      tertiary_function: tertiaryFunction,
      inferior_function: inferiorFunction,
      test_date: testDate ? new Date(testDate) : new Date()
    });

    return NextResponse.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Results API Error:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan hasil test' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const latest = searchParams.get('latest') === 'true';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID diperlukan' },
        { status: 400 }
      );
    }

    if (latest) {
      const result = await getLatestTestResult(userId);
      return NextResponse.json({
        success: true,
        result
      });
    }

    const results = await getTestResults(userId);
    return NextResponse.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Results API Error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil hasil test' },
      { status: 500 }
    );
  }
}
