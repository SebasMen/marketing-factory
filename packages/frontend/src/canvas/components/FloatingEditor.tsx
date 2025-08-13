"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CanvasElement, TextElement, ImageElement, ColorElement } from '../types';
import { X, Upload } from 'lucide-react';

interface FloatingEditorProps {
  element: CanvasElement;
  onElementChange: (elementId: string, changes: Partial<CanvasElement>) => void;
  onClose: () => void;
  position: { x: number; y: number };
}

export default function FloatingEditor({
  element,
  onElementChange,
  onClose,
  position,
}: FloatingEditorProps) {
  const handleTextChange = (newText: string) => {
    onElementChange(element.id, { text: newText } as Partial<TextElement>);
  };

  const handleColorChange = (newColor: string) => {
    onElementChange(element.id, { fill: newColor } as Partial<ColorElement>);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onElementChange(element.id, { src: e.target.result as string } as Partial<ImageElement>);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className="fixed z-50 bg-white rounded-lg shadow-xl border p-4 min-w-80"
      style={{
        left: Math.min(position.x, window.innerWidth - 350),
        top: Math.min(position.y, window.innerHeight - 200),
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Editar Elemento</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {element.type === 'text' && (
        <div className="space-y-3">
          <label className="block text-sm font-medium">Texto</label>
          <Input
            value={(element as TextElement).text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Escribe el texto..."
            autoFocus
          />
          <label className="block text-sm font-medium">Color del texto</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={(element as TextElement).fill || '#000000'}
              onChange={(e) => onElementChange(element.id, { fill: e.target.value })}
              className="w-12 h-8 rounded border"
            />
            <Input
              value={(element as TextElement).fill || '#000000'}
              onChange={(e) => onElementChange(element.id, { fill: e.target.value })}
              placeholder="#000000"
            />
          </div>
        </div>
      )}

      {element.type === 'image' && (
        <div className="space-y-3">
          <label className="block text-sm font-medium">Cambiar imagen</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-2">Arrastra una imagen o haz clic para seleccionar</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="hidden"
              id="floating-image-upload"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById('floating-image-upload')?.click()}
            >
              Seleccionar archivo
            </Button>
          </div>
        </div>
      )}

      {element.type === 'color' && (
        <div className="space-y-3">
          <label className="block text-sm font-medium">Color de fondo</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={(element as ColorElement).fill || '#000000'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-12 h-8 rounded border"
            />
            <Input
              value={(element as ColorElement).fill || '#000000'}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#000000"
            />
          </div>
        </div>
      )}
    </div>
  );
}
