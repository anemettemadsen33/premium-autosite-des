import { useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChartBar } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface CompareButtonProps {
  listingId: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  onNavigate?: (page: string) => void
}

export function CompareButton({ listingId, variant = 'outline', size = 'default', onNavigate }: CompareButtonProps) {
  const [comparisonIds, setComparisonIds] = useKV<string[]>('comparison-ids', [])
  const [isInComparison, setIsInComparison] = useState(false)

  useEffect(() => {
    setIsInComparison((comparisonIds || []).includes(listingId))
  }, [comparisonIds, listingId])

  const toggleComparison = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (isInComparison) {
      setComparisonIds(current => (current || []).filter(id => id !== listingId))
      toast.success('Removed from comparison')
    } else {
      if ((comparisonIds || []).length >= 3) {
        toast.error('You can compare up to 3 vehicles')
        return
      }
      setComparisonIds(current => [...(current || []), listingId])
      toast.success('Added to comparison')
    }
  }

  return (
    <Button
      variant={isInComparison ? 'default' : variant}
      size={size}
      onClick={toggleComparison}
      className="relative"
    >
      <ChartBar className="w-4 h-4 mr-2" />
      {isInComparison ? 'Remove from Compare' : 'Compare'}
    </Button>
  )
}

export function CompareFloatingButton({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [comparisonIds] = useKV<string[]>('comparison-ids', [])
  const count = (comparisonIds || []).length

  if (count === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        onClick={() => onNavigate('comparison')}
        className="shadow-lg relative"
      >
        <ChartBar className="w-5 h-5 mr-2" />
        Compare ({count})
        {count > 0 && (
          <Badge className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center p-0">
            {count}
          </Badge>
        )}
      </Button>
    </div>
  )
}
