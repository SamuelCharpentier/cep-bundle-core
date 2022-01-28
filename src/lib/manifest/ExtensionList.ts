import { XMLElement } from './XMLElement';
import { Extension, ExtensionArgument } from './Extension';
import { badArgumentError } from '../errorMessages';

export type ExtensionListArgument = ExtensionArgument | ExtensionArgument[];

export function isExtensionListArgument(extensions: any): extensions is ExtensionListArgument {
	if (!extensions)
		throw new Error(
			badArgumentError('extensions', 'an  ExtensionArgument (type) or an array of ExtensionArgument', extensions),
		);
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
