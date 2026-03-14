import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Activity } from 'lucide-react'

interface DashboardHeroProps {
  firstName: string
}

export function DashboardHero({ firstName }: DashboardHeroProps) {
  return (
    <section className="relative w-full overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center pt-24 md:pt-28 pb-20 md:pb-32 bg-[color:var(--primary-900)]">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
        <Image 
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000" 
          alt="Glunova Dashboard Background" 
          fill 
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary-900)] via-[color:var(--primary-900)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-900)] via-transparent to-[color:var(--primary-900)] opacity-90" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start text-left max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
              <Activity className="w-4 h-4 text-[color:var(--warning)]" />
              <span className="text-xs font-bold tracking-widest uppercase">Health Monitoring Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] md:leading-[1.05] mb-6 tracking-tight">
              Selamat Datang,<br />
              <span className="text-[color:var(--warning)] italic">{firstName}</span>.
            </h1>
            
            <p className="text-base sm:text-xl text-[color:var(--primary-100)] font-medium leading-relaxed mb-8 md:mb-10 max-w-2xl">
              Bersama Glunova, wujudkan gaya hidup sehat dan kelola gula darah Anda secara proaktif melalui metrik cerdas dan konsultasi ahli.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/roadmap" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[color:var(--warning)] hover:bg-[#cbe33a] text-[color:var(--primary-900)] rounded-2xl px-10 h-14 font-black text-base shadow-lg transition-all active:scale-95 group">
                  Mulai Aktivitas
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/education" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-white/30 bg-white/5 hover:bg-white/10 text-white rounded-2xl px-10 h-14 font-bold text-base backdrop-blur-md transition-all active:scale-95">
                  Edukasi Personal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
