import { linkToDocs } from '@src/linkToDocs';
import { badValueError } from '@src/lib/errorMessages';
import { needsValidation } from '../../needsValidation';

export type UserOutputFolder = string;

export function isUserOutputFolder(
	arg: any,
	parents: string[],
	partial: { partial: boolean },
): arg is UserOutputFolder {
	if (needsValidation(arg, partial) && typeof arg !== 'string') {
		throw badValueError({
			propertyName: [...parents, 'outputFolder'].join('.'),
			expectedPropertyType: `a atring contaning a valid path to a folder`,
			received: arg,
		});
	}
	return true;
}
