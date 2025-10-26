import { useState, useEffect, useMemo } from 'react'
import { Calculator, CarProfile, CurrencyEur, FileText, TrendUp } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

interface CostBreakdown {
  purchasePrice: number
  rca: number
  annualTax: number
  registrationFee: number
  inspectionFee: number
  environmentalTax: number
  totalFirstYear: number
  totalThreeYears: number
  monthlyAverage: number
}

export function SmartCostCalculator() {
  const [price, setPrice] = useState<string>('25000')
  const [engineSize, setEngineSize] = useState<string>('2000')
  const [fuelType, setFuelType] = useState<string>('diesel')
  const [vehicleAge, setVehicleAge] = useState<string>('5')
  const [location, setLocation] = useState<string>('urban')

  const calculateCosts = useMemo((): CostBreakdown => {
    const purchasePrice = parseFloat(price) || 0
    const cc = parseFloat(engineSize) || 1600
    const age = parseInt(vehicleAge) || 0

    let rca = 0
    if (fuelType === 'diesel') {
      if (cc <= 1600) rca = 450
      else if (cc <= 2000) rca = 650
      else if (cc <= 3000) rca = 900
      else rca = 1200
    } else if (fuelType === 'petrol') {
      if (cc <= 1600) rca = 380
      else if (cc <= 2000) rca = 550
      else if (cc <= 3000) rca = 750
      else rca = 1000
    } else if (fuelType === 'electric') {
      rca = 200
    } else if (fuelType === 'hybrid') {
      rca = 320
    }

    if (location === 'urban') {
      rca *= 1.15
    }

    let annualTax = 0
    if (fuelType === 'electric') {
      annualTax = 0
    } else if (fuelType === 'hybrid') {
      annualTax = Math.max(50, cc * 0.03)
    } else {
      const baseRate = fuelType === 'diesel' ? 0.08 : 0.06
      annualTax = cc * baseRate
      
      if (age > 10) annualTax *= 1.5
      else if (age > 5) annualTax *= 1.2
    }

    let registrationFee = 500
    if (purchasePrice > 50000) registrationFee = 800
    else if (purchasePrice > 30000) registrationFee = 650
    
    if (age > 10) registrationFee *= 0.7

    const inspectionFee = age > 3 ? 150 : 0

    let environmentalTax = 0
    if (fuelType === 'diesel' && cc > 2000) {
      environmentalTax = 300
    } else if (fuelType === 'diesel') {
      environmentalTax = 150
    } else if (fuelType === 'petrol' && cc > 3000) {
      environmentalTax = 200
    }

    const totalFirstYear = purchasePrice + rca + annualTax + registrationFee + inspectionFee + environmentalTax
    const totalThreeYears = purchasePrice + (rca * 3) + (annualTax * 3) + registrationFee + (inspectionFee * 2) + environmentalTax
    const monthlyAverage = totalThreeYears / 36

    return {
      purchasePrice: Math.round(purchasePrice),
      rca: Math.round(rca),
      annualTax: Math.round(annualTax),
      registrationFee: Math.round(registrationFee),
      inspectionFee: Math.round(inspectionFee),
      environmentalTax: Math.round(environmentalTax),
      totalFirstYear: Math.round(totalFirstYear),
      totalThreeYears: Math.round(totalThreeYears),
      monthlyAverage: Math.round(monthlyAverage)
    }
  }, [price, engineSize, fuelType, vehicleAge, location])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="text-accent" weight="duotone" />
          Smart Cost Calculator
        </CardTitle>
        <CardDescription>
          Calculate total ownership cost including RCA, taxes, registration, and fees
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Purchase Price</Label>
            <div className="relative">
              <CurrencyEur className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-10"
                placeholder="25000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="engineSize">Engine Size (cc)</Label>
            <Input
              id="engineSize"
              type="number"
              value={engineSize}
              onChange={(e) => setEngineSize(e.target.value)}
              placeholder="2000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger id="fuelType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleAge">Vehicle Age (years)</Label>
            <Input
              id="vehicleAge"
              type="number"
              value={vehicleAge}
              onChange={(e) => setVehicleAge(e.target.value)}
              placeholder="5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location Type</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urban">Urban (București, Cluj, etc.)</SelectItem>
                <SelectItem value="rural">Rural/Small City</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="text-accent" weight="duotone" />
            Cost Breakdown
          </h3>

          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-accent/20">
              <div className="flex items-center gap-2">
                <CarProfile className="text-accent" />
                <span className="font-medium">Purchase Price</span>
              </div>
              <span className="text-lg font-bold">{formatCurrency(calculateCosts.purchasePrice)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">RCA Insurance (Annual)</span>
              <span className="font-semibold">{formatCurrency(calculateCosts.rca)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Road Tax (Annual)</span>
              <span className="font-semibold">{formatCurrency(calculateCosts.annualTax)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Registration Fee (One-time)</span>
              <span className="font-semibold">{formatCurrency(calculateCosts.registrationFee)}</span>
            </div>

            {calculateCosts.inspectionFee > 0 && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Technical Inspection (Annual)</span>
                <span className="font-semibold">{formatCurrency(calculateCosts.inspectionFee)}</span>
              </div>
            )}

            {calculateCosts.environmentalTax > 0 && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Environmental Tax (One-time)</span>
                <span className="font-semibold">{formatCurrency(calculateCosts.environmentalTax)}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total First Year Cost</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(calculateCosts.totalFirstYear)}</p>
            </div>
            <Badge variant="default" className="text-xs">
              Year 1
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total 3-Year Cost</p>
              <p className="text-xl font-bold">{formatCurrency(calculateCosts.totalThreeYears)}</p>
            </div>
            <TrendUp className="text-muted-foreground" size={24} />
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Monthly Cost (3 years)</p>
              <p className="text-xl font-bold text-accent">{formatCurrency(calculateCosts.monthlyAverage)}</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              /month
            </Badge>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/30 rounded-lg">
          <p className="font-medium">💡 Note:</p>
          <p>• RCA prices vary by insurance provider and driver history</p>
          <p>• Road tax calculations based on Romanian regulations</p>
          <p>• Costs exclude maintenance, fuel, and parking</p>
          <p>• Registration fees may vary by county (județ)</p>
        </div>
      </CardContent>
    </Card>
  )
}
