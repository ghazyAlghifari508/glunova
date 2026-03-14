'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { getDoctorById } from '@/services/doctorService'
import { createConsultation } from '@/services/consultationService'
import { toast } from '@/components/ui/use-toast'
import { 
  ArrowLeft, Calendar as CalendarIcon, Clock,
  ShieldCheck, Star, Receipt, CheckCircle2
} from 'lucide-react'
import type { Doctor } from '@/types/doctor'
import { addDays, format, isSameDay } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '19:00', '20:00']
const DURATIONS = [
  { value: 30, label: '30 Menit', multiplier: 1 }, 
  { value: 60, label: '60 Menit', multiplier: 2 }
]

export default function BookingPage() {
  const { doctorId } = useParams<{ doctorId: string }>()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  // Form State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [duration, setDuration] = useState<number>(30)

  // Generate next 14 days
  const availableDates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i))

  useEffect(() => {
    if (authLoading) return
    if (!user) { router.push('/login'); return }

    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(doctorId)
        if (data) setDoctor(data)
      } catch (error) {
        console.error('Error fetching doctor:', error)
        toast({ title: 'Error', description: 'Gagal memuat data dokter.', variant: 'destructive' })
      } finally {
        setLoading(false)
      }
    }
    fetchDoctor()
  }, [doctorId, user, authLoading, router])

  const handleBooking = async () => {
    if (!user || !doctor || !selectedTimeSlot) return
    setSubmitting(true)

    try {
      // Split time slot "HH:mm"
      const [hours, minutes] = selectedTimeSlot.split(':').map(Number)
      
      const scheduledDateTime = new Date(selectedDate)
      scheduledDateTime.setHours(hours, minutes, 0, 0)

      const consultation = await createConsultation({
        user_id: user.id,
        doctor_id: doctor.id,
        scheduled_at: scheduledDateTime.toISOString(),
        duration_minutes: duration,
        hourly_rate: doctor.hourly_rate
      })

      if (consultation) {
        router.push(`/payment/${consultation.id}`)
      }
    } catch (error: any) {
      console.error('Error booking:', error)
      toast({ title: 'Gagal Booking', description: error.message || 'Terjadi kesalahan sistem.', variant: 'destructive' })
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[color:var(--primary-200)] border-t-[color:var(--primary-600)] rounded-full animate-spin mb-6" />
          <p className="text-sm font-bold text-[color:var(--neutral-400)] uppercase tracking-widest font-heading">Memuat Jadwal</p>
        </div>
      </div>
    )
  }

  if (!doctor) return null

  const calculatePrice = () => {
    const rate = doctor.hourly_rate
    const multi = DURATIONS.find(d => d.value === duration)?.multiplier || 1
    return rate * multi
  }

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
      
      {/* Soft Background Blob */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-[color:var(--primary-900)] overflow-hidden pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[color:var(--primary-800)]/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
        
        {/* Simple Header */}
        <div className="flex items-center gap-4 text-white mb-8">
           <button 
             onClick={() => router.back()}
             className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all backdrop-blur-md"
           >
              <ArrowLeft className="w-5 h-5" />
           </button>
           <h1 className="text-xl font-bold font-heading tracking-wide">Pesan Jadwal Konsultasi</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* LEFT COLUMN: Doctor Info (Sticky) */}
          <div className="lg:col-span-4 space-y-6">
             <div className="sticky top-6">
                <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                   className="bg-white rounded-xl p-6 shadow-xl shadow-[color:var(--primary-900)]/5 border border-[color:var(--neutral-100)]"
                >
                   <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-[color:var(--neutral-100)] mx-auto mb-6 shadow-inner border-4 border-[color:var(--neutral-50)]">
                      {doctor.profile_picture_url && (
                        <Image src={doctor.profile_picture_url} alt={doctor.full_name} fill unoptimized className="object-cover" />
                      )}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <ShieldCheck className="w-5 h-5 text-[color:var(--primary-600)]" />
                      </div>
                   </div>
                   
                   <div className="text-center">
                      <h2 className="text-2xl font-extrabold text-[color:var(--neutral-900)] font-heading mb-1">{doctor.full_name}</h2>
                      <p className="text-[13px] font-bold text-[color:var(--primary-600)] uppercase tracking-wider mb-4 px-3 py-1 bg-[color:var(--primary-50)] inline-block rounded-full">{doctor.specialization}</p>
                      
                      <div className="flex items-center justify-center gap-6 pt-4 border-t border-[color:var(--neutral-100)]">
                         <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /><span className="font-bold text-[color:var(--neutral-900)]">4.9</span></div>
                            <span className="text-[11px] font-bold text-[color:var(--neutral-400)] uppercase tracking-wider">Rating</span>
                         </div>
                         <div className="w-[1px] h-8 bg-[color:var(--neutral-200)]" />
                         <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1.5"><span className="font-bold text-[color:var(--neutral-900)]">{doctor.years_of_experience || 5} Thn</span></div>
                            <span className="text-[11px] font-bold text-[color:var(--neutral-400)] uppercase tracking-wider">Pengalaman</span>
                         </div>
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>

          {/* RIGHT COLUMN: Booking Form */}
          <div className="lg:col-span-8 space-y-6">
             <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
               className="bg-white rounded-xl p-6 md:p-10 shadow-xl shadow-[color:var(--primary-900)]/5 border border-[color:var(--neutral-100)]"
             >
                {/* 1. Date Selection */}
                <div className="mb-10">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[color:var(--primary-50)] flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-[color:var(--primary-600)]" />
                      </div>
                      <h3 className="text-xl font-bold text-[color:var(--neutral-900)] font-heading">Pilih Tanggal Sesi</h3>
                   </div>
                   
                   <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                      {availableDates.map((date, idx) => {
                        const isSelected = isSameDay(date, selectedDate)
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedDate(date)}
                            className={`min-w-[80px] shrink-0 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border ${
                              isSelected 
                                ? 'bg-primary text-white border-transparent shadow-lg shadow-primary/30 scale-105'
                                : 'bg-white text-[color:var(--neutral-600)] border-[color:var(--neutral-200)] hover:border-[color:var(--primary-300)] hover:bg-[color:var(--primary-50)]'
                            }`}
                          >
                             <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">{format(date, 'EEE', { locale: localeId })}</span>
                             <span className="text-2xl font-black font-heading leading-none">{format(date, 'd')}</span>
                             <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{format(date, 'MMM', { locale: localeId })}</span>
                          </button>
                        )
                      })}
                   </div>
                </div>

                {/* 2. Time Selection */}
                <div className="mb-10">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-indigo-500" />
                      </div>
                      <h3 className="text-xl font-bold text-[color:var(--neutral-900)] font-heading">Pilih Waktu Konsultasi</h3>
                   </div>
                   
                   <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {TIME_SLOTS.map((time) => {
                         const isSelected = selectedTimeSlot === time
                         return (
                           <button
                              key={time}
                              onClick={() => setSelectedTimeSlot(time)}
                              className={`py-3 rounded-[1rem] font-bold text-sm transition-all border ${
                                 isSelected
                                   ? 'bg-[color:var(--neutral-900)] text-white border-transparent shadow-md scale-105'
                                   : 'bg-white text-[color:var(--neutral-700)] border-[color:var(--neutral-200)] hover:border-[color:var(--neutral-900)] hover:text-[color:var(--neutral-900)]'
                              } font-heading`}
                           >
                              {time}
                           </button>
                         )
                      })}
                   </div>
                </div>

                {/* 3. Duration Selection */}
                <div>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold text-[color:var(--neutral-900)] font-heading">Durasi Sesi</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {DURATIONS.map((dur) => {
                         const isSelected = duration === dur.value
                         return (
                           <button
                              key={dur.value}
                              onClick={() => setDuration(dur.value)}
                              className={`p-5 rounded-2xl flex items-center justify-between transition-all border-2 text-left ${
                                 isSelected
                                    ? 'border-[color:var(--primary-600)] bg-[color:var(--primary-50)]/50'
                                    : 'border-[color:var(--neutral-200)] bg-white hover:border-[color:var(--primary-300)]'
                              }`}
                           >
                              <div>
                                 <h4 className={`text-lg font-bold font-heading mb-1 ${isSelected ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--neutral-900)]'}`}>{dur.label}</h4>
                                 <p className="text-sm font-medium text-[color:var(--neutral-500)]">Rp {(doctor.hourly_rate * dur.multiplier / 1000).toFixed(0)}K</p>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[color:var(--primary-600)]' : 'border-[color:var(--neutral-300)]'}`}>
                                 {isSelected && <div className="w-3 h-3 rounded-full bg-[color:var(--primary-600)]" />}
                              </div>
                           </button>
                         )
                      })}
                   </div>
                </div>

             </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-2xl border-t border-[color:var(--neutral-200)] p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 lg:pl-[calc(33.333%+1.5rem)]">
            <div className="flex items-center gap-4 text-center sm:text-left">
               <div className="w-12 h-12 rounded-full bg-[color:var(--success-bg)] flex items-center justify-center">
                 <CheckCircle2 className="w-6 h-6 text-[color:var(--success)]" />
               </div>
               <div>
                 <p className="text-[11px] font-bold text-[color:var(--neutral-400)] uppercase tracking-wider mb-0.5 font-heading">Total Tagihan</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-sm font-extrabold text-[color:var(--primary-600)]">Rp</span>
                    <span className="text-3xl font-black text-[color:var(--neutral-900)] font-heading leading-none">
                       {calculatePrice().toLocaleString('id-ID')}
                    </span>
                 </div>
               </div>
            </div>
            
            <button
               onClick={handleBooking}
               disabled={!selectedTimeSlot || submitting}
               className="w-full sm:w-auto px-8 py-3 md:py-4 rounded-xl bg-neutral-900 text-white font-bold text-sm md:text-base hover:bg-primary transition-all shadow-xl hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-50 disabled:scale-100 disabled:hover:bg-neutral-900 font-heading active:scale-95"
            >
               {submitting ? 'Memproses...' : 'Lanjut ke Pembayaran'}
            </button>
         </div>
      </div>

      </div>
    </div>
  )
}
