/**
 * Utilidades para generar PDFs de cartas astrológicas
 *
 * Este módulo proporciona funciones para generar PDFs de alta calidad
 * con contenido astrológico, incluyendo tablas, gráficos y texto formateado.
 *
 * @author Astrochat Team
 * @version 1.0.0
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Configuración para la generación de PDFs
 */
export interface PDFConfig {
  title: string;
  author?: string;
  subject?: string;
  format: 'a4' | 'letter';
  orientation: 'portrait' | 'landscape';
  margin: number;
  fontSize: {
    title: number;
    subtitle: number;
    body: number;
    small: number;
  };
}

/**
 * Configuración por defecto para PDFs astrológicos
 */
export const DEFAULT_PDF_CONFIG: PDFConfig = {
  title: 'Carta Astrológica',
  author: 'Astrochat',
  subject: 'Análisis astrológico personalizado',
  format: 'a4',
  orientation: 'portrait',
  margin: 20,
  fontSize: {
    title: 24,
    subtitle: 18,
    body: 12,
    small: 10
  }
};

/**
 * Clase principal para generar PDFs astrológicos
 */
export class AstroPDFGenerator {
  private pdf: jsPDF;
  private config: PDFConfig;
  private currentY: number;

  constructor(config: Partial<PDFConfig> = {}) {
    this.config = { ...DEFAULT_PDF_CONFIG, ...config };
    this.pdf = new jsPDF({
      orientation: this.config.orientation,
      unit: 'mm',
      format: this.config.format
    });
    this.currentY = this.config.margin;

    // Configurar metadatos
    this.pdf.setProperties({
      title: this.config.title,
      author: this.config.author,
      subject: this.config.subject,
      creator: 'Astrochat PDF Generator'
    });
  }

  /**
   * Agrega una portada al PDF
   */
  addCoverPage(title: string, subtitle?: string, date?: string): void {
    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;

    // Título principal
    this.pdf.setFontSize(this.config.fontSize.title);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, centerX, 80, { align: 'center' });

    // Subtítulo
    if (subtitle) {
      this.pdf.setFontSize(this.config.fontSize.subtitle);
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.text(subtitle, centerX, 100, { align: 'center' });
    }

    // Fecha
    if (date) {
      this.pdf.setFontSize(this.config.fontSize.body);
      this.pdf.setFont('helvetica', 'italic');
      this.pdf.text(`Generado el ${date}`, centerX, 120, { align: 'center' });
    }

    // Logo o marca de agua
    this.pdf.setFontSize(this.config.fontSize.small);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text('Astrochat', centerX, pageHeight - 20, { align: 'center' });

    // Nueva página para el contenido
    this.pdf.addPage();
    this.currentY = this.config.margin;
  }

  /**
   * Agrega una sección con título
   */
  addSection(title: string, content?: string): void {
    // Verificar si necesitamos una nueva página
    if (this.currentY > 250) {
      this.pdf.addPage();
      this.currentY = this.config.margin;
    }

    // Título de sección
    this.pdf.setFontSize(this.config.fontSize.subtitle);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, this.config.margin, this.currentY);
    this.currentY += 10;

    // Contenido de la sección
    if (content) {
      this.pdf.setFontSize(this.config.fontSize.body);
      this.pdf.setFont('helvetica', 'normal');

      const lines = this.pdf.splitTextToSize(content, 170);
      this.pdf.text(lines, this.config.margin, this.currentY);
      this.currentY += lines.length * 5 + 5;
    }
  }

  /**
   * Agrega una tabla al PDF
   */
  addTable(headers: string[], rows: string[][], title?: string): void {
    // Verificar si necesitamos una nueva página
    if (this.currentY > 200) {
      this.pdf.addPage();
      this.currentY = this.config.margin;
    }

    // Título de la tabla
    if (title) {
      this.pdf.setFontSize(this.config.fontSize.subtitle);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.text(title, this.config.margin, this.currentY);
      this.currentY += 8;
    }

    const startY = this.currentY;
    const rowHeight = 8;
    const colWidth = 170 / headers.length;

    // Headers
    this.pdf.setFontSize(this.config.fontSize.small);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setFillColor(240, 240, 240);

    headers.forEach((header, index) => {
      const x = this.config.margin + (index * colWidth);
      this.pdf.rect(x, startY, colWidth, rowHeight, 'F');
      this.pdf.text(header, x + 2, startY + 6);
    });

    this.currentY += rowHeight;

    // Rows
    this.pdf.setFont('helvetica', 'normal');
    rows.forEach((row, rowIndex) => {
      const fillColor = rowIndex % 2 === 0 ? [255, 255, 255] : [248, 248, 248];
      this.pdf.setFillColor(fillColor[0], fillColor[1], fillColor[2]);

      row.forEach((cell, colIndex) => {
        const x = this.config.margin + (colIndex * colWidth);
        this.pdf.rect(x, this.currentY, colWidth, rowHeight, 'F');
        this.pdf.text(cell.toString(), x + 2, this.currentY + 6);
      });

      this.currentY += rowHeight;
    });

    this.currentY += 10;
  }

  /**
   * Agrega una imagen al PDF desde un elemento HTML
   */
  async addImageFromElement(element: HTMLElement, title?: string): Promise<void> {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Verificar si necesitamos una nueva página
      if (this.currentY > 150) {
        this.pdf.addPage();
        this.currentY = this.config.margin;
      }

      // Título de la imagen
      if (title) {
        this.pdf.setFontSize(this.config.fontSize.subtitle);
        this.pdf.setFont('helvetica', 'bold');
        this.pdf.text(title, this.config.margin, this.currentY);
        this.currentY += 8;
      }

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Ajustar tamaño si es demasiado grande
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;

      if (imgHeight > 150) {
        finalHeight = 150;
        finalWidth = (canvas.width * finalHeight) / canvas.height;
      }

      this.pdf.addImage(imgData, 'PNG', this.config.margin, this.currentY, finalWidth, finalHeight);
      this.currentY += finalHeight + 10;

    } catch (error) {
      console.error('Error al convertir elemento a imagen:', error);
      this.addSection('Error', 'No se pudo generar la imagen del gráfico.');
    }
  }

  /**
   * Agrega un pie de página
   */
  addFooter(text: string): void {
    const pageCount = this.pdf.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      this.pdf.setPage(i);
      this.pdf.setFontSize(this.config.fontSize.small);
      this.pdf.setFont('helvetica', 'italic');

      const pageWidth = this.pdf.internal.pageSize.getWidth();
      const pageHeight = this.pdf.internal.pageSize.getHeight();

      this.pdf.text(text, pageWidth / 2, pageHeight - 10, { align: 'center' });
      this.pdf.text(`Página ${i} de ${pageCount}`, pageWidth - this.config.margin, pageHeight - 10, { align: 'right' });
    }
  }

  /**
   * Guarda el PDF
   */
  save(filename: string): void {
    this.pdf.save(filename);
  }

  /**
   * Obtiene el PDF como blob
   */
  getBlob(): Blob {
    return this.pdf.output('blob');
  }

  /**
   * Obtiene el PDF como data URL
   */
  getDataURL(): string {
    return this.pdf.output('dataurlstring');
  }
}

/**
 * Función utilitaria para generar PDF de carta tropical
 */
export async function generateTropicalPDF(
  chartData: any,
  interpretations: any,
  userInfo?: { name?: string; birthDate?: string; birthPlace?: string }
): Promise<void> {
  const generator = new AstroPDFGenerator({
    title: 'Carta Natal Tropical',
    subject: 'Análisis astrológico completo'
  });

  // Portada
  const date = new Date().toLocaleDateString('es-ES');
  generator.addCoverPage(
    'Carta Natal Tropical',
    userInfo?.name ? `Análisis para ${userInfo.name}` : 'Análisis Astrológico Personalizado',
    date
  );

  // Información del usuario
  if (userInfo) {
    let userInfoText = '';
    if (userInfo.birthDate) userInfoText += `Fecha de nacimiento: ${userInfo.birthDate}\n`;
    if (userInfo.birthPlace) userInfoText += `Lugar de nacimiento: ${userInfo.birthPlace}`;

    if (userInfoText) {
      generator.addSection('Información Personal', userInfoText);
    }
  }

  // Tabla de planetas
  if (chartData?.points) {
    const headers = ['Planeta', 'Signo', 'Posición', 'Casa'];
    const rows: string[][] = [];

    Object.entries(chartData.points).forEach(([planet, data]: [string, any]) => {
      if (['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'].includes(planet)) {
        rows.push([
          planet,
          data.sign || '',
          data.longitude ? `${Math.floor(data.longitude % 30)}°${Math.floor((data.longitude % 1) * 60)}'` : '',
          'Casa calculada' // Aquí iría la lógica de cálculo de casa
        ]);
      }
    });

    generator.addTable(headers, rows, 'Posiciones Planetarias');
  }

  // Interpretaciones
  if (interpretations?.interpretacion_narrativa) {
    generator.addSection('Interpretación Astrológica', interpretations.interpretacion_narrativa);
  }

  // Pie de página
  generator.addFooter('Generado por Astrochat - www.astrochat.com');

  // Guardar
  const filename = `carta-tropical-${userInfo?.name || 'usuario'}-${Date.now()}.pdf`;
  generator.save(filename);
}

/**
 * Función utilitaria para generar PDF de carta dracónica
 */
export async function generateDraconicPDF(
  chartData: any,
  tropicalData: any,
  interpretations: any,
  events: any[],
  userInfo?: { name?: string; birthDate?: string; birthPlace?: string }
): Promise<void> {
  const generator = new AstroPDFGenerator({
    title: 'Carta Dracónica',
    subject: 'Análisis astrológico dracónico completo'
  });

  // Portada
  const date = new Date().toLocaleDateString('es-ES');
  generator.addCoverPage(
    'Carta Dracónica',
    userInfo?.name ? `Análisis para ${userInfo.name}` : 'Análisis Astrológico Dracónico',
    date
  );

  // Información del usuario
  if (userInfo) {
    let userInfoText = '';
    if (userInfo.birthDate) userInfoText += `Fecha de nacimiento: ${userInfo.birthDate}\n`;
    if (userInfo.birthPlace) userInfoText += `Lugar de nacimiento: ${userInfo.birthPlace}`;

    if (userInfoText) {
      generator.addSection('Información Personal', userInfoText);
    }
  }

  // Comparación Tropical vs Dracónica
  generator.addSection('Introducción a la Carta Dracónica',
    'La carta dracónica representa el alma y el propósito espiritual. ' +
    'Se calcula moviendo cada planeta 29° hacia atrás, revelando lecciones kármicas y potencial espiritual.'
  );

  // Tabla comparativa
  if (chartData?.points && tropicalData?.points) {
    const headers = ['Planeta', 'Tropical', 'Dracónica', 'Diferencia'];
    const rows: string[][] = [];

    ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'].forEach(planet => {
      const tropical = tropicalData.points[planet];
      const draconic = chartData.points[planet];

      if (tropical && draconic) {
        const tropicalPos = `${tropical.sign} ${Math.floor(tropical.longitude % 30)}°`;
        const draconicPos = `${draconic.sign} ${Math.floor(draconic.longitude % 30)}°`;
        const diff = Math.abs(tropical.longitude - draconic.longitude).toFixed(1);

        rows.push([planet, tropicalPos, draconicPos, `${diff}°`]);
      }
    });

    generator.addTable(headers, rows, 'Comparación Tropical vs Dracónica');
  }

  // Eventos dracónicos
  if (events && events.length > 0) {
    generator.addSection('Eventos Dracónicos Importantes',
      events.slice(0, 10).map(event => `• ${event.titulo}: ${event.descripcion}`).join('\n')
    );
  }

  // Interpretaciones
  if (interpretations?.interpretacion_narrativa) {
    generator.addSection('Interpretación Dracónica', interpretations.interpretacion_narrativa);
  }

  // Pie de página
  generator.addFooter('Generado por Astrochat - www.astrochat.com');

  // Guardar
  const filename = `carta-draconica-${userInfo?.name || 'usuario'}-${Date.now()}.pdf`;
  generator.save(filename);
}
