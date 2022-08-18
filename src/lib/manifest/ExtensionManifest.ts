import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';

import {
	VersionNumber,
	isVersionNumber,
	EmailAddress,
} from '../typesAndValidators';
import { CEPVersion, isCEPVersion } from './enumsAndValidators';

import { Author } from './Author';
import { Contact } from './Contact';
import { Legal } from './Legal';
import { Abstract } from './Abstract';
import { ExtensionList, ExtensionListArgument } from './ExtensionList';
import {
	ExecutionEnvironment,
	ExecutionEnvironmentArgument,
} from './ExecutionEnvironment';
import { DispatchInfoList } from './DispatchInfoList';

import { contextContainsNoneOf } from './Context';
import { badArgumentError } from '../errorMessages';
import { containsAValue, isObject } from '../validators';

export type BundleInfos = {
	id: string;
	version: VersionNumber;
	name?: string;
	cepVersion: CEPVersion | keyof typeof CEPVersion;
};
export type ManifestArgument = {
	extensionBundle: BundleInfos;
	authorName?: string;
	contact?: EmailAddress;
	legal?: URL | string;
	abstract?: URL | string;
	executionEnvironment?: ExecutionEnvironmentArgument;
};
export type ExtensionManifestArgument = ManifestArgument & {
	extensions: ExtensionListArgument;
};

const isBundleInfos = (
	extensionBundle: any,
): extensionBundle is BundleInfos => {
	if (!isObject(extensionBundle) || !containsAValue(extensionBundle)) {
		throw badArgumentError(
			'extensionBundle',
			'a BundleInfos (type)',
			extensionBundle,
		);
	}
	const { id, version, name, cepVersion } = extensionBundle;
	if (!isVersionNumber(version)) {
		throw badArgumentError(
			'extensionBundle.version',
			'a VersionNumber (type)',
			version,
		);
	}
	if (!isCEPVersion(cepVersion))
		throw badArgumentError(
			'extensionBundle.cepVersion',
			'a CEPVersion (enum)',
			cepVersion,
		);
	if (typeof id !== 'string')
		throw badArgumentError('extensionBundle.id', 'a string', id);
	if (name !== undefined && typeof name !== 'string')
		throw badArgumentError(
			'extensionBundle.name (optional)',
			'a string',
			name,
		);
	return true;
};

export const isManifestArgument = <
	(arg: { [key: string]: any }) => arg is ExtensionManifestArgument
>((arg) => {
	const {
		extensionBundle,
		executionEnvironment,
		authorName,
		contact,
		legal,
		abstract,
	} = arg;
	try {
		isBundleInfos(extensionBundle);
	} catch (error) {
		throw error;
	}
	if (
		executionEnvironment !== undefined &&
		(!isObject(executionEnvironment) ||
			!containsAValue(executionEnvironment))
	) {
		throw new Error(
			badArgumentError(
				'executionEnvironment (optional)',
				'an ExecutionEnvironmentArgument (type)',
				executionEnvironment,
			),
		);
	}
	if (
		authorName !== undefined &&
		(typeof authorName !== 'string' || !containsAValue(authorName))
	) {
		throw new Error(
			badArgumentError(
				'authorName (optional)',
				'a non empty string',
				authorName,
			),
		);
	}
	if (
		contact !== undefined &&
		(typeof contact !== 'string' || !containsAValue(contact))
	) {
		throw new Error(
			badArgumentError(
				'contact (optional)',
				'a non empty string',
				contact,
			),
		);
	}
	if (
		legal !== undefined &&
		(typeof legal !== 'string' || !containsAValue(legal))
	) {
		throw new Error(
			badArgumentError('legal (optional)', 'a non empty string', legal),
		);
	}
	return true;
});

export const isExtensionManifestArgument = <
	(arg: any) => arg is ExtensionManifestArgument
>((arg) => {
	if (!isObject(arg) || !containsAValue(arg)) {
		throw badArgumentError(
			'the manifest configs',
			'a ExtensionManifestArgument (type)',
			arg,
		);
	}
	try {
		isManifestArgument(arg);
	} catch (error) {
		throw error;
	}
	let { extensions } = arg;
	if (extensions === undefined)
		throw badArgumentError(
			'extensions',
			'ExtensionListArgument (type)',
			extensions,
		);
	return true;
});
export class ExtensionManifest extends XMLElement {
	extensionList!: ExtensionList;
	constructor(arg: ExtensionManifestArgument | any) {
		if (isExtensionManifestArgument(arg)) {
			let {
				extensionBundle: {
					id: bundleId,
					version: bundleVersion,
					name: bundleName,
					cepVersion,
				},
				authorName,
				contact,
				legal,
				abstract,
				extensions,
				executionEnvironment,
			} = arg;
			let attributes: AttributeArgument[] = [];
			if (cepVersion !== '4.0')
				attributes = [{ name: 'Version', value: cepVersion }];
			attributes.push(
				{ name: 'ExtensionBundleId', value: bundleId },
				{
					name: 'ExtensionBundleVersion',
					value: bundleVersion.toString(),
				},
			);
			if (bundleName)
				attributes.push({
					name: 'ExtensionBundleName',
					value: bundleName,
				});

			let content: XMLElement[] = [];

			if (authorName) content.push(new Author(authorName));

			if (contact) content.push(new Contact(contact));

			if (legal) content.push(new Legal(legal));
			if (abstract) content.push(new Abstract(abstract));

			if (!(extensions instanceof Array)) extensions = [extensions];
			const extensionList = new ExtensionList(extensions);
			content.push(extensionList);

			if (executionEnvironment) {
				content.push(new ExecutionEnvironment(executionEnvironment));
			}
			content.push(new DispatchInfoList(extensions));

			super({
				name: 'ExtensionManifest',
				attributes: attributes,
				content,
				context: contextContainsNoneOf('.debug'),
			});
			this.extensionList = extensionList;
		}
	}
}
