'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Home, ArrowLeft, Search, Activity, Heart, Shield, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Floating bubbles data
  const bubbles = [
    { size: 120, x: '10%', y: '20%', delay: 0, color: 'rgba(59, 130, 246, 0.08)' },
    { size: 180, x: '80%', y: '15%', delay: 1, color: 'rgba(37, 99, 235, 0.05)' },
    { size: 90, x: '75%', y: '70%', delay: 2, color: 'rgba(96, 165, 250, 0.1)' },
    { size: 150, x: '15%', y: '80%', delay: 1.5, color: 'rgba(59, 130, 246, 0.06)' },
    { size: 60, x: '50%', y: '10%', delay: 3, color: 'rgba(37, 99, 235, 0.12)' },
  ]

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center relative overflow-hidden px-4 font-sans"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -40, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 8 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: bubble.delay 
            }}
            className="absolute rounded-full blur-3xl"
            style={{ 
              width: bubble.size, 
              height: bubble.size, 
              left: bubble.x, 
              top: bubble.y,
              backgroundColor: bubble.color 
            }}
          />
        ))}
      </div>

      {/* Glassmorphic Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(var(--primary-700) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[40px] p-8 md:p-16 text-center overflow-hidden">
          
          {/* Decorative Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-primary-600 to-indigo-500" />
          
          {/* Conceptual 404 Visual */}
          <div className="relative mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="flex justify-center items-center gap-4 text-primary-950/10 font-black text-9xl md:text-[180px] leading-none select-none"
            >
              <span>4</span>
              <div className="relative">
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 md:w-40 md:h-40 rounded-full border-[12px] md:border-[20px] border-primary-600/5 flex items-center justify-center"
                 >
                    <div className="w-full h-full rounded-full border-[2px] border-dashed border-primary-600/20" />
                 </motion.div>
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute inset-0 flex items-center justify-center"
                 >
                    <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-3xl shadow-2xl shadow-blue-500/20 flex items-center justify-center border border-blue-50">
                       <Search className="w-6 h-6 md:w-10 md:h-10 text-primary-600" strokeWidth={2.5} />
                    </div>
                 </motion.div>
              </div>
              <span>4</span>
            </motion.div>

            {/* Floating Particles */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100/50 shadow-sm"
            >
               <Sparkles className="w-6 h-6 text-indigo-400" />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 max-w-md mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Halaman Terputus <br/> <span className="text-primary-600 italic">dari Sistem.</span>
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed">
                Sepertinya link yang Anda tuju sudah tidak aktif atau salah ketik. Mari kembali ke jalur kesehatan Anda.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-6"
            >
              <Button
                asChild
                className="w-full sm:w-auto bg-[#1a56db] hover:bg-blue-700 text-white rounded-2xl px-10 h-16 font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3 text-base border-none"
              >
                <Link href="/dashboard">
                  <Home className="w-5 h-5 text-white" />
                  <span className="text-white">Ke Dashboard</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-900 rounded-2xl px-10 h-16 font-bold transition-all active:scale-95 flex items-center gap-3 text-base shadow-sm"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
                Kembali
              </Button>
            </motion.div>
          </div>

          {/* Footer Metrics - Purely Visual Premium Touch */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Vital: OK</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Protocol</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Focused</span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 text-slate-400"
      >
        <p className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="w-8 h-px bg-slate-200" />
          Glunova Digital Sanctuary
          <span className="w-8 h-px bg-slate-200" />
        </p>
      </motion.div>
    </div>
  )
}
