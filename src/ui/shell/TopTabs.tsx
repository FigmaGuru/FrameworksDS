import React from 'react';

interface Props {
  tabs: string[];
  current: string;
  onChange: (tab: string) => void;
}

export default function TopTabs({ tabs, current, onChange }: Props) {
  return (
    <div className="inline-flex gap-2 border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-1 px-2 ${
            current === tab ? 'border-b-2 border-slate-900' : 'text-slate-500'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
