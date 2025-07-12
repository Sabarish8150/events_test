"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CalendarDays, Clock, FileText, MapPin, User, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { routes } from "@/lib/routes"

// Mock events data - in a real app, this would come from an API based on the ID
const eventDetails = {
  id: "6",
  name: "Web Security Seminar",
  date: "2024-02-05",
  time: "10:00 AM - 1:00 PM",
  venue: "Conference Room",
  status: "Approved",
  level: "Level 2",
  submittedOn: "2023-11-20",
  organizer: "Jane Smith",
  department: "Computer Science",
  description:
    "A comprehensive seminar on web security best practices and common vulnerabilities. Topics include XSS, CSRF, SQL injection, and secure coding practices. Participants will learn how to identify and mitigate security risks in web applications.",
  registeredStudents: 25,
  maxCapacity: 40,
  attachments: [
    { name: "Event Proposal.pdf", url: "#" },
    { name: "Speaker Details.docx", url: "#" },
  ],
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState<any>(null)

  useEffect(() => {
    // Simulate API call to fetch event details
    const timer = setTimeout(() => {
      setEvent(eventDetails)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">Event not found</h3>
        <p className="text-sm text-muted-foreground">
          The event you are looking for does not exist or has been removed.
        </p>
        <Button className="mt-4" onClick={() => router.push(routes.events.myEvents)}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Event Details"
        description="View detailed information about this event"
        backHref={routes.events.myEvents}
      />

      <div className="grid gap-6 mt-6">
        <Card className="overflow-hidden border-none shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{event.name}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant={
                      event.status === "Approved" ? "success" : event.status === "Rejected" ? "destructive" : "outline"
                    }
                    className="transition-all hover:scale-105"
                  >
                    {event.status}
                  </Badge>
                  {event.level && (
                    <Badge
                      variant={event.level === "Level 1" ? "default" : "secondary"}
                      className="transition-all hover:scale-105"
                    >
                      {event.level}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {event.status === "Approved" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Certificate Generated",
                        description: "Event certificate has been generated and sent to your email.",
                      })
                    }}
                    className="group relative overflow-hidden"
                  >
                    <span className="relative z-10">Generate Certificate</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Button>
                )}
                <Button
                  variant={event.status === "Approved" ? "default" : "outline"}
                  onClick={() => {
                    if (event.status === "Approved") {
                      router.push(routes.events.register(event.id))
                    } else {
                      toast({
                        title: "Cannot Register",
                        description: "You can only register for approved events.",
                        variant: "destructive",
                      })
                    }
                  }}
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10">Register</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Event Information</h3>
                  <div className="grid gap-2">
                    <div className="flex items-start gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Date: </span>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Time: </span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Venue: </span>
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Organizer: </span>
                        <span>{event.organizer}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Department: </span>
                        <span>{event.department}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Registration: </span>
                        <span>
                          {event.registeredStudents} / {event.maxCapacity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Submitted On: </span>
                        <span>{new Date(event.submittedOn).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {event.attachments.map((attachment: any) => (
                      <div key={attachment.name} className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={attachment.url}
                          className="text-sm text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault()
                            toast({
                              title: "Download Started",
                              description: `Downloading ${attachment.name}`,
                            })
                          }}
                        >
                          {attachment.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{event.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
