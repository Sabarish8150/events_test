import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

interface DashboardHeaderProps {
  role: "student" | "faculty" | "head" | "admin"
  user: {
    name: string
    email: string
    image?: string
  }
}

export function DashboardHeader({ role, user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <h1 className="text-xl font-bold">External Events Portal</h1>
        </div>
        <MainNav role={role} />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav user={user} />
        </div>
      </div>
    </header>
  )
}
