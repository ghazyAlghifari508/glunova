'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Activity, Heart, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-28 md:pt-40 lg:pt-44 pb-24 md:pb-44 overflow-hidden" id="home"
      style={{ background: 'var(--primary-900)' }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ border: '60px solid var(--primary-700)' }}
      />
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ border: '50px solid var(--primary-500)' }}
      />
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ border: '40px solid var(--primary-300)' }}
      />

      {/* Soft gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(63,131,248,0.12)' }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
              style={{ background: 'rgba(63,131,248,0.15)', color: 'var(--primary-300)', border: '1px solid rgba(63,131,248,0.2)' }}
            >
              <Activity className="w-3.5 h-3.5" />
              Platform Manajemen Diabetes #1
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Kelola Diabetes<br className="hidden sm:block" />
              dengan Cerdas,<br className="hidden sm:block" />
              Hidup Lebih{' '}
              <span className="relative inline-block" style={{ color: 'var(--primary-300)' }}>
                Sehat
                <svg className="absolute w-full h-3 -bottom-1 left-0" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M2 9.5C50 3 150 2 198 9.5" stroke="var(--primary-300)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-white/70 text-sm md:text-base mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Pantau gula darah, konsultasi dengan dokter spesialis, dan dapatkan edukasi diabetes yang dipersonalisasi — semua dalam satu platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/register">
                <Button
                  className="rounded-xl h-12 px-7 text-sm font-semibold shadow-lg group"
                  style={{ background: 'var(--white)', color: 'var(--primary-900)' }}
                >
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  variant="outline"
                  className="rounded-xl h-12 px-7 text-sm font-semibold"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--white)', background: 'transparent' }}
                >
                  Lihat Layanan
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: '10k+', label: 'Pengguna Aktif' },
                { value: '500+', label: 'Dokter Terverifikasi' },
                { value: '98%', label: 'Tingkat Kepuasan' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-2xl font-heading font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Feature cards composition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4 w-[420px]"
          >
            {/* Card 1 */}
            <div className="p-6 rounded-2xl backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(63,131,248,0.15)' }}
                >
                  <Activity className="w-6 h-6" style={{ color: 'var(--primary-300)' }} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold text-base mb-1">Pemantauan Gula Darah</h3>
                  <p className="text-white/50 text-sm leading-relaxed">Catat dan pantau kadar gula darah harian Anda dengan grafik visual yang mudah dipahami.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(14,159,110,0.15)' }}
                >
                  <Heart className="w-6 h-6" style={{ color: 'var(--success)' }} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold text-base mb-1">Konsultasi Dokter</h3>
                  <p className="text-white/50 text-sm leading-relaxed">Konsultasi langsung dengan dokter spesialis endokrin dan penyakit dalam terverifikasi.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,138,0,0.15)' }}
                >
                  <Shield className="w-6 h-6" style={{ color: 'var(--warning)' }} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold text-base mb-1">AI Vision Scan</h3>
                  <p className="text-white/50 text-sm leading-relaxed">Scan makanan dengan kamera untuk mengetahui dampaknya terhadap gula darah Anda.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-[-1px] left-0 w-full z-20 leading-none">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-[80px]">
          <path d="M0 100H1440V0L720 100L0 0V100Z" fill="var(--white)" />
        </svg>
      </div>
    </section>
  )
}
