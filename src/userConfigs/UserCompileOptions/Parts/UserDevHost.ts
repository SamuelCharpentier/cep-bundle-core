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
	if (needsValidation(partial, arg) && !isValidUrl(arg)) {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user compile options type',
				'UserDevHost',
			)}`,
			received: arg,
		});
	}
	return true;
}
