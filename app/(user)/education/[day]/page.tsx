'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Bookmark, Share2, Clock, CheckCircle2,
  ChevronLeft, ChevronRight, Lightbulb, PlayCircle, BookOpen,
  Calendar, Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getAllEducationContent,
  getContentByDay,
  toggleReadStatus,
  toggleFavoriteStatus,
  getUserProgress,
} from '@/services/educationService'
import { EducationContent, UserProgress } from '@/types/education'
import { useHealthData } from '@/hooks/useHealthData'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function ImmersiveEducationDetail() {
  const router = useRouter()
  const params = useParams()
  const day = parseInt(params.day as string)

  const { profile, loading: authLoading, loadEducation } = useHealthData()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<EducationContent | null>(null)
  const [isRead, setIsRead] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const [relatedContent, setRelatedContent] = useState<EducationContent[]>([])

  useEffect(() => {
    const loadData = async () => {
      if (authLoading) return
      if (!profile) {
        router.push('/login')
        return
      }
      setUserId(profile.id)

      try {
        const [data, progress, allContent] = await Promise.all([
          getContentByDay(day),
          getUserProgress(profile.id),
          getAllEducationContent()
        ])

        if (data) {
          setContent(data)
          const currentProgress = progress.find((p: UserProgress) => p.day === day)
          if (currentProgress) {
            setIsRead(currentProgress.is_read)
            setIsFavorite(currentProgress.is_favorite)
          }
          
          // Set related content (excluding current day, take 3)
          setRelatedContent(allContent.filter((c: EducationContent) => c.day !== day).slice(0, 3))
        }
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [day, profile, authLoading, router])

  const handleToggleRead = async () => {
    if (!userId) return
    const newRead = !isRead
    try {
      await toggleReadStatus(userId, day, newRead)
      setIsRead(newRead)
      loadEducation(true)
    } catch {
      // ignore
    }
  }

  const handleToggleFavorite = async () => {
    if (!userId) return
    try {
      await toggleFavoriteStatus(userId, day, !isFavorite)
      setIsFavorite(!isFavorite)
      loadEducation(true)
    } catch {
       // ignore
    }
  }

  // --- LOADING STATE ---
  if (loading && !content) {
    return <div className="min-h-screen bg-neutral-50"><Skeleton className="w-full h-screen" /></div>
  }

  // --- NOT FOUND ---
  if (!content) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-center">
         <div>
            <BookOpen className="w-16 h-16 text-neutral-700 mx-auto mb-6" />
            <h1 className="text-4xl font-heading font-black text-white mb-2">Materi Tidak Ditemukan</h1>
            <p className="text-neutral-400 mb-8">Artikel edukasi ini belum tersedia atau sudah dipindahkan.</p>
            <Button onClick={() => router.push('/education')} className="bg-white text-black hover:bg-neutral-200 h-12 px-8 rounded-full font-bold">Kembali ke Jurnal</Button>
         </div>
      </div>
    )
  }

  const tipsList = Array.isArray(content.tips) ? content.tips : content.tips ? [String(content.tips)] : []

  return (
    <div className="w-full min-h-screen -mt-16 lg:-mt-28 relative z-0">
       
       {/* IMPRESSIVE FULL-SCREEN HERO */}
       <div className="relative w-full h-[80vh] md:h-[90vh] min-h-[600px] flex flex-col justify-between">
          <Image 
             src={content.thumbnail_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000'}
             alt="Post background"
             fill
             className="object-cover"
             priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-black/10" />
          
          {/* Top Nav (Overlaid) */}
          <div className="relative z-10 w-full px-6 md:px-12 pt-16 lg:pt-28 flex items-center justify-between">
             <button onClick={() => router.back()} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-black transition-colors">
                <ArrowLeft className="w-5 h-5" />
             </button>
             
             <div className="flex gap-3">
                <button onClick={handleToggleFavorite} className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center border transition-colors ${isFavorite ? 'bg-amber-500 border-amber-500 text-white shadow-lg' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'}`}>
                   <Bookmark className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-colors">
                   <Share2 className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Hero Content aligned to bottom */}
          <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 max-w-[1200px] mx-auto">
             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                   <span className="bg-primary-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                     {content.category}
                   </span>
                   <span className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary-400" />
                      5 Menit Baca
                   </span>
                   <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                      · Hari {day}
                   </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-heading font-black text-white leading-[0.95] tracking-tight mb-8">
                   {content.title}
                </h1>
                
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center text-white font-black shadow-xl ring-2 ring-white/20">
                      G
                   </div>
                   <div>
                      <p className="text-white font-bold text-sm">Ditulis oleh Tim Glunova</p>
                      <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mt-0.5">Ahli Metrik & Nutrisi</p>
                   </div>
                </div>
             </motion.div>
          </div>
       </div>

       {/* EDITORIAL CONTENT BODY */}
       <div className="max-w-[900px] mx-auto px-6 md:px-12 pt-20 pb-10">
          
          {/* Abstract / Intro */}
          <p className="text-2xl md:text-3xl font-medium text-neutral-800 leading-snug mb-16 font-sans text-left">
             {content.description}
          </p>

          <div className="w-full h-px bg-neutral-100 mb-16" />

          {/* Main Body */}
          <article className="prose prose-lg md:prose-xl prose-neutral max-w-none">
             <div className="whitespace-pre-wrap text-neutral-600 font-medium leading-relaxed font-sans">
                {content.content}
             </div>
          </article>

          {/* Share Section (Matching reference) */}
          <div className="mt-24 pt-10 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-8">
             <div>
                <h4 className="text-2xl font-black text-neutral-900 mb-1">Apakah artikel ini membantu?</h4>
                <p className="text-neutral-500 font-medium">Bagikan kepada kerabat Anda untuk edukasi bersama.</p>
             </div>
             <div className="flex items-center gap-4">
                <button className="h-14 px-8 rounded-2xl bg-[#2D68E8] text-white font-bold flex items-center gap-3 shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                   <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" width={20} height={20} alt="FB" className="brightness-0 invert" />
                   Facebook
                </button>
                <button className="h-14 px-8 rounded-2xl bg-[#0F1419] text-white font-bold flex items-center gap-3 shadow-lg shadow-black/20 hover:scale-105 transition-transform">
                   <Image src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" width={20} height={20} alt="X" className="brightness-0 invert" />
                   Twitter
                </button>
             </div>
          </div>

          {/* Expert Tips Block */}
          {tipsList.length > 0 && (
             <div className="my-20 p-8 md:p-12 rounded-[40px] bg-neutral-50 border border-neutral-100 flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/3 text-center md:text-left">
                   <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-6 mx-auto md:mx-0">
                      <Lightbulb className="w-10 h-10" />
                   </div>
                   <h3 className="text-3xl font-heading font-black text-neutral-900 mb-2">Tips Ahli</h3>
                   <p className="text-neutral-500 font-medium">Langkah konkrit yang bisa Anda ambil hari ini.</p>
                </div>
                
                <ul className="w-full md:w-2/3 space-y-6">
                   {tipsList.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                         <span className="w-8 h-8 rounded-full bg-neutral-200 flex flex-shrink-0 items-center justify-center text-neutral-600 font-black text-sm mt-1">{idx + 1}</span>
                         <p className="text-lg text-neutral-700 font-medium leading-relaxed">{tip}</p>
                      </li>
                   ))}
                </ul>
             </div>
          )}
       </div>

       {/* READ MORE NEXT (Matching reference) */}
       {relatedContent.length > 0 && (
          <div className="bg-white py-24">
             <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600 mb-3 ml-1">Read More Next</p>
                   <h2 className="text-4xl md:text-5xl font-black text-neutral-900 font-heading tracking-tight">Lanjut Baca Berita Lainnya</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {relatedContent.map((item) => (
                      <Link href={`/education/${item.day}`} key={item.id} className="group">
                         <div className="bg-white rounded-[40px] p-2 border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all h-full flex flex-col">
                            <div className="relative aspect-[4/3] w-full rounded-[32px] overflow-hidden mb-6">
                               <Image 
                                  src={item.thumbnail_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'} 
                                  alt={item.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                               />
                            </div>
                            <div className="px-6 pb-8 flex-1 flex flex-col">
                               <h3 className="text-xl font-black text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                                  {item.title}
                               </h3>
                               <div className="mt-auto flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                                     <Calendar size={14} className="text-neutral-400" />
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                     {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                  </span>
                               </div>
                            </div>
                         </div>
                      </Link>
                   ))}
                </div>
             </div>
          </div>
       )}

       {/* COMPLETION FOOTER */}
       <div className="bg-neutral-900 text-white py-24 border-t-8 border-primary-500">
          <div className="max-w-[800px] mx-auto px-6 text-center">
             <h2 className="text-4xl lg:text-5xl font-heading font-black text-white mb-8">Selesai membaca?</h2>
             <p className="text-neutral-400 text-lg font-medium mb-12">Tandai sebagai selesai untuk mencatat progres mingguan Anda dalam manajemen kesehatan.</p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                   onClick={handleToggleRead}
                   className={`h-16 px-10 rounded-full font-black text-lg transition-all ${isRead ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20' : 'bg-white text-black hover:bg-neutral-200 shadow-xl shadow-white/20'}`}
                >
                   {isRead ? <><CheckCircle2 className="w-6 h-6 mr-3" /> Selesai Dibaca</> : 'Tandai Selesai'}
                </Button>
             </div>

             {/* Navigation Prev / Next */}
             <div className="mt-20 pt-10 border-t border-white/10 flex items-center justify-between">
                {day > 1 ? (
                   <Link href={`/education/${day - 1}`} className="flex items-center text-neutral-400 hover:text-white transition-colors group">
                      <ChevronLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                      <div>
                         <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1">Sebelumnya</span>
                         <span className="text-sm font-bold border-b border-transparent group-hover:border-white">Hari {day - 1}</span>
                      </div>
                   </Link>
                ) : <div />}
                
                <Link href={`/education/${day + 1}`} className="flex items-center text-left text-neutral-400 hover:text-white transition-colors group">
                   <div className="text-right">
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-1">Selanjutnya</span>
                      <span className="text-sm font-bold border-b border-transparent group-hover:border-white">Hari {day + 1}</span>
                   </div>
                   <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
          </div>
       </div>

    </div>
  )
}
