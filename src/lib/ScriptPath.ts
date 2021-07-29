import { XMLElement } from './XMLElement';
import { badArgumentError } from './errorMessages';
export class ScriptPath extends XMLElement {
	constructor(relativePathLocation?: string) {
		let content: string | undefined;
		if (relativePathLocation && typeof relativePathLocation !== 'string')
			throw new Error(
				badArgumentError(
					"Script Path's first argument",
					'string containing a relative path from the extension root to the main script file',
					relativePathLocation,
				),
			);

		content = relativePathLocation;
		super({ name: 'ScriptPath', content });
	}
}
