'use client'

import { motion } from 'framer-motion'
import { Play, Activity } from 'lucide-react'

export default function VideoHighlight() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--white)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-700)' }} />
            Cara Kerja
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4"
            style={{ color: 'var(--neutral-900)' }}
          >
            Lihat Bagaimana{' '}
            <span style={{ color: 'var(--primary-700)' }}>Glunova Bekerja</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--neutral-500)' }}>
            Kelola diabetes Anda dalam tiga langkah mudah.
          </p>
        </div>

        {/* Video placeholder / How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))',
            aspectRatio: '16/9',
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full opacity-10"
            style={{ border: '30px solid var(--primary-300)' }}
          />
          <div className="absolute bottom-[-10%] left-[-5%] w-[200px] h-[200px] rounded-full opacity-10"
            style={{ border: '20px solid var(--primary-500)' }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 cursor-pointer transition-transform hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)' }}
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Mulai Perjalanan Anda</h3>
            <p className="text-sm text-white/60 max-w-md text-center">
              Daftar, pantau gula darah, dan konsultasi dengan dokter — semua dalam satu platform.
            </p>
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Steps below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
          {[
            { step: '01', title: 'Daftar Akun', desc: 'Buat akun gratis dan lengkapi profil kesehatan Anda.' },
            { step: '02', title: 'Pantau Harian', desc: 'Catat gula darah dan aktivitas Anda setiap hari.' },
            { step: '03', title: 'Konsultasi', desc: 'Konsultasi dengan dokter untuk rekomendasi personal.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-4"
            >
              <div className="text-3xl font-heading font-bold shrink-0" style={{ color: 'var(--primary-100)' }}>
                {item.step}
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold mb-1" style={{ color: 'var(--neutral-900)' }}>
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--neutral-500)' }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
