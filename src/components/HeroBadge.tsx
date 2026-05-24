import { Sparkles } from 'lucide-react'

const HeroBadge = () => {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[rgba(10,10,15,0.55)] backdrop-blur-md border border-[rgba(198,165,107,0.15)] w-fit">
      <Sparkles className="w-3.5 h-3.5 text-[#C6A56B]" />
      <span className="text-[13px] font-sans font-medium text-[rgba(243,233,210,0.72)] tracking-wide">A Gothic Romance</span>
    </div>
  )
}

export default HeroBadge
