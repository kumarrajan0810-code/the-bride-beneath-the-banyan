import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Characters from './components/Characters'
import Synopsis from './components/Synopsis'

function App() {
  const [activePage, setActivePage] = useState<'home' | 'synopsis' | 'characters'>('home')

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activePage])

  return (
    <main className="min-h-screen bg-[#07090D] selection:bg-[#C6A56B] selection:text-[#07090D]">
      {activePage === 'home' && <Hero setActivePage={setActivePage} />}
      {activePage === 'synopsis' && <Synopsis setActivePage={setActivePage} />}
      {activePage === 'characters' && <Characters setActivePage={setActivePage} />}
    </main>
  )
}

export default App
