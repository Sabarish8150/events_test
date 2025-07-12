"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { BarChart, Clock, Edit, Eye, Plus, Trash } from "lucide-react"
import { routes } from "@/lib/routes"

// Mock user data - in a real app, this would come from an API or auth context
const user = {
  name: "Admin User",
  email: "admin@office.edu",
  role: "admin",
}

// Mock users data - in a real app, this would come from an API
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@office.edu",
    role: "Student",
    regNo: "7376222AD101",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@office.edu",
    role: "Faculty",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@office.edu",
    role: "Head",
  },
]

// Mock events data - in a real app, this would come from an API
const events = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-12-15",
    status: "Approved",
    level: "Level 1",
    organizer: "John Doe",
  },
  {
    id: "2",
    name: "IEEE Workshop on AI",
    date: "2023-12-20",
    status: "Pending",
    organizer: "Jane Smith",
  },
  {
    id: "3",
    name: "Hackathon 2023",
    date: "2024-01-10",
    status: "Approved",
    level: "Level 2",
    organizer: "Mike Brown",
  },
]

// Mock reports data - in a real app, this would come from an API
const reports = [
  {
    id: "1",
    name: "Monthly Event Summary",
    description: "Summary of all events for the current month",
    lastGenerated: "2023-11-30",
  },
  {
    id: "2",
    name: "Student Participation Report",
    description: "Report on student participation in events",
    lastGenerated: "2023-11-28",
  },
  {
    id: "3",
    name: "IRA Performance Analysis",
    description: "Analysis of student performance in IRA events",
    lastGenerated: "2023-11-25",
  },
]

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("users")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isViewEventOpen, setIsViewEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state for new user
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    regNo: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, role: value }))
  }

  const handleAddUser = () => {
    setIsSubmitting(true)

    // Validate form
    if (!newUser.name || !newUser.email || !newUser.role) {
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
        title: "User Added",
        description: `${newUser.name} has been added as a ${newUser.role}`,
      })
      setIsSubmitting(false)
      setIsAddUserOpen(false)
      setNewUser({
        name: "",
        email: "",
        role: "",
        regNo: "",
      })
    }, 1500)
  }

  const handleViewEvent = (event: any) => {
    setSelectedEvent(event)
    setIsViewEventOpen(true)
  }

  return (
    <>
      <PageHeader title="Admin Dashboard" description="Manage users, events, and generate reports" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-6">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger
            value="users"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            Events
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button className="group relative overflow-hidden" onClick={() => setIsAddUserOpen(true)}>
              <span className="relative z-10 flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add New User
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </div>
          <div className="rounded-md border bg-card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 font-medium">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Reg No</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="transition-all hover:scale-105">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{user.regNo || "-"}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10"
                            onClick={() => {
                              toast({
                                title: "Edit User",
                                description: `Editing ${user.name}`,
                              })
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10"
                            onClick={() => {
                              toast({
                                title: "Delete User",
                                description: `Are you sure you want to delete ${user.name}?`,
                                variant: "destructive",
                              })
                            }}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="rounded-md border bg-card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 font-medium">
                    <th className="py-3 px-4 text-left">Event Name</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Organizer</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">{event.name}</td>
                      <td className="py-3 px-4">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{event.organizer}</td>
                      <td className="py-3 px-4">
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
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10"
                          onClick={() => handleViewEvent(event)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, index) => (
              <Card
                key={report.id}
                className="card-hover overflow-hidden border-none shadow-md"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg -z-10" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
                  <CardTitle className="text-sm font-medium">{report.name}</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Last Generated: {new Date(report.lastGenerated).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group relative overflow-hidden"
                      onClick={() => router.push(routes.reports.generate(report.id))}
                    >
                      <span className="relative z-10">Generate Report</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account with the appropriate role.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={handleRoleChange}>
                <SelectTrigger
                  id="role"
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Faculty">Faculty</SelectItem>
                  <SelectItem value="Head">Head</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newUser.role === "Student" && (
              <div className="space-y-2">
                <Label htmlFor="regNo">Registration Number</Label>
                <Input
                  id="regNo"
                  name="regNo"
                  value={newUser.regNo}
                  onChange={handleInputChange}
                  placeholder="Enter registration number"
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} disabled={isSubmitting} className="relative overflow-hidden">
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="relative z-10">Add User</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium">{selectedEvent.name}</h4>
                <div className="mt-2 text-sm text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Organizer:</span>
                    <span>{selectedEvent.organizer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge
                      variant={
                        selectedEvent.status === "Approved"
                          ? "success"
                          : selectedEvent.status === "Rejected"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {selectedEvent.status}
                    </Badge>
                  </div>
                  {selectedEvent.level && (
                    <div className="flex justify-between">
                      <span className="font-medium">Level:</span>
                      <span>{selectedEvent.level}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewEventOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewEventOpen(false)
                router.push(routes.events.view(selectedEvent?.id))
              }}
              className="relative overflow-hidden"
            >
              <span className="relative z-10">View Full Details</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
