import { badValueError } from '@src/lib/errorMessages';
import { linkToDocs } from '@src/linkToDocs';
import { DispatchInfo, isDispatchInfo } from './DispatchInfo';

export type AllDispatchInfo = DispatchInfo | DispatchInfo[];
export const isAllDispatchInfo = (
	received: any,
	parents: string[] = ['extensions'],
): received is AllDispatchInfo => {
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		(received instanceof Array && received.length === 0) ||
		Object.keys(received).length === 0
	) {
		throw badValueError({
			propertyName: [...parents, 'dispatchInfo'].join('.'),
			required: true,
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'AllDispatchInfo',
			)}`,
			received,
		});
	}
	let cumulatedErrors: string[] = [];
	const receivedIsArray = received instanceof Array;
	received = receivedIsArray ? received : [received];
	for (const index in received) {
		try {
			isDispatchInfo(received[index], [
				...parents,
				`dispatchInfo${receivedIsArray ? `[${index}]` : ''}`,
			]);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
