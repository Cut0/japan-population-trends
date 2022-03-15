export const numberToColorCode = (num: number) => {
  return `#${`000000${Math.floor((num / 2) * 16777215).toString(16)}`.slice(
    -6,
  )}`;
};
