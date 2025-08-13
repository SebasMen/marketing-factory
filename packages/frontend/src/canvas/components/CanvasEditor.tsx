/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from 'react';
import { TemplateType, CanvasElement } from '../types';
import { useCanvasEditor } from '../hooks/useCanvasEditor';
import { defaultTemplates } from '../templates/defaultTemplates';
import { CanvasExporter, ExportFormat } from '../helpers/exportHelpers';
import { useEditorStore, useBeforeUnload } from '../store/editorStore';
import ContentPanel from './ContentPanel';
import CanvasViewer from './CanvasViewer';
import Toolbar from './Toolbar';
import FloatingEditor from './FloatingEditor';

interface CanvasEditorProps {
  templateType?: TemplateType;
}

export default function CanvasEditor({ 
  templateType = 'mail'
}: CanvasEditorProps) {
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [floatingEditorPosition, setFloatingEditorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Zustand store
  const { 
    hasUnsavedChanges,
    loadTemplate,
    updateElement: globalUpdateElement,
    toggleSection: globalToggleSection,
    saveChanges 
  } = useEditorStore();

  // Hook para advertir antes de salir
  useBeforeUnload();

  const {
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
  } = useCanvasEditor(defaultTemplates[templateType]);

  // Cargar template en store al inicializar
  useEffect(() => {
    loadTemplate(defaultTemplates[templateType]);
  }, [templateType, loadTemplate]);

  const ZOOM_STEP = 0.1;

  // Manejadores de eventos del canvas
  const handleWheel = useCallback((e: any) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const factor = 1 + ZOOM_STEP * direction;
    setZoom(editorState.scale * factor, pointer || undefined);
  }, [editorState.scale, setZoom]);

  const handleMouseDown = useCallback((e: any) => {
    const target = e.target;
    const isClickOnEmpty = target === target.getStage() || 
                          (target.getClassName() === 'Rect' && target.attrs.id === 'background');
    
    if (isClickOnEmpty) {
      setIsMouseDown(true);
      setEditorState(prev => ({ ...prev, isPanning: true }));
      const pos = e.target.getStage().getPointerPosition();
      setDragStart(pos);
      
      if (stageRef.current) {
        stageRef.current.container().style.cursor = 'grabbing';
      }
    }
  }, [setEditorState, stageRef]);

  const handleMouseMove = useCallback((e: any) => {
    const target = e.target;
    const isOverEmpty = target === target.getStage() || 
                       (target.getClassName() === 'Rect' && target.attrs.id === 'background');
    
    if (stageRef.current && !editorState.isPanning) {
      stageRef.current.container().style.cursor = isOverEmpty ? 'grab' : 'default';
    }
    
    if (editorState.isPanning && isMouseDown && dragStart) {
      const stage = e.target.getStage();
      const newPos = stage.getPointerPosition();
      
      const deltaX = newPos.x - dragStart.x;
      const deltaY = newPos.y - dragStart.y;
      
      setEditorState(prev => ({
        ...prev,
        position: {
          x: prev.position.x + deltaX,
          y: prev.position.y + deltaY,
        },
      }));
      
      setDragStart(newPos);
    }
  }, [editorState.isPanning, isMouseDown, dragStart, stageRef, setEditorState]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setEditorState(prev => ({ ...prev, isPanning: false }));
    setDragStart(null);
    
    if (stageRef.current) {
      stageRef.current.container().style.cursor = 'default';
    }
  }, [setEditorState, stageRef]);

  const handleMouseLeave = useCallback(() => {
    setIsMouseDown(false);
    setEditorState(prev => ({ ...prev, isPanning: false }));
    setDragStart(null);
    
    if (stageRef.current) {
      stageRef.current.container().style.cursor = 'default';
    }
  }, [setEditorState, stageRef]);

  const zoomIn = () => setZoom(editorState.scale * (1 + ZOOM_STEP));
  const zoomOut = () => setZoom(editorState.scale * (1 - ZOOM_STEP));

  // Función de cambio de elemento integrada con Zustand
  const handleElementChangeWithStore = useCallback((elementId: string, changes: Partial<CanvasElement>) => {
    // Actualizar en el hook local
    handleElementChange(elementId, changes);
    // Actualizar en el store global
    globalUpdateElement(elementId, changes);
  }, [handleElementChange, globalUpdateElement]);

  // Función de toggle de sección integrada con Zustand
  const handleSectionToggleWithStore = useCallback((sectionId: string, visible: boolean) => {
    // Actualizar en el hook local
    handleSectionToggle(sectionId, visible);
    // Actualizar en el store global
    globalToggleSection(sectionId, visible);
  }, [handleSectionToggle, globalToggleSection]);

  const handleFloatingEditorOpen = useCallback((element: any, position: { x: number; y: number }) => {
    handleElementSelect(element);
    setFloatingEditorPosition(position);
  }, [handleElementSelect]);

  // Función de exportación
  const handleExport = useCallback(async (format: ExportFormat) => {
    if (!stageRef.current) return;
    
    setIsExporting(true);
    try {
      const exporter = new CanvasExporter(stageRef, template);
      await exporter.export({ format });
    } catch (error) {
      console.error('Error al exportar:', error);
    } finally {
      setIsExporting(false);
    }
  }, [stageRef, template]);

  // Función de guardado
  const handleSave = useCallback(async () => {
    await saveChanges();
  }, [saveChanges]);

  return (
    <div className="h-screen w-screen flex bg-gray-50 overflow-hidden">
      {/* Panel de contenido lateral */}
      <ContentPanel
        template={template}
        selectedElement={editorState.selectedElement}
        selectedSection={editorState.selectedSection}
        onSectionToggle={handleSectionToggleWithStore}
        onElementSelect={handleElementSelect}
        onSectionSelect={handleSectionSelect}
      />

      {/* Canvas principal */}
      <div className="flex-1 relative overflow-hidden">
        <CanvasViewer
          template={template}
          editorState={editorState}
          stageRef={stageRef}
          onElementSelect={handleElementSelect}
          onElementChange={handleElementChangeWithStore}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onFloatingEditorOpen={handleFloatingEditorOpen}
        />

        {/* Toolbar flotante */}
        <Toolbar
          scale={editorState.scale}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetView={resetView}
          onFitToScreen={fitToScreen}
          onExport={handleExport}
          onSave={handleSave}
          hasUnsavedChanges={hasUnsavedChanges}
          isExporting={isExporting}
        />

        {/* Editor flotante */}
        {editorState.selectedElement && floatingEditorPosition && (
          <FloatingEditor
            element={editorState.selectedElement}
            onElementChange={handleElementChangeWithStore}
            onClose={() => {
              handleElementSelect(null);
              setFloatingEditorPosition(null);
            }}
            position={floatingEditorPosition}
          />
        )}
      </div>
    </div>
  );
}
