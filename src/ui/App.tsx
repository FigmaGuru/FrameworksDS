import React, { Suspense, lazy, useState } from 'react';
import Sidebar from './shell/Sidebar';
import Toolbar from './shell/Toolbar';

const Colors = lazy(() => import('./features/colors'));
const Spacing = lazy(() => import('./features/spacing'));
const Typography = lazy(() => import('./features/typography'));

export default function App() {
  const [section, setSection] = useState<'colors' | 'spacing' | 'typography'>('colors');
  return (
    <div className="flex h-screen">
      <Sidebar section={section} onSelect={setSection} />
      <div className="flex flex-col flex-1">
        <Toolbar />
        <div className="p-4 overflow-auto flex-1">
          <Suspense fallback={null}>
            {section === 'colors' && <Colors />}
            {section === 'spacing' && <Spacing />}
            {section === 'typography' && <Typography />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
