"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { useToast } from "@/hooks/use-toast"
import { routes } from "@/lib/routes"

// Mock user data - in a real app, this would come from an API or auth context
const user = {
  name: "Prof. Robert Johnson",
  email: "robert.johnson@office.edu",
  role: "head",
}

// Mock events data - in a real app, this would come from an API
const pendingEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    organizer: "John Doe",
    submittedOn: "2023-11-10",
    type: "Technical Paper",
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    organizer: "Jane Smith",
    submittedOn: "2023-11-12",
    type: "IEEE",
  },
  {
    id: "3",
    name: "Hackathon 2023",
    date: "2024-01-10",
    organizer: "Mike Brown",
    submittedOn: "2023-11-15",
    type: "Project",
  },
]

const approvedEvents = [
  {
    id: "4",
    name: "Mobile App Development Workshop",
    date: "2024-01-15",
    level: "Level 1",
    slotAllocated: true,
    registeredStudents: 30,
  },
  {
    id: "5",
    name: "Web Security Seminar",
    date: "2024-02-05",
    level: "Level 2",
    slotAllocated: false,
    registeredStudents: 25,
  },
]

const iraEvents = [
  {
    id: "6",
    name: "Cloud Computing Workshop",
    date: "2023-12-25",
    assignedFaculty: "Dr. Sarah Wilson",
    registeredStudents: 20,
    reviewStatus: "Pending",
  },
  {
    id: "7",
    name: "Data Science Symposium",
    date: "2024-01-05",
    assignedFaculty: "Dr. Mark Davis",
    registeredStudents: 15,
    reviewStatus: "Completed",
  },
]

export default function HeadDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("pending-events")

  return (
    <>
      <PageHeader title="Head Dashboard" description="Manage event approvals, IRA assignments, and slot allocations" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-6">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger
            value="pending-events"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            Pending Events
          </TabsTrigger>
          <TabsTrigger
            value="approved-events"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            Approved Events
          </TabsTrigger>
          <TabsTrigger
            value="ira-events"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            IRA Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending-events" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingEvents.map((event, index) => (
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
                    <Users className="h-4 w-4" />
                    <span>Organizer: {event.organizer}</span>
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
        </TabsContent>

        <TabsContent value="approved-events" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {approvedEvents.map((event, index) => (
              <Card
                key={event.id}
                className="card-hover overflow-hidden border-none shadow-md"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
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
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Registered: {event.registeredStudents}</span>
                  </div>
                  <div className="mt-2">
                    <Badge
                      variant={event.slotAllocated ? "success" : "outline"}
                      className="mt-2 transition-all hover:scale-105"
                    >
                      {event.slotAllocated ? "Slot Allocated" : "No Slot Allocated"}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    {!event.slotAllocated && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group relative overflow-hidden"
                        onClick={() => router.push(routes.slots.allocate)}
                      >
                        <span className="relative z-10">Allocate Slot</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ira-events" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {iraEvents.map((event, index) => (
              <Card
                key={event.id}
                className="card-hover overflow-hidden border-none shadow-md"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg -z-10" />
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
                    <Users className="h-4 w-4" />
                    <span>Faculty: {event.assignedFaculty}</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Registered: {event.registeredStudents}</span>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group relative overflow-hidden"
                      onClick={() => router.push(routes.ira.results)}
                    >
                      <span className="relative z-10">View Results</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
