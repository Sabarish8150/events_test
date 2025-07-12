import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-fade-up">
                  Welcome to the Events Portal
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-up delay-150">
                  Manage and participate in university events with ease
                </p>
              </div>
              <div className="space-x-4 animate-fade-up delay-300">
                <Link href="/login">
                  <Button className="button-pop">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="button-pop">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="animate-fade-right delay-100 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>Submit and manage events with ease</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our platform allows students and faculty to submit event proposals, track their status, and manage
                    all aspects of event planning.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/login">
                    <Button variant="outline" className="w-full button-pop">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="animate-fade-right delay-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>IRA Registration</CardTitle>
                  <CardDescription>Register for IRA positions and track your applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Students can register for IRA positions, while faculty and department heads can manage and assign
                    IRA positions efficiently.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/login">
                    <Button variant="outline" className="w-full button-pop">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="animate-fade-right delay-300 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Slot Allocation</CardTitle>
                  <CardDescription>Efficiently allocate time slots for events</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Department heads can allocate time slots for approved events, ensuring optimal use of resources and
                    avoiding scheduling conflicts.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/login">
                    <Button variant="outline" className="w-full button-pop">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
