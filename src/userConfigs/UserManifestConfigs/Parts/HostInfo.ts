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
import { needsValidation } from '@src/userConfigs/needsValidation';

export type HostInfo = {
	host: HostEngine | `${HostEngine}` | keyof typeof HostEngine;
	version?: All | RangedVersion | `${RangedVersion}`;
	debugPort?: Int;
};

export function isHostInfo(
	arg: any,
	parents: string[],
	partial: { partial: true },
): arg is Partial<HostInfo>;
export function isHostInfo(
	arg: any,
	parents: string[],
	partial?: { partial: false },
): arg is HostInfo;
export function isHostInfo(
	arg: any,
	parents: string[],
	partial?: { partial: boolean },
): arg is Partial<HostInfo> | HostInfo;
export function isHostInfo(
	received: any,
	parents: string[] = ['hostList'],
	partial: { partial: boolean } = { partial: false },
): received is HostInfo {
	let cumulatedErrors: string[] = [];
	if (
		needsValidation(received, partial) &&
		(received === undefined ||
			received === null ||
			typeof received !== 'object' ||
			received instanceof Array)
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
	if (needsValidation(host, partial) && !isAll(host) && !isHostEngine(host)) {
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
	if (
		needsValidation(version, partial, true) &&
		!isAll(version) &&
		!isRangedVersion(version)
	) {
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
	if (needsValidation(debugPort, partial, true) && !isInt(debugPort)) {
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
}
