import { XMLElement } from './XMLElement';
export class Author extends XMLElement {
	constructor(authorName: string) {
		if (!authorName || typeof authorName !== 'string' || authorName.length <= 0)
			throw new Error(badArgumentError("Author's name", 'string', authorName));
		super({ name: 'Author', content: authorName });
	}
}
