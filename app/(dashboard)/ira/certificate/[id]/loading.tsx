import { LoadingSpinner } from "@/components/loading-spinner"

export default function CertificateLoading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading certificate...</p>
      </div>
    </div>
  )
}
