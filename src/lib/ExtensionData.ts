import { XMLElement } from './XMLElement';
export class ExtensionData extends XMLElement {
	constructor(content: string) {
		if (content && typeof content === 'string') {
			super({
				name: 'ExtensionData',
				content,
			});
		} else throw new Error(badArgumentError("Extension Data's content", 'string', content));
	}
}
