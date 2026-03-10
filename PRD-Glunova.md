# Product Requirements Document
# Glunova — Generasi Sadar Diabetes

**Versi:** 7.0  
**Tanggal:** 9 Maret 2026  
**Status:** Aktif — Vibe Coding Plan (Antigravity)  
**Base Project:** Genting (Generasi Anti Stunting)

---

## ⚠️ INSTRUKSI KRITIS — BACA INI SEBELUM MENYENTUH SATU FILE PUN

### PERINGATAN UTAMA: INI REBUILD UI DARI NOL — BUKAN UPDATE

Jika kamu hanya mengganti warna, mengganti teks, atau memodifikasi sedikit-sedikit tampilan halaman Genting yang lama — **kamu salah dan harus mengulang dari awal.**

**Yang diminta:**
- ✅ Scan seluruh proyek, temukan semua halaman yang ada
- ✅ Evaluasi setiap halaman: apakah relevan untuk tema diabetes Glunova?
- ✅ Halaman yang tidak relevan → **hapus**
- ✅ Halaman yang relevan → **hapus seluruh UI lamanya, bangun ulang dari nol**
- ✅ Desain setiap halaman sendiri berdasarkan referensi (Dribbble, Behance, Awwwards, Pinterest, Freepik, Mobbin, dll)
- ✅ Inovasi — jangan terpaku pada struktur atau layout halaman Genting lama

**Yang tidak boleh dilakukan:**
- ❌ Memodifikasi atau mereskin UI lama Genting
- ❌ Mengganti warna atau teks saja
- ❌ Mempertahankan layout atau struktur HTML lama
- ❌ Menyentuh backend, logika, fungsi, database, atau route
- ❌ Mempertahankan halaman yang sudah tidak relevan dengan tema diabetes

---

### LARANGAN KERAS

1. **DILARANG memodifikasi UI lama** — bukan refactor, bukan reskin. Hapus dan bangun ulang dari nol.
2. **DILARANG menebak atau berasumsi** tentang keputusan desain. Jika tidak ada di PRD ini, tanya dulu.
3. **DILARANG menyentuh backend** — tidak ada perubahan pada route, fungsi, kalkulasi, schema, nama field, nama variable. Zero exception.
4. **DILARANG menggunakan warna di luar CSS variables** yang didefinisikan di Section 5.1.
5. **DILARANG menggunakan font selain Sora dan DM Sans.**
6. **DILARANG menggunakan library ikon selain Lucide Icons.**
7. **DILARANG skip halaman yang masih relevan** — semua halaman yang dipertahankan wajib di-rebuild UI-nya.
8. **DILARANG terpaku pada desain Genting lama** — lihat referensi, desain sesuatu yang baru dan inovatif.

---

## 1. Konteks Proyek

Glunova adalah **rebuild UI total** dari aplikasi Genting yang sebelumnya bertema stunting. Backend, fitur, role, dan logika bisnis dipertahankan sepenuhnya. Yang dilakukan:

1. Nama & branding: Genting → **Glunova**
2. Tema konten: stunting → diabetes
3. Halaman yang tidak relevan dengan tema diabetes → **dihapus**
4. Semua halaman yang tersisa → **UI-nya dibuang dan dibangun ulang dari nol**

**Prinsip mutlak:**
- Backend Genting = dipertahankan 100%
- Halaman tidak relevan = dihapus
- UI halaman yang relevan = dihapus dan dibangun ulang 100%

---

## 2. Ringkasan Perubahan

| Aspek | Genting (Lama) | Glunova (Baru) |
|---|---|---|
| Nama | Genting | **Glunova** |
| Tema | Stunting & gizi anak | Diabetes & manajemen gula darah |
| Halaman tidak relevan | Dipertahankan | **Dihapus** |
| UI halaman relevan | Dipertahankan | **Dihapus dan dibangun ulang dari nol** |
| Desain | — | **Antigravity mendesain sendiri berdasarkan referensi** |
| Backend, logika, fitur | — | **Tidak diubah sama sekali** |
| Role | Semua role Genting | **Identik** |

---

## 3. Alur Kerja Wajib

```
STEP 1 — SCAN PROYEK (WAJIB SEBELUM APAPUN)
├── Telusuri seluruh struktur direktori proyek Genting
├── Temukan semua halaman/view/template yang ada di semua role
└── Buat daftar lengkap: nama halaman + path file + role yang mengakses

STEP 2 — EVALUASI RELEVANSI
Untuk setiap halaman dalam daftar, tanyakan:
"Apakah halaman ini masih masuk akal dalam konteks aplikasi manajemen diabetes?"
├── Tidak relevan (contoh: halaman yang sangat spesifik ke konteks stunting/posyandu/gizi anak
│   yang tidak punya padanan di konteks diabetes) → HAPUS file tersebut
└── Relevan → lanjut ke Step 3

STEP 3 — SETUP FONDASI
├── Pasang Google Fonts (Sora + DM Sans)
├── Definisikan CSS variables dari design system (Section 5)
└── Buat komponen global reusable

STEP 4 — REBUILD UI PER HALAMAN
Untuk setiap halaman yang relevan:
├── HAPUS seluruh markup/template UI lama
├── BUKA referensi desain (Dribbble, Behance, Awwwards, Pinterest, Freepik, Mobbin, dll)
├── DESAIN sendiri layout dan komponen yang baru dan inovatif
│   — tidak mengikuti struktur halaman Genting lama
│   — tidak terpaku pada pola umum/generik
│   — terinspirasi dari referensi terbaik yang relevan
├── TULIS ULANG template dari nol
│   — terapkan design system (Section 5)
│   — terapkan terminologi konten (Section 4)
│   — pertahankan data binding ke backend
└── Hasil harus terlihat seperti aplikasi yang benar-benar berbeda dari Genting

STEP 5 — QA
└── Jalankan checklist Section 9
```

---

## 4. Terminologi: Pemetaan Konten

Ganti semua terminologi stunting ke padanan diabetes di seluruh UI. Jika menemukan terminologi yang tidak ada di tabel ini, gunakan padanan diabetes yang paling tepat secara medis.

| Genting (Lama) | Glunova (Baru) |
|---|---|
| Stunting | Diabetes |
| Gizi buruk / gizi kurang | Gula darah tidak terkontrol |
| Tinggi badan | Kadar gula darah (mg/dL) |
| Berat badan | HbA1c (%) |
| Status gizi | Status diabetes |
| Normal (gizi) | Terkontrol |
| Posyandu | Klinik / Puskesmas |
| Kader posyandu | Tenaga kesehatan / Nakes |
| Balita / Anak | Pasien |
| Pemantauan tumbuh kembang | Pemantauan gula darah |
| Intervensi gizi | Manajemen diabetes |
| Laporan gizi | Laporan kesehatan |
| Data antropometri | Data klinis |
| Program gizi | Program diabetes |
| Genting | Glunova |

---

## 5. Design System

> Ini adalah satu-satunya constraint desain yang ditetapkan. Di luar sistem ini, Antigravity bebas mendesain sesuai referensi terbaik yang ditemukan.

### 5.1 Color Palette

```css
:root {
  /* Primary Blue */
  --primary-900: #0D2B6B;
  --primary-800: #1E429F;
  --primary-700: #1A56DB;
  --primary-500: #3F83F8;
  --primary-300: #76A9FA;
  --primary-100: #C3DDFD;
  --primary-50:  #EBF5FF;

  /* Neutral */
  --neutral-900: #111928;
  --neutral-700: #374151;
  --neutral-500: #6B7280;
  --neutral-300: #D1D5DB;
  --neutral-200: #E5E7EB;
  --neutral-100: #F3F4F6;
  --neutral-50:  #F8FAFF;
  --white:       #FFFFFF;

  /* Status */
  --success-bg: #D1FAE5; --success-text: #065F46; --success: #0E9F6E;
  --warning-bg: #FEF3C7; --warning-text: #92400E; --warning: #FF8A00;
  --danger-bg:  #FEE2E2; --danger-text:  #991B1B; --danger:  #E02424;
  --info-bg:    #EBF5FF; --info-text:    #1E429F; --info:    #3F83F8;

  /* Chart */
  --chart-1: #1A56DB; --chart-2: #3F83F8; --chart-3: #76A9FA;
  --chart-4: #0E9F6E; --chart-5: #FF8A00; --chart-6: #E02424;
}
```

Semua nilai warna yang digunakan harus berasal dari variabel di atas. Tidak boleh hardcode hex baru.

### 5.2 Tipografi

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap" rel="stylesheet">
```

- **Heading:** Sora (semua ukuran heading)
- **Body, label, button, teks UI:** DM Sans
- Tidak boleh menggunakan font lain sebagai font utama

### 5.3 Ikon

Gunakan **Lucide Icons** saja — tidak boleh dicampur library lain.

### 5.4 Gambar

Ambil dari **Unsplash** atau **Pexels** dengan tema medis/diabetes/healthcare. Tidak boleh menggunakan placeholder image service (picsum, placehold.it, dll). Untuk ilustrasi vector, gunakan **Freepik** (lisensi gratis).

---

## 6. Referensi Desain

> Antigravity bertanggung jawab penuh atas keputusan desain berdasarkan referensi berikut. PRD ini tidak mendiktekan layout, komposisi, atau detail visual — semua itu adalah domain Antigravity. Gunakan referensi ini sebagai standar kualitas minimum yang harus dicapai atau dilampaui.

| Platform | Cara Pakai |
|---|---|
| **Dribbble** | Cari `health dashboard UI`, `medical SaaS app`, `admin dashboard`, `healthcare app design`, `analytics dashboard`. Jadikan standar kualitas layout dan komponen. |
| **Behance** | Cari `healthcare UI UX case study`, `medical app design system`, `SaaS dashboard redesign`. Jadikan standar konsistensi sistem dan tipografi. |
| **Awwwards** | Cari `SaaS`, `healthcare`, `medical`, `dashboard`. Jadikan standar minimum micro-interaction dan kualitas keseluruhan. |
| **Pinterest** | Cari `medical dashboard UI 2024`, `healthcare app blue white`, `SaaS app design`. Gunakan untuk eksplorasi mood dan komposisi visual. |
| **Freepik** | Cari ilustrasi dan aset visual bertema medis/diabetes untuk hero, empty state, dan elemen dekoratif. |
| **Mobbin** | Cari `health web app`, `patient portal`, `medical dashboard`. Gunakan sebagai referensi real-world pattern navigasi dan form. |

**Standar kualitas:** Output akhir harus setara atau melampaui karya featured di Dribbble dan Awwwards — bukan template generik.

---

## 7. Yang Harus Dihindari

- ❌ Hanya mengganti warna atau teks dari UI Genting lama
- ❌ Mempertahankan layout atau struktur HTML lama Genting
- ❌ Desain generik yang terasa seperti template atau output AI biasa
- ❌ Gradient ungu-pink, tombol gradient dua warna, shadow terlalu tebal
- ❌ Font Inter, Roboto, atau Arial sebagai font utama
- ❌ Warna `#007bff` (Bootstrap) atau `#3B82F6` (Tailwind blue-500)
- ❌ Loading spinner — gunakan skeleton loader
- ❌ Placeholder image service

---

## 8. Urutan Eksekusi

1. Scan proyek → daftar semua halaman (**wajib pertama**)
2. Evaluasi relevansi → hapus halaman yang tidak relevan
3. Setup design system → CSS variables + Google Fonts
4. Global text replacement → "Genting" → "Glunova" + terminologi stunting → diabetes
5. Rebuild UI per halaman → satu per satu, tidak ada yang dilewati
6. QA → checklist Section 9

---

## 9. Checklist QA

**Test utama:**
- [ ] Membuka halaman Genting lama vs Glunova baru secara berdampingan → keduanya terlihat seperti **dua aplikasi yang benar-benar berbeda**
- [ ] Tidak ada halaman yang layoutnya mengikuti struktur lama Genting

**Pembersihan:**
- [ ] Halaman yang tidak relevan dengan tema diabetes sudah dihapus
- [ ] Tidak ada kata "Genting" di UI manapun
- [ ] Tidak ada kata "GlucoWise" — nama aplikasi adalah **Glunova**
- [ ] Tidak ada terminologi stunting tersisa
- [ ] Favicon dan `<title>` semua halaman sudah "Glunova"

**Design system:**
- [ ] Semua warna dari CSS variables Section 5.1
- [ ] Font Sora aktif di semua heading
- [ ] Font DM Sans aktif di semua body/label/button
- [ ] Semua ikon dari Lucide Icons saja
- [ ] Tidak ada placeholder image service

**Cakupan:**
- [ ] Semua halaman yang dipertahankan sudah di-rebuild UI-nya — tidak ada yang tertinggal
- [ ] Tidak ada halaman yang masih menggunakan struktur atau layout lama Genting

---

*PRD v7.0 — Glunova. Antigravity yang mendesain semua halaman berdasarkan referensi terbaik (Dribbble, Behance, Awwwards, Pinterest, Freepik, Mobbin, dll). PRD ini hanya menetapkan constraint warna, font, dan ikon — semua keputusan desain lainnya adalah domain Antigravity. Backend tidak disentuh.*

---

## 10. Hapus Semua Jejak Genting

Glunova harus terlihat seperti aplikasi yang dibangun **murni dari nol** — tidak boleh ada satupun petunjuk bahwa proyek ini adalah hasil clone dari Genting.

### Yang Harus Diperiksa dan Dibersihkan

**Kode & File:**
- Hapus semua komentar dalam kode yang menyebut "Genting", nama developer lama, atau konteks stunting
- Hapus semua nama file, nama class, nama variable, nama fungsi, atau nama komponen yang masih memakai penamaan khas Genting (contoh: `genting-card`, `stunting-form`, dll) — ganti ke penamaan yang netral atau sesuai konteks Glunova
- Hapus semua asset (gambar, ikon, ilustrasi) yang berkaitan dengan Genting, posyandu, atau stunting
- Periksa file konfigurasi (package.json, README, .env.example, dsb) — ganti nama proyek, deskripsi, dan metadata yang masih menyebut Genting

**UI & Konten:**
- Tidak boleh ada teks, label, placeholder, tooltip, atau alt-text yang menyebut Genting atau konteks stunting
- Tidak boleh ada pola UI yang terlihat copy-paste dari Genting — jika dua halaman terlihat "sama strukturnya", itu tanda perlu di-redesign ulang
- Tidak boleh ada dummy data atau contoh data yang masih berisi nama/nilai dari konteks stunting (berat badan bayi, tinggi balita, dll)

**Meta & Branding:**
- `<title>`, meta description, og:title, og:description → semua harus "Glunova"
- Favicon → baru, bukan milik Genting
- README → tulis ulang seolah-olah ini proyek baru dari nol

### Standar Akhir

Jika seseorang membuka proyek Glunova — baik dari sisi UI maupun dari sisi kode — mereka tidak boleh bisa menebak bahwa ini berasal dari proyek lain. Proyek ini harus terasa dan terlihat seperti **karya original yang dibangun dari nol untuk Glunova**.


---

## 11. Bersihkan Git History

Karena Glunova adalah hasil clone dari Genting, git history proyek ini masih menyimpan seluruh jejak commit lama Genting. Ini harus dibersihkan agar proyek terlihat seperti proyek original baru.

### Langkah yang Harus Dilakukan

```bash
# 1. Hapus folder .git yang lama (beserta seluruh history Genting)
rm -rf .git

# 2. Inisialisasi git baru yang bersih
git init

# 3. Stage semua file
git add .

# 4. Buat initial commit baru sebagai "proyek baru"
git commit -m "initial commit"
```

Setelah ini, git log hanya akan menampilkan satu commit bersih — tidak ada jejak history dari Genting sama sekali.

### Catatan
- Lakukan langkah ini **setelah semua perubahan UI dan konten selesai**, bukan di awal
- Jika proyek sudah terhubung ke remote repository Genting, pastikan juga update remote-nya ke repository Glunova yang baru