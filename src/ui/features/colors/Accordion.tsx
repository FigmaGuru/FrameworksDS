import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Badge from '../../shared/Badge';

interface Props {
  title: string;
  count: number;
  children: React.ReactNode;
}

export default function Accordion({ title, count, children }: Props) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 rounded-xl">
      <div
        className="flex items-center justify-between p-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? '' : '-rotate-90'}`} />
          <span>{title}</span>
        </div>
        <Badge>{count}</Badge>
      </div>
      {open && <div className="p-2">{children}</div>}
    </div>
  );
}
