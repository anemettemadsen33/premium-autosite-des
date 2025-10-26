import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth'
import { useFavorites } from '@/lib/favorites'
import { SAMPLE_LISTINGS } from '@/lib/data'
import { useListings } from '@/lib/listings'
import { Heart, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Listing } from '@/lib/types'

interface FavoritesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const { user } = useAuth()
  const { favorites, toggleFavorite } = useFavorites(user?.id || null)
  const { listings } = useListings()

  const allListings = [...SAMPLE_LISTINGS, ...listings]
  const favoriteListings = favorites
    .map(fav => allListings.find(l => l.id === fav.listingId))
    .filter((l): l is Listing => l !== undefined)

  const handleRemove = (listingId: string) => {
    toggleFavorite(listingId)
    toast.success('Removed from favorites')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
          <p className="text-primary-foreground/80">{favoriteListings.length} saved listings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {favoriteListings.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Start saving listings you're interested in</p>
            <Button onClick={() => onNavigate('home')}>
              Browse Listings
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteListings.map((listing) => (
              <FavoriteCard
                key={listing.id}
                listing={listing}
                onView={() => onNavigate('listing', { id: listing.id })}
                onRemove={() => handleRemove(listing.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FavoriteCard({
  listing,
  onView,
  onRemove
}: {
  listing: Listing
  onView: () => void
  onRemove: () => void
}) {
  return (
    <Card className="cursor-pointer group hover:border-accent hover:shadow-lg transition-all overflow-hidden">
      <div onClick={onView}>
        <div className="aspect-video relative overflow-hidden bg-muted">
          {listing.images[0] && (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {listing.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-accent to-purple-600">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{listing.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {listing.year && <Badge variant="secondary">{listing.year}</Badge>}
            {listing.mileage && <Badge variant="secondary">{listing.mileage.toLocaleString()} mi</Badge>}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-accent">${listing.price.toLocaleString()}</span>
          </div>
        </CardContent>
      </div>
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="w-full gap-2 text-destructive hover:text-destructive"
        >
          <Trash size={16} weight="duotone" />
          Remove
        </Button>
      </div>
    </Card>
  )
}
