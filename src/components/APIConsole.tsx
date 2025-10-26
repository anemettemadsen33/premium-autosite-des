import { useState } from 'react'
import { Code, Copy, Key, Trash, Plus, Play, Check, X } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import type { APIKey } from '@/lib/types'

const API_ENDPOINTS = [
  {
    category: 'Listings',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/listings',
        description: 'Obține toate anunțurile',
        params: ['page', 'limit', 'category', 'status']
      },
      {
        method: 'GET',
        path: '/api/v1/listings/:id',
        description: 'Obține un anunț specific',
        params: ['id']
      },
      {
        method: 'POST',
        path: '/api/v1/listings',
        description: 'Creează un anunț nou',
        body: { title: 'string', price: 'number', category: 'string' }
      },
      {
        method: 'PUT',
        path: '/api/v1/listings/:id',
        description: 'Actualizează un anunț',
        params: ['id'],
        body: { title: 'string', price: 'number' }
      },
      {
        method: 'DELETE',
        path: '/api/v1/listings/:id',
        description: 'Șterge un anunț',
        params: ['id']
      }
    ]
  },
  {
    category: 'Analytics',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/analytics/stats',
        description: 'Obține statistici generale',
        params: ['from', 'to']
      },
      {
        method: 'GET',
        path: '/api/v1/analytics/listing/:id',
        description: 'Obține statistici pentru un anunț',
        params: ['id', 'period']
      }
    ]
  }
]

interface APIConsoleProps {
  apiKeys: APIKey[]
  onCreateKey: (name: string, permissions: string[]) => void
  onDeleteKey: (keyId: string) => void
}

export function APIConsole({ apiKeys, onCreateKey, onDeleteKey }: APIConsoleProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null)
  const [testResponse, setTestResponse] = useState<string>('')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiat în clipboard')
  }

  const testEndpoint = () => {
    const mockResponse = {
      success: true,
      data: {
        id: '123',
        title: 'BMW Seria 3',
        price: 25000,
        category: 'cars'
      },
      timestamp: new Date().toISOString()
    }
    setTestResponse(JSON.stringify(mockResponse, null, 2))
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4 bg-gray-950 text-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">API Console</h2>
          </div>
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            Developer Tools
          </Badge>
        </div>

        <Tabs defaultValue="keys" className="w-full">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
          </TabsList>

          <TabsContent value="keys" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Gestionează cheile tale de API</p>
              <CreateAPIKeyDialog onCreate={onCreateKey} />
            </div>

            <div className="space-y-3">
              {apiKeys.map((key) => (
                <Card key={key.id} className="p-4 bg-gray-900 border-gray-800">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-100">{key.name}</h4>
                        <Badge
                          variant={key.active ? 'default' : 'secondary'}
                          className={key.active ? 'bg-green-500/20 text-green-400' : ''}
                        >
                          {key.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-800 px-3 py-1 rounded font-mono text-gray-300">
                          {key.key}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(key.key)}
                          className="h-8 w-8"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {key.permissions.map((perm) => (
                          <Badge key={perm} variant="outline" className="text-xs border-gray-700 text-gray-400">
                            {perm}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-xs text-gray-500">
                        Creat: {new Date(key.createdAt).toLocaleDateString('ro-RO')}
                        {key.lastUsed && ` • Ultima utilizare: ${new Date(key.lastUsed).toLocaleDateString('ro-RO')}`}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteKey(key.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}

              {apiKeys.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Key className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nicio cheie API creată</p>
                  <p className="text-sm">Creează prima cheie pentru a începe</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold text-blue-400 mb-2">Base URL</h3>
                <code className="text-sm font-mono text-gray-300">https://api.autosite.ro/v1</code>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h3 className="font-semibold text-amber-400 mb-2">Authentication</h3>
                <p className="text-sm text-gray-300 mb-2">Include API key în header:</p>
                <code className="text-xs font-mono bg-gray-900 px-3 py-2 rounded block text-gray-300">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {API_ENDPOINTS.map((category, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`category-${idx}`}
                    className="bg-gray-900 border-gray-800 rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 hover:bg-gray-800">
                      <span className="font-semibold text-gray-100">{category.category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-3">
                      {category.endpoints.map((endpoint, endIdx) => (
                        <div key={endIdx} className="p-3 bg-gray-800/50 rounded border border-gray-700">
                          <div className="flex items-start gap-3 mb-2">
                            <Badge
                              variant="outline"
                              className={`${
                                endpoint.method === 'GET'
                                  ? 'border-green-500 text-green-400'
                                  : endpoint.method === 'POST'
                                  ? 'border-blue-500 text-blue-400'
                                  : endpoint.method === 'PUT'
                                  ? 'border-amber-500 text-amber-400'
                                  : 'border-red-500 text-red-400'
                              }`}
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono text-gray-300 flex-1">
                              {endpoint.path}
                            </code>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{endpoint.description}</p>

                          {endpoint.params && endpoint.params.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-1">Parameters:</p>
                              <div className="flex gap-2 flex-wrap">
                                {endpoint.params.map((param) => (
                                  <code key={param} className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400">
                                    {param}
                                  </code>
                                ))}
                              </div>
                            </div>
                          )}

                          {endpoint.body && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-1">Request Body:</p>
                              <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto text-gray-300">
                                {JSON.stringify(endpoint.body, null, 2)}
                              </pre>
                            </div>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 border-gray-700 text-gray-300"
                            onClick={() => setSelectedEndpoint(endpoint)}
                          >
                            Try it
                          </Button>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="playground" className="space-y-4">
            {selectedEndpoint ? (
              <div className="space-y-4">
                <Card className="p-4 bg-gray-900 border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      className={`${
                        selectedEndpoint.method === 'GET'
                          ? 'bg-green-500'
                          : selectedEndpoint.method === 'POST'
                          ? 'bg-blue-500'
                          : selectedEndpoint.method === 'PUT'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {selectedEndpoint.method}
                    </Badge>
                    <code className="text-sm font-mono text-gray-300">
                      {selectedEndpoint.path}
                    </code>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400">API Key</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-300">
                          <SelectValue placeholder="Selectează API key" />
                        </SelectTrigger>
                        <SelectContent>
                          {apiKeys.map((key) => (
                            <SelectItem key={key.id} value={key.id}>
                              {key.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedEndpoint.body && (
                      <div>
                        <Label className="text-gray-400">Request Body</Label>
                        <textarea
                          className="w-full h-32 bg-gray-800 border border-gray-700 rounded p-3 font-mono text-sm text-gray-300"
                          defaultValue={JSON.stringify(selectedEndpoint.body, null, 2)}
                        />
                      </div>
                    )}

                    <Button onClick={testEndpoint} className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Send Request
                    </Button>
                  </div>
                </Card>

                {testResponse && (
                  <Card className="p-4 bg-gray-900 border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-100">Response</h4>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">200 OK</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(testResponse)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <pre className="bg-gray-950 p-4 rounded overflow-x-auto text-sm text-gray-300 font-mono">
                      {testResponse}
                    </pre>
                  </Card>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Selectează un endpoint din Documentation pentru a testa</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

function CreateAPIKeyDialog({ onCreate }: { onCreate: (name: string, permissions: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [permissions, setPermissions] = useState<string[]>(['read:listings'])

  const availablePermissions = [
    'read:listings',
    'write:listings',
    'delete:listings',
    'read:analytics',
    'read:messages',
    'write:messages'
  ]

  const handleCreate = () => {
    if (!keyName.trim()) {
      toast.error('Introdu un nume pentru cheie')
      return
    }
    
    onCreate(keyName, permissions)
    setKeyName('')
    setPermissions(['read:listings'])
    setIsOpen(false)
    toast.success('API Key creat cu succes')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Crează API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Crează API Key Nou</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nume Cheie</Label>
            <Input
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="ex: Production API"
              className="bg-gray-800 border-gray-700 text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label>Permisiuni</Label>
            <div className="space-y-2">
              {availablePermissions.map((perm) => (
                <div key={perm} className="flex items-center gap-2">
                  <Checkbox
                    id={perm}
                    checked={permissions.includes(perm)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPermissions([...permissions, perm])
                      } else {
                        setPermissions(permissions.filter((p) => p !== perm))
                      }
                    }}
                  />
                  <label htmlFor={perm} className="text-sm text-gray-300">
                    {perm}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleCreate} className="w-full">
            <Key className="w-4 h-4 mr-2" />
            Crează Cheie
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
