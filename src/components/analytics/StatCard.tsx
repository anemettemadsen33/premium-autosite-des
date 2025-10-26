import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendUp, TrendDown, Minus } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: number
  trendLabel?: string
  description?: string
  colorClass?: string
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendLabel, 
  description,
  colorClass = 'text-accent'
}: StatCardProps) {
  const getTrendIcon = () => {
    if (trend === undefined || trend === 0) return <Minus size={16} weight="bold" />
    return trend > 0 
      ? <TrendUp size={16} weight="bold" /> 
      : <TrendDown size={16} weight="bold" />
  }

  const getTrendColor = () => {
    if (trend === undefined || trend === 0) return 'text-muted-foreground'
    return trend > 0 ? 'text-green-500' : 'text-red-500'
  }

  const formattedTrend = useMemo(() => {
    if (trend === undefined) return null
    const sign = trend > 0 ? '+' : ''
    return `${sign}${trend.toFixed(1)}%`
  }, [trend])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={colorClass}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight mb-2">
            {value}
          </div>
          {(trend !== undefined || description) && (
            <div className="flex items-center gap-2 text-sm">
              {trend !== undefined && (
                <div className={`flex items-center gap-1 font-medium ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span>{formattedTrend}</span>
                </div>
              )}
              {trendLabel && (
                <span className="text-muted-foreground">{trendLabel}</span>
              )}
              {description && !trendLabel && (
                <span className="text-muted-foreground">{description}</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
