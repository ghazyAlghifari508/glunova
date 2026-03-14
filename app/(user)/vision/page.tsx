'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Scan, Image as ImageIcon, Sparkles, Loader2, ArrowRight,
  Flame, Beef, Wheat, Droplets, RefreshCcw, Save, ShieldCheck
} from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { useHealthData } from '@/hooks/useHealthData'
import { toast } from '@/components/ui/use-toast'

export default function VisionScannerV2() {
  const { profile } = useHealthData()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle')
  const [analysis, setAnalysis] = useState<any>(null)
  const [isHovering, setIsHovering] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(false)
    const selected = e.dataTransfer.files?.[0]
    if (selected && selected.type.startsWith('image/')) {
      processFile(selected)
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      processFile(selected)
    }
  }

  const processFile = (selected: File) => {
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setStatus('idle')
    setAnalysis(null)
  }

  const handleScan = async () => {
    if (!file) return
    setStatus('analyzing')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      const formData = new FormData()
      formData.append('image', file)
      if (user) formData.append('userId', user.id)

      const response = await fetch('/api/ai/analyze-food', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Gagal menganalisis')
      const data = await response.json()

      if (data.analysis) {
        setAnalysis(data.analysis)
        setStatus('done')
      } else {
        throw new Error('Tidak ada hasil')
      }
    } catch (e) {
      console.error(e)
      toast({ title: 'Analisis Gagal', description: 'Gagal menganalisis makanan. Silakan coba lagi.', variant: 'destructive' })
      setStatus('idle')
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setAnalysis(null)
    setStatus('idle')
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return { stroke: 'var(--success)', bg: 'var(--success-bg)', text: 'var(--success-text)', label: 'Sangat Sehat' }
    if (score >= 50) return { stroke: 'var(--warning)', bg: 'var(--warning-bg)', text: 'var(--warning-text)', label: 'Cukup Sehat' }
    return { stroke: 'var(--danger)', bg: 'var(--danger)', text: 'white', label: 'Kurang Sehat' }
  }

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
        
        {/* Header - Awwwards Style Typography */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[color:var(--neutral-100)] shadow-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-[color:var(--primary-600)]" />
              <span className="text-[10px] font-bold text-[color:var(--neutral-500)] uppercase tracking-[0.2em] font-heading">Glunova Vision AI</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] font-heading text-[color:var(--neutral-900)]"
            >
              Kenali <br className="hidden md:block" />
              <span className="text-[color:var(--neutral-400)] italic font-serif font-light">Nutrisi Anda.</span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-[color:var(--neutral-500)] text-base md:text-lg max-w-sm leading-relaxed font-body pb-2"
          >
             Unggah foto makanan harian Anda, dan biarkan AI kami membongkar kalori serta makronutrisinya dalam hitungan detik.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Left Column: Uploader / Image Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${status === 'done' ? 'lg:col-span-5' : 'lg:col-span-12'}`}
          >
            <div className={`
               relative w-full rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-xl shadow-[color:var(--primary-900)]/5 border border-[color:var(--neutral-100)]
               ${status === 'done' ? 'h-[500px] lg:h-[700px]' : 'h-[500px] lg:h-[600px] max-w-5xl mx-auto'}
            `}>
              <AnimatePresence mode="wait">
                {!preview ? (
                  <motion.div 
                    key="upload-zone"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 p-4 md:p-8"
                  >
                    <div 
                      onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInput.current?.click()}
                      className={`
                        w-full h-full border-2 border-dashed rounded-xl md:rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group
                        ${isHovering ? 'border-[color:var(--primary-500)] bg-[color:var(--primary-50)]' : 'border-[color:var(--neutral-200)] bg-[color:var(--neutral-50)]/50 hover:bg-[color:var(--neutral-50)]'}
                      `}
                    >
                      <div className="w-24 h-24 mb-8 relative">
                         <div className="absolute inset-0 bg-[color:var(--primary-100)] rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                         <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500 z-10">
                            <ImageIcon className="w-10 h-10 text-[color:var(--primary-400)]" />
                         </div>
                         <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex items-center justify-center rotate-[10deg] group-hover:rotate-0 transition-transform duration-500 scale-95 z-0" />
                      </div>
                      
                      <h3 className="text-2xl font-black text-[color:var(--neutral-900)] font-heading mb-3 text-center">Tarik Foto Makanan</h3>
                      <p className="text-[color:var(--neutral-500)] font-medium text-center font-body max-w-xs">
                         atau klik untuk <span className="text-[color:var(--primary-600)] underline decoration-2 underline-offset-4 decoration-[color:var(--primary-200)]">memilih dari galeri</span> format JPG, PNG
                      </p>
                      
                      <input type="file" ref={fileInput} className="hidden" accept="image/*" onChange={handleSelect} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="preview-zone"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image src={preview} alt="Preview" fill className={`object-cover transition-all duration-1000 ${status === 'analyzing' ? 'scale-110 blur-sm brightness-75' : 'scale-100'}`} unoptimized />
                    
                    {/* Scanner Overlay during analysis */}
                    {status === 'analyzing' && (
                       <div className="absolute inset-0 bg-[color:var(--primary-900)]/20 mix-blend-overlay z-10">
                          <motion.div 
                            initial={{ top: '-20%' }} animate={{ top: '120%' }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[color:var(--primary-400)]/40 to-transparent"
                            style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' }}
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px]">
                             <Loader2 className="w-16 h-16 text-white animate-spin mb-6 drop-shadow-2xl" />
                             <p className="text-white font-black font-heading tracking-[0.2em] uppercase text-sm drop-shadow-xl bg-black/20 px-6 py-3 rounded-full backdrop-blur-md border border-white/20">
                               AI Sedang Menganalisis...
                             </p>
                          </div>
                       </div>
                    )}

                    {/* Pre-scan Overlay */}
                    {status === 'idle' && (
                       <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--neutral-900)]/80 via-transparent to-[color:var(--neutral-900)]/30 flex flex-col justify-between p-6 md:p-8 z-20">
                          <div className="flex justify-end">
                             <button onClick={reset} className="w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
                               <RefreshCcw className="w-5 h-5" />
                             </button>
                          </div>
                          <div className="flex flex-col items-center text-center">
                             <h3 className="text-white font-heading font-black text-3xl mb-2 drop-shadow-lg">Siap Dianalisis?</h3>
                             <p className="text-white/80 font-body mb-8 drop-shadow-md">Pastikan makanan terlihat jelas di foto.</p>
                             <button
                               onClick={handleScan}
                               className="w-full sm:w-auto px-10 py-5 bg-[color:var(--primary-600)] hover:bg-[color:var(--primary-700)] text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(26,86,219,0.3)] font-heading"
                             >
                               <Scan className="w-5 h-5" />
                               Pindai Sekarang
                             </button>
                          </div>
                       </div>
                    )}

                    {/* Post-scan Reset floating button */}
                    {status === 'done' && (
                       <div className="absolute top-6 right-6 z-30">
                          <button onClick={reset} className="px-6 py-3 bg-white/20 hover:bg-white backdrop-blur-md hover:text-[color:var(--neutral-900)] border border-white/30 rounded-full text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl font-heading">
                            <RefreshCcw className="w-4 h-4" /> Ulangi
                          </button>
                       </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Bento Box Results */}
          <AnimatePresence>
            {status === 'done' && analysis && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col gap-6"
              >
                {/* Header Info */}
                <div className="bg-white rounded-xl p-8 border border-[color:var(--neutral-100)] shadow-sm">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[color:var(--success)]/10 border border-[color:var(--success)]/20 mb-4">
                     <ShieldCheck className="w-3.5 h-3.5 text-[color:var(--success)]" />
                     <span className="text-[10px] font-bold text-[color:var(--success)] uppercase tracking-[0.2em] font-heading">Selesai Dianalisis</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-[color:var(--neutral-900)] font-heading leading-tight capitalize">
                    {analysis.foodName}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
                  
                  {/* Big Score Card */}
                  <div className="md:col-span-5 bg-white rounded-xl p-8 border border-[color:var(--neutral-100)] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                     {/* Dynamic background glow based on score */}
                     <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none transition-colors duration-1000" style={{ backgroundColor: getScoreColor(analysis.healthNutritionScore).stroke }} />
                     
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[color:var(--neutral-400)] font-heading mb-6 relative z-10 w-full text-left">Skor Nutrisi</p>
                     
                     <div className="relative w-40 h-40 flex items-center justify-center mb-6 z-10">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                           <circle cx="80" cy="80" r="70" fill="none" stroke="var(--neutral-100)" strokeWidth="8" />
                           <motion.circle 
                             initial={{ strokeDashoffset: 440 }} animate={{ strokeDashoffset: 440 - (440 * analysis.healthNutritionScore) / 100 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                             cx="80" cy="80" r="70" fill="none" strokeWidth="12" strokeLinecap="round" className="drop-shadow-md" style={{ strokeDasharray: 440, stroke: getScoreColor(analysis.healthNutritionScore).stroke }}
                           />
                        </svg>
                        <div className="text-5xl font-black text-[color:var(--neutral-900)] font-heading tracking-tighter">
                           {analysis.healthNutritionScore}
                        </div>
                     </div>
                     
                     <div className="px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider font-heading shadow-sm z-10" style={{ backgroundColor: getScoreColor(analysis.healthNutritionScore).bg, color: getScoreColor(analysis.healthNutritionScore).text === 'white' ? 'white' : getScoreColor(analysis.healthNutritionScore).text }}>
                        {getScoreColor(analysis.healthNutritionScore).label}
                     </div>
                  </div>

                  {/* Macros Grid 2x2 */}
                  <div className="md:col-span-7 grid grid-cols-2 gap-4">
                     {[
                        { label: 'Kalori', value: analysis.calories, unit: 'kcal', icon: Flame, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Protein', value: analysis.protein, unit: 'g', icon: Beef, color: 'text-rose-500', bg: 'bg-rose-50' },
                        { label: 'Karbohidrat', value: analysis.carbs, unit: 'g', icon: Wheat, color: 'text-[color:var(--primary-500)]', bg: 'bg-[color:var(--primary-50)]' },
                        { label: 'Lemak', value: analysis.fat, unit: 'g', icon: Droplets, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                     ].map((m, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 md:p-6 border border-[color:var(--neutral-100)] shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform">
                           <div className="flex items-center gap-3 mb-6">
                              <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center`}>
                                 <m.icon className={`w-5 h-5 ${m.color}`} />
                              </div>
                              <span className="text-[10px] font-bold text-[color:var(--neutral-500)] uppercase tracking-wider font-heading">{m.label}</span>
                           </div>
                           <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-black text-[color:var(--neutral-900)] font-heading leading-none tracking-tighter">{m.value}</span>
                              <span className="text-sm font-bold text-[color:var(--neutral-400)]">{m.unit}</span>
                           </div>
                        </div>
                     ))}
                  </div>

               </div>

               {/* AI Recommendation Box */}
               <div className="bg-[color:var(--neutral-900)] rounded-xl p-8 md:p-10 relative overflow-hidden shadow-xl" style={{ backgroundImage: 'linear-gradient(135deg, var(--neutral-900), #000)' }}>
                  <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-[color:var(--primary-600)]/30 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row gap-6 md:gap-8 items-start sm:items-center">
                     <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 backdrop-blur-md">
                        <Sparkles className="w-8 h-8 text-[color:var(--primary-300)]" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-[10px] font-black text-[color:var(--primary-300)] uppercase tracking-[0.3em] font-heading mb-3">Rekomendasi Glunova AI</h3>
                        <p className="text-white/90 font-medium text-base md:text-lg leading-relaxed font-body">
                           "{analysis.tip}"
                        </p>
                     </div>
                     <button className="shrink-0 w-full sm:w-auto px-6 py-4 rounded-xl bg-white text-[color:var(--neutral-900)] font-bold text-xs uppercase tracking-wider hover:bg-[color:var(--neutral-100)] transition-colors flex items-center justify-center gap-2 font-heading">
                        <Save className="w-4 h-4" /> Simpan Jurnal
                     </button>
                  </div>
               </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  )
}
