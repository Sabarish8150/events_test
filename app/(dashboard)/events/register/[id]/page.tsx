"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CalendarDays, FileText, MapPin, User, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { routes } from "@/lib/routes"

// Mock event data - in a real app, this would come from an API based on the ID
const eventDetails = {
  id: "1",
  name: "Tech Conference 2023",
  date: "2023-12-15",
  time: "10:00 AM - 1:00 PM",
  venue: "Main Auditorium",
  status: "Approved",
  level: "Level 2",
  organizer: "Jane Smith",
  department: "Computer Science",
  description:
    "A comprehensive conference on emerging technologies and their applications. Topics include AI, blockchain, cloud computing, and IoT. Participants will have the opportunity to network with industry professionals and learn about the latest trends.",
  registeredStudents: 25,
  maxCapacity: 50,
}

export default function EventRegisterPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    email: "",
    phone: "",
    reason: "",
  })

  useEffect(() => {
    // Simulate API call to fetch event details
    const timer = setTimeout(() => {
      setEvent(eventDetails)
      setIsLoading(false)

      // Pre-fill form with user data (in a real app, this would come from auth context)
      setFormData({
        name: "John Doe",
        regNo: "7376222AD101",
        email: "john.doe@office.edu",
        phone: "",
        reason: "",
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || !formData.regNo || !formData.email || !formData.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: `You have successfully registered for ${event.name}`,
      })
      setIsSubmitting(false)
      router.push(routes.dashboard.student)
    }, 1500)
  }

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
        <Button className="mt-4" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Register for Event"
        description="Complete the form to register for this event"
        backHref={routes.events.view(params.id)}
      />

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card className="overflow-hidden border-none shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
            <CardDescription>Please review the event details before registering</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-start gap-2 text-sm">
                <CalendarDays className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <span className="font-medium">Date & Time: </span>
                  <span>
                    {new Date(event.date).toLocaleDateString()} | {event.time}
                  </span>
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
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>Fill in your details to register for this event</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regNo">Registration Number</Label>
                <Input
                  id="regNo"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Attending</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Briefly explain why you want to attend this event"
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <span className="relative z-10">Register for Event</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  )
}
