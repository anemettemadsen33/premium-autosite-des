import { motion } from 'framer-motion'
import { Vehicle } from '@/lib/types'
import { Badge } from './ui/badge'
import { Engine, Lightning, Gauge } from '@phosphor-icons/react'

interface VehicleCardProps {
  vehicle: Vehicle
  onClick: () => void
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 border border-border/50 hover:border-accent/20 backdrop-blur-sm">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          <img 
            src={vehicle.image} 
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {vehicle.isNew && (
            <Badge className="absolute top-5 right-5 bg-gradient-to-r from-accent to-purple-500 text-white border-0 shadow-lg px-3 py-1">
              NEW
            </Badge>
          )}

          {vehicle.isFeatured && (
            <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
              <span className="text-xs text-white font-semibold tracking-wide">★ FEATURED</span>
            </div>
          )}
        </div>

        <div className="p-7">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                {vehicle.name}
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1" style={{ fontFamily: 'Orbitron' }}>
                {vehicle.brand} • {vehicle.year}
              </p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
            {vehicle.description}
          </p>

          <div className="flex items-center gap-5 mb-5 text-sm">
            <div className="flex items-center gap-1.5">
              <Engine size={20} weight="duotone" className="text-accent" />
              <span className="text-foreground font-medium">{vehicle.specs.horsepower}hp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lightning size={20} weight="duotone" className="text-accent" />
              <span className="text-foreground font-medium">{vehicle.specs.acceleration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge size={20} weight="duotone" className="text-accent" />
              <span className="text-foreground font-medium">{vehicle.specs.topSpeed}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-medium">Starting at</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                ${vehicle.price.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all duration-300">
              <span>View Details</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
