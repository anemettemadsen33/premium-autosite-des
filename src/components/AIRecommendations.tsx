import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VehicleCard } from '@/components/VehicleCard'
import { Sparkle } from '@phosphor-icons/react'
import type { Listing, VehicleRecommendation } from '@/lib/types'

interface AIRecommendationsProps {
  currentListing?: Listing
  userFavorites?: string[]
  userSearchHistory?: string[]
  allListings: Listing[]
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function AIRecommendations({ 
  currentListing, 
  userFavorites = [], 
  userSearchHistory = [],
  allListings,
  onNavigate 
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    generateRecommendations()
  }, [currentListing?.id])

  const generateRecommendations = async () => {
    setIsLoading(true)
    
    try {
      const context = currentListing 
        ? `Currently viewing: ${currentListing.brand} ${currentListing.model} (${currentListing.year}) - €${currentListing.price.toLocaleString()}`
        : `User has ${userFavorites.length} favorites`

      const availableVehicles = allListings
        .filter(l => l.id !== currentListing?.id && l.status === 'active')
        .slice(0, 20)
        .map(l => `${l.id}: ${l.brand} ${l.model} ${l.year} - €${l.price} (${l.mileage}km, ${l.fuelType})`)
        .join('\n')

      const promptText = `You are an automotive recommendation engine. Based on the user context, recommend the best 3 vehicles from the available listings.

User Context:
${context}

Available Vehicles:
${availableVehicles}

Consider:
- Similar price range (±20%)
- Similar vehicle type and features
- Good value for money
- User's browsing patterns

Return a JSON object with:
{
  "recommendations": [
    {"listingId": "id1", "score": 95, "reasons": ["reason1", "reason2"]},
    {"listingId": "id2", "score": 88, "reasons": ["reason1", "reason2"]},
    {"listingId": "id3", "score": 82, "reasons": ["reason1", "reason2"]}
  ]
}

Only include listing IDs that exist in the available vehicles list.`

      const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
      const data = JSON.parse(response)
      
      const recommendedListings = data.recommendations
        .map((rec: VehicleRecommendation) => 
          allListings.find(l => l.id === rec.listingId)
        )
        .filter((l): l is Listing => l !== undefined)
        .slice(0, 3)
      
      setRecommendations(recommendedListings)
    } catch (error) {
      console.error('Failed to generate recommendations:', error)
      const fallback = allListings
        .filter(l => l.id !== currentListing?.id && l.status === 'active')
        .slice(0, 3)
      setRecommendations(fallback)
    } finally {
      setIsLoading(false)
    }
  }

  if (recommendations.length === 0 && !isLoading) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkle className="text-accent" weight="fill" />
          Recommended for You
        </CardTitle>
        <CardDescription>
          AI-powered recommendations based on your preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-72 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map(listing => (
              <VehicleCard 
                key={listing.id}
                vehicle={listing}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
        
        {!isLoading && recommendations.length > 0 && (
          <Button 
            onClick={generateRecommendations}
            variant="outline"
            className="w-full mt-4"
            size="sm"
          >
            Refresh Recommendations
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
