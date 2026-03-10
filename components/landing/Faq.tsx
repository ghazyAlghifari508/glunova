'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q: 'Apa itu Glunova?', a: 'Glunova adalah platform digital untuk manajemen diabetes yang menggabungkan pemantauan gula darah, konsultasi dokter, dan edukasi interaktif.' },
  { q: 'Bagaimana cara mendaftar?', a: 'Anda bisa mendaftar gratis melalui halaman registrasi. Cukup masukkan email dan data dasar Anda.' },
  { q: 'Apakah data saya aman?', a: 'Ya, semua data dienkripsi dan disimpan sesuai standar keamanan kesehatan digital.' },
]

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="py-20" style={{ background: 'var(--neutral-50)' }}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-10" style={{ color: 'var(--neutral-900)' }}>
          FAQ
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="flex items-center justify-between w-full px-5 py-4 text-left">
                <span className="text-sm font-semibold" style={{ color: 'var(--neutral-900)' }}>{faq.q}</span>
                <ChevronDown className="w-5 h-5 shrink-0 transition-transform" style={{ color: 'var(--neutral-500)', transform: openIdx === idx ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-4 text-sm" style={{ color: 'var(--neutral-500)' }}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
