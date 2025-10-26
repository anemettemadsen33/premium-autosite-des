import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VehicleCard } from '@/components/VehicleCard'
import { Gavel, Clock, Fire, TrendUp } from '@phosphor-icons/react'
import type { Listing, AuctionStatus } from '@/lib/types'
import { SAMPLE_LISTINGS } from '@/lib/data'

interface AuctionsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function AuctionsPage({ onNavigate }: AuctionsPageProps) {
  const [allListings] = useKV<Listing[]>('all-listings', SAMPLE_LISTINGS)
  const [sortBy, setSortBy] = useState('ending-soon')
  const [activeTab, setActiveTab] = useState<AuctionStatus | 'all'>('live')

  const auctionListings = (allListings || [])
    .filter(listing => listing.isAuction && listing.auctionData)
    .map(listing => {
      if (!listing.auctionData) return listing
      
      const now = new Date()
      const end = new Date(listing.auctionData.endTime)
      const timeLeft = end.getTime() - now.getTime()
      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
      
      let status: AuctionStatus = 'live'
      if (timeLeft <= 0) status = 'ended'
      else if (hoursLeft < 2) status = 'ending-soon'
      else if (new Date(listing.auctionData.startTime) > now) status = 'upcoming'
      
      return {
        ...listing,
        auctionData: {
          ...listing.auctionData,
          status
        }
      }
    })

  const filteredListings = auctionListings.filter(listing => {
    if (activeTab === 'all') return true
    return listing.auctionData?.status === activeTab
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (!a.auctionData || !b.auctionData) return 0
    
    switch (sortBy) {
      case 'ending-soon':
        return new Date(a.auctionData.endTime).getTime() - new Date(b.auctionData.endTime).getTime()
      case 'most-bids':
        return (b.auctionData.totalBids || 0) - (a.auctionData.totalBids || 0)
      case 'highest-bid':
        return b.auctionData.currentBid - a.auctionData.currentBid
      case 'lowest-bid':
        return a.auctionData.currentBid - b.auctionData.currentBid
      default:
        return 0
    }
  })

  const stats = {
    live: auctionListings.filter(l => l.auctionData?.status === 'live').length,
    endingSoon: auctionListings.filter(l => l.auctionData?.status === 'ending-soon').length,
    upcoming: auctionListings.filter(l => l.auctionData?.status === 'upcoming').length,
    ended: auctionListings.filter(l => l.auctionData?.status === 'ended').length
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-accent/20 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Gavel size={48} className="text-accent" weight="fill" />
            <div>
              <h1 className="text-4xl font-bold">Live Auctions</h1>
              <p className="text-muted-foreground mt-2">
                Bid on premium vehicles and get the best deals
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-500 mb-2">
                  <Fire weight="fill" />
                  <span className="text-sm font-medium">Live Now</span>
                </div>
                <div className="text-3xl font-bold">{stats.live}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-orange-500 mb-2">
                  <Clock weight="fill" />
                  <span className="text-sm font-medium">Ending Soon</span>
                </div>
                <div className="text-3xl font-bold">{stats.endingSoon}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                  <TrendUp weight="fill" />
                  <span className="text-sm font-medium">Upcoming</span>
                </div>
                <div className="text-3xl font-bold">{stats.upcoming}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Gavel />
                  <span className="text-sm font-medium">Ended</span>
                </div>
                <div className="text-3xl font-bold">{stats.ended}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AuctionStatus | 'all')} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="live">
                Live
                {stats.live > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                    {stats.live}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ended">Ended</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="most-bids">Most Bids</SelectItem>
              <SelectItem value="highest-bid">Highest Bid</SelectItem>
              <SelectItem value="lowest-bid">Lowest Bid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortedListings.length === 0 ? (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <Gavel size={64} className="mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-xl font-semibold mb-2">No Auctions Found</h3>
                <p className="text-muted-foreground">
                  There are currently no auctions in this category.
                </p>
              </div>
              <Button onClick={() => onNavigate('home')}>
                Browse All Listings
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedListings.map(listing => (
              <div key={listing.id} className="relative">
                {listing.auctionData?.status === 'ending-soon' && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-4 right-4 z-10 animate-pulse"
                  >
                    <Clock className="mr-1" size={14} weight="fill" />
                    Ending Soon
                  </Badge>
                )}
                {listing.auctionData?.status === 'live' && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-4 right-4 z-10 animate-pulse"
                  >
                    <Fire className="mr-1" size={14} weight="fill" />
                    LIVE
                  </Badge>
                )}
                <VehicleCard vehicle={listing} onNavigate={onNavigate} />
                {listing.auctionData && (
                  <div className="mt-2 p-3 rounded-lg bg-accent/10 border border-accent/30 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Bid</span>
                      <span className="font-bold text-accent text-lg">
                        €{listing.auctionData.currentBid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{listing.auctionData.totalBids} bids</span>
                      <span>
                        Ends: {new Date(listing.auctionData.endTime).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
