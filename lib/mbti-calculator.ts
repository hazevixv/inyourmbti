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
  type: string;
  variant: string;
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
  confidence?: number;
  confidenceLabel?: 'high' | 'medium' | 'low';
  ambiguityNote?: string;
}

type FunctionStack = [CognitiveFunction, CognitiveFunction, CognitiveFunction, CognitiveFunction];

const typeToFunctionStack: Record<string, FunctionStack> = {
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni'],
};

const allFunctions = Object.freeze(['Ne', 'Ni', 'Se', 'Si', 'Te', 'Ti', 'Fe', 'Fi'] as CognitiveFunction[]);

export function calculateMBTI(answers: Record<number, number>): MBTIResult {
  const scores: FunctionScores = {
    Ne: 0,
    Ni: 0,
    Se: 0,
    Si: 0,
    Te: 0,
    Ti: 0,
    Fe: 0,
    Fi: 0,
  };

  const { questions } = require('./questions');

  questions.forEach((question: { id: number; reverse: boolean; function: CognitiveFunction }) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      const score = question.reverse ? 6 - answer : answer;
      scores[question.function] += score;
    }
  });

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

  const sortedFunctions = (Object.entries(percentages) as [CognitiveFunction, number][])
    .sort((a, b) => b[1] - a[1]);

  const dimensionSignals = getDimensionSignals(percentages, sortedFunctions[0][0]);
  const rankedFunctions = Object.fromEntries(
    sortedFunctions.map(([func], index) => [func, index])
  ) as Record<CognitiveFunction, number>;

  const candidates = Object.entries(typeToFunctionStack)
    .map(([type, stack]) => ({
      type,
      stack,
      score: scoreTypeCandidate(type, stack, percentages, rankedFunctions, dimensionSignals),
    }))
    .sort((a, b) => b.score - a.score);

  const bestCandidate = candidates[0];
  if (!bestCandidate) {
    throw new Error('Unable to calculate MBTI type');
  }

  const secondCandidate = candidates[1];
  const [dominantFunction, auxiliaryFunction, tertiaryFunction, inferiorFunction] = bestCandidate.stack;
  const confidence = calculateConfidence(
    bestCandidate.score,
    secondCandidate?.score ?? bestCandidate.score,
    percentages,
    bestCandidate.stack,
    dimensionSignals
  );

  const resultType = bestCandidate.type;
  const variant = determineVariant(percentages, answers, dominantFunction, confidence);
  const ambiguityNote = confidence < 55
    ? 'Jawabanmu cukup seimbang di beberapa dimensi, jadi hasil ini lebih cocok dibaca sebagai kecenderungan utama daripada label mutlak.'
    : undefined;

  return {
    type: resultType,
    variant: `${resultType}-${variant}`,
    dominantFunction,
    auxiliaryFunction,
    tertiaryFunction,
    inferiorFunction,
    scores,
    percentages,
    description: getTypeDescription(resultType),
    strengths: getTypeStrengths(resultType),
    weaknesses: getTypeWeaknesses(resultType),
    careers: getTypeCareers(resultType),
    confidence,
    confidenceLabel: confidence >= 75 ? 'high' : confidence >= 55 ? 'medium' : 'low',
    ambiguityNote,
  };
}

function getDimensionSignals(
  percentages: FunctionScores,
  dominantFunction: CognitiveFunction
) {
  const extraverted = percentages.Ne + percentages.Se + percentages.Te + percentages.Fe;
  const introverted = percentages.Ni + percentages.Si + percentages.Ti + percentages.Fi;
  const intuitive = percentages.Ne + percentages.Ni;
  const sensing = percentages.Se + percentages.Si;
  const thinking = percentages.Te + percentages.Ti;
  const feeling = percentages.Fe + percentages.Fi;

  const E_I = extraverted > introverted ? 'E' : 'I';
  const N_S = intuitive > sensing ? 'N' : 'S';
  const T_F = thinking > feeling ? 'T' : 'F';

  let J_P: 'J' | 'P';
  if (E_I === 'E') {
    J_P = dominantFunction === 'Te' || dominantFunction === 'Fe' ? 'J' : 'P';
  } else {
    J_P = dominantFunction === 'Ni' || dominantFunction === 'Si' ? 'J' : 'P';
  }

  return {
    type: `${E_I}${N_S}${T_F}${J_P}`,
    margins: {
      EI: Math.abs(extraverted - introverted),
      NS: Math.abs(intuitive - sensing),
      TF: Math.abs(thinking - feeling),
    },
  };
}

function scoreTypeCandidate(
  type: string,
  stack: FunctionStack,
  percentages: FunctionScores,
  rankedFunctions: Record<CognitiveFunction, number>,
  dimensionSignals: ReturnType<typeof getDimensionSignals>
): number {
  const [dom, aux, ter, inf] = stack;
  const shadowFunctions = allFunctions.filter((func) => !stack.includes(func));
  const shadowAverage =
    shadowFunctions.reduce((sum, func) => sum + percentages[func], 0) / shadowFunctions.length;

  const functionFit =
    percentages[dom] * 1.45 +
    percentages[aux] * 1.1 +
    percentages[ter] * 0.35 +
    (100 - percentages[inf]) * 0.95;

  const rankFit =
    (8 - rankedFunctions[dom]) * 12 +
    (8 - rankedFunctions[aux]) * 8 +
    (8 - rankedFunctions[ter]) * 3 +
    rankedFunctions[inf] * 5;

  const stackBalance =
    Math.max(0, percentages[dom] - percentages[aux]) * 0.8 +
    Math.max(0, percentages[aux] - percentages[ter]) * 0.45 +
    Math.max(0, percentages[ter] - percentages[inf]) * 0.3;

  const dichotomyMatches = type
    .split('')
    .reduce(
      (count, letter, index) => count + (letter === dimensionSignals.type[index] ? 1 : 0),
      0
    );

  return functionFit + rankFit + stackBalance + dichotomyMatches * 22 - shadowAverage * 0.45;
}

function calculateConfidence(
  bestScore: number,
  secondScore: number,
  percentages: FunctionScores,
  stack: FunctionStack,
  dimensionSignals: ReturnType<typeof getDimensionSignals>
): number {
  const [dom, aux, ter, inf] = stack;
  const scoreGap = Math.max(0, bestScore - secondScore);
  const normalizedGap = Math.min(100, scoreGap * 2.8);
  const dimensionMarginAverage =
    (dimensionSignals.margins.EI + dimensionSignals.margins.NS + dimensionSignals.margins.TF) / 3;
  const stackSpread =
    Math.max(0, percentages[dom] - percentages[aux]) +
    Math.max(0, percentages[aux] - percentages[ter]) +
    Math.max(0, percentages[ter] - percentages[inf]);
  const inferiorPenalty = Math.max(0, percentages[inf] - 45) * 1.5;

  const confidence = Math.round(
    Math.min(
      95,
      Math.max(
        25,
        normalizedGap * 0.45 +
          dimensionMarginAverage * 1.2 +
          stackSpread * 0.45 +
          (100 - inferiorPenalty) * 0.15
      )
    )
  );

  return confidence;
}

function determineVariant(
  percentages: FunctionScores,
  answers: Record<number, number>,
  dominantFunction: CognitiveFunction,
  confidence: number
): 'A' | 'T' {
  const avgScore = Object.values(percentages).reduce((sum, value) => sum + value, 0) / 8;
  const answerValues = Object.values(answers);
  const neutralCount = answerValues.filter((value) => value === 3).length;
  const decisiveCount = answerValues.filter((value) => value === 1 || value === 5).length;
  const dominantStrength = percentages[dominantFunction];

  const assertiveSignal =
    (avgScore >= 60 ? 1 : 0) +
    (dominantStrength >= 65 ? 1 : 0) +
    (decisiveCount >= neutralCount ? 1 : 0) +
    (confidence >= 70 ? 1 : 0);

  return assertiveSignal >= 3 ? 'A' : 'T';
}

function getTypeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    INTJ: 'The Architect - Pemikir strategis yang imajinatif dengan rencana untuk segala hal. INTJ adalah pemecah masalah analitis yang ingin meningkatkan sistem dan proses dengan ide-ide inovatif mereka.',
    INTP: 'The Logician - Penemu inovatif dengan kehausan akan pengetahuan yang tak terpuaskan. INTP adalah pemikir yang fleksibel dan analitis yang tertarik pada teori dan konsep abstrak.',
    ENTJ: 'The Commander - Pemimpin yang berani, imajinatif, dan berkemauan kuat yang selalu menemukan jalan atau membuatnya. ENTJ adalah pengorganisir yang kuat yang unggul dalam melihat kemungkinan untuk perbaikan.',
    ENTP: 'The Debater - Pemikir yang cerdas dan penasaran yang tidak bisa menolak tantangan intelektual. ENTP adalah inovator yang kreatif yang tertarik pada ide-ide baru dan kemungkinan.',
    INFJ: 'The Advocate - Idealis yang tenang dan mistis namun sangat inspiratif dan tak kenal lelah. INFJ adalah pemikir kreatif dengan pandangan yang kuat tentang bagaimana membuat dunia menjadi tempat yang lebih baik.',
    INFP: 'The Mediator - Orang yang puitis, baik hati, dan altruistik yang selalu ingin membantu tujuan yang baik. INFP adalah idealis yang dipandu oleh nilai-nilai inti mereka dan keyakinan bahwa semua orang pada dasarnya baik.',
    ENFJ: 'The Protagonist - Pemimpin yang karismatik dan inspiratif yang mampu mempesona pendengar mereka. ENFJ adalah komunikator yang hangat dan penuh perhatian yang tertarik pada pertumbuhan dan perkembangan orang lain.',
    ENFP: 'The Campaigner - Jiwa bebas yang antusias, kreatif, dan sosial yang selalu bisa menemukan alasan untuk tersenyum. ENFP adalah pencipta yang berpusat pada orang dengan fokus pada kemungkinan dan antusiasme yang menular untuk ide-ide baru.',
    ISTJ: 'The Logistician - Individu yang praktis dan berorientasi pada fakta yang keandalannya tidak dapat diragukan. ISTJ adalah pengorganisir yang bertanggung jawab yang didorong untuk menciptakan dan menegakkan ketertiban dalam sistem dan institusi.',
    ISFJ: 'The Defender - Pelindung yang sangat berdedikasi dan hangat yang selalu siap membela orang yang mereka cintai. ISFJ adalah pengasuh yang hangat dan penuh perhatian yang tertarik pada melayani orang lain dan memenuhi kebutuhan mereka.',
    ESTJ: 'The Executive - Administrator yang sangat baik yang tak tertandingi dalam mengelola hal-hal atau orang. ESTJ adalah pengorganisir yang keras yang unggul dalam mengelola orang dan proyek.',
    ESFJ: 'The Consul - Orang yang sangat peduli, sosial, dan populer yang selalu ingin membantu. ESFJ adalah pengasuh yang hangat dan penuh perhatian yang tertarik pada melayani orang lain dan memenuhi kebutuhan mereka.',
    ISTP: 'The Virtuoso - Eksperimen yang berani dan praktis yang menguasai segala jenis alat. ISTP adalah pemecah masalah yang fleksibel yang tertarik pada tindakan dan pengalaman langsung.',
    ISFP: 'The Adventurer - Seniman yang fleksibel dan menawan yang selalu siap untuk mengeksplorasi dan mengalami sesuatu yang baru. ISFP adalah seniman yang lembut dan peka yang tertarik pada keindahan dan pengalaman.',
    ESTP: 'The Entrepreneur - Orang yang cerdas, energik, dan sangat perseptif yang benar-benar menikmati hidup di tepi. ESTP adalah pengambil risiko yang energik yang hidup di saat ini dan tertarik pada tindakan.',
    ESFP: 'The Entertainer - Penghibur yang spontan, energik, dan antusias yang tidak pernah membosankan. ESFP adalah penghibur yang spontan dan energik yang menikmati menjadi pusat perhatian.',
  };

  return descriptions[type] || 'Tipe kepribadian yang unik dan menarik.';
}

function getTypeStrengths(type: string): string[] {
  const strengths: Record<string, string[]> = {
    INTJ: ['Pemikir strategis', 'Independen', 'Inovatif', 'Percaya diri', 'Tekun'],
    INTP: ['Analitis', 'Kreatif', 'Objektif', 'Fleksibel', 'Penasaran'],
    ENTJ: ['Pemimpin alami', 'Efisien', 'Percaya diri', 'Strategis', 'Tegas'],
    ENTP: ['Inovatif', 'Antusias', 'Cerdas', 'Fleksibel', 'Karismatik'],
    INFJ: ['Idealis', 'Empatik', 'Kreatif', 'Inspiratif', 'Tekun'],
    INFP: ['Idealis', 'Empatik', 'Kreatif', 'Autentik', 'Fleksibel'],
    ENFJ: ['Karismatik', 'Empatik', 'Inspiratif', 'Komunikatif', 'Altruistik'],
    ENFP: ['Antusias', 'Kreatif', 'Sosial', 'Optimis', 'Fleksibel'],
    ISTJ: ['Bertanggung jawab', 'Terorganisir', 'Praktis', 'Dapat diandalkan', 'Teliti'],
    ISFJ: ['Peduli', 'Dapat diandalkan', 'Praktis', 'Teliti', 'Loyal'],
    ESTJ: ['Terorganisir', 'Efisien', 'Tegas', 'Dapat diandalkan', 'Praktis'],
    ESFJ: ['Peduli', 'Sosial', 'Terorganisir', 'Loyal', 'Praktis'],
    ISTP: ['Praktis', 'Fleksibel', 'Analitis', 'Tenang', 'Efisien'],
    ISFP: ['Artistik', 'Fleksibel', 'Peka', 'Spontan', 'Loyal'],
    ESTP: ['Energik', 'Praktis', 'Spontan', 'Sosial', 'Fleksibel'],
    ESFP: ['Antusias', 'Sosial', 'Spontan', 'Praktis', 'Optimis'],
  };

  return strengths[type] || ['Unik', 'Menarik', 'Berharga'];
}

function getTypeWeaknesses(type: string): string[] {
  const weaknesses: Record<string, string[]> = {
    INTJ: ['Terlalu kritis', 'Perfeksionis', 'Kurang empati', 'Terlalu independen'],
    INTP: ['Kurang praktis', 'Terlalu analitis', 'Kurang empati', 'Prokrastinasi'],
    ENTJ: ['Terlalu dominan', 'Tidak sabar', 'Kurang empati', 'Terlalu kritis'],
    ENTP: ['Kurang fokus', 'Argumentatif', 'Tidak sabar', 'Kurang praktis'],
    INFJ: ['Perfeksionis', 'Terlalu sensitif', 'Burnout', 'Sulit membuka diri'],
    INFP: ['Terlalu idealis', 'Terlalu sensitif', 'Sulit membuat keputusan', 'Perfeksionis'],
    ENFJ: ['Terlalu altruistik', 'Terlalu sensitif', 'Sulit membuat keputusan sulit', 'Burnout'],
    ENFP: ['Kurang fokus', 'Terlalu optimis', 'Sulit menyelesaikan proyek', 'Terlalu sensitif'],
    ISTJ: ['Terlalu kaku', 'Sulit beradaptasi', 'Kurang fleksibel', 'Terlalu serius'],
    ISFJ: ['Terlalu altruistik', 'Sulit mengatakan tidak', 'Terlalu sensitif', 'Menghindari konflik'],
    ESTJ: ['Terlalu dominan', 'Tidak fleksibel', 'Kurang empati', 'Terlalu kritis'],
    ESFJ: ['Terlalu peduli pendapat orang', 'Sulit mengatakan tidak', 'Menghindari konflik', 'Terlalu sensitif'],
    ISTP: ['Kurang empati', 'Sulit mengekspresikan emosi', 'Terlalu independen', 'Impulsif'],
    ISFP: ['Terlalu sensitif', 'Sulit merencanakan', 'Menghindari konflik', 'Terlalu independen'],
    ESTP: ['Impulsif', 'Kurang fokus jangka panjang', 'Kurang empati', 'Mengambil risiko berlebihan'],
    ESFP: ['Impulsif', 'Kurang fokus jangka panjang', 'Terlalu sensitif', 'Menghindari konflik'],
  };

  return weaknesses[type] || ['Perlu pengembangan diri'];
}

function getTypeCareers(type: string): string[] {
  const careers: Record<string, string[]> = {
    INTJ: ['Arsitek', 'Insinyur', 'Ilmuwan', 'Analis', 'Konsultan Strategi', 'Programmer'],
    INTP: ['Ilmuwan', 'Programmer', 'Analis', 'Peneliti', 'Arsitek', 'Filsuf'],
    ENTJ: ['CEO', 'Manajer', 'Konsultan', 'Pengacara', 'Entrepreneur', 'Direktur'],
    ENTP: ['Entrepreneur', 'Konsultan', 'Pengacara', 'Inventor', 'Marketing', 'Analis'],
    INFJ: ['Konselor', 'Psikolog', 'Penulis', 'Guru', 'Pekerja Sosial', 'HR'],
    INFP: ['Penulis', 'Konselor', 'Seniman', 'Psikolog', 'Guru', 'Desainer'],
    ENFJ: ['Guru', 'Konselor', 'HR', 'Pelatih', 'Public Relations', 'Manajer'],
    ENFP: ['Marketing', 'Konselor', 'Jurnalis', 'Entrepreneur', 'Guru', 'Desainer'],
    ISTJ: ['Akuntan', 'Auditor', 'Manajer', 'Analis', 'Administrator', 'Insinyur'],
    ISFJ: ['Perawat', 'Guru', 'Administrator', 'Konselor', 'Pekerja Sosial', 'Librarian'],
    ESTJ: ['Manajer', 'Administrator', 'Pengacara', 'Akuntan', 'Direktur', 'Polisi'],
    ESFJ: ['Guru', 'Perawat', 'HR', 'Event Planner', 'Pekerja Sosial', 'Administrator'],
    ISTP: ['Mekanik', 'Insinyur', 'Pilot', 'Programmer', 'Analis', 'Teknisi'],
    ISFP: ['Seniman', 'Desainer', 'Musisi', 'Fotografer', 'Perawat', 'Chef'],
    ESTP: ['Entrepreneur', 'Sales', 'Marketing', 'Atlet', 'Paramedis', 'Polisi'],
    ESFP: ['Entertainer', 'Event Planner', 'Sales', 'Guru', 'Perawat', 'Desainer'],
  };

  return careers[type] || ['Berbagai bidang sesuai minat'];
}
