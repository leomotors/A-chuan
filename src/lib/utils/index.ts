export function r4(n?: number) {
  if (typeof n !== "number") return undefined;

  return (Math.round(n * 10000) / 10000).toString();
}
