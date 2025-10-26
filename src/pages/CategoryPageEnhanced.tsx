import { useState, useMemo, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { SAMPLE_LISTINGS, BRANDS_BY_CATEGORY, FUEL_TYPES, TRANSMISSIONS } from '@/lib/data'
import { Category, Listing } from '@/lib/types'
import { useListings } from '@/lib/listings'
import { useDebounce } from '@/hooks/use-debounce'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { VehicleCard } from '@/components/VehicleCard'
import { AdvancedSearchBar } from '@/components/AdvancedSearchBar'
import { InfiniteScrollListings } from '@/components/InfiniteScrollListings'
import { 
  Funnel, 
  X, 
  SortAscending, 
  Rows, 
  SquaresFour, 
  MagnifyingGlass,
  Faders,
  Star,
  Clock
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface CategoryPageEnhancedProps {
  category: Category
  params?: Record<string, string>
  onNavigate: (page: string, params?: Record<string, string>) => void
}

type ViewMode = 'grid' | 'list'
type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc' | 'popular'

interface FilterState {
  searchQuery: string
  selectedBrand: string
  priceMin: number
  priceMax: number
  yearMin: number
  yearMax: number
  maxMileage?: number
  selectedFuel: string
  selectedTransmission: string
  selectedCondition: string[]
  sortBy: SortOption
}

export function CategoryPageEnhanced({ category, params, onNavigate }: CategoryPageEnhancedProps) {
  const { listings } = useListings()
  const [showFilters, setShowFilters] = useState(true)
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('view-mode', 'grid')
  const [useInfiniteScroll, setUseInfiniteScroll] = useLocalStorage<boolean>('use-infinite-scroll', true)

  const currentYear = new Date().getFullYear()
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedBrand: '',
    priceMin: 0,
    priceMax: 200000,
    yearMin: 1990,
    yearMax: currentYear,
    maxMileage: undefined,
    selectedFuel: '',
    selectedTransmission: '',
    selectedCondition: [],
    sortBy: 'newest'
  })

  const debouncedSearch = useDebounce(filters.searchQuery, 300)

  useEffect(() => {
    if (params) {
      setFilters(prev => ({
        ...prev,
        ...(params.brand && { selectedBrand: params.brand }),
        ...(params.fuelType && { selectedFuel: params.fuelType }),
        ...(params.transmission && { selectedTransmission: params.transmission }),
        ...(params.minPrice && { priceMin: Number(params.minPrice) }),
        ...(params.maxPrice && { priceMax: Number(params.maxPrice) }),
        ...(params.yearFrom && { yearMin: Number(params.yearFrom) }),
        ...(params.yearTo && { yearMax: Number(params.yearTo) }),
        ...(params.mileageMax && { maxMileage: Number(params.mileageMax) }),
      }))
    }
  }, [params])

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }))
  }, [])

  const allListings = useMemo(() => {
    return [...SAMPLE_LISTINGS, ...listings]
  }, [listings])
  
  const filteredListings = useMemo(() => {
    let filtered = allListings.filter(l => l.category === category && l.status === 'active')

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      filtered = filtered.filter(l => 
        l.title.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query) ||
        l.brand?.toLowerCase().includes(query) ||
        l.model?.toLowerCase().includes(query) ||
        l.location?.toLowerCase().includes(query)
      )
    }

    if (filters.selectedBrand) {
      filtered = filtered.filter(l => l.brand === filters.selectedBrand)
    }

    filtered = filtered.filter(l => 
      l.price >= filters.priceMin && l.price <= filters.priceMax
    )

    filtered = filtered.filter(l => {
      if (!l.year) return false
      return l.year >= filters.yearMin && l.year <= filters.yearMax
    })

    if (filters.maxMileage !== undefined) {
      filtered = filtered.filter(l => {
        if (!l.mileage) return false
        return l.mileage <= filters.maxMileage!
      })
    }

    if (filters.selectedFuel) {
      filtered = filtered.filter(l => l.fuelType === filters.selectedFuel)
    }

    if (filters.selectedTransmission) {
      filtered = filtered.filter(l => l.transmission === filters.selectedTransmission)
    }

    if (filters.selectedCondition.length > 0) {
      filtered = filtered.filter(l => 
        l.condition && filters.selectedCondition.includes(l.condition)
      )
    }

    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'mileage-asc':
        filtered.sort((a, b) => (a.mileage || 0) - (b.mileage || 0))
        break
      case 'year-desc':
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0))
        break
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return filtered
  }, [allListings, category, debouncedSearch, filters])

  const searchSuggestions = useMemo(() => {
    const suggestions = new Set<string>()
    allListings.forEach(listing => {
      if (listing.brand) suggestions.add(listing.brand)
      if (listing.model) suggestions.add(`${listing.brand} ${listing.model}`)
      suggestions.add(listing.title)
    })
    return Array.from(suggestions).slice(0, 20)
  }, [allListings])

  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      selectedBrand: '',
      priceMin: 0,
      priceMax: 200000,
      yearMin: 1990,
      yearMax: currentYear,
      maxMileage: undefined,
      selectedFuel: '',
      selectedTransmission: '',
      selectedCondition: [],
      sortBy: 'newest'
    })
    toast.success('Filters cleared')
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.selectedBrand) count++
    if (filters.selectedFuel) count++
    if (filters.selectedTransmission) count++
    if (filters.selectedCondition.length > 0) count++
    if (filters.priceMin !== 0 || filters.priceMax !== 200000) count++
    if (filters.yearMin !== 1990 || filters.yearMax !== currentYear) count++
    if (filters.maxMileage) count++
    return count
  }, [filters, currentYear])

  const brands = BRANDS_BY_CATEGORY[category] || []

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-3 capitalize">{category}</h1>
            <p className="text-white/90 text-lg">
              {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} available
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full lg:w-80 flex-shrink-0"
              >
                <Card className="sticky top-20">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Faders size={20} weight="duotone" />
                        <h2 className="font-semibold text-lg">Filters</h2>
                        {activeFiltersCount > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                        disabled={activeFiltersCount === 0}
                      >
                        Clear All
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                          <MagnifyingGlass size={16} />
                          Search
                        </Label>
                        <AdvancedSearchBar
                          value={filters.searchQuery}
                          onChange={(value) => updateFilters({ searchQuery: value })}
                          suggestions={searchSuggestions}
                          placeholder="Search listings..."
                          className="w-full"
                        />
                      </div>

                      {brands.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Brand</Label>
                          <Select 
                            value={filters.selectedBrand} 
                            onValueChange={(value) => updateFilters({ selectedBrand: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="All brands" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All brands</SelectItem>
                              {brands.map((brand) => (
                                <SelectItem key={brand} value={brand}>
                                  {brand}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          Price Range: ${filters.priceMin.toLocaleString()} - ${filters.priceMax.toLocaleString()}
                        </Label>
                        <Slider
                          min={0}
                          max={200000}
                          step={1000}
                          value={[filters.priceMin, filters.priceMax]}
                          onValueChange={([min, max]) => 
                            updateFilters({ priceMin: min, priceMax: max })
                          }
                          className="mb-2"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          Year: {filters.yearMin} - {filters.yearMax}
                        </Label>
                        <Slider
                          min={1990}
                          max={currentYear}
                          step={1}
                          value={[filters.yearMin, filters.yearMax]}
                          onValueChange={([min, max]) => 
                            updateFilters({ yearMin: min, yearMax: max })
                          }
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Max Mileage: {filters.maxMileage ? `${filters.maxMileage.toLocaleString()} mi` : 'Any'}
                        </Label>
                        <Slider
                          min={0}
                          max={200000}
                          step={5000}
                          value={[filters.maxMileage || 200000]}
                          onValueChange={([value]) => 
                            updateFilters({ maxMileage: value === 200000 ? undefined : value })
                          }
                        />
                      </div>

                      {FUEL_TYPES && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Fuel Type</Label>
                          <Select 
                            value={filters.selectedFuel} 
                            onValueChange={(value) => updateFilters({ selectedFuel: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All types</SelectItem>
                              {FUEL_TYPES.map((fuel) => (
                                <SelectItem key={fuel} value={fuel}>
                                  {fuel}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {TRANSMISSIONS && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Transmission</Label>
                          <Select 
                            value={filters.selectedTransmission} 
                            onValueChange={(value) => updateFilters({ selectedTransmission: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All types</SelectItem>
                              {TRANSMISSIONS.map((trans) => (
                                <SelectItem key={trans} value={trans}>
                                  {trans}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label className="text-sm font-medium mb-3 block">Condition</Label>
                        <div className="space-y-2">
                          {(['new', 'used', 'certified'] as const).map((condition) => (
                            <div key={condition} className="flex items-center gap-2">
                              <Checkbox
                                id={condition}
                                checked={filters.selectedCondition.includes(condition)}
                                onCheckedChange={(checked) => {
                                  const newConditions = checked
                                    ? [...filters.selectedCondition, condition]
                                    : filters.selectedCondition.filter(c => c !== condition)
                                  updateFilters({ selectedCondition: newConditions })
                                }}
                              />
                              <Label 
                                htmlFor={condition} 
                                className="text-sm capitalize cursor-pointer"
                              >
                                {condition}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="flex-1 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <Funnel size={18} className="mr-2" />
                      {showFilters ? 'Hide' : 'Show'} Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <SquaresFour size={18} />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <Rows size={18} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="text-sm whitespace-nowrap hidden sm:block">Sort by:</Label>
                    <Select 
                      value={filters.sortBy} 
                      onValueChange={(value) => updateFilters({ sortBy: value as SortOption })}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            Newest First
                          </div>
                        </SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="year-desc">Year: Newest</SelectItem>
                        <SelectItem value="mileage-asc">Mileage: Lowest</SelectItem>
                        <SelectItem value="popular">
                          <div className="flex items-center gap-2">
                            <Star size={16} />
                            Most Popular
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {filteredListings.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MagnifyingGlass size={64} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No listings found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search terms
                    </p>
                    <Button onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            ) : (
              <>
                {useInfiniteScroll ? (
                  <InfiniteScrollListings
                    listings={filteredListings}
                    onNavigate={onNavigate}
                    pageSize={12}
                    viewMode={viewMode}
                  />
                ) : (
                  <div 
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'flex flex-col gap-6'
                    }
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredListings.map((listing, index) => (
                        <VehicleCard
                          key={listing.id}
                          listing={listing}
                          onNavigate={onNavigate}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
