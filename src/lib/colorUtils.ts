export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function validateSemanticColors<T>(input: T): T {
  return input;
}

export function findMatchingPrimitives(color: string, ramps: Record<string, Record<string, string>>): string | null {
  for (const family of Object.keys(ramps)) {
    for (const step of Object.keys(ramps[family])) {
      if (ramps[family][step].toLowerCase() === color.toLowerCase()) {
        return `${family}-${step}`;
      }
    }
  }
  return null;
}
