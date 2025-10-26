import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { 
  ShieldCheck, 
  Star, 
  Certificate,
  Briefcase,
  MapPin,
  Phone
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import type { User, SellerReview, SellerTier } from '@/lib/types'

interface SellerProfileCardProps {
  seller: User
  listingId?: string
  currentUserId?: string
  allowReview?: boolean
}

export function SellerProfileCard({ seller, listingId, currentUserId, allowReview = false }: SellerProfileCardProps) {
  const [reviews, setReviews] = useKV<SellerReview[]>(`seller-reviews-${seller.id}`, [])
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  const getTierBadge = (tier?: SellerTier) => {
    const config = {
      bronze: { color: 'bg-amber-700', label: 'Bronze Seller' },
      silver: { color: 'bg-gray-400', label: 'Silver Seller' },
      gold: { color: 'bg-yellow-500', label: 'Gold Seller' },
      platinum: { color: 'bg-purple-500', label: 'Platinum Seller' }
    }
    const tierConfig = tier ? config[tier] : null
    
    return tierConfig ? (
      <Badge className={`${tierConfig.color} text-white`}>
        <Certificate className="mr-1" size={14} weight="fill" />
        {tierConfig.label}
      </Badge>
    ) : null
  }

  const submitReview = () => {
    if (!currentUserId || !listingId) {
      toast.error('Please log in to submit a review')
      return
    }

    if (reviewText.trim().length < 10) {
      toast.error('Please write a more detailed review')
      return
    }

    const newReview: SellerReview = {
      id: `review-${Date.now()}`,
      sellerId: seller.id,
      reviewerId: currentUserId,
      listingId,
      rating,
      comment: reviewText,
      createdAt: new Date().toISOString(),
      verifiedPurchase: false
    }

    setReviews((current) => [...(current || []), newReview])
    setReviewText('')
    setRating(5)
    setShowReviewForm(false)
    toast.success('Review submitted successfully!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Seller Information
          {seller.isVerified && (
            <ShieldCheck className="text-accent" weight="fill" size={24} />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={seller.avatar} />
            <AvatarFallback className="text-lg font-bold">
              {seller.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <div className="font-semibold text-lg">{seller.name}</div>
              {seller.businessName && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Briefcase size={14} />
                  {seller.businessName}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {seller.isVerified && (
                <Badge variant="default">
                  <ShieldCheck className="mr-1" size={14} weight="fill" />
                  Verified Seller
                </Badge>
              )}
              {getTierBadge(seller.sellerTier)}
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{seller.totalSales || 0}</div>
            <div className="text-xs text-muted-foreground">Sales</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <Star className="text-yellow-500" weight="fill" size={20} />
              <span className="text-2xl font-bold">
                {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{reviews?.length || 0}</div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="font-medium">Contact Seller</div>
          <Button className="w-full" size="lg">
            <Phone className="mr-2" weight="fill" />
            Contact Seller
          </Button>
        </div>

        {allowReview && currentUserId && currentUserId !== seller.id && (
          <>
            <Separator />
            
            {!showReviewForm ? (
              <Button 
                onClick={() => setShowReviewForm(true)}
                variant="outline"
                className="w-full"
              >
                Write a Review
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3"
              >
                <div className="space-y-2">
                  <div className="text-sm font-medium">Your Rating</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          weight={star <= rating ? 'fill' : 'regular'}
                          className={star <= rating ? 'text-yellow-500' : 'text-muted'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Your Review</div>
                  <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this seller..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={submitReview} className="flex-1">
                    Submit Review
                  </Button>
                  <Button 
                    onClick={() => setShowReviewForm(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}

        {reviews && reviews.length > 0 && (
          <>
            <Separator />
            
            <div className="space-y-3">
              <div className="font-medium">Recent Reviews</div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {reviews.slice(-5).reverse().map((review) => (
                  <div key={review.id} className="p-3 rounded bg-muted space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            weight={i < review.rating ? 'fill' : 'regular'}
                            className={i < review.rating ? 'text-yellow-500' : 'text-muted'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    {review.verifiedPurchase && (
                      <Badge variant="outline" className="text-xs">
                        <ShieldCheck size={12} className="mr-1" />
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
