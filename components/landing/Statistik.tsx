'use client'

import { motion } from 'framer-motion'
import { Users, Stethoscope, TrendingDown, HeartPulse } from 'lucide-react'

const stats = [
  { icon: Users, value: '10,000+', label: 'Pasien Aktif', color: 'var(--primary-700)' },
  { icon: Stethoscope, value: '500+', label: 'Dokter Terverifikasi', color: 'var(--success)' },
  { icon: TrendingDown, value: '85%', label: 'Gula Darah Terkontrol', color: 'var(--warning)' },
  { icon: HeartPulse, value: '98%', label: 'Tingkat Kepuasan', color: 'var(--danger)' },
]

export default function Statistik() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="stats"
      style={{ background: 'var(--primary-900)' }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ border: '40px solid var(--primary-500)' }}
        />
        <div className="absolute bottom-[-15%] left-[-5%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ border: '30px solid var(--primary-300)' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'rgba(63,131,248,0.15)', color: 'var(--primary-300)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-300)' }} />
            Statistik
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-4">
            Dampak Nyata untuk{' '}
            <span style={{ color: 'var(--primary-300)' }}>Kesehatan Anda</span>
          </h2>
          <p className="text-sm md:text-base text-white/60 leading-relaxed">
            Ribuan pasien telah merasakan manfaat mengelola diabetes bersama Glunova.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center p-6 md:p-8 rounded-2xl backdrop-blur-xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
