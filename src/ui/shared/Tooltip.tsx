import React, { useState } from 'react';

export default function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute z-10 -top-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 text-white text-xs px-2 py-1">
          {content}
        </div>
      )}
    </div>
  );
}
