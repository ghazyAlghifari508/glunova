'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  CheckCircle2,
  Clock,
  LucideIcon,
  Zap,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useHealthData } from '@/hooks/useHealthData'
import { upsertRoadmapProgress } from '@/services/roadmapService'
import dynamic from 'next/dynamic'

// Components - Lazy Loaded
const RoadmapHeader = dynamic(() => import('@/components/user/roadmap/RoadmapHeader').then(mod => mod.RoadmapHeader))
const CategoryFilters = dynamic(() => import('@/components/user/roadmap/CategoryFilters').then(mod => mod.CategoryFilters))
const RoadmapBoard = dynamic(() => import('@/components/user/roadmap/RoadmapBoard').then(mod => mod.RoadmapBoard))
const RoadmapSidebar = dynamic(() => import('@/components/user/roadmap/RoadmapSidebar'))
const ActivityDetailModal = dynamic(() => import('@/components/user/roadmap/activity-detail-modal').then(mod => ({ default: mod.ActivityDetailModal })))

type CategoryFilter = 'all' | 'exercise' | 'nutrition'

const statusConfig: Record<string, { label: string; icon: LucideIcon; color: string; bg: string }> = {
  not_started: { label: 'Belum Mulai', icon: Clock, color: 'text-neutral-500', bg: 'bg-neutral-100' },
  in_progress: { label: 'Sedang Jalan', icon: Zap, color: 'text-sky-600', bg: 'bg-sky-50' },
  completed: { label: 'Selesai!', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
}

const difficultyConfig: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Ringan', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  2: { label: 'Sedang', color: 'text-blue-700', bg: 'bg-blue-50' },
  3: { label: 'Menengah', color: 'text-amber-700', bg: 'bg-amber-50' },
  4: { label: 'Intensif', color: 'text-rose-700', bg: 'bg-rose-50' },
  5: { label: 'Ketat', color: 'text-purple-700', bg: 'bg-purple-50' },
}

const defaultDifficulty = { label: 'Standar', color: 'text-neutral-700', bg: 'bg-neutral-50' }

export default function RoadmapPage() {
  const { profile, loading, roadmap, education, loadRoadmap, loadEducation } = useHealthData()
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [journal, setJournal] = useState('')
  const [journalSaved, setJournalSaved] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (profile) {
      const key = `roadmap_journal_${profile.id}_${new Date().toISOString().slice(0, 10)}`
      const savedJournal = localStorage.getItem(key)
      if (savedJournal) {
        setTimeout(() => setJournal(savedJournal), 0)
      }
    }
  }, [profile])

  useEffect(() => {
    if (profile && !loading && !roadmap.loading) {
      loadRoadmap()
    }
  }, [profile, loading, roadmap.activities.length, roadmap.loading, loadRoadmap])

  const activities = roadmap.activities
  const progress = roadmap.progress
  const monitoringWeek = profile?.monitoring_week || 0

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchCategory = category === 'all' || act.category === category
      return matchCategory
    })
  }, [activities, category])

  const getActivityStatus = useCallback((id: string) => {
    const actProgress = progress.find((p) => p.activity_id === id)
    return actProgress?.status || 'not_started'
  }, [progress])

  const handleComplete = async (activityId: string) => {
    if (!profile) return
    try {
      const existingProg = progress.find((p) => p.activity_id === activityId)
      if (existingProg?.status === 'completed') return

      await upsertRoadmapProgress({
        user_id: profile.id,
        activity_id: activityId,
        status: 'completed',
        completion_date: new Date().toISOString(),
        streak_count: (existingProg?.streak_count || 0) + 1,
        last_completed_date: new Date().toISOString().split('T')[0],
      })
      
      await loadRoadmap(true)
      toast({ title: 'Aktivitas selesai!', description: 'Bagus, pencatatan medis diperbarui.' })
    } catch (error) {
      toast({ title: 'Oops!', description: 'Gagal memperbarui aktivitas.', variant: 'destructive' })
    }
  }

  const handleSaveJournal = async () => {
    if (!profile) return
    try {
      // Assuming saveDailyJournal is now part of the roadmap object or a separate service
      // If useHealthData provides a saveDailyJournal, it should be destructured from there.
      // For now, keeping the local storage fallback as the primary action if not provided.
      const key = `roadmap_journal_${profile.id}_${new Date().toISOString().slice(0, 10)}`
      localStorage.setItem(key, journal)
      setJournalSaved(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
      toast({ title: 'Jurnal disimpan (Lokal)', description: 'Tersimpan sementara karena kendala server.' })
    } catch (error) {
      const key = `roadmap_journal_${profile.id}_${new Date().toISOString().slice(0, 10)}`
      localStorage.setItem(key, journal)
      setJournalSaved(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
      toast({ title: 'Jurnal disimpan (Lokal)', description: 'Tersimpan sementara karena kendala server.' })
    }
  }

  if ((loading || roadmap.loading) && roadmap.activities.length === 0) {
    return (
      <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
        {/* Hero Skeleton */}
        <div className="w-full pt-10 md:pt-14 pb-4">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-8 gap-6">
              <div className="space-y-6 w-full max-w-3xl">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-12 md:h-16 w-full max-w-lg rounded-xl" />
                  <Skeleton className="h-12 md:h-16 w-full max-w-sm rounded-xl" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-32 rounded-full" />
                  <Skeleton className="h-8 w-32 rounded-full" />
                </div>
                <Skeleton className="h-6 w-full max-w-xl rounded-lg" />
              </div>
              <Skeleton className="h-32 w-full lg:w-96 rounded-xl shrink-0" />
            </div>
          </div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 -mt-8 relative z-30 mb-12">
          <Skeleton className="h-24 w-full rounded-[28px] border border-neutral-200 bg-white" />
        </div>

        {/* Grid Skeletons */}
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[32px] border border-neutral-100 p-8 h-[400px] flex flex-col gap-8">
              <div className="flex justify-between items-end">
                <div>
                   <Skeleton className="h-6 w-32 rounded-lg mb-3" />
                   <Skeleton className="h-10 w-64 rounded-xl" />
                </div>
                <Skeleton className="h-12 w-40 rounded-2xl" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                 <Skeleton className="w-full h-full rounded-[24px]" />
                 <Skeleton className="w-full h-full rounded-[24px]" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <Skeleton className="h-[300px] w-full rounded-[32px]" />
            <Skeleton className="h-[300px] w-full rounded-[40px]" style={{ background: 'var(--neutral-200)' }} />
          </div>
        </div>
      </div>
    )
  }

  const todayLabel = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })
  const activitiesToCount = activities
  const categoryCounts = {
    all: activitiesToCount.length,
    exercise: activitiesToCount.filter(a => a.category === 'exercise').length,
    nutrition: activitiesToCount.filter(a => a.category === 'nutrition').length
  }
  
  // Create a 5-week sliding window centered on the current monitoring week
  const startWeek = Math.max(1, monitoringWeek - 2)
  const timelineWeeks = Array.from({length: 5}, (_, i) => startWeek + i).filter(w => w <= 40)
  
  const completedCount = progress.filter(p => p.status === 'completed' && activities.some(a => a.id === p.activity_id)).length
  const maxStreak = progress.length > 0 ? Math.max(...progress.map(p => p.streak_count || 0)) : 0

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
      <RoadmapHeader 
        progress={progress} 
        activities={activities}
      />
      
      <CategoryFilters 
        category={category}
        setCategory={setCategory}
        categoryTabs={[
          { key: 'all', label: 'Semua Protokol' },
          { key: 'exercise', label: 'Aktivitas Fisik' },
          { key: 'nutrition', label: 'Diet & Nutrisi' }
        ]}
        categoryCounts={categoryCounts}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
           <RoadmapBoard 
              filteredActivities={filteredActivities}
              todayLabel={todayLabel}
              getActivityStatus={getActivityStatus}
              statusConfig={statusConfig}
              difficultyConfig={difficultyConfig}
              defaultDifficulty={defaultDifficulty}
              setSelectedActivity={setSelectedActivity}
              setIsModalOpen={setIsModalOpen}
              handleComplete={handleComplete}
           />
        </div>
        
        <div className="lg:col-span-1">
           <RoadmapSidebar 
             monitoringWeek={monitoringWeek}
             timelineWeeks={timelineWeeks}
             journal={journal}
             setJournal={setJournal}
             handleSaveJournal={handleSaveJournal}
             journalSaved={journalSaved}
             completedCount={completedCount}
             activitiesCount={activities.length}
             streakDays={maxStreak}
           />
        </div>
      </div>

      <ActivityDetailModal
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={async (id) => {
          await handleComplete(id)
          setIsModalOpen(false)
        }}
        status={selectedActivity ? getActivityStatus(selectedActivity.id) : 'not_started'}
        isLoading={roadmap.loading}
      />
    </div>
  )
}


