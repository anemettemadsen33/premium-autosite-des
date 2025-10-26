import { 
  Sparkle, 
  FilePdf, 
  VideoCamera, 
  Calculator, 
  ScanSmiley,
  Tag,
  TrendUp,
  FileText,
  CheckCircle
} from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AdvancedToolsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function AdvancedToolsPage({ onNavigate }: AdvancedToolsPageProps) {
  const tools = [
    {
      icon: ScanSmiley,
      title: 'VIN & Document Scanner',
      description: 'Upload photos of vehicle documents to automatically extract details like VIN, make, model, year, and more using AI-powered OCR',
      features: ['Auto-extract VIN', 'Read registration papers', 'Import vehicle specs', 'Save time on data entry'],
      color: 'from-blue-500 to-cyan-500',
      badge: 'AI Powered',
      action: () => onNavigate('add-listing')
    },
    {
      icon: FilePdf,
      title: 'PDF Listing Generator',
      description: 'Download any vehicle listing as a professional PDF with QR code, complete specifications, and images',
      features: ['Professional layout', 'QR code included', 'Print-ready format', 'Share via email'],
      color: 'from-red-500 to-orange-500',
      badge: 'Export',
      action: () => onNavigate('category', { category: 'cars' })
    },
    {
      icon: VideoCamera,
      title: 'Video Walkthroughs',
      description: 'Add video tours to your listings. Show potential buyers the real condition and features of your vehicle',
      features: ['Up to 50MB videos', 'Multiple formats', 'Preview before upload', 'Increase engagement'],
      color: 'from-purple-500 to-pink-500',
      badge: 'Media',
      action: () => onNavigate('add-listing')
    },
    {
      icon: Calculator,
      title: 'Smart Cost Calculator',
      description: 'Calculate total ownership costs including RCA insurance, road tax, registration fees, and environmental taxes for Romania',
      features: ['RCA estimates', 'Road tax calculator', 'Registration costs', '3-year projections'],
      color: 'from-green-500 to-emerald-500',
      badge: 'Financial',
      action: () => onNavigate('smart-calculator')
    },
    {
      icon: Tag,
      title: 'AI Feature Detection',
      description: 'Automatically detect and tag vehicle features from your description. AI identifies navigation, LED lights, leather seats, and more',
      features: ['Auto-tag features', 'From description', 'Increase visibility', 'Save time'],
      color: 'from-yellow-500 to-amber-500',
      badge: 'AI Powered',
      action: () => onNavigate('add-listing')
    },
    {
      icon: Sparkle,
      title: 'AI Price Prediction',
      description: 'Get AI-powered price predictions based on market data, vehicle condition, mileage, and comparable listings',
      features: ['Market analysis', 'Confidence scores', 'Price factors', 'Real-time data'],
      color: 'from-indigo-500 to-purple-500',
      badge: 'AI Powered',
      action: () => onNavigate('category', { category: 'cars' })
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Sparkle className="mr-1" weight="fill" size={16} />
            Advanced Features
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Premium AI-Powered Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take your automotive marketplace experience to the next level with our suite of intelligent tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 hover:border-accent/50"
                onClick={tool.action}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white`}>
                      <Icon size={32} weight="duotone" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tool.badge}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-accent transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0" weight="fill" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 group-hover:bg-accent transition-colors">
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-accent/10 to-purple-500/10 border-accent/30">
            <CardContent className="pt-6 text-center">
              <Sparkle size={48} className="mx-auto mb-4 text-accent" weight="fill" />
              <h3 className="font-bold text-2xl mb-2">6+</h3>
              <p className="text-sm text-muted-foreground">AI-Powered Tools</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <CardContent className="pt-6 text-center">
              <TrendUp size={48} className="mx-auto mb-4 text-blue-600" weight="duotone" />
              <h3 className="font-bold text-2xl mb-2">95%</h3>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardContent className="pt-6 text-center">
              <FileText size={48} className="mx-auto mb-4 text-green-600" weight="duotone" />
              <h3 className="font-bold text-2xl mb-2">100%</h3>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-accent/20 via-purple-500/20 to-blue-500/20 rounded-2xl border-2 border-accent/30 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to experience the future?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            All advanced tools are available now. Start creating better listings, making smarter decisions, 
            and closing deals faster.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('add-listing')}>
              <Sparkle className="mr-2" weight="fill" />
              Create Listing
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('category', { category: 'cars' })}>
              Browse Vehicles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
