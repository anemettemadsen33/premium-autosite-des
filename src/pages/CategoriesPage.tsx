import { MainCategoryGrid } from '@/components/MainCategoryGrid'
import { Hero } from '@/components/Hero'
import { Button } from '@/components/ui/button'
import { SquaresFour } from '@phosphor-icons/react'

interface CategoriesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function CategoriesPage({ onNavigate }: CategoriesPageProps) {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-purple-500/20 to-blue-500/20">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-3 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl mb-6">
              <SquaresFour size={48} weight="duotone" className="text-accent" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              All Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive range of vehicles, machinery, and parts. 
              Find exactly what you need with our detailed category structure.
            </p>
          </div>
        </div>
      </div>

      <MainCategoryGrid onNavigate={onNavigate} />

      <div className="bg-gradient-to-br from-accent/10 to-purple-500/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Try our advanced search or contact our support team for assistance
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('home')}>
              Advanced Search
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('help-center')}>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
