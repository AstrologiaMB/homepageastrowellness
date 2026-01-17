import { StarField } from '@/components/auth/star-field'

export default function CalendarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <StarField className="opacity-40" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
