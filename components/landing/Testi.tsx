'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Wijaya',
    role: 'Pasien Diabetes Tipe 2',
    text: 'Glunova benar-benar mengubah cara saya mengelola diabetes. Pemantauan harian dan konsultasi dokter yang mudah membuat saya lebih percaya diri menjalani hidup sehat.',
    rating: 5,
    initials: 'SW',
  },
  {
    name: 'dr. Arief Budiman',
    role: 'Dokter Spesialis Penyakit Dalam',
    text: 'Sebagai dokter, saya merasa Glunova sangat membantu dalam memantau perkembangan pasien saya. Data yang tersedia memudahkan pengambilan keputusan klinis.',
    rating: 5,
    initials: 'AB',
  },
  {
    name: 'Dewi Lestari',
    role: 'Keluarga Pasien',
    text: 'Berkat fitur edukasi di Glunova, saya bisa lebih memahami cara mendukung suami saya yang menderita diabetes. Sangat informatif dan mudah dipahami.',
    rating: 5,
    initials: 'DL',
  },
]

export default function Testi() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--neutral-50)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-700)' }} />
            Testimoni
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4"
            style={{ color: 'var(--neutral-900)' }}
          >
            Apa Kata{' '}
            <span style={{ color: 'var(--primary-700)' }}>Pengguna Kami</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl relative"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--neutral-200)',
              }}
            >
              <Quote className="w-8 h-8 mb-4 opacity-20" style={{ color: 'var(--primary-300)' }} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testi.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--warning)' }} />
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--neutral-700)' }}>
                &ldquo;{testi.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
                >
                  {testi.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--neutral-900)' }}>
                    {testi.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--neutral-500)' }}>
                    {testi.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
