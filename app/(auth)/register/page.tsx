'use client'

import { AuthSlider } from '@/components/auth-slider'

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full p-0 m-0">
      <AuthSlider initialMode="register" />
    </div>
  )
}
