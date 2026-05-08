import { MBTITypeData } from '../mbti-data';

export const INFJ_DATA: MBTITypeData = {
  type: 'INFJ',
  variant: 'INFJ-A / INFJ-T',
  nickname: 'The Advocate',
  description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
  overview: 'INFJs adalah idealis yang visioner dengan kemampuan luar biasa untuk memahami orang lain secara mendalam. Mereka memiliki intuisi yang kuat tentang motivasi dan emosi orang, combined dengan desire yang kuat untuk membantu orang mencapai potensi mereka. INFJs sangat empathetic, insightful, dan committed terhadap nilai-nilai mereka.',
  
  strengths: [
    'Empati dan pemahaman mendalam terhadap orang',
    'Visionary dan idealistic',
    'Kreatif dalam problem-solving',
    'Committed terhadap nilai-nilai',
    'Excellent listener',
    'Inspirational dan motivating',
    'Insightful tentang human nature',
    'Dedicated dan persistent'
  ],
  
  weaknesses: [
    'Perfeksionis yang ekstrem',
    'Terlalu sensitif terhadap kritik',
    'Burnout karena terlalu altruistic',
    'Kesulitan membuka diri',
    'Terlalu idealistic',
    'Kesulitan dengan konflik',
    'Overthinking',
    'Mengabaikan kebutuhan sendiri'
  ],
  
  careers: [
    'Psychologist / Counselor',
    'Social Worker',
    'HR Manager',
    'Life Coach',
    'Writer / Author',
    'Teacher / Professor',
    'Non-profit Director',
    'Healthcare Professional',
    'Therapist',
    'Religious Leader',
    'Artist / Designer',
    'Organizational Development'
  ],
  
  cognitiveProfile: {
    dominant: {
      function: 'Ni (Introverted Intuition)',
      description: 'Visi internal dan insight mendalam',
      manifestation: 'INFJs memiliki kemampuan luar biasa untuk melihat pola tersembunyi dalam human behavior dan mengantisipasi future outcomes. Mereka sering memiliki "knowing" yang sulit dijelaskan.'
    },
    auxiliary: {
      function: 'Fe (Extraverted Feeling)',
      description: 'Harmoni sosial dan empati',
      manifestation: 'Mereka sangat attuned terhadap emosi orang lain dan natural dalam menciptakan harmony. INFJs excellent dalam memahami dan memenuhi emotional needs orang lain.'
    },
    tertiary: {
      function: 'Ti (Introverted Thinking)',
      description: 'Logical analysis internal',
      manifestation: 'INFJs menggunakan logic untuk understand dan organize insights mereka, meskipun ini bukan fungsi dominan.'
    },
    inferior: {
      function: 'Se (Extraverted Sensing)',
      description: 'Present moment awareness',
      manifestation: 'Ini adalah blind spot INFJs. Mereka bisa mengabaikan physical needs dan present moment details. Dalam stress, mereka mungkin overindulge dalam sensory experiences.'
    }
  },
  
  communication: {
    style: 'Warm, empathetic, dan meaningful. INFJs prefer deep, authentic conversations over small talk.',
    preferences: [
      'One-on-one deep conversations',
      'Meaningful discussions tentang values dan ideas',
      'Written communication untuk express complex thoughts',
      'Active listening dan empathetic responses'
    ],
    strengths: [
      'Excellent listener yang empathetic',
      'Artikulasi ide kompleks dengan clarity',
      'Reading between the lines',
      'Creating safe space untuk vulnerability'
    ],
    challenges: [
      'Kesulitan dengan small talk',
      'Terlalu indirect untuk avoid conflict',
      'Overthinking responses',
      'Kesulitan expressing needs'
    ]
  },
  
  relationships: {
    romantic: {
      strengths: [
        'Deeply committed dan loyal',
        'Highly empathetic dan understanding',
        'Supportive terhadap partner growth',
        'Excellent emotional connection'
      ],
      challenges: [
        'Perfectionistic expectations',
        'Difficulty expressing needs',
        'Overthinking relationship issues',
        'Burnout dari giving too much'
      ],
      idealPartners: ['ENFP', 'ENTP', 'INTJ', 'INFP'],
      tips: [
        'Communicate needs clearly dan directly',
        'Set boundaries untuk self-care',
        'Accept imperfection dalam relationship',
        'Balance giving dengan receiving'
      ]
    },
    friendship: {
      approach: 'INFJs prefer few deep friendships over many superficial ones. Mereka sangat selective dan value authenticity.',
      values: [
        'Authenticity dan depth',
        'Mutual understanding',
        'Shared values dan ideals',
        'Emotional support'
      ],
      tips: [
        'Be authentic dan vulnerable',
        'Respect their need untuk alone time',
        'Engage dalam meaningful conversations',
        'Support their causes dan values'
      ]
    },
    workplace: {
      style: 'Collaborative, insightful, dan purpose-driven. INFJs excel dalam roles yang align dengan values mereka dan help others.',
      strengths: [
        'Understanding team dynamics',
        'Mediating conflicts',
        'Inspiring dan motivating others',
        'Strategic insight tentang people'
      ],
      tips: [
        'Provide meaningful work',
        'Respect their need untuk reflection',
        'Value their insights',
        'Support work-life balance'
      ]
    }
  },
  
  growth: {
    developDominant: [
      'Journaling untuk explore insights',
      'Meditation dan mindfulness',
      'Study psychology dan human behavior',
      'Trust your intuition'
    ],
    strengthenAuxiliary: [
      'Practice expressing emotions',
      'Develop conflict resolution skills',
      'Learn tentang emotional intelligence',
      'Engage dalam community service'
    ],
    balanceTertiary: [
      'Study logic dan critical thinking',
      'Practice analytical problem-solving',
      'Balance emotion dengan logic',
      'Develop decision-making frameworks'
    ],
    integrateInferior: [
      'Practice mindfulness',
      'Engage dalam physical activities',
      'Appreciate present moment',
      'Take care of physical needs'
    ]
  },
  
  stressResponse: {
    triggers: [
      'Conflict dan disharmony',
      'Criticism terhadap values',
      'Feeling misunderstood',
      'Overwhelming emotional demands'
    ],
    symptoms: [
      'Complete withdrawal',
      'Emotional exhaustion',
      'Physical indulgence (Se grip)',
      'Uncharacteristic impulsiveness'
    ],
    copingStrategies: [
      'Alone time untuk recharge',
      'Journaling',
      'Talk dengan trusted friend',
      'Creative expression'
    ]
  },
  
  learningStyle: {
    preferences: [
      'Conceptual understanding',
      'Connection to bigger picture',
      'Meaningful applications',
      'Independent study'
    ],
    strengths: [
      'Deep understanding',
      'Connecting concepts',
      'Insightful analysis',
      'Self-motivated'
    ],
    tips: [
      'Show real-world impact',
      'Allow time untuk reflection',
      'Provide meaningful context',
      'Support independent exploration'
    ]
  },
  
  decisionMaking: {
    approach: 'INFJs membuat keputusan berdasarkan values dan long-term vision, dengan consideration untuk impact terhadap orang lain.',
    factors: [
      'Alignment dengan values',
      'Impact terhadap others',
      'Long-term implications',
      'Intuitive insights'
    ],
    tips: [
      'Give time untuk reflection',
      'Discuss values dan meaning',
      'Consider emotional impact',
      'Respect their intuition'
    ]
  },
  
  famousPeople: [
    'Martin Luther King Jr. (Activist)',
    'Nelson Mandela (Leader)',
    'Mother Teresa (Humanitarian)',
    'Oprah Winfrey (Media Mogul)',
    'Carl Jung (Psychologist)',
    'Plato (Philosopher)',
    'Nicole Kidman (Actress)',
    'Lady Gaga (Artist)'
  ],
  
  funFacts: [
    'INFJs adalah tipe paling rare, hanya 1-2% populasi',
    'Mereka disebut "Counselor" personality',
    'INFJs sering memiliki "psychic" abilities (strong intuition)',
    'Mereka excellent dalam reading people',
    'INFJs natural writers dan artists',
    'Mereka memiliki rich inner world'
  ]
};
