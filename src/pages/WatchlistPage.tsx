import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VehicleCard } from '@/components/VehicleCard'
import { 
  Heart,
  TrendDown,
  Bell,
  Eye,
  Funnel
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Listing } from '@/lib/types'

interface WatchlistPageProps {
  currentUserId?: string
  onNavigate: (page: string, params?: Record<string, string>) => void
}

interface WatchlistItem {
  listingId: string
  addedAt: string
  initialPrice: number
  priceAlerts: boolean
  notes?: string
}

export function WatchlistPage({ currentUserId, onNavigate }: WatchlistPageProps) {
  const [allListings] = useKV<Listing[]>('all-listings', [])
  const [watchlist, setWatchlist] = useKV<WatchlistItem[]>(`watchlist-${currentUserId}`, [])
  const [activeTab, setActiveTab] = useState<'all' | 'price-drops' | 'ending-soon'>('all')

  const watchlistItems = (watchlist || []).map(item => {
    const listing = (allListings || []).find(l => l.id === item.listingId)
    if (!listing) return null
    
    const priceDrop = item.initialPrice - listing.price
    const priceDropPercentage = (priceDrop / item.initialPrice) * 100

    return {
      ...item,
      listing,
      priceDrop,
      priceDropPercentage
    }
  }).filter((item): item is NonNullable<typeof item> => item !== null)

  const filteredItems = watchlistItems.filter(item => {
    switch (activeTab) {
      case 'price-drops':
        return item.priceDrop > 0
      case 'ending-soon':
        return item.listing.isAuction && item.listing.auctionData?.status === 'ending-soon'
      default:
        return true
    }
  })

  const togglePriceAlerts = (listingId: string) => {
    setWatchlist((current) =>
      (current || []).map(item =>
        item.listingId === listingId
          ? { ...item, priceAlerts: !item.priceAlerts }
          : item
      )
    )
    toast.success('Price alerts updated')
  }

  const removeFromWatchlist = (listingId: string) => {
    setWatchlist((current) => (current || []).filter(item => item.listingId !== listingId))
    toast.success('Removed from watchlist')
  }

  const priceDropCount = watchlistItems.filter(item => item.priceDrop > 0).length
  const endingSoonCount = watchlistItems.filter(
    item => item.listing.isAuction && item.listing.auctionData?.status === 'ending-soon'
  ).length

  if (!currentUserId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <Heart size={64} className="mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Login Required</h3>
              <p className="text-muted-foreground">
                Please log in to access your watchlist
              </p>
            </div>
            <Button onClick={() => onNavigate('login')}>
              Log In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-accent/20 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={48} className="text-accent" weight="fill" />
            <div>
              <h1 className="text-4xl font-bold">My Watchlist</h1>
              <p className="text-muted-foreground mt-2">
                Track your favorite vehicles and get price drop alerts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Eye weight="fill" />
                  <span className="text-sm font-medium">Watching</span>
                </div>
                <div className="text-3xl font-bold">{watchlistItems.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-green-500 mb-2">
                  <TrendDown weight="fill" />
                  <span className="text-sm font-medium">Price Drops</span>
                </div>
                <div className="text-3xl font-bold">{priceDropCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-orange-500 mb-2">
                  <Bell weight="fill" />
                  <span className="text-sm font-medium">Alerts Active</span>
                </div>
                <div className="text-3xl font-bold">
                  {watchlistItems.filter(item => item.priceAlerts).length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList>
            <TabsTrigger value="all">
              All ({watchlistItems.length})
            </TabsTrigger>
            <TabsTrigger value="price-drops">
              Price Drops
              {priceDropCount > 0 && (
                <Badge variant="default" className="ml-2 h-5 px-1.5 text-xs">
                  {priceDropCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ending-soon">
              Ending Soon
              {endingSoonCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 px-1.5 text-xs">
                  {endingSoonCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {filteredItems.length === 0 ? (
              <Card className="p-12">
                <div className="text-center space-y-4">
                  <Funnel size={64} className="mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">No items found</h3>
                    <p className="text-muted-foreground">
                      {activeTab === 'all' 
                        ? 'Add vehicles to your watchlist to track them here'
                        : activeTab === 'price-drops'
                        ? 'No price drops detected yet'
                        : 'No auctions ending soon'
                      }
                    </p>
                  </div>
                  {activeTab === 'all' && (
                    <Button onClick={() => onNavigate('home')}>
                      Browse Listings
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <div key={item.listingId} className="space-y-3">
                    <div className="relative">
                      {item.priceDrop > 0 && (
                        <Badge 
                          variant="default" 
                          className="absolute top-4 right-4 z-10 bg-green-500"
                        >
                          <TrendDown className="mr-1" size={14} weight="fill" />
                          -{item.priceDropPercentage.toFixed(0)}%
                        </Badge>
                      )}
                      <VehicleCard 
                        vehicle={item.listing} 
                        onNavigate={onNavigate}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => togglePriceAlerts(item.listingId)}
                        variant={item.priceAlerts ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                      >
                        <Bell 
                          className="mr-2" 
                          size={16} 
                          weight={item.priceAlerts ? 'fill' : 'regular'}
                        />
                        {item.priceAlerts ? 'Alerts On' : 'Alerts Off'}
                      </Button>

                      <Button
                        onClick={() => removeFromWatchlist(item.listingId)}
                        variant="outline"
                        size="sm"
                      >
                        <Heart className="mr-2" size={16} weight="fill" />
                        Remove
                      </Button>
                    </div>

                    {item.priceDrop > 0 && (
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-sm">
                        <div className="font-medium text-green-700 dark:text-green-400">
                          Price dropped by €{item.priceDrop.toLocaleString()}!
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Original: €{item.initialPrice.toLocaleString()} → 
                          Now: €{item.listing.price.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
