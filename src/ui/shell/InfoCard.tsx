import React from 'react';
import { Info } from 'lucide-react';

export default function InfoCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 mt-4 flex items-start gap-2 text-sm">
      <Info className="w-4 h-4" />
      <p>Generate design tokens from Tailwind color ramps.</p>
    </div>
  );
}
