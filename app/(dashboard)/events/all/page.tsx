"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { CalendarDays, FileText, Search, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { routes } from "@/lib/routes"

// Mock events data - in a real app, this would come from an API
const allEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    status: "Approved",
    level: "Level 1",
    organizer: "John Doe",
    department: "Computer Science",
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    status: "Pending",
    organizer: "Jane Smith",
    department: "Electrical Engineering",
  },
  {
    id: "3",
    name: "Hackathon 2023",
    date: "2024-01-10",
    status: "Approved",
    level: "Level 2",
    organizer: "Mike Brown",
    department: "Information Technology",
  },
  {
    id: "4",
    name: "Cloud Computing Seminar",
    date: "2024-01-25",
    status: "Rejected",
    organizer: "Sarah Wilson",
    department: "Computer Science",
    rejectionReason: "Similar event already scheduled in the same week.",
  },
  {
    id: "5",
    name: "Mobile App Development Workshop",
    date: "2024-01-15",
    status: "Approved",
    level: "Level 1",
    organizer: "David Lee",
    department: "Information Technology",
  },
  {
    id: "6",
    name: "Web Security Seminar",
    date: "2024-02-05",
    status: "Approved",
    level: "Level 2",
    organizer: "Emily Chen",
    department: "Computer Science",
  },
]

export default function AllEventsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? event.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  return (
    <>
      <PageHeader
        title="All Events"
        description="View and manage all events in the system"
        backHref={routes.dashboard.admin}
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
            className="min-w-[80px]"
          >
            All
          </Button>
          <Button
            variant={statusFilter === "Approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Approved")}
            className="min-w-[80px]"
          >
            Approved
          </Button>
          <Button
            variant={statusFilter === "Pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Pending")}
            className="min-w-[80px]"
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "Rejected" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Rejected")}
            className="min-w-[80px]"
          >
            Rejected
          </Button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm || statusFilter ? "Try different search terms or filters" : "There are no events in the system"}
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
                  variant={
                    event.status === "Approved" ? "success" : event.status === "Rejected" ? "destructive" : "outline"
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
                  <User className="h-4 w-4" />
                  <span>Organizer: {event.organizer}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Department: {event.department}</span>
                </div>
                {event.status === "Rejected" && event.rejectionReason && (
                  <div className="mt-2 text-sm text-destructive">
                    <span className="font-medium">Reason: </span>
                    {event.rejectionReason}
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group relative overflow-hidden"
                    onClick={() => router.push(routes.events.view(event.id))}
                  >
                    <span className="relative z-10">View Details</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
