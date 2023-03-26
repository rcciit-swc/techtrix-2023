import { regexHelpers } from './regexHelpers';


export const validatePhoneNumber = (phoneNumber :string) : RegExpMatchArray | null => {
	return phoneNumber.match(regexHelpers.PHONE_REGEX);
};