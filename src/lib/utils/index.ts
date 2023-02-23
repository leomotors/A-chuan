function _r4(n: number) {
  return Math.round(n * 10000) / 10000;
}

export function r4(n?: number) {
  if (typeof n !== "number") return undefined;

  return _r4(n).toString();
}

export function r4t4(n?: number) {
  if (typeof n !== "number") return undefined;

  return _r4(n).toFixed(4);
}
