import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Navbar from './Navbar'
import BottomRightCorner from './BottomRightCorner'

interface HeroProps {
  setActivePage: (page: 'home' | 'synopsis' | 'characters') => void
}

const Hero = ({ setActivePage }: HeroProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Force play once the video has buffered enough
  useEffect(() => {
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.play().catch((err) => console.log("Autoplay blocked by browser:", err))
    }
  }, [isVideoLoaded])

  return (
    <div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#07090D]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center bg-[#07090D] group">
        
        {/* PRELOADER OVERLAY */}
        <AnimatePresence>
          {!isVideoLoaded && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#07090D]"
            >
              <div className="flex flex-col items-center justify-center">
                <motion.img 
                  src="/loader.png" 
                  alt="Loading Archives..."
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[280px] md:w-[360px] lg:w-[420px] object-contain drop-shadow-[0_0_15px_rgba(198,165,107,0.1)]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Background — plays once */}
        <video
          ref={videoRef}
          muted
          playsInline
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          onEnded={() => setVideoEnded(true)}
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/50 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-[1]" />

        {/* Content Layer — fades in after video ends */}
        <div
          className={`relative z-10 w-full h-full flex flex-col transition-opacity duration-1000 ${videoEnded ? 'opacity-100' : 'opacity-0'}`}
        >
          <Navbar setActivePage={setActivePage} />

          {/* Main Content Area */}
          <div className="flex-1 flex items-start pt-[8vh] sm:pt-[10vh] md:pt-[12vh] lg:pt-[14vh] px-6 sm:px-10 md:px-16 lg:px-24">
            <div className="max-w-[620px]">

              {/* Title */}
              <h1 className="text-[#C6A56B] mt-4">
                <span className="block font-script text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-none">
                  The Bride
                </span>
                <span className="block font-display italic text-xl sm:text-2xl md:text-3xl lg:text-[40px] tracking-[0.12em] my-2 md:my-3 ml-1 text-[#8E744A] leading-none">
                  Beneath
                </span>
                <span className="block font-script text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-none">
                  the Banyan
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-[15px] sm:text-[17px] md:text-[19px] font-sans font-light text-[#F3E9D2] opacity-72 leading-[160%] max-w-[420px] mt-6 md:mt-8">
                Some promises are older than gods.
                <br />
                Some love stories refuse to die.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-8 md:mt-10">
                <button className="flex items-center gap-2.5 px-5 md:px-7 py-2.5 md:py-3 bg-[rgba(10,10,15,0.55)] backdrop-blur-md border border-[rgba(198,165,107,0.25)] rounded-full text-[#F3E9D2] text-[13px] md:text-[14px] font-sans font-medium tracking-wide hover:border-[rgba(198,165,107,0.5)] hover:shadow-[0_0_24px_rgba(198,165,107,0.15)] transition-all duration-300 group">
                  <ArrowUpRight className="w-4 h-4 text-[#C6A56B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Read Chapter One
                </button>
                <button className="flex items-center gap-2.5 px-5 md:px-7 py-2.5 md:py-3 bg-[rgba(10,10,15,0.55)] backdrop-blur-md border border-[rgba(198,165,107,0.15)] rounded-full text-[rgba(243,233,210,0.72)] text-[13px] md:text-[14px] font-sans font-medium tracking-wide hover:border-[rgba(198,165,107,0.4)] hover:text-[#F3E9D2] hover:shadow-[0_0_24px_rgba(198,165,107,0.12)] transition-all duration-300 group">
                  <Play className="w-3.5 h-3.5 text-[#8E744A] group-hover:text-[#C6A56B] transition-colors" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>

          <BottomRightCorner />
        </div>
      </section>
    </div>
  )
}

export default Hero
