import { XMLElement } from './XMLElement';
import { Extension, ExtensionArgument, isExtensionArgument } from './Extension';
import { badArgumentError } from './errorMessages';
export class ExtensionList extends XMLElement {
	constructor(extensions: ExtensionArgument | ExtensionArgument[]) {
		if (!(extensions instanceof Array)) extensions = [extensions];
		let content: Extension[] = [];
		for (const extension of extensions) {
			if (isExtensionArgument(extension)) content.push(new Extension(extension));
			else
				throw new Error(
					badArgumentError('Every ExtensionList Extensions', 'object of type ExtensionArgument', extensions),
				);
		}

		super({ name: 'ExtensionList', content });
	}
}
