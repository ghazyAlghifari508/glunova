import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load env vars
dotenv.config({ path: ".env.local" });

async function seed() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing required environment variables.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    console.log("Cleaning up existing data...");
    // Keep internal logic as is, but purge content

    console.log("Seeding Education Contents...");
    const educationItems = [
      // PHASE: Monitoring Awal (Prediabetes / Diagnosis Baru)
      { day: 1, phase: 'kesehatan', month: 1, title: 'Langkah Pertama: Pemahaman Dasar', description: 'Memahami apa itu diabetes dan cara kerja insulin.', category: 'kesehatan', content: 'Diabetes adalah kondisi kronis yang memengaruhi cara tubuh mengubah makanan menjadi energi. Langkah terpenting adalah memahami profil glukosa pribadi Anda.', tips: ['Cek gula darah sesuai jadwal dokter', 'Catat setiap lonjakan gula darah', 'Pelajari gejala hipoglikemia'] },
      { day: 14, phase: 'kesehatan', month: 1, title: 'Nutrisi: Indeks Glikemik Rendah', description: 'Memilih makanan yang tidak memicu lonjakan gula.', category: 'nutrisi', content: 'Makanan dengan IG rendah diserap lebih lambat, memberikan energi stabil tanpa membuat gula darah melonjak drastis.', tips: ['Ganti nasi putih dengan nasi merah atau quinoa', 'Perbanyak sayuran hijau dalam piring', 'Hindari minuman manis kemasan'] },
      { day: 30, phase: 'kesehatan', month: 1, title: 'Manajemen Stres & Glukosa', description: 'Bagaimana hormon stres memengaruhi gula darah.', category: 'kesehatan', content: 'Stres memicu hormon kortisol yang dapat meningkatkan resistensi insulin. Meditasi singkat sangat membantu stabilisasi.', tips: ['Lakukan teknik pernapasan 5 menit harian', 'Pastikan tidur cukup 7-8 jam', 'Konsultasi jika cemas berlebihan'] },
      { day: 60, phase: 'kesehatan', month: 2, title: 'Pentingnya Monitoring HbA1c', description: 'Melihat gambaran besar kontrol gula darah 3 bulan.', category: 'perkembangan', content: 'HbA1c mencerminkan rata-rata gula darah Anda selama 2-3 bulan terakhir. Ini adalah standar emas evaluasi terapi.', tips: ['Jadwalkan cek lab rutin', 'Diskusikan target HbA1c dengan dokter', 'Pertahankan diet konsisten'] },
      { day: 90, phase: 'kesehatan', month: 3, title: 'Kesehatan Saraf & Ekstremitas', description: 'Mencegah neuropati dengan perawatan kaki mandiri.', category: 'kesehatan', content: 'Gula darah tinggi dapat merusak saraf. Periksa kaki setiap malam untuk mendeteksi luka sekecil apa pun.', tips: ['Gunakan pelembab pada area kering', 'Pilih alas kaki yang nyaman dan pas', 'Jangan memotong kuku terlalu dalam'] },
      { day: 120, phase: 'kesehatan', month: 4, title: 'Aktivitas Fisik & Sensitivitas Insulin', description: 'Olahraga membantu otot menyerap glukosa lebih baik.', category: 'stimulasi', content: 'Olahraga aerobik seperti jalan cepat meningkatkan efektivitas insulin dalam tubuh selama 24-48 jam.', tips: ['Target minimal 150 menit per minggu', 'Cek gula darah sebelum dan sesudah olahraga', 'Bawa camilan karbohidrat cepat serap'] },
      { day: 150, phase: 'kesehatan', month: 5, title: 'Kesehatan Kardiovaskular', description: 'Menjaga jantung dari komplikasi mikrovaskuler.', category: 'perkembangan', content: 'Kontrol gula darah yang baik berbanding lurus dengan kesehatan jantung dan pembuluh darah.', tips: ['Pantau tekanan darah secara berkual', 'Kurangi asupan garam dan lemak trans', 'Lakukan evaluasi profil lipid rutin'] },
      { day: 180, phase: 'kesehatan', month: 6, title: 'Evaluasi Pola Makan Berkelanjutan', description: 'Menghindari kebosanan dalam diet diabetes.', category: 'nutrisi', content: 'Diet diabetes bukanlah hukuman, melainkan pola hidup sehat. Eksplorasi resep baru yang kaya serat dan nutrisi.', tips: ['Gunakan rempah alami sebagai pengganti gula', 'Eksperimen dengan protein nabati', 'Gunakan metode piring T (Sayur, Protein, Karbo)'] },
      { day: 210, phase: 'kesehatan', month: 7, title: 'Manajemen Obat & Insulin', description: 'Kepatuhan terapi untuk hasil klinis optimal.', category: 'aktivitas', content: 'Obat oral atau insulin bekerja paling baik jika dikonsumsi tepat waktu sesuai instruksi medis.', tips: ['Gunakan kotak obat mingguan', 'Pelajari teknik penyuntikan yang benar', 'Siapkan cadangan insulin saat bepergian'] },
      { day: 240, phase: 'kesehatan', month: 8, title: 'Hormon & Variabilitas Glukosa', description: 'Faktor eksternal yang memengaruhi kadar gula.', category: 'nutrisi', content: 'Berbagai faktor seperti cuaca, infeksi, atau siklus hormon dapat memengaruhi profil glukosa harian Anda.', tips: ['Tingkatkan frekuensi cek gula saat sakit', 'Tetap terhidrasi dengan air putih', 'Laporkan tren yang tidak biasa ke dokter'] },
      { day: 270, phase: 'kesehatan', month: 9, title: 'Target Kesehatan Jangka Panjang', description: 'Membangun gaya hidup untuk remisi atau kontrol penuh.', category: 'kesehatan', content: 'Konsistensi adalah kunci. Anda sedang membangun fondasi untuk hidup berkualitas tanpa komplikasi.', tips: ['Rayakan pencapaian kecil (gula darah stabil)', 'Tetap aktif dalam komunitas Glunova', 'Edukasi keluarga tentang kondisi Anda'] },

      // PHASE: Fase Stabilisasi (Lanjut)
      { day: 280, phase: 'fase_2', month: 10, title: 'Edukasi Keluarga Tentang Diabetes', description: 'Membangun support system di rumah.', category: 'nutrisi', content: 'Dukungan keluarga mempermudah transisi gaya hidup. Edukasi mereka tentang penanganan hipoglikemia darurat.', tips: ['Ajak keluarga makan sehat bersama', 'Jelaskan tanda-tanda jika Anda butuh bantuan', 'Sosialisasikan jadwal cek rutin Anda'] },
      { day: 310, phase: 'fase_2', month: 11, title: 'Manajemen Glukosa saat Bepergian', description: 'Tips menjaga pola sehat selama liburan.', category: 'kesehatan', content: 'Bepergian bukan alasan untuk lepas kontrol. Selalu bawa perlengkapan medis dan camilan darurat.', tips: ['Bawa surat keterangan medis', 'Simpan insulin di tempat sejuk', 'Pilih menu makanan yang paling aman'] },

      // PHASE: Optimalisasi Kontrol
      { day: 450, phase: 'fase_3', month: 15, title: 'Teknologi dalam Monitoring Diabetes', description: 'Mengenal CGM dan aplikasi pemantauan.', category: 'nutrisi', content: 'Penggunaan sensor glukosa kontinu memberikan data real-time untuk penyesuaian diet yang lebih presisi.', tips: ['Pelajari cara membaca tren grafik glukosa', 'Sinkronkan data ke aplikasi Glunova', 'Gunakan data untuk evaluasi menu makan'] },
      { day: 540, phase: 'fase_3', month: 18, title: 'Kesehatan Mental Pasien Kronis', description: 'Mengatasi kelelahan manajemen (diabetes burnout).', category: 'stimulasi', content: 'Merasa lelah mengelola kondisi setiap hari adalah hal yang wajar. Jangan ragu mencari bantuan profesional.', tips: ['Bergabung dengan grup pendukung', 'Berikan diri sendiri "istirahat" mental', 'Fokus pada apa yang bisa Anda kendalikan'] },

      // PHASE: Maintenance Seumur Hidup
      { day: 700, phase: 'fase_4', month: 24, title: 'Gaya Hidup Sebagai Obat Utama', description: 'Diabetes terkontrol sebagai kenormalan baru.', category: 'nutrisi', content: 'Pada tahap ini, kebiasaan sehat Anda sudah otomatis. Teruskan inspirasi ini untuk orang di sekitar Anda.', tips: ['Pertahankan berat badan ideal', 'Lakukan medical check-up menyeluruh tahunan', 'Nikmati hidup dengan kontrol yang bijak'] },
    ];

    for (const item of educationItems) {
      const { error } = await supabase.from('education_contents').upsert(item, { onConflict: 'day' });
      if (error) console.error(`Error seeding education day ${item.day}:`, error);
    }

    console.log("Seeding Roadmap Activities...");
    const activities = [
      // CATEGORY: Exercise
      { activity_name: 'Jalan Cepat Pagi', category: 'exercise', description: 'Aktivitas aerobik moderat untuk menurunkan kadar gula darah.', difficulty_level: 1, min_level: 1, max_level: 3, duration_minutes: 30, frequency_per_week: 5, benefits: ['Sensitivitas insulin meningkat', 'Berat badan terkontrol'], instructions: ['Gunakan sepatu lari yang empuk', 'Berjalan dengan kecepatan di mana Anda masih bisa bicara tapi terengah', 'Cek gula darah sebelum mulai'], tips: 'Lakukan rutin 30 menit sehari untuk hasil metabolisme terbaik.', warnings: 'Bawa permen jika gula darah turun di bawah 70 mg/dL.' },
      { activity_name: 'Latihan Beban Ringan', category: 'exercise', description: 'Membangun massa otot untuk efisiensi metabolisme glukosa.', difficulty_level: 2, min_level: 2, max_level: 3, duration_minutes: 20, frequency_per_week: 3, benefits: ['Metabolisme basal meningkat', 'Otot menyerap glukosa lebih baik'], instructions: ['Gunakan dumbbell ringan atau resistance band', 'Fokus pada gerakan dasar (squat, push up dinding)', 'Jaga napas tetap teratur'], tips: 'Latihan beban setelah makan membantu menekan lonjakan glukosa.', warnings: 'Hindari angkatan berat yang memicu tekanan darah berlebih.' },
      
      // CATEGORY: Nutrition
      { activity_name: 'Cek Gula Darah Mandiri', category: 'nutrition', description: 'Monitoring rutin for memetakan respon tubuh terhadap makanan.', difficulty_level: 1, min_level: 1, max_level: 3, duration_minutes: 5, frequency_per_week: 7, benefits: ['Deteksi dini lonjakan glukosa', 'Edukasi mandiri terhadap menu makan'], instructions: ['Cuci tangan dengan sabun', 'Gunakan lancet baru', 'Catat hasil di aplikasi Glunova'], tips: 'Lakukan di waktu yang sama setiap hari (misal: sebelum sarapan).', warnings: 'Laporkan jika hasil melebihi 200 mg/dL atau di bawah 70 mg/dL.' },
      { activity_name: 'Diet Serat Tinggi harian', category: 'nutrition', description: 'Mengonsumsi sayuran untuk memperlambat penyerapan karbohidrat.', difficulty_level: 1, min_level: 1, max_level: 3, duration_minutes: 30, frequency_per_week: 7, benefits: ['Gula darah lebih stabil', 'Menjaga kesehatan pencernaan'], instructions: ['Siapkan minimal 2 porsi sayur saat makan besar', 'Pilih sayuran hijau atau serat tinggi', 'Makan sayur terlebih dahulu sebelum nasi'], tips: 'Makan sayur di awal dapat menurunkan respons glikemik nasi.', warnings: 'Hindari dressing salad yang tinggi gula/mayones.' },
      
      // CATEGORY: Sleep
      { activity_name: 'Tidur Berkualitas 8 Jam', category: 'sleep', description: 'Istirahat total untuk regenerasi hormon insulin.', difficulty_level: 1, min_level: 1, max_level: 3, duration_minutes: 480, frequency_per_week: 7, benefits: ['Menurunkan resistensi insulin', 'Kontrol emosi lebih baik'], instructions: ['Matikan layar 1 jam sebelum tidur', 'Atur suhu kamar yang nyaman', 'Gunakan teknik relaksasi jika sulit terlelap'], tips: 'Kurang tidur berhubungan langsung dengan kenaikan gula darah pagi hari.', warnings: 'Laporkan ke dokter jika mendengkur keras (Gejala Sleep Apnea).' },

      // CATEGORY: Mental
      { activity_name: 'Mindful Breathing 10 Menit', category: 'mental', description: 'Relaksasi untuk menekan hormon kortisol penaik gula darah.', difficulty_level: 1, min_level: 1, max_level: 3, duration_minutes: 10, frequency_per_week: 5, benefits: ['Stres berkurang', 'Tekanan darah lebih stabil'], instructions: ['Duduk tegak dan rileks', 'Fokus pada keluar masuknya napas', 'Sadari setiap tarikan napas tanpa menghakimi'], tips: 'Lakukan saat sela jam kerja atau sebelum tidur.', warnings: 'Bagi pasien dengan neuropati, pastikan posisi duduk tidak menekan kaki.' },

      // CATEGORY: Checkup
      { activity_name: 'Inspeksi Kaki Mandiri', category: 'checkup', description: 'Mencegah luka yang sulit sembuh akibat diabetes.', difficulty_level: 1, min_level: 1, max_level: 3, duration_minutes: 5, frequency_per_week: 7, benefits: ['Deteksi dini luka/iritasi', 'Mencegah infeksi serius'], instructions: ['Gunakan cermin untuk melihat bagian bawah telapak kaki', 'Periksa celah jari kaku', 'Laporkan jika ada kulit pecah-pecah atau merah'], tips: 'Lakukan setiap malam sebelum tidur atau setelah mandi.', warnings: 'Segera hubungi perawat jika ada luka yang tidak kunjung sembuh.' },

      // CATEGORY: Bonding (Community/Family focus)
      { activity_name: 'Edukasi Bersama Pasangan', category: 'bonding', description: 'Mengajak keluarga memahami pola hidup diabetes.', difficulty_level: 1, min_level: 1, max_level: 3, duration_minutes: 30, frequency_per_week: 1, benefits: ['Support system yang kuat', 'Lingkungan rumah yang sehat'], instructions: ['Tonton video edukasi Glunova bersama keluarga', 'Diskusikan menu makan mingguan', 'Jelaskan cara menangani kondisi darurat'], tips: 'Ajak pasangan ikut serta saat sesi konsultasi dokter.', warnings: 'Jangan menutupi kondisi medis Anda dari keluarga terdekat.' },
    ];

    for (const activity of activities) {
      // Manual check because activity_name is not unique in schema
      const { data: existing } = await supabase
        .from('roadmap_activities')
        .select('id')
        .eq('activity_name', activity.activity_name)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('roadmap_activities')
          .update(activity)
          .eq('id', existing.id);
        if (error) console.error(`Error updating activity ${activity.activity_name}:`, error);
      } else {
        const { error } = await supabase
          .from('roadmap_activities')
          .insert(activity);
        if (error) console.error(`Error inserting activity ${activity.activity_name}:`, error);
      }
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Critical error during seeding:", err);
  } finally {
    process.exit();
  }
}

seed();
