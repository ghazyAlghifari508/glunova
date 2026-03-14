'use client'

import React, { useState, useEffect } from 'react'
import {
  Eye,
  EyeOff,
  User,
  Loader2,
  Lock,
  ArrowLeft,
  Users,
  XCircle,
  Activity,
  Heart,
  Shield,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface AuthSliderProps {
  initialMode?: 'login' | 'register'
}

export function AuthSlider({ initialMode = 'login' }: AuthSliderProps) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'register')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    setTimeout(() => setFormVisible(true), 100)
  }, [])

  const toggleMode = (mode: 'login' | 'register') => {
    setFormVisible(false)
    setTimeout(() => {
      setIsSignUp(mode === 'register')
      router.replace(`/${mode}`, { scroll: false })
      setError(null)
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: ''
      })
      setFormVisible(true)
    }, 300)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const normalizedEmail = formData.email.trim().toLowerCase()

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Kata sandi tidak cocok')
        }
        if (!formData.username) {
          throw new Error('Username wajib diisi')
        }

        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password: formData.password,
          options: {
            data: {
              name: formData.fullName || formData.username,
              username: formData.username,
              full_name: formData.fullName || formData.username,
              role: 'user',
            }
          }
        })
        if (error) throw new Error(error.message || 'Gagal mendaftar')

        if (data.session) {
          window.location.href = '/dashboard'
        } else {
          setNeedsConfirmation(true)
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: formData.password,
        })
        if (error) throw new Error(error.message || 'Email atau kata sandi salah')

        const role = data.user?.user_metadata?.role
        if (role === 'admin') {
          window.location.href = '/admin/dashboard'
          return
        } else if (role === 'doctor') {
          window.location.href = '/doctor'
          return
        } else if (role === 'doctor_pending') {
          window.location.href = '/register-doctor/pending'
          return
        }

        window.location.href = '/dashboard'
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="w-full flex min-h-screen bg-white">
      {/* LEFT: FORM PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 px-6 sm:px-12 md:px-20 py-12 lg:py-16 justify-center overflow-y-auto">
        <div className={`max-w-md w-full mx-auto transition-all duration-500 ease-out ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--neutral-500)] hover:text-[color:var(--primary-700)] transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[color:var(--neutral-900)] mb-3 tracking-tight">
              {isSignUp ? 'Daftar Baru' : 'Selamat Datang'}
            </h1>
            <p className="text-[color:var(--neutral-500)] text-lg">
              {isSignUp ? 'Mulai kelola diabetes Anda bersama Glunova AI.' : 'Masuk untuk memantau tren gula darah Anda hari ini.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm flex items-start gap-3 bg-[color:var(--danger-bg)] text-[color:var(--danger)] border border-[color:var(--danger)]/10">
              <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {needsConfirmation ? (
            <div className="text-center py-10 space-y-6 bg-[color:var(--neutral-50)] rounded-3xl p-8 border border-[color:var(--neutral-100)]">
              <div className="w-20 h-20 bg-[color:var(--success-bg)] rounded-2xl mx-auto flex items-center justify-center">
                <Activity className="w-10 h-10 text-[color:var(--success)]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[color:var(--neutral-900)] mb-2">Verifikasi Email Anda</h3>
                <p className="text-[color:var(--neutral-500)] text-sm">
                  Tautan aktivasi telah dikirim ke <span className="font-bold text-[color:var(--primary-700)]">{formData.email}</span>. Silakan periksa inbox atau folder spam Anda.
                </p>
              </div>
              <Button onClick={() => { setNeedsConfirmation(false); setIsSignUp(false); router.replace('/login'); }} className="w-full bg-[color:var(--primary-700)] hover:bg-[color:var(--primary-800)] text-white font-bold h-14 rounded-2xl">
                Kembali ke Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-5">
              
              {isSignUp && (
                <div className="relative group">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.username ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--neutral-400)]'}`} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[color:var(--neutral-200)] focus:border-[color:var(--primary-500)] outline-none bg-[color:var(--neutral-50)] focus:bg-white transition-all font-medium text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-400)]"
                  />
                </div>
              )}

              <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.email ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--neutral-400)]'}`}>
                  <span className="text-lg font-bold">@</span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Alamat Email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[color:var(--neutral-200)] focus:border-[color:var(--primary-500)] outline-none bg-[color:var(--neutral-50)] focus:bg-white transition-all font-medium text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-400)]"
                />
              </div>

              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.password ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--neutral-400)]'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Kata Sandi"
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-[color:var(--neutral-200)] focus:border-[color:var(--primary-500)] outline-none bg-[color:var(--neutral-50)] focus:bg-white transition-all font-medium text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-400)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--neutral-400)] hover:text-[color:var(--neutral-600)] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {isSignUp && (
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.confirmPassword ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--neutral-400)]'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Konfirmasi Kata Sandi"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[color:var(--neutral-200)] focus:border-[color:var(--primary-500)] outline-none bg-[color:var(--neutral-50)] focus:bg-white transition-all font-medium text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-400)]"
                  />
                </div>
              )}

              {!isSignUp && (
                <div className="flex justify-end pt-2">
                  <button type="button" className="text-sm font-bold text-[color:var(--primary-700)] hover:text-[color:var(--primary-900)] transition-colors">
                    Lupa Kata Sandi?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-4 rounded-2xl bg-[color:var(--primary-700)] hover:bg-[color:var(--primary-800)] text-white font-bold text-lg shadow-lg shadow-[color:var(--primary-700)]/20 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : isSignUp ? 'Daftar Sekarang' : 'Masuk Dashboard'}
              </Button>
            </form>
          )}

          {/* Social Auth & Switcher */}
          {!needsConfirmation && (
            <div className="mt-8 pt-8 border-t border-[color:var(--neutral-200)] space-y-6">
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  setLoading(true)
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: 'google',
                      options: { redirectTo: `${window.location.origin}/auth/callback` }
                    })
                    if (error) throw error
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Google login failed')
                    setLoading(false)
                  }
                }}
                disabled={loading}
                className="w-full h-14 rounded-2xl border-2 border-[color:var(--neutral-200)] bg-white text-[color:var(--neutral-700)] font-bold text-base hover:bg-[color:var(--neutral-50)] transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                </svg>
                Lanjutkan dengan Google
              </Button>

              <div className="flex flex-col gap-4 text-center">
                <p className="text-[color:var(--neutral-500)] font-medium">
                  {isSignUp ? 'Sudah punya akun?' : 'Belum bergabung?'} {' '}
                  <button onClick={() => toggleMode(isSignUp ? 'login' : 'register')} className="font-bold text-[color:var(--primary-700)] hover:text-[color:var(--primary-900)] transition-colors">
                    {isSignUp ? 'Masuk di sini' : 'Daftar sekarang'}
                  </button>
                </p>

                <Link href="/register-doctor" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[color:var(--neutral-500)] hover:text-[color:var(--neutral-900)] transition-colors mt-2">
                  <Users className="w-4 h-4" /> Daftar sebagai Dokter Spesialis
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: PHOTO PANEL (SPLIT SCREEN) */}
      <div className="hidden lg:flex w-1/2 relative bg-[color:var(--primary-900)] overflow-hidden items-end p-16">
        <Image 
          src={isSignUp ? "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" : "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200"}
          alt="Medical professional background"
          fill
          className="object-cover opacity-80 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary-900)] via-[color:var(--primary-900)]/60 to-transparent" />
        
        <div className="relative z-10 max-w-lg mb-12">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-8">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            {isSignUp ? 'Langkah Pertama Menuju Kontrol Gula Darah Penuh.' : 'Senang Melihamu Kembali di Glunova.'}
          </h2>
          <p className="text-[color:var(--primary-100)] text-lg leading-relaxed">
            {isSignUp ? 'Bergabunglah dengan ribuan pasien yang menggunakan AI untuk panduan nutrisi harian yang tepat.' : 'Lanjutkan memantau tren HbA1c dan asupan makanan harian Anda.'}
          </p>
          
          <div className="flex items-center gap-8 mt-10">
            <div>
              <p className="text-white font-bold text-3xl">10k+</p>
              <p className="text-white text-sm">Pasien Terhubung</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="text-white font-bold text-3xl">24/7</p>
              <p className="text-white text-sm">Akses AI Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
