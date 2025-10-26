import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { 
  ChatCircleDots, 
  X, 
  PaperPlaneTilt, 
  Robot,
  User,
  Sparkle,
  Minus
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type Message = {
  id: string
  text: string
  sender: 'user' | 'support' | 'ai'
  timestamp: number
  agentName?: string
  agentAvatar?: string
}

type ChatStatus = 'closed' | 'minimized' | 'open'

export function LiveChatSupport() {
  const [chatStatus, setChatStatus] = useState<ChatStatus>('closed')
  const [messages, setMessages] = useKV<Message[]>('chat-history', [])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: Date.now()
    }

    setMessages((prev) => [...(prev || []), userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(async () => {
      try {
        const promptText = `You are a helpful automotive marketplace support assistant. A customer asked: "${text}". 
        
        Provide a helpful, friendly, and concise response. If it's about:
        - Listings: Guide them on how to search, filter, or create listings
        - Account: Help with login, registration, profile management
        - Purchases: Explain the buying process, financing options
        - Technical: Offer troubleshooting or direct to support
        - Auctions: Explain how bidding works
        - General: Provide relevant information
        
        Keep response under 100 words and conversational.`
        
        const response = await window.spark.llm(promptText, 'gpt-4o-mini')
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'ai',
          timestamp: Date.now(),
          agentName: 'AI Assistant',
          agentAvatar: undefined
        }

        setMessages((prev) => [...(prev || []), aiMessage])
        setIsTyping(false)

        if (chatStatus !== 'open') {
          setUnreadCount((prev) => prev + 1)
        }
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble connecting right now. Please try again or contact support@autosite.com",
          sender: 'ai',
          timestamp: Date.now(),
          agentName: 'AI Assistant'
        }
        setMessages((prev) => [...(prev || []), errorMessage])
        setIsTyping(false)
      }
    }, 1000 + Math.random() * 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const openChat = () => {
    setChatStatus('open')
    setUnreadCount(0)
  }

  const closeChat = () => {
    setChatStatus('closed')
  }

  const minimizeChat = () => {
    setChatStatus('minimized')
  }

  const quickActions = [
    "How do I buy a car?",
    "Tell me about auctions",
    "Help with my listing",
    "Contact support"
  ]

  return (
    <>
      <AnimatePresence>
        {chatStatus === 'open' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[90vw] max-w-[400px]"
          >
            <Card className="overflow-hidden shadow-2xl border-2">
              <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarFallback className="bg-white/20">
                          <Robot weight="duotone" className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      {isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Live Support</h3>
                      <p className="text-xs text-white/80">
                        {isOnline ? 'Online • Avg response 30s' : 'Offline • Will respond soon'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={minimizeChat}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={closeChat}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkle className="h-4 w-4 text-accent" weight="fill" />
                  <span>Powered by AI • Instant responses</span>
                </div>
              </div>

              <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
                {!messages || messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                      <ChatCircleDots className="h-8 w-8 text-accent" weight="duotone" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Welcome to AUTOSITE Support</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      How can we help you today?
                    </p>
                    <div className="space-y-2">
                      {quickActions.map((action) => (
                        <Button
                          key={action}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => sendMessage(action)}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages?.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                        )}
                      >
                        <Avatar className="h-8 w-8 shrink-0">
                          {message.sender === 'user' ? (
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <User weight="fill" className="h-4 w-4" />
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback className="bg-accent/20 text-accent">
                              <Robot weight="duotone" className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className={cn(
                          "flex-1 space-y-1",
                          message.sender === 'user' ? 'items-end' : 'items-start'
                        )}>
                          <div className={cn(
                            "inline-block rounded-2xl px-4 py-2 max-w-[85%]",
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground rounded-br-sm'
                              : 'bg-muted text-foreground rounded-bl-sm'
                          )}>
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          </div>
                          <p className="text-xs text-muted-foreground px-2">
                            {new Date(message.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-accent/20 text-accent">
                            <Robot weight="duotone" className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              <div className="border-t p-4 bg-background">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                    className="shrink-0"
                  >
                    <PaperPlaneTilt className="h-4 w-4" weight="fill" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}

        {chatStatus === 'minimized' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:right-6 z-50"
          >
            <Button
              onClick={openChat}
              className="shadow-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <ChatCircleDots className="h-5 w-5 mr-2" weight="duotone" />
              Continue Chat
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chatStatus === 'closed' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-4 md:right-6 z-50"
          >
            <Button
              onClick={openChat}
              size="icon"
              className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 relative"
            >
              <ChatCircleDots className="h-6 w-6" weight="duotone" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
