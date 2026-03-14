'use client'

import React, { useEffect, useState } from 'react'
import { Check, X, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchPendingDoctors } from '@/services/adminService'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { DoctorRegistration } from '@/types/doctor'
import NextImage from 'next/image'
import { cn } from '@/lib/utils'

export function PendingApprovalList() {
  const [pendingDoctors, setPendingDoctors] = useState<DoctorRegistration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPendingDoctors() as DoctorRegistration[]
        setPendingDoctors(data?.slice(0, 5) || [])
      } catch (e) {
        console.error("Failed to load pending doctors", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

   if (loading) {
      return (
         <div className="space-y-4">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center gap-4 bg-[color:var(--neutral-50)] p-4 rounded-2xl border border-[color:var(--neutral-100)]">
                  <Skeleton className="w-12 h-12 rounded-xl bg-[color:var(--neutral-200)]" />
                  <div className="space-y-2 flex-1">
                     <Skeleton className="h-4 w-32 bg-[color:var(--neutral-200)]" />
                     <Skeleton className="h-3 w-24 bg-[color:var(--neutral-200)]" />
                  </div>
               </div>
            ))}
         </div>
      )
   }

   if (pendingDoctors.length === 0) {
      return (
         <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[color:var(--neutral-50)] border border-[color:var(--neutral-100)] flex items-center justify-center mb-4">
               <ShieldAlert className="w-8 h-8 text-[color:var(--neutral-200)]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--neutral-400)' }}>Queue Empty</p>
         </div>
      )
   }

  return (
    <div className="space-y-3">
      {pendingDoctors.map((doc) => (
         <div 
            key={doc.id} 
            className="flex items-center gap-4 p-4 rounded-2xl bg-[color:var(--neutral-50)] border border-[color:var(--neutral-100)] group hover:bg-white hover:shadow-md transition-all"
         >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[color:var(--neutral-100)] border border-[color:var(--neutral-200)] shrink-0 relative">
               {doc.profile_photo_url ? (
                  <NextImage src={doc.profile_photo_url} alt={doc.full_name} fill className="object-cover" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-xs" style={{ color: 'var(--neutral-400)' }}>
                     {doc.full_name?.charAt(0)}
                  </div>
               )}
            </div>
            
            <div className="flex-1 min-w-0">
               <h4 className="text-sm font-bold truncate mb-0.5" style={{ color: 'var(--neutral-900)' }}>
                  {doc.full_name || 'Dr. Identification Pending'}
               </h4>
               <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--primary-700)' }}>{doc.specialization}</span>
                  <span className="w-1 h-1 rounded-full bg-[color:var(--neutral-200)]" />
                  <span className="text-[10px] truncate font-medium" style={{ color: 'var(--neutral-500)' }}>{doc.hospital_name || 'Verification Required'}</span>
               </div>
            </div>
            
            <div className="flex items-center gap-2">
               <Link href={`/admin/doctor-approvals`}>
                  <button className="w-8 h-8 rounded-lg bg-white border border-[color:var(--neutral-200)] flex items-center justify-center text-[color:var(--neutral-400)] hover:bg-[color:var(--primary-700)] hover:text-white hover:border-[color:var(--primary-700)] transition-all">
                     <ArrowRight className="w-4 h-4" />
                  </button>
               </Link>
            </div>
         </div>
      ))}

      <Link href="/admin/doctor-approvals" className="block pt-4">
         <Button variant="ghost" className="w-full h-12 rounded-xl bg-[color:var(--neutral-50)] hover:bg-[color:var(--neutral-100)] text-[color:var(--primary-700)] font-bold text-[10px] uppercase tracking-widest border border-[color:var(--neutral-200)] transition-all">
            Lihat Semua Antrean <UserCheck className="w-3 h-3 ml-2" />
         </Button>
      </Link>
    </div>
  )
}
