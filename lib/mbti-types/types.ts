// MBTI PERSONALITY TYPES - TypeScript Interfaces
// Complete type definitions untuk all 16 types

import { CognitiveFunction } from '../questions';

export type PersonalityCategory = 'Analyst' | 'Diplomat' | 'Sentinel' | 'Explorer';
export type PersonalityCode = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'  // Analysts
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'  // Diplomats
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'  // Sentinels
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'; // Explorers

export interface StrengthItem {
  title: string;
  description: string;
}

export interface WeaknessItem {
  title: string;
  description: string;
}

export interface CareerItem {
  career: string;
  why: string;
}

export interface FamousPerson {
  name: string;
  description: string;
}

export interface Misunderstanding {
  myth: string;
  truth: string;
}

export interface FunctionStackAnalysis {
  dominant: string;
  auxiliary: string;
  tertiary: string;
  inferior: string;
}

export interface LifeStages {
  childhood: string;
  adolescence: string;
  youngAdult: string;
  middleAge: string;
  laterLife: string;
}

export interface Compatibility {
  best: string[];
  good: string[];
  challenging: string[];
  explanation: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
}

export interface PersonalityType {
  // Basic Info
  code: PersonalityCode;
  nickname: string;
  tagline: string;
  category: PersonalityCategory;
  
  // Function Stack
  functionStack: {
    dominant: CognitiveFunction;
    auxiliary: CognitiveFunction;
    tertiary: CognitiveFunction;
    inferior: CognitiveFunction;
  };
  
  // Core Content (~5,500 kata total)
  overview: string; // 300 kata
  deepDive: string; // 2,000 kata
  functionStackAnalysis: FunctionStackAnalysis; // 400 kata total
  
  // Characteristics
  strengths: StrengthItem[]; // 12 items
  weaknesses: WeaknessItem[]; // 12 items
  
  // Life Contexts
  inDailyLife: string[]; // 12 examples
  atWork: string[]; // 14 examples
  inRelationships: string[]; // 14 examples
  asFriend: string[]; // 10 characteristics
  asPartner: string[]; // 10 characteristics
  asParent: string[]; // 10 characteristics
  
  // States
  whenStressed: string[]; // 8 behaviors
  whenHealthy: string[]; // 8 behaviors
  
  // Development
  growthPath: string[]; // 12 tips
  commonMisunderstandings: Misunderstanding[]; // 6 items
  
  // Career & Examples
  careerPaths: CareerItem[]; // 20 careers
  famousExamples: FamousPerson[]; // 10 people
  
  // Relationships
  compatibility: Compatibility;
  
  // Life Journey
  lifeStages: LifeStages; // 750 kata total
  
  // Scientific Basis
  psychologicalBasis: string; // 300 kata
  
  // SEO
  seo: SEOMetadata;
}

// Category Groupings
export const PERSONALITY_CATEGORIES = {
  Analyst: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  Diplomat: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  Sentinel: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  Explorer: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
} as const;

// Category Descriptions
export const CATEGORY_DESCRIPTIONS = {
  Analyst: 'Pemikir strategis yang rasional dan inovatif',
  Diplomat: 'Idealis yang empatik dan diplomatik',
  Sentinel: 'Praktis, terorganisir, dan dapat diandalkan',
  Explorer: 'Spontan, energik, dan adaptif',
} as const;

// Helper type untuk ensure all types are covered
export type AllTypes = typeof PERSONALITY_CATEGORIES[keyof typeof PERSONALITY_CATEGORIES][number];
