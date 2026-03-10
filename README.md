# Glunova — Platform Manajemen Diabetes

Glunova adalah platform berbasis web untuk manajemen diabetes yang komprehensif, menghubungkan pasien dengan dokter spesialis dan menyediakan edukasi kesehatan serta pemantauan nutrisi berbasis AI.

## Fitur Utama

- 🩺 **Konsultasi Dokter** — Booking dan chat real-time dengan dokter spesialis
- 📚 **Edukasi Kesehatan** — 1000 hari konten edukasi diabetes terstruktur
- 🔬 **Glunova Vision** — Analisis nutrisi makanan berbasis AI dari foto
- 🗺️ **Roadmap Kesehatan** — Aktivitas harian terpersonalisasi per trimester
- 🤖 **Glunova AI** — Asisten virtual untuk konsultasi kesehatan
- 👨‍⚕️ **Portal Dokter** — Dashboard, jadwal, dan manajemen konsultasi
- 🛡️ **Portal Admin** — Dashboard analitik, approval dokter, manajemen konten

## Tech Stack

- **Frontend**: Next.js 16, React 19, Framer Motion
- **Styling**: Tailwind CSS v4 + CSS Custom Properties (Glunova Design System)
- **Backend**: Supabase (Auth, Database, Storage)
- **AI**: OpenAI-compatible API via OpenRouter
- **UI Components**: Radix UI, Lucide React, Recharts
- **Fonts**: Sora (heading) + DM Sans (body)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Environment Variables

Buat file `.env.local` dengan variabel berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

## Roles

| Role | Akses |
|------|-------|
| **User** | Dashboard, edukasi, vision AI, konsultasi, roadmap |
| **Doctor** | Portal dokter, konsultasi, jadwal, earnings |
| **Admin** | Dashboard admin, approval dokter, manajemen konten |

## Design System

Glunova menggunakan design system berbasis CSS Custom Properties dengan palet warna biru profesional:

- **Primary**: `#1A56DB` (blue-700) — warna utama
- **Accent**: `#E5A00D` (warning/yellow) — aksen
- **Neutral**: grayscale untuk teks dan background
- **Typography**: Sora (headings) + DM Sans (body text)
