// Comprehensive MBTI Compatibility System

export interface CompatibilityScore {
  score: number; // 0-100
  category: 'Excellent' | 'Good' | 'Fair' | 'Challenging';
  description: string;
  strengths: string[];
  challenges: string[];
  tips: string[];
}

export interface DetailedCompatibility {
  romantic: CompatibilityScore;
  friendship: CompatibilityScore;
  work: CompatibilityScore;
  overall: CompatibilityScore;
}

// Compatibility matrix based on cognitive functions
const COMPATIBILITY_MATRIX: Record<string, Record<string, number>> = {
  'INTJ': {
    'ENFP': 95, 'ENTP': 90, 'INFJ': 85, 'ENTJ': 80, 'INTP': 75,
    'INFP': 70, 'ENFJ': 65, 'INTJ': 60, 'ISTJ': 55, 'ISTP': 50,
    'ISFJ': 45, 'ESTJ': 40, 'ESFJ': 35, 'ISFP': 30, 'ESTP': 25, 'ESFP': 20
  },
  'INTP': {
    'ENFJ': 95, 'ENTJ': 90, 'INFJ': 85, 'ENTP': 80, 'INTJ': 75,
    'INFP': 70, 'ENFP': 65, 'INTP': 60, 'ISTP': 55, 'ISTJ': 50,
    'ISFP': 45, 'ESTP': 40, 'ESFP': 35, 'ISFJ': 30, 'ESTJ': 25, 'ESFJ': 20
  },
  'ENTJ': {
    'INFP': 95, 'INTP': 90, 'INTJ': 85, 'ENFP': 80, 'ENTP': 75,
    'INFJ': 70, 'ENFJ': 65, 'ENTJ': 60, 'ESTJ': 55, 'ESTP': 50,
    'ISTJ': 45, 'ISTP': 40, 'ISFJ': 35, 'ESFJ': 30, 'ISFP': 25, 'ESFP': 20
  },
  'ENTP': {
    'INFJ': 95, 'INTJ': 90, 'ENFJ': 85, 'INTP': 80, 'ENTJ': 75,
    'INFP': 70, 'ENFP': 65, 'ENTP': 60, 'ESTP': 55, 'ISTP': 50,
    'ESTJ': 45, 'ISTJ': 40, 'ESFJ': 35, 'ISFJ': 30, 'ISFP': 25, 'ESFP': 20
  },
  'INFJ': {
    'ENFP': 95, 'ENTP': 90, 'INTJ': 85, 'INFP': 80, 'ENFJ': 75,
    'INTP': 70, 'ENTJ': 65, 'INFJ': 60, 'ISFJ': 55, 'ISFP': 50,
    'ISTJ': 45, 'ISTP': 40, 'ESTJ': 35, 'ESTP': 30, 'ESFJ': 25, 'ESFP': 20
  },
  'INFP': {
    'ENFJ': 95, 'ENTJ': 90, 'INFJ': 85, 'ENFP': 80, 'INTP': 75,
    'INTJ': 70, 'ENTP': 65, 'INFP': 60, 'ISFP': 55, 'ISFJ': 50,
    'ISTP': 45, 'ISTJ': 40, 'ESTP': 35, 'ESTJ': 30, 'ESFP': 25, 'ESFJ': 20
  },
  'ENFJ': {
    'INFP': 95, 'ISFP': 90, 'INTP': 85, 'INFJ': 80, 'ENFP': 75,
    'INTJ': 70, 'ENTP': 65, 'ENFJ': 60, 'ESFJ': 55, 'ISFJ': 50,
    'ESTJ': 45, 'ISTJ': 40, 'ESTP': 35, 'ISTP': 30, 'ESFP': 25, 'ENTJ': 20
  },
  'ENFP': {
    'INTJ': 95, 'INFJ': 90, 'ENTJ': 85, 'INFP': 80, 'ENTP': 75,
    'INTP': 70, 'ENFJ': 65, 'ENFP': 60, 'ESFP': 55, 'ISFP': 50,
    'ESFJ': 45, 'ISFJ': 40, 'ESTJ': 35, 'ISTJ': 30, 'ESTP': 25, 'ISTP': 20
  },
  'ISTJ': {
    'ESFP': 95, 'ESTP': 90, 'ISFJ': 85, 'ESTJ': 80, 'ISTP': 75,
    'ISFP': 70, 'ESFJ': 65, 'ISTJ': 60, 'INTJ': 55, 'ENTJ': 50,
    'INTP': 45, 'ENTP': 40, 'INFJ': 35, 'ENFJ': 30, 'INFP': 25, 'ENFP': 20
  },
  'ISFJ': {
    'ESFP': 95, 'ESTP': 90, 'ISTJ': 85, 'ESFJ': 80, 'ISFP': 75,
    'ISTP': 70, 'ESTJ': 65, 'ISFJ': 60, 'INFJ': 55, 'ENFJ': 50,
    'INFP': 45, 'ENFP': 40, 'INTJ': 35, 'ENTJ': 30, 'INTP': 25, 'ENTP': 20
  },
  'ESTJ': {
    'ISTP': 95, 'ISFP': 90, 'ISTJ': 85, 'ESFJ': 80, 'ESTP': 75,
    'ISFJ': 70, 'ESTJ': 65, 'ESFP': 60, 'ENTJ': 55, 'INTJ': 50,
    'ENTP': 45, 'INTP': 40, 'ENFJ': 35, 'INFJ': 30, 'ENFP': 25, 'INFP': 20
  },
  'ESFJ': {
    'ISFP': 95, 'ISTP': 90, 'ISTJ': 85, 'ESTJ': 80, 'ISFJ': 75,
    'ESFP': 70, 'ESTP': 65, 'ESFJ': 60, 'ENFJ': 55, 'INFJ': 50,
    'ENFP': 45, 'INFP': 40, 'ENTJ': 35, 'INTJ': 30, 'ENTP': 25, 'INTP': 20
  },
  'ISTP': {
    'ESFJ': 95, 'ESTJ': 90, 'ISFP': 85, 'ESTP': 80, 'ISTJ': 75,
    'ISFJ': 70, 'ESFP': 65, 'ISTP': 60, 'INTP': 55, 'ENTP': 50,
    'INTJ': 45, 'ENTJ': 40, 'INFP': 35, 'ENFP': 30, 'INFJ': 25, 'ENFJ': 20
  },
  'ISFP': {
    'ESFJ': 95, 'ESTJ': 90, 'ISTP': 85, 'ESFP': 80, 'ISFJ': 75,
    'ISTJ': 70, 'ESTP': 65, 'ISFP': 60, 'INFP': 55, 'ENFP': 50,
    'INFJ': 45, 'ENFJ': 40, 'INTP': 35, 'ENTP': 30, 'INTJ': 25, 'ENTJ': 20
  },
  'ESTP': {
    'ISFJ': 95, 'ISTJ': 90, 'ISTP': 85, 'ESFP': 80, 'ESTJ': 75,
    'ISFP': 70, 'ESFJ': 65, 'ESTP': 60, 'ENTP': 55, 'INTP': 50,
    'ENTJ': 45, 'INTJ': 40, 'ENFP': 35, 'INFP': 30, 'ENFJ': 25, 'INFJ': 20
  },
  'ESFP': {
    'ISFJ': 95, 'ISTJ': 90, 'ISFP': 85, 'ESTP': 80, 'ESFJ': 75,
    'ISTP': 70, 'ESTJ': 65, 'ESFP': 60, 'ENFP': 55, 'INFP': 50,
    'ENFJ': 45, 'INFJ': 40, 'ENTP': 35, 'INTP': 30, 'ENTJ': 25, 'INTJ': 20
  }
};

export function getCompatibility(type1: string, type2: string): DetailedCompatibility {
  const score = COMPATIBILITY_MATRIX[type1.toUpperCase()]?.[type2.toUpperCase()] || 50;
  
  const category: CompatibilityScore['category'] = 
    score >= 80 ? 'Excellent' :
    score >= 60 ? 'Good' :
    score >= 40 ? 'Fair' : 'Challenging';
  
  const romanticScore: CompatibilityScore = {
    score,
    category,
    description: getCompatibilityDescription(type1, type2, 'romantic', score),
    strengths: getCompatibilityStrengths(type1, type2, 'romantic'),
    challenges: getCompatibilityChallenges(type1, type2, 'romantic'),
    tips: getCompatibilityTips(type1, type2, 'romantic')
  };
  
  const friendshipScore: CompatibilityScore = {
    score: Math.min(score + 10, 100),
    category,
    description: getCompatibilityDescription(type1, type2, 'friendship', score),
    strengths: getCompatibilityStrengths(type1, type2, 'friendship'),
    challenges: getCompatibilityChallenges(type1, type2, 'friendship'),
    tips: getCompatibilityTips(type1, type2, 'friendship')
  };
  
  const workScore: CompatibilityScore = {
    score: Math.min(score + 5, 100),
    category,
    description: getCompatibilityDescription(type1, type2, 'work', score),
    strengths: getCompatibilityStrengths(type1, type2, 'work'),
    challenges: getCompatibilityChallenges(type1, type2, 'work'),
    tips: getCompatibilityTips(type1, type2, 'work')
  };
  
  const overallScore: CompatibilityScore = {
    score,
    category,
    description: `Overall compatibility antara ${type1} dan ${type2} adalah ${category.toLowerCase()}.`,
    strengths: [...new Set([...romanticScore.strengths, ...friendshipScore.strengths, ...workScore.strengths])],
    challenges: [...new Set([...romanticScore.challenges, ...friendshipScore.challenges, ...workScore.challenges])],
    tips: [...new Set([...romanticScore.tips, ...friendshipScore.tips, ...workScore.tips])]
  };
  
  return {
    romantic: romanticScore,
    friendship: friendshipScore,
    work: workScore,
    overall: overallScore
  };
}

function getCompatibilityDescription(type1: string, type2: string, context: string, score: number): string {
  if (score >= 80) {
    return `${type1} dan ${type2} memiliki chemistry yang excellent dalam ${context}. Cognitive functions mereka complement each other dengan baik.`;
  } else if (score >= 60) {
    return `${type1} dan ${type2} memiliki potential yang good untuk ${context}. Dengan effort dan understanding, relationship ini bisa sangat rewarding.`;
  } else if (score >= 40) {
    return `${type1} dan ${type2} memiliki fair compatibility dalam ${context}. Butuh extra effort untuk understand differences, tapi bisa work dengan commitment.`;
  } else {
    return `${type1} dan ${type2} memiliki challenging compatibility dalam ${context}. Significant differences dalam approach, tapi growth potential sangat besar.`;
  }
}

function getCompatibilityStrengths(type1: string, type2: string, context: string): string[] {
  // Simplified - in production, this would be more detailed based on cognitive functions
  return [
    'Mutual respect untuk differences',
    'Opportunity untuk growth',
    'Complementary perspectives',
    'Balanced dynamic'
  ];
}

function getCompatibilityChallenges(type1: string, type2: string, context: string): string[] {
  return [
    'Different communication styles',
    'Varying needs untuk social interaction',
    'Different decision-making approaches',
    'Potential misunderstandings'
  ];
}

function getCompatibilityTips(type1: string, type2: string, context: string): string[] {
  return [
    'Communicate openly tentang needs dan expectations',
    'Appreciate dan learn dari differences',
    'Find common ground dan shared values',
    'Be patient dan understanding',
    'Celebrate each other\'s strengths'
  ];
}

export function getTopCompatibleTypes(mbtiType: string, limit: number = 5): Array<{type: string; score: number}> {
  // Normalize: remove variant suffix and convert to uppercase
  const normalizedType = mbtiType.split('-')[0].toUpperCase().trim();
  const scores = COMPATIBILITY_MATRIX[normalizedType] || {};
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([type, score]) => ({ type, score }));
}
