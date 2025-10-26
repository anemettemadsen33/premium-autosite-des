import { useState } from 'react'
import { AuthProvider } from '@/lib/auth'
import { ThemeProvider } from '@/lib/theme'
import { LayoutNavbar } from '@/components/LayoutNavbar'
import { LayoutFooter } from '@/components/LayoutFooter'
import { HomePage } from '@/pages/HomePage'
import { CategoryPage } from '@/pages/CategoryPage'
import { ListingDetailPage } from '@/pages/ListingDetailPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { MyListingsPage } from '@/pages/MyListingsPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { MessagesPage } from '@/pages/MessagesPage'
import { AddListingPage } from '@/pages/AddListingPage'
import { AboutPage } from '@/pages/AboutPage'
import { TermsPage } from '@/pages/TermsPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { Toaster } from '@/components/ui/sonner'
import type { Category } from '@/lib/types'

type Route = {
  page: string
  params?: Record<string, string>
}

function App() {
  const [route, setRoute] = useState<Route>({ page: 'home' })

  const navigate = (page: string, params?: Record<string, string>) => {
    setRoute({ page, params })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return <HomePage onNavigate={navigate} />
      case 'category':
        return <CategoryPage category={route.params?.category as Category} onNavigate={navigate} />
      case 'listing':
        return <ListingDetailPage listingId={route.params?.id || ''} onNavigate={navigate} />
      case 'login':
        return <LoginPage onNavigate={navigate} />
      case 'register':
        return <RegisterPage onNavigate={navigate} />
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} />
      case 'my-listings':
        return <MyListingsPage onNavigate={navigate} />
      case 'favorites':
        return <FavoritesPage onNavigate={navigate} />
      case 'messages':
        return <MessagesPage onNavigate={navigate} />
      case 'add-listing':
        return <AddListingPage onNavigate={navigate} />
      case 'about':
        return <AboutPage onNavigate={navigate} />
      case 'terms':
        return <TermsPage onNavigate={navigate} />
      case 'privacy':
        return <PrivacyPage onNavigate={navigate} />
      default:
        return <NotFoundPage onNavigate={navigate} />
    }
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <LayoutNavbar currentPage={route.page} onNavigate={navigate} />
          
          <main className="flex-1">
            {renderPage()}
          </main>

          <LayoutFooter onNavigate={navigate} />

          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
