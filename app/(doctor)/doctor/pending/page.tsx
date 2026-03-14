'use client'

import { useEffect } from 'react'
import { getDoctorByUserId } from '@/services/doctorService'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle2, Stethoscope, LogOut, ShieldCheck, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DoctorPendingPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    const check = async () => {
      if (!user) return
      try {
        const doctor = await getDoctorByUserId(user.id)
        if (doctor?.is_verified) {
          router.push('/doctor')
        }
      } catch (error) {}
    }

    check()
    const interval = setInterval(check, 10000)
    return () => clearInterval(interval)
  }, [router, user, authLoading])

  const steps = [
    { label: 'Registrasi Berhasil', desc: 'Detail dikirim', icon: CheckCircle2, status: 'done' },
    { label: 'Verifikasi Kredensial', desc: 'Oleh tim medis', icon: ShieldCheck, status: 'active' },
    { label: 'Akses Konsultasi', desc: 'Segera hadir', icon: Stethoscope, status: 'pending' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background FX */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div 
         initial={{ opacity: 0, y: 20 }} 
         animate={{ opacity: 1, y: 0 }} 
         className="w-full max-w-lg relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-14 text-center shadow-2xl">
            
            <div className="relative inline-block mb-10">
               <div className="w-24 h-24 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20 rotate-12 group-hover:rotate-0 transition-transform">
                  <Activity className="w-12 h-12 text-slate-950" />
               </div>
               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald-400 animate-spin-slow" />
               </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">Verifikasi Sedang Berlangsung</h1>
            <p className="text-slate-400 font-medium text-sm md:text-base mb-12">
               Tim kami sedang meninjau dokumen dan STR Anda. Proses ini biasanya memakan waktu kurang dari 24 jam.
            </p>

            <div className="space-y-4 mb-12 text-left">
               {steps.map((step, i) => (
                  <div key={i} className={cn(
                     "flex items-center gap-5 p-5 rounded-2xl border transition-all",
                     step.status === 'done' ? "bg-emerald-500/10 border-emerald-500/20" :
                     step.status === 'active' ? "bg-white/10 border-white/20 animate-pulse" :
                     "bg-black/20 border-white/5 opacity-40"
                  )}>
                     <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        step.status === 'done' ? "bg-emerald-500 text-slate-950" : 
                        step.status === 'active' ? "bg-white text-slate-950" : "bg-slate-800 text-slate-500"
                     )}>
                        <step.icon className="w-6 h-6" />
                     </div>
                     <div>
                        <p className={cn(
                           "font-black text-sm tracking-tight",
                           step.status === 'pending' ? "text-slate-500" : "text-white"
                        )}>{step.label}</p>
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-1">{step.desc}</p>
                     </div>
                     {step.status === 'done' && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />}
                  </div>
               ))}
            </div>

            <Button
               onClick={async () => { await supabase.auth.signOut(); router.push('/login') }}
               variant="ghost"
               className="w-full h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold group"
            >
               <LogOut className="w-5 h-5 mr-3 text-slate-500 group-hover:text-rose-400 transition-colors" /> Sign Out
            </Button>

            <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-8">
               Auto-refreshing Dashboard...
            </p>
        </div>
      </motion.div>
    </div>
  )
}
