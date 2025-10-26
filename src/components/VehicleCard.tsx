import { memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Eye, MapPin, Gauge } from '@phosphor-icons/react'
import { Listing } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useFavorites } from '@/lib/favorites'
import { useAuth } from '@/lib/auth'
import { trackEvent, generateSessionId, getDeviceType } from '@/lib/analytics'
import { LazyImage } from './LazyImage'
import { motion } from 'framer-motion'

interface VehicleCardProps {
  listing?: Listing
  vehicle?: any
  onNavigate?: (page: string, params?: Record<string, string>) => void
  onClick?: () => void
  index?: number
}

export const VehicleCard = memo(function VehicleCard({ 
  listing, 
  vehicle,
  onNavigate,
  onClick,
  index = 0 
}: VehicleCardProps) {
  const item = listing || vehicle
  const { user } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites(user?.id || null)
  
  if (!item) return null

  const favorite = isFavorite(item.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(item.id)
  }

  const handleClick = () => {
    trackEvent({
      listingId: item.id,
      userId: user?.id,
      eventType: 'click',
      metadata: {
        sessionId: generateSessionId(),
        deviceType: getDeviceType(),
        source: 'listing-card',
      }
    })
    
    if (onClick) {
      onClick()
    } else if (onNavigate) {
      onNavigate('listing', { id: item.id })
    }
  }

  const imageUrl = item.images?.[0] || item.image || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
    >
      <Card 
        className="group cursor-pointer hover-lift hover-glow overflow-hidden border border-border/50 bg-card"
        onClick={handleClick}
      >
        <div className="relative overflow-hidden">
          <LazyImage
            src={imageUrl}
            alt={item.title || item.name}
            className="w-full rounded-t-lg transition-transform duration-500 group-hover:scale-110"
            aspectRatio="16/10"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 right-3 flex gap-2">
            {item.isFeatured && (
              <Badge className="bg-accent text-accent-foreground shadow-lg font-semibold">
                Featured
              </Badge>
            )}
            {item.condition === 'new' && (
              <Badge className="bg-emerald-500 text-white shadow-lg font-semibold">
                New
              </Badge>
            )}
            {item.condition === 'certified' && (
              <Badge className="bg-blue-500 text-white shadow-lg font-semibold">
                Certified
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 left-3 bg-background/95 hover:bg-background shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={favorite ? 'fill-red-500 text-red-500' : 'text-foreground'} 
              weight={favorite ? 'fill' : 'regular'}
              size={20}
            />
          </Button>
        </div>

        <CardContent className="p-5 space-y-3">
          <div>
            <h3 className="font-bold text-lg line-clamp-1 group-hover:text-accent transition-colors duration-200">
              {item.title || item.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            {item.year && (
              <span className="font-semibold text-foreground">{item.year}</span>
            )}
            {item.mileage !== undefined && (
              <div className="flex items-center gap-1.5">
                <Gauge size={16} className="text-accent" />
                <span className="font-medium">{item.mileage.toLocaleString()} mi</span>
              </div>
            )}
            {item.fuelType && (
              <span className="font-medium">{item.fuelType}</span>
            )}
          </div>

          {item.location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin size={16} className="text-accent" />
              <span>{item.location}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border/60">
            <div>
              <span className="text-2xl font-bold text-accent">
                {formatPrice(item.price, '$')}
              </span>
            </div>
            
            {item.views !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Eye size={16} />
                <span className="font-medium">{item.views.toLocaleString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})
