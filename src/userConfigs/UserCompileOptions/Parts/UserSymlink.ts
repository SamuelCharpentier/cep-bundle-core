import { linkToDocs } from '@src/linkToDocs';
import { badValueError } from '@src/lib/errorMessages';
import { needsValidation } from '../../needsValidation';

export type UserSymlink = boolean;

export function isUserSymlink(
	arg: any,
	parents: string[],
	partial: { partial: boolean },
): arg is UserSymlink {
	if (needsValidation(arg, partial) && typeof arg !== 'boolean') {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a boolean`,
			received: arg,
		});
	}
	return true;
}
