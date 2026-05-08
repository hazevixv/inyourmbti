import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUser, updateUser } from '@/lib/database';
import { isRateLimited, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    if (isRateLimited(clientId, 20, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { userId, email, name, gender, age, phone, occupation, interests, selfMbtiType, enneagramType, cognitiveFunctionsFamiliarity, mbtiType } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID diperlukan' },
        { status: 400 }
      );
    }

    // Create or update user
    const user = await createUser({
      id: userId,
      email,
      name,
      gender,
      age: age ? parseInt(age) : undefined,
      phone,
      occupation,
      interests,
      self_mbti_type: selfMbtiType,
      enneagram_type: enneagramType,
      cognitive_functions_familiarity: cognitiveFunctionsFamiliarity,
      mbti_type: mbtiType
    });

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('User API Error:', error);
    return NextResponse.json(
      { error: 'Gagal memproses permintaan' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID diperlukan' },
        { status: 400 }
      );
    }

    const user = await getUser(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('User API Error:', error);
    return NextResponse.json(
      { error: 'Gagal memproses permintaan' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, name, gender, mbtiType } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID diperlukan' },
        { status: 400 }
      );
    }

    const user = await updateUser(userId, {
      email,
      name,
      gender,
      mbti_type: mbtiType
    });

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('User API Error:', error);
    return NextResponse.json(
      { error: 'Gagal memproses permintaan' },
      { status: 500 }
    );
  }
}
