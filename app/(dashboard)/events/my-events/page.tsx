"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { CalendarDays, Clock, FileText, Search } from "lucide-react"
import Link from "next/link"
import { routes } from "@/lib/routes"

// Mock events data - in a real app, this would come from an API
const myEvents = [
  {
    id: "5",
    name: "Mobile App Development Workshop",
    date: "2024-01-15",
    status: "Pending",
    submittedOn: "2023-11-25",
    description: "A workshop focused on mobile app development using React Native and Flutter.",
  },
  {
    id: "6",
    name: "Web Security Seminar",
    date: "2024-02-05",
    status: "Approved",
    level: "Level 2",
    submittedOn: "2023-11-20",
    description: "A seminar on web security best practices and common vulnerabilities.",
  },
  {
    id: "7",
    name: "Machine Learning Bootcamp",
    date: "2024-02-15",
    status: "Rejected",
    submittedOn: "2023-11-15",
    description: "An intensive bootcamp on machine learning algorithms and applications.",
    rejectionReason: "Similar event already scheduled in the same week.",
  },
  {
    id: "8",
    name: "Blockchain Technology Workshop",
    date: "2024-03-10",
    status: "Approved",
    level: "Level 1",
    submittedOn: "2023-12-01",
    description: "An introduction to blockchain technology and its applications.",
  },
]

export default function MyEventsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEvents = myEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <PageHeader
        title="My Events"
        description="View and manage events you have submitted"
        backHref={routes.dashboard.student}
        actions={
          <Link href={routes.events.submit}>
            <Button className="group relative overflow-hidden">
              <span className="relative z-10">Submit New Event</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </Link>
        }
      />

      <div className="relative mb-6 mt-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search your events..."
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
            {searchTerm ? "Try a different search term" : "You haven't submitted any events yet"}
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
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
                  <Clock className="h-4 w-4" />
                  <span>Submitted: {new Date(event.submittedOn).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                {event.status === "Rejected" && (
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
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
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
