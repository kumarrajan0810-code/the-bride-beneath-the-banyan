import { motion } from 'motion/react'
import Navbar from './Navbar'

interface SynopsisProps {
  setActivePage: (page: 'home' | 'synopsis' | 'characters') => void
}

const Synopsis = ({ setActivePage }: SynopsisProps) => {
  return (
    <section className="relative w-full h-screen bg-[#07090D] overflow-hidden flex flex-col" id="synopsis">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[rgba(198,165,107,0.03)] via-[#07090D] to-[#07090D] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-40 flex justify-center pt-3 md:pt-5 px-3 md:px-5 pointer-events-none">
        <div className="w-full max-w-[1536px] pointer-events-auto">
          <Navbar setActivePage={setActivePage} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-[12vh] sm:pt-[15vh] px-6 sm:px-10 relative z-10 w-full max-w-[1200px] mx-auto">
        
        {/* Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 md:mb-16 w-full"
        >
          <h1 className="font-script text-[#C6A56B] text-7xl md:text-8xl lg:text-[110px] leading-none drop-shadow-[0_4px_24px_rgba(198,165,107,0.15)]">
            Synopsis
          </h1>
        </motion.div>

        {/* Content Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full"
        >
          <div className="font-serif text-lg md:text-xl lg:text-[22px] text-[#F3E9D2] opacity-90 leading-[1.6] md:leading-[1.7] font-light text-left w-full max-w-[900px] mx-auto">
            In 1871 Bengal, brides have started disappearing from the village of Nayabganj. They vanish without warning — from their homes, from wedding processions, even from locked rooms. No bodies are found, and fear spreads quickly through the flooded village.
            <br /><br />
            The villagers blame the ancient banyan tree behind the Halder estate.
            <br /><br />
            When Dr. Aniruddh Sen arrives from Calcutta to investigate, he dismisses the stories as superstition hiding something more human. But Nayabganj is a place where nobody speaks openly, old rituals are still practiced in secret, and every family seems to be hiding something.
            <br /><br />
            At the center of the mystery is Mrinalini, a strange young woman whose presence around the estate unsettles Aniruddh from the moment they meet. The closer he gets to her, the deeper he is pulled into the village’s buried history of violence, obsession, and fear.
            <br /><br />
            As more brides disappear, Aniruddh begins to realize that the truth behind Nayabganj may be far darker than the legends surrounding it.
            <br /><br />
            <span className="italic">The Bride Beneath the Banyan</span> is a mystery romance set in colonial Bengal, blending Indian folklore, psychological suspense, and slow-burn romance.
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Synopsis
