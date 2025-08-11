import React, { lazy, Suspense, useEffect, useState } from 'react';
import TopTabs from '../../shell/TopTabs';
import InfoCard from '../../shell/InfoCard';
import { loadTailwind } from '../../../lib/colorsData';

const Primitives = lazy(() => import('./Primitives'));
const Semantics = lazy(() => import('./Semantics'));

export default function ColorsFeature() {
  const [tab, setTab] = useState<'primitives' | 'semantics'>('primitives');
  const [ramps, setRamps] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    loadTailwind().then(setRamps);
  }, []);

  return (
    <div>
      <TopTabs tabs={['primitives', 'semantics']} current={tab} onChange={(t) => setTab(t as any)} />
      <InfoCard />
      <div className="mt-4">
        <Suspense fallback={null}>
          {tab === 'primitives' ? <Primitives ramps={ramps} /> : <Semantics />}
        </Suspense>
      </div>
    </div>
  );
}
