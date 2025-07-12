"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { CalendarDays, Download, FileText, Search } from "lucide-react"
import { routes } from "@/lib/routes"
import { useToast } from "@/hooks/use-toast"

// Mock IRA results data - in a real app, this would come from an API
const iraResults = [
  {
    id: "1",
    eventName: "Tech Conference 2023",
    date: "2023-12-10",
    marks: 85,
    status: "Passed",
    faculty: "Dr. Sarah Wilson",
    feedback: "Excellent participation and engagement throughout the event.",
  },
  {
    id: "2",
    eventName: "IEEE Workshop on AI",
    date: "2023-12-20",
    marks: 75,
    status: "Passed",
    faculty: "Dr. Mark Davis",
    feedback: "Good understanding of concepts and active participation.",
  },
  {
    id: "3",
    eventName: "Hackathon 2023",
    date: "2023-12-05",
    marks: 90,
    status: "Passed",
    faculty: "Prof. Robert Johnson",
    feedback: "Outstanding performance and innovative solutions.",
  },
  {
    id: "4",
    eventName: "Web Development Seminar",
    date: "2023-11-15",
    marks: 45,
    status: "Failed",
    faculty: "Dr. Emily Chen",
    feedback: "Insufficient participation and engagement during the event.",
  },
]

export default function IraResultsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResults = iraResults.filter(
    (result) =>
      result.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.faculty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDownloadCertificate = (result: any) => {
    toast({
      title: "Certificate Downloaded",
      description: `Certificate for ${result.eventName} has been downloaded.`,
    })
  }

  return (
    <>
      <PageHeader
        title="IRA Results"
        description="View your Internal Review Assessment results and certificates"
        backHref={routes.dashboard.student}
      />

      <div className="relative mb-6 mt-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search results..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
        />
      </div>

      {filteredResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No IRA results found</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? "Try a different search term" : "You haven't participated in any IRA events yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map((result, index) => (
            <Card
              key={result.id}
              className="card-hover overflow-hidden border-none shadow-md"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                <CardTitle className="text-sm font-medium">{result.eventName}</CardTitle>
                <Badge
                  variant={result.status === "Passed" ? "success" : "destructive"}
                  className="transition-all hover:scale-105"
                >
                  {result.status}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{new Date(result.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Faculty: {result.faculty}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm font-medium">
                  <span>Marks: </span>
                  <span
                    className={
                      result.status === "Passed"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {result.marks}/100
                  </span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium">Feedback: </span>
                  <span>{result.feedback}</span>
                </div>
                <div className="mt-4">
                  {result.status === "Passed" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group relative overflow-hidden"
                      onClick={() => handleDownloadCertificate(result)}
                    >
                      <span className="relative z-10 flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Download Certificate
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full group relative overflow-hidden" disabled>
                      <span className="relative z-10">No Certificate Available</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
