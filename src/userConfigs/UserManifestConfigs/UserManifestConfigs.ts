import { DeepCollapse } from '@src/lib/DeepCollapse';
import { badValueError, unexpectedKeyError } from '@src/lib/errorMessages';
import { EmailAddress, isEmailAddress } from '@src/lib/typesAndValidators';
import { isURL } from '@src/lib/validators';
import { linkToDocs } from '@src/linkToDocs';
import { AllExtensions, isAllExtensions } from './Parts/AllExtensions';
import {
	ExecutionEnvironment,
	isExecutionEnvironment,
} from './Parts/ExecutionEnvironment';
import { ExtensionBundle, isExtensionBundle } from './Parts/ExtensionBundle';
import { DeepPartial } from '@src/lib/deepPartial';
import { deepObjectMerge } from '@src/lib/deepObjectMerge';
import { getPkgManifestConfigs } from './getPkgManifestConfigs';
import { getRuntimeManifestConfigs } from './getRuntimeManifestConfigs';
import { needsValidation } from '../needsValidation';

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

export const getUserManifestConfigs = (
	root: string,
	arg?: any,
	parents: string[] = ['manifest'],
): _UserManifestConfigs => {
	let manifestConfigsOverrides: DeepPartial<_UserManifestConfigs> = {};
	if (arg !== undefined && isPartialUserManifestConfigs(arg, [...parents])) {
		manifestConfigsOverrides = arg;
	}
	let pkgManifestConfigs: DeepPartial<_UserManifestConfigs> = {};
	if (
		isPartialUserManifestConfigs(getPkgManifestConfigs(root), [
			'package.json{cep',
		])
	) {
		pkgManifestConfigs = getPkgManifestConfigs(root);
	}
	let runtimeManifestConfigs: DeepPartial<_UserManifestConfigs> = {};
	if (
		isPartialUserManifestConfigs(getRuntimeManifestConfigs(root), [
			'.cep.config.js{manifest',
		])
	) {
		runtimeManifestConfigs = getRuntimeManifestConfigs(root);
	}
	let manifestConfigs: any = deepObjectMerge(
		pkgManifestConfigs,
		runtimeManifestConfigs,
		manifestConfigsOverrides,
	);

	isUserManifestConfigs(manifestConfigs, ['merged manifestConfigs']);
	return manifestConfigs;
};

function isPartialUserManifestConfigs(
	arg: any,
	parents: string[],
): arg is Partial<_UserManifestConfigs> {
	return isUserManifestConfigs(arg, parents, { partial: true });
}

function isUserManifestConfigs(
	arg: any,
	parents: string[],
	partial: { partial: true },
): arg is Partial<_UserManifestConfigs>;
function isUserManifestConfigs(
	arg: any,
	parents: string[],
	partial?: { partial: false },
): arg is _UserManifestConfigs;
function isUserManifestConfigs(
	arg: any,
	parents: string[] = [],
	partial: { partial: boolean } = { partial: false },
) {
	if (!needsValidation(arg, partial)) return true;
	let cumulatedErrors: string[] = [];
	if (
		arg === undefined ||
		arg === null ||
		arg instanceof Array ||
		typeof arg !== 'object' ||
		Object.keys(arg).length === 0
	) {
		throw badValueError({
			propertyName: [...parents].join('.'),
			expectedPropertyType: `a ${linkToDocs(
				'user manifest configs type',
				'UserManifestConfigs',
			)}`,
			received: arg,
			required: true,
		});
	}
	const validKeys = [
		'extensionBundle',
		'authorName',
		'contact',
		'legal',
		'abstract',
		'executionEnvironment',
		'extensions',
	];
	const {
		extensionBundle,
		executionEnvironment,
		extensions,
		authorName,
		contact,
		legal,
		abstract,
		...rest
	} = arg;
	if (Object.keys(rest).length >= 1) {
		cumulatedErrors.push(
			unexpectedKeyError({
				propertyName: [...parents].join('.'),
				validKeys,
				unexpectedKeys: Object.keys(rest),
			}),
		);
	}
	try {
		if (needsValidation(extensionBundle, partial)) {
			isExtensionBundle(
				extensionBundle,
				[...parents, 'extensionBundle'],
				partial,
			);
		}
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		if (needsValidation(executionEnvironment, partial)) {
			isExecutionEnvironment(
				executionEnvironment,
				[...parents, 'executionEnvironment'],
				partial,
			);
		}
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	try {
		if (needsValidation(extensions, partial)) {
			isAllExtensions(extensions, [...parents, 'extensions'], partial);
		}
	} catch (error) {
		cumulatedErrors.push(...String(error).split('\n\n'));
	}
	if (
		needsValidation(authorName, partial, true) &&
		typeof authorName !== 'string'
	) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'authorName'].join('.'),
				expectedPropertyType: 'a string',
				received: authorName,
			}),
		);
	}
	if (needsValidation(contact, partial, true) && !isEmailAddress(contact)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'contact'].join('.'),
				expectedPropertyType: `an ${linkToDocs(
					'general type',
					'EmailAddress',
				)}`,
				received: contact,
			}),
		);
	}
	if (needsValidation(legal, partial, true) && !isURL(legal)) {
		cumulatedErrors.push(
			badValueError({
				propertyName: [...parents, 'legal'].join('.'),
				expectedPropertyType:
					'a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL',
				received: legal,
			}),
		);
	}
	if (needsValidation(abstract, partial, true) && !isURL(abstract)) {
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
}
