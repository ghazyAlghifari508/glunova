'use client'

import React from 'react'
import { CheckCircle2, FileText, Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: FileText,
    title: 'Daftar & Profiling',
    text: 'Buat akun dalam 2 menit dan isi profil kesehatan dasar Anda untuk menetapkan target awal manajemen diabetes.',
  },
  {
    icon: CheckCircle2,
    title: 'Catat & Pantau',
    text: 'Gunakan AI Scanner untuk asupan makanan, dan masukkan data gula darah harian Anda ke dalam roadmap.',
  },
  {
    icon: Stethoscope,
    title: 'Evaluasi Medis',
    text: 'Diskusikan hasil pantauan Anda dengan dokter spesialis melalui platform untuk penyesuaian gaya hidup.',
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-[color:var(--neutral-900)] text-white">
      <div className="container w-full mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-[color:var(--primary-300)] font-bold tracking-wider uppercase text-sm mb-3">Cara Kerja</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6">Tiga Langkah Sederhana</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-[color:var(--primary-700)] to-transparent z-0" />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-[color:var(--neutral-800)] border-2 border-[color:var(--primary-700)] flex items-center justify-center mb-6 shadow-lg shadow-[color:var(--primary-700)]/20 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-10 h-10 text-[color:var(--primary-300)]" />
              </div>
              <div className="w-8 h-8 rounded-full bg-[color:var(--primary-700)] text-white font-black flex items-center justify-center mb-4 border-4 border-[color:var(--neutral-900)] -mt-10 relative z-20">
                {idx + 1}
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-[color:var(--neutral-400)] leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
