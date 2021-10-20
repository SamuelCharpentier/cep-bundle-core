import { XMLElement } from './XMLElement';
import { Extension, ExtensionArgument, isExtensionArgument } from './Extension';
import { badArgumentError } from '../errorMessages';

export type ExtensionListArgument = ExtensionArgument | ExtensionArgument[];

export const isExtensionListArgument = <(arg: any) => arg is ExtensionListArgument>((extensions) => {
	if (!extensions)
		throw new Error(
			badArgumentError('extensions', 'an object or array of objects of type ExtensionArgument', extensions),
		);
	if (!(extensions instanceof Array)) extensions = [extensions];
	for (const extension of extensions) {
		if (!isExtensionArgument(extension))
			throw new Error(
				badArgumentError(
					'extensions',
					'object or array of objects of type ExtensionArgument(type)\nThe following element was problematic',
					extension,
				),
			);
	}
	return true;
});

export class ExtensionList extends XMLElement {
	constructor(extensions: any | ExtensionArgument | ExtensionArgument[]) {
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
