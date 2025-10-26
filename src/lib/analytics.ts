import { useKV } from '@github/spark/hooks'

export interface AnalyticsEvent {
  id: string
  listingId: string
  userId?: string
  eventType: 'view' | 'click' | 'favorite' | 'contact' | 'share' | 'phone_reveal' | 'email_reveal'
  timestamp: string
  metadata?: {
    source?: string
    referrer?: string
    deviceType?: 'mobile' | 'tablet' | 'desktop'
    location?: string
    sessionId?: string
  }
}

export interface ListingAnalytics {
  listingId: string
  totalViews: number
  uniqueViews: number
  totalClicks: number
  favorites: number
  contacts: number
  shares: number
  phoneReveals: number
  emailReveals: number
  conversionRate: number
  averageTimeOnPage?: number
  viewsByDay: Record<string, number>
  clicksByDay: Record<string, number>
  topReferrers: Record<string, number>
  deviceBreakdown: Record<string, number>
}

export interface DashboardStats {
  totalListings: number
  activeListings: number
  soldListings: number
  totalViews: number
  totalClicks: number
  totalLeads: number
  conversionRate: number
  averagePrice: number
  totalValue: number
  viewTrend: number
  clickTrend: number
  leadTrend: number
}

export const trackEvent = async (event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> => {
  const events = await window.spark.kv.get<AnalyticsEvent[]>('analytics-events') || []
  
  const newEvent: AnalyticsEvent = {
    ...event,
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  }
  
  events.push(newEvent)
  
  if (events.length > 10000) {
    events.splice(0, events.length - 10000)
  }
  
  await window.spark.kv.set('analytics-events', events)
}

export const getListingAnalytics = async (listingId: string, timeframe: number = 30): Promise<ListingAnalytics> => {
  const events = await window.spark.kv.get<AnalyticsEvent[]>('analytics-events') || []
  const cutoffDate = new Date(Date.now() - timeframe * 24 * 60 * 60 * 1000)
  
  const listingEvents = events.filter(
    e => e.listingId === listingId && new Date(e.timestamp) >= cutoffDate
  )
  
  const uniqueViewers = new Set(
    listingEvents
      .filter(e => e.eventType === 'view')
      .map(e => e.metadata?.sessionId || e.userId || 'anonymous')
  ).size
  
  const viewsByDay: Record<string, number> = {}
  const clicksByDay: Record<string, number> = {}
  const topReferrers: Record<string, number> = {}
  const deviceBreakdown: Record<string, number> = {}
  
  listingEvents.forEach(event => {
    const day = new Date(event.timestamp).toISOString().split('T')[0]
    
    if (event.eventType === 'view') {
      viewsByDay[day] = (viewsByDay[day] || 0) + 1
    }
    
    if (event.eventType === 'click') {
      clicksByDay[day] = (clicksByDay[day] || 0) + 1
    }
    
    if (event.metadata?.referrer) {
      topReferrers[event.metadata.referrer] = (topReferrers[event.metadata.referrer] || 0) + 1
    }
    
    if (event.metadata?.deviceType) {
      deviceBreakdown[event.metadata.deviceType] = (deviceBreakdown[event.metadata.deviceType] || 0) + 1
    }
  })
  
  const totalViews = listingEvents.filter(e => e.eventType === 'view').length
  const totalClicks = listingEvents.filter(e => e.eventType === 'click').length
  const contacts = listingEvents.filter(e => e.eventType === 'contact').length
  const phoneReveals = listingEvents.filter(e => e.eventType === 'phone_reveal').length
  const emailReveals = listingEvents.filter(e => e.eventType === 'email_reveal').length
  
  const totalEngagements = contacts + phoneReveals + emailReveals
  
  return {
    listingId,
    totalViews,
    uniqueViews: uniqueViewers,
    totalClicks,
    favorites: listingEvents.filter(e => e.eventType === 'favorite').length,
    contacts,
    shares: listingEvents.filter(e => e.eventType === 'share').length,
    phoneReveals,
    emailReveals,
    conversionRate: totalViews > 0 ? (totalEngagements / totalViews) * 100 : 0,
    viewsByDay,
    clicksByDay,
    topReferrers,
    deviceBreakdown,
  }
}

export const generateSessionId = (): string => {
  const existingSession = sessionStorage.getItem('analytics-session-id')
  if (existingSession) return existingSession
  
  const newSession = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  sessionStorage.setItem('analytics-session-id', newSession)
  return newSession
}

export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}
