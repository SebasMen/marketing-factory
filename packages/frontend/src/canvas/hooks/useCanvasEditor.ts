"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef, useEffect } from 'react';
import { Template, EditorState, CanvasElement, TemplateSection } from '../types';
import { updateElement, toggleSectionVisibility } from '../helpers/templateHelpers';

export const useCanvasEditor = (initialTemplate: Template) => {
  const [template, setTemplate] = useState<Template>(initialTemplate);
  const [editorState, setEditorState] = useState<EditorState>({
    selectedElement: null,
    selectedSection: null,
    scale: 1,
    position: { x: 0, y: 0 },
    isPanning: false,
    showGrid: true,
  });

  const stageRef = useRef<any>(null);

  // Actualizar un elemento
  const handleElementChange = useCallback((elementId: string, changes: Partial<CanvasElement>) => {
    setTemplate(prev => ({
      ...prev,
      sections: updateElement(prev.sections, elementId, changes),
    }));
  }, []);

  // Ocultar/mostrar sección
  const handleSectionToggle = useCallback((sectionId: string, visible: boolean) => {
    setTemplate(prev => ({
      ...prev,
      sections: toggleSectionVisibility(prev.sections, sectionId, visible),
    }));
  }, []);

  // Seleccionar elemento
  const handleElementSelect = useCallback((element: CanvasElement | null) => {
    setEditorState(prev => ({
      ...prev,
      selectedElement: element,
      selectedSection: null,
    }));
  }, []);

  // Seleccionar sección
  const handleSectionSelect = useCallback((section: TemplateSection | null) => {
    setEditorState(prev => ({
      ...prev,
      selectedSection: section,
      selectedElement: null,
    }));
  }, []);

  // Zoom
    // Centrar el template al cargar
  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current;
      const stageWidth = stage.width();
      const stageHeight = stage.height();
      
      // Calcular posición para centrar el template
      const x = (stageWidth - template.width) / 2;
      const y = (stageHeight - template.height) / 2;
      
      setEditorState(prev => ({
        ...prev,
        position: { x, y }
      }));
    }
  }, [template.width, template.height]);

  const setZoom = useCallback((scale: number, pointer?: { x: number; y: number }) => {
    const MIN_SCALE = 0.2;
    const MAX_SCALE = 4;
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));

    if (pointer && stageRef.current) {
      const mousePointTo = {
        x: (pointer.x - editorState.position.x) / editorState.scale,
        y: (pointer.y - editorState.position.y) / editorState.scale,
      };
      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      setEditorState(prev => ({
        ...prev,
        scale: newScale,
        position: newPos,
      }));
    } else {
      setEditorState(prev => ({
        ...prev,
        scale: newScale,
      }));
    }
  }, [editorState.position, editorState.scale]);

  // Resetear vista
  const resetView = useCallback(() => {
    setEditorState(prev => ({
      ...prev,
      scale: 1,
      position: { x: 0, y: 0 },
    }));
  }, []);

  // Ajustar a pantalla
  const fitToScreen = useCallback(() => {
    if (!stageRef.current) return;
    
    const container = stageRef.current.container();
    if (!container) return;

    const padding = 40;
    const cw = container.clientWidth - padding;
    const ch = container.clientHeight - padding;
    const scaleX = cw / template.width;
    const scaleY = ch / template.height;
    const newScale = Math.min(scaleX, scaleY, 4);
    
    setEditorState(prev => ({
      ...prev,
      scale: Math.max(0.2, newScale),
      position: { 
        x: (cw - template.width * newScale) / 2, 
        y: (ch - template.height * newScale) / 2 
      },
    }));
  }, [template.width, template.height]);

  // Exportar como PNG
  const exportAsPNG = useCallback(() => {
    if (!stageRef.current) return;
    
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `${template.name}.png`;
    link.href = uri;
    link.click();
  }, [template.name]);

  return {
    template,
    editorState,
    stageRef,
    setEditorState,
    handleElementChange,
    handleSectionToggle,
    handleElementSelect,
    handleSectionSelect,
    setZoom,
    resetView,
    fitToScreen,
    exportAsPNG,
  };
};
