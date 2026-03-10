'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DoctorRegistrationModal } from '@/components/doctor/registration/DoctorRegistrationModal'
import { Stethoscope } from 'lucide-react'

export interface DoctorRegistrationButtonProps {
  userRole?: string | null
  isLoggedIn: boolean
}

export function DoctorRegistrationButton({ userRole, isLoggedIn }: DoctorRegistrationButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isLoggedIn || userRole === 'doctor' || userRole === 'admin') {
    return null
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-lg px-4 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold text-[13px]"
        style={{
          background: 'var(--primary-50)',
          color: 'var(--primary-700)',
          border: '1px solid var(--primary-100)',
        }}
        size="sm"
      >
        <Stethoscope size={15} className="mr-1.5" />
        Jadi Dokter
      </Button>

      <DoctorRegistrationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
