import { badValueError } from '@src/lib/errorMessages';
import { All, isAll } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';
import { HostInfo, isHostInfo } from './HostInfo';
import { needsValidation } from '@src/userConfigs/needsValidation';

export type HostList = All | HostInfo | HostInfo[];

export function isHostList(
	arg: any,
	parents: string[],
	partial: { partial: true },
): arg is Partial<HostList>;
export function isHostList(
	arg: any,
	parents: string[],
	partial?: { partial: false },
): arg is HostList;
export function isHostList(
	arg: any,
	parents: string[],
	partial?: { partial: boolean },
): arg is Partial<HostList> | HostList;
export function isHostList(
	received: any,
	parents: string[] = [],
	partial: { partial: boolean } = { partial: false },
) {
	if (typeof received === 'string' && isAll(received)) return true;
	let cumulatedErrors: string[] = [];
	if (
		needsValidation(received, partial) &&
		(received === undefined ||
			received === null ||
			typeof received !== 'object')
	) {
		throw badValueError({
			propertyName: [...parents].join('.'),
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
			isHostInfo(
				received[index],
				receivedArray ? [...parents, `[${index}]`] : parents,
				partial,
			);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
}
