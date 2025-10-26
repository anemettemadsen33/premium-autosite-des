import { Star } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface SponsoredBadgeProps {
  dealerName?: string
  className?: string
}

export function SponsoredBadge({ dealerName, className }: SponsoredBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            className={`bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 hover:from-amber-500 hover:to-yellow-600 font-semibold px-3 py-1 gap-1.5 ${className}`}
          >
            <Star weight="fill" className="w-3.5 h-3.5" />
            Sponsored
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {dealerName 
              ? `Această mașină este sponsorizată de ${dealerName}` 
              : 'Această mașină este sponsorizată de dealer'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
