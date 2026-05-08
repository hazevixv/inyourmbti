import Groq from 'groq-sdk';

// Initialize Groq client
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Model configuration - 2 fallback models
export const GROQ_MODEL_LIGHT = 'llama-3.3-70b-versatile'; // Super hemat untuk queries ringan
export const GROQ_MODEL_COMPLEX = 'openai/gpt-oss-20b'; // Untuk reasoning kompleks
export const GROQ_MAX_TOKENS = 150; // SANGAT SINGKAT untuk hemat token
export const GROQ_TEMPERATURE = 0.7;

/**
 * Determine if query needs complex reasoning
 */
function needsComplexReasoning(message: string): boolean {
  const complexKeywords = [
    'mengapa', 'kenapa', 'jelaskan', 'analisis', 'bandingkan', 'perbedaan',
    'hubungan', 'karir', 'strategi', 'rencana', 'solusi', 'cara mengatasi',
    'bagaimana jika', 'apa yang harus', 'rekomendasi', 'saran detail'
  ];
  
  const lowerMessage = message.toLowerCase();
  return complexKeywords.some(keyword => lowerMessage.includes(keyword)) || message.length > 100;
}

/**
 * Generate AI response for MBTI chat
 */
/**
 * Generate AI response for MBTI chat with memory context
 */
export async function generateMBTIResponse(
  userMessage: string,
  mbtiType: string,
  functionScores: Record<string, number>,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [],
  memoryContext?: string
): Promise<string> {
  try {
    // Determine which model to use
    const useComplexModel = needsComplexReasoning(userMessage);
    const selectedModel = useComplexModel ? GROQ_MODEL_COMPLEX : GROQ_MODEL_LIGHT;
    
    // Check if this is a pre-test chat (no function scores)
    const isPreTest = !functionScores || Object.keys(functionScores).length === 0;
    
    // Build system prompt based on test status
    let systemPrompt: string;
    
    if (isPreTest || mbtiType === 'GENERAL') {
      // Pre-test system prompt with inyourmbti context
      systemPrompt = `Kamu psikolog MBTI profesional yang menenangkan dan empatik di platform inyourmbti.

TENTANG INYOURMBTI:
inyourmbti adalah platform tes kepribadian MBTI berbasis web yang menggunakan teori fungsi kognitif Grant/Brownsword. Platform ini menawarkan:
- Tes MBTI 96 pertanyaan yang mengukur 8 fungsi kognitif (Ni, Ne, Si, Se, Ti, Te, Fi, Fe)
- Hasil tipe MBTI + variant (contoh: INTJ-A, ENFP-T)
- Function stack analysis (Dominant, Auxiliary, Tertiary, Inferior)
- Analisis komprehensif: strengths, weaknesses, career paths, relationship insights
- Integrasi dengan Enneagram dan Love Languages
- 88,000+ kata konten edukatif tentang 16 tipe dan 8 fungsi kognitif
- AI Psychologist chat untuk insights personal
- Privacy-first: data tersimpan lokal dan database aman

CARA MERESPON:
- Jawab SANGAT SINGKAT (2-3 kalimat saja)
- SELALU merespon, JANGAN PERNAH bilang "maaf tidak bisa"
- Gunakan tone warm, calming, profesional
- Langsung to the point
- Berikan informasi umum tentang MBTI dan kepribadian
- Jika ditanya "apa itu inyourmbti", jelaskan dengan detail tapi tetap singkat
- Di akhir, encourage user untuk melakukan tes MBTI

Fokus: insight praktis, empati, actionable advice.`;
    } else {
      // Post-test system prompt with function scores and memory
      const sortedFunctions = Object.entries(functionScores).sort((a, b) => b[1] - a[1]);
      const dominantFunction = sortedFunctions[0] || ['Unknown', 0];
      const secondaryFunction = sortedFunctions[1] || ['Unknown', 0];
      
      systemPrompt = `Kamu psikolog MBTI profesional yang menenangkan dan empatik. User adalah ${mbtiType}.

PROFIL USER:
- Tipe: ${mbtiType}
- Fungsi dominan: ${dominantFunction[0]} (${dominantFunction[1]}%)
- Fungsi sekunder: ${secondaryFunction[0]} (${secondaryFunction[1]}%)
${memoryContext ? `- Context: ${memoryContext}` : ''}

CARA MERESPON:
- Jawab SANGAT SINGKAT (2-3 kalimat saja) untuk hemat token
- SELALU merespon dengan insight personal berdasarkan ${mbtiType}
- Gunakan fungsi kognitif untuk explain behavior patterns
- Reference previous conversations jika relevan
- Berikan actionable advice yang spesifik untuk ${mbtiType}
- Tone: warm, calming, profesional, seperti teman yang paham betul

JANGAN:
- Jangan bilang "maaf tidak bisa" atau "saya tidak tahu"
- Jangan terlalu panjang (max 3 kalimat)
- Jangan generic - HARUS personal untuk ${mbtiType}

Fokus: Deep insight, empati tinggi, actionable advice.`;
    }

    // Keep only last 6 messages to save tokens (summarized history)
    const recentHistory = conversationHistory.slice(-6);
    
    // Build messages array
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
      ...recentHistory,
      { role: 'user', content: userMessage },
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: selectedModel,
      messages,
      temperature: GROQ_TEMPERATURE,
      max_tokens: GROQ_MAX_TOKENS,
      top_p: 1,
      stream: false,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      // Fallback response based on test status
      if (isPreTest || mbtiType === 'GENERAL') {
        return `Saya siap membantu menjawab pertanyaanmu tentang MBTI dan kepribadian! Untuk diskusi yang lebih personal, yuk mulai tes MBTI sekarang.`;
      } else {
        const sortedFunctions = Object.entries(functionScores).sort((a, b) => b[1] - a[1]);
        const dominantFunction = sortedFunctions[0] || ['Unknown', 0];
        return `Sebagai ${mbtiType}, kamu memiliki kekuatan unik dalam ${dominantFunction[0]}. Apa yang ingin kamu explore lebih dalam?`;
      }
    }
    return response;
  } catch (error) {
    console.error('Groq API Error:', error);
    // Even on error, provide helpful response instead of generic error
    if (mbtiType === 'GENERAL') {
      return `Saya siap membantu menjawab pertanyaanmu tentang MBTI dan kepribadian! Untuk diskusi yang lebih personal, yuk mulai tes MBTI sekarang.`;
    }
    return `Sebagai ${mbtiType}, kamu punya perspektif unik. Coba tanyakan tentang kekuatan, karir, atau hubunganmu - saya siap membantu!`;
  }
}

/**
 * Generate streaming AI response for MBTI chat
 */
export async function* generateMBTIResponseStream(
  userMessage: string,
  mbtiType: string,
  functionScores: Record<string, number>,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): AsyncGenerator<string, void, unknown> {
  try {
    // Determine which model to use
    const useComplexModel = needsComplexReasoning(userMessage);
    const selectedModel = useComplexModel ? GROQ_MODEL_COMPLEX : GROQ_MODEL_LIGHT;
    
    // Build system prompt - SANGAT SINGKAT untuk hemat token
    const systemPrompt = `Kamu psikolog MBTI profesional yang menenangkan dan empatik. User adalah ${mbtiType}.

PENTING: Jawab SANGAT SINGKAT (2-3 kalimat saja). Langsung to the point. Gunakan tone yang warm, calming, dan profesional seperti psikolog berpengalaman.

Fungsi dominan: ${Object.entries(functionScores).sort((a, b) => b[1] - a[1])[0][0]} (${Object.entries(functionScores).sort((a, b) => b[1] - a[1])[0][1]}%)

Fokus: insight praktis, empati, dan actionable advice.`;

    // Keep only last 8 messages to save tokens
    const recentHistory = conversationHistory.slice(-8);

    // Build messages array
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
      ...recentHistory,
      { role: 'user', content: userMessage },
    ];

    // Call Groq API with streaming
    const stream = await groq.chat.completions.create({
      model: selectedModel,
      messages,
      temperature: GROQ_TEMPERATURE,
      max_tokens: GROQ_MAX_TOKENS,
      top_p: 1,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error('Groq API Streaming Error:', error);
    throw new Error('Gagal menghasilkan respons AI. Silakan coba lagi.');
  }
}
