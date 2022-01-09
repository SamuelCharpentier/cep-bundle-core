import { XMLElement } from './XMLElement';
import { badArgumentError } from '../errorMessages';
import { RelativePath, isRelativePath } from '../typesAndValidators';

const isScriptPathArgument: (value: any) => boolean = (value): value is RelativePath => {
	if (!isRelativePath(value))
		throw new Error(
			badArgumentError(
				'extensions.dispatchInfo.resources.scriptPath',
				'string containing a relative path from the extension root to the main script file',
				value,
			),
		);
	return true;
};
export class ScriptPath extends XMLElement {
	constructor(relativePathLocation?: RelativePath) {
		let content: string | undefined;
		isScriptPathArgument(relativePathLocation);
		content = relativePathLocation;
		super({ name: 'ScriptPath', content });
	}
}
