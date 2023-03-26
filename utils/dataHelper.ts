export const getNumberWithOrdinal = (number: number) => {
  let suffix = ["th", "st", "nd", "rd"],
    v = number % 100;
  return number + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
};
