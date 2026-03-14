import { 
  Route, 
  Camera, 
  BookOpen, 
  Stethoscope 
} from 'lucide-react'

export const serviceCards = [
  {
    title: 'Roadmap',
    desc: 'Langkah harian manajemen gula darah yang terpersonalisasi.',
    href: '/roadmap',
    icon: Route,
    color: 'bg-blue-500',
  },
  {
    title: 'Vision',
    desc: 'Analisis nutrisi molekuler dengan Glunova Vision.',
    href: '/vision',
    icon: Camera,
    color: 'bg-indigo-500',
  },
  {
    title: 'Edukasi',
    desc: 'Materi terstruktur untuk gaya hidup sehat dan pencegahan.',
    href: '/education',
    icon: BookOpen,
    color: 'bg-emerald-500',
  },
  {
    title: 'Konsultasi',
    desc: 'Terhubung dengan dokter untuk pendampingan aktif.',
    href: '/konsultasi-dokter',
    icon: Stethoscope,
    color: 'bg-[color:var(--primary-700)]',
  },
]

export const dailyTasksByLevel: Record<number, string[]> = {
  1: [
    'Lakukan pengecekan gula darah puasa hari ini',
    'Minum air putih minimal 8 gelas',
    'Catat menu sarapan untuk evaluasi kalori',
  ],
  2: [
    'Pertahankan aktivitas fisik minimal 30 menit',
    'Konsumsi makanan tinggi serat sesuai rekomendasi',
    'Jadwalkan kontrol berkala dengan dokter',
  ],
  3: [
    'Pantau tren glukosa dan sesuaikan porsi makan',
    'Siapkan camilan sehat untuk cegah hipoglikemia',
    'Evaluasi metrik mingguan untuk laporan konsultasi',
  ],
}

export const remindersByLevel: Record<number, string[]> = {
  1: [
    'Pemeriksaan rutin penting untuk memantau HbA1c.',
    'Baca edukasi: Pentingnya manajemen stres bagi kesehatan.',
    'Catat fluktuasi glukosa yang tidak biasa.',
  ],
  2: [
    'Cek kembali target aktivitas fisik harian Anda.',
    'Artikel baru: Mengelola porsi karbohidrat kompleks.',
    'Pastikan jadwal kontrol dokter bulan ini tidak terlewat.',
  ],
  3: [
    'Pantau tanda-tanda kelelahan ekstrem dan konsultasikan.',
    'Baca edukasi: Strategi jangka panjang menjaga gula darah.',
    'Selalu sediakan cadangan camilan sehat di tas Anda.',
  ],
}

export const educationByLevel: Record<number, Array<{ title: string; href: string }>> = {
  1: [
    { title: 'Nutrisi tepat untuk kontrol gula darah harian', href: '/education' },
    { title: 'Mengenal tanda bahaya lonjakan glukosa', href: '/education' },
    { title: 'Panduan aktivitas fisik yang aman dan efektif', href: '/education' },
  ],
  2: [
    { title: 'Kenali perbedaan prediabetes dan diabetes', href: '/education' },
    { title: 'Panduan menyusun menu makan seimbang', href: '/education' },
    { title: 'Video peregangan ringan untuk menjaga metabolisme', href: '/education' },
  ],
  3: [
    { title: 'Checklist kebiasaan sehat yang perlu dipertahankan', href: '/education' },
    { title: 'Strategi mencegah komplikasi jangka panjang', href: '/education' },
    { title: 'Rencana perawatan mandiri di rumah', href: '/education' },
  ],
}
