import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SAMPLE_LISTINGS } from '@/lib/data'
import { Listing } from '@/lib/types'
import { useListings } from '@/lib/listings'
import { useFavorites } from '@/lib/favorites'
import { useAuth } from '@/lib/auth'
import {
  ArrowLeft, Heart, Eye, MapPin, Calendar, 
  Gauge, Drop, Gear, Car, EnvelopeSimple, Phone
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface ListingDetailPageProps {
  listingId: string
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function ListingDetailPage({ listingId, onNavigate }: ListingDetailPageProps) {
  const { listings } = useListings()
  const { user, isAuthenticated } = useAuth()
  const { toggleFavorite, isFavorite: checkIsFavorite } = useFavorites(user?.id || null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)

  const allListings = [...SAMPLE_LISTINGS, ...listings]
  const listing = allListings.find(l => l.id === listingId)

  const isFavorite = checkIsFavorite(listingId)

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save favorites')
      onNavigate('login')
      return
    }

    toggleFavorite(listingId)
    
    if (isFavorite) {
      toast.success('Removed from favorites')
    } else {
      toast.success('Added to favorites')
    }
  }

  const handleContact = () => {
    if (!isAuthenticated) {
      toast.error('Please login to contact seller')
      onNavigate('login')
      return
    }
    setShowContactForm(true)
    toast.success('Message sent to seller')
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
          <p className="text-muted-foreground mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => onNavigate('home')}>Back to Home</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => onNavigate('category', { category: listing.category })}
        >
          <ArrowLeft size={20} weight="bold" />
          Back to {listing.category}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                {listing.images[selectedImageIndex] && (
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={listing.images[selectedImageIndex]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {listing.isFeatured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-accent to-purple-600">
                    Featured
                  </Badge>
                )}
              </div>
              {listing.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === selectedImageIndex ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} weight="duotone" />
                        {listing.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={16} weight="duotone" />
                        {listing.views} views
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={isFavorite ? 'default' : 'outline'}
                    size="icon"
                    onClick={handleToggleFavorite}
                  >
                    <Heart size={20} weight={isFavorite ? 'fill' : 'duotone'} />
                  </Button>
                </div>

                <Separator className="my-6" />

                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-6">
                    <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                  </TabsContent>
                  <TabsContent value="specifications" className="mt-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {listing.brand && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Brand</dt>
                          <dd className="font-medium">{listing.brand}</dd>
                        </div>
                      )}
                      {listing.model && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Model</dt>
                          <dd className="font-medium">{listing.model}</dd>
                        </div>
                      )}
                      {listing.year && (
                        <div>
                          <dt className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar size={16} weight="duotone" />
                            Year
                          </dt>
                          <dd className="font-medium">{listing.year}</dd>
                        </div>
                      )}
                      {listing.mileage !== undefined && (
                        <div>
                          <dt className="text-sm text-muted-foreground flex items-center gap-1">
                            <Gauge size={16} weight="duotone" />
                            Mileage
                          </dt>
                          <dd className="font-medium">{listing.mileage.toLocaleString()} mi</dd>
                        </div>
                      )}
                      {listing.fuelType && (
                        <div>
                          <dt className="text-sm text-muted-foreground flex items-center gap-1">
                            <Drop size={16} weight="duotone" />
                            Fuel Type
                          </dt>
                          <dd className="font-medium">{listing.fuelType}</dd>
                        </div>
                      )}
                      {listing.transmission && (
                        <div>
                          <dt className="text-sm text-muted-foreground flex items-center gap-1">
                            <Gear size={16} weight="duotone" />
                            Transmission
                          </dt>
                          <dd className="font-medium">{listing.transmission}</dd>
                        </div>
                      )}
                      {listing.condition && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Condition</dt>
                          <dd className="font-medium capitalize">{listing.condition}</dd>
                        </div>
                      )}
                      {listing.bodyType && (
                        <div>
                          <dt className="text-sm text-muted-foreground flex items-center gap-1">
                            <Car size={16} weight="duotone" />
                            Body Type
                          </dt>
                          <dd className="font-medium">{listing.bodyType}</dd>
                        </div>
                      )}
                      {listing.color && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Color</dt>
                          <dd className="font-medium">{listing.color}</dd>
                        </div>
                      )}
                      {listing.engineSize && (
                        <div>
                          <dt className="text-sm text-muted-foreground">Engine</dt>
                          <dd className="font-medium">{listing.engineSize}</dd>
                        </div>
                      )}
                    </dl>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-accent mb-6">
                  ${listing.price.toLocaleString()}
                </div>
                
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-gradient-to-r from-accent to-purple-600"
                    onClick={handleContact}
                  >
                    <EnvelopeSimple size={20} weight="bold" />
                    Contact Seller
                  </Button>
                  <Button size="lg" variant="outline" className="w-full gap-2">
                    <Phone size={20} weight="duotone" />
                    Call Seller
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{listing.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                      {listing.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium">
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Safety Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Meet in a safe, public location</li>
                  <li>• Inspect the vehicle thoroughly</li>
                  <li>• Check vehicle history report</li>
                  <li>• Never send money before seeing the item</li>
                  <li>• Bring a friend or family member</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
