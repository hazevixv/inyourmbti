import { NextRequest, NextResponse } from 'next/server';
import { generateMBTIResponse } from '@/lib/groq-client';
import { isRateLimited, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  let mbtiType = 'INTJ'; // Default fallback
  
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    if (isRateLimited(clientId, 10, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { 
      message, 
      mbtiType: requestMbtiType, 
      functionScores, 
      conversationHistory,
      memoryContext // New: memory context from frontend
    } = body;
    
    // Set mbtiType for use in catch block
    if (requestMbtiType && typeof requestMbtiType === 'string') {
      mbtiType = requestMbtiType;
    }

    // Validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Pesan tidak valid' },
        { status: 400 }
      );
    }

    // Handle pre-test chat (when mbtiType is 'GENERAL' or not provided)
    if (!requestMbtiType || requestMbtiType === 'GENERAL') {
      // Generate general MBTI response without specific type
      const response = await generateMBTIResponse(
        message,
        'GENERAL',
        {},
        conversationHistory || [],
        memoryContext
      );

      return NextResponse.json({
        success: true,
        reply: response,
      });
    }

    // Validate for post-test chat
    if (!functionScores || typeof functionScores !== 'object') {
      return NextResponse.json(
        { error: 'Skor fungsi kognitif tidak valid' },
        { status: 400 }
      );
    }

    // Generate AI response with specific MBTI type and memory context
    const response = await generateMBTIResponse(
      message,
      mbtiType,
      functionScores,
      conversationHistory || [],
      memoryContext
    );

    return NextResponse.json({
      success: true,
      reply: response,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Return helpful fallback
    const fallbackResponse = mbtiType === 'GENERAL' 
      ? `Saya siap membantu menjawab pertanyaanmu tentang kepribadian dan MBTI! Untuk diskusi yang lebih personal dan mendalam, saya sarankan kamu menyelesaikan tes MBTI terlebih dahulu. Apa yang ingin kamu tanyakan?`
      : `Sebagai ${mbtiType}, kamu punya perspektif unik. Tanyakan tentang kekuatan, karir, atau hubunganmu - saya siap membantu!`;
    
    return NextResponse.json({
      success: true,
      reply: fallbackResponse,
    });
  }
}
