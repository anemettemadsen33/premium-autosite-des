import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Bell, 
  Check, 
  Gavel,
  Heart,
  ChatCircle,
  TrendUp,
  Car,
  CheckCircle
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

export type NotificationType = 
  | 'bid_outbid' 
  | 'bid_won' 
  | 'message' 
  | 'favorite' 
  | 'price_drop'
  | 'listing_sold'
  | 'test_drive_approved'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  listingId?: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

interface NotificationCenterProps {
  userId?: string
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function NotificationCenter({ userId, onNavigate }: NotificationCenterProps) {
  const [notifications, setNotifications] = useKV<Notification[]>(`notifications-${userId}`, [])
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = (notifications || []).filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((current) => 
      (current || []).map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications((current) => 
      (current || []).map(n => ({ ...n, read: true }))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.listingId) {
      onNavigate('listing', { id: notification.listingId })
      setIsOpen(false)
    }
  }

  const getIcon = (type: NotificationType) => {
    const iconProps = { size: 20, weight: 'fill' as const }
    switch (type) {
      case 'bid_outbid':
      case 'bid_won':
        return <Gavel {...iconProps} className="text-accent" />
      case 'message':
        return <ChatCircle {...iconProps} className="text-blue-500" />
      case 'favorite':
        return <Heart {...iconProps} className="text-red-500" />
      case 'price_drop':
        return <TrendUp {...iconProps} className="text-green-500" />
      case 'listing_sold':
        return <Car {...iconProps} className="text-purple-500" />
      case 'test_drive_approved':
        return <CheckCircle {...iconProps} className="text-green-500" />
      default:
        return <Bell {...iconProps} />
    }
  }

  if (!userId) return null

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} weight={unreadCount > 0 ? 'fill' : 'regular'} />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">Notifications</div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button 
                onClick={markAllAsRead}
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
              >
                <Check className="mr-1" size={14} />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          {!notifications || notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell size={48} className="mx-auto mb-4 opacity-50" />
              <div className="text-sm">No notifications yet</div>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification, idx) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleNotificationClick(notification)}
                  className={`
                    p-4 cursor-pointer transition-colors hover:bg-accent/5
                    ${!notification.read ? 'bg-accent/10' : ''}
                  `}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-sm">{notification.title}</div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {notification.message}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications && notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button 
                onClick={clearAll}
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
              >
                Clear All Notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

export function addNotification(
  userId: string,
  notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
) {
  const newNotification: Notification = {
    ...notification,
    id: `notif-${Date.now()}`,
    timestamp: new Date().toISOString(),
    read: false
  }
  
  return newNotification
}
