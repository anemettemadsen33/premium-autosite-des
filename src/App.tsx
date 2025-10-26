import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Services } from '@/pages/Services'
import { Financing } from '@/pages/Financing'
import { Contact } from '@/pages/Contact'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'services':
        return <Services />
      case 'financing':
        return <Financing />
      case 'contact':
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {renderPage()}

      <footer className="bg-gradient-to-br from-primary via-primary to-purple-950 text-primary-foreground py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">AUTOSITE</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Premium automotive excellence since 2009.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => setCurrentPage('home')} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('about')} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('services')} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('financing')} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    Financing
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>(555) 123-4567</li>
                <li>sales@autosite.com</li>
                <li>123 Luxury Auto Blvd</li>
                <li>Beverly Hills, CA 90210</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>Mon-Fri: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: 10:00 AM - 6:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent mb-8" />
          
          <div className="text-center">
            <p className="text-sm text-primary-foreground/50 font-medium tracking-wider">
              © 2024 AUTOSITE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

export default App