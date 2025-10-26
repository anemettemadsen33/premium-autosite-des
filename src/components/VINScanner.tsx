import { useState } from 'react'
import { Upload, FileText, Sparkle, CheckCircle, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface ExtractedData {
  vin?: string
  make?: string
  model?: string
  year?: number
  engineSize?: string
  color?: string
  registrationNumber?: string
  firstRegistration?: string
  ownerName?: string
  mileage?: number
}

interface VINScannerProps {
  onDataExtracted: (data: ExtractedData) => void
}

export function VINScanner({ onDataExtracted }: VINScannerProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    await processImage(file)
  }

  const processImage = async (file: File) => {
    setIsProcessing(true)
    setProgress(0)

    try {
      const reader = new FileReader()
      
      reader.onload = async (e) => {
        const imageData = e.target?.result as string
        
        setProgress(25)
        await new Promise(resolve => setTimeout(resolve, 500))

        const promptText = `You are an expert at reading vehicle registration documents (car papers, title documents, registration certificates).

Analyze this image and extract ALL vehicle information you can find. Look for:
- VIN (Vehicle Identification Number) - typically 17 characters
- Make/Brand (manufacturer)
- Model
- Year
- Engine size/displacement
- Color
- Registration number/license plate
- First registration date
- Owner name
- Mileage/odometer reading

Return ONLY a JSON object with the fields you can extract. Use these exact field names:
{
  "vin": "string or null",
  "make": "string or null",
  "model": "string or null", 
  "year": number or null,
  "engineSize": "string or null",
  "color": "string or null",
  "registrationNumber": "string or null",
  "firstRegistration": "string or null",
  "ownerName": "string or null",
  "mileage": number or null
}

If you cannot find a field, set it to null. Be accurate and only extract what you can clearly read.

Image data: ${imageData.substring(0, 100000)}`

        setProgress(50)
        
        const response = await window.spark.llm(promptText, 'gpt-4o', true)
        
        setProgress(75)
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const data = JSON.parse(response) as ExtractedData
        
        const cleanedData: ExtractedData = {}
        Object.entries(data).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            cleanedData[key as keyof ExtractedData] = value
          }
        })

        setProgress(100)
        setExtractedData(cleanedData)
        
        toast.success(`Extracted ${Object.keys(cleanedData).length} fields from document`)
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error('OCR processing error:', error)
      toast.error('Failed to process image. Please try again.')
      setIsProcessing(false)
      setProgress(0)
    }
  }

  const handleApplyData = () => {
    if (extractedData) {
      onDataExtracted(extractedData)
      toast.success('Vehicle data applied to form')
    }
  }

  const handleReset = () => {
    setExtractedData(null)
    setPreviewUrl(null)
    setProgress(0)
    setIsProcessing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkle className="text-accent" weight="fill" />
          VIN & Document Scanner
        </CardTitle>
        <CardDescription>
          Upload a photo of your vehicle registration or title to auto-extract details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!previewUrl ? (
          <label className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isProcessing}
            />
            <Upload size={48} className="text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">Upload Vehicle Document</p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border">
              <img src={previewUrl} alt="Document preview" className="w-full h-auto" />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={handleReset}
              >
                <X />
              </Button>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing document...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {extractedData && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle weight="fill" />
                  <span className="font-medium">Extraction Complete</span>
                </div>

                <div className="grid gap-3">
                  {Object.entries(extractedData).map(([key, value]) => (
                    <div key={key} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="font-medium">{value}</p>
                      </div>
                      <Badge variant="secondary">
                        <FileText size={14} className="mr-1" />
                        Extracted
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleApplyData} className="flex-1">
                    <CheckCircle className="mr-2" />
                    Apply to Form
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Scan Another
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
