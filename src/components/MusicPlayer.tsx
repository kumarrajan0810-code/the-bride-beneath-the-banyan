import { useState, useEffect, useRef, useCallback } from 'react'
import { Volume2, VolumeX, SkipForward, Play, Pause } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const SONGS = [
  { title: "Chhupe Kis Kahani", src: "/songs/छुपे किस कहानी.mp3" },
  { title: "Baarish Pehli Mitti", src: "/songs/बारिश पहली मिट्टी.mp3" }
]

const globalAudio = new Audio()
let currentTrackIndex = 0

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackName, setTrackName] = useState(SONGS[0].title)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const seekBarRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const updateTime = useCallback(() => {
    if (!isSeeking) {
      setCurrentTime(globalAudio.currentTime)
    }
    rafRef.current = requestAnimationFrame(updateTime)
  }, [isSeeking])

  useEffect(() => {
    setIsPlaying(!globalAudio.paused && globalAudio.currentTime > 0)
    setTrackName(SONGS[currentTrackIndex].title)

    const handleEnded = () => playNext()
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleDurationChange = () => setDuration(globalAudio.duration)
    const handleLoadedMetadata = () => setDuration(globalAudio.duration)

    globalAudio.addEventListener('ended', handleEnded)
    globalAudio.addEventListener('play', handlePlay)
    globalAudio.addEventListener('pause', handlePause)
    globalAudio.addEventListener('durationchange', handleDurationChange)
    globalAudio.addEventListener('loadedmetadata', handleLoadedMetadata)

    rafRef.current = requestAnimationFrame(updateTime)

    return () => {
      globalAudio.removeEventListener('ended', handleEnded)
      globalAudio.removeEventListener('play', handlePlay)
      globalAudio.removeEventListener('pause', handlePause)
      globalAudio.removeEventListener('durationchange', handleDurationChange)
      globalAudio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      cancelAnimationFrame(rafRef.current)
    }
  }, [updateTime])

  const togglePlay = () => {
    if (!globalAudio.src) {
      globalAudio.src = SONGS[currentTrackIndex].src
      globalAudio.volume = 0.5
    }

    if (globalAudio.paused) {
      globalAudio.play().catch(e => console.log("Audio play blocked", e))
      setIsExpanded(true)
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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!seekBarRef.current || !duration) return
    const rect = seekBarRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const pct = x / rect.width
    const newTime = pct * duration
    globalAudio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleSeekStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true)
    handleSeek(e)

    const onMove = (ev: MouseEvent) => handleSeek(ev)
    const onUp = () => {
      setIsSeeking(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const handleTouchSeek = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!seekBarRef.current || !duration) return
    const rect = seekBarRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    const pct = x / rect.width
    const newTime = pct * duration
    globalAudio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => { if (!isPlaying) setIsExpanded(false) }}
    >
      <AnimatePresence>
        {(isPlaying || isExpanded) && (
          <motion.div
            initial={{ opacity: 0, width: 0, marginRight: 0 }}
            animate={{ opacity: 1, width: "auto", marginRight: 8 }}
            exit={{ opacity: 0, width: 0, marginRight: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="bg-[rgba(10,10,15,0.6)] backdrop-blur-md border border-[rgba(198,165,107,0.15)] rounded-2xl px-4 py-2.5 min-w-[200px] md:min-w-[260px]">
              {/* Track name + time */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isPlaying && (
                    <div className="flex items-end gap-[2px] h-3">
                      <motion.div animate={{ height: ["3px", "11px", "3px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-[2px] bg-[#C6A56B] rounded-full" />
                      <motion.div animate={{ height: ["11px", "3px", "11px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-[2px] bg-[#C6A56B] rounded-full" />
                      <motion.div animate={{ height: ["5px", "13px", "5px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} className="w-[2px] bg-[#C6A56B] rounded-full" />
                    </div>
                  )}
                  <span className="text-[rgba(243,233,210,0.85)] text-[10px] md:text-[11px] font-sans font-medium uppercase tracking-[0.15em] truncate max-w-[120px] md:max-w-[160px]">
                    {trackName}
                  </span>
                </div>
                <span className="text-[rgba(243,233,210,0.4)] text-[9px] md:text-[10px] font-mono tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Seek bar */}
              <div
                ref={seekBarRef}
                className="relative w-full h-[6px] bg-[rgba(243,233,210,0.08)] rounded-full cursor-pointer group/seek"
                onMouseDown={handleSeekStart}
                onTouchMove={handleTouchSeek}
                onTouchStart={handleTouchSeek}
              >
                {/* Progress fill */}
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C6A56B] to-[#8E744A] rounded-full transition-none"
                  style={{ width: `${progress}%` }}
                />
                {/* Seek thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#C6A56B] rounded-full shadow-[0_0_6px_rgba(198,165,107,0.4)] opacity-0 group-hover/seek:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress}% - 5px)` }}
                />
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-center gap-3 mt-2">
                <button
                  onClick={togglePlay}
                  className="text-[rgba(243,233,210,0.8)] hover:text-[#C6A56B] transition-colors p-1 rounded-full hover:bg-white/5"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={playNext}
                  className="text-[rgba(243,233,210,0.5)] hover:text-[#C6A56B] transition-colors p-1 rounded-full hover:bg-white/5"
                  title="Next Track"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <button
        onClick={() => {
          if (!isPlaying && !isExpanded) {
            setIsExpanded(true)
          }
          togglePlay()
        }}
        className="flex items-center justify-center bg-[rgba(10,10,15,0.55)] backdrop-blur-md border border-[rgba(198,165,107,0.2)] rounded-full p-2.5 text-[rgba(243,233,210,0.7)] hover:text-[#C6A56B] hover:border-[rgba(198,165,107,0.4)] hover:shadow-[0_0_16px_rgba(198,165,107,0.1)] transition-all duration-300"
        title={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
  )
}

export default MusicPlayer
