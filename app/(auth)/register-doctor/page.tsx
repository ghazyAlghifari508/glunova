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
import { CheckCircle2, Clock, Loader2, ArrowLeft, Activity, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { AccountInfoStep } from '@/components/doctor/registration/AccountInfoStep'
import { useUserRole } from '@/hooks/useUserRole'
import { useUserContext } from '@/components/providers/Providers'

export default function RegisterDoctorPage() {
  const { user: initialUser, loading: authLoading } = useAuth()
  const { role, loading: roleLoading } = useUserRole()
  const { profile } = useUserContext()
  const router = useRouter()
  const { toast } = useToast()

  // Guard: Redirect if already a doctor or pending
  React.useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (role === 'doctor_pending') {
        router.replace('/register-doctor/pending')
      } else if (role === 'doctor') {
        router.replace('/doctor')
      }
    }
  }, [role, roleLoading, authLoading, router])

  const [loading, setLoading] = useState(false)
  
  // Account info (for unauthenticated users)
  const [accountData, setAccountData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

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

  // Pre-fill name from profile if available
  React.useEffect(() => {
    if (profile?.full_name && !formData.fullName) {
      setFormData(prev => ({ ...prev, fullName: profile.full_name || '' }))
    }
  }, [profile, formData.fullName])

  // Always show 3 steps for consistency
  const totalSteps = 3

  // If authenticated, start at Step 2 (skipping initial account info)
  const [step, setStep] = useState(initialUser ? 2 : 1)

  const handleSubmit = async () => {
    // Basic validation for fixed professional data
    if (!formData.specialization || !formData.licenseNumber || !formData.hourlyRate) {
      toast({ title: 'Mohon lengkapi data wajib', variant: 'destructive' })
      return
    }

    if (!formData.acceptTerms) {
      toast({ title: 'Mohon setujui syarat & ketentuan', variant: 'destructive' })
      return
    }

    setLoading(true)
    try {
      let finalUserId = initialUser?.id

      // 1. If not logged in, perform signUp
      if (!initialUser) {
        if (!accountData.email || !accountData.password || !accountData.username) {
          throw new Error('Informasi akun harus lengkap')
        }
        if (accountData.password !== accountData.confirmPassword) {
          throw new Error('Konfirmasi kata sandi tidak cocok')
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: accountData.email,
          password: accountData.password,
          options: {
            data: {
              name: formData.fullName || accountData.username,
              username: accountData.username,
              full_name: formData.fullName || accountData.username,
              role: 'doctor_pending',
            }
          }
        })

        if (signUpError) throw signUpError
        if (!signUpData.user) throw new Error('Gagal membuat akun')
        
        finalUserId = signUpData.user.id
      }

      if (!finalUserId) throw new Error('ID User tidak ditemukan')

      // 2. Submit the professional registration
      await submitDoctorRegistration(finalUserId, formData)
      
      // Redirect immediately to pending page as requested
      router.push('/register-doctor/pending')

      toast({
        title: '🎉 Pendaftaran Terkirim!',
        description: initialUser 
          ? 'Tim kami akan mereview aplikasi Anda dalam 1-3 hari kerja.' 
          : 'Akun Anda telah dibuat. Silakan cek email untuk verifikasi.'
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

  if (authLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-[color:var(--primary-700)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[color:var(--neutral-500)] font-medium">Menyiapkan pendaftaran...</p>
      </div>
    )
  }

  const renderStep = () => {
    // 1=Account, 2=Personal, 3=Professional
    if (step === 1) return (
      <AccountInfoStep 
        formData={{ ...accountData, fullName: formData.fullName }} 
        setFormData={(data: any) => {
          const { fullName, ...rest } = data
          setAccountData(rest)
          if (fullName !== undefined) setFormData(prev => ({ ...prev, fullName }))
        }} 
      />
    )
    if (step === 2) return <PersonalInfoStep formData={formData} setFormData={setFormData} />
    if (step === 3) return <ProfessionalInfoStep formData={formData} setFormData={setFormData} />
    return null
  }

  const canContinue = () => {
    if (step === 1) return accountData.email && accountData.username && accountData.password && accountData.password.length >= 6 && formData.fullName
    if (step === 2) return formData.fullName && formData.phone
    return true
  }

  return (
    <div className="w-full flex min-h-screen lg:h-screen lg:overflow-hidden bg-white font-body selection:bg-primary-300 selection:text-white">
      {/* LEFT: FORM PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-20 px-6 sm:px-12 md:px-16 py-8 lg:py-12 justify-between overflow-y-auto">
        
        {/* Top bar */}
        <div className="w-full max-w-xl mx-auto flex items-center justify-between mb-8 shrink-0">
          <Link
            href={initialUser ? "/dashboard" : "/login"}
            className="p-3 rounded-2xl bg-[color:var(--neutral-50)] text-[color:var(--neutral-500)] hover:text-[color:var(--primary-700)] hover:bg-[color:var(--primary-50)] transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="text-sm font-bold tracking-widest uppercase text-[color:var(--neutral-400)]">
            Langkah {step} dari {totalSteps}
          </div>
        </div>

        <div className="max-w-xl w-full mx-auto flex-1 flex flex-col justify-center relative z-30">
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[color:var(--neutral-900)] mb-3 tracking-tight font-heading">
              Daftarkan Praktik Anda
            </h1>
            <p className="text-[color:var(--neutral-500)] text-base">
              Bergabunglah dengan ekosistem medis Glunova dan bantu jutaan pasien mengelola diabetes mereka secara presisi.
            </p>
          </div>

          <div className="mb-10">
            <StepIndicator currentStep={step} totalSteps={totalSteps} />
          </div>

          <div className="bg-white rounded-3xl p-1 sm:p-2 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Form Footer Controls */}
        <div className="max-w-xl w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-[color:var(--neutral-100)] shrink-0 relative z-40">
          <div className="w-full sm:w-1/3">
            {step > (initialUser ? 2 : 1) && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={loading}
                className="w-full h-14 rounded-2xl font-bold text-base border-2 border-[color:var(--neutral-200)] text-[color:var(--neutral-700)] hover:bg-[color:var(--neutral-50)] transition-all"
              >
                Kembali
              </Button>
            )}
          </div>

          <div className="w-full sm:w-2/3">
            {step < totalSteps ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canContinue()}
                className="w-full h-14 rounded-2xl font-bold text-base bg-[color:var(--primary-700)] hover:bg-[color:var(--primary-800)] text-white shadow-lg shadow-[color:var(--primary-700)]/20 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:pointer-events-none"
              >
                Lanjutkan
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-14 rounded-2xl font-bold text-base bg-[color:var(--primary-900)] hover:bg-[color:var(--primary-950)] text-white shadow-lg shadow-[color:var(--primary-900)]/20 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Memproses...
                  </>
                ) : 'Kirim Aplikasi Pendaftaran'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: PHOTO PANEL */}
      <div className="hidden lg:flex w-1/2 relative bg-[color:var(--primary-950)] overflow-hidden items-end p-16">
        <Image 
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200"
          alt="Professional doctors"
          fill
          className="object-cover opacity-60 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary-950)] via-[color:var(--primary-950)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary-950)]/40 to-transparent" />
        
        <div className="relative z-10 max-w-lg mb-12">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-8">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4 font-heading">
            Bergabung dengan Ribuan Profesional Medis Lainnya.
          </h2>
          <p className="text-[color:var(--primary-100)] text-lg leading-relaxed mb-10">
            Jadilah bagian dari revolusi pengelolaan diabetes. Berikan konsultasi yang lebih personal dan presisi.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[color:var(--success)]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[color:var(--success)]" />
                </div>
                <p className="text-white font-bold">Pasien Aktif</p>
              </div>
              <p className="text-[color:var(--primary-200)] text-sm">Akses ke jaringan pasien diabetes terbesar.</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[color:var(--warning)]/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[color:var(--warning)]" />
                </div>
                <p className="text-white font-bold">Data Real-time</p>
              </div>
              <p className="text-[color:var(--primary-200)] text-sm">Lihat tren glukosa dan asupan harian pasien.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
