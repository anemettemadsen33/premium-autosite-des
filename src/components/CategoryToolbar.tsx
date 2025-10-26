import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Funnel, Rows, SquaresFour, Star, Clock } from '@phosphor-icons/react'

type ViewMode = 'grid' | 'list'
type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc' | 'popular'

interface CategoryToolbarProps {
  showFilters: boolean
  viewMode: ViewMode
  sortBy: SortOption
  activeFiltersCount: number
  onToggleFilters: () => void
  onViewModeChange: (mode: ViewMode) => void
  onSortChange: (sort: SortOption) => void
}

export function CategoryToolbar({
  showFilters,
  viewMode,
  sortBy,
  activeFiltersCount,
  onToggleFilters,
  onViewModeChange,
  onSortChange,
}: CategoryToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button
          variant={showFilters ? "default" : "outline"}
          size="sm"
          onClick={onToggleFilters}
          className="relative"
        >
          <Funnel size={16} className="mr-2" weight={showFilters ? "fill" : "regular"} />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 min-w-5 h-5">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="h-8 px-3"
          >
            <SquaresFour size={16} weight={viewMode === 'grid' ? "fill" : "regular"} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="h-8 px-3"
          >
            <Rows size={16} weight={viewMode === 'list' ? "fill" : "regular"} />
          </Button>
        </div>

        <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                Newest First
              </div>
            </SelectItem>
            <SelectItem value="oldest">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                Oldest First
              </div>
            </SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="mileage-asc">Lowest Mileage</SelectItem>
            <SelectItem value="year-desc">Newest Year</SelectItem>
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
  )
}
