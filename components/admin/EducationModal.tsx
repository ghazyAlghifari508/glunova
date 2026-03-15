'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, Loader2, X, BookOpen, Layers, Tag, Info } from 'lucide-react'
import { createEducationContent, updateEducationContent } from '@/services/adminService'
import { motion } from 'framer-motion'
import type { Category } from '@/types/education'

interface EducationContent {
  id: string; day: number; month: number; title: string; description: string
  content: string; tips: string[] | string; category: Category; phase: string; thumbnail_url?: string
}

interface EducationModalProps { isOpen: boolean; onClose: () => void; onSuccess: () => void; initialData?: EducationContent | null }

const categories = [
  { value: 'nutrisi', label: 'Nutrisi' }, { value: 'kesehatan', label: 'Kesehatan' },
  { value: 'stimulasi', label: 'Stimulasi' }, { value: 'perkembangan', label: 'Perkembangan' },
  { value: 'aktivitas', label: 'Aktivitas' }, { value: 'imunisasi', label: 'Imunisasi' },
]

const inputStyle = { background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)', color: 'var(--neutral-900)' }
const labelStyle: React.CSSProperties = { color: 'var(--neutral-500)' }

export function EducationModal({ isOpen, onClose, onSuccess, initialData }: EducationModalProps) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    day: 1, month: 1, title: '', description: '', content: '', tips: '', category: 'nutrisi' as Category, phase: 'general', thumbnail_url: '',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        day: initialData.day, month: initialData.month, title: initialData.title,
        description: initialData.description || '', content: initialData.content || '',
        tips: Array.isArray(initialData.tips) ? initialData.tips.join('\n') : initialData.tips || '',
        category: initialData.category, phase: initialData.phase || 'general', thumbnail_url: initialData.thumbnail_url || '',
      })
    } else {
      setForm({ day: 0, month: 1, title: '', description: '', content: '', tips: '', category: 'nutrisi', phase: 'general', thumbnail_url: '' })
    }
  }, [initialData, isOpen])

  const handleDayChange = (day: number) => {
    const month = Math.ceil(day / 30)
    setForm(p => ({ ...p, day, month }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!form.title.trim() || !form.description.trim() || !form.content.trim()) { setError('Judul, deskripsi, dan konten wajib diisi.'); return }
    try {
      setSaving(true)
      const tipsArray = form.tips.split('\n').map(t => t.trim()).filter(t => t.length > 0)
      
      // If new, try to get a unique day if it's 0
      let finalDay = form.day
      if (!initialData && finalDay === 0) {
        finalDay = Date.now() % 1000000 // Temporary fallback for uniqueness
      }

      const payload = { 
        day: finalDay, 
        month: form.month, 
        title: form.title, 
        description: form.description, 
        content: form.content, 
        tips: tipsArray, 
        category: form.category, 
        phase: form.phase,
        thumbnail_url: form.thumbnail_url || undefined 
      }
      if (initialData?.id) { await updateEducationContent(initialData.id, payload) } else { await createEducationContent(payload) }
      onSuccess(); onClose()
    } catch (err: any) { setError(err?.message || 'Gagal menyimpan konten.') } finally { setSaving(false) }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.97, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 20 }}
        className="relative rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col"
        style={{ background: 'var(--white)', border: '1px solid var(--neutral-200)' }}>
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid var(--neutral-200)' }}>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-50)' }}>
              <BookOpen className="w-5 h-5" style={{ color: 'var(--primary-700)' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading" style={{ color: 'var(--neutral-900)' }}>
                {initialData ? 'Edit Konten Edukasi' : 'Tambah Konten Baru'}
              </h2>
              <p className="text-xs font-body" style={{ color: 'var(--neutral-500)' }}>Kategori: {categories.find(c => c.value === form.category)?.label}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
          {error && (
            <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
              className="p-3 rounded-xl text-sm font-semibold flex items-center gap-2 font-body"
              style={{ background: 'rgba(239,68,68,0.08)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <Info className="w-4 h-4" /> {error}
            </motion.div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider font-heading" style={labelStyle}>Klasifikasi</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold font-body" style={labelStyle}>Phase (Status Pasien)</label>
                  <select value={form.phase} onChange={(e) => setForm(p => ({ ...p, phase: e.target.value }))}
                    className="w-full h-11 rounded-xl px-4 text-sm font-body focus:outline-none appearance-none cursor-pointer" style={inputStyle}>
                    <option value="general">Umum (General)</option>
                    <option value="prediabetes">Prediabetes</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="berisiko">Berisiko</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold font-body" style={labelStyle}>Kategori</label>
                  <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value as Category }))}
                    className="w-full h-11 rounded-xl px-4 text-sm font-body focus:outline-none appearance-none cursor-pointer" style={inputStyle}>
                    {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold font-body" style={labelStyle}>Judul</label>
                <input type="text" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Masukkan judul konten..." className="w-full h-11 rounded-xl px-4 text-sm font-body focus:outline-none" style={inputStyle} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold font-body" style={labelStyle}>URL Thumbnail</label>
                <input type="url" value={form.thumbnail_url} onChange={(e) => setForm(p => ({ ...p, thumbnail_url: e.target.value }))}
                  placeholder="https://images.unsplash.com/..." className="w-full h-11 rounded-xl px-4 text-sm font-body focus:outline-none" style={inputStyle} />
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider font-heading" style={labelStyle}>Konten</h3>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold font-body" style={labelStyle}>Deskripsi Singkat</label>
                <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full h-20 rounded-xl p-4 text-sm font-body focus:outline-none resize-none" style={inputStyle} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold font-body" style={labelStyle}>Konten Lengkap</label>
                <textarea value={form.content} onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))}
                  className="w-full h-40 rounded-xl p-4 text-sm font-body focus:outline-none resize-none leading-relaxed" style={inputStyle} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold font-body" style={{ color: 'var(--primary-700)' }}>Tips (per baris)</label>
                <textarea value={form.tips} onChange={(e) => setForm(p => ({ ...p, tips: e.target.value }))}
                  className="w-full h-24 rounded-xl p-4 text-sm font-body focus:outline-none resize-none" style={{ ...inputStyle, borderColor: 'var(--primary-200)' }} />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 flex gap-3" style={{ borderTop: '1px solid var(--neutral-200)' }}>
          <Button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl font-semibold text-sm" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-700)' }}>Batal</Button>
          <Button onClick={handleSubmit} disabled={saving} className="flex-[2] h-11 rounded-xl font-semibold text-sm text-white" style={{ background: 'var(--primary-700)' }}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {initialData ? 'Simpan Perubahan' : 'Tambah Konten'}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
