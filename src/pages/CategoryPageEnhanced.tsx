import { useState, useMemo, useEffect, useCallback } from 'react'
import { SAMPLE_LISTINGS, BRANDS_BY_CATEGORY } from '@/lib/data'
import { Category, Listing } from '@/lib/types'
import { useListings } from '@/lib/listings'
import { useDebounce } from '@/hooks/use-debounce'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { InfiniteScrollListings } from '@/components/InfiniteScrollListings'
import { CategoryPageHeader } from '@/components/CategoryPageHeader'
import { CategoryFilters } from '@/components/CategoryFilters'
import { CategoryToolbar } from '@/components/CategoryToolbar'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import type { MainCategory, VehicleSubCategoryCode } from '@/lib/vehicleSubCategories'
import { useVehicleSubCategories } from '@/hooks/use-vehicle-sub-categories'

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
  mainCategory?: MainCategory | null
  subCategory?: VehicleSubCategoryCode | null
}

export function CategoryPageEnhanced({ category, params, onNavigate }: CategoryPageEnhancedProps) {
  const { listings } = useListings()
  const [showFilters, setShowFilters] = useState(true)
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('view-mode', 'grid')

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
    sortBy: 'newest',
    mainCategory: null,
    subCategory: null,
  })

  const subCategories = useVehicleSubCategories(filters.mainCategory || null)

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
        ...(params.mainCategory && { mainCategory: params.mainCategory as MainCategory }),
        ...(params.subCategory && { subCategory: params.subCategory as VehicleSubCategoryCode }),
      }))
    }
  }, [params])

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }))
  }, [])

  const handleMainCategoryChange = useCallback((mainCategory: MainCategory | null) => {
    setFilters(prev => ({
      ...prev,
      mainCategory,
      subCategory: null,
    }))
  }, [])

  const handleSubCategoryChange = useCallback((subCategory: VehicleSubCategoryCode | null) => {
    setFilters(prev => ({ ...prev, subCategory }))
  }, [])

  const allListings = useMemo(() => {
    return [...SAMPLE_LISTINGS, ...listings]
  }, [listings])
  
  const filteredListings = useMemo(() => {
    let filtered = allListings.filter(l => l.category === category && l.status === 'active')

    if (filters.mainCategory) {
      filtered = filtered.filter(l => l.mainCategory === filters.mainCategory)
    }

    if (filters.subCategory) {
      filtered = filtered.filter(l => l.subCategory === filters.subCategory)
    }

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
      sortBy: 'newest',
      mainCategory: null,
      subCategory: null,
    })
    toast.success('Filters cleared')
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.mainCategory) count++
    if (filters.subCategory) count++
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
      <CategoryPageHeader category={category} listingCount={filteredListings.length} />

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
                <CategoryFilters
                  filters={filters}
                  activeFiltersCount={activeFiltersCount}
                  brands={brands}
                  subCategories={subCategories}
                  searchSuggestions={searchSuggestions}
                  currentYear={currentYear}
                  onUpdateFilters={updateFilters}
                  onMainCategoryChange={handleMainCategoryChange}
                  onSubCategoryChange={handleSubCategoryChange}
                  onClearAll={clearAllFilters}
                />
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="flex-1 min-w-0">
            <CategoryToolbar
              showFilters={showFilters}
              viewMode={viewMode}
              sortBy={filters.sortBy}
              activeFiltersCount={activeFiltersCount}
              onToggleFilters={() => setShowFilters(!showFilters)}
              onViewModeChange={setViewMode}
              onSortChange={(sortBy) => updateFilters({ sortBy })}
            />

            {filteredListings.length === 0 ? (
              <EmptyState onClearFilters={clearAllFilters} />
            ) : (
              <ListingsDisplay
                listings={filteredListings}
                viewMode={viewMode}
                onNavigate={onNavigate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="border rounded-lg p-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No listings found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search terms
        </p>
        <button 
          onClick={onClearFilters}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Clear All Filters
        </button>
      </motion.div>
    </div>
  )
}

function ListingsDisplay({ 
  listings, 
  viewMode, 
  onNavigate 
}: { 
  listings: Listing[]
  viewMode: ViewMode
  onNavigate: (page: string, params?: Record<string, string>) => void 
}) {
  return (
    <InfiniteScrollListings
      listings={listings}
      onNavigate={onNavigate}
      pageSize={12}
      viewMode={viewMode}
    />
  )
}
