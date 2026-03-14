'use client'

import React from 'react'
import { ArrowRight, Activity, ShieldCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-black">
      {/* 1. Full-Bleed Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=2000"
          alt="Healthy Food Background"
          fill
          className="object-cover opacity-80"
          sizes="100vw"
          priority
        />
        {/* Multilayered Overlays for Cinematic Neutral Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
      </div>

      <div className="container w-full mx-auto px-4 relative z-20">
        <div className="max-w-4xl relative">
          
          {/* Floating Widget 1: Blood Sugar */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute -right-10 top-10 bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 hidden md:flex items-center gap-5 animate-bounce"
            style={{ animationDuration: '4s' }}
          >
            <div className="w-12 h-12 bg-success-bg rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Gula Darah Puasa</p>
              <p className="text-xl font-black text-neutral-900">95 <span className="text-sm text-neutral-400 font-bold">mg/dL</span></p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-bold mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
              Platform Manajemen Diabetes Terpadu
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Kendalikan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00D2FF]">
                Gula Darah
              </span> <br />
              Anda Setiap Hari.
            </h1>
            
            <p className="text-base lg:text-lg text-neutral-300 mb-8 leading-relaxed max-w-xl font-medium">
              Glunova adalah ekosistem kesehatan digital berbasis AI yang membantu Anda memantau nutrisi, berkonsultasi dengan dokter spesialis, dan membangun kebiasaan sehat secara konsisten.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <Button asChild size="lg" className="h-14 px-8 rounded-2xl bg-[#1A56DB] hover:bg-[#1546b5] text-white font-bold text-lg shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 border-none">
                <Link href="/register" className="flex items-center">
                  Mulai Gratis Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="h-14 px-8 rounded-2xl border-2 border-white/30 bg-white/5 text-white font-bold text-lg hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                <Link href="/konsultasi-dokter">
                  Konsultasi Dokter
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-8 text-neutral-300 text-sm font-bold py-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-success" />
                <span>Terjamin Aman</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-primary-400" />
                <span>Real-time AI</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-primary-900 bg-neutral-800 flex items-center justify-center overflow-hidden">
                       <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" width={32} height={32} />
                    </div>
                  ))}
                </div>
                <span className="text-white">10k+ Pasien Aktif</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Widget 2: Vision Scan */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-20 right-[8%] z-20 hidden lg:block animate-bounce"
        style={{ animationDuration: '5s', animationDelay: '1s' }}
      >
        <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/50 max-w-[280px] hover:scale-105 transition-transform duration-500 cursor-default group">
          <div className="w-full h-32 relative rounded-xl overflow-hidden mb-4">
             <Image 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500"
              alt="Healthy food scan"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 280px"
             />
             <div className="absolute inset-0 border-2 border-primary-500/50 rounded-xl border-dashed animate-pulse" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">AI Vision Scan</p>
              <p className="text-lg font-black text-neutral-900">Aman untuk Diet</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-success-bg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-success" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
