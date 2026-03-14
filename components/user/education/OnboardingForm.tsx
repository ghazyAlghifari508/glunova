'use client'

import React, { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Activity, Heart, CheckCircle2, ArrowRight, ArrowLeft, Target, Scale, ShieldCheck } from 'lucide-react'
import { UserStatus } from '@/types/education'
import { cn } from '@/lib/utils'

export interface OnboardingFormData {
  status: UserStatus
  monitoringMonth?: number
  monitoringWeek?: number
  monitoringTargetDate?: Date
  weight?: number
  height?: number
  currentDay: number
}

interface OnboardingFormProps {
  onComplete: (data: OnboardingFormData) => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<UserStatus | null>(null)
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  // targetHba1c is visual only for the wizard step
  const [targetHba1c, setTargetHba1c] = useState<string>('')

  const totalSteps = 3

  const steps = useMemo(() => ([
    { id: 1, title: 'Kondisi Kesehatan', desc: 'Pilih tipe perjalanan Anda', icon: ShieldCheck },
    { id: 2, title: 'Metrik Fisik', desc: 'Berat & tinggi badan', icon: Scale },
    { id: 3, title: 'Target Personal', desc: 'Tentukan tujuan Anda', icon: Target }
  ]), [])

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleComplete = () => {
    if (!status) return

    onComplete({
      status, // 'berisiko' maps to Prediabetes, 'terdiagnosis' maps to Diabetes for DB constraints
      weight: weight ? parseFloat(weight) : undefined,
      height: height ? parseFloat(height) : undefined,
      currentDay: 1 // Default start day
    })
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return status !== null
      case 2:
        return weight.trim() !== '' && height.trim() !== ''
      case 3:
        return targetHba1c.trim() !== ''
      default:
        return false
    }
  }

  return (
    <div className="w-full flex min-h-screen bg-white">
      {/* LEFT: CONTENT & FORM PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 px-6 sm:px-12 md:px-20 py-12 justify-between overflow-y-auto">
        
        {/* Top Logo & Standard Header */}
        <div className="flex items-center gap-3 mb-10 shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[color:var(--primary-700)] shadow-md">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-heading font-bold text-[color:var(--neutral-900)]">
            Glunova
          </span>
        </div>

        <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-10">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-[color:var(--neutral-900)] mb-3 tracking-tight">Kondisi Kesehatan</h2>
                  <p className="text-[color:var(--neutral-500)] text-base">Pilih profil yang paling sesuai agar Glunova dapat memberikan rekomendasi yang akurat.</p>
                </div>

                <RadioGroup
                  value={status || ''}
                  onValueChange={(value: string) => setStatus(value as UserStatus)}
                  className="space-y-4"
                >
                  <label
                    htmlFor="berisiko"
                    className={cn(
                      'flex items-center gap-5 p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.01]',
                      status === 'berisiko' ? 'border-[color:var(--primary-700)] bg-[color:var(--primary-50)]' : 'border-[color:var(--neutral-200)] hover:border-[color:var(--neutral-300)]'
                    )}
                  >
                    <RadioGroupItem value="berisiko" id="berisiko" className="sr-only" />
                    <div className={cn(
                      'w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors',
                      status === 'berisiko' ? 'bg-[color:var(--primary-700)] text-white' : 'bg-[color:var(--neutral-100)] text-[color:var(--neutral-400)]'
                    )}>
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-[color:var(--neutral-900)]">Prediabetes & Pencegahan</p>
                      <p className="text-sm text-[color:var(--neutral-500)] mt-1">Fokus pada nutrisi dan olahraga untuk mencegah diabetes tipe 2.</p>
                    </div>
                  </label>

                  <label
                    htmlFor="terdiagnosis"
                    className={cn(
                      'flex items-center gap-5 p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.01]',
                      status === 'terdiagnosis' ? 'border-[color:var(--primary-700)] bg-[color:var(--primary-50)]' : 'border-[color:var(--neutral-200)] hover:border-[color:var(--neutral-300)]'
                    )}
                  >
                    <RadioGroupItem value="terdiagnosis" id="terdiagnosis" className="sr-only" />
                    <div className={cn(
                      'w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors',
                      status === 'terdiagnosis' ? 'bg-[color:var(--primary-700)] text-white' : 'bg-[color:var(--neutral-100)] text-[color:var(--neutral-400)]'
                    )}>
                      <Activity className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-[color:var(--neutral-900)]">Pengelolaan Diabetes</p>
                      <p className="text-sm text-[color:var(--neutral-500)] mt-1">Pantau HbA1c, gula darah harian, dan kontrol nutrisi yang presisi.</p>
                    </div>
                  </label>
                </RadioGroup>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-10">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-[color:var(--neutral-900)] mb-3 tracking-tight">Metrik Fisik</h2>
                  <p className="text-[color:var(--neutral-500)] text-base">Digunakan oleh AI Glunova untuk menghitung target kalori dan BMI Anda secara real-time.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-[color:var(--neutral-700)]">Berat Badan (kg)</Label>
                    <div className="relative">
                      <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--neutral-400)]" />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Contoh: 65.5"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[color:var(--neutral-200)] focus:border-[color:var(--primary-500)] outline-none bg-[color:var(--neutral-50)] focus:bg-white transition-all font-medium text-[color:var(--neutral-900)]"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-[color:var(--neutral-700)]">Tinggi Badan (cm)</Label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--neutral-400)]" />
                      <input
                        type="number"
                        placeholder="Contoh: 168"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[color:var(--neutral-200)] focus:border-[color:var(--primary-500)] outline-none bg-[color:var(--neutral-50)] focus:bg-white transition-all font-medium text-[color:var(--neutral-900)]"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-[color:var(--warning-bg)] border border-[color:var(--warning)]/20 flex gap-3 mt-4">
                    <CheckCircle2 className="w-5 h-5 text-[color:var(--warning)] shrink-0 mt-0.5" />
                    <p className="text-sm text-[color:var(--neutral-700)]">Data ini dijaga privasinya dan hanya digunakan untuk perhitungan kesehatan medis dasar (BMI & BMR).</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-10">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-[color:var(--neutral-900)] mb-3 tracking-tight">Target Personal</h2>
                  <p className="text-[color:var(--neutral-500)] text-base">Satu langkah lagi! Tentukan target kesehatan Anda bersama Glunova.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-[color:var(--neutral-700)]">Target Level HbA1c (%)</Label>
                    <div className="relative">
                      <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--neutral-400)]" />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Contoh: 5.8 (Normal) atau <7.0"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[color:var(--neutral-200)] focus:border-[color:var(--primary-500)] outline-none bg-[color:var(--neutral-50)] focus:bg-white transition-all font-medium text-[color:var(--neutral-900)]"
                        value={targetHba1c}
                        onChange={(e) => setTargetHba1c(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-2xl border border-[color:var(--neutral-100)] shadow-sm bg-gradient-to-br from-[color:var(--primary-50)] to-white mt-8 text-center">
                    <div className="w-16 h-16 bg-[color:var(--primary-700)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[color:var(--primary-700)]/30">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-[color:var(--neutral-900)] mb-2">Semua Sudah Siap!</h3>
                    <p className="text-[color:var(--neutral-500)] text-sm">Ketuk selesaikan untuk memulai monitoring dashboard Anda sekarang.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="w-full max-w-md mx-auto shrink-0 mt-12">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {steps.map((s) => (
              <div
                key={s.id}
                className={cn(
                  'h-2 flex-1 rounded-full transition-colors duration-300',
                  step >= s.id ? 'bg-[color:var(--primary-700)]' : 'bg-[color:var(--neutral-200)]'
                )}
              />
            ))}
          </div>

          <div className="flex gap-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-1/3 h-14 rounded-2xl border-2 border-[color:var(--neutral-200)] font-bold text-[color:var(--neutral-700)] hover:bg-[color:var(--neutral-50)] transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Button>
            )}

            <Button
              onClick={step < totalSteps ? handleNext : handleComplete}
              disabled={!canProceed()}
              className={cn(
                "h-14 rounded-2xl font-bold text-white shadow-lg shadow-[color:var(--primary-700)]/20 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100",
                step > 1 ? "w-2/3" : "w-full",
                step === totalSteps ? "bg-[color:var(--primary-900)] hover:bg-[color:var(--primary-950)]" : "bg-[color:var(--primary-700)] hover:bg-[color:var(--primary-800)]"
              )}
            >
              {step < totalSteps ? 'Lanjutkan' : 'Selesaikan'}
              {step < totalSteps && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT: PHOTO PANEL (SPLIT SCREEN) */}
      <div className="hidden lg:flex w-1/2 relative bg-[color:var(--neutral-900)] overflow-hidden items-end p-16">
        <Image 
          src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200"
          alt="Healthy lifestyle medical"
          fill
          className="object-cover opacity-70 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="relative z-10 w-full max-w-lg mb-12">
          {/* Animated Steps visualizer on right panel */}
          <div className="space-y-8">
            {steps.map((s) => {
              const Icon = s.icon
              const isActive = step === s.id
              const isPast = step > s.id
              
              return (
                <div key={s.id} className={cn(
                  "flex items-center gap-6 transition-all duration-500",
                  isActive ? "opacity-100 translate-x-4" : (isPast ? "opacity-60" : "opacity-30")
                )}>
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 backdrop-blur-md border",
                    isActive ? "bg-[color:var(--primary-700)] border-[color:var(--primary-500)] text-white shadow-lg shadow-[color:var(--primary-700)]/50 scale-110" : "bg-white/10 border-white/20 text-white"
                  )}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">{s.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

