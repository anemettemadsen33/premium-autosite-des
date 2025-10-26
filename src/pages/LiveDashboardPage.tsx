import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { StatCard } from '@/components/analytics/StatCard'
import { ViewsChart, PerformanceChart } from '@/components/analytics/Charts'
import { DemoDataGenerator } from '@/components/analytics/DemoDataGenerator'
import { getListingAnalytics, type ListingAnalytics } from '@/lib/analytics'
import type { Listing } from '@/lib/types'
import {
  ChartLine,
  Eye,
  CursorClick,
  Heart,
  ChatCircle,
  ShareNetwork,
  Phone,
  EnvelopeSimple,
  TrendUp,
  DeviceMobile,
  Desktop,
  DeviceTablet,
  ArrowsClockwise,
  Calendar,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface LiveDashboardPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function LiveDashboardPage({ onNavigate }: LiveDashboardPageProps) {
  const [allListings] = useKV<Listing[]>('all-listings', [])
  const [timeframe, setTimeframe] = useState<'7' | '30' | '90' | 'all'>('30')
  const [selectedListing, setSelectedListing] = useState<string>('all')
  const [listingAnalytics, setListingAnalytics] = useState<Record<string, ListingAnalytics>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const currentUser = { id: 'user-1' }
  const userListings = (allListings || []).filter(l => l.userId === currentUser.id)

  const loadAnalytics = async () => {
    setIsLoading(true)
    try {
      const days = timeframe === 'all' ? 365 : parseInt(timeframe)
      const analyticsMap: Record<string, ListingAnalytics> = {}

      for (const listing of userListings) {
        const analytics = await getListingAnalytics(listing.id, days)
        analyticsMap[listing.id] = analytics
      }

      setListingAnalytics(analyticsMap)
      setLastRefresh(new Date())
      toast.success('Analytics refreshed successfully')
    } catch (error) {
      toast.error('Failed to load analytics')
      console.error('Analytics error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAnalytics()
  }, [timeframe, userListings.length])

  const getAggregatedStats = () => {
    const filteredListings = selectedListing === 'all'
      ? userListings
      : userListings.filter(l => l.id === selectedListing)

    let totalViews = 0
    let uniqueViews = 0
    let totalClicks = 0
    let totalFavorites = 0
    let totalContacts = 0
    let totalShares = 0
    let totalPhoneReveals = 0
    let totalEmailReveals = 0

    filteredListings.forEach(listing => {
      const analytics = listingAnalytics[listing.id]
      if (analytics) {
        totalViews += analytics.totalViews
        uniqueViews += analytics.uniqueViews
        totalClicks += analytics.totalClicks
        totalFavorites += analytics.favorites
        totalContacts += analytics.contacts
        totalShares += analytics.shares
        totalPhoneReveals += analytics.phoneReveals
        totalEmailReveals += analytics.emailReveals
      }
    })

    const totalLeads = totalContacts + totalPhoneReveals + totalEmailReveals
    const conversionRate = totalViews > 0 ? (totalLeads / totalViews) * 100 : 0
    const clickRate = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0

    return {
      totalViews,
      uniqueViews,
      totalClicks,
      totalFavorites,
      totalContacts,
      totalShares,
      totalPhoneReveals,
      totalEmailReveals,
      totalLeads,
      conversionRate,
      clickRate,
      activeListings: filteredListings.filter(l => l.status === 'active').length,
      soldListings: filteredListings.filter(l => l.status === 'sold').length,
      totalListings: filteredListings.length,
    }
  }

  const stats = getAggregatedStats()

  const getViewsChartData = () => {
    const viewsByDay: Record<string, number> = {}
    const clicksByDay: Record<string, number> = {}

    const filteredListings = selectedListing === 'all'
      ? userListings
      : userListings.filter(l => l.id === selectedListing)

    filteredListings.forEach(listing => {
      const analytics = listingAnalytics[listing.id]
      if (analytics) {
        Object.entries(analytics.viewsByDay).forEach(([day, count]) => {
          viewsByDay[day] = (viewsByDay[day] || 0) + count
        })
        Object.entries(analytics.clicksByDay).forEach(([day, count]) => {
          clicksByDay[day] = (clicksByDay[day] || 0) + count
        })
      }
    })

    return { viewsByDay, clicksByDay }
  }

  const getDeviceBreakdown = () => {
    const devices: Record<string, number> = { mobile: 0, tablet: 0, desktop: 0 }

    const filteredListings = selectedListing === 'all'
      ? userListings
      : userListings.filter(l => l.id === selectedListing)

    filteredListings.forEach(listing => {
      const analytics = listingAnalytics[listing.id]
      if (analytics) {
        Object.entries(analytics.deviceBreakdown).forEach(([device, count]) => {
          devices[device] = (devices[device] || 0) + count
        })
      }
    })

    return [
      { name: 'Mobile', value: devices.mobile },
      { name: 'Tablet', value: devices.tablet },
      { name: 'Desktop', value: devices.desktop },
    ]
  }

  const getTopPerformingListings = () => {
    return userListings
      .map(listing => ({
        listing,
        analytics: listingAnalytics[listing.id],
      }))
      .filter(item => item.analytics)
      .sort((a, b) => (b.analytics?.totalViews || 0) - (a.analytics?.totalViews || 0))
      .slice(0, 5)
  }

  const { viewsByDay, clicksByDay } = getViewsChartData()
  const deviceData = getDeviceBreakdown()
  const topPerformers = getTopPerformingListings()

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-accent/10 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ChartLine size={40} className="text-accent" weight="fill" />
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Live Analytics Dashboard</h1>
                  <p className="text-muted-foreground mt-1">
                    Real-time insights into your listings performance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} />
                <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={loadAnalytics}
                disabled={isLoading}
              >
                <ArrowsClockwise size={16} className={isLoading ? 'animate-spin' : ''} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Timeframe:</label>
            <Select value={timeframe} onValueChange={(v) => setTimeframe(v as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Listing:</label>
            <Select value={selectedListing} onValueChange={setSelectedListing}>
              <SelectTrigger className="w-[280px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Listings ({userListings.length})</SelectItem>
                {userListings.map(listing => (
                  <SelectItem key={listing.id} value={listing.id}>
                    {listing.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Views"
                value={stats.totalViews.toLocaleString()}
                icon={<Eye size={20} weight="fill" />}
                description={`${stats.uniqueViews} unique`}
                colorClass="text-blue-500"
              />
              <StatCard
                title="Total Clicks"
                value={stats.totalClicks.toLocaleString()}
                icon={<CursorClick size={20} weight="fill" />}
                description={`${stats.clickRate.toFixed(1)}% click rate`}
                colorClass="text-purple-500"
              />
              <StatCard
                title="Total Leads"
                value={stats.totalLeads.toLocaleString()}
                icon={<ChatCircle size={20} weight="fill" />}
                description={`${stats.conversionRate.toFixed(1)}% conversion`}
                colorClass="text-green-500"
              />
              <StatCard
                title="Active Listings"
                value={stats.activeListings}
                icon={<TrendUp size={20} weight="fill" />}
                description={`${stats.soldListings} sold`}
                colorClass="text-accent"
              />
            </div>

            <ViewsChart
              data={viewsByDay}
              clickData={clicksByDay}
              title="Views & Clicks Over Time"
              description="Track your listing visibility and engagement trends"
            />

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Listings</CardTitle>
                <CardDescription>Your best performing listings by total views</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map(({ listing, analytics }, index) => (
                    <div key={listing.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                            <h4 className="font-semibold truncate">{listing.title}</h4>
                            <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                              {listing.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            €{listing.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-accent">
                            {analytics.totalViews.toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">views</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <div className="text-sm font-semibold">{analytics.totalClicks}</div>
                          <div className="text-xs text-muted-foreground">Clicks</div>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <div className="text-sm font-semibold">{analytics.contacts}</div>
                          <div className="text-xs text-muted-foreground">Contacts</div>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <div className="text-sm font-semibold">{analytics.favorites}</div>
                          <div className="text-xs text-muted-foreground">Favorites</div>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <div className="text-sm font-semibold">
                            {analytics.conversionRate.toFixed(1)}%
                          </div>
                          <div className="text-xs text-muted-foreground">Conv. Rate</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {topPerformers.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No performance data available yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Favorites"
                value={stats.totalFavorites}
                icon={<Heart size={20} weight="fill" />}
                colorClass="text-red-500"
              />
              <StatCard
                title="Shares"
                value={stats.totalShares}
                icon={<ShareNetwork size={20} weight="fill" />}
                colorClass="text-blue-500"
              />
              <StatCard
                title="Phone Reveals"
                value={stats.totalPhoneReveals}
                icon={<Phone size={20} weight="fill" />}
                colorClass="text-green-500"
              />
              <StatCard
                title="Email Reveals"
                value={stats.totalEmailReveals}
                icon={<EnvelopeSimple size={20} weight="fill" />}
                colorClass="text-purple-500"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
                <CardDescription>How users interact with your listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChatCircle size={20} className="text-accent" weight="fill" />
                      <span className="font-medium">Direct Contacts</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{stats.totalContacts}</span>
                      <p className="text-xs text-muted-foreground">messages sent</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart size={20} className="text-red-500" weight="fill" />
                      <span className="font-medium">Saved to Favorites</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{stats.totalFavorites}</span>
                      <p className="text-xs text-muted-foreground">times</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShareNetwork size={20} className="text-blue-500" weight="fill" />
                      <span className="font-medium">Shared Listings</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{stats.totalShares}</span>
                      <p className="text-xs text-muted-foreground">shares</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Conversion Rate"
                value={`${stats.conversionRate.toFixed(2)}%`}
                icon={<TrendUp size={20} weight="fill" />}
                description="Views to leads"
                colorClass="text-green-500"
              />
              <StatCard
                title="Click-Through Rate"
                value={`${stats.clickRate.toFixed(2)}%`}
                icon={<CursorClick size={20} weight="fill" />}
                description="Views to clicks"
                colorClass="text-blue-500"
              />
              <StatCard
                title="Avg. Views per Listing"
                value={stats.totalListings > 0 ? Math.round(stats.totalViews / stats.totalListings) : 0}
                icon={<Eye size={20} weight="fill" />}
                colorClass="text-purple-500"
              />
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <PerformanceChart
              data={deviceData}
              title="Views by Device Type"
              description="Understand how users access your listings"
            />

            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Mobile Views"
                value={deviceData[0].value}
                icon={<DeviceMobile size={20} weight="fill" />}
                colorClass="text-blue-500"
              />
              <StatCard
                title="Tablet Views"
                value={deviceData[1].value}
                icon={<DeviceTablet size={20} weight="fill" />}
                colorClass="text-purple-500"
              />
              <StatCard
                title="Desktop Views"
                value={deviceData[2].value}
                icon={<Desktop size={20} weight="fill" />}
                colorClass="text-green-500"
              />
            </div>
          </TabsContent>
        </Tabs>

        <DemoDataGenerator />
      </div>
    </div>
  )
}
