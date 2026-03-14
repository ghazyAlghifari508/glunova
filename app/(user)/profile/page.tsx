'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Activity, Mail, Ruler, Scale, User, LogOut,
  Fingerprint, Shield, Heart, Loader2, Sparkles, Target, AlertTriangle
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { calculateMonitoringLevel } from '@/lib/date-utils'
import { upsertUserProfile, deleteFullAccount } from '@/services/userService'
import { UserProfile } from '@/types/education'
import { useHealthData } from '@/hooks/useHealthData'
import { useAuth } from '@/hooks/useAuth'

type ProfileTab = 'personal' | 'health' | 'security'

export default function ProfilePage() {
  const { profile, loading, saveDailyJournal } = useHealthData()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<UserProfile>>({})
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal')
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (profile) setFormData(profile)
  }, [profile])

  const deriveMonitoringData = (start?: string) => {
    if (!start) return { week: undefined, level: undefined, targetDate: '' }
    const st = new Date(start)
    if (isNaN(st.getTime())) return { week: undefined, level: undefined, targetDate: '' }
    const today = new Date()
    const diffDays = Math.floor((today.getTime() - st.getTime()) / (1000 * 60 * 60 * 24))
    const week = Math.max(1, Math.floor(diffDays / 7) + 1)
    const target = new Date(st)
    target.setDate(target.getDate() + 90) // 90 days cycle for HbA1c monitoring
    return { week, level: calculateMonitoringLevel(week), targetDate: target.toISOString().slice(0, 10) }
  }

  const derivedMonitoring = useMemo(() => deriveMonitoringData(formData.monitoring_start_date), [formData.monitoring_start_date])
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setIsSubmitting(true)
    try {
      const payload = {
        ...(profile || {}),
        ...formData,
        id: user.id,
        monitoring_target_date: derivedMonitoring.targetDate || formData.monitoring_target_date,
        monitoring_week: derivedMonitoring.week || formData.monitoring_week,
        monitoring_level: derivedMonitoring.level || formData.monitoring_level,
        updated_at: new Date().toISOString(),
      }
      await upsertUserProfile(payload)
      toast({ title: 'Profil Diperbarui', description: 'Data biometrik Anda telah tersimpan.' })
    } catch {
      toast({ title: 'Pembaruan Gagal', description: 'Gagal menyimpan perubahan.', variant: 'destructive' })
    } finally { setIsSubmitting(false) }
  }

  const handleDelete = async () => {
    if (!user) return
    if (deleteConfirmText !== 'HAPUS') {
      toast({ title: 'Otorisasi Diperlukan', description: 'Silakan ketik "HAPUS" untuk konfirmasi.', variant: 'destructive' })
      return
    }
    setIsSubmitting(true)
    try {
      await deleteFullAccount(user.id)
      await supabase.auth.signOut({ scope: 'global' })
      Object.keys(localStorage).forEach(k => k.includes('-auth-token') && localStorage.removeItem(k))
      setTimeout(() => window.location.replace('/'), 300)
    } catch {
      toast({ title: 'Gagal Menghapus', description: 'Terjadi kesalahan sistem.', variant: 'destructive' })
    } finally { setIsSubmitting(false) }
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
         <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-[color:var(--primary-600)]" />
            <p className="text-xs font-medium text-[color:var(--neutral-500)] tracking-wide">Memuat Data Profil...</p>
         </div>
      </div>
    )
  }

  if (!user) return null

  const tabs = [
    { id: 'personal' as ProfileTab, icon: User, label: 'Informasi Akun', desc: 'Identitas & status pemantauan' },
    { id: 'health' as ProfileTab, icon: Activity, label: 'Data Medis', desc: 'Biometrik & riwayat kesehatan' },
    { id: 'security' as ProfileTab, icon: Shield, label: 'Keamanan', desc: 'Sandi & penghapusan akun' },
  ]

  const Field = ({ label, type = 'text', value, onChange, icon: Icon, disabled = false, desc, placeholder, step, id, 'data-testid': testId }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[13px] font-semibold text-[color:var(--neutral-700)] ml-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[color:var(--neutral-400)] transition-colors pointer-events-none" />}
        <input 
          id={id}
          data-testid={testId}
          type={type} 
          step={step}
          value={value ?? ''} 
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "w-full h-11 rounded-xl border text-[14px] transition-shadow outline-none",
            Icon ? "pl-11 pr-4" : "px-4",
            disabled 
              ? "bg-[color:var(--neutral-50)] border-[color:var(--neutral-200)] text-[color:var(--neutral-500)] cursor-not-allowed" 
              : "bg-white border-[color:var(--neutral-200)] focus:border-[color:var(--primary-500)] focus:ring-4 focus:ring-[color:var(--primary-100)] text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-400)]"
          )}
        />
      </div>
      {desc && <p className="text-[12px] text-[color:var(--neutral-500)] ml-1 mt-0.5">{desc}</p>}
    </div>
  )

  return (
    <div className="min-h-screen pb-32 font-sans selection:bg-[color:var(--primary-200)] text-[color:var(--neutral-900)] selection:text-[color:var(--primary-900)] overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 relative z-10 w-full">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-10">
          <button 
            onClick={() => router.back()}
            className="h-10 w-10 rounded-full bg-white border border-[color:var(--neutral-200)] flex items-center justify-center text-[color:var(--neutral-500)] hover:text-[color:var(--neutral-900)] hover:bg-[color:var(--neutral-50)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-[color:var(--neutral-900)] tracking-tight">Pengaturan Profil</h1>
            <p className="text-sm font-medium text-[color:var(--neutral-500)] mt-1">Kelola data pribadi dan preferensi akun Anda.</p>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start max-w-6xl mx-auto">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white border border-[color:var(--neutral-200)] rounded-xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-16 h-16 bg-[color:var(--neutral-100)] text-[color:var(--primary-700)] rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  {formData.full_name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-lg text-[color:var(--neutral-900)] truncate tracking-tight">{formData.full_name || 'Pasien Glunova'}</p>
                  <p className="text-[13px] font-medium text-[color:var(--neutral-500)] truncate mt-0.5">{user.email}</p>
                </div>
            </div>

            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors border",
                      isActive 
                        ? "bg-[color:var(--primary-50)] border-[color:var(--primary-200)]" 
                        : "bg-transparent border-transparent hover:bg-[color:var(--neutral-50)] hover:border-[color:var(--neutral-200)]"
                    )}
                  >
                    <div className={cn("flex items-center justify-center", isActive ? "text-[color:var(--primary-700)]" : "text-[color:var(--neutral-500)]")}>
                       <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={cn("text-sm font-semibold", isActive ? "text-[color:var(--primary-900)]" : "text-[color:var(--neutral-700)]")}>{tab.label}</p>
                      <p className={cn("text-[12px] mt-0.5", isActive ? "text-[color:var(--primary-700)]" : "text-[color:var(--neutral-500)]")}>{tab.desc}</p>
                    </div>
                  </button>
                )
              })}
            </nav>
            
            <div className="pt-6 border-t border-[color:var(--neutral-200)]">
               <button onClick={async () => { await supabase.auth.signOut(); window.location.href='/' }} className="w-full flex items-center justify-center gap-2 p-3 text-[13px] font-semibold text-[color:var(--neutral-600)] hover:text-rose-600 transition-colors rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100">
                  <LogOut className="w-4 h-4" /> Keluar dari Akun
               </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white border border-[color:var(--neutral-200)] rounded-xl shadow-sm overflow-hidden">
               <form onSubmit={handleUpdate} className="p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'personal' && (
                      <div className="space-y-8">
                        <div>
                           <h2 className="text-xl font-bold text-[color:var(--neutral-900)] mb-1">Informasi Dasar</h2>
                           <p className="text-[13px] text-[color:var(--neutral-500)]">Perbarui detail identitas dan status klinis Anda.</p>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                          <Field label="Nama Lengkap" icon={User} value={formData.full_name} onChange={(v:string) => setFormData({...formData, full_name: v})} placeholder="Masukkan nama" />
                          <Field label="Username" icon={Fingerprint} value={formData.username} onChange={(v:string) => setFormData({...formData, username: v})} placeholder="Username Anda" />
                          <div className="sm:col-span-2">
                             <Field label="Alamat Email" icon={Mail} value={user.email} disabled desc="Email tidak dapat diubah, berfungsi sebagai kunci akses akun." />
                          </div>
                        </div>

                        <div className="pt-8 border-t border-[color:var(--neutral-200)]">
                          <h3 className="text-[13px] font-semibold text-[color:var(--neutral-700)] mb-4">Kategori Pemantauan</h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {[
                               { id: 'berisiko', title: 'Pemantauan Risiko', sub: 'Pencegahan Diabetes Melitus', icon: Target },
                               { id: 'terdiagnosis', title: 'Sudah Terdiagnosis', sub: 'Terapi Insulin & Kontrol Rutin', icon: Heart }
                            ].map(opt => (
                               <div 
                                 key={opt.id}
                                 onClick={() => setFormData({...formData, status: opt.id as any})}
                                 className={cn(
                                    "p-5 rounded-xl border-[1.5px] cursor-pointer transition-all flex items-start gap-4",
                                    formData.status === opt.id 
                                      ? "border-[color:var(--primary-600)] bg-[color:var(--primary-50)]" 
                                      : "border-[color:var(--neutral-200)] bg-white hover:border-[color:var(--primary-300)]"
                                 )}
                               >
                                  <div className={cn("p-2 rounded-lg shrink-0", formData.status === opt.id ? "bg-[color:var(--primary-600)] text-white" : "bg-[color:var(--neutral-100)] text-[color:var(--neutral-500)]")}>
                                     <opt.icon className="w-5 h-5" />
                                  </div>
                                  <div>
                                     <p className={cn("text-[14px] font-bold", formData.status === opt.id ? "text-[color:var(--primary-900)]" : "text-[color:var(--neutral-900)]")}>{opt.title}</p>
                                     <p className="text-[12px] text-[color:var(--neutral-500)] mt-0.5">{opt.sub}</p>
                                  </div>
                               </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'health' && (
                      <div className="space-y-8">
                        <div>
                           <h2 className="text-xl font-bold text-[color:var(--neutral-900)] mb-1">Data Medis & Biometrik</h2>
                           <p className="text-[13px] text-[color:var(--neutral-500)] mt-1">Data klinis dasar untuk mengatur perhitungan siklus dan panduan nutrisi Anda.</p>
                        </div>

                        <div className="bg-[color:var(--neutral-50)] rounded-xl p-4 sm:p-5 flex items-start gap-4 border border-[color:var(--neutral-200)]">
                           <div className="w-10 h-10 bg-white rounded-lg border border-[color:var(--neutral-200)] flex items-center justify-center shrink-0">
                              <Sparkles className="w-5 h-5 text-[color:var(--primary-600)]" />
                           </div>
                           <div>
                               <p className="text-[13px] font-bold text-[color:var(--neutral-900)]">Estimasi Level Otomatis</p>
                              <p className="text-[12px] text-[color:var(--neutral-600)] mt-1">Sistem akan secara otomatis menghitung usia pemantauan dan target evaluasi menggunakan tanggal mulai program.</p>
                           </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                           <Field type="date" label="Tanggal Mulai Pemantauan / Diagnosis" value={formData.monitoring_start_date} onChange={(v:string) => setFormData({...formData, monitoring_start_date: v})} />
                           <Field type="date" label="Target Evaluasi Berikutnya" value={derivedMonitoring.targetDate || formData.monitoring_target_date} disabled={!!derivedMonitoring.targetDate} onChange={(v:string) => setFormData({...formData, monitoring_target_date: v})} />
                           
                           <div className="sm:col-span-2 grid grid-cols-2 gap-6 pt-6 border-t border-[color:var(--neutral-200)]">
                             <Field id="weight" data-testid="input-weight" type="number" step="0.1" icon={Scale} label="Berat Awal (Kg)" value={formData.current_weight} onChange={(v:string) => setFormData({...formData, current_weight: Number(v)})} />
                             <Field id="height" data-testid="input-height" type="number" icon={Ruler} label="Tinggi (Cm)" value={formData.height} onChange={(v:string) => setFormData({...formData, height: Number(v)})} />
                             <div className="col-span-2">
                                <Field id="hba1c" data-testid="input-hba1c" type="number" step="0.01" icon={Activity} label="Kadar HbA1c Terakhir (%)" value={formData.hba1c} onChange={(v:string) => setFormData({...formData, hba1c: Number(v)})} desc="Parameter penting untuk evaluasi risiko diabetes jangka panjang." />
                             </div>
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'security' && (
                      <div className="space-y-8">
                        <div>
                           <h2 className="text-xl font-bold text-[color:var(--neutral-900)] mb-1">Pusat Keamanan & Privasi</h2>
                           <p className="text-[13px] text-[color:var(--neutral-500)] mt-1">Pengendalian zona bahaya terhadap keanggotaan dan data Glunova Anda.</p>
                        </div>

                        <div className="border border-rose-200 bg-rose-50 rounded-xl p-6 sm:p-8 space-y-6">
                           <div className="flex items-start gap-4">
                              <div className="p-3 bg-white rounded-xl border border-rose-200 shrink-0">
                                 <AlertTriangle className="w-6 h-6 text-rose-600" />
                              </div>
                              <div>
                                 <h3 className="text-rose-700 font-bold text-[15px]">Hapus Akun Permanen</h3>
                                 <p className="text-[13px] text-rose-600/80 mt-1 leading-relaxed">Penghapusan ini akan menghilangkan semua riwayat glukosa, agenda konsultasi, dan rekam medis secara ireversibel dari basis data server.</p>
                              </div>
                           </div>
                           
                           <div className="space-y-3 pt-4 border-t border-rose-200/50">
                              <label className="text-[12px] font-bold text-rose-700 block">Ketik "HAPUS" di bawah ini</label>
                              <div className="flex flex-col sm:flex-row gap-4">
                                <input 
                                  value={deleteConfirmText}
                                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                                  placeholder="HAPUS"
                                  className="flex-1 h-11 px-4 rounded-xl bg-white border border-rose-300 text-rose-700 font-bold text-[14px] uppercase tracking-wider focus:ring-4 focus:ring-rose-200/50 focus:border-rose-500 outline-none transition-all placeholder:opacity-40"
                                />
                                <button 
                                  type="button" 
                                  onClick={handleDelete}
                                  disabled={isSubmitting || deleteConfirmText !== 'HAPUS'}
                                  className="h-11 px-6 bg-rose-600 text-white hover:bg-rose-700 rounded-xl font-bold text-[13px] transition-all disabled:opacity-40 shrink-0"
                                >
                                  Eksekusi Hapus
                                </button>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {activeTab !== 'security' && (
                  <div className="mt-10 pt-6 border-t border-[color:var(--neutral-200)] flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="h-11 px-8 rounded-xl bg-[color:var(--primary-600)] font-bold text-[14px] text-white transition-all hover:bg-[color:var(--primary-700)] disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                       {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Profil'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </main>

        </div>
      </div>
    </div>
  )
}
