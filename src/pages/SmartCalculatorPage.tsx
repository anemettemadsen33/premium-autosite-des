import { SmartCostCalculator } from '@/components/SmartCostCalculator'
import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface SmartCalculatorPageProps {
  onNavigate: (page: string) => void
}

export function SmartCalculatorPage({ onNavigate }: SmartCalculatorPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('calculators')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" />
          Back to Calculators
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Total Ownership Cost Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate the complete cost of owning a vehicle in Romania, including RCA insurance, 
            road tax, registration fees, and more.
          </p>
        </div>

        <SmartCostCalculator />

        <div className="mt-8 p-6 bg-card rounded-lg border space-y-4">
          <h2 className="text-xl font-semibold">Understanding Vehicle Costs in Romania</h2>
          
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-medium mb-1">RCA (Mandatory Insurance)</h3>
              <p className="text-muted-foreground">
                Required by law for all vehicles. Covers third-party liability. Prices vary by engine size, 
                fuel type, location, and your claims history.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Road Tax (Impozit Auto)</h3>
              <p className="text-muted-foreground">
                Annual tax paid to local authorities. Based on engine displacement (cc). 
                Electric vehicles are exempt. Higher rates for diesel and older vehicles.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Registration Fees</h3>
              <p className="text-muted-foreground">
                One-time fee when registering a vehicle. Includes license plates, paperwork, 
                and administrative costs. Varies by county (județ).
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Technical Inspection (ITP)</h3>
              <p className="text-muted-foreground">
                Required for vehicles older than 3 years. Annual for vehicles over 12 years, 
                every 2 years for newer vehicles. Ensures vehicle safety and emissions compliance.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Environmental Tax (Timbru de Mediu)</h3>
              <p className="text-muted-foreground">
                One-time tax for vehicles, especially older diesel vehicles. 
                Aimed at reducing pollution. Electric and newer vehicles may be exempt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
