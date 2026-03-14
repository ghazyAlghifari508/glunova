'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface SearchFilterProps {
  onFilterChange: (filters: { search?: string, specialization?: string }) => void
}

const CATEGORIES = [
  'Semua', 'Endokrinologi', 'Penyakit Dalam', 'Gizi Klinik', 
  'Edukator Diabetes', 'Podiatri', 'Psikolog Klinis'
]

export function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('Semua')

  const handleSearchChange = (val: string) => {
    setSearch(val)
    onFilterChange({ search: val, specialization: selectedCat === 'Semua' ? '' : selectedCat })
  }

  const handleCatChange = (cat: string) => {
    setSelectedCat(cat)
    onFilterChange({ search, specialization: cat === 'Semua' ? '' : cat })
  }

  const clearSearch = () => {
    setSearch('')
    onFilterChange({ search: '', specialization: selectedCat === 'Semua' ? '' : selectedCat })
  }

  return (
    <div className="w-full flex flex-row items-center justify-between gap-4 md:gap-6 font-body">
      {/* Search Input Modern */}
      <div className="relative isolate group w-[160px] sm:w-[260px] md:w-[320px] shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-r from-[color:var(--primary-200)] to-[color:var(--primary-100)] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <div className="relative flex items-center bg-white border border-[color:var(--neutral-100)] rounded-2xl p-1 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all focus-within:border-[color:var(--primary-300)] focus-within:shadow-[0_4px_20px_rgb(26,86,219,0.08)]">
          <div className="pl-4 text-[color:var(--neutral-400)]">
            <Search className="w-5 h-5" />
          </div>
          <input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari dokter, nama..."
            className="flex-1 bg-transparent px-3 py-2 text-sm font-medium text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-300)] outline-none w-full"
          />
          {search && (
            <button 
              onClick={clearSearch}
              className="pr-6 text-[color:var(--neutral-300)] hover:text-[color:var(--neutral-600)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Modern Filter Chips */}
      <div className="flex items-center justify-start gap-2 overflow-x-auto no-scrollbar py-1 ml-auto">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCat === cat
          return (
            <button
              key={cat}
              onClick={() => handleCatChange(cat)}
              className={cn(
                "relative whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center active:scale-95 border",
                isActive 
                  ? "text-[color:var(--primary-700)] shadow-sm border-[color:var(--primary-200)] bg-[color:var(--primary-50)]"
                  : "bg-white text-[color:var(--neutral-500)] border-[color:var(--neutral-200)] hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-700)] hover:bg-[color:var(--primary-50)]/30"
              )}
            >
              {/* {isActive && (
                // Removed animated bubble for standard UI
              )} */}
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}
