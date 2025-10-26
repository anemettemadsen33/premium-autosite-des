import { Sparkle, TrendUp, TrendDown, Info } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import type { PricePrediction } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

interface PricePredictionCardProps {
  prediction: PricePrediction
  currentPrice: number
}

export function PricePredictionCard({ prediction, currentPrice }: PricePredictionCardProps) {
  const priceDiff = prediction.predictedPrice - currentPrice
  const priceDiffPercent = (priceDiff / currentPrice) * 100
  const isOverpriced = priceDiff < -500
  const isUnderpriced = priceDiff > 500

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200/50 dark:border-purple-800/50">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <Sparkle className="w-5 h-5 text-purple-600 dark:text-purple-400" weight="fill" />
          </div>
          <div>
            <h3 className="font-semibold">Predicție Preț AI</h3>
            <p className="text-sm text-muted-foreground">Bazat pe analiza pieței</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-5 h-5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>AI sugerează acest preț pe baza istoricului de vânzări și a anunțurilor similare pe piață</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
            <Sparkle className="w-3 h-3 mr-1" weight="fill" />
            Smart
          </Badge>
          <span className="text-3xl font-bold">{formatPrice(prediction.predictedPrice)}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Încredere:</span>
          <Progress value={prediction.confidence * 100} className="flex-1 h-2" />
          <span className="text-sm font-medium">{Math.round(prediction.confidence * 100)}%</span>
        </div>

        {(isOverpriced || isUnderpriced) && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            isUnderpriced 
              ? 'bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-100' 
              : 'bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100'
          }`}>
            {isUnderpriced ? (
              <>
                <TrendUp className="w-5 h-5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Preț sub piață</p>
                  <p className="text-xs opacity-80">
                    Poți crește cu {formatPrice(Math.abs(priceDiff))} ({priceDiffPercent.toFixed(1)}%)
                  </p>
                </div>
              </>
            ) : (
              <>
                <TrendDown className="w-5 h-5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Preț peste piață</p>
                  <p className="text-xs opacity-80">
                    Consideră reducere cu {formatPrice(Math.abs(priceDiff))} ({Math.abs(priceDiffPercent).toFixed(1)}%)
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-semibold">Factori de Impact:</h4>
          <div className="space-y-2">
            {prediction.factors.slice(0, 3).map((factor, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  factor.impact === 'positive' ? 'bg-green-500' :
                  factor.impact === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                }`} />
                <span className="flex-1">{factor.factor}</span>
                <span className="text-muted-foreground">{Math.round(factor.weight * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Preț mediu piață:</span>
            <span className="font-medium">{formatPrice(prediction.marketComparison.averagePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Anunțuri similare:</span>
            <span className="font-medium">{prediction.marketComparison.similarListings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Percentil preț:</span>
            <span className="font-medium">{Math.round(prediction.marketComparison.pricePercentile)}%</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function PricePredictionInline({ prediction, currentPrice }: PricePredictionCardProps) {
  const priceDiff = prediction.predictedPrice - currentPrice
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50">
      <Sparkle className="w-5 h-5 text-purple-600 dark:text-purple-400" weight="fill" />
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">Preț recomandat AI:</span>
          <span className="font-bold text-purple-700 dark:text-purple-300">{formatPrice(prediction.predictedPrice)}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Progress value={prediction.confidence * 100} className="h-1 flex-1 max-w-[100px]" />
          <span className="text-xs text-muted-foreground">{Math.round(prediction.confidence * 100)}% încredere</span>
        </div>
      </div>
      {Math.abs(priceDiff) > 500 && (
        <Badge variant={priceDiff > 0 ? 'default' : 'secondary'} className="ml-auto">
          {priceDiff > 0 ? '+' : ''}{formatPrice(priceDiff)}
        </Badge>
      )}
    </div>
  )
}
