"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { CalendarDays, Clock, FileText, Search, Users } from "lucide-react"
import { routes } from "@/lib/routes"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock IRA events data - in a real app, this would come from an API
const iraEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    time: "10:00 AM - 1:00 PM",
    venue: "Main Auditorium",
    faculty: "Dr. Sarah Wilson",
    department: "Computer Science",
    registeredStudents: 30,
    maxCapacity: 50,
    registrationDeadline: "2023-12-14",
    isRegistered: false,
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    time: "2:00 PM - 5:00 PM",
    venue: "Room 101",
    faculty: "Dr. Mark Davis",
    department: "Electrical Engineering",
    registeredStudents: 25,
    maxCapacity: 30,
    registrationDeadline: "2023-12-19",
    isRegistered: true,
  },
  {
    id: "3",
    name: "Hackathon 2023",
    date: "2024-01-10",
    time: "9:00 AM - 6:00 PM",
    venue: "Innovation Hub",
    faculty: "Prof. Robert Johnson",
    department: "Information Technology",
    registeredStudents: 40,
    maxCapacity: 50,
    registrationDeadline: "2024-01-09",
    isRegistered: false,
  },
  {
    id: "4",
    name: "Cloud Computing Seminar",
    date: "2024-01-25",
    time: "11:00 AM - 1:00 PM",
    venue: "Conference Room",
    faculty: "Dr. Emily Chen",
    department: "Computer Science",
    registeredStudents: 20,
    maxCapacity: 40,
    registrationDeadline: "2024-01-24",
    isRegistered: false,
  },
]

export default function IraRegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isRegistering, setIsRegistering] = useState(false)

  const filteredEvents = iraEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRegister = (event: any) => {
    setSelectedEvent(event)
  }

  const confirmRegistration = () => {
    setIsRegistering(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: `You have registered for ${selectedEvent.name}`,
      })
      setIsRegistering(false)
      setSelectedEvent(null)

      // In a real app, we would update the state after API call
      router.refresh()
    }, 1500)
  }

  return (
    <>
      <PageHeader
        title="Register for IRA"
        description="Browse and register for Internal Review Assessment events"
        backHref={routes.dashboard.student}
      />

      <div className="relative mb-6 mt-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search IRA events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No IRA events found</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? "Try a different search term" : "There are no IRA events available for registration"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <Card
              key={event.id}
              className="card-hover overflow-hidden border-none shadow-md"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                <CardTitle className="text-sm font-medium">{event.name}</CardTitle>
                <Badge
                  variant={new Date(event.registrationDeadline) < new Date() ? "destructive" : "outline"}
                  className="transition-all hover:scale-105"
                >
                  {new Date(event.registrationDeadline) < new Date() ? "Closed" : "Open"}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString()} | {event.time}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Venue: {event.venue}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Faculty: {event.faculty}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    Capacity: {event.registeredStudents}/{event.maxCapacity}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                </div>
                <div className="mt-4">
                  {event.isRegistered ? (
                    <Badge variant="success" className="w-full flex justify-center py-1 transition-all hover:scale-105">
                      Registered
                    </Badge>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group relative overflow-hidden"
                      onClick={() => handleRegister(event)}
                      disabled={
                        new Date(event.registrationDeadline) < new Date() ||
                        event.registeredStudents >= event.maxCapacity
                      }
                    >
                      <span className="relative z-10">
                        {new Date(event.registrationDeadline) < new Date()
                          ? "Registration Closed"
                          : event.registeredStudents >= event.maxCapacity
                            ? "Fully Booked"
                            : "Register"}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Registration Confirmation Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              You are about to register for the following IRA event. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium">{selectedEvent.name}</h4>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(selectedEvent.date).toLocaleDateString()} | {selectedEvent.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" />
                    <span>{selectedEvent.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Faculty: {selectedEvent.faculty}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                By registering, you agree to attend the event and participate in all activities. You must be present for
                the entire duration of the event to receive IRA credits.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Cancel
            </Button>
            <Button onClick={confirmRegistration} disabled={isRegistering} className="relative overflow-hidden">
              {isRegistering ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="relative z-10">Confirm Registration</span>
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
