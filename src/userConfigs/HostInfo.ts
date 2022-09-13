import { badValueError } from '@src/lib/errorMessages';
import { HostEngine, isHostEngine } from '@src/lib/enumsAndValidators';
import {
	All,
	isAll,
	RangedVersion,
	isRangedVersion,
	Int,
	isInt,
} from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';

export type HostInfo = {
	host: HostEngine | `${HostEngine}` | keyof typeof HostEngine;
	version?: All | RangedVersion | `${RangedVersion}`;
	debugPort?: Int;
};

export const isHostInfo = (
	received: any,
	parents: string[] = ['hostList'],
): received is HostInfo => {
	let cumulatedErrors: string[] = [];
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array
	) {
		throw badValueError({
			propertyName: [...parents].join('.'),
			required: true,
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'HostInfo',
			)}`,
			received,
		});
	}
	const { host, version, debugPort } = received;
	if (host === undefined || !isAll || !isHostEngine(host)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'host'].join('.'),
				required: true,
				expectedPropertyType: `a ${linkToDocs(
					'user manifest configs type',
					'HostEngine',
				)}`,
				received: host,
			}),
		);
	}
	if (version !== undefined && !isAll(version) && !isRangedVersion(version)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'version'].join('.'),
				expectedPropertyType: `${linkToDocs(
					'user manifest configs type',
					'All',
				)} or a ${linkToDocs(
					'user manifest configs type',
					'RangedVersion',
				)}`,
				received: version,
			}),
		);
	}
	if (debugPort !== undefined && !isInt(debugPort)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'debugPort'].join('.'),
				expectedPropertyType: `${linkToDocs('general type', 'Int')}`,
				received: debugPort,
			}),
		);
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
