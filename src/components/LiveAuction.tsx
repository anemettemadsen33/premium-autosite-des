import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Gavel, Clock, TrendUp, User } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import type { AuctionData, Bid } from '@/lib/types'

interface LiveAuctionProps {
  auction: AuctionData
  listingId: string
  currentUserId?: string
}

export function LiveAuction({ auction, listingId, currentUserId }: LiveAuctionProps) {
  const [auctionData, setAuctionData] = useKV<AuctionData>(`auction-${auction.id}`, auction)
  const [bidAmount, setBidAmount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState('')
  const [isAutoBidEnabled, setIsAutoBidEnabled] = useState(false)
  const [maxAutoBid, setMaxAutoBid] = useState(0)

  useEffect(() => {
    if (!auctionData) return
    
    setBidAmount(auctionData.currentBid + auctionData.bidIncrement)
    
    const interval = setInterval(() => {
      const now = new Date()
      const end = new Date(auctionData.endTime)
      const diff = end.getTime() - now.getTime()
      
      if (diff <= 0) {
        setTimeRemaining('ENDED')
        clearInterval(interval)
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [auctionData?.endTime, auctionData?.currentBid])

  const placeBid = async (amount: number, isAuto: boolean = false) => {
    if (!currentUserId) {
      toast.error('Please log in to place a bid')
      return
    }

    if (!auctionData) return

    if (amount < auctionData.currentBid + auctionData.bidIncrement) {
      toast.error(`Minimum bid is €${(auctionData.currentBid + auctionData.bidIncrement).toLocaleString()}`)
      return
    }

    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      auctionId: auction.id,
      bidderId: currentUserId,
      amount,
      timestamp: new Date().toISOString(),
      isAutoBid: isAuto
    }

    const updatedBids = [...(auctionData.bids || []), newBid]
    const updatedAuction: AuctionData = {
      ...auctionData,
      currentBid: amount,
      totalBids: (auctionData.totalBids || 0) + 1,
      leadingBidderId: currentUserId,
      bids: updatedBids
    }

    setAuctionData(updatedAuction)
    
    toast.success(isAuto ? 'Auto-bid placed!' : 'Bid placed successfully!', {
      description: `Your bid of €${amount.toLocaleString()} has been recorded`
    })
  }

  const handleManualBid = () => {
    placeBid(bidAmount, false)
  }

  const enableAutoBid = () => {
    if (maxAutoBid < bidAmount) {
      toast.error('Max auto-bid must be higher than current bid')
      return
    }
    setIsAutoBidEnabled(true)
    toast.success('Auto-bidding enabled', {
      description: `Will auto-bid up to €${maxAutoBid.toLocaleString()}`
    })
  }

  if (!auctionData) return null

  const isLeading = auctionData.leadingBidderId === currentUserId
  const hasEnded = timeRemaining === 'ENDED'
  const isEndingSoon = !hasEnded && timeRemaining.includes('0h 0m')

  return (
    <Card className="border-accent/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gavel className="text-accent" weight="fill" />
            Live Auction
            {auctionData.status === 'live' && (
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            )}
            {isEndingSoon && (
              <Badge variant="destructive">
                Ending Soon!
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <Clock weight="fill" />
            <span className="font-mono font-bold">{timeRemaining}</span>
          </div>
        </div>
        <CardDescription>
          Place your bid before the auction ends
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Current Bid</div>
            <div className="text-2xl font-bold text-accent">
              €{auctionData.currentBid.toLocaleString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Bids</div>
            <div className="text-2xl font-bold">{auctionData.totalBids}</div>
          </div>
        </div>

        {isLeading && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-lg bg-green-500/10 border border-green-500/50 p-3 text-sm font-medium text-green-700 dark:text-green-400"
          >
            🎉 You're currently the leading bidder!
          </motion.div>
        )}

        {!hasEnded && (
          <>
            <Separator />
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={auctionData.currentBid + auctionData.bidIncrement}
                  step={auctionData.bidIncrement}
                  className="flex-1"
                  placeholder="Enter bid amount"
                />
                <Button onClick={handleManualBid} disabled={!currentUserId}>
                  <TrendUp className="mr-2" />
                  Place Bid
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Minimum bid: €{(auctionData.currentBid + auctionData.bidIncrement).toLocaleString()}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="text-sm font-medium">Auto-Bidding</div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={maxAutoBid}
                  onChange={(e) => setMaxAutoBid(Number(e.target.value))}
                  placeholder="Max auto-bid amount"
                  disabled={isAutoBidEnabled}
                />
                <Button 
                  onClick={enableAutoBid}
                  variant={isAutoBidEnabled ? 'secondary' : 'outline'}
                  disabled={isAutoBidEnabled || !currentUserId}
                >
                  {isAutoBidEnabled ? 'Active' : 'Enable'}
                </Button>
              </div>
              {isAutoBidEnabled && (
                <div className="text-xs text-green-600 dark:text-green-400">
                  ✓ Auto-bidding active up to €{maxAutoBid.toLocaleString()}
                </div>
              )}
            </div>
          </>
        )}

        {hasEnded && (
          <div className="rounded-lg bg-muted p-4 text-center">
            <div className="text-lg font-bold">Auction Ended</div>
            {isLeading ? (
              <div className="text-green-600 dark:text-green-400 mt-2">
                Congratulations! You won this auction! 🎉
              </div>
            ) : (
              <div className="text-muted-foreground mt-2">
                Final Price: €{auctionData.currentBid.toLocaleString()}
              </div>
            )}
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <div className="text-sm font-medium">Recent Bids</div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {auctionData.bids?.slice(-5).reverse().map((bid, idx) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between text-sm p-2 rounded bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-medium">
                      {bid.bidderId === currentUserId ? 'You' : `Bidder ${bid.bidderId.slice(0, 6)}`}
                    </span>
                    {bid.isAutoBid && (
                      <Badge variant="outline" className="text-xs">Auto</Badge>
                    )}
                  </div>
                  <span className="font-bold">€{bid.amount.toLocaleString()}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
