'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@glunova.id', href: 'mailto:info@glunova.id' },
  { icon: Phone, label: 'Telepon', value: '+62 21 1234 5678', href: 'tel:+622112345678' },
  { icon: MapPin, label: 'Alamat', value: 'Jl. Sudirman No. 52, Jakarta Selatan', href: '#' },
  { icon: Clock, label: 'Jam Operasional', value: 'Senin - Jumat, 08:00 - 17:00 WIB', href: '#' },
]

export function ContactUs() {
  return (
    <section className="py-24 bg-[color:var(--neutral-50)]" id="contact">
      <div className="container w-full mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-[color:var(--primary-700)] font-bold tracking-wider uppercase text-sm mb-3 font-heading">Hubungi Kami</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-[color:var(--neutral-900)] tracking-tight mb-4 font-heading">
            Ada Pertanyaan? Kami Siap Membantu
          </h3>
          <p className="text-lg text-[color:var(--neutral-500)] max-w-2xl mx-auto font-body">
            Tim kami selalu siap untuk mendengarkan masukan, menjawab pertanyaan, atau membantu Anda memulai perjalanan manajemen diabetes bersama Glunova.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-[color:var(--primary-900)] rounded-3xl p-8 h-full text-white relative overflow-hidden">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[color:var(--primary-500)]/20 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />

              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-2 font-heading">Informasi Kontak</h4>
                <p className="text-[color:var(--primary-200)] mb-10 font-body">
                  Hubungi kami melalui salah satu kanal di bawah ini.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, idx) => (
                    <a
                      key={idx}
                      href={info.href}
                      className="flex items-start gap-4 group hover:translate-x-1 transition-transform"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-colors">
                        <info.icon className="w-5 h-5 text-[color:var(--primary-300)]" />
                      </div>
                      <div>
                        <p className="text-xs text-[color:var(--primary-300)] font-bold uppercase tracking-wider mb-0.5 font-heading">{info.label}</p>
                        <p className="text-white font-semibold font-body">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-xs text-[color:var(--primary-300)] font-bold uppercase tracking-wider mb-4 font-heading">Ikuti Kami</p>
                  <div className="flex gap-3">
                    {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="px-4 py-2 bg-white/10 rounded-lg text-sm font-semibold text-white hover:bg-white/20 transition-colors border border-white/10 font-body"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[color:var(--neutral-200)] shadow-sm h-full">
              <h4 className="text-xl font-bold text-[color:var(--neutral-900)] mb-6 font-heading">Kirim Pesan</h4>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[color:var(--neutral-700)] mb-2 font-heading">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-xl border border-[color:var(--neutral-200)] bg-[color:var(--neutral-50)] text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-300)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-500)] focus:border-transparent transition-all font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[color:var(--neutral-700)] mb-2 font-heading">Email</label>
                    <input
                      type="email"
                      placeholder="email@contoh.com"
                      className="w-full px-4 py-3 rounded-xl border border-[color:var(--neutral-200)] bg-[color:var(--neutral-50)] text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-300)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-500)] focus:border-transparent transition-all font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[color:var(--neutral-700)] mb-2 font-heading">Subjek</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-[color:var(--neutral-200)] bg-[color:var(--neutral-50)] text-[color:var(--neutral-900)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-500)] focus:border-transparent transition-all font-body appearance-none"
                  >
                    <option value="">Pilih topik</option>
                    <option value="fitur">Pertanyaan tentang Fitur</option>
                    <option value="akun">Masalah Akun</option>
                    <option value="konsultasi">Konsultasi Dokter</option>
                    <option value="kerjasama">Kerjasama / Partnership</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[color:var(--neutral-700)] mb-2 font-heading">Pesan</label>
                  <textarea
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl border border-[color:var(--neutral-200)] bg-[color:var(--neutral-50)] text-[color:var(--neutral-900)] placeholder:text-[color:var(--neutral-300)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-500)] focus:border-transparent transition-all resize-none font-body"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[color:var(--primary-700)] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[color:var(--primary-800)] transition-all hover:scale-[1.02] shadow-lg shadow-[color:var(--primary-700)]/20 font-heading"
                >
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
