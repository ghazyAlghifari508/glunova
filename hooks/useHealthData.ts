'use client'

import { useMemo } from 'react'
import { useUserContext } from '@/components/providers/Providers'

export function useHealthData() {
  const { 
    profile, 
    loading, 
    error, 
    monitoring_week, 
    monitoring_level: activeLevel, // Renamed internally for context
    roadmap,
    education,
    consultations,
    doctors,
    loadRoadmap,
    loadEducation,
    loadConsultations,
    loadDoctors,
    saveDailyJournal
  } = useUserContext()

  const memoizedUser = useMemo(() => (profile ? { id: profile.id } : null), [profile?.id])

  return useMemo(() => ({ 
    profile, 
    loading, 
    error,
    monitoring_week,
    activeLevel,
    user: memoizedUser,
    roadmap,
    education,
    consultations,
    doctors,
    loadRoadmap,
    loadEducation,
    loadConsultations,
    loadDoctors,
    saveDailyJournal
  }), [
    profile, loading, error, monitoring_week, activeLevel, memoizedUser,
    roadmap, education, consultations, doctors,
    loadRoadmap, loadEducation, loadConsultations, loadDoctors,
    saveDailyJournal
  ])
}
