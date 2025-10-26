import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WarningCircle } from '@phosphor-icons/react'

interface NotFoundPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center">
            <WarningCircle size={48} weight="duotone" className="text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('home')}
            className="gap-2 bg-gradient-to-r from-accent to-purple-600"
          >
            Go to Homepage
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
