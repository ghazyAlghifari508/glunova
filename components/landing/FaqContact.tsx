'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react'

const faqs = [
  {
    q: 'Apa itu Glunova?',
    a: 'Glunova adalah platform digital untuk manajemen diabetes yang menggabungkan pemantauan gula darah, konsultasi dokter, dan edukasi interaktif dalam satu aplikasi.',
  },
  {
    q: 'Apakah konsultasi dokter di Glunova gratis?',
    a: 'Glunova menyediakan beberapa layanan gratis seperti edukasi dan pemantauan dasar. Untuk konsultasi dokter, tersedia paket terjangkau dengan dokter spesialis terverifikasi.',
  },
  {
    q: 'Bagaimana cara kerja AI Vision Scan?',
    a: 'Cukup foto makanan Anda menggunakan kamera, dan AI kami akan menganalisis kandungan nutrisi serta potensi dampaknya terhadap kadar gula darah Anda.',
  },
  {
    q: 'Apakah data kesehatan saya aman?',
    a: 'Keamanan data adalah prioritas utama kami. Semua data dienkripsi dan disimpan sesuai standar keamanan kesehatan digital yang berlaku.',
  },
  {
    q: 'Siapa saja yang bisa menggunakan Glunova?',
    a: 'Glunova dirancang untuk siapa saja yang ingin mengelola diabetes — baik penderita diabetes tipe 1, tipe 2, maupun mereka yang ingin melakukan pencegahan dini.',
  },
]

export default function FaqContact() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28" id="faq"
      style={{ background: 'var(--neutral-50)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* FAQ */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
              style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-700)' }} />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-8"
              style={{ color: 'var(--neutral-900)' }}
            >
              Pertanyaan yang{' '}
              <span style={{ color: 'var(--primary-700)' }}>Sering Diajukan</span>
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden transition-all"
                  style={{
                    background: 'var(--white)',
                    border: `1px solid ${openIdx === idx ? 'var(--primary-100)' : 'var(--neutral-200)'}`,
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    className="flex items-center justify-between w-full px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold pr-4"
                      style={{ color: openIdx === idx ? 'var(--primary-700)' : 'var(--neutral-900)' }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className="w-5 h-5 shrink-0 transition-transform duration-300"
                      style={{
                        color: 'var(--neutral-500)',
                        transform: openIdx === idx ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {openIdx === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-sm leading-relaxed"
                          style={{ color: 'var(--neutral-500)' }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="w-full lg:w-[380px]">
            <div className="p-7 rounded-2xl sticky top-24"
              style={{
                background: 'var(--primary-900)',
              }}
            >
              <h3 className="text-xl font-heading font-bold text-white mb-2">Hubungi Kami</h3>
              <p className="text-sm text-white/60 mb-6">Ada pertanyaan lain? Tim kami siap membantu.</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(63,131,248,0.15)' }}
                  >
                    <Mail className="w-5 h-5" style={{ color: 'var(--primary-300)' }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Email</p>
                    <p className="text-sm text-white font-medium">support@glunova.id</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(63,131,248,0.15)' }}
                  >
                    <Phone className="w-5 h-5" style={{ color: 'var(--primary-300)' }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Telepon</p>
                    <p className="text-sm text-white font-medium">+62 21 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(63,131,248,0.15)' }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: 'var(--primary-300)' }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Lokasi</p>
                    <p className="text-sm text-white font-medium">Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: 'var(--primary-700)', color: 'var(--white)' }}
              >
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
