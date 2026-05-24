import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

const BottomLeftCard = () => {
  return (
    <div className="absolute bottom-28 right-4 left-auto md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-4 md:p-5 lg:p-6 rounded-[28px] bg-[rgba(10,10,15,0.55)] backdrop-blur-[16px] border border-[rgba(198,165,107,0.15)] flex flex-col gap-3 lg:gap-4 min-w-[140px] md:min-w-[160px] lg:min-w-[190px] w-fit">
      {/* Top text block */}
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl md:text-3xl font-serif font-normal text-[#C6A56B] tracking-tight">2026</span>
        <span className="text-[10px] md:text-[11px] font-sans font-medium text-[rgba(243,233,210,0.5)] uppercase tracking-[0.15em]">Coming Soon</span>
      </div>

      {/* Get Notified button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center bg-[rgba(10,10,15,0.55)] backdrop-blur-md border border-[rgba(198,165,107,0.25)] rounded-full pl-2 pr-5 py-1.5 gap-2 hover:border-[rgba(198,165,107,0.5)] hover:shadow-[0_0_20px_rgba(198,165,107,0.12)] transition-all duration-300 self-start group"
      >
        <div className="bg-[rgba(198,165,107,0.15)] p-1 rounded-full flex items-center justify-center">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A56B]" />
        </div>
        <span className="text-[13px] font-sans font-medium text-[rgba(243,233,210,0.72)]">Get Notified</span>
      </motion.button>
    </div>
  )
}

export default BottomLeftCard
