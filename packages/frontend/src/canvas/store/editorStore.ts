import { create } from 'zustand';
import { useEffect } from 'react';
import { Template, CanvasElement } from '../types';

interface EditorState {
  // Estado del template
  template: Template | null;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Estado de exportación
  isExporting: boolean;
  exportFormat: string | null;
  
  // Acciones
  loadTemplate: (template: Template) => void;
  updateElement: (elementId: string, changes: Partial<CanvasElement>) => void;
  toggleSection: (sectionId: string, visible: boolean) => void;
  saveChanges: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setExporting: (isExporting: boolean, format?: string) => void;
  resetUnsavedChanges: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Estado inicial
  template: null,
  hasUnsavedChanges: false,
  isLoading: false,
  error: null,
  isExporting: false,
  exportFormat: null,

  // Cargar template
  loadTemplate: (template: Template) => {
    set({
      template,
      hasUnsavedChanges: false,
      error: null,
    });
  },

  // Actualizar elemento
  updateElement: (elementId: string, changes: Partial<CanvasElement>) => {
    const { template } = get();
    if (!template) return;

    const updatedSections = template.sections.map(section => ({
      ...section,
      elements: section.elements.map(element =>
        element.id === elementId
          ? { ...element, ...changes } as CanvasElement
          : element
      ),
    }));

    set({
      template: {
        ...template,
        sections: updatedSections,
      },
      hasUnsavedChanges: true,
    });
  },

  // Toggle visibilidad de sección
  toggleSection: (sectionId: string, visible: boolean) => {
    const { template } = get();
    if (!template) return;

    const updatedSections = template.sections.map(section =>
      section.id === sectionId
        ? { ...section, visible }
        : section
    );

    set({
      template: {
        ...template,
        sections: updatedSections,
      },
      hasUnsavedChanges: true,
    });
  },

  // Guardar cambios
  saveChanges: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Aquí puedes implementar la lógica de guardado real
      // Por ejemplo, enviar a una API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular guardado
      
      set({ 
        hasUnsavedChanges: false,
        isLoading: false 
      });
    } catch {
      set({ 
        error: 'Error al guardar los cambios',
        isLoading: false 
      });
    }
  },

  // Establecer estado de carga
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  // Establecer error
  setError: (error: string | null) => {
    set({ error });
  },

  // Establecer estado de exportación
  setExporting: (isExporting: boolean, format?: string) => {
    set({ 
      isExporting, 
      exportFormat: format || null 
    });
  },

  // Resetear cambios no guardados
  resetUnsavedChanges: () => {
    set({ hasUnsavedChanges: false });
  },
}));

// Hook para advertencias antes de salir
export const useBeforeUnload = () => {
  const hasUnsavedChanges = useEditorStore(state => state.hasUnsavedChanges);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '¿Estás seguro? Tienes cambios sin guardar.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
};
