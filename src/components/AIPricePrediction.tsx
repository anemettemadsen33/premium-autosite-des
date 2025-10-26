import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkle, TrendUp, TrendDown, Minus } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { Listing } from '@/lib/types'

interface AIPricePredictionProps {
  listing: Listing
  onGetPrediction?: (predictedPrice: number, confidence: number) => void
}

export function AIPricePrediction({ listing, onGetPrediction }: AIPricePredictionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<{
    price: number
    confidence: number
    factors: { name: string; impact: 'positive' | 'negative' | 'neutral' }[]
  } | null>(listing.aiPredictedPrice ? {
    price: listing.aiPredictedPrice,
    confidence: listing.priceConfidence || 0,
    factors: []
  } : null)

  const getPricePrediction = async () => {
    setIsLoading(true)
    
    const promptText = `You are an automotive pricing expert. Analyze this vehicle and provide a fair market price prediction.

Vehicle Details:
- Brand: ${listing.brand || 'Unknown'}
- Model: ${listing.model || 'Unknown'}
- Year: ${listing.year || 'N/A'}
- Mileage: ${listing.mileage || 'N/A'} km
- Condition: ${listing.condition || 'N/A'}
- Fuel Type: ${listing.fuelType || 'N/A'}
- Transmission: ${listing.transmission || 'N/A'}
- Location: ${listing.location}
- Current Asking Price: €${listing.price.toLocaleString()}

Based on current market trends, vehicle condition, mileage, and location, provide:
1. A realistic market value prediction
2. Confidence level (0-100)
3. Three key factors affecting the price (name and impact: positive/negative/neutral)

Return a JSON object with this structure:
{
  "predictedPrice": number,
  "confidence": number,
  "factors": [
    {"name": "factor name", "impact": "positive|negative|neutral"}
  ]
}`

    try {
      const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
      const data = JSON.parse(response)
      
      setPrediction({
        price: data.predictedPrice,
        confidence: data.confidence,
        factors: data.factors
      })
      
      onGetPrediction?.(data.predictedPrice, data.confidence)
    } catch (error) {
      console.error('Failed to get price prediction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const priceDifference = prediction ? listing.price - prediction.price : 0
  const percentageDiff = prediction ? ((priceDifference / prediction.price) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkle className="text-accent" weight="fill" />
          AI Price Analysis
        </CardTitle>
        <CardDescription>
          Get an AI-powered market value prediction for this vehicle
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!prediction && (
          <Button 
            onClick={getPricePrediction} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Analyzing...' : 'Get AI Price Prediction'}
          </Button>
        )}

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="rounded-lg bg-accent/10 p-4 space-y-2">
              <div className="text-sm text-muted-foreground">AI Predicted Value</div>
              <div className="text-3xl font-bold text-accent">
                €{prediction.price.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={prediction.confidence > 80 ? 'default' : 'secondary'}>
                  {prediction.confidence}% Confidence
                </Badge>
                {Math.abs(percentageDiff) > 5 && (
                  <Badge variant={priceDifference > 0 ? 'destructive' : 'default'}>
                    {priceDifference > 0 ? (
                      <TrendUp className="mr-1" size={14} />
                    ) : (
                      <TrendDown className="mr-1" size={14} />
                    )}
                    {Math.abs(percentageDiff).toFixed(1)}% {priceDifference > 0 ? 'above' : 'below'} market
                  </Badge>
                )}
              </div>
            </div>

            {prediction.factors.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Key Price Factors</div>
                <div className="space-y-2">
                  {prediction.factors.map((factor, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 text-sm"
                    >
                      {factor.impact === 'positive' && (
                        <TrendUp className="text-green-500" size={16} />
                      )}
                      {factor.impact === 'negative' && (
                        <TrendDown className="text-red-500" size={16} />
                      )}
                      {factor.impact === 'neutral' && (
                        <Minus className="text-muted-foreground" size={16} />
                      )}
                      <span>{factor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={getPricePrediction} 
              disabled={isLoading}
              variant="outline"
              className="w-full"
              size="sm"
            >
              Refresh Analysis
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
