import { XMLElement } from './XMLElement';
import { Extension, ExtensionArgument } from './Extension';
import { contextContainsNoneOf } from './Context';

export type DispatchInfoListArgument = ExtensionArgument | ExtensionArgument[];

function isDispatchInfoArgument(arg: any): arg is DispatchInfoListArgument {
	/* Is a container, no validation necessary for now */
	return true;
}

export class DispatchInfoList extends XMLElement {
	constructor(extensions: DispatchInfoListArgument) {
		isDispatchInfoArgument(extensions);
		extensions = !(extensions instanceof Array) ? [extensions] : extensions;
		let content: Extension[] = [];
		for (const extension of extensions) {
			content.push(new Extension(extension));
		}
		super({
			name: 'DispatchInfoList',
			content,
			context: (parents: string[]) =>
				contextContainsNoneOf('.debug')(parents),
		});
	}
}
