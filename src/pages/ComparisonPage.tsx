import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { X, ArrowLeft, Plus } from '@phosphor-icons/react'
import type { Listing } from '@/lib/types'
import { getAllListings } from '@/lib/listings'
import { formatPrice } from '@/lib/utils'

interface ComparisonPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function ComparisonPage({ onNavigate }: ComparisonPageProps) {
  const [comparisonIds, setComparisonIds] = useKV<string[]>('comparison-ids', [])
  const [listings, setListings] = useState<Listing[]>([])
  const [availableListings, setAvailableListings] = useState<Listing[]>([])
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    const allListings = getAllListings()
    const compared = allListings.filter(l => comparisonIds && comparisonIds.includes(l.id))
    const available = allListings.filter(l => comparisonIds && !comparisonIds.includes(l.id) && l.status === 'active')
    setListings(compared)
    setAvailableListings(available)
  }, [comparisonIds])

  const removeFromComparison = (id: string) => {
    setComparisonIds(current => (current || []).filter(listingId => listingId !== id))
  }

  const addToComparison = (id: string) => {
    if ((comparisonIds || []).length < 3) {
      setComparisonIds(current => [...(current || []), id])
      setShowAddModal(false)
    }
  }

  const clearAll = () => {
    setComparisonIds([])
  }

  const getComparisonData = (listing: Listing) => [
    { label: 'Price', value: formatPrice(listing.price) },
    { label: 'Year', value: listing.year || 'N/A' },
    { label: 'Mileage', value: listing.mileage ? `${listing.mileage.toLocaleString()} km` : 'N/A' },
    { label: 'Condition', value: listing.condition || 'N/A' },
    { label: 'Transmission', value: listing.transmission || 'N/A' },
    { label: 'Fuel Type', value: listing.fuelType || 'N/A' },
    { label: 'Body Type', value: listing.bodyType || 'N/A' },
    { label: 'Engine', value: listing.engineSize || 'N/A' },
    { label: 'Color', value: listing.color || 'N/A' },
    { label: 'Location', value: listing.location }
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold">Vehicle Comparison</h1>
            <p className="text-muted-foreground mt-2">
              Compare up to 3 vehicles side by side
            </p>
          </div>
          {listings.length > 0 && (
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        {listings.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No vehicles to compare</h3>
              <p className="text-muted-foreground mb-6">
                Add vehicles from listings to start comparing
              </p>
              <Button onClick={() => onNavigate('home')}>
                Browse Listings
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card key={listing.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeFromComparison(listing.id)}
                  >
                    <X />
                  </Button>
                  <CardHeader>
                    <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                      {listing.images[0] ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg pr-8">{listing.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{listing.category}</Badge>
                      {listing.isFeatured && <Badge variant="default">Featured</Badge>}
                    </div>
                  </CardHeader>
                </Card>
              ))}
              
              {listings.length < 3 && (
                <Card className="border-dashed border-2 hover:border-accent transition-colors cursor-pointer">
                  <CardContent className="flex items-center justify-center h-full min-h-[300px]" onClick={() => setShowAddModal(true)}>
                    <div className="text-center">
                      <Plus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Add vehicle to compare</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Comparison Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-4 font-semibold">Specification</th>
                        {listings.map((listing) => (
                          <th key={listing.id} className="text-left p-4 font-semibold min-w-[200px]">
                            {listing.brand} {listing.model}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getComparisonData(listings[0]).map((spec, idx) => (
                        <tr key={spec.label} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                          <td className="p-4 font-medium">{spec.label}</td>
                          {listings.map((listing) => {
                            const data = getComparisonData(listing)[idx]
                            return (
                              <td key={listing.id} className="p-4">
                                {data.value}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              {listings.map((listing) => (
                <Button
                  key={listing.id}
                  onClick={() => onNavigate('listing', { id: listing.id })}
                >
                  View {listing.brand} {listing.model}
                </Button>
              ))}
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Add Vehicle to Compare</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)}>
                    <X />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableListings.slice(0, 20).map((listing) => (
                    <Card key={listing.id} className="hover:border-accent transition-colors cursor-pointer" onClick={() => addToComparison(listing.id)}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            {listing.images[0] ? (
                              <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{listing.title}</h4>
                            <p className="text-sm text-muted-foreground">{formatPrice(listing.price)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {listing.year} • {listing.mileage?.toLocaleString()} km
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
