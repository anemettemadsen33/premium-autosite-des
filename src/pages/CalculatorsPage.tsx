import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calculator, TrendUp } from '@phosphor-icons/react'
import { formatPrice } from '@/lib/utils'

interface CalculatorsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function CalculatorsPage({ onNavigate }: CalculatorsPageProps) {
  const [vehiclePrice, setVehiclePrice] = useState(25000)
  const [downPayment, setDownPayment] = useState(5000)
  const [interestRate, setInterestRate] = useState(4.5)
  const [loanTerm, setLoanTerm] = useState(60)
  
  const [tradeInYear, setTradeInYear] = useState(2018)
  const [tradeInMileage, setTradeInMileage] = useState(75000)
  const [tradeInCondition, setTradeInCondition] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good')
  const [tradeInBrand, setTradeInBrand] = useState('')
  const [tradeInModel, setTradeInModel] = useState('')

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm
    
    if (monthlyRate === 0) return principal / numPayments
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    
    return monthlyPayment
  }

  const calculateTotalInterest = () => {
    const monthlyPayment = calculateMonthlyPayment()
    const totalPaid = monthlyPayment * loanTerm
    const principal = vehiclePrice - downPayment
    return totalPaid - principal
  }

  const calculateTradeInValue = () => {
    const baseValue = 15000
    const yearDepreciation = (new Date().getFullYear() - tradeInYear) * 800
    const mileageDepreciation = (tradeInMileage / 10000) * 400
    
    const conditionMultiplier = {
      excellent: 1.15,
      good: 1.0,
      fair: 0.85,
      poor: 0.65
    }
    
    let estimatedValue = baseValue - yearDepreciation - mileageDepreciation
    estimatedValue = estimatedValue * conditionMultiplier[tradeInCondition]
    
    return Math.max(estimatedValue, 1000)
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalInterest = calculateTotalInterest()
  const totalAmount = monthlyPayment * loanTerm + downPayment
  const tradeInValue = calculateTradeInValue()
  const tradeInRange = {
    low: tradeInValue * 0.9,
    high: tradeInValue * 1.1
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Financial Calculators</h1>
          <p className="text-muted-foreground">
            Plan your purchase with our financing and trade-in calculators
          </p>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-accent/10 to-purple-500/10 border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">New: Smart Cost Calculator</h3>
                <p className="text-sm text-muted-foreground">
                  Calculate total ownership costs including RCA, road tax, registration fees for Romania
                </p>
              </div>
              <Button onClick={() => onNavigate('smart-calculator')} variant="default">
                Try Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="financing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="financing" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Financing Calculator
            </TabsTrigger>
            <TabsTrigger value="tradein" className="flex items-center gap-2">
              <TrendUp className="w-4 h-4" />
              Trade-In Estimator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="financing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>Enter your financing information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-price">Vehicle Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      <Input
                        id="vehicle-price"
                        type="number"
                        value={vehiclePrice}
                        onChange={(e) => setVehiclePrice(Number(e.target.value))}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="down-payment">Down Payment</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      <Input
                        id="down-payment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {((downPayment / vehiclePrice) * 100).toFixed(1)}% of vehicle price
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loan-term">Loan Term</Label>
                    <Select value={loanTerm.toString()} onValueChange={(v) => setLoanTerm(Number(v))}>
                      <SelectTrigger id="loan-term">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24">24 months (2 years)</SelectItem>
                        <SelectItem value="36">36 months (3 years)</SelectItem>
                        <SelectItem value="48">48 months (4 years)</SelectItem>
                        <SelectItem value="60">60 months (5 years)</SelectItem>
                        <SelectItem value="72">72 months (6 years)</SelectItem>
                        <SelectItem value="84">84 months (7 years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Breakdown</CardTitle>
                  <CardDescription>Your estimated monthly payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-6 bg-accent/10 rounded-lg border-2 border-accent">
                    <p className="text-sm text-muted-foreground mb-2">Monthly Payment</p>
                    <p className="text-4xl font-bold text-accent">{formatPrice(monthlyPayment)}</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vehicle Price</span>
                      <span className="font-semibold">{formatPrice(vehiclePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Down Payment</span>
                      <span className="font-semibold">-{formatPrice(downPayment)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Amount</span>
                      <span className="font-semibold">{formatPrice(vehiclePrice - downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Interest</span>
                      <span className="font-semibold text-destructive">+{formatPrice(totalInterest)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total Amount</span>
                      <span className="font-bold">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Number of Payments</span>
                      <span className="font-semibold">{loanTerm}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Interest Rate</span>
                      <span className="font-semibold">{interestRate}% APR</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tradein" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Information</CardTitle>
                  <CardDescription>Tell us about your trade-in vehicle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tradein-brand">Brand</Label>
                      <Input
                        id="tradein-brand"
                        placeholder="e.g., Toyota"
                        value={tradeInBrand}
                        onChange={(e) => setTradeInBrand(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tradein-model">Model</Label>
                      <Input
                        id="tradein-model"
                        placeholder="e.g., Camry"
                        value={tradeInModel}
                        onChange={(e) => setTradeInModel(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tradein-year">Year</Label>
                    <Select value={tradeInYear.toString()} onValueChange={(v) => setTradeInYear(Number(v))}>
                      <SelectTrigger id="tradein-year">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tradein-mileage">Mileage (km)</Label>
                    <Input
                      id="tradein-mileage"
                      type="number"
                      value={tradeInMileage}
                      onChange={(e) => setTradeInMileage(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tradein-condition">Condition</Label>
                    <Select value={tradeInCondition} onValueChange={(v: any) => setTradeInCondition(v)}>
                      <SelectTrigger id="tradein-condition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent - Like new, no damage</SelectItem>
                        <SelectItem value="good">Good - Minor wear, well maintained</SelectItem>
                        <SelectItem value="fair">Fair - Visible wear, needs minor repairs</SelectItem>
                        <SelectItem value="poor">Poor - Significant damage or issues</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estimated Trade-In Value</CardTitle>
                  <CardDescription>Based on the information provided</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8 bg-accent/10 rounded-lg border-2 border-accent">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Value</p>
                    <p className="text-4xl font-bold text-accent mb-4">{formatPrice(tradeInValue)}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <span>{formatPrice(tradeInRange.low)}</span>
                      <span>-</span>
                      <span>{formatPrice(tradeInRange.high)}</span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Factors Affecting Value</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">•</span>
                        <span><strong>Age:</strong> {new Date().getFullYear() - tradeInYear} years old</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">•</span>
                        <span><strong>Mileage:</strong> {tradeInMileage.toLocaleString()} km</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">•</span>
                        <span><strong>Condition:</strong> {tradeInCondition.charAt(0).toUpperCase() + tradeInCondition.slice(1)}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Note:</strong> This is an estimated value. Actual trade-in offers may vary based on market conditions, vehicle history, and dealer assessment.
                    </p>
                  </div>

                  <Button className="w-full" onClick={() => onNavigate('home')}>
                    Apply Trade-In to Purchase
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
