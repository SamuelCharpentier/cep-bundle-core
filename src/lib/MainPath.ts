import { XMLElement } from './XMLElement';
import { RelativePath, isRelativePath } from './typesAndValidators';
import { badArgumentError } from './errorMessages';

export const isMainPathArgument: (value: any) => boolean = (value): value is RelativePath => {
	if (!isRelativePath(value))
		throw new Error(
			badArgumentError(
				'extensions.dispatchInfo.resources.mainPath',
				'string containing a relative path from the extension root to the main .html/.swf file',
				value,
			),
		);
	return true;
};
export class MainPath extends XMLElement {
	constructor(relativePath: RelativePath) {
		let content: string | undefined;
		isMainPathArgument(relativePath);
		content = relativePath;
		super({ name: 'MainPath', content });
	}
}
