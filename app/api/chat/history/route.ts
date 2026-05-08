import { NextRequest, NextResponse } from 'next/server';
import { saveChatMessage, getChatHistory } from '@/lib/database';
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
    const { id, userId, mbtiType, role, content } = body;

    if (!id || !userId || !mbtiType || !role || !content) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    if (role !== 'user' && role !== 'assistant') {
      return NextResponse.json(
        { error: 'Role tidak valid' },
        { status: 400 }
      );
    }

    // Save chat message
    const message = await saveChatMessage({
      id,
      user_id: userId,
      mbti_type: mbtiType,
      role,
      content
    });

    return NextResponse.json({
      success: true,
      message
    });
  } catch (error) {
    console.error('Chat History API Error:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan pesan' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID diperlukan' },
        { status: 400 }
      );
    }

    const messages = await getChatHistory(userId, limit);

    return NextResponse.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Chat History API Error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil riwayat chat' },
      { status: 500 }
    );
  }
}
