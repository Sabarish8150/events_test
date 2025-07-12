"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Award, Calendar, Download, User } from "lucide-react"

export default function CertificatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [certificate, setCertificate] = useState<any>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock certificate data
      setCertificate({
        id: params.id,
        eventName: params.id === "1" ? "Tech Conference 2023" : "Hackathon 2023",
        studentName: "John Doe",
        date: params.id === "1" ? "2023-12-10" : "2023-12-05",
        marks: params.id === "1" ? 85 : 90,
        status: "Passed",
      })
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [params.id])

  const handleDownload = () => {
    // In a real app, this would download the certificate
    alert("Certificate download started")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading certificate...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="IRA Certificate"
        description="View and download your certificate"
        actions={
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        }
      />

      <div className="flex justify-center py-8">
        <Card className="w-full max-w-3xl border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent rounded-lg -z-10" />
          <CardHeader className="text-center border-b pb-6 bg-muted/30">
            <CardTitle className="text-3xl font-bold">Certificate of Completion</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-6 px-8">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-12 h-12 text-primary" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium mb-1">This is to certify that</h2>
              <p className="text-3xl font-bold text-primary mb-1">{certificate.studentName}</p>
              <p className="text-xl">
                has successfully completed the IRA for <span className="font-semibold">{certificate.eventName}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(certificate.date).toLocaleDateString()}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <Award className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="font-medium">{certificate.marks}/100</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <User className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{certificate.status}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleDownload} className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
