import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';
import { Dependency, isDependency } from './Dependency';

export type AllDependencies = Dependency | Dependency[];
export const isAllDependencies = (
	received: any,
	parents: string[] = [],
): received is AllDependencies => {
	if (received === undefined) return true;
	if (
		typeof received !== 'object' ||
		received === null ||
		(received instanceof Array && received.length === 0)
	) {
		throw badValueError({
			propertyName: [...parents].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'AllDependencies',
			)}`,
			received,
		});
	}
	const receivedArray = received instanceof Array;
	received = receivedArray ? received : [received];
	let cumulatedErrors: string[] = [];
	for (const index in received) {
		try {
			isDependency(
				received[index],
				receivedArray ? [...parents, `[${index}]`] : parents,
			);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
