import { useState } from 'react'
import { FileCsv, Link as LinkIcon, Warning, ArrowRight, ArrowLeft, Check, Upload } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import type { ImportFeed } from '@/lib/types'

type FeedType = 'csv' | 'xml' | 'json' | 'url'

interface ImportFeedWizardProps {
  onComplete: (feed: Partial<ImportFeed>) => void
  onCancel: () => void
}

const REQUIRED_FIELDS = ['title', 'price', 'brand', 'model', 'year', 'category']
const OPTIONAL_FIELDS = ['description', 'mileage', 'fuelType', 'transmission', 'color', 'location', 'images']

export function ImportFeedWizard({ onComplete, onCancel }: ImportFeedWizardProps) {
  const [step, setStep] = useState(1)
  const [feedType, setFeedType] = useState<FeedType>('csv')
  const [feedUrl, setFeedUrl] = useState('')
  const [feedName, setFeedName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [detectedFields, setDetectedFields] = useState<string[]>([])
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({})
  const [previewData, setPreviewData] = useState<any[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      simulateFieldDetection(selectedFile)
    }
  }

  const simulateFieldDetection = (file: File) => {
    setTimeout(() => {
      const mockFields = ['Titlu', 'Pret', 'Marca', 'Model', 'An', 'Km', 'Combustibil', 'Categorie', 'Locatie', 'Imagine1']
      setDetectedFields(mockFields)
      
      const autoMapping: Record<string, string> = {
        'Titlu': 'title',
        'Pret': 'price',
        'Marca': 'brand',
        'Model': 'model',
        'An': 'year',
        'Km': 'mileage',
        'Combustibil': 'fuelType',
        'Categorie': 'category',
        'Locatie': 'location',
        'Imagine1': 'images'
      }
      setFieldMapping(autoMapping)
      
      const mockPreview = [
        { Titlu: 'BMW Seria 3 320d', Pret: '25000', Marca: 'BMW', Model: 'Seria 3', An: '2019', Km: '50000' },
        { Titlu: 'Audi A4 2.0 TDI', Pret: '22000', Marca: 'Audi', Model: 'A4', An: '2018', Km: '65000' },
        { Titlu: 'Mercedes C-Class 220', Pret: '28000', Marca: 'Mercedes', Model: 'C-Class', An: '2020', Km: '40000' }
      ]
      setPreviewData(mockPreview)
    }, 1000)
  }

  const handleUrlSubmit = () => {
    if (!feedUrl) {
      toast.error('Vă rugăm introduceți un URL valid')
      return
    }
    simulateFieldDetection(new File([], 'url-feed'))
  }

  const handleNext = () => {
    if (step === 1) {
      if (feedType === 'url' && !feedUrl) {
        toast.error('Vă rugăm introduceți un URL')
        return
      }
      if ((feedType === 'csv' || feedType === 'xml' || feedType === 'json') && !file) {
        toast.error('Vă rugăm încărcați un fișier')
        return
      }
      if (!feedName) {
        toast.error('Vă rugăm introduceți un nume pentru feed')
        return
      }
    }
    
    if (step === 2) {
      const missingRequired = REQUIRED_FIELDS.filter(field => 
        !Object.values(fieldMapping).includes(field)
      )
      if (missingRequired.length > 0) {
        toast.error(`Câmpuri obligatorii lipsă: ${missingRequired.join(', ')}`)
        return
      }
    }
    
    setStep(step + 1)
  }

  const handleComplete = () => {
    const feed: Partial<ImportFeed> = {
      name: feedName,
      type: feedType,
      source: feedType === 'url' ? feedUrl : file?.name || '',
      fieldMapping,
      schedule: 'manual',
      status: 'active'
    }
    
    onComplete(feed)
    toast.success(`Feed "${feedName}" creat cu succes! ${previewData.length} anunțuri importate.`)
  }

  const progressPercent = (step / 3) * 100

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Import Anunțuri</h2>
          <div className="text-sm text-muted-foreground">Pasul {step} din 3</div>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {step === 1 && (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nume Feed</Label>
              <Input 
                placeholder="ex: Import Stoc Principal"
                value={feedName}
                onChange={(e) => setFeedName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Tip Sursă</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { type: 'csv' as FeedType, label: 'CSV', icon: FileCsv },
                  { type: 'xml' as FeedType, label: 'XML', icon: FileCsv },
                  { type: 'json' as FeedType, label: 'JSON', icon: FileCsv },
                  { type: 'url' as FeedType, label: 'URL Feed', icon: LinkIcon }
                ].map(({ type, label, icon: Icon }) => (
                  <button
                    key={type}
                    onClick={() => setFeedType(type)}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                      feedType === type 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {feedType === 'url' ? (
              <div className="space-y-2">
                <Label>URL Feed</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="https://example.com/feed.xml"
                    value={feedUrl}
                    onChange={(e) => setFeedUrl(e.target.value)}
                  />
                  <Button onClick={handleUrlSubmit}>
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Conectare
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Încarcă Fișier</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
                  <input
                    type="file"
                    accept={feedType === 'csv' ? '.csv' : feedType === 'xml' ? '.xml' : '.json'}
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="font-medium mb-1">
                      {file ? file.name : 'Click pentru a încărca fișier'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Suportă {feedType.toUpperCase()} până la 10MB
                    </p>
                  </label>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
              <Warning className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-blue-900 dark:text-blue-100">Mapare Câmpuri</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Asociază câmpurile din fișierul tău cu câmpurile din platformă
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">Câmpuri Obligatorii</h3>
              {REQUIRED_FIELDS.map(field => (
                <div key={field} className="grid grid-cols-2 gap-4 items-center">
                  <Label className="capitalize">{field}</Label>
                  <Select 
                    value={Object.keys(fieldMapping).find(k => fieldMapping[k] === field)}
                    onValueChange={(value) => setFieldMapping({ ...fieldMapping, [value]: field })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează câmp..." />
                    </SelectTrigger>
                    <SelectContent>
                      {detectedFields.map(detectedField => (
                        <SelectItem key={detectedField} value={detectedField}>
                          {detectedField}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">Câmpuri Opționale</h3>
              {OPTIONAL_FIELDS.map(field => (
                <div key={field} className="grid grid-cols-2 gap-4 items-center">
                  <Label className="capitalize text-muted-foreground">{field}</Label>
                  <Select 
                    value={Object.keys(fieldMapping).find(k => fieldMapping[k] === field)}
                    onValueChange={(value) => setFieldMapping({ ...fieldMapping, [value]: field })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ignora" />
                    </SelectTrigger>
                    <SelectContent>
                      {detectedFields.map(detectedField => (
                        <SelectItem key={detectedField} value={detectedField}>
                          {detectedField}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-green-900 dark:text-green-100">Preview Anunțuri</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {previewData.length} anunțuri pregătite pentru import
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Primele 3 anunțuri:</h3>
              {previewData.map((item, idx) => (
                <Card key={idx} className="p-4 bg-muted/50">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    {Object.entries(item).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-muted-foreground">{key}:</span>{' '}
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Configurare:</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Nume:</span> {feedName}</p>
                <p><span className="text-muted-foreground">Tip:</span> {feedType.toUpperCase()}</p>
                <p><span className="text-muted-foreground">Câmpuri mapate:</span> {Object.keys(fieldMapping).length}</p>
                <p><span className="text-muted-foreground">Programare:</span> Manual</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <div>
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Anulează
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext}>
              Următorul
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              <Check className="w-4 h-4 mr-2" />
              Finalizează Import
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
