import React from 'react';

interface Props {
  section: string;
  onSelect: (s: 'colors' | 'spacing' | 'typography') => void;
}

export default function Sidebar({ section, onSelect }: Props) {
  return (
    <div className="w-48 border-r border-slate-200 p-4 space-y-4">
      <div>
        <div className="mb-2 font-medium">Variables</div>
        {[
          { id: 'colors', label: 'Colors' },
          { id: 'spacing', label: 'Spacing' },
          { id: 'typography', label: 'Typography' },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id as any)}
            className={`cursor-pointer p-1 rounded hover:bg-slate-50 ${
              section === item.id ? 'bg-slate-100' : ''
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="font-medium">About</div>
      <div className="font-medium">Settings</div>
    </div>
  );
}
