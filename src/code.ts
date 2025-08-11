import htmlRaw from '../dist/index.html?raw';
// Vite will resolve these at build-time
// NOTE: update the CSS filename pattern to match actual output
import uiJs from '../dist/ui.js?raw';
const cssGlob = import.meta.glob('../dist/assets/index-*.css', {
  as: 'raw',
  eager: true,
});

import { hexToRgb } from './lib/colorUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const figma: any;

// Resolve the single CSS string from the glob
const uiCss = (() => {
  const first = Object.values(cssGlob)[0] as unknown as string;
  return first || '';
})();

const inlined = htmlRaw
  // replace the CSS link with inline <style>
  .replace(/<link rel="stylesheet"[^>]*>/, `<style>${uiCss}</style>`)
  // replace the module script to ui.js with inline <script>
  .replace(/<script[^>]*src="\.\/ui\.js"[^>]*><\/script>/, `<script>${uiJs}</script>`);

figma.showUI(inlined, { width: 900, height: 700 });

async function getOrCreateCollection() {
  const name = 'Framework Colors';
  const collections = figma.variables.getLocalVariableCollections();
  let collection = collections.find((c: any) => c.name === name);
  if (!collection) {
    collection = figma.variables.createVariableCollection(name);
  }
  let light = collection.modes.find((m: any) => m.name === 'Light');
  if (!light) light = collection.addMode('Light');
  let dark = collection.modes.find((m: any) => m.name === 'Dark');
  if (!dark) dark = collection.addMode('Dark');
  return {
    collectionId: collection.id,
    lightId: light.modeId || light.id,
    darkId: dark.modeId || dark.id,
  };
}

function upsertVariable(name: string, collectionId: string) {
  const existing = figma.variables
    .getLocalVariables()
    .find((v: any) => v.name === name && v.variableCollectionId === collectionId);
  if (existing) return existing;
  return figma.variables.createVariable(name, 'COLOR', collectionId);
}

function setColor(variable: any, modeId: string, hex: string) {
  const { r, g, b } = hexToRgb(hex);
  variable.setValueForMode(modeId, { r: r / 255, g: g / 255, b: b / 255, a: 1 });
}

// Basic message handler with error guard
figma.ui.onmessage = async (msg: { type: string; payload?: any }) => {
  try {
    if (msg.type === 'INIT') {
      const data = await getOrCreateCollection();
      figma.ui.postMessage({ type: 'INIT', payload: data });
      return;
    }

    if (
      msg.type === 'GENERATE_PRIMITIVES' ||
      msg.type === 'GENERATE_SEMANTICS' ||
      msg.type === 'UPDATE_VARIABLES'
    ) {
      const { collectionId, lightId, darkId } = await getOrCreateCollection();
      const tokens = (msg.payload || []) as { name: string; light: string; dark: string }[];
      for (const t of tokens) {
        if (!t?.name) continue;
        const variable = upsertVariable(t.name, collectionId);
        if (t.light) setColor(variable, lightId, t.light);
        if (t.dark) setColor(variable, darkId, t.dark);
      }
      figma.ui.postMessage({ type: 'UPDATE_VARIABLES', payload: tokens.length });
    }
  } catch (err: any) {
    figma.ui.postMessage({ type: 'ERROR', payload: String(err?.message || err) });
  }
};
