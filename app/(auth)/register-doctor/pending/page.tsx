'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle2, FileCheck, LogOut, Activity, Users, AlertCircle, Edit, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { getRegistrationStatus } from '@/services/doctorRegistrationService'

export default function DoctorPendingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [registration, setRegistration] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return
      try {
        const data = await getRegistrationStatus(user.id)
        setRegistration(data)
      } catch (err) {
        console.error('Failed to fetch status:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 30000) // Poll every 30s
    return () => clearInterval(interval)
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="w-full flex min-h-screen lg:h-screen lg:overflow-hidden bg-white font-body selection:bg-primary-300 selection:text-white">
      {/* LEFT: STATUS PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-20 px-6 sm:px-12 md:px-16 py-8 lg:py-12 justify-center overflow-y-auto">
        
        <div className="max-w-xl w-full mx-auto">
          {/* SUCCESS/PENDING STATE CONTENT */}
          <div className="text-center py-12">
            {loading ? (
              <div className="flex flex-col items-center py-12">
                <Loader2 className="w-12 h-12 text-[color:var(--primary-600)] animate-spin mb-4" />
                <p className="text-[color:var(--neutral-500)]">Memuat status pendaftaran...</p>
              </div>
            ) : registration?.status === 'rejected' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl bg-gradient-to-br from-red-600 to-red-400 shadow-red-500/30">
                  <AlertCircle className="w-12 h-12 text-white" />
                </div>

                <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-[color:var(--neutral-900)] font-heading">
                  Pendaftaran Ditolak
                </h2>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 text-left">
                  <p className="text-xs uppercase font-black tracking-widest text-red-600 mb-2">Alasan Penolakan:</p>
                  <p className="text-[color:var(--neutral-700)] leading-relaxed italic">
                    "{registration.rejection_reason || 'Tidak ada alasan spesifik yang diberikan. Silakan hubungi admin.'}"
                  </p>
                </div>

                <p className="text-base mb-10 text-[color:var(--neutral-500)] max-w-sm mx-auto leading-relaxed">
                  Jangan khawatir, Anda dapat memperbaiki data Anda dan mengirimkan ulang pendaftaran.
                </p>

                <Button 
                  onClick={() => router.push('/register-doctor')}
                  className="w-full h-14 rounded-2xl bg-[color:var(--primary-900)] hover:bg-[color:var(--primary-950)] text-white font-bold text-lg mb-4 flex items-center justify-center gap-2"
                >
                  <Edit size={20} /> Perbaiki & Daftar Ulang
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl bg-gradient-to-br from-[color:var(--primary-900)] to-[color:var(--primary-600)] shadow-[color:var(--primary-700)]/30"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-[color:var(--neutral-900)] font-heading">
                  Pendaftaran Berhasil! 🎉
                </h2>
                <p className="text-lg mb-10 text-[color:var(--neutral-500)] max-w-sm mx-auto leading-relaxed">
                  Tim medis Glunova akan meninjau data Anda dalam waktu 1-3 hari kerja. Anda akan menerima notifikasi via email.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
                  <div className="p-6 rounded-2xl bg-[color:var(--neutral-50)] border border-[color:var(--neutral-100)]">
                    <Clock className="w-8 h-8 mb-4 text-[color:var(--warning)]" />
                    <h4 className="font-bold text-base mb-1 text-[color:var(--neutral-900)]">Status Review</h4>
                    <p className="text-sm text-[color:var(--neutral-500)] leading-snug">
                      Pendaftaran Anda sedang dalam antrean verifikasi tim medis kami.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[color:var(--neutral-50)] border border-[color:var(--neutral-100)]">
                    <FileCheck className="w-8 h-8 mb-4 text-[color:var(--success)]" />
                    <h4 className="font-bold text-base mb-1 text-[color:var(--neutral-900)]">Langkah Terakhir</h4>
                    <p className="text-sm text-[color:var(--neutral-500)] leading-snug">
                      Anda akan mendapatkan portal khusus dokter jika verifikasi disetujui.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Logout as secondary option since primary navigation is removed by request */}
            <div className="mt-8">
              <button 
                onClick={handleLogout}
                className="text-sm font-bold text-neutral-400 hover:text-red-600 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <LogOut size={16} /> Keluar Akun
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: PHOTO PANEL (SPLIT SCREEN) */}
      <div className="hidden lg:flex w-1/2 relative bg-[color:var(--primary-950)] overflow-hidden items-end p-16">
        <Image 
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200"
          alt="Professional doctors discussing"
          fill
          className="object-cover opacity-60 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary-950)] via-[color:var(--primary-950)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-950)]/40 to-transparent" />
        
        <div className="relative z-10 max-w-lg mb-12">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-8">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4 font-heading">
            Bergabung dengan Ribuan Profesional Medis Lainnya.
          </h2>
          <p className="text-[color:var(--primary-100)] text-lg leading-relaxed mb-10">
            Jadilah bagian dari revolusi pengelolaan diabetes. Berikan konsultasi yang lebih personal dan presisi menggunakan data gula darah dan AI vision analysis pasien Anda.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[color:var(--success)]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[color:var(--success)]" />
                </div>
                <p className="text-white font-bold">Pasien Aktif</p>
              </div>
              <p className="text-[color:var(--primary-200)] text-sm">Akses ke jaringan pasien diabetes terbesar di Indonesia.</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[color:var(--warning)]/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[color:var(--warning)]" />
                </div>
                <p className="text-white font-bold">Data Real-time</p>
              </div>
              <p className="text-[color:var(--primary-200)] text-sm">Lihat tren glukosa dan asupan nutrisi harian pasien.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
