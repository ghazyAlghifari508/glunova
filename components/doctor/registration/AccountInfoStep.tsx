'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

interface AccountInfoStepProps {
  formData: any
  setFormData: (data: any) => void
}

export function AccountInfoStep({ formData, setFormData }: AccountInfoStepProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nama Lengkap *</Label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[color:var(--primary-700)] transition-colors" />
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Dr. Nama Lengkap"
            className="pl-12 h-14 rounded-2xl border-2"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Alamat Email *</Label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[color:var(--primary-700)] transition-colors" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@anda.com"
            className="pl-12 h-14 rounded-2xl border-2"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username *</Label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[color:var(--primary-700)] transition-colors" />
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username_dokter"
            className="pl-12 h-14 rounded-2xl border-2"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Kata Sandi *</Label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[color:var(--primary-700)] transition-colors" />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimal 6 karakter"
            className="pl-12 pr-12 h-14 rounded-2xl border-2"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi *</Label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[color:var(--primary-700)] transition-colors" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Ulangi kata sandi"
            className="pl-12 h-14 rounded-2xl border-2"
            required
          />
        </div>
      </div>
    </div>
  )
}
