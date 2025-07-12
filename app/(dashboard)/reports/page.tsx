"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { BarChart, Download, FileText, PieChart, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { routes } from "@/lib/routes"

// Mock reports data - in a real app, this would come from an API
const reports = [
  {
    id: "1",
    name: "Event Summary Report",
    description: "Summary of all events for a selected time period",
    type: "event",
    icon: BarChart,
  },
  {
    id: "2",
    name: "Student Participation Report",
    description: "Report on student participation in events",
    type: "student",
    icon: Users,
  },
  {
    id: "3",
    name: "IRA Performance Analysis",
    description: "Analysis of student performance in IRA events",
    type: "ira",
    icon: PieChart,
  },
  {
    id: "4",
    name: "Faculty Involvement Report",
    description: "Report on faculty involvement in events and IRA",
    type: "faculty",
    icon: FileText,
  },
]

export default function ReportsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [format, setFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = () => {
    if (!selectedReport) {
      toast({
        title: "No Report Selected",
        description: "Please select a report to generate",
        variant: "destructive",
      })
      return
    }

    if (!startDate || !endDate) {
      toast({
        title: "Date Range Required",
        description: "Please select both start and end dates",
        variant: "destructive",
      })
      return
    }

    // Mock report generation - in a real app, this would call an API
    setIsGenerating(true)
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: `Report has been generated in ${format.toUpperCase()} format`,
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <>
      <PageHeader
        title="Reports"
        description="Generate and download reports for events, students, and faculty"
        backHref={routes.dashboard.admin}
      />

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <div className="md:col-span-1">
          <Card className="border-none shadow-lg overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Select a report to generate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className={cn(
                    "p-4 rounded-md cursor-pointer transition-all duration-200",
                    selectedReport === report.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                  )}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex items-start gap-3">
                    <report.icon className="h-5 w-5" />
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p
                        className={cn(
                          "text-sm",
                          selectedReport === report.id ? "text-primary-foreground/80" : "text-muted-foreground",
                        )}
                      >
                        {report.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="border-none shadow-lg overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
            <CardHeader>
              <CardTitle>Report Parameters</CardTitle>
              <CardDescription>Configure the parameters for your report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Date Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal transition-all duration-200 border-muted-foreground/20 focus:border-primary",
                            !startDate && "text-muted-foreground",
                          )}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal transition-all duration-200 border-muted-foreground/20 focus:border-primary",
                            !endDate && "text-muted-foreground",
                          )}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Format</h3>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Report Preview</h3>
                {selectedReport ? (
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {reports.find((r) => r.id === selectedReport)?.description}
                      {startDate && endDate && (
                        <span className="block mt-2">
                          Period: {format(startDate, "PPP")} to {format(endDate, "PPP")}
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>Select a report to see a preview</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerateReport}
                disabled={!selectedReport || !startDate || !endDate || isGenerating}
                className="w-full group relative overflow-hidden"
              >
                {isGenerating ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <span className="relative z-10 flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
