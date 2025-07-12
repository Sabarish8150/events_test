import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

// Mock user data - in a real app, this would come from an API or auth context
const user = {
  name: "John Doe",
  email: "john.doe@office.edu",
  role: "student",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar user={user} />
        <div className="md:pl-[240px] transition-all duration-300">
          <main className="min-h-screen p-4 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
