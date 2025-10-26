import { useState } from 'react'
import { Sparkle, Tag, CheckCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

interface AutoTaggingProps {
  description: string
  onTagsGenerated: (tags: string[]) => void
  existingTags?: string[]
}

export function AutoTagging({ description, onTagsGenerated, existingTags = [] }: AutoTaggingProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [generatedTags, setGeneratedTags] = useState<string[]>(existingTags)

  const analyzeAndTag = async () => {
    if (!description || description.trim().length < 20) {
      toast.error('Please provide a detailed description (at least 20 characters)')
      return
    }

    setIsAnalyzing(true)

    try {
      const promptText = `Analyze this vehicle listing description and extract ALL mentioned features, equipment, and characteristics.

Description: "${description}"

Common vehicle features to look for (extract only if mentioned):
- Comfort: Climatronic, Climate Control, Heated Seats, Ventilated Seats, Massage Seats, Memory Seats, Power Seats, Leather Seats, Alcantara, Panoramic Roof, Sunroof
- Technology: Navigation, GPS, Apple CarPlay, Android Auto, Touchscreen, Digital Cockpit, Head-Up Display, Wireless Charging, Premium Sound, Harman Kardon, Bose, Bang & Olufsen
- Safety: ABS, ESP, Lane Assist, Adaptive Cruise Control, Blind Spot, Parking Sensors, Parking Camera, 360 Camera, Night Vision, Airbags
- Lighting: LED Headlights, Matrix LED, Laser Lights, Xenon, Adaptive Headlights, LED Taillights, Ambient Lighting
- Driving: 4x4, AWD, Quattro, xDrive, Sport Mode, Paddle Shifters, Air Suspension, Adaptive Dampers, Sport Suspension
- Exterior: Alloy Wheels, Chrome Package, Sport Package, Carbon Fiber, Tow Bar, Roof Rails, Electric Trunk
- Convenience: Keyless Entry, Start-Stop, Remote Start, Electric Windows, Electric Mirrors, Auto Wipers, Auto Lights

Return ONLY a JSON object with a single property "tags" containing an array of feature names found:
{
  "tags": ["Navigation", "LED Headlights", "Leather Seats", ...]
}

Be specific and only include features that are clearly mentioned or strongly implied in the description. Return feature names in English, properly capitalized.`

      const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
      const data = JSON.parse(response)
      
      if (data.tags && Array.isArray(data.tags) && data.tags.length > 0) {
        const uniqueTags = Array.from(new Set([...existingTags, ...data.tags]))
        setGeneratedTags(uniqueTags)
        onTagsGenerated(uniqueTags)
        toast.success(`Found ${data.tags.length} features in description`)
      } else {
        toast.info('No specific features detected in description')
      }
    } catch (error) {
      console.error('Auto-tagging error:', error)
      toast.error('Failed to analyze description. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updated = generatedTags.filter(tag => tag !== tagToRemove)
    setGeneratedTags(updated)
    onTagsGenerated(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkle className="text-accent" weight="fill" />
          AI Feature Detection
        </CardTitle>
        <CardDescription>
          Automatically detect and tag vehicle features from your description
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={analyzeAndTag} 
          disabled={isAnalyzing || !description}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Sparkle className="mr-2 animate-pulse" weight="fill" />
              Analyzing Description...
            </>
          ) : (
            <>
              <Tag className="mr-2" />
              Auto-Detect Features
            </>
          )}
        </Button>

        {generatedTags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle className="text-green-600" weight="fill" size={18} />
              Detected Features ({generatedTags.length})
            </div>

            <div className="flex flex-wrap gap-2">
              {generatedTags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="gap-1 pr-1 hover:bg-destructive/10 transition-colors cursor-pointer group"
                  onClick={() => removeTag(tag)}
                >
                  <Tag size={12} weight="fill" />
                  {tag}
                  <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    ×
                  </button>
                </Badge>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Click on any tag to remove it. These features will be highlighted in your listing.
            </p>
          </div>
        )}

        {!description && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Add a description above to enable AI feature detection
          </p>
        )}
      </CardContent>
    </Card>
  )
}
