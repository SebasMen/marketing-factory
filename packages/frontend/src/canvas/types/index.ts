// Tipos de plantillas disponibles
export type TemplateType = 'mail' | 'pendon' | 'brochure' | 'post';

// Tipos de elementos editables
export type ElementType = 'text' | 'image' | 'color';

// Elemento de texto editable
export interface TextElement {
  id: string;
  type: 'text';
  x: number;
  y: number;
  width?: number;
  height?: number;
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  align?: 'left' | 'center' | 'right';
  sectionId: string;
  editable: boolean;
}

// Elemento de imagen editable
export interface ImageElement {
  id: string;
  type: 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  alt?: string;
  sectionId: string;
  editable: boolean;
}

// Elemento de color/shape
export interface ColorElement {
  id: string;
  type: 'color';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  radius?: number;
  sectionId: string;
  editable: boolean;
}

// Elemento base no editable (decorativo)
export interface StaticElement {
  id: string;
  type: 'static';
  x: number;
  y: number;
  width?: number;
  height?: number;
  element: 'rect' | 'text' | 'image' | 'path';
  props: Record<string, unknown>;
  sectionId: string;
}

// Union de todos los elementos
export type CanvasElement = TextElement | ImageElement | ColorElement | StaticElement;

// Sección de la plantilla
export interface TemplateSection {
  id: string;
  name: string;
  description?: string;
  visible: boolean;
  locked?: boolean;
  order: number;
  elements: CanvasElement[];
}

// Plantilla completa
export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  width: number;
  height: number;
  background: string;
  sections: TemplateSection[];
  metadata?: {
    illustratorFile?: string;
    version?: string;
    createdAt?: string;
  };
}

// Estado del editor
export interface EditorState {
  selectedElement: CanvasElement | null;
  selectedSection: TemplateSection | null;
  scale: number;
  position: { x: number; y: number };
  isPanning: boolean;
  showGrid: boolean;
}

// Callbacks para cambios
export interface EditorCallbacks {
  onElementChange: (elementId: string, changes: Partial<CanvasElement>) => void;
  onSectionToggle: (sectionId: string, visible: boolean) => void;
  onElementSelect: (element: CanvasElement | null) => void;
  onSectionSelect: (section: TemplateSection | null) => void;
}
