'use client'

import { motion } from 'framer-motion'
import { Zap, Clock, ShieldCheck, BarChart3 } from 'lucide-react'

const reasons = [
  {
    icon: Zap,
    title: 'AI-Powered',
    desc: 'Teknologi AI canggih yang membantu menganalisis pola gula darah dan memberikan rekomendasi personal.',
  },
  {
    icon: Clock,
    title: 'Akses 24/7',
    desc: 'Pantau kesehatan Anda kapan saja, di mana saja. Konsultasi dokter tersedia setiap saat.',
  },
  {
    icon: ShieldCheck,
    title: 'Dokter Terverifikasi',
    desc: 'Semua dokter di platform kami telah melalui proses verifikasi ketat untuk menjamin kualitas layanan.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven',
    desc: 'Analisis data klinis lengkap membantu Anda dan dokter membuat keputusan kesehatan yang tepat.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28"
      style={{ background: 'var(--neutral-50)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-700)' }} />
            Keunggulan
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4"
            style={{ color: 'var(--neutral-900)' }}
          >
            Mengapa Memilih{' '}
            <span style={{ color: 'var(--primary-700)' }}>Glunova?</span>
          </h2>
        </div>

        {/* Grid of reasons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group text-center p-7 rounded-2xl transition-all hover:-translate-y-1"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--neutral-200)',
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110"
                style={{ background: 'var(--primary-50)' }}
              >
                <reason.icon className="w-7 h-7" style={{ color: 'var(--primary-700)' }} />
              </div>
              <h3 className="text-base font-heading font-bold mb-2" style={{ color: 'var(--neutral-900)' }}>
                {reason.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--neutral-500)' }}>
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
