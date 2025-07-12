"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { routes } from "@/lib/routes"

// Mock events data - in a real app, this would come from an API
const pendingSlotEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    level: "Level 1",
    registeredStudents: 30,
    slotStatus: "Not Allocated",
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    level: "Level 2",
    registeredStudents: 25,
    slotStatus: "Not Allocated",
  },
]

const allocatedSlotEvents = [
  {
    id: "3",
    name: "Cloud Computing Workshop",
    date: "2023-12-25",
    level: "Level 1",
    registeredStudents: 20,
    venue: "Main Auditorium",
    capacity: 50,
    slotStatus: "Allocated",
  },
  {
    id: "4",
    name: "Data Science Symposium",
    date: "2024-01-05",
    level: "Level 2",
    registeredStudents: 15,
    venue: "Room 101",
    capacity: 30,
    slotStatus: "Allocated",
  },
]

// Mock venues data - in a real app, this would come from an API
const venues = [
  { id: "1", name: "Main Auditorium", capacity: 100 },
  { id: "2", name: "Room 101", capacity: 30 },
  { id: "3", name: "Room 102", capacity: 30 },
  { id: "4", name: "Innovation Hub", capacity: 50 },
  { id: "5", name: "Conference Room", capacity: 40 },
]

export default function AllocateSlotsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [allocations, setAllocations] = useState<Record<string, { venueId: string; capacity: string }>>({})
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isAllocating, setIsAllocating] = useState(false)

  const handleVenueChange = (eventId: string, venueId: string) => {
    const venue = venues.find((v) => v.id === venueId)
    setAllocations((prev) => ({
      ...prev,
      [eventId]: {
        venueId,
        capacity: venue ? venue.capacity.toString() : prev[eventId]?.capacity || "",
      },
    }))
  }

  const handleCapacityChange = (eventId: string, capacity: string) => {
    // Ensure only numbers are entered
    if (capacity === "" || /^\d+$/.test(capacity)) {
      setAllocations((prev) => ({
        ...prev,
        [eventId]: {
          venueId: prev[eventId]?.venueId || "",
          capacity,
        },
      }))
    }
  }

  const handleAllocate = (event: any) => {
    setSelectedEvent(event)
  }

  const confirmAllocation = () => {
    const eventId = selectedEvent.id
    const allocation = allocations[eventId]

    if (!allocation?.venueId || !allocation?.capacity) {
      toast({
        title: "Missing Information",
        description: "Please select a venue and specify capacity",
        variant: "destructive",
      })
      return
    }

    setIsAllocating(true)

    // Find the venue name for the toast message
    const venue = venues.find((v) => v.id === allocation.venueId)

    // Mock submission - in a real app, this would call an API
    setTimeout(() => {
      toast({
        title: "Slot Allocated",
        description: `${venue?.name} has been allocated with capacity of ${allocation.capacity}`,
      })
      setIsAllocating(false)
      setSelectedEvent(null)

      // In a real app, we would refresh the data from the API
      // For now, we'll just redirect back to the dashboard
      router.push(routes.dashboard.head)
    }, 1500)
  }

  return (
    <>
      <PageHeader
        title="Allocate Slots"
        description="Assign venues and capacities to approved events"
        backHref={routes.dashboard.head}
      />

      <Tabs defaultValue="pending" className="space-y-6 mt-6">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger
            value="pending"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            Pending Allocation
          </TabsTrigger>
          <TabsTrigger
            value="allocated"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            Allocated
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingSlotEvents.map((event) => (
              <Card key={event.id} className="card-hover overflow-hidden border-none shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                  <CardTitle className="text-sm font-medium">{event.name}</CardTitle>
                  <Badge
                    variant={event.level === "Level 1" ? "default" : "secondary"}
                    className="transition-all hover:scale-105"
                  >
                    {event.level}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Registered Students: {event.registeredStudents}</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`venue-${event.id}`}>Venue</Label>
                    <Select
                      value={allocations[event.id]?.venueId || ""}
                      onValueChange={(value) => handleVenueChange(event.id, value)}
                    >
                      <SelectTrigger
                        id={`venue-${event.id}`}
                        className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                      >
                        <SelectValue placeholder="Select venue" />
                      </SelectTrigger>
                      <SelectContent>
                        {venues.map((venue) => (
                          <SelectItem key={venue.id} value={venue.id}>
                            {venue.name} (Capacity: {venue.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`capacity-${event.id}`}>Allocated Capacity</Label>
                    <Input
                      id={`capacity-${event.id}`}
                      type="text"
                      value={allocations[event.id]?.capacity || ""}
                      onChange={(e) => handleCapacityChange(event.id, e.target.value)}
                      placeholder="Enter capacity"
                      className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                    />
                  </div>

                  <Button
                    onClick={() => handleAllocate(event)}
                    disabled={!allocations[event.id]?.venueId || !allocations[event.id]?.capacity}
                    className="w-full group relative overflow-hidden"
                  >
                    <span className="relative z-10">Allocate Slot</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="allocated" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allocatedSlotEvents.map((event) => (
              <Card key={event.id} className="card-hover overflow-hidden border-none shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                  <CardTitle className="text-sm font-medium">{event.name}</CardTitle>
                  <Badge
                    variant={event.level === "Level 1" ? "default" : "secondary"}
                    className="transition-all hover:scale-105"
                  >
                    {event.level}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Registered Students: {event.registeredStudents}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Venue:</div>
                    <div>{event.venue}</div>

                    <div className="font-medium">Capacity:</div>
                    <div>{event.capacity}</div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      // In a real app, this would call an API to modify the allocation
                      toast({
                        title: "Modify Allocation",
                        description: "This would allow you to modify the venue or capacity",
                      })
                    }}
                    className="w-full group relative overflow-hidden"
                  >
                    <span className="relative z-10">Modify Allocation</span>
                    <span className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Allocation Confirmation Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Slot Allocation</DialogTitle>
            <DialogDescription>
              You are about to allocate a slot for the following event. Please confirm the details.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium">{selectedEvent.name}</h4>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Registered Students: {selectedEvent.registeredStudents}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Venue:</span>
                  <span>
                    {venues.find((v) => v.id === allocations[selectedEvent.id]?.venueId)?.name || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Capacity:</span>
                  <span>{allocations[selectedEvent.id]?.capacity || "Not specified"}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Cancel
            </Button>
            <Button onClick={confirmAllocation} disabled={isAllocating} className="relative overflow-hidden">
              {isAllocating ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="relative z-10">Confirm Allocation</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
