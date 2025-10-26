import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { useTheme } from '@/lib/theme'
import { 
  List, X, User, SignIn, SignOut, Moon, Sun, 
  Heart, ChatCircle, Plus, GridFour, Article, ChartLine,
  Calculator, MagnifyingGlass, ChartBar
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface LayoutNavbarProps {
  currentPage: string
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function LayoutNavbar({ currentPage, onNavigate }: LayoutNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'market-insights', label: 'Market Insights' },
    { id: 'calculators', label: 'Calculators' },
    { id: 'about', label: 'About' },
  ]

  const handleNavigate = (page: string, params?: Record<string, string>) => {
    onNavigate(page, params)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    handleNavigate('home')
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNavigate('home')}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-blue-500 tracking-tight hover:opacity-80 transition-opacity"
            >
              AUTOSITE
            </button>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-sm font-medium transition-colors relative ${
                    currentPage === item.id
                      ? 'text-accent'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[1.3rem] left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-purple-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleTheme}
                className="gap-2"
              >
                {theme === 'light' ? (
                  <Moon size={18} weight="duotone" />
                ) : (
                  <Sun size={18} weight="duotone" />
                )}
              </Button>

              {isAuthenticated ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleNavigate('add-listing')}
                    className="gap-2"
                  >
                    <Plus size={18} weight="bold" />
                    Add Listing
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-2">
                        <User size={18} weight="duotone" />
                        {user?.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleNavigate('dashboard')}>
                        <GridFour size={16} weight="duotone" className="mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate('my-listings')}>
                        <Article size={16} weight="duotone" className="mr-2" />
                        My Listings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate('favorites')}>
                        <Heart size={16} weight="duotone" className="mr-2" />
                        Favorites
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate('messages')}>
                        <ChatCircle size={16} weight="duotone" className="mr-2" />
                        Messages
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleNavigate('saved-searches')}>
                        <MagnifyingGlass size={16} weight="duotone" className="mr-2" />
                        Saved Searches
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate('comparison')}>
                        <ChartBar size={16} weight="duotone" className="mr-2" />
                        Compare
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <SignOut size={16} weight="duotone" className="mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleNavigate('login')}
                    className="gap-2"
                  >
                    <SignIn size={18} weight="duotone" />
                    Login
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2 bg-gradient-to-r from-accent to-purple-600"
                    onClick={() => handleNavigate('register')}
                  >
                    <User size={18} weight="duotone" />
                    Register
                  </Button>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {mobileMenuOpen ? (
                <X size={24} weight="bold" />
              ) : (
                <List size={24} weight="bold" />
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
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 space-y-2">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={toggleTheme}
                  className="w-full gap-2"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon size={20} weight="duotone" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun size={20} weight="duotone" />
                      Light Mode
                    </>
                  )}
                </Button>

                {isAuthenticated ? (
                  <>
                    <Button
                      size="lg"
                      variant="default"
                      onClick={() => handleNavigate('add-listing')}
                      className="w-full gap-2 bg-gradient-to-r from-accent to-purple-600"
                    >
                      <Plus size={20} weight="bold" />
                      Add Listing
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => handleNavigate('dashboard')}
                      className="w-full gap-2"
                    >
                      <GridFour size={20} weight="duotone" />
                      Dashboard
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => handleNavigate('favorites')}
                      className="w-full gap-2"
                    >
                      <Heart size={20} weight="duotone" />
                      Favorites
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => handleNavigate('messages')}
                      className="w-full gap-2"
                    >
                      <ChatCircle size={20} weight="duotone" />
                      Messages
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full gap-2"
                    >
                      <SignOut size={20} weight="duotone" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => handleNavigate('login')}
                      className="w-full gap-2"
                    >
                      <SignIn size={20} weight="duotone" />
                      Login
                    </Button>
                    <Button
                      size="lg"
                      className="w-full gap-2 bg-gradient-to-r from-accent to-purple-600"
                      onClick={() => handleNavigate('register')}
                    >
                      <User size={20} weight="duotone" />
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
