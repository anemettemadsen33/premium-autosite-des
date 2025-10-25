import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { Funnel, Sparkle } from '@phosphor-icons/react'

interface FilterBarProps {
  selectedType: string
  onTypeChange: (value: string) => void
  selectedSort: string
  onSortChange: (value: string) => void
}

export function FilterBar({ selectedType, onTypeChange, selectedSort, onSortChange }: FilterBarProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
