export async function loadTailwind(): Promise<Record<string, Record<string, string>>> {
  return (await import('./tailwind-colors.json')).default;
}
