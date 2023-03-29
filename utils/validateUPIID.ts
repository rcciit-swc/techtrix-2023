import { regexHelpers } from "./regexHelpers";

export const validateUPIID = (upiID: string): RegExpMatchArray | null => {
  return upiID.match(regexHelpers.UPI_REGEX);
};
