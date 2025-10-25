import { useState } from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { Vehicle } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { 
  X, 
  Engine, 
  Lightning, 
  Gauge, 
  Gear, 
  Calendar,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface VehicleDetailModalProps {
  vehicle: Vehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onContact: (vehicle: Vehicle) => void
}

export function VehicleDetailModal({ vehicle, open, onOpenChange, onContact }: VehicleDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!vehicle) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <X size={24} weight="bold" />
          </button>

          <div className="relative h-[400px] bg-muted overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={vehicle.images[currentImageIndex]}
                alt={vehicle.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                >
                  <CaretLeft size={24} weight="bold" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                >
                  <CaretRight size={24} weight="bold" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-2">
                  {vehicle.name}
                </h2>
                <p className="text-lg text-muted-foreground uppercase tracking-wider font-medium" style={{ fontFamily: 'Orbitron' }}>
                  {vehicle.brand} • {vehicle.year}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Starting at</p>
                <p className="text-3xl font-bold text-accent">
                  ${vehicle.price.toLocaleString()}
                </p>
              </div>
            </div>

            {vehicle.isNew && (
              <Badge className="bg-accent text-white border-0 mb-4">
                NEW 2024 MODEL
              </Badge>
            )}

            <p className="text-foreground leading-relaxed mb-8">
              {vehicle.description}
            </p>

            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SpecItem 
                    icon={<Engine size={24} weight="duotone" />}
                    label="Engine"
                    value={vehicle.specs.engine}
                  />
                  <SpecItem 
                    icon={<Lightning size={24} weight="duotone" />}
                    label="Horsepower"
                    value={`${vehicle.specs.horsepower} hp`}
                  />
                  <SpecItem 
                    icon={<Gauge size={24} weight="duotone" />}
                    label="Top Speed"
                    value={vehicle.specs.topSpeed}
                  />
                  <SpecItem 
                    icon={<Gear size={24} weight="duotone" />}
                    label="Transmission"
                    value={vehicle.specs.transmission}
                  />
                  <SpecItem 
                    label="Torque"
                    value={vehicle.specs.torque}
                  />
                  <SpecItem 
                    label="Acceleration"
                    value={vehicle.specs.acceleration}
                  />
                  <SpecItem 
                    label="Fuel Economy"
                    value={vehicle.specs.fuelEconomy}
                  />
                </div>
              </TabsContent>

              <TabsContent value="features">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="colors">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {vehicle.colors.map((color) => (
                    <div 
                      key={color.name}
                      className="flex items-center gap-3 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                    >
                      <div 
                        className="w-12 h-12 rounded-full border-2 border-border shadow-md"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-sm font-medium text-foreground">{color.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-8" />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-accent hover:bg-accent/90 text-white"
                onClick={() => onContact(vehicle)}
              >
                <Calendar size={20} weight="bold" className="mr-2" />
                Schedule Test Drive
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex-1"
                onClick={() => onContact(vehicle)}
              >
                Contact Dealer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SpecItem({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
      {icon && <div className="text-accent">{icon}</div>}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider" style={{ fontFamily: 'Orbitron' }}>
          {label}
        </p>
        <p className="text-foreground font-semibold">{value}</p>
      </div>
    </div>
  )
}
