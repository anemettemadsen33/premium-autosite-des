import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendUp, TrendDown, ChartLine, MapPin, Calendar, 
  CarSimple, Lightning, Fire, Star, ArrowRight
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface MarketInsightsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

interface MarketTrend {
  category: string
  change: number
  avgPrice: number
  totalListings: number
  trend: 'up' | 'down' | 'stable'
}

interface PopularModel {
  brand: string
  model: string
  avgPrice: number
  views: number
  sales: number
}

interface RegionalData {
  region: string
  avgPrice: number
  listings: number
  topCategory: string
}

export function MarketInsightsPage({ onNavigate }: MarketInsightsPageProps) {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('30')

  const marketTrends: MarketTrend[] = [
    { category: 'Electric Vehicles', change: 18.5, avgPrice: 45000, totalListings: 1240, trend: 'up' },
    { category: 'Luxury SUVs', change: 12.3, avgPrice: 78000, totalListings: 890, trend: 'up' },
    { category: 'Sports Cars', change: -3.2, avgPrice: 92000, totalListings: 456, trend: 'down' },
    { category: 'Compact Cars', change: 5.8, avgPrice: 22000, totalListings: 2340, trend: 'up' },
    { category: 'Pickup Trucks', change: 8.9, avgPrice: 52000, totalListings: 1670, trend: 'up' },
    { category: 'Hybrid Vehicles', change: 15.2, avgPrice: 38000, totalListings: 980, trend: 'up' },
  ]

  const popularModels: PopularModel[] = [
    { brand: 'Tesla', model: 'Model 3', avgPrice: 42000, views: 15420, sales: 342 },
    { brand: 'BMW', model: 'X5', avgPrice: 68000, views: 12890, sales: 287 },
    { brand: 'Mercedes-Benz', model: 'C-Class', avgPrice: 48000, views: 11230, sales: 254 },
    { brand: 'Audi', model: 'Q7', avgPrice: 72000, views: 10560, sales: 198 },
    { brand: 'Porsche', model: '911', avgPrice: 125000, views: 9870, sales: 156 },
    { brand: 'Ford', model: 'F-150', avgPrice: 55000, views: 14230, sales: 412 },
  ]

  const regionalData: RegionalData[] = [
    { region: 'United States', avgPrice: 48500, listings: 8560, topCategory: 'Pickup Trucks' },
    { region: 'United Kingdom', avgPrice: 42000, listings: 3240, topCategory: 'Luxury Sedans' },
    { region: 'Germany', avgPrice: 51000, listings: 4120, topCategory: 'Luxury SUVs' },
    { region: 'France', avgPrice: 38000, listings: 2890, topCategory: 'Compact Cars' },
    { region: 'Spain', avgPrice: 35000, listings: 1980, topCategory: 'Electric Vehicles' },
    { region: 'Italy', avgPrice: 44000, listings: 2340, topCategory: 'Sports Cars' },
  ]

  const priceRangeDistribution = [
    { range: 'Under $25k', percentage: 28, count: 4680 },
    { range: '$25k - $50k', percentage: 35, count: 5850 },
    { range: '$50k - $75k', percentage: 20, count: 3340 },
    { range: '$75k - $100k', percentage: 10, count: 1670 },
    { range: 'Over $100k', percentage: 7, count: 1170 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="bg-gradient-to-r from-accent/10 via-purple-500/10 to-blue-500/10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <ChartLine size={40} weight="duotone" className="text-accent" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Market Insights</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Real-time automotive market trends, pricing analytics, and regional data to help you make informed decisions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full md:w-64 h-12 rounded-xl">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full md:w-64 h-12 rounded-xl">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="365">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-14 bg-muted/50 p-1.5 rounded-xl">
            <TabsTrigger value="trends" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <TrendUp size={18} weight="duotone" className="mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="popular" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Fire size={18} weight="duotone" className="mr-2" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="regional" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <MapPin size={18} weight="duotone" className="mr-2" />
              Regional
            </TabsTrigger>
            <TabsTrigger value="pricing" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <ChartLine size={18} weight="duotone" className="mr-2" />
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketTrends.map((trend, index) => (
                <motion.div
                  key={trend.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg hover:border-accent/30 transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2 group-hover:text-accent transition-colors">
                            {trend.category}
                          </CardTitle>
                          <CardDescription>{trend.totalListings.toLocaleString()} listings</CardDescription>
                        </div>
                        <Badge 
                          className={`${
                            trend.trend === 'up' 
                              ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                              : 'bg-red-500/10 text-red-600 border-red-500/20'
                          }`}
                        >
                          {trend.trend === 'up' ? <TrendUp size={14} className="mr-1" /> : <TrendDown size={14} className="mr-1" />}
                          {Math.abs(trend.change)}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Avg. Price</p>
                          <p className="text-2xl font-bold">${trend.avgPrice.toLocaleString()}</p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.abs(trend.change) * 5}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full rounded-full ${
                              trend.trend === 'up' 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                : 'bg-gradient-to-r from-red-500 to-rose-500'
                            }`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {popularModels.map((model, index) => (
                <motion.div
                  key={`${model.brand}-${model.model}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg hover:border-accent/30 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 flex-1">
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <span className="text-2xl font-bold text-accent">#{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                              {model.brand} {model.model}
                            </h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star size={16} weight="fill" className="text-amber-500" />
                                {model.views.toLocaleString()} views
                              </span>
                              <span>•</span>
                              <span>{model.sales} sales</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Avg. Price</p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
                            ${model.avgPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-accent/5 to-purple-500/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Lightning size={32} weight="duotone" className="text-accent" />
                    <div>
                      <h3 className="text-lg font-bold">Want to see your vehicle here?</h3>
                      <p className="text-sm text-muted-foreground">List your premium vehicle and reach thousands of buyers</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => onNavigate('add-listing')}
                    className="bg-gradient-to-r from-accent to-purple-500 hover:from-accent/90 hover:to-purple-600 text-white rounded-xl"
                  >
                    List Now
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regionalData.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg hover:border-accent/30 transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin size={24} weight="duotone" className="text-accent" />
                        <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                          {region.region}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Avg. Price</p>
                            <p className="text-xl font-bold">${region.avgPrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Listings</p>
                            <p className="text-xl font-bold">{region.listings.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border/50">
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Top Category</p>
                          <Badge className="bg-gradient-to-r from-accent/10 to-purple-500/10 text-accent border-accent/20">
                            <CarSimple size={14} weight="duotone" className="mr-1" />
                            {region.topCategory}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Price Distribution</CardTitle>
                <CardDescription>Current market distribution across price ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {priceRangeDistribution.map((range, index) => (
                    <motion.div
                      key={range.range}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{range.range}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{range.count.toLocaleString()} listings</span>
                          <span className="text-accent font-bold">{range.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${range.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardContent className="p-6 text-center">
                  <TrendUp size={40} weight="duotone" className="text-green-600 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Highest Growth</p>
                  <p className="text-2xl font-bold">Electric Vehicles</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-600 border-green-500/30">+18.5%</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-purple-500/10 border-accent/20">
                <CardContent className="p-6 text-center">
                  <Calendar size={40} weight="duotone" className="text-accent mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Average Time to Sell</p>
                  <p className="text-2xl font-bold">24 Days</p>
                  <p className="text-xs text-muted-foreground mt-2">3 days faster than last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Fire size={40} weight="duotone" className="text-amber-600 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Hottest Market</p>
                  <p className="text-2xl font-bold">Luxury SUVs</p>
                  <p className="text-xs text-muted-foreground mt-2">$78,000 avg. price</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
