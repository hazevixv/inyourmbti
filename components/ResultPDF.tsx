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

  return (
    <div id="pdf-content" className="p-8">
      <h1 className="text-3xl font-bold">{result.variant} - {typeData?.nickname}</h1>
      <p className="text-xl">{typeData?.tagline}</p>
      <div className="my-4">
        <Image src={characterSrc} alt={`${result.type} character`} width={300} height={450} />
      </div>
      <h2 className="text-2xl font-bold mt-8">Overview</h2>
      <p>{typeData?.overview}</p>

      <h2 className="text-2xl font-bold mt-8">Cognitive Function Stack</h2>
      {/* Add more sections as needed */}
    </div>
  );
};

export default ResultPDF;
