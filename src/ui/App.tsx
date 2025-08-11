import React, { useState } from 'react';

// Temporary inline components so the UI is not blank.
// Replace these with real files later (Sidebar.tsx, Toolbar.tsx, and feature views).

type Section = 'colors' | 'spacing' | 'typography';

function Sidebar({
  section,
  onSelect,
}: {
  section: Section;
  onSelect: (s: Section) => void;
}) {
  const Item = ({ id, label }: { id: Section; label: string }) => (
    <button
      onClick={() => onSelect(id)}
      className={
        'w-full text-left px-3 py-2 rounded-md mb-1 border ' +
        (section === id
          ? 'bg-slate-900 text-white border-slate-900'
          : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50')
      }
    >
      {label}
    </button>
  );
  return (
    <aside className="w-48 border-r border-slate-200 p-3 bg-white">
      <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Variables</div>
      <Item id="colors" label="Colors" />
      <Item id="spacing" label="Spacing" />
      <Item id="typography" label="Typography" />
      <div className="mt-4 text-xs uppercase tracking-wide text-slate-500 mb-2">Other</div>
      <button className="w-full text-left px-3 py-2 rounded-md border bg-white text-slate-900 border-slate-200 hover:bg-slate-50">
        About
      </button>
      <button className="w-full text-left mt-1 px-3 py-2 rounded-md border bg-white text-slate-900 border-slate-200 hover:bg-slate-50">
        Settings
      </button>
    </aside>
  );
}

function Toolbar() {
  return (
    <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-white">
      <div className="font-medium text-slate-900">FrameworksDS</div>
      <div className="flex items-center gap-2">
        <button className="h-8 px-3 rounded-xl border border-slate-200 hover:bg-slate-50">
          Preview
        </button>
        <button className="h-8 px-3 rounded-xl bg-slate-900 text-white hover:bg-black">
          Generate 0
        </button>
      </div>
    </div>
  );
}

function ColorsView() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 p-3">
        <div className="text-sm font-medium mb-1">Colors</div>
        <p className="text-sm text-slate-600">Primitives &amp; Semantics will appear here.</p>
      </div>
      <div className="grid grid-cols-11 gap-2">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="h-8 w-8 rounded-lg border border-slate-200 bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

function SpacingView() {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="text-sm font-medium mb-1">Spacing</div>
      <p className="text-sm text-slate-600">Spacing primitives will appear here.</p>
    </div>
  );
}

function TypographyView() {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="text-sm font-medium mb-1">Typography</div>
      <p className="text-sm text-slate-600">Typography tokens will appear here.</p>
    </div>
  );
}

export default function App() {
  const [section, setSection] = useState<Section>('colors');

  return (
    <div className="flex h-screen bg-white text-slate-900">
      <Sidebar section={section} onSelect={setSection} />
      <div className="flex flex-col flex-1">
        <Toolbar />
        <div className="p-4 overflow-auto flex-1">
          {section === 'colors' && <ColorsView />}
          {section === 'spacing' && <SpacingView />}
          {section === 'typography' && <TypographyView />}
        </div>
      </div>
    </div>
  );
}
