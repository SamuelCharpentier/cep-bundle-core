import { XMLElement } from './XMLElement';
import { Extension } from './Extension';
import { badArgumentError } from './errorMessages';
export class ExtensionList extends XMLElement {
	constructor(extensions: Extension | Extension[]) {
		if (typeof extensions === 'object' && extensions instanceof Extension) extensions = [extensions];
		else if (typeof extensions !== 'object' || !(extensions instanceof Array))
			throw new Error(badArgumentError('Extension list Extension', 'object of type Extension', extensions));

		super({ name: 'ExtensionList', content: extensions });
	}
}
