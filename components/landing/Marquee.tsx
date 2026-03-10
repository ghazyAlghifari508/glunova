'use client'

export default function Marquee() {
  const items = [
    'Pemantauan Gula Darah',
    'Konsultasi Dokter',
    'Edukasi Diabetes',
    'AI Vision Scan',
    'Roadmap Kesehatan',
    'Manajemen HbA1c',
  ]

  return (
    <section className="py-6 overflow-hidden" style={{ background: 'var(--primary-700)' }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="mx-8 text-sm font-semibold text-white/80 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
