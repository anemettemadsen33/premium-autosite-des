import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth'
import { useListings } from '@/lib/listings'
import { useFavorites } from '@/lib/favorites'
import { SAMPLE_LISTINGS } from '@/lib/data'
import { GridFour, Article, Heart, Plus, TrendUp } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface DashboardPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user } = useAuth()
  const { listings } = useListings()
  const { favorites } = useFavorites(user?.id || null)

  const myListings = listings.filter(l => l.userId === user?.id)
  const allListings = [...SAMPLE_LISTINGS, ...listings]
  const myActiveListings = myListings.filter(l => l.status === 'active')
  const myDraftListings = myListings.filter(l => l.status === 'draft')
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0)

  const stats = [
    { label: 'Active Listings', value: myActiveListings.length, icon: Article, color: 'from-green-500 to-emerald-600' },
    { label: 'Favorites', value: favorites.length, icon: Heart, color: 'from-pink-500 to-rose-600' },
    { label: 'Total Views', value: totalViews, icon: TrendUp, color: 'from-blue-500 to-cyan-600' },
    { label: 'Draft Listings', value: myDraftListings.length, icon: GridFour, color: 'from-purple-500 to-violet-600' },
  ]

  const quickActions = [
    { label: 'Add New Listing', icon: Plus, page: 'add-listing', variant: 'default' as const },
    { label: 'My Listings', icon: Article, page: 'my-listings', variant: 'outline' as const },
    { label: 'Favorites', icon: Heart, page: 'favorites', variant: 'outline' as const },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-primary-foreground/80">Manage your listings and track your activity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <Icon size={24} weight="duotone" className="text-white" />
                      </div>
                      <div className="text-3xl font-bold">{stat.value}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                size="lg"
                variant={action.variant}
                onClick={() => onNavigate(action.page)}
                className="gap-2 h-16 text-base"
              >
                <Icon size={20} weight="bold" />
                {action.label}
              </Button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
              {myListings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Article size={48} weight="duotone" className="mx-auto mb-4 opacity-50" />
                  <p className="mb-4">You haven't created any listings yet</p>
                  <Button onClick={() => onNavigate('add-listing')} className="gap-2">
                    <Plus size={20} weight="bold" />
                    Create Your First Listing
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myListings.slice(0, 5).map((listing) => (
                    <div
                      key={listing.id}
                      onClick={() => onNavigate('listing', { id: listing.id })}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium line-clamp-1">{listing.title}</div>
                        <div className="text-sm text-muted-foreground">{listing.views} views</div>
                      </div>
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                    </div>
                  ))}
                  {myListings.length > 5 && (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => onNavigate('my-listings')}
                    >
                      View All Listings
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Favorite Listings</h2>
              {favorites.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart size={48} weight="duotone" className="mx-auto mb-4 opacity-50" />
                  <p>No favorites yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.slice(0, 5).map((fav) => {
                    const listing = allListings.find(l => l.id === fav.listingId)
                    if (!listing) return null
                    return (
                      <div
                        key={fav.listingId}
                        onClick={() => onNavigate('listing', { id: fav.listingId })}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      >
                        <div className="flex-1">
                          <div className="font-medium line-clamp-1">{listing.title}</div>
                          <div className="text-sm text-accent font-semibold">
                            ${listing.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {favorites.length > 5 && (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => onNavigate('favorites')}
                    >
                      View All Favorites
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
