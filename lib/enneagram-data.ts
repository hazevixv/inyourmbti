// Enneagram Integration with MBTI
// This shows how MBTI types commonly correlate with Enneagram types

export interface EnneagramType {
  type: number;
  wing?: string;
  name: string;
  description: string;
  coreMotivation: string;
  coreFear: string;
  strengths: string[];
  weaknesses: string[];
}

export const MBTI_TO_ENNEAGRAM: Record<string, number[]> = {
  'INTJ': [5, 1, 8], // Most common Enneagram types for INTJ
  'INTP': [5, 9, 4],
  'ENTJ': [8, 3, 1],
  'ENTP': [7, 3, 8],
  'INFJ': [4, 1, 9],
  'INFP': [4, 9, 2],
  'ENFJ': [2, 3, 1],
  'ENFP': [7, 4, 2],
  'ISTJ': [1, 6, 5],
  'ISFJ': [2, 6, 9],
  'ESTJ': [8, 1, 3],
  'ESFJ': [2, 3, 6],
  'ISTP': [9, 5, 8],
  'ISFP': [9, 4, 6],
  'ESTP': [8, 7, 3],
  'ESFP': [7, 2, 3],
};

export const ENNEAGRAM_TYPES: Record<number, EnneagramType> = {
  1: {
    type: 1,
    name: 'The Reformer',
    description: 'Principled, purposeful, self-controlled, and perfectionistic.',
    coreMotivation: 'To be good, balanced, and have integrity',
    coreFear: 'Being corrupt, evil, or defective',
    strengths: ['Integrity', 'Responsibility', 'Improvement-oriented', 'Ethical'],
    weaknesses: ['Perfectionism', 'Resentment', 'Impatience', 'Self-criticism']
  },
  2: {
    type: 2,
    name: 'The Helper',
    description: 'Generous, demonstrative, people-pleasing, and possessive.',
    coreMotivation: 'To be loved and appreciated',
    coreFear: 'Being unwanted or unworthy of love',
    strengths: ['Empathy', 'Generosity', 'Warmth', 'Supportiveness'],
    weaknesses: ['People-pleasing', 'Possessiveness', 'Manipulation', 'Martyrdom']
  },
  3: {
    type: 3,
    name: 'The Achiever',
    description: 'Adaptable, excelling, driven, and image-conscious.',
    coreMotivation: 'To be valuable and worthwhile',
    coreFear: 'Being worthless or without value',
    strengths: ['Ambition', 'Efficiency', 'Confidence', 'Adaptability'],
    weaknesses: ['Workaholism', 'Image-consciousness', 'Competitiveness', 'Inauthenticity']
  },
  4: {
    type: 4,
    name: 'The Individualist',
    description: 'Expressive, dramatic, self-absorbed, and temperamental.',
    coreMotivation: 'To be unique and authentic',
    coreFear: 'Having no identity or significance',
    strengths: ['Creativity', 'Authenticity', 'Emotional depth', 'Empathy'],
    weaknesses: ['Moodiness', 'Self-absorption', 'Envy', 'Melancholy']
  },
  5: {
    type: 5,
    name: 'The Investigator',
    description: 'Perceptive, innovative, secretive, and isolated.',
    coreMotivation: 'To be capable and competent',
    coreFear: 'Being useless, helpless, or incompetent',
    strengths: ['Knowledge', 'Independence', 'Innovation', 'Objectivity'],
    weaknesses: ['Detachment', 'Isolation', 'Eccentricity', 'Stinginess']
  },
  6: {
    type: 6,
    name: 'The Loyalist',
    description: 'Engaging, responsible, anxious, and suspicious.',
    coreMotivation: 'To have security and support',
    coreFear: 'Being without support or guidance',
    strengths: ['Loyalty', 'Responsibility', 'Commitment', 'Preparedness'],
    weaknesses: ['Anxiety', 'Suspicion', 'Indecisiveness', 'Defensiveness']
  },
  7: {
    type: 7,
    name: 'The Enthusiast',
    description: 'Spontaneous, versatile, acquisitive, and scattered.',
    coreMotivation: 'To be satisfied and content',
    coreFear: 'Being deprived or in pain',
    strengths: ['Optimism', 'Enthusiasm', 'Versatility', 'Spontaneity'],
    weaknesses: ['Impulsiveness', 'Superficiality', 'Impatience', 'Escapism']
  },
  8: {
    type: 8,
    name: 'The Challenger',
    description: 'Self-confident, decisive, willful, and confrontational.',
    coreMotivation: 'To be self-reliant and strong',
    coreFear: 'Being harmed or controlled by others',
    strengths: ['Confidence', 'Decisiveness', 'Leadership', 'Protectiveness'],
    weaknesses: ['Domination', 'Insensitivity', 'Confrontation', 'Vengefulness']
  },
  9: {
    type: 9,
    name: 'The Peacemaker',
    description: 'Receptive, reassuring, complacent, and resigned.',
    coreMotivation: 'To have inner stability and peace',
    coreFear: 'Loss and separation',
    strengths: ['Peacemaking', 'Acceptance', 'Patience', 'Receptiveness'],
    weaknesses: ['Complacency', 'Stubbornness', 'Passivity', 'Avoidance']
  }
};

export function getEnneagramForMBTI(mbtiType: string): EnneagramType[] {
  // Normalize: remove variant suffix and convert to uppercase
  const normalizedType = mbtiType.split('-')[0].toUpperCase().trim();
  const enneagramNumbers = MBTI_TO_ENNEAGRAM[normalizedType] || [];
  return enneagramNumbers.map(num => ENNEAGRAM_TYPES[num]).filter(Boolean);
}
