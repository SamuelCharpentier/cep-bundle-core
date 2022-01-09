import { XMLElement } from './XMLElement';
import { RelativePath, isRelativePath } from '../typesAndValidators';
import { badArgumentError } from '../errorMessages';

const isMainPathArgument: (arg: any) => boolean = (arg): arg is RelativePath => {
	if (!isRelativePath(arg)) throw new Error(badArgumentError('mainPath', 'a RelativePath (type)', arg));
	return true;
};
export class MainPath extends XMLElement {
	constructor(relativePath: RelativePath) {
		if (isMainPathArgument(relativePath)) {
			let content: string = relativePath;
			super({ name: 'MainPath', content });
		}
	}
}
