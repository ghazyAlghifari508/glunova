'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getConsultationById } from '@/services/consultationService'
import { toast } from '@/components/ui/use-toast'
import { 
  Lock, CheckCircle2, Clock, Calendar as CalendarIcon, 
  ArrowLeft, Receipt, CreditCard, ArrowRight, User
} from 'lucide-react'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { cn } from "@/lib/utils"

export default function PaymentPage() {
  const { consultationId } = useParams<{ consultationId: string }>()
  const router = useRouter()
  const [consultation, setConsultation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [mayarStatus, setMayarStatus] = useState<string>('pending')

  const checkStatus = async (manual = false) => {
    if (isChecking && !manual) return
    setIsChecking(true)
    try {
      const response = await fetch(`/api/payment/check-status?consultationId=${consultationId}`)
      const data = await response.json()
      
      if (data.status) {
        setMayarStatus(data.status)
      }

      if (data.status === 'confirmed') {
        setSuccess(true)
        if (manual) toast({ title: 'Berhasil!', description: 'Pembayaran Anda telah terkonfirmasi.' })
      } else if (manual) {
        toast({ title: 'Mayar Status: ' + (data.status || 'Pending'), description: 'Pembayaran belum terdeteksi. Silakan selesaikan di halaman Mayar.' })
      }
    } catch (err) {
      console.error('Error checking status:', err)
    } finally {
      setIsChecking(false)
    }
  }

  // Polling for status
  useEffect(() => {
    if (success || !consultationId) return

    console.log(`[Payment] Starting status polling for: ${consultationId}`)
    const interval = setInterval(() => {
      checkStatus()
    }, 8000) // Poll every 8 seconds (reduced from 5s)

    return () => {
      console.log(`[Payment] Clearing status polling for: ${consultationId}`)
      clearInterval(interval)
    }
  }, [success, consultationId])

  // Automatic redirect upon success
  useEffect(() => {
    if (success && consultationId) {
      const timer = setTimeout(() => {
        router.push(`/konsultasi-dokter/${consultationId}`)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, consultationId, router])


  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const data = await getConsultationById(consultationId)
        if (data) {
          setConsultation(data)
          if (data.payment_status === 'confirmed') {
            setSuccess(true)
          }
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchConsultation()
  }, [consultationId])

  const handlePay = async () => {
    if (!consultation) return
    setPaying(true)
    
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultation_id: consultationId,
        }),
      })

      const data = await response.json()
      if (!data.url) throw new Error(data.error || 'Gagal mendapatkan link pembayaran')

      // 2. Buka link pembayaran di tab baru agar tab ini tetap bisa polling status
      window.open(data.url, '_blank')
      setPaying(false) // Reset loading state so they can click again if needed
    } catch (error: any) {
      console.error(error)
      toast({ title: 'Error', description: error.message || 'Terjadi kesalahan sistem', variant: 'destructive' })
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[color:var(--neutral-50)]">
         <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6" />
         <p className="text-sm font-bold text-[color:var(--neutral-400)] uppercase tracking-widest font-heading">Memuat Tagihan</p>
      </div>
    )
  }

  if (!consultation) return null

  return (
    <div className="min-h-screen bg-[color:var(--neutral-50)] font-body flex flex-col relative">
       {/* Success Modal Overlay */}
       <AnimatePresence>
          {success && (
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-[color:var(--neutral-950)]/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
             >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px]" />
                </div>

                <motion.div 
                   initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                   className="bg-white rounded-[32px] p-8 md:p-14 w-full max-w-lg text-center relative z-10 shadow-[0_32px_120px_rgba(0,0,0,0.5)] border border-white/20"
                >
                   <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}
                      className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20"
                   >
                      <CheckCircle2 className="w-12 h-12 text-white" />
                   </motion.div>
                   
                   <h2 className="text-3xl font-black text-[color:var(--neutral-900)] font-heading mb-4 tracking-tight">Pembayaran Berhasil!</h2>
                   <p className="text-base text-[color:var(--neutral-500)] mb-10 leading-relaxed font-body">
                      Terima kasih, pembayaran Anda telah kami terima. Sesi konsultasi Anda telah dijadwalkan secara otomatis.
                   </p>

                   <div className="bg-[color:var(--neutral-50)] border border-[color:var(--neutral-200)] rounded-2xl p-4 mb-10 flex flex-col items-center gap-1">
                      <p className="text-[10px] font-black text-[color:var(--neutral-400)] uppercase tracking-[0.2em]">Status Transaksi</p>
                      <p className="text-sm font-bold text-green-600">Berhasil & Terverifikasi Mayar</p>
                   </div>

                   <div className="grid grid-cols-1 gap-4">
                      <button 
                         onClick={() => router.push(`/konsultasi-dokter/${consultationId}`)}
                         className="w-full py-4.5 bg-[color:var(--primary-700)] text-white rounded-2xl font-bold hover:bg-[color:var(--primary-800)] transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 group active:scale-95"
                      >
                         <Activity className="w-5 h-5 group-hover:animate-pulse" />
                         <span className="text-lg">Mulai Konsultasi Sekarang</span>
                      </button>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <button 
                            onClick={() => router.push('/dashboard')}
                            className="py-4 bg-[color:var(--neutral-900)] text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
                         >
                            <ArrowLeft className="w-4 h-4" />
                            Dashboard
                         </button>
                         <button 
                            onClick={() => router.push('/riwayat-transaksi')}
                            className="py-4 bg-[color:var(--neutral-100)] text-[color:var(--neutral-900)] rounded-2xl font-bold hover:bg-[color:var(--neutral-200)] transition-all flex items-center justify-center gap-2 active:scale-95"
                         >
                            <Receipt className="w-4 h-4" />
                            Riwayat
                         </button>
                      </div>
                   </div>
                </motion.div>
             </motion.div>
          )}
       </AnimatePresence>
       <header className="px-6 py-8 border-b border-[color:var(--neutral-200)] bg-white sticky top-0 z-50">
          <div className="max-w-2xl mx-auto flex items-center gap-4">
             <button onClick={() => router.back()} className="p-3 hover:bg-[color:var(--neutral-100)] rounded-xl transition-all">
                <ArrowLeft className="w-6 h-6 text-[color:var(--neutral-600)]" />
             </button>
             <div>
                <h1 className="text-xl font-bold text-[color:var(--neutral-900)] font-heading">Pembayaran</h1>
                <p className="text-xs font-bold text-[color:var(--primary-700)] uppercase tracking-widest">Langkah Terakhir</p>
             </div>
          </div>
       </header>

       <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <motion.div 
             initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
             className="flex flex-col md:flex-row bg-white rounded-[32px] shadow-2xl overflow-hidden border border-[color:var(--neutral-200)] min-h-[600px]"
          >
            {/* Left Box: Summary */}
            <div className="w-full md:w-[45%] bg-[color:var(--neutral-50)] p-8 md:p-14 lg:p-16 border-b md:border-b-0 md:border-r border-[color:var(--neutral-200)] flex flex-col">
               <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-xl bg-[color:var(--primary-700)] flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                        <Activity className="w-5 h-5" />
                     </div>
                     <span className="font-heading font-black text-xl tracking-tight text-[color:var(--neutral-900)] uppercase">Glunova</span>
                  </div>
                  <h3 className="text-sm font-bold text-[color:var(--neutral-400)] uppercase tracking-widest mb-4">Rincian Layanan</h3>
                  
                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-[color:var(--neutral-200)] flex-shrink-0 flex items-center justify-center overflow-hidden">
                           {consultation.doctor?.profile_picture_url ? (
                              <img src={consultation.doctor.profile_picture_url} alt="Dr" className="w-full h-full object-cover" />
                           ) : (
                              <User className="w-6 h-6 text-[color:var(--neutral-300)]" />
                           )}
                        </div>
                        <div>
                           <p className="font-heading font-black text-lg text-[color:var(--neutral-900)] leading-tight">{consultation.doctor?.full_name}</p>
                           <p className="text-sm font-bold text-[color:var(--primary-700)]">{consultation.doctor?.specialization}</p>
                        </div>
                     </div>

                     <div className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-[color:var(--neutral-200)]">
                        <div className="flex items-center justify-between text-sm">
                           <span className="text-[color:var(--neutral-500)] font-medium">Sesi Konsultasi</span>
                           <span className="font-bold text-[color:var(--neutral-900)]">{consultation.duration_minutes} Menit</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                           <span className="text-[color:var(--neutral-500)] font-medium">Jadwal</span>
                           <span className="font-bold text-[color:var(--neutral-900)]">{format(new Date(consultation.scheduled_at), 'dd MMM, HH:mm', { locale: idLocale })}</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-auto border-t border-dashed border-[color:var(--neutral-300)] pt-8">
                  <div className="flex items-end justify-between">
                     <span className="text-sm font-bold text-[color:var(--neutral-400)] uppercase tracking-wider font-heading">Total Tagihan</span>
                     <div className="flex items-baseline gap-1 text-[color:var(--neutral-900)]">
                        <span className="text-sm font-extrabold text-[color:var(--primary-700)]">Rp</span>
                        <span className="text-4xl font-black font-heading leading-none">{(consultation.total_cost || 0).toLocaleString('id-ID')}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Actions */}
            <div className="w-full md:w-[55%] p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white">
                <div className="mb-12">
                   <h2 className="text-3xl font-extrabold text-[color:var(--neutral-900)] font-heading mb-4 tracking-tight">Selesaikan Pembayaran</h2>
                   <p className="text-base text-[color:var(--neutral-500)] font-body leading-relaxed">
                      Pilih metode pembayaran melalui platform pihak ketiga terenkripsi. Sesi otomatis dikonfirmasi setelah proses pembayaran selesai.
                   </p>
                </div>

                <div className="flex items-center gap-4 mb-8 bg-[color:var(--primary-50)]/50 border border-[color:var(--primary-100)] p-4 rounded-2xl">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Lock className="w-5 h-5 text-[color:var(--primary-700)]" />
                   </div>
                    <div>
                       <p className="text-xs font-bold text-[color:var(--primary-800)] font-heading uppercase tracking-widest mb-1">Enkripsi Tingkat Bank</p>
                       <p className="text-[11px] font-medium text-[color:var(--primary-700)]">Transaksi dijaga oleh sistem keamanan Mayar</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <button
                       onClick={handlePay}
                       disabled={paying}
                       className="w-full py-6 rounded-xl bg-[color:var(--neutral-900)] text-white font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] disabled:opacity-70 flex flex-col items-center justify-center gap-2 group active:scale-95"
                    >
                       {paying ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       ) : (
                          <div className="flex items-center gap-3">
                             <CreditCard className="w-6 h-6" />
                             <span className="font-heading uppercase tracking-widest text-sm">Bayar Sekarang Secara Aman</span>
                          </div>
                       )}
                    </button>

                     <div className="pt-8 border-t border-[color:var(--neutral-100)] flex flex-col items-center gap-5">
                        <div className="flex flex-col items-center gap-2">
                           <AnimatePresence mode="wait">
                              {isChecking ? (
                                 <motion.div 
                                    key="checking"
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex items-center gap-2 bg-[color:var(--primary-50)] px-4 py-2 rounded-full border border-[color:var(--primary-100)]"
                                 >
                                    <div className="w-2 h-2 bg-[color:var(--primary-700)] rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black text-[color:var(--primary-700)] uppercase tracking-widest font-heading">Sinkronisasi Mayar...</span>
                                 </motion.div>
                              ) : (
                                 <motion.div 
                                    key="status"
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-2 bg-[color:var(--neutral-50)] px-4 py-2 rounded-full border border-[color:var(--neutral-200)]"
                                 >
                                    <span className="text-[10px] font-black text-[color:var(--neutral-400)] uppercase tracking-widest font-heading">Status:</span>
                                    <span className={cn(
                                       "text-[10px] font-black uppercase tracking-widest font-heading",
                                       mayarStatus === 'confirmed' ? "text-green-600" : "text-blue-600"
                                    )}>
                                       {mayarStatus}
                                    </span>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                           
                           {!success && (
                              <button 
                                 onClick={() => checkStatus(true)}
                                 disabled={isChecking}
                                 className="text-[10px] font-bold text-[color:var(--primary-600)] hover:text-[color:var(--primary-800)] underline tracking-wide disabled:opacity-50"
                              >
                                 Cek Status Manual
                              </button>
                           )}
                        </div>

                        <p className="text-[10px] text-[color:var(--neutral-400)] text-center uppercase tracking-widest font-bold">
                          Securely Processed by <span className="text-blue-600 font-black">Mayar.id</span>
                        </p>
                     </div>
                 </div>
            </div>
          </motion.div>
       </div>
    </div>
  )
}

function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
