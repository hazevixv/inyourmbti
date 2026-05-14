"use client";

import React from 'react';
import type { MBTIResult } from '@/lib/mbti-calculator';
import { getMBTITypeData } from '@/lib/mbti-data';
import Image from 'next/image';

interface ResultPDFProps {
  result: MBTIResult | null;
  userGender: 'male' | 'female';
}

const ResultPDF: React.FC<ResultPDFProps> = ({ result, userGender }) => {
  if (!result) return null;

  const typeData = getMBTITypeData(result.type);
  const characterSrc = `/img/png-character/${result.type}-${userGender === 'female' ? 'Female' : 'Male'}.avif`;
  const summaryText = typeData?.description ?? typeData?.overview ?? '';

  return (
    <div id="pdf-content" className="p-10 bg-white" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{result.variant}</h1>
        <p className="text-2xl text-gray-600">{typeData?.nickname}</p>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-lg italic text-gray-700">"{summaryText}"</p>
      </div>

      <div className="my-8 flex justify-center">
        <Image src={characterSrc} alt={`${result.type} character`} width={250} height={375} style={{ objectFit: 'cover' }} />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Overview</h2>
      <p className="text-gray-700 leading-relaxed">{typeData?.overview}</p>

      <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mt-10 mb-4">Cognitive Function Stack</h2>
      <div className="space-y-4">
        <p><strong>Dominant:</strong> {result.dominantFunction} - {typeData?.cognitiveProfile?.dominant?.manifestation}</p>
        <p><strong>Auxiliary:</strong> {result.auxiliaryFunction} - {typeData?.cognitiveProfile?.auxiliary?.manifestation}</p>
        <p><strong>Tertiary:</strong> {result.tertiaryFunction} - {typeData?.cognitiveProfile?.tertiary?.manifestation}</p>
        <p><strong>Inferior:</strong> {result.inferiorFunction} - {typeData?.cognitiveProfile?.inferior?.manifestation}</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mt-10 mb-4">Strengths</h2>
      <ul className="list-disc list-inside space-y-2">
        {typeData?.strengths?.map((strength, index) => <li key={`strength-${index}`}>{strength}</li>)}
      </ul>
      
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mt-10 mb-4">Career Recommendations</h2>
      <ul className="list-disc list-inside grid grid-cols-2 gap-x-8">
        {typeData?.careers?.map((career, index) => <li key={`career-${index}`}>{career}</li>)}
      </ul>

      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>Generated from inyourmbti.com</p>
      </div>
    </div>
  );
};

export default ResultPDF;
