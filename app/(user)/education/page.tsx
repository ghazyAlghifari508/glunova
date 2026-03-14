'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ArrowRight, PlayCircle, BookOpen, Star, CheckCircle2, ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useHealthData } from '@/hooks/useHealthData'
import { EducationContent } from '@/types/education'
import { toggleFavoriteStatus } from '@/services/educationService'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function EducationMagazine() {
  const router = useRouter()
  const { profile, loading: dataLoading, education, loadEducation } = useHealthData()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    if (!profile || dataLoading || education.loading) return
    loadEducation()
  }, [profile, dataLoading, education.loading, education.content.length, loadEducation])

  const readDays = useMemo(() => new Set((education.progress || []).filter(p => p.is_read).map(p => p.day)), [education.progress])
  const favoriteDays = useMemo(() => new Set((education.progress || []).filter(p => p.is_favorite).map(p => p.day)), [education.progress])

  const filteredContents = useMemo(() => {
    let result = [...education.content]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      )
    }
    if (activeCategory === 'favorites') {
      result = result.filter(c => favoriteDays.has(c.day))
    } else if (activeCategory === 'read') {
      result = result.filter(c => readDays.has(c.day))
    } else if (activeCategory !== 'all') {
      result = result.filter(c => c.category === activeCategory)
    }
    return result
  }, [education.content, searchQuery, activeCategory, favoriteDays, readDays])

  const mainCategories = useMemo(() => {
    const fromContent = Array.from(new Set(education.content.map(c => c.category)))
    return ['all', ...fromContent]
  }, [education.content])

  const statusFilters = ['favorites', 'read']

  const handleFavorite = async (e: React.MouseEvent, day: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (!profile) return
    try {
      await toggleFavoriteStatus(profile.id, day, !favoriteDays.has(day))
      loadEducation(true)
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  if ((dataLoading || education.loading) && education.content.length === 0) {
    return (
      <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
          <Skeleton className="w-full h-[600px] rounded-2xl" />
        </div>
      </div>
    )
  }

  const featuredArticle = filteredContents[0]
  const secondaryArticles = filteredContents.slice(1, 4)
  const remainingArticles = filteredContents.slice(4)

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
       {/* Hero Magazine Layout */}
       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-6">
           <div>
              <span className="text-[color:var(--primary-700)] font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 block">Glunova Journal</span>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-[color:var(--neutral-900)] tracking-tight leading-[1.1]">
                Edukasi & <span className="text-[color:var(--neutral-400)] italic font-serif">Inspirasi</span> Medis
              </h1>
           </div>
           <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--neutral-400)]" />
             <input 
               type="text" 
               placeholder="Cari artikel kesehatan..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-11 pl-11 pr-4 bg-white border border-[color:var(--neutral-200)] rounded-xl text-sm font-medium shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus:ring-2 focus:ring-[color:var(--primary-100)] focus:border-[color:var(--primary-300)] outline-none transition-all placeholder:text-[color:var(--neutral-300)]"
             />
           </div>
        </div>

          {/* Category & Status Filter Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            {/* Main Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 flex-1 max-w-full">
              {mainCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "relative whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center active:scale-95 border",
                    activeCategory === cat 
                      ? "text-[color:var(--primary-700)] shadow-sm border-[color:var(--primary-200)] bg-[color:var(--primary-50)]"
                      : "bg-white text-[color:var(--neutral-500)] border-[color:var(--neutral-200)] hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-700)] hover:bg-[color:var(--primary-50)]/30"
                  )}
                >
                  {cat === 'all' ? 'Terbaru' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Status Filters (Favorites & Favorites) - Pushed to the right */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide self-end sm:self-auto">
              <div className="hidden sm:block w-[1px] h-6 bg-neutral-200 mx-1" />
              {statusFilters.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "relative whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center active:scale-95 border gap-2",
                    activeCategory === cat 
                      ? "text-[color:var(--primary-700)] shadow-sm border-[color:var(--primary-200)] bg-[color:var(--primary-50)]"
                      : "bg-white text-[color:var(--neutral-500)] border-[color:var(--neutral-200)] hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-700)] hover:bg-[color:var(--primary-50)]/30"
                  )}
                >
                  {cat === 'favorites' && <Star size={14} className={activeCategory === 'favorites' ? 'fill-amber-500 text-amber-500' : ''} />}
                  {cat === 'read' && <CheckCircle2 size={14} className={activeCategory === 'read' ? 'text-emerald-500' : ''} />}
                  {cat === 'favorites' ? 'Favorit' : 'Sudah Baca'}
                </button>
              ))}
            </div>
          </div>

          {filteredContents.length === 0 ? (
            <div className="py-32 flex flex-col items-center justify-center text-center">
              <BookOpen className="w-16 h-16 text-neutral-300 mb-6" />
              <h3 className="text-2xl font-heading font-black text-neutral-900 mb-2">Tidak ada artikel ditemukan</h3>
              <p className="text-neutral-500 font-medium">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
              {/* Featured Main Article */}
              {featuredArticle && (
                <Link href={`/education/${featuredArticle.day}`} className="lg:col-span-8 group h-full block">
                  <div className="relative w-full h-full min-h-[400px] rounded-[32px] overflow-hidden shadow-2xl">
                    <Image 
                      src={featuredArticle.thumbnail_url || 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80'} 
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                    
                    <div className="absolute top-6 right-6 flex gap-3 z-20">
                      {readDays.has(featuredArticle.day) && (
                         <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                           <CheckCircle2 className="w-6 h-6" />
                         </div>
                      )}
                      <button onClick={(e) => handleFavorite(e, featuredArticle.day)} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-amber-500 transition-colors">
                         <Star className={`w-5 h-5 ${favoriteDays.has(featuredArticle.day) ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                      <span className="bg-[color:var(--primary-600)] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-3">Cerita Utama</span>
                      <h2 className="text-2xl lg:text-4xl font-heading font-bold text-white leading-tight mb-3 group-hover:text-[color:var(--primary-300)] transition-colors">{featuredArticle.title}</h2>
                      <p className="text-white/80 text-sm lg:text-base font-medium max-w-2xl line-clamp-2 mb-6">{featuredArticle.description}</p>
                      
                      <div className="flex items-center gap-4 text-white font-bold">
                        <span className="flex items-center"><PlayCircle className="w-6 h-6 mr-2" /> 5 Min Read</span>
                        <div className="h-6 w-px bg-white/30" />
                        <span className="uppercase tracking-widest text-xs">Artikel Pilihan</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Secondary Articles Column */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                 {secondaryArticles.map((article) => (
                    <Link key={article.id} href={`/education/${article.day}`} className="group flex-1 relative rounded-[28px] overflow-hidden shadow-lg min-h-[180px]">
                      <Image 
                        src={article.thumbnail_url || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'} 
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/70 transition-colors" />
                      
                      <button onClick={(e) => handleFavorite(e, article.day)} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-amber-500 transition-colors">
                         <Star className={`w-4 h-4 ${favoriteDays.has(article.day) ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>

                      <div className="absolute inset-0 p-5 flex flex-col justify-end">
                        <span className="text-[color:var(--primary-300)] text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">{article.category}</span>
                        <h3 className="text-lg font-heading font-bold text-white leading-snug line-clamp-2">{article.title}</h3>
                      </div>
                    </Link>
                 ))}
              </div>
            </div>
          )}

          {/* More Articles List */}
          {remainingArticles.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between border-b border-[color:var(--neutral-200)] pb-3 mb-8">
                <h3 className="text-2xl font-heading font-black text-[color:var(--neutral-900)]">Arsip Edukasi</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                 {remainingArticles.map((article) => (
                   <Link key={article.id} href={`/education/${article.day}`} className="group block">
                     <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 shadow-md border border-neutral-100">
                       <Image 
                          src={article.thumbnail_url || 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80'} 
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       
                       <div className="absolute top-4 left-4 flex gap-2">
                         <span className="bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                           Edukasi Glunova
                         </span>
                       </div>
                       <button onClick={(e) => handleFavorite(e, article.day)} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-neutral-400 hover:text-amber-500 transition-colors">
                          <Star className={`w-4 h-4 ${favoriteDays.has(article.day) ? 'fill-amber-500 text-amber-500' : ''}`} />
                       </button>
                     </div>
                     <span className="text-[color:var(--primary-600)] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">{article.category}</span>
                     <h4 className="text-lg font-heading font-bold text-[color:var(--neutral-900)] leading-snug mb-2 group-hover:text-[color:var(--primary-700)] transition-colors line-clamp-2">{article.title}</h4>
                     <p className="text-sm text-[color:var(--neutral-500)] font-medium line-clamp-2 leading-relaxed">{article.description}</p>
                   </Link>
                 ))}
              </div>
            </div>
          )}

       </div>
    </div>
  )
}
