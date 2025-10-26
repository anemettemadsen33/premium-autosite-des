import { memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Eye, MapPin, Gauge } from '@phosphor-icons/react'
import { Listing } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useFavorites } from '@/lib/favorites'
import { useAuth } from '@/lib/auth'
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
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card 
        className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        onClick={handleClick}
      >
        <div className="relative">
          <LazyImage
            src={imageUrl}
            alt={item.title || item.name}
            className="w-full rounded-t-lg"
            aspectRatio="16/10"
          />
          
          <div className="absolute top-2 right-2 flex gap-2">
            {item.isFeatured && (
              <Badge className="bg-accent text-accent-foreground">Featured</Badge>
            )}
            {item.condition === 'new' && (
              <Badge className="bg-green-500 text-white">New</Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 bg-background/90 hover:bg-background"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={favorite ? 'fill-red-500 text-red-500' : ''} 
              weight={favorite ? 'fill' : 'regular'}
            />
          </Button>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-accent transition-colors">
              {item.title || item.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {item.year && (
              <span className="font-medium">{item.year}</span>
            )}
            {item.mileage && (
              <div className="flex items-center gap-1">
                <Gauge size={16} />
                <span>{item.mileage.toLocaleString()} mi</span>
              </div>
            )}
          </div>

          {item.location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>{item.location}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-2xl font-bold text-accent">
              {formatPrice(item.price, '$')}
            </span>
            
            {item.views !== undefined && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye size={16} />
                <span>{item.views}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})
