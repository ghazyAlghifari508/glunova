'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { BookOpen, Plus, Search, Pencil, Trash2, Tag, Calendar, ChevronRight } from 'lucide-react'
import { deleteEducationContent } from '@/services/adminService'
import { useAdminContext } from '@/components/providers/Providers'
import { EducationModal } from '@/components/admin/EducationModal'
import { Skeleton } from '@/components/ui/skeleton'
import type { Category } from '@/types/education'
import { cn } from '@/lib/utils'

interface EducationContent {
  id: string; day: number; month: number; title: string
  description: string; content: string; tips: string[] | string
  category: Category; thumbnail_url?: string; created_at: string
}

const categoryLabels: Record<string, string> = {
  nutrisi: 'Nutrisi', kesehatan: 'Kesehatan', stimulasi: 'Stimulasi', perkembangan: 'Perkembangan', aktivitas: 'Aktivitas', imunisasi: 'Imunisasi',
}

export default function EducationManagementPage() {
  const adminContext = useAdminContext()
  const [contents, setContents] = useState<EducationContent[]>((adminContext?.educationContents || []) as EducationContent[])
  const loading = adminContext?.loading
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<EducationContent | null>(null)

  useEffect(() => {
    if (!searchQuery && !categoryFilter && adminContext?.educationContents) setContents(adminContext.educationContents as EducationContent[])
  }, [adminContext?.educationContents, searchQuery, categoryFilter])

  const loadData = useCallback(async () => {
    if (!searchQuery && !categoryFilter && adminContext?.educationContents?.length) { setContents(adminContext.educationContents as EducationContent[]); return }
    try {
      const { fetchEducationContents } = await import('@/services/adminService')
      const data = await fetchEducationContents({ search: searchQuery || undefined, category: categoryFilter || undefined })
      setContents(data as EducationContent[])
    } catch (error) {}
  }, [searchQuery, categoryFilter, adminContext?.educationContents])

  useEffect(() => { loadData() }, [categoryFilter, loadData])

  const handleDelete = async () => {
    if (!deleteId) return
    try { setDeleting(true); await deleteEducationContent(deleteId); await adminContext?.loadAdminData(true); setDeleteId(null) }
    catch (error) {} finally { setDeleting(false) }
  }
  const handleSuccess = async () => { await adminContext?.loadAdminData(true); setIsModalOpen(false) }
  const handleCreate = () => { setSelectedContent(null); setIsModalOpen(true) }

  if (loading && contents.length === 0) {
    return <div className="p-8 min-h-screen"><Skeleton className="w-full h-[600px] rounded-2xl" style={{ background: 'var(--neutral-200)' }} /></div>
  }

  return (
    <div className="p-6 md:p-8 min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
           <div>
              <h1 className="text-2xl font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>Kelola Edukasi</h1>
              <p className="text-sm font-body mt-1" style={{ color: 'var(--neutral-500)' }}>Atur konten edukasi kesehatan untuk pasien.</p>
           </div>
           <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto">
              <div className="relative flex-1 md:w-80 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--neutral-400)' }} />
                 <input type="text" placeholder="Cari konten..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 bg-transparent pl-10 pr-4 text-sm font-body focus:outline-none" style={{ color: 'var(--neutral-900)' }} />
              </div>
              <Button onClick={handleCreate} className="h-11 px-6 rounded-xl text-white font-bold text-sm w-full md:w-auto" style={{ background: 'var(--primary-700)' }}>
                <Plus className="w-4 h-4 mr-2" /> Tambah Konten
              </Button>
           </div>
        </div>

        {/* Filters */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
              <Tag className="w-3.5 h-3.5" style={{ color: 'var(--neutral-400)' }} />
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                 className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer font-body" style={{ color: 'var(--neutral-700)' }}>
                 <option value="">Semua Kategori</option>
                 {Object.entries(categoryLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>
            <div className="ml-auto hidden xl:flex items-center gap-2">
              <span className="text-xs font-semibold font-body" style={{ color: 'var(--neutral-500)' }}>Total: {contents.length} konten</span>
            </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
           <AnimatePresence mode="popLayout">
              {contents.map((content, idx) => (
                 <motion.div key={content.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.02 }}
                    className="rounded-xl p-5 group transition-all flex flex-col shadow-sm"
                    style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}
                 >
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center" style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
                          <span className="text-[9px] font-bold font-heading" style={{ color: 'var(--primary-500)' }}>Hari</span>
                          <span className="text-lg font-bold leading-none font-heading" style={{ color: 'var(--primary-700)' }}>{content.day}</span>
                       </div>
                       <div className="flex items-center gap-1">
                          <button onClick={() => { setSelectedContent(content); setIsModalOpen(true) }}
                             className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
                             <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setDeleteId(content.id)}
                             className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
                             <Trash2 className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    </div>
                     <div className="flex-1 space-y-3">
                        <div>
                           <p className="text-[10px] font-bold uppercase tracking-wider mb-1 font-heading" style={{ color: 'var(--primary-700)' }}>{categoryLabels[content.category] || content.category}</p>
                           <h3 className="text-sm font-bold line-clamp-2 min-h-[2.5rem] font-heading" style={{ color: 'var(--neutral-900)' }}>{content.title}</h3>
                        </div>
                        <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--neutral-100)' }}>
                           <div className="flex items-center gap-1.5 ml-auto">
                              <Calendar className="w-3 h-3" style={{ color: 'var(--neutral-400)' }} />
                              <span className="text-[10px] font-semibold font-body" style={{ color: 'var(--neutral-500)' }}>Bulan {content.month}</span>
                           </div>
                        </div>
                     </div>
                 </motion.div>
              ))}
           </AnimatePresence>
        </div>

        {/* Empty */}
        {contents.length === 0 && (
           <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
              <BookOpen className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--neutral-300)' }} />
              <h2 className="text-xl font-bold font-heading mb-2" style={{ color: 'var(--neutral-900)' }}>Belum Ada Konten</h2>
              <p className="text-sm font-body max-w-sm mx-auto" style={{ color: 'var(--neutral-500)' }}>Tambahkan konten edukasi pertama untuk memulai.</p>
           </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && <EducationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleSuccess} initialData={selectedContent} />}
        </AnimatePresence>

        {/* Delete confirm */}
        <AnimatePresence>
           {deleteId && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                 <motion.div initial={{ opacity:0, scale: 0.95 }} animate={{ opacity:1, scale: 1 }} exit={{ opacity:0, scale: 0.95 }}
                    className="rounded-2xl p-8 max-w-sm w-full text-center shadow-xl" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(239,68,68,0.08)' }}>
                       <Trash2 className="w-7 h-7" style={{ color: 'var(--danger)' }} />
                    </div>
                    <h3 className="text-lg font-bold font-heading mb-2" style={{ color: 'var(--neutral-900)' }}>Hapus Konten?</h3>
                    <p className="text-sm font-body mb-6" style={{ color: 'var(--neutral-500)' }}>Konten edukasi akan dihapus secara permanen.</p>
                    <div className="grid grid-cols-2 gap-3">
                       <Button onClick={() => setDeleteId(null)} className="h-11 rounded-xl font-semibold text-sm" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-700)' }}>Batal</Button>
                       <Button onClick={handleDelete} className="h-11 rounded-xl font-semibold text-sm text-white" style={{ background: 'var(--danger)' }}>
                          {deleting ? 'Menghapus...' : 'Ya, Hapus'}
                       </Button>
                    </div>
                 </motion.div>
              </div>
           )}
        </AnimatePresence>

      </div>
    </div>
  )
}
