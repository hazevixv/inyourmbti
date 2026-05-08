// Love Languages Integration with MBTI
// Based on Gary Chapman's 5 Love Languages

export type LoveLanguage = 
  | 'Words of Affirmation'
  | 'Quality Time'
  | 'Receiving Gifts'
  | 'Acts of Service'
  | 'Physical Touch';

export interface LoveLanguageProfile {
  primary: LoveLanguage;
  secondary: LoveLanguage;
  description: string;
  howToExpress: string[];
  howToReceive: string[];
}

export const MBTI_TO_LOVE_LANGUAGES: Record<string, LoveLanguageProfile> = {
  'INTJ': {
    primary: 'Quality Time',
    secondary: 'Acts of Service',
    description: 'INTJs value deep, meaningful time together dan appreciate when partner shows love through helpful actions.',
    howToExpress: [
      'Engage dalam intellectual conversations',
      'Help solve problems',
      'Respect their need untuk alone time',
      'Show appreciation untuk their ideas'
    ],
    howToReceive: [
      'Undivided attention dalam conversations',
      'Partner yang helps dengan practical matters',
      'Respect untuk their time dan space',
      'Recognition untuk their efforts'
    ]
  },
  'INTP': {
    primary: 'Quality Time',
    secondary: 'Words of Affirmation',
    description: 'INTPs value intellectual connection dan appreciate verbal recognition untuk their ideas.',
    howToExpress: [
      'Engage dalam deep discussions',
      'Appreciate their knowledge',
      'Give space untuk independent thinking',
      'Acknowledge their insights'
    ],
    howToReceive: [
      'Focused attention dalam conversations',
      'Verbal appreciation untuk intelligence',
      'Respect untuk their theories',
      'Freedom untuk explore ideas'
    ]
  },
  'ENTJ': {
    primary: 'Acts of Service',
    secondary: 'Words of Affirmation',
    description: 'ENTJs appreciate efficiency dan value when partner contributes to shared goals.',
    howToExpress: [
      'Support their ambitions',
      'Be reliable dan efficient',
      'Acknowledge their achievements',
      'Help dengan practical tasks'
    ],
    howToReceive: [
      'Partner yang pulls their weight',
      'Recognition untuk accomplishments',
      'Efficient use of time together',
      'Support untuk their goals'
    ]
  },
  'ENTP': {
    primary: 'Quality Time',
    secondary: 'Words of Affirmation',
    description: 'ENTPs love engaging conversations dan appreciate verbal sparring dan wit.',
    howToExpress: [
      'Engage dalam debates',
      'Appreciate their creativity',
      'Be spontaneous',
      'Challenge them intellectually'
    ],
    howToReceive: [
      'Stimulating conversations',
      'Appreciation untuk ideas',
      'Freedom untuk explore',
      'Playful banter'
    ]
  },
  'INFJ': {
    primary: 'Quality Time',
    secondary: 'Words of Affirmation',
    description: 'INFJs value deep emotional connection dan meaningful words.',
    howToExpress: [
      'Have deep, meaningful conversations',
      'Express feelings verbally',
      'Show understanding',
      'Support their causes'
    ],
    howToReceive: [
      'Undivided attention',
      'Verbal affirmation of love',
      'Understanding their complexity',
      'Emotional support'
    ]
  },
  'INFP': {
    primary: 'Words of Affirmation',
    secondary: 'Quality Time',
    description: 'INFPs deeply value authentic words dan meaningful time together.',
    howToExpress: [
      'Express feelings through words',
      'Write love letters',
      'Have deep conversations',
      'Show appreciation untuk their uniqueness'
    ],
    howToReceive: [
      'Genuine compliments',
      'Verbal expressions of love',
      'Quality time tanpa distractions',
      'Appreciation untuk their authenticity'
    ]
  },
  'ENFJ': {
    primary: 'Words of Affirmation',
    secondary: 'Quality Time',
    description: 'ENFJs thrive on verbal appreciation dan quality time with loved ones.',
    howToExpress: [
      'Express gratitude verbally',
      'Spend quality time together',
      'Acknowledge their efforts',
      'Show emotional support'
    ],
    howToReceive: [
      'Verbal appreciation',
      'Focused attention',
      'Recognition untuk helping others',
      'Emotional connection'
    ]
  },
  'ENFP': {
    primary: 'Words of Affirmation',
    secondary: 'Physical Touch',
    description: 'ENFPs love verbal expressions of love dan physical affection.',
    howToExpress: [
      'Express feelings enthusiastically',
      'Give compliments',
      'Be affectionate',
      'Celebrate their uniqueness'
    ],
    howToReceive: [
      'Enthusiastic verbal affirmation',
      'Physical affection',
      'Appreciation untuk creativity',
      'Spontaneous expressions of love'
    ]
  },
  'ISTJ': {
    primary: 'Acts of Service',
    secondary: 'Quality Time',
    description: 'ISTJs value practical actions dan reliable presence.',
    howToExpress: [
      'Help dengan practical tasks',
      'Be reliable dan consistent',
      'Show up when needed',
      'Maintain traditions'
    ],
    howToReceive: [
      'Practical help',
      'Reliability',
      'Respect untuk routines',
      'Consistent presence'
    ]
  },
  'ISFJ': {
    primary: 'Acts of Service',
    secondary: 'Quality Time',
    description: 'ISFJs appreciate when others help them dan spend quality time.',
    howToExpress: [
      'Help dengan daily tasks',
      'Show appreciation untuk their care',
      'Spend quality time',
      'Remember important details'
    ],
    howToReceive: [
      'Practical help',
      'Appreciation untuk their service',
      'Quality time together',
      'Thoughtful gestures'
    ]
  },
  'ESTJ': {
    primary: 'Acts of Service',
    secondary: 'Words of Affirmation',
    description: 'ESTJs value efficiency dan appreciate recognition.',
    howToExpress: [
      'Be reliable dan efficient',
      'Help achieve goals',
      'Acknowledge their leadership',
      'Follow through on commitments'
    ],
    howToReceive: [
      'Practical support',
      'Recognition untuk achievements',
      'Efficient partnership',
      'Respect untuk their authority'
    ]
  },
  'ESFJ': {
    primary: 'Words of Affirmation',
    secondary: 'Acts of Service',
    description: 'ESFJs thrive on verbal appreciation dan helpful actions.',
    howToExpress: [
      'Express gratitude verbally',
      'Help dengan their responsibilities',
      'Acknowledge their care',
      'Show appreciation publicly'
    ],
    howToReceive: [
      'Verbal appreciation',
      'Help dengan tasks',
      'Recognition untuk caring',
      'Thoughtful gestures'
    ]
  },
  'ISTP': {
    primary: 'Acts of Service',
    secondary: 'Physical Touch',
    description: 'ISTPs value practical actions dan physical presence.',
    howToExpress: [
      'Help dengan hands-on tasks',
      'Give space when needed',
      'Be physically present',
      'Show love through actions'
    ],
    howToReceive: [
      'Practical help',
      'Physical affection',
      'Freedom untuk independence',
      'Actions over words'
    ]
  },
  'ISFP': {
    primary: 'Physical Touch',
    secondary: 'Quality Time',
    description: 'ISFPs value physical affection dan meaningful time together.',
    howToExpress: [
      'Be physically affectionate',
      'Spend quality time',
      'Show love through touch',
      'Create beautiful experiences'
    ],
    howToReceive: [
      'Physical affection',
      'Quality time dalam nature',
      'Gentle touch',
      'Presence tanpa pressure'
    ]
  },
  'ESTP': {
    primary: 'Physical Touch',
    secondary: 'Quality Time',
    description: 'ESTPs love physical affection dan exciting experiences together.',
    howToExpress: [
      'Be physically affectionate',
      'Do activities together',
      'Be spontaneous',
      'Show excitement'
    ],
    howToReceive: [
      'Physical affection',
      'Exciting experiences',
      'Active quality time',
      'Spontaneous touch'
    ]
  },
  'ESFP': {
    primary: 'Physical Touch',
    secondary: 'Words of Affirmation',
    description: 'ESFPs love physical affection dan verbal expressions of love.',
    howToExpress: [
      'Be physically affectionate',
      'Express feelings enthusiastically',
      'Celebrate together',
      'Show excitement'
    ],
    howToReceive: [
      'Physical affection',
      'Enthusiastic compliments',
      'Fun experiences',
      'Spontaneous expressions of love'
    ]
  }
};

export function getLoveLanguageForMBTI(mbtiType: string): LoveLanguageProfile | null {
  // Normalize: remove variant suffix and convert to uppercase
  const normalizedType = mbtiType.split('-')[0].toUpperCase().trim();
  return MBTI_TO_LOVE_LANGUAGES[normalizedType] || null;
}
