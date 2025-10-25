import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Funnel } from '@phosphor-icons/react'

interface FilterBarProps {
  selectedType: string
  onTypeChange: (value: string) => void
  selectedSort: string
  onSortChange: (value: string) => void
}

export function FilterBar({ selectedType, onTypeChange, selectedSort, onSortChange }: FilterBarProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Funnel size={24} weight="duotone" className="text-accent" />
        <h3 className="text-lg font-semibold">Filter & Sort</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm mb-2 block">Vehicle Type</Label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger>
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
          <Label className="text-sm mb-2 block">Sort By</Label>
          <Select value={selectedSort} onValueChange={onSortChange}>
            <SelectTrigger>
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
