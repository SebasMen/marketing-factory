/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { Template, CanvasElement, EditorState } from '../types';

const KonvaRenderer = dynamic(() => import('@/canvas/components/KonvaRenderer'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Cargando canvas...</div>
}) as any;

interface CanvasViewerProps {
  template: Template;
  editorState: EditorState;
  stageRef: any;
  onElementSelect: (element: CanvasElement | null) => void;
  onElementChange: (elementId: string, changes: Partial<CanvasElement>) => void;
  onWheel: (e: any) => void;
  onMouseDown: (e: any) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onFloatingEditorOpen?: (element: CanvasElement, position: { x: number; y: number }) => void;
}

export default function CanvasViewer({
  template,
  editorState,
  stageRef,
  onElementSelect,
  onElementChange,
  onWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onFloatingEditorOpen,
}: CanvasViewerProps) {
  return (
    <div className="w-full h-full relative bg-gray-100 flex items-center justify-center">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: editorState.showGrid
            ? "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)"
            : undefined,
          backgroundSize: "24px 24px",
        }}
      />
      
      <KonvaRenderer
        template={template}
        editorState={editorState}
        stageRef={stageRef}
        onElementSelect={onElementSelect}
        onElementChange={onElementChange}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onFloatingEditorOpen={onFloatingEditorOpen}
      />
    </div>
  );
}
