import { linkToDocs } from '@src/linkToDocs';
import { badValueError } from '@src/lib/errorMessages';
import { needsValidation } from '../../needsValidation';

export type UserDevHostPort = `${number}` | number;

export function isUserDevHostPort(
	arg: any,
	parents: string[],
	partial: { partial: boolean },
): arg is UserDevHostPort {
	const optional = true;
	if (
		needsValidation(partial, arg, optional) &&
		typeof arg !== 'number' &&
		!/^[0-9]+$/.test(`${arg}`)
	) {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user compile options type',
				'UserHTMLFilename',
			)}`,
			received: arg,
		});
	}
	return true;
}
