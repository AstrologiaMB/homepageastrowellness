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
  margin: 15, // Reduced from 20 for more content space
  fontSize: {
    title: 22, // Reduced from 24 for better proportion
    subtitle: 16, // Reduced from 18
    body: 11, // Reduced from 12 for more content per page
    small: 9 // Reduced from 10
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

    // Logo o marca de agua (removido para evitar elementos visuales problemáticos)
    // this.pdf.setFontSize(this.config.fontSize.small);
    // this.pdf.setFont('helvetica', 'normal');
    // this.pdf.text('Astrochat', centerX, pageHeight - 20, { align: 'center' });

    // Nueva página para el contenido
    this.pdf.addPage();
    this.currentY = this.config.margin;
  }

  /**
   * Agrega una sección con título
   */
  addSection(title: string, content?: string): void {
    // Calcular espacio disponible en la página actual
    const pageHeight = this.pdf.internal.pageSize.getHeight();
    const footerSpace = 100; // Espacio reservado para footer (aumentado para evitar cortes)
    const availableSpace = pageHeight - footerSpace - this.currentY;

    // Estimar espacio necesario para el título
    this.pdf.setFontSize(this.config.fontSize.subtitle);
    this.pdf.setFont('helvetica', 'bold');
    const titleDimensions = this.pdf.getTextDimensions(title);
    const titleSpaceNeeded = titleDimensions.h + 10; // título + espacio

    // Calcular espacio exacto necesario para el contenido
    let contentSpaceNeeded = 0;
    if (content) {
      this.pdf.setFontSize(this.config.fontSize.body);
      this.pdf.setFont('helvetica', 'normal');
      const textDimensions = this.pdf.getTextDimensions(content, {maxWidth: 170});
      contentSpaceNeeded = textDimensions.h + 10; // altura exacta + margen
    }

    const totalSpaceNeeded = titleSpaceNeeded + contentSpaceNeeded;

    // Si no cabe en la página actual, crear nueva página
    if (totalSpaceNeeded > availableSpace || this.currentY > 220) {
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
      this.currentY += lines.length * 4.5 + 5;
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
   * Agrega una imagen al PDF desde un data URL
   */
  addImageFromDataURL(imageData: string, title?: string): void {
    try {
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

      // Dimensiones fijas para el gráfico astrológico
      // El gráfico original es 500x500px, html2canvas lo escala x2 = 1000x1000px
      // Limitamos a 120mm de alto máximo para que quepa bien en la página
      const maxHeight = 120;
      const imgWidth = maxHeight;  // El gráfico es cuadrado
      const imgHeight = maxHeight;

      // Centrar horizontalmente
      const centerX = (this.pdf.internal.pageSize.getWidth() - imgWidth) / 2;

      this.pdf.addImage(imageData, 'PNG', centerX, this.currentY, imgWidth, imgHeight);
      this.currentY += imgHeight + 15; // Más espacio después del gráfico

    } catch (error) {
      console.error('Error al agregar imagen desde data URL:', error);
      this.addSection('Error', 'No se pudo agregar la imagen del gráfico al PDF.');
    }
  }

  /**
   * Agrega interpretaciones individuales al PDF
   */
  addIndividualInterpretations(interpretations: any[]): void {
    if (!interpretations || !Array.isArray(interpretations) || interpretations.length === 0) {
      console.warn('No hay interpretaciones individuales para agregar al PDF');
      return;
    }

    console.log(`📊 Procesando ${interpretations.length} interpretaciones individuales`);

    let processedCount = 0;
    let skippedCount = 0;

    interpretations.forEach((item, globalIndex) => {
      // Validación de datos
      if (!item || typeof item !== 'object') {
        console.warn(`⚠️ Interpretación ${globalIndex}: Item inválido`);
        skippedCount++;
        return;
      }

      const cleanTitle = (item.titulo || item.title || `Interpretación ${globalIndex + 1}`).toString().trim();
      const cleanInterpretation = (item.interpretacion || item.content || '').toString().trim();

      if (!cleanTitle || !cleanInterpretation) {
        console.warn(`⚠️ Interpretación ${globalIndex}: Título o contenido vacío`);
        skippedCount++;
        return;
      }

      // Verificar si necesitamos una nueva página (con más espacio para footer)
      const pageHeight = this.pdf.internal.pageSize.getHeight();
      const footerSpace = 100; // Espacio reservado para footer (consistente con addSection)
      const availableSpace = pageHeight - footerSpace - this.currentY;

      // Estimar espacio necesario para esta interpretación
      const titleLines = this.pdf.splitTextToSize(`${globalIndex + 1}. ${cleanTitle}`, 170);
      const contentLines = this.pdf.splitTextToSize(cleanInterpretation, 170);
      const estimatedHeight = (titleLines.length + contentLines.length) * 4.5 + 8; // 4.5 line height + spacing

      if (availableSpace < estimatedHeight || this.currentY > 200) {
        this.pdf.addPage();
        this.currentY = this.config.margin;
      }

      // Número y título
      this.pdf.setFontSize(this.config.fontSize.body);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.text(`${globalIndex + 1}. ${cleanTitle}`, this.config.margin, this.currentY);
      this.currentY += 6;

      // Contenido de la interpretación
      this.pdf.setFont('helvetica', 'normal');
      const lines = this.pdf.splitTextToSize(cleanInterpretation, 170);
      this.pdf.text(lines, this.config.margin, this.currentY);
      this.currentY += lines.length * 4.5 + 8; // Espacio entre interpretaciones

      processedCount++;

      // Logging de progreso cada 10 interpretaciones
      if ((globalIndex + 1) % 10 === 0) {
        console.log(`📊 Progreso: ${globalIndex + 1}/${interpretations.length} interpretaciones procesadas (${this.pdf.getNumberOfPages()} páginas)`);
      }
    });

    console.log(`🎉 PROCESAMIENTO COMPLETADO:`);
    console.log(`   ✅ Procesadas exitosamente: ${processedCount}/${interpretations.length}`);
    console.log(`   ⚠️ Omitidas por errores: ${skippedCount}/${interpretations.length}`);
    console.log(`   📄 Páginas totales: ${this.pdf.getNumberOfPages()}`);
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
  userInfo?: { name?: string; birthDate?: string; birthPlace?: string },
  chartImage?: string
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

  // Gráfico astrológico
  if (chartImage) {
    generator.addImageFromDataURL(chartImage, 'Carta Natal Tropical');
  }

  // Interpretación narrativa
  if (interpretations?.interpretacion_narrativa) {
    generator.addSection('Interpretación Astrológica', interpretations.interpretacion_narrativa);
  }

  // Interpretaciones individuales
  if (interpretations?.interpretaciones_individuales) {
    generator.addIndividualInterpretations(interpretations.interpretaciones_individuales);
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
