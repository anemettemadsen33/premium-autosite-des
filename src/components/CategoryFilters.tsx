import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { AdvancedSearchBar } from '@/components/AdvancedSearchBar'
import { FUEL_TYPES, TRANSMISSIONS } from '@/lib/data'
import { MAIN_CATEGORIES } from '@/lib/vehicleSubCategories'
import type { MainCategory, VehicleSubCategory, VehicleSubCategoryCode } from '@/lib/vehicleSubCategories'
import { Faders, MagnifyingGlass } from '@phosphor-icons/react'

interface CategoryFiltersProps {
  filters: {
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
    mainCategory?: MainCategory | null
    subCategory?: VehicleSubCategoryCode | null
  }
  activeFiltersCount: number
  brands: string[]
  subCategories: VehicleSubCategory[]
  searchSuggestions: string[]
  currentYear: number
  onUpdateFilters: (updates: Partial<CategoryFiltersProps['filters']>) => void
  onMainCategoryChange: (mainCategory: MainCategory | null) => void
  onSubCategoryChange: (subCategory: VehicleSubCategoryCode | null) => void
  onClearAll: () => void
}

export function CategoryFilters({
  filters,
  activeFiltersCount,
  brands,
  subCategories,
  searchSuggestions,
  currentYear,
  onUpdateFilters,
  onMainCategoryChange,
  onSubCategoryChange,
  onClearAll,
}: CategoryFiltersProps) {
  return (
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
            onClick={onClearAll}
            disabled={activeFiltersCount === 0}
          >
            Clear All
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          {/* Main Category */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Main Category</Label>
            <Select 
              value={filters.mainCategory || "all"} 
              onValueChange={(value) => onMainCategoryChange(value === "all" ? null : value as MainCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {MAIN_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.code} value={cat.code}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sub-Category */}
          {filters.mainCategory && subCategories.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 block">Sub-Category</Label>
              <Select 
                value={filters.subCategory || "all"} 
                onValueChange={(value) => onSubCategoryChange(value === "all" ? null : value as VehicleSubCategoryCode)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All sub-categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sub-Categories</SelectItem>
                  {subCategories.map((sub) => (
                    <SelectItem key={sub.code} value={sub.code}>
                      {sub.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Search */}
          <div>
            <Label className="text-sm font-medium mb-2 flex items-center gap-2">
              <MagnifyingGlass size={16} />
              Search
            </Label>
            <AdvancedSearchBar
              value={filters.searchQuery}
              onChange={(value) => onUpdateFilters({ searchQuery: value })}
              suggestions={searchSuggestions}
              placeholder="Search listings..."
              className="w-full"
            />
          </div>

          {/* Brand */}
          {brands.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 block">Brand</Label>
              <Select 
                value={filters.selectedBrand || "all-brands"} 
                onValueChange={(value) => onUpdateFilters({ selectedBrand: value === "all-brands" ? "" : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-brands">All brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Price Range */}
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
                onUpdateFilters({ priceMin: min, priceMax: max })
              }
              className="mb-2"
            />
          </div>

          {/* Year Range */}
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
                onUpdateFilters({ yearMin: min, yearMax: max })
              }
              className="mb-2"
            />
          </div>

          {/* Mileage */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Max Mileage: {filters.maxMileage ? `${filters.maxMileage.toLocaleString()} mi` : 'Any'}
            </Label>
            <Slider
              min={0}
              max={200000}
              step={5000}
              value={[filters.maxMileage || 200000]}
              onValueChange={([value]) => 
                onUpdateFilters({ maxMileage: value === 200000 ? undefined : value })
              }
              className="mb-2"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Fuel Type</Label>
            <Select 
              value={filters.selectedFuel || "all-fuel"} 
              onValueChange={(value) => onUpdateFilters({ selectedFuel: value === "all-fuel" ? "" : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All fuel types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-fuel">All fuel types</SelectItem>
                {FUEL_TYPES.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transmission */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Transmission</Label>
            <Select 
              value={filters.selectedTransmission || "all-trans"} 
              onValueChange={(value) => onUpdateFilters({ selectedTransmission: value === "all-trans" ? "" : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All transmissions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-trans">All transmissions</SelectItem>
                {TRANSMISSIONS.map((trans) => (
                  <SelectItem key={trans} value={trans}>
                    {trans}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Condition */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Condition</Label>
            <div className="space-y-2">
              {['new', 'used', 'certified'].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={filters.selectedCondition.includes(condition)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onUpdateFilters({ 
                          selectedCondition: [...filters.selectedCondition, condition] 
                        })
                      } else {
                        onUpdateFilters({ 
                          selectedCondition: filters.selectedCondition.filter(c => c !== condition) 
                        })
                      }
                    }}
                  />
                  <Label
                    htmlFor={condition}
                    className="text-sm font-normal capitalize cursor-pointer"
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
  )
}
