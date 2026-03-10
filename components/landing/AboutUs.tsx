'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Target } from 'lucide-react'

const features = [
  'Konsultasi dokter spesialis',
  'Pemantauan gula darah',
  'Edukasi diabetes interaktif',
  'AI Vision scan makanan',
]

export default function AboutUs() {
  return (
    <section className="py-20 md:py-28 overflow-hidden relative" id="about"
      style={{ background: 'var(--white)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: Visual composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[420px]">
              {/* Background shape */}
              <div className="absolute inset-0 rounded-3xl -rotate-3 scale-105"
                style={{ background: 'var(--primary-50)' }}
              />
              {/* Main card */}
              <div className="relative rounded-2xl p-8 md:p-10"
                style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)', boxShadow: '0 8px 30px rgba(13,43,107,0.06)' }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'var(--primary-50)' }}
                >
                  <Target className="w-8 h-8" style={{ color: 'var(--primary-700)' }} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                  Misi Kami
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--neutral-500)' }}>
                  Memberdayakan masyarakat Indonesia untuk mengelola diabetes secara mandiri melalui teknologi, edukasi, dan akses ke layanan kesehatan berkualitas tinggi.
                </p>
                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl" style={{ background: 'var(--primary-50)' }}>
                    <p className="text-2xl font-heading font-bold" style={{ color: 'var(--primary-700)' }}>5+</p>
                    <p className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Tahun Pengalaman</p>
                  </div>
                  <div className="text-center p-3 rounded-xl" style={{ background: 'var(--success-bg)' }}>
                    <p className="text-2xl font-heading font-bold" style={{ color: 'var(--success)' }}>24/7</p>
                    <p className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Dukungan Aktif</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
              style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-700)' }} />
              Tentang Kami
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-6"
              style={{ color: 'var(--neutral-900)' }}
            >
              Sahabat Anda dalam{' '}
              <span style={{ color: 'var(--primary-700)' }}>Perjalanan Mengelola Diabetes</span>
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: 'var(--neutral-500)' }}>
              Glunova hadir sebagai platform digital yang membantu Anda memantau dan mengelola diabetes dengan lebih mudah, cerdas, dan terjangkau.
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--success)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="p-5 rounded-xl" style={{ background: 'var(--primary-50)', borderLeft: '3px solid var(--primary-700)' }}>
              <p className="text-sm italic leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
                &ldquo;Diabetes bukan akhir. Dengan pengelolaan yang tepat, Anda bisa tetap menjalani hidup yang penuh dan bermakna.&rdquo;
              </p>
              <p className="text-xs mt-2 font-semibold" style={{ color: 'var(--primary-700)' }}>— Tim Medis Glunova</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
