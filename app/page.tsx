import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  return (
    <Card className="mx-auto max-w-md text-center mt-10 shadow-md">
      <CardContent>
        <h1 className="text-2xl font-bold">Astrowellness</h1>
        <p className="text-muted-foreground mt-2">
          Tu app personal de astrología
        </p>
      </CardContent>
    </Card>
  )
}
