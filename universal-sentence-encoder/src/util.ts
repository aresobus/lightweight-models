// unicode-aware iteration
export const stringToChars = (input: string): string[] => {
  const symbols = [];
  for (const symbol of input) {
    symbols.push(symbol);
  }
  return symbols;
};
