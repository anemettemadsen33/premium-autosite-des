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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl">
        <div className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 transition-all backdrop-blur-sm hover:scale-110"
          >
            <X size={24} weight="bold" />
          </button>

          <div className="relative h-[450px] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={vehicle.images[currentImageIndex]}
                alt={vehicle.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all backdrop-blur-sm hover:scale-110"
                >
                  <CaretLeft size={24} weight="bold" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all backdrop-blur-sm hover:scale-110"
                >
                  <CaretRight size={24} weight="bold" />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-5xl font-bold text-foreground mb-3 tracking-tight">
                  {vehicle.name}
                </h2>
                <p className="text-lg text-muted-foreground uppercase tracking-widest font-semibold" style={{ fontFamily: 'Orbitron' }}>
                  {vehicle.brand} • {vehicle.year}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2 font-medium">Starting at</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
                  ${vehicle.price.toLocaleString()}
                </p>
              </div>
            </div>

            {vehicle.isNew && (
              <Badge className="bg-gradient-to-r from-accent to-purple-500 text-white border-0 mb-6 px-4 py-1.5 text-sm shadow-lg">
                NEW 2024 MODEL
              </Badge>
            )}

            <p className="text-foreground leading-relaxed mb-10 text-lg font-light">
              {vehicle.description}
            </p>

            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-muted/50 p-1.5 rounded-xl">
                <TabsTrigger value="specs" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">Specifications</TabsTrigger>
                <TabsTrigger value="features" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">Features</TabsTrigger>
                <TabsTrigger value="colors" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">Colors</TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-accent/5 hover:to-accent/10 transition-all group">
                      <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform" />
                      <span className="text-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="colors">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {vehicle.colors.map((color) => (
                    <div 
                      key={color.name}
                      className="flex items-center gap-4 p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl hover:from-accent/5 hover:to-accent/10 transition-all cursor-pointer group border border-border/30 hover:border-accent/30"
                    >
                      <div 
                        className="w-14 h-14 rounded-full border-4 border-border/50 shadow-lg group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-sm font-semibold text-foreground">{color.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-10" />

            <div className="flex flex-col sm:flex-row gap-5">
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-accent to-purple-500 hover:from-accent/90 hover:to-purple-600 text-white h-14 text-base rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                onClick={() => onContact(vehicle)}
              >
                <Calendar size={22} weight="bold" className="mr-2" />
                Schedule Test Drive
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex-1 h-14 text-base rounded-xl border-2 hover:border-accent hover:bg-accent/5 transition-all"
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
    <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl hover:from-accent/5 hover:to-accent/10 transition-all group border border-border/30">
      {icon && <div className="text-accent group-hover:scale-110 transition-transform">{icon}</div>}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-semibold" style={{ fontFamily: 'Orbitron' }}>
          {label}
        </p>
        <p className="text-foreground font-bold text-base">{value}</p>
      </div>
    </div>
  )
}
