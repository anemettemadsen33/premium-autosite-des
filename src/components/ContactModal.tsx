import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Vehicle } from '@/lib/types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { useState } from 'react'
import { toast } from 'sonner'
import { PaperPlaneTilt } from '@phosphor-icons/react'

interface ContactModalProps {
  vehicle: Vehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactModal({ vehicle, open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    toast.success('Request Submitted!', {
      description: 'Our team will contact you within 24 hours.',
      duration: 4000
    })
    
    setFormData({ name: '', email: '', phone: '', message: '' })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {vehicle ? `Inquire About ${vehicle.name}` : 'Contact Us'}
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">Fill out the form and we'll get back to you shortly</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div>
            <Label htmlFor="name" className="text-sm font-semibold mb-2 block">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-12 rounded-xl border-border/50 focus:border-accent transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-semibold mb-2 block">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12 rounded-xl border-border/50 focus:border-accent transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-semibold mb-2 block">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="h-12 rounded-xl border-border/50 focus:border-accent transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-semibold mb-2 block">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your interests..."
              rows={4}
              className="rounded-xl border-border/50 focus:border-accent transition-colors resize-none"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-accent to-purple-500 hover:from-accent/90 hover:to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-base font-semibold"
          >
            <PaperPlaneTilt size={20} weight="bold" className="mr-2" />
            Send Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
