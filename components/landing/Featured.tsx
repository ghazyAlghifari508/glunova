'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const features = [
  'Terintegrasi dengan AI',
  'Data terenkripsi',
  'Konsultasi real-time',
  'Analisis otomatis',
]

export default function Featured() {
  return (
    <section className="py-16" style={{ background: 'var(--primary-50)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6" style={{ color: 'var(--primary-700)' }} />
            <span className="text-sm font-heading font-bold" style={{ color: 'var(--primary-700)' }}>
              Platform Terpercaya
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {features.map((f, i) => (
              <span key={i} className="text-sm font-medium" style={{ color: 'var(--neutral-500)' }}>
                ✓ {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
