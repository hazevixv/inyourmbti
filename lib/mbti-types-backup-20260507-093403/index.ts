// MBTI TYPES - MASTER INDEX
// Central export untuk all 16 personality types
// Total: 88,000+ kata of comprehensive content

import { PersonalityType, PersonalityCode } from './types';

// Import Analysts (NT)
import { INTJ_COMPLETE } from './analysts/intj-complete';
import { INTP_COMPLETE } from './analysts/intp-complete';
import { ENTJ_COMPLETE } from './analysts/entj-complete';
import { ENTP_COMPLETE } from './analysts/entp-complete';

// Import Diplomats (NF)
import { INFJ_COMPLETE } from './diplomats/infj-complete';
import { INFP_COMPLETE } from './diplomats/infp-complete';
import { ENFJ_COMPLETE } from './diplomats/enfj-complete';
import { ENFP_COMPLETE } from './diplomats/enfp-complete';

// Import Sentinels (SJ)
import { ISTJ_COMPLETE } from './sentinels/istj-complete';
import { ISFJ_COMPLETE } from './sentinels/isfj-complete';
import { ESTJ_COMPLETE } from './sentinels/estj-complete';
import { ESFJ_COMPLETE } from './sentinels/esfj-complete';

// Import Explorers (SP)
import { ISTP_COMPLETE } from './explorers/istp-complete';
import { ISFP_COMPLETE } from './explorers/isfp-complete';
import { ESTP_COMPLETE } from './explorers/estp-complete';
import { ESFP_COMPLETE } from './explorers/esfp-complete';

// Master Type Registry
export const ALL_PERSONALITY_TYPES: Record<PersonalityCode, PersonalityType> = {
  // Analysts (NT) - Strategic Thinkers
  INTJ: INTJ_COMPLETE,
  INTP: INTP_COMPLETE,
  ENTJ: ENTJ_COMPLETE,
  ENTP: ENTP_COMPLETE,
  
  // Diplomats (NF) - Empathetic Idealists
  INFJ: INFJ_COMPLETE,
  INFP: INFP_COMPLETE,
  ENFJ: ENFJ_COMPLETE,
  ENFP: ENFP_COMPLETE,
  
  // Sentinels (SJ) - Practical Organizers
  ISTJ: ISTJ_COMPLETE,
  ISFJ: ISFJ_COMPLETE,
  ESTJ: ESTJ_COMPLETE,
  ESFJ: ESFJ_COMPLETE,
  
  // Explorers (SP) - Spontaneous Adventurers
  ISTP: ISTP_COMPLETE,
  ISFP: ISFP_COMPLETE,
  ESTP: ESTP_COMPLETE,
  ESFP: ESFP_COMPLETE,
};

// Category Groupings
export const TYPES_BY_CATEGORY = {
  Analyst: {
    INTJ: INTJ_COMPLETE,
    INTP: INTP_COMPLETE,
    ENTJ: ENTJ_COMPLETE,
    ENTP: ENTP_COMPLETE,
  },
  Diplomat: {
    INFJ: INFJ_COMPLETE,
    INFP: INFP_COMPLETE,
    ENFJ: ENFJ_COMPLETE,
    ENFP: ENFP_COMPLETE,
  },
  Sentinel: {
    ISTJ: ISTJ_COMPLETE,
    ISFJ: ISFJ_COMPLETE,
    ESTJ: ESTJ_COMPLETE,
    ESFJ: ESFJ_COMPLETE,
  },
  Explorer: {
    ISTP: ISTP_COMPLETE,
    ISFP: ISFP_COMPLETE,
    ESTP: ESTP_COMPLETE,
    ESFP: ESFP_COMPLETE,
  },
} as const;

// Helper Functions

/**
 * Get personality type by code
 */
export function getPersonalityType(code: PersonalityCode): PersonalityType | undefined {
  return ALL_PERSONALITY_TYPES[code];
}

/**
 * Get all types in a category
 */
export function getTypesByCategory(category: 'Analyst' | 'Diplomat' | 'Sentinel' | 'Explorer') {
  return TYPES_BY_CATEGORY[category];
}

/**
 * Search types by keyword
 */
export function searchTypes(keyword: string): PersonalityType[] {
  const lowerKeyword = keyword.toLowerCase();
  return Object.values(ALL_PERSONALITY_TYPES).filter(type => 
    type.nickname.toLowerCase().includes(lowerKeyword) ||
    type.tagline.toLowerCase().includes(lowerKeyword) ||
    type.overview.toLowerCase().includes(lowerKeyword) ||
    type.code.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Get compatible types for a given type
 */
export function getCompatibleTypes(code: PersonalityCode): {
  best: PersonalityType[];
  good: PersonalityType[];
  challenging: PersonalityType[];
} {
  const type = getPersonalityType(code);
  if (!type) {
    return { best: [], good: [], challenging: [] };
  }
  
  return {
    best: type.compatibility.best
      .map(c => getPersonalityType(c as PersonalityCode))
      .filter((t): t is PersonalityType => t !== undefined),
    good: type.compatibility.good
      .map(c => getPersonalityType(c as PersonalityCode))
      .filter((t): t is PersonalityType => t !== undefined),
    challenging: type.compatibility.challenging
      .map(c => getPersonalityType(c as PersonalityCode))
      .filter((t): t is PersonalityType => t !== undefined),
  };
}

/**
 * Get types with same dominant function
 */
export function getTypesByDominantFunction(functionCode: string): PersonalityType[] {
  return Object.values(ALL_PERSONALITY_TYPES).filter(
    type => type.functionStack.dominant === functionCode
  );
}

/**
 * Get all type codes
 */
export function getAllTypeCodes(): PersonalityCode[] {
  return Object.keys(ALL_PERSONALITY_TYPES) as PersonalityCode[];
}

/**
 * Get type statistics
 */
export function getTypeStatistics() {
  const types = Object.values(ALL_PERSONALITY_TYPES);
  
  return {
    total: types.length,
    byCategory: {
      Analyst: Object.keys(TYPES_BY_CATEGORY.Analyst).length,
      Diplomat: Object.keys(TYPES_BY_CATEGORY.Diplomat).length,
      Sentinel: Object.keys(TYPES_BY_CATEGORY.Sentinel).length,
      Explorer: Object.keys(TYPES_BY_CATEGORY.Explorer).length,
    },
    totalWords: types.length * 5500, // Approximate
    averageStrengths: types.reduce((sum, t) => sum + t.strengths.length, 0) / types.length,
    averageWeaknesses: types.reduce((sum, t) => sum + t.weaknesses.length, 0) / types.length,
    averageCareers: types.reduce((sum, t) => sum + t.careerPaths.length, 0) / types.length,
  };
}

// Export types and interfaces
export * from './types';

// Export individual types for direct import
export {
  INTJ_COMPLETE,
  INTP_COMPLETE,
  ENTJ_COMPLETE,
  ENTP_COMPLETE,
  INFJ_COMPLETE,
  INFP_COMPLETE,
  ENFJ_COMPLETE,
  ENFP_COMPLETE,
  ISTJ_COMPLETE,
  ISFJ_COMPLETE,
  ESTJ_COMPLETE,
  ESFJ_COMPLETE,
  ISTP_COMPLETE,
  ISFP_COMPLETE,
  ESTP_COMPLETE,
  ESFP_COMPLETE,
};
