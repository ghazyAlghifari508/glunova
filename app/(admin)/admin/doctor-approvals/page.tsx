'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Stethoscope, Check, Loader2, Search, FileText, ShieldAlert, UserCheck, UserX, BadgeCheck, AlertCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { approveDoctor, rejectDoctor } from '@/services/adminService'
import Image from 'next/image'
import { useAdminContext } from '@/components/providers/Providers'
import { useToast } from '@/components/ui/use-toast'
import type { DoctorRegistration } from '@/types/doctor'

export default function DoctorApprovalsPage() {
  const { toast } = useToast()
  const adminContext = useAdminContext()
  const doctors = (adminContext?.pendingDoctors || []) as DoctorRegistration[]
  const loading = adminContext?.loading
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<{ id: string; userId: string } | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleApprove = async (doctorId: string) => {
    if (processingId) return
    try { 
      setProcessingId(doctorId)
      await approveDoctor(doctorId)
      toast({ title: 'Dokter Disetujui', description: 'Profil dokter berhasil dibuat dan diverifikasi.' })
      await adminContext?.loadAdminData(true) 
    }
    catch (error: any) { 
      console.error(error)
      toast({ 
        title: 'Gagal Menyetujui', 
        description: error.message || 'Terjadi kesalahan sistem saat menyetujui dokter.',
        variant: 'destructive'
      })
    } finally { setProcessingId(null) }
  }

  const handleReject = async () => {
    if (!rejectModal || processingId) return
    try { 
      setProcessingId(rejectModal.id)
      await rejectDoctor(rejectModal.id, rejectModal.userId, rejectReason)
      toast({ title: 'Pendaftaran Ditolak', description: 'Alasan penolakan telah dikirim ke pemohon.' })
      await adminContext?.loadAdminData(true)
      setRejectModal(null)
      setRejectReason('') 
    }
    catch (error: any) { 
      console.error(error)
      toast({ 
        title: 'Gagal Menolak', 
        description: error.message || 'Terjadi kesalahan sistem saat menolak pendaftaran.',
        variant: 'destructive'
      })
    } finally { setProcessingId(null) }
  }

  const filteredDoctors = doctors.filter(d =>
    d.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.license_number.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading && doctors.length === 0) {
    return <div className="p-8 min-h-screen"><Skeleton className="w-full h-[600px] rounded-2xl" style={{ background: 'var(--neutral-200)' }} /></div>
  }

  return (
    <div className="p-6 md:p-8 min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div>
              <h1 className="text-2xl font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>Verifikasi Dokter</h1>
              <p className="text-sm font-body mt-1" style={{ color: 'var(--neutral-500)' }}>Tinjau lisensi medis dan sertifikasi profesional.</p>
           </div>
           <div className="relative w-full md:w-80 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--neutral-400)' }} />
              <input type="text" placeholder="Cari nama, spesialisasi, lisensi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full h-11 bg-transparent pl-10 pr-4 text-sm font-body focus:outline-none" style={{ color: 'var(--neutral-900)' }} />
           </div>
        </div>

        {/* List */}
        <div className="space-y-4">
           {filteredDoctors.length === 0 ? (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="rounded-2xl p-16 text-center flex flex-col items-center"
                 style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                 <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(16,185,129,0.08)' }}>
                    <BadgeCheck className="w-8 h-8" style={{ color: 'var(--success)' }} />
                 </div>
                 <h2 className="text-xl font-bold font-heading mb-2" style={{ color: 'var(--neutral-900)' }}>Tidak Ada Permintaan</h2>
                 <p className="text-sm font-body" style={{ color: 'var(--neutral-500)' }}>Semua verifikasi dokter sudah diproses.</p>
              </motion.div>
           ) : (
              <div className="grid grid-cols-1 gap-4">
                 <AnimatePresence mode="popLayout">
                    {filteredDoctors.map((doctor) => (
                       <motion.div key={doctor.id} layout initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                          className="group rounded-xl p-5 md:p-6 transition-all shadow-sm"
                          style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}
                       >
                          <div className="flex flex-col xl:flex-row items-center gap-6">
                             {/* Avatar */}
                             <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden relative shadow-sm shrink-0"
                                  style={{ background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)' }}>
                                {doctor.users?.avatar_url ? (
                                   <Image src={doctor.users.avatar_url} alt={doctor.full_name} fill className="object-cover" unoptimized />
                                ) : (
                                   <div className="w-full h-full flex items-center justify-center text-2xl font-bold font-heading" style={{ color: 'var(--neutral-400)' }}>
                                      {doctor.full_name.charAt(0)}
                                   </div>
                                )}
                             </div>

                             {/* Info */}
                             <div className="flex-1 min-w-0 text-center xl:text-left">
                                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3 mb-2">
                                   <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>{doctor.full_name}</h3>
                                   <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold font-body" style={{ background: 'var(--primary-50)', color: 'var(--primary-700)', border: '1px solid var(--primary-100)' }}>
                                      {doctor.specialization}
                                   </span>
                                </div>
                                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-5 gap-y-1.5 mb-4">
                                   <div className="flex items-center gap-1.5">
                                      <FileText className="w-3.5 h-3.5" style={{ color: 'var(--neutral-400)' }} />
                                      <span className="text-xs font-body" style={{ color: 'var(--neutral-500)' }}>Lisensi: <strong style={{ color: 'var(--neutral-900)' }}>{doctor.license_number}</strong></span>
                                   </div>
                                   <div className="flex items-center gap-1.5">
                                      <Stethoscope className="w-3.5 h-3.5" style={{ color: 'var(--neutral-400)' }} />
                                      <span className="text-xs font-body" style={{ color: 'var(--neutral-500)' }}>Pengalaman: <strong style={{ color: 'var(--neutral-900)' }}>{doctor.years_of_experience} Tahun</strong></span>
                                   </div>
                                   <div className="flex items-center gap-1.5">
                                      <AlertCircle className="w-3.5 h-3.5" style={{ color: 'var(--neutral-400)' }} />
                                      <span className="text-xs font-body" style={{ color: 'var(--neutral-500)' }}>Diajukan: <strong style={{ color: 'var(--neutral-900)' }}>{new Date(doctor.submitted_at).toLocaleDateString('id-ID')}</strong></span>
                                   </div>
                                </div>
                                {doctor.certification_url && (
                                   <a href={doctor.certification_url} target="_blank"
                                      className="inline-flex items-center gap-2 h-8 px-3 rounded-lg text-xs font-semibold transition-all font-body"
                                      style={{ background: 'var(--neutral-100)', color: 'var(--neutral-600)', border: '1px solid var(--neutral-200)' }}>
                                      <FileText className="w-3 h-3" /> Lihat Dokumen
                                   </a>
                                )}
                             </div>

                             {/* Actions */}
                             <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto shrink-0">
                                <Button onClick={() => handleApprove(doctor.id)} disabled={!!processingId}
                                   className="h-11 px-6 rounded-xl text-white font-bold text-sm" style={{ background: 'var(--success)' }}>
                                   {processingId === doctor.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4 mr-2" />}
                                   Setujui
                                </Button>
                                <Button onClick={() => setRejectModal({ id: doctor.id, userId: doctor.user_id })} disabled={!!processingId}
                                   className="h-11 px-6 rounded-xl font-bold text-sm" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-600)' }}>
                                   <UserX className="w-4 h-4 mr-2" /> Tolak
                                </Button>
                             </div>
                          </div>
                       </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           )}
        </div>

        {/* Reject Modal */}
        <AnimatePresence>
           {rejectModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                 <motion.div initial={{ opacity:0, scale: 0.95 }} animate={{ opacity:1, scale: 1 }} exit={{ opacity:0, scale: 0.95 }}
                    className="rounded-2xl p-8 max-w-md w-full shadow-xl" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                    <h3 className="text-lg font-bold font-heading mb-2 flex items-center gap-2" style={{ color: 'var(--neutral-900)' }}>
                       <UserX className="w-5 h-5" style={{ color: 'var(--danger)' }} /> Konfirmasi Penolakan
                    </h3>
                    <p className="text-sm font-body mb-5" style={{ color: 'var(--neutral-500)' }}>Berikan alasan penolakan. Alasan ini akan dikirim ke pemohon.</p>
                    <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
                       className="w-full h-28 rounded-xl p-3 text-sm font-body focus:outline-none resize-none"
                       style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)', color: 'var(--neutral-900)' }}
                       placeholder="Dokumen tidak valid, lisensi kedaluwarsa..." />
                    <div className="grid grid-cols-2 gap-3 mt-5">
                       <Button onClick={() => setRejectModal(null)} className="h-11 rounded-xl font-semibold text-sm" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-700)' }}>Batal</Button>
                       <Button onClick={handleReject} disabled={!!processingId} className="h-11 rounded-xl font-semibold text-sm text-white" style={{ background: 'var(--danger)' }}>
                          Tolak Dokter
                       </Button>
                    </div>
                 </motion.div>
              </div>
           )}
        </AnimatePresence>

      </div>
    </div>
  )
}
