'use client'

import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'

const team = [
  { name: 'Dr. Rina Permata', role: 'Chief Medical Officer', initials: 'RP' },
  { name: 'Ahmad Fauzan', role: 'Lead Developer', initials: 'AF' },
  { name: 'Siti Nurhaliza', role: 'UX Designer', initials: 'SN' },
  { name: 'Budi Santoso', role: 'Data Scientist', initials: 'BS' },
]

export default function Team() {
  return (
    <section className="py-20 md:py-28" id="team"
      style={{ background: 'var(--white)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
            style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-700)' }} />
            Tim Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4"
            style={{ color: 'var(--neutral-900)' }}
          >
            Didukung Tim{' '}
            <span style={{ color: 'var(--primary-700)' }}>Profesional</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--neutral-500)' }}>
            Tim multidisiplin yang berkomitmen untuk membantu Anda mengelola diabetes.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group text-center"
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                style={{ background: 'var(--primary-50)' }}
              >
                <span className="text-2xl font-heading font-bold" style={{ color: 'var(--primary-700)' }}>
                  {member.initials}
                </span>
              </div>
              <h3 className="text-sm font-heading font-bold mb-1" style={{ color: 'var(--neutral-900)' }}>
                {member.name}
              </h3>
              <p className="text-xs mb-3" style={{ color: 'var(--neutral-500)' }}>
                {member.role}
              </p>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors"
                style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
