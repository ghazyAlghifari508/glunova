'use client'

import type { ConsultationStatus as Status } from '@/types/consultation'

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  scheduled: { label: 'MENUNGGU_KONEKSI', className: 'bg-[color:var(--primary-50)] text-[color:var(--primary-700)] border border-[color:var(--primary-200)]' },
  ongoing: { label: 'LINK_TERENKRIPSI_AKTIF', className: 'bg-[color:var(--success)] text-white shadow-[0_10px_20px_rgba(16,185,129,0.2)]' },
  completed: { label: 'SESI_BERAKHIR', className: 'bg-[color:var(--neutral-100)] text-[color:var(--neutral-400)] border border-[color:var(--neutral-200)]' },
  cancelled: { label: 'SINYAL_TERPUTUS', className: 'bg-rose-50 text-rose-600 border border-rose-100' },
  no_show: { label: 'LINK_TIMEOUT', className: 'bg-amber-50 text-amber-600 border border-amber-100' },
}

export function ConsultationStatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.scheduled
  return (
    <span className={`inline-flex items-center rounded-xl px-5 py-2 text-[11px] font-black uppercase tracking-[0.3em] italic ${config.className}`}>
      {config.label}
    </span>
  )
}
