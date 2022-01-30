import { XMLElement } from './XMLElement';
import { Extension, ExtensionArgument } from './Extension';
import { badArgumentError } from '../errorMessages';

export type ExtensionListArgument = ExtensionArgument | ExtensionArgument[];

function isExtensionListArgument(arg: any): arg is ExtensionListArgument {
	if (!arg || typeof arg !== 'object')
		throw new Error(
			badArgumentError('extensions', 'an ExtensionArgument (type) or an array of ExtensionArgument', arg),
		);
	arg = !Array.isArray(arg) ? [arg] : arg;
	for (let argObject of arg) {
		if (typeof argObject !== 'object' || Object.keys(argObject).length < 1)
			throw new Error(badArgumentError('every extensions', 'an ExtensionArgument (type)', argObject));
	}
	return true;
}

export class ExtensionList extends XMLElement {
	constructor(extensions: any | ExtensionArgument | ExtensionArgument[]) {
		isExtensionListArgument(extensions);
		extensions = !(extensions instanceof Array) ? [extensions] : extensions;
		let content: Extension[] = [];
		for (const extension of extensions) {
			content.push(new Extension(extension));
		}

		super({ name: 'ExtensionList', content });
	}
}
