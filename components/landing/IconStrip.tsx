'use client'

import { Activity, Heart, ShieldCheck, Stethoscope, BookOpen, Camera } from 'lucide-react'

const icons = [
  { icon: Activity, label: 'Pemantauan' },
  { icon: Heart, label: 'Kesehatan' },
  { icon: ShieldCheck, label: 'Keamanan' },
  { icon: Stethoscope, label: 'Konsultasi' },
  { icon: BookOpen, label: 'Edukasi' },
  { icon: Camera, label: 'AI Vision' },
]

export default function IconStrip() {
  return (
    <section className="py-12" style={{ background: 'var(--neutral-50)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {icons.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <item.icon className="w-7 h-7" style={{ color: 'var(--neutral-500)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--neutral-500)' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
