import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Car, Users, Shield, TrendUp } from '@phosphor-icons/react'

interface AboutPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const features = [
    {
      icon: Car,
      title: 'Wide Selection',
      description: 'Browse thousands of vehicles from trusted sellers across all categories'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Connect with verified buyers and sellers in a safe, secure environment'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Trade with confidence using our protected platform and safety guidelines'
    },
    {
      icon: TrendUp,
      title: 'Best Prices',
      description: 'Find competitive prices and great deals on your next vehicle purchase'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About AUTOSITE</h1>
          <p className="text-xl text-primary-foreground/80">
            Your trusted marketplace for buying and selling vehicles
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            AUTOSITE is the premier online marketplace dedicated to connecting buyers and sellers of automobiles,
            motorcycles, trucks, RVs, and automotive parts. Founded with a mission to simplify the vehicle trading
            experience, we provide a secure, user-friendly platform where enthusiasts and dealers alike can find
            their perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card key={idx}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-purple-600 rounded-2xl flex items-center justify-center">
                    <Icon size={32} weight="duotone" className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-gradient-to-r from-accent/10 to-purple-600/10 border-accent/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied users who trust AUTOSITE for their vehicle trading needs
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-accent to-purple-600"
                onClick={() => onNavigate('register')}
              >
                Create Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('home')}
              >
                Browse Listings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
