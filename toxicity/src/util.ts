// We pad inputs to decrease the number of different shapes that the
// model uses. This enables texture reuse for performance.
export const padInput = (input: number[]): number[] => {
  let nearestBucket = 4;
  while (nearestBucket < input.length) {
    nearestBucket *= 2;
  }
  return input.concat(
    Array.from({ length: nearestBucket - input.length }, () => 0)
  );
};
