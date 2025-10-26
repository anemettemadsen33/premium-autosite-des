import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Gauge,
  Lightning,
  Clock,
  ChartLine,
  Activity,
  CheckCircle,
  Warning,
  X
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

type PerformanceMetric = {
  name: string
  value: number
  unit: string
  status: 'good' | 'warning' | 'poor'
  icon: React.ReactNode
}

type PerformanceMonitorProps = {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function PerformanceMonitorPage({ onNavigate }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [overallScore, setOverallScore] = useState(0)

  useEffect(() => {
    const performanceData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const loadTime = performanceData.loadEventEnd - performanceData.fetchStart
    const domContentLoaded = performanceData.domContentLoadedEventEnd - performanceData.fetchStart
    const firstPaint = performance.getEntriesByName('first-paint')[0]?.startTime || 0
    const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0

    const newMetrics: PerformanceMetric[] = [
      {
        name: 'Page Load Time',
        value: Math.round(loadTime),
        unit: 'ms',
        status: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'warning' : 'poor',
        icon: <Clock className="h-5 w-5" weight="duotone" />
      },
      {
        name: 'DOM Content Loaded',
        value: Math.round(domContentLoaded),
        unit: 'ms',
        status: domContentLoaded < 1500 ? 'good' : domContentLoaded < 3000 ? 'warning' : 'poor',
        icon: <Lightning className="h-5 w-5" weight="duotone" />
      },
      {
        name: 'First Paint',
        value: Math.round(firstPaint),
        unit: 'ms',
        status: firstPaint < 1000 ? 'good' : firstPaint < 2000 ? 'warning' : 'poor',
        icon: <Activity className="h-5 w-5" weight="duotone" />
      },
      {
        name: 'First Contentful Paint',
        value: Math.round(firstContentfulPaint),
        unit: 'ms',
        status: firstContentfulPaint < 1500 ? 'good' : firstContentfulPaint < 2500 ? 'warning' : 'poor',
        icon: <ChartLine className="h-5 w-5" weight="duotone" />
      }
    ]

    setMetrics(newMetrics)

    const score = newMetrics.reduce((acc, metric) => {
      if (metric.status === 'good') return acc + 25
      if (metric.status === 'warning') return acc + 15
      return acc + 5
    }, 0)

    setOverallScore(score)
  }, [])

  const getStatusIcon = (status: 'good' | 'warning' | 'poor') => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-500" weight="fill" />
      case 'warning':
        return <Warning className="h-5 w-5 text-yellow-500" weight="fill" />
      case 'poor':
        return <X className="h-5 w-5 text-red-500" weight="fill" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 50) return 'Needs Improvement'
    return 'Poor'
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Performance Monitor</h1>
          <p className="text-muted-foreground">
            Real-time performance metrics and optimization insights
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-6 w-6 text-accent" weight="duotone" />
                Overall Performance Score
              </CardTitle>
              <CardDescription>
                Based on key web vitals and loading metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                        {overallScore}
                      </div>
                      <div className="text-xs text-muted-foreground">/ 100</div>
                    </div>
                  </div>
                </motion.div>
                <div className="flex-1">
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Performance</span>
                      <Badge variant={overallScore >= 90 ? 'default' : overallScore >= 70 ? 'secondary' : 'destructive'}>
                        {getScoreLabel(overallScore)}
                      </Badge>
                    </div>
                    <Progress value={overallScore} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {overallScore >= 90 && "Excellent! Your site is performing optimally."}
                    {overallScore >= 70 && overallScore < 90 && "Good performance with room for optimization."}
                    {overallScore >= 50 && overallScore < 70 && "Performance needs improvement."}
                    {overallScore < 50 && "Critical performance issues detected."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`
                        ${metric.status === 'good' ? 'text-green-500' : ''}
                        ${metric.status === 'warning' ? 'text-yellow-500' : ''}
                        ${metric.status === 'poor' ? 'text-red-500' : ''}
                      `}>
                        {metric.icon}
                      </div>
                      <CardTitle className="text-base">{metric.name}</CardTitle>
                    </div>
                    {getStatusIcon(metric.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    <span className="text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div className="mt-3">
                    <Progress
                      value={metric.status === 'good' ? 100 : metric.status === 'warning' ? 60 : 30}
                      className="h-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Recommendations</CardTitle>
            <CardDescription>
              Suggestions to improve your site performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" weight="fill" />
              <div>
                <p className="font-medium text-sm">Lazy loading images</p>
                <p className="text-sm text-muted-foreground">
                  Images are loaded only when visible in viewport
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" weight="fill" />
              <div>
                <p className="font-medium text-sm">Debounced search inputs</p>
                <p className="text-sm text-muted-foreground">
                  Search triggers are optimized with 300ms debounce
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" weight="fill" />
              <div>
                <p className="font-medium text-sm">React component memoization</p>
                <p className="text-sm text-muted-foreground">
                  Heavy components use React.memo to prevent re-renders
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" weight="fill" />
              <div>
                <p className="font-medium text-sm">Infinite scroll pagination</p>
                <p className="text-sm text-muted-foreground">
                  Only 12 items loaded initially, more on scroll
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
