import { motion } from 'framer-motion'
import { ArrowDown } from '@phosphor-icons/react'
import { Button } from './ui/button'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Premium Automotive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
              Excellence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of luxury vehicles. Each one a masterpiece of engineering and design.
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            onClick={() => {
              document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore Collection
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
        }}
      >
        <ArrowDown size={32} className="text-white/60" weight="bold" />
      </motion.div>
    </section>
  )
}
