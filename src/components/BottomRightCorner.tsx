import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

const BottomRightCorner = () => {
  return (
    <div className="absolute bottom-0 right-0 p-3 pt-5 pl-8 sm:p-4 sm:pt-6 sm:pl-10 md:p-6 md:pt-8 md:pl-14 bg-[#07090D] rounded-tl-[1.5rem] sm:rounded-tl-[2rem] md:rounded-tl-[3.5rem] flex items-center gap-3 sm:gap-4 md:gap-6">
      {/* Top intersection mask */}
      <div className="absolute -top-[1.5rem] sm:-top-[2rem] md:-top-[3.5rem] right-0 w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#07090D" />
        </svg>
      </div>

      {/* Left intersection mask */}
      <div className="absolute bottom-0 -left-[1.5rem] sm:-left-[2rem] md:-left-[3.5rem] w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#07090D" />
        </svg>
      </div>

      {/* Info column */}
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl md:text-3xl font-serif font-normal text-[#C6A56B] tracking-tight">2026</span>
        <span className="text-[10px] md:text-[11px] font-sans font-medium text-[rgba(243,233,210,0.5)] uppercase tracking-[0.15em]">Coming Soon</span>
      </div>

      {/* Get Notified button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center bg-[rgba(10,10,15,0.55)] backdrop-blur-md border border-[rgba(198,165,107,0.25)] rounded-full pl-2 pr-5 py-1.5 gap-2 hover:border-[rgba(198,165,107,0.5)] hover:shadow-[0_0_20px_rgba(198,165,107,0.12)] transition-all duration-300 group"
      >
        <div className="bg-[rgba(198,165,107,0.15)] p-1 rounded-full flex items-center justify-center">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A56B]" />
        </div>
        <span className="text-[13px] font-sans font-medium text-[rgba(243,233,210,0.72)]">Get Notified</span>
      </motion.button>
    </div>
  )
}

export default BottomRightCorner
