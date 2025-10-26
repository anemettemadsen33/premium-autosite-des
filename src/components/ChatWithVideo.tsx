import { useState } from 'react'
import { PaperPlaneRight, VideoCamera, Phone, Image as ImageIcon, Paperclip, DotsThree } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import type { ChatMessage, VideoPreview } from '@/lib/types'

interface ChatInterfaceProps {
  conversationId: string
  messages: ChatMessage[]
  otherUser: {
    id: string
    name: string
    avatar?: string
    isOnline?: boolean
  }
  onSendMessage: (content: string, type: ChatMessage['type']) => void
  onRequestVideo?: () => void
}

export function ChatInterface({ conversationId, messages, otherUser, onSendMessage, onRequestVideo }: ChatInterfaceProps) {
  const [messageText, setMessageText] = useState('')

  const handleSend = () => {
    if (!messageText.trim()) return
    onSendMessage(messageText, 'text')
    setMessageText('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarImage src={otherUser.avatar} />
              <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {otherUser.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{otherUser.name}</h3>
            <p className="text-xs text-muted-foreground">
              {otherUser.isOnline ? '🟢 Online' : 'Offline'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {onRequestVideo && otherUser.isOnline && (
            <Button variant="outline" size="sm" onClick={onRequestVideo}>
              <VideoCamera className="w-4 h-4" />
            </Button>
          )}
          <Button variant="outline" size="sm">
            <DotsThree className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => {
          const isSent = message.senderId !== otherUser.id
          
          return (
            <div
              key={message.id}
              className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${isSent ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    isSent
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.type === 'text' && (
                    <p className="text-sm break-words">{message.content}</p>
                  )}
                  {message.type === 'video-request' && (
                    <div className="flex items-center gap-2">
                      <VideoCamera className="w-4 h-4" />
                      <span className="text-sm">Solicitare video preview</span>
                    </div>
                  )}
                  {message.type === 'video-link' && (
                    <a
                      href={message.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 underline"
                    >
                      <VideoCamera className="w-4 h-4" />
                      <span className="text-sm">Intră în video call</span>
                    </a>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-2">
                  {new Date(message.timestamp).toLocaleTimeString('ro-RO', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  {isSent && message.read && ' · Citit'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Scrie un mesaj..."
            className="flex-1"
          />
          <Button onClick={handleSend}>
            <PaperPlaneRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

interface VideoPreviewButtonProps {
  listingId: string
  dealerName: string
  dealerIsOnline?: boolean
  onSchedule: (scheduledAt: string) => void
}

export function VideoPreviewButton({ listingId, dealerName, dealerIsOnline, onSchedule }: VideoPreviewButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Te rugăm selectează data și ora')
      return
    }
    
    const scheduledAt = `${selectedDate}T${selectedTime}`
    onSchedule(scheduledAt)
    setIsOpen(false)
    toast.success(`Video preview programat cu ${dealerName}`)
  }

  const handleInstantCall = () => {
    toast.success('Inițierea apelului video...')
    window.open(`/video-call/${listingId}`, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`relative ${dealerIsOnline ? 'animate-pulse' : ''}`}
        >
          <VideoCamera className="w-4 h-4 mr-2" />
          Video Preview
          {dealerIsOnline && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Video Preview cu {dealerName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {dealerIsOnline && (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="font-medium text-green-900 dark:text-green-100">
                  {dealerName} este online acum!
                </p>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                Poți iniția un video call instant pentru a vizualiza mașina
              </p>
              <Button onClick={handleInstantCall} className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Apel Video Instant
              </Button>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Sau programează un video call pentru mai târziu:
            </p>

            <div className="space-y-2">
              <Label>Data</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label>Ora</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Selectează ora" />
                </SelectTrigger>
                <SelectContent>
                  {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(hour => (
                    <SelectItem key={hour} value={`${hour}:00`}>
                      {hour}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSchedule} className="w-full" variant="secondary">
              Programează Video Call
            </Button>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 Video preview-ul durează aproximativ 5-10 minute. 
              Vei putea vedea mașina în detaliu și pune întrebări dealerului în timp real.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface VideoCallRoomProps {
  videoPreview: VideoPreview
  onEnd: () => void
}

export function VideoCallRoom({ videoPreview, onEnd }: VideoCallRoomProps) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <VideoCamera className="w-20 h-20 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Video call în curs...</p>
            <p className="text-sm opacity-75 mt-2">
              Durată rămasă: {videoPreview.duration} minute
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white">
          <div className="w-full h-full flex items-center justify-center text-white text-sm">
            Previzualizare locală
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-900 flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
          <VideoCamera className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
          <ImageIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full w-14 h-14"
          onClick={onEnd}
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
