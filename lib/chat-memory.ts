/**
 * Chat Memory System - Smart & Token-Efficient
 * Manages user preferences, insights, and conversation context
 */

export interface UserMemory {
  // User Profile
  mbtiType?: string;
  functionScores?: Record<string, number>;
  dominantFunction?: string;
  
  // Preferences & Insights (learned from conversations)
  preferences: {
    communicationStyle?: 'direct' | 'detailed' | 'casual';
    topicsOfInterest?: string[]; // e.g., ['career', 'relationships', 'personal-growth']
    challenges?: string[]; // User's mentioned challenges
    goals?: string[]; // User's mentioned goals
  };
  
  // Key Insights (AI-generated summaries)
  insights: {
    strengths?: string[]; // Max 5 items
    weaknesses?: string[]; // Max 5 items
    patterns?: string[]; // Behavioral patterns noticed
    recommendations?: string[]; // Ongoing recommendations
  };
  
  // Conversation Metadata
  metadata: {
    totalMessages: number;
    lastUpdated: string;
    conversationTopics: string[]; // Recent topics discussed
  };
}

/**
 * Initialize empty memory
 */
export function initializeMemory(mbtiType?: string, functionScores?: Record<string, number>): UserMemory {
  return {
    mbtiType,
    functionScores,
    dominantFunction: functionScores 
      ? Object.entries(functionScores).sort((a, b) => b[1] - a[1])[0]?.[0]
      : undefined,
    preferences: {
      topicsOfInterest: [],
      challenges: [],
      goals: [],
    },
    insights: {
      strengths: [],
      weaknesses: [],
      patterns: [],
      recommendations: [],
    },
    metadata: {
      totalMessages: 0,
      lastUpdated: new Date().toISOString(),
      conversationTopics: [],
    },
  };
}

/**
 * Load memory from localStorage
 */
export function loadMemory(): UserMemory | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const saved = localStorage.getItem('user-memory');
    if (!saved) return null;
    
    const memory: UserMemory = JSON.parse(saved);
    return memory;
  } catch (error) {
    console.error('Error loading memory:', error);
    return null;
  }
}

/**
 * Save memory to localStorage
 */
export function saveMemory(memory: UserMemory): void {
  if (typeof window === 'undefined') return;
  
  try {
    memory.metadata.lastUpdated = new Date().toISOString();
    localStorage.setItem('user-memory', JSON.stringify(memory));
  } catch (error) {
    console.error('Error saving memory:', error);
  }
}

/**
 * Update memory with new conversation data
 */
export function updateMemory(
  memory: UserMemory,
  userMessage: string,
  aiResponse: string
): UserMemory {
  const updated = { ...memory };
  
  // Increment message count
  updated.metadata.totalMessages += 1;
  
  // Extract topics from conversation (simple keyword matching)
  const topicKeywords = {
    career: ['karir', 'pekerjaan', 'kerja', 'profesi', 'job'],
    relationships: ['hubungan', 'relationship', 'pasangan', 'teman', 'keluarga'],
    growth: ['berkembang', 'belajar', 'improve', 'growth', 'pengembangan'],
    strengths: ['kekuatan', 'strength', 'kelebihan', 'bagus', 'hebat'],
    weaknesses: ['kelemahan', 'weakness', 'kekurangan', 'sulit', 'struggle'],
    stress: ['stress', 'cemas', 'anxiety', 'tertekan', 'overwhelmed'],
  };
  
  const lowerMessage = userMessage.toLowerCase();
  const detectedTopics: string[] = [];
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      detectedTopics.push(topic);
    }
  }
  
  // Update conversation topics (keep last 10)
  if (detectedTopics.length > 0) {
    updated.metadata.conversationTopics = [
      ...detectedTopics,
      ...updated.metadata.conversationTopics,
    ].slice(0, 10);
  }
  
  // Extract goals (if user mentions "ingin", "mau", "goal", "target")
  if (lowerMessage.match(/ingin|mau|goal|target|pengen|wish/)) {
    const goalMatch = userMessage.match(/(?:ingin|mau|goal|target|pengen)\s+(.+?)(?:\.|$)/i);
    if (goalMatch && goalMatch[1]) {
      const goal = goalMatch[1].trim().slice(0, 100); // Max 100 chars
      if (!updated.preferences.goals?.includes(goal)) {
        updated.preferences.goals = [...(updated.preferences.goals || []), goal].slice(-5); // Keep last 5
      }
    }
  }
  
  // Extract challenges (if user mentions "sulit", "struggle", "masalah", "challenge")
  if (lowerMessage.match(/sulit|struggle|masalah|challenge|problem|susah/)) {
    const challengeMatch = userMessage.match(/(?:sulit|struggle|masalah|challenge|problem|susah)\s+(.+?)(?:\.|$)/i);
    if (challengeMatch && challengeMatch[1]) {
      const challenge = challengeMatch[1].trim().slice(0, 100); // Max 100 chars
      if (!updated.preferences.challenges?.includes(challenge)) {
        updated.preferences.challenges = [...(updated.preferences.challenges || []), challenge].slice(-5); // Keep last 5
      }
    }
  }
  
  return updated;
}

/**
 * Generate memory context for AI (token-efficient)
 */
export function generateMemoryContext(memory: UserMemory): string {
  const parts: string[] = [];
  
  // MBTI Info (if available)
  if (memory.mbtiType) {
    parts.push(`Tipe: ${memory.mbtiType}`);
    if (memory.dominantFunction) {
      parts.push(`Fungsi dominan: ${memory.dominantFunction}`);
    }
  }
  
  // Recent topics
  if (memory.metadata.conversationTopics.length > 0) {
    const topics = memory.metadata.conversationTopics.slice(0, 3).join(', ');
    parts.push(`Topik diskusi: ${topics}`);
  }
  
  // Goals (if any)
  if (memory.preferences.goals && memory.preferences.goals.length > 0) {
    const goals = memory.preferences.goals.slice(0, 2).join('; ');
    parts.push(`Goals: ${goals}`);
  }
  
  // Challenges (if any)
  if (memory.preferences.challenges && memory.preferences.challenges.length > 0) {
    const challenges = memory.preferences.challenges.slice(0, 2).join('; ');
    parts.push(`Challenges: ${challenges}`);
  }
  
  // Insights (if any)
  if (memory.insights.patterns && memory.insights.patterns.length > 0) {
    const patterns = memory.insights.patterns.slice(0, 2).join('; ');
    parts.push(`Patterns: ${patterns}`);
  }
  
  // Total messages (for context)
  parts.push(`Total chat: ${memory.metadata.totalMessages} pesan`);
  
  return parts.join(' | ');
}

/**
 * Summarize conversation history (for token efficiency)
 * Keep only essential messages
 */
export function summarizeHistory(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  maxMessages: number = 6
): Array<{ role: 'user' | 'assistant'; content: string }> {
  if (messages.length <= maxMessages) {
    return messages;
  }
  
  // Strategy: Keep first message (welcome) + last N messages
  const firstMessage = messages[0];
  const recentMessages = messages.slice(-maxMessages + 1);
  
  return [firstMessage, ...recentMessages];
}

/**
 * Clear memory (for reset)
 */
export function clearMemory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('user-memory');
  } catch (error) {
    console.error('Error clearing memory:', error);
  }
}
