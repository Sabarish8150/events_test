"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import Link from "next/link"
import { CalendarDays, CheckCircle, Clock, FileText, PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { routes } from "@/lib/routes"

// Mock events data - in a real app, this would come from an API
const approvedEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    location: "Main Auditorium",
    status: "Approved",
    level: "Level 1",
    registered: true,
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    location: "Room 101",
    status: "Approved",
    level: "Level 2",
    registered: false,
  },
  {
    id: "3",
    name: "Hackathon 2023",
    date: "2024-01-10",
    location: "Innovation Hub",
    status: "Approved",
    level: "Level 1",
    registered: true,
  },
  {
    id: "4",
    name: "Cloud Computing Seminar",
    date: "2024-01-25",
    location: "Conference Room",
    status: "Approved",
    level: "Level 2",
    registered: false,
  },
]

const myEvents = [
  {
    id: "5",
    name: "Mobile App Development Workshop",
    date: "2024-01-15",
    status: "Pending",
    submittedOn: "2023-11-25",
  },
  {
    id: "6",
    name: "Web Security Seminar",
    date: "2024-02-05",
    status: "Approved",
    level: "Level 2",
    submittedOn: "2023-11-20",
  },
]

const iraResults = [
  {
    id: "1",
    eventName: "Tech Conference 2023",
    date: "2023-12-10",
    marks: 85,
    status: "Passed",
  },
  {
    id: "3",
    eventName: "Hackathon 2023",
    date: "2023-12-05",
    marks: 90,
    status: "Passed",
  },
]

export default function StudentDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isRegistering, setIsRegistering] = useState(false)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredApprovedEvents = approvedEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredMyEvents = myEvents.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredIraResults = iraResults.filter((result) =>
    result.eventName.toLowerCase().includes(searchTerm.toLowerCase()),
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
      // For now, we'll just redirect to the dashboard
      router.refresh()
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Student Dashboard"
        description="Manage your events and IRA registrations"
        actions={
          <Link href={routes.events.submit}>
            <Button className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit New Event
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </Link>
        }
      />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
        />
      </div>

      <Tabs defaultValue="approved-events" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger
            value="approved-events"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            Approved Events
          </TabsTrigger>
          <TabsTrigger
            value="my-events"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            My Events
          </TabsTrigger>
          <TabsTrigger
            value="ira-results"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            IRA Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approved-events" className="space-y-4">
          {filteredApprovedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "There are no approved events at the moment"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredApprovedEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="card-hover overflow-hidden border-none shadow-md"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
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
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="mt-4">
                      {event.registered ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 transition-all hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Registered
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full group relative overflow-hidden"
                          onClick={() => handleRegister(event)}
                        >
                          <span className="relative z-10">Register</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-events" className="space-y-4">
          {filteredMyEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "You haven't submitted any events yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMyEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="card-hover overflow-hidden border-none shadow-md"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                    <CardTitle className="text-sm font-medium">{event.name}</CardTitle>
                    <Badge
                      variant={
                        event.status === "Approved"
                          ? "success"
                          : event.status === "Rejected"
                            ? "destructive"
                            : "outline"
                      }
                      className="transition-all hover:scale-105"
                    >
                      {event.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Submitted: {new Date(event.submittedOn).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-4">
                      <Link href={routes.events.view(event.id)}>
                        <Button variant="outline" size="sm" className="w-full group relative overflow-hidden">
                          <span className="relative z-10">View Details</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ira-results" className="space-y-4">
          {filteredIraResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No IRA results found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "You haven't participated in any IRA events yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredIraResults.map((result, index) => (
                <Card
                  key={result.id}
                  className="card-hover overflow-hidden border-none shadow-md"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg -z-10" />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                    <CardTitle className="text-sm font-medium">{result.eventName}</CardTitle>
                    <Badge
                      variant={result.status === "Passed" ? "success" : "destructive"}
                      className="transition-all hover:scale-105"
                    >
                      {result.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(result.date).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      <span>Marks: {result.marks}/100</span>
                    </div>
                    <div className="mt-4">
                      <Link href={`/ira/certificate/${result.id}`}>
                        <Button variant="outline" size="sm" className="w-full group relative overflow-hidden">
                          <span className="relative z-10">View Certificate</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Registration Confirmation Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              You are about to register for the following event. This action cannot be undone.
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
                    <FileText className="h-4 w-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                By registering, you agree to attend the event and participate in all activities.
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
