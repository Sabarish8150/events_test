"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface MainNavProps {
  role: "student" | "faculty" | "head" | "admin"
}

export function MainNav({ role }: MainNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, this would clear auth tokens/cookies
    router.push("/login")
  }

  const navItems = {
    student: [
      { href: "/dashboard/student", label: "Dashboard" },
      { href: "/events/submit", label: "Submit Event" },
      { href: "/events/my-events", label: "My Events" },
      { href: "/ira/register", label: "IRA Registration" },
    ],
    faculty: [
      { href: "/dashboard/faculty", label: "Dashboard" },
      { href: "/events/submit", label: "Submit Event" },
      { href: "/ira/manage", label: "Manage IRA" },
    ],
    head: [
      { href: "/dashboard/head", label: "Dashboard" },
      { href: "/events/approve", label: "Approve Events" },
      { href: "/ira/assign", label: "Assign IRA" },
      { href: "/slots/allocate", label: "Allocate Slots" },
    ],
    admin: [
      { href: "/dashboard/admin", label: "Dashboard" },
      { href: "/users/manage", label: "Manage Users" },
      { href: "/events/all", label: "All Events" },
      { href: "/reports", label: "Reports" },
    ],
  }

  const items = navItems[role]

  return (
    <div className="mr-4 flex">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center">
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
