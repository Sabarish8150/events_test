"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, CheckCircle, User } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { routes } from "@/lib/routes"

// Mock event data - in a real app, this would come from an API based on the ID
const eventData = {
  id: "1",
  name: "Tech Conference 2023",
  date: "2023-12-15",
  level: "Level 1",
}

// Mock registered students - in a real app, this would come from an API
const registeredStudents = [
  {
    id: "1",
    name: "John Doe",
    regNo: "7376222AD101",
    email: "john.doe@office.edu",
  },
  {
    id: "2",
    name: "Alice Johnson",
    regNo: "7376222AD102",
    email: "alice.johnson@office.edu",
  },
  {
    id: "3",
    name: "Bob Smith",
    regNo: "7376222AD103",
    email: "bob.smith@office.edu",
  },
  {
    id: "4",
    name: "Emma Davis",
    regNo: "7376222AD104",
    email: "emma.davis@office.edu",
  },
  {
    id: "5",
    name: "Michael Wilson",
    regNo: "7376222AD105",
    email: "michael.wilson@office.edu",
  },
]

export default function ReviewIraPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [marks, setMarks] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleMarksChange = (studentId: string, value: string) => {
    // Ensure only numbers are entered and the value is between 0 and 100
    if (value === "" || (/^\d+$/.test(value) && Number.parseInt(value) >= 0 && Number.parseInt(value) <= 100)) {
      setMarks((prev) => ({ ...prev, [studentId]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Check if all students have marks assigned
    const allMarksAssigned = registeredStudents.every(
      (student) => marks[student.id] !== undefined && marks[student.id] !== "",
    )

    if (!allMarksAssigned) {
      toast({
        title: "Missing Marks",
        description: "Please assign marks to all registered students",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Mock submission - in a real app, this would call an API
    setTimeout(() => {
      toast({
        title: "Marks Submitted",
        description: "IRA marks have been successfully submitted",
      })
      setIsSubmitting(false)
      router.push(routes.dashboard.faculty)
    }, 1500)
  }

  return (
    <>
      <PageHeader
        title="Review IRA Students"
        description="Assign marks to students who participated in this IRA event"
        backHref={routes.dashboard.faculty}
      />

      <Card className="border-none shadow-lg overflow-hidden mt-6 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>{eventData.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <CalendarDays className="h-4 w-4" />
              <span>{new Date(eventData.date).toLocaleDateString()}</span>
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {eventData.level}
          </Badge>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card className="border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
          <CardHeader>
            <CardTitle>Registered Students</CardTitle>
            <CardDescription>Assign marks to each student (0-100)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {registeredStudents.map((student, index) => (
                <div key={student.id} className="group">
                  {index > 0 && <Separator className="my-6" />}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{student.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{student.regNo}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </div>

                    <div className="md:col-span-2 flex items-center gap-4">
                      <div className="w-full max-w-[150px]">
                        <Label htmlFor={`marks-${student.id}`} className="sr-only">
                          Marks
                        </Label>
                        <Input
                          id={`marks-${student.id}`}
                          type="text"
                          value={marks[student.id] || ""}
                          onChange={(e) => handleMarksChange(student.id, e.target.value)}
                          placeholder="Enter marks"
                          className="text-center transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                        />
                      </div>

                      <div className="flex-1 text-sm">
                        {marks[student.id] && Number.parseInt(marks[student.id]) >= 50 ? (
                          <div className="flex items-center text-green-600 dark:text-green-400">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Passed ({Number.parseInt(marks[student.id])}%)
                          </div>
                        ) : marks[student.id] ? (
                          <div className="text-red-600 dark:text-red-400">
                            Failed ({Number.parseInt(marks[student.id])}%)
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="relative z-10">Submit Marks</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}
