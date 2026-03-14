'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShieldCheck, User, ArrowRight } from 'lucide-react'
import type { Doctor } from '@/types/doctor'
import { cn } from '@/lib/utils'

interface DoctorCardProps {
  doctor: Doctor
  index: number
}

export function DoctorCard({ doctor, index }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
      className="group bg-white rounded-[1.5rem] p-5 md:p-6 flex flex-col md:flex-row items-center md:items-stretch gap-5 md:gap-6 border border-[color:var(--neutral-200)] hover:border-[color:var(--primary-300)] shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md transition-all duration-200 relative overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[color:var(--primary-50)] to-transparent rounded-bl-3xl opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

      {/* Avatar Container */}
      <div className="relative shrink-0 flex justify-center sm:block">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.25rem] overflow-hidden bg-[color:var(--neutral-50)] border-2 border-white shadow-sm relative z-10">
          {doctor.profile_picture_url ? (
            <Image 
              src={doctor.profile_picture_url} 
              alt={doctor.full_name} 
              fill 
              sizes="(max-width: 640px) 80px, 96px"
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[color:var(--neutral-300)]">
              <User className="w-8 h-8" />
            </div>
          )}
        </div>
        
        {/* Verified Badge */}
        <div className="absolute -bottom-2 -right-2 sm:-bottom-1 sm:-right-1 w-7 h-7 rounded-full bg-[color:var(--primary-50)] border-2 border-white flex items-center justify-center shadow-sm z-20 tooltip" data-tip="Dokter Terverifikasi">
            <ShieldCheck className="w-3.5 h-3.5 text-[color:var(--primary-600)]" />
        </div>
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0 font-body relative z-10 text-center md:text-left flex flex-col justify-center">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
          <span className="px-2.5 py-1 bg-[color:var(--primary-50)] text-[color:var(--primary-700)] text-[10px] font-bold uppercase tracking-wide rounded-md border border-[color:var(--primary-100)/50]">
            {doctor.specialization}
          </span>
          <div className="flex items-center gap-1 text-[color:var(--neutral-600)] bg-[color:var(--neutral-50)] border border-[color:var(--neutral-200)] px-2 py-1 rounded-md text-[11px] font-bold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            4.9
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-[color:var(--neutral-900)] mb-1 line-clamp-1 group-hover:text-[color:var(--primary-700)] transition-colors">
          {doctor.full_name}
        </h3>
        
        <p className="text-[12px] font-medium text-[color:var(--neutral-500)]">
          {doctor.years_of_experience || 5} Tahun Pengalaman Klinis
        </p>
      </div>

      {/* Pricing & CTA - Full Desktop Right Column */}
      <div className="w-full md:w-auto md:min-w-[180px] flex flex-col items-center md:items-end justify-center gap-3 md:border-l md:border-[color:var(--neutral-200)] md:pl-6 pt-4 md:pt-0 border-t border-[color:var(--neutral-100)] md:border-t-0 mt-3 md:mt-0 relative z-10 shrink-0">
          <div className="text-center md:text-right w-full mb-4">
            <p className="text-sm font-bold text-[color:var(--neutral-500)] uppercase tracking-wider mb-2">Biaya Konsultasi</p>
            <div className="flex items-baseline justify-center md:justify-end gap-1.5">
              <span className="text-base font-bold text-[color:var(--primary-600)]">Rp</span>
              <span className="text-4xl font-black text-[color:var(--neutral-900)] leading-none">
                {(doctor.hourly_rate / 1000).toFixed(0)}K
              </span>
              <span className="text-sm font-medium text-[color:var(--neutral-500)] ml-1">/ 30 Menit</span>
            </div>
          </div>
          
          <Link href={`/booking/${doctor.id}`} className="w-full">
            <button className="w-full h-10 px-4 bg-[color:var(--primary-700)] text-white rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[color:var(--primary-800)] transition-all active:scale-95 group/btn shadow-[0_2px_10px_rgb(26,86,219,0.2)]">
              Jadwalkan
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
      </div>
    </motion.div>
  )
}
