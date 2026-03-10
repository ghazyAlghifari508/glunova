'use client'

import { motion } from 'framer-motion'
import { Stethoscope, Activity, BookOpen, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Konsultasi Dokter',
    desc: 'Konsultasi langsung dengan dokter spesialis diabetes dan penyakit dalam terverifikasi.',
    icon: Stethoscope,
    color: 'var(--primary-700)',
    bgColor: 'var(--primary-50)',
  },
  {
    id: 2,
    title: 'Pemantauan Gula Darah',
    desc: 'Pantau kadar gula darah, HbA1c, dan data klinis Anda secara berkala dan terstruktur.',
    icon: Activity,
    color: 'var(--success)',
    bgColor: 'var(--success-bg)',
  },
  {
    id: 3,
    title: 'Edukasi Diabetes',
    desc: 'Program edukasi interaktif tentang manajemen diabetes, pola makan, dan gaya hidup sehat.',
    icon: BookOpen,
    color: 'var(--warning)',
    bgColor: 'var(--warning-bg)',
  },
]

export default function Services() {
  return (
    <section className="py-20 md:py-28 overflow-hidden" id="services"
      style={{ background: 'var(--white)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-700)' }} />
            Layanan Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4"
            style={{ color: 'var(--neutral-900)' }}
          >
            Layanan Lengkap untuk{' '}
            <span style={{ color: 'var(--primary-700)' }}>Manajemen Diabetes</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--neutral-500)' }}>
            Semua yang Anda butuhkan untuk mengelola diabetes dalam satu platform terpadu.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--neutral-200)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ background: service.bgColor }}
              >
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>

              <h3 className="text-lg font-heading font-bold mb-2" style={{ color: 'var(--neutral-900)' }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--neutral-500)' }}>
                {service.desc}
              </p>

              <div className="flex items-center gap-1 text-sm font-semibold transition-colors"
                style={{ color: 'var(--primary-700)' }}
              >
                Pelajari selengkapnya
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
