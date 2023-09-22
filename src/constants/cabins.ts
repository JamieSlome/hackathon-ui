const range = (start: number, end: number): number[] => {
  return [...Array(end - start + 1)].map((_, i) => start + i);
};

export const cabins = range(1, 20);
