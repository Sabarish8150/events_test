import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex items-center justify-center bg-background">{children}</div>
    </SidebarProvider>
  )
}
