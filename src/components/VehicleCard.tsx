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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img 
            src={vehicle.image} 
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {vehicle.isNew && (
            <Badge className="absolute top-4 right-4 bg-accent text-white border-0">
              NEW
            </Badge>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                {vehicle.name}
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium" style={{ fontFamily: 'Orbitron' }}>
                {vehicle.brand} • {vehicle.year}
              </p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {vehicle.description}
          </p>

          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Engine size={18} weight="duotone" className="text-accent" />
              <span>{vehicle.specs.horsepower}hp</span>
            </div>
            <div className="flex items-center gap-1">
              <Lightning size={18} weight="duotone" className="text-accent" />
              <span>{vehicle.specs.acceleration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge size={18} weight="duotone" className="text-accent" />
              <span>{vehicle.specs.topSpeed}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Starting at</p>
              <p className="text-2xl font-bold text-foreground">
                ${vehicle.price.toLocaleString()}
              </p>
            </div>
            <div className="text-accent font-semibold group-hover:translate-x-1 transition-transform">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
