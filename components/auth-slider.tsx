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
    setTimeout(() => setFormVisible(true), 200)
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
          window.location.href = '/onboarding'
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
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', data.user?.id)
          .single()

        if (profile && !profile.onboarding_completed) {
          window.location.href = '/onboarding'
        } else {
          window.location.href = '/dashboard'
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className={`min-h-[85vh] w-full max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-xl transition-all duration-500 ease-out ${formVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] min-h-[640px]">
        {/* Left: Form */}
        <div className="p-8 md:p-12 lg:p-14 flex flex-col">
          {/* Back button */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold transition-colors group mb-6 text-xs"
            style={{ color: 'var(--neutral-400)' }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--primary-700)' }}
            >
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold" style={{ color: 'var(--neutral-900)' }}>
              Glunova
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3"
              style={{ color: 'var(--neutral-900)' }}
            >
              {isSignUp ? 'Buat Akun' : 'Selamat Datang'}
            </h1>
            <p className="text-sm md:text-base" style={{ color: 'var(--neutral-500)' }}>
              {isSignUp
                ? 'Daftar untuk mulai mengelola diabetes Anda dengan lebih cerdas.'
                : 'Masuk untuk melanjutkan pemantauan kesehatan Anda.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm flex items-start gap-3"
              style={{ background: 'var(--danger-bg)', color: 'var(--danger)', border: '1px solid rgba(224,36,36,0.1)' }}
            >
              <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {needsConfirmation ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'var(--success-bg)' }}
              >
                <Activity className="w-8 h-8" style={{ color: 'var(--success)' }} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-bold" style={{ color: 'var(--neutral-900)' }}>
                  Pendaftaran Berhasil!
                </h3>
                <p className="text-sm max-w-xs mx-auto" style={{ color: 'var(--neutral-500)' }}>
                  Silakan periksa email <span className="font-bold" style={{ color: 'var(--primary-700)' }}>{formData.email}</span> untuk memverifikasi akun Anda.
                </p>
              </div>
              <Button
                onClick={() => {
                  setNeedsConfirmation(false)
                  setIsSignUp(false)
                  router.replace('/login')
                }}
                className="font-semibold px-8 py-6 rounded-xl shadow-md"
                style={{ background: 'var(--primary-700)', color: 'var(--white)' }}
              >
                Kembali ke Login
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleAuth} className="space-y-4">
                {isSignUp && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                      style={{ color: formData.username ? 'var(--primary-700)' : 'var(--neutral-400)' }}
                    />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl outline-none transition-all text-sm"
                      style={{
                        border: '1px solid var(--neutral-200)',
                        background: 'var(--white)',
                        color: 'var(--neutral-900)',
                      }}
                    />
                  </div>
                )}

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-colors"
                    style={{ color: formData.email ? 'var(--primary-700)' : 'var(--neutral-400)' }}
                  >
                    <span className="text-lg font-bold">@</span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl outline-none transition-all text-sm"
                    style={{
                      border: '1px solid var(--neutral-200)',
                      background: 'var(--white)',
                      color: 'var(--neutral-900)',
                    }}
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                    style={{ color: formData.password ? 'var(--primary-700)' : 'var(--neutral-400)' }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Kata Sandi"
                    required
                    className="w-full pl-12 pr-12 py-4 rounded-xl outline-none transition-all text-sm"
                    style={{
                      border: '1px solid var(--neutral-200)',
                      background: 'var(--white)',
                      color: 'var(--neutral-900)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: 'var(--neutral-400)' }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {isSignUp && (
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors"
                      style={{ color: formData.confirmPassword ? 'var(--primary-700)' : 'var(--neutral-400)' }}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Konfirmasi Kata Sandi"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl outline-none transition-all text-sm"
                      style={{
                        border: '1px solid var(--neutral-200)',
                        background: 'var(--white)',
                        color: 'var(--neutral-900)',
                      }}
                    />
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between text-xs" style={{ color: 'var(--neutral-500)' }}>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" style={{ borderColor: 'var(--neutral-300)' }} />
                      Ingat saya
                    </label>
                    <button type="button" className="font-semibold hover:underline" style={{ color: 'var(--primary-700)' }}>
                      Lupa kata sandi?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 rounded-xl font-semibold text-base shadow-md transition-all active:scale-[0.98] disabled:opacity-70"
                  style={{ background: 'var(--primary-700)', color: 'var(--white)' }}
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    isSignUp ? 'Buat Akun' : 'Masuk'
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full" style={{ borderTop: '1px solid var(--neutral-100)' }}></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-4 font-semibold tracking-widest"
                    style={{ background: 'var(--white)', color: 'var(--neutral-400)' }}
                  >
                    Atau
                  </span>
                </div>
              </div>

              {/* Google OAuth */}
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  setLoading(true)
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: 'google',
                      options: {
                        redirectTo: `${window.location.origin}/auth/callback`
                      }
                    })
                    if (error) throw error
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Gagal masuk dengan Google')
                    setLoading(false)
                  }
                }}
                disabled={loading}
                className="w-full py-6 rounded-xl transition-all font-semibold flex items-center justify-center gap-3 active:scale-[0.98]"
                style={{
                  border: '1px solid var(--neutral-200)',
                  color: 'var(--neutral-700)',
                  background: 'var(--white)',
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                </svg>
                Masuk dengan Google
              </Button>

              {/* Toggle + Doctor reg */}
              <div className="mt-auto pt-8 flex flex-col gap-4">
                <div className="text-xs" style={{ color: 'var(--neutral-400)' }}>
                  {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
                  <button
                    onClick={() => toggleMode(isSignUp ? 'login' : 'register')}
                    className="font-semibold hover:underline"
                    style={{ color: 'var(--primary-700)' }}
                  >
                    {isSignUp ? 'Masuk' : 'Daftar Sekarang'}
                  </button>
                </div>

                <Link
                  href="/register-doctor"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all group"
                  style={{
                    border: '1px dashed var(--primary-200)',
                    color: 'var(--primary-700)',
                  }}
                >
                  <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Daftar sebagai Dokter</span>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Right: Brand panel */}
        <div className="hidden md:flex relative p-10 lg:p-12"
          style={{ background: 'var(--primary-900)' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_55%)]" />
          <div className="relative z-10 flex flex-col w-full">

            {/* Feature cards */}
            <div className="ml-auto w-full max-w-xs rounded-2xl p-4 mb-8"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs text-white/50 mb-3 font-semibold">Fitur Unggulan</p>
              <div className="space-y-2">
                {[
                  { icon: Activity, label: 'Pemantauan Gula Darah', color: 'var(--primary-300)' },
                  { icon: Heart, label: 'Konsultasi Dokter', color: 'var(--success)' },
                  { icon: Shield, label: 'AI Vision Scan', color: 'var(--warning)' },
                  { icon: BookOpen, label: 'Edukasi Diabetes', color: 'var(--danger)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}20` }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-xs text-white/70 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-heading font-bold leading-snug mb-4 text-white">
              Kelola diabetes Anda dengan lebih cerdas dan mudah.
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-sm">
              Satu platform untuk pemantauan gula darah, konsultasi dokter, dan edukasi diabetes berbasis AI.
            </p>

            {/* Bottom card */}
            <div className="mt-auto rounded-2xl p-6 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(63,131,248,0.2), rgba(26,86,219,0.1))',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-heading font-bold text-lg">10,000+</p>
                  <p className="text-white/50 text-xs">Pengguna aktif mengelola diabetes</p>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--primary-700)', border: '2px solid var(--primary-900)' }}
                    >
                      <Users className="w-3.5 h-3.5" style={{ color: 'var(--primary-200)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
