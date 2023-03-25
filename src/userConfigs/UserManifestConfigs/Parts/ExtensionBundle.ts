import { badValueError } from '@src/lib/errorMessages';
import { CEPVersion, isCEPVersion } from '@src/lib/enumsAndValidators';
import { VersionNumber, isVersionNumber } from '@src/lib/typesAndValidators';
import { linkToDocs } from '@src/linkToDocs';
import { needsValidation } from '@src/userConfigs/needsValidation';

export type ExtensionBundle = {
	id: string;
	version?: VersionNumber;
	name?: string;
	cepVersion?: CEPVersion | keyof typeof CEPVersion | `${CEPVersion}`;
};

let myp: { partial: boolean } = { partial: true };
isExtensionBundle(undefined, ['manifest'], myp);

export function isExtensionBundle(
	arg: any,
	parents: string[],
	partial: { partial: true },
): arg is Partial<ExtensionBundle>;
export function isExtensionBundle(
	arg: any,
	parents: string[],
	partial?: { partial: false },
): arg is ExtensionBundle;
export function isExtensionBundle(
	arg: any,
	parents: string[],
	partial?: { partial: boolean },
): arg is Partial<ExtensionBundle> | ExtensionBundle;
export function isExtensionBundle(
	arg: any,
	parents: string[] = ['manifest'],
	partial: { partial: boolean } = { partial: false },
) {
	parents = [...parents];
	if (!needsValidation(arg, partial)) {
		return true;
	}
	let cumulatedErrors: string[] = [];
	if (
		arg === undefined ||
		arg === null ||
		typeof arg !== 'object' ||
		arg instanceof Array
	)
		throw badValueError({
			propertyName: parents.join('.'),
			required: true,
			expectedPropertyType: `an ${linkToDocs(
				'user manifest configs type',
				'ExtensionBundle',
			)}`,
			received: arg,
		});
	const { id, version, name, cepVersion } = arg;
	if (needsValidation(id, partial) && typeof id !== 'string') {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'id'].join('.'),
				expectedPropertyType: 'a string',
				received: id,
				required: true,
			}),
		);
	}
	if (needsValidation(version, partial, true) && !isVersionNumber(version)) {
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
	if (needsValidation(name, partial, true) && typeof name !== 'string') {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'name'].join('.'),
				expectedPropertyType: 'a string',
				received: name,
			}),
		);
	}
	if (
		needsValidation(cepVersion, partial, true) &&
		!isCEPVersion(cepVersion)
	) {
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
}
