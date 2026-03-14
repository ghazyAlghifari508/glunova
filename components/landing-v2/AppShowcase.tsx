'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Camera, BarChart3, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const showcases = [
  {
    icon: Camera,
    title: 'Vision AI Scanner',
    subtitle: 'Analisis Makanan Instan',
    description: 'Cukup arahkan kamera ke makanan Anda. AI kami akan menganalisis kandungan gula, karbohidrat, dan keamanan diet dalam hitungan detik.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Healthy food spread on a table for AI analysis',
    points: ['Deteksi kandungan gula', 'Rekomendasi porsi', 'Skor keamanan diet'],
    color: 'var(--primary-700)',
    bg: 'var(--primary-50)',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Analitik',
    subtitle: 'Pantau Tren Kesehatan',
    description: 'Visualisasi data gula darah, HbA1c, dan aktivitas harian Anda dalam grafik interaktif yang mudah dipahami oleh siapa saja.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Medical professional reviewing health analytics',
    points: ['Grafik tren mingguan', 'Prediksi risiko AI', 'Export laporan PDF'],
    color: 'var(--success)',
    bg: 'var(--success-bg)',
  },
  {
    icon: MessageSquare,
    title: 'Konsultasi Dokter',
    subtitle: 'Hubungi Spesialis Kapan Saja',
    description: 'Chat langsung dengan dokter spesialis penyakit dalam yang berpengalaman. Dapatkan resep dan rekomendasi personal untuk kondisi Anda.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Doctor and patient consultation in modern clinic',
    points: ['Chat real-time', 'Resep digital', 'Riwayat lengkap'],
    color: 'var(--warning)',
    bg: 'var(--warning-bg)',
  },
]

export function AppShowcase() {
  return (
    <section className="py-24 bg-[color:var(--neutral-50)] overflow-hidden">
      <div className="container w-full mx-auto px-4">

        <div className="text-center mb-20">
          <h2 className="text-[color:var(--primary-700)] font-bold tracking-wider uppercase text-sm mb-3 font-heading">Platform Preview</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-[color:var(--neutral-900)] tracking-tight mb-4 font-heading">
            Lihat Glunova Beraksi
          </h3>
          <p className="text-lg text-[color:var(--neutral-500)] max-w-2xl mx-auto font-body">
            Dirancang untuk memberikan pengalaman terbaik dalam mengelola kesehatan diabetes Anda sehari-hari.
          </p>
        </div>

        <div className="space-y-20">
          {showcases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white aspect-[4/3] group">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    <span className="text-sm font-bold text-[color:var(--neutral-900)] font-heading">{item.subtitle}</span>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: item.bg }}>
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h4 className="text-3xl font-bold text-[color:var(--neutral-900)] mb-4 font-heading">{item.title}</h4>
                <p className="text-lg text-[color:var(--neutral-500)] mb-8 leading-relaxed font-body">{item.description}</p>
                <ul className="space-y-3 mb-8">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[color:var(--success)] flex-shrink-0" />
                      <span className="text-[color:var(--neutral-700)] font-semibold font-body">{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 font-bold text-[color:var(--primary-700)] hover:text-[color:var(--primary-800)] transition-colors group/link font-heading"
                >
                  Pelajari Selengkapnya
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
