import { XMLElement } from './XMLElement';
import { badArgumentError } from '../errorMessages';
export class ExtensionData extends XMLElement {
	constructor(content: string) {
		if (typeof content !== 'string') throw new Error(badArgumentError('extensionData', 'a string', content));
		if (content.length === 0)
			throw new Error(badArgumentError('extensionData', 'a string of at least one character', content));
		super({
			name: 'ExtensionData',
			content,
		});
	}
}
