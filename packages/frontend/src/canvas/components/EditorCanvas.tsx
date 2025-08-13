"use client";

import { CanvasEditor } from '../';

type Props = {
  templateType?: 'mail' | 'pendon' | 'brochure' | 'post';
};

export default function EditorCanvas({ 
  templateType = 'mail' 
}: Props) {
  return (
    <CanvasEditor 
      templateType={templateType}
    />
  );
}
