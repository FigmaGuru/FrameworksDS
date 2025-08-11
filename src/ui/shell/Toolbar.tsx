import React from 'react';
import Button from '../shared/Button';

export default function Toolbar() {
  return (
    <div className="flex justify-end gap-2 p-4 border-b border-slate-200">
      <Button variant="ghost">Preview</Button>
      <Button variant="solid">Generate 0</Button>
    </div>
  );
}
