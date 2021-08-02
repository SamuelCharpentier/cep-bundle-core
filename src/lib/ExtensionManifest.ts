import { XMLElement } from './XMLElement';
import { isNumeric, VersionNumber, EmailAddress, isEmail, isValidUrl } from './typesAndValidators';
import { Author } from './Author';
import { Contact } from './Contact';
import { Legal } from './Legal';
import { Abstract } from './Abstract';
import { ExtensionList } from './ExtensionList';
import {
	ExecutionEnvironment,
	ExecutionEnvironmentArgument,
	isExecutionEnvironmentArgument,
} from './ExecutionEnvironment';
import { DispatchInfoList } from './DispatchInfo';
import { badArgumentError } from './errorMessages';
import { Extension, ExtensionArgument, isExtensionArgument } from './Extension';
import { contextContainsNoneOf } from './Context';

export type ExtensionManifestArgument = {
	bundleId: string;
	bundleVersion: VersionNumber;
	bundleName?: string;
	authorName?: String;
	contact?: EmailAddress;
	legal?: URL | string;
	abstract?: URL | string;
	extensions: ExtensionArgument | ExtensionArgument[];
	executionEnvironment: ExecutionEnvironmentArgument;
};

export const isExtensionManifestArgument: (arg: any) => boolean = (argument) => {
	throw new Error('isExtensionManifestArgument could not be validated');

	return false;
};
export class ExtensionManifest extends XMLElement {
	constructor({
		bundleId,
		bundleVersion,
		bundleName,
		authorName,
		contact,
		legal,
		abstract,
		extensions,
		executionEnvironment,
	}: ExtensionManifestArgument) {
		let attributes = [{ name: 'Version', value: '7.0' }];
		if (bundleId && typeof bundleId === 'string') attributes.push({ name: 'ExtensionBundleId', value: bundleId });
		else throw new Error(badArgumentError("The bundle's ID", 'string', bundleId));

		if (bundleVersion && (typeof bundleVersion === 'number' || isNumeric(bundleVersion)))
			attributes.push({ name: 'ExtensionBundleVersion', value: bundleVersion.toString() });
		else throw new Error(badArgumentError("The bundle's version", 'number or string', bundleVersion));

		if (bundleName && typeof bundleName === 'string')
			attributes.push({ name: 'ExtensionBundleName', value: bundleName });
		else if (bundleName) throw new Error(badArgumentError("The bundle's name (optional)", 'string', bundleName));

		let content: XMLElement[] = [];
		if (authorName)
			if (typeof authorName === 'string') content.push(new Author(authorName));
			else
				throw new Error(
					badArgumentError("ExtensionManifest's author(optional)", 'instance of Author', authorName),
				);
		if (contact)
			if (typeof contact === 'string' && isEmail(contact)) content.push(new Contact(contact));
			else
				throw new Error(
					badArgumentError(
						"ExtensionManifest's contact(optional)",
						'string containing a valid email',
						contact,
					),
				);
		if (legal)
			if (typeof legal === 'string' && isValidUrl(legal)) content.push(new Legal(legal));
			else
				throw new Error(
					badArgumentError("ExtensionManifest's legal(optional)", 'string containing a valid URL', legal),
				);
		if (abstract)
			if (typeof abstract === 'string' && isValidUrl(abstract)) content.push(new Abstract(abstract));
			else
				throw new Error(
					badArgumentError(
						"ExtensionManifest's abstract(optional)",
						'string containing a valid URL',
						abstract,
					),
				);

		if (extensions) {
			if (!(extensions instanceof Array)) extensions = [extensions];
			for (const extension of extensions) {
				if (!isExtensionArgument(extension))
					throw new Error(
						badArgumentError(
							"ExtensionManifest's extensions",
							'object of type ExtensionArgument(type)',
							extension,
						),
					);
			}
			content.push(new ExtensionList(extensions));
			content.push(new DispatchInfoList(extensions));
		} else
			throw new Error(
				badArgumentError(
					"ExtensionManifest's extensions",
					'instance of Extension(class) or an array of instances of Extension(class)',
					extensions,
				),
			);

		if (isExecutionEnvironmentArgument(executionEnvironment)) {
			content.push(new ExecutionEnvironment(executionEnvironment));
		}

		super({ name: 'ExtensionManifest', attributes: attributes, content, context: contextContainsNoneOf('.debug') });
	}
}
