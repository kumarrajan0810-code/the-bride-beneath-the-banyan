import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import Navbar from './Navbar'

interface Character {
  id: string
  name: string
  image: string
  description: string[]
  metadata: Record<string, string>
  quote: string
  rotate: string
  position: { top: string, left: string }
}

const characters: Character[] = [
  {
    id: 'aniruddh',
    name: 'Dr. Aniruddh Sen',
    image: '/characters/Dr Aniruddh Sen.png',
    description: [
      'A physician from Calcutta sent to investigate the disappearances haunting Nayabganj.',
      'Sharp-minded and relentlessly rational, Dr. Sen trusts observation over superstition and logic over fear. He studies people with surgical precision, noticing details others instinctively avoid.',
      'But beneath his composed exterior lives a man exhausted by things he could not save — and truths he cannot fully outrun.'
    ],
    metadata: {
      'Age': '31',
      'Origin': 'Calcutta',
      'Occupation': 'Physician',
      'Status': 'Outsider'
    },
    quote: 'Fear is merely ignorance waiting to be examined.',
    rotate: '-rotate-2',
    position: { top: '0%', left: '50%' }
  },
  {
    id: 'mrinalini',
    name: 'Mrinalini',
    image: '/characters/Mrinalini.png',
    description: [
      'No one in Nayabganj agrees on who Mrinalini truly is.',
      'Some call her a widow. Others insist she should not exist at all. Yet she moves through the village with unsettling calm, as though every rumor belongs to someone else entirely.',
      'She listens more carefully than she speaks, and her silences often feel more dangerous than conversation.'
    ],
    metadata: {
      'Age': 'Unknown',
      'Residence': 'Unconfirmed',
      'Status': 'Watched By The Village'
    },
    quote: 'People fear what listens too carefully.',
    rotate: 'rotate-3',
    position: { top: '32%', left: '15%' }
  },
  {
    id: 'rajendra',
    name: 'Rajendra Halder',
    image: '/characters/Rajendra Halder.png',
    description: [
      'Master of the Halder estate and guardian of Nayabganj’s fragile order.',
      'Rajendra Halder is respected by the village, feared within his household, and burdened by responsibilities no one fully understands. He speaks with warmth, generosity, and practiced grace.',
      'Yet every conversation with him carries the strange feeling that something important has already been decided long before words are spoken.'
    ],
    metadata: {
      'Age': '58',
      'Occupation': 'Zamindar',
      'Status': 'Head of the Halder Estate'
    },
    quote: 'Villages survive because someone chooses which truths remain buried.',
    rotate: '-rotate-1',
    position: { top: '32%', left: '50%' }
  },
  {
    id: 'devendra',
    name: 'Devendra Halder',
    image: '/characters/Devendra Halder.png',
    description: [
      'The only son of the Halder estate — charming, reckless, and perpetually dissatisfied.',
      'Devendra moves through Nayabganj like a man waiting for disaster to arrive and almost hoping it does. Beneath his wit and carelessness lies an anger he rarely bothers hiding.',
      'Whether he becomes ally or threat depends entirely on which version of him appears that evening.'
    ],
    metadata: {
      'Age': '27',
      'Occupation': 'Heir to the Halder Estate',
      'Status': 'Frequently Unreliable'
    },
    quote: 'People inherit wounds more often than wealth.',
    rotate: 'rotate-2',
    position: { top: '32%', left: '85%' }
  },
  {
    id: 'charubala',
    name: 'Charubala',
    image: '/characters/Charubala.png',
    description: [
      'The oldest servant within the Halder estate and perhaps the quietest.',
      'Charubala moves through corridors unnoticed, listening far more than she speaks. She remembers generations of secrets, grief, betrayals, and rituals the household pretends to have forgotten.',
      'In Nayabganj, silence survives longer than truth — and no one understands silence better than her.'
    ],
    metadata: {
      'Age': 'Late 60s',
      'Occupation': 'Housekeeper',
      'Status': 'Trusted Within The Estate'
    },
    quote: 'Old houses do not forget. They simply wait.',
    rotate: '-rotate-3',
    position: { top: '64%', left: '15%' }
  },
  {
    id: 'haran',
    name: 'Haran Bhattacharya',
    image: '/characters/Haran Bhattacharya.png',
    description: [
      'Priest of Nayabganj and keeper of beliefs most villagers no longer admit aloud.',
      'Haran Bhattacharya publicly condemns superstition while privately fearing the stories buried beneath local folklore. His sermons speak of faith, discipline, and morality — but fear shadows him too closely for comfort.',
      'Some prayers are spoken to gods.\nOthers are spoken to keep something else away.'
    ],
    metadata: {
      'Age': '54',
      'Occupation': 'Village Priest',
      'Status': 'Religious Authority'
    },
    quote: 'There are places where prayer becomes negotiation.',
    rotate: 'rotate-1',
    position: { top: '64%', left: '50%' }
  },
  {
    id: 'kheya',
    name: 'Kheya',
    image: '/characters/Kheya.png',
    description: [
      'A boatman’s daughter who moves through the village unseen by the people who matter most.',
      'Kheya ferries passengers across narrow river channels, overhearing conversations never intended for her ears. Sharp-tongued, observant, and fearless around death, she notices patterns others dismiss too quickly.',
      'In a village built on hierarchy, invisibility can become its own kind of power.'
    ],
    metadata: {
      'Age': '17',
      'Occupation': 'Boatman’s Daughter',
      'Status': 'Ignored By Most Villagers'
    },
    quote: 'When people stop noticing you, they stop hiding things too.',
    rotate: '-rotate-2',
    position: { top: '64%', left: '85%' }
  }
]

const strings = [
  { x1: '50%', y1: '0%', x2: '15%', y2: '32%' },
  { x1: '50%', y1: '0%', x2: '50%', y2: '32%' },
  { x1: '50%', y1: '0%', x2: '85%', y2: '32%' },
  { x1: '15%', y1: '32%', x2: '50%', y2: '32%' },
  { x1: '50%', y1: '32%', x2: '85%', y2: '32%' },
  { x1: '15%', y1: '32%', x2: '15%', y2: '64%' },
  { x1: '50%', y1: '32%', x2: '50%', y2: '64%' },
  { x1: '85%', y1: '32%', x2: '85%', y2: '64%' },
  { x1: '15%', y1: '64%', x2: '50%', y2: '64%' },
  { x1: '50%', y1: '64%', x2: '85%', y2: '64%' },
  { x1: '15%', y1: '32%', x2: '50%', y2: '64%' },
  { x1: '85%', y1: '32%', x2: '50%', y2: '64%' }
]

interface CharactersProps {
  setActivePage: (page: 'home' | 'characters') => void
}

const Characters = ({ setActivePage }: CharactersProps) => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null)

  return (
    <section className="relative w-full h-screen bg-[#07090D] overflow-hidden flex flex-col" id="characters">
      {/* Navbar at top */}
      <div className="absolute top-0 left-0 w-full z-40 flex justify-center pt-3 md:pt-5 px-3 md:px-5 pointer-events-none">
        <div className="w-full max-w-[1536px] pointer-events-auto">
          <Navbar setActivePage={setActivePage} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-[12vh] sm:pt-[15vh] px-4 relative z-10 w-full">
        
        {/* Title */}
        <h1 className="font-script text-[#C6A56B] text-7xl md:text-8xl lg:text-[110px] leading-none drop-shadow-[0_4px_24px_rgba(198,165,107,0.15)] mb-8 md:mb-12">
          Characters
        </h1>

        {/* Investigative Board Layout */}
        <div className="relative w-full max-w-[800px] h-[60vh] md:h-[65vh]">
          
          {/* Connecting Strings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0 overflow-visible" preserveAspectRatio="none">
            {strings.map((line, idx) => (
              <line 
                key={idx} 
                x1={line.x1} y1={line.y1} 
                x2={line.x2} y2={line.y2} 
                stroke="#8B0000" 
                strokeWidth="1.5" 
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              />
            ))}
          </svg>

          {/* Photos */}
          {characters.map((char) => (
            <motion.div 
              key={char.id}
              whileHover={{ scale: 1.05, zIndex: 50 }}
              className={`absolute transform -translate-x-1/2 cursor-pointer group ${char.rotate} transition-all duration-500 z-10`}
              style={{ top: char.position.top, left: char.position.left }}
              onClick={() => setSelectedChar(char)}
            >
              {/* Red Pin */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-3 h-3 bg-red-800 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.9)] border border-red-950">
                <div className="absolute top-[2px] left-[2px] w-1 h-1 bg-white/30 rounded-full" />
              </div>

              {/* Photo Frame (Dark Luxury) */}
              <div className="bg-[#0A0C13] p-1.5 border border-[rgba(198,165,107,0.3)] shadow-[0_15px_35px_rgba(0,0,0,0.8)] w-[85px] sm:w-[110px] md:w-[130px] aspect-[3/4] group-hover:border-[rgba(198,165,107,0.6)] transition-colors duration-500">
                <div className="relative w-full h-full overflow-hidden bg-[#07090D]">
                  <img 
                    src={char.image} 
                    alt="Character Portrait"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Dossier Modal (Reverted to Dark Luxury) */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[#07090D]/90 backdrop-blur-xl cursor-pointer"
              onClick={() => setSelectedChar(null)}
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[1100px] max-h-[90vh] bg-[rgba(10,10,15,0.7)] backdrop-blur-2xl border border-[rgba(198,165,107,0.2)] rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedChar(null)}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 border border-white/5 text-[rgba(243,233,210,0.6)] hover:text-[#C6A56B] transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left: Large Portrait */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-[80vh] relative">
                <img 
                  src={selectedChar.image} 
                  alt="Character"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.9)] md:bg-gradient-to-r md:from-transparent md:to-[rgba(10,10,15,0.9)]" />
              </div>

              {/* Right: Dossier Info */}
              <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] overflow-y-auto p-8 md:p-12 flex flex-col custom-scrollbar">
                <div className="mb-8">
                  <span className="font-sans text-[11px] text-[#C6A56B] uppercase tracking-[0.2em] mb-2 block">
                    Forbidden Archive
                  </span>
                  <h3 className="font-serif text-5xl text-[#F3E9D2] leading-tight">
                    {selectedChar.name}
                  </h3>
                </div>

                <div className="space-y-6 mb-12">
                  {selectedChar.description.map((paragraph, idx) => (
                    <p key={idx} className="font-sans text-[rgba(243,233,210,0.75)] text-sm md:text-base leading-relaxed font-light">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Case Notes Metadata */}
                <div className="mb-12 border-l border-[rgba(198,165,107,0.3)] pl-6 py-2">
                  <span className="font-sans text-[10px] text-[rgba(243,233,210,0.4)] uppercase tracking-[0.2em] mb-4 block">
                    Case Notes // Classified
                  </span>
                  <ul className="space-y-3">
                    {Object.entries(selectedChar.metadata).map(([key, value]) => (
                      <li key={key} className="flex items-baseline gap-4 font-sans text-sm">
                        <span className="text-[rgba(243,233,210,0.5)] w-24 sm:w-32 uppercase tracking-wide text-xs">{key}</span>
                        <span className="text-[#F3E9D2]">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Signature Quote */}
                <div className="mt-auto pt-8 border-t border-white/5">
                  <p className="font-display italic text-[#C6A56B] text-xl md:text-2xl leading-relaxed">
                    "{selectedChar.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(198, 165, 107, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(198, 165, 107, 0.4);
        }
      `}} />
    </section>
  )
}

export default Characters
