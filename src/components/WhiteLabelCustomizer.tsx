import { useState } from 'react'
import { Palette, Upload, Eye, Code } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { DealerWhiteLabel } from '@/lib/types'

const PRESET_THEMES = [
  {
    name: 'Light',
    primaryColor: '#ffffff',
    secondaryColor: '#f3f4f6',
    accentColor: '#6366f1',
    theme: 'light' as const
  },
  {
    name: 'Dark',
    primaryColor: '#1f2937',
    secondaryColor: '#111827',
    accentColor: '#8b5cf6',
    theme: 'dark' as const
  },
  {
    name: 'Classic',
    primaryColor: '#f8fafc',
    secondaryColor: '#e2e8f0',
    accentColor: '#0f172a',
    theme: 'classic' as const
  },
  {
    name: 'Modern',
    primaryColor: '#fafafa',
    secondaryColor: '#f5f5f5',
    accentColor: '#3b82f6',
    theme: 'modern' as const
  }
]

interface WhiteLabelCustomizerProps {
  dealerConfig?: DealerWhiteLabel
  onSave: (config: DealerWhiteLabel) => void
}

export function WhiteLabelCustomizer({ dealerConfig, onSave }: WhiteLabelCustomizerProps) {
  const [config, setConfig] = useState<Partial<DealerWhiteLabel>>(
    dealerConfig || {
      primaryColor: '#ffffff',
      secondaryColor: '#f3f4f6',
      accentColor: '#6366f1',
      theme: 'light',
      headline: 'Bine ai venit',
      tagline: 'Găsește mașina perfectă pentru tine'
    }
  )

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setConfig({ ...config, logo: url })
    }
  }

  const applyPreset = (preset: typeof PRESET_THEMES[0]) => {
    setConfig({
      ...config,
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      accentColor: preset.accentColor,
      theme: preset.theme
    })
  }

  const handleSave = () => {
    onSave(config as DealerWhiteLabel)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-bold">Personalizare Pagină</h3>
          </div>

          <Tabs defaultValue="brand">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="brand">Brand</TabsTrigger>
              <TabsTrigger value="colors">Culori</TabsTrigger>
              <TabsTrigger value="advanced">Avansat</TabsTrigger>
            </TabsList>

            <TabsContent value="brand" className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex gap-2">
                  {config.logo && (
                    <div className="w-20 h-20 rounded border flex items-center justify-center bg-muted">
                      <img src={config.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Încarcă Logo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Headline</Label>
                <Input
                  value={config.headline || ''}
                  onChange={(e) => setConfig({ ...config, headline: e.target.value })}
                  placeholder="ex: Bine ai venit la Dealer Auto Premium"
                />
              </div>

              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input
                  value={config.tagline || ''}
                  onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                  placeholder="ex: Mașini de calitate, prețuri accesibile"
                />
              </div>

              <div className="space-y-2">
                <Label>Domeniu Custom (opțional)</Label>
                <Input
                  value={config.customDomain || ''}
                  onChange={(e) => setConfig({ ...config, customDomain: e.target.value })}
                  placeholder="ex: auto.dealermeu.ro"
                />
                <p className="text-xs text-muted-foreground">
                  Configurează DNS-ul domeniului să pointeze către platforma noastră
                </p>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Template Prestabilite</h4>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_THEMES.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="p-3 border-2 rounded-lg hover:border-accent transition-colors text-left"
                    >
                      <div className="flex gap-2 mb-2">
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.primaryColor }} />
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.secondaryColor }} />
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.accentColor }} />
                      </div>
                      <p className="font-medium text-sm">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Culori Personalizate</h4>
                
                <div className="space-y-2">
                  <Label>Culoare Primară</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Culoare Secundară</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      placeholder="#f3f4f6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Culoare Accent</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      placeholder="#6366f1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-2">
                <Label>CSS Personalizat</Label>
                <Textarea
                  value={config.customCSS || ''}
                  onChange={(e) => setConfig({ ...config, customCSS: e.target.value })}
                  placeholder=".my-class { color: red; }"
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Adaugă stiluri CSS personalizate pentru a personaliza în detaliu pagina ta
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          <Button onClick={handleSave} className="w-full">
            Salvează Modificări
          </Button>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="sticky top-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-bold">Live Preview</h3>
            </div>

            <div 
              className="border-2 rounded-lg overflow-hidden"
              style={{
                backgroundColor: config.primaryColor,
                borderColor: config.accentColor
              }}
            >
              <div 
                className="p-6 text-center"
                style={{ backgroundColor: config.secondaryColor }}
              >
                {config.logo && (
                  <img src={config.logo} alt="Logo" className="h-12 mx-auto mb-4" />
                )}
                <h1 className="text-2xl font-bold mb-2" style={{ color: config.accentColor }}>
                  {config.headline || 'Headline'}
                </h1>
                <p className="text-sm opacity-75">
                  {config.tagline || 'Tagline'}
                </p>
              </div>

              <div className="p-6 space-y-4" style={{ backgroundColor: config.primaryColor }}>
                <div className="grid grid-cols-2 gap-2">
                  <div 
                    className="h-24 rounded" 
                    style={{ backgroundColor: config.secondaryColor }}
                  />
                  <div 
                    className="h-24 rounded" 
                    style={{ backgroundColor: config.secondaryColor }}
                  />
                </div>

                <button 
                  className="w-full py-2 px-4 rounded font-semibold"
                  style={{ 
                    backgroundColor: config.accentColor,
                    color: '#ffffff'
                  }}
                >
                  Call to Action
                </button>

                <div className="text-xs opacity-50 text-center">
                  Preview aproximativ al paginii tale personalizate
                </div>
              </div>
            </div>

            {config.customDomain && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Domeniu Custom
                </p>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-600" />
                  <code className="text-xs text-blue-700 dark:text-blue-300">
                    {config.customDomain}
                  </code>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
