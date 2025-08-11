import { hexToRgb } from './lib/colorUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const figma: any;

figma.showUI(__html__, { width: 900, height: 700 });

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
  return { collectionId: collection.id, lightId: light.modeId || light.id, darkId: dark.modeId || dark.id };
}

function upsertVariable(name: string, collectionId: string) {
  const existing = figma.variables.getLocalVariables().find((v: any) => v.name === name && v.variableCollectionId === collectionId);
  if (existing) return existing;
  return figma.variables.createVariable(name, 'COLOR', collectionId);
}

function setColor(variable: any, modeId: string, hex: string) {
  const { r, g, b } = hexToRgb(hex);
  variable.setValueForMode(modeId, { r: r / 255, g: g / 255, b: b / 255, a: 1 });
}

figma.ui.onmessage = async (msg: { type: string; payload?: any }) => {
  if (msg.type === 'INIT') {
    const data = await getOrCreateCollection();
    figma.ui.postMessage({ type: 'INIT', payload: data });
  }

  if (
    msg.type === 'GENERATE_PRIMITIVES' ||
    msg.type === 'GENERATE_SEMANTICS' ||
    msg.type === 'UPDATE_VARIABLES'
  ) {
    const { collectionId, lightId, darkId } = await getOrCreateCollection();
    const tokens = msg.payload as { name: string; light: string; dark: string }[];
    for (const t of tokens) {
      const variable = upsertVariable(t.name, collectionId);
      setColor(variable, lightId, t.light);
      setColor(variable, darkId, t.dark);
    }
    figma.ui.postMessage({ type: 'UPDATE_VARIABLES', payload: tokens.length });
  }
};
