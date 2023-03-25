import { linkToDocs } from '@src/linkToDocs';
import { badValueError } from '@src/lib/errorMessages';
import { isValidUrl } from '@src/lib/typesAndValidators';
import { needsValidation } from '../../needsValidation';

export type UserDevHost = URL | string;

export function isUserDevHost(
	arg: any,
	parents: string[],
	partial: { partial: boolean },
): arg is UserDevHost {
	if (needsValidation(arg, partial) && !isValidUrl(arg)) {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL`,
			received: arg,
		});
	}
	return true;
}
