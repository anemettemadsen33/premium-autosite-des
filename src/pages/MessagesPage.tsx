import { Card, CardContent } from '@/components/ui/card'
import { ChatCircle } from '@phosphor-icons/react'

interface MessagesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function MessagesPage({ onNavigate }: MessagesPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-primary-foreground/80">Communicate with buyers and sellers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <Card className="p-12 text-center">
          <ChatCircle size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">No messages yet</h2>
          <p className="text-muted-foreground">
            Messages from buyers and sellers will appear here
          </p>
        </Card>
      </div>
    </div>
  )
}
