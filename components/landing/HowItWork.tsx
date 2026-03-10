'use client'

import { motion } from 'framer-motion'
import { UserPlus, Activity, MessageSquare } from 'lucide-react'

const steps = [
  { icon: UserPlus, title: 'Daftar Akun', desc: 'Buat akun gratis dan lengkapi data kesehatan Anda.' },
  { icon: Activity, title: 'Pantau Kesehatan', desc: 'Catat gula darah, aktivitas, dan pola makan harian.' },
  { icon: MessageSquare, title: 'Konsultasi Dokter', desc: 'Dapatkan rekomendasi personal dari dokter terverifikasi.' },
]

export default function HowItWork() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--neutral-50)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4"
            style={{ color: 'var(--neutral-900)' }}
          >
            Cara <span style={{ color: 'var(--primary-700)' }}>Kerja</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--primary-50)' }}
              >
                <step.icon className="w-7 h-7" style={{ color: 'var(--primary-700)' }} />
              </div>
              <h3 className="text-base font-heading font-bold mb-2" style={{ color: 'var(--neutral-900)' }}>
                {step.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--neutral-500)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
