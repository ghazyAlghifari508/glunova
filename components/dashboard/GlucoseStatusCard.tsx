import { motion } from 'framer-motion'
import { Activity, Droplet, HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlucoseStatusCardProps {
  // We can take props if we want to make it dynamic later, for now we can rely on dummy data
  className?: string;
  isPrediabetes?: boolean;
}

export function GlucoseStatusCard({ className, isPrediabetes = false }: GlucoseStatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={cn("bg-gradient-to-br from-[color:var(--primary-900)] to-[color:var(--primary-800)] rounded-3xl p-6 sm:p-8 border border-[color:var(--primary-700)] shadow-2xl relative overflow-hidden group", className)}
    >
      {/* Decorative Pulse Accent */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-[color:var(--warning)]/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-inner border border-white/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Status Gula Darah</h3>
              <p className="text-[color:var(--primary-100)] text-sm font-medium mt-1">Pemantauan Metrik Utama Glunova</p>
            </div>
            <div className="ml-auto lg:ml-0 bg-[color:var(--warning-bg)]/20 backdrop-blur-md border border-[color:var(--warning)]/30 text-[color:var(--warning)] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
              {isPrediabetes ? 'Prediabetes' : 'Terkontrol'}
            </div>
          </div>
          
          <div className="space-y-2 mb-2">
            <div className="flex justify-between text-white/80 text-xs font-bold uppercase tracking-wider">
              <span>HbA1c Target Level</span>
              <span className="text-[color:var(--warning)] font-bold">5.8%</span>
            </div>
            <div className="relative h-4 bg-white/10 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[color:var(--warning)] via-yellow-400 to-[color:var(--success)] rounded-full relative"
              >
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30" />
              </motion.div>
            </div>
            <div className="flex justify-between text-white/40 text-[10px] font-bold uppercase tracking-[0.1em]">
              <span>Optimal (&lt;5.7%)</span>
              <span>Bahaya (&gt;6.5%)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:w-[400px]">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center shadow-lg transform transition-transform hover:scale-105">
            <div className="flex justify-center mb-2">
                <HeartPulse className="w-5 h-5 text-[color:var(--warning)]" />
            </div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-wider mb-1">HbA1c</p>
            <div className="flex items-baseline justify-center gap-1">
                <p className="text-3xl font-extrabold text-white leading-none">5.8<span className="text-lg font-medium text-white/60">%</span></p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center shadow-lg transform transition-transform hover:scale-105">
             <div className="flex justify-center mb-2">
                <Droplet className="w-5 h-5 text-blue-300" />
            </div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-wider mb-1">Gula Puasa</p>
            <div className="flex items-baseline justify-center gap-1">
                <p className="text-3xl font-extrabold text-white leading-none">95<span className="text-lg font-medium text-white/60"></span></p>
            </div>
             <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest">mg/dL</p>
          </div>

          <div className="hidden md:block bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center shadow-lg transform transition-transform hover:scale-105">
            <div className="flex justify-center mb-2">
                <Activity className="w-5 h-5 text-[color:var(--success)]" />
            </div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-wider mb-1">2 Jam PP</p>
            <div className="flex items-baseline justify-center gap-1">
                <p className="text-3xl font-extrabold text-white leading-none">120<span className="text-lg font-medium text-white/60"></span></p>
            </div>
             <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest">mg/dL</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
