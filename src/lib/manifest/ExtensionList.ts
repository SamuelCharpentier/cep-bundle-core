import { XMLElement } from './XMLElement';
import { Extension, ExtensionArgument } from './Extension';
import { badArgumentError } from '../errorMessages';

export type ExtensionListArgument = ExtensionArgument | ExtensionArgument[];

export function isExtensionListArgument(
	arg: any,
): arg is ExtensionListArgument {
	/* Is a container, no validation necessary for now */
	if (typeof arg !== 'object')
		throw badArgumentError(
			'extensions',
			'an ExtensionArgument (type) or array of ExtensionArgument (type)',
			arg,
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
