// COGNITIVE FUNCTIONS LOADER
// This file properly loads all complete cognitive function data
// Using ES6 imports instead of require() for better Next.js compatibility

import type { CognitiveFunctionDetail } from './mbti-education';
import { COGNITIVE_FUNCTIONS as BASE_FUNCTIONS } from './mbti-education';
import { REMAINING_FUNCTIONS } from './mbti-functions-complete';
import { SE_COMPLETE } from './mbti-functions-se-complete';
import { FE_COMPLETE } from './mbti-functions-fe-complete';
import { FI_COMPLETE } from './mbti-functions-fi-complete';

// Merge all complete functions into one object
// IMPORTANT: Keys are case-sensitive! Use exact casing: 'Ne', 'Ni', 'Se', 'Si', 'Te', 'Ti', 'Fe', 'Fi'
export const ALL_COMPLETE_FUNCTIONS: Record<string, CognitiveFunctionDetail> = {
  // Ne and Ni are already complete in BASE_FUNCTIONS
  'Ne': BASE_FUNCTIONS['Ne'],
  'Ni': BASE_FUNCTIONS['Ni'],
  
  // Se, Fe, Fi from separate complete files
  'Se': SE_COMPLETE,
  'Fe': FE_COMPLETE,
  'Fi': FI_COMPLETE,
  
  // Si, Te, Ti from REMAINING_FUNCTIONS - merge with base
  'Si': { ...BASE_FUNCTIONS['Si'], ...REMAINING_FUNCTIONS['Si'] } as CognitiveFunctionDetail,
  'Te': { ...BASE_FUNCTIONS['Te'], ...REMAINING_FUNCTIONS['Te'] } as CognitiveFunctionDetail,
  'Ti': { ...BASE_FUNCTIONS['Ti'], ...REMAINING_FUNCTIONS['Ti'] } as CognitiveFunctionDetail,
};

// Helper function to normalize code (handles both 'fe' and 'Fe' and 'FE')
function normalizeCode(code: string): string {
  const upper = code.toUpperCase();
  // Convert 'FE' to 'Fe', 'NE' to 'Ne', etc.
  return upper.charAt(0) + upper.charAt(1).toLowerCase();
}

/**
 * Get complete cognitive function detail
 * This function returns the full, complete data for any cognitive function
 */
export function getCompleteFunctionDetail(code: string): CognitiveFunctionDetail | undefined {
  return ALL_COMPLETE_FUNCTIONS[normalizeCode(code)];
}

/**
 * Get all cognitive functions
 */
export function getAllFunctions(): CognitiveFunctionDetail[] {
  return Object.values(ALL_COMPLETE_FUNCTIONS);
}

/**
 * Check if a function code is valid
 */
export function isValidFunctionCode(code: string): boolean {
  return normalizeCode(code) in ALL_COMPLETE_FUNCTIONS;
}
