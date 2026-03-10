'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

const articles = [
  {
    title: '10 Cara Efektif Mengontrol Gula Darah Harian',
    excerpt: 'Pelajari tips praktis yang bisa Anda terapkan setiap hari untuk menjaga kadar gula darah tetap stabil.',
    category: 'Tips Kesehatan',
    readTime: '5 menit',
  },
  {
    title: 'Memahami HbA1c: Apa Arti Angka Anda?',
    excerpt: 'Panduan lengkap tentang pemeriksaan HbA1c dan bagaimana menafsirkan hasilnya untuk manajemen diabetes.',
    category: 'Edukasi',
    readTime: '7 menit',
  },
  {
    title: 'Pola Makan Sehat untuk Penderita Diabetes',
    excerpt: 'Rekomendasi menu harian yang ramah diabetes tanpa mengorbankan kelezatan dan variasi makanan.',
    category: 'Nutrisi',
    readTime: '6 menit',
  },
]

export default function BlogSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--white)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
              style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-700)' }} />
              Blog
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight"
              style={{ color: 'var(--neutral-900)' }}
            >
              Artikel{' '}
              <span style={{ color: 'var(--primary-700)' }}>Terbaru</span>
            </h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm font-semibold mt-4 md:mt-0 transition-colors"
            style={{ color: 'var(--primary-700)' }}
          >
            Lihat semua artikel
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1"
              style={{
                border: '1px solid var(--neutral-200)',
              }}
            >
              {/* Color strip header instead of image */}
              <div className="h-2"
                style={{
                  background: idx === 0 ? 'var(--primary-700)' : idx === 1 ? 'var(--success)' : 'var(--warning)',
                }}
              />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md"
                    style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
                  >
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--neutral-500)' }}>
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>

                <h3 className="text-base font-heading font-bold mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors"
                  style={{ color: 'var(--neutral-900)' }}
                >
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--neutral-500)' }}>
                  {article.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
