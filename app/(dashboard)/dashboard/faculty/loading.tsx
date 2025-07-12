import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/page-header"

export default function LoadingFacultyDashboard() {
  return (
    <>
      <PageHeader title="Faculty Dashboard" description="Manage your events and IRA assignments" />

      <div className="relative mb-6">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </>
  )
}
