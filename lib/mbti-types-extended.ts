// Extended MBTI Types Data - Remaining 12 Types
import { MBTITypeData } from './mbti-data';

export const EXTENDED_MBTI_TYPES: Record<string, MBTITypeData> = {
  'INFJ': {
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
  },

  'INFP': {
    type: 'INFP',
    variant: 'INFP-A / INFP-T',
    nickname: 'The Mediator',
    description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    overview: 'INFPs adalah idealis yang gentle dengan strong personal values. Mereka driven oleh desire untuk make the world a better place dan help others find their authentic selves. INFPs sangat creative, empathetic, dan passionate tentang causes yang mereka believe in.',
    
    strengths: [
      'Deeply empathetic dan compassionate',
      'Creative dan imaginative',
      'Idealistic dengan strong values',
      'Open-minded dan flexible',
      'Passionate tentang causes',
      'Excellent dengan written expression',
      'Authentic dan genuine',
      'Supportive dan encouraging'
    ],
    
    weaknesses: [
      'Terlalu idealistic',
      'Overly sensitive terhadap criticism',
      'Difficulty dengan practical matters',
      'Procrastination',
      'Self-critical',
      'Conflict avoidance',
      'Difficulty making decisions',
      'Dapat terlalu private'
    ],
    
    careers: [
      'Writer / Poet',
      'Counselor / Therapist',
      'Graphic Designer',
      'Social Worker',
      'Teacher',
      'Musician / Artist',
      'Psychologist',
      'Non-profit Worker',
      'Librarian',
      'Photographer',
      'Human Rights Advocate',
      'Content Creator'
    ],
    
    cognitiveProfile: {
      dominant: {
        function: 'Fi (Introverted Feeling)',
        description: 'Nilai dan emosi internal yang mendalam',
        manifestation: 'INFPs memiliki rich inner emotional world dan strong sense of personal values. Mereka deeply authentic dan committed terhadap what they believe in.'
      },
      auxiliary: {
        function: 'Ne (Extraverted Intuition)',
        description: 'Eksplorasi possibilities',
        manifestation: 'Mereka excellent dalam seeing possibilities dan making creative connections. INFPs love exploring ideas dan imagining different scenarios.'
      },
      tertiary: {
        function: 'Si (Introverted Sensing)',
        description: 'Personal memories dan experiences',
        manifestation: 'INFPs menggunakan past experiences untuk inform values mereka, creating rich internal narratives.'
      },
      inferior: {
        function: 'Te (Extraverted Thinking)',
        description: 'External organization dan efficiency',
        manifestation: 'Ini adalah blind spot INFPs. Mereka bisa struggle dengan practical implementation dan organization. Dalam stress, mereka mungkin menjadi overly critical dan harsh.'
      }
    },
    
    communication: {
      style: 'Gentle, thoughtful, dan authentic. INFPs prefer meaningful conversations dan express themselves best through writing.',
      preferences: [
        'One-on-one deep conversations',
        'Written communication',
        'Discussions tentang values dan meaning',
        'Creative expression'
      ],
      strengths: [
        'Empathetic listening',
        'Beautiful written expression',
        'Authentic communication',
        'Non-judgmental approach'
      ],
      challenges: [
        'Difficulty dengan confrontation',
        'Overly indirect',
        'Struggle dengan small talk',
        'Can be too private'
      ]
    },
    
    relationships: {
      romantic: {
        strengths: [
          'Deeply romantic dan caring',
          'Loyal dan committed',
          'Supportive terhadap partner dreams',
          'Excellent emotional connection'
        ],
        challenges: [
          'Idealistic expectations',
          'Difficulty expressing needs directly',
          'Overly sensitive',
          'Conflict avoidance'
        ],
        idealPartners: ['ENFJ', 'ENTJ', 'INFJ', 'ENFP'],
        tips: [
          'Practice direct communication',
          'Set realistic expectations',
          'Address conflicts early',
          'Balance idealism dengan reality'
        ]
      },
      friendship: {
        approach: 'INFPs value deep, authentic friendships. Mereka loyal dan supportive, meskipun butuh alone time untuk recharge.',
        values: [
          'Authenticity',
          'Shared values',
          'Emotional depth',
          'Mutual support'
        ],
        tips: [
          'Be genuine dan authentic',
          'Respect their need untuk solitude',
          'Share meaningful conversations',
          'Support their creative pursuits'
        ]
      },
      workplace: {
        style: 'Collaborative, creative, dan values-driven. INFPs excel dalam roles yang align dengan personal values dan allow creative expression.',
        strengths: [
          'Creative problem-solving',
          'Empathy dalam team dynamics',
          'Dedication to meaningful work',
          'Flexibility dan adaptability'
        ],
        tips: [
          'Provide meaningful work',
          'Allow creative freedom',
          'Respect their values',
          'Give positive feedback'
        ]
      }
    },
    
    growth: {
      developDominant: [
        'Journaling untuk explore feelings',
        'Creative expression (art, music, writing)',
        'Clarify personal values',
        'Practice self-compassion'
      ],
      strengthenAuxiliary: [
        'Brainstorming exercises',
        'Explore new ideas dan perspectives',
        'Creative projects',
        'Learn new skills'
      ],
      balanceTertiary: [
        'Reflect on past experiences',
        'Create meaningful rituals',
        'Appreciate memories',
        'Learn from history'
      ],
      integrateInferior: [
        'Practice organization skills',
        'Set practical goals',
        'Develop time management',
        'Learn project management basics'
      ]
    },
    
    stressResponse: {
      triggers: [
        'Conflict dengan values',
        'Harsh criticism',
        'Lack of authenticity',
        'Overwhelming practical demands'
      ],
      symptoms: [
        'Withdrawal dan isolation',
        'Emotional overwhelm',
        'Harsh self-criticism (Te grip)',
        'Difficulty functioning'
      ],
      copingStrategies: [
        'Creative expression',
        'Alone time dalam nature',
        'Journaling',
        'Talk dengan trusted friend'
      ]
    },
    
    learningStyle: {
      preferences: [
        'Self-paced learning',
        'Creative approaches',
        'Connection to personal values',
        'Meaningful applications'
      ],
      strengths: [
        'Deep understanding',
        'Creative insights',
        'Self-motivated',
        'Passionate learner'
      ],
      tips: [
        'Show personal relevance',
        'Allow creative expression',
        'Provide flexibility',
        'Support individual pace'
      ]
    },
    
    decisionMaking: {
      approach: 'INFPs membuat keputusan berdasarkan personal values dan what feels right internally.',
      factors: [
        'Alignment dengan values',
        'Authenticity',
        'Impact on others',
        'Personal meaning'
      ],
      tips: [
        'Give time untuk reflection',
        'Discuss values dan meaning',
        'Avoid pressure',
        'Support their process'
      ]
    },
    
    famousPeople: [
      'William Shakespeare (Writer)',
      'J.R.R. Tolkien (Author)',
      'Johnny Depp (Actor)',
      'Audrey Hepburn (Actress)',
      'Princess Diana (Humanitarian)',
      'Kurt Cobain (Musician)',
      'Björk (Artist)',
      'Fred Rogers (TV Host)'
    ],
    
    funFacts: [
      'INFPs sekitar 4% dari populasi',
      'Mereka disebut "Healer" personality',
      'INFPs excellent writers dan poets',
      'Mereka memiliki rich fantasy life',
      'INFPs deeply value authenticity',
      'Mereka natural advocates untuk underdogs'
    ]
  }
};

// Note: Remaining 10 types (ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP) 
// will use fallback data from mbti-calculator.ts until fully implemented.

