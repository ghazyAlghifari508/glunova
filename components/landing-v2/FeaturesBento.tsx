'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Camera, CalendarHeart, MessageSquare, TrendingDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function FeaturesBento() {
  return (
    <section className="py-24 bg-white">
      <div className="container w-full mx-auto px-4">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[color:var(--primary-700)] font-bold tracking-wider uppercase text-sm mb-3">Solusi Komprehensif</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[color:var(--neutral-900)] mb-6 tracking-tight">
            Semua yang Anda butuhkan untuk mengontrol diabetes.
          </h3>
          <p className="text-lg text-[color:var(--neutral-500)]">
            Dari pemantauan nutrisi harian hingga konsultasi instan, Glunova mendampingi setiap langkah perawatan Anda dengan teknologi AI terkini.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Feature 1: Vision AI (Large - spans 2 cols) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 relative rounded-xl overflow-hidden bg-[color:var(--neutral-50)] border border-[color:var(--neutral-100)] group shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 z-0">
               <Image 
                src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=1200"
                alt="Glunova Vision AI analyzing food"
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 66vw"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--neutral-900)]/80 via-[color:var(--neutral-900)]/50 to-transparent" />
            </div>
            <div className="relative z-10 p-12 h-full flex flex-col justify-end">
               <div className="w-14 h-14 bg-[color:var(--primary-500)] rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-[color:var(--primary-500)]/20">
                 <Camera className="w-7 h-7 text-white" />
               </div>
               <h4 className="text-3xl font-bold text-white mb-4">Glunova Vision AI</h4>
               <p className="text-white/90 max-w-md mb-8 text-lg leading-relaxed">Analisis kandungan gula dan keamanan makanan hanya dari sebuah foto. Kenali nutrisi tanpa perlu membaca label rumit.</p>
               <Link href="/vision" className="inline-flex items-center text-white font-bold hover:text-[color:var(--primary-300)] transition-colors w-fit gap-2">
                 Coba Sekarang <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
          </motion.div>

          {/* Feature 2: Doctor Consultation (Tall - 1 col) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-1 relative rounded-xl overflow-hidden bg-[color:var(--primary-900)] text-white group shadow-sm hover:shadow-xl transition-all duration-300 border border-[color:var(--primary-800)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 p-12 h-full flex flex-col">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                 <MessageSquare className="w-7 h-7 text-[color:var(--primary-300)]" />
              </div>
              <h4 className="text-3xl font-bold mb-4">Tanya Dokter Spesialis</h4>
              <p className="text-[color:var(--primary-100)] opacity-90 leading-relaxed text-lg mb-auto">Jangan kebingungan sendiri. Hubungi dokter penyakit dalam terpercaya kapan saja dari genggaman Anda.</p>
              
              {/* Doctor Avatar UI */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mt-10 border border-white/10 flex items-center gap-5">
                <Image 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150" 
                  alt="Doctor" 
                  width={56} 
                  height={56} 
                  className="rounded-full object-cover border-2 border-white/20"
                  sizes="56px"
                />
                <div>
                  <p className="text-base font-bold">Dr. Anita Siregar</p>
                  <p className="text-sm text-[color:var(--primary-300)]">Spesialis Penyakit Dalam</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Daily Roadmap (1 col) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-1 relative rounded-xl overflow-hidden bg-[color:var(--neutral-50)] border border-[color:var(--neutral-200)] group shadow-sm hover:shadow-xl transition-all duration-300 p-12 flex flex-col"
          >
            <div className="w-14 h-14 bg-[color:var(--warning-bg)] rounded-xl flex items-center justify-center mb-8 shadow-sm">
              <CalendarHeart className="w-7 h-7 text-[color:var(--warning)]" />
            </div>
            <h4 className="text-3xl font-bold text-[color:var(--neutral-900)] mb-4">Rutinitas Harian</h4>
            <p className="text-[color:var(--neutral-500)] leading-relaxed text-lg">
              Roadmap personal yang mendampingi Anda membangun kebiasaan minum obat dan olahraga.
            </p>
            {/* UI Mockup element */}
            <div className="mt-10 space-y-5">
               <div className="flex items-center gap-5 bg-white p-6 rounded-xl border border-[color:var(--neutral-100)] shadow-sm hover:shadow-md transition-shadow">
                 <div className="w-6 h-6 rounded-md border-2 border-[color:var(--success)] bg-[color:var(--success)] flex items-center justify-center"><div className="w-3 h-3 rounded-sm bg-white"/></div>
                 <span className="text-base font-bold text-[color:var(--neutral-700)]">Cek Gula Puasa</span>
               </div>
               <div className="flex items-center gap-5 bg-white p-6 rounded-xl border border-[color:var(--neutral-100)] shadow-sm hover:shadow-md transition-shadow">
                 <div className="w-6 h-6 rounded-md border-2 border-[color:var(--neutral-300)]" />
                 <span className="text-base font-bold text-[color:var(--neutral-700)]">Jalan Kaki 30 Menit</span>
               </div>
            </div>
          </motion.div>

          {/* Feature 4: Analytics (2 cols) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 relative rounded-xl overflow-hidden bg-[color:var(--primary-50)] border border-[color:var(--primary-100)] group shadow-sm hover:shadow-xl transition-all duration-300 p-12 flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <TrendingDown className="w-6 h-6 text-[color:var(--primary-700)]" />
              </div>
              <h4 className="text-2xl font-bold text-[color:var(--neutral-900)] mb-3">Analitik Gula Darah</h4>
              <p className="text-[color:var(--neutral-600)] mb-6">
                Pantau tren HbA1c dan gula darah harian Anda dengan visualisasi yang mudah dimengerti. Prediksi risiko dan tingkatkan kesehatan secara terukur.
              </p>
              <Link href="/dashboard" className="inline-flex items-center text-[color:var(--primary-700)] font-bold hover:text-[color:var(--primary-800)] transition-colors">
                 Lihat Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            {/* Decorative Chart Area */}
            <div className="w-full md:w-1/2 h-full bg-white/60 backdrop-blur-sm rounded-2xl border border-white p-4 relative overflow-hidden flex items-end justify-between px-6 pt-12 pb-4">
              <div className="absolute top-0 right-0 left-0 p-4 border-b border-white flex justify-between items-center bg-white/40">
                <span className="text-xs font-bold text-[color:var(--neutral-500)]">Trend 7 Hari</span>
                <span className="text-xs font-black text-[color:var(--success)] bg-[color:var(--success-bg)] px-2 py-1 rounded-md">-12%</span>
              </div>
              {/* Fake bars */}
              {[40, 70, 50, 90, 60, 45, 80].map((h, i) => (
                <div key={i} className="w-[10%] bg-gradient-to-t from-[color:var(--primary-500)] to-[color:var(--primary-300)] rounded-t-sm transition-all duration-1000 origin-bottom" style={{ height: `${h}%`, opacity: 0.8 + (i * 0.02) }} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
