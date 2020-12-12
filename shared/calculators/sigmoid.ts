export function sigmoid(value: number) {
  return 1 / (1 + Math.exp(-value));
}
