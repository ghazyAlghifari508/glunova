'use client'

import { motion } from 'framer-motion'
import { AlertCircle, TrendingUp, Droplets } from 'lucide-react'

export default function WhatIsDiabetes() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--white)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'var(--danger-bg)', color: 'var(--danger-text)' }}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Tahukah Anda?
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-6"
            style={{ color: 'var(--neutral-900)' }}
          >
            Apa Itu <span style={{ color: 'var(--primary-700)' }}>Diabetes?</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-10" style={{ color: 'var(--neutral-500)' }}>
            Diabetes adalah kondisi kronis yang terjadi saat tubuh tidak dapat memproduksi cukup insulin atau tidak dapat menggunakan insulin secara efektif, menyebabkan kadar gula darah yang tinggi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="p-5 rounded-xl" style={{ background: 'var(--warning-bg)' }}>
              <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--warning)' }} />
              <p className="text-2xl font-heading font-bold mb-1" style={{ color: 'var(--warning-text)' }}>19.5 Juta</p>
              <p className="text-xs" style={{ color: 'var(--warning-text)' }}>Penderita diabetes di Indonesia</p>
            </div>
            <div className="p-5 rounded-xl" style={{ background: 'var(--danger-bg)' }}>
              <Droplets className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--danger)' }} />
              <p className="text-2xl font-heading font-bold mb-1" style={{ color: 'var(--danger-text)' }}>73%</p>
              <p className="text-xs" style={{ color: 'var(--danger-text)' }}>Tidak terdiagnosis dengan baik</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
