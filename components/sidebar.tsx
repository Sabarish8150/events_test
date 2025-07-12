"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useToast } from "@/hooks/use-toast"

interface SidebarProps {
  user?: {
    name: string
    email: string
    role: string
    image?: string
  }
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Close mobile sidebar when navigating
    setIsMobileOpen(false)
  }, [pathname])

  // Determine role from pathname or user object
  const getRole = (): "student" | "faculty" | "head" | "admin" | "guest" => {
    if (user?.role) {
      return user.role as any
    }

    if (pathname.includes("/dashboard/student")) return "student"
    if (pathname.includes("/dashboard/faculty")) return "faculty"
    if (pathname.includes("/dashboard/head")) return "head"
    if (pathname.includes("/dashboard/admin")) return "admin"
    return "guest"
  }

  const role = getRole()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const getNavItems = () => {
    switch (role) {
      case "student":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard/student",
            variant: "default",
          },
          {
            title: "Submit Event",
            icon: PlusCircle,
            href: "/events/submit",
            variant: "ghost",
          },
          {
            title: "My Events",
            icon: ClipboardList,
            href: "/events/my-events",
            variant: "ghost",
          },
          {
            title: "Register for IRA",
            icon: Calendar,
            href: "/ira/register",
            variant: "ghost",
          },
          {
            title: "IRA Results",
            icon: FileText,
            href: "/ira/results",
            variant: "ghost",
          },
        ]
      case "faculty":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard/faculty",
            variant: "default",
          },
          {
            title: "Submit Event",
            icon: PlusCircle,
            href: "/events/submit",
            variant: "ghost",
          },
          {
            title: "My Events",
            icon: ClipboardList,
            href: "/events/my-events",
            variant: "ghost",
          },
          {
            title: "Manage IRA",
            icon: Users,
            href: "/ira/manage",
            variant: "ghost",
          },
        ]
      case "head":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard/head",
            variant: "default",
          },
          {
            title: "Approve Events",
            icon: ClipboardList,
            href: "/events/approve",
            variant: "ghost",
          },
          {
            title: "Assign IRA",
            icon: Users,
            href: "/ira/assign",
            variant: "ghost",
          },
          {
            title: "Allocate Slots",
            icon: Calendar,
            href: "/slots/allocate",
            variant: "ghost",
          },
        ]
      case "admin":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard/admin",
            variant: "default",
          },
          {
            title: "Manage Users",
            icon: Users,
            href: "/users/manage",
            variant: "ghost",
          },
          {
            title: "All Events",
            icon: ClipboardList,
            href: "/events/all",
            variant: "ghost",
          },
          {
            title: "Reports",
            icon: BarChart3,
            href: "/reports",
            variant: "ghost",
          },
        ]
      default:
        return [
          {
            title: "Home",
            icon: Home,
            href: "/",
            variant: "default",
          },
          {
            title: "Login",
            icon: LogOut,
            href: "/login",
            variant: "ghost",
          },
          {
            title: "Register",
            icon: Users,
            href: "/register",
            variant: "ghost",
          },
        ]
    }
  }

  const navItems = getNavItems()

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card shadow-lg transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[240px]",
          isMobile && (isMobileOpen ? "translate-x-0" : "-translate-x-full"),
          !isMobile && "translate-x-0",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center justify-between border-b px-3 py-2">
          <div className="flex items-center gap-2">
            <FileText className={cn("h-6 w-6 text-primary", isCollapsed && "mx-auto")} />
            {!isCollapsed && <h1 className="text-lg font-bold">Events Portal</h1>}
          </div>
          {!isMobile && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Sidebar Content */}
        <ScrollArea className="flex-1 px-2 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-primary/10",
                    isActive(item.href) && "bg-primary/10 text-primary",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive(item.href) && "text-primary")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className={cn("border-t p-3", isCollapsed && "flex flex-col items-center")}>
          {user ? (
            <div className={cn("flex items-center gap-2 mb-3", isCollapsed && "flex-col")}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              )}
            </div>
          ) : null}

          <div className={cn("flex gap-2", isCollapsed && "flex-col")}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => router.push("/profile")}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  )
}
