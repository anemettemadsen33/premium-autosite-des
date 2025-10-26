import { useState, useMemo } from 'react'
import { VehicleCard } from '@/components/VehicleCard'
import { VehicleDetailModal } from '@/components/VehicleDetailModal'
import { ContactModal } from '@/components/ContactModal'
import { MOCK_VEHICLES } from '@/lib/data'
import { Vehicle } from '@/lib/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { 
  Funnel, 
  MagnifyingGlass, 
  X, 
  CarProfile,
  GridFour,
  Rows
} from '@phosphor-icons/react'

export function Inventory() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactVehicle, setContactVehicle] = useState<Vehicle | null>(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedSort, setSelectedSort] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(MOCK_VEHICLES.map(v => v.brand)))
    return uniqueBrands.sort()
  }, [])

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(MOCK_VEHICLES.map(v => v.year)))
    return uniqueYears.sort((a, b) => b - a)
  }, [])

  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = MOCK_VEHICLES

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(query) ||
        v.brand.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query)
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(v => v.type === selectedType)
    }

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(v => v.brand === selectedBrand)
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(v => v.year === parseInt(selectedYear))
    }

    filtered = filtered.filter(v => v.price >= priceRange[0] && v.price <= priceRange[1])

    if (showNewOnly) {
      filtered = filtered.filter(v => v.isNew)
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter(v => v.isFeatured)
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'year':
          return b.year - a.year
        case 'featured':
        default:
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return 0
      }
    })

    return sorted
  }, [searchQuery, selectedType, selectedBrand, selectedYear, priceRange, selectedSort, showNewOnly, showFeaturedOnly])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedType !== 'all') count++
    if (selectedBrand !== 'all') count++
    if (selectedYear !== 'all') count++
    if (priceRange[0] !== 0 || priceRange[1] !== 200000) count++
    if (showNewOnly) count++
    if (showFeaturedOnly) count++
    if (searchQuery) count++
    return count
  }, [selectedType, selectedBrand, selectedYear, priceRange, showNewOnly, showFeaturedOnly, searchQuery])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedBrand('all')
    setSelectedYear('all')
    setPriceRange([0, 200000])
    setShowNewOnly(false)
    setShowFeaturedOnly(false)
    setSelectedSort('featured')
  }

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setDetailModalOpen(true)
  }

  const handleContact = (vehicle: Vehicle) => {
    setContactVehicle(vehicle)
    setDetailModalOpen(false)
    setContactModalOpen(true)
  }

  return (
    <>
      <div className="min-h-screen pt-20 pb-24">
        <div className="bg-gradient-to-br from-primary via-primary to-purple-950 text-primary-foreground py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <CarProfile size={48} weight="duotone" className="text-accent" />
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  Vehicle Inventory
                </h1>
              </div>
              <p className="text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
                Browse our complete collection of {MOCK_VEHICLES.length} premium vehicles. Use the filters below to find your perfect match.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-24 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              <aside className="lg:col-span-1 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Funnel size={24} weight="duotone" className="text-accent" />
                      <h2 className="text-xl font-bold">Filters</h2>
                    </div>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs h-8"
                      >
                        <X size={14} className="mr-1" />
                        Clear ({activeFiltersCount})
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Search</Label>
                      <div className="relative">
                        <MagnifyingGlass 
                          size={18} 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                        />
                        <Input
                          type="text"
                          placeholder="Search vehicles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-11 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Vehicle Type</Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="coupe">Coupe</SelectItem>
                          <SelectItem value="sports">Sports Car</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Brand</Label>
                      <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="All Brands" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Brands</SelectItem>
                          {brands.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Year</Label>
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="All Years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Years</SelectItem>
                          {years.map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">
                        Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                      </Label>
                      <Slider
                        min={0}
                        max={200000}
                        step={5000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-4"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <button
                        onClick={() => setShowNewOnly(!showNewOnly)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                          showNewOnly 
                            ? 'border-accent bg-accent/10' 
                            : 'border-border hover:border-accent/30'
                        }`}
                      >
                        <span className="text-sm font-medium">New Vehicles Only</span>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          showNewOnly ? 'bg-accent border-accent' : 'border-muted-foreground'
                        }`}>
                          {showNewOnly && <span className="text-white text-xs">✓</span>}
                        </div>
                      </button>

                      <button
                        onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                          showFeaturedOnly 
                            ? 'border-accent bg-accent/10' 
                            : 'border-border hover:border-accent/30'
                        }`}
                      >
                        <span className="text-sm font-medium">Featured Only</span>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          showFeaturedOnly ? 'bg-accent border-accent' : 'border-muted-foreground'
                        }`}>
                          {showFeaturedOnly && <span className="text-white text-xs">✓</span>}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold">
                      {filteredAndSortedVehicles.length} {filteredAndSortedVehicles.length === 1 ? 'Vehicle' : 'Vehicles'}
                    </p>
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="rounded-full">
                        {activeFiltersCount} {activeFiltersCount === 1 ? 'Filter' : 'Filters'} Active
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Select value={selectedSort} onValueChange={setSelectedSort}>
                      <SelectTrigger className="w-[180px] h-10 rounded-xl">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name">Name: A to Z</SelectItem>
                        <SelectItem value="year">Newest First</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-1 border border-border rounded-xl p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'grid' 
                            ? 'bg-accent text-accent-foreground' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <GridFour size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'list' 
                            ? 'bg-accent text-accent-foreground' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <Rows size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {filteredAndSortedVehicles.length === 0 ? (
                  <div className="text-center py-24 bg-card rounded-3xl border border-border">
                    <CarProfile size={80} weight="duotone" className="text-muted-foreground mx-auto mb-6 opacity-40" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">No vehicles found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Try adjusting your filters or search query to find more vehicles.
                    </p>
                    <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                      <X size={18} className="mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className={
                    viewMode === 'grid' 
                      ? 'grid grid-cols-1 md:grid-cols-2 gap-8' 
                      : 'space-y-6'
                  }>
                    {filteredAndSortedVehicles.map((vehicle) => (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onClick={() => handleVehicleClick(vehicle)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <VehicleDetailModal
        vehicle={selectedVehicle}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        onContact={handleContact}
      />

      <ContactModal
        vehicle={contactVehicle}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </>
  )
}
