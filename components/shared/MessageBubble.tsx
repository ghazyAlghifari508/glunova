'use client'

import type { ConsultationMessage } from '@/types/consultation'

export function MessageBubble({
  message,
  isOwn,
}: {
  message: ConsultationMessage
  isOwn: boolean
}) {
  const time = new Date(message.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={`mb-8 flex ${isOwn ? 'justify-end' : 'justify-start'} group`}>
      <div className={`max-w-[85%] md:max-w-[70%] relative ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`rounded-[2rem] px-8 py-5 text-[15px] font-medium leading-relaxed backdrop-blur-3xl transition-all duration-300 shadow-sm ${
          isOwn
            ? 'bg-[color:var(--primary-700)] text-white rounded-br-none shadow-[0_20px_40px_-10px_rgba(26,86,219,0.2)]'
            : 'bg-white border border-[color:var(--neutral-100)] text-[color:var(--neutral-800)] rounded-bl-none shadow-sm'
        }`}>
          <p className="whitespace-pre-wrap break-words">{message.message}</p>
        </div>
        <p className={`mt-3 text-[9px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-40 transition-opacity italic ${isOwn ? 'text-[color:var(--primary-700)]' : 'text-[color:var(--neutral-400)]'}`}>
           Log_Transmisi // {time}
        </p>
      </div>
    </div>
  )
}
