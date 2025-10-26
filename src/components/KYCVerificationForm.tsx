import { useState } from 'react'
import { IdentificationCard, Camera, Check, Warning, Upload, X } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import type { KYCVerification, KYCStatus } from '@/lib/types'

interface KYCVerificationFormProps {
  onComplete: (verification: Partial<KYCVerification>) => void
  onCancel?: () => void
}

export function KYCVerificationForm({ onComplete, onCancel }: KYCVerificationFormProps) {
  const [step, setStep] = useState(1)
  const [documentType, setDocumentType] = useState<'passport' | 'id-card' | 'drivers-license'>('id-card')
  const [documentImages, setDocumentImages] = useState<string[]>([])
  const [selfieImage, setSelfieImage] = useState<string>('')

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const urls = files.map(file => URL.createObjectURL(file))
      setDocumentImages(urls)
      toast.success('Document încărcat cu succes')
    }
  }

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelfieImage(URL.createObjectURL(file))
      toast.success('Selfie încărcat cu succes')
    }
  }

  const handleSubmit = () => {
    const verification: Partial<KYCVerification> = {
      status: 'pending',
      documentType,
      documentImages,
      selfieImage,
      submittedAt: new Date().toISOString()
    }
    
    onComplete(verification)
    toast.success('Verificare trimisă! Vei primi un răspuns în 24-48 ore.')
  }

  const progressPercent = (step / 3) * 100

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Verificare Identitate (KYC)</h2>
        <p className="text-muted-foreground">
          Acest proces este necesar pentru a deveni dealer verificat
        </p>
        <Progress value={progressPercent} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Pasul {step}/3</span>
          <span>{Math.round(progressPercent)}% complet</span>
        </div>
      </div>

      {step === 1 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
            <IdentificationCard className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-blue-900 dark:text-blue-100">Selectează tip document</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Vei avea nevoie de un document de identitate valid și o fotografie selfie
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Tip Document</Label>
            <Select value={documentType} onValueChange={(v: any) => setDocumentType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id-card">Carte de Identitate</SelectItem>
                <SelectItem value="passport">Pașaport</SelectItem>
                <SelectItem value="drivers-license">Permis de Conducere</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-2 pt-4">
              <h4 className="font-medium">Cerințe document:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Document valid, neexpirat
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Fotografie clară, toate detaliile vizibile
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Format: JPG, PNG (max 5MB)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Fără reflexii sau umbre puternice
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Încarcă Document {documentType === 'id-card' ? '(față și spate)' : ''}</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple={documentType === 'id-card'}
                  onChange={handleDocumentUpload}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors bg-muted/30"
                >
                  {documentImages.length > 0 ? (
                    <div className="flex gap-2 p-4">
                      {documentImages.map((img, idx) => (
                        <img key={idx} src={img} alt={`Document ${idx + 1}`} className="h-32 rounded object-cover" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Click pentru încărcare</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {documentType === 'id-card' ? 'Încarcă 2 imagini (față și spate)' : 'Încarcă 1 imagine'}
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {documentImages.length > 0 && documentImages.length < 2 && documentType === 'id-card' && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100 rounded-lg">
                <Warning className="w-5 h-5" />
                <p className="text-sm">Te rugăm încarcă și partea din spate a documentului</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Fotografie Selfie</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Ține documentul lângă față pentru verificare
              </p>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleSelfieUpload}
                className="hidden"
                id="selfie-upload"
              />
              <label
                htmlFor="selfie-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors bg-muted/30"
              >
                {selfieImage ? (
                  <img src={selfieImage} alt="Selfie" className="h-56 rounded object-cover" />
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click pentru a face selfie</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Asigură-te că fața și documentul sunt clare
                    </p>
                  </>
                )}
              </label>
            </div>

            <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Sfaturi pentru selfie:</h4>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Iluminare bună, naturală
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Fără ochelari de soare sau accesorii
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Documentul vizibil lângă față
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <div>
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Înapoi
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Anulează
            </Button>
          )}
          {step < 3 ? (
            <Button 
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !documentType) ||
                (step === 2 && (documentType === 'id-card' ? documentImages.length < 2 : documentImages.length < 1))
              }
            >
              Următorul
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!selfieImage}
            >
              <Check className="w-4 h-4 mr-2" />
              Trimite pentru Verificare
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

interface KYCStatusBadgeProps {
  status: KYCStatus
  className?: string
}

export function KYCStatusBadge({ status, className }: KYCStatusBadgeProps) {
  const config = {
    unverified: { label: 'Neverificat', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    pending: { label: 'În Așteptare', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
    'in-progress': { label: 'În Verificare', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
    verified: { label: '✓ Verificat', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
    rejected: { label: 'Respins', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' }
  }

  const { label, color } = config[status]

  return (
    <Badge className={`${color} ${className}`}>
      {label}
    </Badge>
  )
}
