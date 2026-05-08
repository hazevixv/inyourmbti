// 96 MBTI Questions - REFINED VERSION
// Lebih singkat, mudah dipahami, maksimal 2 baris

export type CognitiveFunction = 'Ne' | 'Ni' | 'Se' | 'Si' | 'Te' | 'Ti' | 'Fe' | 'Fi';

export interface MBTIQuestion {
  id: number;
  text: string;
  function: CognitiveFunction;
  reverse: boolean;
  explanation: string; // Penjelasan detail untuk membantu user memahami pertanyaan
}

export const questions: MBTIQuestion[] = [
  // Ne - Extraverted Intuition (12 questions)
  { 
    id: 1, 
    text: "Saya mudah bosan dengan hal yang sama. Saya suka mencoba hal baru terus-menerus.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur seberapa sering kamu merasa bosan dengan rutinitas dan ingin mencoba hal-hal baru. Contoh: Apakah kamu sering ganti hobi? Suka coba makanan/tempat baru? Atau lebih nyaman dengan hal yang sudah kamu kenal? Jawab 'Sangat Setuju' jika kamu tipe yang selalu cari pengalaman baru dan cepat bosan. Jawab 'Sangat Tidak' jika kamu lebih suka konsisten dengan hal yang sudah familiar."
  },
  { 
    id: 2, 
    text: "Saya suka brainstorming dan memberikan banyak ide kreatif.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Ini tentang seberapa mudah kamu menghasilkan ide-ide baru. Contoh: Saat diskusi kelompok, apakah kamu yang sering lempar banyak ide? Atau kamu lebih suka mendengarkan dan memilih ide yang sudah ada? Jawab 'Sangat Setuju' jika kamu suka brainstorming dan punya banyak ide kreatif. Jawab 'Sangat Tidak' jika kamu lebih suka berpikir matang sebelum kasih satu ide yang solid."
  },
  { 
    id: 3, 
    text: "Saat ngobrol, saya sering melompat ke topik lain yang tidak berhubungan.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur pola percakapan kamu. Contoh: Saat ngobrol tentang film, tiba-tiba kamu ingat cerita lain yang tidak ada hubungannya? Atau kamu selalu stay on topic sampai selesai? Jawab 'Sangat Setuju' jika obrolan kamu sering loncat-loncat topik. Jawab 'Sangat Tidak' jika kamu lebih suka fokus pada satu topik sampai tuntas."
  },
  { 
    id: 4, 
    text: "Saya cepat melihat pola dan kemungkinan yang orang lain tidak sadari.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Ini tentang kemampuan kamu melihat koneksi dan pola tersembunyi. Contoh: Apakah kamu sering bilang 'Eh, ini mirip sama itu!' atau 'Kalau begini, nanti bisa jadi begitu'? Atau kamu lebih fokus pada apa yang terlihat saja? Jawab 'Sangat Setuju' jika kamu sering lihat pola dan kemungkinan yang orang lain miss. Jawab 'Sangat Tidak' jika kamu lebih fokus pada fakta yang jelas terlihat."
  },
  { 
    id: 5, 
    text: "Saya melihat dunia penuh dengan kemungkinan yang menarik untuk dijelajahi.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Pertanyaan ini tentang mindset kamu terhadap dunia. Contoh: Apakah kamu melihat setiap situasi sebagai peluang baru? Atau kamu lebih realistis dan fokus pada apa yang ada sekarang? Jawab 'Sangat Setuju' jika kamu optimis dan selalu lihat banyak kemungkinan. Jawab 'Sangat Tidak' jika kamu lebih praktis dan fokus pada realitas yang ada."
  },
  { 
    id: 6, 
    text: "Saya tertarik pada hal-hal unik, aneh, dan belum pernah ada sebelumnya.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Ini mengukur ketertarikan kamu pada hal-hal unconventional. Contoh: Apakah kamu suka film/musik/fashion yang aneh dan berbeda? Atau kamu lebih suka yang mainstream dan populer? Jawab 'Sangat Setuju' jika kamu tertarik pada hal-hal unik dan out of the box. Jawab 'Sangat Tidak' jika kamu lebih suka hal yang umum dan sudah terbukti bagus."
  },
  { 
    id: 7, 
    text: "Saya mudah berpikir abstrak dan sering mengatakan hal-hal random.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Pertanyaan ini tentang cara berpikir kamu. Contoh: Apakah kamu sering bilang hal yang 'random' atau 'nyeleneh' menurut orang lain? Atau kamu selalu bicara hal yang konkret dan jelas? Jawab 'Sangat Setuju' jika kamu suka berpikir abstrak dan sering bilang hal random. Jawab 'Sangat Tidak' jika kamu lebih suka bicara hal yang konkret dan praktis."
  },
  { 
    id: 8, 
    text: "Saya lebih fokus pada gambaran besar daripada detail kecil.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Ini tentang fokus perhatian kamu. Contoh: Saat baca buku atau dengar cerita, apakah kamu lebih ingat big picture-nya? Atau kamu ingat detail-detail kecilnya? Jawab 'Sangat Setuju' jika kamu tipe yang lihat gambaran besar dan skip detail. Jawab 'Sangat Tidak' jika kamu sangat memperhatikan detail kecil."
  },
  { 
    id: 9, 
    text: "Saya punya banyak ide untuk setiap masalah yang muncul.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur kreativitas problem-solving kamu. Contoh: Saat ada masalah, apakah kamu langsung punya 5-10 solusi berbeda? Atau kamu fokus cari satu solusi terbaik? Jawab 'Sangat Setuju' jika kamu selalu punya banyak alternatif solusi. Jawab 'Sangat Tidak' jika kamu lebih suka fokus pada satu solusi yang paling masuk akal."
  },
  { 
    id: 10, 
    text: "Saya mulai banyak proyek tapi jarang menyelesaikan semuanya.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Ini tentang pola menyelesaikan tugas kamu. Contoh: Apakah kamu punya banyak hobi/proyek yang dimulai tapi belum selesai? Atau kamu selalu finish apa yang kamu mulai? Jawab 'Sangat Setuju' jika kamu sering start banyak hal tapi jarang selesai semua. Jawab 'Sangat Tidak' jika kamu selalu menyelesaikan apa yang kamu mulai."
  },
  { 
    id: 11, 
    text: "Terlalu banyak pilihan membuat saya susah mengambil keputusan.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Pertanyaan ini tentang decision-making kamu. Contoh: Saat di restoran dengan menu banyak, apakah kamu lama banget milih? Atau kamu cepat decide? Jawab 'Sangat Setuju' jika banyak pilihan bikin kamu bingung dan lama decide. Jawab 'Sangat Tidak' jika kamu bisa cepat memilih meskipun banyak opsi."
  },
  { 
    id: 12, 
    text: "Saya susah fokus pada satu hal dalam waktu lama.", 
    function: 'Ne', 
    reverse: false,
    explanation: "Ini mengukur attention span kamu. Contoh: Apakah kamu sering distracted saat kerja/belajar? Suka multitasking dan ganti-ganti aktivitas? Atau kamu bisa fokus berjam-jam pada satu hal? Jawab 'Sangat Setuju' jika kamu mudah bosan dan susah fokus lama. Jawab 'Sangat Tidak' jika kamu bisa deep focus untuk waktu yang lama."
  },

  // Ni - Introverted Intuition (12 questions)
  { 
    id: 13, 
    text: "Saya sering punya firasat yang ternyata benar tentang masa depan.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Pertanyaan ini tentang intuisi kamu terhadap masa depan. Contoh: Apakah kamu sering 'merasa' sesuatu akan terjadi dan ternyata beneran terjadi? Atau kamu tidak percaya firasat? Jawab 'Sangat Setuju' jika firasat kamu sering akurat. Jawab 'Sangat Tidak' jika kamu tidak pernah atau jarang punya firasat yang terbukti benar."
  },
  { 
    id: 14, 
    text: "Orang sering tidak mengerti maksud saya saat saya berbicara.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Ini mengukur seberapa abstrak cara komunikasi kamu. Contoh: Apakah orang sering bilang 'Maksud kamu apa sih?' atau 'Kok nyambungnya ke situ?'? Atau orang selalu paham apa yang kamu maksud? Jawab 'Sangat Setuju' jika orang sering bingung dengan cara bicara kamu. Jawab 'Sangat Tidak' jika kamu selalu jelas dan mudah dipahami."
  },
  { 
    id: 15, 
    text: "Saya lebih suka dunia imajinasi saya daripada dunia nyata.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Pertanyaan ini tentang di mana kamu lebih nyaman. Contoh: Apakah kamu sering melamun dan lebih suka dunia dalam kepala kamu? Atau kamu lebih fokus pada realitas di sekitar kamu? Jawab 'Sangat Setuju' jika kamu sering 'lost' dalam dunia imajinasi. Jawab 'Sangat Tidak' jika kamu selalu grounded di dunia nyata."
  },
  { 
    id: 16, 
    text: "Saya tiba-tiba 'tahu' jawabannya tanpa bisa menjelaskan kenapa.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Ini tentang bagaimana kamu mendapat insight. Contoh: Apakah kamu sering tiba-tiba 'aha!' dapat jawaban tanpa proses berpikir yang jelas? Atau kamu selalu bisa trace langkah-langkah logika kamu? Jawab 'Sangat Setuju' jika kamu sering dapat insight mendadak. Jawab 'Sangat Tidak' jika kamu selalu tahu proses berpikir kamu."
  },
  { 
    id: 17, 
    text: "Saya paham sesuatu tapi susah menjelaskannya dengan kata-kata.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur kemampuan verbalisasi pemahaman kamu. Contoh: Apakah kamu sering 'ngerti' tapi susah jelasin ke orang? Atau kamu bisa explain dengan jelas? Jawab 'Sangat Setuju' jika kamu sering paham tapi susah articulate. Jawab 'Sangat Tidak' jika kamu selalu bisa menjelaskan dengan jelas apa yang kamu pahami."
  },
  { 
    id: 18, 
    text: "Saya percaya pada intuisi dan hal-hal yang tidak bisa dijelaskan.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Ini tentang kepercayaan kamu pada hal non-rasional. Contoh: Apakah kamu percaya pada 'gut feeling', mimpi, atau tanda-tanda? Atau kamu hanya percaya pada hal yang bisa dibuktikan? Jawab 'Sangat Setuju' jika kamu percaya intuisi dan hal mistis. Jawab 'Sangat Tidak' jika kamu hanya percaya fakta dan logika."
  },
  { 
    id: 19, 
    text: "Saya tertarik pada filosofi, spiritualitas, dan hal mistis.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Pertanyaan ini tentang minat kamu pada hal abstrak. Contoh: Apakah kamu suka diskusi tentang meaning of life, spiritualitas, atau hal-hal deep? Atau kamu lebih suka topik praktis? Jawab 'Sangat Setuju' jika kamu tertarik pada filosofi dan spiritualitas. Jawab 'Sangat Tidak' jika kamu tidak tertarik pada hal-hal abstrak seperti itu."
  },
  { 
    id: 20, 
    text: "Saya suka mencari makna tersembunyi di balik segala sesuatu.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Ini mengukur seberapa dalam kamu menganalisis makna. Contoh: Apakah kamu selalu cari 'deeper meaning' di balik film, lagu, atau kejadian? Atau kamu terima saja apa adanya? Jawab 'Sangat Setuju' jika kamu selalu cari makna tersembunyi. Jawab 'Sangat Tidak' jika kamu take things at face value."
  },
  { 
    id: 21, 
    text: "Saya sering melamun tentang hal-hal yang tidak ada di dunia nyata.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Pertanyaan ini tentang frekuensi melamun kamu. Contoh: Apakah kamu sering 'zone out' dan mikirin hal-hal imaginatif? Atau kamu selalu present dan fokus pada sekitar? Jawab 'Sangat Setuju' jika kamu sering melamun tentang hal fantastis. Jawab 'Sangat Tidak' jika kamu jarang melamun dan selalu fokus pada realitas."
  },
  { 
    id: 22, 
    text: "Saya suka menggunakan metafora dan kiasan saat menjelaskan ide.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Ini tentang gaya komunikasi kamu. Contoh: Apakah kamu sering pakai perumpamaan atau analogi saat jelasin sesuatu? Atau kamu selalu direct dan literal? Jawab 'Sangat Setuju' jika kamu suka pakai metafora dan kiasan. Jawab 'Sangat Tidak' jika kamu selalu straightforward dan literal."
  },
  { 
    id: 23, 
    text: "Saya lebih percaya pada insting daripada fakta yang terlihat.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Pertanyaan ini tentang apa yang kamu prioritaskan dalam decision-making. Contoh: Saat ada keputusan, apakah kamu lebih dengerin 'gut feeling' meskipun fakta bilang lain? Atau kamu selalu ikut fakta? Jawab 'Sangat Setuju' jika kamu lebih percaya insting. Jawab 'Sangat Tidak' jika kamu selalu ikut fakta dan data."
  },
  { 
    id: 24, 
    text: "Saya 'merasa tahu' sesuatu tanpa bisa menjelaskan alasannya.", 
    function: 'Ni', 
    reverse: false,
    explanation: "Ini mengukur seberapa sering kamu dapat knowing tanpa reasoning. Contoh: Apakah kamu sering 'just know' sesuatu itu benar/salah tanpa bisa kasih alasan? Atau kamu selalu bisa explain kenapa kamu berpikir begitu? Jawab 'Sangat Setuju' jika kamu sering 'just know' tanpa alasan. Jawab 'Sangat Tidak' jika kamu selalu punya reasoning yang jelas."
  },

  // Se - Extraverted Sensing (12 questions)
  { 
    id: 25, 
    text: "Saya hidup di saat ini, menikmati setiap momen yang ada.", 
    function: 'Se', 
    reverse: false,
    explanation: "Pertanyaan ini tentang fokus waktu kamu. Contoh: Apakah kamu selalu present dan enjoy momen sekarang? Atau kamu sering mikirin masa lalu/depan? Jawab 'Sangat Setuju' jika kamu live in the moment dan tidak suka overthink. Jawab 'Sangat Tidak' jika kamu sering stuck di masa lalu atau worry tentang masa depan."
  },
  { 
    id: 26, 
    text: "Saya berani mengambil risiko dan mencoba hal ekstrem.", 
    function: 'Se', 
    reverse: false,
    explanation: "Ini mengukur risk-taking behavior kamu. Contoh: Apakah kamu suka extreme sports, adventure, atau hal-hal yang menantang adrenalin? Atau kamu lebih suka aman? Jawab 'Sangat Setuju' jika kamu thrill-seeker dan berani ambil risiko. Jawab 'Sangat Tidak' jika kamu lebih suka play it safe."
  },
  { 
    id: 27, 
    text: "Saya suka pengalaman baru yang seru dan menantang adrenalin.", 
    function: 'Se', 
    reverse: false,
    explanation: "Pertanyaan ini tentang preferensi aktivitas kamu. Contoh: Apakah kamu suka bungee jumping, roller coaster, atau hal yang bikin jantung berdebar? Atau kamu lebih suka aktivitas yang tenang? Jawab 'Sangat Setuju' jika kamu suka sensasi dan adrenaline rush. Jawab 'Sangat Tidak' jika kamu prefer aktivitas yang calm dan predictable."
  },
  { 
    id: 28, 
    text: "Saya fokus pada masa kini, bukan masa lalu atau masa depan.", 
    function: 'Se', 
    reverse: false,
    explanation: "Ini tentang orientasi waktu kamu. Contoh: Apakah kamu jarang mikirin 'what if' atau nostalgia? Fokus pada apa yang terjadi sekarang? Atau kamu sering reflect/plan? Jawab 'Sangat Setuju' jika kamu sangat present-focused. Jawab 'Sangat Tidak' jika kamu sering mikirin masa lalu atau masa depan."
  },
  { 
    id: 29, 
    text: "Saya sangat aware dengan lingkungan sekitar dan detail visual.", 
    function: 'Se', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur observasi kamu terhadap lingkungan. Contoh: Apakah kamu notice perubahan kecil di ruangan? Aware dengan warna, tekstur, suara? Atau kamu sering 'tidak sadar' dengan sekitar? Jawab 'Sangat Setuju' jika kamu sangat observant. Jawab 'Sangat Tidak' jika kamu sering tidak notice perubahan di sekitar."
  },
  { 
    id: 30, 
    text: "Kehadiran saya di ruangan pasti terasa oleh orang lain.", 
    function: 'Se', 
    reverse: false,
    explanation: "Ini tentang presence dan energy kamu. Contoh: Apakah orang langsung notice saat kamu masuk ruangan? Kamu punya aura yang kuat? Atau kamu bisa 'invisible'? Jawab 'Sangat Setuju' jika kamu punya strong presence. Jawab 'Sangat Tidak' jika kamu sering tidak dinotice atau blend in."
  },
  { 
    id: 31, 
    text: "Saya punya sense of direction yang bagus, tidak mudah tersesat.", 
    function: 'Se', 
    reverse: false,
    explanation: "Pertanyaan ini tentang spatial awareness kamu. Contoh: Apakah kamu jarang tersesat? Bisa ingat jalan dengan mudah? Atau kamu sering nyasar meskipun sudah pernah lewat? Jawab 'Sangat Setuju' jika kamu punya sense of direction yang bagus. Jawab 'Sangat Tidak' jika kamu sering tersesat atau butuh GPS terus."
  },
  { 
    id: 32, 
    text: "Saya suka hal-hal indah dan menikmati kemewahan hidup.", 
    function: 'Se', 
    reverse: false,
    explanation: "Ini mengukur appreciation kamu terhadap estetika dan luxury. Contoh: Apakah kamu appreciate fine dining, fashion, atau hal-hal mewah? Atau kamu tidak peduli dengan itu? Jawab 'Sangat Setuju' jika kamu enjoy kemewahan dan keindahan. Jawab 'Sangat Tidak' jika kamu minimalis dan tidak peduli luxury."
  },
  { 
    id: 33, 
    text: "Saya cepat bereaksi terhadap perubahan di sekitar saya.", 
    function: 'Se', 
    reverse: false,
    explanation: "Pertanyaan ini tentang reaction time kamu. Contoh: Apakah kamu quick reflex? Cepat respond saat ada perubahan? Atau kamu butuh waktu untuk process? Jawab 'Sangat Setuju' jika kamu punya reflex yang cepat. Jawab 'Sangat Tidak' jika kamu slow to react atau butuh waktu untuk respond."
  },
  { 
    id: 34, 
    text: "Saya suka aktivitas fisik dan olahraga yang menantang.", 
    function: 'Se', 
    reverse: false,
    explanation: "Ini tentang preferensi aktivitas fisik kamu. Contoh: Apakah kamu suka olahraga, gym, atau aktivitas yang physically demanding? Atau kamu lebih suka aktivitas mental? Jawab 'Sangat Setuju' jika kamu aktif secara fisik. Jawab 'Sangat Tidak' jika kamu prefer aktivitas yang tidak butuh banyak gerakan."
  },
  { 
    id: 35, 
    text: "Saya lebih suka action daripada planning yang lama.", 
    function: 'Se', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur action vs planning orientation kamu. Contoh: Apakah kamu tipe 'just do it' tanpa banyak planning? Atau kamu harus plan detail dulu? Jawab 'Sangat Setuju' jika kamu prefer action langsung. Jawab 'Sangat Tidak' jika kamu harus plan matang sebelum action."
  },
  { 
    id: 36, 
    text: "Saya menikmati sensasi fisik seperti makanan enak atau musik keras.", 
    function: 'Se', 
    reverse: false,
    explanation: "Ini tentang sensory enjoyment kamu. Contoh: Apakah kamu sangat enjoy makanan enak, musik loud, atau sensasi fisik lainnya? Atau kamu tidak terlalu peduli? Jawab 'Sangat Setuju' jika kamu sangat appreciate sensory experiences. Jawab 'Sangat Tidak' jika kamu tidak terlalu peduli dengan sensasi fisik."
  },

  // Si - Introverted Sensing (12 questions)
  { 
    id: 37, 
    text: "Saya suka rutinitas dan merasa nyaman dengan hal yang familiar.", 
    function: 'Si', 
    reverse: false,
    explanation: "Pertanyaan ini tentang preferensi kamu terhadap rutinitas. Contoh: Apakah kamu suka jadwal yang sama setiap hari? Merasa nyaman dengan kebiasaan? Atau kamu mudah bosan dengan rutinitas? Jawab 'Sangat Setuju' jika kamu suka rutinitas dan hal familiar. Jawab 'Sangat Tidak' jika kamu tidak suka rutinitas dan selalu ingin variasi."
  },
  { 
    id: 38, 
    text: "Saya sering mengingat detail kecil dari pengalaman masa lalu.", 
    function: 'Si', 
    reverse: false,
    explanation: "Ini mengukur memori detail kamu. Contoh: Apakah kamu ingat apa yang kamu makan 3 hari lalu? Ingat detail percakapan lama? Atau kamu cepat lupa detail? Jawab 'Sangat Setuju' jika kamu punya memori detail yang kuat. Jawab 'Sangat Tidak' jika kamu hanya ingat gambaran besar, bukan detail."
  },
  { 
    id: 39, 
    text: "Saya lebih suka cara yang sudah terbukti berhasil daripada eksperimen.", 
    function: 'Si', 
    reverse: false,
    explanation: "Pertanyaan ini tentang approach kamu terhadap problem-solving. Contoh: Apakah kamu prefer 'kalau sudah berhasil, kenapa harus ganti'? Atau kamu suka coba cara baru? Jawab 'Sangat Setuju' jika kamu prefer cara yang proven. Jawab 'Sangat Tidak' jika kamu suka eksperimen dan coba cara baru."
  },
  { 
    id: 40, 
    text: "Saya punya memori yang kuat tentang peristiwa dan pengalaman pribadi.", 
    function: 'Si', 
    reverse: false,
    explanation: "Ini tentang seberapa kuat memori episodik kamu. Contoh: Apakah kamu bisa recall pengalaman masa kecil dengan jelas? Ingat perasaan saat kejadian tertentu? Atau kamu banyak lupa? Jawab 'Sangat Setuju' jika kamu punya memori pengalaman yang kuat. Jawab 'Sangat Tidak' jika kamu sering lupa pengalaman masa lalu."
  },
  { 
    id: 41, 
    text: "Saya merasa tidak nyaman dengan perubahan mendadak.", 
    function: 'Si', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur adaptability kamu terhadap perubahan. Contoh: Apakah kamu stress saat rencana berubah tiba-tiba? Butuh waktu untuk adjust? Atau kamu flexible? Jawab 'Sangat Setuju' jika perubahan mendadak bikin kamu uncomfortable. Jawab 'Sangat Tidak' jika kamu easy-going dengan perubahan."
  },
  { 
    id: 42, 
    text: "Saya suka tradisi dan menjaga hal-hal yang sudah ada sejak dulu.", 
    function: 'Si', 
    reverse: false,
    explanation: "Ini tentang nilai kamu terhadap tradisi. Contoh: Apakah kamu suka ritual keluarga? Menjaga tradisi? Atau kamu tidak peduli dengan tradisi? Jawab 'Sangat Setuju' jika kamu menghargai dan menjaga tradisi. Jawab 'Sangat Tidak' jika kamu tidak peduli atau bahkan menentang tradisi."
  },
  { 
    id: 43, 
    text: "Saya teliti dan memperhatikan detail yang orang lain lewatkan.", 
    function: 'Si', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur attention to detail kamu. Contoh: Apakah kamu notice typo atau kesalahan kecil yang orang lain miss? Teliti dalam pekerjaan? Atau kamu sering skip detail? Jawab 'Sangat Setuju' jika kamu sangat detail-oriented. Jawab 'Sangat Tidak' jika kamu fokus pada big picture dan skip detail."
  },
  { 
    id: 44, 
    text: "Saya suka membandingkan situasi sekarang dengan pengalaman masa lalu.", 
    function: 'Si', 
    reverse: false,
    explanation: "Ini tentang bagaimana kamu process informasi baru. Contoh: Apakah kamu sering bilang 'Ini mirip sama waktu itu...'? Compare dengan pengalaman lama? Atau kamu treat setiap situasi sebagai baru? Jawab 'Sangat Setuju' jika kamu sering compare dengan masa lalu. Jawab 'Sangat Tidak' jika kamu tidak suka membandingkan."
  },
  { 
    id: 45, 
    text: "Saya merasa aman dengan hal yang sudah saya kenal baik.", 
    function: 'Si', 
    reverse: false,
    explanation: "Pertanyaan ini tentang comfort zone kamu. Contoh: Apakah kamu prefer tempat/orang/aktivitas yang sudah familiar? Atau kamu suka keluar dari comfort zone? Jawab 'Sangat Setuju' jika kamu merasa aman dengan yang familiar. Jawab 'Sangat Tidak' jika kamu suka challenge dan hal baru."
  },
  { 
    id: 46, 
    text: "Saya suka mengikuti prosedur dan aturan yang sudah ada.", 
    function: 'Si', 
    reverse: false,
    explanation: "Ini mengukur rule-following tendency kamu. Contoh: Apakah kamu selalu ikut prosedur? Baca manual sebelum pakai? Atau kamu suka improvise? Jawab 'Sangat Setuju' jika kamu rule-follower. Jawab 'Sangat Tidak' jika kamu sering break rules atau improvise."
  },
  { 
    id: 47, 
    text: "Saya bisa mengingat dengan jelas perasaan dari pengalaman lama.", 
    function: 'Si', 
    reverse: false,
    explanation: "Pertanyaan ini tentang emotional memory kamu. Contoh: Apakah kamu bisa 'merasakan lagi' emosi dari kejadian lama? Ingat bagaimana rasanya? Atau kamu hanya ingat faktanya? Jawab 'Sangat Setuju' jika kamu bisa recall perasaan dengan jelas. Jawab 'Sangat Tidak' jika kamu tidak ingat perasaan, hanya fakta."
  },
  { 
    id: 48, 
    text: "Saya lebih suka stabilitas daripada petualangan yang tidak pasti.", 
    function: 'Si', 
    reverse: false,
    explanation: "Ini tentang preferensi lifestyle kamu. Contoh: Apakah kamu prefer pekerjaan stabil daripada startup? Suka predictability? Atau kamu suka adventure dan uncertainty? Jawab 'Sangat Setuju' jika kamu prefer stabilitas. Jawab 'Sangat Tidak' jika kamu suka petualangan dan uncertainty."
  },

  // Te - Extraverted Thinking (12 questions)
  { 
    id: 49, 
    text: "Saya suka membuat sistem dan struktur yang efisien.", 
    function: 'Te', 
    reverse: false,
    explanation: "Pertanyaan ini tentang organizational skills kamu. Contoh: Apakah kamu suka bikin sistem untuk organize hal-hal? Buat struktur yang efisien? Atau kamu lebih spontan? Jawab 'Sangat Setuju' jika kamu suka create systems. Jawab 'Sangat Tidak' jika kamu tidak suka organize atau bikin sistem."
  },
  { 
    id: 50, 
    text: "Saya langsung to the point dan tidak suka basa-basi.", 
    function: 'Te', 
    reverse: false,
    explanation: "Ini mengukur communication style kamu. Contoh: Apakah kamu langsung ke inti pembicaraan? Tidak suka small talk? Atau kamu suka ngobrol santai dulu? Jawab 'Sangat Setuju' jika kamu direct dan to the point. Jawab 'Sangat Tidak' jika kamu suka basa-basi dan small talk."
  },
  { 
    id: 51, 
    text: "Saya fokus pada hasil dan produktivitas, bukan proses.", 
    function: 'Te', 
    reverse: false,
    explanation: "Pertanyaan ini tentang apa yang kamu prioritaskan. Contoh: Apakah kamu peduli hasil akhir, tidak peduli caranya? Atau kamu enjoy prosesnya? Jawab 'Sangat Setuju' jika kamu result-oriented. Jawab 'Sangat Tidak' jika kamu lebih peduli proses daripada hasil."
  },
  { 
    id: 52, 
    text: "Saya suka mengorganisir orang dan resources untuk mencapai tujuan.", 
    function: 'Te', 
    reverse: false,
    explanation: "Ini tentang leadership dan organizing ability kamu. Contoh: Apakah kamu suka coordinate tim? Organize resources? Atau kamu prefer bekerja sendiri? Jawab 'Sangat Setuju' jika kamu suka organize orang dan resources. Jawab 'Sangat Tidak' jika kamu tidak suka mengorganisir orang."
  },
  { 
    id: 53, 
    text: "Saya membuat keputusan berdasarkan logika dan fakta objektif.", 
    function: 'Te', 
    reverse: false,
    explanation: "Pertanyaan ini tentang decision-making process kamu. Contoh: Apakah kamu decide based on data dan fakta? Atau based on feeling? Jawab 'Sangat Setuju' jika kamu logical dan objective. Jawab 'Sangat Tidak' jika kamu decide based on feelings atau values."
  },
  { 
    id: 54, 
    text: "Saya tidak takut mengkritik jika ada yang tidak efisien.", 
    function: 'Te', 
    reverse: false,
    explanation: "Ini mengukur assertiveness kamu dalam memberikan kritik. Contoh: Apakah kamu langsung point out inefficiency? Tidak takut kritik? Atau kamu avoid konflik? Jawab 'Sangat Setuju' jika kamu blunt dan tidak takut kritik. Jawab 'Sangat Tidak' jika kamu avoid kritik untuk jaga perasaan."
  },
  { 
    id: 55, 
    text: "Saya suka membuat to-do list dan checklist untuk semua hal.", 
    function: 'Te', 
    reverse: false,
    explanation: "Pertanyaan ini tentang planning habits kamu. Contoh: Apakah kamu selalu bikin list? Suka checklist? Atau kamu go with the flow? Jawab 'Sangat Setuju' jika kamu list-maker. Jawab 'Sangat Tidak' jika kamu tidak suka bikin list atau plan."
  },
  { 
    id: 56, 
    text: "Saya lebih menghargai competence daripada perasaan orang.", 
    function: 'Te', 
    reverse: false,
    explanation: "Ini tentang apa yang kamu value dalam interaksi. Contoh: Apakah kamu lebih respect orang yang kompeten meskipun kurang ramah? Atau kamu lebih value kebaikan? Jawab 'Sangat Setuju' jika competence > feelings. Jawab 'Sangat Tidak' jika feelings > competence."
  },
  { 
    id: 57, 
    text: "Saya suka memimpin dan mengambil kontrol situasi.", 
    function: 'Te', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur leadership tendency kamu. Contoh: Apakah kamu naturally take charge? Suka lead? Atau kamu prefer follow? Jawab 'Sangat Setuju' jika kamu natural leader. Jawab 'Sangat Tidak' jika kamu prefer being follower atau equal."
  },
  { 
    id: 58, 
    text: "Saya fokus pada apa yang bisa diukur dan dibuktikan.", 
    function: 'Te', 
    reverse: false,
    explanation: "Ini tentang apa yang kamu anggap valid. Contoh: Apakah kamu hanya percaya data yang measurable? Suka metrics? Atau kamu percaya hal intangible? Jawab 'Sangat Setuju' jika kamu data-driven. Jawab 'Sangat Tidak' jika kamu percaya hal yang tidak bisa diukur."
  },
  { 
    id: 59, 
    text: "Saya tidak suka pemborosan waktu dan inefficiency.", 
    function: 'Te', 
    reverse: false,
    explanation: "Pertanyaan ini tentang tolerance kamu terhadap inefficiency. Contoh: Apakah kamu frustrated dengan hal yang tidak efisien? Suka optimize? Atau kamu santai saja? Jawab 'Sangat Setuju' jika inefficiency bikin kamu frustrated. Jawab 'Sangat Tidak' jika kamu tidak peduli efficiency."
  },
  { 
    id: 60, 
    text: "Saya membuat keputusan cepat berdasarkan data yang ada.", 
    function: 'Te', 
    reverse: false,
    explanation: "Ini mengukur decision-making speed kamu. Contoh: Apakah kamu bisa decide cepat saat ada data? Tidak overthink? Atau kamu butuh waktu lama? Jawab 'Sangat Setuju' jika kamu decisive dan cepat. Jawab 'Sangat Tidak' jika kamu slow decision-maker."
  },

  // Ti - Introverted Thinking (12 questions)
  { 
    id: 61, 
    text: "Saya suka menganalisis dan memahami cara kerja sesuatu secara mendalam.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Pertanyaan ini tentang curiosity kamu terhadap 'how things work'. Contoh: Apakah kamu suka bongkar barang untuk tau cara kerjanya? Analyze sistem? Atau kamu tidak peduli? Jawab 'Sangat Setuju' jika kamu suka deep analysis. Jawab 'Sangat Tidak' jika kamu tidak tertarik cara kerja internal."
  },
  { 
    id: 62, 
    text: "Saya butuh waktu untuk berpikir sebelum mengambil keputusan.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Ini mengukur decision-making pace kamu. Contoh: Apakah kamu butuh 'mikir dulu' sebelum decide? Tidak bisa decide on the spot? Atau kamu bisa decide cepat? Jawab 'Sangat Setuju' jika kamu slow dan thoughtful. Jawab 'Sangat Tidak' jika kamu quick decision-maker."
  },
  { 
    id: 63, 
    text: "Saya suka menemukan inkonsistensi dalam argumen orang lain.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Pertanyaan ini tentang critical thinking kamu. Contoh: Apakah kamu cepat notice logical fallacy? Suka point out inconsistency? Atau kamu tidak peduli? Jawab 'Sangat Setuju' jika kamu critical thinker. Jawab 'Sangat Tidak' jika kamu tidak suka analyze argumen orang."
  },
  { 
    id: 64, 
    text: "Saya lebih suka memahami prinsip dasar daripada hafal fakta.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Ini tentang learning style kamu. Contoh: Apakah kamu prefer understand 'why' daripada hafal 'what'? Suka tau underlying principle? Atau kamu prefer hafal fakta? Jawab 'Sangat Setuju' jika kamu principle-based learner. Jawab 'Sangat Tidak' jika kamu fact-based learner."
  },
  { 
    id: 65, 
    text: "Saya sering mempertanyakan asumsi yang orang lain terima begitu saja.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur skepticism kamu. Contoh: Apakah kamu sering tanya 'kenapa harus begitu'? Question status quo? Atau kamu accept apa adanya? Jawab 'Sangat Setuju' jika kamu skeptical dan questioning. Jawab 'Sangat Tidak' jika kamu accept tanpa question."
  },
  { 
    id: 66, 
    text: "Saya suka membuat framework dan model mental yang logis.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Ini tentang bagaimana kamu organize knowledge. Contoh: Apakah kamu suka bikin mental model? Create framework untuk understand sesuatu? Atau kamu tidak suka systematize? Jawab 'Sangat Setuju' jika kamu framework builder. Jawab 'Sangat Tidak' jika kamu tidak suka bikin model mental."
  },
  { 
    id: 67, 
    text: "Saya lebih tertarik pada kebenaran daripada aplikasi praktis.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Pertanyaan ini tentang motivasi belajar kamu. Contoh: Apakah kamu belajar karena penasaran dengan truth, bukan karena useful? Atau kamu hanya belajar yang praktis? Jawab 'Sangat Setuju' jika truth > practicality. Jawab 'Sangat Tidak' jika practicality > truth."
  },
  { 
    id: 68, 
    text: "Saya suka berdebat untuk menguji logika suatu argumen.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Ini mengukur debating tendency kamu. Contoh: Apakah kamu suka devil's advocate? Debate untuk test logic? Atau kamu avoid debate? Jawab 'Sangat Setuju' jika kamu enjoy intellectual debate. Jawab 'Sangat Tidak' jika kamu tidak suka berdebat."
  },
  { 
    id: 69, 
    text: "Saya bisa menghabiskan waktu lama untuk memahami satu konsep.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Pertanyaan ini tentang depth vs breadth learning kamu. Contoh: Apakah kamu bisa deep dive satu topik berjam-jam? Atau kamu prefer learn banyak hal sekilas? Jawab 'Sangat Setuju' jika kamu deep learner. Jawab 'Sangat Tidak' jika kamu breadth learner."
  },
  { 
    id: 70, 
    text: "Saya suka mencari cara paling logis dan elegant untuk solve masalah.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Ini tentang problem-solving aesthetic kamu. Contoh: Apakah kamu appreciate elegant solution? Cari cara paling logis? Atau kamu tidak peduli asal solve? Jawab 'Sangat Setuju' jika kamu value elegance dan logic. Jawab 'Sangat Tidak' jika kamu pragmatic, tidak peduli elegance."
  },
  { 
    id: 71, 
    text: "Saya tidak mudah percaya sesuatu tanpa analisis mendalam.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur skepticism dan analytical nature kamu. Contoh: Apakah kamu selalu analyze sebelum percaya? Tidak gampang terima info? Atau kamu mudah percaya? Jawab 'Sangat Setuju' jika kamu skeptical dan analytical. Jawab 'Sangat Tidak' jika kamu trusting dan tidak suka analyze."
  },
  { 
    id: 72, 
    text: "Saya suka memecah masalah kompleks jadi bagian-bagian kecil.", 
    function: 'Ti', 
    reverse: false,
    explanation: "Ini tentang analytical approach kamu. Contoh: Apakah kamu break down masalah jadi sub-problems? Solve satu-satu? Atau kamu tackle sekaligus? Jawab 'Sangat Setuju' jika kamu analytical dan systematic. Jawab 'Sangat Tidak' jika kamu holistic dan tidak suka break down."
  },

  // Fe - Extraverted Feeling (12 questions)
  { 
    id: 73, 
    text: "Saya sangat peduli dengan perasaan dan kebutuhan orang lain.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Pertanyaan ini tentang empathy dan people-focus kamu. Contoh: Apakah kamu selalu aware dengan perasaan orang? Peduli kebutuhan mereka? Atau kamu fokus pada diri sendiri? Jawab 'Sangat Setuju' jika kamu sangat empathetic. Jawab 'Sangat Tidak' jika kamu tidak terlalu peduli perasaan orang."
  },
  { 
    id: 74, 
    text: "Saya mudah merasakan suasana hati orang di sekitar saya.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Ini mengukur emotional sensitivity kamu. Contoh: Apakah kamu langsung tau kalau ada yang sedih/marah? Feel the vibe? Atau kamu oblivious? Jawab 'Sangat Setuju' jika kamu emotional sponge. Jawab 'Sangat Tidak' jika kamu tidak sensitive terhadap mood orang."
  },
  { 
    id: 75, 
    text: "Saya suka menciptakan harmoni dan menghindari konflik.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Pertanyaan ini tentang conflict avoidance kamu. Contoh: Apakah kamu selalu coba smooth things over? Avoid drama? Atau kamu tidak masalah dengan konflik? Jawab 'Sangat Setuju' jika kamu peacemaker. Jawab 'Sangat Tidak' jika kamu tidak takut konflik."
  },
  { 
    id: 76, 
    text: "Saya ekspresif dan mudah menunjukkan emosi saya.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Ini mengukur emotional expressiveness kamu. Contoh: Apakah orang mudah tau kamu lagi senang/sedih? Kamu expressive? Atau kamu poker face? Jawab 'Sangat Setuju' jika kamu emotionally expressive. Jawab 'Sangat Tidak' jika kamu reserved dan tidak show emotions."
  },
  { 
    id: 77, 
    text: "Saya suka membuat orang lain merasa nyaman dan diterima.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Pertanyaan ini tentang hospitality dan inclusiveness kamu. Contoh: Apakah kamu selalu make sure everyone feels welcome? Peduli orang merasa comfortable? Atau kamu tidak mikirin itu? Jawab 'Sangat Setuju' jika kamu welcoming dan inclusive. Jawab 'Sangat Tidak' jika kamu tidak peduli comfort orang."
  },
  { 
    id: 78, 
    text: "Saya mudah terpengaruh oleh mood orang di sekitar saya.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Ini tentang emotional contagion kamu. Contoh: Apakah mood kamu ikut down kalau orang sekitar sedih? Atau kamu independent dari mood orang? Jawab 'Sangat Setuju' jika mood kamu easily influenced. Jawab 'Sangat Tidak' jika mood kamu stable regardless of others."
  },
  { 
    id: 79, 
    text: "Saya suka menolong orang bahkan jika itu merugikan saya.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Pertanyaan ini mengukur self-sacrifice tendency kamu. Contoh: Apakah kamu rela sacrifice untuk orang lain? Put others first? Atau kamu prioritize diri sendiri? Jawab 'Sangat Setuju' jika kamu self-sacrificing. Jawab 'Sangat Tidak' jika kamu self-focused."
  },
  { 
    id: 80, 
    text: "Saya butuh approval dan validasi dari orang lain.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Ini tentang external validation need kamu. Contoh: Apakah kamu butuh orang bilang kamu bagus? Need approval? Atau kamu self-validated? Jawab 'Sangat Setuju' jika kamu need external validation. Jawab 'Sangat Tidak' jika kamu tidak peduli opini orang."
  },
  { 
    id: 81, 
    text: "Saya suka acara sosial dan berkumpul dengan banyak orang.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Pertanyaan ini tentang social preference kamu. Contoh: Apakah kamu enjoy party dan gathering? Suka social events? Atau kamu prefer sendiri/small group? Jawab 'Sangat Setuju' jika kamu social butterfly. Jawab 'Sangat Tidak' jika kamu prefer solitude atau intimate settings."
  },
  { 
    id: 82, 
    text: "Saya bisa membaca body language dan ekspresi wajah dengan baik.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Ini mengukur nonverbal communication skills kamu. Contoh: Apakah kamu bisa tau orang bohong dari body language? Read micro-expressions? Atau kamu tidak notice? Jawab 'Sangat Setuju' jika kamu good at reading people. Jawab 'Sangat Tidak' jika kamu tidak bisa read body language."
  },
  { 
    id: 83, 
    text: "Saya sering mengalah demi menjaga hubungan baik.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Pertanyaan ini tentang conflict resolution style kamu. Contoh: Apakah kamu sering give in untuk avoid conflict? Prioritize relationship? Atau kamu stand your ground? Jawab 'Sangat Setuju' jika kamu accommodating. Jawab 'Sangat Tidak' jika kamu assertive dan tidak mudah mengalah."
  },
  { 
    id: 84, 
    text: "Saya merasa bertanggung jawab atas perasaan orang lain.", 
    function: 'Fe', 
    reverse: false,
    explanation: "Ini mengukur emotional responsibility kamu. Contoh: Apakah kamu merasa guilty kalau orang sedih karena kamu? Feel responsible? Atau kamu 'bukan masalah gue'? Jawab 'Sangat Setuju' jika kamu feel responsible. Jawab 'Sangat Tidak' jika kamu tidak feel responsible untuk perasaan orang."
  },

  // Fi - Introverted Feeling (12 questions)
  { 
    id: 85, 
    text: "Saya punya nilai dan prinsip pribadi yang sangat kuat.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Pertanyaan ini tentang personal values kamu. Contoh: Apakah kamu punya core values yang tidak bisa dikompromikan? Strong principles? Atau kamu flexible? Jawab 'Sangat Setuju' jika kamu punya strong personal values. Jawab 'Sangat Tidak' jika kamu tidak punya fixed values."
  },
  { 
    id: 86, 
    text: "Saya merasakan emosi dengan sangat dalam dan intens.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Ini mengukur emotional depth kamu. Contoh: Apakah kamu feel emotions sangat kuat? Deep feelings? Atau kamu emotionally moderate? Jawab 'Sangat Setuju' jika kamu feel deeply. Jawab 'Sangat Tidak' jika emotions kamu tidak terlalu intense."
  },
  { 
    id: 87, 
    text: "Saya tidak suka dipaksa melakukan hal yang bertentangan dengan nilai saya.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Pertanyaan ini tentang value integrity kamu. Contoh: Apakah kamu refuse hal yang against your values? Stand firm? Atau kamu bisa compromise? Jawab 'Sangat Setuju' jika kamu tidak bisa compromise values. Jawab 'Sangat Tidak' jika kamu flexible dan bisa adjust."
  },
  { 
    id: 88, 
    text: "Saya lebih suka mengekspresikan perasaan melalui seni atau tulisan.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Ini tentang emotional expression style kamu. Contoh: Apakah kamu express feelings lewat art, music, writing? Atau kamu express directly? Jawab 'Sangat Setuju' jika kamu artistic expresser. Jawab 'Sangat Tidak' jika kamu direct verbal expresser."
  },
  { 
    id: 89, 
    text: "Saya sangat empati tapi tidak selalu menunjukkannya.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Pertanyaan ini tentang internal vs external empathy kamu. Contoh: Apakah kamu deeply care tapi tidak show it? Feel a lot inside? Atau kamu openly expressive? Jawab 'Sangat Setuju' jika kamu internal empath. Jawab 'Sangat Tidak' jika kamu openly show empathy."
  },
  { 
    id: 90, 
    text: "Saya membuat keputusan berdasarkan apa yang terasa benar bagi saya.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Ini mengukur decision-making basis kamu. Contoh: Apakah kamu decide based on 'what feels right'? Follow your heart? Atau based on logic? Jawab 'Sangat Setuju' jika kamu heart-based decision maker. Jawab 'Sangat Tidak' jika kamu logic-based decision maker."
  },
  { 
    id: 91, 
    text: "Saya butuh waktu sendiri untuk memproses perasaan saya.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Pertanyaan ini tentang emotional processing style kamu. Contoh: Apakah kamu butuh alone time untuk process feelings? Atau kamu process dengan talk to others? Jawab 'Sangat Setuju' jika kamu internal processor. Jawab 'Sangat Tidak' jika kamu external processor."
  },
  { 
    id: 92, 
    text: "Saya sangat autentik dan tidak suka berpura-pura.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Ini mengukur authenticity kamu. Contoh: Apakah kamu selalu be yourself? Tidak bisa fake? Atau kamu bisa adjust persona? Jawab 'Sangat Setuju' jika kamu authentic dan genuine. Jawab 'Sangat Tidak' jika kamu bisa adapt dan adjust persona."
  },
  { 
    id: 93, 
    text: "Saya peduli pada orang yang saya sayangi dengan sangat dalam.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Pertanyaan ini tentang depth of care kamu. Contoh: Apakah kamu deeply care untuk inner circle? Intense loyalty? Atau kamu care equally untuk semua? Jawab 'Sangat Setuju' jika kamu deeply care untuk few people. Jawab 'Sangat Tidak' jika kamu care broadly tapi tidak deep."
  },
  { 
    id: 94, 
    text: "Saya punya standar moral yang tinggi untuk diri sendiri.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Ini mengukur personal standards kamu. Contoh: Apakah kamu punya high moral standards untuk diri sendiri? Self-critical? Atau kamu lenient? Jawab 'Sangat Setuju' jika kamu punya high standards. Jawab 'Sangat Tidak' jika kamu tidak punya strict standards."
  },
  { 
    id: 95, 
    text: "Saya merasa terluka jika nilai-nilai saya tidak dihargai.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Pertanyaan ini tentang value sensitivity kamu. Contoh: Apakah kamu hurt kalau orang dismiss your values? Take it personally? Atau kamu tidak peduli? Jawab 'Sangat Setuju' jika kamu sensitive tentang values. Jawab 'Sangat Tidak' jika kamu tidak terpengaruh."
  },
  { 
    id: 96, 
    text: "Saya lebih suka mendengarkan inner voice saya daripada opini orang.", 
    function: 'Fi', 
    reverse: false,
    explanation: "Ini mengukur internal vs external guidance kamu. Contoh: Apakah kamu follow inner voice meskipun semua orang bilang lain? Trust yourself? Atau kamu consider opini orang? Jawab 'Sangat Setuju' jika kamu self-guided. Jawab 'Sangat Tidak' jika kamu consider external opinions."
  },
];

// Helper function to get question by ID
export function getQuestion(id: number): MBTIQuestion | undefined {
  return questions.find(q => q.id === id);
}
