import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  ChartBar, 
  Palette, 
  Key, 
  Certificate, 
  Star,
  Trophy,
  CurrencyCircleDollar
} from '@phosphor-icons/react'
import { DealerKPIDashboard } from '@/components/DealerKPIDashboard'
import { ImportFeedWizard } from '@/components/ImportFeedWizard'
import { WhiteLabelCustomizer } from '@/components/WhiteLabelCustomizer'
import { APIConsole } from '@/components/APIConsole'
import { KYCVerificationForm, KYCStatusBadge } from '@/components/KYCVerificationForm'
import { GamificationDashboard } from '@/components/Gamification'
import { CurrencySelector, PriceCalculator } from '@/components/MultiCurrency'
import type { 
  DealerKPI, 
  ImportFeed, 
  DealerWhiteLabel, 
  APIKey, 
  KYCVerification,
  UserGamification 
} from '@/lib/types'
import { toast } from 'sonner'

interface DealerHubPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function DealerHubPage({ onNavigate }: DealerHubPageProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showImportWizard, setShowImportWizard] = useState(false)
  const [showKYCForm, setShowKYCForm] = useState(false)
  
  const [kycStatus, setKycStatus] = useKV<KYCVerification>('dealer-kyc', {
    userId: 'user-1',
    status: 'unverified'
  })

  const [importFeeds, setImportFeeds] = useKV<ImportFeed[]>('dealer-feeds', [])
  const [whiteLabelConfig, setWhiteLabelConfig] = useKV<DealerWhiteLabel>('dealer-whitelabel', {
    dealerId: 'dealer-1',
    primaryColor: '#ffffff',
    secondaryColor: '#f3f4f6',
    accentColor: '#6366f1',
    theme: 'light'
  })
  const [apiKeys, setApiKeys] = useKV<APIKey[]>('dealer-api-keys', [])
  const [gamification, setGamification] = useKV<UserGamification>('user-gamification', {
    userId: 'user-1',
    xp: 2500,
    level: 3,
    badges: ['verified-dealer', 'expert-poster'],
    missions: [
      {
        id: '1',
        type: 'daily',
        title: 'Publică 3 anunțuri noi',
        description: 'Adaugă 3 anunțuri noi astăzi pentru a câștiga XP bonus',
        xpReward: 100,
        progress: 1,
        target: 3,
        completed: false,
        expiresAt: new Date(Date.now() + 86400000).toISOString()
      },
      {
        id: '2',
        type: 'daily',
        title: 'Răspunde la 5 mesaje',
        description: 'Fii activ și răspunde clienților',
        xpReward: 50,
        progress: 5,
        target: 5,
        completed: true
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Primele 100 anunțuri',
        description: 'Publică 100 de anunțuri în total',
        xpReward: 500,
        progress: 87,
        target: 100,
        completed: false
      }
    ]
  })

  const mockKPI: DealerKPI = {
    dealerId: 'dealer-1',
    period: 'last-7-days',
    views: 12453,
    clicks: 3421,
    saves: 856,
    leads: 234,
    conversions: 42,
    revenue: 156000,
    topListings: [
      { listingId: 'L1', title: 'BMW Seria 3 320d', metric: 1234 },
      { listingId: 'L2', title: 'Audi A4 2.0 TDI', metric: 987 },
      { listingId: 'L3', title: 'Mercedes C-Class', metric: 856 }
    ]
  }

  const handleImportComplete = (feed: Partial<ImportFeed>) => {
    const newFeed: ImportFeed = {
      id: `feed-${Date.now()}`,
      userId: 'user-1',
      name: feed.name!,
      type: feed.type!,
      source: feed.source!,
      fieldMapping: feed.fieldMapping!,
      schedule: feed.schedule || 'manual',
      status: 'active',
      itemsImported: Math.floor(Math.random() * 100) + 50,
      createdAt: new Date().toISOString()
    }
    setImportFeeds((currentFeeds) => [...(currentFeeds || []), newFeed])
    setShowImportWizard(false)
  }

  const handleWhiteLabelSave = (config: DealerWhiteLabel) => {
    setWhiteLabelConfig(config)
    toast.success('Configurare salvată cu succes!')
  }

  const handleCreateAPIKey = (name: string, permissions: string[]) => {
    const newKey: APIKey = {
      id: `key-${Date.now()}`,
      userId: 'user-1',
      name,
      key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      permissions,
      createdAt: new Date().toISOString(),
      active: true
    }
    setApiKeys((currentKeys) => [...(currentKeys || []), newKey])
  }

  const handleDeleteAPIKey = (keyId: string) => {
    setApiKeys((currentKeys) => (currentKeys || []).filter(k => k.id !== keyId))
    toast.success('API Key șters')
  }

  const handleKYCComplete = (verification: Partial<KYCVerification>) => {
    setKycStatus({
      userId: kycStatus?.userId || 'user-1',
      status: verification.status || 'pending',
      documentType: verification.documentType,
      documentImages: verification.documentImages,
      selfieImage: verification.selfieImage,
      submittedAt: verification.submittedAt
    })
    setShowKYCForm(false)
  }

  const handleClaimMission = (missionId: string) => {
    setGamification((current) => {
      if (!current) return {
        userId: 'user-1',
        xp: 0,
        level: 1,
        badges: [],
        missions: []
      }
      return {
        ...current,
        xp: current.xp + (current.missions.find(m => m.id === missionId)?.xpReward || 0),
        missions: current.missions.map(m => 
          m.id === missionId ? { ...m, completed: false, progress: 0 } : m
        )
      }
    })
    toast.success('Misiune revendicată! +XP')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dealer Hub</h1>
              <p className="text-muted-foreground mt-1">Gestionează toate aspectele business-ului tău</p>
            </div>
            <div className="flex items-center gap-3">
              <CurrencySelector />
              <KYCStatusBadge status={kycStatus?.status || 'unverified'} />
              {kycStatus?.status === 'unverified' && (
                <Button onClick={() => setShowKYCForm(true)} variant="outline">
                  <Certificate className="w-4 h-4 mr-2" />
                  Verifică Cont
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {showKYCForm ? (
          <div className="max-w-3xl mx-auto">
            <KYCVerificationForm 
              onComplete={handleKYCComplete}
              onCancel={() => setShowKYCForm(false)}
            />
          </div>
        ) : showImportWizard ? (
          <div className="max-w-4xl mx-auto">
            <ImportFeedWizard
              onComplete={handleImportComplete}
              onCancel={() => setShowImportWizard(false)}
            />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">
                <ChartBar className="w-4 h-4 mr-2" />
                Dashboard KPI
              </TabsTrigger>
              <TabsTrigger value="import">
                <Upload className="w-4 h-4 mr-2" />
                Import Anunțuri
              </TabsTrigger>
              <TabsTrigger value="whitelabel">
                <Palette className="w-4 h-4 mr-2" />
                White Label
              </TabsTrigger>
              <TabsTrigger value="api">
                <Key className="w-4 h-4 mr-2" />
                API Console
              </TabsTrigger>
              <TabsTrigger value="gamification">
                <Trophy className="w-4 h-4 mr-2" />
                Progres & Misiuni
              </TabsTrigger>
              <TabsTrigger value="pricing">
                <CurrencyCircleDollar className="w-4 h-4 mr-2" />
                Calculator Preț
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <DealerKPIDashboard kpi={mockKPI} />
            </TabsContent>

            <TabsContent value="import">
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Feed-uri de Import</h2>
                      <p className="text-muted-foreground">Gestionează sursele de import automat</p>
                    </div>
                    <Button onClick={() => setShowImportWizard(true)}>
                      <Upload className="w-4 h-4 mr-2" />
                      Feed Nou
                    </Button>
                  </div>

                  {(importFeeds || []).length > 0 ? (
                    <div className="space-y-3">
                      {(importFeeds || []).map(feed => (
                        <Card key={feed.id} className="p-4 bg-muted/30">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{feed.name}</h3>
                                <Badge variant={feed.status === 'active' ? 'default' : 'secondary'}>
                                  {feed.status}
                                </Badge>
                                <Badge variant="outline">{feed.type.toUpperCase()}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{feed.source}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {feed.itemsImported} anunțuri importate • 
                                Programare: {feed.schedule === 'manual' ? 'Manual' : feed.schedule}
                                {feed.lastSync && ` • Ultima sync: ${new Date(feed.lastSync).toLocaleDateString('ro-RO')}`}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Configurare
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Upload className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Niciun feed de import configurat</p>
                      <p className="text-sm">Creează primul feed pentru a automatiza importul anunțurilor</p>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="whitelabel">
              <WhiteLabelCustomizer
                dealerConfig={whiteLabelConfig}
                onSave={handleWhiteLabelSave}
              />
            </TabsContent>

            <TabsContent value="api">
              <APIConsole
                apiKeys={apiKeys || []}
                onCreateKey={handleCreateAPIKey}
                onDeleteKey={handleDeleteAPIKey}
              />
            </TabsContent>

            <TabsContent value="gamification">
              {gamification && (
                <GamificationDashboard
                  gamification={gamification}
                  onClaimMission={handleClaimMission}
                />
              )}
            </TabsContent>

            <TabsContent value="pricing">
              <div className="max-w-2xl mx-auto">
                <PriceCalculator basePrice={25000} />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
