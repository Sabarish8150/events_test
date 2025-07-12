"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { CalendarDays, FileText, Search, Users } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock events data - in a real app, this would come from an API
const approvedEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    venue: "Main Auditorium",
    department: "Computer Science",
    assignedFaculty: null,
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    venue: "Room 101",
    department: "Electrical Engineering",
    assignedFaculty: "Dr. Mark Davis",
  },
  {
    id: "3",
    name: "Hackathon 2023",
    date: "2024-01-10",
    venue: "Innovation Hub",
    department: "Information Technology",
    assignedFaculty: null,
  },
  {
    id: "4",
    name: "Cloud Computing Seminar",
    date: "2024-01-25",
    venue: "Conference Room",
    department: "Computer Science",
    assignedFaculty: "Dr. Sarah Wilson",
  },
]

// Mock faculty data - in a real app, this would come from an API
const facultyMembers = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    department: "Computer Science",
    email: "sarah.wilson@office.edu",
  },
  {
    id: "2",
    name: "Dr. Mark Davis",
    department: "Electrical Engineering",
    email: "mark.davis@office.edu",
  },
  {
    id: "3",
    name: "Prof. Robert Johnson",
    department: "Information Technology",
    email: "robert.johnson@office.edu",
  },
  {
    id: "4",
    name: "Dr. Emily Chen",
    department: "Computer Science",
    email: "emily.chen@office.edu",
  },
  {
    id: "5",
    name: "Dr. Michael Brown",
    department: "Electrical Engineering",
    email: "michael.brown@office.edu",
  },
]

export default function AssignIraPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [selectedFaculty, setSelectedFaculty] = useState<string>("")
  const [isAssigning, setIsAssigning] = useState(false)

  const filteredEvents = approvedEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.assignedFaculty && event.assignedFaculty.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAssign = (event: any) => {
    setSelectedEvent(event)
    setSelectedFaculty("")
  }

  const confirmAssignment = () => {
    if (!selectedFaculty) {
      toast({
        title: "No Faculty Selected",
        description: "Please select a faculty member to assign",
        variant: "destructive",
      })
      return
    }

    setIsAssigning(true)

    // Mock API call
    setTimeout(() => {
      const faculty = facultyMembers.find((f) => f.id === selectedFaculty)
      toast({
        title: "Faculty Assigned",
        description: `${faculty?.name} has been assigned to ${selectedEvent.name}`,
      })
      setIsAssigning(false)
      setSelectedEvent(null)
      setSelectedFaculty("")

      // In a real app, we would update the state after API call
      router.refresh()
    }, 1500)
  }

  return (
    <>
      <PageHeader
        title="Assign IRA Faculty"
        description="Assign faculty members to approved events for Internal Review Assessment"
        backHref={routes.dashboard.head}
      />

      <div className="relative mb-6 mt-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? "Try a different search term" : "There are no approved events to assign faculty to"}
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
                  variant={event.assignedFaculty ? "success" : "outline"}
                  className="transition-all hover:scale-105"
                >
                  {event.assignedFaculty ? "Assigned" : "Unassigned"}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Venue: {event.venue}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Department: {event.department}</span>
                </div>
                {event.assignedFaculty && (
                  <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Faculty: {event.assignedFaculty}</span>
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group relative overflow-hidden"
                    onClick={() => handleAssign(event)}
                  >
                    <span className="relative z-10">
                      {event.assignedFaculty ? "Reassign Faculty" : "Assign Faculty"}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Assign Faculty Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Faculty</DialogTitle>
            <DialogDescription>Select a faculty member to assign for Internal Review Assessment.</DialogDescription>
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
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" />
                    <span>Venue: {selectedEvent.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Department: {selectedEvent.department}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                  <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                    <SelectValue placeholder="Select faculty member" />
                  </SelectTrigger>
                  <SelectContent>
                    {facultyMembers.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>
                        {faculty.name} ({faculty.department})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Cancel
            </Button>
            <Button onClick={confirmAssignment} disabled={isAssigning} className="relative overflow-hidden">
              {isAssigning ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="relative z-10">Assign Faculty</span>
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
