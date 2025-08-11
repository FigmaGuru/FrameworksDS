export type Token = { name: string; light: string; dark: string };
export interface InitData { collectionId: string; lightId: string; darkId: string }

export const store = {
  tokens: [] as Token[],
  modes: null as InitData | null,
};
