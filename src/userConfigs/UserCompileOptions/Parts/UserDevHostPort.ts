import { linkToDocs } from '@src/linkToDocs';
import { badValueError } from '@src/lib/errorMessages';
import { needsValidation } from '../../needsValidation';
import { Int, isInt } from '@src/lib/typesAndValidators';

export type UserDevHostPort = Int;

export function isUserDevHostPort(
	arg: any,
	parents: string[],
	partial: { partial: boolean },
): arg is UserDevHostPort {
	const optional = true;
	if (needsValidation(arg, partial, optional) && !isInt(arg)) {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a ${linkToDocs('general type', 'Int')}`,
			received: arg,
		});
	}
	return true;
}
