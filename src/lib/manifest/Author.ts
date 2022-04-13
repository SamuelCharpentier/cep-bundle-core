import { XMLElement } from './XMLElement';
import { badArgumentError } from '../errorMessages';
export class Author extends XMLElement {
	constructor(authorName: string) {
		if (typeof authorName !== 'string' || authorName.length <= 0)
			throw new Error(
				badArgumentError('authorName', 'a string', authorName),
			);
		super({ name: 'Author', content: authorName });
	}
}
