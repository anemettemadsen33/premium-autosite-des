import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Funnel, Sparkle } from '@phosphor-icons/react'
import { MAIN_CATEGORIES, type MainCategory, type VehicleSubCategoryCode } from '@/lib/vehicleSubCategories'
import { useVehicleSubCategories } from '@/hooks/use-vehicle-sub-categories'

interface FilterBarProps {
  selectedType: string
  onTypeChange: (value: string) => void
  selectedSort: string
  onSortChange: (value: string) => void
  selectedMainCategory?: MainCategory | null
  onMainCategoryChange?: (value: MainCategory | null) => void
  selectedSubCategory?: VehicleSubCategoryCode | null
  onSubCategoryChange?: (value: VehicleSubCategoryCode | null) => void
}

export function FilterBar({ 
  selectedType, 
  onTypeChange, 
  selectedSort, 
  onSortChange,
  selectedMainCategory,
  onMainCategoryChange,
  selectedSubCategory,
  onSubCategoryChange
}: FilterBarProps) {
  const subCategories = useVehicleSubCategories(selectedMainCategory || null)

  const handleMainCategoryChange = (value: string) => {
    if (onMainCategoryChange) {
      const newMainCategory = value === 'all' ? null : (value as MainCategory)
      onMainCategoryChange(newMainCategory)
      if (onSubCategoryChange) {
        onSubCategoryChange(null)
      }
    }
  }

  const handleSubCategoryChange = (value: string) => {
    if (onSubCategoryChange) {
      onSubCategoryChange(value === 'all' ? null : (value as VehicleSubCategoryCode))
    }
  }

  return (
    <div className="bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-2xl p-8 mb-12 backdrop-blur-sm shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-accent/10 rounded-xl">
          <Funnel size={24} weight="duotone" className="text-accent" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Filter & Sort</h3>
          <p className="text-sm text-muted-foreground">Find your perfect vehicle</p>
        </div>
        <Sparkle size={20} weight="fill" className="text-accent/40 ml-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {onMainCategoryChange && (
          <div>
            <Label className="text-sm mb-3 block font-semibold text-foreground">Main Category</Label>
            <Select value={selectedMainCategory || 'all'} onValueChange={handleMainCategoryChange}>
              <SelectTrigger className="h-12 rounded-xl border-border/50 hover:border-accent/30 transition-colors bg-background">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {MAIN_CATEGORIES.map(cat => (
                  <SelectItem key={cat.code} value={cat.code}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {onSubCategoryChange && selectedMainCategory && (
          <div>
            <Label className="text-sm mb-3 block font-semibold text-foreground">Sub-Category</Label>
            <Select 
              value={selectedSubCategory || 'all'} 
              onValueChange={handleSubCategoryChange}
              disabled={!selectedMainCategory}
            >
              <SelectTrigger className="h-12 rounded-xl border-border/50 hover:border-accent/30 transition-colors bg-background disabled:opacity-50">
                <SelectValue placeholder="All Sub-Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sub-Categories</SelectItem>
                {subCategories.map(sub => (
                  <SelectItem key={sub.code} value={sub.code}>
                    {sub.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label className="text-sm mb-3 block font-semibold text-foreground">Vehicle Type</Label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="h-12 rounded-xl border-border/50 hover:border-accent/30 transition-colors bg-background">
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
          <Label className="text-sm mb-3 block font-semibold text-foreground">Sort By</Label>
          <Select value={selectedSort} onValueChange={onSortChange}>
            <SelectTrigger className="h-12 rounded-xl border-border/50 hover:border-accent/30 transition-colors bg-background">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
              <SelectItem value="year">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
