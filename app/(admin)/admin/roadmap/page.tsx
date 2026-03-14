'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Route, Plus, Search, Pencil, Trash2, Loader2,
  Dumbbell, Apple, Star, Activity, Zap, ShieldCheck, ChevronRight
} from 'lucide-react'
import { deleteRoadmapActivity } from '@/services/adminService'
import { useAdminContext } from '@/components/providers/Providers'
import { RoadmapModal } from '@/components/admin/RoadmapModal'
import { Skeleton } from '@/components/ui/skeleton'
import { RoadmapActivity } from '@/types/roadmap'
import { cn } from '@/lib/utils'

const categoryConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  exercise: { label: 'Olahraga', icon: Dumbbell, color: 'var(--warning)', bg: 'rgba(245,158,11,0.08)' },
  nutrition: { label: 'Nutrisi', icon: Apple, color: 'var(--success)', bg: 'rgba(16,185,129,0.08)' },
  sleep: { label: 'Tidur', icon: Activity, color: '#6366F1', bg: 'rgba(99,102,241,0.08)' },
  mental: { label: 'Mental', icon: Zap, color: '#D946EF', bg: 'rgba(217,70,239,0.08)' },
  checkup: { label: 'Pemeriksaan', icon: ShieldCheck, color: 'var(--danger)', bg: 'rgba(239,68,68,0.08)' },
  bonding: { label: 'Sosial', icon: Star, color: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
}

export default function RoadmapManagementPage() {
  const adminContext = useAdminContext()
  const [activities, setActivities] = useState<RoadmapActivity[]>((adminContext?.roadmapActivities || []) as RoadmapActivity[])
  const loading = adminContext?.loading
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<RoadmapActivity | null>(null)

  useEffect(() => {
    if (!searchQuery && !categoryFilter && adminContext?.roadmapActivities) {
      setActivities(adminContext.roadmapActivities as RoadmapActivity[])
    }
  }, [adminContext?.roadmapActivities, searchQuery, categoryFilter])

  const loadData = useCallback(async () => {
    if (!searchQuery && !categoryFilter && adminContext?.roadmapActivities?.length) {
      setActivities(adminContext.roadmapActivities as RoadmapActivity[])
      return
    }
    try {
      const { fetchRoadmapActivities } = await import('@/services/adminService')
      const data = await fetchRoadmapActivities({ search: searchQuery || undefined, category: categoryFilter || undefined })
      setActivities(data as RoadmapActivity[])
    } catch (error) {}
  }, [searchQuery, categoryFilter, adminContext?.roadmapActivities])

  useEffect(() => { loadData() }, [categoryFilter, loadData])

  const handleDelete = async () => {
    if (!deleteId) return
    try { setDeleting(true); await deleteRoadmapActivity(deleteId); await adminContext?.loadAdminData(true); setDeleteId(null) }
    catch (error) {} finally { setDeleting(false) }
  }

  const handleSuccess = async () => { await adminContext?.loadAdminData(true); setIsModalOpen(false) }
  const handleCreate = () => { setSelectedActivity(null); setIsModalOpen(true) }

  if (loading && activities.length === 0) {
    return <div className="p-8 min-h-screen"><Skeleton className="w-full h-[600px] rounded-2xl" style={{ background: 'var(--neutral-200)' }} /></div>
  }

  return (
    <div className="p-6 md:p-8 min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
           <div>
              <h1 className="text-2xl font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>Kelola Roadmap</h1>
              <p className="text-sm font-body mt-1" style={{ color: 'var(--neutral-500)' }}>Atur aktivitas perawatan untuk pasien.</p>
           </div>
           <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto">
              <div className="relative flex-1 md:w-80 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--neutral-400)' }} />
                 <input type="text" placeholder="Cari aktivitas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 bg-transparent pl-10 pr-4 text-sm font-body focus:outline-none" style={{ color: 'var(--neutral-900)' }} />
              </div>
              <Button onClick={handleCreate} className="h-11 px-6 rounded-xl text-white font-bold text-sm w-full md:w-auto" style={{ background: 'var(--primary-700)' }}>
                <Plus className="w-4 h-4 mr-2" /> Tambah Aktivitas
              </Button>
           </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
           {['', ...Object.keys(categoryConfig)].map((cat) => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                 className="px-4 h-9 rounded-lg text-xs font-semibold transition-all font-heading"
                 style={{
                   background: categoryFilter === cat ? 'var(--primary-700)' : 'var(--white)',
                   color: categoryFilter === cat ? 'white' : 'var(--neutral-600)',
                   border: `1px solid ${categoryFilter === cat ? 'var(--primary-700)' : 'var(--neutral-200)'}`,
                 }}
              >
                 {cat === '' ? 'Semua' : (categoryConfig[cat]?.label || cat)}
              </button>
           ))}
        </div>

        {/* List */}
        <div className="space-y-3">
           <AnimatePresence mode="popLayout">
              {activities.length === 0 ? (
                 <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                    <Route className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--neutral-300)' }} />
                    <h2 className="text-xl font-bold font-heading mb-2" style={{ color: 'var(--neutral-900)' }}>Belum Ada Aktivitas</h2>
                    <p className="text-sm font-body max-w-sm mx-auto" style={{ color: 'var(--neutral-500)' }}>Tambahkan aktivitas pertama untuk memulai roadmap perawatan.</p>
                 </div>
              ) : (
                 <div className="grid grid-cols-1 gap-3">
                    {activities.map((activity, idx) => {
                       const config = categoryConfig[activity.category] || { label: activity.category, icon: Route, color: 'var(--neutral-500)', bg: 'var(--neutral-100)' }
                       const Icon = config.icon
                       return (
                          <motion.div key={activity.id} layout initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.02 }}
                             className="rounded-xl p-5 group transition-all flex flex-col md:flex-row items-center gap-5"
                             style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}
                          >
                             <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: config.bg }}>
                                <Icon className="w-7 h-7" style={{ color: config.color }} />
                             </div>
                             <div className="flex-1 min-w-0 text-center md:text-left">
                                    <div className="flex lg:flex-row flex-col lg:items-center gap-3 mb-1">
                                       <h3 className="text-base font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>{activity.activity_name}</h3>
                                       <div className="flex items-center justify-center lg:justify-start gap-2">
                                          <div className="flex items-center gap-0.5">
                                             {[1,2,3,4,5].map(s => (
                                                <div key={s} className="w-1.5 h-1.5 rounded-full" style={{ background: s <= (activity.difficulty_level || 1) ? config.color : 'var(--neutral-200)' }} />
                                             ))}
                                          </div>
                                          <span className="text-[10px] font-bold font-body" style={{ color: config.color }}>Lv {activity.difficulty_level || 1}</span>
                                       </div>
                                    </div>
                                <p className="text-sm font-body line-clamp-2 max-w-2xl" style={{ color: 'var(--neutral-500)' }}>{activity.description || 'Deskripsi belum tersedia.'}</p>
                             </div>
                             <div className="flex flex-row md:flex-col items-center gap-2 shrink-0" style={{ borderLeft: '1px solid var(--neutral-100)', paddingLeft: '1rem' }}>
                                <button onClick={() => { setSelectedActivity(activity); setIsModalOpen(true) }}
                                   className="w-10 h-10 rounded-lg flex items-center justify-center transition-all" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
                                   <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => setDeleteId(activity.id)}
                                   className="w-10 h-10 rounded-lg flex items-center justify-center transition-all" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
                                   <Trash2 className="w-4 h-4" />
                                </button>
                             </div>
                          </motion.div>
                       )
                    })}
                 </div>
              )}
           </AnimatePresence>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6" style={{ borderTop: '1px solid var(--neutral-200)' }}>
           {[
              { label: 'Total Aktivitas', val: activities.length },
              { label: 'Langkah', val: activities.length * 3 },
              { label: 'Integritas', val: '99.8%' },
              { label: 'Status', val: 'Aktif' },
           ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                 <span className="text-[10px] font-bold uppercase tracking-wider mb-1 font-heading" style={{ color: 'var(--neutral-400)' }}>{stat.label}</span>
                 <span className="text-xl font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>{stat.val}</span>
              </div>
           ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && <RoadmapModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleSuccess} initialData={selectedActivity} />}
        </AnimatePresence>

        {/* Delete Confirm */}
        <AnimatePresence>
           {deleteId && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                 <motion.div initial={{ opacity:0, scale: 0.95 }} animate={{ opacity:1, scale: 1 }} exit={{ opacity:0, scale: 0.95 }}
                    className="rounded-2xl p-8 max-w-sm w-full text-center shadow-xl" style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(239,68,68,0.08)' }}>
                       <Trash2 className="w-7 h-7" style={{ color: 'var(--danger)' }} />
                    </div>
                    <h3 className="text-lg font-bold font-heading mb-2" style={{ color: 'var(--neutral-900)' }}>Hapus Aktivitas?</h3>
                    <p className="text-sm font-body mb-6" style={{ color: 'var(--neutral-500)' }}>Aktivitas akan dihapus permanen dari roadmap.</p>
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
