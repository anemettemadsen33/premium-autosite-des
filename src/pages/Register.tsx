import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserCircle, EnvelopeSimple, Lock, Eye, EyeSlash, User, Phone, Buildings, IdentificationCard } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface RegisterProps {
  onNavigate: (page: string) => void
}

export function Register({ onNavigate }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [personalForm, setPersonalForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [businessForm, setBusinessForm] = useState({
    companyName: '',
    registrationNumber: '',
    taxId: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (personalForm.password !== personalForm.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      toast.success('Account created successfully!', {
        description: 'Welcome to AUTOSITE'
      })
      setIsLoading(false)
      onNavigate('login')
    }, 1500)
  }

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (businessForm.password !== businessForm.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      toast.success('Business account created successfully!', {
        description: 'Welcome to AUTOSITE'
      })
      setIsLoading(false)
      onNavigate('login')
    }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                <UserCircle size={32} weight="duotone" className="text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Create Account
            </CardTitle>
            <CardDescription className="text-base">
              Join AUTOSITE and start your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="personal" className="gap-2">
                  <User size={18} weight="duotone" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="business" className="gap-2">
                  <Buildings size={18} weight="duotone" />
                  Business
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <form onSubmit={handlePersonalSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User 
                          size={18} 
                          weight="duotone" 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                        />
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={personalForm.firstName}
                          onChange={(e) => setPersonalForm({ ...personalForm, firstName: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User 
                          size={18} 
                          weight="duotone" 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                        />
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={personalForm.lastName}
                          onChange={(e) => setPersonalForm({ ...personalForm, lastName: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personal-email">Email Address</Label>
                    <div className="relative">
                      <EnvelopeSimple 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="personal-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={personalForm.email}
                        onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personal-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="personal-phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={personalForm.phone}
                        onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personal-password">Password</Label>
                    <div className="relative">
                      <Lock 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="personal-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={personalForm.password}
                        onChange={(e) => setPersonalForm({ ...personalForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeSlash size={18} weight="duotone" /> : <Eye size={18} weight="duotone" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personal-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="personal-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={personalForm.confirmPassword}
                        onChange={(e) => setPersonalForm({ ...personalForm, confirmPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeSlash size={18} weight="duotone" /> : <Eye size={18} weight="duotone" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox 
                      id="terms-personal" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label 
                      htmlFor="terms-personal" 
                      className="text-sm font-normal cursor-pointer leading-relaxed"
                    >
                      I agree to the{' '}
                      <button type="button" className="text-accent hover:underline">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-accent hover:underline">
                        Privacy Policy
                      </button>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-accent to-purple-600 hover:opacity-90 transition-opacity"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <UserCircle size={20} weight="duotone" />
                      </motion.div>
                    ) : (
                      <>
                        <UserCircle size={20} weight="duotone" />
                        Create Personal Account
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="business">
                <form onSubmit={handleBusinessSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <div className="relative">
                      <Buildings 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="companyName"
                        placeholder="Your Company Ltd."
                        value={businessForm.companyName}
                        onChange={(e) => setBusinessForm({ ...businessForm, companyName: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">Registration Number</Label>
                      <div className="relative">
                        <IdentificationCard 
                          size={18} 
                          weight="duotone" 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                        />
                        <Input
                          id="registrationNumber"
                          placeholder="12345678"
                          value={businessForm.registrationNumber}
                          onChange={(e) => setBusinessForm({ ...businessForm, registrationNumber: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                      <div className="relative">
                        <IdentificationCard 
                          size={18} 
                          weight="duotone" 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                        />
                        <Input
                          id="taxId"
                          placeholder="RO12345678"
                          value={businessForm.taxId}
                          onChange={(e) => setBusinessForm({ ...businessForm, taxId: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <div className="relative">
                      <User 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="contactPerson"
                        placeholder="John Doe"
                        value={businessForm.contactPerson}
                        onChange={(e) => setBusinessForm({ ...businessForm, contactPerson: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-email">Business Email</Label>
                    <div className="relative">
                      <EnvelopeSimple 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="business-email"
                        type="email"
                        placeholder="contact@company.com"
                        value={businessForm.email}
                        onChange={(e) => setBusinessForm({ ...businessForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Business Phone</Label>
                    <div className="relative">
                      <Phone 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="business-phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={businessForm.phone}
                        onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-password">Password</Label>
                    <div className="relative">
                      <Lock 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="business-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={businessForm.password}
                        onChange={(e) => setBusinessForm({ ...businessForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeSlash size={18} weight="duotone" /> : <Eye size={18} weight="duotone" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock 
                        size={18} 
                        weight="duotone" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                      />
                      <Input
                        id="business-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={businessForm.confirmPassword}
                        onChange={(e) => setBusinessForm({ ...businessForm, confirmPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeSlash size={18} weight="duotone" /> : <Eye size={18} weight="duotone" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox 
                      id="terms-business" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label 
                      htmlFor="terms-business" 
                      className="text-sm font-normal cursor-pointer leading-relaxed"
                    >
                      I agree to the{' '}
                      <button type="button" className="text-accent hover:underline">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-accent hover:underline">
                        Privacy Policy
                      </button>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-accent to-purple-600 hover:opacity-90 transition-opacity"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Buildings size={20} weight="duotone" />
                      </motion.div>
                    ) : (
                      <>
                        <Buildings size={20} weight="duotone" />
                        Create Business Account
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                Sign In
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
