import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ArrowLeft, MagnifyingGlass, Trash, Bell, BellSlash } from '@phosphor-icons/react'
import type { SearchFilters, Category } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { toast } from 'sonner'

interface SavedSearch {
  id: string
  name: string
  filters: SearchFilters
  alertsEnabled: boolean
  createdAt: string
  lastNotified?: string
}

interface SavedSearchesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function SavedSearchesPage({ onNavigate }: SavedSearchesPageProps) {
  const [savedSearches, setSavedSearches] = useKV<SavedSearch[]>('saved-searches', [])
  const [editingId, setEditingId] = useState<string | null>(null)

  const toggleAlerts = (id: string) => {
    setSavedSearches(current =>
      (current || []).map(search =>
        search.id === id
          ? { ...search, alertsEnabled: !search.alertsEnabled }
          : search
      )
    )
    toast.success('Alert preferences updated')
  }

  const deleteSearch = (id: string) => {
    setSavedSearches(current => (current || []).filter(search => search.id !== id))
    toast.success('Saved search deleted')
  }

  const runSearch = (search: SavedSearch) => {
    if (search.filters.category) {
      onNavigate('category', { category: search.filters.category })
    } else {
      onNavigate('home')
    }
  }

  const getFilterSummary = (filters: SearchFilters): string => {
    const parts: string[] = []
    
    if (filters.category) parts.push(filters.category)
    if (filters.brand) parts.push(filters.brand)
    if (filters.model) parts.push(filters.model)
    if (filters.minPrice || filters.maxPrice) {
      const priceRange = `${filters.minPrice ? formatPrice(filters.minPrice) : '0'} - ${filters.maxPrice ? formatPrice(filters.maxPrice) : '∞'}`
      parts.push(priceRange)
    }
    if (filters.yearFrom || filters.yearTo) {
      parts.push(`${filters.yearFrom || 'any'}-${filters.yearTo || 'present'}`)
    }
    if (filters.location) parts.push(filters.location)
    
    return parts.length > 0 ? parts.join(' • ') : 'All listings'
  }

  const getActiveFiltersCount = (filters: SearchFilters): number => {
    let count = 0
    if (filters.category) count++
    if (filters.brand) count++
    if (filters.model) count++
    if (filters.minPrice) count++
    if (filters.maxPrice) count++
    if (filters.yearFrom) count++
    if (filters.yearTo) count++
    if (filters.location) count++
    if (filters.fuelType) count++
    if (filters.transmission) count++
    if (filters.condition) count++
    return count
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Saved Searches</h1>
          <p className="text-muted-foreground">
            Manage your saved search criteria and get notified of new matches
          </p>
        </div>

        {!savedSearches || savedSearches.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <MagnifyingGlass className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No saved searches yet</h3>
              <p className="text-muted-foreground mb-6">
                Save your search criteria to quickly find vehicles that match your preferences
              </p>
              <Button onClick={() => onNavigate('home')}>
                Browse Listings
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedSearches.map((search) => (
              <Card key={search.id} className="hover:border-accent transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                        {search.name}
                        {search.alertsEnabled && (
                          <Badge variant="default" className="flex items-center gap-1">
                            <Bell className="w-3 h-3" />
                            Alerts ON
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {getFilterSummary(search.filters)}
                      </CardDescription>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">
                          {getActiveFiltersCount(search.filters)} filters
                        </Badge>
                        <Badge variant="secondary">
                          Saved {new Date(search.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSearch(search.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Switch
                        id={`alerts-${search.id}`}
                        checked={search.alertsEnabled}
                        onCheckedChange={() => toggleAlerts(search.id)}
                      />
                      <Label htmlFor={`alerts-${search.id}`} className="cursor-pointer">
                        {search.alertsEnabled ? (
                          <span className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-accent" />
                            Email me new matches
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <BellSlash className="w-4 h-4" />
                            Alerts disabled
                          </span>
                        )}
                      </Label>
                    </div>
                    <Button onClick={() => runSearch(search)}>
                      <MagnifyingGlass className="mr-2" />
                      Run Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">How Alerts Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-3">
              <Bell className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Instant Notifications</p>
                <p className="text-muted-foreground">
                  Receive email alerts when new listings match your saved search criteria
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <MagnifyingGlass className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Smart Matching</p>
                <p className="text-muted-foreground">
                  Our system automatically checks new listings against your filters
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Trash className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Flexible Management</p>
                <p className="text-muted-foreground">
                  Toggle alerts on/off or delete searches anytime
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
