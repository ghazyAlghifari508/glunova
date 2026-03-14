'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Apple, PlayCircle } from 'lucide-react'
import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container w-full mx-auto px-4 max-w-5xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[color:var(--primary-800)] to-[color:var(--primary-600)] rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Background inside CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[color:var(--primary-500)]/30 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight relative z-10">
            Mulai Perjalanan Sehat Anda
          </h2>
          <p className="text-lg text-[color:var(--primary-100)] mb-10 max-w-2xl mx-auto relative z-10">
            Bergabunglah dengan ribuan pasien yang telah berhasil menstabilkan gula darah mereka dengan bantuan AI dan dokter spesialis di Glunova.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-[color:var(--primary-700)] rounded-2xl font-bold text-lg hover:bg-[color:var(--primary-50)] transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              Daftar Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="#" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-transform hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Unduh App <Apple className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
