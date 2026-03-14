'use client'

import Image from 'next/image'
import { Clock, Stethoscope, ChevronRight, Calendar } from 'lucide-react'
import { ConsultationStatusBadge } from '@/components/shared/ConsultationStatus'
import type { Consultation } from '@/types/consultation'
import { useRouter } from 'next/navigation'

interface ConsultationHistoryProps {
  consultations: Consultation[]
}

export function ConsultationHistory({ consultations }: ConsultationHistoryProps) {
  const router = useRouter()
  
  return (
    <div className="bg-white border border-[color:var(--neutral-200)] rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
       {/* Decorative gradient corner - softened */}
       <div className="absolute top-0 right-0 w-48 h-48 bg-[color:var(--primary-50)]/30 rounded-full blur-3xl pointer-events-none" />
       
       <div className="mb-10 flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-3">
             <div className="h-1.5 w-8 rounded-full bg-[color:var(--primary-700)] shadow-sm" />
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--neutral-400)] font-heading">Log Aktivitas</p>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[color:var(--neutral-900)] font-heading">Riwayat Konsultasi</h2>
       </div>

       {consultations.length === 0 ? (
         <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)] py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[color:var(--neutral-200)] flex items-center justify-center mb-6 shadow-sm">
               <Clock className="h-6 w-6 text-[color:var(--neutral-300)]" />
            </div>
            <p className="text-sm font-medium text-[color:var(--neutral-400)] leading-loose max-w-[200px] font-body">
               Belum ada riwayat sesi yang tercatat.
            </p>
         </div>
       ) : (
         <div className="space-y-6">
           {consultations.map((c) => (
             <div 
               key={c.id} 
               className="group/item relative overflow-hidden rounded-2xl border border-[color:var(--neutral-200)] bg-white p-6 transition-all hover:border-[color:var(--primary-700)] hover:shadow-lg active:scale-[0.99]"
             >
                <div className="flex items-center justify-between gap-6 relative z-10">
                   <div className="flex items-center gap-5">
                      <div className="relative h-14 w-14 rounded-xl bg-[color:var(--neutral-50)] flex items-center justify-center overflow-hidden border border-[color:var(--neutral-100)] transition-colors">
                         {c.doctor?.profile_picture_url ? (
                            <Image
                               src={c.doctor.profile_picture_url}
                               alt={c.doctor?.full_name || 'Profil Dokter'}
                               fill
                               sizes="56px"
                               className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                               unoptimized
                            />
                         ) : <Stethoscope className="text-[color:var(--neutral-300)]" size={24} />}
                      </div>
                      <div>
                         <p className="text-base font-bold text-[color:var(--neutral-900)] group-hover/item:text-[color:var(--primary-700)] transition-colors font-heading">
                            {c.doctor?.full_name || 'Dokter Spesialis'}
                         </p>
                         <div className="flex items-center gap-2.5 mt-1.5 font-body">
                            <Calendar size={12} className="text-[color:var(--primary-500)]" />
                            <p className="text-xs font-medium text-[color:var(--neutral-500)]">
                               {new Date(c.scheduled_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-5">
                      <div className="hidden sm:block">
                         <ConsultationStatusBadge status={c.status} />
                      </div>
                      <button 
                         onClick={() => router.push(`/konsultasi-dokter/${c.id}`)}
                         className="h-11 w-11 rounded-xl bg-[color:var(--neutral-50)] border border-[color:var(--neutral-200)] flex items-center justify-center text-[color:var(--neutral-400)] hover:text-[color:var(--primary-700)] hover:border-[color:var(--primary-700)] hover:bg-white transition-all shadow-sm"
                      >
                         <ChevronRight size={20} className="group-hover/item:translate-x-0.5 transition-transform" />
                      </button>
                   </div>
                </div>
                
                {c.status === 'ongoing' && (
                   <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[color:var(--success)]/5 to-transparent pointer-events-none" />
                )}
             </div>
           ))}
         </div>
       )}
    </div>
  )
}
