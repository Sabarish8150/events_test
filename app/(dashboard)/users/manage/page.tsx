"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Edit, Plus, Search, Trash, User } from "lucide-react"
import { routes } from "@/lib/routes"

// Mock users data - in a real app, this would come from an API
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@office.edu",
    role: "Student",
    regNo: "7376222AD101",
    department: "Computer Science",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@office.edu",
    role: "Faculty",
    department: "Electrical Engineering",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@office.edu",
    role: "Head",
    department: "Computer Science",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@office.edu",
    role: "Student",
    regNo: "7376222AD102",
    department: "Information Technology",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@office.edu",
    role: "Faculty",
    department: "Mechanical Engineering",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@office.edu",
    role: "Student",
    regNo: "7376222AD103",
    department: "Civil Engineering",
  },
]

export default function ManageUsersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state for new/edit user
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    regNo: "",
    department: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.regNo && user.regNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter ? user.role === roleFilter : true

    return matchesSearch && matchesRole
  })

  const handleAddUser = () => {
    setIsSubmitting(true)

    // Validate form
    if (!userData.name || !userData.email || !userData.role || !userData.department) {
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
        description: `${userData.name} has been added as a ${userData.role}`,
      })
      setIsSubmitting(false)
      setIsAddUserOpen(false)
      setUserData({
        name: "",
        email: "",
        role: "",
        regNo: "",
        department: "",
      })
    }, 1500)
  }

  const handleEditUser = () => {
    setIsSubmitting(true)

    // Validate form
    if (!userData.name || !userData.email || !userData.role || !userData.department) {
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
        title: "User Updated",
        description: `${userData.name}'s information has been updated`,
      })
      setIsSubmitting(false)
      setIsEditUserOpen(false)
      setUserData({
        name: "",
        email: "",
        role: "",
        regNo: "",
        department: "",
      })
      setSelectedUser(null)
    }, 1500)
  }

  const handleDeleteUser = () => {
    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "User Deleted",
        description: `${selectedUser.name} has been deleted`,
      })
      setIsSubmitting(false)
      setIsDeleteUserOpen(false)
      setSelectedUser(null)
    }, 1500)
  }

  const openEditDialog = (user: any) => {
    setSelectedUser(user)
    setUserData({
      name: user.name,
      email: user.email,
      role: user.role,
      regNo: user.regNo || "",
      department: user.department,
    })
    setIsEditUserOpen(true)
  }

  const openDeleteDialog = (user: any) => {
    setSelectedUser(user)
    setIsDeleteUserOpen(true)
  }

  return (
    <>
      <PageHeader
        title="Manage Users"
        description="Add, edit, and remove users from the system"
        backHref={routes.dashboard.admin}
        actions={
          <Button
            className="group relative overflow-hidden"
            onClick={() => {
              setUserData({
                name: "",
                email: "",
                role: "",
                regNo: "",
                department: "",
              })
              setIsAddUserOpen(true)
            }}
          >
            <span className="relative z-10 flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={roleFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setRoleFilter(null)}
            className="min-w-[80px]"
          >
            All
          </Button>
          <Button
            variant={roleFilter === "Student" ? "default" : "outline"}
            size="sm"
            onClick={() => setRoleFilter("Student")}
            className="min-w-[80px]"
          >
            Students
          </Button>
          <Button
            variant={roleFilter === "Faculty" ? "default" : "outline"}
            size="sm"
            onClick={() => setRoleFilter("Faculty")}
            className="min-w-[80px]"
          >
            Faculty
          </Button>
          <Button
            variant={roleFilter === "Head" ? "default" : "outline"}
            size="sm"
            onClick={() => setRoleFilter("Head")}
            className="min-w-[80px]"
          >
            Heads
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 font-medium">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Reg No</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="transition-all hover:scale-105">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{user.department}</td>
                  <td className="py-3 px-4">{user.regNo || "-"}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-primary/10"
                        onClick={() => openEditDialog(user)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10"
                        onClick={() => openDeleteDialog(user)}
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
                value={userData.name}
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
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={userData.role} onValueChange={(value) => handleSelectChange("role", value)}>
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
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={userData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                <SelectTrigger
                  id="department"
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {userData.role === "Student" && (
              <div className="space-y-2">
                <Label htmlFor="regNo">Registration Number</Label>
                <Input
                  id="regNo"
                  name="regNo"
                  value={userData.regNo}
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

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={userData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                <SelectTrigger
                  id="edit-role"
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
            <div className="space-y-2">
              <Label htmlFor="edit-department">Department</Label>
              <Select value={userData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                <SelectTrigger
                  id="edit-department"
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {userData.role === "Student" && (
              <div className="space-y-2">
                <Label htmlFor="edit-regNo">Registration Number</Label>
                <Input
                  id="edit-regNo"
                  name="regNo"
                  value={userData.regNo}
                  onChange={handleInputChange}
                  placeholder="Enter registration number"
                  className="transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser} disabled={isSubmitting} className="relative overflow-hidden">
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="relative z-10">Save Changes</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-background rounded-full p-2">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{selectedUser.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner /> : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
