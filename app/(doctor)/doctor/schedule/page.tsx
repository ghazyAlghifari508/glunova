'use client'

import { useState } from 'react'
import { upsertSchedule, updateSchedule, deleteSchedule } from '@/services/doctorService'
import { useDoctorContext } from '@/components/providers/Providers'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { Plus, Trash2, Clock, CalendarDays, ChevronRight, AlertCircle, Info } from 'lucide-react'
import type { DoctorSchedule } from '@/types/doctor'
import { DAY_NAMES } from '@/types/doctor'
import { cn } from '@/lib/utils'

export default function DoctorSchedulePage() {
  const doctorContext = useDoctorContext()
  const doctorId = doctorContext?.doctor?.id
  const schedules = (doctorContext?.schedules || []) as DoctorSchedule[]
  const loading = doctorContext?.loading
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const addSlot = async (dayOfWeek: number) => {
    if (!doctorId) return
    setSaving(true)
    try {
      await upsertSchedule({ 
        doctor_id: doctorId, 
        day_of_week: dayOfWeek, 
        start_time: '09:00', 
        end_time: '17:00', 
        is_available: true 
      })
      await doctorContext?.loadDoctorData(true)
      toast({ title: 'Slot Jadwal Ditambahkan' })
    } catch (error) {
      toast({ title: 'Gagal Menambah Slot', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const updateSlot = async (id: string, updates: Partial<DoctorSchedule>) => {
    try {
      await updateSchedule(id, updates)
      await doctorContext?.loadDoctorData(true)
    } catch (error) {
      toast({ title: 'Gagal Update', variant: 'destructive' })
    }
  }

  const deleteSlot = async (id: string) => {
    try {
      await deleteSchedule(id)
      await doctorContext?.loadDoctorData(true)
      toast({ title: 'Jadwal Dihapus' })
    } catch (error) {
      toast({ title: 'Gagal Menghapus', variant: 'destructive' })
    }
  }

  if (loading && schedules.length === 0) {
    return (
      <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-screen space-y-8">
        <Skeleton className="h-12 w-64 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {[1,2,3].map(i => <Skeleton key={i} className="h-48 rounded-[2rem]" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-white font-sans">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Jadwal Praktik</h1>
              <p className="text-sm font-medium text-slate-500">Kelola ketersediaan waktu Anda untuk konsultasi pasien.</p>
           </div>
           <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 max-w-sm">
              <Info className="w-5 h-5 text-amber-600 mt-0.5" />
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest leading-relaxed">
                 Pasien hanya dapat memesan jadwal yang Anda tandai sebagai "Tersedia".
              </p>
           </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {DAY_NAMES.map((dayName, dayIndex) => {
              const daySlots = schedules.filter((s) => s.day_of_week === dayIndex)
              const hasSlots = daySlots.length > 0

              return (
                 <motion.div 
                    key={dayIndex} 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: dayIndex * 0.03 }}
                    className={cn(
                       "group bg-white rounded-[2.5rem] p-6 border transition-all flex flex-col h-full",
                       hasSlots ? "border-slate-200 shadow-sm hover:border-slate-300" : "border-slate-100 opacity-60 hover:opacity-100"
                    )}
                 >
                    <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center gap-3">
                          <div className={cn(
                             "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                             hasSlots ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                          )}>
                             <CalendarDays className="w-5 h-5" />
                          </div>
                          <h3 className="font-black text-slate-900">{dayName}</h3>
                       </div>
                       <button 
                          onClick={() => addSlot(dayIndex)} 
                          disabled={saving}
                          className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-90"
                       >
                          <Plus className="w-4 h-4" />
                       </button>
                    </div>

                    <div className="flex-1 space-y-3">
                       <AnimatePresence mode="popLayout">
                          {daySlots.length === 0 ? (
                             <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center py-10 text-center">
                                <AlertCircle className="w-8 h-8 text-slate-200 mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Libur</p>
                             </motion.div>
                          ) : (
                             daySlots.map((slot) => (
                                <motion.div 
                                   key={slot.id} 
                                   initial={{ opacity: 0, x: -10 }} 
                                   animate={{ opacity: 1, x: 0 }} 
                                   exit={{ opacity: 0, scale: 0.9 }}
                                   className="relative p-4 rounded-2xl bg-slate-50 border border-slate-100 group/slot hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all"
                                >
                                   <div className="flex flex-col gap-3">
                                      <div className="flex items-center gap-2">
                                         <Clock className="w-3.5 h-3.5 text-slate-400" />
                                         <div className="flex items-center gap-2">
                                            <input 
                                               type="time" 
                                               value={slot.start_time} 
                                               onChange={(e) => updateSlot(slot.id, { start_time: e.target.value })} 
                                               className="text-xs font-black bg-transparent border-none p-0 focus:ring-0 w-16" 
                                            />
                                            <span className="text-slate-300 font-black">—</span>
                                            <input 
                                               type="time" 
                                               value={slot.end_time} 
                                               onChange={(e) => updateSlot(slot.id, { end_time: e.target.value })} 
                                               className="text-xs font-black bg-transparent border-none p-0 focus:ring-0 w-16" 
                                            />
                                         </div>
                                      </div>

                                      <div className="flex items-center justify-between border-t border-slate-200/50 pt-3 mt-1">
                                         <label className="flex items-center gap-2 cursor-pointer group/toggle">
                                            <div className="relative">
                                               <input 
                                                  type="checkbox" 
                                                  checked={slot.is_available} 
                                                  onChange={(e) => updateSlot(slot.id, { is_available: e.target.checked })} 
                                                  className="sr-only peer" 
                                               />
                                               <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:bg-emerald-500 transition-colors" />
                                               <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
                                            </div>
                                            <span className={cn(
                                               "text-[10px] font-black uppercase tracking-widest transition-colors",
                                               slot.is_available ? "text-emerald-600" : "text-slate-400"
                                            )}>
                                               {slot.is_available ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                         </label>
                                         <button 
                                            onClick={() => deleteSlot(slot.id)} 
                                            className="opacity-0 group-hover/slot:opacity-100 w-8 h-8 rounded-lg text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-center active:scale-90"
                                         >
                                            <Trash2 className="w-4 h-4" />
                                         </button>
                                      </div>
                                   </div>
                                </motion.div>
                             ))
                          )}
                       </AnimatePresence>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Slot: {daySlots.length}</p>
                       <ChevronRight className="w-4 h-4 text-slate-200" />
                    </div>
                 </motion.div>
              )
           })}
        </div>

      </div>
    </div>
  )
}
