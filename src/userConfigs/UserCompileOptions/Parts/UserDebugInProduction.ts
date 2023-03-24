import { linkToDocs } from '@src/linkToDocs';
import { badArgumentError, badValueError } from '@src/lib/errorMessages';
import { needsValidation } from '../../needsValidation';

export type UserDebugInProduction = boolean;

export function isUserDebugInProduction(
	arg: any,
	parents: string[],
	partial: { partial: boolean },
): arg is UserDebugInProduction {
	if (needsValidation(partial, arg) && typeof arg !== 'boolean') {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user compile options type',
				'UserDebugInProduction',
			)}`,
			received: arg,
		});
	}
	return true;
}
