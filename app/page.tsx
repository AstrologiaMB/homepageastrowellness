import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="mx-auto max-w-lg text-center shadow-lg border-2 border-accent/20 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Astrowellness
              </h1>
              <div className="w-16 h-0.5 bg-accent mx-auto rounded-full"></div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Tu app personal de astrología
            </p>
            <div className="pt-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border border-accent/20">
                <div className="w-6 h-6 rounded-full bg-accent/30"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
