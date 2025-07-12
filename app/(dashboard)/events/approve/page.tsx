"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { CalendarDays, Clock, FileText, Search, User } from "lucide-react"
import { routes } from "@/lib/routes"

// Mock events data - in a real app, this would come from an API
const pendingEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    organizer: "John Doe",
    submittedOn: "2023-11-10",
    type: "Technical Paper",
    department: "Computer Science",
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    organizer: "Jane Smith",
    submittedOn: "2023-11-12",
    type: "IEEE",
    department: "Electrical Engineering",
  },
  {
    id: "3",
    name: "Hackathon 2023",
    date: "2024-01-10",
    organizer: "Mike Brown",
    submittedOn: "2023-11-15",
    type: "Project",
    department: "Information Technology",
  },
  {
    id: "4",
    name: "Mobile App Development Workshop",
    date: "2024-01-15",
    organizer: "David Lee",
    submittedOn: "2023-11-18",
    type: "Workshop",
    department: "Computer Science",
  },
  {
    id: "5",
    name: "Web Security Seminar",
    date: "2024-02-05",
    organizer: "Emily Chen",
    submittedOn: "2023-11-20",
    type: "Technical Paper",
    department: "Information Technology",
  },
]

export default function ApproveEventsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEvents = pendingEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <PageHeader
        title="Approve Events"
        description="Review and approve pending event proposals"
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
          <h3 className="text-lg font-medium">No pending events found</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? "Try a different search term" : "There are no events pending approval"}
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
                <Badge variant="outline" className="transition-all hover:scale-105">
                  {event.type}
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
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Submitted: {new Date(event.submittedOn).toLocaleDateString()}</span>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group relative overflow-hidden"
                    onClick={() => router.push(routes.events.review(event.id))}
                  >
                    <span className="relative z-10">Review</span>
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
