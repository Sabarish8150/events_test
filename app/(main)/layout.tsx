import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="md:pl-[240px] transition-all duration-300">
          <main className="min-h-screen">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
