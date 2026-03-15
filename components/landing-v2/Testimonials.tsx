'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Pasien Diabetes Tipe 2',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    content: 'Glunova AI Vision sangat membantu saya saat makan di luar. Cukup foto makanannya, saya langsung tahu perkiraan karbohidratnya.'
  },
  {
    id: 2,
    name: 'Dr. Maria Ulfah, Sp.PD',
    role: 'Dokter Penyakit Dalam',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150',
    content: 'Platform ini merevolusi cara bernavigasi konsultasi. Grafik tren gula darah pasien yang akurat membuat diagnosis lebih tajam.'
  },
  {
    id: 3,
    name: 'Siti Rahma',
    role: 'Pengguna Pre-Diabetes',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    content: 'Roadmap hariannya membuat saya konsisten olahraga dan atur pola makan. Angka HbA1c saya turun signifikan dalam 3 bulan terakhir.'
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-[color:var(--neutral-50)] overflow-hidden" id="testimonials">
      <div className="container w-full mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-[color:var(--primary-700)] font-bold tracking-wider uppercase text-sm mb-3">Kepercayaan Pengguna</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[color:var(--neutral-900)] mb-6">Disetujui oleh Dokter & Pasien</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <motion.div 
              key={testi.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-[color:var(--neutral-200)] hover:shadow-xl transition-shadow relative"
            >
               <div className="flex gap-1 mb-6">
                 {[1,2,3,4,5].map(i => (
                   <Star key={i} className="w-5 h-5 fill-[color:var(--warning)] text-[color:var(--warning)]" />
                 ))}
               </div>
               <p className="text-[color:var(--neutral-700)] leading-relaxed italic mb-8 min-h-[100px]">
                 "{testi.content}"
               </p>
               <div className="flex items-center gap-4 mt-auto">
                 <Image src={testi.image} alt={testi.name} width={48} height={48} className="rounded-full object-cover border-2 border-[color:var(--primary-100)]" />
                 <div>
                   <p className="font-bold text-[color:var(--neutral-900)]">{testi.name}</p>
                   <p className="text-xs text-[color:var(--neutral-500)]">{testi.role}</p>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
