'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PersonalInfoStep } from '@/components/doctor/registration/PersonalInfoStep'
import { ProfessionalInfoStep } from '@/components/doctor/registration/ProfessionalInfoStep'
import { StepIndicator } from '@/components/doctor/registration/StepIndicator'
import { DoctorRegistrationFormData } from '@/types/doctor'
import { submitDoctorRegistration } from '@/services/doctorRegistrationService'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/ui/use-toast'
import { CheckCircle2, Clock, Loader2, ArrowLeft, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterDoctorPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<DoctorRegistrationFormData>({
    fullName: '',
    phone: '',
    bio: '',
    profilePicture: null,
    specialization: '',
    licenseNumber: '',
    yearsOfExperience: '',
    hourlyRate: '',
    certification: null,
    acceptTerms: false
  })

  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!formData.specialization || !formData.licenseNumber || !formData.hourlyRate) {
      toast({ title: 'Mohon lengkapi data wajib', variant: 'destructive' })
      return
    }

    if (!formData.acceptTerms) {
      toast({ title: 'Mohon setujui syarat & ketentuan', variant: 'destructive' })
      return
    }

    const { data: { user: currentUser } } = await supabase.auth.getUser()

    if (!currentUser) {
      toast({
        title: 'Sesi habis',
        description: 'Silakan login terlebih dahulu sebagai user biasa.',
        variant: 'destructive'
      })
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      await submitDoctorRegistration(currentUser.id, formData)
      setSubmitted(true)

      toast({
        title: '🎉 Pendaftaran Terkirim!',
        description: 'Tim kami akan mereview aplikasi Anda dalam 1-3 hari kerja.'
      })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan sistem.'

      toast({
        title: 'Gagal Mendaftar',
        description: errorMessage,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: 'var(--neutral-50)' }}
    >
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(26,86,219,0.04)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[120px] -mr-48 -mb-48"
          style={{ background: 'rgba(63,131,248,0.05)' }}
        />
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full blur-[100px] -ml-36"
          style={{ background: 'rgba(26,86,219,0.04)' }}
        />
      </div>

      <div className="w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: 'var(--white)',
          border: '1px solid var(--neutral-200)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
        }}
      >
        {!submitted ? (
          <>
            {/* Header */}
            <div className="p-8 sm:p-10 pb-4" style={{ borderBottom: '1px solid var(--neutral-100)' }}>
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/login"
                  className="p-3 rounded-xl transition-all"
                  style={{ background: 'var(--neutral-50)', color: 'var(--neutral-400)' }}
                >
                  <ArrowLeft size={20} />
                </Link>
                <div className="w-10" />
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight"
                  style={{ color: 'var(--neutral-900)' }}
                >
                  Daftar Jadi Dokter
                </h1>
                <p className="font-medium" style={{ color: 'var(--neutral-500)' }}>
                  Bergabunglah dengan ekosistem medis Glunova
                </p>
              </div>

              <div className="mt-10 max-w-md mx-auto">
                <StepIndicator currentStep={step} totalSteps={2} />
              </div>
            </div>

            {/* Body */}
            <div className="px-8 sm:px-12 py-8" style={{ background: 'var(--white)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {step === 1 && <PersonalInfoStep formData={formData} setFormData={setFormData} />}
                  {step === 2 && <ProfessionalInfoStep formData={formData} setFormData={setFormData} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3"
              style={{ background: 'var(--neutral-50)', borderTop: '1px solid var(--neutral-100)' }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--neutral-400)' }}
                >
                  Step {step} of 2
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={loading}
                    className="flex-1 sm:flex-none h-10 px-6 rounded-xl font-semibold transition-all"
                    style={{ borderColor: 'var(--neutral-200)' }}
                  >
                    Kembali
                  </Button>
                )}

                {step < 2 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!formData.fullName || !formData.phone}
                    className="flex-1 sm:flex-none h-10 px-8 rounded-xl font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50"
                    style={{ background: 'var(--primary-700)', color: 'var(--white)' }}
                  >
                    Lanjut
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 sm:flex-none h-10 px-8 rounded-xl font-semibold shadow-md transition-all active:scale-95"
                    style={{ background: 'var(--primary-900)', color: 'var(--white)' }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Memproses...
                      </>
                    ) : 'Kirim Pendaftaran'}
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <div className="p-12 text-center" style={{ background: 'var(--white)' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))',
                boxShadow: '0 16px 40px rgba(26,86,219,0.2)',
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-3xl font-heading font-bold mb-3 tracking-tight"
              style={{ color: 'var(--neutral-900)' }}
            >
              Pendaftaran Berhasil! 🎉
            </h2>
            <p className="font-medium mb-8 max-w-sm mx-auto"
              style={{ color: 'var(--neutral-500)' }}
            >
              Tim medis Glunova akan meninjau data Anda dalam waktu 1-3 hari kerja. Anda akan menerima notifikasi via email.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
              <div className="p-6 rounded-2xl"
                style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-100)' }}
              >
                <Clock className="w-6 h-6 mb-3" style={{ color: 'var(--warning)' }} />
                <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--neutral-900)' }}>Status Review</h4>
                <p className="text-xs" style={{ color: 'var(--neutral-500)' }}>
                  Pendaftaran Anda sedang dalam antrean verifikasi.
                </p>
              </div>
              <div className="p-6 rounded-2xl"
                style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-100)' }}
              >
                <CheckCircle2 className="w-6 h-6 mb-3" style={{ color: 'var(--success)' }} />
                <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--neutral-900)' }}>Langkah Terakhir</h4>
                <p className="text-xs" style={{ color: 'var(--neutral-500)' }}>
                  Akun Anda akan otomatis beralih ke fitur Dokter.
                </p>
              </div>
            </div>

            <Button
              onClick={() => router.push('/dashboard')}
              className="w-full h-14 rounded-2xl font-semibold transition-all"
              style={{ background: 'var(--primary-900)', color: 'var(--white)' }}
            >
              Kembali ke Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
