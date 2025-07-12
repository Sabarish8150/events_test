"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, FileText, User } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { routes } from "@/lib/routes"

// Mock event data - in a real app, this would come from an API based on the ID
const eventData = {
  id: "1",
  name: "Tech Conference 2023",
  date: "2023-12-15",
  registrationDeadline: "2023-12-10",
  location: "Main Auditorium",
  website: "https://techconf2023.example.com",
  mode: "Offline",
  domain: "Software",
  type: "Technical Paper",
  level: "National",
  organizer: "John Doe",
  organizerEmail: "john.doe@office.edu",
  submittedOn: "2023-11-10",
  description:
    "A comprehensive technical conference focusing on the latest advancements in software development, artificial intelligence, and cloud computing. The event will feature keynote speakers from leading tech companies and workshops on cutting-edge technologies.",
  brochureUrl: "/sample-brochure.pdf",
}

export default function ReviewEventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    approvalStatus: "",
    approvalLevel: "level1",
    comments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.approvalStatus) {
      toast({
        title: "Missing Information",
        description: "Please select an approval status",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Mock submission - in a real app, this would call an API
    setTimeout(() => {
      toast({
        title: "Review Submitted",
        description: `Event has been ${formData.approvalStatus}`,
      })
      setIsSubmitting(false)
      router.push(routes.dashboard.head)
    }, 1500)
  }

  return (
    <>
      <PageHeader
        title="Review Event Proposal"
        description="Review and approve or reject this event proposal"
        backHref={routes.dashboard.head}
      />

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card className="border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Submitted on {new Date(eventData.submittedOn).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">{eventData.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {eventData.mode}
                </Badge>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                  {eventData.domain}
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  {eventData.type}
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  {eventData.level}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium">Organizer:</div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                {eventData.organizer}
              </div>

              <div className="font-medium">Email:</div>
              <div>{eventData.organizerEmail}</div>

              <div className="font-medium">Event Date:</div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                {new Date(eventData.date).toLocaleDateString()}
              </div>

              <div className="font-medium">Registration Deadline:</div>
              <div>{new Date(eventData.registrationDeadline).toLocaleDateString()}</div>

              <div className="font-medium">Location:</div>
              <div>{eventData.location}</div>

              {eventData.website && (
                <>
                  <div className="font-medium">Website:</div>
                  <div className="truncate">
                    <a
                      href={eventData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {eventData.website}
                    </a>
                  </div>
                </>
              )}
            </div>

            <Separator />

            <div>
              <div className="font-medium mb-2">Description:</div>
              <p className="text-sm text-muted-foreground">{eventData.description}</p>
            </div>

            <div>
              <Button
                variant="outline"
                className="w-full group relative overflow-hidden"
                onClick={() => window.open(eventData.brochureUrl, "_blank")}
              >
                <span className="relative z-10 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  View Brochure
                </span>
                <span className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
          <CardHeader>
            <CardTitle>Review Decision</CardTitle>
            <CardDescription>Approve or reject this event proposal</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="approvalStatus">Approval Status</Label>
                <Select
                  value={formData.approvalStatus}
                  onValueChange={(value) => handleSelectChange("approvalStatus", value)}
                  required
                >
                  <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approve</SelectItem>
                    <SelectItem value="rejected">Reject</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.approvalStatus === "approved" && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="approvalLevel">Approval Level</Label>
                  <Select
                    value={formData.approvalLevel}
                    onValueChange={(value) => handleSelectChange("approvalLevel", value)}
                  >
                    <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="level1">Level 1</SelectItem>
                      <SelectItem value="level2">Level 2</SelectItem>
                      <SelectItem value="level3">Level 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add any comments or feedback for the organizer"
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <span className="relative z-10">Submit Review</span>
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
