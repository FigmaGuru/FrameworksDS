import React from 'react';
import Tooltip from '../../shared/Tooltip';

interface Props {
  name: string;
  hex: string;
}

export default function Swatch({ name, hex }: Props) {
  return (
    <Tooltip content={`${name} ${hex}`}>
      <div className="h-8 w-8 rounded-lg border border-slate-200" style={{ backgroundColor: hex }} />
    </Tooltip>
  );
}
