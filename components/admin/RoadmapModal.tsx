'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, Loader2, X, Route, Info } from 'lucide-react'
import { createRoadmapActivity, updateRoadmapActivity } from '@/services/adminService'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RoadmapActivity } from '@/types/roadmap'

interface RoadmapModalProps { 
  isOpen: boolean 
  onClose: () => void 
  onSuccess: () => void 
  initialData?: RoadmapActivity | null 
}

const inputStyle = { background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)', color: 'var(--neutral-900)' }
const labelStyle = { color: 'var(--neutral-500)' }

export function RoadmapModal({ isOpen, onClose, onSuccess, initialData }: RoadmapModalProps) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    activity_name: '', 
    category: 'exercise' as RoadmapActivity['category'], 
    description: '', 
    difficulty_level: 1,
    duration_minutes: 15, 
    frequency_per_week: 3, 
    benefits: '', 
    instructions: '', 
    tips: '', 
    warnings: '',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        activity_name: initialData.activity_name, 
        category: initialData.category, 
        description: initialData.description || '',
        difficulty_level: initialData.difficulty_level,
        duration_minutes: initialData.duration_minutes || 0, 
        frequency_per_week: initialData.frequency_per_week || 0,
        benefits: Array.isArray(initialData.benefits) ? initialData.benefits.join('\n') : '',
        instructions: Array.isArray(initialData.instructions) ? initialData.instructions.join('\n') : '',
        tips: initialData.tips || '', 
        warnings: initialData.warnings || '',
      })
    } else {
      setForm({ 
        activity_name: '', 
        category: 'exercise', 
        description: '', 
        difficulty_level: 1, 
        duration_minutes: 15, 
        frequency_per_week: 3, 
        benefits: '', 
        instructions: '', 
        tips: '', 
        warnings: '' 
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError('')
    if (!form.activity_name.trim()) { 
      setError('Nama aktivitas wajib diisi.')
      return 
    }
    
    try {
      setSaving(true)
      const payload = {
        activity_name: form.activity_name, 
        category: form.category, 
        description: form.description, 
        difficulty_level: form.difficulty_level,
        duration_minutes: form.duration_minutes, 
        frequency_per_week: form.frequency_per_week,
        benefits: form.benefits.split('\n').filter(b => b.trim()), 
        instructions: form.instructions.split('\n').filter(i => i.trim()),
        tips: form.tips || null, 
        warnings: form.warnings || null,
      }
      
      if (initialData?.id) { 
        await updateRoadmapActivity(initialData.id, payload) 
      } else { 
        await createRoadmapActivity(payload) 
      }
      onSuccess()
      onClose()
    } catch (err: any) { 
      setError(err?.message || 'Gagal menyimpan.') 
    } finally { 
      setSaving(false) 
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.97, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        className="relative rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col"
        style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}
      >
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid var(--neutral-200)' }}>
           <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-50)' }}>
                 <Route className="w-5 h-5" style={{ color: 'var(--primary-700)' }} />
              </div>
              <div>
                 <h2 className="text-lg font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>
                    {initialData ? 'Edit Aktivitas' : 'Tambah Aktivitas Baru'}
                 </h2>
                 <p className="text-xs font-body" style={{ color: 'var(--neutral-500)' }}>Isi detail aktivitas roadmap</p>
              </div>
           </div>
           <button onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
              <X className="w-5 h-5" />
           </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
           {error && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="p-3 rounded-xl text-sm font-semibold flex items-center gap-2 font-body"
                 style={{ background: 'rgba(239,68,68,0.08)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.15)' }}>
                 <Info className="w-4 h-4" /> {error}
              </motion.div>
           )}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                 <h3 className="text-xs font-bold uppercase tracking-wider font-heading" style={labelStyle}>Parameter</h3>
                 <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body" style={labelStyle}>Nama Aktivitas</label>
                    <input type="text" value={form.activity_name} onChange={(e) => setForm(p => ({ ...p, activity_name: e.target.value }))}
                       placeholder="Contoh: Jalan Kaki 30 Menit" className="w-full h-11 rounded-xl px-4 text-sm font-body focus:outline-none" style={inputStyle} />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                       <label className="text-xs font-semibold font-body" style={labelStyle}>Kategori</label>
                       <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value as RoadmapActivity['category'] }))}
                          className="w-full h-11 rounded-xl px-4 text-sm font-body focus:outline-none appearance-none cursor-pointer" style={inputStyle}>
                          <option value="exercise">Olahraga</option><option value="nutrition">Nutrisi</option><option value="sleep">Tidur</option>
                          <option value="mental">Mental</option><option value="checkup">Pemeriksaan</option><option value="bonding">Sosial</option>
                       </select>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-xs font-semibold font-body" style={labelStyle}>Tingkat Kesulitan</label>
                       <div className="h-11 rounded-xl px-4 flex items-center justify-between" style={inputStyle}>
                          <div className="flex items-center gap-1.5">
                             {[1,2,3,4,5].map(l => (
                                <button key={l} type="button" onClick={() => setForm(p => ({ ...p, difficulty_level: l }))}
                                   className={cn("w-2.5 h-2.5 rounded-full transition-all", l <= form.difficulty_level ? "scale-125" : "")}
                                   style={{ background: l <= form.difficulty_level ? 'var(--primary-700)' : 'var(--neutral-300)' }} />
                             ))}
                          </div>
                          <span className="text-xs font-semibold font-body" style={labelStyle}>Lv {form.difficulty_level}</span>
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5 flex-1">
                      <label className="text-xs font-semibold font-body" style={labelStyle}>Durasi (menit)</label>
                      <input type="number" value={form.duration_minutes} onChange={(e) => setForm(p => ({...p, duration_minutes: Number(e.target.value)}))} className="w-full h-11 rounded-xl px-3 text-sm font-body" style={inputStyle} />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <label className="text-xs font-semibold font-body" style={labelStyle}>Frekuensi / Minggu</label>
                      <input type="number" value={form.frequency_per_week} onChange={(e) => setForm(p => ({...p, frequency_per_week: Number(e.target.value)}))} className="w-full h-11 rounded-xl px-3 text-sm font-body" style={inputStyle} />
                    </div>
                 </div>
                 <div className="p-4 rounded-xl" style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
                    <div className="flex items-center gap-2 mb-2">
                       <Info className="w-3.5 h-3.5" style={{ color: 'var(--primary-700)' }} />
                       <span className="text-xs font-bold font-heading" style={{ color: 'var(--primary-700)' }}>Informasi</span>
                    </div>
                    <p className="text-xs font-body leading-relaxed" style={{ color: 'var(--primary-600)' }}>Pastikan aktivitas ini sesuai dengan pedoman kesehatan Glunova untuk membantu pasien secara optimal.</p>
                 </div>
              </div>
              <div className="space-y-5">
                 <h3 className="text-xs font-bold uppercase tracking-wider font-heading" style={labelStyle}>Detail Konten</h3>
                 <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body" style={labelStyle}>Deskripsi</label>
                    <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                       className="w-full h-20 rounded-xl p-4 text-sm font-body focus:outline-none resize-none" style={inputStyle} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body" style={labelStyle}>Instruksi (per baris)</label>
                    <textarea value={form.instructions} onChange={(e) => setForm(p => ({ ...p, instructions: e.target.value }))}
                       className="w-full h-32 rounded-xl p-4 text-sm font-body focus:outline-none resize-none" style={inputStyle} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body" style={{ color: 'var(--success)' }}>Manfaat (per baris)</label>
                    <textarea value={form.benefits} onChange={(e) => setForm(p => ({ ...p, benefits: e.target.value }))}
                       className="w-full h-20 rounded-xl p-4 text-sm font-body focus:outline-none resize-none" style={{ ...inputStyle, borderColor: 'rgba(16,185,129,0.2)' }} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body" style={{ color: 'var(--danger)' }}>Peringatan</label>
                    <textarea value={form.warnings} onChange={(e) => setForm(p => ({ ...p, warnings: e.target.value }))}
                       className="w-full h-20 rounded-xl p-4 text-sm font-body focus:outline-none resize-none" style={{ ...inputStyle, borderColor: 'rgba(239,68,68,0.2)' }} />
                 </div>
              </div>
           </div>
        </form>

        {/* Footer */}
        <div className="p-6 flex gap-3" style={{ borderTop: '1px solid var(--neutral-200)' }}>
           <Button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl font-semibold text-sm" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-700)' }}>Batal</Button>
           <Button onClick={handleSubmit} disabled={saving} className="flex-[2] h-11 rounded-xl font-semibold text-sm text-white" style={{ background: 'var(--primary-700)' }}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {initialData ? 'Simpan Perubahan' : 'Tambah Aktivitas'}
           </Button>
        </div>
      </motion.div>
    </div>
  )
}
