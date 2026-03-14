# 🩺 Glunova — Generasi Sadar Diabetes

[![Build Status](https://img.shields.io/badge/Build-Success-emerald?style=for-the-badge&logo=nextdotjs)](https://github.com/alghifari/glunova)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20Supabase-blue?style=for-the-badge)](https://nextjs.org)
[![Competition](https://img.shields.io/badge/Project-Competition-orange?style=for-the-badge)](https://glunova.id)

**Glunova** adalah platform ekosistem kesehatan digital berbasis Web yang dirancang khusus untuk revolusi manajemen diabetes. Menggabungkan kekuatan **Artificial Intelligence**, **Precision Monitoring**, dan **Telemedicine**, Glunova membantu pasien mengelola kadar glukosa dalam rentang optimal melalui pendekatan yang interaktif dan data-driven.

---

## 🚀 Visi Proyek
Membangun "Generasi Sadar Diabetes" dengan menyediakan alat bantu yang cerdas, mudah diakses, dan secara medis tervalidasi untuk mencegah komplikasi diabetes demi kualitas hidup yang lebih baik.

## 🎨 Design System & Color Palette
Glunova menggunakan identitas visual **"Premium Glassmorphism"** yang menggabungkan kesan futuristik dengan profesionalisme medis.

| Palette | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Glunova Royal** | `#1A56DB` | Primary, Branding, Buttons |
| **Ocean Sky** | `#3F83F8` | Secondary, Accents |
| **Success Emerald** | `#0E9F6E` | Healthy Status, Normal Glucose |
| **Warning Amber** | `#FF8A00` | High Risk, Attention |
| **Soft Neutral** | `#F8FAFF` | Background, Clean Interfaces |

---

## 🛠️ Core Tech Stack
Dibangun dengan teknologi terbaru untuk performa ekstrem dan pengalaman pengguna yang seamless:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) + [React 19](https://reactjs.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Modern utility-first architecture)
- **Database & Auth**: [Supabase](https://supabase.com) (PostgreSQL + RLS Security)
- **Intelligence**: Vision AI & LLM integration via AI SDK
- **Animation**: [Framer Motion 12](https://www.framer.com/motion/) (Smooth transitions)
- **Dataviz**: [Recharts](https://recharts.org)

---

## 👥 Roles & Aksesibilitas
Sistem Glunova mengelola 3 entitas utama dengan integrasi data real-time:

1. **Pasien (User)**
   - Akses Roadmap Metabolik harian.
   - Glunova Vision (Deteksi nutrisi makanan via AI).
   - Konsultasi Chat dengan Dokter Spesialis.
   - Lab Result Tracking (HbA1c & Glucose levels).
2. **Dokter (Specialist)**
   - Dashboard Manajemen Pasien.
   - Jadwal Konsultasi & Riwayat Medis Pasien.
   - Verifikasi data harian pasien.
3. **Administrator**
   - Analitik Kesehatan Global.
   - Manajemen Konten Edukasi.
   - Approval Pendaftaran Dokter.

---

## ✨ Fitur Unggulan
- 🦾 **Glunova Vision AI**: Pindai makanan Anda, biarkan AI kami menghitung estimasi indeks glikemik secara instan.
- 🗺️ **Roadmap Care**: Peta jalan harian yang adaptif berdasarkan fase monitoring (Level 1-3).
- 💬 **Tele-Consultation**: Hubungkan pasien dengan dokter tanpa hambatan geografis.
- 📚 **GiziDukasi**: Modul edukasi terstruktur untuk pemahaman mendalam tentang pola hidup sehat.

---

## 💻 Cara Menjalankan

### Persyaratan
- Node.js 20+
- NPM / PNPM / Bun

### Instalasi
```bash
# Clone repository
git clone https://github.com/user/glunova.git

# Masuk ke direktori
cd glunova

# Install dependencies
npm install

# Setup Environment (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
OPENROUTER_API_KEY=your_ai_key

# Jalankan Development Mode
npm run dev
```

---

## 📂 Struktur Folder Utama
```text
├── app/               # Next.js App Router (Layouts & Pages)
├── components/        # UI Components (Atomic Design)
├── hooks/             # Custom React Hooks
├── lib/               # Shared Utilities & Supabase Client
├── services/          # API & Server Action Logic
├── types/             # TypeScript Type Definitions
└── public/            # Static Assets
```

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk Masa Depan Kesehatan Indonesia.</p>
  <p><b>Glunova Team — 2026</b></p>
</div>
