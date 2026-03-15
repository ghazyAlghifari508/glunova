'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqData = [
  {
    q: 'Apakah Glunova gratis untuk digunakan?',
    a: 'Ya, Glunova menyediakan fitur dasar secara gratis termasuk pencatatan gula darah, edukasi diabetes, dan roadmap kesehatan harian. Untuk fitur premium seperti konsultasi dokter spesialis dan Vision AI tanpa batas, tersedia paket berlangganan yang terjangkau.',
  },
  {
    q: 'Bagaimana cara kerja Vision AI untuk analisis makanan?',
    a: 'Cukup foto makanan Anda menggunakan kamera smartphone. AI kami akan menganalisis gambar tersebut dan memberikan estimasi kandungan gula, karbohidrat, kalori, serta skor keamanan diet untuk penderita diabetes. Prosesnya hanya memakan waktu beberapa detik.',
  },
  {
    q: 'Apakah data kesehatan saya aman di Glunova?',
    a: 'Keamanan data adalah prioritas utama kami. Semua data dienkripsi dengan standar AES-256 baik saat transit maupun saat disimpan. Kami mematuhi regulasi perlindungan data kesehatan dan tidak pernah membagikan data pribadi Anda kepada pihak ketiga tanpa izin.',
  },
  {
    q: 'Siapa saja dokter yang tersedia untuk konsultasi?',
    a: 'Semua dokter di Glunova adalah dokter spesialis penyakit dalam (internist) yang terverifikasi dan memiliki Surat Izin Praktik (SIP) aktif. Mereka berpengalaman dalam menangani berbagai kasus diabetes dan penyakit metabolik lainnya.',
  },
  {
    q: 'Apakah Glunova bisa menggantikan kunjungan ke dokter?',
    a: 'Glunova adalah alat bantu untuk manajemen diabetes harian dan bukan pengganti kunjungan medis langsung. Konsultasi di platform kami bersifat suportif—untuk keadaan darurat atau pemeriksaan fisik mendalam, kami tetap menyarankan kunjungan langsung ke fasilitas kesehatan.',
  },
  {
    q: 'Bagaimana cara memulai menggunakan Glunova?',
    a: 'Sangat mudah! Daftar akun gratis (hanya butuh email), isi profil kesehatan dasar Anda, dan Anda langsung bisa mulai mencatat gula darah, mengikuti roadmap harian, serta menjelajahi konten edukasi diabetes. Seluruh proses pendaftaran hanya memakan waktu sekitar 2 menit.',
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: typeof faqData[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-[color:var(--neutral-200)] rounded-2xl overflow-hidden bg-white hover:border-[color:var(--primary-200)] transition-colors duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
      >
        <span className="text-base font-bold text-[color:var(--neutral-900)] pr-4 font-heading group-hover:text-[color:var(--primary-700)] transition-colors">
          {item.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[color:var(--neutral-400)] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[color:var(--primary-700)]' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[color:var(--neutral-500)] leading-relaxed font-body">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container w-full mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">

          {/* Left: Intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <div className="w-14 h-14 bg-[color:var(--primary-50)] rounded-2xl flex items-center justify-center mb-6">
              <HelpCircle className="w-7 h-7 text-[color:var(--primary-700)]" />
            </div>
            <h2 className="text-[color:var(--primary-700)] font-bold tracking-wider uppercase text-sm mb-3 font-heading">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[color:var(--neutral-900)] tracking-tight mb-6 font-heading">
              Pertanyaan yang Sering Ditanyakan
            </h3>
            <p className="text-lg text-[color:var(--neutral-500)] leading-relaxed font-body">
              Temukan jawaban atas pertanyaan umum seputar Glunova dan bagaimana platform kami membantu manajemen diabetes Anda.
            </p>
            <div className="mt-8 p-6 rounded-2xl bg-[color:var(--primary-50)] border border-[color:var(--primary-100)]">
              <p className="text-sm font-semibold text-[color:var(--primary-700)] mb-1 font-heading">Masih punya pertanyaan?</p>
              <p className="text-sm text-[color:var(--neutral-500)] font-body">
                Hubungi tim support kami di <span className="font-bold text-[color:var(--primary-700)]">info@glunova.id</span>
              </p>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <AccordionItem
                key={idx}
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
