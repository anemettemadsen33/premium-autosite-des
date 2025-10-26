import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  FileText, 
  CheckCircle, 
  Warning, 
  X, 
  Wrench,
  Gauge,
  ShieldCheck
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { VehicleHistoryReport, Listing } from '@/lib/types'

interface VehicleHistoryReportProps {
  listing: Listing
}

export function VehicleHistoryReport({ listing }: VehicleHistoryReportProps) {
  const [report, setReport] = useState<VehicleHistoryReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)

  const generateReport = async () => {
    setIsLoading(true)
    
    const promptText = `Generate a realistic vehicle history report for this vehicle:
- ${listing.brand} ${listing.model} ${listing.year}
- Current Mileage: ${listing.mileage} km
- Condition: ${listing.condition}

Create a comprehensive JSON report with:
{
  "accidents": [{"date": "YYYY-MM-DD", "severity": "minor|moderate|severe", "damage": "description", "repaired": true}],
  "owners": number (1-5),
  "serviceMaintenance": [
    {"date": "YYYY-MM-DD", "mileage": number, "type": "Oil Change|Brake Service|etc", "facility": "name"}
  ],
  "titleStatus": "clean|salvage|rebuilt|lemon",
  "odometer": [
    {"date": "YYYY-MM-DD", "mileage": number, "source": "Service Record|Registration|Inspection"}
  ],
  "recalls": [{"date": "YYYY-MM-DD", "component": "part", "description": "issue", "repaired": boolean}],
  "theftRecord": false,
  "floodDamage": false,
  "frameDamage": false,
  "airbagDeployment": false
}

Make it realistic - most vehicles should have clean titles, 1-2 owners, regular maintenance, and few/no major issues.`

    try {
      const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
      const data = JSON.parse(response)
      
      const fullReport: VehicleHistoryReport = {
        listingId: listing.id,
        vin: `VIN${Math.random().toString(36).substring(2, 17).toUpperCase()}`,
        reportDate: new Date().toISOString(),
        ...data
      }
      
      setReport(fullReport)
      setIsPurchased(true)
    } catch (error) {
      console.error('Failed to generate report:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (hasIssue: boolean) => {
    return hasIssue ? (
      <Warning className="text-destructive" weight="fill" size={20} />
    ) : (
      <CheckCircle className="text-green-500" weight="fill" size={20} />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-accent" weight="fill" />
          Vehicle History Report
        </CardTitle>
        <CardDescription>
          Comprehensive report including accidents, service records, and title status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isPurchased && !report && (
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-dashed border-accent/50 p-6 text-center space-y-3">
              <ShieldCheck size={48} className="mx-auto text-accent" weight="duotone" />
              <div>
                <div className="font-semibold">Get Full Vehicle History</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Access detailed accident history, service records, ownership info, and more
                </div>
              </div>
              <div className="flex items-baseline justify-center gap-2 mt-4">
                <span className="text-3xl font-bold">€29</span>
                <span className="text-muted-foreground">.99</span>
              </div>
              <Button 
                onClick={generateReport}
                disabled={isLoading}
                size="lg"
                className="w-full mt-4"
              >
                {isLoading ? 'Generating Report...' : 'Purchase Report'}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} weight="fill" />
                Accident History
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} weight="fill" />
                Service Records
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} weight="fill" />
                Ownership History
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} weight="fill" />
                Title Status
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} weight="fill" />
                Odometer Readings
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} weight="fill" />
                Recall Information
              </div>
            </div>
          </div>
        )}

        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="rounded-lg bg-accent/10 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Report Summary</div>
                <Badge variant={report.titleStatus === 'clean' ? 'default' : 'destructive'}>
                  {report.titleStatus.toUpperCase()} TITLE
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">VIN:</div>
                <div className="font-mono">{report.vin}</div>
                <div className="text-muted-foreground">Report Date:</div>
                <div>{new Date(report.reportDate).toLocaleDateString()}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="font-medium">Critical Checks</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.theftRecord)}
                  <span className="text-sm">Theft Record</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.floodDamage)}
                  <span className="text-sm">Flood Damage</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.frameDamage)}
                  <span className="text-sm">Frame Damage</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.airbagDeployment)}
                  <span className="text-sm">Airbag Deployment</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                <X size={20} />
                Accident History ({report.accidents.length})
              </div>
              {report.accidents.length === 0 ? (
                <div className="text-sm text-green-600 dark:text-green-400">
                  ✓ No accidents reported
                </div>
              ) : (
                <div className="space-y-2">
                  {report.accidents.map((accident, idx) => (
                    <div key={idx} className="p-3 rounded bg-muted text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{new Date(accident.date).toLocaleDateString()}</span>
                        <Badge variant={accident.severity === 'severe' ? 'destructive' : 'secondary'}>
                          {accident.severity}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">{accident.damage}</div>
                      <div className="text-xs mt-1">
                        {accident.repaired ? '✓ Repaired' : '⚠ Not repaired'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                <Wrench size={20} />
                Service History ({report.serviceMaintenance.length} records)
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {report.serviceMaintenance.slice(0, 5).map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted text-sm">
                    <div>
                      <div className="font-medium">{service.type}</div>
                      <div className="text-xs text-muted-foreground">{service.facility}</div>
                    </div>
                    <div className="text-right">
                      <div>{new Date(service.date).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">{service.mileage.toLocaleString()} km</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                <Gauge size={20} />
                Odometer History ({report.odometer.length} readings)
              </div>
              <div className="space-y-1">
                {report.odometer.slice(-3).map((reading, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm p-2">
                    <span className="text-muted-foreground">{reading.source}</span>
                    <div className="text-right">
                      <div className="font-medium">{reading.mileage.toLocaleString()} km</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(reading.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {report.recalls.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-medium text-destructive">
                    <Warning size={20} weight="fill" />
                    Open Recalls ({report.recalls.filter(r => !r.repaired).length})
                  </div>
                  {report.recalls.map((recall, idx) => (
                    <div key={idx} className="p-3 rounded border border-destructive/50 text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{recall.component}</span>
                        {recall.repaired && <Badge variant="outline">Completed</Badge>}
                      </div>
                      <div className="text-muted-foreground text-xs">{recall.description}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="rounded-lg bg-muted p-4 text-center text-sm space-y-2">
              <div className="font-medium">Previous Owners</div>
              <div className="text-2xl font-bold">{report.owners}</div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
