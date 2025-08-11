import React from 'react';

export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md px-2 py-0.5 text-xs bg-slate-100">{children}</span>;
}
