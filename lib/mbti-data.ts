// Comprehensive MBTI Type Data
export interface MBTITypeData {
  type: string;
  variant: string;
  nickname: string;
  description: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  
  // Detailed sections
  cognitiveProfile: {
    dominant: { function: string; description: string; manifestation: string };
    auxiliary: { function: string; description: string; manifestation: string };
    tertiary: { function: string; description: string; manifestation: string };
    inferior: { function: string; description: string; manifestation: string };
  };
  
  communication: {
    style: string;
    preferences: string[];
    strengths: string[];
    challenges: string[];
  };
  
  relationships: {
    romantic: {
      strengths: string[];
      challenges: string[];
      idealPartners: string[];
      tips: string[];
    };
    friendship: {
      approach: string;
      values: string[];
      tips: string[];
    };
    workplace: {
      style: string;
      strengths: string[];
      tips: string[];
    };
  };
  
  growth: {
    developDominant: string[];
    strengthenAuxiliary: string[];
    balanceTertiary: string[];
    integrateInferior: string[];
  };
  
  stressResponse: {
    triggers: string[];
    symptoms: string[];
    copingStrategies: string[];
  };
  
  learningStyle: {
    preferences: string[];
    strengths: string[];
    tips: string[];
  };
  
  decisionMaking: {
    approach: string;
    factors: string[];
    tips: string[];
  };
  
  famousPeople: string[];
  
  funFacts: string[];
}

export const MBTI_TYPE_DATABASE: Record<string, MBTITypeData> = {
  'INTJ': {
    type: 'INTJ',
    variant: 'INTJ-A / INTJ-T',
    nickname: 'The Architect',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    overview: 'INTJs adalah pemikir strategis yang visioner dengan kemampuan analitis yang kuat. Mereka memiliki visi jangka panjang yang jelas dan kemampuan luar biasa untuk mengubah teori menjadi rencana aksi yang solid. INTJs sangat independen, percaya diri, dan selalu mencari cara untuk meningkatkan sistem dan proses.',
    
    strengths: [
      'Pemikiran strategis dan visioner',
      'Kemampuan analitis yang sangat kuat',
      'Independen dan self-motivated',
      'Percaya diri dalam keputusan',
      'Fokus pada efisiensi dan peningkatan',
      'Kemampuan problem-solving yang excellent',
      'Komitmen tinggi terhadap tujuan',
      'Objektif dan rasional'
    ],
    
    weaknesses: [
      'Terlalu kritis terhadap diri sendiri dan orang lain',
      'Kesulitan mengekspresikan emosi',
      'Cenderung perfeksionis',
      'Kurang sabar dengan ketidakefisienan',
      'Bisa terlihat arogan atau dismissive',
      'Kesulitan dengan small talk',
      'Terlalu fokus pada big picture, mengabaikan detail',
      'Resisten terhadap aturan yang tidak masuk akal'
    ],
    
    careers: [
      'Software Architect',
      'Data Scientist',
      'Strategic Consultant',
      'Investment Banker',
      'Research Scientist',
      'Systems Analyst',
      'Chief Technology Officer',
      'University Professor',
      'Medical Researcher',
      'Financial Analyst',
      'Management Consultant',
      'Aerospace Engineer'
    ],
    
    cognitiveProfile: {
      dominant: {
        function: 'Ni (Introverted Intuition)',
        description: 'Visi internal dan pemahaman pola mendalam',
        manifestation: 'INTJs memiliki kemampuan luar biasa untuk melihat pola tersembunyi dan memahami implikasi jangka panjang. Mereka sering memiliki "aha moments" dan insight mendalam tentang bagaimana segala sesuatu akan berkembang.'
      },
      auxiliary: {
        function: 'Te (Extraverted Thinking)',
        description: 'Organisasi eksternal dan efisiensi sistem',
        manifestation: 'Mereka menggunakan logika objektif untuk mengimplementasikan visi mereka. INTJs excellent dalam membuat sistem, struktur, dan rencana yang efisien untuk mencapai tujuan.'
      },
      tertiary: {
        function: 'Fi (Introverted Feeling)',
        description: 'Nilai dan prinsip personal',
        manifestation: 'Meskipun tidak dominan, INTJs memiliki sistem nilai internal yang kuat. Mereka sangat berkomitmen pada prinsip-prinsip yang mereka yakini, meskipun jarang mengekspresikannya secara terbuka.'
      },
      inferior: {
        function: 'Se (Extraverted Sensing)',
        description: 'Kesadaran sensorik eksternal',
        manifestation: 'Ini adalah blind spot INTJs. Mereka bisa mengabaikan detail fisik, kebutuhan tubuh, atau pengalaman sensorik saat ini. Dalam stress, mereka mungkin overindulge dalam aktivitas fisik atau sensory experiences.'
      }
    },
    
    communication: {
      style: 'Direct, logical, dan to-the-point. INTJs menghargai efisiensi dalam komunikasi dan lebih suka diskusi yang substantif daripada small talk.',
      preferences: [
        'Diskusi mendalam tentang ide dan konsep',
        'Komunikasi tertulis yang terstruktur',
        'Debat intelektual yang konstruktif',
        'Presentasi data dan fakta yang jelas'
      ],
      strengths: [
        'Artikulasi ide kompleks dengan jelas',
        'Kemampuan menjelaskan strategi dan visi',
        'Komunikasi yang efisien dan langsung',
        'Excellent dalam presentasi formal'
      ],
      challenges: [
        'Kesulitan dengan small talk dan chitchat',
        'Bisa terdengar terlalu blunt atau kritis',
        'Kurang ekspresif secara emosional',
        'Impatient dengan diskusi yang tidak produktif'
      ]
    },
    
    relationships: {
      romantic: {
        strengths: [
          'Komitmen jangka panjang yang kuat',
          'Loyal dan dapat diandalkan',
          'Mendukung pertumbuhan partner',
          'Excellent dalam problem-solving bersama'
        ],
        challenges: [
          'Kesulitan mengekspresikan perasaan',
          'Terlalu fokus pada logika dalam konflik',
          'Butuh banyak alone time',
          'Ekspektasi yang sangat tinggi'
        ],
        idealPartners: ['ENFP', 'ENTP', 'INFJ', 'ENTJ'],
        tips: [
          'Praktikkan mengekspresikan apresiasi secara verbal',
          'Buat waktu quality time yang terstruktur',
          'Dengarkan emosi partner tanpa langsung problem-solving',
          'Komunikasikan kebutuhan akan alone time dengan jelas'
        ]
      },
      friendship: {
        approach: 'INTJs selektif dalam memilih teman dan lebih suka few deep friendships daripada many superficial ones.',
        values: [
          'Intellectual stimulation',
          'Mutual respect dan understanding',
          'Shared interests dan goals',
          'Authenticity dan honesty'
        ],
        tips: [
          'Initiate aktivitas yang intellectually engaging',
          'Respect kebutuhan mereka akan solitude',
          'Engage dalam diskusi mendalam',
          'Jangan ambil directness mereka secara personal'
        ]
      },
      workplace: {
        style: 'Independent, strategic, dan results-oriented. INTJs excel dalam peran yang membutuhkan visi jangka panjang dan problem-solving kompleks.',
        strengths: [
          'Strategic planning dan execution',
          'Independent work dengan minimal supervision',
          'Innovation dan improvement initiatives',
          'Complex problem-solving'
        ],
        tips: [
          'Berikan otonomi dan trust',
          'Focus pada hasil, bukan proses',
          'Provide intellectual challenges',
          'Respect kebutuhan mereka untuk deep work'
        ]
      }
    },
    
    growth: {
      developDominant: [
        'Journaling untuk mengeksplorasi insights dan patterns',
        'Meditation untuk memperdalam intuisi',
        'Strategic planning exercises',
        'Baca buku filosofi dan teori kompleks'
      ],
      strengthenAuxiliary: [
        'Praktikkan project management',
        'Belajar tools untuk meningkatkan efisiensi',
        'Delegate tasks secara efektif',
        'Develop leadership skills'
      ],
      balanceTertiary: [
        'Eksplorasi nilai-nilai personal melalui refleksi',
        'Praktikkan empati dan emotional awareness',
        'Journaling tentang perasaan',
        'Engage dalam aktivitas kreatif yang personal'
      ],
      integrateInferior: [
        'Mindfulness dan body awareness practices',
        'Engage dalam aktivitas fisik regular',
        'Appreciate sensory experiences (makanan, musik, alam)',
        'Live in the moment sesekali tanpa planning'
      ]
    },
    
    stressResponse: {
      triggers: [
        'Ketidakefisienan dan incompetence',
        'Lack of control atau autonomy',
        'Emotional drama atau irrationality',
        'Interruptions dan distractions constant'
      ],
      symptoms: [
        'Withdrawal dan isolation',
        'Hypercritical terhadap diri sendiri dan orang lain',
        'Overindulgence dalam sensory activities (Se grip)',
        'Difficulty concentrating'
      ],
      copingStrategies: [
        'Alone time untuk recharge dan reflect',
        'Physical exercise untuk release tension',
        'Reorganize dan create new systems',
        'Talk dengan trusted friend atau therapist'
      ]
    },
    
    learningStyle: {
      preferences: [
        'Self-directed learning',
        'Theoretical frameworks dan big picture',
        'Complex problem-solving',
        'Independent research'
      ],
      strengths: [
        'Quick grasp of complex concepts',
        'Excellent at connecting ideas',
        'Self-motivated learner',
        'Strategic approach to learning'
      ],
      tips: [
        'Provide resources untuk independent study',
        'Focus on why, not just how',
        'Allow time untuk deep thinking',
        'Challenge dengan complex problems'
      ]
    },
    
    decisionMaking: {
      approach: 'INTJs membuat keputusan berdasarkan analisis logis mendalam dan visi jangka panjang. Mereka mempertimbangkan semua kemungkinan dan implikasi sebelum memutuskan.',
      factors: [
        'Long-term implications',
        'Logical consistency',
        'Efficiency dan effectiveness',
        'Alignment dengan goals dan values'
      ],
      tips: [
        'Berikan waktu untuk analysis',
        'Provide data dan facts',
        'Diskusikan long-term vision',
        'Respect keputusan mereka setelah dibuat'
      ]
    },
    
    famousPeople: [
      'Elon Musk (Entrepreneur)',
      'Mark Zuckerberg (Tech CEO)',
      'Isaac Newton (Physicist)',
      'Nikola Tesla (Inventor)',
      'Friedrich Nietzsche (Philosopher)',
      'Stephen Hawking (Physicist)',
      'Michelle Obama (Former First Lady)',
      'Christopher Nolan (Director)'
    ],
    
    funFacts: [
      'INTJs adalah tipe kepribadian paling rare, hanya 2% dari populasi',
      'Mereka sering disebut "Masterminds" karena kemampuan strategic thinking',
      'INTJs memiliki standar yang sangat tinggi untuk diri sendiri dan orang lain',
      'Mereka excellent dalam chess dan strategy games',
      'INTJs sering memiliki "resting thinking face" yang bisa terlihat intimidating',
      'Mereka bisa menghabiskan berjam-jam dalam deep thought tanpa bosan'
    ]
  },

  'INTP': {
    type: 'INTP',
    variant: 'INTP-A / INTP-T',
    nickname: 'The Logician',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    overview: 'INTPs adalah pemikir analitis yang sangat logis dengan keingintahuan intelektual yang tak terbatas. Mereka excellent dalam memahami sistem kompleks, menemukan pola tersembunyi, dan mengembangkan teori inovatif. INTPs sangat independen, objektif, dan selalu mencari kebenaran.',
    
    strengths: [
      'Analisis logis yang sangat kuat',
      'Kreativitas dalam problem-solving',
      'Objektif dan tidak bias',
      'Fleksibel dan open-minded',
      'Kemampuan belajar yang cepat',
      'Excellent dalam abstract thinking',
      'Independen dan self-sufficient',
      'Inovatif dalam pendekatan'
    ],
    
    weaknesses: [
      'Kesulitan dengan implementasi praktis',
      'Prokrastinasi pada tugas rutin',
      'Kurang awareness terhadap emosi',
      'Terlalu kritis dan skeptis',
      'Kesulitan menyelesaikan projects',
      'Kurang terorganisir',
      'Impatient dengan ketidaklogisan',
      'Kesulitan dengan social conventions'
    ],
    
    careers: [
      'Software Developer',
      'Research Scientist',
      'Mathematician',
      'Philosopher',
      'Data Analyst',
      'Systems Architect',
      'University Professor',
      'Theoretical Physicist',
      'Game Designer',
      'Technical Writer',
      'Forensic Analyst',
      'Cybersecurity Specialist'
    ],
    
    cognitiveProfile: {
      dominant: {
        function: 'Ti (Introverted Thinking)',
        description: 'Logika internal dan analisis mendalam',
        manifestation: 'INTPs memiliki kemampuan luar biasa untuk menganalisis sistem dan menemukan inkonsistensi logis. Mereka selalu mencari pemahaman yang mendalam dan presisi dalam thinking.'
      },
      auxiliary: {
        function: 'Ne (Extraverted Intuition)',
        description: 'Eksplorasi kemungkinan dan koneksi ide',
        manifestation: 'Mereka excellent dalam melihat berbagai kemungkinan dan membuat koneksi unik antar konsep. INTPs suka brainstorming dan mengeksplorasi ide-ide baru.'
      },
      tertiary: {
        function: 'Si (Introverted Sensing)',
        description: 'Memori internal dan detail',
        manifestation: 'INTPs menggunakan pengalaman masa lalu untuk inform analisis mereka, meskipun ini bukan fungsi dominan mereka.'
      },
      inferior: {
        function: 'Fe (Extraverted Feeling)',
        description: 'Harmoni sosial dan emosi eksternal',
        manifestation: 'Ini adalah blind spot INTPs. Mereka bisa kesulitan membaca emosi orang lain dan maintaining social harmony. Dalam stress, mereka mungkin menjadi overly emotional atau people-pleasing.'
      }
    },
    
    communication: {
      style: 'Precise, logical, dan conceptual. INTPs menghargai akurasi dalam komunikasi dan suka diskusi teoritis yang mendalam.',
      preferences: [
        'Debat intelektual yang stimulating',
        'Diskusi tentang teori dan konsep abstrak',
        'Komunikasi tertulis yang detail',
        'One-on-one conversations yang mendalam'
      ],
      strengths: [
        'Artikulasi ide kompleks dengan presisi',
        'Kemampuan menjelaskan logical reasoning',
        'Objektif dalam diskusi',
        'Excellent dalam written communication'
      ],
      challenges: [
        'Terlalu detail dan technical',
        'Kesulitan dengan small talk',
        'Bisa terdengar condescending',
        'Kurang ekspresif secara emosional'
      ]
    },
    
    relationships: {
      romantic: {
        strengths: [
          'Loyal dan committed',
          'Intellectually stimulating partner',
          'Respectful terhadap independence',
          'Open-minded dan accepting'
        ],
        challenges: [
          'Kesulitan mengekspresikan emosi',
          'Butuh banyak alone time',
          'Terlalu analytical dalam konflik',
          'Kurang romantic gestures'
        ],
        idealPartners: ['ENFJ', 'ENTJ', 'INFJ', 'ENTP'],
        tips: [
          'Praktikkan mengekspresikan appreciation',
          'Schedule quality time bersama',
          'Listen tanpa langsung analyzing',
          'Show affection dalam cara yang comfortable'
        ]
      },
      friendship: {
        approach: 'INTPs selektif dalam berteman dan lebih suka few close friends yang intellectually compatible.',
        values: [
          'Intellectual compatibility',
          'Mutual respect untuk independence',
          'Shared curiosity dan interests',
          'Authenticity dan honesty'
        ],
        tips: [
          'Engage dalam diskusi mendalam',
          'Respect kebutuhan mereka untuk solitude',
          'Share interesting ideas dan concepts',
          'Jangan ambil detachment mereka secara personal'
        ]
      },
      workplace: {
        style: 'Independent, analytical, dan innovation-focused. INTPs excel dalam peran yang membutuhkan problem-solving kompleks dan theoretical thinking.',
        strengths: [
          'Complex problem-solving',
          'Innovation dan creative solutions',
          'Independent research',
          'Logical analysis'
        ],
        tips: [
          'Berikan autonomy dan flexibility',
          'Provide intellectual challenges',
          'Allow time untuk deep thinking',
          'Focus pada ideas, bukan politics'
        ]
      }
    },
    
    growth: {
      developDominant: [
        'Engage dalam logical puzzles dan problem-solving',
        'Study formal logic dan philosophy',
        'Practice systematic analysis',
        'Baca tentang complex theories'
      ],
      strengthenAuxiliary: [
        'Brainstorming sessions regular',
        'Explore new fields dan subjects',
        'Practice creative thinking exercises',
        'Engage dengan diverse perspectives'
      ],
      balanceTertiary: [
        'Journaling untuk track experiences',
        'Reflect on past lessons',
        'Create systems berdasarkan experience',
        'Practice mindfulness'
      ],
      integrateInferior: [
        'Practice emotional awareness',
        'Engage dalam social activities',
        'Learn tentang emotional intelligence',
        'Express appreciation kepada orang lain'
      ]
    },
    
    stressResponse: {
      triggers: [
        'Illogical rules atau systems',
        'Emotional drama',
        'Lack of intellectual stimulation',
        'Forced social interaction'
      ],
      symptoms: [
        'Withdrawal total',
        'Overthinking dan analysis paralysis',
        'Emotional outbursts (Fe grip)',
        'Hypersensitivity terhadap criticism'
      ],
      copingStrategies: [
        'Alone time untuk recharge',
        'Engage dalam intellectual activities',
        'Physical exercise',
        'Talk dengan trusted friend'
      ]
    },
    
    learningStyle: {
      preferences: [
        'Self-directed exploration',
        'Theoretical frameworks',
        'Logical connections',
        'Independent research'
      ],
      strengths: [
        'Quick grasp of complex concepts',
        'Excellent at connecting ideas',
        'Self-motivated learner',
        'Deep understanding'
      ],
      tips: [
        'Provide resources untuk independent study',
        'Focus on theory dan principles',
        'Allow time untuk exploration',
        'Challenge dengan complex problems'
      ]
    },
    
    decisionMaking: {
      approach: 'INTPs membuat keputusan berdasarkan analisis logis yang mendalam dan konsistensi internal. Mereka mempertimbangkan semua angles sebelum memutuskan.',
      factors: [
        'Logical consistency',
        'Theoretical soundness',
        'Long-term implications',
        'Objective analysis'
      ],
      tips: [
        'Berikan waktu untuk thorough analysis',
        'Provide data dan logical arguments',
        'Diskusikan theoretical basis',
        'Avoid emotional appeals'
      ]
    },
    
    famousPeople: [
      'Albert Einstein (Physicist)',
      'Bill Gates (Tech Entrepreneur)',
      'Larry Page (Google Co-founder)',
      'Charles Darwin (Naturalist)',
      'Marie Curie (Physicist)',
      'Tina Fey (Comedian)',
      'Kristen Stewart (Actress)',
      'Abraham Lincoln (President)'
    ],
    
    funFacts: [
      'INTPs adalah salah satu tipe paling rare, sekitar 3% populasi',
      'Mereka sering disebut "absent-minded professors"',
      'INTPs excellent dalam strategy games dan puzzles',
      'Mereka bisa menghabiskan berjam-jam lost in thought',
      'INTPs sering memiliki unusual hobbies dan interests',
      'Mereka cenderung night owls'
    ]
  },

  'ENTJ': {
    type: 'ENTJ',
    variant: 'ENTJ-A / ENTJ-T',
    nickname: 'The Commander',
    description: 'Bold, imaginative and strong-willed leaders, always finding a way or making one.',
    overview: 'ENTJs adalah pemimpin natural yang decisive dan strategic. Mereka memiliki visi yang jelas dan kemampuan luar biasa untuk mengorganisir orang dan resources untuk mencapai tujuan. ENTJs sangat efisien, confident, dan selalu mencari cara untuk improve systems.',
    
    strengths: [
      'Leadership natural yang kuat',
      'Strategic thinking dan planning',
      'Decisive dan action-oriented',
      'Efisien dan produktif',
      'Confident dan assertive',
      'Excellent dalam organizing',
      'Visionary dan forward-thinking',
      'Strong communication skills'
    ],
    
    weaknesses: [
      'Terlalu dominan dan controlling',
      'Impatient dengan inefficiency',
      'Kurang empati',
      'Terlalu blunt dan direct',
      'Workaholic tendencies',
      'Kesulitan delegating',
      'Intolerant terhadap incompetence',
      'Kurang fleksibel'
    ],
    
    careers: [
      'CEO / Executive',
      'Management Consultant',
      'Investment Banker',
      'Entrepreneur',
      'Corporate Lawyer',
      'Operations Manager',
      'Business Strategist',
      'Military Officer',
      'Political Leader',
      'Project Manager',
      'Sales Director',
      'Financial Advisor'
    ],
    
    cognitiveProfile: {
      dominant: {
        function: 'Te (Extraverted Thinking)',
        description: 'Organisasi eksternal dan efisiensi',
        manifestation: 'ENTJs excellent dalam mengorganisir systems, people, dan resources untuk mencapai goals secara efisien. Mereka natural leaders yang decisive.'
      },
      auxiliary: {
        function: 'Ni (Introverted Intuition)',
        description: 'Visi internal dan strategic insight',
        manifestation: 'Mereka memiliki kemampuan melihat big picture dan mengantisipasi future trends. ENTJs strategic dan visionary dalam approach mereka.'
      },
      tertiary: {
        function: 'Se (Extraverted Sensing)',
        description: 'Awareness terhadap present moment',
        manifestation: 'ENTJs aware terhadap opportunities dan dapat take action quickly ketika needed.'
      },
      inferior: {
        function: 'Fi (Introverted Feeling)',
        description: 'Nilai dan emosi personal',
        manifestation: 'Ini adalah blind spot ENTJs. Mereka bisa mengabaikan feelings sendiri dan orang lain. Dalam stress, mereka mungkin menjadi overly emotional atau self-critical.'
      }
    },
    
    communication: {
      style: 'Direct, assertive, dan goal-oriented. ENTJs communicate dengan clarity dan expect efficiency dalam conversations.',
      preferences: [
        'Direct dan to-the-point discussions',
        'Strategic planning meetings',
        'Presentations dan public speaking',
        'Debate dan intellectual discourse'
      ],
      strengths: [
        'Clear dan articulate',
        'Persuasive dan influential',
        'Confident dalam delivery',
        'Excellent dalam presentations'
      ],
      challenges: [
        'Terlalu blunt dan harsh',
        'Impatient dengan tangents',
        'Kurang sensitive terhadap feelings',
        'Dapat terlihat intimidating'
      ]
    },
    
    relationships: {
      romantic: {
        strengths: [
          'Committed dan loyal',
          'Protective terhadap loved ones',
          'Supportive terhadap partner goals',
          'Excellent provider'
        ],
        challenges: [
          'Terlalu controlling',
          'Workaholic tendencies',
          'Kesulitan dengan vulnerability',
          'Kurang romantic expressions'
        ],
        idealPartners: ['INFP', 'INTP', 'INTJ', 'ENFP'],
        tips: [
          'Make time untuk quality time',
          'Practice active listening',
          'Express appreciation regularly',
          'Be vulnerable dan open'
        ]
      },
      friendship: {
        approach: 'ENTJs value friendships yang intellectually stimulating dan goal-oriented.',
        values: [
          'Ambition dan drive',
          'Intellectual compatibility',
          'Loyalty dan reliability',
          'Mutual growth'
        ],
        tips: [
          'Engage dalam productive activities',
          'Respect their time dan commitments',
          'Be direct dan honest',
          'Support their goals'
        ]
      },
      workplace: {
        style: 'Authoritative, strategic, dan results-driven. ENTJs natural leaders yang excel dalam management roles.',
        strengths: [
          'Strategic leadership',
          'Efficient execution',
          'Team organization',
          'Goal achievement'
        ],
        tips: [
          'Give them leadership opportunities',
          'Provide challenging goals',
          'Be efficient dan prepared',
          'Communicate directly'
        ]
      }
    },
    
    growth: {
      developDominant: [
        'Take on leadership projects',
        'Study management dan strategy',
        'Practice decision-making',
        'Develop organizational systems'
      ],
      strengthenAuxiliary: [
        'Strategic planning exercises',
        'Long-term vision development',
        'Pattern recognition practice',
        'Future scenario planning'
      ],
      balanceTertiary: [
        'Engage dalam physical activities',
        'Practice being present',
        'Appreciate sensory experiences',
        'Take breaks untuk enjoy moment'
      ],
      integrateInferior: [
        'Emotional awareness practices',
        'Journaling tentang feelings',
        'Empathy exercises',
        'Connect dengan personal values'
      ]
    },
    
    stressResponse: {
      triggers: [
        'Incompetence dan inefficiency',
        'Lack of control',
        'Failure to meet goals',
        'Emotional manipulation'
      ],
      symptoms: [
        'Increased aggression',
        'Micromanagement',
        'Emotional outbursts',
        'Self-doubt (Fi grip)'
      ],
      copingStrategies: [
        'Physical exercise',
        'Strategic planning',
        'Delegate tasks',
        'Talk dengan mentor'
      ]
    },
    
    learningStyle: {
      preferences: [
        'Structured learning',
        'Practical applications',
        'Leadership opportunities',
        'Competitive environments'
      ],
      strengths: [
        'Quick learner',
        'Goal-oriented study',
        'Excellent at implementation',
        'Strategic approach'
      ],
      tips: [
        'Provide clear objectives',
        'Show practical applications',
        'Allow leadership roles',
        'Challenge dengan complex problems'
      ]
    },
    
    decisionMaking: {
      approach: 'ENTJs membuat keputusan quickly berdasarkan logical analysis dan strategic considerations.',
      factors: [
        'Efficiency dan effectiveness',
        'Long-term strategic value',
        'Resource optimization',
        'Goal alignment'
      ],
      tips: [
        'Present data dan facts',
        'Show strategic benefits',
        'Be prepared dan organized',
        'Respect their decisions'
      ]
    },
    
    famousPeople: [
      'Steve Jobs (Apple CEO)',
      'Margaret Thatcher (Prime Minister)',
      'Gordon Ramsay (Chef)',
      'Franklin D. Roosevelt (President)',
      'Napoleon Bonaparte (Military Leader)',
      'Harrison Ford (Actor)',
      'Whoopi Goldberg (Actress)',
      'Malcolm X (Activist)'
    ],
    
    funFacts: [
      'ENTJs adalah salah satu tipe paling rare, sekitar 2% populasi',
      'Mereka natural born leaders',
      'ENTJs excellent dalam crisis management',
      'Mereka cenderung workaholics',
      'ENTJs sering menjadi CEOs dan executives',
      'Mereka sangat competitive'
    ]
  },

  'ENTP': {
    type: 'ENTP',
    variant: 'ENTP-A / ENTP-T',
    nickname: 'The Debater',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    overview: 'ENTPs adalah innovators yang kreatif dengan quick wit dan love untuk intellectual debates. Mereka excellent dalam melihat possibilities dan challenging status quo. ENTPs sangat adaptable, enthusiastic, dan selalu mencari cara baru untuk solve problems.',
    
    strengths: [
      'Innovative dan creative',
      'Quick thinking dan witty',
      'Excellent debater',
      'Adaptable dan flexible',
      'Enthusiastic dan energetic',
      'Charismatic dan persuasive',
      'Strategic thinking',
      'Open-minded'
    ],
    
    weaknesses: [
      'Argumentative',
      'Kurang follow-through',
      'Impatient dengan routine',
      'Insensitive terhadap feelings',
      'Prokrastinasi',
      'Kurang organized',
      'Terlalu risk-taking',
      'Kesulitan dengan commitment'
    ],
    
    careers: [
      'Entrepreneur',
      'Management Consultant',
      'Marketing Director',
      'Lawyer',
      'Inventor',
      'Business Analyst',
      'Sales Manager',
      'Creative Director',
      'Venture Capitalist',
      'Political Analyst',
      'Software Architect',
      'Innovation Manager'
    ],
    
    cognitiveProfile: {
      dominant: {
        function: 'Ne (Extraverted Intuition)',
        description: 'Eksplorasi possibilities dan connections',
        manifestation: 'ENTPs excellent dalam brainstorming, seeing patterns, dan generating innovative ideas. Mereka always exploring new possibilities.'
      },
      auxiliary: {
        function: 'Ti (Introverted Thinking)',
        description: 'Logical analysis internal',
        manifestation: 'Mereka menggunakan logic untuk evaluate ideas dan find inconsistencies. ENTPs love intellectual debates dan logical reasoning.'
      },
      tertiary: {
        function: 'Fe (Extraverted Feeling)',
        description: 'Social awareness',
        manifestation: 'ENTPs dapat read social dynamics dan adapt their approach, meskipun ini bukan strength utama mereka.'
      },
      inferior: {
        function: 'Si (Introverted Sensing)',
        description: 'Detail dan routine',
        manifestation: 'Ini adalah blind spot ENTPs. Mereka bisa mengabaikan details dan struggle dengan routines. Dalam stress, mereka mungkin menjadi overly focused pada past failures.'
      }
    },
    
    communication: {
      style: 'Witty, engaging, dan provocative. ENTPs love debates dan intellectual discourse.',
      preferences: [
        'Intellectual debates',
        'Brainstorming sessions',
        'Challenging discussions',
        'Witty banter'
      ],
      strengths: [
        'Articulate dan persuasive',
        'Quick wit',
        'Engaging storyteller',
        'Excellent at presentations'
      ],
      challenges: [
        'Argumentative',
        'Insensitive terhadap feelings',
        'Terlalu provocative',
        'Kurang patient dengan slow thinkers'
      ]
    },
    
    relationships: {
      romantic: {
        strengths: [
          'Exciting dan spontaneous',
          'Intellectually stimulating',
          'Supportive terhadap growth',
          'Loyal ketika committed'
        ],
        challenges: [
          'Commitment issues',
          'Kurang emotional expression',
          'Terlalu argumentative',
          'Butuh banyak stimulation'
        ],
        idealPartners: ['INFJ', 'INTJ', 'ENFJ', 'INTP'],
        tips: [
          'Communicate needs clearly',
          'Make time untuk deep conversations',
          'Balance debate dengan support',
          'Show appreciation'
        ]
      },
      friendship: {
        approach: 'ENTPs value friendships yang intellectually stimulating dan fun.',
        values: [
          'Intellectual compatibility',
          'Sense of humor',
          'Openness to new ideas',
          'Spontaneity'
        ],
        tips: [
          'Engage dalam debates',
          'Be open to new experiences',
          'Keep things interesting',
          'Don\'t take arguments personally'
        ]
      },
      workplace: {
        style: 'Innovative, strategic, dan entrepreneurial. ENTPs excel dalam roles yang require creativity dan problem-solving.',
        strengths: [
          'Innovation dan creativity',
          'Strategic thinking',
          'Persuasion dan influence',
          'Adaptability'
        ],
        tips: [
          'Provide variety dan challenges',
          'Allow autonomy',
          'Encourage innovation',
          'Avoid micromanagement'
        ]
      }
    },
    
    growth: {
      developDominant: [
        'Brainstorming exercises',
        'Explore new fields',
        'Creative problem-solving',
        'Network dengan diverse people'
      ],
      strengthenAuxiliary: [
        'Study logic dan reasoning',
        'Practice analytical thinking',
        'Engage dalam debates',
        'Learn critical thinking'
      ],
      balanceTertiary: [
        'Practice empathy',
        'Emotional awareness exercises',
        'Consider others\' feelings',
        'Develop social skills'
      ],
      integrateInferior: [
        'Create routines',
        'Practice attention to detail',
        'Finish projects',
        'Learn from past experiences'
      ]
    },
    
    stressResponse: {
      triggers: [
        'Boredom dan routine',
        'Lack of intellectual stimulation',
        'Micromanagement',
        'Rigid rules'
      ],
      symptoms: [
        'Increased argumentativeness',
        'Reckless behavior',
        'Obsession dengan details (Si grip)',
        'Withdrawal'
      ],
      copingStrategies: [
        'Engage dalam new projects',
        'Intellectual stimulation',
        'Physical activity',
        'Talk dengan friends'
      ]
    },
    
    learningStyle: {
      preferences: [
        'Conceptual learning',
        'Debates dan discussions',
        'Hands-on experimentation',
        'Self-directed exploration'
      ],
      strengths: [
        'Quick learner',
        'Excellent at connecting concepts',
        'Creative problem-solving',
        'Adaptable approach'
      ],
      tips: [
        'Provide intellectual challenges',
        'Allow exploration',
        'Encourage debates',
        'Avoid rigid structure'
      ]
    },
    
    decisionMaking: {
      approach: 'ENTPs membuat keputusan berdasarkan logical analysis dan consideration of possibilities.',
      factors: [
        'Logical consistency',
        'Potential opportunities',
        'Innovation potential',
        'Strategic value'
      ],
      tips: [
        'Present multiple options',
        'Show innovative aspects',
        'Allow time untuk exploration',
        'Provide logical reasoning'
      ]
    },
    
    famousPeople: [
      'Mark Twain (Writer)',
      'Thomas Edison (Inventor)',
      'Leonardo da Vinci (Polymath)',
      'Benjamin Franklin (Founding Father)',
      'Sarah Silverman (Comedian)',
      'Neil Patrick Harris (Actor)',
      'Celine Dion (Singer)',
      'Adam Savage (MythBusters)'
    ],
    
    funFacts: [
      'ENTPs sekitar 3% dari populasi',
      'Mereka disebut "Devil\'s Advocate"',
      'ENTPs excellent dalam improvisation',
      'Mereka sering entrepreneurs',
      'ENTPs love intellectual challenges',
      'Mereka natural innovators'
    ]
  }
};

// Helper function to get type data
export function getMBTITypeData(type: string): MBTITypeData | null {
  return MBTI_TYPE_DATABASE[type.toUpperCase()] || null;
}

// Function to get compatible types
export function getCompatibleTypes(type: string): string[] {
  const compatibility: Record<string, string[]> = {
    'INTJ': ['ENFP', 'ENTP', 'INFJ', 'ENTJ'],
    'INTP': ['ENFJ', 'ENTJ', 'INFJ', 'ENTP'],
    'ENTJ': ['INFP', 'INTP', 'INTJ', 'ENFP'],
    'ENTP': ['INFJ', 'INTJ', 'ENFJ', 'INTP'],
    'INFJ': ['ENFP', 'ENTP', 'INTJ', 'INFP'],
    'INFP': ['ENFJ', 'ENTJ', 'INFJ', 'ENFP'],
    'ENFJ': ['INFP', 'ISFP', 'INTP', 'INFJ'],
    'ENFP': ['INTJ', 'INFJ', 'ENTJ', 'INFP'],
    'ISTJ': ['ESFP', 'ESTP', 'ISFJ', 'ESTJ'],
    'ISFJ': ['ESFP', 'ESTP', 'ISTJ', 'ESFJ'],
    'ESTJ': ['ISTP', 'ISFP', 'ISTJ', 'ESFJ'],
    'ESFJ': ['ISFP', 'ISTP', 'ISTJ', 'ESTJ'],
    'ISTP': ['ESFJ', 'ESTJ', 'ISFP', 'ESTP'],
    'ISFP': ['ESFJ', 'ESTJ', 'ISTP', 'ESFP'],
    'ESTP': ['ISFJ', 'ISTJ', 'ISTP', 'ESFP'],
    'ESFP': ['ISFJ', 'ISTJ', 'ISFP', 'ESTP'],
  };
  
  return compatibility[type.toUpperCase()] || [];
}

// Import extended types
import { EXTENDED_MBTI_TYPES } from './mbti-types-extended';

// Merge extended types with main database
Object.assign(MBTI_TYPE_DATABASE, EXTENDED_MBTI_TYPES);
