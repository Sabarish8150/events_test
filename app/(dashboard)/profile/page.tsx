"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageHeader } from "@/components/page-header"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { routes } from "@/lib/routes"
import { AtSign, KeyRound, User } from "lucide-react"

// Mock user data - in a real app, this would come from an API or auth context
const userData = {
  name: "John Doe",
  email: "john.doe@office.edu",
  role: "Student",
  regNo: "7376222AD101",
  department: "Computer Science",
  image: "",
}

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [profile, setProfile] = useState({
    name: userData.name,
    email: userData.email,
  })

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      })
      setIsUpdating(false)
    }, 1500)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
      })
      setIsChangingPassword(false)
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1500)
  }

  return (
    <>
      <PageHeader
        title="Profile"
        description="View and update your profile information"
        backHref={routes.dashboard[userData.role.toLowerCase() as "student" | "faculty" | "head" | "admin"]}
      />

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card className="border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10" />
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userData.image || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback className="text-lg">{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{userData.name}</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium">Role:</div>
              <div>{userData.role}</div>

              <div className="font-medium">Department:</div>
              <div>{userData.department}</div>

              {userData.regNo && (
                <>
                  <div className="font-medium">Registration Number:</div>
                  <div>{userData.regNo}</div>
                </>
              )}
            </div>

            <Separator />

            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-end px-0 pt-6">
                <Button type="submit" disabled={isUpdating} className="relative overflow-hidden">
                  {isUpdating ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <span className="relative z-10">Update Profile</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg -z-10" />
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-end px-0 pt-6">
                <Button type="submit" disabled={isChangingPassword} className="relative overflow-hidden">
                  {isChangingPassword ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <span className="relative z-10">Change Password</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
