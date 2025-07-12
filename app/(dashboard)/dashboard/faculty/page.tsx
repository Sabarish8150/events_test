"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CalendarDays, Clock, FileText, PlusCircle, Search, Users } from "lucide-react"
import Link from "next/link"
// Import the routes from our routes file
import { routes } from "@/lib/routes"

// Mock events data - in a real app, this would come from an API
const myEvents = [
  {
    id: "1",
    name: "Mobile App Development Workshop",
    date: "2024-01-15",
    status: "Pending",
    submittedOn: "2023-11-25",
  },
  {
    id: "2",
    name: "Web Security Seminar",
    date: "2024-02-05",
    status: "Approved",
    level: "Level 2",
    submittedOn: "2023-11-20",
  },
]

const assignedIraEvents = [
  {
    id: "3",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    registeredStudents: 30,
    reviewStatus: "Pending",
  },
  {
    id: "4",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    registeredStudents: 25,
    reviewStatus: "Completed",
  },
]

export default function FacultyDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredMyEvents = myEvents.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredIraEvents = assignedIraEvents.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        title="Faculty Dashboard"
        description="Manage your events and IRA assignments"
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

      <Tabs defaultValue="my-events" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger
            value="my-events"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            My Events
          </TabsTrigger>
          <TabsTrigger
            value="ira-events"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            IRA Assignments
          </TabsTrigger>
        </TabsList>

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
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
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
        </TabsContent>

        <TabsContent value="ira-events" className="space-y-4">
          {filteredIraEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No IRA assignments found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "You haven't been assigned to any IRA events yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredIraEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="card-hover overflow-hidden border-none shadow-md"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
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
                      <span>Registered Students: {event.registeredStudents}</span>
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
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}
