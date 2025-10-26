import { motion } from 'framer-motion'
import { Sparkle, Wrench, Shield, Star, GasPump, PaintBrush, Certificate, Clock, CheckCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function Services() {
  const services = [
    {
      icon: Star,
      title: 'Premium Detailing',
      description: 'Professional interior and exterior detailing to maintain your vehicle\'s showroom condition.',
      features: [
        'Deep interior cleaning & conditioning',
        'Paint correction & ceramic coating',
        'Engine bay detailing',
        'Leather treatment & protection'
      ],
      price: 'From $299'
    },
    {
      icon: Wrench,
      title: 'Maintenance & Service',
      description: 'Comprehensive maintenance services performed by certified technicians using genuine parts.',
      features: [
        'Regular service intervals',
        'Brake system inspection',
        'Fluid replacement & top-ups',
        'Diagnostic scanning'
      ],
      price: 'From $199'
    },
    {
      icon: Shield,
      title: 'Extended Warranty',
      description: 'Comprehensive coverage plans to protect your investment and provide peace of mind.',
      features: [
        'Powertrain coverage',
        'Comprehensive protection',
        'Roadside assistance 24/7',
        'Transferable to new owner'
      ],
      price: 'Custom Pricing'
    },
    {
      icon: GasPump,
      title: 'Performance Tuning',
      description: 'Unlock your vehicle\'s full potential with professional performance optimization.',
      features: [
        'ECU remapping & optimization',
        'Exhaust system upgrades',
        'Suspension tuning',
        'Dyno testing & validation'
      ],
      price: 'From $799'
    },
    {
      icon: PaintBrush,
      title: 'Custom Styling',
      description: 'Personalize your vehicle with premium accessories and custom modifications.',
      features: [
        'Wheel & tire packages',
        'Interior customization',
        'Exterior styling kits',
        'Premium audio systems'
      ],
      price: 'Custom Pricing'
    },
    {
      icon: Certificate,
      title: 'Pre-Purchase Inspection',
      description: 'Thorough inspection and evaluation before you commit to your next vehicle purchase.',
      features: [
        'Multi-point inspection',
        'Vehicle history verification',
        'Test drive evaluation',
        'Detailed condition report'
      ],
      price: 'From $249'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Schedule Appointment',
      description: 'Book your service online or call our dedicated service team to schedule a convenient time.'
    },
    {
      step: '02',
      title: 'Drop-Off or Pickup',
      description: 'Bring your vehicle to our facility or take advantage of our complimentary pickup service.'
    },
    {
      step: '03',
      title: 'Expert Service',
      description: 'Our certified technicians perform the work using premium parts and specialized equipment.'
    },
    {
      step: '04',
      title: 'Quality Check',
      description: 'Rigorous quality inspection ensures every service meets our exacting standards.'
    },
    {
      step: '05',
      title: 'Delivery & Report',
      description: 'Receive your vehicle with a detailed service report and expert recommendations.'
    }
  ]

  const benefits = [
    'Certified Master Technicians',
    'Genuine OEM Parts',
    'State-of-the-Art Equipment',
    'Competitive Pricing',
    'Service History Records',
    'Complimentary Wash & Detail',
    'Courtesy Vehicles Available',
    'Flexible Scheduling'
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80)',
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
              <span className="text-sm text-white/90 font-medium">Premium Services</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Expert Care for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-blue-400">
                Your Investment
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Comprehensive automotive services delivered by certified specialists using premium parts and cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything your vehicle needs to stay in peak condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon size={28} className="text-accent" weight="duotone" />
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <Separator className="my-6" />

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" weight="fill" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-xl font-semibold text-accent">
                      {service.price}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Our Service Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A streamlined experience from start to finish
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-accent/50 to-purple-500/50" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Why Choose Our Service Center
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We combine technical expertise with genuine care for your vehicle. Every service is performed to the highest standards using premium parts and specialized equipment.
              </p>

              <div className="grid grid-cols-2 gap-4">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80"
                  alt="Service Center"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
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
              <Clock size={48} className="mx-auto mb-6 text-white/80" weight="duotone" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Schedule Your Service Today
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Book an appointment with our service team and experience the difference of premium automotive care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 text-base px-10 py-6 rounded-full shadow-xl font-medium"
                >
                  Book Service Online
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base px-10 py-6 rounded-full font-medium"
                >
                  Call: (555) 123-4567
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
