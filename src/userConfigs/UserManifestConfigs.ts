import { DeepCollapse } from '@src/lib/DeepCollapse';
import { badValueError } from '@src/lib/errorMessages';
import { EmailAddress, isEmailAddress } from '@src/lib/typesAndValidators';
import { isURL } from '@src/lib/validators';
import { linkToDocs } from '@src/linkToDocs';
import { AllExtensions, isAllExtensions } from './AllExtensions';
import {
	ExecutionEnvironment,
	isExecutionEnvironment,
} from './ExecutionEnvironment';
import { ExtensionBundle, isExtensionBundle } from './ExtensionBundle';

export type _UserManifestConfigs = {
	extensionBundle: ExtensionBundle;
	authorName?: string;
	contact?: EmailAddress;
	legal?: URL | string;
	abstract?: URL | string;
	executionEnvironment: ExecutionEnvironment;
	extensions: AllExtensions;
};

export type UserManifestConfigs = DeepCollapse<_UserManifestConfigs>;

export const isUserManifestConfigs = (
	received: any,
	parents: string[] = [],
): received is _UserManifestConfigs => {
	let cumulatedErrors: string[] = [];
	if (
		received === undefined ||
		received === null ||
		received instanceof Array ||
		typeof received !== 'object' ||
		Object.keys(received).length === 0
	) {
		throw badValueError({
			propertyName: [...parents, 'manifest'].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'UserManifestConfigs',
			)}`,
			received,
			required: true,
		});
	}
	parents.push('manifest');
	try {
		isExtensionBundle(received.extensionBundle, [...parents]);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isExecutionEnvironment(received.executionEnvironment, [...parents]);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		isAllExtensions(received.extensions, [...parents]);
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	const { authorName, contact, legal, abstract } = received;
	if (authorName !== undefined && typeof authorName !== 'string') {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'authorName'].join('.'),
				expectedPropertyType: 'a string',
				received: authorName,
			}),
		);
	}
	if (contact !== undefined && !isEmailAddress(contact)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'contact'].join('.'),
				expectedPropertyType: `${linkToDocs(
					'general type',
					'an EmailAddress',
				)}`,
				received: contact,
			}),
		);
	}
	if (legal !== undefined && !isURL(legal)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'legal'].join('.'),
				expectedPropertyType:
					'a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL',
				received: legal,
			}),
		);
	}
	if (abstract !== undefined && !isURL(abstract)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'abstract'].join('.'),
				expectedPropertyType:
					'a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL',
				received: abstract,
			}),
		);
	}
	if (cumulatedErrors.length > 0) throw cumulatedErrors.join('\n\n');
	return true;
};
