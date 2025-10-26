import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { List, X, Phone } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'financing', label: 'Financing' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNavigate = (page: string) => {
    onNavigate(page)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => handleNavigate('home')}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-blue-500 tracking-tight hover:opacity-80 transition-opacity"
            >
              AUTOSITE
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-sm font-medium transition-colors relative group ${
                    currentPage === item.id
                      ? 'text-accent'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-purple-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => handleNavigate('contact')}
              >
                <Phone size={16} weight="duotone" />
                Contact Us
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {mobileMenuOpen ? (
                <X size={28} weight="bold" />
              ) : (
                <List size={28} weight="bold" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-accent to-purple-600"
                onClick={() => handleNavigate('contact')}
              >
                <Phone size={20} weight="duotone" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-20" />
    </>
  )
}
