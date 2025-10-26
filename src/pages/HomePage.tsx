import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { CATEGORIES, SAMPLE_LISTINGS } from '@/lib/data'
import { Category, Listing, SearchFilters } from '@/lib/types'
import { useListings } from '@/lib/listings'
import { Car, Motorcycle, Truck, Van, Wrench, MagnifyingGlass, TrendUp, Calculator, ChartBar, Bell, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
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

const BRANDS = ['Tesla', 'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Ducati', 'Harley-Davidson']
const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid']

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
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'cars',
    brand: '',
    fuelType: '',
    minPrice: undefined,
    maxPrice: undefined,
    mileageMax: undefined,
    yearFrom: undefined,
    yearTo: undefined
  })
  
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
    const params: Record<string, string> = {
      category: filters.category || 'cars'
    }
    
    if (filters.brand) params.brand = filters.brand
    if (filters.fuelType) params.fuelType = filters.fuelType
    if (filters.minPrice) params.minPrice = filters.minPrice.toString()
    if (filters.maxPrice) params.maxPrice = filters.maxPrice.toString()
    if (filters.mileageMax) params.mileageMax = filters.mileageMax.toString()
    if (filters.yearFrom) params.yearFrom = filters.yearFrom.toString()
    if (filters.yearTo) params.yearTo = filters.yearTo.toString()
    
    onNavigate('category', params)
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary via-purple-900 to-blue-900 text-primary-foreground py-16 md:py-24 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Find Your Perfect Vehicle
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Browse thousands of cars, motorcycles, trucks, RVs, and parts from trusted sellers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand" className="text-foreground">Brand</Label>
                    <Select value={filters.brand || 'all-brands'} onValueChange={(value) => setFilters({ ...filters, brand: value === 'all-brands' ? '' : value })}>
                      <SelectTrigger id="brand">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-brands">All Brands</SelectItem>
                        {BRANDS.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-foreground">Category</Label>
                    <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value as Category })}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuel" className="text-foreground">Fuel Type</Label>
                    <Select value={filters.fuelType || 'all-fuel-types'} onValueChange={(value) => setFilters({ ...filters, fuelType: value === 'all-fuel-types' ? '' : value })}>
                      <SelectTrigger id="fuel">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-fuel-types">All Types</SelectItem>
                        {FUEL_TYPES.map(fuel => (
                          <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label className="text-foreground">Price Range</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice || ''}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ''}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mileage" className="text-foreground">Max Mileage (km)</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="e.g. 50000"
                      value={filters.mileageMax || ''}
                      onChange={(e) => setFilters({ ...filters, mileageMax: e.target.value ? Number(e.target.value) : undefined })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground">Year Range</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="From"
                        value={filters.yearFrom || ''}
                        onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value ? Number(e.target.value) : undefined })}
                      />
                      <Input
                        type="number"
                        placeholder="To"
                        value={filters.yearTo || ''}
                        onChange={(e) => setFilters({ ...filters, yearTo: e.target.value ? Number(e.target.value) : undefined })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSearch} size="lg" className="w-full gap-2">
                  <MagnifyingGlass size={20} weight="bold" />
                  Search Vehicles
                </Button>
              </CardContent>
            </Card>
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

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => onNavigate('categories')}>
              View All Main Categories
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-accent/10 via-purple-500/10 to-blue-500/10">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            <Sparkle className="mr-1" weight="fill" size={16} />
            New Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced AI-Powered Tools</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Discover our cutting-edge features including VIN scanning, video uploads, smart cost calculator, and AI-powered auto-tagging
          </p>
          <Button size="lg" onClick={() => onNavigate('advanced-tools')} className="gap-2">
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
