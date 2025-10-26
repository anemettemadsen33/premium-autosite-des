import { motion } from 'framer-motion'

interface CategoryPageHeaderProps {
  category: string
  listingCount: number
}

export function CategoryPageHeader({ category, listingCount }: CategoryPageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary via-accent to-purple-600 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-3 capitalize">{category}</h1>
          <p className="text-white/90 text-lg">
            {listingCount} {listingCount === 1 ? 'listing' : 'listings'} available
          </p>
        </motion.div>
      </div>
    </div>
  )
}
