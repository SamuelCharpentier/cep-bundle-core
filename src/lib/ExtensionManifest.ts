import { XMLElement } from './XMLElement';
import { VersionNumber, isVersionNumber, EmailAddress, isEmail, isValidUrl } from './typesAndValidators';
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

type bundleInfos = { id: string; version: VersionNumber; name?: string };
export type ExtensionManifestArgument = {
	extensionBundle: bundleInfos;
	authorName?: string;
	contact?: EmailAddress;
	legal?: URL | string;
	abstract?: URL | string;
	extensions: ExtensionArgument | ExtensionArgument[];
	executionEnvironment?: ExecutionEnvironmentArgument;
};

export const isExtensionManifestArgument = <(arg: any) => arg is ExtensionManifestArgument>((argument) => {
	if (argument && typeof argument === 'object') {
		let { extensionBundle, authorName, contact, legal, abstract, extensions, executionEnvironment } = argument;
		console.log(extensionBundle);
		let { id: bundleId, version: bundleVersion, name: bundleName } = extensionBundle;
		if (typeof bundleId !== 'string') throw new Error(badArgumentError('bundleId', 'a string', bundleId));

		if (typeof bundleVersion !== 'number' && !isVersionNumber(bundleVersion))
			throw new Error(
				badArgumentError('bundleVersion', 'a number or string containing a VersionNumber(type)', bundleVersion),
			);

		if (bundleName && typeof bundleName !== 'string')
			throw new Error(badArgumentError("The bundle's name (optional)", 'a string', bundleName));

		if (authorName)
			if (typeof authorName !== 'string')
				throw new Error(badArgumentError('authorName(optional)', 'a string', authorName));

		if (contact)
			if (!isEmail(contact))
				throw new Error(badArgumentError('contact', 'a string containing a valid email', contact));

		if (legal)
			if (!isValidUrl(legal))
				throw new Error(badArgumentError('legal(optional)', 'string containing a valid URL', legal));

		if (abstract)
			if (!isValidUrl(abstract))
				throw new Error(badArgumentError('abstract(optional)', 'string containing a valid URL', abstract));

		if (!extensions)
			throw new Error(
				badArgumentError('extensions', 'an object or array of objects of type ExtensionArgument', extensions),
			);
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
		if (!isExecutionEnvironmentArgument(executionEnvironment))
			throw new Error(
				badArgumentError(
					'executionEnvironment',
					'an object of type ExecutionEnvironmentArgument(type)',
					executionEnvironment,
				),
			);

		return true;
	}
	throw new Error('isExtensionManifestArgument could not be validated');

	return false;
});
export class ExtensionManifest extends XMLElement {
	constructor({
		extensionBundle,
		authorName,
		contact,
		legal,
		abstract,
		extensions,
		executionEnvironment,
	}: ExtensionManifestArgument) {
		if (isExtensionManifestArgument(arguments[0])) {
			const { id: bundleId, version: bundleVersion, name: bundleName } = extensionBundle;
			let attributes = [
				{ name: 'Version', value: '7.0' },
				{ name: 'ExtensionBundleId', value: bundleId },
				{ name: 'ExtensionBundleVersion', value: bundleVersion.toString() },
			];
			if (bundleName) attributes.push({ name: 'ExtensionBundleName', value: bundleName });

			let content: XMLElement[] = [];
			if (authorName) content.push(new Author(authorName));

			if (contact) content.push(new Contact(contact));

			if (legal) content.push(new Legal(legal));
			if (abstract) content.push(new Abstract(abstract));

			if (extensions) {
				if (!(extensions instanceof Array)) extensions = [extensions];
				content.push(new ExtensionList(extensions));
				if (isExecutionEnvironmentArgument(executionEnvironment)) {
					content.push(new ExecutionEnvironment(executionEnvironment));
				}
				content.push(new DispatchInfoList(extensions));
			}

			super({
				name: 'ExtensionManifest',
				attributes: attributes,
				content,
				context: contextContainsNoneOf('.debug'),
			});
		}
	}
}
