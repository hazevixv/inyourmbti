// MBTI Education - Detailed explanations for learning

export interface CognitiveFunctionDetail {
  code: string; // Ne, Ni, Se, Si, Te, Ti, Fe, Fi
  name: string; // Extraverted Intuition, dll
  shortDesc: string; // Deskripsi 1 kalimat
  summary?: string; // Ringkasan super simple (1-2 kalimat)
  fullDescription: string; // Penjelasan lengkap
  deepDive?: string; // Penjelasan SANGAT mendalam (5+ paragraf)
  howItWorks: string; // Bagaimana cara kerjanya
  psychologicalBasis?: string; // Dasar psikologis
  strengths: string[]; // Kekuatan function ini
  weaknesses: string[]; // Kelemahan function ini
  inDailyLife: string[]; // Contoh dalam kehidupan sehari-hari
  atWork?: string[]; // Di tempat kerja
  inRelationships?: string[]; // Dalam hubungan
  whenStressed?: string[]; // Saat stress
  whenHealthy?: string[]; // Saat sehat
  commonMisunderstandings?: string[]; // Kesalahpahaman umum
  developmentTips: string[]; // Cara mengembangkan
  exercises?: string[]; // Latihan praktis
  famousExamples?: string[]; // Contoh tokoh terkenal
}

export interface VariantDetail {
  code: string; // A or T
  name: string; // Assertive or Turbulent
  summary?: string; // Ringkasan simple
  description: string;
  deepExplanation?: string; // Penjelasan mendalam
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  inDailyLife?: string[]; // Contoh sehari-hari
  copingStrategies?: string[]; // Strategi coping
  growthPath?: string[]; // Jalur pertumbuhan
}

export interface TypeEducation {
  type: string; // INTJ, ENFP, dll
  nickname: string; // The Architect, dll
  tagline: string; // One-liner description
  overview: string; // Penjelasan lengkap (3-4 paragraf)
  functionStack: {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
  };
  strengths: string[];
  weaknesses: string[];
  inRelationships: string;
  atWork: string;
  growthTips: string[];
  famousExamples: string[];
}

// ============================================
// COGNITIVE FUNCTIONS - DETAILED EXPLANATIONS
// ============================================

export const COGNITIVE_FUNCTIONS: Record<string, CognitiveFunctionDetail> = {
  'Ne': {
    code: 'Ne',
    name: 'Extraverted Intuition',
    shortDesc: 'Melihat kemungkinan dan pola di dunia luar',
    summary: 'Ne adalah "radar kemungkinan" yang terus-menerus scan lingkungan untuk menemukan ide baru, pola tersembunyi, dan koneksi unik. Orang dengan Ne kuat adalah brainstormer alami yang selalu bertanya "bagaimana jika...?" dan melihat potensi di mana-mana.',
    
    fullDescription: `Extraverted Intuition (Ne) adalah fungsi kognitif yang fokus pada eksplorasi kemungkinan, pola, dan koneksi di dunia eksternal. Orang dengan Ne kuat selalu melihat "what could be" daripada "what is". Mereka seperti radar yang terus-menerus scan lingkungan untuk menemukan ide baru, kemungkinan, dan koneksi yang tidak terlihat oleh orang lain.

Ne membuat seseorang sangat kreatif, inovatif, dan open-minded. Mereka mudah bosan dengan rutinitas dan selalu mencari variasi. Dalam percakapan, mereka sering melompat dari satu topik ke topik lain karena otak mereka terus membuat koneksi baru.

Bayangkan Ne seperti seorang explorer yang tidak pernah puas dengan satu tempat. Mereka selalu ingin tahu "apa lagi yang ada di luar sana?" dan "bagaimana jika...?". Ini membuat mereka excellent brainstormers dan problem solvers yang kreatif.`,

    deepDive: `Extraverted Intuition (Ne) adalah salah satu fungsi kognitif paling dinamis dan ekspansif dalam sistem MBTI. Berbeda dengan fungsi sensing yang fokus pada realitas konkret, Ne beroperasi di realm kemungkinan, pola abstrak, dan koneksi konseptual. Ini adalah fungsi yang membuat seseorang melihat dunia bukan sebagai "apa adanya" tetapi sebagai "apa yang bisa menjadi".

**Mekanisme Kerja Ne yang Mendalam:**

Ne bekerja dengan cara yang sangat unik - ia terus-menerus mengumpulkan data dari lingkungan eksternal, tetapi bukan data sensory seperti warna atau suara (itu domain Se), melainkan data tentang kemungkinan, pola, dan koneksi. Ketika orang dengan Ne kuat melihat sebuah objek, mereka tidak hanya melihat objek itu sendiri, tetapi juga semua kemungkinan penggunaan, modifikasi, dan aplikasinya. Sebuah kursi bukan hanya tempat duduk - bisa jadi tangga, bisa jadi senjata, bisa jadi karya seni, bisa jadi bahan eksperimen.

Proses ini terjadi secara otomatis dan sangat cepat. Otak Ne users seperti mesin koneksi yang tidak pernah berhenti. Mereka melihat pola di mana orang lain melihat chaos, menemukan hubungan antara hal-hal yang tampaknya tidak berhubungan, dan generate ide-ide baru dengan kecepatan yang menakjubkan. Ini bukan proses conscious - ide-ide muncul begitu saja, seringkali di saat yang tidak terduga.

**Ne dalam Konteks Evolusi dan Survival:**

Dari perspektif evolusi, Ne adalah fungsi yang sangat valuable untuk survival species. Kemampuan untuk melihat kemungkinan dan alternatif memungkinkan manusia untuk:
- Mengantisipasi bahaya yang belum terjadi ("bagaimana jika predator datang dari arah itu?")
- Menemukan solusi kreatif untuk masalah baru ("bagaimana jika kita gunakan batu ini dengan cara berbeda?")
- Beradaptasi dengan lingkungan yang berubah ("apa lagi yang bisa kita makan jika makanan utama habis?")
- Berinovasi dan menciptakan tools baru ("bagaimana jika kita gabungkan dua benda ini?")

Ne users adalah innovators dan pioneers dalam masyarakat. Mereka yang pertama mencoba hal baru, yang berani eksperimen, yang tidak takut dengan unknown. Tanpa Ne, manusia mungkin masih stuck dengan cara-cara lama dan tidak pernah berkembang.

**Perbedaan Ne dengan Ni:**

Penting untuk memahami perbedaan fundamental antara Ne dan Ni (Introverted Intuition):
- **Ne (Extraverted)**: Divergent thinking - dari satu ide ke banyak kemungkinan. "Ini bisa jadi A, B, C, D, E..."
- **Ni (Introverted)**: Convergent thinking - dari banyak data ke satu insight. "Semua ini mengarah ke X"

Ne adalah ekspansi, Ni adalah konvergensi. Ne explore, Ni conclude. Ne bertanya "apa lagi?", Ni bertanya "apa artinya?". Keduanya powerful, tapi dengan cara yang sangat berbeda.

**Ne dan Kreativitas:**

Ne adalah engine utama kreativitas dalam MBTI. Kreativitas sejati membutuhkan kemampuan untuk:
1. Melihat kemungkinan yang tidak obvious
2. Membuat koneksi unik antar konsep
3. Break free dari conventional thinking
4. Generate banyak ide dengan cepat
5. Tidak takut dengan ide yang "gila" atau "tidak masuk akal"

Semua ini adalah signature Ne. Orang dengan Ne dominant (ENTP, ENFP) atau auxiliary (INTP, INFP) seringkali adalah seniman, inventor, entrepreneur, dan innovator yang mengubah dunia dengan ide-ide mereka.

**Tantangan Hidup dengan Ne Kuat:**

Namun, hidup dengan Ne yang sangat kuat juga punya challenges unik:

1. **Overwhelm dengan Pilihan**: Ketika kamu melihat 100 kemungkinan untuk setiap situasi, membuat keputusan menjadi sangat sulit. "Paralysis by analysis" adalah real problem untuk Ne users.

2. **Kesulitan Finishing**: Ne sangat excited dengan starting new things, tapi kurang excited dengan finishing. Ketika novelty hilang, interest juga hilang. Ini menghasilkan banyak unfinished projects.

3. **Dianggap Tidak Fokus**: Orang lain seringkali tidak understand kenapa Ne users "loncat-loncat" topik. Padahal bagi Ne users, semua topik itu connected - mereka melihat koneksinya yang orang lain tidak lihat.

4. **Bosan dengan Rutinitas**: Rutinitas adalah kryptonite untuk Ne. Melakukan hal yang sama berulang-ulang adalah torture. Ini bisa membuat Ne users struggle dengan pekerjaan atau relationship yang monoton.

5. **Susah "Be Present"**: Karena selalu thinking about possibilities, Ne users seringkali tidak fully present di moment sekarang. Mereka sudah mikirin "what's next" sebelum "what's now" selesai.

**Ne dalam Berbagai Life Stages:**

Ne berkembang dan manifest berbeda di berbagai tahap kehidupan:

**Childhood**: Ne children adalah yang paling curious, paling banyak bertanya "kenapa?", paling suka eksperimen. Mereka bisa turn cardboard box jadi spaceship, castle, atau submarine. Imagination mereka unlimited.

**Adolescence**: Ne teens adalah yang paling open to new experiences, paling suka try new things, paling rebellious terhadap "cara yang sudah ada". Mereka question everything dan explore identity dengan sangat aktif.

**Young Adulthood**: Ini adalah peak time untuk Ne. Energy tinggi, banyak opportunities, freedom untuk explore. Ne young adults seringkali punya banyak hobi, banyak interest, dan kesulitan "settle down" pada satu path.

**Middle Age**: Challenge untuk Ne users adalah ketika life demands stability dan consistency. Career, family, mortgage - semua ini require commitment yang bertentangan dengan nature Ne. Successful Ne users learn to channel their Ne dalam ways yang sustainable.

**Later Life**: Mature Ne adalah beautiful thing. Dengan wisdom dan experience, Ne users bisa melihat patterns dan possibilities dengan depth yang luar biasa. Mereka menjadi excellent mentors, advisors, dan visionaries.`,

    howItWorks: 'Ne bekerja dengan terus-menerus mengumpulkan informasi dari lingkungan eksternal dan mencari pola, kemungkinan, dan koneksi. Ketika melihat sesuatu, Ne langsung berpikir "ini bisa jadi apa lagi?" atau "ini mirip dengan...". Prosesnya sangat cepat dan sering tidak disadari - ide-ide baru muncul begitu saja. Ne seperti radar yang selalu aktif, scanning untuk novelty dan possibilities.',

    psychologicalBasis: 'Secara neurologis, Ne users menunjukkan aktivitas tinggi di area otak yang terkait dengan pattern recognition, divergent thinking, dan creative problem solving. Mereka cenderung punya koneksi neural yang lebih "loose" - memungkinkan ide-ide dari berbagai domain untuk connect dengan mudah. Ini adalah basis dari "lateral thinking" dan kreativitas. Research menunjukkan Ne users juga punya level dopamine yang lebih tinggi, yang membuat mereka lebih driven untuk seek novelty dan new experiences.',

    strengths: [
      'Kreativitas luar biasa - bisa generate ide-ide unik dan original',
      'Excellent brainstormer - dalam 10 menit bisa produce 50+ ide',
      'Melihat kemungkinan yang orang lain completely miss',
      'Sangat adaptable - bisa pivot dan adjust dengan cepat',
      'Open-minded dan non-judgmental - willing to consider semua perspektif',
      'Enthusiastic dan energetic tentang ide-ide baru',
      'Bisa membuat koneksi unik antar konsep yang berbeda',
      'Quick learner - mudah pick up new skills dan concepts',
      'Excellent dalam situasi yang butuh innovation dan out-of-box thinking',
      'Natural problem solver - selalu punya "plan B, C, D..."'
    ],

    weaknesses: [
      'Mudah bored dengan rutinitas dan repetitive tasks',
      'Susah fokus pada satu hal dalam waktu lama - attention span pendek',
      'Sering start banyak proyek tapi tidak finish - "serial starter"',
      'Bisa overwhelmed dengan terlalu banyak pilihan - decision paralysis',
      'Kurang detail-oriented - miss small but important details',
      'Impulsive - jump ke ide baru tanpa finish yang lama',
      'Bisa terlihat scattered, unfocused, atau "all over the place"',
      'Susah commit - selalu wondering "apa ada yang lebih baik?"',
      'Procrastination - especially untuk boring tasks',
      'Bisa unrealistic - terlalu optimistic tentang possibilities'
    ],

    inDailyLife: [
      'Saat shopping, kamu lihat satu barang dan langsung kepikiran 10 cara berbeda untuk menggunakannya',
      'Dalam meeting, kamu yang paling banyak kasih ide kreatif - bahkan untuk masalah yang bukan domain kamu',
      'Kamu punya banyak hobi yang dimulai dengan enthusiastic tapi belum selesai semua',
      'Saat ngobrol, kamu sering loncat-loncat topik - dari politik ke resep masakan ke filosofi dalam 5 menit',
      'Kamu mudah excited dengan ide atau project baru - "This is it! This is the one!"',
      'Kamu suka brainstorming dan "what if" scenarios - bisa spend hours discussing possibilities',
      'Kamu bisa lihat pola atau koneksi yang orang lain miss - "Eh ini mirip dengan itu lho!"',
      'Kamu sering punya "random" ideas di saat yang tidak terduga - di shower, sebelum tidur, saat nyetir',
      'Kamu bisa baca buku 5 buku sekaligus - loncat-loncat antar buku',
      'Kamu suka explore tempat baru, try makanan baru, meet orang baru - novelty is your fuel'
    ],

    atWork: [
      'Excellent di brainstorming sessions - kamu yang paling banyak contribute ide',
      'Bisa melihat opportunities yang orang lain tidak lihat',
      'Good dalam roles yang butuh innovation dan creativity',
      'Struggle dengan administrative tasks dan paperwork',
      'Prefer variety - bosan jika harus do the same thing every day',
      'Bisa overwhelm team dengan terlalu banyak ide',
      'Sometimes start projects dengan enthusiasm tapi lose interest di tengah jalan',
      'Excellent dalam crisis situations - bisa quickly generate alternative solutions',
      'Prefer flexible work environment - rigid structure is suffocating',
      'Bisa menjadi catalyst untuk change dan innovation di organization'
    ],

    inRelationships: [
      'Kamu bring excitement dan spontaneity ke relationship',
      'Selalu punya ide untuk date atau activities yang fun dan unique',
      'Bisa bored jika relationship jadi terlalu predictable atau routine',
      'Kamu appreciate partner yang open-minded dan willing to try new things',
      'Sometimes struggle dengan commitment - "what if there\'s someone better?"',
      'Kamu good at seeing potential dalam people - "kamu bisa jadi..."',
      'Bisa frustrating untuk partner yang prefer stability dan routine',
      'Kamu need intellectual stimulation - deep conversations adalah must',
      'Sometimes forget important dates atau details - not because you don\'t care, tapi karena mind kamu elsewhere',
      'Kamu loyal tapi need freedom - possessive partner is a deal-breaker'
    ],

    whenStressed: [
      'Menjadi scattered dan overwhelmed - terlalu banyak ide, tidak tahu mana yang harus diprioritaskan',
      'Procrastination meningkat - avoid tasks dengan explore possibilities yang tidak productive',
      'Bisa jadi anxious tentang future - "what if I\'m missing out on something better?"',
      'Lose ability to focus - jump dari satu thing ke another tanpa finish anything',
      'Menjadi impulsive - make decisions tanpa think through consequences',
      'Bisa withdraw dan isolate - overwhelmed dengan terlalu banyak stimulation',
      'Physical health neglected - lupa makan, lupa tidur karena too absorbed dalam ideas'
    ],

    whenHealthy: [
      'Incredibly creative dan productive - ide-ide brilliant yang actually executed',
      'Balanced antara exploration dan execution - start AND finish projects',
      'Enthusiastic dan inspiring untuk orang di sekitar',
      'Bisa see big picture sekaligus appreciate details (dengan bantuan other functions)',
      'Adaptable dan resilient - bisa handle change dengan grace',
      'Curious dan always learning - growth mindset yang kuat',
      'Bring joy dan excitement ke every situation',
      'Excellent problem solver - creative solutions untuk complex problems'
    ],

    commonMisunderstandings: [
      'Myth: "Ne users tidak bisa fokus" - Truth: Mereka bisa fokus intensely, tapi hanya pada hal yang genuinely interesting',
      'Myth: "Ne users tidak reliable" - Truth: Mereka reliable untuk hal yang mereka commit, challenge-nya adalah over-committing',
      'Myth: "Ne users hanya dreamers, tidak practical" - Truth: Ne bisa sangat practical ketika paired dengan good judging function',
      'Myth: "Ne users ADHD" - Truth: Ne bisa mirip ADHD tapi itu cognitive preference, bukan disorder',
      'Myth: "Ne users tidak bisa finish anything" - Truth: Mereka bisa finish, tapi butuh right motivation dan structure',
      'Myth: "Ne users selalu happy dan energetic" - Truth: Mereka bisa struggle dengan anxiety dan overwhelm juga'
    ],

    developmentTips: [
      'Practice finishing what you start - pilih 1-2 project dan commit sampai selesai, resist urge untuk start yang baru',
      'Develop Si (opposite function) - belajar appreciate routine, detail, dan proven methods. Not everything needs to be new',
      'Use tools untuk stay organized - to-do lists, project management apps, reminders. External structure helps',
      'Set boundaries - jangan ambil terlalu banyak project sekaligus. Learn to say "not now" instead of "no"',
      'Practice mindfulness - be present in the moment. Your mind will wander, that\'s okay, gently bring it back',
      'Learn to evaluate ideas - not semua ide perlu dieksekusi. Develop criteria untuk filter ideas',
      'Partner dengan orang yang detail-oriented (Si users) untuk balance',
      'Schedule "exploration time" dan "execution time" - jangan mix keduanya',
      'Learn to appreciate the process, not just the novelty - find joy dalam mastery, not just discovery',
      'Develop your judging function (Te atau Fe) untuk help make decisions dan take action'
    ],

    exercises: [
      'Finish One Thing Challenge: Pilih satu unfinished project dan commit untuk finish dalam 1 minggu',
      'Idea Journal: Tulis semua ide kamu, tapi jangan act on them immediately. Review setelah 1 minggu',
      'Routine Practice: Buat satu simple routine dan stick to it for 30 days - morning routine, exercise, dll',
      'Deep Focus Session: Set timer 25 menit (Pomodoro), fokus pada ONE task, no distractions',
      'Mindfulness Meditation: 10 menit per hari, practice being present tanpa chase thoughts',
      'Decision Making Exercise: Untuk setiap decision, limit options to 3, then choose dalam 24 jam',
      'Detail Attention: Pilih satu activity dan notice semua details - colors, textures, sounds',
      'Follow Through Tracker: Track berapa project yang kamu start vs finish. Aim untuk improve ratio',
      'Constraint Creativity: Give yourself constraints - "create something dengan only 3 colors" - learn to work within limits',
      'Teach Someone: Explain satu concept yang kamu understand deeply - this forces you to organize scattered thoughts'
    ],

    famousExamples: [
      'Leonardo da Vinci - ultimate Renaissance man, interested dalam everything dari art sampai engineering',
      'Richard Branson - entrepreneur yang constantly start new ventures di berbagai industries',
      'Robin Williams - comedian dengan improvisational genius, bisa connect unrelated concepts instantly',
      'Walt Disney - visionary yang melihat possibilities di mana orang lain melihat impossibilities',
      'Elon Musk - innovator yang constantly explore new ideas dari electric cars sampai space travel',
      'Jim Carrey - actor dengan incredible range dan creativity',
      'Mark Twain - writer dengan wit dan ability untuk see connections yang unexpected',
      'Benjamin Franklin - polymath dengan interests di science, politics, writing, invention'
    ]
  },
  
  'Ni': {
    code: 'Ni',
    name: 'Introverted Intuition',
    shortDesc: 'Melihat pola tersembunyi dan visi masa depan',
    summary: 'Ni adalah fungsi yang fokus pada visi, insight mendalam, dan pemahaman pola tersembunyi untuk melihat masa depan.',
    fullDescription: `Introverted Intuition (Ni) adalah fungsi kognitif yang fokus pada pemahaman mendalam tentang pola tersembunyi, makna, dan visi masa depan. Berbeda dengan Ne yang explore banyak kemungkinan, Ni converge ke satu insight atau visi yang kuat. Orang dengan Ni kuat sering punya "aha moments" atau firasat yang ternyata benar.

Ni bekerja di background, memproses informasi secara unconscious dan tiba-tiba menghasilkan insight yang mendalam. Mereka sering "just know" sesuatu tanpa bisa explain kenapa. Ini bukan magic - otak mereka sudah memproses banyak informasi dan menemukan pola yang tidak terlihat secara conscious.

Bayangkan Ni seperti seorang prophet atau visionary yang bisa "melihat" masa depan. Mereka punya sense yang kuat tentang "ke mana ini akan mengarah" dan sering benar. Ini membuat mereka excellent strategic thinkers dan long-term planners.`,
    deepDive: `Introverted Intuition (Ni) adalah salah satu fungsi kognitif paling mysterious dan powerful dalam sistem MBTI. Berbeda dengan Ne yang divergent (explore banyak possibilities), Ni adalah convergent - mengambil banyak informasi dan converge ke satu insight, visi, atau understanding yang mendalam.

**Mekanisme Kerja Ni yang Unik:**

Ni bekerja di level unconscious. Bayangkan iceberg - yang terlihat di permukaan adalah insight atau visi yang sudden, tapi di bawah permukaan ada massive processing yang terjadi tanpa conscious awareness. Prosesnya seperti:

1. **Unconscious Data Collection** - Ni constantly absorb informasi dari environment, experiences, conversations, observations
2. **Pattern Recognition** - Di background, otak mencari patterns, connections, underlying meanings
3. **Synthesis** - Semua data disintesis menjadi satu understanding yang cohesive
4. **Sudden Insight** - Tiba-tiba, "aha moment" - understanding muncul ke conscious awareness
5. **Strong Conviction** - Insight ini datang dengan strong sense of certainty

Ini kenapa Ni users sering "just know" sesuatu tapi susah explain. Mereka tidak consciously process step-by-step - hasilnya langsung muncul sebagai complete understanding.

**Ni dan Visi Masa Depan:**

Ni adalah fungsi yang paling future-oriented. Mereka tidak just think about future - mereka SEE it. Visi mereka bukan wishful thinking atau random imagination - ini adalah extrapolation dari patterns yang mereka recognize. Mereka bisa predict:
- **Trends** - "this will become popular"
- **Outcomes** - "if we do this, that will happen"
- **People** - "he will eventually..."
- **Situations** - "this is heading toward..."

Dan seringkali, mereka benar. Ini bukan psychic ability - ini adalah pattern recognition yang sangat sophisticated.

**Perbedaan Ni dengan Ne:**

Fundamental difference adalah direction of thinking:

**Ni (Introverted Intuition):**
- **Convergent** - many inputs → one insight
- **Depth** - go deep into one possibility
- **Certainty** - strong conviction about vision
- **Future-focused** - "where is this going?"
- **Singular** - THE answer, THE vision

**Ne (Extraverted Intuition):**
- **Divergent** - one input → many possibilities
- **Breadth** - explore many possibilities
- **Openness** - all options are valid
- **Present-possibilities** - "what else could this be?"
- **Multiple** - many answers, many visions

Ni narrows down, Ne expands. Ni concludes, Ne explores. Ni says "this is it", Ne says "or maybe this, or this, or this".

**Ni dan Symbolism:**

Ni users are naturally drawn to symbolism, metaphors, dan deeper meanings. Mereka see beyond surface:
- **Dreams** - rich symbolic content
- **Art** - appreciate layered meanings
- **Literature** - love symbolism dan themes
- **Philosophy** - drawn to big questions
- **Spirituality** - seek deeper truths

Mereka tidak satisfied dengan "what is" - mereka want to understand "what it means" dan "what it represents".

**Tantangan Hidup dengan Ni Kuat:**

1. **Difficulty Explaining**: Biggest challenge adalah communicating insights. "I just know" tidak convincing untuk others. Mereka need to learn to backtrack their unconscious process dan explain step-by-step.

2. **Tunnel Vision**: Ketika Ni locks onto satu visi, bisa jadi blind to alternatives. "This is THE way" - tapi what if there are other ways?

3. **Disconnected from Present**: Terlalu focused pada future atau deeper meanings bisa mean missing what's actually happening NOW. Present moment awareness adalah challenge.

4. **Misunderstood**: Ni users often feel misunderstood. Their insights seem obvious to them tapi mysterious to others. "Why doesn't everyone see this?"

5. **Overthinking Meanings**: Everything has deeper meaning - tapi sometimes a cigar is just a cigar. Not everything needs deep analysis.

6. **Impatient with Details**: Ni sees big picture. Details bisa boring atau frustrating. Tapi details matter untuk execution.

**Ni dalam Berbagai Life Stages:**

**Childhood**: Ni children are dreamers dan deep thinkers. Mereka ask profound questions, have vivid imaginations, dan seem "old souls". Sometimes struggle dengan being present dalam play.

**Adolescence**: Ni teens are idealistic dan visionary. Mereka have strong sense of "who they want to become" dan "what they want to achieve". Sometimes frustrated dengan present reality.

**Young Adulthood**: Peak time untuk developing visions. Career, life purpose, relationships - semua guided by strong internal vision. Challenge adalah translating vision into action.

**Middle Age**: Mature Ni adalah powerful - visions are grounded dalam experience. Excellent strategists, leaders, mentors. Can see long-term implications clearly.

**Later Life**: Ni users become wise visionaries. Their pattern recognition is refined by decades of experience. Can offer profound insights dan guidance.`,
    
    howItWorks: `Ni bekerja dengan mengumpulkan informasi secara unconscious, mencari pola dan makna tersembunyi, lalu menghasilkan satu insight atau visi yang kuat. Prosesnya internal dan sering tidak bisa dijelaskan dengan kata-kata.

Ketika Ni user experience dunia, mereka:
1. **Absorb Information Unconsciously** - tidak actively analyzing, just taking it in
2. **Background Processing** - otak works di background, finding patterns
3. **Synthesis** - connect dots dari berbagai sources
4. **Sudden Insight** - "aha!" moment - understanding emerges complete
5. **Strong Conviction** - insight comes dengan certainty

Hasilnya muncul sebagai "gut feeling", sudden realization, atau clear vision. "I just know" adalah signature Ni phrase. Prosesnya mysterious even to Ni users themselves - mereka tidak always understand HOW they know, they just know.`,
    
    psychologicalBasis: `Secara neurologis, Ni users menunjukkan heightened activity dalam areas involved dalam pattern recognition, unconscious processing, dan future simulation. Default mode network (active during mind-wandering dan internal focus) is more active. Mereka punya strong connections antara different brain regions, memungkinkan synthesis of diverse information.

Research menunjukkan:
- **Enhanced Pattern Recognition**: Superior ability to detect patterns dalam complex data
- **Unconscious Processing**: More activity dalam unconscious processing areas
- **Future Simulation**: Strong activity dalam areas that simulate future scenarios
- **Symbolic Thinking**: Enhanced processing dalam areas involved dalam metaphorical thinking
- **Integration**: Better integration of information from multiple sources

Brain imaging shows Ni users process information dengan focus pada synthesis dan convergence rather than analysis dan divergence. Mereka excel dalam tasks requiring insight, prediction, dan strategic thinking.

Dari evolutionary perspective, Ni adalah valuable untuk:
- **Long-term Planning**: Anticipate future needs dan challenges
- **Strategic Thinking**: Plan complex strategies
- **Pattern Recognition**: Recognize threats atau opportunities early
- **Social Prediction**: Predict others' behavior
- **Innovation**: Envision new possibilities`,
    strengths: [
      'Visionary - bisa "melihat" masa depan dengan clarity',
      'Strategic thinker yang excellent - long-term planning',
      'Punya intuisi yang sangat akurat - "gut feeling" yang reliable',
      'Bisa melihat makna tersembunyi di balik hal-hal - depth perception',
      'Focused dan determined - single-minded pursuit of vision',
      'Excellent long-term planning - see implications years ahead',
      'Deep understanding tentang complex issues - synthesis ability',
      'Pattern recognition yang superior - connect dots others miss',
      'Insightful - profound understanding yang sudden',
      'Independent thinking - form own visions',
      'Symbolic thinking - appreciate metaphors dan deeper meanings',
      'Predictive ability - anticipate outcomes accurately'
    ],
    
    weaknesses: [
      'Susah menjelaskan insight mereka ke orang lain - "I just know"',
      'Bisa terlihat mysterious atau hard to understand - enigmatic',
      'Terlalu fokus pada visi sampai miss present moment - future-obsessed',
      'Bisa stubborn dengan visi mereka - tunnel vision',
      'Overthink dan overanalyze meanings - everything has deeper meaning',
      'Susah relate dengan orang yang tidak "get it" - feel misunderstood',
      'Bisa lost in their own world - disconnected from reality',
      'Impatient dengan details - big picture focus',
      'Can be impractical - vision without execution plan',
      'May dismiss present reality - "but in the future..."',
      'Difficulty with spontaneity - everything planned',
      'Can be pessimistic - see potential problems too clearly'
    ],
    
    inDailyLife: [
      'Kamu sering punya firasat yang ternyata benar - "I knew it!"',
      'Kamu "tahu" sesuatu akan terjadi sebelum terjadi - predictive sense',
      'Orang sering tidak mengerti maksud kamu saat bicara - too abstract',
      'Kamu suka mencari "deeper meaning" di balik segala hal - symbolism',
      'Kamu punya visi jelas tentang masa depan kamu - life plan',
      'Kamu sering melamun tentang future possibilities - daydreaming',
      'Kamu bisa predict outcome dari situasi dengan akurat - pattern recognition',
      'Kamu frustrated ketika others don\'t see what you see - "it\'s obvious!"',
      'Kamu prefer meaningful conversations over small talk - depth',
      'Kamu have strong sense of "this is meant to be" - destiny feeling',
      'Kamu notice patterns yang others completely miss - connections',
      'Kamu often know what someone will say before they say it - anticipation'
    ],
    
    atWork: [
      'Excel in strategic planning - see 5-10 years ahead',
      'Good at long-term vision - company direction, market trends',
      'Strong pattern recognition - identify opportunities early',
      'Insightful problem-solving - see root causes',
      'Excellent dalam roles requiring foresight - strategy, consulting',
      'Good at predicting market trends - anticipate changes',
      'Thrive dalam innovation roles - envision new products/services',
      'Struggle dengan routine tasks - need meaningful work',
      'Prefer autonomy - need space untuk think',
      'Good at seeing potential dalam people - talent recognition',
      'Excel dalam research - deep dive into subjects',
      'Prefer working toward long-term goals - not short-term tasks',
      'Good at crisis prevention - see problems before they happen',
      'Thrive dalam roles requiring insight - psychology, philosophy, strategy'
    ],
    
    inRelationships: [
      'Kamu form deep connections - surface relationships unsatisfying',
      'Kamu understand partner deeply - see their potential',
      'Kamu see relationship potential early - "this could be something"',
      'May seem distant - lost in thoughts',
      'Kamu have vision untuk relationship - where it\'s going',
      'Sometimes analyze relationship too much - deeper meanings',
      'Kamu loyal when committed - vision includes partner',
      'Need partner who appreciates depth - intellectual connection',
      'Sometimes forget to be present - thinking about future',
      'Kamu can predict relationship trajectory - see patterns',
      'Need meaningful connection - small talk is draining',
      'Appreciate partner who "gets" your insights - understanding',
      'Sometimes have unrealistic expectations - vision vs reality',
      'Kamu value authenticity - see through facades'
    ],
    
    whenStressed: [
      'Tunnel vision intensifies - obsessed with one outcome',
      'Obsessive thoughts - can\'t stop thinking about vision',
      'Disconnected from reality - lost in internal world',
      'Overly pessimistic - see all potential disasters',
      'Withdraw completely - need to process alone',
      'Physical needs neglected - forget to eat, sleep',
      'Become rigid - "this is THE only way"',
      'Catastrophize - worst-case scenarios dominate'
    ],
    
    whenHealthy: [
      'Clear vision balanced dengan present awareness',
      'Balanced perspective - see possibilities AND reality',
      'Grounded insights - visions are actionable',
      'Inspiring leadership - share vision effectively',
      'Strategic excellence - long-term plans that work',
      'Deep wisdom - profound understanding',
      'Can explain insights - make abstract concrete',
      'Balanced future-focus dengan present enjoyment'
    ],
    
    commonMisunderstandings: [
      'Myth: "Ni users are psychic" - Truth: Pattern recognition, not magic',
      'Myth: "Ni users always right" - Truth: Can be wrong despite strong intuition',
      'Myth: "Ni users don\'t need details" - Truth: Need to balance with sensing',
      'Myth: "Ni users are mysterious on purpose" - Truth: Genuinely hard to explain process',
      'Myth: "Ni users live in fantasy" - Truth: Visions based on real patterns',
      'Myth: "Ni users are pessimistic" - Truth: Just see potential problems clearly'
    ],
    
    developmentTips: [
      'Practice explaining your insights - use metaphors, analogies, examples',
      'Develop Se (opposite function) - be more present in the moment, enjoy sensory experiences',
      'Ground your visions in reality - create action plans, break down into steps',
      'Listen to others\' perspectives - your vision might not be the only valid one',
      'Balance future-focus dengan present awareness - practice mindfulness',
      'Test your intuitions - track accuracy, learn from misses',
      'Share your insights more - don\'t keep everything inside, teach others',
      'Appreciate details - they matter untuk execution',
      'Be open to being wrong - strong conviction doesn\'t mean certainty',
      'Practice explaining step-by-step - backtrack your unconscious process',
      'Value present moment - future is built on now',
      'Collaborate dengan Se users - they ground your visions'
    ],
    
    exercises: [
      'Journaling insights: Write down predictions, check accuracy later',
      'Testing predictions: Make specific predictions, track results',
      'Mindfulness practice: 10 minutes daily being fully present',
      'Explaining visions to others: Practice making abstract concrete',
      'Sensory awareness: Notice 5 things you see, hear, feel right now',
      'Action planning: Take one vision, create detailed execution plan',
      'Present moment activities: Cooking, sports, art - be fully engaged',
      'Collaborative visioning: Share insights, get feedback',
      'Detail appreciation: Spend time on one small detail, appreciate it',
      'Reality checking: For each vision, list what\'s realistic vs idealistic'
    ],
    
    famousExamples: [
      'Carl Jung - psychologist, visionary, pattern recognition',
      'Plato - philosopher, ideal forms, deeper truths',
      'Martin Luther King Jr. - "I have a dream", powerful vision',
      'Nelson Mandela - long-term vision untuk South Africa',
      'Nikola Tesla - visionary inventor, saw future technology',
      'Friedrich Nietzsche - philosopher, profound insights',
      'Fyodor Dostoevsky - writer, deep psychological insight',
      'Gandalf (LOTR) - wise, sees bigger picture, strategic'
    ]
  },

  'Se': {
    code: 'Se',
    name: 'Extraverted Sensing',
    shortDesc: 'Hidup di momen sekarang dengan semua indera',
    fullDescription: `Extraverted Sensing (Se) adalah fungsi kognitif yang fokus pada pengalaman langsung di saat ini melalui semua indera. Orang dengan Se kuat adalah ultimate "live in the moment" people. Mereka sangat aware dengan lingkungan sekitar - warna, suara, tekstur, gerakan - dan menikmati sensasi fisik.

Se membuat seseorang sangat present, action-oriented, dan responsive terhadap lingkungan. Mereka tidak overthink - mereka just do it. Dalam situasi krisis, mereka yang paling calm dan quick to react karena mereka tidak stuck di kepala mereka.

Bayangkan Se seperti seorang athlete atau performer yang completely in the zone. Mereka tidak mikirin masa lalu atau masa depan - mereka fully immersed dalam apa yang terjadi sekarang. Ini membuat mereka excellent dalam situasi yang butuh quick reflexes dan adaptability.`,
    howItWorks: 'Se bekerja dengan terus-menerus absorb informasi sensory dari lingkungan dan respond secara langsung. Tidak ada filter atau interpretation - apa yang mereka lihat, dengar, dan rasakan langsung diproses dan ditindaklanjuti. Prosesnya sangat cepat dan instinctive.',
    strengths: [
      'Sangat present dan aware',
      'Quick reflexes dan reaction time',
      'Excellent dalam situasi krisis',
      'Appreciate beauty dan aesthetics',
      'Action-oriented - tidak overthink',
      'Adaptable dan spontaneous',
      'Enjoy life dan sensory experiences'
    ],
    weaknesses: [
      'Bisa impulsive dan reckless',
      'Kurang long-term planning',
      'Bisa addicted ke sensory stimulation',
      'Susah dengan abstract concepts',
      'Bisa shallow - fokus pada surface',
      'Risk-taking yang berlebihan',
      'Bisa bored dengan routine'
    ],
    inDailyLife: [
      'Kamu selalu notice perubahan kecil di lingkungan',
      'Kamu suka extreme sports atau aktivitas yang menantang',
      'Kamu punya sense of direction yang bagus',
      'Kamu appreciate makanan enak, musik, dan sensory experiences',
      'Kamu quick to react dalam situasi emergency',
      'Kamu suka fashion dan aesthetics',
      'Kamu prefer action daripada planning'
    ],
    developmentTips: [
      'Develop Ni (opposite function) - think about long-term consequences',
      'Practice delayed gratification - tidak semua impulse perlu dituruti',
      'Balance action dengan reflection',
      'Set long-term goals - jangan hanya fokus pada now',
      'Learn to appreciate abstract concepts',
      'Practice mindfulness - be present tapi juga aware',
      'Think before you act - especially dalam keputusan besar'
    ]
  },

  'Si': {
    code: 'Si',
    name: 'Introverted Sensing',
    shortDesc: 'Mengingat detail dan menghargai tradisi',
    fullDescription: `Introverted Sensing (Si) adalah fungsi kognitif yang fokus pada memori detail, pengalaman masa lalu, dan apa yang sudah terbukti berhasil. Orang dengan Si kuat punya memori yang luar biasa - mereka bisa recall detail kecil dari pengalaman lama dengan sangat jelas.

Si membuat seseorang appreciate routine, tradisi, dan stability. Mereka comfortable dengan yang familiar dan cautious dengan perubahan. Ini bukan karena mereka boring - mereka just value apa yang sudah proven dan reliable.

Bayangkan Si seperti seorang librarian atau historian yang carefully preserve dan organize informasi. Mereka punya internal database yang sangat detail tentang pengalaman masa lalu, dan mereka use ini untuk navigate present dan future.`,
    howItWorks: 'Si bekerja dengan menyimpan detail pengalaman masa lalu dan membandingkan situasi sekarang dengan memori tersebut. "Ini mirip dengan waktu itu..." adalah signature Si. Mereka use past experiences sebagai guide untuk present decisions.',
    strengths: [
      'Memori yang sangat kuat',
      'Detail-oriented dan teliti',
      'Reliable dan consistent',
      'Appreciate tradisi dan history',
      'Practical dan grounded',
      'Good dengan routine dan organization',
      'Careful dan thorough'
    ],
    weaknesses: [
      'Resistant to change',
      'Bisa stuck in the past',
      'Terlalu cautious',
      'Susah dengan hal baru',
      'Bisa rigid dan inflexible',
      'Overthink based on past experiences',
      'Bisa pessimistic - "ini pernah gagal dulu"'
    ],
    inDailyLife: [
      'Kamu ingat detail kecil yang orang lain lupa',
      'Kamu suka routine dan merasa nyaman dengan familiar',
      'Kamu sering compare situasi sekarang dengan masa lalu',
      'Kamu appreciate tradisi dan ritual',
      'Kamu teliti dan memperhatikan detail',
      'Kamu prefer cara yang sudah proven',
      'Kamu uncomfortable dengan perubahan mendadak'
    ],
    developmentTips: [
      'Develop Ne (opposite function) - be open to new possibilities',
      'Challenge yourself dengan hal baru',
      'Don\'t let past failures limit future attempts',
      'Balance tradition dengan innovation',
      'Practice flexibility - not everything needs to be planned',
      'Focus on present dan future, not just past',
      'Try new experiences - expand your comfort zone'
    ]
  },

  'Te': {
    code: 'Te',
    name: 'Extraverted Thinking',
    shortDesc: 'Organize dunia dengan logika dan efisiensi',
    fullDescription: `Extraverted Thinking (Te) adalah fungsi kognitif yang fokus pada organizing dunia eksternal dengan logika, efisiensi, dan struktur. Orang dengan Te kuat adalah natural organizers dan leaders. Mereka melihat chaos dan langsung berpikir "bagaimana cara paling efisien untuk fix ini?"

Te membuat seseorang very goal-oriented, decisive, dan action-focused. Mereka tidak suka pemborosan waktu atau inefficiency. Dalam meeting, mereka yang langsung to the point dan push untuk decisions dan actions.

Bayangkan Te seperti seorang CEO atau project manager yang excellent. Mereka bisa melihat big picture, break it down jadi tasks, assign resources, dan execute dengan efisien. Mereka value results over process.`,
    howItWorks: 'Te bekerja dengan menganalisis situasi secara objektif, membuat sistem dan struktur, lalu execute dengan efisien. Fokusnya pada "apa yang works" dan "bagaimana cara paling efisien". Decisions dibuat based on logic dan facts, bukan feelings.',
    strengths: [
      'Excellent organizer dan planner',
      'Decisive dan action-oriented',
      'Efficient dan productive',
      'Natural leader',
      'Objective dan logical',
      'Good dengan systems dan structures',
      'Results-focused'
    ],
    weaknesses: [
      'Bisa insensitive terhadap feelings',
      'Terlalu blunt atau harsh',
      'Impatient dengan inefficiency',
      'Bisa bossy atau controlling',
      'Workaholic tendency',
      'Susah relax dan enjoy process',
      'Bisa steamroll over others'
    ],
    inDailyLife: [
      'Kamu suka membuat to-do lists dan systems',
      'Kamu langsung to the point, tidak suka basa-basi',
      'Kamu frustrated dengan inefficiency',
      'Kamu suka organize orang dan resources',
      'Kamu fokus pada results, bukan process',
      'Kamu tidak takut mengkritik atau give feedback',
      'Kamu natural take charge dalam group projects'
    ],
    developmentTips: [
      'Develop Fi (opposite function) - consider feelings dan values',
      'Practice empathy - not everything is about efficiency',
      'Learn to appreciate process, not just results',
      'Be more patient dengan orang yang slower',
      'Balance work dengan personal life',
      'Soften your communication - be direct tapi kind',
      'Listen to others\' input - tidak semua harus cara kamu'
    ]
  },

  'Ti': {
    code: 'Ti',
    name: 'Introverted Thinking',
    shortDesc: 'Analyze dan understand sistem secara mendalam',
    fullDescription: `Introverted Thinking (Ti) adalah fungsi kognitif yang fokus pada understanding mendalam tentang bagaimana sesuatu bekerja secara logical. Orang dengan Ti kuat adalah natural analysts dan problem solvers. Mereka tidak puas dengan "apa" - mereka butuh tahu "kenapa" dan "bagaimana".

Ti membuat seseorang sangat analytical, logical, dan precise. Mereka suka membuat mental models dan frameworks untuk understand dunia. Dalam diskusi, mereka yang paling likely point out logical inconsistencies atau fallacies.

Bayangkan Ti seperti seorang scientist atau philosopher yang terus bertanya "kenapa?" sampai mereka understand underlying principles. Mereka value truth dan logical consistency di atas segalanya.`,
    howItWorks: 'Ti bekerja dengan menganalisis informasi secara internal, mencari logical consistency, dan membangun mental frameworks. Prosesnya slow dan thorough - mereka butuh waktu untuk fully understand sebelum conclude. Fokusnya pada "apakah ini logically sound?"',
    strengths: [
      'Analytical dan logical',
      'Deep understanding',
      'Excellent problem solver',
      'Precise dan accurate',
      'Independent thinker',
      'Good dengan complex systems',
      'Objective dan fair'
    ],
    weaknesses: [
      'Overthink dan overanalyze',
      'Slow decision maker',
      'Bisa paralyzed by analysis',
      'Susah explain thoughts ke orang lain',
      'Bisa arrogant tentang logic',
      'Dismiss feelings sebagai "illogical"',
      'Bisa stuck in theory, tidak action'
    ],
    inDailyLife: [
      'Kamu suka analyze dan understand cara kerja sesuatu',
      'Kamu butuh waktu untuk think sebelum decide',
      'Kamu suka menemukan inconsistencies dalam argumen',
      'Kamu prefer understand principles daripada hafal facts',
      'Kamu sering question assumptions',
      'Kamu suka berdebat untuk test logic',
      'Kamu bisa spend hours understanding satu concept'
    ],
    developmentTips: [
      'Develop Fe (opposite function) - consider social harmony',
      'Practice making decisions faster - not everything needs perfect analysis',
      'Balance theory dengan practice - apply your knowledge',
      'Learn to explain your thoughts clearly',
      'Appreciate that feelings are valid too',
      'Don\'t let analysis paralysis stop you from action',
      'Be humble - logic isn\'t everything'
    ]
  },

  'Fe': {
    code: 'Fe',
    name: 'Extraverted Feeling',
    shortDesc: 'Peduli dan create harmony dengan orang lain',
    fullDescription: `Extraverted Feeling (Fe) adalah fungsi kognitif yang fokus pada understanding dan responding terhadap emotions dan needs orang lain. Orang dengan Fe kuat adalah natural empaths dan harmonizers. Mereka sangat aware dengan "vibe" di ruangan dan bisa feel apa yang orang lain rasakan.

Fe membuat seseorang very people-oriented, warm, dan expressive. Mereka care deeply tentang relationships dan social harmony. Dalam group, mereka yang make sure everyone feels included dan comfortable.

Bayangkan Fe seperti seorang host yang excellent atau counselor yang caring. Mereka bisa read the room, adjust their behavior untuk create harmony, dan make everyone feel valued.`,
    howItWorks: 'Fe bekerja dengan terus-menerus scan emotional atmosphere dan respond accordingly. Mereka absorb emotions dari orang lain dan feel responsible untuk maintain harmony. Decisions dibuat based on "apa yang baik untuk group" dan "bagaimana ini affect others".',
    strengths: [
      'Sangat empathetic',
      'Excellent dengan people',
      'Create harmony dan unity',
      'Warm dan welcoming',
      'Good communicator',
      'Supportive dan caring',
      'Read emotions dengan baik'
    ],
    weaknesses: [
      'Terlalu people-pleasing',
      'Susah say no',
      'Absorb negative emotions dari orang',
      'Butuh external validation',
      'Avoid conflict berlebihan',
      'Neglect own needs',
      'Bisa manipulative untuk maintain harmony'
    ],
    inDailyLife: [
      'Kamu sangat aware dengan mood orang di sekitar',
      'Kamu suka make sure everyone feels comfortable',
      'Kamu mudah terpengaruh mood orang lain',
      'Kamu sering mengalah untuk avoid conflict',
      'Kamu expressive dengan emotions',
      'Kamu butuh approval dari orang lain',
      'Kamu feel responsible untuk perasaan orang'
    ],
    developmentTips: [
      'Develop Ti (opposite function) - think logically, not just emotionally',
      'Set boundaries - it\'s okay to say no',
      'Take care of your own needs first',
      'Not all conflict is bad - healthy disagreement is okay',
      'Don\'t absorb others\' emotions - they\'re not your responsibility',
      'Seek internal validation, not just external',
      'Be authentic - don\'t just be what others want'
    ]
  },

  'Fi': {
    code: 'Fi',
    name: 'Introverted Feeling',
    shortDesc: 'Hidup sesuai nilai dan prinsip pribadi',
    fullDescription: `Introverted Feeling (Fi) adalah fungsi kognitif yang fokus pada understanding dan living sesuai dengan personal values dan authentic self. Orang dengan Fi kuat punya moral compass yang sangat kuat dan tidak bisa compromise values mereka.

Fi membuat seseorang very authentic, principled, dan emotionally deep. Mereka feel emotions sangat intensely tapi tidak selalu show it. Mereka care deeply tentang being true to themselves dan standing up untuk apa yang mereka believe.

Bayangkan Fi seperti seorang artist atau activist yang passionate tentang causes mereka. Mereka tidak follow crowd - mereka follow their heart dan values, even jika itu unpopular.`,
    howItWorks: 'Fi bekerja dengan terus-menerus evaluate apakah sesuatu align dengan personal values. Decisions dibuat based on "apakah ini feels right untuk saya?" dan "apakah ini sesuai dengan who I am?". Prosesnya internal dan deeply personal.',
    strengths: [
      'Sangat authentic',
      'Strong personal values',
      'Emotionally deep',
      'Empathetic (tapi selective)',
      'Principled dan moral',
      'Creative dan expressive',
      'Loyal ke inner circle'
    ],
    weaknesses: [
      'Bisa judgmental',
      'Terlalu sensitive',
      'Stubborn tentang values',
      'Susah compromise',
      'Bisa self-absorbed',
      'Overthink emotions',
      'Bisa isolate diri'
    ],
    inDailyLife: [
      'Kamu punya strong personal values',
      'Kamu feel emotions sangat deeply',
      'Kamu tidak bisa do hal yang against your values',
      'Kamu prefer express feelings lewat art atau writing',
      'Kamu sangat empathetic tapi tidak selalu show it',
      'Kamu decide based on what feels right',
      'Kamu butuh alone time untuk process feelings'
    ],
    developmentTips: [
      'Develop Te (opposite function) - be more objective',
      'Don\'t be too rigid dengan values - allow growth',
      'Express your feelings more - don\'t keep everything inside',
      'Consider others\' perspectives - your way isn\'t the only way',
      'Balance authenticity dengan social awareness',
      'Don\'t take everything personally',
      'Learn to compromise without losing yourself'
    ]
  }
};

// ============================================
// A/T VARIANTS - DETAILED EXPLANATIONS
// ============================================

export const VARIANTS: Record<string, VariantDetail> = {
  'A': {
    code: 'A',
    name: 'Assertive',
    description: 'Assertive individuals adalah confident, self-assured, dan emotionally stable. Mereka tidak mudah stress dan punya self-confidence yang tinggi. Mereka comfortable dengan diri mereka dan tidak terlalu worry tentang opini orang lain.',
    characteristics: [
      'Self-confident dan self-assured',
      'Emotionally stable',
      'Tidak mudah stress atau anxious',
      'Comfortable dengan diri sendiri',
      'Tidak terlalu peduli opini orang',
      'Optimistic tentang masa depan',
      'Relaxed dan easy-going',
      'Tidak overthink'
    ],
    strengths: [
      'Mental health yang lebih baik',
      'Lebih resilient terhadap stress',
      'Confident dalam decisions',
      'Tidak paralyzed by self-doubt',
      'Better work-life balance',
      'Lebih happy dan content',
      'Tidak butuh constant validation'
    ],
    challenges: [
      'Bisa terlalu confident - miss warning signs',
      'Kurang self-reflective',
      'Bisa complacent - tidak push untuk improve',
      'Mungkin tidak sensitive terhadap feedback',
      'Bisa underestimate challenges',
      'Kurang motivated untuk change'
    ]
  },
  'T': {
    code: 'T',
    name: 'Turbulent',
    description: 'Turbulent individuals adalah self-conscious, perfectionistic, dan success-driven. Mereka lebih sensitive terhadap stress dan sering doubt diri mereka. Tapi ini juga membuat mereka very driven untuk improve dan achieve.',
    characteristics: [
      'Self-conscious dan self-aware',
      'Perfectionistic',
      'Sensitive terhadap stress',
      'Sering doubt diri sendiri',
      'Peduli dengan opini orang',
      'Driven untuk improve',
      'Overthink dan overanalyze',
      'Success-oriented'
    ],
    strengths: [
      'Very driven dan motivated',
      'Constantly improving',
      'Self-aware dan reflective',
      'Sensitive terhadap feedback',
      'Push themselves untuk excellence',
      'Empathetic terhadap others\' struggles',
      'Tidak complacent'
    ],
    challenges: [
      'Prone to anxiety dan stress',
      'Perfectionism yang unhealthy',
      'Self-doubt yang berlebihan',
      'Butuh constant validation',
      'Burnout risk',
      'Susah enjoy achievements',
      'Overthink everything'
    ]
  }
};

// Helper function to get function detail - will be replaced with complete data loader
export function getFunctionDetail(code: string): CognitiveFunctionDetail | undefined {
  // Import complete functions at the top level
  return COGNITIVE_FUNCTIONS[code];
}

// Helper function to get variant detail
export function getVariantDetail(code: string): VariantDetail | undefined {
  return VARIANTS[code];
}
