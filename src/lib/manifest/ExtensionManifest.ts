import { XMLElement } from './XMLElement';
import { AttributeArgument } from './Attribute';

import {
	VersionNumber,
	isVersionNumber,
	EmailAddress,
	isEmail,
	isValidUrl,
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
	isExecutionEnvironmentArgument,
} from './ExecutionEnvironment';
import { DispatchInfoList } from './DispatchInfoList';

import { contextContainsNoneOf } from './Context';
import { badArgumentError } from '../errorMessages';
import { notAValue } from './validators';

export type BundleInfos = {
	id: string;
	version: VersionNumber;
	name?: string;
	cepVersion: CEPVersion | keyof typeof CEPVersion;
};
type ManifestArgument = {
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

const isExtensionManifestArgument = <
	(arg: any) => arg is ExtensionManifestArgument
>((arg) => {
	if (!notAValue(arg) && typeof arg === 'object' && !(arg instanceof Array)) {
		let { extensionBundle } = arg;
		if (
			!notAValue(extensionBundle) &&
			typeof extensionBundle === 'object' &&
			!(arg instanceof Array)
		) {
			let {
				cepVersion,
				id: bundleId,
				version: bundleVersion,
				name: bundleName,
			} = extensionBundle;
			if (!isCEPVersion(cepVersion))
				throw new Error(
					badArgumentError(
						"The bundle's CEP version",
						'a CEPVersion(enum)',
						cepVersion,
					),
				);
			if (typeof bundleId !== 'string')
				throw new Error(
					badArgumentError("The bundle's ID", 'a string', bundleId),
				);
			if (
				typeof bundleVersion !== 'number' &&
				!isVersionNumber(bundleVersion)
			)
				throw new Error(
					badArgumentError(
						"The bundle's version",
						'a number or string containing a VersionNumber (type)',
						bundleVersion,
					),
				);

			if (bundleName && typeof bundleName !== 'string')
				throw new Error(
					badArgumentError(
						"The bundle's name (optional)",
						'a string',
						bundleName,
					),
				);
		} else {
			throw new Error(
				badArgumentError(
					'extensionBundle',
					'BundleInfos (type)',
					extensionBundle,
				),
			);
		}

		let { extensions } = arg;
		if (extensions === undefined)
			throw badArgumentError(
				'extensions',
				'ExtensionListArgument (type)',
				extensions,
			);
	} else {
		throw badArgumentError(
			'ExtensionManifestArgument, .cep.config.js or .cep.config.json',
			'a ExtensionManifestArgument (type)',
			arg,
		);
	}

	return true;
});
export class ExtensionManifest extends XMLElement {
	constructor(arg: ExtensionManifestArgument | any) {
		console.log(arg);

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
			content.push(new ExtensionList(extensions));

			console.log(executionEnvironment);
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
		}
	}
}
