import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { SAMPLE_LISTINGS, BRANDS_BY_CATEGORY, FUEL_TYPES, TRANSMISSIONS } from '@/lib/data'
import { Category, Listing } from '@/lib/types'
import { useListings } from '@/lib/listings'
import { Funnel, X, SortAscending } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface CategoryPageProps {
  category: Category
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function CategoryPage({ category, onNavigate }: CategoryPageProps) {
  const { listings } = useListings()
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000])
  const [selectedFuel, setSelectedFuel] = useState<string>('')
  const [selectedTransmission, setSelectedTransmission] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('newest')

  const allListings = [...SAMPLE_LISTINGS, ...listings]
  
  const filteredListings = useMemo(() => {
    let filtered = allListings.filter(l => l.category === category && l.status === 'active')

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(l => 
        l.title.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query) ||
        l.brand?.toLowerCase().includes(query) ||
        l.model?.toLowerCase().includes(query)
      )
    }

    if (selectedBrand) {
      filtered = filtered.filter(l => l.brand === selectedBrand)
    }

    filtered = filtered.filter(l => l.price >= priceRange[0] && l.price <= priceRange[1])

    if (selectedFuel) {
      filtered = filtered.filter(l => l.fuelType === selectedFuel)
    }

    if (selectedTransmission) {
      filtered = filtered.filter(l => l.transmission === selectedTransmission)
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return filtered
  }, [allListings, category, searchQuery, selectedBrand, priceRange, selectedFuel, selectedTransmission, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBrand('')
    setPriceRange([0, 200000])
    setSelectedFuel('')
    setSelectedTransmission('')
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 capitalize">{category}</h1>
          <p className="text-primary-foreground/80">{filteredListings.length} listings available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <Input
                    placeholder="Search listings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {category !== 'parts' && BRANDS_BY_CATEGORY[category] && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Brand</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="All brands" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All brands</SelectItem>
                        {BRANDS_BY_CATEGORY[category].map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={0}
                    max={200000}
                    step={1000}
                    className="mt-2"
                  />
                </div>

                {category !== 'parts' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fuel Type</label>
                      <Select value={selectedFuel} onValueChange={setSelectedFuel}>
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All types</SelectItem>
                          {FUEL_TYPES.map(fuel => (
                            <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Transmission</label>
                      <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All types</SelectItem>
                          {TRANSMISSIONS.map(trans => (
                            <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                className="md:hidden gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Funnel size={20} weight="duotone" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>

              <div className="flex items-center gap-2 ml-auto">
                <SortAscending size={20} weight="duotone" className="text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredListings.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground text-lg">No listings found matching your criteria</p>
                <Button onClick={clearFilters} className="mt-4">Clear Filters</Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredListings.map((listing) => (
                    <motion.div
                      key={listing.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ListingCard
                        listing={listing}
                        onClick={() => onNavigate('listing', { id: listing.id })}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ListingCard({ listing, onClick }: { listing: Listing; onClick: () => void }) {
  return (
    <Card className="cursor-pointer group hover:border-accent hover:shadow-lg transition-all overflow-hidden h-full" onClick={onClick}>
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
        <div className="flex flex-wrap gap-2 mb-3">
          {listing.year && <Badge variant="secondary">{listing.year}</Badge>}
          {listing.mileage && <Badge variant="secondary">{listing.mileage.toLocaleString()} mi</Badge>}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent">${listing.price.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
