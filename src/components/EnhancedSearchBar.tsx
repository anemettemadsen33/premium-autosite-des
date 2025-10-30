import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MagnifyingGlass, Funnel, X, SlidersHorizontal } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MAIN_CATEGORIES, 
  getSubCategoriesByMainCategory,
  type MainCategory,
  type VehicleSubCategoryCode 
} from '@/lib/vehicleSubCategories'

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

interface EnhancedSearchBarProps {
  onSearch: (filters: EnhancedSearchFilters) => void
  className?: string
}

const BRANDS = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Ford', 'Toyota', 'Honda', 
  'Nissan', 'Chevrolet', 'Tesla', 'Porsche', 'Ferrari', 'Lamborghini',
  'Ducati', 'Harley-Davidson', 'Yamaha', 'Kawasaki', 'Suzuki', 'Honda',
  'Volvo', 'MAN', 'Scania', 'DAF', 'Iveco', 'Mercedes', 'Renault',
  'Caterpillar', 'JCB', 'Komatsu', 'Hitachi', 'Liebherr',
  'John Deere', 'Fendt', 'Claas', 'New Holland', 'Massey Ferguson'
]

const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'Hydrogen', 'LPG', 'CNG']
const TRANSMISSIONS = ['Manual', 'Automatic', 'Semi-Automatic', 'CVT', 'DSG']
const CONDITIONS = ['New', 'Used', 'Certified Pre-Owned']

export function EnhancedSearchBar({ onSearch, className = '' }: EnhancedSearchBarProps) {
  const [filters, setFilters] = useState<EnhancedSearchFilters>({
    mainCategory: null,
    subCategory: null,
    query: '',
    brand: '',
    model: '',
    yearFrom: '',
    yearTo: '',
    priceMin: '',
    priceMax: '',
    mileageMax: '',
    fuelType: '',
    transmission: '',
    condition: '',
    location: ''
  })

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const subCategories = filters.mainCategory 
    ? getSubCategoriesByMainCategory(filters.mainCategory)
    : []

  const updateFilter = (key: keyof EnhancedSearchFilters, value: string | null) => {
    const newFilters = { ...filters, [key]: value || '' }
    
    if (key === 'mainCategory') {
      newFilters.subCategory = null
    }
    
    setFilters(newFilters)
    
    const count = Object.entries(newFilters).filter(([k, v]) => 
      v && k !== 'mainCategory' && k !== 'query'
    ).length
    setActiveFiltersCount(count)
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleReset = () => {
    setFilters({
      mainCategory: null,
      subCategory: null,
      query: '',
      brand: '',
      model: '',
      yearFrom: '',
      yearTo: '',
      priceMin: '',
      priceMax: '',
      mileageMax: '',
      fuelType: '',
      transmission: '',
      condition: '',
      location: ''
    })
    setActiveFiltersCount(0)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Card className={`bg-[#F9FAFB] border-[#CBD5E1] shadow-2xl ${className}`}>
      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            <div className="md:col-span-3">
              <Label htmlFor="main-category" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                Vehicle Type
              </Label>
              <Select 
                value={filters.mainCategory || 'all-types'}
                onValueChange={(value) => updateFilter('mainCategory', value === 'all-types' ? null : value as MainCategory)}
              >
                <SelectTrigger 
                  id="main-category" 
                  className="w-full h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] transition-colors"
                >
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  {MAIN_CATEGORIES.map(cat => (
                    <SelectItem key={cat.code} value={cat.code}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-3">
              <Label htmlFor="sub-category" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                Subcategory
              </Label>
              <Select 
                value={filters.subCategory || 'all-subcats'}
                onValueChange={(value) => updateFilter('subCategory', value === 'all-subcats' ? null : value)}
                disabled={!filters.mainCategory}
              >
                <SelectTrigger 
                  id="sub-category" 
                  className="w-full h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] transition-colors disabled:opacity-50"
                >
                  <SelectValue placeholder="All Subcategories" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="all-subcats">All Subcategories</SelectItem>
                  {subCategories.map(sub => (
                    <SelectItem key={sub.code} value={sub.code}>
                      {sub.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-4 relative">
              <Label htmlFor="search-query" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                Search Keywords
              </Label>
              <div className="relative">
                <MagnifyingGlass 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
                />
                <Input
                  id="search-query"
                  type="text"
                  placeholder="Brand, model, features..."
                  value={filters.query}
                  onChange={(e) => updateFilter('query', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-4 h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] placeholder:text-[#9CA3AF] transition-colors"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-end gap-2">
              <Button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                variant="outline"
                className="flex-1 h-10 border-[#CBD5E1] hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 transition-colors relative"
              >
                <SlidersHorizontal size={18} weight="bold" />
                {activeFiltersCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#7F00FF] text-white text-[10px] border-2 border-[#F9FAFB]"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Separator className="my-3 bg-[#CBD5E1]" />
                
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
                    <div>
                      <Label htmlFor="brand" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Brand
                      </Label>
                      <Select 
                        value={filters.brand || 'all-brands'}
                        onValueChange={(value) => updateFilter('brand', value === 'all-brands' ? '' : value)}
                      >
                        <SelectTrigger id="brand" className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] transition-colors">
                          <SelectValue placeholder="All Brands" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          <SelectItem value="all-brands">All Brands</SelectItem>
                          {BRANDS.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="model" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Model
                      </Label>
                      <Input
                        id="model"
                        type="text"
                        placeholder="e.g. A4, 320i"
                        value={filters.model}
                        onChange={(e) => updateFilter('model', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] placeholder:text-[#9CA3AF] transition-colors"
                      />
                    </div>

                    <div>
                      <Label htmlFor="condition" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Condition
                      </Label>
                      <Select 
                        value={filters.condition || 'all-conditions'}
                        onValueChange={(value) => updateFilter('condition', value === 'all-conditions' ? '' : value)}
                      >
                        <SelectTrigger id="condition" className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] transition-colors">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-conditions">Any</SelectItem>
                          {CONDITIONS.map(cond => (
                            <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Location
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="City or region"
                        value={filters.location}
                        onChange={(e) => updateFilter('location', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] placeholder:text-[#9CA3AF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Price Range
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.priceMin}
                          onChange={(e) => updateFilter('priceMin', e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] placeholder:text-[#9CA3AF] transition-colors"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.priceMax}
                          onChange={(e) => updateFilter('priceMax', e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] placeholder:text-[#9CA3AF] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Year Range
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="From"
                          value={filters.yearFrom}
                          onChange={(e) => updateFilter('yearFrom', e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] placeholder:text-[#9CA3AF] transition-colors"
                        />
                        <Input
                          type="number"
                          placeholder="To"
                          value={filters.yearTo}
                          onChange={(e) => updateFilter('yearTo', e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] placeholder:text-[#9CA3AF] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mileage" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Max Mileage (km)
                      </Label>
                      <Input
                        id="mileage"
                        type="number"
                        placeholder="e.g. 50000"
                        value={filters.mileageMax}
                        onChange={(e) => updateFilter('mileageMax', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] placeholder:text-[#9CA3AF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <div>
                      <Label htmlFor="fuel" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Fuel Type
                      </Label>
                      <Select 
                        value={filters.fuelType || 'all-fuel'}
                        onValueChange={(value) => updateFilter('fuelType', value === 'all-fuel' ? '' : value)}
                      >
                        <SelectTrigger id="fuel" className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] transition-colors">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-fuel">Any</SelectItem>
                          {FUEL_TYPES.map(fuel => (
                            <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="transmission" className="text-xs font-semibold mb-1.5 block text-[#2E2E2E]">
                        Transmission
                      </Label>
                      <Select 
                        value={filters.transmission || 'all-trans'}
                        onValueChange={(value) => updateFilter('transmission', value === 'all-trans' ? '' : value)}
                      >
                        <SelectTrigger id="transmission" className="h-10 border-[#CBD5E1] bg-white hover:border-[#4F46E5] focus:border-[#7F00FF] focus:ring-[#7F00FF] transition-colors">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-trans">Any</SelectItem>
                          {TRANSMISSIONS.map(trans => (
                            <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              onClick={handleSearch} 
              size="lg" 
              className="flex-1 h-11 gap-2 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] hover:from-[#7F00FF]/90 hover:to-[#E100FF]/90 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <MagnifyingGlass size={20} weight="bold" />
              Search Vehicles
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="h-11 gap-2 border-[#CBD5E1] hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 transition-colors"
              >
                <X size={20} />
                Reset
              </Button>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {Object.entries(filters).map(([key, value]) => {
                if (!value || key === 'mainCategory' || key === 'query') return null
                
                let displayValue = value
                if (key === 'subCategory') {
                  const sub = subCategories.find(s => s.code === value)
                  displayValue = sub?.label || value
                }
                
                return (
                  <Badge 
                    key={key} 
                    className="gap-1 pl-3 pr-2 py-1.5 bg-[#7F00FF]/10 text-[#7F00FF] border border-[#7F00FF]/20 hover:bg-[#7F00FF]/20 transition-colors"
                  >
                    <span className="text-xs font-semibold capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}: {displayValue}
                    </span>
                    <button
                      onClick={() => updateFilter(key as keyof EnhancedSearchFilters, null)}
                      className="ml-1 hover:bg-[#7F00FF]/30 rounded-full p-0.5 transition-colors"
                    >
                      <X size={12} weight="bold" />
                    </button>
                  </Badge>
                )
              })}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
