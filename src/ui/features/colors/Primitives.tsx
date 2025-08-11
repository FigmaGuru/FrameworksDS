import React from 'react';
import Accordion from './Accordion';
import Swatch from './Swatch';

export default function Primitives({ ramps }: { ramps: Record<string, Record<string, string>> }) {
  return (
    <div className="space-y-2">
      {Object.entries(ramps).map(([family, steps]) => (
        <Accordion key={family} title={family} count={Object.keys(steps).length}>
          <div className="flex gap-1">
            {Object.entries(steps).map(([step, hex]) => (
              <Swatch key={step} name={`${family}-${step}`} hex={hex} />
            ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
}
