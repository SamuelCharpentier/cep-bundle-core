import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';
import { _Extension, isExtension } from './Extension';

export type AllExtensions = _Extension | _Extension[];
export const isAllExtensions = (
	received: any,
	parents: string[] = [],
): received is AllExtensions => {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object'
	) {
		throw badValueError({
			propertyName: [...parents, 'extensions'].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'AllExtensions',
			)}`,
			received,
		});
	}
	const receivedArray = received instanceof Array;
	received = receivedArray ? received : [received];
	let cumulatedErrors: string[] = [];
	for (const index in received) {
		try {
			isExtension(received[index], [
				...parents,
				`extensions${receivedArray ? `[${index}]` : ''}`,
			]);
		} catch (error) {
			cumulatedErrors.push(...(error as string).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
