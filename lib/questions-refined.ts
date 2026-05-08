// 96 MBTI Questions - REFINED VERSION
// Lebih singkat, mudah dipahami, maksimal 2 baris

export type CognitiveFunction = 'Ne' | 'Ni' | 'Se' | 'Si' | 'Te' | 'Ti' | 'Fe' | 'Fi';

export interface MBTIQuestion {
  id: number;
  text: string;
  function: CognitiveFunction;
  reverse: boolean;
}

export const questions: MBTIQuestion[] = [
  // Ne - Extraverted Intuition (12 questions)
  { id: 1, text: "Saya mudah bosan dengan hal yang sama. Saya suka mencoba hal baru terus-menerus.", function: 'Ne', reverse: false },
  { id: 2, text: "Saya suka brainstorming dan memberikan banyak ide kreatif.", function: 'Ne', reverse: false },
  { id: 3, text: "Saat ngobrol, saya sering melompat ke topik lain yang tidak berhubungan.", function: 'Ne', reverse: false },
  { id: 4, text: "Saya cepat melihat pola dan kemungkinan yang orang lain tidak sadari.", function: 'Ne', reverse: false },
  { id: 5, text: "Saya melihat dunia penuh dengan kemungkinan yang menarik untuk dijelajahi.", function: 'Ne', reverse: false },
  { id: 6, text: "Saya tertarik pada hal-hal unik, aneh, dan belum pernah ada sebelumnya.", function: 'Ne', reverse: false },
  { id: 7, text: "Saya mudah berpikir abstrak dan sering mengatakan hal-hal random.", function: 'Ne', reverse: false },
  { id: 8, text: "Saya lebih fokus pada gambaran besar daripada detail kecil.", function: 'Ne', reverse: false },
  { id: 9, text: "Saya punya banyak ide untuk setiap masalah yang muncul.", function: 'Ne', reverse: false },
  { id: 10, text: "Saya mulai banyak proyek tapi jarang menyelesaikan semuanya.", function: 'Ne', reverse: false },
  { id: 11, text: "Terlalu banyak pilihan membuat saya susah mengambil keputusan.", function: 'Ne', reverse: false },
  { id: 12, text: "Saya susah fokus pada satu hal dalam waktu lama.", function: 'Ne', reverse: false },

  // Ni - Introverted Intuition (12 questions)
  { id: 13, text: "Saya sering punya firasat yang ternyata benar tentang masa depan.", function: 'Ni', reverse: false },
  { id: 14, text: "Orang sering tidak mengerti maksud saya saat saya berbicara.", function: 'Ni', reverse: false },
  { id: 15, text: "Saya lebih suka dunia imajinasi saya daripada dunia nyata.", function: 'Ni', reverse: false },
  { id: 16, text: "Saya tiba-tiba 'tahu' jawabannya tanpa bisa menjelaskan kenapa.", function: 'Ni', reverse: false },
  { id: 17, text: "Saya paham sesuatu tapi susah menjelaskannya dengan kata-kata.", function: 'Ni', reverse: false },
  { id: 18, text: "Saya percaya pada intuisi dan hal-hal yang tidak bisa dijelaskan.", function: 'Ni', reverse: false },
  { id: 19, text: "Saya tertarik pada filosofi, spiritualitas, dan hal mistis.", function: 'Ni', reverse: false },
  { id: 20, text: "Saya suka mencari makna tersembunyi di balik segala sesuatu.", function: 'Ni', reverse: false },
  { id: 21, text: "Saya sering melamun tentang hal-hal yang tidak ada di dunia nyata.", function: 'Ni', reverse: false },
  { id: 22, text: "Saya suka menggunakan metafora dan kiasan saat menjelaskan ide.", function: 'Ni', reverse: false },
  { id: 23, text: "Saya lebih percaya pada insting daripada fakta yang terlihat.", function: 'Ni', reverse: false },
  { id: 24, text: "Saya 'merasa tahu' sesuatu tanpa bisa menjelaskan alasannya.", function: 'Ni', reverse: false },

  // Se - Extraverted Sensing (12 questions)
  { id: 25, text: "Saya hidup di saat ini, menikmati setiap momen yang ada.", function: 'Se', reverse: false },
  { id: 26, text: "Saya berani mengambil risiko dan mencoba hal ekstrem.", function: 'Se', reverse: false },
  { id: 27, text: "Saya suka pengalaman baru yang seru dan menantang adrenalin.", function: 'Se', reverse: false },
  { id: 28, text: "Saya fokus pada masa kini, bukan masa lalu atau masa depan.", function: 'Se', reverse: false },
  { id: 29, text: "Saya sangat aware dengan lingkungan sekitar dan detail visual.", function: 'Se', reverse: false },
  { id: 30, text: "Kehadiran saya di ruangan pasti terasa oleh orang lain.", function: 'Se', reverse: false },
  { id: 31, text: "Saya punya sense of direction yang bagus, tidak mudah tersesat.", function: 'Se', reverse: false },
  { id: 32, text: "Saya suka hal-hal indah dan menikmati kemewahan hidup.", function: 'Se', reverse: false },
  { id: 33, text: "Saya cepat bereaksi terhadap perubahan di sekitar saya.", function: 'Se', reverse: false },
  { id: 34, text: "Saya suka aktivitas fisik dan olahraga yang menantang.", function: 'Se', reverse: false },
  { id: 35, text: "Saya lebih suka action daripada planning yang lama.", function: 'Se', reverse: false },
  { id: 36, text: "Saya menikmati sensasi fisik seperti makanan enak atau musik keras.", function: 'Se', reverse: false },

  // Si - Introverted Sensing (12 questions)
  { id: 37, text: "Saya suka rutinitas dan merasa nyaman dengan hal yang familiar.", function: 'Si', reverse: false },
  { id: 38, text: "Saya sering mengingat detail kecil dari pengalaman masa lalu.", function: 'Si', reverse: false },
  { id: 39, text: "Saya lebih suka cara yang sudah terbukti berhasil daripada eksperimen.", function: 'Si', reverse: false },
  { id: 40, text: "Saya punya memori yang kuat tentang peristiwa dan pengalaman pribadi.", function: 'Si', reverse: false },
  { id: 41, text: "Saya merasa tidak nyaman dengan perubahan mendadak.", function: 'Si', reverse: false },
  { id: 42, text: "Saya suka tradisi dan menjaga hal-hal yang sudah ada sejak dulu.", function: 'Si', reverse: false },
  { id: 43, text: "Saya teliti dan memperhatikan detail yang orang lain lewatkan.", function: 'Si', reverse: false },
  { id: 44, text: "Saya suka membandingkan situasi sekarang dengan pengalaman masa lalu.", function: 'Si', reverse: false },
  { id: 45, text: "Saya merasa aman dengan hal yang sudah saya kenal baik.", function: 'Si', reverse: false },
  { id: 46, text: "Saya suka mengikuti prosedur dan aturan yang sudah ada.", function: 'Si', reverse: false },
  { id: 47, text: "Saya bisa mengingat dengan jelas perasaan dari pengalaman lama.", function: 'Si', reverse: false },
  { id: 48, text: "Saya lebih suka stabilitas daripada petualangan yang tidak pasti.", function: 'Si', reverse: false },

  // Te - Extraverted Thinking (12 questions)
  { id: 49, text: "Saya suka membuat sistem dan struktur yang efisien.", function: 'Te', reverse: false },
  { id: 50, text: "Saya langsung to the point dan tidak suka basa-basi.", function: 'Te', reverse: false },
  { id: 51, text: "Saya fokus pada hasil dan produktivitas, bukan proses.", function: 'Te', reverse: false },
  { id: 52, text: "Saya suka mengorganisir orang dan resources untuk mencapai tujuan.", function: 'Te', reverse: false },
  { id: 53, text: "Saya membuat keputusan berdasarkan logika dan fakta objektif.", function: 'Te', reverse: false },
  { id: 54, text: "Saya tidak takut mengkritik jika ada yang tidak efisien.", function: 'Te', reverse: false },
  { id: 55, text: "Saya suka membuat to-do list dan checklist untuk semua hal.", function: 'Te', reverse: false },
  { id: 56, text: "Saya lebih menghargai competence daripada perasaan orang.", function: 'Te', reverse: false },
  { id: 57, text: "Saya suka memimpin dan mengambil kontrol situasi.", function: 'Te', reverse: false },
  { id: 58, text: "Saya fokus pada apa yang bisa diukur dan dibuktikan.", function: 'Te', reverse: false },
  { id: 59, text: "Saya tidak suka pemborosan waktu dan inefficiency.", function: 'Te', reverse: false },
  { id: 60, text: "Saya membuat keputusan cepat berdasarkan data yang ada.", function: 'Te', reverse: false },

  // Ti - Introverted Thinking (12 questions)
  { id: 61, text: "Saya suka menganalisis dan memahami cara kerja sesuatu secara mendalam.", function: 'Ti', reverse: false },
  { id: 62, text: "Saya butuh waktu untuk berpikir sebelum mengambil keputusan.", function: 'Ti', reverse: false },
  { id: 63, text: "Saya suka menemukan inkonsistensi dalam argumen orang lain.", function: 'Ti', reverse: false },
  { id: 64, text: "Saya lebih suka memahami prinsip dasar daripada hafal fakta.", function: 'Ti', reverse: false },
  { id: 65, text: "Saya sering mempertanyakan asumsi yang orang lain terima begitu saja.", function: 'Ti', reverse: false },
  { id: 66, text: "Saya suka membuat framework dan model mental yang logis.", function: 'Ti', reverse: false },
  { id: 67, text: "Saya lebih tertarik pada kebenaran daripada aplikasi praktis.", function: 'Ti', reverse: false },
  { id: 68, text: "Saya suka berdebat untuk menguji logika suatu argumen.", function: 'Ti', reverse: false },
  { id: 69, text: "Saya bisa menghabiskan waktu lama untuk memahami satu konsep.", function: 'Ti', reverse: false },
  { id: 70, text: "Saya suka mencari cara paling logis dan elegant untuk solve masalah.", function: 'Ti', reverse: false },
  { id: 71, text: "Saya tidak mudah percaya sesuatu tanpa analisis mendalam.", function: 'Ti', reverse: false },
  { id: 72, text: "Saya suka memecah masalah kompleks jadi bagian-bagian kecil.", function: 'Ti', reverse: false },

  // Fe - Extraverted Feeling (12 questions)
  { id: 73, text: "Saya sangat peduli dengan perasaan dan kebutuhan orang lain.", function: 'Fe', reverse: false },
  { id: 74, text: "Saya mudah merasakan suasana hati orang di sekitar saya.", function: 'Fe', reverse: false },
  { id: 75, text: "Saya suka menciptakan harmoni dan menghindari konflik.", function: 'Fe', reverse: false },
  { id: 76, text: "Saya ekspresif dan mudah menunjukkan emosi saya.", function: 'Fe', reverse: false },
  { id: 77, text: "Saya suka membuat orang lain merasa nyaman dan diterima.", function: 'Fe', reverse: false },
  { id: 78, text: "Saya mudah terpengaruh oleh mood orang di sekitar saya.", function: 'Fe', reverse: false },
  { id: 79, text: "Saya suka menolong orang bahkan jika itu merugikan saya.", function: 'Fe', reverse: false },
  { id: 80, text: "Saya butuh approval dan validasi dari orang lain.", function: 'Fe', reverse: false },
  { id: 81, text: "Saya suka acara sosial dan berkumpul dengan banyak orang.", function: 'Fe', reverse: false },
  { id: 82, text: "Saya bisa membaca body language dan ekspresi wajah dengan baik.", function: 'Fe', reverse: false },
  { id: 83, text: "Saya sering mengalah demi menjaga hubungan baik.", function: 'Fe', reverse: false },
  { id: 84, text: "Saya merasa bertanggung jawab atas perasaan orang lain.", function: 'Fe', reverse: false },

  // Fi - Introverted Feeling (12 questions)
  { id: 85, text: "Saya punya nilai dan prinsip pribadi yang sangat kuat.", function: 'Fi', reverse: false },
  { id: 86, text: "Saya merasakan emosi dengan sangat dalam dan intens.", function: 'Fi', reverse: false },
  { id: 87, text: "Saya tidak suka dipaksa melakukan hal yang bertentangan dengan nilai saya.", function: 'Fi', reverse: false },
  { id: 88, text: "Saya lebih suka mengekspresikan perasaan melalui seni atau tulisan.", function: 'Fi', reverse: false },
  { id: 89, text: "Saya sangat empati tapi tidak selalu menunjukkannya.", function: 'Fi', reverse: false },
  { id: 90, text: "Saya membuat keputusan berdasarkan apa yang terasa benar bagi saya.", function: 'Fi', reverse: false },
  { id: 91, text: "Saya butuh waktu sendiri untuk memproses perasaan saya.", function: 'Fi', reverse: false },
  { id: 92, text: "Saya sangat autentik dan tidak suka berpura-pura.", function: 'Fi', reverse: false },
  { id: 93, text: "Saya peduli pada orang yang saya sayangi dengan sangat dalam.", function: 'Fi', reverse: false },
  { id: 94, text: "Saya punya standar moral yang tinggi untuk diri sendiri.", function: 'Fi', reverse: false },
  { id: 95, text: "Saya merasa terluka jika nilai-nilai saya tidak dihargai.", function: 'Fi', reverse: false },
  { id: 96, text: "Saya lebih suka mendengarkan inner voice saya daripada opini orang.", function: 'Fi', reverse: false },
];
