import { motion } from 'framer-motion'
import { ArrowDown, Sparkle } from '@phosphor-icons/react'
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-950/30 to-background/95" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <Sparkle size={18} weight="fill" className="text-accent" />
            <span className="text-sm text-white/90 font-medium tracking-wide">Premium Automotive Experience</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
            Where Dreams
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-blue-400 animate-gradient">
              Meet Reality
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Discover our curated collection of luxury vehicles. Each one a masterpiece of engineering and design, crafted for those who demand excellence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-accent to-purple-500 hover:from-accent/90 hover:to-purple-600 text-white text-base px-10 py-7 rounded-full shadow-2xl shadow-accent/20 hover:shadow-accent/40 transition-all hover:scale-105 border border-white/10 backdrop-blur-sm font-medium"
              onClick={() => {
                document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore Collection
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.5 },
          y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
        }}
      >
        <ArrowDown size={28} className="text-white/40" weight="bold" />
      </motion.div>
    </section>
  )
}
