import { DeepCollapse } from '@src/lib/DeepCollapse';
import { badValueError } from '@src/lib/errorMessages';
import { VersionNumber, isVersionNumber } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';
import { AllDependencies, isAllDependencies } from './AllDependencies';
import { AllDispatchInfo, isAllDispatchInfo } from './AllDispatchInfo';
import { HostList, isHostList } from './HostList';

export type _Extension = {
	id: string;
	version?: VersionNumber;
	hostList: HostList;
	dispatchInfo: AllDispatchInfo;
	dependencyList?: AllDependencies;
};
export type Extension = DeepCollapse<_Extension>;

export const isExtension = (
	received: any,
	parents: string[] = ['extension'],
): received is _Extension => {
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
				'Extension',
			)}`,
			received,
		});
	}
	const { id, version, hostList, dispatchInfo, dependencyList } = received;
	if (id === undefined || typeof id !== 'string' || id.length === 0) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'id'].join('.'),
				required: true,
				expectedPropertyType: 'a string with length > 0',
				received: id,
			}),
		);
	}
	if (version !== undefined && !isVersionNumber(version)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'version'].join('.'),
				expectedPropertyType: `${linkToDocs(
					'general type',
					'VersionNumber',
				)}`,
				received: version,
			}),
		);
	}
	try {
		isHostList(hostList, [...parents, 'hostList']);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isAllDispatchInfo(dispatchInfo, [...parents, 'dispatchInfo']);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	if (dependencyList !== undefined) {
		try {
			isAllDependencies(dependencyList, [...parents, 'dependencyList']);
		} catch (error) {
			cumulatedErrors.push(...String(error).split('\n\n'));
		}
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
