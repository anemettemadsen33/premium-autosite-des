import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  ChartLine, 
  TrendUp, 
  TrendDown,
  Eye,
  Heart,
  ChatCircle,
  Tag,
  Users,
  CalendarCheck
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { Listing } from '@/lib/types'

interface AnalyticsDashboardPageProps {
  currentUserId?: string
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function AnalyticsDashboardPage({ currentUserId, onNavigate }: AnalyticsDashboardPageProps) {
  const [allListings] = useKV<Listing[]>('all-listings', [])
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
  const [selectedListing, setSelectedListing] = useState<string>('all')

  const userListings = (allListings || []).filter(l => l.userId === currentUserId)

  const getTimeframeData = () => {
    const now = new Date()
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 9999
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    const listings = selectedListing === 'all' 
      ? userListings 
      : userListings.filter(l => l.id === selectedListing)

    return listings.filter(l => new Date(l.createdAt) >= cutoff)
  }

  const timeframeListings = getTimeframeData()

  const stats = {
    totalViews: timeframeListings.reduce((sum, l) => sum + l.views, 0),
    totalListings: timeframeListings.length,
    activeListings: timeframeListings.filter(l => l.status === 'active').length,
    soldListings: timeframeListings.filter(l => l.status === 'sold').length,
    averagePrice: timeframeListings.length > 0 
      ? Math.round(timeframeListings.reduce((sum, l) => sum + l.price, 0) / timeframeListings.length)
      : 0,
    totalValue: timeframeListings.reduce((sum, l) => sum + l.price, 0),
    conversionRate: timeframeListings.length > 0
      ? Math.round((timeframeListings.filter(l => l.status === 'sold').length / timeframeListings.length) * 100)
      : 0
  }

  const topPerformers = [...userListings]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)

  const recentActivity = [...userListings]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10)

  const categoryBreakdown = userListings.reduce((acc, listing) => {
    acc[listing.category] = (acc[listing.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-accent/20 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <ChartLine size={48} className="text-accent" weight="fill" />
            <div>
              <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Track your listing performance and insights
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <Select value={timeframe} onValueChange={(v) => setTimeframe(v as typeof timeframe)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedListing} onValueChange={setSelectedListing}>
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              {userListings.map(listing => (
                <SelectItem key={listing.id} value={listing.id}>
                  {listing.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Eye size={16} />
                  Total Views
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stats.totalListings} listings
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <CalendarCheck size={16} />
                  Active Listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{stats.activeListings}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stats.soldListings} sold
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Tag size={16} />
                  Average Price
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">€{stats.averagePrice.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  €{stats.totalValue.toLocaleString()} total value
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <TrendUp size={16} />
                  Conversion Rate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{stats.conversionRate}%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stats.soldListings} of {stats.totalListings} sold
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp className="text-accent" />
                Top Performing Listings
              </CardTitle>
              <CardDescription>Your most viewed listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No listings yet
                  </div>
                ) : (
                  topPerformers.map((listing, idx) => (
                    <div 
                      key={listing.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => onNavigate('listing', { id: listing.id })}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{listing.title}</div>
                        <div className="text-sm text-muted-foreground">
                          €{listing.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Eye size={16} />
                        <span className="font-medium">{listing.views}</span>
                      </div>
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="text-accent" />
                Category Breakdown
              </CardTitle>
              <CardDescription>Listings by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryBreakdown).length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No listings yet
                  </div>
                ) : (
                  Object.entries(categoryBreakdown).map(([category, count]) => {
                    const percentage = Math.round((count / userListings.length) * 100)
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="capitalize font-medium">{category}</span>
                          <span className="text-muted-foreground">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="h-full bg-accent"
                          />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="text-accent" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates to your listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No recent activity
                </div>
              ) : (
                recentActivity.map(listing => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => onNavigate('listing', { id: listing.id })}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{listing.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Updated {new Date(listing.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye size={16} />
                        {listing.views}
                      </div>
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
