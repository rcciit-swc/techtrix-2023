import { regexHelpers } from "./regexHelpers";

export const validateYear = (year: string): RegExpMatchArray | null => {
  return year.match(regexHelpers.YEAR_REGEX);
};
