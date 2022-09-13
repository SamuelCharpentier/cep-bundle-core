import { badValueError } from '@src/lib/errorMessages';
import { CEPVersion, isCEPVersion } from '@src/lib/enumsAndValidators';
import { VersionNumber, isVersionNumber } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';

export type ExtensionBundle = {
	id: string;
	version?: VersionNumber;
	name?: string;
	cepVersion?: CEPVersion | `${CEPVersion}` | keyof typeof CEPVersion;
};
/**
 *
 *
 * @param {*} received
 * @param {string[]} [parents=[]]
 * @return {boolean}  {received is ExtensionBundle}
 */
export const isExtensionBundle = (
	received: any,
	parents: string[] = ['manifest'],
): received is ExtensionBundle => {
	parents = [...parents];
	let cumulatedErrors: string[] = [];
	if (
		received === undefined ||
		received === null ||
		typeof received !== 'object' ||
		received instanceof Array
	)
		throw badValueError({
			propertyName: [...parents, 'extensionBundle'].join('.'),
			required: true,
			expectedPropertyType: `an ${linkToDocs(
				'user manifest configs type',
				'ExtensionBundle',
			)}`,
			received,
		});
	parents.push('extensionBundle');
	const { id, version, name, cepVersion } = received;
	if (id === undefined || typeof id !== 'string') {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'id'].join('.'),
				expectedPropertyType: 'a string',
				received: id,
				required: true,
			}),
		);
	}
	if (version !== undefined && !isVersionNumber(version)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'version'].join('.'),
				expectedPropertyType: `a ${linkToDocs(
					'user manifest configs type',
					'VersionNumber',
				)}`,
				received: version,
			}),
		);
	}
	if (name !== undefined && typeof name !== 'string') {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'name'].join('.'),
				expectedPropertyType: 'a string',
				received: name,
			}),
		);
	}
	if (cepVersion !== undefined && !isCEPVersion(cepVersion)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'cepVersion'].join('.'),
				expectedPropertyType: `a ${linkToDocs('enum', 'CEPVersion')}`,
				received: cepVersion,
			}),
		);
	}
	if (cumulatedErrors.length > 0) {
		throw cumulatedErrors.join('\n\n');
	}
	return true;
};
