"use client";

import { Button } from "@/components/ui/button";
import { Template, TemplateSection, CanvasElement, TextElement } from '../types';
import { Eye, EyeOff, Type, Image as ImageIcon, Palette } from 'lucide-react';

interface ContentPanelProps {
  template: Template;
  selectedElement: CanvasElement | null;
  selectedSection: TemplateSection | null;
  onSectionToggle: (sectionId: string, visible: boolean) => void;
  onElementSelect: (element: CanvasElement | null) => void;
  onSectionSelect: (section: TemplateSection | null) => void;
}

export default function ContentPanel({
  template,
  selectedElement,
  selectedSection,
  onSectionToggle,
  onElementSelect,
  onSectionSelect,
}: ContentPanelProps) {
  const getElementIcon = (type: CanvasElement['type']) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'color': return <Palette className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="w-80 bg-white border-r border-border h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="font-semibold text-lg mb-4">Contenido de Plantilla</h2>
        
        {/* Información de la plantilla */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-sm text-gray-600 mb-1">PLANTILLA</h3>
          <p className="font-semibold">{template.name}</p>
          <p className="text-sm text-gray-500 capitalize">{template.type}</p>
        </div>

        {/* Lista de secciones */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-gray-600 mb-3">SECCIONES</h3>
          
          {template.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <div 
                key={section.id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  selectedSection?.id === section.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSectionSelect(section)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{section.name}</h4>
                  <div className="flex items-center gap-2">
                    {section.locked && (
                      <span className="text-xs text-gray-500">🔒</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSectionToggle(section.id, !section.visible);
                      }}
                    >
                      {section.visible ? 
                        <Eye className="w-4 h-4" /> : 
                        <EyeOff className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                </div>
                
                {section.description && (
                  <p className="text-xs text-gray-500 mb-2">{section.description}</p>
                )}
                
                {/* Elementos editables de la sección */}
                <div className="space-y-2">
                  {section.elements
                    .filter(el => el.type !== 'static')
                    .map((element) => (
                      <div
                        key={element.id}
                        className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${
                          selectedElement?.id === element.id
                            ? 'border-blue-400 bg-blue-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onElementSelect(element);
                        }}
                      >
                        {getElementIcon(element.type)}
                        <span className="text-sm flex-1 truncate">
                          {element.type === 'text' && (element as TextElement).text}
                          {element.type === 'image' && 'Imagen'}
                          {element.type === 'color' && 'Color de fondo'}
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
