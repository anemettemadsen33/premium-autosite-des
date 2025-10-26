import { motion } from 'framer-motion'
import { Sparkle, CreditCard, Calculator, ChartLine, Shield, CheckCircle, Percent } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'

export function Financing() {
  const [loanAmount, setLoanAmount] = useState(50000)
  const [downPayment, setDownPayment] = useState(10000)
  const [loanTerm, setLoanTerm] = useState(60)
  const [interestRate, setInterestRate] = useState(5.9)

  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm
    
    if (monthlyRate === 0) return principal / numPayments
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1)
    
    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalCost = monthlyPayment * loanTerm
  const totalInterest = totalCost - (loanAmount - downPayment)

  const financingOptions = [
    {
      icon: CreditCard,
      title: 'Traditional Financing',
      description: 'Competitive rates through our network of premium lenders.',
      features: [
        'Rates from 4.9% APR',
        'Terms up to 84 months',
        'Pre-approval in minutes',
        'Flexible down payments'
      ],
      highlight: 'Most Popular'
    },
    {
      icon: ChartLine,
      title: 'Lease Options',
      description: 'Drive the latest models with lower monthly payments.',
      features: [
        'Lower monthly payments',
        'Latest vehicle technology',
        'Flexible mileage options',
        'Purchase option at end'
      ]
    },
    {
      icon: Shield,
      title: 'Certified Pre-Owned',
      description: 'Special financing rates on certified vehicles.',
      features: [
        'Rates from 3.9% APR',
        'Extended warranty included',
        'Vehicle history verified',
        'Premium benefits package'
      ]
    }
  ]

  const benefits = [
    'Same-day approval decisions',
    'Multiple lender options',
    'Trade-in value maximization',
    'Transparent pricing',
    'Protection plans available',
    'Online application portal'
  ]

  const requirements = [
    {
      title: 'Credit Score',
      description: 'Minimum 620 for standard rates, higher scores get better terms'
    },
    {
      title: 'Income Verification',
      description: 'Recent pay stubs or tax returns for self-employed'
    },
    {
      title: 'Down Payment',
      description: 'Minimum 10% recommended, higher amounts reduce monthly payments'
    },
    {
      title: 'Valid ID',
      description: 'Government-issued identification and proof of residence'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1554224311-beee4f6fa560?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary/40 to-background/90" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkle size={16} weight="fill" className="text-accent" />
              <span className="text-sm text-white/90 font-medium">Flexible Options</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Financing Made
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-blue-400">
                Simple
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Competitive rates, flexible terms, and personalized solutions to make your dream vehicle affordable.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Calculator size={32} className="text-accent" weight="duotone" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Payment Calculator
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Estimate your monthly payments and explore different financing scenarios with our interactive calculator.
              </p>

              <Card className="border-border/50">
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="loan-amount" className="text-base font-semibold">
                      Vehicle Price: ${loanAmount.toLocaleString()}
                    </Label>
                    <Slider
                      id="loan-amount"
                      min={20000}
                      max={200000}
                      step={1000}
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="down-payment" className="text-base font-semibold">
                      Down Payment: ${downPayment.toLocaleString()}
                    </Label>
                    <Slider
                      id="down-payment"
                      min={0}
                      max={loanAmount * 0.5}
                      step={1000}
                      value={[downPayment]}
                      onValueChange={(value) => setDownPayment(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="loan-term" className="text-base font-semibold">
                      Loan Term: {loanTerm} months
                    </Label>
                    <Slider
                      id="loan-term"
                      min={12}
                      max={84}
                      step={12}
                      value={[loanTerm]}
                      onValueChange={(value) => setLoanTerm(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="interest-rate" className="text-base font-semibold">
                      Interest Rate: {interestRate.toFixed(1)}%
                    </Label>
                    <Slider
                      id="interest-rate"
                      min={2.9}
                      max={15.0}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="bg-gradient-to-br from-accent via-accent to-purple-600 text-white border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-sm font-medium mb-2 text-white/80">
                    Estimated Monthly Payment
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-8">
                    ${Math.round(monthlyPayment).toLocaleString()}
                  </div>
                  
                  <Separator className="my-6 bg-white/20" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Loan Amount</span>
                      <span className="font-semibold text-lg">
                        ${(loanAmount - downPayment).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Total Interest</span>
                      <span className="font-semibold text-lg">
                        ${Math.round(totalInterest).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Total Cost</span>
                      <span className="font-semibold text-lg">
                        ${Math.round(totalCost + downPayment).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Financing Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Percent size={20} className="text-accent flex-shrink-0 mt-1" weight="duotone" />
                      <div>
                        <div className="font-medium text-foreground">Competitive Rates</div>
                        <div className="text-sm text-muted-foreground">
                          Your actual rate may vary based on credit score
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-accent flex-shrink-0 mt-1" weight="fill" />
                      <div>
                        <div className="font-medium text-foreground">Flexible Terms</div>
                        <div className="text-sm text-muted-foreground">
                          Choose from 12 to 84-month financing options
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield size={20} className="text-accent flex-shrink-0 mt-1" weight="duotone" />
                      <div>
                        <div className="font-medium text-foreground">Protection Plans</div>
                        <div className="text-sm text-muted-foreground">
                          Optional coverage for peace of mind
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6 rounded-xl font-medium shadow-lg"
              >
                Apply for Financing
              </Button>
            </motion.div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Financing Options
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the financing solution that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {financingOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
                    {option.highlight && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-accent to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                        {option.highlight}
                      </div>
                    )}
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <option.icon size={28} className="text-accent" weight="duotone" />
                      </div>
                      
                      <h3 className="text-2xl font-semibold text-foreground mb-3">
                        {option.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {option.description}
                      </p>

                      <Separator className="my-6" />

                      <ul className="space-y-3">
                        {option.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" weight="fill" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Application Requirements
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Here's what you'll need to complete your financing application quickly and easily.
              </p>

              <div className="space-y-6">
                {requirements.map((req, index) => (
                  <motion.div
                    key={req.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-border/50">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {req.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {req.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Why Finance With Us
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We partner with leading financial institutions to offer competitive rates and flexible terms tailored to your needs.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle size={20} className="text-accent flex-shrink-0" weight="fill" />
                    <span className="text-sm text-foreground font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
                  alt="Financing"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-primary via-primary to-purple-950 text-primary-foreground rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Pre-Approved?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Start your financing application today and get a decision in minutes. No impact to your credit score for pre-qualification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 text-base px-10 py-6 rounded-full shadow-xl font-medium"
                >
                  Start Application
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base px-10 py-6 rounded-full font-medium"
                >
                  Speak to Specialist
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
