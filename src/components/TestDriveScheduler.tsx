import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Car, Calendar as CalendarIcon, Clock } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import type { TestDriveRequest } from '@/lib/types'

interface TestDriveSchedulerProps {
  listingId: string
  listingTitle: string
  sellerId: string
  currentUserId?: string
}

export function TestDriveScheduler({ listingId, listingTitle, sellerId, currentUserId }: TestDriveSchedulerProps) {
  const [requests, setRequests] = useKV<TestDriveRequest[]>(`testdrive-requests-${listingId}`, [])
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)

  const userRequests = requests?.filter(r => r.requesterId === currentUserId) || []
  const hasPendingRequest = userRequests.some(r => r.status === 'pending' || r.status === 'approved')

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ]

  const submitRequest = () => {
    if (!currentUserId) {
      toast.error('Please log in to schedule a test drive')
      return
    }

    if (!date || !time) {
      toast.error('Please select both date and time')
      return
    }

    const newRequest: TestDriveRequest = {
      id: `testdrive-${Date.now()}`,
      listingId,
      requesterId: currentUserId,
      preferredDate: date.toISOString(),
      preferredTime: time,
      status: 'pending',
      message: message || undefined,
      createdAt: new Date().toISOString()
    }

    setRequests((current) => [...(current || []), newRequest])
    
    toast.success('Test drive request submitted!', {
      description: 'The seller will review your request and get back to you soon.'
    })

    setShowForm(false)
    setDate(undefined)
    setTime('')
    setMessage('')
  }

  const getStatusBadge = (status: TestDriveRequest['status']) => {
    const config = {
      pending: { variant: 'secondary' as const, label: 'Pending' },
      approved: { variant: 'default' as const, label: 'Approved' },
      rejected: { variant: 'destructive' as const, label: 'Rejected' },
      completed: { variant: 'outline' as const, label: 'Completed' }
    }
    const statusConfig = config[status]
    return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="text-accent" weight="fill" />
          Schedule Test Drive
        </CardTitle>
        <CardDescription>
          Request a test drive for {listingTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showForm && !hasPendingRequest && (
          <Button 
            onClick={() => setShowForm(true)}
            className="w-full"
            size="lg"
          >
            <CalendarIcon className="mr-2" weight="fill" />
            Request Test Drive
          </Button>
        )}

        {hasPendingRequest && !showForm && (
          <div className="rounded-lg bg-accent/10 border border-accent/50 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-accent" weight="fill" />
              <span className="font-medium">Active Request</span>
            </div>
            {userRequests.filter(r => r.status === 'pending' || r.status === 'approved').map(request => (
              <div key={request.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {format(new Date(request.preferredDate), 'PPP')} at {request.preferredTime}
                  </span>
                  {getStatusBadge(request.status)}
                </div>
                {request.status === 'approved' && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    ✓ Your test drive has been approved! The seller will contact you soon.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2" />
                    {date ? format(date, 'PPP') : 'Select a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(slot => (
                    <SelectItem key={slot} value={slot}>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {slot}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Message (Optional)</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any specific questions or requirements?"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={submitRequest} className="flex-1">
                Submit Request
              </Button>
              <Button 
                onClick={() => setShowForm(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {userRequests.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <div className="text-sm font-medium">Your Request History</div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {userRequests.map(request => (
                <div key={request.id} className="p-3 rounded bg-muted text-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span>
                      {format(new Date(request.preferredDate), 'MMM d, yyyy')} at {request.preferredTime}
                    </span>
                    {getStatusBadge(request.status)}
                  </div>
                  {request.message && (
                    <p className="text-xs text-muted-foreground">{request.message}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
