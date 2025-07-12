import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "@/components/page-header"

export default function LoadingApproveEvents() {
  return (
    <>
      <PageHeader
        title="Approve Events"
        description="Review and approve pending event proposals"
        backHref="/dashboard/head"
      />

      <div className="relative mb-6 mt-6">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
        ))}
      </div>
    </>
  )
}
