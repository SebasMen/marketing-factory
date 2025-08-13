"use client";

import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Save } from 'lucide-react';
import ExportButton, { ExportFormat } from './ExportButton';

interface ToolbarProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onFitToScreen: () => void;
  onExport: (format: ExportFormat) => void;
  onSave?: () => void;
  hasUnsavedChanges?: boolean;
  isExporting?: boolean;
}

export default function Toolbar({
  scale,
  onZoomIn,
  onZoomOut,
  onResetView,
  onFitToScreen,
  onExport,
  onSave,
  hasUnsavedChanges = false,
  isExporting = false,
}: ToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border">
      {/* Botón de guardar */}
      {onSave && (
        <>
          <Button
            variant={hasUnsavedChanges ? "default" : "outline"}
            size="sm"
            onClick={onSave}
            title={hasUnsavedChanges ? "Guardar cambios" : "Sin cambios"}
          >
            <Save className="w-4 h-4" />
            {hasUnsavedChanges && <span className="ml-2">Guardar</span>}
          </Button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
        </>
      )}

      {/* Controles de zoom */}
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomOut}
        disabled={scale <= 0.2}
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      
      <span className="px-3 py-1 text-sm font-mono bg-gray-100 rounded min-w-[60px] text-center">
        {Math.round(scale * 100)}%
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomIn}
        disabled={scale >= 4}
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      {/* Controles de vista */}
      <Button
        variant="outline"
        size="sm"
        onClick={onFitToScreen}
        title="Ajustar a pantalla"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onResetView}
        title="Resetear vista"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      {/* Botón de exportar */}
      <ExportButton 
        onExport={onExport}
        isExporting={isExporting}
      />
    </div>
  );
}
