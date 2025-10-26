import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useAuth } from '@/lib/auth'
import { useListings } from '@/lib/listings'
import { Listing } from '@/lib/types'
import { Article, Eye, Pencil, Trash, Plus } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface MyListingsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function MyListingsPage({ onNavigate }: MyListingsPageProps) {
  const { user } = useAuth()
  const { listings, deleteListing } = useListings()
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const myListings = listings.filter(l => l.userId === user?.id)

  const handleDelete = (listingId: string) => {
    deleteListing(listingId)
    toast.success('Listing deleted')
    setDeleteConfirm(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Listings</h1>
            <p className="text-primary-foreground/80">{myListings.length} total listings</p>
          </div>
          <Button
            size="lg"
            className="gap-2 bg-white text-primary hover:bg-white/90"
            onClick={() => onNavigate('add-listing')}
          >
            <Plus size={20} weight="bold" />
            New Listing
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {myListings.length === 0 ? (
          <Card className="p-12 text-center">
            <Article size={64} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No listings yet</h2>
            <p className="text-muted-foreground mb-6">Create your first listing to get started</p>
            <Button onClick={() => onNavigate('add-listing')} className="gap-2">
              <Plus size={20} weight="bold" />
              Create Listing
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onView={() => onNavigate('listing', { id: listing.id })}
                onDelete={() => setDeleteConfirm(listing.id)}
              />
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Listing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function ListingCard({
  listing,
  onView,
  onDelete
}: {
  listing: Listing
  onView: () => void
  onDelete: () => void
}) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all">
      <div className="aspect-video relative overflow-hidden bg-muted">
        {listing.images[0] && (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <Badge
          className="absolute top-2 right-2"
          variant={listing.status === 'active' ? 'default' : 'secondary'}
        >
          {listing.status}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Eye size={16} weight="duotone" />
          <span>{listing.views} views</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-accent">${listing.price.toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1 gap-1">
            <Eye size={16} weight="duotone" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete} className="gap-1">
            <Trash size={16} weight="duotone" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
