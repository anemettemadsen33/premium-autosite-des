import { CategorySelectorForm } from '@/components/CategorySelectorForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Book, Code } from '@phosphor-icons/react'

interface CategoryDemoPageProps {
  onNavigate: (page: string) => void
}

export function CategoryDemoPage({ onNavigate }: CategoryDemoPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="bg-gradient-to-r from-primary via-accent to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Category System Demo</h1>
          <p className="text-white/90 text-lg">
            Interactive demonstration of mobile.de compatible vehicle categorization
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Code size={20} weight="duotone" className="text-accent" />
                </div>
                <CardTitle className="text-lg">10 Main Categories</CardTitle>
              </div>
              <CardDescription>
                Official mobile.de classification codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Car</Badge>
                <Badge variant="secondary">Motorbike</Badge>
                <Badge variant="secondary">Van ≤7.5t</Badge>
                <Badge variant="secondary">Truck &gt;7.5t</Badge>
                <Badge variant="secondary">Construction</Badge>
                <Badge variant="secondary">Agricultural</Badge>
                <Badge variant="secondary">Trailer</Badge>
                <Badge variant="secondary">Caravan</Badge>
                <Badge variant="secondary">Semi-Trailer</Badge>
                <Badge variant="secondary">Parts</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Book size={20} weight="duotone" className="text-accent" />
                </div>
                <CardTitle className="text-lg">100+ Sub-Categories</CardTitle>
              </div>
              <CardDescription>
                Detailed classification for each type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Car: Cabrio, SUV, Sedan, Coupe...</li>
                <li>• Motorbike: Touring, Sport, Chopper...</li>
                <li>• Construction: Excavator, Loader...</li>
                <li>• And 90+ more specialized types</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                    Validated
                  </Badge>
                </div>
                <CardTitle className="text-lg">Smart Validation</CardTitle>
              </div>
              <CardDescription>
                Zod schema ensures data integrity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>✓ Sub-category belongs to main category</li>
                <li>✓ Required field validation</li>
                <li>✓ Type-safe TypeScript code</li>
                <li>✓ Real-time error feedback</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <CategorySelectorForm onNavigate={onNavigate} />

        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Dependent dropdown behavior with automatic validation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-accent/10">1</Badge>
                  Select Main Category
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose from 10 main vehicle categories (Car, Motorbike, Truck, etc.)
                </p>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-accent/10">2</Badge>
                  Sub-Categories Load
                </div>
                <p className="text-sm text-muted-foreground">
                  Dropdown automatically populates with relevant sub-categories for your selection
                </p>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-accent/10">3</Badge>
                  Validation Ensures Accuracy
                </div>
                <p className="text-sm text-muted-foreground">
                  Form validates that sub-category matches main category before submission
                </p>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mt-6">
              <p className="text-sm font-medium mb-2">Key Features:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Automatic Reset:</strong> Changing main category clears sub-category selection</li>
                <li>• <strong>Disabled State:</strong> Sub-category dropdown disabled until main category selected</li>
                <li>• <strong>Persistent Storage:</strong> Selections can be saved using useKV hook</li>
                <li>• <strong>Mobile.de Compatible:</strong> Uses official category codes for export/integration</li>
                <li>• <strong>Bilingual:</strong> English and German labels for all categories</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
