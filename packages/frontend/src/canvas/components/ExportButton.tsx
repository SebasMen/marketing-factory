"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: (format: ExportFormat) => void;
  isExporting?: boolean;
}

export type ExportFormat = 'png' | 'jpg' | 'pdf' | 'html';

const formatOptions = [
  { value: 'png' as const, label: 'PNG - Imagen', description: 'Imagen con transparencia' },
  { value: 'jpg' as const, label: 'JPG - Imagen', description: 'Imagen optimizada' },
  { value: 'pdf' as const, label: 'PDF - Documento', description: 'Documento imprimible' },
  { value: 'html' as const, label: 'HTML - Email', description: 'Para correos electrónicos' },
];

export default function ExportButton({ onExport, isExporting = false }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');

  const handleExport = (format: ExportFormat) => {
    setSelectedFormat(format);
    onExport(format);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex">
        <Button
          variant="default"
          size="sm"
          onClick={() => handleExport(selectedFormat)}
          disabled={isExporting}
          className="rounded-r-none border-r border-white/20"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exportando...' : `Exportar ${selectedFormat.toUpperCase()}`}
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isExporting}
          className="rounded-l-none px-2"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-lg shadow-lg border min-w-60">
            <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-700 px-3 py-2">Formato de exportación</h3>
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleExport(option.value)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                    selectedFormat === option.value ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
