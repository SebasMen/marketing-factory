import { Template, TemplateType, TemplateSection, CanvasElement } from '../types';

// Helper para crear una plantilla vacía
export const createEmptyTemplate = (
  type: TemplateType,
  width: number = 900,
  height: number = 600
): Template => {
  return {
    id: `template-${Date.now()}`,
    name: `Nueva plantilla ${type}`,
    type,
    width,
    height,
    background: '#ffffff',
    sections: [],
    metadata: {
      version: '1.0',
      createdAt: new Date().toISOString(),
    },
  };
};

// Helper para obtener elementos editables de una sección
export const getEditableElements = (section: TemplateSection): CanvasElement[] => {
  return section.elements.filter(element => 
    element.type !== 'static' && 'editable' in element && element.editable === true
  );
};

// Helper para obtener elementos por tipo
export const getElementsByType = (
  sections: TemplateSection[], 
  type: CanvasElement['type']
): CanvasElement[] => {
  return sections
    .flatMap(section => section.elements)
    .filter(element => element.type === type);
};

// Helper para ocultar/mostrar sección
export const toggleSectionVisibility = (
  sections: TemplateSection[],
  sectionId: string,
  visible: boolean
): TemplateSection[] => {
  return sections.map(section =>
    section.id === sectionId
      ? { ...section, visible }
      : section
  );
};

// Helper para actualizar un elemento
export const updateElement = (
  sections: TemplateSection[],
  elementId: string,
  changes: Partial<CanvasElement>
): TemplateSection[] => {
  return sections.map(section => ({
    ...section,
    elements: section.elements.map(element =>
      element.id === elementId
        ? { ...element, ...changes } as CanvasElement
        : element
    ),
  }));
};

// Helper para validar que una plantilla de Illustrator es válida
export const validateIllustratorTemplate = (data: unknown): data is {
  width: number;
  height: number;
  sections: TemplateSection[];
  name?: string;
  background?: string;
  filename?: string;
} => {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.width === 'number' &&
    typeof obj.height === 'number' &&
    Array.isArray(obj.sections)
  );
};

// Helper para convertir datos de Illustrator a nuestro formato
export const parseIllustratorTemplate = (
  data: {
    width: number;
    height: number;
    sections: TemplateSection[];
    name?: string;
    background?: string;
    filename?: string;
  },
  type: TemplateType
): Template => {
  // Esta función parseará el JSON/SVG de Illustrator
  // y lo convertirá a nuestro formato Template
  
  return {
    id: `illustrator-${Date.now()}`,
    name: data.name || `Plantilla ${type}`,
    type,
    width: data.width,
    height: data.height,
    background: data.background || '#ffffff',
    sections: data.sections,
    metadata: {
      illustratorFile: data.filename,
      version: '1.0',
      createdAt: new Date().toISOString(),
    },
  };
};
