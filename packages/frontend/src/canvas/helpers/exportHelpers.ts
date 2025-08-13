/* eslint-disable @typescript-eslint/no-explicit-any */
import { Template, CanvasElement } from '../types';
import jsPDF from 'jspdf';

export type ExportFormat = 'png' | 'jpg' | 'pdf' | 'html';

export interface ExportOptions {
  format: ExportFormat;
  quality?: number;
  scale?: number;
}

export class CanvasExporter {
  private stageRef: React.RefObject<any>;
  private template: Template;

  constructor(stageRef: React.RefObject<any>, template: Template) {
    this.stageRef = stageRef;
    this.template = template;
  }

  async export(options: ExportOptions): Promise<void> {
    const { format, quality = 1, scale = 2 } = options;

    switch (format) {
      case 'png':
        return this.exportAsPNG(scale);
      case 'jpg':
        return this.exportAsJPG(quality, scale);
      case 'pdf':
        return this.exportAsPDF(scale);
      case 'html':
        return this.exportAsHTML();
      default:
        throw new Error(`Formato no soportado: ${format}`);
    }
  }

  private exportAsPNG(scale: number): void {
    if (!this.stageRef.current) throw new Error('Canvas no disponible');
    
    const uri = this.stageRef.current.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: scale,
    });
    
    this.downloadFile(uri, `${this.template.name}.png`);
  }

  private exportAsJPG(quality: number, scale: number): void {
    if (!this.stageRef.current) throw new Error('Canvas no disponible');
    
    const uri = this.stageRef.current.toDataURL({
      mimeType: 'image/jpeg',
      quality,
      pixelRatio: scale,
    });
    
    this.downloadFile(uri, `${this.template.name}.jpg`);
  }

  private async exportAsPDF(scale: number): Promise<void> {
    if (!this.stageRef.current) throw new Error('Canvas no disponible');
    
    const uri = this.stageRef.current.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: scale,
    });
    
    // Convertir template dimensions a mm (A4 = 210 x 297 mm)
    const templateWidth = this.template.width;
    const templateHeight = this.template.height;
    const aspectRatio = templateWidth / templateHeight;
    
    let pdfWidth = 210; // A4 width in mm
    let pdfHeight = pdfWidth / aspectRatio;
    
    // Si la altura es mayor que A4, ajustar
    if (pdfHeight > 297) {
      pdfHeight = 297;
      pdfWidth = pdfHeight * aspectRatio;
    }
    
    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    pdf.addImage(uri, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${this.template.name}.pdf`);
  }

  private exportAsHTML(): void {
    const htmlContent = this.generateHTMLFromTemplate();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `${this.template.name}.html`);
    URL.revokeObjectURL(url);
  }

  private generateHTMLFromTemplate(): string {
    const { template } = this;
    
    // Generar CSS inline para email compatibility
    const generateElementCSS = (element: CanvasElement) => {
      const baseStyles = `
        position: absolute;
        left: ${element.x}px;
        top: ${element.y}px;
        width: ${element.width || 'auto'}px;
        height: ${element.height || 'auto'}px;
      `;
      
      if (element.type === 'text') {
        return baseStyles + `
          font-size: ${element.fontSize || 16}px;
          font-family: ${element.fontFamily || 'Arial, sans-serif'};
          color: ${element.fill || '#000000'};
          text-align: ${element.align || 'left'};
        `;
      }
      
      if (element.type === 'color') {
        return baseStyles + `
          background-color: ${element.fill || '#ffffff'};
          border-radius: ${element.radius || 0}px;
        `;
      }
      
      return baseStyles;
    };

    const elementsHTML = template.sections
      .filter(section => section.visible)
      .sort((a, b) => a.order - b.order)
      .map(section => 
        section.elements
          .map(element => {
            if (element.type === 'text') {
              return `<div style="${generateElementCSS(element)}">${element.text}</div>`;
            }
            if (element.type === 'image') {
              return `<img src="${element.src}" alt="${element.alt || ''}" style="${generateElementCSS(element)}" />`;
            }
            if (element.type === 'color') {
              return `<div style="${generateElementCSS(element)}"></div>`;
            }
            return '';
          })
          .join('')
      )
      .join('');

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        .email-container {
            position: relative;
            width: ${template.width}px;
            height: ${template.height}px;
            background-color: ${template.background};
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${elementsHTML}
    </div>
</body>
</html>`;
  }

  private downloadFile(uri: string, filename: string): void {
    const link = document.createElement('a');
    link.download = filename;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
