/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import { Template, CanvasElement, EditorState, TextElement, ColorElement, ImageElement } from '../types';
import { useEffect, useState } from 'react';

interface KonvaRendererProps {
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

export default function KonvaRenderer({
  template,
  editorState,
  stageRef,
  onElementSelect,
  onWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onFloatingEditorOpen,
}: KonvaRendererProps) {
  const [images, setImages] = useState<{ [key: string]: HTMLImageElement }>({});

  // Helper para cambiar el cursor
  const setCursor = (e: any, cursor: string) => {
    const container = e.target.getStage()?.container();
    if (container?.style) {
      container.style.cursor = cursor;
    }
  };
  // Cargar imágenes
  useEffect(() => {
    const imageElements = template.sections
      .flatMap(section => section.elements)
      .filter(el => el.type === 'image') as ImageElement[];

    imageElements.forEach(imageEl => {
      if (!images[imageEl.id] && imageEl.src) {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setImages(prev => ({ ...prev, [imageEl.id]: img }));
        };
        img.src = imageEl.src;
      }
    });
  }, [template.sections, images]);

  const handleElementClick = (element: CanvasElement, e: any) => {
    e.cancelBubble = true;
    onElementSelect(element);
    
    // Abrir editor flotante si está disponible
    if (onFloatingEditorOpen && element.type !== 'static') {
      const stage = e.target.getStage();
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        onFloatingEditorOpen(element, {
          x: pointerPosition.x + 20,
          y: pointerPosition.y - 20
        });
      }
    }
  };

  const handleBackgroundClick = () => {
    onElementSelect(null);
  };

  const isElementVisible = (element: CanvasElement) => {
    const section = template.sections.find(s => s.id === element.sectionId);
    return section?.visible !== false;
  };

  return (
    <Stage
      ref={stageRef}
      width={window?.innerWidth ? window.innerWidth - 320 : 800} // Resta el ancho del panel
      height={window?.innerHeight || 600}
      scaleX={editorState.scale}
      scaleY={editorState.scale}
      x={editorState.position.x}
      y={editorState.position.y}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <Layer>
        {/* Fondo principal */}
        <Rect
          x={0}
          y={0}
          width={template.width}
          height={template.height}
          fill={template.background}
          cornerRadius={8}
          shadowColor="black"
          shadowOpacity={0.1}
          shadowBlur={8}
          onClick={handleBackgroundClick}
        />

        {/* Renderizar elementos por sección en orden */}
        {template.sections
          .sort((a, b) => a.order - b.order)
          .filter(section => section.visible)
          .map(section => (
            section.elements
              .filter(element => isElementVisible(element))
              .map(element => {
                const isSelected = editorState.selectedElement?.id === element.id;
                const isEditable = element.type !== 'static';

                // Elementos de texto
                if (element.type === 'text') {
                  const textEl = element as TextElement;
                  return (
                    <Text
                      key={element.id}
                      x={textEl.x}
                      y={textEl.y}
                      width={textEl.width}
                      height={textEl.height}
                      text={textEl.text}
                      fontSize={textEl.fontSize}
                      fontFamily={textEl.fontFamily || 'Inter, sans-serif'}
                      fill={textEl.fill}
                      align={textEl.align}
                      draggable={false} // Los elementos NO se pueden mover
                      onClick={(e) => isEditable && handleElementClick(element, e)}
                      stroke={isSelected ? '#007acc' : undefined}
                      strokeWidth={isSelected ? 2 : 0}
                      opacity={isEditable ? 1 : 0.9}
                      onMouseEnter={(e) => {
                        if (isEditable) {
                          setCursor(e, 'pointer');
                        }
                      }}
                      onMouseLeave={(e) => {
                        setCursor(e, 'grab');
                      }}
                    />
                  );
                }

                // Elementos de color/shape
                if (element.type === 'color') {
                  const colorEl = element as ColorElement;
                  return (
                    <Rect
                      key={element.id}
                      x={colorEl.x}
                      y={colorEl.y}
                      width={colorEl.width}
                      height={colorEl.height}
                      fill={colorEl.fill}
                      cornerRadius={colorEl.radius}
                      onClick={(e) => isEditable && handleElementClick(element, e)}
                      stroke={isSelected ? '#007acc' : undefined}
                      strokeWidth={isSelected ? 2 : 0}
                      onMouseEnter={(e) => {
                        if (isEditable) {
                          setCursor(e, 'pointer');
                        }
                      }}
                      onMouseLeave={(e) => {
                        setCursor(e, 'grab');
                      }}
                    />
                  );
                }

                // Elementos de imagen
                if (element.type === 'image') {
                  const imageEl = element as ImageElement;
                  const img = images[element.id];
                  
                  if (!img) return null;

                  return (
                    <KonvaImage
                      key={element.id}
                      x={imageEl.x}
                      y={imageEl.y}
                      width={imageEl.width}
                      height={imageEl.height}
                      image={img}
                      onClick={(e) => isEditable && handleElementClick(element, e)}
                      stroke={isSelected ? '#007acc' : undefined}
                      strokeWidth={isSelected ? 2 : 0}
                      onMouseEnter={(e) => {
                        if (isEditable) {
                          setCursor(e, 'pointer');
                        }
                      }}
                      onMouseLeave={(e) => {
                        setCursor(e, 'grab');
                      }}
                    />
                  );
                }

                return null;
              })
          ))
        }
      </Layer>
    </Stage>
  );
}
