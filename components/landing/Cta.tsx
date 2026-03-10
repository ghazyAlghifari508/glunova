'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Cta() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--primary-900)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-4">
          Mulai Kelola Diabetes Anda Hari Ini
        </h2>
        <p className="text-sm md:text-base text-white/60 mb-8 max-w-lg mx-auto">
          Bergabung dengan ribuan pengguna Glunova yang telah berhasil mengelola diabetes mereka dengan lebih baik.
        </p>
        <Link href="/register">
          <Button
            className="rounded-xl h-12 px-8 text-sm font-semibold group"
            style={{ background: 'var(--white)', color: 'var(--primary-900)' }}
          >
            Daftar Gratis
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
