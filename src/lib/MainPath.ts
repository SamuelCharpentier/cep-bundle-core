import { XMLElement } from './XMLElement';
import { RelativePath, isRelativePath } from './typesAndValidators';
import { badArgumentError } from './errorMessages';
export class MainPath extends XMLElement {
	constructor(relativePath: RelativePath) {
		let content: string | undefined;
		if (!isRelativePath(relativePath))
			throw new Error(
				badArgumentError(
					"Main path's first argument",
					'string containing a relative path from the extension root to the main .html/.swf file',
					relativePath,
				),
			);

		content = relativePath;
		super({ name: 'MainPath', content });
	}
}
