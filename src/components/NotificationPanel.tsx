import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Bell,
  BellSlash,
  Check,
  CheckCircle,
  Fire,
  Gavel,
  Heart,
  Info,
  ShoppingCart,
  Sparkle,
  Trash,
  Warning,
  X
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type NotificationType = 'auction' | 'price-drop' | 'favorite' | 'message' | 'system' | 'alert' | 'success'

type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: number
  read: boolean
  actionLabel?: string
  actionUrl?: string
}

type NotificationPanelProps = {
  onNavigate?: (page: string, params?: Record<string, string>) => void
}

export function NotificationPanel({ onNavigate }: NotificationPanelProps) {
  const [notifications, setNotifications] = useKV<Notification[]>('user-notifications', [])
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications?.filter((n) => !n.read).length || 0

  useEffect(() => {
    const demoNotifications: Notification[] = [
      {
        id: '1',
        type: 'auction',
        title: 'Auction Ending Soon!',
        message: '2018 BMW M3 - Auction ends in 15 minutes',
        timestamp: Date.now() - 300000,
        read: false,
        actionLabel: 'View Auction'
      },
      {
        id: '2',
        type: 'price-drop',
        title: 'Price Drop Alert',
        message: 'Mercedes-Benz C-Class reduced by €5,000',
        timestamp: Date.now() - 3600000,
        read: false,
        actionLabel: 'View Deal'
      },
      {
        id: '3',
        type: 'favorite',
        title: 'Favorite Available',
        message: 'A vehicle on your watchlist is back in stock',
        timestamp: Date.now() - 7200000,
        read: true,
        actionLabel: 'View Listing'
      }
    ]

    if (!notifications || notifications.length === 0) {
      setNotifications(demoNotifications)
    }
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      (prev || []).map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => (prev || []).map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => (prev || []).filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'auction':
        return <Gavel className="h-5 w-5 text-orange-500" weight="duotone" />
      case 'price-drop':
        return <Fire className="h-5 w-5 text-red-500" weight="duotone" />
      case 'favorite':
        return <Heart className="h-5 w-5 text-pink-500" weight="duotone" />
      case 'message':
        return <Info className="h-5 w-5 text-blue-500" weight="duotone" />
      case 'alert':
        return <Warning className="h-5 w-5 text-yellow-500" weight="duotone" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" weight="duotone" />
      default:
        return <Sparkle className="h-5 w-5 text-accent" weight="duotone" />
    }
  }

  const filteredNotifications = notifications?.filter((n) =>
    filter === 'all' ? true : !n.read
  ) || []

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" weight="duotone" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} new</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Stay updated with your marketplace activity
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="flex-1"
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
              className="flex-1"
            >
              Unread
            </Button>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                All
              </Button>
            )}
          </div>

          {filteredNotifications.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </p>
              {filteredNotifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  <Trash className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          )}

          <ScrollArea className="h-[calc(100vh-250px)]">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <BellSlash className="h-8 w-8 text-muted-foreground" weight="duotone" />
                  </div>
                  <h4 className="font-semibold mb-2">No notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    {filter === 'unread' 
                      ? "You're all caught up!"
                      : "We'll notify you when something happens"}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={cn(
                          'p-4 cursor-pointer transition-all hover:shadow-md',
                          !notification.read && 'bg-accent/5 border-accent/20'
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className="shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-semibold text-sm">{notification.title}</h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-accent rounded-full shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              <div className="flex items-center gap-1">
                                {notification.actionLabel && (
                                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                                    {notification.actionLabel}
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notification.id)
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}
