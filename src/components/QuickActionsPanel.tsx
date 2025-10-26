import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  Lightning,
  Heart,
  Gavel,
  MagnifyingGlass,
  ChatCircleDots,
  Calculator,
  ChartLine,
  Bell,
  ShoppingCart,
  Sparkle,
  CaretRight
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

type QuickAction = {
  id: string
  label: string
  icon: React.ReactNode
  badge?: string
  color: string
  action: () => void
}

type QuickActionsPanelProps = {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function QuickActionsPanel({ onNavigate }: QuickActionsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const actions: QuickAction[] = [
    {
      id: 'add-listing',
      label: 'Post Listing',
      icon: <Plus className="h-5 w-5" weight="bold" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      action: () => {
        onNavigate('add-listing')
        setIsOpen(false)
      }
    },
    {
      id: 'auctions',
      label: 'Live Auctions',
      icon: <Gavel className="h-5 w-5" weight="duotone" />,
      badge: 'LIVE',
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      action: () => {
        onNavigate('auctions')
        setIsOpen(false)
      }
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <Heart className="h-5 w-5" weight="duotone" />,
      color: 'bg-gradient-to-br from-pink-500 to-rose-500',
      action: () => {
        onNavigate('favorites')
        setIsOpen(false)
      }
    },
    {
      id: 'search',
      label: 'Advanced Search',
      icon: <MagnifyingGlass className="h-5 w-5" weight="bold" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      action: () => {
        onNavigate('category', { category: 'cars' })
        setIsOpen(false)
      }
    },
    {
      id: 'calculators',
      label: 'Calculators',
      icon: <Calculator className="h-5 w-5" weight="duotone" />,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      action: () => {
        onNavigate('calculators')
        setIsOpen(false)
      }
    },
    {
      id: 'advanced-tools',
      label: 'Advanced Tools',
      icon: <Sparkle className="h-5 w-5" weight="fill" />,
      badge: 'AI',
      color: 'bg-gradient-to-br from-yellow-500 to-amber-600',
      action: () => {
        onNavigate('advanced-tools')
        setIsOpen(false)
      }
    },
    {
      id: 'insights',
      label: 'Market Insights',
      icon: <ChartLine className="h-5 w-5" weight="duotone" />,
      color: 'bg-gradient-to-br from-cyan-500 to-blue-500',
      action: () => {
        onNavigate('market-insights')
        setIsOpen(false)
      }
    },
    {
      id: 'comparison',
      label: 'Compare',
      icon: <ShoppingCart className="h-5 w-5" weight="duotone" />,
      color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      action: () => {
        onNavigate('comparison')
        setIsOpen(false)
      }
    },
    {
      id: 'saved-searches',
      label: 'Saved Searches',
      icon: <Bell className="h-5 w-5" weight="duotone" />,
      color: 'bg-gradient-to-br from-amber-500 to-orange-500',
      action: () => {
        onNavigate('saved-searches')
        setIsOpen(false)
      }
    }
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-24 left-4 md:left-6 z-40 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-accent to-purple-600 hover:from-accent/90 hover:to-purple-700"
        >
          <Lightning className="h-6 w-6" weight="duotone" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        className="w-72 p-2"
        sideOffset={10}
      >
        <DropdownMenuLabel className="flex items-center gap-2 text-base">
          <Sparkle className="h-5 w-5 text-accent" weight="duotone" />
          Quick Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-2 gap-2 p-1">
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card
                className="relative overflow-hidden cursor-pointer group hover:shadow-lg transition-all border-0"
                onClick={action.action}
              >
                <div className={`${action.color} p-4 text-white`}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      {action.icon}
                      {action.badge && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-1.5 py-0 h-5 bg-white/20 text-white border-0"
                        >
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm leading-tight">
                        {action.label}
                      </p>
                    </div>
                  </div>
                  <CaretRight
                    className="absolute bottom-2 right-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    weight="bold"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
