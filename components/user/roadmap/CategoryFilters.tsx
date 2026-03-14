'use client'

import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'

type CategoryFilter = 'all' | 'exercise' | 'nutrition'

interface CategoryFiltersProps {
  category: CategoryFilter
  setCategory: (val: CategoryFilter) => void
  categoryTabs: Array<{ key: CategoryFilter; label: string }>
  categoryCounts: Record<CategoryFilter, number>
}

export function CategoryFilters({
  category,
  setCategory,
  categoryTabs,
  categoryCounts
}: CategoryFiltersProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-30 -mt-8 mb-12">
      <div className="rounded-[28px] border border-neutral-200/60 bg-white/90 p-4 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                <Filter className="w-5 h-5" />
             </div>
             
             <div className="flex flex-wrap items-center gap-2">
               {categoryTabs.map((tab) => {
                 const isActive = category === tab.key
                 return (
                   <button
                     key={tab.key}
                     onClick={() => setCategory(tab.key)}
                     className={`relative inline-flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                       isActive
                         ? 'bg-neutral-900 text-white shadow-lg shadow-black/10 active:scale-95'
                         : 'bg-transparent text-neutral-500 hover:bg-neutral-100'
                     }`}
                   >
                     <span className="tracking-wide">{tab.label}</span>
                     <span
                       className={`flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-[10px] font-black ${
                         isActive ? 'bg-white/20 text-white' : 'bg-neutral-200/60 text-neutral-600'
                       }`}
                     >
                       {categoryCounts[tab.key]}
                     </span>
                   </button>
                 )
               })}
             </div>
          </div>

          <div className="flex items-center gap-4 lg:pl-6 lg:border-l border-neutral-200">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Glunova Care Roadmap</p>
          </div>
          
        </div>
      </div>
    </section>
  )
}
