'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { EducationContent, UserProfile } from '@/types/education'

interface TodayHighlightProps {
  contents: EducationContent[]
}

export const TodayHighlight = React.memo(({ contents }: TodayHighlightProps) => {
  const router = useRouter()
  const content = contents[0]

  if (!content) return null
  
  const handleReadMore = () => {
    router.push(`/education/${content.day}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className="relative overflow-hidden rounded-2xl border border-[color:var(--primary-700)]/20 bg-[linear-gradient(145deg,#e1f4ef_0%,#f2faf7_50%,#ffffff_100%)] shadow-lg">
        <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full border border-[color:var(--primary-700)]/20" />
        <div className="pointer-events-none absolute -right-16 -top-14 h-52 w-52 rounded-full bg-[color:var(--primary-700)]/15 blur-3xl" />

        <div className="relative p-6 px-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--primary-700)]" />
              Edukasi Glunova
            </div>

            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-3xl">
              {content.title}
            </h2>
            <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
              {content.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {content.tags && content.tags.length > 0 ? (
                content.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="rounded-xl border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500">
                    #{tag.replace('#', '')}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline" className="rounded-xl border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500">
                  #EdukasiGlunova
                </Badge>
              )}
            </div>

            <Button
              size="lg"
              onClick={handleReadMore}
              className="h-10 rounded-xl bg-[color:var(--primary-700)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--primary-900)]"
            >
              Baca Panduan Lengkap
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
})

TodayHighlight.displayName = 'TodayHighlight'
