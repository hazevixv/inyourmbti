import { CognitiveFunction } from './questions';

export interface FunctionScores {
  Ne: number;
  Ni: number;
  Se: number;
  Si: number;
  Te: number;
  Ti: number;
  Fe: number;
  Fi: number;
}

export interface MBTIResult {
  type: string; // e.g., "INTJ"
  variant: string; // e.g., "INTJ-A" or "INTJ-T"
  dominantFunction: string;
  auxiliaryFunction: string;
  tertiaryFunction: string;
  inferiorFunction: string;
  scores: FunctionScores;
  percentages: FunctionScores;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
}

// Type definitions for function stacks
type FunctionStack = [CognitiveFunction, CognitiveFunction, CognitiveFunction, CognitiveFunction];

// MBTI Type to Function Stack mapping (Grant/Brownsword Model)
const typeToFunctionStack: Record<string, FunctionStack> = {
  'INTJ': ['Ni', 'Te', 'Fi', 'Se'],
  'INTP': ['Ti', 'Ne', 'Si', 'Fe'],
  'ENTJ': ['Te', 'Ni', 'Se', 'Fi'],
  'ENTP': ['Ne', 'Ti', 'Fe', 'Si'],
  'INFJ': ['Ni', 'Fe', 'Ti', 'Se'],
  'INFP': ['Fi', 'Ne', 'Si', 'Te'],
  'ENFJ': ['Fe', 'Ni', 'Se', 'Ti'],
  'ENFP': ['Ne', 'Fi', 'Te', 'Si'],
  'ISTJ': ['Si', 'Te', 'Fi', 'Ne'],
  'ISFJ': ['Si', 'Fe', 'Ti', 'Ne'],
  'ESTJ': ['Te', 'Si', 'Ne', 'Fi'],
  'ESFJ': ['Fe', 'Si', 'Ne', 'Ti'],
  'ISTP': ['Ti', 'Se', 'Ni', 'Fe'],
  'ISFP': ['Fi', 'Se', 'Ni', 'Te'],
  'ESTP': ['Se', 'Ti', 'Fe', 'Ni'],
  'ESFP': ['Se', 'Fi', 'Te', 'Ni'],
};

// Function stack to MBTI type mapping (reverse lookup)
const functionStackToType: Record<string, string> = Object.entries(typeToFunctionStack).reduce(
  (acc, [type, stack]) => {
    acc[stack.join('-')] = type;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Calculate MBTI type from answers using Grant/Brownsword model
 * @param answers - Record of question ID to answer (1-5)
 * @returns MBTIResult with type, function stack, and scores
 */
export function calculateMBTI(answers: Record<number, number>): MBTIResult {
  // Initialize scores
  const scores: FunctionScores = {
    Ne: 0, Ni: 0, Se: 0, Si: 0,
    Te: 0, Ti: 0, Fe: 0, Fi: 0,
  };

  // Import questions dynamically to avoid circular dependency
  const { questions } = require('./questions');

  // Calculate raw scores for each function
  questions.forEach((question: any) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      const score = question.reverse ? (6 - answer) : answer;
      const func = question.function as CognitiveFunction;
      scores[func] += score;
    }
  });

  // Calculate percentages (each function has 12 questions, max score = 60)
  const percentages: FunctionScores = {
    Ne: Math.round((scores.Ne / 60) * 100),
    Ni: Math.round((scores.Ni / 60) * 100),
    Se: Math.round((scores.Se / 60) * 100),
    Si: Math.round((scores.Si / 60) * 100),
    Te: Math.round((scores.Te / 60) * 100),
    Ti: Math.round((scores.Ti / 60) * 100),
    Fe: Math.round((scores.Fe / 60) * 100),
    Fi: Math.round((scores.Fi / 60) * 100),
  };

  // Determine dominant function (highest score)
  const sortedFunctions = (Object.entries(percentages) as [CognitiveFunction, number][])
    .sort((a, b) => b[1] - a[1]);

  const dominantFunction = sortedFunctions[0][0];

  // Determine auxiliary function (second highest, opposite attitude)
  const auxiliaryFunction = findAuxiliaryFunction(dominantFunction, sortedFunctions);

  // Determine tertiary function (opposite of auxiliary)
  const tertiaryFunction = getOppositeFunction(auxiliaryFunction);

  // Determine inferior function (opposite of dominant)
  const inferiorFunction = getOppositeFunction(dominantFunction);

  // Build function stack
  const functionStack: FunctionStack = [
    dominantFunction,
    auxiliaryFunction,
    tertiaryFunction,
    inferiorFunction,
  ];

  // Map function stack to MBTI type
  let type = functionStackToType[functionStack.join('-')];
  
  if (!type) {
    console.error('❌ Failed to determine MBTI type from function stack:', functionStack);
    console.log('📊 Function scores:', percentages);
    console.log('🔍 Trying fallback calculation...');
    
    // Fallback: Use simple dichotomy method
    const E_I = (percentages.Ne + percentages.Se + percentages.Te + percentages.Fe) > 
                (percentages.Ni + percentages.Si + percentages.Ti + percentages.Fi) ? 'E' : 'I';
    const N_S = (percentages.Ne + percentages.Ni) > (percentages.Se + percentages.Si) ? 'N' : 'S';
    const T_F = (percentages.Te + percentages.Ti) > (percentages.Fe + percentages.Fi) ? 'T' : 'F';
    
    // Determine J/P based on dominant function attitude
    // If dominant is extraverted judging (Te/Fe) or introverted perceiving (Ni/Si) → J
    // If dominant is extraverted perceiving (Ne/Se) or introverted judging (Ti/Fi) → P
    let J_P: 'J' | 'P';
    if (E_I === 'E') {
      // Extraverts: J if dominant is judging (Te/Fe), P if dominant is perceiving (Ne/Se)
      J_P = (dominantFunction === 'Te' || dominantFunction === 'Fe') ? 'J' : 'P';
    } else {
      // Introverts: J if dominant is perceiving (Ni/Si), P if dominant is judging (Ti/Fi)
      J_P = (dominantFunction === 'Ni' || dominantFunction === 'Si') ? 'J' : 'P';
    }
    
    type = `${E_I}${N_S}${T_F}${J_P}`;
    console.log('⚠️ Using fallback type:', type);
    console.log('📝 Fallback calculation: E/I=' + E_I + ', N/S=' + N_S + ', T/F=' + T_F + ', J/P=' + J_P);
  }
  
  // CRITICAL: Validate that type is a valid 4-letter MBTI type
  const validTypes = Object.keys(typeToFunctionStack);
  if (!validTypes.includes(type)) {
    console.error('❌ CRITICAL: Invalid type calculated:', type);
    console.log('🔧 Forcing type to INTJ as emergency fallback');
    type = 'INTJ'; // Emergency fallback to prevent "XXXX"
  }
  
  console.log('✅ Final MBTI type:', type);

  // Determine variant (A = Assertive, T = Turbulent) based on overall confidence
  const avgScore = Object.values(percentages).reduce((a, b) => a + b, 0) / 8;
  const variant = avgScore >= 60 ? 'A' : 'T';

  // Get type description
  const description = getTypeDescription(type);
  const strengths = getTypeStrengths(type);
  const weaknesses = getTypeWeaknesses(type);
  const careers = getTypeCareers(type);

  return {
    type,
    variant: `${type}-${variant}`,
    dominantFunction,
    auxiliaryFunction,
    tertiaryFunction,
    inferiorFunction,
    scores,
    percentages,
    description,
    strengths,
    weaknesses,
    careers,
  };
}

/**
 * Find auxiliary function using the valid type mappings
 * Instead of guessing, find which valid MBTI type has this dominant function
 * and pick the best matching one based on scores
 */
function findAuxiliaryFunction(
  dominant: CognitiveFunction,
  sorted: [CognitiveFunction, number][]
): CognitiveFunction {
  // Get all valid types that have this dominant function
  const validTypesWithDominant = Object.entries(typeToFunctionStack)
    .filter(([, stack]) => stack[0] === dominant)
    .map(([, stack]) => stack[1]); // Get their auxiliary functions

  // From those valid auxiliaries, pick the one with highest score
  let bestAux: CognitiveFunction | null = null;
  let bestScore = -1;

  for (const [func, score] of sorted) {
    if (validTypesWithDominant.includes(func) && score > bestScore) {
      bestAux = func;
      bestScore = score;
    }
  }

  if (bestAux) return bestAux;

  // Ultimate fallback: first valid auxiliary for this dominant
  return validTypesWithDominant[0] as CognitiveFunction;
}

/**
 * Get opposite function (same type, opposite attitude)
 */
function getOppositeFunction(func: CognitiveFunction): CognitiveFunction {
  const opposites: Record<CognitiveFunction, CognitiveFunction> = {
    'Ne': 'Ni', 'Ni': 'Ne',
    'Se': 'Si', 'Si': 'Se',
    'Te': 'Ti', 'Ti': 'Te',
    'Fe': 'Fi', 'Fi': 'Fe',
  };
  return opposites[func];
}

/**
 * Get function attitude (E = Extraverted, I = Introverted)
 */
function getAttitude(func: CognitiveFunction): 'E' | 'I' {
  return func[0] as 'E' | 'I';
}

/**
 * Get function type (N = Intuition, S = Sensing, T = Thinking, F = Feeling)
 */
function getFunctionType(func: CognitiveFunction): 'N' | 'S' | 'T' | 'F' {
  return func[1] as 'N' | 'S' | 'T' | 'F';
}

/**
 * Get type description
 */
function getTypeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    'INTJ': 'The Architect - Pemikir strategis yang imajinatif dengan rencana untuk segala hal. INTJ adalah pemecah masalah analitis yang ingin meningkatkan sistem dan proses dengan ide-ide inovatif mereka.',
    'INTP': 'The Logician - Penemu inovatif dengan kehausan akan pengetahuan yang tak terpuaskan. INTP adalah pemikir yang fleksibel dan analitis yang tertarik pada teori dan konsep abstrak.',
    'ENTJ': 'The Commander - Pemimpin yang berani, imajinatif, dan berkemauan kuat yang selalu menemukan jalan atau membuatnya. ENTJ adalah pengorganisir yang kuat yang unggul dalam melihat kemungkinan untuk perbaikan.',
    'ENTP': 'The Debater - Pemikir yang cerdas dan penasaran yang tidak bisa menolak tantangan intelektual. ENTP adalah inovator yang kreatif yang tertarik pada ide-ide baru dan kemungkinan.',
    'INFJ': 'The Advocate - Idealis yang tenang dan mistis namun sangat inspiratif dan tak kenal lelah. INFJ adalah pemikir kreatif dengan pandangan yang kuat tentang bagaimana membuat dunia menjadi tempat yang lebih baik.',
    'INFP': 'The Mediator - Orang yang puitis, baik hati, dan altruistik yang selalu ingin membantu tujuan yang baik. INFP adalah idealis yang dipandu oleh nilai-nilai inti mereka dan keyakinan bahwa semua orang pada dasarnya baik.',
    'ENFJ': 'The Protagonist - Pemimpin yang karismatik dan inspiratif yang mampu mempesona pendengar mereka. ENFJ adalah komunikator yang hangat dan penuh perhatian yang tertarik pada pertumbuhan dan perkembangan orang lain.',
    'ENFP': 'The Campaigner - Jiwa bebas yang antusias, kreatif, dan sosial yang selalu bisa menemukan alasan untuk tersenyum. ENFP adalah pencipta yang berpusat pada orang dengan fokus pada kemungkinan dan antusiasme yang menular untuk ide-ide baru.',
    'ISTJ': 'The Logistician - Individu yang praktis dan berorientasi pada fakta yang keandalannya tidak dapat diragukan. ISTJ adalah pengorganisir yang bertanggung jawab yang didorong untuk menciptakan dan menegakkan ketertiban dalam sistem dan institusi.',
    'ISFJ': 'The Defender - Pelindung yang sangat berdedikasi dan hangat yang selalu siap membela orang yang mereka cintai. ISFJ adalah pengasuh yang hangat dan penuh perhatian yang tertarik pada melayani orang lain dan memenuhi kebutuhan mereka.',
    'ESTJ': 'The Executive - Administrator yang sangat baik yang tak tertandingi dalam mengelola hal-hal atau orang. ESTJ adalah pengorganisir yang keras yang unggul dalam mengelola orang dan proyek.',
    'ESFJ': 'The Consul - Orang yang sangat peduli, sosial, dan populer yang selalu ingin membantu. ESFJ adalah pengasuh yang hangat dan penuh perhatian yang tertarik pada melayani orang lain dan memenuhi kebutuhan mereka.',
    'ISTP': 'The Virtuoso - Eksperimen yang berani dan praktis yang menguasai segala jenis alat. ISTP adalah pemecah masalah yang fleksibel yang tertarik pada tindakan dan pengalaman langsung.',
    'ISFP': 'The Adventurer - Seniman yang fleksibel dan menawan yang selalu siap untuk mengeksplorasi dan mengalami sesuatu yang baru. ISFP adalah seniman yang lembut dan peka yang tertarik pada keindahan dan pengalaman.',
    'ESTP': 'The Entrepreneur - Orang yang cerdas, energik, dan sangat perseptif yang benar-benar menikmati hidup di tepi. ESTP adalah pengambil risiko yang energik yang hidup di saat ini dan tertarik pada tindakan.',
    'ESFP': 'The Entertainer - Penghibur yang spontan, energik, dan antusias yang tidak pernah membosankan. ESFP adalah penghibur yang spontan dan energik yang menikmati menjadi pusat perhatian.',
  };
  return descriptions[type] || 'Tipe kepribadian yang unik dan menarik.';
}

/**
 * Get type strengths
 */
function getTypeStrengths(type: string): string[] {
  const strengths: Record<string, string[]> = {
    'INTJ': ['Pemikir strategis', 'Independen', 'Inovatif', 'Percaya diri', 'Tekun'],
    'INTP': ['Analitis', 'Kreatif', 'Objektif', 'Fleksibel', 'Penasaran'],
    'ENTJ': ['Pemimpin alami', 'Efisien', 'Percaya diri', 'Strategis', 'Tegas'],
    'ENTP': ['Inovatif', 'Antusias', 'Cerdas', 'Fleksibel', 'Karismatik'],
    'INFJ': ['Idealis', 'Empatik', 'Kreatif', 'Inspiratif', 'Tekun'],
    'INFP': ['Idealis', 'Empatik', 'Kreatif', 'Autentik', 'Fleksibel'],
    'ENFJ': ['Karismatik', 'Empatik', 'Inspiratif', 'Komunikatif', 'Altruistik'],
    'ENFP': ['Antusias', 'Kreatif', 'Sosial', 'Optimis', 'Fleksibel'],
    'ISTJ': ['Bertanggung jawab', 'Terorganisir', 'Praktis', 'Dapat diandalkan', 'Teliti'],
    'ISFJ': ['Peduli', 'Dapat diandalkan', 'Praktis', 'Teliti', 'Loyal'],
    'ESTJ': ['Terorganisir', 'Efisien', 'Tegas', 'Dapat diandalkan', 'Praktis'],
    'ESFJ': ['Peduli', 'Sosial', 'Terorganisir', 'Loyal', 'Praktis'],
    'ISTP': ['Praktis', 'Fleksibel', 'Analitis', 'Tenang', 'Efisien'],
    'ISFP': ['Artistik', 'Fleksibel', 'Peka', 'Spontan', 'Loyal'],
    'ESTP': ['Energik', 'Praktis', 'Spontan', 'Sosial', 'Fleksibel'],
    'ESFP': ['Antusias', 'Sosial', 'Spontan', 'Praktis', 'Optimis'],
  };
  return strengths[type] || ['Unik', 'Menarik', 'Berharga'];
}

/**
 * Get type weaknesses
 */
function getTypeWeaknesses(type: string): string[] {
  const weaknesses: Record<string, string[]> = {
    'INTJ': ['Terlalu kritis', 'Perfeksionis', 'Kurang empati', 'Terlalu independen'],
    'INTP': ['Kurang praktis', 'Terlalu analitis', 'Kurang empati', 'Prokrastinasi'],
    'ENTJ': ['Terlalu dominan', 'Tidak sabar', 'Kurang empati', 'Terlalu kritis'],
    'ENTP': ['Kurang fokus', 'Argumentatif', 'Tidak sabar', 'Kurang praktis'],
    'INFJ': ['Perfeksionis', 'Terlalu sensitif', 'Burnout', 'Sulit membuka diri'],
    'INFP': ['Terlalu idealis', 'Terlalu sensitif', 'Sulit membuat keputusan', 'Perfeksionis'],
    'ENFJ': ['Terlalu altruistik', 'Terlalu sensitif', 'Sulit membuat keputusan sulit', 'Burnout'],
    'ENFP': ['Kurang fokus', 'Terlalu optimis', 'Sulit menyelesaikan proyek', 'Terlalu sensitif'],
    'ISTJ': ['Terlalu kaku', 'Sulit beradaptasi', 'Kurang fleksibel', 'Terlalu serius'],
    'ISFJ': ['Terlalu altruistik', 'Sulit mengatakan tidak', 'Terlalu sensitif', 'Menghindari konflik'],
    'ESTJ': ['Terlalu dominan', 'Tidak fleksibel', 'Kurang empati', 'Terlalu kritis'],
    'ESFJ': ['Terlalu peduli pendapat orang', 'Sulit mengatakan tidak', 'Menghindari konflik', 'Terlalu sensitif'],
    'ISTP': ['Kurang empati', 'Sulit mengekspresikan emosi', 'Terlalu independen', 'Impulsif'],
    'ISFP': ['Terlalu sensitif', 'Sulit merencanakan', 'Menghindari konflik', 'Terlalu independen'],
    'ESTP': ['Impulsif', 'Kurang fokus jangka panjang', 'Kurang empati', 'Mengambil risiko berlebihan'],
    'ESFP': ['Impulsif', 'Kurang fokus jangka panjang', 'Terlalu sensitif', 'Menghindari konflik'],
  };
  return weaknesses[type] || ['Perlu pengembangan diri'];
}

/**
 * Get career recommendations
 */
function getTypeCareers(type: string): string[] {
  const careers: Record<string, string[]> = {
    'INTJ': ['Arsitek', 'Insinyur', 'Ilmuwan', 'Analis', 'Konsultan Strategi', 'Programmer'],
    'INTP': ['Ilmuwan', 'Programmer', 'Analis', 'Peneliti', 'Arsitek', 'Filsuf'],
    'ENTJ': ['CEO', 'Manajer', 'Konsultan', 'Pengacara', 'Entrepreneur', 'Direktur'],
    'ENTP': ['Entrepreneur', 'Konsultan', 'Pengacara', 'Inventor', 'Marketing', 'Analis'],
    'INFJ': ['Konselor', 'Psikolog', 'Penulis', 'Guru', 'Pekerja Sosial', 'HR'],
    'INFP': ['Penulis', 'Konselor', 'Seniman', 'Psikolog', 'Guru', 'Desainer'],
    'ENFJ': ['Guru', 'Konselor', 'HR', 'Pelatih', 'Public Relations', 'Manajer'],
    'ENFP': ['Marketing', 'Konselor', 'Jurnalis', 'Entrepreneur', 'Guru', 'Desainer'],
    'ISTJ': ['Akuntan', 'Auditor', 'Manajer', 'Analis', 'Administrator', 'Insinyur'],
    'ISFJ': ['Perawat', 'Guru', 'Administrator', 'Konselor', 'Pekerja Sosial', 'Librarian'],
    'ESTJ': ['Manajer', 'Administrator', 'Pengacara', 'Akuntan', 'Direktur', 'Polisi'],
    'ESFJ': ['Guru', 'Perawat', 'HR', 'Event Planner', 'Pekerja Sosial', 'Administrator'],
    'ISTP': ['Mekanik', 'Insinyur', 'Pilot', 'Programmer', 'Analis', 'Teknisi'],
    'ISFP': ['Seniman', 'Desainer', 'Musisi', 'Fotografer', 'Perawat', 'Chef'],
    'ESTP': ['Entrepreneur', 'Sales', 'Marketing', 'Atlet', 'Paramedis', 'Polisi'],
    'ESFP': ['Entertainer', 'Event Planner', 'Sales', 'Guru', 'Perawat', 'Desainer'],
  };
  return careers[type] || ['Berbagai bidang sesuai minat'];
}
