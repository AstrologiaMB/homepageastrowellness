import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ProximamentePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/5">
      <Card className="max-w-md w-full border-primary/20 shadow-lg bg-card/60 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 dark:bg-primary/20 w-fit">
            <Sparkles className="w-12 h-12 text-primary" strokeWidth={1.5} />
          </div>
          <CardTitle className="text-2xl gradient-primary">Próximamente</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Esta funcionalidad estará disponible en el futuro. Estamos trabajando para traerte lo
            mejor de la astrología.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
