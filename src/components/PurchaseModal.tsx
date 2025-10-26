import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Vehicle } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Separator } from './ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { toast } from 'sonner'
import { CreditCard, Briefcase, User, X } from '@phosphor-icons/react'

interface PurchaseModalProps {
  vehicle: Vehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  purchaseType: 'buy' | 'finance'
}

type EntityType = 'individual' | 'company'

export function PurchaseModal({ vehicle, open, onOpenChange, purchaseType }: PurchaseModalProps) {
  const [entityType, setEntityType] = useState<EntityType>('individual')
  const [paymentPlan, setPaymentPlan] = useState('12')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    toast.success(
      purchaseType === 'buy' 
        ? 'Purchase request submitted successfully! We will contact you shortly.' 
        : 'Finance application submitted successfully! We will review and contact you within 24 hours.'
    )
    
    console.log('Form submitted:', { ...data, vehicleId: vehicle?.id, purchaseType, entityType })
    onOpenChange(false)
  }

  if (!vehicle) return null

  const downPayment = purchaseType === 'finance' ? vehicle.price * 0.2 : vehicle.price
  const monthlyPayment = purchaseType === 'finance' 
    ? (vehicle.price - downPayment) / parseInt(paymentPlan) 
    : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl">
        <div className="sticky top-0 z-10 bg-card border-b border-border px-8 py-6">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-6 right-6 hover:bg-muted rounded-full p-2 transition-all"
          >
            <X size={20} weight="bold" />
          </button>
          
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              {purchaseType === 'buy' ? 'Purchase' : 'Finance'} Your Vehicle
            </DialogTitle>
            <p className="text-muted-foreground mt-2">
              {vehicle.name} • ${vehicle.price.toLocaleString()}
            </p>
          </DialogHeader>
        </div>

        <div className="p-8">
          {purchaseType === 'finance' && (
            <div className="bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-2xl p-6 mb-8 border border-accent/20">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard size={24} weight="duotone" className="text-accent" />
                Payment Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Vehicle Price</p>
                  <p className="text-2xl font-bold">${vehicle.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Down Payment (20%)</p>
                  <p className="text-2xl font-bold">${downPayment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Monthly Payment</p>
                  <p className="text-2xl font-bold text-accent">${monthlyPayment.toLocaleString()}/mo</p>
                </div>
              </div>
            </div>
          )}

          <Tabs value={entityType} onValueChange={(v) => setEntityType(v as EntityType)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-muted/50 p-1.5 rounded-xl">
              <TabsTrigger value="individual" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <User size={20} weight="duotone" className="mr-2" />
                Individual
              </TabsTrigger>
              <TabsTrigger value="company" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <Briefcase size={20} weight="duotone" className="mr-2" />
                Company
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="individual" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input id="address" name="address" placeholder="123 Main Street" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" placeholder="Los Angeles" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" name="state" placeholder="CA" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input id="zipCode" name="zipCode" placeholder="90210" required />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type *</Label>
                    <Select name="idType" required>
                      <SelectTrigger id="idType">
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drivers-license">Driver's License</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="state-id">State ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number *</Label>
                    <Input id="idNumber" name="idNumber" placeholder="ID Number" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ssn">Social Security Number *</Label>
                    <Input id="ssn" name="ssn" placeholder="XXX-XX-XXXX" required />
                  </div>
                </div>

                {purchaseType === 'finance' && (
                  <>
                    <Separator className="my-6" />
                    <h3 className="text-lg font-bold mb-4">Employment Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="employer">Employer Name *</Label>
                        <Input id="employer" name="employer" placeholder="Company Name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation *</Label>
                        <Input id="occupation" name="occupation" placeholder="Job Title" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                        <Input id="monthlyIncome" name="monthlyIncome" type="number" placeholder="5000" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employmentLength">Years at Current Job *</Label>
                        <Input id="employmentLength" name="employmentLength" type="number" placeholder="3" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentPlan">Financing Term *</Label>
                      <RadioGroup value={paymentPlan} onValueChange={setPaymentPlan} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['12', '24', '36', '48', '60', '72'].map((months) => (
                          <div key={months} className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-accent transition-colors cursor-pointer">
                            <RadioGroupItem value={months} id={`plan-${months}`} />
                            <Label htmlFor={`plan-${months}`} className="cursor-pointer flex-1">
                              {months} months
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="company" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" name="companyName" placeholder="ABC Corporation Ltd." required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <Input id="registrationNumber" name="registrationNumber" placeholder="REG123456789" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / VAT Number *</Label>
                    <Input id="taxId" name="taxId" placeholder="XX-XXXXXXX" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Company Address *</Label>
                  <Input id="companyAddress" name="companyAddress" placeholder="456 Business Avenue" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyCity">City *</Label>
                    <Input id="companyCity" name="companyCity" placeholder="Los Angeles" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyState">State *</Label>
                    <Input id="companyState" name="companyState" placeholder="CA" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyZipCode">ZIP Code *</Label>
                    <Input id="companyZipCode" name="companyZipCode" placeholder="90210" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Company Email *</Label>
                    <Input id="companyEmail" name="companyEmail" type="email" placeholder="contact@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Company Phone *</Label>
                    <Input id="companyPhone" name="companyPhone" type="tel" placeholder="+1 (555) 987-6543" required />
                  </div>
                </div>

                <Separator className="my-6" />
                <h3 className="text-lg font-bold mb-4">Authorized Representative</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="repFirstName">First Name *</Label>
                    <Input id="repFirstName" name="repFirstName" placeholder="Jane" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repLastName">Last Name *</Label>
                    <Input id="repLastName" name="repLastName" placeholder="Smith" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="repEmail">Email Address *</Label>
                    <Input id="repEmail" name="repEmail" type="email" placeholder="jane.smith@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repPhone">Phone Number *</Label>
                    <Input id="repPhone" name="repPhone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repPosition">Position in Company *</Label>
                  <Input id="repPosition" name="repPosition" placeholder="CEO / CFO / Authorized Manager" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="repIdType">ID Type *</Label>
                    <Select name="repIdType" required>
                      <SelectTrigger id="repIdType">
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drivers-license">Driver's License</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="state-id">State ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repIdNumber">ID Number *</Label>
                    <Input id="repIdNumber" name="repIdNumber" placeholder="ID Number" required />
                  </div>
                </div>

                {purchaseType === 'finance' && (
                  <>
                    <Separator className="my-6" />
                    <h3 className="text-lg font-bold mb-4">Company Financial Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="annualRevenue">Annual Revenue *</Label>
                        <Input id="annualRevenue" name="annualRevenue" type="number" placeholder="1000000" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                        <Input id="yearsInBusiness" name="yearsInBusiness" type="number" placeholder="5" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input id="bankName" name="bankName" placeholder="Bank of America" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentPlanCompany">Financing Term *</Label>
                      <RadioGroup value={paymentPlan} onValueChange={setPaymentPlan} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['12', '24', '36', '48', '60', '72'].map((months) => (
                          <div key={months} className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-accent transition-colors cursor-pointer">
                            <RadioGroupItem value={months} id={`plan-company-${months}`} />
                            <Label htmlFor={`plan-company-${months}`} className="cursor-pointer flex-1">
                              {months} months
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </>
                )}
              </TabsContent>

              <Separator className="my-8" />

              <div className="flex items-start space-x-3 mb-6">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I agree to the terms and conditions, and I authorize AUTOSITE to process my personal/company information 
                  for the purpose of this {purchaseType === 'buy' ? 'purchase' : 'financing application'}. 
                  I understand that this information will be used to verify my identity and creditworthiness.
                </Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="button"
                  variant="outline" 
                  size="lg" 
                  className="flex-1 h-14 text-base rounded-xl"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-accent to-purple-500 hover:from-accent/90 hover:to-purple-600 text-white h-14 text-base rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  {purchaseType === 'buy' ? 'Submit Purchase Request' : 'Submit Finance Application'}
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
