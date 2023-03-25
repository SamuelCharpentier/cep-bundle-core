import { linkToDocs } from '@src/linkToDocs';
import { badValueError } from '@src/lib/errorMessages';
import { needsValidation } from '../../needsValidation';
import fs from 'fs';

export type UserRoot = string;

export function isUserRoot(
	root: any,
	parents: string[],
	partial: { partial: boolean },
): root is UserRoot {
	if (needsValidation(root, partial) && fs.existsSync(root) === false) {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a string containnig a valid path to an existing folder`,
			received: root,
		});
	}
	return true;
}
