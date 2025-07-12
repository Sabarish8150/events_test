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

// Mock IRA events data - in a real app, this would come from an API
const assignedEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    venue: "Main Auditorium",
    department: "Computer Science",
    registeredStudents: 30,
    maxCapacity: 50,
    reviewStatus: "Pending",
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    venue: "Room 101",
    department: "Electrical Engineering",
    registeredStudents: 25,
    maxCapacity: 30,
    reviewStatus: "Completed",
  },
  {
    id: "3",
    name: "Cloud Computing Seminar",
    date: "2024-01-25",
    venue: "Conference Room",
    department: "Computer Science",
    registeredStudents: 20,
    maxCapacity: 40,
    reviewStatus: "Pending",
  },
]

export default function ManageIraPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEvents = assignedEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <PageHeader
        title="Manage IRA Events"
        description="Review and grade students for assigned Internal Review Assessment events"
        backHref={routes.dashboard.faculty}
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
          <h3 className="text-lg font-medium">No assigned events found</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? "Try a different search term" : "You haven't been assigned to any IRA events yet"}
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
                  variant={event.reviewStatus === "Completed" ? "success" : "outline"}
                  className="transition-all hover:scale-105"
                >
                  {event.reviewStatus}
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
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    Registered: {event.registeredStudents}/{event.maxCapacity}
                  </span>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group relative overflow-hidden"
                    onClick={() => router.push(routes.ira.review(event.id))}
                    disabled={event.reviewStatus === "Completed"}
                  >
                    <span className="relative z-10">
                      {event.reviewStatus === "Completed" ? "Review Completed" : "Review Students"}
                    </span>
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
