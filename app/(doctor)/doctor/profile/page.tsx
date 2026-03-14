'use client'

import { useEffect, useState } from 'react'
import { upsertDoctorProfile } from '@/services/doctorService'
import { useAuth } from '@/hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { Save, User, Stethoscope, DollarSign, Briefcase, Camera, ShieldCheck, BadgeCheck } from 'lucide-react'
import { SPECIALIZATIONS } from '@/types/doctor'
import { useDoctorContext } from '@/components/providers/Providers'
import { cn } from '@/lib/utils'

export default function DoctorProfilePage() {
  const doctorContext = useDoctorContext()
  const doc = doctorContext?.doctor
  const loading = doctorContext?.loading
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', bio: '',
    specialization: 'Umum', license_number: '', years_of_experience: 0,
    hourly_rate: 50000, profile_picture_url: '',
  })
  const [saving, setSaving] = useState(false)
  const [activeSegment, setActiveSegment] = useState('umum') // umum, profesional, finansial
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (doc) {
      setForm({
        full_name: doc.full_name || '',
        email: doc.email || user?.email || '',
        phone: doc.phone || '',
        bio: doc.bio || '',
        specialization: doc.specialization || 'Umum',
        license_number: doc.license_number || '',
        years_of_experience: doc.years_of_experience || 0,
        hourly_rate: doc.hourly_rate || 50000,
        profile_picture_url: doc.profile_picture_url || '',
      })
    } else if (user) {
      setForm(f => ({ ...f, email: user.email || '' }))
    }
  }, [doc, user])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      await upsertDoctorProfile({
        user_id: user.id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
        specialization: form.specialization,
        license_number: form.license_number,
        years_of_experience: form.years_of_experience,
        hourly_rate: form.hourly_rate,
        profile_picture_url: form.profile_picture_url,
      })

      await doctorContext?.loadDoctorData(true)
      toast({ title: 'Profil Diperbarui', description: 'Informasi medis Anda telah disimpan.' })
    } catch (error) {
      toast({ title: 'Gagal Menyimpan', description: 'Terjadi kesalahan sistem.', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  if (loading && !doc) {
    return <div className="p-10 bg-[#F8FAFC] min-h-screen"><Skeleton className="w-full h-[600px] rounded-[3rem]" /></div>
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-white font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Profile Identity Card */}
        <div className="rounded-[3rem] p-8 md:p-12 mb-10 relative overflow-hidden shadow-2xl shadow-[color:var(--primary-700)]/20" style={{ background: 'linear-gradient(135deg, var(--primary-700), var(--primary-900))' }}>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
           
           <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="relative group">
                 <div className="w-32 h-32 rounded-[2.5rem] bg-white border-4 border-white/20 overflow-hidden relative shadow-2xl">
                    {form.profile_picture_url ? (
                       <img src={form.profile_picture_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-[color:var(--primary-200)]"><User className="w-12 h-12" /></div>
                    )}
                 </div>
                 <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-[color:var(--primary-700)] rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-90">
                    <Camera className="w-5 h-5" />
                 </button>
              </div>

              <div className="text-center md:text-left flex-1">
                 <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{form.full_name || 'Atur Nama Anda'}</h1>
                    <BadgeCheck className="w-8 h-8 text-emerald-400 fill-emerald-400/10" />
                 </div>
                 <p className="text-slate-400 font-medium mb-6">{form.specialization} • STR: {form.license_number || 'Belum diatur'}</p>
                 
                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-white/60">
                       <span className="text-emerald-400 block mb-0.5">Pengalaman</span>
                       {form.years_of_experience} Tahun
                    </div>
                    <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-white/60">
                       <span className="text-emerald-400 block mb-0.5">Sesi Selesai</span>
                       {doctorContext?.earnings?.length || 0}
                    </div>
                 </div>
              </div>

              <div className="shrink-0">
                 <Button onClick={handleSave} disabled={saving} className="h-16 px-10 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-lg shadow-xl active:scale-95 transition-all">
                    <Save className="w-5 h-5 mr-3" /> {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                 </Button>
              </div>
           </div>
        </div>

        {/* Tab Selection */}
        <div className="flex overflow-x-auto gap-4 mb-8 pb-4 hide-scrollbar">
           {[
              { id: 'umum', label: 'Info Umum', icon: User },
              { id: 'profesional', label: 'Profesional', icon: Briefcase },
              { id: 'finansial', label: 'Tarif & Finansial', icon: DollarSign },
              { id: 'keamanan', label: 'Keamanan', icon: ShieldCheck },
           ].map((tab) => (
              <button 
                 key={tab.id}
                 onClick={() => setActiveSegment(tab.id)}
                 className={cn(
                    "flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-sm transition-all whitespace-nowrap border-2",
                    activeSegment === tab.id 
                       ? "bg-white border-slate-900 text-slate-900 shadow-md" 
                       : "bg-transparent border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                 )}
              >
                 <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
           ))}
        </div>

        {/* Form Sections */}
        <div className="grid grid-cols-1 gap-10">
           
           <AnimatePresence mode="wait">
              {activeSegment === 'umum' && (
                 <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
                       <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary-700)' }}><User className="w-4 h-4 text-white" /></div>
                          Detail Identitas
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap Medis</label>
                             <Input 
                                value={form.full_name} 
                                onChange={(e) => setForm({ ...form, full_name: e.target.value })} 
                                className="h-14 px-6 rounded-2xl border-slate-200 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all" 
                                placeholder="Gunakan gelar lengkap..." 
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Utama (Privat)</label>
                             <Input 
                                value={form.email} 
                                readOnly 
                                className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-100 text-slate-400 cursor-not-allowed font-medium" 
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nomor WhatsApp Aktif</label>
                             <Input 
                                value={form.phone} 
                                onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                                className="h-14 px-6 rounded-2xl border-slate-200 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all" 
                                placeholder="812xxxxxxxx" 
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">URL Gambar Profil</label>
                             <Input 
                                value={form.profile_picture_url} 
                                onChange={(e) => setForm({ ...form, profile_picture_url: e.target.value })} 
                                className="h-14 px-6 rounded-2xl border-slate-200 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all" 
                                placeholder="https://unsplash..." 
                             />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Biografi & Pengalaman Singkat</label>
                             <textarea 
                                value={form.bio} 
                                onChange={(e) => setForm({ ...form, bio: e.target.value })} 
                                maxLength={500} 
                                className="w-full h-40 px-6 py-4 rounded-[2rem] border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all resize-none" 
                                placeholder="Tuliskan pengalaman Anda secara singkat namun profesional..." 
                             />
                             <div className="flex justify-end pr-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {form.bio.length} / 500
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
              )}

              {activeSegment === 'profesional' && (
                 <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
                       <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center"><Stethoscope className="w-4 h-4 text-white" /></div>
                          Kredensial Medis
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Spesialisasi Utama</label>
                             <select 
                                value={form.specialization} 
                                onChange={(e) => setForm({ ...form, specialization: e.target.value })} 
                                className="w-full h-14 px-6 rounded-2xl border-slate-200 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all appearance-none"
                             >
                                {SPECIALIZATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nomor STR (Lisensi)</label>
                             <Input 
                                value={form.license_number} 
                                onChange={(e) => setForm({ ...form, license_number: e.target.value })} 
                                className="h-14 px-6 rounded-2xl border-slate-200 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all" 
                                placeholder="STR-993-XXXX" 
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tahun Pengalaman</label>
                             <Input 
                                type="number" 
                                value={form.years_of_experience} 
                                onChange={(e) => setForm({ ...form, years_of_experience: Number(e.target.value) })} 
                                className="h-14 px-6 rounded-2xl border-slate-200 bg-slate-50 font-bold focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all" 
                                min={0} 
                             />
                          </div>
                       </div>
                    </div>
                 </motion.div>
              )}

              {activeSegment === 'finansial' && (
                 <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
                       <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><DollarSign className="w-4 h-4 text-white" /></div>
                          Tarif & Pembayaran
                       </h3>
                       <div className="max-w-md space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tarif Per Sesi Konsultasi (IDR)</label>
                          <div className="relative">
                             <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 underline underline-offset-4 decoration-slate-200">Rp</span>
                             <Input 
                                type="number" 
                                value={form.hourly_rate} 
                                onChange={(e) => setForm({ ...form, hourly_rate: Number(e.target.value) })} 
                                className="h-16 pl-16 pr-6 rounded-2xl border-slate-200 bg-slate-50 text-2xl font-black tracking-tighter focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all" 
                                step={5000} 
                             />
                          </div>
                          <p className="text-xs text-slate-400 font-bold px-2 mt-2">Tarif yang Anda tetapkan akan ditampilkan di profil publik sesuai dengan spesialisasi Anda.</p>
                       </div>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>

        </div>

      </div>
    </div>
  )
}
