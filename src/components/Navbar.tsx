import { useState } from 'react'
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface NavbarProps {
  setActivePage: (page: 'home' | 'synopsis' | 'characters') => void
}

const menuItems = [
  { label: 'Home', page: 'home', hasDropdown: false },
  { label: 'Synopsis', page: 'synopsis', hasDropdown: false },
  { label: 'Characters', page: 'characters', hasDropdown: true },
  { label: 'Author', page: 'author', hasDropdown: false },
]

const Navbar = ({ setActivePage }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="flex items-center justify-between py-5 md:py-6 px-6 md:px-10 lg:px-12 w-full relative z-50">
        {/* Left Side (Hamburger on Mobile, Spacer on Desktop) */}
        <div className="flex-1 flex items-center justify-start">
          <button 
            className="md:hidden text-[rgba(243,233,210,0.8)] hover:text-[#C6A56B] p-2 -ml-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Center Menu / Mobile Logo */}
        <div className="flex items-center justify-center">
          <ul className="hidden md:flex items-center gap-10 lg:gap-12 text-[rgba(243,233,210,0.72)] font-sans font-medium text-[15px]">
            {menuItems.map((item) => (
              <li
                key={item.label}
                onClick={() => {
                  if (item.page === 'home' || item.page === 'characters' || item.page === 'synopsis') {
                    setActivePage(item.page as 'home' | 'synopsis' | 'characters')
                  }
                }}
                className="cursor-pointer hover:text-[#F3E9D2] hover:drop-shadow-[0_0_8px_rgba(198,165,107,0.3)] transition-all duration-300 flex items-center gap-1.5 group"
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-50 transition-transform group-hover:translate-x-0.5" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Button */}
        <div className="flex-1 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center bg-[rgba(10,10,15,0.55)] backdrop-blur-md border border-[rgba(198,165,107,0.25)] text-[#F3E9D2] rounded-full pl-2.5 pr-4 md:pr-6 py-2 md:py-2.5 gap-2 md:gap-3 hover:border-[rgba(198,165,107,0.5)] hover:shadow-[0_0_24px_rgba(198,165,107,0.15)] transition-all duration-300 group"
          >
            <div className="bg-[rgba(198,165,107,0.15)] p-1.5 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C6A56B]" />
            </div>
            <span className="text-[12px] md:text-[14px] font-sans font-medium tracking-wide">Pre-Order</span>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#07090D]/90 flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-black/20 border border-white/5 text-[rgba(243,233,210,0.6)] hover:text-[#C6A56B] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <ul className="flex flex-col items-center gap-10 text-center">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    if (item.page === 'home' || item.page === 'characters' || item.page === 'synopsis') {
                      setTimeout(() => setActivePage(item.page as 'home' | 'synopsis' | 'characters'), 300)
                    }
                  }}
                  className="cursor-pointer"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="font-serif text-4xl text-[#F3E9D2] hover:text-[#C6A56B] transition-colors">
                      {item.label}
                    </span>
                    {item.page === 'home' || item.page === 'characters' || item.page === 'synopsis' ? null : (
                      <span className="block mt-2 font-sans text-xs text-[rgba(243,233,210,0.4)] uppercase tracking-widest">
                        Coming Soon
                      </span>
                    )}
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
