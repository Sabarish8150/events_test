"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Calendar,
  CheckSquare,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { useToast } from "@/hooks/use-toast"

interface AppSidebarProps {
  role: "student" | "faculty" | "head" | "admin" | "guest"
  user?: {
    name: string
    email: string
    image?: string
  }
}

export function AppSidebar({ role, user }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/login")
  }

  const isActive = (path: string) => pathname === path

  // Navigation items based on role
  const getNavItems = () => {
    switch (role) {
      case "student":
        return (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/student")} tooltip="Dashboard">
                      <a href="/dashboard/student" className="transition-colors">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Events</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/events/submit")} tooltip="Submit Event">
                      <a href="/events/submit" className="transition-colors">
                        <PlusCircle />
                        <span>Submit Event</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/events/my-events")} tooltip="My Events">
                      <a href="/events/my-events" className="transition-colors">
                        <ClipboardList />
                        <span>My Events</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>IRA</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/ira/register")} tooltip="Register for IRA">
                      <a href="/ira/register" className="transition-colors">
                        <Calendar />
                        <span>Register for IRA</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/ira/results")} tooltip="IRA Results">
                      <a href="/ira/results" className="transition-colors">
                        <CheckSquare />
                        <span>IRA Results</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )

      case "faculty":
        return (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/faculty")} tooltip="Dashboard">
                      <a href="/dashboard/faculty" className="transition-colors">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Events</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/events/submit")} tooltip="Submit Event">
                      <a href="/events/submit" className="transition-colors">
                        <PlusCircle />
                        <span>Submit Event</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/events/my-events")} tooltip="My Events">
                      <a href="/events/my-events" className="transition-colors">
                        <ClipboardList />
                        <span>My Events</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>IRA Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/ira/manage")} tooltip="Manage IRA">
                      <a href="/ira/manage" className="transition-colors">
                        <CheckSquare />
                        <span>Manage IRA</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )

      case "head":
        return (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/head")} tooltip="Dashboard">
                      <a href="/dashboard/head" className="transition-colors">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Event Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/events/approve")} tooltip="Approve Events">
                      <a href="/events/approve" className="transition-colors">
                        <CheckSquare />
                        <span>Approve Events</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/slots/allocate")} tooltip="Allocate Slots">
                      <a href="/slots/allocate" className="transition-colors">
                        <Calendar />
                        <span>Allocate Slots</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>IRA Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/ira/assign")} tooltip="Assign IRA">
                      <a href="/ira/assign" className="transition-colors">
                        <Users />
                        <span>Assign IRA</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )

      case "admin":
        return (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/admin")} tooltip="Dashboard">
                      <a href="/dashboard/admin" className="transition-colors">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>User Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/users/manage")} tooltip="Manage Users">
                      <a href="/users/manage" className="transition-colors">
                        <Users />
                        <span>Manage Users</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Event Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/events/all")} tooltip="All Events">
                      <a href="/events/all" className="transition-colors">
                        <ClipboardList />
                        <span>All Events</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/reports")} tooltip="Reports">
                      <a href="/reports" className="transition-colors">
                        <BarChart3 />
                        <span>Reports</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )

      default: // Guest
        return (
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Home">
                    <a href="/" className="transition-colors">
                      <Home />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/login")} tooltip="Login">
                    <a href="/login" className="transition-colors">
                      <LogOut />
                      <span>Login</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )
    }
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="py-4">
          <div className="flex items-center px-2">
            <FileText className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-lg font-bold">Events Portal</h1>
          </div>
        </SidebarHeader>

        <SidebarContent>{getNavItems()}</SidebarContent>

        <SidebarFooter className="p-4">
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 p-2 rounded-md bg-sidebar-accent/50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 button-pop"
                  onClick={() => router.push("/profile")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1 button-pop" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>

              <div className="flex justify-center">
                <ModeToggle />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <ModeToggle />
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
