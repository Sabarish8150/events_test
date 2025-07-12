import type React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, description, backHref, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        {backHref && (
          <Link href={backHref}>
            <Button variant="ghost" size="sm" className="mb-1 -ml-3 h-8 px-2">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          </Link>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
