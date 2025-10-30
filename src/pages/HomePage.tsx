import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CATEGORIES, SAMPLE_LISTINGS } from '@/lib/data'
import { Listing } from '@/lib/types'
import { useListings } from '@/lib/listings'
import { Car, Motorcycle, Truck, Van, Wrench, TrendUp, Calculator, ChartBar, Bell, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { EnhancedSearchBar } from '@/components/EnhancedSearchBar'
import type { MainCategory, VehicleSubCategoryCode } from '@/lib/vehicleSubCategories'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

interface EnhancedSearchFilters {
  mainCategory: MainCategory | null
  subCategory: VehicleSubCategoryCode | null
  query: string
  brand: string
  model: string
  yearFrom: string
  yearTo: string
  priceMin: string
  priceMax: string
  mileageMax: string
  fuelType: string
  transmission: string
  condition: string
  location: string
}

const PROMO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format',
    title: 'Premium Selection',
    description: 'Discover luxury vehicles from top brands'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format',
    title: 'Best Deals',
    description: 'Find incredible offers on quality vehicles'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format',
    title: 'Trusted Sellers',
    description: 'Buy with confidence from verified dealers'
  }
]

export function HomePage({ onNavigate }: HomePageProps) {
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

  const handleSearch = (filters: EnhancedSearchFilters) => {
    const params: Record<string, string> = {}
    
    if (filters.mainCategory) params.mainCategory = filters.mainCategory
    if (filters.subCategory) params.subCategory = filters.subCategory
    if (filters.query) params.query = filters.query
    if (filters.brand) params.brand = filters.brand
    if (filters.model) params.model = filters.model
    if (filters.yearFrom) params.yearFrom = filters.yearFrom
    if (filters.yearTo) params.yearTo = filters.yearTo
    if (filters.priceMin) params.priceMin = filters.priceMin
    if (filters.priceMax) params.priceMax = filters.priceMax
    if (filters.mileageMax) params.mileageMax = filters.mileageMax
    if (filters.fuelType) params.fuelType = filters.fuelType
    if (filters.transmission) params.transmission = filters.transmission
    if (filters.condition) params.condition = filters.condition
    if (filters.location) params.location = filters.location
    
    onNavigate('main-category', params)
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#7F00FF] via-[#9D00FF] to-[#E100FF] text-white py-16 md:py-24 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Find Your Perfect Vehicle
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Browse thousands of cars, motorcycles, trucks, and more from trusted sellers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <EnhancedSearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {PROMO_SLIDES.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-8 text-white">
                        <h3 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h3>
                        <p className="text-lg md:text-xl text-white/90">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
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
                  className="cursor-pointer group hover:border-[#7F00FF] hover:shadow-lg transition-all duration-300"
                  onClick={() => onNavigate('category', { category: category.id })}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#7F00FF] to-[#E100FF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon size={32} weight="duotone" className="text-white" />
                    </div>
                    <h3 className="font-semibold mb-1 text-[#2E2E2E]">{category.name}</h3>
                    <p className="text-sm text-[#9CA3AF] mb-2">{category.description}</p>
                    <Badge className="bg-[#7F00FF]/10 text-[#7F00FF] border border-[#7F00FF]/20 hover:bg-[#7F00FF]/20">{count} listings</Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => onNavigate('categories')}
              className="border-[#CBD5E1] hover:border-[#7F00FF] hover:bg-[#7F00FF]/5 transition-colors"
            >
              View All Main Categories
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#7F00FF]/10 via-[#B800FF]/10 to-[#E100FF]/10">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white border-none hover:shadow-lg">
            <Sparkle className="mr-1" weight="fill" size={16} />
            New Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2E2E2E]">Advanced AI-Powered Tools</h2>
          <p className="text-[#9CA3AF] text-lg mb-8 max-w-2xl mx-auto">
            Discover our cutting-edge features including VIN scanning, video uploads, smart cost calculator, and AI-powered auto-tagging
          </p>
          <Button 
            size="lg" 
            onClick={() => onNavigate('advanced-tools')} 
            className="gap-2 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] hover:from-[#7F00FF]/90 hover:to-[#E100FF]/90 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Sparkle weight="fill" />
            Explore Advanced Tools
          </Button>
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
            <Card className="cursor-pointer group hover:border-[#4F46E5] hover:shadow-lg transition-all duration-300" onClick={() => onNavigate('calculators')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#4F46E5] to-[#7F00FF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calculator size={32} weight="duotone" className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#2E2E2E]">Financial Calculators</h3>
                <p className="text-[#9CA3AF]">Calculate monthly payments and estimate trade-in values</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer group hover:border-[#7F00FF] hover:shadow-lg transition-all duration-300" onClick={() => onNavigate('comparison')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#7F00FF] to-[#E100FF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ChartBar size={32} weight="duotone" className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#2E2E2E]">Compare Vehicles</h3>
                <p className="text-[#9CA3AF]">Side-by-side comparison of up to 3 vehicles</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer group hover:border-[#4F46E5] hover:shadow-lg transition-all duration-300" onClick={() => onNavigate('saved-searches')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#4F46E5] to-[#7F00FF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Bell size={32} weight="duotone" className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#2E2E2E]">Saved Searches</h3>
                <p className="text-[#9CA3AF]">Get alerts when new vehicles match your criteria</p>
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
    <Card className="cursor-pointer group hover:border-[#7F00FF] hover:shadow-lg transition-all duration-300 overflow-hidden" onClick={onClick}>
      <div className="aspect-video relative overflow-hidden bg-muted">
        {listing.images[0] && (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {listing.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white border-none shadow-md">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-[#2E2E2E]">{listing.title}</h3>
        <p className="text-sm text-[#9CA3AF] mb-3 line-clamp-2">{listing.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#7F00FF] to-[#E100FF] bg-clip-text text-transparent">${listing.price.toLocaleString()}</span>
          <span className="text-sm text-[#9CA3AF]">{listing.location}</span>
        </div>
      </CardContent>
    </Card>
  )
}
