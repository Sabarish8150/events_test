"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, KeyRound, LogIn, Mail } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

// Import the routes from our routes file
import { routes } from "@/lib/routes"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication - in a real app, this would call an API
    setTimeout(() => {
      if (formData.email && formData.password) {
        toast({
          title: "Login Successful",
          description: `Logged in as ${formData.role}`,
        })

        // Set a cookie to remember the path for the sidebar
        document.cookie = `path=/dashboard/${formData.role}; path=/; max-age=3600`

        // Redirect based on role
        switch (formData.role) {
          case "student":
            router.push(routes.dashboard.student)
            break
          case "faculty":
            router.push(routes.dashboard.faculty)
            break
          case "head":
            router.push(routes.dashboard.head)
            break
          case "admin":
            router.push(routes.dashboard.admin)
            break
          default:
            router.push(routes.dashboard.student)
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Please fill in all fields",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px]" />
      <Card className="w-full max-w-md animate-fade-in shadow-xl border-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg -z-10" />
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m.example@office.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="transition-all duration-200 border-muted-foreground/20 focus:border-primary">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="head">Head of Office</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full group relative overflow-hidden" disabled={isLoading}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="relative z-10 flex items-center">
                    Login
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </>
              )}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline transition-colors">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
