import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { VehicleCard } from '@/components/VehicleCard'
import { InfiniteScrollListings } from '@/components/InfiniteScrollListings'
import { useListings } from '@/lib/listings'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useVehicleSubCategories } from '@/hooks/use-vehicle-sub-categories'
import { 
  type MainCategory, 
  type VehicleSubCategoryCode,
  MAIN_CATEGORIES,
  getMainCategoryByCode,
  getSubCategoryByCode 
} from '@/lib/vehicleSubCategories'
import { 
  Car, 
  Motorcycle, 
  Truck, 
  Tractor, 
  Wrench,
  SquaresFour,
  Rows,
  SortAscending,
  FunnelSimple,
  Check,
  House
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MainCategoryPageProps {
  mainCategoryCode: MainCategory
  subCategoryCode?: VehicleSubCategoryCode
  onNavigate: (page: string, params?: Record<string, string>) => void
}

type ViewMode = 'grid' | 'list'
type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc'

const CATEGORY_ICONS: Record<MainCategory, any> = {
  'Car': Car,
  'Motorbike': Motorcycle,
  'VanUpTo7500': Truck,
  'TruckOver7500': Truck,
  'ConstructionMachine': Tractor,
  'AgriculturalVehicle': Tractor,
  'Trailer': Truck,
  'Caravan': House,
  'SemiTrailer': Truck,
  'Parts': Wrench,
}

const CATEGORY_GRADIENTS: Record<MainCategory, string> = {
  'Car': 'from-blue-500/20 via-cyan-500/20 to-blue-600/20',
  'Motorbike': 'from-orange-500/20 via-red-500/20 to-orange-600/20',
  'VanUpTo7500': 'from-green-500/20 via-emerald-500/20 to-green-600/20',
  'TruckOver7500': 'from-indigo-500/20 via-purple-500/20 to-indigo-600/20',
  'ConstructionMachine': 'from-yellow-500/20 via-amber-500/20 to-yellow-600/20',
  'AgriculturalVehicle': 'from-lime-500/20 via-green-500/20 to-lime-600/20',
  'Trailer': 'from-teal-500/20 via-cyan-500/20 to-teal-600/20',
  'Caravan': 'from-pink-500/20 via-rose-500/20 to-pink-600/20',
  'SemiTrailer': 'from-violet-500/20 via-purple-500/20 to-violet-600/20',
  'Parts': 'from-gray-500/20 via-slate-500/20 to-gray-600/20',
}

export function MainCategoryPage({ mainCategoryCode, subCategoryCode, onNavigate }: MainCategoryPageProps) {
  const { listings } = useListings()
  const [selectedSubCategory, setSelectedSubCategory] = useState<VehicleSubCategoryCode | null>(subCategoryCode || null)
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('view-mode', 'grid')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)

  const mainCategoryInfo = getMainCategoryByCode(mainCategoryCode)
  const subCategories = useVehicleSubCategories(mainCategoryCode)
  const Icon = CATEGORY_ICONS[mainCategoryCode]

  useEffect(() => {
    setSelectedSubCategory(subCategoryCode || null)
  }, [subCategoryCode])

  const filteredListings = useMemo(() => {
    let filtered = listings.filter(listing => listing.mainCategory === mainCategoryCode)

    if (selectedSubCategory) {
      filtered = filtered.filter(listing => listing.subCategory === selectedSubCategory)
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
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
    }

    return filtered
  }, [listings, mainCategoryCode, selectedSubCategory, sortBy])

  const handleSubCategoryClick = (subCode: VehicleSubCategoryCode | null) => {
    setSelectedSubCategory(subCode)
    onNavigate('main-category', {
      mainCategory: mainCategoryCode,
      ...(subCode && { subCategory: subCode })
    })
  }

  const selectedSubCategoryInfo = selectedSubCategory ? getSubCategoryByCode(selectedSubCategory) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        CATEGORY_GRADIENTS[mainCategoryCode]
      )}>
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl">
                <Icon size={40} weight="duotone" className="text-accent" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {mainCategoryInfo?.label || 'Category'}
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>

            {selectedSubCategoryInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4"
              >
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Check size={14} weight="bold" className="mr-1" />
                  {selectedSubCategoryInfo.label}
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Sub-Categories</h2>
            {selectedSubCategory && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleSubCategoryClick(null)}
              >
                Clear Filter
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubCategoryClick(null)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                !selectedSubCategory
                  ? "border-accent bg-accent/10 shadow-md"
                  : "border-border bg-card hover:border-accent/50 hover:bg-accent/5"
              )}
            >
              <div className="font-medium text-sm mb-1">All</div>
              <div className="text-xs text-muted-foreground">
                {listings.filter(l => l.mainCategory === mainCategoryCode).length} items
              </div>
            </motion.button>

            {subCategories.map((subCat) => {
              const count = listings.filter(
                l => l.mainCategory === mainCategoryCode && l.subCategory === subCat.code
              ).length
              const isSelected = selectedSubCategory === subCat.code

              return (
                <motion.button
                  key={subCat.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubCategoryClick(subCat.code)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-left",
                    isSelected
                      ? "border-accent bg-accent/10 shadow-md"
                      : "border-border bg-card hover:border-accent/50 hover:bg-accent/5"
                  )}
                >
                  <div className="font-medium text-sm mb-1 line-clamp-2">
                    {subCat.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {count} item{count !== 1 ? 's' : ''}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex items-center justify-between mb-6">
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

          <div className="flex items-center gap-2">
            <SortAscending size={20} className="text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="mileage-asc">Mileage: Low to High</option>
              <option value="year-desc">Year: Newest First</option>
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredListings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="p-6 bg-muted/50 rounded-2xl inline-block mb-4">
                <Icon size={48} weight="duotone" className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No listings found</h3>
              <p className="text-muted-foreground mb-6">
                {selectedSubCategory 
                  ? `No listings in this sub-category yet.` 
                  : `No listings in this category yet.`
                }
              </p>
              <Button onClick={() => onNavigate('add-listing')}>
                Create First Listing
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "grid gap-6",
                viewMode === 'grid'
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              )}
            >
              {filteredListings.map((listing) => (
                <VehicleCard
                  key={listing.id}
                  listing={listing}
                  onNavigate={onNavigate}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
