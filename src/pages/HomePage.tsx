import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CATEGORIES, SAMPLE_LISTINGS } from '@/lib/data'
import { Category, Listing } from '@/lib/types'
import { useListings } from '@/lib/listings'
import { Car, Motorcycle, Truck, Van, Wrench, MagnifyingGlass, TrendUp, Calculator, ChartBar, Bell } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { listings } = useListings()
  
  const allListings = [...SAMPLE_LISTINGS, ...listings]
  const featuredListings = allListings.filter(l => l.isFeatured).slice(0, 6)

  const categoryIcons = {
    cars: Car,
    motorcycles: Motorcycle,
    trucks: Truck,
    rvs: Van,
    parts: Wrench
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate('category', { category: 'cars', search: searchQuery })
    }
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary via-purple-900 to-blue-900 text-primary-foreground py-24 md:py-32 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Find Your Perfect Vehicle
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
          >
            Browse thousands of cars, motorcycles, trucks, RVs, and parts from trusted sellers
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 max-w-2xl mx-auto"
          >
            <Input
              placeholder="Search for make, model, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
            />
            <Button onClick={handleSearch} size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
              <MagnifyingGlass size={20} weight="bold" />
              Search
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground text-lg">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {CATEGORIES.map((category) => {
              const Icon = categoryIcons[category.id]
              const count = allListings.filter(l => l.category === category.id).length
              
              return (
                <Card
                  key={category.id}
                  className="cursor-pointer group hover:border-accent hover:shadow-lg transition-all"
                  onClick={() => onNavigate('category', { category: category.id })}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={32} weight="duotone" className="text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                    <Badge variant="secondary">{count} listings</Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {featuredListings.length > 0 && (
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Listings</h2>
                <p className="text-muted-foreground text-lg">Handpicked premium vehicles</p>
              </div>
              <TrendUp size={32} weight="duotone" className="text-accent hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => onNavigate('listing', { id: listing.id })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Helpful Tools</h2>
            <p className="text-muted-foreground text-lg">Make smarter buying decisions with our suite of tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer group hover:border-accent hover:shadow-lg transition-all" onClick={() => onNavigate('calculators')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator size={32} weight="duotone" className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Financial Calculators</h3>
                <p className="text-muted-foreground">Calculate monthly payments and estimate trade-in values</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer group hover:border-accent hover:shadow-lg transition-all" onClick={() => onNavigate('comparison')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChartBar size={32} weight="duotone" className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Compare Vehicles</h3>
                <p className="text-muted-foreground">Side-by-side comparison of up to 3 vehicles</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer group hover:border-accent hover:shadow-lg transition-all" onClick={() => onNavigate('saved-searches')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bell size={32} weight="duotone" className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Saved Searches</h3>
                <p className="text-muted-foreground">Get alerts when new vehicles match your criteria</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

function ListingCard({ listing, onClick }: { listing: Listing; onClick: () => void }) {
  return (
    <Card className="cursor-pointer group hover:border-accent hover:shadow-lg transition-all overflow-hidden" onClick={onClick}>
      <div className="aspect-video relative overflow-hidden bg-muted">
        {listing.images[0] && (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {listing.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-accent to-purple-600">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{listing.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent">${listing.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">{listing.location}</span>
        </div>
      </CardContent>
    </Card>
  )
}
