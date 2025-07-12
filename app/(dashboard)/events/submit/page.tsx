"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { routes } from "@/lib/routes"

export default function SubmitEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [registrationDeadline, setRegistrationDeadline] = useState<Date>()
  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "John Doe", // In a real app, this would come from the user context
    location: "",
    website: "",
    mode: "offline",
    domain: "software",
    type: "technical",
    level: "national",
    description: "",
  })
  const [brochure, setBrochure] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBrochure(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!date || !registrationDeadline) {
      toast({
        title: "Missing Information",
        description: "Please select event date and registration deadline",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!brochure) {
      toast({
        title: "Missing Brochure",
        description: "Please upload a brochure for the event",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Mock submission - in a real app, this would call an API
    setTimeout(() => {
      toast({
        title: "Event Submitted",
        description: "Your event proposal has been submitted for review",
      })
      setIsSubmitting(false)
      router.push(routes.dashboard.student)
    }, 1500)
  }

  return (
    <>
      <PageHeader
        title="Submit Event Proposal"
        description="Fill in the details to submit a new event proposal for review"
        backHref={routes.dashboard.student}
      />

      <Card className="border-none shadow-lg overflow-hidden mt-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all duration-200 border-muted-foreground/20 focus:border-primary",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all duration-200 border-muted-foreground/20 focus:border-primary",
                        !registrationDeadline && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {registrationDeadline ? format(registrationDeadline, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={registrationDeadline}
                      onSelect={setRegistrationDeadline}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Event Website (Optional)</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brochure">Brochure (PDF)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="brochure"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                  className="flex-1 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                />
                <Button type="button" variant="outline" size="icon" className="h-10 w-10">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mode">Mode</Label>
                <Select value={formData.mode} onValueChange={(value) => handleSelectChange("mode", value)}>
                  <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Select value={formData.domain} onValueChange={(value) => handleSelectChange("domain", value)}>
                  <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Paper</SelectItem>
                    <SelectItem value="ieee">IEEE</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)}>
                  <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">Cancel</span>
              <span className="absolute inset-0 bg-destructive/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
            <Button type="submit" disabled={isSubmitting} className="group relative overflow-hidden">
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="relative z-10">Submit Proposal</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}
