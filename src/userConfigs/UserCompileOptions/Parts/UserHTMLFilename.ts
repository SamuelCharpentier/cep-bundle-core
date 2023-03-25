import { linkToDocs } from '@src/linkToDocs';
import { badValueError } from '@src/lib/errorMessages';
import { needsValidation } from '../../needsValidation';

export type UserHTMLFilename = string;

export function isUserHTMLFilename(
	arg: any,
	parents: string[],
	partial: { partial: boolean },
): arg is UserHTMLFilename {
	if (needsValidation(arg, partial) && typeof arg !== 'string') {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a string`,
			received: arg,
		});
	}
	return true;
}
