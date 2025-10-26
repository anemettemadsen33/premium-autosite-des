import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, ArrowsClockwise, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useState } from 'react'
import type { AnalyticsEvent } from '@/lib/analytics'

export function DemoDataGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateDemoAnalytics = async () => {
    setIsGenerating(true)
    try {
      const existingEvents = await window.spark.kv.get<AnalyticsEvent[]>('analytics-events') || []
      
      const eventTypes: Array<'view' | 'click' | 'favorite' | 'contact' | 'share' | 'phone_reveal' | 'email_reveal'> = [
        'view', 'view', 'view', 'view', 'view',
        'click', 'click', 'click',
        'favorite', 'favorite',
        'contact',
        'share',
        'phone_reveal',
        'email_reveal'
      ]

      const devices: Array<'mobile' | 'tablet' | 'desktop'> = ['mobile', 'tablet', 'desktop']
      const referrers = ['google.com', 'facebook.com', 'direct', 'instagram.com', 'twitter.com']
      
      const sampleListingIds = ['listing-1', 'listing-2', 'listing-3', 'listing-4', 'listing-5']
      
      const demoEvents: AnalyticsEvent[] = []
      
      for (let i = 0; i < 500; i++) {
        const daysAgo = Math.floor(Math.random() * 30)
        const timestamp = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
        timestamp.setHours(Math.floor(Math.random() * 24))
        timestamp.setMinutes(Math.floor(Math.random() * 60))
        
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const listingId = sampleListingIds[Math.floor(Math.random() * sampleListingIds.length)]
        
        demoEvents.push({
          id: `demo_evt_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
          listingId,
          userId: Math.random() > 0.3 ? 'user-1' : undefined,
          eventType,
          timestamp: timestamp.toISOString(),
          metadata: {
            sessionId: `session_${Math.floor(Math.random() * 100)}`,
            deviceType: devices[Math.floor(Math.random() * devices.length)],
            referrer: referrers[Math.floor(Math.random() * referrers.length)],
          }
        })
      }
      
      const allEvents = [...existingEvents, ...demoEvents]
      
      if (allEvents.length > 10000) {
        allEvents.splice(0, allEvents.length - 10000)
      }
      
      await window.spark.kv.set('analytics-events', allEvents)
      
      toast.success(`Generated ${demoEvents.length} demo analytics events`)
    } catch (error) {
      toast.error('Failed to generate demo data')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const clearAnalytics = async () => {
    try {
      await window.spark.kv.set('analytics-events', [])
      toast.success('Analytics data cleared')
    } catch (error) {
      toast.error('Failed to clear analytics')
      console.error(error)
    }
  }

  return (
    <Card className="mt-8 border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database size={24} className="text-accent" />
          Demo Data Generator
        </CardTitle>
        <CardDescription>
          Generate sample analytics events for testing the Live Analytics Dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Button
          onClick={generateDemoAnalytics}
          disabled={isGenerating}
          className="gap-2"
        >
          <ArrowsClockwise size={18} className={isGenerating ? 'animate-spin' : ''} />
          Generate 500 Events
        </Button>
        <Button
          onClick={clearAnalytics}
          variant="outline"
          className="gap-2"
        >
          <Trash size={18} />
          Clear All Analytics
        </Button>
      </CardContent>
    </Card>
  )
}
