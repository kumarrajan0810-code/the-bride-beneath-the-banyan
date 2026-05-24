import { useState, useEffect } from 'react'
import { Volume2, VolumeX, SkipForward } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const SONGS = [
  { title: "Chhupe Kis Kahani", src: "/songs/छुपे किस कहानी.mp3" },
  { title: "Baarish Pehli Mitti", src: "/songs/बारिश पहली मिट्टी.mp3" }
]

// Global audio instance so it persists across page navigations without stopping
const globalAudio = new Audio()
let currentTrackIndex = 0

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackName, setTrackName] = useState(SONGS[0].title)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Sync initial state if it was already playing
    setIsPlaying(!globalAudio.paused && globalAudio.currentTime > 0)
    setTrackName(SONGS[currentTrackIndex].title)

    const handleEnded = () => {
      playNext()
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    globalAudio.addEventListener('ended', handleEnded)
    globalAudio.addEventListener('play', handlePlay)
    globalAudio.addEventListener('pause', handlePause)

    return () => {
      globalAudio.removeEventListener('ended', handleEnded)
      globalAudio.removeEventListener('play', handlePlay)
      globalAudio.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = () => {
    if (!globalAudio.src) {
      globalAudio.src = SONGS[currentTrackIndex].src
      globalAudio.volume = 0.5 // Set to 50% volume so it's not overpowering
    }
    
    if (globalAudio.paused) {
      globalAudio.play().catch(e => console.log("Audio play blocked", e))
    } else {
      globalAudio.pause()
    }
  }

  const playNext = () => {
    currentTrackIndex = (currentTrackIndex + 1) % SONGS.length
    setTrackName(SONGS[currentTrackIndex].title)
    globalAudio.src = SONGS[currentTrackIndex].src
    globalAudio.play().catch(e => console.log("Audio play blocked", e))
    setIsPlaying(true)
  }

  return (
    <div 
      className="flex items-center mr-4 md:mr-6 bg-[rgba(10,10,15,0.4)] backdrop-blur-sm border border-[rgba(198,165,107,0.15)] rounded-full px-2 py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {(isPlaying || isHovered) && (
          <motion.div 
            initial={{ opacity: 0, width: 0, paddingRight: 0 }}
            animate={{ opacity: 1, width: "auto", paddingRight: 12 }}
            exit={{ opacity: 0, width: 0, paddingRight: 0 }}
            className="overflow-hidden whitespace-nowrap flex items-center gap-3 pl-3"
          >
            {/* Audio visualizer bars when playing */}
            {isPlaying && (
              <div className="flex items-end gap-[3px] h-3">
                <motion.div animate={{ height: ["4px", "12px", "4px"] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} className="w-[2px] bg-[#C6A56B]" />
                <motion.div animate={{ height: ["12px", "4px", "12px"] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} className="w-[2px] bg-[#C6A56B]" />
                <motion.div animate={{ height: ["6px", "14px", "6px"] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-[2px] bg-[#C6A56B]" />
              </div>
            )}
            <span className="text-[rgba(243,233,210,0.8)] text-[10px] md:text-[11px] font-sans font-medium uppercase tracking-[0.2em] mt-[1px]">
              {trackName}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-1">
        {isPlaying && (
          <button 
            onClick={playNext}
            className="text-[rgba(243,233,210,0.5)] hover:text-[#C6A56B] transition-colors p-1.5 rounded-full hover:bg-white/5"
            title="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        )}
        <button 
          onClick={togglePlay}
          className="text-[rgba(243,233,210,0.7)] hover:text-[#C6A56B] transition-colors p-1.5 rounded-full hover:bg-white/5"
          title={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

export default MusicPlayer
