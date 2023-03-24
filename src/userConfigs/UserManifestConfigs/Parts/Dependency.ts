import { badValueError } from '@src/lib/errorMessages';
import { VersionNumber, isVersionNumber } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';

export type Dependency = {
	id: string;
	version?: VersionNumber;
};
export const isDependency = (
	received: any,
	parents: string[] = ['dependencyList'],
): received is Dependency => {
	let cumulatedErrors: string[] = [];
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array
	) {
		throw badValueError({
			propertyName: [...parents].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'Dependency',
			)}`,
			received,
		});
	}
	const { id, version } = received;
	if (id === undefined || typeof id !== 'string') {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'id'].join('.'),
				required: true,
				expectedPropertyType: `${linkToDocs(
					'user manifest configs type',
					'String',
				)}`,
				received: id,
			}),
		);
	}
	if (version !== undefined && !isVersionNumber(version)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'version'].join('.'),
				expectedPropertyType: `${linkToDocs(
					'user manifest configs type',
					'VersionNumber',
				)}`,
				received: version,
			}),
		);
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
