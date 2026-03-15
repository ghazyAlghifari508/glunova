'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Stethoscope, TrendingUp, Award } from 'lucide-react'

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Pasien Terdaftar', description: 'Bergabung dari seluruh Indonesia' },
  { icon: Stethoscope, value: 500, suffix: '+', label: 'Konsultasi Selesai', description: 'Sesi dengan dokter spesialis' },
  { icon: TrendingUp, value: 98, suffix: '%', label: 'Tingkat Kepuasan', description: 'Rating dari pengguna aktif' },
  { icon: Award, value: 50, suffix: '+', label: 'Dokter Mitra', description: 'Tersertifikasi & berpengalaman' },
]

function AnimatedNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [inView, target])

  return (
    <span className="tabular-nums">
      {count.toLocaleString('id-ID')}{suffix}
    </span>
  )
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref} id="stats">
      {/* Subtle background decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(26,86,219,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container w-full mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[color:var(--primary-700)] font-bold tracking-wider uppercase text-sm mb-3 font-heading">Dalam Angka</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-[color:var(--neutral-900)] tracking-tight font-heading">
            Dipercaya oleh Ribuan Pasien
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="text-center p-8 rounded-3xl bg-[color:var(--neutral-50)] border border-[color:var(--neutral-100)] hover:border-[color:var(--primary-200)] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 mx-auto mb-6 bg-[color:var(--primary-50)] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-[color:var(--primary-700)]" />
                </div>
                <p className="text-4xl md:text-5xl font-extrabold text-[color:var(--neutral-900)] mb-2 font-heading">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} inView={inView} />
                </p>
                <p className="text-base font-bold text-[color:var(--neutral-700)] mb-1 font-heading">{stat.label}</p>
                <p className="text-sm text-[color:var(--neutral-400)] font-body">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
