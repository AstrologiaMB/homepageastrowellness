"use client";

/**
 * Componente de botón para descargar PDFs de cartas astrológicas
 *
 * Utiliza componentes de shadcn/ui para una experiencia consistente
 * Incluye estados de carga, manejo de errores y feedback visual
 *
 * @author Astrowellness Team
 * @version 1.0.0
 */

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, FileText, AlertCircle, CheckCircle } from "lucide-react";
import html2canvas from "html2canvas";
import { generateTropicalPDF, generateDraconicPDF } from "@/lib/pdf-generator";

interface PDFDownloadButtonProps {
  /** Tipo de carta: 'tropical' o 'draconica' */
  type: 'tropical' | 'draconica';

  /** Datos de la carta astrológica */
  chartData: any;

  /** Datos tropicales (requerido para cartas dracónicas) */
  tropicalData?: any;

  /** Interpretaciones astrológicas */
  interpretations?: any;

  /** Eventos dracónicos (solo para cartas dracónicas) */
  draconicEvents?: any[];

  /** Información del usuario */
  userInfo?: {
    name?: string;
    birthDate?: string;
    birthPlace?: string;
  };

  /** Clases CSS adicionales */
  className?: string;

  /** Tamaño del botón */
  size?: 'sm' | 'default' | 'lg';

  /** Variante del botón */
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
}

/**
 * Estados del proceso de descarga
 */
type DownloadState = 'idle' | 'generating' | 'success' | 'error';

/**
 * Componente PDFDownloadButton
 */
export function PDFDownloadButton({
  type,
  chartData,
  tropicalData,
  interpretations,
  draconicEvents,
  userInfo,
  className = '',
  size = 'default',
  variant = 'default'
}: PDFDownloadButtonProps) {
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  /**
   * Maneja el proceso de descarga del PDF
   */
  const handleDownload = async () => {
    if (!chartData) {
      setError('No hay datos de carta disponibles para generar el PDF.');
      setDownloadState('error');
      return;
    }

    setDownloadState('generating');
    setProgress(0);
    setError(null);
    setShowDialog(true);

    try {
      // Simular progreso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      if (type === 'tropical') {
        // Capturar el gráfico astrológico de la página actual
        let chartImage: string | undefined;
        try {
          const chartElement = document.querySelector('#chart-container') as HTMLElement;
          if (chartElement) {
            // Forzar captura cuadrada para evitar distorsión ovalada
            const size = Math.min(chartElement.offsetWidth, chartElement.offsetHeight);
            const canvas = await html2canvas(chartElement, {
              scale: 2,
              useCORS: true,
              allowTaint: false,
              backgroundColor: '#ffffff',
              width: size,      // Forzar ancho cuadrado
              height: size,     // Forzar alto cuadrado
              x: 0,             // Capturar desde esquina superior izquierda
              y: 0              // Capturar desde esquina superior izquierda
            });
            chartImage = canvas.toDataURL('image/png');
          }
        } catch (error) {
          console.warn('No se pudo capturar el gráfico astrológico:', error);
          // Continuar sin el gráfico si falla la captura
        }

        await generateTropicalPDF(chartData, interpretations, userInfo, chartImage);
      } else if (type === 'draconica') {
        if (!tropicalData) {
          throw new Error('Se requieren datos tropicales para generar PDF dracónico.');
        }
        await generateDraconicPDF(chartData, tropicalData, interpretations, draconicEvents || [], userInfo);
      }

      // Completar progreso
      setProgress(100);
      setDownloadState('success');

      // Cerrar diálogo después de 2 segundos
      setTimeout(() => {
        setShowDialog(false);
        setDownloadState('idle');
        setProgress(0);
      }, 2000);

    } catch (err) {
      console.error('Error generando PDF:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al generar el PDF');
      setDownloadState('error');
      setProgress(0);
    }
  };

  /**
   * Obtiene el texto del botón según el estado
   */
  const getButtonText = () => {
    switch (downloadState) {
      case 'generating':
        return 'Generando PDF...';
      case 'success':
        return '¡PDF Generado!';
      case 'error':
        return 'Error - Reintentar';
      default:
        return type === 'tropical' ? 'Descargar Carta Tropical' : 'Descargar Carta Dracónica';
    }
  };

  /**
   * Obtiene el ícono del botón según el estado
   */
  const getButtonIcon = () => {
    switch (downloadState) {
      case 'generating':
        return <FileText className="mr-2 h-4 w-4 animate-pulse" />;
      case 'success':
        return <CheckCircle className="mr-2 h-4 w-4" />;
      case 'error':
        return <AlertCircle className="mr-2 h-4 w-4" />;
      default:
        return <Download className="mr-2 h-4 w-4" />;
    }
  };

  /**
   * Obtiene la variante del botón según el estado
   */
  const getButtonVariant = () => {
    if (downloadState === 'error') return 'destructive';
    if (downloadState === 'success') return 'default';
    return variant;
  };

  return (
    <>
      <Button
        onClick={handleDownload}
        disabled={downloadState === 'generating' || !chartData}
        size={size}
        variant={getButtonVariant()}
        className={className}
      >
        {getButtonIcon()}
        {getButtonText()}
      </Button>

      {/* Diálogo de progreso */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {downloadState === 'generating' && <FileText className="mr-2 h-5 w-5 animate-pulse" />}
              {downloadState === 'success' && <CheckCircle className="mr-2 h-5 w-5 text-green-500" />}
              {downloadState === 'error' && <AlertCircle className="mr-2 h-5 w-5 text-red-500" />}
              {downloadState === 'generating' && 'Generando PDF'}
              {downloadState === 'success' && '¡PDF Generado Exitosamente!'}
              {downloadState === 'error' && 'Error al Generar PDF'}
            </DialogTitle>
            <DialogDescription>
              {downloadState === 'generating' && `Creando tu carta ${type === 'tropical' ? 'tropical' : 'dracónica'} en PDF...`}
              {downloadState === 'success' && 'El PDF se ha descargado automáticamente a tu dispositivo.'}
              {downloadState === 'error' && 'Ocurrió un error al generar el PDF. Por favor, intenta nuevamente.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {downloadState === 'generating' && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">
                  {progress < 30 && 'Preparando datos...'}
                  {progress >= 30 && progress < 60 && 'Generando contenido...'}
                  {progress >= 60 && progress < 90 && 'Aplicando formato...'}
                  {progress >= 90 && 'Finalizando descarga...'}
                </p>
              </div>
            )}

            {downloadState === 'success' && (
              <div className="flex items-center justify-center p-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            )}

            {downloadState === 'error' && error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {downloadState === 'error' && (
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                >
                  Cerrar
                </Button>
                <Button
                  onClick={handleDownload}
                >
                  Reintentar
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
