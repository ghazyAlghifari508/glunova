/**
 * Utilitas untuk perhitungan tanggal kesehatan dan format tanggal global.
 */

export function calculateMonitoringWeek(startDate: string | Date): number {
  const start = new Date(startDate)
  const today = new Date()
  const diffInMs = today.getTime() - start.getTime()
  return Math.max(0, Math.floor(diffInMs / (7 * 24 * 60 * 60 * 1000)))
}

export function calculateMonitoringLevel(week: number): number {
  if (week <= 4) return 1
  if (week <= 12) return 2
  return 3
}

