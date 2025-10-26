import { motion } from 'framer-motion'
import { Sparkle, MapPin, Phone, Envelope, Clock, ChatCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { toast } from 'sonner'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: ['123 Luxury Auto Boulevard', 'Beverly Hills, CA 90210'],
      link: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['Sales: (555) 123-4567', 'Service: (555) 123-4568'],
      link: 'Call Now'
    },
    {
      icon: Envelope,
      title: 'Email Us',
      details: ['sales@autosite.com', 'service@autosite.com'],
      link: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 8:00 PM', 'Sat-Sun: 10:00 AM - 6:00 PM'],
      link: null
    }
  ]

  const departments = [
    { value: 'sales', label: 'Vehicle Sales' },
    { value: 'service', label: 'Service & Maintenance' },
    { value: 'financing', label: 'Financing Inquiry' },
    { value: 'general', label: 'General Question' },
    { value: 'other', label: 'Other' }
  ]

  const faqs = [
    {
      question: 'Do you offer test drives?',
      answer: 'Yes! We encourage test drives for all vehicles. Schedule one through our website or call us directly.'
    },
    {
      question: 'What warranty is included?',
      answer: 'All our vehicles come with manufacturer warranties. Extended warranty options are also available.'
    },
    {
      question: 'Do you accept trade-ins?',
      answer: 'Absolutely. We offer competitive trade-in values. Bring your vehicle for a free appraisal.'
    },
    {
      question: 'Can I reserve a vehicle online?',
      answer: 'Yes, you can reserve any vehicle with a refundable deposit through our website or by phone.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)',
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
              <span className="text-sm text-white/90 font-medium">Get In Touch</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              We're Here to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-blue-400">
                Help
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Have questions? Our team of experts is ready to assist you with anything you need.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <info.icon size={24} className="text-accent" weight="duotone" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail) => (
                        <p key={detail} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                    {info.link && (
                      <Button variant="link" className="p-0 h-auto text-accent font-medium">
                        {info.link} →
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <ChatCircle size={32} className="text-accent" weight="duotone" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Send Us a Message
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Fill out the form below and one of our specialists will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      required
                    >
                      <SelectTrigger id="subject" className="h-12">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-700 text-white text-base py-6 rounded-xl font-medium shadow-lg"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Quick answers to common questions about our services and processes.
                </p>

                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="border-border/50">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-br from-accent/10 to-purple-500/10 border-accent/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Prefer to Talk?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our sales team is available to answer your questions over the phone.
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Phone size={20} className="text-accent" weight="duotone" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Sales</div>
                        <div className="font-semibold text-foreground">(555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Phone size={20} className="text-accent" weight="duotone" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Service</div>
                        <div className="font-semibold text-foreground">(555) 123-4568</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-[21/9] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.280582827331!2d-118.40058492346583!3d34.063308173155516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0x672a0c98ba7ed3d9!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AUTOSITE Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
