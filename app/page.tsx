'use server'

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-server'
import { TopNavbar } from '@/components/layout/top-navbar'
import Footer from '@/components/layout/footer'

import { Hero } from '@/components/landing-v2/Hero'
import { TrustMarquee } from '@/components/landing-v2/TrustMarquee'
import { FeaturesBento } from '@/components/landing-v2/FeaturesBento'
import { StatsCounter } from '@/components/landing-v2/StatsCounter'
import { HowItWorks } from '@/components/landing-v2/HowItWorks'
import { AppShowcase } from '@/components/landing-v2/AppShowcase'
import { Testimonials } from '@/components/landing-v2/Testimonials'
import { FAQ } from '@/components/landing-v2/FAQ'
import { ContactUs } from '@/components/landing-v2/ContactUs'

export default async function LandingPage() {
  const user = await getCurrentUser()
  if (user) {
    if (user.role === 'admin') redirect('/admin/dashboard')
    if (user.role === 'doctor') redirect('/doctor')
    if (user.role === 'doctor_pending') redirect('/register-doctor/pending')
    
    // For 'user' role, check if they have a rejected doctor registration
    const { createClient } = await import('@/lib/supabase-server')
    const supabase = await createClient()
    const { data: registration } = await supabase
      .from('doctor_registrations')
      .select('status')
      .eq('user_id', user.id)
      .single()

    if (registration?.status === 'rejected') {
      redirect('/register-doctor/pending')
    }
    
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <main>
        <Hero />
        <FeaturesBento />
        <StatsCounter />
        <HowItWorks />
       
        <AppShowcase />
         <TrustMarquee />
        <Testimonials />
        <FAQ />
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}

