import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';
import { _Extension, isExtension } from './Extension';
import { needsValidation } from '@src/userConfigs/needsValidation';

export type AllExtensions = _Extension | _Extension[];

export function isAllExtensions(
	arg: any,
	parents: string[] = [],
	partial: { partial: boolean } = { partial: false },
): arg is AllExtensions {
	if (
		needsValidation(arg, partial) &&
		(arg === undefined || arg === null || typeof arg !== 'object')
	) {
		throw badValueError({
			propertyName: parents.join('.'),
			expectedPropertyType: `an ${linkToDocs(
				'user manifest configs type',
				'AllExtensions',
			)}`,
			received: arg,
			required: 'contextually required',
		});
	}
	const receivedArray = arg instanceof Array;
	arg = receivedArray ? arg : [arg];
	let cumulatedErrors: string[] = [];
	for (const index in arg) {
		try {
			isExtension(
				arg[index],
				receivedArray ? [...parents, `[${index}]`] : parents,
			);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
}
