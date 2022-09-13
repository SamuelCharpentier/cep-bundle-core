import { badValueError } from '@src/lib/errorMessages';
import { All, isAll } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';
import { HostInfo, isHostInfo } from './HostInfo';

export type HostList = All | HostInfo | HostInfo[];
export const isHostList = (
	received: any,
	parents: string[] = [],
): received is HostList => {
	if (typeof received === 'string' && isAll(received)) return true;
	let cumulatedErrors: string[] = [];
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object'
	) {
		throw badValueError({
			propertyName: [...parents, 'hostList'].join('.'),
			required: true,
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'HostList',
			)}`,
			received,
		});
	}
	const receivedArray = received instanceof Array;
	received = receivedArray ? received : [received];
	for (const index in received) {
		try {
			isHostInfo(received[index], [
				...parents,
				`hostList${receivedArray ? `[${index}]` : ''}`,
			]);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
